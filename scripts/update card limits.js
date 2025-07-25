document.addEventListener('DOMContentLoaded', function () {
    const updateCardLimitsOption = document.querySelector('.card-table-options[data-action="Update-card-limits"]');

    if (!updateCardLimitsOption) return;

    updateCardLimitsOption.addEventListener('click', function () {
        const mainContent = document.getElementById('mainContent');
        if (!mainContent) return;

        mainContent.innerHTML = `
            <section class="heading">
                <div class="heading-content">
                    <div class="heading-title">
                        <h4>Set Card Limits</h4>
                    </div>
                </div>
            </section>

            <section class="what-to-do">
                <!-- Withdrawal Limit -->
                <div class="limits-category">
                    <h5>Withdrawal Limit</h5>
                    <div class="limits-container">
                        <div class="limit-input">
                            <label>Per Transaction Limit</label>
                            <div class="input-container">
                                <span class="currency">R</span>
                                <input type="number" class="limit-value">
                            </div>
                            <small style="color: #ccc;">Max: R10 000</small>
                        </div>
                        <div class="limit-input">
                            <label>Daily Limit</label>
                            <div class="input-container">
                                <span class="currency">R</span>
                                <input type="number" class="limit-value">
                            </div>
                            <small style="color: #ccc;">Max: R10 000</small>
                        </div>
                        <div class="limit-input">
                            <label>Monthly Limit</label>
                            <div class="input-container">
                                <span class="currency">R</span>
                                <input type="number" class="limit-value">
                            </div>
                            <small style="color: #ccc;">Max: R50 000</small>
                        </div>
                    </div>
                </div>

                <!-- Online Card Limit -->
                <div class="limits-category" style="margin-top: 30px;">
                    <h5>Online Card Limit</h5>
                    <div class="limits-container">
                        <div class="limit-input">
                            <label>Per Transaction Limit</label>
                            <div class="input-container">
                                <span class="currency">R</span>
                                <input type="number" class="limit-value">
                            </div>
                            <small style="color: #ccc;">Max: R250 000</small>
                        </div>
                        <div class="limit-input">
                            <label>Daily Limit</label>
                            <div class="input-container">
                                <span class="currency">R</span>
                                <input type="number" class="limit-value">
                            </div>
                            <small style="color: #ccc;">Max: R250 000</small>
                        </div>
                        <div class="limit-input">
                            <label>Monthly Limit</label>
                            <div class="input-container">
                                <span class="currency">R</span>
                                <input type="number" class="limit-value">
                            </div>
                            <small style="color: #ccc;">Max: R250 000</small>
                        </div>
                    </div>
                </div>

                <!-- POS Limit -->
                <div class="limits-category" style="margin-top: 30px;">
                    <h5>POS Limit</h5>
                    <div class="limits-container">
                        <div class="limit-input">
                            <label>Per Transaction Limit</label>
                            <div class="input-container">
                                <span class="currency">R</span>
                                <input type="number" class="limit-value">
                            </div>
                            <small style="color: #ccc;">Max: R250 000</small>
                        </div>
                        <div class="limit-input">
                            <label>Daily Limit</label>
                            <div class="input-container">
                                <span class="currency">R</span>
                                <input type="number" class="limit-value">
                            </div>
                            <small style="color: #ccc;">Max: R250 000</small>
                        </div>
                        <div class="limit-input">
                            <label>Monthly Limit</label>
                            <div class="input-container">
                                <span class="currency">R</span>
                                <input type="number" class="limit-value">
                            </div>
                            <small style="color: #ccc;">Max: R250 000</small>
                        </div>
                    </div>
                </div>
            </section>

            <div class="btn" style="margin-top: 30px;">
                <button class="continue" style="padding: 12px; border: 1px solid #ccc; border-radius: 8px; background-color: #00aeff; color: white; width: 100%; margin-bottom: 10px;">Set Limits</button>
                <button class="cancel" style="padding: 12px; border: 1px solid #ccc; border-radius: 8px; background-color: white; color: #00aeff; width: 100%;">Cancel</button>
            </div>
        `;

        const setLimitsBtn = document.querySelector('.continue');
        if (setLimitsBtn) {
            setLimitsBtn.addEventListener('click', function () {
                alert('Virtual card created successfully with the specified limits!');
                location.reload();
            });
        }

        const cancelLimitsBtn = document.querySelector('.cancel');
        if (cancelLimitsBtn) {
            cancelLimitsBtn.addEventListener('click', function () {
                location.reload();
            });
        }
    });
});
