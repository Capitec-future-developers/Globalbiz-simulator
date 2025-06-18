require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Account = require('./models/Account');
const Transaction = require('./models/Transaction');
const Beneficiary = require('./models/Beneficiary');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bancs_digital', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// JWT Secret
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Authentication middleware
const authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

// Routes

// Register a new user
app.post('/api/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create user
        user = new User({ firstName, lastName, email, password });
        await user.save();

        // Create a default account
        const account = new Account({
            accountNumber: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
            accountType: 'current',
            balance: 1000, // Starting balance
            owner: user._id
        });
        await account.save();

        // Add account to user
        user.accounts.push(account._id);
        await user.save();

        // Create token
        const payload = { user: { id: user._id } };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        res.json({
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                accounts: [account]
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Login user
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email }).populate('accounts');
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Update last login
        user.lastLogin = new Date();
        await user.save();

        // Create token
        const payload = { user: { id: user._id } };
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        res.json({
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                accounts: user.accounts
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get user profile (protected route)
app.get('/api/user', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
            .select('-password')
            .populate('accounts')
            .populate('beneficiaries');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Get account transactions
app.get('/api/accounts/:id/transactions', authenticate, async (req, res) => {
    try {
        const account = await Account.findOne({
            _id: req.params.id,
            owner: req.user.id
        });

        if (!account) {
            return res.status(404).json({ message: 'Account not found' });
        }

        const transactions = await Transaction.find({
            $or: [
                { fromAccount: account._id },
                { toAccount: account._id }
            ]
        }).sort({ date: -1 });

        res.json(transactions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Create a beneficiary
app.post('/api/beneficiaries', authenticate, async (req, res) => {
    try {
        const { name, accountNumber, bank, nickname } = req.body;

        const beneficiary = new Beneficiary({
            name,
            accountNumber,
            bank,
            nickname,
            owner: req.user.id
        });

        await beneficiary.save();

        // Add beneficiary to user
        await User.findByIdAndUpdate(req.user.id, {
            $push: { beneficiaries: beneficiary._id }
        });

        res.json(beneficiary);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Make a payment
app.post('/api/payments', authenticate, async (req, res) => {
    try {
        const { fromAccountId, toAccountNumber, amount, reference, beneficiaryId } = req.body;

        // Find source account
        const fromAccount = await Account.findOne({
            _id: fromAccountId,
            owner: req.user.id
        });

        if (!fromAccount) {
            return res.status(404).json({ message: 'Source account not found' });
        }

        // Check balance
        if (fromAccount.balance < amount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }

        // Find destination account (simplified - in real app would validate with bank API)
        let toAccount = await Account.findOne({ accountNumber: toAccountNumber });
        let beneficiary = null;

        if (beneficiaryId) {
            beneficiary = await Beneficiary.findOne({
                _id: beneficiaryId,
                owner: req.user.id
            });

            if (!beneficiary) {
                return res.status(404).json({ message: 'Beneficiary not found' });
            }
        }

        // Deduct from source account
        fromAccount.balance -= amount;
        await fromAccount.save();

        // Add to destination account if in our system
        if (toAccount) {
            toAccount.balance += amount;
            await toAccount.save();
        }

        // Create transaction records
        const transaction = new Transaction({
            amount,
            type: 'transfer',
            reference,
            fromAccount: fromAccount._id,
            toAccount: toAccount?._id,
            beneficiary: beneficiary?._id,
            status: 'completed',
            balanceAfter: fromAccount.balance
        });

        await transaction.save();

        res.json({
            message: 'Payment successful',
            transaction,
            newBalance: fromAccount.balance
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Initialize database with sample data
app.post('/api/init', async (req, res) => {
    try {
        // Create Omphile Mohlala
        const omphile = new User({
            firstName: 'Omphile',
            lastName: 'Mohlala',
            email: 'omphilestudent@gmail.com',
            password: 'Omphile725*'
        });
        await omphile.save();

        const omphileAccount = new Account({
            accountNumber: '1234567890',
            accountType: 'current',
            balance: 5000,
            owner: omphile._id
        });
        await omphileAccount.save();

        omphile.accounts.push(omphileAccount._id);
        await omphile.save();

        // Create Thando Mkhatshwa
        const thando = new User({
            firstName: 'Thando',
            lastName: 'Mkhatshwa',
            email: 'thando@example.com',
            password: 'Thando123*'
        });
        await thando.save();

        const thandoAccount = new Account({
            accountNumber: '0987654321',
            accountType: 'current',
            balance: 7500,
            owner: thando._id
        });
        await thandoAccount.save();

        thando.accounts.push(thandoAccount._id);
        await thando.save();

        // Create a beneficiary for Omphile
        const beneficiary = new Beneficiary({
            name: 'John Doe',
            accountNumber: '1122334455',
            bank: 'standard',
            owner: omphile._id
        });
        await beneficiary.save();

        omphile.beneficiaries.push(beneficiary._id);
        await omphile.save();

        // Create some transactions
        const transaction1 = new Transaction({
            amount: 500,
            type: 'debit',
            reference: 'Month S/Fee',
            fromAccount: omphileAccount._id,
            status: 'completed',
            balanceAfter: omphileAccount.balance - 500,
            fees: 50
        });
        await transaction1.save();

        const transaction2 = new Transaction({
            amount: 1.86,
            type: 'debit',
            reference: 'Debit Interest',
            fromAccount: omphileAccount._id,
            status: 'completed',
            balanceAfter: omphileAccount.balance - 500 - 1.86
        });
        await transaction2.save();

        res.json({ message: 'Database initialized with sample data' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));