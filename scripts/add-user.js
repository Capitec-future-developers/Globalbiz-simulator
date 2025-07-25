document.addEventListener('DOMContentLoaded', function () {
    const mainContent = document.getElementById('mainContent');
    const disclaimerBox = document.querySelector('.disclaimer-box');
    const nextBtn = document.getElementById('nextBtn');
    const cancelBtn = document.querySelector('.cancel');

    if (!disclaimerBox || !nextBtn) return;

// Initial disclaimer content (without checkbox requirement)
    const initialDisclaimerContent = `
<h4>What is Digital ID?</h4>
<br>
<p>WE've made business banking even easier by introducing Digital ID. It's the easiest way to sign in to all your banking profiles</p><br>
<h4>What you get</h4>
<br>
<ul>
<li>One username and password to remember</li>
<li>Link all banking profiles for a simpler sign in</li>
<li>Quick and easy access to your accounts</li>
</ul>
<br>
<div class="seperator"></div>
<br>
<p>Click Next to continue with user creation.</p>
`;

// Show initial disclaimer
    disclaimerBox.innerHTML = initialDisclaimerContent;

// Handle the initial next button click (outside the disclaimer box)
    nextBtn.addEventListener('click', function() {
        renderStep1();
    });

// Event delegation for all next buttons inside the disclaimer box
    disclaimerBox.addEventListener('click', function(e) {
        if (e.target && e.target.classList.contains('next')) {
            const currentActive = disclaimerBox.querySelector('.step.active');
            const currentStep = currentActive ? parseInt(currentActive.textContent) : 0;

            if (currentStep === 1) {
                if (validateStep1()) renderStep2();
            } else if (currentStep === 2) {
                if (validateStep2()) renderStep3();
            } else if (currentStep === 3) {
                if (validateStep3()) renderStep4();
            }
        }
    });

// Cancel button handler
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function() {
            disclaimerBox.innerHTML = initialDisclaimerContent;
            document.querySelector('.letsgo').style.display = 'flex';
        });
    }

// Validation functions
    function validateStep1() {
        const form = disclaimerBox.querySelector('.user-form');
        if (!form.checkValidity()) {
            form.reportValidity();
            return false;
        }
        return true;
    }

    function validateStep2() {
        const checked = disclaimerBox.querySelector('input[name="role"]:checked');
        if (!checked) {
            alert('Please select a role');
            return false;
        }
        return true;
    }

    function validateStep3() {
        const checked = disclaimerBox.querySelector('input[name="access"]:checked');
        if (!checked) {
            alert('Please select at least one access level');
            return false;
        }
        return true;
    }

// Render Step 1 (User Details)
    const renderStep1 = () => {
        disclaimerBox.innerHTML = `
<div class="step-header">
<div class="step active">1</div>
<div class="step">2</div>
<div class="step">3</div>
<div class="step">4</div>
<div class="step">5</div>
</div>

<h2>User Details</h2>
<p><strong>Note:</strong> The email address you give will become the username of the added user.</p><br>

<form class="user-form">
<div class="form-row">
<div class="form-group">
<label>First Name</label>
<input type="text" placeholder="Enter first name" required>
</div>
<div class="form-group">
<label>Last Name</label>
<input type="text" placeholder="Enter last name" required>
</div>
</div>
<div class="form-row">
<div class="form-group">
<label>Email</label>
<input type="email" placeholder="Enter email" required>
</div>
<div class="form-group">
<label>Cellphone Number</label>
<input type="tel" placeholder="Enter phone number" required>
</div>
</div>
<div class="form-group">
<label>Choose Identity Type</label>
<select id="identityTypeSelect" required>
<option value="">Select identity type</option>
<option value="rsa">RSA Identity</option>
<option value="passport">Passport</option>
</select>
</div>
<div class="form-group" id="identityInputWrapper" style="display: none;"></div>

<h3>Preferred Method of Communication</h3>
<div class="checkbox-group">
<label><input type="checkbox" name="communication" value="email"> Email</label>
<label><input type="checkbox" name="communication" value="sms"> SMS</label>
</div>

<div class="letsgo">
<button class="cancel">Cancel</button>
<button type="button" class="next">Next</button>
</div>
</form>
`;

        const identitySelect = document.getElementById('identityTypeSelect');
        const inputWrapper = document.getElementById('identityInputWrapper');

        identitySelect.addEventListener('change', function() {
            const selected = this.value;
            inputWrapper.style.display = selected ? 'block' : 'none';

            if (selected === 'rsa') {
                inputWrapper.innerHTML = `
<label>RSA ID Number</label>
<input type="text" maxlength="13" placeholder="Enter 13-digit RSA ID" required>
`;
            } else if (selected === 'passport') {
                inputWrapper.innerHTML = `
<label>Passport Number</label>
<input type="text" placeholder="Enter passport number" required>
`;
            } else {
                inputWrapper.innerHTML = '';
            }
        });
    };

// Step 2: Select Role
    const renderStep2 = () => {
        disclaimerBox.innerHTML = `
<div class="step-header">
<div class="step">1</div>
<div class="step active">2</div>
<div class="step">3</div>
<div class="step">4</div>
<div class="step">5</div>
</div>

<h2>Select User Role</h2>
<p>Please choose the role to assign to this user:</p>

<form class="role-form">
<div class="form-group">
<label><input type="radio" name="role" value="authoriser" required> Authoriser</label>
</div>
<div class="form-group">
<label><input type="radio" name="role" value="capturer"> Capturer</label>
</div>
<div class="form-group">
<label><input type="radio" name="role" value="viewer"> Viewer</label>
</div>

<div class="letsgo">
<button class="cancel">Cancel</button>
<button type="button" class="next">Next</button>
</div>
</form>
`;
    };

// Step 3: Account Access
    const renderStep3 = () => {
        disclaimerBox.innerHTML = `
<div class="step-header">
<div class="step">1</div>
<div class="step">2</div>
<div class="step active">3</div>
<div class="step">4</div>
<div class="step">5</div>
</div>

<h2>Account Access</h2>
<p>Select which accounts this user should have access to:</p>

<form class="access-form">
<div class="form-group">
<label><input type="checkbox" name="access" value="admin"> Administrator Access</label>
</div>
<div class="form-group">
<label><input type="checkbox" name="access" value="transactions"> Transaction Access</label>
</div>
<div class="form-group">
<label><input type="checkbox" name="access" value="reports"> Reports Access</label>
</div>

<div class="letsgo">
<button class="cancel">Cancel</button>
<button type="button" class="next">Next</button>
</div>
</form>
`;
    };

// Step 4: Confirmation
    const renderStep4 = () => {
        disclaimerBox.innerHTML = `
<div class="step-header">
<div class="step">1</div>
<div class="step">2</div>
<div class="step">3</div>
<div class="step active">4</div>
<div class="step">5</div>
</div>

<h2>Confirmation</h2>
<p>Please review the information below before submitting:</p>

<div class="confirmation-details">
<h3>User Details</h3>
<p>Name: <span id="confirm-name"></span></p>
<p>Email: <span id="confirm-email"></span></p>
<p>Role: <span id="confirm-role"></span></p>
<p>Access Levels: <span id="confirm-access"></span></p>
</div>

<div class="letsgo">
<button class="cancel">Cancel</button>
<button type="button" class="next" id="submitBtn">Submit</button>
</div>
`;

// In a real implementation, you would populate the confirmation details
// from the previously entered form data
        document.getElementById('submitBtn').addEventListener('click', function() {
            alert('User creation submitted successfully!');
// Here you would typically submit the form data to your backend
        });
    };
});