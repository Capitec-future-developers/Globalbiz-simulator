(function (global) {
    var STORAGE_KEY = 'nlAccountBalances';

    var DEFAULTS = {
        transactional: {
            id: 'transactional',
            name: 'Current Account',
            type: 'transaction',
            available: 90.99,
            balance: 90.99,
            transactions: []
        },
        notice32: {
            id: 'notice32',
            name: 'Notice 32 Savings',
            type: 'savings',
            available: 90.99,
            balance: 90.99,
            transactions: [
                { id: 'seed_n1', date: '30 Jun 2026', name: 'Cr Interest', amount: 0.47 },
                { id: 'seed_n2', date: '31 May 2026', name: 'Cr Interest', amount: 0.35 },
                { id: 'seed_n3', date: '27 May 2026', name: 'O MOHLALA', amount: 26.00 },
                { id: 'seed_n4', date: '30 Apr 2026', name: 'Cr Interest', amount: 0.32 },
                { id: 'seed_n5', date: '31 Mar 2026', name: 'Cr Interest', amount: 0.32 }
            ]
        },
        flexible: {
            id: 'flexible',
            name: 'Flexible Savings',
            type: 'savings',
            available: 0.00,
            balance: 0.00,
            transactions: [
                { id: 'seed_f1', date: '30 Jun 2026', name: 'Cr Interest', amount: 0.47 },
                { id: 'seed_f2', date: '31 May 2026', name: 'Cr Interest', amount: 0.35 },
                { id: 'seed_f3', date: '27 May 2026', name: 'O MOHLALA', amount: 26.00 },
                { id: 'seed_f4', date: '30 Apr 2026', name: 'Cr Interest', amount: 0.32 },
                { id: 'seed_f5', date: '31 Mar 2026', name: 'Cr Interest', amount: 0.32 }
            ]
        },
        credit: {
            id: 'credit',
            name: 'Credit Account',
            type: 'credit',
            available: 97159.36,
            balance: -87159.36,
            transactions: [
                { id: 'seed_c1', date: '6 May 2026', name: 'Transfer to Credit Card', amount: -2588.81 },
                { id: 'seed_c2', date: '1 May 2026', name: 'Monthly Card Fee', amount: -50.00 }
            ]
        }
    };

    function clone(value) {
        return JSON.parse(JSON.stringify(value));
    }

    function getBalances() {
        var raw = localStorage.getItem(STORAGE_KEY);
        var balances;

        if (raw) {
            try {
                balances = JSON.parse(raw);
            } catch (error) {
                balances = clone(DEFAULTS);
            }
        } else {
            balances = clone(DEFAULTS);
        }

        Object.keys(DEFAULTS).forEach(function (id) {
            if (!balances[id]) {
                balances[id] = clone(DEFAULTS[id]);
            }

            if (!Array.isArray(balances[id].transactions)) {
                balances[id].transactions = [];
            }

            balances[id].id = id;
            balances[id].name = balances[id].name || DEFAULTS[id].name;
            balances[id].type = balances[id].type || DEFAULTS[id].type;
            balances[id].available = Number(balances[id].available || 0);
            balances[id].balance = Number(balances[id].balance || 0);
        });

        localStorage.setItem(STORAGE_KEY, JSON.stringify(balances));

        return balances;
    }

    function setBalances(balances) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(balances));

        window.dispatchEvent(
            new CustomEvent('nlBalancesUpdated', {
                detail: balances
            })
        );
    }

    function formatTxDate(date) {
        var months = [
            'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
            'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];

        return date.getDate() + ' ' +
            months[date.getMonth()] + ' ' +
            date.getFullYear();
    }

    function createTransaction(name, amount) {
        return {
            id: 'txn_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
            date: formatTxDate(new Date()),
            name: name,
            amount: Number(amount.toFixed(2))
        };
    }

    function adjust(id, delta, description) {
        var balances = getBalances();

        if (!balances[id]) {
            return null;
        }

        delta = Number(delta);

        if (!Number.isFinite(delta) || delta === 0) {
            return balances[id];
        }

        balances[id].available = Number(
            (balances[id].available + delta).toFixed(2)
        );

        balances[id].balance = Number(
            (balances[id].balance + delta).toFixed(2)
        );

        balances[id].transactions.unshift(
            createTransaction(
                description || (delta < 0 ? 'Payment' : 'Deposit'),
                delta
            )
        );

        setBalances(balances);

        return balances[id];
    }

    function setAccountAmount(id, amount, description) {
        var balances = getBalances();

        if (!balances[id]) {
            return null;
        }

        amount = Number(amount);

        if (!Number.isFinite(amount)) {
            return balances[id];
        }

        var oldAmount = Number(balances[id].available || 0);
        var difference = Number((amount - oldAmount).toFixed(2));

        balances[id].available = Number(amount.toFixed(2));

        if (id !== 'credit') {
            balances[id].balance = Number(amount.toFixed(2));
        } else {
            balances[id].balance = Number(
                (balances[id].balance + difference).toFixed(2)
            );
        }

        if (difference !== 0) {
            balances[id].transactions.unshift(
                createTransaction(
                    description || 'Database balance adjustment',
                    difference
                )
            );
        }

        setBalances(balances);

        return balances[id];
    }

    function setAccountBalances(id, available, balance) {
        var balances = getBalances();

        if (!balances[id]) {
            return null;
        }

        available = Number(available);
        balance = Number(balance);

        if (!Number.isFinite(available) || !Number.isFinite(balance)) {
            return balances[id];
        }

        var oldAvailable = Number(balances[id].available || 0);
        var difference = Number((available - oldAvailable).toFixed(2));

        balances[id].available = Number(available.toFixed(2));
        balances[id].balance = Number(balance.toFixed(2));

        if (difference !== 0) {
            balances[id].transactions.unshift(
                createTransaction(
                    'Database balance adjustment',
                    difference
                )
            );
        }

        setBalances(balances);

        return balances[id];
    }

    function addTransaction(id, transaction) {
        var balances = getBalances();

        if (!balances[id]) {
            return null;
        }

        if (!Array.isArray(balances[id].transactions)) {
            balances[id].transactions = [];
        }

        var amount = Number(transaction.amount || 0);

        balances[id].transactions.unshift({
            id: transaction.id || 'txn_' + Date.now(),
            date: transaction.date || formatTxDate(new Date()),
            name: transaction.name || 'Database transaction',
            amount: Number(amount.toFixed(2))
        });

        balances[id].available = Number(
            (balances[id].available + amount).toFixed(2)
        );

        balances[id].balance = Number(
            (balances[id].balance + amount).toFixed(2)
        );

        setBalances(balances);

        return balances[id];
    }

    global.NLAccountStore = {
        getBalances: getBalances,
        setBalances: setBalances,
        adjust: adjust,
        setAccountAmount: setAccountAmount,
        setAccountBalances: setAccountBalances,
        addTransaction: addTransaction
    };
})(window);