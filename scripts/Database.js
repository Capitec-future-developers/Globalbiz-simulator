document.addEventListener('DOMContentLoaded', function () {
    const userSelect = document.getElementById('db-user-select');
    const accountsPanel = document.getElementById('db-accounts-panel');
    const beneficiariesPanel = document.getElementById('db-beneficiaries-panel');
    const nlAccountsPanel = document.getElementById('db-nl-accounts-panel');
    const statsPanel = document.getElementById('db-stats');
    const accountCount = document.getElementById('db-account-count');
    const beneficiaryCount = document.getElementById('db-beneficiary-count');
    const searchInput = document.getElementById('db-search');
    const toast = document.getElementById('db-toast');

    const openAccounts = {};

    function getDb() {
        try {
            return JSON.parse(localStorage.getItem('userDatabase') || '{}');
        } catch (error) {
            showToast('Database could not be loaded');
            return {};
        }
    }

    function saveDb(db) {
        localStorage.setItem('userDatabase', JSON.stringify(db));
    }

    function getUser() {
        const db = getDb();
        return db[userSelect.value];
    }

    function updateUser(callback) {
        const db = getDb();
        const user = db[userSelect.value];

        if (!user) {
            showToast('No user selected');
            return;
        }

        callback(user);
        saveDb(db);
    }

    function showToast(message) {
        toast.textContent = message;
        toast.classList.add('show');

        clearTimeout(showToast.timer);

        showToast.timer = setTimeout(function () {
            toast.classList.remove('show');
        }, 2200);
    }

    function escapeHtml(value) {
        return String(value ?? '').replace(/[&<>"']/g, function (char) {
            return {
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                '"': '&quot;',
                "'": '&#39;'
            }[char];
        });
    }

    function escapeAttr(value) {
        return escapeHtml(value);
    }

    function formatMoney(value) {
        return Number(value || 0).toLocaleString('en-ZA', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    function getSearchTerm() {
        return searchInput.value.trim().toLowerCase();
    }

    function matchesSearch(values) {
        const search = getSearchTerm();

        if (!search) {
            return true;
        }

        return values.some(function (value) {
            return String(value ?? '').toLowerCase().includes(search);
        });
    }

    function populateUsers() {
        const db = getDb();
        const users = Object.keys(db).filter(function (email) {
            const user = db[email];

            if (
                user &&
                user.email &&
                user.email !== email &&
                db[user.email]
            ) {
                return false;
            }

            return true;
        });
        const selected = userSelect.value;
        const activeEmail = localStorage.getItem('activeUserEmail');

        userSelect.innerHTML = users.map(function (email) {
            const user = db[email];

            return `
                <option value="${escapeAttr(email)}">
                    ${escapeHtml(user.name || email)} (${escapeHtml(email)})
                </option>
            `;
        }).join('');

        if (users.includes(selected)) {
            userSelect.value = selected;
        } else if (users.includes(activeEmail)) {
            userSelect.value = activeEmail;
        }
    }

    function renderStats() {
        const user = getUser();

        if (!user) {
            statsPanel.innerHTML = '';
            return;
        }

        const accounts = user.accounts || [];
        const beneficiaries = user.beneficiaries || [];

        const transactionCount = accounts.reduce(function (total, account) {
            return total + (account.transactions || []).length;
        }, 0);

        const totalBalance = accounts.reduce(function (total, account) {
            return total + Number(account.balance || 0);
        }, 0);

        const totalAvailable = accounts.reduce(function (total, account) {
            return total + Number(account.available || 0);
        }, 0);

        statsPanel.innerHTML = `
            <div class="db-stat">
                <span class="material-icons-sharp">account_balance</span>
                <div>
                    <strong>${accounts.length}</strong>
                    <span>Accounts</span>
                </div>
            </div>

            <div class="db-stat">
                <span class="material-icons-sharp">receipt_long</span>
                <div>
                    <strong>${transactionCount}</strong>
                    <span>Transactions</span>
                </div>
            </div>

            <div class="db-stat">
                <span class="material-icons-sharp">people</span>
                <div>
                    <strong>${beneficiaries.length}</strong>
                    <span>Beneficiaries</span>
                </div>
            </div>

            <div class="db-stat">
                <span class="material-icons-sharp">account_balance_wallet</span>
                <div>
                    <strong>R ${formatMoney(totalBalance)}</strong>
                    <span>Total balance</span>
                </div>
            </div>

            <div class="db-stat">
                <span class="material-icons-sharp">payments</span>
                <div>
                    <strong>R ${formatMoney(totalAvailable)}</strong>
                    <span>Total available</span>
                </div>
            </div>
        `;
    }

    function renderNlAccounts() {
        if (!window.NLAccountStore) {
            nlAccountsPanel.innerHTML = `
                <div class="db-empty">
                    NLAccountStore is not loaded.
                </div>
            `;
            return;
        }

        const balances = NLAccountStore.getBalances();

        const accountDefinitions = [
            {
                id: 'transactional',
                name: 'Current Account',
                type: 'Transaction'
            },
            {
                id: 'notice32',
                name: 'Notice 32 Savings',
                type: 'Savings'
            },
            {
                id: 'flexible',
                name: 'Flexible Savings',
                type: 'Savings'
            },
            {
                id: 'credit',
                name: 'Credit Account',
                type: 'Credit'
            }
        ];

        nlAccountsPanel.innerHTML = accountDefinitions.map(function (definition) {
            const account = balances[definition.id];

            if (!account) {
                return '';
            }

            return `
                <div class="db-live-account">

                    <div class="db-live-account-header">
                        <div>
                            <strong>${escapeHtml(definition.name)}</strong>
                            <span>${escapeHtml(definition.type)}</span>
                        </div>

                        <strong class="db-live-balance">
                            R ${formatMoney(account.available)}
                        </strong>
                    </div>

                    <div class="db-live-account-grid">

                        <label>
                            Available
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                data-nl-field="available"
                                data-nl-id="${definition.id}"
                                value="${Number(account.available || 0).toFixed(2)}"
                            >
                        </label>

                        <label>
                            Balance
                            <input
                                type="number"
                                step="0.01"
                                data-nl-field="balance"
                                data-nl-id="${definition.id}"
                                value="${Number(account.balance || 0).toFixed(2)}"
                            >
                        </label>

                        <label>
                            Amount to add
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="0.00"
                                data-add-amount="${definition.id}"
                            >
                        </label>

                        <label>
                            Amount to remove
                            <input
                                type="number"
                                step="0.01"
                                min="0"
                                placeholder="0.00"
                                data-remove-amount="${definition.id}"
                            >
                        </label>

                    </div>

                    <div class="db-live-actions">

                        <button
                            class="db-btn db-btn-small"
                            data-action="add-nl-money"
                            data-nl-id="${definition.id}">
                            + Add money
                        </button>

                        <button
                            class="db-btn db-btn-danger db-btn-small"
                            data-action="remove-nl-money"
                            data-nl-id="${definition.id}">
                            − Remove money
                        </button>

                        <button
                            class="db-btn db-btn-small"
                            data-action="refresh-nl-account"
                            data-nl-id="${definition.id}">
                            Refresh
                        </button>

                    </div>

                    <div class="db-live-transactions">

                        <strong>Recent transactions</strong>

                        ${
                (account.transactions || [])
                    .slice(0, 5)
                    .map(function (tx) {
                        return `
                                        <div class="db-live-transaction">

                                            <span>
                                                ${escapeHtml(tx.name || 'Transaction')}
                                                <small>
                                                    ${escapeHtml(tx.date || '')}
                                                </small>
                                            </span>

                                            <strong class="${Number(tx.amount) < 0 ? 'negative' : 'positive'}">
                                                ${Number(tx.amount) >= 0 ? '+' : ''}
                                                R ${formatMoney(tx.amount)}
                                            </strong>

                                        </div>
                                    `;
                    })
                    .join('')
                || '<span class="db-muted">No transactions</span>'
            }

                    </div>

                </div>
            `;
        }).join('');
    }

    function renderAccounts() {
        const user = getUser();

        if (!user || !user.accounts || !user.accounts.length) {
            accountsPanel.innerHTML = `
                <div class="db-empty">
                    No accounts for this user yet.
                </div>
            `;

            accountCount.textContent = '0 accounts';
            return;
        }

        const accounts = user.accounts.filter(function (account) {
            return matchesSearch([
                account.name,
                account.number,
                account.type,
                account.status
            ]) || (account.transactions || []).some(function (tx) {
                return matchesSearch([
                    tx.date,
                    tx.type,
                    tx.reference,
                    tx.amount
                ]);
            });
        });

        accountCount.textContent =
            `${accounts.length} of ${user.accounts.length} accounts`;

        if (!accounts.length) {
            accountsPanel.innerHTML = `
                <div class="db-empty">
                    No accounts match your search.
                </div>
            `;
            return;
        }

        accountsPanel.innerHTML = accounts.map(function (acc) {
            const realIndex = user.accounts.indexOf(acc);
            const isOpen = !!openAccounts[acc.id];
            const transactions = acc.transactions || [];

            const filteredTransactions = transactions.filter(function (tx) {
                return matchesSearch([
                    tx.date,
                    tx.type,
                    tx.reference,
                    tx.amount,
                    tx.fees,
                    tx.balance
                ]);
            });

            const transactionRows = filteredTransactions.map(function (tx) {
                const txIndex = transactions.indexOf(tx);

                return `
                    <tr>

                        <td>
                            <input
                                type="date"
                                data-field="date"
                                data-acc="${realIndex}"
                                data-tx="${txIndex}"
                                value="${escapeAttr(formatDateInput(tx.date))}"
                            >
                        </td>

                        <td>
                            <select
                                data-field="type"
                                data-acc="${realIndex}"
                                data-tx="${txIndex}"
                            >
                                <option value="Debit" ${tx.type === 'Debit' ? 'selected' : ''}>
                                    Debit
                                </option>

                                <option value="Credit" ${tx.type === 'Credit' ? 'selected' : ''}>
                                    Credit
                                </option>

                                <option value="Payment" ${tx.type === 'Payment' ? 'selected' : ''}>
                                    Payment
                                </option>
                            </select>
                        </td>

                        <td>
                            <input
                                type="text"
                                data-field="reference"
                                data-acc="${realIndex}"
                                data-tx="${txIndex}"
                                value="${escapeAttr(tx.reference)}"
                            >
                        </td>

                        <td>
                            <input
                                type="number"
                                step="0.01"
                                data-field="amount"
                                data-acc="${realIndex}"
                                data-tx="${txIndex}"
                                value="${tx.amount || 0}"
                            >
                        </td>

                        <td>
                            <input
                                type="number"
                                step="0.01"
                                data-field="fees"
                                data-acc="${realIndex}"
                                data-tx="${txIndex}"
                                value="${tx.fees || 0}"
                            >
                        </td>

                        <td>
                            <input
                                type="number"
                                step="0.01"
                                data-field="balance"
                                data-acc="${realIndex}"
                                data-tx="${txIndex}"
                                value="${tx.balance || 0}"
                            >
                        </td>

                        <td>
                            <button
                                class="db-btn db-btn-danger db-btn-small"
                                data-action="delete-tx"
                                data-acc="${realIndex}"
                                data-tx="${txIndex}">
                                Delete
                            </button>
                        </td>

                    </tr>
                `;
            }).join('');

            return `
                <div class="db-account-block">

                    <div
                        class="db-account-summary"
                        data-action="toggle-tx"
                        data-acc="${realIndex}"
                    >

                        <div class="db-account-summary-info">

                            <span class="name">
                                ${escapeHtml(acc.name)}
                                &middot;
                                ${escapeHtml(acc.number)}
                            </span>

                            <span class="sub">
                                ${escapeHtml(acc.type || 'Account')}
                                &middot;
                                ${transactions.length}
                                transaction(s)
                                &middot;
                                ${escapeHtml(acc.status || 'active')}
                            </span>

                        </div>

                        <div class="db-account-balance">
                            R ${formatMoney(acc.balance)}
                        </div>

                    </div>

                    <div class="db-transactions-area ${isOpen ? 'open' : ''}">

                        <div class="db-account-fields">

                            <label>
                                Name
                                <input
                                    type="text"
                                    data-field="name"
                                    data-acc="${realIndex}"
                                    value="${escapeAttr(acc.name)}"
                                >
                            </label>

                            <label>
                                Account number
                                <input
                                    type="text"
                                    data-field="number"
                                    data-acc="${realIndex}"
                                    value="${escapeAttr(acc.number)}"
                                >
                            </label>

                            <label>
                                Type
                                <select
                                    data-field="type"
                                    data-acc="${realIndex}"
                                >
                                    <option value="transaction" ${acc.type === 'transaction' ? 'selected' : ''}>
                                        Transaction
                                    </option>

                                    <option value="savings" ${acc.type === 'savings' ? 'selected' : ''}>
                                        Savings
                                    </option>

                                    <option value="credit" ${acc.type === 'credit' ? 'selected' : ''}>
                                        Credit
                                    </option>

                                    <option value="loan" ${acc.type === 'loan' ? 'selected' : ''}>
                                        Loan
                                    </option>

                                    <option value="business" ${acc.type === 'business' ? 'selected' : ''}>
                                        Business
                                    </option>

                                    <option value="investment" ${acc.type === 'investment' ? 'selected' : ''}>
                                        Investment
                                    </option>
                                </select>
                            </label>

                            <label>
                                Status
                                <select
                                    data-field="status"
                                    data-acc="${realIndex}"
                                >
                                    <option value="active" ${acc.status === 'active' ? 'selected' : ''}>
                                        Active
                                    </option>

                                    <option value="inactive" ${acc.status === 'inactive' ? 'selected' : ''}>
                                        Inactive
                                    </option>

                                    <option value="blocked" ${acc.status === 'blocked' ? 'selected' : ''}>
                                        Blocked
                                    </option>
                                </select>
                            </label>

                            <label>
                                Balance
                                <input
                                    type="number"
                                    step="0.01"
                                    data-field="balance"
                                    data-acc="${realIndex}"
                                    value="${acc.balance || 0}"
                                >
                            </label>

                            <label>
                                Available
                                <input
                                    type="number"
                                    step="0.01"
                                    data-field="available"
                                    data-acc="${realIndex}"
                                    value="${acc.available || 0}"
                                >
                            </label>

                        </div>

                        <h3 class="db-section-title">
                            Transactions
                        </h3>

                        <div class="db-table-wrap">

                            <table class="db-table">

                                <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Type</th>
                                        <th>Reference</th>
                                        <th>Amount</th>
                                        <th>Fees</th>
                                        <th>Balance</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    ${
                transactionRows ||
                `
                                            <tr>
                                                <td colspan="7" class="db-empty">
                                                    No transactions found.
                                                </td>
                                            </tr>
                                        `
            }
                                </tbody>

                            </table>

                        </div>

                        <div class="db-account-actions">

                            <button
                                class="db-btn db-btn-small"
                                data-action="add-tx"
                                data-acc="${realIndex}">
                                + Add transaction
                            </button>

                            <button
                                class="db-btn db-btn-small"
                                data-action="recalculate"
                                data-acc="${realIndex}">
                                Recalculate balance
                            </button>

                            <button
                                class="db-btn db-btn-danger db-btn-small"
                                data-action="delete-account"
                                data-acc="${realIndex}">
                                Delete account
                            </button>

                        </div>

                    </div>

                </div>
            `;
        }).join('');
    }

    function renderBeneficiaries() {
        const user = getUser();

        if (!user || !user.beneficiaries || !user.beneficiaries.length) {
            beneficiariesPanel.innerHTML = `
                <div class="db-empty">
                    No beneficiaries for this user yet.
                </div>
            `;

            beneficiaryCount.textContent = '0 beneficiaries';
            return;
        }

        const beneficiaries = user.beneficiaries.filter(function (beneficiary) {
            return matchesSearch([
                beneficiary.name,
                beneficiary.nickname,
                beneficiary.accountNumber,
                beneficiary.bank
            ]);
        });

        beneficiaryCount.textContent =
            `${beneficiaries.length} of ${user.beneficiaries.length} beneficiaries`;

        if (!beneficiaries.length) {
            beneficiariesPanel.innerHTML = `
                <div class="db-empty">
                    No beneficiaries match your search.
                </div>
            `;
            return;
        }

        beneficiariesPanel.innerHTML = `
            <div class="db-table-wrap">

                <table class="db-table">

                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Nickname</th>
                            <th>Account number</th>
                            <th>Bank</th>
                            <th>Default</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>

                        ${beneficiaries.map(function (beneficiary) {
            const index = user.beneficiaries.indexOf(beneficiary);

            return `
                                <tr>

                                    <td>
                                        <input
                                            type="text"
                                            data-field="name"
                                            data-ben="${index}"
                                            value="${escapeAttr(beneficiary.name)}"
                                        >
                                    </td>

                                    <td>
                                        <input
                                            type="text"
                                            data-field="nickname"
                                            data-ben="${index}"
                                            value="${escapeAttr(beneficiary.nickname || '')}"
                                        >
                                    </td>

                                    <td>
                                        <input
                                            type="text"
                                            data-field="accountNumber"
                                            data-ben="${index}"
                                            value="${escapeAttr(beneficiary.accountNumber)}"
                                        >
                                    </td>

                                    <td>
                                        <input
                                            type="text"
                                            data-field="bank"
                                            data-ben="${index}"
                                            value="${escapeAttr(beneficiary.bank)}"
                                        >
                                    </td>

                                    <td>
                                        ${
                beneficiary.isDefault
                    ? '<span class="db-badge">Default</span>'
                    : '<span class="db-muted">Custom</span>'
            }
                                    </td>

                                    <td>
                                        ${
                beneficiary.isDefault
                    ? '<span class="db-protected">Protected</span>'
                    : `
                                                    <button
                                                        class="db-btn db-btn-danger db-btn-small"
                                                        data-action="delete-ben"
                                                        data-ben="${index}">
                                                        Delete
                                                    </button>
                                                `
            }
                                    </td>

                                </tr>
                            `;
        }).join('')}

                    </tbody>

                </table>

            </div>
        `;
    }

    function renderAll() {
        populateUsers();
        renderStats();
        renderNlAccounts();
        renderAccounts();
        renderBeneficiaries();
    }

    function formatDateInput(value) {
        if (!value) {
            return new Date().toISOString().split('T')[0];
        }

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return new Date().toISOString().split('T')[0];
        }

        return date.toISOString().split('T')[0];
    }

    function addTransaction(account) {
        if (!account.transactions) {
            account.transactions = [];
        }

        account.transactions.unshift({
            id: 'txn_' + Date.now(),
            date: new Date().toISOString().split('T')[0],
            type: 'Debit',
            reference: 'New transaction',
            amount: 0,
            fees: 0,
            balance: Number(account.balance || 0)
        });
    }

    function recalculateAccount(account) {
        let balance = Number(account.balance || 0);

        const transactions = [
            ...(account.transactions || [])
        ].reverse();

        transactions.forEach(function (tx) {
            const amount = Number(tx.amount || 0);
            const fees = Number(tx.fees || 0);

            if (amount < 0 || fees < 0) {
                balance += amount + fees;
            } else if (tx.type === 'Credit') {
                balance += amount;
            } else {
                balance -= amount + fees;
            }

            tx.balance = Number(balance.toFixed(2));
        });

        account.balance = Number(balance.toFixed(2));
        account.available = Number(balance.toFixed(2));
    }

    nlAccountsPanel.addEventListener('click', function (event) {
        const button = event.target.closest('[data-action]');

        if (!button || !window.NLAccountStore) {
            return;
        }

        const id = button.dataset.nlId;
        const action = button.dataset.action;

        if (action === 'add-nl-money') {
            const input = nlAccountsPanel.querySelector(
                `[data-add-amount="${id}"]`
            );

            const amount = Number(input ? input.value : 0);

            if (!Number.isFinite(amount) || amount <= 0) {
                showToast('Enter an amount to add');
                return;
            }

            NLAccountStore.adjust(
                id,
                amount,
                'Database deposit'
            );

            renderNlAccounts();
            showToast('Money added');
            return;
        }

        if (action === 'remove-nl-money') {
            const input = nlAccountsPanel.querySelector(
                `[data-remove-amount="${id}"]`
            );

            const amount = Number(input ? input.value : 0);

            if (!Number.isFinite(amount) || amount <= 0) {
                showToast('Enter an amount to remove');
                return;
            }

            NLAccountStore.adjust(
                id,
                -amount,
                'Database withdrawal'
            );

            renderNlAccounts();
            showToast('Money removed');
            return;
        }

        if (action === 'refresh-nl-account') {
            renderNlAccounts();
            showToast('Account refreshed');
        }
    });

    nlAccountsPanel.addEventListener('change', function (event) {
        const field = event.target.dataset.nlField;
        const id = event.target.dataset.nlId;

        if (!field || !id || !window.NLAccountStore) {
            return;
        }

        const value = Number(event.target.value);

        if (!Number.isFinite(value)) {
            showToast('Enter a valid amount');
            renderNlAccounts();
            return;
        }

        const balances = NLAccountStore.getBalances();

        if (!balances[id]) {
            return;
        }

        const oldValue = Number(
            balances[id][field] || 0
        );

        const difference = Number(
            (value - oldValue).toFixed(2)
        );

        balances[id][field] = Number(value.toFixed(2));

        if (field === 'available') {
            balances[id].balance = Number(
                (balances[id].balance + difference).toFixed(2)
            );
        }

        if (difference !== 0) {
            balances[id].transactions.unshift({
                id: 'txn_' + Date.now(),
                date: new Date().toISOString().split('T')[0],
                name: 'Database balance adjustment',
                amount: difference
            });
        }

        NLAccountStore.setBalances(balances);

        renderNlAccounts();
        showToast('Balance updated');
    });

    accountsPanel.addEventListener('click', function (event) {
        const toggle = event.target.closest(
            '[data-action="toggle-tx"]'
        );

        if (toggle) {
            const user = getUser();

            const account =
                user.accounts[Number(toggle.dataset.acc)];

            if (!account) {
                return;
            }

            openAccounts[account.id] =
                !openAccounts[account.id];

            renderAccounts();
            return;
        }

        const addTx = event.target.closest(
            '[data-action="add-tx"]'
        );

        if (addTx) {
            updateUser(function (user) {
                const account =
                    user.accounts[Number(addTx.dataset.acc)];

                if (account) {
                    addTransaction(account);
                    openAccounts[account.id] = true;
                }
            });

            renderAll();
            showToast('Transaction added');
            return;
        }

        const recalculate = event.target.closest(
            '[data-action="recalculate"]'
        );

        if (recalculate) {
            updateUser(function (user) {
                const account =
                    user.accounts[Number(recalculate.dataset.acc)];

                if (account) {
                    recalculateAccount(account);
                }
            });

            renderAll();
            showToast('Balance recalculated');
            return;
        }

        const deleteTx = event.target.closest(
            '[data-action="delete-tx"]'
        );

        if (deleteTx) {
            if (!confirm('Delete this transaction?')) {
                return;
            }

            updateUser(function (user) {
                const account =
                    user.accounts[Number(deleteTx.dataset.acc)];

                if (
                    account &&
                    account.transactions
                ) {
                    account.transactions.splice(
                        Number(deleteTx.dataset.tx),
                        1
                    );
                }
            });

            renderAll();
            showToast('Transaction deleted');
            return;
        }

        const deleteAccount = event.target.closest(
            '[data-action="delete-account"]'
        );

        if (deleteAccount) {
            if (!confirm(
                'Delete this account and all its transactions?'
            )) {
                return;
            }

            updateUser(function (user) {
                user.accounts.splice(
                    Number(deleteAccount.dataset.acc),
                    1
                );
            });

            renderAll();
            showToast('Account deleted');
        }
    });

    accountsPanel.addEventListener('change', function (event) {
        const field = event.target.dataset.field;

        if (!field) {
            return;
        }

        const accountIndex =
            Number(event.target.dataset.acc);

        const transactionIndex =
            event.target.dataset.tx;

        const value =
            event.target.type === 'number'
                ? Number(event.target.value || 0)
                : event.target.value;

        updateUser(function (user) {
            const account =
                user.accounts[accountIndex];

            if (!account) {
                return;
            }

            if (transactionIndex !== undefined) {
                const transaction =
                    account.transactions[
                        Number(transactionIndex)
                        ];

                if (transaction) {
                    transaction[field] = value;
                }
            } else {
                account[field] = value;
            }

            account.lastUpdated =
                new Date().toISOString();
        });

        renderAll();
        showToast('Saved');
    });

    beneficiariesPanel.addEventListener('click', function (event) {
        const deleteButton = event.target.closest(
            '[data-action="delete-ben"]'
        );

        if (!deleteButton) {
            return;
        }

        const index =
            Number(deleteButton.dataset.ben);

        if (!confirm('Delete this beneficiary?')) {
            return;
        }

        updateUser(function (user) {
            const beneficiary =
                user.beneficiaries[index];

            if (!beneficiary || beneficiary.isDefault) {
                alert('This beneficiary is protected.');
                return;
            }

            user.beneficiaries.splice(index, 1);
        });

        renderAll();
        showToast('Beneficiary deleted');
    });

    beneficiariesPanel.addEventListener('change', function (event) {
        const field = event.target.dataset.field;

        if (!field) {
            return;
        }

        const index =
            Number(event.target.dataset.ben);

        updateUser(function (user) {
            if (user.beneficiaries[index]) {
                user.beneficiaries[index][field] =
                    event.target.value;
            }
        });

        renderAll();
        showToast('Beneficiary saved');
    });

    document
        .getElementById('db-add-account')
        .addEventListener('click', function () {
            updateUser(function (user) {
                if (!user.accounts) {
                    user.accounts = [];
                }

                const account = {
                    id: 'acc_' + Date.now(),
                    name: 'New Account',
                    number: String(
                        Math.floor(
                            1000000000 +
                            Math.random() * 8999999999
                        )
                    ),
                    balance: 0,
                    available: 0,
                    type: 'transaction',
                    status: 'active',
                    overdraft: 0,
                    features: [],
                    lastUpdated: new Date().toISOString(),
                    transactions: []
                };

                user.accounts.push(account);
                openAccounts[account.id] = true;
            });

            renderAll();
            showToast('Account added');
        });

    document
        .getElementById('db-add-beneficiary')
        .addEventListener('click', function () {
            updateUser(function (user) {
                if (!user.beneficiaries) {
                    user.beneficiaries = [];
                }

                user.beneficiaries.push({
                    id: 'ben_' + Date.now(),
                    name: 'New Beneficiary',
                    accountNumber: '0000000000',
                    bank: 'Standard Bank',
                    nickname: 'New Beneficiary',
                    isDefault: false
                });
            });

            renderAll();
            showToast('Beneficiary added');
        });

    document
        .getElementById('db-refresh')
        .addEventListener('click', function () {
            renderAll();
            showToast('Database refreshed');
        });

    searchInput.addEventListener('input', function () {
        renderAccounts();
        renderBeneficiaries();
    });

    userSelect.addEventListener('change', function () {
        searchInput.value = '';
        renderAll();
    });

    document
        .getElementById('db-export')
        .addEventListener('click', function () {
            const user = getUser();

            if (!user) {
                return;
            }

            const rows = [
                [
                    'section',
                    'field1',
                    'field2',
                    'field3',
                    'field4',
                    'field5',
                    'field6'
                ]
            ];

            (user.accounts || []).forEach(function (account) {
                rows.push([
                    'account',
                    account.name,
                    account.number,
                    account.balance,
                    account.available,
                    account.type,
                    account.status
                ]);

                (account.transactions || []).forEach(function (tx) {
                    rows.push([
                        'transaction:' + account.number,
                        tx.date,
                        tx.type,
                        tx.reference,
                        tx.amount,
                        tx.fees,
                        tx.balance
                    ]);
                });
            });

            (user.beneficiaries || []).forEach(function (beneficiary) {
                rows.push([
                    'beneficiary',
                    beneficiary.name,
                    beneficiary.nickname || '',
                    beneficiary.accountNumber,
                    beneficiary.bank,
                    beneficiary.isDefault ? 'default' : '',
                    ''
                ]);
            });

            const csv = rows
                .map(function (row) {
                    return row.map(csvEscape).join(',');
                })
                .join('\n');

            downloadFile(
                csv,
                `${user.email || 'user'}-database-export.csv`,
                'text/csv;charset=utf-8;'
            );

            showToast('CSV exported');
        });

    document
        .getElementById('db-backup')
        .addEventListener('click', function () {
            const db = getDb();

            downloadFile(
                JSON.stringify(db, null, 2),
                'globalbiz-database-backup.json',
                'application/json'
            );

            showToast('Database backup created');
        });

    document
        .getElementById('db-import')
        .addEventListener('change', function (event) {
            const file = event.target.files[0];

            if (!file) {
                return;
            }

            const reader = new FileReader();

            reader.onload = function (e) {
                try {
                    const importedDb =
                        JSON.parse(e.target.result);

                    if (
                        !importedDb ||
                        typeof importedDb !== 'object' ||
                        Array.isArray(importedDb)
                    ) {
                        throw new Error('Invalid database');
                    }

                    if (!confirm(
                        'Import this database and replace the current data?'
                    )) {
                        event.target.value = '';
                        return;
                    }

                    saveDb(importedDb);
                    populateUsers();
                    renderAll();

                    showToast(
                        'Database imported successfully'
                    );

                } catch (error) {
                    alert(
                        'The selected file is not a valid GlobalBiz database backup.'
                    );
                }

                event.target.value = '';
            };

            reader.readAsText(file);
        });

    document
        .getElementById('db-clear-user')
        .addEventListener('click', function () {
            const db = getDb();
            const email = userSelect.value;

            if (!email || !db[email]) {
                return;
            }

            const user = db[email];

            if (!confirm(
                `Delete all accounts, transactions and beneficiaries for ${user.name || email}?`
            )) {
                return;
            }

            user.accounts = [];
            user.beneficiaries = [];

            saveDb(db);
            renderAll();

            showToast('User data cleared');
        });

    function csvEscape(value) {
        const stringValue = String(value ?? '');

        if (/[",\n]/.test(stringValue)) {
            return '"' +
                stringValue.replace(/"/g, '""') +
                '"';
        }

        return stringValue;
    }

    function downloadFile(content, filename, type) {
        const blob = new Blob(
            [content],
            { type: type }
        );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement('a');

        link.href = url;
        link.download = filename;

        document.body.appendChild(link);
        link.click();
        link.remove();

        URL.revokeObjectURL(url);
    }

    populateUsers();
    renderAll();
});