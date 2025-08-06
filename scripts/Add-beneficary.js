
function initializeAddBeneficiary() {
    const addBeneficiaryBtn = document.getElementById('addBeneficiaryBtn');

    if (addBeneficiaryBtn) {
        addBeneficiaryBtn.addEventListener('click', function() {
            const mainContent = document.getElementById('mainContent');


            mainContent.innerHTML = `
 <section class="heading">
 <div class="heading-content">
 <div class="heading-title">
 <h4>Add New Beneficiary</h4>
 </div>
 <div class="details">
 <span class="details-title">From Account</span>
 <span class="details-name">Kodi Code 1052 2626 43</span>
 </div>
 </div>
 </section>

 <section class="what-to-do">
 <div class="heading2">
 <h4>Select beneficiary type</h4>
 </div>
 <div class="what-to-do-content">
 <div class="beneficiary-option">
 <div class="option-content">
 <img src="../images/bank-icon.png" class="option-icon">
 <span>Bank Account</span>
 </div>
 <input type="radio" name="beneficiaryType" value="bank" checked class="option-radio">
 </div>
 <div class="beneficiary-option">
 <div class="option-content">
 <img src="../images/mobile-icon.png" class="option-icon">
 <span>Mobile Number</span>
 </div>
 <input type="radio" name="beneficiaryType" value="mobile" class="option-radio">
 </div>
 <div class="beneficiary-option">
 <div class="option-content">
 <img src="../images/email-icon.png" class="option-icon">
 <span>Email Address</span>
 </div>
 <input type="radio" name="beneficiaryType" value="email" class="option-radio">
 </div>
 </div>

 <div id="bankOptions" class="options-container">
 <div class="input-group">
 <label>Bank Name</label>
 <select class="form-input">
 <option>Select Bank</option>
 <option>Standard Bank</option>
 <option>First National Bank</option>
 <option>Absa Bank</option>
 <option>Nedbank</option>
 <option>Capitec Bank</option>
 </select>
 </div>
 <div class="input-group">
 <label>Account Number</label>
 <input type="text" placeholder="Enter account number" class="form-input">
 </div>
 <div class="input-group">
 <label>Account Type</label>
 <select class="form-input">
 <option>Select Account Type</option>
 <option>Cheque Account</option>
 <option>Savings Account</option>
 <option>Transmission Account</option>
 </select>
 </div>
 </div>

 <div id="mobileOptions" class="options-container" style="display: none;">
 <div class="input-group">
 <label>Mobile Network</label>
 <select class="form-input">
 <option>Select Network</option>
 <option>MTN</option>
 <option>Vodacom</option>
 <option>Cell C</option>
 <option>Telkom Mobile</option>
 </select>
 </div>
 <div class="input-group">
 <label>Mobile Number</label>
 <input type="text" placeholder="Enter mobile number" class="form-input">
 </div>
 </div>

 <div id="emailOptions" class="options-container" style="display: none;">
 <div class="input-group">
 <label>Email Address</label>
 <input type="email" placeholder="Enter email address" class="form-input">
 </div>
 </div>
 </section>

 <div class="form-actions">
 <button class="btn-continue">Continue</button>
 <button class="btn-cancel">Cancel</button>
 </div>
 `;

            // Toggle between beneficiary type options
            const beneficiaryTypeRadios = document.querySelectorAll('input[name="beneficiaryType"]');
            beneficiaryTypeRadios.forEach(radio => {
                radio.addEventListener('change', function() {
                    document.getElementById('bankOptions').style.display = 'none';
                    document.getElementById('mobileOptions').style.display = 'none';
                    document.getElementById('emailOptions').style.display = 'none';

                    if (this.value === 'bank') {
                        document.getElementById('bankOptions').style.display = 'block';
                    } else if (this.value === 'mobile') {
                        document.getElementById('mobileOptions').style.display = 'block';
                    } else if (this.value === 'email') {
                        document.getElementById('emailOptions').style.display = 'block';
                    }
                });
            });

            // Cancel button
            const cancelButton = document.querySelector('.btn-cancel');
            if (cancelButton) {
                cancelButton.addEventListener('click', function() {
                    location.reload();
                });
            }

            // Continue button
            const continueButton = document.querySelector('.btn-continue');
            if (continueButton) {
                continueButton.addEventListener('click', function() {
                    const selectedType = document.querySelector('input[name="beneficiaryType"]:checked').value;

                    if (selectedType === 'bank') {
                        const bankName = document.querySelector('#bankOptions select').value;
                        const accountNumber = document.querySelector('#bankOptions input[type="text"]').value;
                        const accountType = document.querySelector('#bankOptions select:last-child').value;

                        if (bankName === 'Select Bank' || !accountNumber || accountType === 'Select Account Type') {
                            alert('Please fill in all bank details');
                            return;
                        }
                    } else if (selectedType === 'mobile') {
                        const mobileNumber = document.querySelector('#mobileOptions input').value;
                        if (!mobileNumber) {
                            alert('Please enter mobile number');
                            return;
                        }
                    } else if (selectedType === 'email') {
                        const email = document.querySelector('#emailOptions input').value;
                        if (!email) {
                            alert('Please enter email address');
                            return;
                        }
                    }

                    showBeneficiaryDetailsPage(selectedType);
                });
            }

            function showBeneficiaryDetailsPage(type) {
                mainContent.innerHTML = `
 <section class="heading">
 <div class="heading-content">
 <div class="heading-title">
 <h4>Beneficiary Details</h4>
 </div>
 </div>
 </section>

 <section class="what-to-do">
 <div class="input-group">
 <label>Beneficiary Name</label>
 <input type="text" placeholder="Enter beneficiary name" class="form-input">
 </div>
 
 <div class="input-group">
 <label>Your Reference</label>
 <input type="text" placeholder="Enter your reference" class="form-input">
 </div>
 
 <div class="input-group">
 <label>Their Reference</label>
 <input type="text" placeholder="Enter their reference" class="form-input">
 </div>
 
 ${type === 'bank' ? `
 <div class="input-group">
 <label class="checkbox-label">
 <input type="checkbox" id="saveFavorite" class="form-checkbox">
 <span>Add to favorites list</span>
 </label>
 </div>
 ` : ''}
 </section>

 <div class="form-actions">
 <button class="btn-submit">Add Beneficiary</button>
 <button class="btn-cancel">Cancel</button>
 </div>
 `;

                // Add Beneficiary button
                const addBeneficiaryBtn = document.querySelector('.btn-submit');
                if (addBeneficiaryBtn) {
                    addBeneficiaryBtn.addEventListener('click', function() {
                        const beneficiaryName = document.querySelector('input[placeholder="Enter beneficiary name"]').value;
                        const yourRef = document.querySelector('input[placeholder="Enter your reference"]').value;
                        const theirRef = document.querySelector('input[placeholder="Enter their reference"]').value;

                        if (!beneficiaryName || !yourRef || !theirRef) {
                            alert('Please fill in all required fields');
                            return;
                        }

                        alert('Beneficiary added successfully!');
                        location.reload();
                    });
                }

                // Cancel button
                const cancelDetailsBtn = document.querySelector('.btn-cancel');
                if (cancelDetailsBtn) {
                    cancelDetailsBtn.addEventListener('click', function() {
                        location.reload();
                    });
                }
            }
        });
    }
}

// Initialize when DOM is fully loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAddBeneficiary);
} else {
    initializeAddBeneficiary();
}