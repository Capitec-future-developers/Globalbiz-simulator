document.addEventListener('DOMContentLoaded', function () {
    const addBeneficiaryBtn = document.getElementById('addBeneficiaryBtn');

    if (addBeneficiaryBtn) {
        addBeneficiaryBtn.addEventListener('click', function () {
            const mainContent = document.getElementById('mainContent');

            mainContent.innerHTML = `
                <section class="heading">
                    <div class="heading-content">
                        <div class="heading-title">
                            <h4>Add Beneficiary</h4>
                        </div>
                        <div class="details">
                            <span class="details-title">Beneficiary Name</span>
                            <span class="details-name">MR O MOHLALA</span>
                            <span class="details-title">Beneficiary Account</span>
                            <span class="details-name">1234567890</span>
                        </div>
                        <button id="cancelBtn" class="ben" style="margin-top: 20px;">Cancel</button>
                    </div>
                </section>
            `;

            const cancelButton = document.getElementById('cancelBtn');
            if (cancelButton) {
                cancelButton.addEventListener('click', function () {
                    location.reload();
                });
            }
        });
    }
});
