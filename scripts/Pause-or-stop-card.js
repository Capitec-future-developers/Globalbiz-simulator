document.addEventListener('DOMContentLoaded', function() {
    const pauseStopCardOption = document.querySelector('.card-table-options[data-action="pause-stop-card"]');

    if (pauseStopCardOption) {
        pauseStopCardOption.addEventListener('click', function() {
            const mainContent = document.getElementById('mainContent');

            mainContent.innerHTML = `
 <section class="heading">
 <div class="heading-content">
 <div class="heading-title">
 <h4>Card details</h4>
 </div>
 <div class="details">
 <span class="details-title">Cardholder name</span>
 <span class="details-name">MR O MOHLALA</span>
 <span class="details-title">Debit Card</span>
 <span class="details-name">4016**** ****3734</span>
 </div>
 </div>
 </section>

 <section class="what-to-do">
 <div class="heading2">
 <h4>What would you like to do?</h4>
 </div>
 <div class="what-to-do-content">
 <div class="pause"><img src="../images/stop-card-action.svg">Pause card<input type="radio" name="cardAction" style="position: absolute; right: 30px; accent-color: #00aeff;"> </div>
 <div class="stop"><img src="../images/stop-card-action.svg">Stop card<input type="radio" name="cardAction" style="position: absolute; right: 30px; accent-color: #00aeff;"> </div>
 </div>
 
 <!-- Pause Disclaimer section (initially hidden) -->
 <div id="pauseDisclaimer" style="display: none; background-color: #e6f4ff; padding: 15px; border-radius: 8px; margin-top: 15px;">
 <div style="display: flex; align-items: flex-start; gap: 10px;">
 <img src="../images/info-trans.svg" style="width: 20px; height: 20px;">
 <div>
 <p style="margin: 0; font-weight: bold;">Pausing card:</p>
 <p style="margin: 5px 0 0 0;">
 Pausing card will allow you to temporarily stop your card from being used for all NEW forms of transaction, including cash withdrawals.<br><br>
 All existing recurring transactions setup before the day you pause this card will still be processed.<br><br>
 You can reinstate your card at anytime.
 </p>
 </div>
 </div>
 </div>
 
 <!-- Stop Disclaimer section (initially hidden) -->
 <div id="stopDisclaimer" style="display: none; background-color: #e6f4ff; padding: 15px; border-radius: 8px; margin-top: 15px;">
 <div style="display: flex; align-items: flex-start; gap: 10px;">
 <img src="../images/info-trans.svg" style="width: 20px; height: 20px;">
 <div>
 <p style="margin: 0; font-weight: bold;">Stopping card:</p>
 <p style="margin: 5px 0 0 0;">
 Stopping your card will permanently disable it for all transactions.<br><br>
 You will need to order a new card if you stop this one.<br><br>
 Any recurring transactions will need to be updated with your new card details.
 </p>
 </div>
 </div>
 
 <!-- Reason for stopping card section -->
 <div id="stopReasonSection" style="margin-top: 15px;">
 <h4 style="margin-bottom: 10px;">Reason for stopping card</h4>
 <div style="display: flex; flex-direction: column; gap: 10px;">
 <div style="display: flex; align-items: center;">
 <input type="radio" name="stopReason" id="lost" value="lost" style="margin-right: 10px;">
 <label for="lost">Lost</label>
 </div>
 <div style="display: flex; align-items: center;">
 <input type="radio" name="stopReason" id="stolen" value="stolen" style="margin-right: 10px;">
 <label for="stolen">Stolen</label>
 </div>
 <div style="display: flex; align-items: center;">
 <input type="radio" name="stopReason" id="damaged" value="damaged" style="margin-right: 10px;">
 <label for="damaged">Damaged</label>
 </div>
 <div style="display: flex; align-items: center;">
 <input type="radio" name="stopReason" id="fraud" value="fraud" style="margin-right: 10px;">
 <label for="fraud">Suspected fraud</label>
 </div>
 </div>
 </div>
 </div>
 </section>

 <div class="btn">
 <button class="continue">Continue</button>
 <button class="cancel">Cancel</button>
 </div>
 `;

            // Update header
            const header = document.querySelector('.header');
            if (header) {
                header.textContent = 'Pause or Stop Card';
                header.style.right = '-80px';
                header.style.fontSize = '15px';
                header.style.top = '-40px';
            }

            // Add radio button change listeners
            const radioButtons = document.querySelectorAll('input[name="cardAction"]');
            radioButtons.forEach(radio => {
                radio.addEventListener('change', function() {
                    const pauseDisclaimer = document.getElementById('pauseDisclaimer');
                    const stopDisclaimer = document.getElementById('stopDisclaimer');

                    if (this.parentElement.classList.contains('pause') && this.checked) {
                        pauseDisclaimer.style.display = 'block';
                        stopDisclaimer.style.display = 'none';
                    } else if (this.parentElement.classList.contains('stop') && this.checked) {
                        pauseDisclaimer.style.display = 'none';
                        stopDisclaimer.style.display = 'block';
                    } else {
                        pauseDisclaimer.style.display = 'none';
                        stopDisclaimer.style.display = 'none';
                    }
                });
            });

            // Cancel button
            const cancelButton = document.querySelector('.cancel');
            if (cancelButton) {
                cancelButton.addEventListener('click', function() {
                    location.reload();
                });
            }

            // Continue button
            const continueButton = document.querySelector('.continue');
            if (continueButton) {
                continueButton.addEventListener('click', function() {
                    const selectedAction = document.querySelector('input[name="cardAction"]:checked');
                    if (selectedAction) {
                        const action = selectedAction.parentElement.textContent.trim();

                        if (action === 'Stop card') {
                            const selectedReason = document.querySelector('input[name="stopReason"]:checked');
                            if (!selectedReason) {
                                alert('Please select a reason for stopping your card');
                                return;
                            }
                            alert(`Card ${action} request submitted. Reason: ${selectedReason.value}`);
                        } else {
                            alert(`Card ${action} request submitted`);
                        }

                        location.reload();
                    } else {
                        alert('Please select an action (Pause or Stop)');
                    }
                });
            }
        });
    }
});