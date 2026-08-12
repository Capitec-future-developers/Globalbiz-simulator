const STORAGE_KEY = 'nlAccountBalances';

const DEFAULTS = {
    transactional: {
        available: 3250.75,
        balance: 3250.75,
        transactions: [
            { id: 'seed_t1', date: '25 Jun 2026', name: 'Salary', amount: 3000.00 },
            { id: 'seed_t2', date: '20 Jun 2026', name: 'Woolworths', amount: -450.20 }
        ]
    },
    notice32: {
        available: 12400.50,
        balance: 12400.50,
        transactions: [
            { id: 'seed_n1', date: '30 Jun 2026', name: 'Cr Interest', amount: 42.10 },
            { id: 'seed_n2', date: '31 May 2026', name: 'Cr Interest', amount: 39.85 },
            { id: 'seed_n3', date: '15 May 2026', name: 'Z DUBE', amount: 500.00 }
        ]
    },
    flexible: {
        available: 6800.00,
        balance: 6800.00,
        transactions: [
            { id: 'seed_f1', date: '30 Jun 2026', name: 'Cr Interest', amount: 18.60 },
            { id: 'seed_f2', date: '31 May 2026', name: 'Cr Interest', amount: 17.25 }
        ]
    },
    credit: {
        available: 45000.00,
        balance: -15000.00,
        transactions: [
            { id: 'seed_c1', date: '10 Jun 2026', name: 'Takealot', amount: -1200.00 },
            { id: 'seed_c2', date: '1 Jun 2026', name: 'Monthly Card Fee', amount: -75.00 }
        ]
    }
};

export function getBalances() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
        try {
            const parsed = JSON.parse(raw);
            Object.keys(DEFAULTS).forEach((id) => {
                if (!parsed[id]) parsed[id] = JSON.parse(JSON.stringify(DEFAULTS[id]));
                if (!parsed[id].transactions) parsed[id].transactions = [];
            });
            return parsed;
        } catch (e) {
            /* fall through to reset */
        }
    }
    const fresh = JSON.parse(JSON.stringify(DEFAULTS));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    return fresh;
}

export function setBalances(balances) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(balances));
}

function formatTxDate(date) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
}

export function adjustBalance(id, delta, description) {
    const balances = getBalances();
    if (!balances[id]) return null;
    balances[id].available += delta;
    balances[id].balance += delta;
    if (!balances[id].transactions) balances[id].transactions = [];
    balances[id].transactions.unshift({
        id: 'txn_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
        date: formatTxDate(new Date()),
        name: description || (delta < 0 ? 'Payment' : 'Deposit'),
        amount: delta
    });
    setBalances(balances);
    return balances[id];
}

export function formatNlBalance(amount) {
    const sign = amount < 0 ? '-' : '';
    return sign + 'R' + Math.abs(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

export function formatCurrency(amount) {
    const sign = amount < 0 ? '-' : '';
    return sign + 'R ' + Math.abs(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}
