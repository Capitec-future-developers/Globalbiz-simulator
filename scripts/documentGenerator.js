window.addEventListener('DOMContentLoaded', () => {
    const target = document.getElementById('document');

    // Inject styles (same as before)
    const style = document.createElement('style');
    style.textContent = `
 #document {
 position: relative;
 width: 90%;
 padding: 30px;
 background: #fff;
 box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
 margin-top: 200px;
 font-family: 'Segoe UI', sans-serif;
 }

 h2 { 
 position: absolute;
 top: -190px;
 left: 10px;
 font-size: 24px;
 margin-bottom: 20px;
 color: #222;
 }

 .banner {
 position: absolute;
 background: #e0f7fa;
 padding: 12px 16px;
 top: -130px;
 font-size: 14px;
 color: #006064;
 width: 100%;
 left: 10px;
 height: 40px;
 }

 .generate-container {
 position: absolute;
 top: -200px;
 right: 30px;
 z-index: 1;
 max-width: calc(100% - 60px);
 overflow: visible;
 }

 @media (max-width: 500px) {
 .generate-container {
 top: -60px;
 right: 10px;
 }
 .generate-container button {
 width: 100%;
 box-sizing: border-box;
 }
 }

 .manager-btn-container{
position: absolute;
right: 50px;
top: 10px;
height: 52px;
background-color: #16232f;
border: 1px solid #ffffff;
}

.manage-btn-container{
 position: absolute;
 right: 50px;
 top: -200px;
 height: 52px;
 background-color: #0078d7;
 border: 1px solid #ffffff;
}

.manage-btn {
 background: none;
 border: none;
 color: white;
 padding: 10px 15px;
 cursor: pointer;
 height: 50px;
}

.details-hover {
 display: none;
 background-color: #ffffff;
 position: absolute;
 top: 100%;
 left: 0;
 z-index: 10;
 box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

.details-hover ul {
 list-style: none;
 margin: 0;
 padding: 10px 0;
}

.details-hover li a {
 display: block;
 padding: 10px 20px;
 text-decoration: none;
 color: #333;
}

.details-hover li a:hover {
 background-color: #f0f0f0;
}

/* Show dropdown on hover */
.manage-btn-container:hover .details-hover {
 display: block;
}


 .popup {
 display: none;
 position: fixed;
 top: 50%;
 left: 50%;
 height: 600px;
 transform: translate(-50%, -50%);
 background: white;
 padding: 25px;
 border-radius: 12px;
 box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2);
 z-index: 1000;
 width: 400px;
 }

 .popup h3 {
 margin-bottom: 10px;
 font-size: 18px;
 }

 .popup p {
 margin: 10px 0 5px;
 font-size: 14px;
 }

 .popup select {
 width: 100%;
 padding: 10px;
 border-radius: 6px;
 border: 1px solid #ccc;
 font-size: 14px;
 margin-bottom: 10px;
 }

 .popup .btn-container {
 position: absolute;
 bottom: 20px;
 right: 20px;
 display: flex;
 gap: 10px;
 }

 .overlay {
 display: none;
 position: fixed;
 top: 0;
 left: 0;
 width: 100%; 
 height: 100%;
 background: rgba(0, 0, 0, 0.3);
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
 position: absolute;
 top: -250px;
 right: 30px;
 z-index: 2;
 background: #d4edda;
 color: #155724;
 padding: 12px 16px;
 border-radius: 6px;
 font-size: 14px;
 box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
 }

 .doc-table {
 width: 100%;
 border-collapse: collapse;
 margin-top: -90px;
 }

 .doc-table th,
 .doc-table td {
 border: 1px solid #e0e0e0;
 padding: 12px;
 font-size: 14px;
 text-align: left;
 border: none;
 }

 .doc-table th {
 background: #f5f5f5;
 color: #333;
 gap: 20px;
 }
`;
    document.head.appendChild(style);

    // Inject HTML (same as before)
    target.innerHTML = `
 <h2>Documents</h2>
 <div class="banner">
 <strong>Note:</strong> Statement not available for accounts open less than 1 month.
 Visit <b>Accounts</b> and choose an account to see transaction history.
 </div>
 <div class="manage-btn-container">
 <button class="manage-btn">Generate Document</button>
 <div class="details-hover">
 <ul id="docTypeSelect">
 <li><a href="#" data-doctype="Account Confirmation Letter">Account Confirmation Letter</a></li>
 <li><a href="#" data-doctype="Settlement quote">Settlement quote</a></li>
 <li><a href="#" data-doctype="Stamped statements">Stamped statements</a></li>
 <li><a href="#" data-doctype="IT3b statements">IT3b statements</a></li>
 <li><a href="#" data-doctype="IT3s statements">IT3s statements</a></li>
 </ul>
 </div>
 </div>
 </div>

 <div class="success-pop" id="successPop"><b>Success:</b> document will be ready below.</div>
 <div class="overlay" id="overlay"></div>
 <div class="popup" id="popup">
 <h3 id="popupHeader"></h3>
 <p>Choose account:</p>
 <select>
 <option disabled selected>Choose account</option>
 <option>Kodi Code 1052 2626 43 - R1000.00</option>
 </select>
 <div class="btn-container">
 <button class="btn btn-primary" id="generateBtn">Generate</button>
 <button class="btn btn-secondary" id="cancelBtn">Cancel</button>
 </div>
 </div>
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
 <tbody id="docTableBody">
 <tr>
 <td colspan="4" style="text-align:center; color:#999;">
 <div style="display: flex; flex-direction: column; align-items: center; margin-top: 20px;">
 <img src="https://business.capitecbank.co.za/images/illustration/application-failed.svg" alt="messages" style="width: 220px; margin-bottom: 12px;" />
 <span style="font-weight: bold; color: black;">No documents generated yet.</span>
 <span style="color: black;">You will find generated document below</span>
 </div>
 </td>
 </tr>
 </tbody>
 </table>
 `;

    // JS Logic with PDF generation
    const docTypeLinks = document.querySelectorAll('#docTypeSelect a');
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');
    const popupHeader = document.getElementById('popupHeader');
    const generateBtn = document.getElementById('generateBtn');
    const cancelBtn = document.getElementById('cancelBtn');
    const successPop = document.getElementById('successPop');
    const loading = document.getElementById('loading');
    const docTable = document.getElementById('docTable');
    const docTableBody = document.getElementById('docTableBody');

    // Store the selected doc type
    let selectedDocType = '';

    // Add click event to each document type link
    docTypeLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            selectedDocType = link.getAttribute('data-doctype');
            popupHeader.textContent = selectedDocType;
            overlay.style.display = 'block';
            popup.style.display = 'block';
        });
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
            const dateStr = now.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric'
            });

            // Create PDF content
            const pdfContent = `
 <html>
 <head>
 <style>
 body {
 font-family: Arial, sans-serif;
 margin: 50px;
 color: #333;
 }
 .header {
 display: flex;
 justify-content: space-between;
 align-items: center;
 margin-bottom: 30px;
 }
 .logo {
 width: 150px;
 height: auto;
 }
 .title {
 font-size: 18px;
 font-weight: bold;
 text-align: center;
 margin: 30px 0;
 text-transform: uppercase;
 }
 .content {
 line-height: 1.6;
 font-size: 14px;
 }
 .footer {
 margin-top: 50px;
 font-size: 12px;
 color: #666;
 }
 .signature {
 margin-top: 50px;
 font-weight: bold;
 }
 .details-table {
 width: 100%;
 border-collapse: collapse;
 margin: 20px 0;
 }
 .details-table td {
 padding: 8px;
 border: 1px solid #ddd;
 }
 .details-table td:first-child {
 font-weight: bold;
 width: 30%;
 background-color: #f5f5f5;
 }
 </style>
 </head>
 <body>
 <div class="header">
 <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Capitec_Bank_logo.svg/1200px-Capitec_Bank_logo.svg.png" class="logo" alt="Capitec Logo">
 <div>21 January 2025</div>
 </div>
 
 <div class="title">${selectedDocType.toUpperCase()}</div>
 
 <div class="content">
 <p>We hereby confirm that Mr Omphile Mohlala has the following active account at Capitec Bank Limited.</p>
 
 <table class="details-table">
 <tr>
 <td>SWIFT Address:</td>
 <td>CABLZAJJ</td>
 </tr>
 <tr>
 <td>Bank Name:</td>
 <td>Capitec Business</td>
 </tr>
 <tr>
 <td>Branch Name:</td>
 <td>Relationship Suite</td>
 </tr>
 <tr>
 <td>Branch Code:</td>
 <td>450105</td>
 </tr>
 <tr>
 <td>Account Name:</td>
 <td>Kodi Code</td>
 </tr>
 <tr>
 <td>Account Number:</td>
 <td>1052262643</td>
 </tr>
 <tr>
 <td>Account Type:</td>
 <td>Capitec Business Account</td>
 </tr>
 <tr>
 <td>Date Account Opened:</td>
 <td>05/06/2024</td>
 </tr>
 <tr>
 <td>Entity Registration/ID Number:</td>
 <td>0105185435085</td>
 </tr>
 </table>
 
 <p>The account details provided herein should not be read as extending by implication to any other matter not
 specifically addressed. The account details are given as at the above date and no obligation is hereby assumed to
 update the account details on any future date.</p>
 
 <p>Capitec shall have no liability whether in contract, delict (including without limitation negligence) or otherwise to the
 above account holder or any third party in relation to the account details contained herein.</p>
 
 <p>If any further information is required, kindly contact the Capitec Client Care Centre on 0860 30 92 50.</p>
 
 <div class="signature">Yours Faithfully,<br>THE CAPITEC TEAM<br>Form 104d (4/2023)</div>
 </div>
 
 <div class="footer">
 Client Care Centre 0860 30 92 50 | T +27 11 302 0400 | E CustomerResolution@capitecbank.co.za<br>
 142 West Street, Sandown, 2196 | PO Box 782699, Sandton, 2146 | capitecbank.co.za<br>
 Capitec Bank is an authorised financial services provider (FSP46669) and registered credit provider (NCRCP13)<br>
 Capitec Bank Limited Reg. No: 1980/003695/06<br>
 Directors: SL Botha (Chairman), GM Fourie* (CEO), NF Bhettay, SA du Plessis, N Ford-Hoon, GR Hardy*(CFO), MS du P le Roux, V Mahlangu, PJ Mouton, CA Otto. Group Company Secretary: YM Mouton
 </div>
 </body>
 </html>
 `;

            // Create a Blob with the PDF content
            const blob = new Blob([pdfContent], { type: 'application/pdf' });
            const downloadUrl = URL.createObjectURL(blob);

            const row = `
 <tr>
 <td>${dateStr}</td>
 <td>${selectedDocType}</td>
 <td>Kodi Code 1052 2626 43</td>
 <td>
 <a href="${downloadUrl}" download="${selectedDocType.replace(/\s+/g, '_')}_${dateStr.replace(/\s+/g, '_')}.pdf" class="btn btn-primary">Download</a>
 <button class="btn btn-secondary">Email</button>
 </td>
 </tr>
 `;

            docTableBody.innerHTML = row;
            docTable.style.display = 'table';
            successPop.style.display = 'none';
            loading.style.display = 'none';
        }, 7000);
    });
});