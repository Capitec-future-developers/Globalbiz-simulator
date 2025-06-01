document.addEventListener('DOMContentLoaded', function() {
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

    // Sidebar toggle functionality
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const toggleButton = document.getElementById('sidebarToggle');

    if (sidebar && mainContent && toggleButton) {
        const menuIcon = '<span class="material-icons-sharp">menu</span>';
        const chevronIcon = '<span class="material-icons-sharp">chevron_right</span>';

        toggleButton.addEventListener('click', function() {
            const isCollapsed = sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded', isCollapsed);
            toggleButton.innerHTML = isCollapsed ? chevronIcon : menuIcon;
            localStorage.setItem('sidebarCollapsed', isCollapsed);
        });

        const savedState = localStorage.getItem('sidebarCollapsed');
        if (savedState === 'true') {
            sidebar.classList.add('collapsed');
            mainContent.classList.add('expanded');
            toggleButton.innerHTML = chevronIcon;
        }
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
                    proceedLink.href = "Computer.html";
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

    // Payment functionality
    const paymentButton = document.getElementById('payment');
    if (paymentButton) {
        paymentButton.addEventListener('click', function(e) {
            e.preventDefault();
            showPaymentSection();
        });
    }

    function showPaymentSection() {
        // Hide existing content
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.innerHTML = `
                <div class="back-nav">
                    <a href="#" id="back-to-accounts">
                        <span class="material-icons-sharp">arrow_back</span>
                        Back to Accounts
                    </a>
                </div>
                <div class="payment-section">
                    <div class="payment-header">
                        <h2>Make a Payment</h2>
                        <p>Transfer money to another account or pay a bill</p>
                    </div>
                    
                    <div class="payment-options">
                        <div class="payment-option">
                            <div class="payment-icon">
                                <span class="material-icons-sharp">account_balance</span>
                            </div>
                            <h3>Transfer to Account</h3>
                            <p>Send money to another bank account</p>
                            <button class="payment-select-btn" data-type="transfer">Select</button>
                        </div>
                        
                        <div class="payment-option">
                            <div class="payment-icon">
                                <span class="material-icons-sharp">receipt</span>
                            </div>
                            <h3>Pay a Bill</h3>
                            <p>Pay utilities, loans, or other bills</p>
                            <button class="payment-select-btn" data-type="bill">Select</button>
                        </div>
                    </div>
                </div>
            `;

            // Add back button functionality
            const backButton = document.getElementById('back-to-accounts');
            if (backButton) {
                backButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    location.reload(); // Reload the page to show original content
                });
            }

            // Add payment option selection functionality
            const paymentButtons = document.querySelectorAll('.payment-select-btn');
            paymentButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    const paymentType = this.getAttribute('data-type');
                    showPaymentForm(paymentType);
                });
            });
        }
    }

    function showPaymentForm(paymentType) {
        const paymentSection = document.querySelector('.payment-section');
        if (paymentSection) {
            if (paymentType === 'transfer') {
                paymentSection.innerHTML = `
                    <div class="back-nav">
                        <a href="#" id="back-to-payment-options">
                            <span class="material-icons-sharp">arrow_back</span>
                            Back to Payment Options
                        </a>
                    </div>
                    <div class="payment-form">
                        <h2>Transfer to Account</h2>
                        
                        <div class="form-group">
                            <label for="from-account">From Account</label>
                            <select id="from-account">
                                <option value="123456789">Main Account (123456789)</option>
                                <option value="987654321">Savings Account (987654321)</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="to-account">To Account Number</label>
                            <input type="text" id="to-account" placeholder="Enter account number">
                        </div>
                        
                        <div class="form-group">
                            <label for="bank">Bank</label>
                            <select id="bank">
                                <option value="">Select Bank</option>
                                <option value="absa">ABSA</option>
                                <option value="fnb">First National Bank</option>
                                <option value="standard">Standard Bank</option>
                                <option value="nedbank">Nedbank</option>
                                <option value="capitec">Capitec</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="amount">Amount (ZAR)</label>
                            <input type="number" id="amount" placeholder="0.00">
                        </div>
                        
                        <div class="form-group">
                            <label for="reference">Reference</label>
                            <input type="text" id="reference" placeholder="Payment reference">
                        </div>
                        
                        <button class="submit-payment">Continue</button>
                    </div>
                `;
            } else {
                paymentSection.innerHTML = `
                    <div class="back-nav">
                        <a href="#" id="back-to-payment-options">
                            <span class="material-icons-sharp">arrow_back</span>
                            Back to Payment Options
                        </a>
                    </div>
                    <div class="payment-form">
                        <h2>Pay a Bill</h2>
                        
                        <div class="form-group">
                            <label for="bill-from-account">From Account</label>
                            <select id="bill-from-account">
                                <option value="123456789">Main Account (123456789)</option>
                                <option value="987654321">Savings Account (987654321)</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="bill-type">Bill Type</label>
                            <select id="bill-type">
                                <option value="">Select Bill Type</option>
                                <option value="electricity">Electricity</option>
                                <option value="water">Water</option>
                                <option value="phone">Phone</option>
                                <option value="loan">Loan Payment</option>
                                <option value="other">Other</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="bill-account">Account Number</label>
                            <input type="text" id="bill-account" placeholder="Enter account number">
                        </div>
                        
                        <div class="form-group">
                            <label for="bill-amount">Amount (ZAR)</label>
                            <input type="number" id="bill-amount" placeholder="0.00">
                        </div>
                        
                        <div class="form-group">
                            <label for="bill-reference">Reference</label>
                            <input type="text" id="bill-reference" placeholder="Payment reference">
                        </div>
                        
                        <button class="submit-payment">Continue</button>
                    </div>
                `;
            }

            // Add back button functionality
            const backButton = document.getElementById('back-to-payment-options');
            if (backButton) {
                backButton.addEventListener('click', function(e) {
                    e.preventDefault();
                    showPaymentSection();
                });
            }

            // Add form submission functionality
            const submitButtons = document.querySelectorAll('.submit-payment');
            submitButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    // Here you would normally validate and submit the form
                    alert('Payment submitted successfully!');
                    // For demo purposes, we'll just show a success message
                    showPaymentConfirmation(paymentType);
                });
            });
        }
    }

    function showPaymentConfirmation(paymentType) {
        const paymentSection = document.querySelector('.payment-section');
        if (paymentSection) {
            paymentSection.innerHTML = `
                <div class="payment-confirmation">
                    <div class="confirmation-icon">
                        <span class="material-icons-sharp">check_circle</span>
                    </div>
                    <h2>Payment Successful!</h2>
                    <p>Your ${paymentType === 'transfer' ? 'transfer' : 'bill payment'} has been processed successfully.</p>
                    <div class="confirmation-details">
                        <p><strong>Reference:</strong> TXN${Math.floor(Math.random() * 1000000)}</p>
                        <p><strong>Amount:</strong> R${(Math.random() * 1000).toFixed(2)}</p>
                        <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
                    </div>
                    <button id="new-payment">Make Another Payment</button>
                    <button id="back-to-accounts">Back to Accounts</button>
                </div>
            `;

            // Add button functionality
            document.getElementById('new-payment').addEventListener('click', showPaymentSection);
            document.getElementById('back-to-accounts').addEventListener('click', function() {
                location.reload();
            });
        }
    }

    // Tab content data (remaining unchanged)
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

    // Tab functionality (remaining unchanged)
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

    [btnTransactions, btnPaymentHistory, btnStampedStatements, btnAccountInformation].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', handleClick);
        } else {
            console.error("Button not found:", btn && btn.id);
        }
    });

    if (btnTransactions && tabContent) {
        btnTransactions.classList.add('active');
        const tab = btnTransactions.querySelector('.tab');
        if (tab) tab.classList.add('active');
        displayContent(content[0]);
    }

});