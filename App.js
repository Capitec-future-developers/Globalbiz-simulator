document.addEventListener('DOMContentLoaded', function() {
    // =============================================
    // PROFILE, SIDEBAR, AND GENERAL UI FUNCTIONALITY
    // =============================================

    // Profile popup functionality
    const profileLink = document.getElementById('profile-link');
    const profilePopup = document.getElementById('profilePopup');
    const overlay = document.getElementById('overlay');

    if (profileLink && profilePopup && overlay) {
        profileLink.addEventListener('click', function(e) {
            e.preventDefault();
            profilePopup.classList.add('active');
            overlay.classList.add('active');
        });

        overlay.addEventListener('click', function() {
            profilePopup.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    // Sidebar toggle functionality - FIXED VERSION
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const toggleButton = document.getElementById('sidebarToggle');

    if (sidebar && mainContent && toggleButton) {
        const menuIcon = '<span class="material-icons-sharp">menu</span>';
        const closeIcon = '<span class="material-icons-sharp">close</span>';
        const chevronIcon = '<span class="material-icons-sharp">chevron_right</span>';

        // Function to toggle sidebar
        function toggleSidebar() {
            const isCollapsed = sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded', isCollapsed);

            // Change icon based on state
            if (isCollapsed) {
                toggleButton.innerHTML = chevronIcon;
            } else {
                toggleButton.innerHTML = menuIcon;
            }

            // Save state to localStorage
            localStorage.setItem('sidebarCollapsed', isCollapsed);
        }

        // Initialize sidebar state
        function initSidebar() {
            const savedState = localStorage.getItem('sidebarCollapsed');
            if (savedState === 'true') {
                sidebar.classList.add('collapsed');
                mainContent.classList.add('expanded');
                toggleButton.innerHTML = chevronIcon;
            } else {
                sidebar.classList.remove('collapsed');
                mainContent.classList.remove('expanded');
                toggleButton.innerHTML = menuIcon;
            }
        }

        // Set up event listener
        toggleButton.addEventListener('click', toggleSidebar);

        // Initialize on load
        initSidebar();
    }

    // Platform selection functionality
    const startBtn = document.getElementById('startBtn');
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            document.getElementById('platformOptions').style.display = 'block';
            this.style.display = 'none';
        });

        const platformButtons = document.querySelectorAll('[data-platform]');
        platformButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const platform = this.getAttribute('data-platform');
                const proceedLink = document.getElementById('proceedLink');

                if (platform === 'app') {
                    proceedLink.href = "Phone.html";
                } else {
                    proceedLink.href = "transact.html";
                }

                document.getElementById('proceedBtn').style.display = 'block';
                document.getElementById('platformOptions').style.display = 'none';
            });
        });
    }

    // Enhanced Dropdown toggle functionality for Transact
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = this.parentElement;
            dropdown.classList.toggle('active');

            // Close other open dropdowns if any
            document.querySelectorAll('.dropdown').forEach(item => {
                if (item !== dropdown && item.classList.contains('active')) {
                    item.classList.remove('active');
                }
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown').forEach(item => {
                    item.classList.remove('active');
                });
            }
        });
    }

    // =============================================
    // TAB FUNCTIONALITY
    // =============================================

    // Tab content data
    const content = [
        // Transactions tab
        [
            `<table class="transaction-table">
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
                <tr>
                    <td>30 April 2025</td>
                    <td>Debit</td>
                    <td>Month S/Fee</td>
                    <td class="positive">R0.00</td>
                    <td class="negative">- R50.00</td>
                    <td class="negative">- R154.21</td>
                </tr>
                <tr>
                    <td>30 April 2025</td>
                    <td>Debit</td>
                    <td>Debit Interest - System Generated</td>
                    <td class="negative">- R1.86</td>
                    <td>R0.00</td>
                    <td class="negative">- R104.21</td>
                </tr>
                </tbody>
            </table>`
        ],
        // Payment history tab
        [
            "Payment 1: R500.00 to John Doe",
            "Payment 2: R1,200.00 to ABC Suppliers",
            "Payment 3: R350.00 to Utility Company"
        ],
        // Stamped statements tab
        [
            "Statement for April 2025",
            "Statement for March 2025",
            "Statement for February 2025"
        ],
        // Account information tab
        [
            "Account opened: 15 January 2023",
            "Account status: Active",
            "Overdraft limit: R10,000.00",
            "Linked accounts: Savings (1052 2626 44)"
        ]
    ];

    // Tab functionality
    const btnTransactions = document.getElementById("btn-transactions");
    const btnPaymentHistory = document.getElementById("btn-payment-history");
    const btnStampedStatements = document.getElementById("btn-stamped-statements");
    const btnAccountInformation = document.getElementById("btn-account-information");
    const tabContent = document.getElementById("tab-content");

    // Function to display content in the tab
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

    // Function to highlight the active button
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

    // Function to handle button clicks
    function handleClick(event) {
        const button = event.target.closest('button');
        if (!button) return;

        // Add click animation
        button.style.transform = 'translateY(2px)';
        setTimeout(() => {
            button.style.transform = '';
        }, 100);

        highlightButton(button);

        // Load appropriate content
        switch(button.id) {
            case "btn-transactions":
                displayContent(content[0]);
                break;
            case "btn-payment-history":
                displayContent(content[1]);
                break;
            case "btn-stamped-statements":
                displayContent(content[2]);
                break;
            case "btn-account-information":
                displayContent(content[3]);
                break;
            default:
                console.warn("Unknown button clicked:", button.id);
        }
    }

    // Add event listeners to all tab buttons
    [btnTransactions, btnPaymentHistory, btnStampedStatements, btnAccountInformation].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', handleClick);
        } else {
            console.error("Button not found:", btn && btn.id);
        }
    });

    // Load initial content (Transactions tab)
    if (btnTransactions && tabContent) {
        btnTransactions.classList.add('active');
        const tab = btnTransactions.querySelector('.tab');
        if (tab) tab.classList.add('active');
        displayContent(content[0]);
    }

    // =============================================
    // PAYMENT AND CREATE FUNCTIONALITY (UPDATED VERSION)
    // =============================================

    // DOM Elements
    const paymentButton = document.getElementById('payment');
    const mainContentArea = document.getElementById('main-content-area');
    const defaultContent = document.getElementById('default-content');
    const contentWrapper = document.querySelector('.content-wrapper');
    const createButton = document.getElementById('create');

    // Quick action buttons
    const savedPaymentBtn = document.getElementById('saved-payment-btn');
    const onceoffPaymentBtn = document.getElementById('onceoff-payment-btn');
    const groupPaymentBtn = document.getElementById('group-payment-btn');
    const createBeneficiaryBtn = document.getElementById('create-beneficiary-btn');

    // Determine if we're in the app or online banking context
    const isAppContext = window.location.pathname.includes('Phone.html');

    // Navigation state management
    let navigationStack = [];

    // Event Listeners
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

    if (savedPaymentBtn) {
        savedPaymentBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showBeneficiarySelection();
        });
    }

    if (onceoffPaymentBtn) {
        onceoffPaymentBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showPaymentForm('onceoff');
        });
    }

    if (groupPaymentBtn) {
        groupPaymentBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showPaymentForm('group');
        });
    }

    if (createBeneficiaryBtn) {
        createBeneficiaryBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showAddBeneficiaryForm();
        });
    }

    // Main Functions
    function showPaymentSection() {
        toggleContentVisibility();

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

        // Add event listeners
        const backButton = document.getElementById('back-to-transact');
        if (backButton) {
            backButton.addEventListener('click', function() {
                if (isAppContext) {
                    window.location.href = 'Phone2.html';
                } else {
                    window.location.href = 'Phone Transact.html';
                }
            });
        }

        document.getElementById('saved-beneficiary-option').addEventListener('click', showBeneficiarySelection);
        document.getElementById('onceoff-beneficiary-option').addEventListener('click', function() {
            showPaymentForm('onceoff');
        });
        document.getElementById('group-payment-option').addEventListener('click', function() {
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

        // Add event listeners for back button
        document.getElementById('back-button').addEventListener('click', function() {
            navigateBack();
        });

        // Add event listeners for create options
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
                    <div class="beneficiary-card" data-beneficiary="Omphile Mohlala">
                        <div class="beneficiary-avatar">
                            <span class="material-icons-sharp">person</span>
                        </div>
                        <div class="beneficiary-details">
                            <h3>Omphile Mohlala</h3>
                            <p>Account: ****5678</p>
                            <p>Bank: Standard Bank</p>
                        </div>
                        <span class="material-icons-sharp chevron-right">chevron_right</span>
                    </div>

                    <div class="beneficiary-card" data-beneficiary="John Doe">
                        <div class="beneficiary-avatar">
                            <span class="material-icons-sharp">person</span>
                        </div>
                        <div class="beneficiary-details">
                            <h3>John Doe</h3>
                            <p>Account: ****1234</p>
                            <p>Bank: First National Bank</p>
                        </div>
                        <span class="material-icons-sharp chevron-right">chevron_right</span>
                    </div>
                </div>

                <div class="add-beneficiary-footer">
                    <button id="add-new-beneficiary" class="add-beneficiary-btn">
                        <span class="material-icons-sharp">add</span> Add New Beneficiary
                    </button>
                </div>
            </div>
        `;

        // Back button
        document.getElementById('back-button').addEventListener('click', function() {
            navigateBack();
        });

        // Beneficiary selection
        document.querySelectorAll('.beneficiary-card').forEach(card => {
            card.addEventListener('click', function() {
                const beneficiaryName = this.getAttribute('data-beneficiary');
                showPaymentForm('saved', beneficiaryName);
            });
        });

        // Add new beneficiary
        document.getElementById('add-new-beneficiary').addEventListener('click', function() {
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
                            <option value="standard">Standard Bank</option>
                            <option value="fnb">First National Bank</option>
                            <option value="absa">ABSA</option>
                            <option value="nedbank">Nedbank</option>
                            <option value="capitec">Capitec</option>
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

        // Back button
        document.getElementById('back-button').addEventListener('click', function() {
            navigateBack();
        });

        // Form submission
        document.getElementById('payment-form').addEventListener('submit', function(e) {
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
                            <option value="standard">Standard Bank</option>
                            <option value="fnb">First National Bank</option>
                            <option value="absa">ABSA</option>
                            <option value="nedbank">Nedbank</option>
                            <option value="capitec">Capitec</option>
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

        // Back button
        document.getElementById('back-button').addEventListener('click', function() {
            navigateBack();
        });

        // Form submission
        document.getElementById('beneficiary-form').addEventListener('submit', function(e) {
            e.preventDefault();
            saveBeneficiary();
        });
    }

    function processPayment(paymentType, beneficiaryName) {
        const amount = document.getElementById('amount').value;
        const reference = document.getElementById('reference').value;

        // Show processing
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

        // Simulate processing delay
        setTimeout(() => {
            showPaymentConfirmation(paymentType, beneficiaryName, amount, reference);
        }, 3000);
    }

    function saveBeneficiary() {
        const name = document.getElementById('beneficiary-name').value;
        const accountNumber = document.getElementById('account-number').value;
        const bank = document.getElementById('bank').value;

        // Show processing
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

        // Simulate processing delay
        setTimeout(() => {
            showBeneficiaryConfirmation(name);
        }, 2000);
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
                        <span>R ${amount}</span>
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

        // Button handlers
        document.getElementById('done-button').addEventListener('click', function() {
            resetToMainView();
        });

        document.getElementById('receipt-button').addEventListener('click', function() {
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

        // Button handlers
        document.getElementById('done-button').addEventListener('click', function() {
            resetToMainView();
        });

        document.getElementById('pay-now-button').addEventListener('click', function() {
            showPaymentForm('saved', name);
        });
    }

    function handleOptionClick(optionType) {
        // Placeholder for other option types
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

    // Navigation functions
    function navigateBack() {
        if (navigationStack.length > 0) {
            navigationStack.pop(); // Remove current view
            const previousView = navigationStack.pop(); // Get previous view

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