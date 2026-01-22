document.addEventListener('DOMContentLoaded', function () {
    const tabContentData = {
        transactionLimit: [`
      <div class="tab-content">
         <div class="tab-content tab-content-active">
            <div class="transaction-container">
              <span class="info-heading" style="right: 10px;"><h3>Profile Limits</h3></span>
              <span class="edit-limit">
                    <button class="edit-limit-btn" id="editlimits">Edit</button>
                  </span>
              <div class="account-box">
                <div class="account-info-row" >
                  <div class="info-item">
                    <span class="info-value" id="info-value">R0.00</span>
                    <span class="info-label"><strong>Daily profile limit</strong></span>
                  </div>
                </div>
              </div>
              <div class="search-section">
                         <div class="search-bar">Account Limit</div>
                         <button class="edit-btn">Edit</button>
                         <div class="info-icon">
                         <img src="../images/info-trans.svg" alt="info-trans.svg" />
                         <span class="icon-lable"> What is an account limit?</span>
                         </div>
              </div>
             
              <div class="account-details">
                <span class="detail-item">Current <br><div class="below">Account</div> <span style="font-weight: bold; color: black;">105 2626 43
 </span></span>
                
                <span class="detail-item-right" style=" right: 18px;
    cursor: pointer;">Account limit <span style="font-weight: bold;">R90 000</span></span>
                <span class="material-icons-sharp yoh" style="color: #007AFF;
    cursor: pointer; ">keyboard_arrow_right</span>
    
              </div>
              
            </div>
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
            <a href="Explore.html" class="nav-item">
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
<span class="material-icons-sharp yoh"  style="color: #007AFF;
    cursor: pointer; ">keyboard_arrow_right</span>
                              </div>
            </div>
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
            <a href="Explore.html" class="nav-item">
                <span class="nav-icon material-icons-outlined">search</span>
                <span>Explore</span>
            </a>
        </div>
        </div>
    </div>
      </div>`],

        profileNotification: [`
<div class="tab-content">
<div class="profile-notification-container">
<p class="notification-description">Keep track of account activity with SMS or email notifications</p>

<div class="notification-section">
<h4 class="edit-notifications-link" style="color: #1e88e5; cursor: pointer;">Edit Notifications Details</h4>

<div class="notification-item">
<span class="notification-label">Default fee account</span>
<span class="notification-value">—</span>
</div>

<div class="notification-item">
<span class="notification-label">SMS</span>
<span class="notification-value">—</span>
</div>

<div class="notification-item">
<span class="notification-label">Email</span>
<span class="notification-value">—</span>
</div>

<div class="notification-item">
<span class="notification-label">Get stop order notifications</span>
<span class="notification-value">No</span>
</div>
</div>
</div>

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
            <a href="Explore.html" class="nav-item">
                <span class="nav-icon material-icons-outlined">search</span>
                <span>Explore</span>
            </a>
        </div>
</div>`],

        editNotificationDetails: [`
<div class="tab-content">
 <div class="edit-notifications-container">
 <h3>Choose default fee account</h3>
 <p class="section-description">Choose an account</p>
 
 <div class="account-option">
 <div class="account-info">
 <span class="account-name">Kodi Code</span>
 <span class="account-number">1052 2626 43</span>
 </div>
 <span class="account-balance">R0.00</span>
 <span class="material-icons-sharp" style="color: #007AFF;">keyboard_arrow_right</span>
 </div>
 
 <h3 class="section-title">Payment notifications</h3>
 
 <div class="notification-option">
 <span class="option-label">Email</span>
 <span class="option-value">omphilestudent@gmail.com</span>
 <span class="material-icons-sharp" style="color: #007AFF;">keyboard_arrow_right</span>
 </div>
 
 <div class="notification-option">
 <span class="option-label">SMS</span>
 <span class="option-value">(+27) 060 291 0591</span>
 <span class="material-icons-sharp" style="color: #007AFF;">keyboard_arrow_right</span>
 </div>
 
 <h3 class="section-title">Do you want to get stop order notifications?</h3>
 
 <div class="toggle-options">
 <button class="toggle-option active">Yes</button>
 <button class="toggle-option">No</button>
 </div>
 
 <div class="action-buttons">
 <button class="secondary-button">Cancel</button>
 <button class="primary-button">Continue</button>
 </div>
 </div>
 
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
</div>`],

        editLimits: [`
     <div class="edit-limit-page">
     <div class="edit-header">
     <span style="font-size: 8px;">Step 1 of 2</span>
     <span>Update amount</span>
     <span class="loader-container"><span class="loader" id="loader"></span></span>
</div>
<div class="limit-must">
<lable class="lable-current">Current Transaction Limit</lable>
  <span class="current-must" id="currentLimit">R 0.00</span>
  <label>
  <lable class="lable-new">New Transaction Limit</lable>
    <input class="limitInputs" type="number" id="limitInput" value="0" step="0.01" min="0">
    <p style="position: absolute; top: 125px; color: #cccccc; font-size: 10px; left: 15px;">Set new transaction limit</p>
  </label>
</div>

<div class="edit-buttons">
<button class="continue-edit" id="continueEdit">Continue</button>
<button class="cancel-edit" id="cancelEdit">Cancel</button>
</div>
</div>
     
         `],

        continueEdit: [`
     <div class="edit-limit-page">
     <div class="edit-header">
     <span>Step 2 of 2</span>
     <span>Review details</span>
</div>
<div class="limit-must">
  <span class="current-must" id="confirmDisplayLimit" style="font-size: 1.2rem; border: none; background: transparent; padding: 0; height: auto; font-weight: bold; color: black;">R 0.00</span>
  <p>New Transaction Limit: <span id="displayLimit" style="font-weight: bold;">R 0.00</span></p>
</div>

<div class="edit-buttons">
<button class="continue-edit" id="finalConfirm">Continue</button>
<button class="cancel-edit" id="cancelEdit">Cancel</button>
</div>
</div>
     
         `]
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
        left: 0; 
        right: 0; 
        bottom: 0;
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

        // Scroll to top of the new page
        newPageContainer.scrollTop = 0;

        const input = contentWrapper.querySelector('#limitInput');
        const span = contentWrapper.querySelector('#currentLimit');
        if (input && span) {
            input.addEventListener('input', () => {
                const value = Number(input.value) || 0;
                span.textContent = `R ${value.toLocaleString('en-ZA', {
                    minimumFractionDigits: 2
                })}`;
            });
        }
    }

    headerBackArrow.addEventListener('click', function(event) {
        if (newPageContainer.style.display === 'flex') {
            event.preventDefault();
            newPageContainer.style.display = 'none';
            settingContainer.style.display = 'block';
            headerTitle.textContent = 'Settings';
        }
    });

    Object.entries(tabButtons).forEach(([key, button]) => {
        if (!button) return;
        button.addEventListener('click', (e) => {
            console.log('Tab clicked:', key);
            let titleText = '';
            switch(key) {
                case 'transactionLimit': titleText = 'Transaction Limits'; break;
                case 'transactionNotification': titleText = 'Transaction Notifications'; break;
                case 'profileNotification': titleText = 'Profile Notifications'; break;
            }
            showNewPage(key, titleText);
        });
    });

    const inputLimit = document.getElementById('limitInput');
    const spanLimit = document.getElementById('currentLimit');

    if (inputLimit && spanLimit) {
        inputLimit.addEventListener('input', () => {
            const value = Number(inputLimit.value) || 0;
            spanLimit.textContent = `R ${value.toLocaleString('en-ZA', {
                minimumFractionDigits: 2
            })}`;
        });
    }

    document.addEventListener('click', function (e) {
        if (e.target.id === 'editlimits' || e.target.closest('#editlimits')) {
            showNewPage('editLimits', 'Edit Limits');
        }

        if (e.target.id === 'continueEdit' || e.target.closest('#continueEdit')) {
            const loader = document.getElementById('loader');
            const input = document.getElementById('limitInput');
            const newValue = input ? input.value : '0';
            const formattedValue = `R ${Number(newValue).toLocaleString('en-ZA', {
                minimumFractionDigits: 2
            })}`;
            
            if (loader) {
                loader.style.width = '100%';
                setTimeout(() => {
                    showNewPage('continueEdit', 'Edit Limits');
                    const display = document.getElementById('displayLimit');
                    const confirmDisplay = document.getElementById('confirmDisplayLimit');
                    if (display) {
                        display.textContent = formattedValue;
                    }
                    if (confirmDisplay) {
                        confirmDisplay.textContent = formattedValue;
                    }
                }, 400);
            } else {
                showNewPage('continueEdit', 'Continue Limits');
                const display = document.getElementById('displayLimit');
                const confirmDisplay = document.getElementById('confirmDisplayLimit');
                if (display) {
                    display.textContent = formattedValue;
                }
                if (confirmDisplay) {
                    confirmDisplay.textContent = formattedValue;
                }
            }
        }

        if (e.target.id === 'finalConfirm' || e.target.closest('#finalConfirm')) {
            const display = document.getElementById('displayLimit');
            const newValue = display ? display.textContent : 'R 0.00';
            

            tabContentData.transactionLimit[0] = tabContentData.transactionLimit[0].replace(
                /<span class="info-value" id="info-value">.*?<\/span>/,
                `<span class="info-value" id="info-value">${newValue}</span>`
            );
            
            showNewPage('transactionLimit', 'Transaction Limits');
            

            const infoValue = document.getElementById('info-value');
            if (infoValue) {
                infoValue.textContent = newValue;
            }
        }

        if (e.target.id === 'cancelEdit' || e.target.closest('#cancelEdit')) {
            showNewPage('transactionLimit', 'Transaction Limits');
        }

        if (
            e.target.closest('.edit-notifications-link') ||
            e.target.closest('.notification-section h4')
        ) {
            showNewPage('editNotificationDetails', 'Edit Notifications');
        }

        if (e.target.classList.contains('secondary-button')) {
            showNewPage('profileNotification', 'Profile Notifications');
        }
    })
    });
