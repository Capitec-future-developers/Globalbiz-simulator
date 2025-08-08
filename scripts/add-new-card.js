document.addEventListener('DOMContentLoaded', function() {
    const addCardBtn = document.getElementById('Add-Card');

    if (addCardBtn) {
        addCardBtn.addEventListener('click', function() {
            const mainContent = document.getElementById('mainContent');

            mainContent.innerHTML = `
<section class="heading">
    <div class="heading-content">
        <div class="heading-title">
            <h4>Add New Card</h4>
        </div>
        <div class="details">
            <span class="details-title">Account</span>
            <span class="details-name">Kodi Code 1052 2626 43</span>
        </div>
    </div>
</section>

<section class="what-to-do">
    <div class="heading2">
        <h4>Select card type</h4>
    </div>
    <div class="what-to-do-content">
        <div class="card-option" style="display: flex; justify-content: space-between; align-items: center; padding: 15px; border: 1px solid #ccc; border-radius: 8px; margin-bottom: 10px;">
            <div style="display: flex; align-items: center;">
                <img src="../images/card.png" style="width: 40px; margin-right: 10px;">
                <span>New Debit Card</span>
            </div>
            <input type="radio" name="cardType" value="debit" checked style="accent-color: #00aeff;">
        </div>
        <div class="card-option" style="display: flex; justify-content: space-between; align-items: center; padding: 15px; border: 1px solid #ccc; border-radius: 8px;">
            <div style="display: flex; align-items: center;">
                <img src="../images/virtuale.png" style="width: 40px; margin-right: 10px;">
                <span>New Virtual Card</span>
            </div>
            <input type="radio" name="cardType" value="virtual" style="accent-color: #00aeff;">
        </div>
    </div>

    <div id="virtualCardOptions" style="display: none; margin-top: 20px;">
        <div style="margin-bottom: 15px;">
            <label style="display: block; margin-bottom: 5px; font-weight: 500;">Preferred name on card</label>
            <input type="text" placeholder="Enter preferred name" style="width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 8px;">
        </div>
        <div>
            <label style="display: block; margin-bottom: 10px; font-weight: 500;">Card holder name</label>
            <div style="display: flex; flex-direction: column; gap: 10px;">
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; border: 1px solid #ccc; border-radius: 8px;">
                    <span>MR O Mohlala</span>
                    <input type="radio" name="cardHolder" value="MR O Mohlala" style="accent-color: #00aeff;">
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; border: 1px solid #ccc; border-radius: 8px;">
                    <span>MR Omphile M</span>
                    <input type="radio" name="cardHolder" value="MR Omphile M" style="accent-color: #00aeff;">
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; border: 1px solid #ccc; border-radius: 8px;">
                    <span>MR Omphile Mohlala</span>
                    <input type="radio" name="cardHolder" value="MR Omphile Mohlala" style="accent-color: #00aeff;">
                </div>
            </div>
        </div>
    </div>

    <div id="debitCardOptions" style="margin-top: 20px;">
        <div style="display: flex; align-items: center; padding: 15px; background-color: #e6f4ff; border-radius: 8px;">
            <img src="../images/info-trans.svg" style="width: 20px; margin-right: 10px;">
            <div>
                <p style="margin: 0; font-weight: bold;">Debit Card:</p>
                <p style="margin: 5px 0 0 0;">
                    Your new debit card will be delivered to your registered address within 5-7 business days.
                </p>
            </div>
        </div>
    </div>
</section>

<div class="btn">
    <button class="continue" style="padding: 12px; border: 1px solid #ccc; border-radius: 8px; background-color: #00aeff; color: white; width: 100%; margin-bottom: 10px;">Continue</button>
    <button class="cancel" style="padding: 12px; border: 1px solid #ccc; border-radius: 8px; background-color: white; color: #00aeff; width: 100%;">Cancel</button>
</div>
`;

            const header = document.querySelector('.header');
            if (header) {
                header.textContent = 'Add New Card';
                header.style.right = '-80px';
                header.style.fontSize = '15px';
                header.style.top = '-40px';
            }

            const cardTypeRadios = document.querySelectorAll('input[name="cardType"]');
            cardTypeRadios.forEach(radio => {
                radio.addEventListener('change', function() {
                    const virtualOptions = document.getElementById('virtualCardOptions');
                    const debitOptions = document.getElementById('debitCardOptions');

                    if (this.value === 'virtual') {
                        virtualOptions.style.display = 'block';
                        debitOptions.style.display = 'none';
                    } else {
                        virtualOptions.style.display = 'none';
                        debitOptions.style.display = 'block';
                    }
                });
            });

            const cancelButton = document.querySelector('.cancel');
            if (cancelButton) {
                cancelButton.addEventListener('click', function() {
                    location.reload();
                });
            }

            const continueButton = document.querySelector('.continue');
            if (continueButton) {
                continueButton.addEventListener('click', function() {
                    const selectedCardType = document.querySelector('input[name="cardType"]:checked').value;

                    if (selectedCardType === 'virtual') {
                        const nameInput = document.querySelector('#virtualCardOptions input[type="text"]');
                        const selectedHolder = document.querySelector('input[name="cardHolder"]:checked');

                        if (!nameInput.value.trim()) {
                            alert('Please enter a preferred name for the card');
                            return;
                        }

                        if (!selectedHolder) {
                            alert('Please select a card holder');
                            return;
                        }

                        showLimitsPage();
                    } else {
                        alert('Your new debit card will be processed and delivered to your registered address');
                        location.reload();
                    }
                });
            }

            function showLimitsPage() {
                mainContent.innerHTML = `
<section class="heading">
    <div class="heading-content">
        <div class="heading-title">
            <h4>Set Card Limits</h4>
        </div>
    </div>
</section>

<section class="what-to-do">
    <div class="limits-container">
        <div class="limit-input">
            <label>Per Transaction Limit</label>
            <div class="input-container">
                <span class="currency">R</span>
                <input type="number" value="250000" class="limit-value">
            </div>
        </div>
        <div class="limit-input">
            <label>Daily Limit</label>
            <div class="input-container">
                <span class="currency">R</span>
                <input type="number" value="250000" class="limit-value">
            </div>
        </div>
        <div class="limit-input">
            <label>Monthly Limit</label>
            <div class="input-container">
                <span class="currency">R</span>
                <input type="number" value="250000" class="limit-value">
            </div>
        </div>
    </div>
</section>

<div class="btn">
    <button class="continue" style="padding: 12px; border: 1px solid #ccc; border-radius: 8px; background-color: #00aeff; color: white; width: 100%; margin-bottom: 10px;">Set Limits</button>
    <button class="cancel" style="padding: 12px; border: 1px solid #ccc; border-radius: 8px; background-color: white; color: #00aeff; width: 100%;">Cancel</button>
</div>
`;

                const setLimitsBtn = document.querySelector('.continue');
                if (setLimitsBtn) {
                    setLimitsBtn.addEventListener('click', function() {
                        alert('Virtual card created successfully with the specified limits!');
                        location.reload();
                    });
                }

                const cancelLimitsBtn = document.querySelector('.cancel');
                if (cancelLimitsBtn) {
                    cancelLimitsBtn.addEventListener('click', function() {
                        location.reload();
                    });
                }
            }
        });
    }
});
