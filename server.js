const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'your_secret_key_here';

app.use(cors());
app.use(bodyParser.json());

// Database (in-memory for this example)
let users = [...]; // Use the database structure above

// Authentication middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}

// Routes
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);

    if (!user) return res.status(404).send('User not found');

    // In a real app, compare hashed passwords
    if (password !== 'demo') { // Replace with bcrypt.compare
        return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        SECRET_KEY,
        { expiresIn: '1h' }
    );

    res.json({ token, user: { name: user.name, email: user.email } });
});

app.get('/api/accounts', authenticateToken, (req, res) => {
    const user = users.find(u => u.id === req.user.id);
    res.json(user.accounts);
});

app.get('/api/transactions', authenticateToken, (req, res) => {
    const user = users.find(u => u.id === req.user.id);
    res.json(user.transactions);
});

app.get('/api/beneficiaries', authenticateToken, (req, res) => {
    const user = users.find(u => u.id === req.user.id);
    res.json(user.beneficiaries);
});

app.post('/api/beneficiaries', authenticateToken, (req, res) => {
    const user = users.find(u => u.id === req.user.id);
    const newBeneficiary = {
        id: `ben${user.beneficiaries.length + 1}`,
        ...req.body
    };
    user.beneficiaries.push(newBeneficiary);
    res.status(201).json(newBeneficiary);
});

app.post('/api/payments', authenticateToken, (req, res) => {
    const user = users.find(u => u.id === req.user.id);
    const { amount, reference, beneficiaryId } = req.body;

    const newTransaction = {
        id: `txn${user.transactions.length + 1}`,
        date: new Date().toISOString().split('T')[0],
        type: "Payment",
        reference,
        amount: -amount,
        fees: 0,
        balance: user.accounts[0].balance - amount
    };

    user.transactions.push(newTransaction);
    user.accounts[0].balance -= amount;

    res.status(201).json(newTransaction);
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});