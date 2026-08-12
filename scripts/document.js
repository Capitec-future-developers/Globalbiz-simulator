document.addEventListener('DOMContentLoaded', function () {
  const screenContent = document.querySelector('.screen-content');
  const headerTitle = document.querySelector('.header');
  const sidebarToggle = document.querySelector('#sidebarToggle');
  let documentsPage = document.getElementById('document-page-container');
  let isNewDocumentPage = false;
  if (!documentsPage) {
    documentsPage = document.createElement('div');
    documentsPage.id = 'document-page-container';
    documentsPage.classList.add('documents-page');
    documentsPage.style.cssText = `
      display: flex;
      flex-direction: column;
      padding: 15px;
      background: #fff;
      width: 100%;
      height: 100%;
      overflow-y: auto;
      animation: slideIn 0.3s ease forwards;
    `;
    screenContent.appendChild(documentsPage);
    isNewDocumentPage = true;
  }
  if (isNewDocumentPage) {
    headerTitle.textContent = 'Documents';
  }
  documentsPage.innerHTML = `
    <style>
      .generate-box {
      position: absolute;
        padding: 25px;
        top: 170px;
        background: #FFFFFF;
        margin-top: 5px;
        width: 100%;
        border-top: 2px solid #dddddd;
      }
      .generate-box select,
      .generate-box button
       {
      position: absolute;
        padding: 10px;
        margin-top: 10px;
        width: 95%;
        border: 1px solid #ccc;
        border-radius: 5px;
        left: -10px;
      }
      .generate-box button {
        background-color: #007bff;
        color: white;
        cursor: pointer;
      }
      .generate-box button:disabled {
        background-color: grey;
      }
{
position: absolute;
}
      .doc-counter {
       position: absolute;
        background-color: grey;
        color: white;
        right: 30px;
        top: 10px;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        font-weight: lighter;
      }
     .document-header {
  position: absolute;
  top: 105px; 
  display: flex;
  align-items: flex-start; 
  gap: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
  width: 100%;
  background: #fff; 
  z-index: 1; 
}
#generate-btn{
position: absolute;
top: 150px;
}
 #account-choice{
position: absolute;
top: 100px;
}
      #cancel-btn {
      position: absolute;
        background-color: white;
        color: blue;
        border: 1px solid #00aeff;
        font-weight: bold;
        padding: 10px;
        top: 200px;
        border-radius: 5px;
        cursor: pointer;
      }
      #cancel-btn:hover {
        background-color: #f0f0f0;
      }
      #action-buttons {
        display: none;
        flex-direction: column;
        gap: 10px;
      }
      #email-doc-btn {
        display: none;
        position: absolute;
        top: 250px;
        width: 95%;
        left: -10px;
        padding: 10px;
        background-color: #007bff;
        color: white;
        border: 1px solid #ccc;
        border-radius: 5px;
        cursor: pointer;
      }
      .doc-email-screen {
        display: none;
        flex-direction: column;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        padding: 20px;
        background: #fff;
        z-index: 40;
        box-sizing: border-box;
      }
      .doc-email-screen.active {
        display: flex;
      }
      .doc-email-header {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 24px;
      }
      .doc-email-header h3 {
        margin: 0;
        font-size: 1.1rem;
      }
      .doc-email-header .material-icons-sharp {
        cursor: pointer;
      }
      .doc-email-label {
        font-size: 0.85rem;
        color: #666;
        margin-bottom: 8px;
      }
      .doc-email-input {
        width: 100%;
        box-sizing: border-box;
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 10px 12px;
        font-size: 0.95rem;
        margin-bottom: 10px;
      }
      .doc-add-email {
        background: none;
        border: none;
        color: #007bff;
        font-weight: 600;
        cursor: pointer;
        padding: 8px 0;
        text-align: left;
        margin-bottom: 30px;
      }
      .doc-email-send-btn {
        width: 100%;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 24px;
        padding: 12px;
        font-weight: 600;
        cursor: pointer;
        margin-bottom: 10px;
      }
      .doc-email-cancel-btn {
        width: 100%;
        background: white;
        color: #007bff;
        border: 1px solid #007bff;
        border-radius: 24px;
        padding: 12px;
        font-weight: 600;
        cursor: pointer;
      }
      .doc-email-success {
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding-top: 80px;
      }
      .doc-email-success .doc-success-icon {
        width: 64px;
        height: 64px;
        border-radius: 50%;
        background: #e8f8f0;
        color: #2ecc71;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20px;
      }
      .doc-email-success p {
        color: #666;
        margin-bottom: 30px;
      }
    </style>
    <div class="document-header">
      <span class="material-icons-sharp">description</span>
      <div>
        <p>Your documents:</p>
        <p id="doc-status" style="margin: 0; color: #666;">Not ready for email</p>
      </div>
      <div style="margin-left: auto;">
        <div class="doc-counter" id="doc-count">0</div>
      </div>
    </div>
    <div class="generate-box">
      <h3>Generate New Document</h3>
      <select id="doc-type">
        <option value="" disabled selected>Choose document type</option>
        <option>Account Confirmation Letter</option>
        <option>Settle Quote</option>
        <option>Stamped Statements</option>
        <option>IT3b Statements</option>
      </select>
      <div id="account-container" style="display: none;">
        <select id="account-choice">
          <option value="" disabled selected>Choose account</option>
          <option>Kodi Code 1052 2626 43 R1000.00</option>
        </select>
      </div>
      <div id="action-buttons">
        <button id="generate-btn">Generate</button>
        <button id="cancel-btn">Cancel</button>
      </div>
      <button id="email-doc-btn">Email document</button>
    </div>
    <div class="doc-email-screen" id="doc-email-screen">
      <div class="doc-email-header">
        <span class="material-icons-sharp" id="doc-email-back">arrow_back</span>
        <h3>Email Document</h3>
      </div>
      <div class="doc-email-label">Send to</div>
      <input type="email" class="doc-email-input" id="doc-email-input" placeholder="Email address" value="saiyalmahabeer@capitecbank.co.za">
      <div id="doc-email-extra"></div>
      <button type="button" class="doc-add-email" id="doc-add-email">+ Add another email address</button>
      <button type="button" class="doc-email-send-btn" id="doc-email-send">Send</button>
      <button type="button" class="doc-email-cancel-btn" id="doc-email-cancel">Cancel</button>
    </div>
    <div class="doc-email-screen doc-email-success" id="doc-email-success">
      <div class="doc-success-icon"><span class="material-icons-sharp">check_circle</span></div>
      <h3>Document emailed</h3>
      <p id="doc-email-success-text">Your document has been emailed.</p>
      <button type="button" class="doc-email-send-btn" id="doc-email-success-done">Done</button>
    </div>
  `;
  let documentCounter = 0;
  const docType = documentsPage.querySelector('#doc-type');
  const accountContainer = documentsPage.querySelector('#account-container');
  const actionButtons = documentsPage.querySelector('#action-buttons');
  const generateBtn = documentsPage.querySelector('#generate-btn');
  const cancelBtn = documentsPage.querySelector('#cancel-btn');
  const docStatus = documentsPage.querySelector('#doc-status');
  const docCount = documentsPage.querySelector('#doc-count');
  docType.addEventListener('change', () => {
    accountContainer.style.display = 'block';
  });
  documentsPage.querySelector('#account-choice').addEventListener('change', () => {
    actionButtons.style.display = 'flex';
  });
  const emailDocBtn = documentsPage.querySelector('#email-doc-btn');
  const docEmailScreen = documentsPage.querySelector('#doc-email-screen');
  const docEmailSuccess = documentsPage.querySelector('#doc-email-success');
  const docEmailBack = documentsPage.querySelector('#doc-email-back');
  const docEmailInput = documentsPage.querySelector('#doc-email-input');
  const docEmailExtra = documentsPage.querySelector('#doc-email-extra');
  const docAddEmail = documentsPage.querySelector('#doc-add-email');
  const docEmailSend = documentsPage.querySelector('#doc-email-send');
  const docEmailCancel = documentsPage.querySelector('#doc-email-cancel');
  const docEmailSuccessDone = documentsPage.querySelector('#doc-email-success-done');
  const docEmailSuccessText = documentsPage.querySelector('#doc-email-success-text');
  generateBtn.addEventListener('click', () => {
    docStatus.textContent = 'Generating...';
    generateBtn.disabled = true;
    setTimeout(() => {
      documentCounter++;
      docCount.textContent = documentCounter;
      docStatus.textContent = 'Ready for email';
      generateBtn.disabled = false;
      emailDocBtn.style.display = 'block';
    }, 3000);
  });
  cancelBtn.addEventListener('click', () => {
    docType.selectedIndex = 0;
    accountContainer.style.display = 'none';
    actionButtons.style.display = 'none';
    emailDocBtn.style.display = 'none';
    docStatus.textContent = 'Not ready for email';
  });
  emailDocBtn.addEventListener('click', () => {
    docEmailScreen.classList.add('active');
  });
  docEmailBack.addEventListener('click', () => {
    docEmailScreen.classList.remove('active');
  });
  docEmailCancel.addEventListener('click', () => {
    docEmailScreen.classList.remove('active');
  });
  docAddEmail.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'email';
    input.className = 'doc-email-input';
    input.placeholder = 'Email address';
    docEmailExtra.appendChild(input);
  });
  docEmailSend.addEventListener('click', () => {
    const docLabel = docType.value === 'Stamped Statements' ? 'Stamped Bank Statement' : docType.value;
    docEmailSuccessText.textContent = 'Your ' + docLabel + ' has been emailed to ' + docEmailInput.value + '.';
    docEmailScreen.classList.remove('active');
    docEmailSuccess.classList.add('active');
  });
  docEmailSuccessDone.addEventListener('click', () => {
    docEmailSuccess.classList.remove('active');
  });
  sidebarToggle.addEventListener('click', function (event) {
    event.preventDefault();
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
    const menuIcon = document.getElementById('menuIcon');
    if (sidebar.classList.contains('active')) {
      menuIcon.textContent = 'close';
    } else {
      menuIcon.textContent = 'menu';
    }
  });
});
