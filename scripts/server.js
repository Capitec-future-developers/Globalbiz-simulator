require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');
const User = require('./models/User');
const Account = require('./models/Account');
const Transaction = require('./models/Transaction');
const Beneficiary = require('./models/Beneficiary');

const app = express();


app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/bancs_digital', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));


const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';


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




app.post('/api/register', async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        
        user = new User({ firstName, lastName, email, password });
        await user.save();

        
        const account = new Account({
            accountNumber: Math.floor(1000000000 + Math.random() * 9000000000).toString(),
            accountType: 'current',
            balance: 1000, 
            owner: user._id
        });
        await account.save();

        
        user.accounts.push(account._id);
        await user.save();

        
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


app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        
        const user = await User.findOne({ email }).populate('accounts');
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        
        user.lastLogin = new Date();
        await user.save();

        
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

        
        await User.findByIdAndUpdate(req.user.id, {
            $push: { beneficiaries: beneficiary._id }
        });

        res.json(beneficiary);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});


app.post('/api/payments', authenticate, async (req, res) => {
    try {
        const { fromAccountId, toAccountNumber, amount, reference, beneficiaryId } = req.body;

        
        const fromAccount = await Account.findOne({
            _id: fromAccountId,
            owner: req.user.id
        });

        if (!fromAccount) {
            return res.status(404).json({ message: 'Source account not found' });
        }

        
        if (fromAccount.balance < amount) {
            return res.status(400).json({ message: 'Insufficient funds' });
        }

        
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

        
        fromAccount.balance -= amount;
        await fromAccount.save();

        
        if (toAccount) {
            toAccount.balance += amount;
            await toAccount.save();
        }

        
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


// Automation tasks endpoint (file-backed "DB")
app.get('/api/automation-tasks', async (req, res) => {
    try {
        const tasksPath = path.join(__dirname, 'data', 'automation-tasks.json');
        const raw = fs.readFileSync(tasksPath, 'utf8');
        const json = JSON.parse(raw);
        const { context } = req.query;
        let tasks = Array.isArray(json.tasks) ? json.tasks : [];
        if (context) {
            const ctx = String(context).toLowerCase();
            tasks = tasks.filter(t => !t.context || t.context.includes(ctx));
        }
        res.json({ tasks });
    } catch (err) {
        console.error('Error loading automation tasks:', err);
        res.status(500).json({ message: 'Failed to load automation tasks' });
    }
});

app.post('/api/init', async (req, res) => {
    try {
        
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

        
        const beneficiary = new Beneficiary({
            name: 'John Doe',
            accountNumber: '1122334455',
            bank: 'standard',
            owner: omphile._id
        });
        await beneficiary.save();

        omphile.beneficiaries.push(beneficiary._id);
        await omphile.save();

        
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

// Local beneficiaries endpoints (file-backed "small DB")
app.get('/api/local/beneficiaries', async (req, res) => {
    try {
        const filePath = path.join(__dirname, 'data', 'beneficiaries.json');
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, JSON.stringify({ beneficiaries: [] }, null, 2), 'utf8');
        }
        const raw = fs.readFileSync(filePath, 'utf8');
        const json = JSON.parse(raw || '{"beneficiaries": []}');
        const beneficiaries = Array.isArray(json.beneficiaries) ? json.beneficiaries : [];
        res.json({ beneficiaries });
    } catch (err) {
        console.error('Error reading beneficiaries:', err);
        res.status(500).json({ message: 'Failed to load beneficiaries' });
    }
});

app.post('/api/local/beneficiaries', async (req, res) => {
    try {
        const { name, accountNumber, bank, nickname } = req.body || {};
        if (!name || !accountNumber || !bank) {
            return res.status(400).json({ message: 'name, accountNumber and bank are required' });
        }

        const filePath = path.join(__dirname, 'data', 'beneficiaries.json');
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, JSON.stringify({ beneficiaries: [] }, null, 2), 'utf8');
        }
        const raw = fs.readFileSync(filePath, 'utf8');
        const json = JSON.parse(raw || '{"beneficiaries": []}');
        const list = Array.isArray(json.beneficiaries) ? json.beneficiaries : [];

        const newBeneficiary = {
            id: `${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
            name: String(name),
            accountNumber: String(accountNumber),
            bank: String(bank),
            nickname: nickname ? String(nickname) : '',
            createdAt: new Date().toISOString()
        };

        list.push(newBeneficiary);
        fs.writeFileSync(filePath, JSON.stringify({ beneficiaries: list }, null, 2), 'utf8');
        res.status(201).json(newBeneficiary);
    } catch (err) {
        console.error('Error saving beneficiary:', err);
        res.status(500).json({ message: 'Failed to save beneficiary' });
    }
});
