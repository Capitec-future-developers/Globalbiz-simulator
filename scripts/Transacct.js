document.addEventListener('DOMContentLoaded', function() {

// Initialize user database in localStorage if not exists
    function initializeUserDatabase() {
        if (!localStorage.getItem('userDatabase')) {
            const userDatabase = {
// User with just a transactional account
                'user1@example.com': {
                    id: 'usr_001',
                    name: 'Omphile Mohlala',
                    email: 'user1@example.com',
                    phone: '+27821234567',
                    profileImage: 'profile1.jpg',
                    accounts: [
                        {
                            id: 'acc_001',
                            name: 'Transactional Account',
                            number: '1052262644',
                            balance: -154.21,
                            available: 9845.79,
                            type: 'transaction',
                            status: 'active',
                            overdraft: 10000,
                            features: ['payments', 'debit_orders', 'card'],
                            lastUpdated: '2025-04-30T12:34:56Z',
                            transactions: [
                                {
                                    id: 'txn_001',
                                    date: '30 April 2025',
                                    type: 'Debit',
                                    reference: 'Month S/Fee',
                                    amount: 0.00,
                                    fees: -50.00,
                                    balance: -154.21
                                },
                                {
                                    id: 'txn_002',
                                    date: '30 April 2025',
                                    type: 'Debit',
                                    reference: 'Debit Interest',
                                    amount: -1.86,
                                    fees: 0.00,
                                    balance: -104.21
                                },
                                {
                                    id: 'txn_003',
                                    date: '28 April 2025',
                                    type: 'Debit',
                                    reference: 'POS Purchase',
                                    amount: -125.50,
                                    fees: 0.00,
                                    balance: -102.35
                                },
                                {
                                    id: 'txn_004',
                                    date: '25 April 2025',
                                    type: 'Credit',
                                    reference: 'Salary',
                                    amount: 12500.00,
                                    fees: 0.00,
                                    balance: 12397.65
                                },
                                {
                                    id: 'txn_005',
                                    date: '20 April 2025',
                                    type: 'Debit',
                                    reference: 'Online Payment',
                                    amount: -500.00,
                                    fees: -10.00,
                                    balance: -102.35
                                }
                            ]
                        }
                    ],
                    preferences: {
                        theme: 'light',
                        language: 'en',
                        defaultAccount: 'acc_001'
                    },
                    notifications: {
                        paymentAlerts: true,
                        lowBalance: true,
                        securityAlerts: true
                    },
                    security: {
                        lastLogin: new Date().toISOString(),
                        twoFactorEnabled: true
                    },
                    beneficiaries: [
                        {
                            id: 'ben_001',
                            name: 'Omphile Mohlala',
                            accountNumber: '1052265678',
                            bank: 'Standard Bank',
                            nickname: 'My Savings'
                        }
                    ]
                },

// User with multiple accounts
                'user2@example.com': {
                    id: 'usr_002',
                    name: 'John Doe',
                    email: 'user2@example.com',
                    phone: '+27827654321',
                    profileImage: 'profile2.jpg',
                    accounts: [
                        {
                            id: 'acc_002',
                            name: 'Cheque Account',
                            number: '1052262789',
                            balance: 12543.67,
                            available: 12543.67,
                            type: 'transaction',
                            status: 'active',
                            overdraft: 15000,
                            features: ['payments', 'debit_orders', 'card', 'investments'],
                            lastUpdated: '2025-05-15T09:12:34Z',
                            transactions: [
                                {
                                    id: 'txn_101',
                                    date: '15 May 2025',
                                    type: 'Debit',
                                    reference: 'Grocery Store',
                                    amount: -543.21,
                                    fees: 0.00,
                                    balance: 12543.67
                                },
                                {
                                    id: 'txn_102',
                                    date: '14 May 2025',
                                    type: 'Credit',
                                    reference: 'Client Payment',
                                    amount: 2000.00,
                                    fees: -10.00,
                                    balance: 13086.88
                                }
                            ]
                        },
                        {
                            id: 'acc_003',
                            name: 'Savings Account',
                            number: '1052262890',
                            balance: 87654.32,
                            available: 87654.32,
                            type: 'savings',
                            status: 'active',
                            interestRate: 3.5,
                            features: ['savings', 'withdrawals', 'fixed_deposits'],
                            lastUpdated: '2025-05-14T15:43:21Z',
                            transactions: [
                                {
                                    id: 'txn_201',
                                    date: '14 May 2025',
                                    type: 'Credit',
                                    reference: 'Interest Earned',
                                    amount: 255.67,
                                    fees: 0.00,
                                    balance: 87654.32
                                }
                            ]
                        },
                        {
                            id: 'acc_004',
                            name: 'Home Loan',
                            number: '1052262956',
                            balance: -1254300.00,
                            available: 0,
                            type: 'loan',
                            status: 'active',
                            interestRate: 7.25,
                            term: 240,
                            installment: 12543.21,
                            nextPayment: '2025-06-01',
                            features: ['payments', 'statements', 'balance_certificate'],
                            lastUpdated: '2025-05-15T10:23:45Z',
                            transactions: [
                                {
                                    id: 'txn_301',
                                    date: '1 May 2025',
                                    type: 'Payment',
                                    reference: 'Loan Installment',
                                    amount: -12543.21,
                                    fees: 0.00,
                                    balance: -1254300.00
                                }
                            ]
                        }
                    ],
                    preferences: {
                        theme: 'dark',
                        language: 'en',
                        defaultAccount: 'acc_002'
                    },
                    notifications: {
                        paymentAlerts: true,
                        lowBalance: false,
                        securityAlerts: true
                    },
                    security: {
                        lastLogin: new Date().toISOString(),
                        twoFactorEnabled: true
                    },
                    beneficiaries: [
                        {
                            id: 'ben_002',
                            name: 'Sarah Smith',
                            accountNumber: '1052269876',
                            bank: 'First National Bank',
                            nickname: 'Rent Payment'
                        }
                    ]
                },

// Business user with different account types
                'business@example.com': {
                    id: 'usr_003',
                    name: 'ABC Enterprises',
                    email: 'business@example.com',
                    phone: '+27824567890',
                    profileImage: 'profile3.jpg',
                    accounts: [
                        {
                            id: 'acc_005',
                            name: 'Business Account',
                            number: '1052263012',
                            balance: 234567.89,
                            available: 234567.89,
                            type: 'business',
                            status: 'active',
                            overdraft: 500000,
                            features: ['payments', 'bulk_payments', 'payroll', 'card'],
                            lastUpdated: '2025-05-15T11:34:56Z',
                            transactions: [
                                {
                                    id: 'txn_401',
                                    date: '15 May 2025',
                                    type: 'Credit',
                                    reference: 'Client Payment - XYZ Corp',
                                    amount: 50000.00,
                                    fees: -25.00,
                                    balance: 234567.89
                                }
                            ]
                        },
                        {
                            id: 'acc_006',
                            name: 'Business Loan',
                            number: '1052263123',
                            balance: -5000000.00,
                            available: 0,
                            type: 'loan',
                            status: 'active',
                            interestRate: 9.75,
                            term: 60,
                            installment: 105432.10,
                            nextPayment: '2025-06-05',
                            features: ['payments', 'statements', 'balance_certificate'],
                            lastUpdated: '2025-05-14T16:54:32Z',
                            transactions: [
                                {
                                    id: 'txn_501',
                                    date: '5 May 2025',
                                    type: 'Payment',
                                    reference: 'Loan Installment',
                                    amount: -105432.10,
                                    fees: 0.00,
                                    balance: -5000000.00
                                }
                            ]
                        },
                        {
                            id: 'acc_007',
                            name: 'Investment Account',
                            number: '1052263245',
                            balance: 1500000.00,
                            available: 1500000.00,
                            type: 'investment',
                            status: 'active',
                            interestRate: 5.25,
                            features: ['investments', 'withdrawals', 'statements'],
                            lastUpdated: '2025-05-15T10:12:34Z',
                            transactions: [
                                {
                                    id: 'txn_601',
                                    date: '15 May 2025',
                                    type: 'Credit',
                                    reference: 'Dividend Payment',
                                    amount: 12500.00,
                                    fees: 0.00,
                                    balance: 1500000.00
                                }
                            ]
                        }
                    ],
                    preferences: {
                        theme: 'light',
                        language: 'en',
                        defaultAccount: 'acc_005'
                    },
                    notifications: {
                        paymentAlerts: true,
                        lowBalance: true,
                        securityAlerts: true
                    },
                    security: {
                        lastLogin: new Date().toISOString(),
                        twoFactorEnabled: true
                    },
                    beneficiaries: []
                }
            };

            localStorage.setItem('userDatabase', JSON.stringify(userDatabase));
        }
    }

// Initialize the database
    initializeUserDatabase();

// Get user database from localStorage
    function getUserDatabase() {
        return JSON.parse(localStorage.getItem('userDatabase'));
    }

// Update user in database
    function updateUserInDatabase(user) {
        const userDatabase = getUserDatabase();
        userDatabase[user.email] = user;
        localStorage.setItem('userDatabase', JSON.stringify(userDatabase));
    }

// Current user context
    let currentUserContext = null;

// =============================================
// AUTHENTICATION SYSTEM (LocalStorage)
// =============================================

// Simulate login function
    function simulateLogin(email) {
        const userDatabase = getUserDatabase();
        const user = userDatabase[email];

        if (user) {
            currentUserContext = JSON.parse(JSON.stringify(user)); // Deep copy
            console.log('User logged in:', currentUserContext.name);

// Update last login time
            currentUserContext.security.lastLogin = new Date().toISOString();
            updateUserInDatabase(currentUserContext);

            return true;
        }

        return false;
    }

// Check if we have a simulated login in URL params
    const urlParams = new URLSearchParams(window.location.search);
    const simulatedUser = urlParams.get('user');

    if (simulatedUser && getUserDatabase()[simulatedUser]) {
        simulateLogin(simulatedUser);
    } else {
// Default to first user for demo purposes
        simulateLogin('user1@example.com');
    }

// =============================================
// CONTEXT-AWARE UI RENDERING
// =============================================

// Update UI based on user context
    function updateUserContextUI() {
        if (!currentUserContext) return;

// Update profile information
        const profileNameElements = document.querySelectorAll('.profile-name, #profile-name');
        const profileEmailElements = document.querySelectorAll('.profile-email, #profile-email');
        const profileImageElements = document.querySelectorAll('.profile-image, #profile-image');

        profileNameElements.forEach(el => {
            el.textContent = currentUserContext.name;
        });

        profileEmailElements.forEach(el => {
            el.textContent = currentUserContext.email;
        });

        profileImageElements.forEach(el => {
            if (currentUserContext.profileImage) {
                el.src = `images/${currentUserContext.profileImage}`;
                el.style.display = 'block';
            } else {
// Use initials as fallback
                const initials = currentUserContext.name.split(' ').map(n => n[0]).join('');
                el.src = '';
                el.textContent = initials;
                el.style.backgroundColor = getRandomColor();
            }
        });

// Update account selector
        updateAccountSelector();

// Update account overview
        updateAccountOverview();

// Update quick actions based on account features
        updateQuickActions();

// Update transaction history
        updateTransactionHistory();

// Update profile popup content
        updateProfilePopup();
    }

// Update account selector dropdown
    function updateAccountSelector() {
        const accountSelector = document.getElementById('account-selector');
        if (!accountSelector || !currentUserContext) return;

// Clear existing options
        accountSelector.innerHTML = '';

// Add each account as an option
        currentUserContext.accounts.forEach(account => {
            const option = document.createElement('option');
            option.value = account.id;
            option.textContent = `${account.name} (••••${account.number.slice(-4)})`;

// Select default account
            if (account.id === currentUserContext.preferences.defaultAccount) {
                option.selected = true;
            }

            accountSelector.appendChild(option);
        });

// Add event listener for account changes
        accountSelector.addEventListener('change', function() {
            const selectedAccountId = this.value;
            currentUserContext.preferences.defaultAccount = selectedAccountId;
            updateUserInDatabase(currentUserContext);
            updateAccountOverview();
            updateTransactionHistory();
            updateQuickActions();
        });
    }

// Update account overview section
    function updateAccountOverview() {
        const accountOverview = document.getElementById('account-overview');
        const accountBalance = document.getElementById('account-balance');
        const accountAvailable = document.getElementById('account-available');
        const accountNumber = document.getElementById('account-number');
        const accountType = document.getElementById('account-type');
        const accountStatus = document.getElementById('account-status');

        if (!accountOverview || !currentUserContext) return;

// Get selected/default account
        const account = currentUserContext.accounts.find(
            acc => acc.id === currentUserContext.preferences.defaultAccount
        );

        if (!account) return;

// Update account details
        if (accountBalance) {
            accountBalance.textContent = formatCurrency(account.balance);
            accountBalance.className = account.balance >= 0 ? 'positive' : 'negative';
        }

        if (accountAvailable) {
            accountAvailable.textContent = formatCurrency(account.available);
            accountAvailable.className = account.available >= 0 ? 'positive' : 'negative';
        }

        if (accountNumber) {
            accountNumber.textContent = `•••• ${account.number.slice(-4)}`;
        }

        if (accountType) {
            accountType.textContent = account.type.charAt(0).toUpperCase() + account.type.slice(1);
        }

        if (accountStatus) {
            accountStatus.textContent = account.status.charAt(0).toUpperCase() + account.status.slice(1);
            accountStatus.className = account.status === 'active' ? 'active' : 'inactive';
        }

// Update account features (like overdraft, interest rate, etc.)
        updateAccountFeatures(account);
    }

// Update account-specific features display
    function updateAccountFeatures(account) {
        const featuresContainer = document.getElementById('account-features');
        if (!featuresContainer) return;

        featuresContainer.innerHTML = '';

// Add features based on account type
        const featuresList = document.createElement('ul');
        featuresList.className = 'account-features-list';

// Common features
        if (account.overdraft) {
            const li = document.createElement('li');
            li.innerHTML = `<span class="material-icons-sharp">credit_card</span> Overdraft: ${formatCurrency(account.overdraft)}`;
            featuresList.appendChild(li);
        }

        if (account.interestRate) {
            const li = document.createElement('li');
            li.innerHTML = `<span class="material-icons-sharp">trending_up</span> Interest Rate: ${account.interestRate}%`;
            featuresList.appendChild(li);
        }

        if (account.type === 'loan' && account.installment) {
            const li = document.createElement('li');
            li.innerHTML = `<span class="material-icons-sharp">calendar_today</span> Next Installment: ${formatCurrency(account.installment)} on ${formatDate(account.nextPayment)}`;
            featuresList.appendChild(li);
        }

        featuresContainer.appendChild(featuresList);
    }

// Update quick action buttons based on account features
    function updateQuickActions() {
        const paymentButton = document.getElementById('payment');
        const createButton = document.getElementById('create');

        if (!currentUserContext) return;

// Get selected/default account
        const account = currentUserContext.accounts.find(
            acc => acc.id === currentUserContext.preferences.defaultAccount
        );

        if (!account) return;

// Enable/disable actions based on account features
        if (paymentButton) {
            paymentButton.disabled = !account.features.includes('payments');
        }
    }

// Update transaction history based on selected account
    function updateTransactionHistory() {
        const tabContent = document.getElementById('tab-content');
        if (!tabContent || !currentUserContext) return;

// Get selected/default account
        const account = currentUserContext.accounts.find(
            acc => acc.id === currentUserContext.preferences.defaultAccount
        );

        if (!account) return;

// Display transactions if we're on the transactions tab
        const activeTab = document.querySelector('.tabs button.active');
        if (activeTab && activeTab.id === 'btn-transactions') {
            displayContent([generateTransactionTable(account.transactions || [])]);
        }
    }

// Generate HTML table for transactions
    function generateTransactionTable(transactions) {
        let html = `
<table class="transaction-table">
<thead>
<tr>
<th>Date</th>
<th>Transaction Type</th>
<th>Reference</th>
<th>Amount</th>
<th>Fees</th>
<th>Balance</th>
</tr>
</thead>
<tbody>`;

        transactions.forEach(txn => {
            html += `
<tr>
<td>${txn.date}</td>
<td>${txn.type}</td>
<td>${txn.reference}</td>
<td class="${txn.amount >= 0 ? 'positive' : 'negative'}">${txn.amount >= 0 ? '+' : ''}${formatCurrency(txn.amount)}</td>
<td class="${txn.fees >= 0 ? 'positive' : 'negative'}">${txn.fees >= 0 ? '+' : ''}${formatCurrency(txn.fees)}</td>
<td class="${txn.balance >= 0 ? 'positive' : 'negative'}">${formatCurrency(txn.balance)}</td>
</tr>`;
        });

        html += `
</tbody>
</table>`;

        return html;
    }

// Update profile popup content
    function updateProfilePopup() {
        const profilePopup = document.getElementById('profile-popup-content');
        if (!profilePopup || !currentUserContext) return;

        profilePopup.innerHTML = `
<div class="profile-header">
<div class="profile-image-large">
${currentUserContext.profileImage ?
            `<img src="images/${currentUserContext.profileImage}" alt="${currentUserContext.name}">` :
            `<div class="profile-initials" style="background-color: ${getRandomColor()}">${currentUserContext.name.split(' ').map(n => n[0]).join('')}</div>`
        }
</div>
<h3>${currentUserContext.name}</h3>
<p>${currentUserContext.email}</p>
</div>

<div class="profile-details">
<div class="detail-item">
<span class="material-icons-sharp">phone</span>
<span>${currentUserContext.phone || 'Not provided'}</span>
</div>

<div class="detail-item">
<span class="material-icons-sharp">account_balance</span>
<span>${currentUserContext.accounts.length} linked account${currentUserContext.accounts.length !== 1 ? 's' : ''}</span>
</div>

<div class="detail-item">
<span class="material-icons-sharp">security</span>
<span>Last login: ${formatDateTime(currentUserContext.security.lastLogin)}</span>
</div>
</div>

<div class="profile-actions">
<button class="profile-action-btn" id="edit-profile-btn">
<span class="material-icons-sharp">edit</span> Edit Profile
</button>
<button class="profile-action-btn" id="security-settings-btn">
<span class="material-icons-sharp">lock</span> Security Settings
</button>
<button class="profile-action-btn" id="logout-btn">
<span class="material-icons-sharp">logout</span> Log Out
</button>
</div>`;

// Add event listeners for profile actions
        document.getElementById('edit-profile-btn')?.addEventListener('click', () => {
            alert('Edit profile functionality would open here');
        });

        document.getElementById('security-settings-btn')?.addEventListener('click', () => {
            alert('Security settings would open here');
        });

        document.getElementById('logout-btn')?.addEventListener('click', () => {
            alert('User would be logged out here');
// In a real app: window.location.href = '/logout';
        });
    }

// =============================================
// HELPER FUNCTIONS
// =============================================

    function formatCurrency(amount) {
        return 'R ' + Math.abs(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }

    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }

    function formatDateTime(dateTimeString) {
        const options = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        };
        return new Date(dateTimeString).toLocaleDateString(undefined, options);
    }

    function getRandomColor() {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    function generateTransactionId() {
        return 'txn_' + Math.random().toString(36).substr(2, 9);
    }

// =============================================
// INITIALIZE UI WITH USER CONTEXT
// =============================================

    updateUserContextUI();

// =============================================
// UI COMPONENT FUNCTIONALITY
// =============================================

// Profile popup functionality
    const profileLink = document.getElementById('profile-link');
    const profilePopup = document.getElementById('profilePopup');
    const overlay = document.getElementById('overlay');

    if (profileLink && profilePopup && overlay) {
        profileLink.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            profilePopup.classList.add('active');
            overlay.classList.add('active');
        });

        overlay.addEventListener('click', function() {
            profilePopup.classList.remove('active');
            overlay.classList.remove('active');
        });

        profilePopup.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    }

// Sidebar toggle functionality
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const toggleButton = document.getElementById('sidebarToggle');
    const menuIcon = toggleButton?.querySelector('.material-icons-sharp');

    if (sidebar && mainContent && toggleButton && menuIcon) {
        const chevronIcon = '<span class="material-icons-sharp">chevron_right</span>';
        const closeIcon = '<span class="material-icons-sharp">close</span>';
        const menuIconHtml = '<span class="material-icons-sharp">menu</span>';

        function toggleSidebar() {
            const isCollapsed = sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded', isCollapsed);

            if (isCollapsed) {
                toggleButton.innerHTML = menuIconHtml;
            } else {
                toggleButton.innerHTML = chevronIcon;
            }

            localStorage.setItem('sidebarCollapsed', isCollapsed);
        }

        function initSidebar() {
            const savedState = localStorage.getItem('sidebarCollapsed');
            if (savedState === 'true') {
                sidebar.classList.add('collapsed');
                mainContent.classList.add('expanded');
                toggleButton.innerHTML = menuIconHtml;
            } else {
                sidebar.classList.remove('collapsed');
                mainContent.classList.remove('expanded');
                toggleButton.innerHTML = chevronIcon;
            }
        }

        toggleButton.addEventListener('click', toggleSidebar);
        initSidebar();
    }

// Tab functionality
    const btnTransactions = document.getElementById("btn-transactions");
    const btnPaymentHistory = document.getElementById("btn-payment-history");
    const btnStampedStatements = document.getElementById("btn-stamped-statements");
    const btnAccountInformation = document.getElementById("btn-account-information");
    const tabContent = document.getElementById("tab-content");

    function displayContent(items) {
        if (!tabContent) return;

        tabContent.innerHTML = "";

        if (items.length === 1 && items[0].startsWith('<table')) {
            tabContent.innerHTML = items[0];
        } else {
            const list = document.createElement("ul");
            list.className = "content-list";

            items.forEach(item => {
                const listItem = document.createElement("li");
                listItem.textContent = item;
                list.appendChild(listItem);
            });

            tabContent.appendChild(list);
        }
    }

    function highlightButton(btn) {
        const allButtons = document.querySelectorAll('.tabs button');
        allButtons.forEach(button => {
            button.classList.remove('active');
            const tab = button.querySelector('.tab');
            if (tab) tab.classList.remove('active');
        });

        if (btn) {
            btn.classList.add('active');
            const tab = btn.querySelector('.tab');
            if (tab) tab.classList.add('active');
        }
    }

    function handleClick(event) {
        const button = event.target.closest('button');
        if (!button) return;

        button.style.transform = 'translateY(2px)';
        setTimeout(() => {
            button.style.transform = '';
        }, 100);

        highlightButton(button);

        if (!currentUserContext) return;

// Get selected/default account
        const account = currentUserContext.accounts.find(
            acc => acc.id === currentUserContext.preferences.defaultAccount
        );

        if (!account) return;

        switch(button.id) {
            case "btn-transactions":
                displayContent([generateTransactionTable(account.transactions || [])]);
                break;
            case "btn-payment-history":
                displayContent([
                    "Payment 1: R500.00 to John Doe",
                    "Payment 2: R1,200.00 to ABC Suppliers",
                    "Payment 3: R350.00 to Utility Company"
                ]);
                break;
            case "btn-stamped-statements":
                displayContent([
                    `Statement for ${new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}`,
                    `Statement for ${new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleString('default', { month: 'long', year: 'numeric' })}`,
                    `Statement for ${new Date(new Date().setMonth(new Date().getMonth() - 2)).toLocaleString('default', { month: 'long', year: 'numeric' })}`
                ]);
                break;
            case "btn-account-information":
                const accountInfo = [
                    `Account opened: ${formatDate(account.lastUpdated)}`,
                    `Account status: ${account.status.charAt(0).toUpperCase() + account.status.slice(1)}`,
                    account.overdraft ? `Overdraft limit: ${formatCurrency(account.overdraft)}` : '',
                    account.interestRate ? `Interest rate: ${account.interestRate}%` : '',
                    `Account type: ${account.type.charAt(0).toUpperCase() + account.type.slice(1)}`
                ].filter(item => item !== '');

                displayContent(accountInfo);
                break;
            default:
                console.warn("Unknown button clicked:", button.id);
        }
    }

    [btnTransactions, btnPaymentHistory, btnStampedStatements, btnAccountInformation].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', handleClick);
        }
    });

    if (btnTransactions && tabContent) {
        btnTransactions.classList.add('active');
        const tab = btnTransactions.querySelector('.tab');
        if (tab) tab.classList.add('active');

        if (currentUserContext) {
            const account = currentUserContext.accounts.find(
                acc => acc.id === currentUserContext.preferences.defaultAccount
            );

            if (account) {
                displayContent([generateTransactionTable(account.transactions || [])]);
            }
        }
    }
});

// Payment and Beneficiary Management Script
document.addEventListener('DOMContentLoaded', function() {
// Initialize user database
    function initializeUserDatabase() {
        if (!localStorage.getItem('userDatabase')) {
            const userDatabase = {
                'user1@example.com': {
                    id: 'usr_001',
                    name: 'Omphile Mohlala',
                    email: 'user1@example.com',
                    beneficiaries: [
                        {
                            id: 'ben_001',
                            name: 'Omphile Mohlala',
                            accountNumber: '1052265678',
                            bank: 'Standard Bank',
                            nickname: 'My Savings'
                        }
                    ]
                },
                'user2@example.com': {
                    id: 'usr_002',
                    name: 'John Doe',
                    email: 'user2@example.com',
                    beneficiaries: [
                        {
                            id: 'ben_002',
                            name: 'Sarah Smith',
                            accountNumber: '1052269876',
                            bank: 'First National Bank',
                            nickname: 'Rent Payment'
                        }
                    ]
                }
            };
            localStorage.setItem('userDatabase', JSON.stringify(userDatabase));
        }
    }

    initializeUserDatabase();

    function getUserDatabase() {
        return JSON.parse(localStorage.getItem('userDatabase'));
    }

    function updateUserInDatabase(user) {
        const userDatabase = getUserDatabase();
        userDatabase[user.email] = user;
        localStorage.setItem('userDatabase', JSON.stringify(userDatabase));
    }

// Current user context
    let currentUserContext = null;
    let navigationStack = [];

// Simulate login
    function simulateLogin(email) {
        const userDatabase = getUserDatabase();
        const user = userDatabase[email];

        if (user) {
            currentUserContext = JSON.parse(JSON.stringify(user));
            return true;
        }
        return false;
    }

// Default login for demo
    simulateLogin('user1@example.com');

// UI Elements
    const defaultContent = document.getElementById('default-content');
    const mainContentArea = document.getElementById('main-content-area');
    const paymentButton = document.getElementById('payment');
    const transferButton = document.getElementById('transfer');
    const beneficiariesButton = document.getElementById('beneficiaries');

// Event Listeners
    paymentButton?.addEventListener('click', showPaymentSection);
    transferButton?.addEventListener('click', () => alert('Transfer functionality coming soon!'));
    beneficiariesButton?.addEventListener('click', showBeneficiariesSection);

// Show payment section
    function showPaymentSection() {
        toggleContentVisibility();
        navigationStack.push('payment-section');

        mainContentArea.innerHTML = `
<div class="payment-section">
<div class="payment-header">
<button class="back-button" id="back-button">
<span class="material-icons-sharp">arrow_back</span> Back
</button>
<h2>Make a Payment</h2>
</div>
<div class="payment-options-grid">
<div class="payment-option-row">
<div class="payment-option" id="saved-beneficiary-option">
<div class="payment-icon">
<span class="material-icons-sharp">bookmark</span>
</div>
<div class="payment-details">
<h3>Saved Beneficiary</h3>
<p>Pay to a saved recipient</p>
</div>
<span class="material-icons-sharp chevron-right">chevron_right</span>
</div>
</div>
<div class="payment-option-row">
<div class="payment-option" id="onceoff-beneficiary-option">
<div class="payment-icon">
<span class="material-icons-sharp">person_add</span>
</div>
<div class="payment-details">
<h3>Once-off Beneficiary</h3>
<p>Pay to a new recipient</p>
</div>
<span class="material-icons-sharp chevron-right">chevron_right</span>
</div>
</div>
</div>
</div>`;

        document.getElementById('back-button').addEventListener('click', resetToMainView);
        document.getElementById('saved-beneficiary-option').addEventListener('click', showBeneficiarySelection);
        document.getElementById('onceoff-beneficiary-option').addEventListener('click', () => showPaymentForm('onceoff'));
    }

// Show beneficiaries section
    function showBeneficiariesSection() {
        toggleContentVisibility();
        navigationStack.push('beneficiaries-section');

        const beneficiaries = currentUserContext?.beneficiaries || [];

        mainContentArea.innerHTML = `
<div class="beneficiaries-section">
<div class="payment-header">
<button class="back-button" id="back-button">
<span class="material-icons-sharp">arrow_back</span> Back
</button>
<h2>My Beneficiaries</h2>
</div>
<div class="beneficiary-list">
${beneficiaries.length > 0 ?
            beneficiaries.map(ben => `
<div class="beneficiary-card" data-beneficiary-id="${ben.id}">
<div class="beneficiary-avatar">
<span class="material-icons-sharp">person</span>
</div>
<div class="beneficiary-details">
<h3>${ben.nickname || ben.name}</h3>
<p>Account: ****${ben.accountNumber.slice(-4)}</p>
<p>Bank: ${ben.bank}</p>
</div>
<button class="delete-beneficiary-btn" data-beneficiary-id="${ben.id}" aria-label="Delete beneficiary">
<span class="material-icons-sharp">delete</span>
</button>
</div>
`).join('') :
            '<p class="no-beneficiaries">No saved beneficiaries found</p>'
        }
</div>
<div class="add-beneficiary-footer">
<button id="add-new-beneficiary" class="add-beneficiary-btn">
<span class="material-icons-sharp">add</span> Add New Beneficiary
</button>
</div>
</div>`;

        document.getElementById('back-button').addEventListener('click', resetToMainView);
        document.getElementById('add-new-beneficiary').addEventListener('click', showAddBeneficiaryForm);

// Add delete event listeners
        document.querySelectorAll('.delete-beneficiary-btn').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation();
                const beneficiaryId = this.getAttribute('data-beneficiary-id');
                deleteBeneficiary(beneficiaryId);
            });
        });

// Add click event for beneficiary cards
        document.querySelectorAll('.beneficiary-card').forEach(card => {
            card.addEventListener('click', function() {
                const beneficiaryId = this.getAttribute('data-beneficiary-id');
                const beneficiary = currentUserContext.beneficiaries.find(b => b.id === beneficiaryId);
                if (beneficiary) {
                    showPaymentForm('saved', beneficiary.name);
                }
            });
        });
    }

// Show beneficiary selection for payments
    function showBeneficiarySelection() {
        toggleContentVisibility();
        navigationStack.push('beneficiary-selection');

        const beneficiaries = currentUserContext?.beneficiaries || [];

        mainContentArea.innerHTML = `
<div class="beneficiary-selection">
<div class="payment-header">
<button class="back-button" id="back-button">
<span class="material-icons-sharp">arrow_back</span> Back
</button>
<h2>Select Beneficiary</h2>
</div>
<div class="beneficiary-list">
${beneficiaries.length > 0 ?
            beneficiaries.map(ben => `
<div class="beneficiary-card" data-beneficiary-id="${ben.id}">
<div class="beneficiary-avatar">
<span class="material-icons-sharp">person</span>
</div>
<div class="beneficiary-details">
<h3>${ben.nickname || ben.name}</h3>
<p>Account: ****${ben.accountNumber.slice(-4)}</p>
<p>Bank: ${ben.bank}</p>
</div>
<span class="material-icons-sharp chevron-right">chevron_right</span>
</div>
`).join('') :
            '<p class="no-beneficiaries">No saved beneficiaries found</p>'
        }
</div>
<div class="add-beneficiary-footer">
<button id="add-new-beneficiary" class="add-beneficiary-btn">
<span class="material-icons-sharp">add</span> Add New Beneficiary
</button>
</div>
</div>`;

        document.getElementById('back-button').addEventListener('click', navigateBack);
        document.getElementById('add-new-beneficiary').addEventListener('click', showAddBeneficiaryForm);

        document.querySelectorAll('.beneficiary-card').forEach(card => {
            card.addEventListener('click', function() {
                const beneficiaryId = this.getAttribute('data-beneficiary-id');
                const beneficiary = currentUserContext.beneficiaries.find(b => b.id === beneficiaryId);
                if (beneficiary) {
                    showPaymentForm('saved', beneficiary.name);
                }
            });
        });
    }

// Show add beneficiary form
    function showAddBeneficiaryForm() {
        toggleContentVisibility();
        navigationStack.push('add-beneficiary-form');

        mainContentArea.innerHTML = `
<div class="add-beneficiary-form">
<div class="payment-header">
<button class="back-button" id="back-button">
<span class="material-icons-sharp">arrow_back</span> Back
</button>
<h2>Add New Beneficiary</h2>
</div>
<form id="beneficiary-form">
<div class="form-group">
<label for="beneficiary-name">Full Name</label>
<input type="text" id="beneficiary-name" name="beneficiary-name" required>
</div>
<div class="form-group">
<label for="account-number">Account Number</label>
<input type="text" id="account-number" name="account-number" required>
</div>
<div class="form-group">
<label for="bank">Bank</label>
<select id="bank" name="bank" required>
<option value="">Select bank</option>
<option value="Standard Bank">Standard Bank</option>
<option value="First National Bank">First National Bank</option>
<option value="ABSA">ABSA</option>
<option value="Nedbank">Nedbank</option>
<option value="Capitec">Capitec</option>
</select>
</div>
<div class="form-group">
<label for="nickname">Nickname (Optional)</label>
<input type="text" id="nickname" name="nickname">
</div>
<div class="form-group">
<button type="submit" class="submit-btn">Save Beneficiary</button>
</div>
</form>
</div>`;

        document.getElementById('back-button').addEventListener('click', navigateBack);
        document.getElementById('beneficiary-form').addEventListener('submit', saveBeneficiary);
    }

// Show payment form
    function showPaymentForm(paymentType, beneficiaryName = '') {
        toggleContentVisibility();
        navigationStack.push('payment-form');

        let title = 'Make Payment';
        if (paymentType === 'saved') title = `Pay ${beneficiaryName}`;
        else if (paymentType === 'onceoff') title = 'Pay New Beneficiary';

        mainContentArea.innerHTML = `
<div class="payment-form-section">
<div class="payment-header">
<button class="back-button" id="back-button">
<span class="material-icons-sharp">arrow_back</span> Back
</button>
<h2>${title}</h2>
</div>
<form id="payment-form">
${paymentType === 'saved' ? `
<div class="form-group">
<label>Beneficiary</label>
<div class="read-only-field">${beneficiaryName}</div>
</div>
` : ''}
<div class="form-group">
<label for="amount">Amount (ZAR)</label>
<input type="number" id="amount" name="amount" required>
</div>
<div class="form-group">
<label for="reference">Payment Reference</label>
<input type="text" id="reference" name="reference" required>
</div>
${paymentType === 'onceoff' ? `
<div class="form-group">
<label for="account-number">Account Number</label>
<input type="text" id="account-number" name="account-number" required>
</div>
<div class="form-group">
<label for="bank">Bank</label>
<select id="bank" name="bank" required>
<option value="">Select bank</option>
<option value="Standard Bank">Standard Bank</option>
<option value="First National Bank">First National Bank</option>
<option value="ABSA">ABSA</option>
<option value="Nedbank">Nedbank</option>
<option value="Capitec">Capitec</option>
</select>
</div>
<div class="form-group">
<label for="beneficiary-name">Beneficiary Name</label>
<input type="text" id="beneficiary-name" name="beneficiary-name" required>
</div>
` : ''}
<div class="form-group">
<button type="submit" class="submit-payment-btn">
${paymentType === 'onceoff' ? 'Pay & Save Beneficiary' : 'Confirm Payment'}
</button>
</div>
</form>
</div>`;

        document.getElementById('back-button').addEventListener('click', navigateBack);
        document.getElementById('payment-form').addEventListener('submit', (e) => {
            e.preventDefault();
            processPayment(paymentType, beneficiaryName);
        });
    }

// Delete beneficiary
    function deleteBeneficiary(beneficiaryId) {
        if (confirm('Are you sure you want to delete this beneficiary?')) {
            currentUserContext.beneficiaries = currentUserContext.beneficiaries.filter(
                b => b.id !== beneficiaryId
            );
            updateUserInDatabase(currentUserContext);
            showBeneficiariesSection();
        }
    }

// Save beneficiary
    function saveBeneficiary(e) {
        e.preventDefault();

        const name = document.getElementById('beneficiary-name').value;
        const accountNumber = document.getElementById('account-number').value;
        const bank = document.getElementById('bank').value;
        const nickname = document.getElementById('nickname').value;

        const newBeneficiary = {
            id: 'ben_' + Math.random().toString(36).substr(2, 9),
            name: name,
            accountNumber: accountNumber,
            bank: bank,
            nickname: nickname || ''
        };

        if (!currentUserContext.beneficiaries) {
            currentUserContext.beneficiaries = [];
        }
        currentUserContext.beneficiaries.push(newBeneficiary);
        updateUserInDatabase(currentUserContext);

// Show confirmation and return to appropriate view
        if (navigationStack.includes('beneficiary-selection')) {
            showBeneficiarySelection();
        } else {
            showBeneficiariesSection();
        }
    }

// Process payment
    function processPayment(paymentType, beneficiaryName) {
        const amount = parseFloat(document.getElementById('amount').value);
        const reference = document.getElementById('reference').value;

// Show processing animation
        mainContentArea.innerHTML = `
<div class="payment-processing">
<div class="spinner">
<div class="double-bounce1"></div>
<div class="double-bounce2"></div>
</div>
<h2>Processing Payment...</h2>
</div>`;

// Simulate processing
        setTimeout(() => {
// Show confirmation
            mainContentArea.innerHTML = `
<div class="payment-confirmation">
<div class="confirmation-icon success">
<span class="material-icons-sharp">check_circle</span>
</div>
<h2>Payment Successful!</h2>
<div class="confirmation-details">
<div class="detail-row">
<span>Recipient:</span>
<span>${beneficiaryName || 'New Beneficiary'}</span>
</div>
<div class="detail-row">
<span>Amount:</span>
<span>R ${amount.toFixed(2)}</span>
</div>
</div>
<button id="done-button" class="done-btn">Done</button>
</div>`;

            document.getElementById('done-button').addEventListener('click', resetToMainView);
        }, 2000);
    }

// Navigation functions
    function toggleContentVisibility() {
        if (defaultContent && mainContentArea) {
            defaultContent.style.display = 'none';
            mainContentArea.style.display = 'block';
        }
    }

    function navigateBack() {
        if (navigationStack.length > 0) {
            const previousView = navigationStack[navigationStack.length - 2];

            switch(previousView) {
                case 'payment-section':
                    showPaymentSection();
                    break;
                case 'beneficiaries-section':
                    showBeneficiariesSection();
                    break;
                case 'beneficiary-selection':
                    showBeneficiarySelection();
                    break;
                default:
                    resetToMainView();
            }
        } else {
            resetToMainView();
        }
    }

    function resetToMainView() {
        if (defaultContent && mainContentArea) {
            defaultContent.style.display = 'block';
            mainContentArea.style.display = 'none';
            mainContentArea.innerHTML = '';
            navigationStack = [];
        }
    }

// Helper function for currency formatting
    function formatCurrency(amount) {
        return 'R ' + Math.abs(amount).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }
});