document.addEventListener('DOMContentLoaded', function() {
    const addCardBtn = document.getElementById('Add-Card');

    if (addCardBtn) {
        addCardBtn.addEventListener('click', function() {
            const disclaimerBox = document.querySelector('.disclaimer-box');

            if (disclaimerBox) {
                disclaimerBox.innerHTML = `
                    <div class="step-header">
                        <div class="step active" style="border-bottom: 3px solid blue;">1</div>
                        <div class="step" style="color: grey;">2</div>
                        <div class="step" style="color: grey;">3</div>
                        <div class="step" style="color: grey;">4</div>
                        <div class="step" style="color: grey;">5</div>
                    </div>

                    <h2>User Details</h2>

                    <p><strong>Note:</strong> The email address you give will become the username of the added user.</p>
                    <br>

                    <form class="user-form">
                        <div class="form-group">
                            <label>First Name</label>
                            <input type="text" placeholder="Enter first name">
                        </div>
                        <div class="form-group">
                            <label>Last Name</label>
                            <input type="text" placeholder="Enter last name">
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input type="email" placeholder="Enter email">
                        </div>
                        <div class="form-group">
                            <label>Cellphone Number</label>
                            <input type="tel" placeholder="Enter phone number">
                        </div>

                        <div class="form-group">
                            <label>Choose Identity Type</label>
                            <select>
                                <option value="">Select identity type</option>
                                <option value="rsa">RSA Identity</option>
                                <option value="passport">Passport</option>
                            </select>
                        </div>

                        <h3>Preferred Method of Communication</h3>
                        <div class="checkbox-group">
                            <label><input type="checkbox"> Email</label>
                            <label><input type="checkbox"> SMS</label>
                        </div>

                        <br>
                       
                    </form>
                `;
            }
        });
    }
});
