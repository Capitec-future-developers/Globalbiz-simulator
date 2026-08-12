(function (global) {
    var STORAGE_KEY = 'nlAccountBalances';
    var DEFAULTS = {
        transactional: { available: 90.99, balance: 90.99 },
        notice32: { available: 90.99, balance: 90.99 },
        flexible: { available: 0.00, balance: 0.00 },
        credit: { available: 97159.36, balance: -87159.36 }
    };

    function getBalances() {
        var raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
            try {
                return JSON.parse(raw);
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

    function adjust(id, delta) {
        var balances = getBalances();
        if (!balances[id]) return null;
        balances[id].available += delta;
        balances[id].balance += delta;
        setBalances(balances);
        return balances[id];
    }

    global.NLAccountStore = {
        getBalances: getBalances,
        setBalances: setBalances,
        adjust: adjust
    };
})(window);
