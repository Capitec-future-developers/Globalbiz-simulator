document.addEventListener('DOMContentLoaded', function () {
    var userSelect = document.getElementById('db-user-select');
    var accountsPanel = document.getElementById('db-accounts-panel');
    var beneficiariesPanel = document.getElementById('db-beneficiaries-panel');
    var toast = document.getElementById('db-toast');
    var openTransactionAccountIds = {};

    function getDb() {
        return JSON.parse(localStorage.getItem('userDatabase') || '{}');
    }

    function saveDb(db) {
        localStorage.setItem('userDatabase', JSON.stringify(db));
    }

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(function () { toast.classList.remove('show'); }, 2200);
    }

    function currentUser() {
        var db = getDb();
        return db[userSelect.value];
    }

    function updateCurrentUser(mutator) {
        var db = getDb();
        var user = db[userSelect.value];
        if (!user) return;
        mutator(user);
        saveDb(db);
    }

    function populateUserSelect() {
        var db = getDb();
        var emails = Object.keys(db);
        var previouslySelected = userSelect.value;
        userSelect.innerHTML = emails.map(function (email) {
            return '<option value="' + email + '">' + (db[email].name || email) + ' (' + email + ')</option>';
        }).join('');
        if (emails.indexOf(previouslySelected) !== -1) {
            userSelect.value = previouslySelected;
        }
    }

    function renderAll() {
        renderAccounts();
        renderBeneficiaries();
    }

    function renderAccounts() {
        var user = currentUser();
        if (!user || !user.accounts || !user.accounts.length) {
            accountsPanel.innerHTML = '<div class="db-empty">No accounts for this user yet. Use "Add account" above to create one.</div>';
            return;
        }
        accountsPanel.innerHTML = user.accounts.map(function (acc, accIndex) {
            var isOpen = !!openTransactionAccountIds[acc.id];
            var txRows = (acc.transactions || []).map(function (tx, txIndex) {
                return '<tr>' +
                    '<td><input type="text" data-field="date" data-acc="' + accIndex + '" data-tx="' + txIndex + '" value="' + escapeAttr(tx.date) + '"></td>' +
                    '<td><select data-field="type" data-acc="' + accIndex + '" data-tx="' + txIndex + '">' +
                        '<option value="Debit" ' + (tx.type === 'Debit' ? 'selected' : '') + '>Debit</option>' +
                        '<option value="Credit" ' + (tx.type === 'Credit' ? 'selected' : '') + '>Credit</option>' +
                    '</select></td>' +
                    '<td><input type="text" data-field="reference" data-acc="' + accIndex + '" data-tx="' + txIndex + '" value="' + escapeAttr(tx.reference) + '"></td>' +
                    '<td><input type="number" step="0.01" data-field="amount" data-acc="' + accIndex + '" data-tx="' + txIndex + '" value="' + tx.amount + '"></td>' +
                    '<td><input type="number" step="0.01" data-field="fees" data-acc="' + accIndex + '" data-tx="' + txIndex + '" value="' + tx.fees + '"></td>' +
                    '<td><input type="number" step="0.01" data-field="balance" data-acc="' + accIndex + '" data-tx="' + txIndex + '" value="' + tx.balance + '"></td>' +
                    '<td><button class="db-btn db-btn-danger db-btn-small" data-action="delete-tx" data-acc="' + accIndex + '" data-tx="' + txIndex + '">Delete</button></td>' +
                    '</tr>';
            }).join('');

            return '<div class="db-account-block">' +
                '<div class="db-account-summary" data-action="toggle-tx" data-acc="' + accIndex + '">' +
                    '<div class="db-account-summary-info">' +
                        '<span class="name">' + escapeHtml(acc.name) + ' &middot; ' + escapeHtml(acc.number) + '</span>' +
                        '<span class="sub">' + escapeHtml(acc.type) + ' &middot; ' + (acc.transactions || []).length + ' transaction(s) &middot; click to ' + (isOpen ? 'collapse' : 'expand') + '</span>' +
                    '</div>' +
                    '<span class="db-account-balance">R ' + Number(acc.balance).toFixed(2) + '</span>' +
                '</div>' +
                '<div class="db-transactions-area ' + (isOpen ? 'open' : '') + '">' +
                    '<div class="db-table-wrap">' +
                    '<table class="db-table">' +
                        '<tr><th>Name</th><td colspan="2"><input type="text" data-field="name" data-acc="' + accIndex + '" value="' + escapeAttr(acc.name) + '"></td>' +
                        '<th>Number</th><td colspan="2"><input type="text" data-field="number" data-acc="' + accIndex + '" value="' + escapeAttr(acc.number) + '"></td></tr>' +
                        '<tr><th>Balance</th><td colspan="2"><input type="number" step="0.01" data-field="balance" data-acc="' + accIndex + '" value="' + acc.balance + '"></td>' +
                        '<th>Available</th><td colspan="2"><input type="number" step="0.01" data-field="available" data-acc="' + accIndex + '" value="' + acc.available + '"></td></tr>' +
                    '</table>' +
                    '</div>' +
                    '<h3 style="font-size:0.85rem; margin:14px 0 8px; color:#384252;">Transactions</h3>' +
                    '<div class="db-table-wrap">' +
                    '<table class="db-table">' +
                        '<thead><tr><th>Date</th><th>Type</th><th>Reference</th><th>Amount</th><th>Fees</th><th>Balance</th><th></th></tr></thead>' +
                        '<tbody>' + (txRows || '<tr><td colspan="7" class="db-empty">No transactions yet.</td></tr>') + '</tbody>' +
                    '</table>' +
                    '</div>' +
                    '<div style="margin-top:10px; display:flex; gap:8px; flex-wrap:wrap;">' +
                        '<button class="db-btn db-btn-small" data-action="add-tx" data-acc="' + accIndex + '">+ Add transaction</button>' +
                        '<button class="db-btn db-btn-danger db-btn-small" data-action="delete-account" data-acc="' + accIndex + '">Delete account</button>' +
                    '</div>' +
                '</div>' +
            '</div>';
        }).join('');
    }

    function renderBeneficiaries() {
        var user = currentUser();
        if (!user || !user.beneficiaries || !user.beneficiaries.length) {
            beneficiariesPanel.innerHTML = '<div class="db-empty">No beneficiaries yet. Use "Add beneficiary" above to create one.</div>';
            return;
        }
        beneficiariesPanel.innerHTML =
            '<div class="db-table-wrap"><table class="db-table">' +
            '<thead><tr><th>Name</th><th>Nickname</th><th>Account number</th><th>Bank</th><th>Default</th><th></th></tr></thead>' +
            '<tbody>' +
            user.beneficiaries.map(function (b, i) {
                return '<tr>' +
                    '<td><input type="text" data-field="name" data-ben="' + i + '" value="' + escapeAttr(b.name) + '"></td>' +
                    '<td><input type="text" data-field="nickname" data-ben="' + i + '" value="' + escapeAttr(b.nickname || '') + '"></td>' +
                    '<td><input type="text" data-field="accountNumber" data-ben="' + i + '" value="' + escapeAttr(b.accountNumber) + '"></td>' +
                    '<td><input type="text" data-field="bank" data-ben="' + i + '" value="' + escapeAttr(b.bank) + '"></td>' +
                    '<td>' + (b.isDefault ? '<span class="db-badge">Default</span>' : '') + '</td>' +
                    '<td>' + (b.isDefault
                        ? '<span style="color:#8a94a3; font-size:0.78rem;">Protected</span>'
                        : '<button class="db-btn db-btn-danger db-btn-small" data-action="delete-ben" data-ben="' + i + '">Delete</button>') +
                    '</td>' +
                '</tr>';
            }).join('') +
            '</tbody></table></div>';
    }

    function escapeHtml(str) {
        return String(str == null ? '' : str).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    function escapeAttr(str) {
        return escapeHtml(str);
    }

    accountsPanel.addEventListener('click', function (e) {
        var toggle = e.target.closest('[data-action="toggle-tx"]');
        if (toggle) {
            var user = currentUser();
            var acc = user.accounts[Number(toggle.dataset.acc)];
            openTransactionAccountIds[acc.id] = !openTransactionAccountIds[acc.id];
            renderAccounts();
            return;
        }

        var addTx = e.target.closest('[data-action="add-tx"]');
        if (addTx) {
            var accIndex = Number(addTx.dataset.acc);
            updateCurrentUser(function (user) {
                var acc = user.accounts[accIndex];
                if (!acc.transactions) acc.transactions = [];
                acc.transactions.unshift({
                    id: 'txn_' + Date.now(),
                    date: new Date().toDateString(),
                    type: 'Debit',
                    reference: 'New transaction',
                    amount: 0,
                    fees: 0,
                    balance: acc.balance
                });
                openTransactionAccountIds[acc.id] = true;
            });
            renderAccounts();
            showToast('Transaction added');
            return;
        }

        var delTx = e.target.closest('[data-action="delete-tx"]');
        if (delTx) {
            var accIndex2 = Number(delTx.dataset.acc);
            var txIndex = Number(delTx.dataset.tx);
            updateCurrentUser(function (user) {
                user.accounts[accIndex2].transactions.splice(txIndex, 1);
            });
            renderAccounts();
            showToast('Transaction deleted');
            return;
        }

        var delAcc = e.target.closest('[data-action="delete-account"]');
        if (delAcc) {
            if (!confirm('Delete this account and all its transactions?')) return;
            var accIndex3 = Number(delAcc.dataset.acc);
            updateCurrentUser(function (user) {
                user.accounts.splice(accIndex3, 1);
            });
            renderAccounts();
            showToast('Account deleted');
        }
    });

    accountsPanel.addEventListener('change', function (e) {
        var field = e.target.dataset.field;
        if (!field) return;
        var accIndex = Number(e.target.dataset.acc);
        var txIndex = e.target.dataset.tx;
        var value = e.target.type === 'number' ? Number(e.target.value) : e.target.value;
        updateCurrentUser(function (user) {
            if (txIndex !== undefined && txIndex !== '') {
                user.accounts[accIndex].transactions[Number(txIndex)][field] = value;
            } else {
                user.accounts[accIndex][field] = value;
            }
        });
        renderAccounts();
        showToast('Saved');
    });

    beneficiariesPanel.addEventListener('click', function (e) {
        var delBen = e.target.closest('[data-action="delete-ben"]');
        if (delBen) {
            var index = Number(delBen.dataset.ben);
            updateCurrentUser(function (user) {
                if (user.beneficiaries[index] && user.beneficiaries[index].isDefault) {
                    alert('This is a default beneficiary and cannot be removed.');
                    return;
                }
                user.beneficiaries.splice(index, 1);
            });
            renderBeneficiaries();
            showToast('Beneficiary deleted');
        }
    });

    beneficiariesPanel.addEventListener('change', function (e) {
        var field = e.target.dataset.field;
        if (!field) return;
        var index = Number(e.target.dataset.ben);
        updateCurrentUser(function (user) {
            user.beneficiaries[index][field] = e.target.value;
        });
        renderBeneficiaries();
        showToast('Saved');
    });

    document.getElementById('db-add-account').addEventListener('click', function () {
        updateCurrentUser(function (user) {
            if (!user.accounts) user.accounts = [];
            user.accounts.push({
                id: 'acc_' + Date.now(),
                name: 'New Account',
                number: String(Math.floor(1000000000 + Math.random() * 8999999999)),
                balance: 0,
                available: 0,
                type: 'transaction',
                status: 'active',
                overdraft: 0,
                features: [],
                lastUpdated: new Date().toISOString(),
                transactions: []
            });
        });
        renderAccounts();
        showToast('Account added');
    });

    document.getElementById('db-add-beneficiary').addEventListener('click', function () {
        updateCurrentUser(function (user) {
            if (!user.beneficiaries) user.beneficiaries = [];
            user.beneficiaries.push({
                id: 'ben_' + Date.now(),
                name: 'New Beneficiary',
                accountNumber: '0000000000',
                bank: 'Standard Bank',
                nickname: 'New Beneficiary'
            });
        });
        renderBeneficiaries();
        showToast('Beneficiary added');
    });

    document.getElementById('db-export').addEventListener('click', function () {
        var user = currentUser();
        if (!user) return;
        var rows = [['section', 'field1', 'field2', 'field3', 'field4', 'field5', 'field6']];
        (user.accounts || []).forEach(function (acc) {
            rows.push(['account', acc.name, acc.number, acc.balance, acc.available, acc.type, acc.status]);
            (acc.transactions || []).forEach(function (tx) {
                rows.push(['transaction:' + acc.number, tx.date, tx.type, tx.reference, tx.amount, tx.fees, tx.balance]);
            });
        });
        (user.beneficiaries || []).forEach(function (b) {
            rows.push(['beneficiary', b.name, b.nickname || '', b.accountNumber, b.bank, b.isDefault ? 'default' : '', '']);
        });
        var csv = rows.map(function (row) {
            return row.map(csvEscape).join(',');
        }).join('\n');
        var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        var link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = (user.email || 'user') + '-database-export.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast('Exported to CSV');
    });

    function csvEscape(value) {
        var str = String(value == null ? '' : value);
        if (/[",\n]/.test(str)) {
            return '"' + str.replace(/"/g, '""') + '"';
        }
        return str;
    }

    userSelect.addEventListener('change', renderAll);

    populateUserSelect();
    renderAll();
});
