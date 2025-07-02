window.addEventListener('DOMContentLoaded', () => {
    const target = document.getElementById('document');

    // Inject styles
    const style = document.createElement('style');
    style.textContent = `
    #document {
      background: #f9f9f9;
      padding: 30px;
      font-family: 'Segoe UI', sans-serif;
    }
    h2 {
      font-size: 24px;
      margin-bottom: 20px;
      color: #222;
    }
    .banner {
      background: #e3f7fa;
      color: #333;
      border-radius: 8px;
      padding: 12px 16px;
      font-size: 14px;
      display: flex;
      align-items: center;
      margin-bottom: 25px;
    }
    .banner::before {
      content: 'ℹ️';
      font-size: 18px;
      margin-right: 10px;
    }
    .generate-container {
      position: relative;
      display: inline-block;
      margin-bottom: 30px;
    }
    .generate-container button {
      background: #009fe3;
      color: #fff;
      padding: 10px 20px;
      font-size: 15px;
      border: none;
      border-radius: 6px 6px 0 0;
      cursor: pointer;
      width: 100%;
    }
    .dropdown {
      display: none;
      position: absolute;
      top: 100%;
      left: 0;
      width: 260px;
      background: #fff;
      border: 1px solid #ccc;
      border-radius: 0 0 6px 6px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
      z-index: 10;
    }
    .dropdown option {
      padding: 12px 15px;
      border-bottom: 1px solid #eee;
      font-size: 14px;
      color: #333;
      cursor: pointer;
    }
    .dropdown option:last-child {
      border-bottom: none;
    }
    .dropdown select {
      width: 100%;
      border: none;
      outline: none;
      padding: 0;
      margin: 0;
      background: transparent;
      font-size: 14px;
    }
    .generate-container:hover .dropdown {
      display: block;
    }
    .popup, .overlay { display: none; }
    .success-pop {
      background: #eafaf1;
      color: #2e7d32;
      padding: 10px 16px;
      font-size: 14px;
      border-radius: 5px;
      margin-bottom: 10px;
    }
    .loading {
      margin-top: 10px;
      font-size: 14px;
      color: #444;
    }
    .doc-table {
      width: 100%;
      border-collapse: collapse;
      background: #fff;
    }
    .doc-table th, .doc-table td {
      padding: 12px 16px;
      font-size: 14px;
      text-align: left;
    }
    .doc-table th {
      background: #f2f2f2;
      color: #333;
    }
    .doc-table tr:not(:last-child) {
      border-bottom: 1px solid #e0e0e0;
    }
  `;
    document.head.appendChild(style);

    // Inject HTML
    target.innerHTML = `
    <h2>Documents</h2>
    <div class="banner">
      <strong>Note</strong> Statement not available for accounts open less than 1 month. Visit Accounts and choose an account to see transaction history.
    </div>
    <div class="generate-container">
      <button class="btn btn-primary">Generate Document</button>
      <div class="dropdown">
        <select id="docTypeSelect" size="6">
          <option disabled selected>Documents</option>
          <option>Account Confirmation Letter</option>
          <option>Settlement quote</option>
          <option>Stamped statements</option>
          <option>IT3b statements</option>
          <option>IT3s statements</option>
        </select>
      </div>
    </div>
    <div class="success-pop" id="successPop" style="display: none;">Your document will be ready below.</div>
    <div class="loading" id="loading" style="display: none;">Generating document... Please wait.</div>
    <table class="doc-table" id="docTable" style="display: none;">
      <thead>
        <tr>
          <th>Date</th>
          <th>Document type</th>
          <th>Account</th>
        </tr>
      </thead>
      <tbody id="docTableBody"></tbody>
    </table>
  `;

    // JS Logic
    const docTypeSelect = document.getElementById('docTypeSelect');
    const successPop = document.getElementById('successPop');
    const loading = document.getElementById('loading');
    const docTable = document.getElementById('docTable');
    const docTableBody = document.getElementById('docTableBody');

    docTypeSelect.addEventListener('change', () => {
        const selected = docTypeSelect.value;
        if (!selected || selected === 'Documents') return;

        successPop.style.display = 'block';
        loading.style.display = 'block';

        setTimeout(() => {
            const now = new Date();
            const dateStr = now.toLocaleDateString('en-ZA', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });

            const row = `<tr>
        <td>${dateStr}</td>
        <td>${selected}</td>
        <td>Kodi Code 1052 2626 43</td>
      </tr>`;

            docTableBody.innerHTML = row;
            docTable.style.display = 'table';
            successPop.style.display = 'none';
            loading.style.display = 'none';
        }, 3000);
    });
});
