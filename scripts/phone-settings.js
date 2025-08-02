document.addEventListener('DOMContentLoaded', function () {
    const tabContentData = {
        transactionLimit: [`
      <div class="tab-content">
         <div class="tab-content tab-content-active">
            <div class="transaction-container">
              <span class="info-heading" style="right: 10px;"><h3>Transaction Limits</h3></span>
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
                     <img src="../images/transact.svg" alt="transact" style="filter: brightness(0) invert(50%) contrast(80%)"/>
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
                <span class="currency" style="position: absolute; right: 40px;">ZAR</span>
<span class="material-icons-sharp" class="yoh" style="color: #007AFF;
    cursor: pointer; ">keyboard_arrow_right</span>
                              </div>
            </div>
         <!-- Bottom Navigation -->
            <div class="bottom-nav" id="bottomNav">
                <a href="Phone2.html" class="nav-item active" id="Homee">
                    <img src="../images/home.svg" alt="transact" style="filter: brightness(0) saturate(100%) invert(32%) sepia(89%) saturate(2087%) hue-rotate(202deg) brightness(95%) contrast(90%);" />
                    <span>Home</span>
                </a>
                <a href="Phone%20accounts.html" class="nav-item">
                    <img src="../images/accounts.svg" alt="transact" style="filter: brightness(0) invert(50%) contrast(80%)"/>
                    <span>Accounts</span>
                </a>
                <a href="Phone%20Transact.html" class="nav-item" id="transact">
                    <img src="../images/transact.svg" alt="transact" style="filter: brightness(0) invert(50%) contrast(80%)"/>
                    <span>Transact</span>
                </a>
                <a href="Phone-cards.html" class="nav-item" id="cards">
                    <img src="../images/cards-action.svg" alt="transact" style="filter: brightness(0) invert(50%) contrast(80%)"/>
                    <span>Cards</span>
                </a>
            <a href="../Computer/inprogress.html" class="nav-item">
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
    const headerBackArrow = document.querySelector('#sidebarToggle');


    const newPageContainer = document.createElement('div');
    newPageContainer.classList.add('new-page-container');
    newPageContainer.style.cssText = `
    position: absolute;
    top: 60px; 
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

        settingContainer.style.display = 'none';
        newPageContainer.style.display = 'flex';
        headerTitle.textContent = title;

        newPageContainer.innerHTML = '';

        const contentWrapper = document.createElement('div');
        contentWrapper.innerHTML = tabContentData[contentKey][0];
        newPageContainer.appendChild(contentWrapper);
    }


    headerBackArrow.addEventListener('click', function(event) {

        event.preventDefault();
        newPageContainer.style.display = 'none';
        settingContainer.style.display = 'block';
        headerTitle.textContent = 'Settings';
    });


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