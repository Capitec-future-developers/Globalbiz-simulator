document.addEventListener('DOMContentLoaded', function () {
    const disclaimerBox = document.querySelector('.disclaimer-box');
    const nextBtn = document.getElementById('nextBtn');
    const cancelBtn = document.querySelector('.cancel');

    if (!disclaimerBox || !nextBtn) return;

// Store form data as we progress through steps
    const formData = {
        userDetails: {},
        role: '',
        access: []
    };

// Initial disclaimer content
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

// Handle the initial next button click
    nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        renderStep1();
    });

// Event delegation for all next buttons inside the disclaimer box
    disclaimerBox.addEventListener('click', function(e) {
        const nextButton = e.target.closest('.next');
        if (nextButton) {
            e.preventDefault();
            const currentActive = disclaimerBox.querySelector('.step.active');
            const currentStep = currentActive ? parseInt(currentActive.textContent) : 0;

            if (currentStep === 1 && validateStep1()) {
                saveStep1Data();
                renderStep2();
            } else if (currentStep === 2 && validateStep2()) {
                saveStep2Data();
                renderStep3();
            } else if (currentStep === 3 && validateStep3()) {
                saveStep3Data();
                renderStep4();
            }
        }
    });

// Cancel button handler
    if (cancelBtn) {
        cancelBtn.addEventListener('click', function(e) {
            e.preventDefault();
            disclaimerBox.innerHTML = initialDisclaimerContent;
            document.querySelector('.letsgo').style.display = 'flex';
        });
    }

// Save form data functions
    function saveStep1Data() {
        const form = disclaimerBox.querySelector('.user-form');
        formData.userDetails = {
            firstName: form.querySelector('input[type="text"]:nth-of-type(1)').value,
            lastName: form.querySelector('input[type="text"]:nth-of-type(2)').value,
            email: form.querySelector('input[type="email"]').value,
            phone: form.querySelector('input[type="tel"]').value,
            identityType: form.querySelector('#identityTypeSelect').value,
            identityNumber: form.querySelector('#identityInputWrapper input')?.value || '',
            communication: Array.from(form.querySelectorAll('input[name="communication"]:checked')).map(el => el.value)
        };
    }

    function saveStep2Data() {
        const selectedRole = disclaimerBox.querySelector('input[name="role"]:checked');
        formData.role = selectedRole.value;
    }

    function saveStep3Data() {
        formData.access = Array.from(disclaimerBox.querySelectorAll('input[name="access"]:checked')).map(el => el.value);
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

<div class="user-form">
<div class="form-row">
<div class="form-group">
<label>First Name</label>
<input type="text" placeholder="Enter first name" required value="${formData.userDetails.firstName || ''}">
</div>
<div class="form-group">
<label>Last Name</label>
<input type="text" placeholder="Enter last name" required value="${formData.userDetails.lastName || ''}">
</div>
</div>
<div class="form-row">
<div class="form-group">
<label>Email</label>
<input type="email" placeholder="Enter email" required value="${formData.userDetails.email || ''}">
</div>
<div class="form-group">
<label>Cellphone Number</label>
<input type="tel" placeholder="Enter phone number" required value="${formData.userDetails.phone || ''}">
</div>
</div>
<div class="form-group">
<label>Choose Identity Type</label>
<select id="identityTypeSelect" required>
<option value="">Select identity type</option>
<option value="rsa" ${formData.userDetails.identityType === 'rsa' ? 'selected' : ''}>RSA Identity</option>
<option value="passport" ${formData.userDetails.identityType === 'passport' ? 'selected' : ''}>Passport</option>
</select>
</div>
<div class="form-group" id="identityInputWrapper" style="display: ${formData.userDetails.identityType ? 'block' : 'none'};">
${formData.userDetails.identityType === 'rsa' ?
            `<label>RSA ID Number</label>
<input type="text" maxlength="13" placeholder="Enter 13-digit RSA ID" required value="${formData.userDetails.identityNumber || ''}">` :
            formData.userDetails.identityType === 'passport' ?
                `<label>Passport Number</label>
<input type="text" placeholder="Enter passport number" required value="${formData.userDetails.identityNumber || ''}">` :
                ''}
</div>

<h3>Preferred Method of Communication</h3>
<div class="checkbox-group">
<label><input type="checkbox" name="communication" value="email" ${formData.userDetails.communication?.includes('email') ? 'checked' : ''}> Email</label>
<label><input type="checkbox" name="communication" value="sms" ${formData.userDetails.communication?.includes('sms') ? 'checked' : ''}> SMS</label>
</div>

<div class="letsgo">
<button class="cancel">Cancel</button>
<button type="button" class="next">Next</button>
</div>
</div>
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

<div class="role-form">
<div class="form-group">
<label><input type="radio" name="role" value="authoriser" required ${formData.role === 'authoriser' ? 'checked' : ''}> Authoriser</label>
</div>
<div class="form-group">
<label><input type="radio" name="role" value="capturer" ${formData.role === 'capturer' ? 'checked' : ''}> Capturer</label>
</div>
<div class="form-group">
<label><input type="radio" name="role" value="viewer" ${formData.role === 'viewer' ? 'checked' : ''}> Viewer</label>
</div>

<div class="letsgo">
<button class="cancel">Cancel</button>
<button type="button" class="next">Next</button>
</div>
</div>
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

<div class="access-form">
<div class="form-group">
<label><input type="checkbox" name="access" value="admin" ${formData.access.includes('admin') ? 'checked' : ''}> Administrator Access</label>
</div>
<div class="form-group">
<label><input type="checkbox" name="access" value="transactions" ${formData.access.includes('transactions') ? 'checked' : ''}> Transaction Access</label>
</div>
<div class="form-group">
<label><input type="checkbox" name="access" value="reports" ${formData.access.includes('reports') ? 'checked' : ''}> Reports Access</label>
</div>

<div class="letsgo">
<button class="cancel">Cancel</button>
<button type="button" class="next">Next</button>
</div>
</div>
`;
    };

// Step 4: Confirmation
    const renderStep4 = () => {
// Format access levels for display
        const accessDisplay = formData.access.length > 0
            ? formData.access.join(', ')
            : 'No access levels selected';

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
<p>Name: ${formData.userDetails.firstName} ${formData.userDetails.lastName}</p>
<p>Email: ${formData.userDetails.email}</p>
<p>Phone: ${formData.userDetails.phone}</p>
<p>Identity: ${formData.userDetails.identityType} ${formData.userDetails.identityNumber}</p>
<p>Communication: ${formData.userDetails.communication?.join(', ') || 'None selected'}</p>

<h3>Role</h3>
<p>${formData.role}</p>

<h3>Access Levels</h3>
<p>${accessDisplay}</p>
</div>

<div class="letsgo">
<button class="cancel">Cancel</button>
<button type="button" class="next" id="submitBtn">Submit</button>
</div>
`;

        document.getElementById('submitBtn').addEventListener('click', function(e) {
            e.preventDefault();
            alert('User creation submitted successfully!');
            console.log('Form data submitted:', formData);
// Here you would typically submit the form data to your backend
        });
    };
});