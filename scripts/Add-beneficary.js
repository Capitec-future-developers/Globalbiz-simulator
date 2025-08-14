function initializeAddBeneficiary() {
    const addBeneficiaryBtn = document.getElementById('addBeneficiaryBtn');

    if (addBeneficiaryBtn) {
        addBeneficiaryBtn.addEventListener('click', function () {
            const modalOverlay = document.createElement('div');
            modalOverlay.className = 'beneficiary-modal-overlay';

            const modal = document.createElement('div');
            modal.className = 'beneficiary-modal';

            modal.innerHTML = `
 <div class="modal-header">
 <h4>Add Beneficiary</h4>
 <div class="steps-indicator">
 <span class="step active">1</span>
 <span class="step">2</span>
 </div>
 <span class="close-modal">&times;</span>
 </div>
 
 <div class="modal-body">
 <div class="form-section">
 <h5 class="section-title">Choose Beneficiary Type</h5>
 <div class="radio-group">
 <label class="radio-option">
 <input type="radio" name="beneficiaryType" value="new" checked>
 <span>New Beneficiary</span>
 </label>
 <label class="radio-option">
 <input type="radio" name="beneficiaryType" value="public">
 <span>Public Beneficiary</span>
 </label>
 </div>
 </div>
 
 <div class="form-section">
 <label class="form-label">Beneficiary Name</label>
 <input type="text" class="form-input" placeholder="Enter beneficiary name">
 </div>
 
 <div class="bank-details">
 <h5 class="section-title">Bank Details</h5>
 <div class="form-row">
 <div class="form-group">
 <label class="form-label">Bank Name</label>
 <select class="form-input">
 <option value="">Select Bank</option>
 <option>Standard Bank</option>
 <option>First National Bank</option>
 <option>Absa Bank</option>
 <option>Nedbank</option>
 <option>Capitec Bank</option>
 </select>
 </div>
 <div class="form-group">
 <label class="form-label">Account Number</label>
 <input type="text" class="form-input" placeholder="Enter account number">
 </div>
 </div>
 
 <div class="form-group">
 <label class="form-label">Their Reference</label>
 <input type="text" class="form-input" placeholder="Enter their reference">
 </div>
 </div>
 
 <div class="form-section">
 <h5 class="section-title">Payment Notification</h5>
 <div class="form-group">
 <label class="form-label">Notification Type</label>
 <select class="form-input">
 <option value="">Select notification type</option>
 <option>SMS</option>
 <option>Email</option>
 </select>
 </div>
 </div>
 </div>
 
 <div class="modal-footer">
 <button class="btn-cancel">Cancel</button>
 <button class="btn-continue">Continue</button>
 </div>
            `;

            modalOverlay.appendChild(modal);
            document.body.appendChild(modalOverlay);

            
            modal.querySelector('.close-modal').addEventListener('click', () => {
                document.body.removeChild(modalOverlay);
            });

            modal.querySelector('.btn-cancel').addEventListener('click', () => {
                document.body.removeChild(modalOverlay);
            });

            modal.querySelector('.btn-continue').addEventListener('click', () => {
                const beneficiaryName = modal.querySelector('input[placeholder="Enter beneficiary name"]').value;
                const bankName = modal.querySelector('select').value;
                const accountNumber = modal.querySelector('input[placeholder="Enter account number"]').value;
                const theirRef = modal.querySelector('input[placeholder="Enter their reference"]').value;

                if (!beneficiaryName || !bankName || !accountNumber || !theirRef) {
                    alert('Please fill in all required fields');
                    return;
                }

                showConfirmationPage(modal, modalOverlay, {
                    beneficiaryName,
                    bankName,
                    accountNumber,
                    theirRef
                });
            });

            modalOverlay.addEventListener('click', function (e) {
                if (e.target === modalOverlay) {
                    document.body.removeChild(modalOverlay);
                }
            });
        });
    }
}

function showConfirmationPage(modal, modalOverlay, data) {
    modal.innerHTML = `
 <div class="modal-header">
 <h4>Confirm Beneficiary</h4>
 <div class="steps-indicator">
 <span class="step">1</span>
 <span class="step active">2</span>
 </div>
 <span class="close-modal">&times;</span>
 </div>

 <div class="modal-body">
 <div class="confirmation-details">
 <div class="detail-row">
 <span class="detail-label">Beneficiary Name:</span>
 <span class="detail-value">${data.beneficiaryName}</span>
 </div>
 <div class="detail-row">
 <span class="detail-label">Bank Name:</span>
 <span class="detail-value">${data.bankName}</span>
 </div>
 <div class="detail-row">
 <span class="detail-label">Account Number:</span>
 <span class="detail-value">${data.accountNumber}</span>
 </div>
 <div class="detail-row">
 <span class="detail-label">Their Reference:</span>
 <span class="detail-value">${data.theirRef}</span>
 </div>
 </div>

 <div class="terms-checkbox">
 <input type="checkbox" id="confirmTerms">
 <label for="confirmTerms">I confirm that the details above are correct</label>
 </div>
 </div>

 <div class="modal-footer">
 <button class="btn-back">Back</button>
 <button class="btn-confirm">Confirm</button>
 </div>
    `;

    modal.querySelector('.btn-back').addEventListener('click', function () {
        initializeAddBeneficiary();
        document.body.removeChild(modalOverlay);
    });

    modal.querySelector('.btn-confirm').addEventListener('click', function () {
        const termsChecked = modal.querySelector('#confirmTerms').checked;

        if (!termsChecked) {
            alert('Please confirm that the details are correct');
            return;
        }

        alert('Beneficiary added successfully!');
        document.body.removeChild(modalOverlay);
    });

    modal.querySelector('.close-modal').addEventListener('click', function () {
        document.body.removeChild(modalOverlay);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAddBeneficiary);
} else {
    initializeAddBeneficiary();
}

const tabData = {
    yourBeneficiaries: `
        <div class="tabz-search">
            <input type="search" placeholder="Search beneficiaries">
            <select class="select">
                <option>Filter by</option>
                <option>Last 6 Months</option>
                <option>Last 12 Months</option>
                <option>Never Paid</option>
                <option>Show All</option>
            </select>
        </div>
        <div class="table-wrapper">
            <table class="beneficiary-table">
                <thead>
                    <tr class="beneficiary-header-row">
                        <th>Beneficiary Name</th>
                        <th>Account Number</th>
                        <th>Their reference</th>
                        <th>Last payment date</th>
                        <th>Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Kodi_code</td>
                        <td>1050933435</td>
                        <td>Project</td>
                        <td>20 July 2025</td>
                        <td>R100.00</td>
                        <td>Edit | Pay <img src="../images/chevron-down-white.svg" alt="dropdown" style="position: absolute; right: 40px; filter: invert(31%) sepia(95%) saturate(3053%) hue-rotate(203deg) brightness(97%) contrast(101%);"></td>
                    </tr>
                    <tr>
                        <td>Linda Mokoena</td>
                        <td>2345678901</td>
                        <td>Rent</td>
                        <td>5 August 2025</td>
                        <td>R7,850.00</td>
                        <td>Edit | Pay <img src="../images/chevron-down-white.svg" alt="dropdown" style="position: absolute; right: 40px; filter: invert(31%) sepia(95%) saturate(3053%) hue-rotate(203deg) brightness(97%) contrast(101%);"></td>
                    </tr>
                    <tr>
                        <td>Dwain Johnson</td>
                        <td>1987654321</td>
                        <td>Consulting</td>
                        <td>1 August 2025</td>
                        <td>R2,500.00</td>
                        <td>Edit | Pay <img src="../images/chevron-down-white.svg" alt="dropdown" style="position: absolute; right: 40px; filter: invert(31%) sepia(95%) saturate(3053%) hue-rotate(203deg) brightness(97%) contrast(101%);"></td>
                    </tr>
                    <tr>
                        <td>Susan Kgatle</td>
                        <td>1234509876</td>
                        <td>Groceries</td>
                        <td>30 July 2025</td>
                        <td>R1,200.00</td>
                        <td>Edit | Pay <img src="../images/chevron-down-white.svg" alt="dropdown" style="position: absolute; right: 40px; filter: invert(31%) sepia(95%) saturate(3053%) hue-rotate(203deg) brightness(97%) contrast(101%);"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `,

    publicBeneficiary: `
        <div class="tabz-search">
            <input type="search" placeholder="Search beneficiaries">
            <select class="select">
                <option>Filter by</option>
                <option>Last 6 Months</option>
                <option>Last 12 Months</option>
                <option>Never Paid</option>
                <option>Show All</option>
            </select>
        </div>
        <div class="table-wrapper">
            <table class="beneficiary-table">
                <thead>
                    <tr class="beneficiary-header-row">
                        <th>Beneficiary Name</th>
                        <th>Their reference</th>
                        <th>Last payment date</th>
                        <th>Amount</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>MOSSEL BAY MUNICIPALITY</td>
                        <td>Project</td>
                        <td>20 July 2025</td>
                        <td>R100.00</td>
                        <td style="color: #178be1"> Edit | Pay <img src="../images/chevron-down-white.svg" alt="dropdown" style="position: absolute; right: 40px; filter: invert(31%) sepia(95%) saturate(3053%) hue-rotate(203deg) brightness(97%) contrast(101%);"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
};


const tabButtons = {
    yourBeneficiaries: document.getElementById('yourBeneficiaries'),
    publicBeneficiary: document.getElementById('publicBeneficiary'),
    beneficiaryGroups: document.getElementById('beneficiaryGroups'),
};


const tabzContent = document.getElementById('tabzContent');

function highlightTab(activeId) {
    Object.values(tabButtons).forEach(btn => btn?.classList.remove('actives'));
    tabButtons[activeId]?.classList.add('actives');
}

function displayTabContent(tabKey) {
    const html = tabData[tabKey];
    if (!html || !tabzContent) return;
    tabzContent.innerHTML = html;
}

function handleTabClick(event) {
    const clickedTab = event.target.closest('.tabz1, .tabz2, .tabz3');
    if (!clickedTab) return;

    const tabKey = Object.keys(tabButtons).find(key => tabButtons[key] === clickedTab);
    if (!tabKey) return;

    highlightTab(tabKey);
    displayTabContent(tabKey);
}


Object.values(tabButtons).forEach(btn => btn?.addEventListener('click', handleTabClick));


highlightTab('yourBeneficiaries');
displayTabContent('yourBeneficiaries');
