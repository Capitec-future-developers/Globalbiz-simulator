function initializeAddBeneficiary() {
    const addBeneficiaryBtn = document.getElementById('addBeneficiaryBtn');

    if (addBeneficiaryBtn) {
        addBeneficiaryBtn.addEventListener('click', function() {

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

            // Append modal to overlay and to body
            modalOverlay.appendChild(modal);
            document.body.appendChild(modalOverlay);

            // Close modal handler
            const closeModal = modal.querySelector('.close-modal');
            closeModal.addEventListener('click', function() {
                document.body.removeChild(modalOverlay);
            });

            // Cancel button handler
            const cancelButton = modal.querySelector('.btn-cancel');
            cancelButton.addEventListener('click', function() {
                document.body.removeChild(modalOverlay);
            });

            // Continue button handler - goes to confirmation page
            const continueButton = modal.querySelector('.btn-continue');
            continueButton.addEventListener('click', function() {
                // Validate inputs first
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

            modalOverlay.addEventListener('click', function(e) {
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

    // Back button handler
    const backButton = modal.querySelector('.btn-back');
    backButton.addEventListener('click', function() {
        initializeAddBeneficiary();
        document.body.removeChild(modalOverlay);
    });

    // Confirm button handler
    const confirmButton = modal.querySelector('.btn-confirm');
    confirmButton.addEventListener('click', function() {
        const termsChecked = modal.querySelector('#confirmTerms').checked;

        if (!termsChecked) {
            alert('Please confirm that the details are correct');
            return;
        }

        alert('Beneficiary added successfully!');
        document.body.removeChild(modalOverlay);
    });

    // Close modal handler
    const closeModal = modal.querySelector('.close-modal');
    closeModal.addEventListener('click', function() {
        document.body.removeChild(modalOverlay);
    });
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAddBeneficiary);
} else {
    initializeAddBeneficiary();
}