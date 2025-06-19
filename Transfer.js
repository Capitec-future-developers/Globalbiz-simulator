(() => {
    // Navigation stack for back functionality
    const navigationStack = [];
    const mainContentArea = document.getElementById('mainContent');

    if (!mainContentArea) {
        console.warn('No element with id="mainContent" found. Transfer script will not initialize.');
        return;
    }

    // Function to toggle content visibility of other sections
    function toggleContentVisibility() {
        document.querySelectorAll('.favorites-container, .pending, .cash-flow').forEach(el => {
            el.style.display = el.style.display === 'none' ? 'block' : 'none';
        });
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
            <a href="Accounts.html">
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

        // Show all other sections
        document.querySelectorAll('.favorites-container, .pending, .cash-flow').forEach(el => {
            el.style.display = 'block';
        });

        // Clear navigation stack and set to main
        navigationStack.length = 0;
        navigationStack.push('main');
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

    // Sample user accounts data
    const userAccounts = [
        { id: '1001', name: 'Cheque Account', number: '1052 2626 44', balance: 'R12,345.67' },
        { id: '1002', name: 'Savings Account', number: '1052 2626 45', balance: 'R45,678.90' },
        { id: '1003', name: 'Credit Card', number: '4512 **** **** 9012', balance: '-R5,432.10' }
    ];

    // Show transfer section UI
    function showTransferSection() {
        toggleContentVisibility();
        navigationStack.push('transfer-section');

        mainContentArea.innerHTML = `
      <div class="transfer-section">
        <div class="payment-header">
          <button class="back-button" id="back-button">
            <span class="material-icons-sharp">arrow_back</span> Back
          </button>
          <h2 class="transferheader">Transfer</h2>
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

        // Back button handler
        document.getElementById('back-button').addEventListener('click', navigateBack);

        // Show balance info when from-account changes
        document.getElementById('from-account').addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            const balance = selectedOption.getAttribute('data-balance');
            document.getElementById('balance-info').textContent = `Available: ${balance || ''}`;
        });

        // Form submit handler
        document.getElementById('transfer-form').addEventListener('submit', function(e) {
            e.preventDefault();
            processTransfer();
        });
    }

    // Process transfer and show loading UI
    function processTransfer() {
        const fromAccount = document.getElementById('from-account').value;
        const toAccount = document.getElementById('to-account').value;
        const amount = document.getElementById('transfer-amount').value;
        const reference = document.getElementById('transfer-reference').value;

        if (fromAccount === toAccount) {
            alert('You cannot transfer to the same account!');
            return;
        }

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

        setTimeout(() => {
            showTransferConfirmation(fromAccount, toAccount, amount, reference);
        }, 2500);
    }

    // Show confirmation after transfer
    function showTransferConfirmation(fromAccount, toAccount, amount, reference) {
        // Get text from dropdown options
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
          <button id="done-button" class="done-btn">Done</button>
          <button id="receipt-button" class="secondary-btn">Download Receipt</button>
        </div>
      </div>
    `;

        document.getElementById('done-button').addEventListener('click', resetToMainView);
        document.getElementById('receipt-button').addEventListener('click', () => {
            alert('Transfer receipt downloaded successfully!');
        });
    }

    // Initialization on DOM ready
    document.addEventListener('DOMContentLoaded', () => {
        // Initialize navigation stack with main view
        navigationStack.push('main');

        // Attach event listener to any #Transfer element(s)
        document.querySelectorAll('#Transfer').forEach(btn => {
            btn.addEventListener('click', e => {
                e.preventDefault();
                showTransferSection();
            });
        });
    });
})();
