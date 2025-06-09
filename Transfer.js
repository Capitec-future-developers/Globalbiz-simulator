// Navigation stack for back functionality
const navigationStack = [];
const mainContentArea = document.getElementById('mainContent');

// Function to toggle content visibility
function toggleContentVisibility() {
    document.querySelectorAll('.favorites-container, .pending, .cash-flow').forEach(el => {
        el.style.display = el.style.display === 'none' ? 'block' : 'none';
    });
}

// Function to navigate back
function navigateBack() {
    if (navigationStack.length > 0) {
        navigationStack.pop(); // Remove current view
        const previousView = navigationStack.pop(); // Get previous view

        if (previousView === 'main') {
            resetToMainView();
        } else if (previousView === 'transfer-section') {
            showTransferSection();
        }
    } else {
        resetToMainView();
    }
}

// Function to reset to main view
function resetToMainView() {
    mainContentArea.innerHTML = `
            <div class="account">
                <div class="account-header">
                    <h4>Accounts</h4>
                    <a href="Accounts.html" class="View">
                        View All <span class="material-icons-sharp">chevron_right</span>
                    </a>
                </div>
                <div class="box">
                    <div class="box1">
                        <span class="material-icons-sharp">account_balance</span>
                        <span class="separator"></span>
                        <a  href="Accounts.html">
                            <div class="account-details">
                                <span class="account-name">1 Account Current</span>
                                <span class="account-balance">R1000</span>
                            </div></a>
                        <div class="box2">
                            <span class="material-icons-sharp">storage</span>
                            <span class="separator"></span>
                            <span class="account-name">No other account(s)</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

    // Show all other sections
    document.querySelectorAll('.favorites-container, .pending, .cash-flow').forEach(el => {
        el.style.display = 'block';
    });

    // Clear navigation stack
    navigationStack.length = 0;
    navigationStack.push('main');
}

// Transfer functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize with main view
    navigationStack.push('main');

    // Transfer button in sidebar
    const transferButton = document.getElementById('transfer');
    if (transferButton) {
        transferButton.addEventListener('click', function(e) {
            e.preventDefault();
            showTransferSection();
        });
    }

    // Transfer favorite box
    const transferFavorite = document.getElementById('transfer-favorite');
    if (transferFavorite) {
        transferFavorite.addEventListener('click', function(e) {
            e.preventDefault();
            showTransferSection();
        });
    }
});

function showTransferSection() {
    toggleContentVisibility();
    navigationStack.push('transfer-section');

    // Sample user accounts data - in a real app, this would come from your backend
    const userAccounts = [
        { id: '1001', name: 'Cheque Account', number: '1052 2626 44', balance: 'R12,345.67' },
        { id: '1002', name: 'Savings Account', number: '1052 2626 45', balance: 'R45,678.90' },
        { id: '1003', name: 'Credit Card', number: '4512 **** **** 9012', balance: '-R5,432.10' }
    ];

    mainContentArea.innerHTML = `
            <div class="transfer-section">
                <div class="payment-header">
                    <button class="back-button" id="back-button">
                        <span class="material-icons-sharp">arrow_back</span> Back
                    </button>
                    <h2>Inter-Account Transfer</h2>
                    <p>Move money between your accounts</p>
                </div>

                <form id="transfer-form">
                    <div class="form-group">
                        <label for="from-account">From Account</label>
                        <select id="from-account" name="from-account" required>
                            <option value="">Select source account</option>
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
                            <option value="">Select destination account</option>
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

                    <div class="form-group">
                        <button type="submit" class="submit-payment-btn">
                            Transfer Funds
                        </button>
                    </div>
                </form>
            </div>
        `;

    // Back button
    document.getElementById('back-button').addEventListener('click', function() {
        navigateBack();
    });

    // Show balance when from-account is selected
    document.getElementById('from-account').addEventListener('change', function() {
        const selectedOption = this.options[this.selectedIndex];
        const balance = selectedOption.getAttribute('data-balance');
        document.getElementById('balance-info').textContent = `Available: ${balance}`;
    });

    // Form submission
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

    // Show processing
    mainContentArea.innerHTML = `
            <div class="payment-processing">
                <div class="spinner">
                    <div class="double-bounce1"></div>
                    <div class="double-bounce2"></div>
                </div>
                <h2>Processing Transfer...</h2>
                <p>Please wait while we process your transfer</p>
            </div>
        `;

    // Simulate processing delay
    setTimeout(() => {
        showTransferConfirmation(fromAccount, toAccount, amount, reference);
    }, 2500);
}

function showTransferConfirmation(fromAccount, toAccount, amount, reference) {
    // In a real app, you would get these details from your accounts data
    const fromAccountText = document.getElementById('from-account').options[document.getElementById('from-account').selectedIndex].text;
    const toAccountText = document.getElementById('to-account').options[document.getElementById('to-account').selectedIndex].text;

    mainContentArea.innerHTML = `
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
        alert('Transfer receipt downloaded successfully!');
    });
}