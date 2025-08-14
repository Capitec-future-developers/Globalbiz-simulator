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
        top: 100px;
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
  top: 65px; 
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

  
  generateBtn.addEventListener('click', () => {
    docStatus.textContent = 'Generating...';
    generateBtn.disabled = true;
    setTimeout(() => {
      documentCounter++;
      docCount.textContent = documentCounter;
      docStatus.textContent = 'Ready for email';
      generateBtn.disabled = false;
    }, 3000);
  });

  
  cancelBtn.addEventListener('click', () => {
    docType.selectedIndex = 0;
    accountContainer.style.display = 'none';
    actionButtons.style.display = 'none';
    docStatus.textContent = 'Not ready for email';
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
