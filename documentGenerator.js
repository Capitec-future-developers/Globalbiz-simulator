window.addEventListener('DOMContentLoaded', () => {
    const target = document.getElementById('document');

    // Inject styles
    const style = document.createElement('style');
    style.textContent = `
    #document {
      position: relative;
      width: 100%;
      padding: 30px;
      background: #fff;
      border-radius: 16px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      margin-top: 20px;
      font-family: 'Segoe UI', sans-serif;
    }
    h2 { 
      position: absolute;
      top: -210px;
      left: 10px;
      font-size: 24px;
      margin-bottom: 20px;
      color: #222;
    }
    .banner {
      background: #e0f7fa;
      padding: 12px 16px;
      border-radius: 8px;
      margin-bottom: 25px;
      font-size: 14px;
      color: #006064;
    }
    .generate-container {
      position: absolute;
      top: -210px;
      left: 800px;
      z-index: 1;
    }
    @media (max-width: 1100px) {
      .generate-container {
        left: 900px;
      }
    }
    @media (max-width: 900px) {
      .generate-container {
        left: 700px;
      }
    }
    .generate-container button {
      font-weight: bold;
      font-size: 14px;
      padding: 10px 20px;
      background: #0288d1;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }
    .dropdown {
      display: none;
      margin-top: 5px;
      background: white;
      border: 1px solid #ccc;
      border-radius: 8px;
      width: 260px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    .dropdown select {
      width: 100%;
      padding: 12px;
      border: none;
      font-size: 14px;
      cursor: pointer;
    }
    .generate-container:hover .dropdown {
      display: block;
    }
    .popup {
      display: none;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: white;
      padding: 25px;
      border-radius: 12px;
      box-shadow: 0 8px 30px rgba(0,0,0,0.2);
      z-index: 1000;
      width: 300px;
    }
    .popup h3 {
      margin-bottom: 10px;
      font-size: 18px;
    }
    .popup p {
      margin: 10px 0 5px;
      font-size: 14px;
    }
    .popup select, .popup input {
      width: 100%;
      padding: 10px;
      border-radius: 6px;
      border: 1px solid #ccc;
      font-size: 14px;
      margin-bottom: 10px;
    }
    .overlay {
      display: none;
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background: rgba(0,0,0,0.3);
      z-index: 999;
    }
    .btn {
      padding: 10px 15px;
      margin: 5px 3px 0 0;
      border: none;
      border-radius: 6px;
      font-size: 14px;
      cursor: pointer;
    }
    .btn-primary {
      background: #0288d1;
      color: white;
    }
    .btn-secondary {
      background: #f1f1f1;
      color: #333;
    }
    .loading {
      display: none;
      font-size: 14px;
      margin-top: 20px;
      color: #555;
    }
    .success-pop {
      display: none;
      background: #d4edda;
      color: #155724;
      padding: 12px;
      margin: 20px 0 10px;
      border-radius: 6px;
      font-size: 14px;
    }
    .doc-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;
      display: none;
    }
    .doc-table th, .doc-table td {
      border: 1px solid #e0e0e0;
      padding: 12px;
      font-size: 14px;
      text-align: left;
    }
    .doc-table th {
      background: #f5f5f5;
      color: #333;
    }
  `;
    document.head.appendChild(style);

    // Inject HTML
    target.innerHTML = `
    <h2>Documents</h2>
    <div class="banner">
      <strong>Note:</strong> Statement not available for accounts open less than 1 month. Visit <b>Accounts</b> and choose an account to see transaction history.
    </div>
    <div class="generate-container">
      <button id="generateBtnOpen" class="btn btn-primary">Generate Document</button>
      <div class="dropdown">
        <select id="docTypeSelect">
          <option value="" disabled selected>Choose document type</option>
          <option>Account Confirmation Letter</option>
          <option>Settlement quote</option>
          <option>Stamped statements</option>
          <option>IT3b statements</option>
          <option>IT3s statements</option>
        </select>
      </div>
    </div>
    <div class="overlay" id="overlay"></div>
    <div class="popup" id="popup">
      <h3 id="popupHeader"></h3>
      <p>Choose account:</p>
      <select><option selected>Kodi Code 1052 2626 43</option></select>
      <p>Amount:</p>
      <input type="text" value="R1000.00" disabled />
      <button class="btn btn-primary" id="generateBtn">Generate</button>
      <button class="btn btn-secondary" id="cancelBtn">Cancel</button>
    </div>
    <div class="success-pop" id="successPop">Your document will be ready below.</div>
    <div class="loading" id="loading">Generating document... Please wait.</div>
    <table class="doc-table" id="docTable">
      <thead>
        <tr>
          <th>Date</th>
          <th>Document Type</th>
          <th>Account</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="docTableBody"></tbody>
    </table>
  `;

    // JS Logic
    const docTypeSelect = document.getElementById('docTypeSelect');
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    const popupHeader = document.getElementById('popupHeader');
    const generateBtn = document.getElementById('generateBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const successPop = document.getElementById('successPop');
    const loading = document.getElementById('loading');
    const docTable = document.getElementById('docTable');
    const docTableBody = document.getElementById('docTableBody');

    docTypeSelect.addEventListener('change', () => {
        if (!docTypeSelect.value) return;
        popupHeader.textContent = docTypeSelect.value;
        overlay.style.display = 'block';
        popup.style.display = 'block';
    });

    cancelBtn.addEventListener('click', () => {
        popup.style.display = 'none';
        overlay.style.display = 'none';
    });

    generateBtn.addEventListener('click', () => {
        popup.style.display = 'none';
        overlay.style.display = 'none';
        successPop.style.display = 'block';
        loading.style.display = 'block';

        setTimeout(() => {
            const now = new Date();
            const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
            const docType = docTypeSelect.value;

            const row = `
        <tr>
          <td>${dateStr}</td>
          <td>${docType}</td>
          <td>Kodi Code 1052 2626 43</td>
          <td>
            <button class="btn btn-primary">Download</button>
            <button class="btn btn-secondary">Email</button>
          </td>
        </tr>
      `;

            docTableBody.innerHTML = row;
            docTable.style.display = 'table';
            successPop.style.display = 'none';
            loading.style.display = 'none';
        }, 30000);
    });
});
