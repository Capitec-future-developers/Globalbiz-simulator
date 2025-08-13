document.addEventListener('DOMContentLoaded', function() {

    
    const tabContentData = {
        transactionLimit: [`
          <div class="tab-content tab-content-active">
            <div class="transaction-container">
              <span class="info-heading"><h3>Transaction Limits</h3></span>
              <div class="account-box">
                <div class="account-info-row" style="border-left: 6px solid #3498db;">
                  <div class="info-item">
                    <span class="info-value">R0.00</span>
                    <span class="info-label"><strong>Today's total spent</strong></span>
                  </div>
                  <div class="info-item">
                    <span class="info-value">R550</span>
                    <span class="info-label"><strong>Maximum daily transaction limit</strong></span>
                  </div>
                  <span class="edit-limit">
                    <button class="edit-limit-btn">Edit Maximum Limit</button>
                  </span>
                </div>
              </div>
              <div class="search-section">
                <button class="edit-btn">Edit Account Limits</button>
                <input type="text" placeholder="Search..." class="search-bar">
                <select class="account-select">
                  <option value="">Account Type</option>
                  <option value="savings">Savings</option>
                  <option value="current">Current</option>
                </select>
              </div>
              <div class="account-header">
                <span class="header-item">Account</span>
                <span class="header-item center">Limit Amount</span>
                <span class="header-item right">Today's Total</span>
              </div>
              <div class="account-details">
                <span class="detail-item">Kodi codes 1052 2626 43</span>
                <span class="detail-item center">R90 000</span>
                <span class="detail-item right">R1000.00</span>
              </div>
            </div>
          </div>`
        ],

        transactionNotification: [`
  <div class="tab-content">
    <div class="transaction-container">
      <div class="notification-header flex-row">
        <span class="header-item">Account</span>
        <span class="header-item center">Currency</span>
        <span class="header-item">Transaction Alert Type</span>
        <span class="header-item">Credit Threshold</span>
        <span class="header-item">Debit Threshold</span>
        <span class="header-item">Actions</span>
      </div>
      <div class="account-details flex-row">
        <span class="details-item">Kodi codes 1052 2626 43</span>
        <span class="currency">ZAR</span>
        <span class="credit-and-debit">Credit and Debit</span>
        <span class="credit-item">R1.00</span>
        <span class="debit-item">R1.00</span>
        <button class="btn">Edit</button>
      </div>
    </div>
  </div>
`]
,
        profileNotification: [`
          <div class="tab-content">
            <h3>Profile Notifications</h3>
            <p>Content for Profile Notifications tab goes here.</p>
          </div>`
        ]
    };

    
    const tabButtons = {
        transactionLimit: document.getElementById('Transaction-Limits'),
        transactionNotification: document.getElementById('Transaction-Notifications'),
        profileNotification: document.getElementById('Profile-Notifications')
    };

    const tabContent = document.getElementById('tab-content');

    function displayContent(contentKey) {
        if (!tabContent || !tabContentData[contentKey]) return;
        tabContent.innerHTML = tabContentData[contentKey][0];
    }

    function highlightButton(activeButton) {
        Object.values(tabButtons).forEach(button => {
            if (button) {
                button.classList.remove('active');
                const tab = button.querySelector('.tab');
                if (tab) tab.classList.remove('active');
            }
        });

        if (!activeButton) return;

        activeButton.classList.add('active');
        const tab = activeButton.querySelector('.tab');
        if (tab) tab.classList.add('active');
    }

    
    Object.entries(tabButtons).forEach(([key, button]) => {
        if (!button) return; 
        button.addEventListener('click', () => {
            displayContent(key);
            highlightButton(button);
        });
    });

    
    displayContent('transactionLimit');
    highlightButton(tabButtons.transactionLimit);
});