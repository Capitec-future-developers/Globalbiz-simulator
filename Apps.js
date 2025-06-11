// =============================================
// CONFIGURATION AND INITIALIZATION
// =============================================
const API_BASE_URL = 'http://localhost:3000/api';
let currentUser = null;
let authToken = null;
let navigationStack = [];
const isAppContext = window.location.pathname.includes('Phone.html');

// =============================================
// AUTHENTICATION AND API COMMUNICATION
// =============================================
async function apiRequest(endpoint, method = 'GET', data = null) {
    const config = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(authToken && { 'Authorization': `Bearer ${authToken}` })
        },
        ...(data && { body: JSON.stringify(data) })
    };

    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, config);
        if (!response.ok) throw new Error(`API request failed: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`API error (${endpoint}):`, error);
        throw error;
    }
}

async function login(email, password) {
    try {
        const data = await apiRequest('login', 'POST', { email, password });
        authToken = data.token;
        currentUser = data.user;

        // Update UI
        document.querySelectorAll('.profile-Name').forEach(el => el.textContent = currentUser.name);
        document.querySelector('.popup-header').textContent = currentUser.email;
        return true;
    } catch (error) {
        console.error('Login error:', error);
        return false;
    }
}

// Data fetching functions
const fetchAccounts = () => apiRequest('accounts');
const fetchTransactions = () => apiRequest('transactions');
const fetchBeneficiaries = () => apiRequest('beneficiaries');
const addBeneficiary = (data) => apiRequest('beneficiaries', 'POST', data);
const makePayment = (data) => apiRequest('payments', 'POST', data);

// =============================================
// UI INITIALIZATION AND EVENT HANDLERS
// =============================================
function initializeUI() {
    // Profile and dropdown functionality
    setupDropdowns();
    setupProfilePopup();
    setupSidebarToggle();
    setupPlatformSelection();
    setupTabs();
    setupTransactionButtons();
}

function setupDropdowns() {
    document.querySelectorAll('.dropdown-toggle').forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            this.closest('.dropdown').classList.toggle('active');
        });
    });

    document.addEventListener('click', () => {
        document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
    });
}

function setupProfilePopup() {
    const profileLink = document.getElementById('profile-link');
    const profilePopup = document.getElementById('profilePopup');
    const overlay = document.getElementById('overlay');

    if (profileLink && profilePopup && overlay) {
        profileLink.addEventListener('click', (e) => {
            e.preventDefault();
            profilePopup.classList.add('active');
            overlay.classList.add('active');
        });

        overlay.addEventListener('click', () => {
            profilePopup.classList.remove('active');
            overlay.classList.remove('active');
        });
    }
}

function setupSidebarToggle() {
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.getElementById('mainContent');
    const toggleButton = document.getElementById('sidebarToggle');

    if (sidebar && mainContent && toggleButton) {
        const icons = {
            menu: '<span class="material-icons-sharp">menu</span>',
            chevron: '<span class="material-icons-sharp">chevron_right</span>'
        };

        toggleButton.addEventListener('click', () => {
            const isCollapsed = sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded', isCollapsed);
            toggleButton.innerHTML = isCollapsed ? icons.chevron : icons.menu;
            localStorage.setItem('sidebarCollapsed', isCollapsed);
        });

        if (localStorage.getItem('sidebarCollapsed') === 'true') {
            sidebar.classList.add('collapsed');
            mainContent.classList.add('expanded');
            toggleButton.innerHTML = icons.chevron;
        }
    }
}

function setupPlatformSelection() {
    const startBtn = document.getElementById('startBtn');
    if (!startBtn) return;

    startBtn.addEventListener('click', () => {
        const platformOptions = document.getElementById('platformOptions');
        if (platformOptions) {
            platformOptions.style.display = 'block';
            startBtn.style.display = 'none';
        }
    });

    document.querySelectorAll('[data-platform]').forEach(btn => {
        btn.addEventListener('click', function() {
            const platform = this.getAttribute('data-platform');
            const proceedLink = document.getElementById('proceedLink');
            const proceedBtn = document.getElementById('proceedBtn');
            const platformOptions = document.getElementById('platformOptions');

            if (proceedLink && proceedBtn && platformOptions) {
                proceedLink.href = platform === 'app' ? "Phone.html" : "Login.html";
                proceedBtn.style.display = 'block';
                platformOptions.style.display = 'none';
            }
        });
    });
}

// =============================================
// TAB FUNCTIONALITY
// =============================================
const tabContentData = {
    transactions: [`
        <table class="transaction-table">
            <thead><tr>
                <th>Date</th><th>Transaction Type</th><th>Reference</th>
                <th>Amount</th><th>Fees</th><th>Balance</th>
            </tr></thead>
            <tbody>
                <tr>
                    <td>30 April 2025</td><td>Debit</td><td>Month S/Fee</td>
                    <td class="positive">R0.00</td><td class="negative">- R50.00</td><td class="negative">- R154.21</td>
                </tr>
                <tr>
                    <td>30 April 2025</td><td>Debit</td><td>Debit Interest</td>
                    <td class="negative">- R1.86</td><td>R0.00</td><td class="negative">- R104.21</td>
                </tr>
            </tbody>
        </table>
    `],
    paymentHistory: [
        "Payment 1: R500.00 to John Doe",
        "Payment 2: R1,200.00 to ABC Suppliers",
        "Payment 3: R350.00 to Utility Company"
    ],
    stampedStatements: [
        "Statement for April 2025",
        "Statement for March 2025",
        "Statement for February 2025"
    ],
    accountInformation: [
        "Account opened: 15 January 2023",
        "Account status: Active",
        "Overdraft limit: R10,000.00",
        "Linked accounts: Savings (1052 2626 44)"
    ]
};

function setupTabs() {
    const tabs = {
        transactions: document.getElementById("btn-transactions"),
        paymentHistory: document.getElementById("btn-payment-history"),
        stampedStatements: document.getElementById("btn-stamped-statements"),
        accountInformation: document.getElementById("btn-account-information")
    };
    const tabContent = document.getElementById("tab-content");

    function showTab(tabId) {
        // Update UI
        Object.values(tabs).forEach(tab => {
            if (tab) {
                tab.classList.remove('active');
                const tabEl = tab.querySelector('.tab');
                if (tabEl) tabEl.classList.remove('active');
            }
        });

        if (tabs[tabId]) {
            tabs[tabId].classList.add('active');
            const tabEl = tabs[tabId].querySelector('.tab');
            if (tabEl) tabEl.classList.add('active');
        }

        // Update content
        if (tabContent && tabContentData[tabId]) {
            const content = tabContentData[tabId];
            tabContent.innerHTML = content.length === 1 && content[0].startsWith('<table')
                ? content[0]
                : `<ul class="content-list">${content.map(item => `<li>${item}</li>`).join('')}</ul>`;
        }
    }

    // Add event listeners
    Object.entries(tabs).forEach(([tabId, tab]) => {
        if (tab) {
            tab.addEventListener('click', () => {
                tab.style.transform = 'translateY(2px)';
                setTimeout(() => tab.style.transform = '', 100);
                showTab(tabId);
            });
        }
    });

    // Show initial tab
    if (tabs.transactions) showTab('transactions');
}

// =============================================
// TRANSACTION FLOW FUNCTIONS
// =============================================
function setupTransactionButtons() {
    // Main action buttons
    document.getElementById('payment')?.addEventListener('click', showPaymentSection);
    document.getElementById('create')?.addEventListener('click', showCreateOptions);

    // Quick action buttons
    document.getElementById('saved-payment-btn')?.addEventListener('click', showBeneficiarySelection);
    document.getElementById('onceoff-payment-btn')?.addEventListener('click', () => showPaymentForm('onceoff'));
    document.getElementById('group-payment-btn')?.addEventListener('click', () => showPaymentForm('group'));
    document.getElementById('create-beneficiary-btn')?.addEventListener('click', showAddBeneficiaryForm);
}

function showPaymentSection() {
    toggleContentVisibility();
    navigationStack.push('payment-section');

    const paymentOptions = [
        { id: 'saved-beneficiary', icon: 'bookmark', title: 'Saved Beneficiary', desc: 'Pay to a saved recipient' },
        { id: 'onceoff-beneficiary', icon: 'person_add', title: 'Once-off Beneficiary', desc: 'Pay to a new recipient' },
        { id: 'group-payment-option', icon: 'groups', title: 'Group Payment', desc: 'Pay multiple beneficiaries' },
        { id: 'all-payments', icon: 'list_alt', title: 'All Payments', desc: 'View all payment history', type: 'all-payments' },
        { id: 'recurring', icon: 'autorenew', title: 'Recurring Payments', desc: 'Manage scheduled payments', type: 'recurring' },
        { id: 'future', icon: 'event', title: 'Future Dated Payments', desc: 'Schedule future payments', type: 'future' }
    ];

    document.getElementById('main-content-area').innerHTML = `
        <div class="payment-section">
            <div class="payment-header">
                <button class="back-button" id="back-to-transact">
                    <span class="material-icons-sharp">arrow_back</span> Back
                </button>
                <h2>Make a Payment</h2>
                <p>Choose your payment method</p>
            </div>
            <div class="payment-options-grid">
                ${paymentOptions.map(opt => `
                <div class="payment-option-row">
                    <div class="payment-option ${opt.type ? 'clickable-option' : ''}" 
                         id="${opt.id}" ${opt.type ? `data-type="${opt.type}"` : ''}>
                        <div class="payment-icon"><span class="material-icons-sharp">${opt.icon}</span></div>
                        <div class="payment-details">
                            <h3>${opt.title}</h3><p>${opt.desc}</p>
                        </div>
                        <span class="material-icons-sharp chevron-right">chevron_right</span>
                    </div>
                </div>`).join('')}
            </div>
        </div>
    `;

    // Event handlers
    document.getElementById('back-to-transact')?.addEventListener('click', () => {
        window.location.href = isAppContext ? 'Phone.html' : 'Computer.html';
    });

    document.getElementById('saved-beneficiary')?.addEventListener('click', showBeneficiarySelection);
    document.getElementById('onceoff-beneficiary')?.addEventListener('click', () => showPaymentForm('onceoff'));
    document.getElementById('group-payment-option')?.addEventListener('click', () => showPaymentForm('group'));

    document.querySelectorAll('.clickable-option').forEach(opt => {
        opt.addEventListener('click', () => handleOptionClick(opt.dataset.type));
    });
}

function showCreateOptions() {
    toggleContentVisibility();
    navigationStack.push('create-options');

    const createOptions = [
        { type: 'beneficiary', icon: 'person_add', title: 'New Beneficiary', desc: 'Add someone to pay regularly' },
        { type: 'payment-request', icon: 'request_quote', title: 'Payment Request', desc: 'Request money from someone' },
        { type: 'recurring-payment', icon: 'autorenew', title: 'Recurring Payment', desc: 'Set up regular payments' }
    ];

    document.getElementById('main-content-area').innerHTML = `
        <div class="create-section">
            <div class="create-header">
                <button class="back-button" id="back-button">
                    <span class="material-icons-sharp">arrow_back</span> Back
                </button>
                <h2>Create New</h2><p>Choose what you want to create</p>
            </div>
            <div class="create-options-grid">
                ${createOptions.map(opt => `
                <div class="create-option-row">
                    <div class="create-option" data-type="${opt.type}">
                        <div class="create-icon"><span class="material-icons-sharp">${opt.icon}</span></div>
                        <div class="create-details">
                            <h3>${opt.title}</h3><p>${opt.desc}</p>
                        </div>
                        <span class="material-icons-sharp chevron-right">chevron_right</span>
                    </div>
                </div>`).join('')}
            </div>
        </div>
    `;

    // Event handlers
    document.getElementById('back-button')?.addEventListener('click', navigateBack);
    document.querySelectorAll('.create-option').forEach(opt => {
        opt.addEventListener('click', () => handleCreateOption(opt.dataset.type));
    });
}

function showBeneficiarySelection() {
    toggleContentVisibility();
    navigationStack.push('beneficiary-selection');

    const beneficiaries = [
        { name: 'Omphile Mohlala', account: '****5678', bank: 'Standard Bank' },
        { name: 'John Doe', account: '****1234', bank: 'First National Bank' }
    ];

    document.getElementById('main-content-area').innerHTML = `
        <div class="beneficiary-selection">
            <div class="payment-header">
                <button class="back-button" id="back-button">
                    <span class="material-icons-sharp">arrow_back</span> Back
                </button>
                <h2>Select Beneficiary</h2><p>Choose from your saved beneficiaries</p>
            </div>
            <div class="beneficiary-list">
                ${beneficiaries.map(ben => `
                <div class="beneficiary-card" data-beneficiary="${ben.name}">
                    <div class="beneficiary-avatar"><span class="material-icons-sharp">person</span></div>
                    <div class="beneficiary-details">
                        <h3>${ben.name}</h3><p>Account: ${ben.account}</p><p>Bank: ${ben.bank}</p>
                    </div>
                    <span class="material-icons-sharp chevron-right">chevron_right</span>
                </div>`).join('')}
            </div>
            <div class="add-beneficiary-footer">
                <button id="add-new-beneficiary" class="add-beneficiary-btn">
                    <span class="material-icons-sharp">add</span> Add New Beneficiary
                </button>
            </div>
        </div>
    `;

    // Event handlers
    document.getElementById('back-button')?.addEventListener('click', navigateBack);
    document.querySelectorAll('.beneficiary-card').forEach(card => {
        card.addEventListener('click', () => showPaymentForm('saved', card.dataset.beneficiary));
    });
    document.getElementById('add-new-beneficiary')?.addEventListener('click', showAddBeneficiaryForm);
}

function showPaymentForm(paymentType, beneficiaryName = '') {
    toggleContentVisibility();
    navigationStack.push('payment-form');

    const titles = {
        saved: `Pay ${beneficiaryName}`,
        onceoff: 'Pay New Beneficiary',
        group: 'Group Payment'
    };

    document.getElementById('main-content-area').innerHTML = `
        <div class="payment-form-section">
            <div class="payment-header">
                <button class="back-button" id="back-button">
                    <span class="material-icons-sharp">arrow_back</span> Back
                </button>
                <h2>${titles[paymentType] || 'Make Payment'}</h2>
                <p>Enter payment details</p>
            </div>
            <form id="payment-form">
                ${paymentType === 'saved' ? `
                <div class="form-group">
                    <label>Beneficiary</label>
                    <div class="read-only-field">${beneficiaryName}</div>
                </div>` : ''}
                <div class="form-group">
                    <label for="amount">Amount (ZAR)</label>
                    <input type="number" id="amount" placeholder="0.00" min="1" required>
                </div>
                <div class="form-group">
                    <label for="reference">Payment Reference</label>
                    <input type="text" id="reference" placeholder="Enter reference" required>
                </div>
                ${paymentType === 'onceoff' ? `
                <div class="form-group">
                    <label for="account-number">Account Number</label>
                    <input type="text" id="account-number" placeholder="Enter account number" required>
                </div>
                <div class="form-group">
                    <label for="bank">Bank</label>
                    <select id="bank" required>
                        <option value="">Select bank</option>
                        <option value="standard">Standard Bank</option>
                        <option value="fnb">First National Bank</option>
                        <option value="absa">ABSA</option>
                        <option value="nedbank">Nedbank</option>
                        <option value="capitec">Capitec</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="beneficiary-name">Beneficiary Name</label>
                    <input type="text" id="beneficiary-name" placeholder="Enter beneficiary name" required>
                </div>` : ''}
                ${paymentType === 'group' ? `
                <div class="form-group">
                    <label>Group Payment</label>
                    <div class="info-message">
                        <span class="material-icons-sharp">info</span>
                        <p>Please visit the full website to access group payment functionality</p>
                    </div>
                </div>` : ''}
                <div class="form-group">
                    <button type="submit" class="submit-payment-btn">
                        ${paymentType === 'onceoff' ? 'Pay & Save Beneficiary' : 'Confirm Payment'}
                    </button>
                </div>
            </form>
        </div>
    `;

    // Event handlers
    document.getElementById('back-button')?.addEventListener('click', navigateBack);
    document.getElementById('payment-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        processPayment(paymentType, beneficiaryName);
    });
}

function showAddBeneficiaryForm() {
    toggleContentVisibility();
    navigationStack.push('add-beneficiary-form');

    document.getElementById('main-content-area').innerHTML = `
        <div class="add-beneficiary-form">
            <div class="payment-header">
                <button class="back-button" id="back-button">
                    <span class="material-icons-sharp">arrow_back</span> Back
                </button>
                <h2>Add New Beneficiary</h2><p>Enter beneficiary details</p>
            </div>
            <form id="beneficiary-form">
                <div class="form-group">
                    <label for="beneficiary-name">Full Name</label>
                    <input type="text" id="beneficiary-name" placeholder="Enter full name" required>
                </div>
                <div class="form-group">
                    <label for="account-number">Account Number</label>
                    <input type="text" id="account-number" placeholder="Enter account number" required>
                </div>
                <div class="form-group">
                    <label for="bank">Bank</label>
                    <select id="bank" required>
                        <option value="">Select bank</option>
                        <option value="standard">Standard Bank</option>
                        <option value="fnb">First National Bank</option>
                        <option value="absa">ABSA</option>
                        <option value="nedbank">Nedbank</option>
                        <option value="capitec">Capitec</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="nickname">Nickname (Optional)</label>
                    <input type="text" id="nickname" placeholder="e.g. Mom's Account">
                </div>
                <div class="form-group">
                    <button type="submit" class="submit-btn">Save Beneficiary</button>
                </div>
            </form>
        </div>
    `;

    // Event handlers
    document.getElementById('back-button')?.addEventListener('click', navigateBack);
    document.getElementById('beneficiary-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        saveBeneficiary();
    });
}

// =============================================
// PROCESSING FUNCTIONS
// =============================================
async function processPayment(paymentType, beneficiaryName) {
    showProcessingUI('Processing Payment...', 'Please wait while we process your payment');

    setTimeout(() => {
        const amount = document.getElementById('amount').value;
        const reference = document.getElementById('reference').value;
        showConfirmationUI({
            title: 'Payment Successful!',
            message: 'Your payment has been processed successfully',
            details: [
                { label: 'Recipient', value: beneficiaryName || 'New Beneficiary' },
                { label: 'Amount', value: `R ${amount}` },
                { label: 'Reference', value: reference },
                { label: 'Date', value: new Date().toLocaleString() }
            ],
            primaryAction: { label: 'Done', handler: resetToMainView },
            secondaryAction: { label: 'Download Receipt', handler: () => alert('Receipt downloaded successfully!') }
        });
    }, 2000);
}

async function saveBeneficiary() {
    showProcessingUI('Saving Beneficiary...', 'Please wait while we save your beneficiary');

    setTimeout(() => {
        const name = document.getElementById('beneficiary-name').value;
        showConfirmationUI({
            title: 'Beneficiary Saved!',
            message: `${name} has been added to your beneficiaries`,
            primaryAction: { label: 'Done', handler: resetToMainView },
            secondaryAction: { label: 'Pay Now', handler: () => showPaymentForm('saved', name) }
        });
    }, 1500);
}

function showProcessingUI(title, message) {
    document.getElementById('main-content-area').innerHTML = `
        <div class="payment-processing">
            <div class="spinner">
                <div class="double-bounce1"></div>
                <div class="double-bounce2"></div>
            </div>
            <h2>${title}</h2><p>${message}</p>
        </div>
    `;
}

function showConfirmationUI({ title, message, details = [], primaryAction, secondaryAction }) {
    document.getElementById('main-content-area').innerHTML = `
        <div class="payment-confirmation">
            <div class="confirmation-icon success">
                <span class="material-icons-sharp">check_circle</span>
            </div>
            <h2>${title}</h2><p>${message}</p>
            ${details.length ? `
            <div class="confirmation-details">
                ${details.map(d => `
                <div class="detail-row">
                    <span>${d.label}:</span><span>${d.value}</span>
                </div>`).join('')}
            </div>` : ''}
            <div class="confirmation-actions">
                <button id="primary-action" class="done-btn">${primaryAction.label}</button>
                ${secondaryAction ? `
                <button id="secondary-action" class="secondary-btn">${secondaryAction.label}</button>` : ''}
            </div>
        </div>
    `;

    // Event handlers
    document.getElementById('primary-action')?.addEventListener('click', primaryAction.handler);
    document.getElementById('secondary-action')?.addEventListener('click', secondaryAction?.handler);
}

// =============================================
// UTILITY FUNCTIONS
// =============================================
function toggleContentVisibility() {
    const defaultContent = document.getElementById('default-content');
    const mainContentArea = document.getElementById('main-content-area');

    if (defaultContent && mainContentArea) {
        defaultContent.style.display = 'none';
        mainContentArea.style.display = 'block';
    }
}

function navigateBack() {
    if (navigationStack.length < 2) return resetToMainView();

    navigationStack.pop(); // Remove current view
    const previousView = navigationStack.pop(); // Get previous view

    switch(previousView) {
        case 'payment-section': showPaymentSection(); break;
        case 'beneficiary-selection': showBeneficiarySelection(); break;
        case 'create-options': showCreateOptions(); break;
        default: resetToMainView();
    }
}

function resetToMainView() {
    const defaultContent = document.getElementById('default-content');
    const mainContentArea = document.getElementById('main-content-area');

    if (defaultContent && mainContentArea) {
        defaultContent.style.display = 'block';
        mainContentArea.style.display = 'none';
        mainContentArea.innerHTML = '';
        navigationStack = [];
    }
}

function handleOptionClick(optionType) {
    alert(`Showing ${optionType.replace('-', ' ')}`);
}

function handleCreateOption(createType) {
    const actions = {
        beneficiary: showAddBeneficiaryForm,
        'payment-request': () => alert('Payment request functionality coming soon!'),
        'recurring-payment': () => alert('Recurring payment functionality coming soon!')
    };
    actions[createType]?.() || showCreateOptions();
}

// =============================================
// INITIALIZATION
// =============================================
document.addEventListener('DOMContentLoaded', async () => {
    initializeUI();

    // Demo login
    if (await login('omphilestudent@gmail.com', 'demo')) {
        console.log('Logged in successfully');
        const [accounts, transactions, beneficiaries] = await Promise.all([
            fetchAccounts(), fetchTransactions(), fetchBeneficiaries()
        ]);
        console.log('Loaded data:', { accounts, transactions, beneficiaries });
    }

    // Login form handler
    document.getElementById('login-button')?.addEventListener('click', async () => {
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        if (await login(email, password)) {
            document.getElementById('login-section').style.display = 'none';
            const [accounts, transactions, beneficiaries] = await Promise.all([
                fetchAccounts(), fetchTransactions(), fetchBeneficiaries()
            ]);
            // Update UI with loaded data
        } else {
            alert('Login failed. Please try again.');
        }
    });
});