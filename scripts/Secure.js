document.addEventListener('DOMContentLoaded', function () {
    const createMessageBtn = document.getElementById('createMessageBtn');

    createMessageBtn.addEventListener('click', function () {
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'createMessage-modal';

        const modal = document.createElement('div');
        modal.className = 'modal';

        modal.innerHTML = `
            <div class="modal-content">
                <h2>Create New Message</h2>
                <form>
                    <div class="form-group">
                        <select required>
                            <option disabled selected>Select Account</option>
                            <option>Kodi Code - 1052 2626 43 - R1000.00</option>
                        </select>
                        <select required>
                            <option disabled selected>What do you need help with</option>
                            <option>Beneficiary payment</option>
                            <option>Credit Card Enquiries</option>
                            <option>Debit Card Enquiries</option>
                            <option>Device Registration</option>
                            <option>Estate Late Account Close</option>
                            <option>Limit increase/Decrease</option>
                            <option>One Time Password/USSD</option>
                            <option>Recall - Counterman Message</option>
                            <option>Request for list of Beneficiaries</option>
                            <option>Statement Request</option>
                            <option>Stop/Dispute Debit Order</option>
                            <option>TPMM_Account Close</option>
                            <option>TPMM-Account Guarantee Request</option>
                            <option>TPMM-Account Open</option>
                            <option>TPMM-Account Payout Request</option>
                        </select>
                        <input type="text" id="Message" name="Message" required placeholder="Type your message...">
                    </div>
                    <div class="form-group button">
                        <div class="btn btn-cancel">Cancel</div>
                        <div class="btn btn-send">Send</div>
                    </div>
                </form>
            </div>
        `;

        modalOverlay.appendChild(modal);
        document.body.appendChild(modalOverlay);

        modal.querySelector('.btn-cancel').addEventListener('click', () => {
            document.body.removeChild(modalOverlay);
        });

        modalOverlay.addEventListener('click', function (e) {
            if (e.target === modalOverlay) {
                document.body.removeChild(modalOverlay);
            }
        });
    });
});
