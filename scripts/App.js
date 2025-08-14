
document.addEventListener('DOMContentLoaded', function() {
    
    const userDatabase = {
        'omphilestudent@gmail.com': {
            name: 'Omphile Mohlala',
            email: 'omphilestudent@gmail.com',
            initials: 'OM',
            accountName: '1 Account Current',
            accountBalance: 'R1000',
            color: '#0096c7'
        },
        'Kodi@codes.com': {
            name: 'Kodi Codes PTY LTD',
            email: 'Kodi@codes.com',
            initials: 'KC',
            accountName: '2 Accounts',
            accountBalance: 'R5000',
            color: '#0096c7'
        },
        'business@example.com': {
            name: 'ABC Enterprises',
            email: 'business@example.com',
            initials: 'AE',
            accountName: 'Business Account',
            accountBalance: 'R25000',
            color: '#0096c7'
        }
    };

    
    let currentUser = null;

    
    function initUser() {
        const urlParams = new URLSearchParams(window.location.search);
        const userEmail = urlParams.get('user') || 'omphilestudent@gmail.com';

        if (userDatabase[userEmail]) {
            currentUser = userDatabase[userEmail];
            updateUI();
        }
    }

    
    function updateUI() {
        document.getElementById('current-profile-name').textContent = currentUser.name;
        document.getElementById('current-profile-email').textContent = currentUser.email;
        document.getElementById('profile-initials').textContent = currentUser.initials;
        document.getElementById('profile-initials').style.backgroundColor = currentUser.color;
        document.getElementById('account-name').textContent = currentUser.accountName;
        document.getElementById('account-balance').textContent = currentUser.accountBalance;
    }

    
    document.getElementById('profile-link').addEventListener('click', function(e) {
        e.preventDefault();
        document.getElementById('profilePopup').classList.add('active');
        document.getElementById('overlay').classList.add('active');
    });

    document.getElementById('overlay').addEventListener('click', function() {
        document.getElementById('profilePopup').classList.remove('active');
        this.classList.remove('active');
    });

    
    document.querySelectorAll('.profile-option').forEach(option => {
        option.addEventListener('click', function() {
            const userEmail = this.getAttribute('data-user');
            if (userDatabase[userEmail]) {
                
                const newUrl = window.location.pathname + '?user=' + encodeURIComponent(userEmail);
                window.history.pushState({}, '', newUrl);

                
                currentUser = userDatabase[userEmail];
                updateUI();

                
                document.getElementById('profilePopup').classList.remove('active');
                document.getElementById('overlay').classList.remove('active');
            }
        });
    });

    
    const dropdowns = document.querySelectorAll('.dropdown');

    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        toggle.addEventListener('click', () => {
            dropdown.classList.toggle('open');
        });
    });

    
    initUser();

    
    window.addEventListener('popstate', function() {
        initUser();
    });

    
    
    

    
    function initializeUserDatabase() {
        if (!localStorage.getItem('userDatabase')) {
            const userDatabase = {
                
                'omphilestudent@gmail.com': {
                    id: 'usr_001',
                    name: 'Omphile Mohlala',
                    email: 'omphilestudent@gmail.com',
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

                
                'Kodi@codes.com': {
                    id: 'usr_002',
                    name: 'Kodi Codes PTY LTD',
                    email: 'Kodi@codes.com',
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

    
    initializeUserDatabase();

    
    function getUserDatabase() {
        return JSON.parse(localStorage.getItem('userDatabase'));
    }

    
    function updateUserInDatabase(user) {
        const userDatabase = getUserDatabase();
        userDatabase[user.email] = user;
        localStorage.setItem('userDatabase', JSON.stringify(userDatabase));
    }

    
    let currentUserContext = null;

    
    
    

    
    function simulateLogin(email) {
        const userDatabase = getUserDatabase();
        const user = userDatabase[email];

        if (user) {
            currentUserContext = JSON.parse(JSON.stringify(user)); 
            console.log('User logged in:', currentUserContext.name);

            
            currentUserContext.security.lastLogin = new Date().toISOString();
            updateUserInDatabase(currentUserContext);

            return true;
        }

        return false;
    }

    
    const urlParams = new URLSearchParams(window.location.search);
    const simulatedUser = urlParams.get('user');

    if (simulatedUser && getUserDatabase()[simulatedUser]) {
        simulateLogin(simulatedUser);
    } else {
        
        simulateLogin('omphilestudent@gmail.com');
    }

    
    
    

    
    function updateUserContextUI() {
        if (!currentUserContext) return;

        
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
                
                const initials = currentUserContext.name.split(' ').map(n => n[0]).join('');
                el.src = '';
                el.textContent = initials;
                el.style.backgroundColor = getRandomColor();
            }
        });

        
        updateAccountSelector();

        
        updateAccountOverview();

        
        updateQuickActions();

        
        updateTransactionHistory();

        
        updateProfilePopup();
    }

    
    function updateAccountSelector() {
        const accountSelector = document.getElementById('account-selector');
        if (!accountSelector || !currentUserContext) return;

        
        accountSelector.innerHTML = '';

        
        currentUserContext.accounts.forEach(account => {
            const option = document.createElement('option');
            option.value = account.id;
            option.textContent = `${account.name} (••••${account.number.slice(-4)})`;

            
            if (account.id === currentUserContext.preferences.defaultAccount) {
                option.selected = true;
            }

            accountSelector.appendChild(option);
        });

        
        accountSelector.addEventListener('change', function() {
            const selectedAccountId = this.value;
            currentUserContext.preferences.defaultAccount = selectedAccountId;
            updateUserInDatabase(currentUserContext);
            updateAccountOverview();
            updateTransactionHistory();
            updateQuickActions();
        });
    }

    
    function updateAccountOverview() {
        const accountOverview = document.getElementById('account-overview');
        const accountBalance = document.getElementById('account-balance');
        const accountAvailable = document.getElementById('account-available');
        const accountNumber = document.getElementById('account-number');
        const accountType = document.getElementById('account-type');
        const accountStatus = document.getElementById('account-status');

        if (!accountOverview || !currentUserContext) return;

        
        const account = currentUserContext.accounts.find(
            acc => acc.id === currentUserContext.preferences.defaultAccount
        );

        if (!account) return;

        
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

        
        updateAccountFeatures(account);
    }

    
    function updateAccountFeatures(account) {
        const featuresContainer = document.getElementById('account-features');
        if (!featuresContainer) return;

        featuresContainer.innerHTML = '';

        
        const featuresList = document.createElement('ul');
        featuresList.className = 'account-features-list';

        
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

    
    function updateQuickActions() {
        const paymentButton = document.getElementById('payment');
        const createButton = document.getElementById('create');

        if (!currentUserContext) return;

        
        const account = currentUserContext.accounts.find(
            acc => acc.id === currentUserContext.preferences.defaultAccount
        );

        if (!account) return;

        
        if (paymentButton) {
            paymentButton.disabled = !account.features.includes('payments');
        }
    }

    
    function updateTransactionHistory() {
        const tabContent = document.getElementById('tab-content');
        if (!tabContent || !currentUserContext) return;

        
        const account = currentUserContext.accounts.find(
            acc => acc.id === currentUserContext.preferences.defaultAccount
        );

        if (!account) return;

        
        const activeTab = document.querySelector('.tabs button.active');
        if (activeTab && activeTab.id === 'btn-transactions') {
            displayContent([generateTransactionTable(account.transactions || [])]);
        }
    }

    
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
 <tbody>
 `;

        transactions.forEach(txn => {
            html += `
 <tr>
 <td>${txn.date}</td>
 <td>${txn.type}</td>
 <td>${txn.reference}</td>
 <td class="${txn.amount >= 0 ? 'positive' : 'negative'}">${txn.amount >= 0 ? '+' : ''}${formatCurrency(txn.amount)}</td>
 <td class="${txn.fees >= 0 ? 'positive' : 'negative'}">${txn.fees >= 0 ? '+' : ''}${formatCurrency(txn.fees)}</td>
 <td class="${txn.balance >= 0 ? 'positive' : 'negative'}">${formatCurrency(txn.balance)}</td>
 </tr>
 `;
        });

        html += `
 </tbody>
 </table>
 `;

        return html;
    }

    
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
 </div>
 `;

        
        document.getElementById('edit-profile-btn')?.addEventListener('click', () => {
            alert('Edit profile functionality would open here');
        });

        document.getElementById('security-settings-btn')?.addEventListener('click', () => {
            alert('Security settings would open here');
        });

        document.getElementById('logout-btn')?.addEventListener('click', () => {
            alert('User would be logged out here');
            
        });
    }

    
    
    

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

    
    
    

    updateUserContextUI();

    
    
    

    
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

    
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const toggleButton = document.getElementById('sidebarToggle');
    const menuIcon = toggleButton?.querySelector('.material-icons-sharp');

    if (sidebar && toggleButton) {
        const isMobileApp = document.querySelector('.iphone') !== null;

        if (isMobileApp) {
            // Mobile (Phone2 and similar): keep sidebar closed by default; open only on menu click
            sidebar.classList.remove('active');
            if (menuIcon) {
                menuIcon.textContent = 'menu';
            }

            toggleButton.addEventListener('click', function(e) {
                e.preventDefault();
                sidebar.classList.toggle('active');
                const iconEl = toggleButton.querySelector('.material-icons-sharp');
                if (iconEl) {
                    iconEl.textContent = sidebar.classList.contains('active') ? 'close' : 'menu';
                }
            });
        } else if (mainContent && menuIcon) {
            // Desktop behavior (collapsed/expanded)
            const chevronIcon = '<span class="material-icons-sharp">chevron_right</span>';
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
    }

    
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

    
    const paymentButton = document.getElementById('payment');
    const mainContentArea = document.getElementById('main-content-area');
    const defaultContent = document.getElementById('default-content');
    const contentWrapper = document.querySelector('.content-wrapper');
    const createButton = document.getElementById('create');

    
    let navigationStack = [];

    if (paymentButton) {
        paymentButton.addEventListener('click', function(e) {
            e.preventDefault();
            showPaymentSection();
        });
    }

    if (createButton) {
        createButton.addEventListener('click', function(e) {
            e.preventDefault();
            showCreateOptions();
        });
    }

    function showPaymentSection() {
        toggleContentVisibility();
        navigationStack.push('payment-section');

        mainContentArea.innerHTML = `
 <div class="payment-section">
 <div class="payment-header">
 <button class="back-button" id="back-to-transact">
 <span class="material-icons-sharp">arrow_back</span> Back
 </button>
 <h2>Make a Payment</h2>
 <p>Choose your payment method</p>
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

 <div class="payment-option-row">
 <div class="payment-option" id="group-payment-option">
 <div class="payment-icon">
 <span class="material-icons-sharp">groups</span>
 </div>
 <div class="payment-details">
 <h3>Group Payment</h3>
 <p>Pay multiple beneficiaries</p>
 </div>
 <span class="material-icons-sharp chevron-right">chevron_right</span>
 </div>
 </div>

 <div class="payment-option-row">
 <div class="payment-option clickable-option" data-type="all-payments">
 <div class="payment-icon">
 <span class="material-icons-sharp">list_alt</span>
 </div>
 <div class="payment-details">
 <h3>All Payments</h3>
 <p>View all payment history</p>
 </div>
 <span class="material-icons-sharp chevron-right">chevron_right</span>
 </div>
 </div>

 <div class="payment-option-row">
 <div class="payment-option clickable-option" data-type="recurring">
 <div class="payment-icon">
 <span class="material-icons-sharp">autorenew</span>
 </div>
 <div class="payment-details">
 <h3>Recurring Payments</h3>
 <p>Manage scheduled payments</p>
 </div>
 <span class="material-icons-sharp chevron-right">chevron_right</span>
 </div>
 </div>

 <div class="payment-option-row">
 <div class="payment-option clickable-option" data-type="future">
 <div class="payment-icon">
 <span class="material-icons-sharp">event</span>
 </div>
 <div class="payment-details">
 <h3>Future Dated Payments</h3>
 <p>Schedule future payments</p>
 </div>
 <span class="material-icons-sharp chevron-right">chevron_right</span>
 </div>
 </div>
 </div>
 </div>
 `;

        
        const backButton = document.getElementById('back-to-transact');
        if (backButton) {
            backButton.addEventListener('click', function() {
                resetToMainView();
            });
        }

        document.getElementById('saved-beneficiary-option')?.addEventListener('click', showBeneficiarySelection);
        document.getElementById('onceoff-beneficiary-option')?.addEventListener('click', function() {
            showPaymentForm('onceoff');
        });
        document.getElementById('group-payment-option')?.addEventListener('click', function() {
            showPaymentForm('group');
        });

        document.querySelectorAll('.clickable-option').forEach(option => {
            option.addEventListener('click', function() {
                const optionType = this.getAttribute('data-type');
                handleOptionClick(optionType);
            });
        });
    }

    function showCreateOptions() {
        toggleContentVisibility();
        navigationStack.push('create-options');

        mainContentArea.innerHTML = `
 <div class="create-section">
 <div class="create-header">
 <button class="back-button" id="back-button">
 <span class="material-icons-sharp">arrow_back</span> Back
 </button>
 <h2>Create New</h2>
 <p>Choose what you want to create</p>
 </div>

 <div class="create-options-grid">
 <div class="create-option-row">
 <div class="create-option" data-type="beneficiary">
 <div class="create-icon">
 <span class="material-icons-sharp">person_add</span>
 </div>
 <div class="create-details">
 <h3>New Beneficiary</h3>
 <p>Add someone to pay regularly</p>
 </div>
 <span class="material-icons-sharp chevron-right">chevron_right</span>
 </div>
 </div>

 <div class="create-option-row">
 <div class="create-option" data-type="payment-request">
 <div class="create-icon">
 <span class="material-icons-sharp">request_quote</span>
 </div>
 <div class="create-details">
 <h3>Payment Request</h3>
 <p>Request money from someone</p>
 </div>
 <span class="material-icons-sharp chevron-right">chevron_right</span>
 </div>
 </div>

 <div class="create-option-row">
 <div class="create-option" data-type="recurring-payment">
 <div class="create-icon">
 <span class="material-icons-sharp">autorenew</span>
 </div>
 <div class="create-details">
 <h3>Recurring Payment</h3>
 <p>Set up regular payments</p>
 </div>
 <span class="material-icons-sharp chevron-right">chevron_right</span>
 </div>
 </div>
 </div>
 </div>
 `;

        document.getElementById('back-button')?.addEventListener('click', function() {
            navigateBack();
        });

        document.querySelectorAll('.create-option').forEach(option => {
            option.addEventListener('click', function() {
                const createType = this.getAttribute('data-type');
                handleCreateOption(createType);
            });
        });
    }

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
 <p>Choose from your saved beneficiaries</p>
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
 </div>
 `;

        document.getElementById('back-button')?.addEventListener('click', function() {
            navigateBack();
        });

        document.querySelectorAll('.beneficiary-card').forEach(card => {
            card.addEventListener('click', function() {
                const beneficiaryId = this.getAttribute('data-beneficiary-id');
                const beneficiary = currentUserContext.beneficiaries.find(b => b.id === beneficiaryId);
                if (beneficiary) {
                    showPaymentForm('saved', beneficiary.name);
                }
            });
        });

        document.getElementById('add-new-beneficiary')?.addEventListener('click', function() {
            showAddBeneficiaryForm();
        });
    }

    function showPaymentForm(paymentType, beneficiaryName = '') {
        toggleContentVisibility();
        navigationStack.push('payment-form');

        let title = 'Make Payment';
        if (paymentType === 'saved') {
            title = `Pay ${beneficiaryName}`;
        } else if (paymentType === 'onceoff') {
            title = 'Pay New Beneficiary';
        } else if (paymentType === 'group') {
            title = 'Group Payment';
        }

        mainContentArea.innerHTML = `
 <div class="payment-form-section">
 <div class="payment-header">
 <button class="back-button" id="back-button">
 <span class="material-icons-sharp">arrow_back</span> Back
 </button>
 <h2>${title}</h2>
 <p>Enter payment details</p>
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
 <input type="number" id="amount" name="amount" placeholder="0.00" min="1" required>
 </div>

 <div class="form-group">
 <label for="reference">Payment Reference</label>
 <input type="text" id="reference" name="reference" placeholder="Enter reference" required>
 </div>

 ${paymentType === 'onceoff' ? `
 <div class="form-group">
 <label for="account-number">Account Number</label>
 <input type="text" id="account-number" name="account-number" placeholder="Enter account number" required>
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
 <input type="text" id="beneficiary-name" name="beneficiary-name" placeholder="Enter beneficiary name" required>
 </div>
 ` : ''}

 ${paymentType === 'group' ? `
 <div class="form-group">
 <label>Group Payment</label>
 <div class="info-message">
 <span class="material-icons-sharp">info</span>
 <p>Please visit the full website to access group payment functionality</p>
 </div>
 </div>
 ` : ''}

 <div class="form-group">
 <button type="submit" class="submit-payment-btn">
 ${paymentType === 'onceoff' ? 'Pay & Save Beneficiary' : 'Confirm Payment'}
 </button>
 </div>
 </form>
 </div>
 `;

        document.getElementById('back-button')?.addEventListener('click', function() {
            navigateBack();
        });

        document.getElementById('payment-form')?.addEventListener('submit', function(e) {
            e.preventDefault();
            processPayment(paymentType, beneficiaryName);
        });
    }

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
 <p>Enter beneficiary details</p>
 </div>

 <form id="beneficiary-form">
 <div class="form-group">
 <label for="beneficiary-name">Full Name</label>
 <input type="text" id="beneficiary-name" name="beneficiary-name" placeholder="Enter full name" required>
 </div>

 <div class="form-group">
 <label for="account-number">Account Number</label>
 <input type="text" id="account-number" name="account-number" placeholder="Enter account number" required>
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
 <input type="text" id="nickname" name="nickname" placeholder="e.g. Mom's Account">
 </div>

 <div class="form-group">
 <button type="submit" class="submit-btn">
 Save Beneficiary
 </button>
 </div>
 </form>
 </div>
 `;

        document.getElementById('back-button')?.addEventListener('click', function() {
            navigateBack();
        });

        document.getElementById('beneficiary-form')?.addEventListener('submit', function(e) {
            e.preventDefault();
            saveBeneficiary();
        });
    }

    function processPayment(paymentType, beneficiaryName) {
        const amount = parseFloat(document.getElementById('amount')?.value);
        const reference = document.getElementById('reference')?.value;

        
        const account = currentUserContext.accounts.find(
            acc => acc.id === currentUserContext.preferences.defaultAccount
        );

        if (!account) {
            alert('No account selected');
            return;
        }

        
        if (account.balance - amount < (account.overdraft ? -account.overdraft : 0)) {
            alert('Insufficient funds for this payment');
            return;
        }

        mainContentArea.innerHTML = `
 <div class="payment-processing">
 <div class="spinner">
 <div class="double-bounce1"></div>
 <div class="double-bounce2"></div>
 </div>
 <h2>Processing Payment...</h2>
 <p>Please wait while we process your payment</p>
 </div>
 `;

        
        setTimeout(() => {
            
            account.balance -= amount;
            account.lastUpdated = new Date().toISOString();

            
            const newTransaction = {
                id: generateTransactionId(),
                date: new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
                type: 'Debit',
                reference: reference || `Payment to ${beneficiaryName || 'New Beneficiary'}`,
                amount: -amount,
                fees: 0.00,
                balance: account.balance
            };

            if (!account.transactions) {
                account.transactions = [];
            }
            account.transactions.unshift(newTransaction);

            
            if (paymentType === 'onceoff' && document.getElementById('beneficiary-name')?.value) {
                const beneficiaryName = document.getElementById('beneficiary-name').value;
                const accountNumber = document.getElementById('account-number').value;
                const bank = document.getElementById('bank').value;

                
                const newBeneficiary = {
                    id: 'ben_' + Math.random().toString(36).substr(2, 9),
                    name: beneficiaryName,
                    accountNumber: accountNumber,
                    bank: bank,
                    nickname: ''
                };

                if (!currentUserContext.beneficiaries) {
                    currentUserContext.beneficiaries = [];
                }
                currentUserContext.beneficiaries.push(newBeneficiary);
            }

            
            updateUserInDatabase(currentUserContext);

            
            showPaymentConfirmation(paymentType, beneficiaryName, amount, reference);
        }, 2000);
    }

    function saveBeneficiary() {
        const name = document.getElementById('beneficiary-name')?.value;
        const accountNumber = document.getElementById('account-number')?.value;
        const bank = document.getElementById('bank')?.value;
        const nickname = document.getElementById('nickname')?.value;

        mainContentArea.innerHTML = `
 <div class="payment-processing">
 <div class="spinner">
 <div class="double-bounce1"></div>
 <div class="double-bounce2"></div>
 </div>
 <h2>Saving Beneficiary...</h2>
 <p>Please wait while we save your beneficiary</p>
 </div>
 `;

        setTimeout(() => {
            
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

            showBeneficiaryConfirmation(name);
        }, 1500);
    }

    function showPaymentConfirmation(paymentType, beneficiaryName, amount, reference) {
        mainContentArea.innerHTML = `
 <div class="payment-confirmation">
 <div class="confirmation-icon success">
 <span class="material-icons-sharp">check_circle</span>
 </div>
 <h2>Payment Successful!</h2>
 <p>Your payment has been processed successfully</p>

 <div class="confirmation-details">
 <div class="detail-row">
 <span>Recipient:</span>
 <span>${beneficiaryName || 'New Beneficiary'}</span>
 </div>
 <div class="detail-row">
 <span>Amount:</span>
 <span>R ${amount.toFixed(2)}</span>
 </div>
 <div class="detail-row">
 <span>Reference:</span>
 <span>${reference}</span>
 </div>
 <div class="detail-row">
 <span>Date:</span>
 <span>${new Date().toLocaleString()}</span>
 </div>
 </div>

 <div class="confirmation-actions">
 <button id="done-button" class="done-btn">
 Done
 </button>
 <button id="receipt-button" class="secondary-btn">
 Download Receipt
 </button>
 </div>
 </div>
 `;

        document.getElementById('done-button')?.addEventListener('click', function() {
            resetToMainView();
            
            updateAccountOverview();
            updateTransactionHistory();
        });

        document.getElementById('receipt-button')?.addEventListener('click', function() {
            alert('Receipt downloaded successfully!');
        });
    }

    function showBeneficiaryConfirmation(name) {
        mainContentArea.innerHTML = `
 <div class="payment-confirmation">
 <div class="confirmation-icon success">
 <span class="material-icons-sharp">check_circle</span>
 </div>
 <h2>Beneficiary Saved!</h2>
 <p>${name} has been added to your beneficiaries</p>

 <div class="confirmation-actions">
 <button id="done-button" class="done-btn">
 Done
 </button>
 <button id="pay-now-button" class="primary-btn">
 Pay Now
 </button>
 </div>
 </div>
 `;

        document.getElementById('done-button')?.addEventListener('click', function() {
            resetToMainView();
        });

        document.getElementById('pay-now-button')?.addEventListener('click', function() {
            showPaymentForm('saved', name);
        });
    }

    function handleOptionClick(optionType) {
        alert(`Showing ${optionType.replace('-', ' ')}`);
    }

    function handleCreateOption(createType) {
        switch(createType) {
            case 'beneficiary':
                showAddBeneficiaryForm();
                break;
            case 'payment-request':
                alert('Payment request functionality coming soon!');
                break;
            case 'recurring-payment':
                alert('Recurring payment functionality coming soon!');
                break;
            default:
                showCreateOptions();
        }
    }

    function toggleContentVisibility() {
        if (defaultContent && mainContentArea) {
            defaultContent.style.display = 'none';
            mainContentArea.style.display = 'block';
        }
    }

    function navigateBack() {
        if (navigationStack.length > 0) {
            navigationStack.pop();
            const previousView = navigationStack.pop();

            switch(previousView) {
                case 'payment-section':
                    showPaymentSection();
                    break;
                case 'beneficiary-selection':
                    showBeneficiarySelection();
                    break;
                case 'create-options':
                    showCreateOptions();
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
});

const tabContentData = {
    transactions: [`
<div class="search">
<span class="material-icons-sharp">search</span>
<input type="text" placeholder="Search transactions">
</div>
<div class="date-range">
<input type="date" id="date-range-start">
<input type="date" id="date-range-end">
</div>
<div class="date">
<div class="month-year">
<span>Jul</span>
<span>2025</span>
</div>
<span class="statement-text">Statement <span class="material-icons-sharp">chevron_right</span></span>
</div>
<div class="statement-table">
<div class="table-row">
<div class="row-left">
<div class="date-title">30 June 2025</div>
<div class="description">SMS Notification Fee</div>
</div>
<div class="row-right">
<div class="amount negative">- R0.35</div>
<span class="material-icons-sharp">chevron_right</span>
</div>
</div>
<div class="table-row">
<div class="row-left">
<div class="date-title">1 July 2025</div>
<div class="description">Withdrawal</div>
</div>
<div class="row-right">
<div class="amount positive">R400</div>
<span class="material-icons-sharp">chevron_right</span>
</div>
</div>
</div>
`],
    paymentHistory: [`
<div class="search">
<span class="material-icons-sharp">search</span>
<input type="text" placeholder="Search payment history">
</div>
<div class="date-range">
<input type="date" id="date-range-start">
<input type="date" id="date-range-end">
</div>

<div class="no-payments-container" style="
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
height: 300px;
margin-top: 30px;
">
<img src="../images/history.svg" alt="No Payments" style="
width: 150px;
height: 150px;
margin-bottom: -550px;
">
<p style="
color: #666;
font-size: 16px;
top: 500px;
">No payment history available</p>
</div>
`]
};

const tabButtons = {
    transactions: document.getElementById("btn-transactions"),
    paymentHistory: document.getElementById("btn-payment-history")
};

const tabContent = document.getElementById("tab-content");

function displayContent(key) {
    const data = tabContentData[key];
    tabContent.innerHTML = data ? data.join('') : '';
}

function highlightButton(activeKey) {
    Object.entries(tabButtons).forEach(([key, btn]) => {
        btn.querySelector('.tab').classList.toggle('active', key === activeKey);
    });
}

Object.entries(tabButtons).forEach(([key, btn]) => {
    btn.addEventListener('click', () => {
        highlightButton(key);
        displayContent(key);
    });
});



highlightButton('transactions');
displayContent('transactions');

const popupBtn = document.getElementById("popupBtn");
const overlay = document.getElementById("overlay");
const popupAccountDetails = document.getElementById("popupAccountDetails");
const closePopup = document.getElementById("closePopup");

if (popupBtn && overlay && popupAccountDetails && closePopup) {
    popupBtn.addEventListener("click", () => {
        overlay.classList.add("active");
        popupAccountDetails.classList.add("active");
    });

    closePopup.addEventListener("click", () => {
        overlay.classList.remove("active");
        popupAccountDetails.classList.remove("active");
    });

    overlay.addEventListener("click", () => {
        overlay.classList.remove("active");
        popupAccountDetails.classList.remove("active");
    });
}


const overlayInfo = document.getElementById("overlay-info");
const popupInfoDetails = document.getElementById("popupInfoDetails");
const closePopupInfo = document.getElementById("closePopupInfo");
const infoTrigger = document.getElementById("info-trigger");

if (infoTrigger && overlayInfo && popupInfoDetails && closePopupInfo) {
    infoTrigger.addEventListener("click", () => {
        overlayInfo.classList.add("active");
        popupInfoDetails.classList.add("active");
    });

    closePopupInfo.addEventListener("click", () => {
        overlayInfo.classList.remove("active");
        popupInfoDetails.classList.remove("active");
    });

    overlayInfo.addEventListener("click", () => {
        overlayInfo.classList.remove("active");
        popupInfoDetails.classList.remove("active");
    });
}



    document.addEventListener('DOMContentLoaded', function() {
    
    const setAuthOption = document.querySelectorAll('.popup-accountdetails-option')[1];

    setAuthOption.addEventListener('click', function() {
    
    document.getElementById('popupAccountDetails').classList.remove('active');
    document.getElementById('overlay').classList.remove('active');

    
    showAuthSetupStep1Screen();
});

    function showAuthSetupStep1Screen() {
    const authFlowScreen = document.getElementById('authFlowScreen');
    authFlowScreen.style.display = 'block';
    document.getElementById('authFlowBackdrop').style.display = 'block';

    authFlowScreen.innerHTML = `
<div class="notch"></div>
<div class="auth-setup-flow-container">

 <div class="auth-setup-flow-header">
 
 <h1>Set Account Authorisations</h1>
 <div class="auth-flow-step-indicator">Step 1 of 2</div>
 </div>

 <div class="auth-flow-edit-section">
 <h2>Edit</h2>

 <div class="auth-flow-permission-section">
 <h3>Who can create payments?</h3>
 <select class="auth-flow-select" id="creator-select">
 <option value="authoriser">Authoriser</option>
 <option value="capturer">Capturer</option>
 </select>
 </div>

 <div class="auth-flow-permission-section">
 <h3>Who must approve payments?</h3>
 <select class="auth-flow-select" id="approver-select">
 <option value="no-one">No one</option>
 <option value="one-person">One person</option>
 <option value="two-people">Two people</option>
 <option value="choose-approvers">Choose approvers</option>
 </select>
 </div>

 <div id="approver-details-container" style="display: none;">
 </div>
 </div>

 <div class="separator-line"></div>

 <div class="auth-flow-action-btns">
 <button class="js-auth-flow-continue-btn auth-flow-primary-btn">Continue</button>
 <button class="js-auth-flow-cancel-btn auth-flow-secondary-btn">Cancel</button>
 </div>
</div>
`;

    
    const approverSelect = authFlowScreen.querySelector('#approver-select');
    approverSelect.addEventListener('change', function() {
    updateApproverDetails(this.value);
});

    
    updateApproverDetails(approverSelect.value);

    
    authFlowScreen.querySelector('.js-auth-flow-continue-btn').addEventListener('click', showAuthFlowConfirmationScreen);
    authFlowScreen.querySelector('.js-auth-flow-cancel-btn').addEventListener('click', cancelAuthFlowAction);
    authFlowScreen.querySelector('.js-auth-flow-back-btn').addEventListener('click', function() {
    
    document.getElementById('popupAccountDetails').classList.add('active');
    document.getElementById('overlay').classList.add('active');
    closeAuthFlowScreen();
});

    function updateApproverDetails(selectedValue) {
    const container = authFlowScreen.querySelector('#approver-details-container');
    container.innerHTML = '';
    container.style.display = 'none';

    if (selectedValue === 'one-person') {
    container.style.display = 'block';
    container.innerHTML = `
 <div class="auth-flow-permission-section">
 <h3>1st Approver</h3>
 <select class="auth-flow-select" id="first-approver-select">
 <option value="authoriser">Authoriser</option>
 <option value="capturer">Capturer</option>
 </select>
 </div>
 `;
} else if (selectedValue === 'two-people') {
    container.style.display = 'block';
    container.innerHTML = `
 <div class="auth-flow-permission-section">
 <h3>1st Approver</h3>
 <select class="auth-flow-select" id="first-approver-select">
 <option value="authoriser">Authoriser</option>
 <option value="capturer">Capturer</option>
 </select>
 </div>
 <div class="auth-flow-permission-section">
 <h3>2nd Approver</h3>
 <select class="auth-flow-select" id="second-approver-select">
 <option value="authoriser">Authoriser</option>
 <option value="capturer">Capturer</option>
 </select>
 </div>
 `;
}
}
}

    function showAuthFlowConfirmationScreen() {
    const authFlowScreen = document.getElementById('authFlowScreen');

    
    const creatorValue = document.getElementById('creator-select').value;
    const approverValue = document.getElementById('approver-select').value;

    
    let approverDetails = '';
    if (approverValue === 'one-person') {
    const firstApprover = document.getElementById('first-approver-select').value;
    approverDetails = ` (${formatApproverDisplayValue(firstApprover)})`;
} else if (approverValue === 'two-people') {
    const firstApprover = document.getElementById('first-approver-select').value;
    const secondApprover = document.getElementById('second-approver-select').value;
    approverDetails = ` (${formatApproverDisplayValue(firstApprover)} and ${formatApproverDisplayValue(secondApprover)})`;
}

    
    authFlowScreen.innerHTML = `
<div class="notch"></div>
<div class="auth-setup-flow-container">
 <div class="auth-setup-flow-header">
 <span class="material-icons-sharp js-auth-flow-back-btn">arrow_back</span>
 <h1>Set Account Authorisations</h1>
 </div>

 <div class="auth-flow-confirmation-section">
 <div class="auth-flow-confirmation-item">
 <div class="auth-flow-confirmation-label">Who can create payments?</div>
 <div class="auth-flow-confirmation-value">${formatAuthFlowDisplayValue(creatorValue)}</div>
 <a href="#" class="js-auth-flow-edit-link">Edit</a>
 </div>

 <div class="auth-flow-confirmation-item">
 <div class="auth-flow-confirmation-label">Who must approve payments?</div>
 <div class="auth-flow-confirmation-value">${formatAuthFlowDisplayValue(approverValue)}${approverDetails}</div>
 <a href="#" class="js-auth-flow-edit-link">Edit</a>
 </div>
 </div>

 <div class="separator-line"></div>

 <div class="auth-flow-action-btns">
 <button class="js-auth-flow-confirm-btn auth-flow-primary-btn">Confirm</button>
 <button class="js-auth-flow-cancel-btn auth-flow-secondary-btn">Cancel</button>
 </div>
</div>
`;

    
    authFlowScreen.querySelector('.js-auth-flow-confirm-btn').addEventListener('click', confirmAuthFlowAction);
    authFlowScreen.querySelector('.js-auth-flow-cancel-btn').addEventListener('click', cancelAuthFlowAction);
    authFlowScreen.querySelectorAll('.js-auth-flow-edit-link')[0].addEventListener('click', function(e) {
    e.preventDefault();
    showAuthSetupStep1Screen();
});
    authFlowScreen.querySelectorAll('.js-auth-flow-edit-link')[1].addEventListener('click', function(e) {
    e.preventDefault();
    showAuthSetupStep1Screen();
});
    authFlowScreen.querySelector('.js-auth-flow-back-btn').addEventListener('click', showAuthSetupStep1Screen);
}

    function formatAuthFlowDisplayValue(value) {
    const mappings = {
    'authoriser': 'Authoriser',
    'capturer': 'Capturer',
    'choose-approvers': 'Choose approvers',
    'no-one': 'No one',
    'one-person': 'One person',
    'two-people': 'Two people'
};
    return mappings[value] || value;
}

    function formatApproverDisplayValue(value) {
    return value === 'authoriser' ? 'Authoriser' : 'Capturer';
}

    function cancelAuthFlowAction() {
    closeAuthFlowScreen();
}

    function confirmAuthFlowAction() {
    
    alert('Account authorizations updated successfully!');
    closeAuthFlowScreen();
}

    function closeAuthFlowScreen() {
    document.getElementById('authFlowScreen').style.display = 'none';
    document.getElementById('authFlowScreen').innerHTML = '';
    document.getElementById('authFlowBackdrop').style.display = 'none';
}
});