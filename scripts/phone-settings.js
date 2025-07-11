document.addEventListener('DOMContentLoaded', function () {
    const tabContentData = {
        transactionLimit: [`
      <div class="tab-content">
         <div class="tab-content tab-content-active">
            <div class="transaction-container">
              <span class="info-heading"><h3>Transaction Limits</h3></span>
              <span class="edit-limit">
                    <button class="edit-limit-btn" id="editlimits">Edit Limit</button>
                  </span>
              <div class="account-box">
                <div class="account-info-row" >
                  <div class="info-item">
                    <span class="info-value">R0.00</span>
                    <span class="info-label"><strong>Today's total spent</strong></span>
                  </div>
                  <div class="info-item">
                    <span class="info-value">R550</span>
                    <span class="info-label"><strong>Maximum daily transaction limit</strong></span>
                  </div>

                </div>
              </div>
              <div class="search-section">
                         <div class="search-bar">Account Limit</div>
                         <button class="edit-btn">Edit Limits</button>

              </div>
              <div class="account-header">
                <span class="header-item">Account</span>
                <span class="header-item center">Limit Amount</span>

              </div>
              <div class="account-details">
                <span class="detail-item">Kodi codes <div class="below">1052 2626 43</div></span>
                <span class="detail-item right" style=" right: 10px;
    cursor: pointer;">R90 000</span>
                <span class="material-icons-sharp" class="yoh" style="color: #007AFF;
    cursor: pointer; ">keyboard_arrow_right</span>
              </div>
            </div>
<!-- Bottom Navigation -->
            <div class="bottom-nav">
                <a href="../App/Phone2.html" class="nav-item active" id="Home">
                    <span class="nav-icon material-icons-outlined">home</span>
                    <span>Home</span>
                </a>
                <a href="../Phone%20accounts.html" class="nav-item">
                    <span class="nav-icon material-icons-outlined">storage</span>
                    <span>Accounts</span>
                </a>
                <a href="../Phone%20Transact.html" class="nav-item" id="transact">
                    <span class="nav-icon material-icons-outlined">sync_alt</span>
                    <span>transact</span>
                </a>
                <a href="#" class="nav-item">
                    <span class="nav-icon material-icons-outlined">credit_card</span>
                    <span>Cards</span>
                </a>
                <a href="#" class="nav-item">
                    <span class="nav-icon material-icons-outlined">search</span>
                    <span>Explore</span>
                </a>
            </div>
        </div>
    </div>
      </div>`],

        transactionNotification: [`
       <div class="tab-content">
            <div class="transaction-container">
              <div class="notification-header">
                <span class="header-item">Account</span>
                <span class="header-item center">Currency</span>
                              </div>

              <div class="accounts-details">
               <span class="details-item">Kodi codes <div class="below">1052 2626 43</div></span>
                <span class="currency">ZAR</span>
<span class="material-icons-sharp" class="yoh" style="color: #007AFF;
    cursor: pointer; ">keyboard_arrow_right</span>
                              </div>
            </div>
          <!-- Bottom Navigation -->
            <div class="bottom-nav">
                <a href="../App/Phone2.html" class="nav-item active">
                    <span class="nav-icon material-icons-outlined">home</span>
                    <span>Home</span>
                </a>
                <a href="../Phone%20accounts.html" class="nav-item">
                    <span class="nav-icon material-icons-outlined">storage</span>
                    <span>Accounts</span>
                </a>
                <a href="../Phone%20Transact.html" class="nav-item" id="transact">
                    <span class="nav-icon material-icons-outlined">sync_alt</span>
                    <span>transact</span>
                </a>
                <a href="#" class="nav-item">
                    <span class="nav-icon material-icons-outlined">credit_card</span>
                    <span>Cards</span>
                </a>
                <a href="#" class="nav-item">
                    <span class="nav-icon material-icons-outlined">search</span>
                    <span>Explore</span>
                </a>
            </div>
        </div>
    </div>
      </div>`],

        profileNotification: [`
      <div class="tab-content">
        <h3>Profile Notifications</h3>
        <p>Content for Profile Notifications tab goes here.</p>
      </div>`]
    };

    const tabButtons = {
        transactionLimit: document.getElementById('Transaction-Limits'),
        transactionNotification: document.getElementById('Transaction-Notifications'),
        profileNotification: document.getElementById('Profile-Notifications')
    };

    const screenContent = document.querySelector('.screen-content');
    const settingContainer = document.querySelector('.setting-container');
    const headerTitle = document.querySelector('.header');
    const headerBackArrow = document.querySelector('#sidebarToggle'); // the header back arrow link

    // Create new "page" container
    const newPageContainer = document.createElement('div');
    newPageContainer.classList.add('new-page-container');
    newPageContainer.style.cssText = `
    position: absolute;
    top: 60px; /* stay below the header and notch */
    left: 0; right: 0; bottom: 0;
    background: #fff;
    display: none;
    flex-direction: column;
    z-index: 999;
    padding: 15px;
    overflow-y: auto;
    border-radius: 0 0 20px 20px;
    animation: slideIn 0.3s ease forwards;
  `;
    screenContent.appendChild(newPageContainer);

    function showNewPage(contentKey, title) {
        if (!tabContentData[contentKey]) return;

        settingContainer.style.display = 'none'; // Hide main settings
        newPageContainer.style.display = 'flex'; // Show new page content
        headerTitle.textContent = title; // Change header title

        newPageContainer.innerHTML = ''; // Clear previous content

        const contentWrapper = document.createElement('div');
        contentWrapper.innerHTML = tabContentData[contentKey][0];
        newPageContainer.appendChild(contentWrapper);
    }

    // Back Arrow Click (Header) — Return to main settings
    headerBackArrow.addEventListener('click', function(event) {
        // prevent the link from navigating (since we want JS to handle it)
        event.preventDefault();
        newPageContainer.style.display = 'none'; // Hide the new page
        settingContainer.style.display = 'block'; // Show settings again
        headerTitle.textContent = 'Settings'; // Reset header title
    });

    // Attach click events to each tab button
    Object.entries(tabButtons).forEach(([key, button]) => {
        if (!button) return;
        button.addEventListener('click', () => {
            let titleText = '';
            switch(key) {
                case 'transactionLimit': titleText = 'Transaction Limits'; break;
                case 'transactionNotification': titleText = 'Transaction Notifications'; break;
                case 'profileNotification': titleText = 'Profile Notifications'; break;
            }
            showNewPage(key, titleText);
        });
    });
});