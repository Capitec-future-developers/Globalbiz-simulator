document.addEventListener('DOMContentLoaded', function () {
    const addUserBtn = document.getElementById('next');
    const disclaimerBox = document.querySelector('.disclaimer-box');

    if (!addUserBtn || !disclaimerBox) return;

    // STEP TRACKER
    let currentStep = 1;

    // Render Step 1 (User Details)
    const renderStep1 = () => {
        disclaimerBox.innerHTML = `
            <div class="step-header">
                <div class="step active" style="border-bottom: 3px solid blue;">1</div>
                <div class="step" style="color: grey;">2</div>
                <div class="step" style="color: grey;">3</div>
                <div class="step" style="color: grey;">4</div>
                <div class="step" style="color: grey;">5</div>
            </div>

            <h2>User Details</h2>
            <p><strong>Note:</strong> The email address you give will become the username of the added user.</p><br>

            <form class="user-form">
                <div class="form-row">
                    <div class="form-group">
                        <label>First Name</label>
                        <input type="text" placeholder="Enter first name">
                    </div>
                    <div class="form-group">
                        <label>Last Name</label>
                        <input type="text" placeholder="Enter last name">
                    </div>
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" placeholder="Enter email">
                    </div>
                    <div class="form-group">
                        <label>Cellphone Number</label>
                        <input type="tel" placeholder="Enter phone number">
                    </div>
                </div>
                <div class="form-group">
                    <label>Choose Identity Type</label>
                    <select id="identityTypeSelect">
                        <option value="">Select identity type</option>
                        <option value="rsa">RSA Identity</option>
                        <option value="passport">Passport</option>
                    </select>
                </div>
                <div class="form-group" id="identityInputWrapper" style="display: none;"></div>

                <h3>Preferred Method of Communication</h3>
                <div class="checkbox-group">
                    <label><input type="checkbox"> Email</label>
                    <label><input type="checkbox"> SMS</label>
                </div>

                <div class="letsgo">
                    <button class="cancel">Cancel</button>
                    <button type="button" class="next" id="next">Next</button>
                </div>
            </form>
        `;

        const identitySelect = document.getElementById('identityTypeSelect');
        const inputWrapper = document.getElementById('identityInputWrapper');

        identitySelect.addEventListener('change', function () {
            const selected = this.value;
            inputWrapper.style.display = 'block';

            if (selected === 'rsa') {
                inputWrapper.innerHTML = `<label>RSA ID Number</label><input type="text" maxlength="13" placeholder="Enter 13-digit RSA ID">`;
            } else if (selected === 'passport') {
                inputWrapper.innerHTML = `<label>Passport Number</label><input type="text" placeholder="Enter passport number">`;
            } else {
                inputWrapper.style.display = 'none';
                inputWrapper.innerHTML = '';
            }
        });

        document.getElementById('next').addEventListener('click', renderStep2);
    };

    // Step 2: Select Role
    const renderStep2 = () => {
        disclaimerBox.innerHTML = `
            <div class="step-header">
                <div class="step" style="color: green;">1</div>
                <div class="step active" style="border-bottom: 3px solid blue;">2</div>
                <div class="step" style="color: grey;">3</div>
                <div class="step" style="color: grey;">4</div>
                <div class="step" style="color: grey;">5</div>
            </div>

            <h2>Select User Role</h2>
            <p>Please choose the role to assign to this user:</p>

            <form class="role-form">
                <div class="form-group"><label><input type="radio" name="role" value="authoriser"> Authoriser</label></div>
                <div class="form-group"><label><input type="radio" name="role" value="capturer"> Capturer</label></div>
                <div class="form-group"><label><input type="radio" name="role" value="viewer"> Viewer</label></div>
            </form>

            <div class="letsgo">
                <button class="cancel">Cancel</button>
                <button type="button" class="next" id="next">Next</button>
            </div>
        `;

        document.getElementById('nextBtn').addEventListener('click', renderStep3);
    };

    // Step 3: Account Access
    const renderStep3 = () => {
        disclaimerBox.innerHTML = `
            <div class="step-header">
                <div class="step" style="color: green;">1</div>
                <div class="step" style="color: green;">2</div>
                <div class="step active" style="border-bottom: 3px solid blue;">3</div>
                <div class="step" style="color: grey;">4</div>
                <div class="step" style="color: grey;">5</div>
            </div>

            <h2>Accounts</h2>
            <p>The user will be able to perform day-to-day banking tasks on the accounts they have access to.</p>

            <form class="role-form">
                <div class="form-group"><label><input type="checkbox"> Admin</label></div>
                <div class="form-group"><label><input type="checkbox"> Manager</label></div>
                <div class="form-group"><label><input type="checkbox"> Viewer</label></div>
            </form>

            <div class="letsgo">
                <button class="cancel">Cancel</button>
                <button type="button" class="next" id="next">Next</button>
            </div>
        `;

        // Bind next step here if needed
        // document.getElementById('nextBtn').addEventListener('click', renderStep4);
    };

    // Initialize Step 1
    addUserBtn.addEventListener('click', renderStep1);
});
