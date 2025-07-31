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
 <div class="pause" style="display: flex; justify-content: space-between; align-items: center; padding: 15px; border: 1px solid #ccc; border-radius: 8px; margin-bottom: 10px;">
 <div style="display: flex; align-items: center;">
 <img src="../images/stop-card-action.svg" style="margin-right: 10px;">
 <span>Pause card</span>
 </div>
 <input type="radio" name="cardAction" style="accent-color: #00aeff;">
 </div>
 <div class="stop" style="display: flex; justify-content: space-between; align-items: center; padding: 15px; border: 1px solid #ccc; border-radius: 8px;">
 <div style="display: flex; align-items: center;">
 <img src="../images/stop-card-action.svg" style="margin-right: 10px;">
 <span>Stop card</span>
 </div>
 <input type="radio" name="cardAction" style="accent-color: #00aeff;">
 </div>
 </div>
 
 <!-- Pause Disclaimer section (initially hidden) -->
 <div id="pauseDisclaimer" style="display: none; background-color: #e6f4ff; padding: 15px; border-radius: 8px; margin-top: 15px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
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
 
 
 <div id="stopDisclaimer" style="display: none; background-color: #e6f4ff; padding: 15px; border-radius: 8px; margin-top: 15px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
 <div style="display: flex; align-items: flex-start; gap: 10px;">
 <img src="../images/info-trans.svg" style="width: 20px; height: 20px;">
 <div>
 <p style="margin: 5px 0 0 0;">
 <b>Stopping your card:</b> You are about to permanently stop this card which will prevent it from being used completely including online purchases. You will have to replace this card after it it stopped <br><br>
 You will need to order a new card if you stop this one.<br><br>
 <b>You can order a replacement card at a later time</b>
 </p>
 </div>
 </div>
 </div>
 

 <div id="stopReasonSection" style="display: none; margin-top: 15px;">
 <h4 style="margin-bottom: 10px;">Reason for stopping card</h4>
 <div style="display: flex; flex-direction: column; gap: 10px;">
 <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; border: 1px solid #ccc; border-radius: 8px;">
 <label for="lost">Lost</label>
 <input type="radio" name="stopReason" id="lost" value="lost" style="accent-color: #00aeff;">
 </div>
 <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; border: 1px solid #ccc; border-radius: 8px;">
 <label for="stolen">Stolen</label>
 <input type="radio" name="stopReason" id="stolen" value="stolen" style="accent-color: #00aeff;">
 </div>
 <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; border: 1px solid #ccc; border-radius: 8px;">
 <label for="damaged">Damaged</label>
 <input type="radio" name="stopReason" id="damaged" value="damaged" style="accent-color: #00aeff;">
 </div>
 <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px; border: 1px solid #ccc; border-radius: 8px;">
 <label for="fraud">Suspected fraud</label>
 <input type="radio" name="stopReason" id="fraud" value="fraud" style="accent-color: #00aeff;">
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
                header.textContent = 'Pause or Stop Card';
                header.style.right = '-80px';
                header.style.fontSize = '15px';
                header.style.top = '-40px';
            }


            const radioButtons = document.querySelectorAll('input[name="cardAction"]');
            radioButtons.forEach(radio => {
                radio.addEventListener('change', function() {
                    const pauseDisclaimer = document.getElementById('pauseDisclaimer');
                    const stopDisclaimer = document.getElementById('stopDisclaimer');
                    const stopReasonSection = document.getElementById('stopReasonSection');

                    if (this.parentElement.classList.contains('pause') && this.checked) {
                        pauseDisclaimer.style.display = 'block';
                        stopDisclaimer.style.display = 'none';
                        stopReasonSection.style.display = 'none';
                    } else if (this.parentElement.classList.contains('stop') && this.checked) {
                        pauseDisclaimer.style.display = 'none';
                        stopDisclaimer.style.display = 'block';
                        stopReasonSection.style.display = 'block';
                    } else {
                        pauseDisclaimer.style.display = 'none';
                        stopDisclaimer.style.display = 'none';
                        stopReasonSection.style.display = 'none';
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