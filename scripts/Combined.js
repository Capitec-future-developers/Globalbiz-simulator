document.addEventListener('DOMContentLoaded', function() {

    const profileLink = document.getElementById('profile-link');
    const profilePopup = document.getElementById('profilePopup');
    const overlay = document.getElementById('overlay');

    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    if (dropdownToggles.length > 0) {
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation(); 
                const dropdown = this.closest('.dropdown');
                if (dropdown) {

                    document.querySelectorAll('.dropdown').forEach(item => {
                        if (item !== dropdown) {
                            item.classList.remove('active');
                            item.classList.remove('open');
                        }
                    });

                    const nowActive = dropdown.classList.toggle('active');
                    dropdown.classList.toggle('open', nowActive);
                }
            });
        });


        document.addEventListener('click', function(e) {
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                    dropdown.classList.remove('open');
                });
            }
        });
    }

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


    const sidebar = document.querySelector('.sidebar');
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


    const startBtn = document.getElementById('startBtn');
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            const platformOptions = document.getElementById('platformOptions');
            if (platformOptions) {
                platformOptions.style.display = 'block';
                this.style.display = 'none';
            }
        });

        const platformButtons = document.querySelectorAll('[data-platform]');
        if (platformButtons.length > 0) {
            platformButtons.forEach(btn => {
                btn.addEventListener('click', function() {
                    const platform = this.getAttribute('data-platform');
                    const proceedLink = document.getElementById('proceedLink');
                    const proceedBtn = document.getElementById('proceedBtn');
                    const platformOptions = document.getElementById('platformOptions');

                    if (proceedLink && proceedBtn && platformOptions) {
                        if (platform === 'app') {
                            proceedLink.href = "Phone.html";
                        } else {
                            proceedLink.href = "Computer.html";
                        }
                        proceedBtn.style.display = 'block';
                        platformOptions.style.display = 'none';
                    }
                });
            });
        }
    }


    const tabContentData = {
        transactions: [
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
        paymentHistory: [
            `<img src="../images/beneficiaryList.svg" alt="beneficiary" class="img" style="width: 2000px; left: 260px;">`
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

    const tabButtons = {
        transactions: document.getElementById("btn-transactions"),
        paymentHistory: document.getElementById("btn-payment-history"),
        stampedStatements: document.getElementById("btn-stamped-statements"),
        accountInformation: document.getElementById("btn-account-information")
    };

    const tabContent = document.getElementById("tab-content");


    function displayContent(contentKey) {
        if (!tabContent || !tabContentData[contentKey]) return;

        const items = tabContentData[contentKey];
        tabContent.innerHTML = "";

        
        if (items.length === 1 && items[0].startsWith('<')) {
            tabContent.innerHTML = items[0];
        } else {
            const list = document.createElement("ul");
            list.className = "content-list";
            items.forEach(item => {
                const listItem = document.createElement("li");
                
                if (item.startsWith('<')) {
                    listItem.innerHTML = item;
                } else {
                    listItem.textContent = item;
                }
                list.appendChild(listItem);
            });
            tabContent.appendChild(list);
        }
    }


    function highlightButton(buttonId) {
        Object.keys(tabButtons).forEach(key => {
            const button = tabButtons[key];
            if (button) {
                button.classList.remove('active');
                const tab = button.querySelector('.tab');
                if (tab) tab.classList.remove('active');
            }
        });

        const activeButton = tabButtons[buttonId];
        if (activeButton) {
            activeButton.classList.add('active');
            const tab = activeButton.querySelector('.tab');
            if (tab) tab.classList.add('active');
        }
    }



    function handleTabClick(event) {
        const button = event.target.closest('button');
        if (!button) return;

        button.style.transform = 'translateY(2px)';
        setTimeout(() => {
            button.style.transform = '';
        }, 100);


        const buttonId = Object.keys(tabButtons).find(key => tabButtons[key] === button);
        if (!buttonId) return;

        highlightButton(buttonId);
        displayContent(buttonId);
    }

    Object.values(tabButtons).forEach(btn => {
        if (btn) {
            btn.addEventListener('click', handleTabClick);
        }
    });


    if (tabButtons.transactions && tabContent) {
        tabButtons.transactions.classList.add('active');
        const tab = tabButtons.transactions.querySelector('.tab');
        if (tab) tab.classList.add('active');
        displayContent('transactions');
    }

    const paymentButton = document.getElementById('payment');
    const mainContentArea = document.getElementById('main-content-area');
    const defaultContent = document.getElementById('default-content');
    const contentWrapper = document.querySelector('.content-wrapper');
    const createButton = document.getElementById('create');
    const savedPaymentBtn = document.getElementById('saved-payment-btn');
    const onceoffPaymentBtn = document.getElementById('onceoff-payment-btn');
    const groupPaymentBtn = document.getElementById('group-payment-btn');
    const createBeneficiaryBtn = document.getElementById('create-beneficiary-btn');
    const isAppContext = window.location.pathname.includes('Phone.html');


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
<div class="payment-option" id="saved-beneficiary">
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
<div class="payment-option" id="onceoff-beneficiary">
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
                if (isAppContext) {
                    window.location.href = 'transact.html';
                } else {
                    window.location.href = 'Computer.html';
                }
            });
        }

        document.getElementById('saved-beneficiary').addEventListener('click', showBeneficiarySelection);
        document.getElementById('onceoff-beneficiary').addEventListener('click', function() {
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


        document.getElementById('back-button').addEventListener('click', function() {
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
        mainContentArea.innerHTML = `
<div class="beneficiary-selection">
  <div class="payment-header">
    <button class="back-button" id="back-button">
      <span class="material-icons-sharp">arrow_back</span> Back
    </button>
    <h2>Select Beneficiary</h2>
    <p>Choose from your saved beneficiaries</p>
  </div>
  <div class="beneficiary-list" id="beneficiary-list"></div>
  <div class="add-beneficiary-footer">
    <button id="add-new-beneficiary" class="add-beneficiary-btn">
      <span class="material-icons-sharp">add</span> Add New Beneficiary
    </button>
  </div>
</div>
`;

        document.getElementById('back-button').addEventListener('click', function() {
            navigateBack();
        });

        // Load beneficiaries from local small DB
        fetch('/api/local/beneficiaries')
            .then(r => r.ok ? r.json() : Promise.reject(r.statusText))
            .then(data => {
                const list = (data && Array.isArray(data.beneficiaries)) ? data.beneficiaries : [];
                const container = document.getElementById('beneficiary-list');
                if (!container) return;

                if (list.length === 0) {
                    container.innerHTML = `<div class="empty-state" style="padding:16px;color:#666;">No beneficiaries yet. Add one below.</div>`;
                    return;
                }

                container.innerHTML = '';
                list.forEach(b => {
                    const masked = b.accountNumber ? `****${String(b.accountNumber).slice(-4)}` : '****';
                    const bankName = (b.bank || '').toString();
                    const card = document.createElement('div');
                    card.className = 'beneficiary-card';
                    card.setAttribute('data-beneficiary', b.name);
                    card.innerHTML = `
<div class="beneficiary-avatar"><span class="material-icons-sharp">person</span></div>
<div class="beneficiary-details">
  <h3>${b.name}${b.nickname ? ` (${b.nickname})` : ''}</h3>
  <p>Account: ${masked}</p>
  <p>Bank: ${bankName.charAt(0).toUpperCase() + bankName.slice(1)}</p>
</div>
<span class="material-icons-sharp chevron-right">chevron_right</span>`;
                    card.addEventListener('click', function() {
                        showPaymentForm('saved', b.name);
                    });
                    container.appendChild(card);
                });
            })
            .catch(() => {
                const container = document.getElementById('beneficiary-list');
                if (container) container.innerHTML = `<div class="empty-state" style="padding:16px;color:#666;">Failed to load beneficiaries.</div>`;
            });

        document.getElementById('add-new-beneficiary').addEventListener('click', function(e) {
            e.preventDefault();
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


        document.getElementById('back-button').addEventListener('click', function() {
            navigateBack();
        });


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

        document.getElementById('back-button').addEventListener('click', function() {
            navigateBack();
        });


        document.getElementById('beneficiary-form').addEventListener('submit', function(e) {
            e.preventDefault();
            saveBeneficiary();
        });
    }

    function processPayment(paymentType, beneficiaryName) {
        const amount = document.getElementById('amount').value;
        const reference = document.getElementById('reference').value;


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
            showPaymentConfirmation(paymentType, beneficiaryName, amount, reference);
        }, 3000);
    }

    function saveBeneficiary() {
        const name = document.getElementById('beneficiary-name').value;
        const accountNumber = document.getElementById('account-number').value;
        const bank = document.getElementById('bank').value;
        const nickname = (document.getElementById('nickname') && document.getElementById('nickname').value) || '';

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

        fetch('/api/local/beneficiaries', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, accountNumber, bank, nickname })
        })
        .then(r => r.ok ? r.json() : r.json().then(err => Promise.reject(err)))
        .then(saved => {
            showBeneficiaryConfirmation(saved.name || name);
        })
        .catch(err => {
            const msg = (err && err.message) ? err.message : 'Failed to save beneficiary';
            mainContentArea.innerHTML = `
<div class="payment-confirmation">
  <div class="confirmation-icon error">
    <span class="material-icons-sharp">error</span>
  </div>
  <h2>Unable to save</h2>
  <p>${msg}</p>
  <div class="confirmation-actions">
    <button id="retry-btn" class="primary-btn">Try Again</button>
  </div>
</div>`;
            const retry = document.getElementById('retry-btn');
            if (retry) retry.addEventListener('click', showAddBeneficiaryForm);
        });
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


        document.getElementById('done-button').addEventListener('click', function() {
            resetToMainView();
        });

        document.getElementById('pay-now-button').addEventListener('click', function() {
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


    const transferNavigationStack = [];
    const transferMainContentArea = document.getElementById('mainContent');

    if (transferMainContentArea) {
        function toggleTransferContentVisibility() {
            document.querySelectorAll('.favorites-container, .pending, .cash-flow').forEach(el => {
                el.style.display = el.style.display === 'none' ? 'block' : 'none';
            });
        }

        function resetTransferToMainView() {
            transferMainContentArea.innerHTML = `
<div class="account">
<div class="account-header">
<h4>Accounts</h4>
<a href="../Computer/Accounts.html" class="View">
View All <span class="material-icons-sharp">chevron_right</span>
</a>
</div>
<div class="box">
<div class="box1">
<span class="material-icons-sharp">account_balance</span>
<span class="separator"></span>
<a href="../Computer/Accounts.html">
<div class="account-details">
<span class="account-name">1 Account Current</span>
<span class="account-balance">R1000</span>
</div>
</a>
<div class="box2">
<span class="material-icons-sharp">storage</span>
<span class="separator"></span>
<span class="account-name">No other account(s)</span>
</div>
</div>
</div>
</div>
`;

            document.querySelectorAll('.favorites-container, .pending, .cash-flow').forEach(el => {
                el.style.display = 'block';
            });

            transferNavigationStack.length = 0;
            transferNavigationStack.push('main');
        }

        function navigateTransferBack() {
            if (transferNavigationStack.length > 0) {
                transferNavigationStack.pop();
                const previousView = transferNavigationStack.pop();

                if (previousView === 'main') {
                    resetTransferToMainView();
                } else if (previousView === 'transfer-section') {
                    showTransferSection();
                }
            } else {
                resetTransferToMainView();
            }
        }

        const userAccounts = [
            { id: '1001', name: 'Cheque Account', number: '1052 2626 44', balance: 'R12,345.67' },
            { id: '1002', name: 'Savings Account', number: '1052 2626 45', balance: 'R45,678.90' },
            { id: '1003', name: 'Credit Card', number: '4512 **** **** 9012', balance: '-R5,432.10' }
        ];

        function showTransferSection() {
            toggleTransferContentVisibility();
            transferNavigationStack.push('transfer-section');

            transferMainContentArea.innerHTML = `
<div class="transfer-section">
           <div class="payment-header">
<button class="back-button" id="back-button">
                   <span class="material-icons-sharp">arrow_back</span> Back
</button>
<h2 class="transferheader">  Transfer</h2>
<p>Move money between your accounts</p>
</div>
<div class="transfer-details-box">
<h3>Transfer Details</h3>
<form id="transfer-form">
<div class="form-group">
<label for="from-account">From Account</label>
<select id="from-account" name="from-account" required>
<option value="">From account</option>
${userAccounts.map(account => `
<option value="${account.id}" data-balance="${account.balance}">
${account.name} (${account.number}) - ${account.balance}
</option>
`).join('')}
</select>
</div>
<div class="form-group">
<label for="to-account">To Account</label>
<select id="to-account" name="to-account" required>
<option value="">To account</option>
${userAccounts.map(account => `
<option value="${account.id}">
${account.name} (${account.number})
</option>
`).join('')}
</select>
</div>
<div class="form-group">
<label for="transfer-amount">Amount (ZAR)</label>
<input type="number" id="transfer-amount" name="transfer-amount" placeholder="0.00" min="1" required>
<div id="balance-info" class="balance-info"></div>
</div>
<div class="form-group">
<label for="transfer-reference">Reference</label>
<input type="text" id="transfer-reference" name="transfer-reference" placeholder="Enter reference" required>
</div>
<h4>Transfer Type</h4>
<div class="transfer-type-options">
<div class="transfer-type-box">
<input type="radio" id="once-off" name="transfer-type" value="once-off" required>
<label for="once-off">Once-Off</label>
</div>
<div class="transfer-type-box">
<input type="radio" id="recurring" name="transfer-type" value="recurring">
<label for="recurring">Recurring</label>
</div>
<div class="transfer-type-box">
<input type="radio" id="future-dated" name="transfer-type" value="future-dated">
<label for="future-dated">Future-Dated</label>
</div>
</div>
<div class="form-group">
<label for="transfer-date">Transfer Date</label>
<input type="date" id="transfer-date" name="transfer-date" required>
</div>
<div class="form-group">
<button type="submit" class="submit-payment-btn">
Transfer Funds
</button>
</div>
</form>
</div>
</div>
`;

            document.getElementById('back-button').addEventListener('click', navigateTransferBack);

            document.getElementById('from-account').addEventListener('change', function() {
                const selectedOption = this.options[this.selectedIndex];
                const balance = selectedOption.getAttribute('data-balance');
                document.getElementById('balance-info').textContent = `Available: ${balance || ''}`;
            });

            document.getElementById('transfer-form').addEventListener('submit', function(e) {
                e.preventDefault();
                processTransfer();
            });
        }

        function processTransfer() {
            const fromAccount = document.getElementById('from-account').value;
            const toAccount = document.getElementById('to-account').value;
            const amount = document.getElementById('transfer-amount').value;
            const reference = document.getElementById('transfer-reference').value;

            if (fromAccount === toAccount) {
                alert('You cannot transfer to the same account!');
                return;
            }

            transferMainContentArea.innerHTML = `
<div class="payment-processing">
<div class="spinner">
<div class="double-bounce1"></div>
<div class="double-bounce2"></div>
</div>
<h2>Processing Transfer...</h2>
<p>Please wait while we process your transfer</p>
</div>
`;

            setTimeout(() => {
                showTransferConfirmation(fromAccount, toAccount, amount, reference);
            }, 2500);
        }


        function showTransferConfirmation(fromAccount, toAccount, amount, reference) {

            const fromAccountText = document.getElementById('from-account').options[document.getElementById('from-account').selectedIndex].text;
            const toAccountText = document.getElementById('to-account').options[document.getElementById('to-account').selectedIndex].text;

            transferMainContentArea.innerHTML = `
<div class="payment-confirmation">
<div class="confirmation-icon success">
<span class="material-icons-sharp">check_circle</span>
</div>
<h2>Transfer Successful!</h2>
<p>Your funds have been transferred successfully</p>
<div class="confirmation-details">
<div class="detail-row">
<span>From Account:</span>
<span>${fromAccountText.split(' - ')[0]}</span>
</div>
<div class="detail-row">
<span>To Account:</span>
<span>${toAccountText}</span>
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
<button id="done-button" class="done-btn">Done</button>
<button id="receipt-button" class="secondary-btn">Download Receipt</button>
</div>
</div>
`;

            document.getElementById('done-button').addEventListener('click', resetTransferToMainView);
            document.getElementById('receipt-button').addEventListener('click', () => {
                alert('Transfer receipt downloaded successfully!');
            });
        }


        transferNavigationStack.push('main');

        document.querySelectorAll('#Transfer').forEach(btn => {
            btn.addEventListener('click', e => {
                e.preventDefault();
                showTransferSection();
            });
        });
    }


    const bankerLink = document.getElementById('banker-link');
    const bankerPopup = document.getElementById('banker-popup');
    const closePopup = document.getElementById('close-popup');

    if (bankerLink && bankerPopup && closePopup) {
        bankerLink.addEventListener('click', function(event) {
            event.preventDefault(); 
            bankerPopup.style.display = 'block';
        });

        closePopup.addEventListener('click', function() {
            bankerPopup.style.display = 'none';
        });
    }


    const switchLink = document.querySelector('.switch-profile');
    if (switchLink) { 
        switchLink.addEventListener('click', function(e) {
            e.preventDefault(); 
            const transition = document.getElementById('page-transition');
            if (transition) { 
                transition.classList.add('show');
                setTimeout(() => {
                    window.location.href = this.href;
                }, 500); 
            } else {

                window.location.href = this.href;
            }
        });
    }


    const dateElement = document.getElementById("signin-date");
    if (dateElement) { 
        const now = new Date();
        const options = {
            weekday: 'long',
            hour: '2-digit',
            minute: '2-digit',
            day: 'numeric',
            month: 'numeric',
            year: 'numeric'
        };


            dateElement.textContent = `Your last Sign-in was on ${now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}, ${now.toLocaleDateString([], options)}.`;
    }
});





    const setAuthLevel = document.getElementById('set-auth-level');
    const authPopup = document.getElementById('authPopup');
    const cancelBtn = document.getElementById('cancelBtn');
    const continueBtn = document.getElementById('continueBtn');
    const backBtn = document.getElementById('backBtn');
    const saveBtn = document.getElementById('saveBtn');
    const formPage = document.getElementById('formPage');
    const confirmationPage = document.getElementById('confirmationPage');


    setAuthLevel.addEventListener('click', function(e) {
        e.preventDefault();
        authPopup.style.display = 'flex';
        formPage.style.display = 'block';
        confirmationPage.style.display = 'none';


        document.getElementById('createPayment').value = '';
        document.getElementById('approvePayment').value = '';
    });


    cancelBtn.addEventListener('click', function() {
        authPopup.style.display = 'none';
    });


    continueBtn.addEventListener('click', function() {
        const createPayment = document.getElementById('createPayment').value;
        const approvePayment = document.getElementById('approvePayment').value;

        if (!createPayment || !approvePayment) {
            alert('Please select options for both fields');
            return;
        }

        document.getElementById('confirmCreatePayment').textContent =
            getDisplayValue('createPayment', createPayment);
        document.getElementById('confirmApprovePayment').textContent =
            getDisplayValue('approvePayment', approvePayment);

        formPage.style.display = 'none';
        confirmationPage.style.display = 'block';
    });


    backBtn.addEventListener('click', function() {
        formPage.style.display = 'block';
        confirmationPage.style.display = 'none';
    });


    saveBtn.addEventListener('click', function() {

        alert('Authorization settings saved successfully!');
        authPopup.style.display = 'none';
    });


    function getDisplayValue(field, value) {
        if (field === 'createPayment') {
            switch(value) {
                case 'approver': return 'Approver';
                case 'authoriser': return 'Authoriser';
                case 'capturer': return 'Capturer';
                default: return '';
            }
        } else if (field === 'approvePayment') {
            switch(value) {
                case 'none': return 'No one';
                case 'one': return 'One person';
                case 'two': return 'Two people';
                default: return '';
            }
        }
        return '';
    }

    authPopup.addEventListener('click', function(e) {
        if (e.target === authPopup) {
            authPopup.style.display = 'none';
        }
});
