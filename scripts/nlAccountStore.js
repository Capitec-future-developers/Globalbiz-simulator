(function (global) {
    var STORAGE_KEY = 'nlAccountBalances';
    var DEFAULTS = {
        transactional: {
            available: 90.99,
            balance: 90.99,
            transactions: []
        },
        notice32: {
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
            available: 97159.36,
            balance: -87159.36,
            transactions: [
                { id: 'seed_c1', date: '6 May 2026', name: 'Transfer to Credit Card', amount: -2588.81 },
                { id: 'seed_c2', date: '1 May 2026', name: 'Monthly Card Fee', amount: -50.00 }
            ]
        }
    };

    function getBalances() {
        var raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            try {
                var parsed = JSON.parse(raw);
                Object.keys(DEFAULTS).forEach(function (id) {
                    if (!parsed[id]) parsed[id] = JSON.parse(JSON.stringify(DEFAULTS[id]));
                    if (!parsed[id].transactions) parsed[id].transactions = [];
                });
                return parsed;
            } catch (e) {
                /* fall through to reset */
            }
        }
        var fresh = JSON.parse(JSON.stringify(DEFAULTS));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
        return fresh;
    }

    function setBalances(balances) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(balances));
    }

    function formatTxDate(date) {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
    }

    function adjust(id, delta, description) {
        var balances = getBalances();
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

    global.NLAccountStore = {
        getBalances: getBalances,
        setBalances: setBalances,
        adjust: adjust
    };
})(window);
