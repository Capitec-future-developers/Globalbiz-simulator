(() => {
    document.addEventListener('DOMContentLoaded', () => {
        const navigationStack = [];
        const mainContentArea = document.getElementById('mainContent');

        if (!mainContentArea) {
            console.warn('No element with id="mainContent" found. Transfer script will not initialize.');
            return;
        }

        const userAccounts = [
            { id: '1001', name: 'Cheque Account', number: '1052 2626 44', balance: 'R12,345.67' },
            { id: '1002', name: 'Savings Account', number: '1052 2626 45', balance: 'R45,678.90' },
            { id: '1003', name: 'Credit Card', number: '4512 **** **** 9012', balance: '-R5,432.10' }
        ];

        function toggleContentVisibility(show = true) {
            document.querySelectorAll('.favorites-container, .pending, .cash-flow').forEach(el => {
                el.style.display = show ? 'block' : 'none';
            });
        }

        function resetToMainView() {
            mainContentArea.innerHTML = `
                <div class="transfer-section" style="position: absolute; top: -600px;  left: 450px; border: 1px solid #cccccc; background-color: #ffffff; width: 1000px;;">
                    <div class="payment-header">
                        <button class="back-button" id="back-button">
                            <span class="material-icons-sharp">arrow_back</span> Back
                        </button>
                        <h2 class="transferheader">Transfer</h2>
                        <p>Move money between your accounts</p>
                    </div>

                    <div class="transfer-details-box">
                        <h3>Transfer Details</h3>
                        <form id="transfer-form">
                            <div class="form-group">
                                <label for="from-account">From Account</label>
                                <select id="from-account" required>
                                    <option value="">From account</option>
                                    ${userAccounts.map(acc => `
                                        <option value="${acc.id}" data-balance="${acc.balance}">
                                            ${acc.name} (${acc.number}) - ${acc.balance}
                                        </option>
                                    `).join('')}
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="to-account">To Account</label>
                                <select id="to-account" required>
                                    <option value="">To account</option>
                                    ${userAccounts.map(acc => `
                                        <option value="${acc.id}">
                                            ${acc.name} (${acc.number})
                                        </option>
                                    `).join('')}
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="transfer-amount">Amount (ZAR)</label>
                                <input type="number" id="transfer-amount" placeholder="0.00" min="1" required />
                                <div id="balance-info" class="balance-info"></div>
                            </div>

                            <div class="form-group">
                                <label for="transfer-reference">Reference</label>
                                <input type="text" id="transfer-reference" placeholder="Enter reference" required />
                            </div>

                            <h4>Transfer Type</h4>
                            <div class="transfer-type-options">
                                <label><input type="radio" name="transfer-type" value="once-off" required /> Once-Off</label>
                                <label><input type="radio" name="transfer-type" value="recurring" /> Recurring</label>
                                <label><input type="radio" name="transfer-type" value="future-dated" /> Future-Dated</label>
                            </div>

                            <div class="form-group">
                                <label for="transfer-date">Transfer Date</label>
                                <input type="date" id="transfer-date" required />
                            </div>

                            <button type="submit" class="submit-payment-btn">Transfer Funds</button>
                        </form>
                    </div>
                </div
            `;
            toggleContentVisibility(true);
            navigationStack.length = 0;
            navigationStack.push('main');
        }

        function navigateBack() {
            navigationStack.pop(); 
            const previous = navigationStack.pop();
            if (previous === 'transfer-section') {
                showTransferSection();
            } else {
                resetToMainView();
            }
        }

        function showTransferSection() {
            toggleContentVisibility(false);
            navigationStack.push('transfer-section');

            mainContentArea.innerHTML = `
                <div class="transfer-section">
                    <div class="payment-header">
                        <button class="back-button" id="back-button">
                            <span class="material-icons-sharp">arrow_back</span> Back
                        </button>
                        <h2 class="transferheader">Transfer</h2>
                        <p>Move money between your accounts</p>
                    </div>

                    <div class="transfer-details-box">
                        <h3>Transfer Details</h3>
                        <form id="transfer-form">
                            <div class="form-group">
                                <label for="from-account">From Account</label>
                                <select id="from-account" required>
                                    <option value="">From account</option>
                                    ${userAccounts.map(acc => `
                                        <option value="${acc.id}" data-balance="${acc.balance}">
                                            ${acc.name} (${acc.number}) - ${acc.balance}
                                        </option>
                                    `).join('')}
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="to-account">To Account</label>
                                <select id="to-account" required>
                                    <option value="">To account</option>
                                    ${userAccounts.map(acc => `
                                        <option value="${acc.id}">
                                            ${acc.name} (${acc.number})
                                        </option>
                                    `).join('')}
                                </select>
                            </div>

                            <div class="form-group">
                                <label for="transfer-amount">Amount (ZAR)</label>
                                <input type="number" id="transfer-amount" placeholder="0.00" min="1" required />
                                <div id="balance-info" class="balance-info"></div>
                            </div>

                            <div class="form-group">
                                <label for="transfer-reference">Reference</label>
                                <input type="text" id="transfer-reference" placeholder="Enter reference" required />
                            </div>

                            <h4>Transfer Type</h4>
                            <div class="transfer-type-options">
                                <label><input type="radio" name="transfer-type" value="once-off" required /> Once-Off</label>
                                <label><input type="radio" name="transfer-type" value="recurring" /> Recurring</label>
                                <label><input type="radio" name="transfer-type" value="future-dated" /> Future-Dated</label>
                            </div>

                            <div class="form-group">
                                <label for="transfer-date">Transfer Date</label>
                                <input type="date" id="transfer-date" required />
                            </div>

                            <button type="submit" class="submit-payment-btn">Transfer Funds</button>
                        </form>
                    </div>
                </div>
            `;

            document.getElementById('back-button').onclick = navigateBack;

            document.getElementById('from-account').onchange = function () {
                const selected = this.options[this.selectedIndex];
                const balance = selected.getAttribute('data-balance');
                document.getElementById('balance-info').textContent = balance ? `Available: ${balance}` : '';
            };

            document.getElementById('transfer-form').onsubmit = function (e) {
                e.preventDefault();
                processTransfer();
            };
        }

        function processTransfer() {
            const fromEl = document.getElementById('from-account');
            const toEl = document.getElementById('to-account');
            const fromId = fromEl.value;
            const toId = toEl.value;
            const amount = document.getElementById('transfer-amount').value;
            const reference = document.getElementById('transfer-reference').value;

            if (fromId === toId) {
                alert('You cannot transfer to the same account!');
                return;
            }

            mainContentArea.innerHTML = `
                <div class="payment-processing">
                    <div class="spinner">
                        <div class="double-bounce1"></div>
                        <div class="double-bounce2"></div>
                    </div>
                    <h2>Processing Transfer...</h2>
                    <p>Please wait while we process your transfer</p>
                </div>
            `;

            setTimeout(() => {
                showConfirmation(
                    fromEl.options[fromEl.selectedIndex].text,
                    toEl.options[toEl.selectedIndex].text,
                    amount,
                    reference
                );
            }, 2000);
        }

        function showConfirmation(from, to, amount, reference) {
            mainContentArea.innerHTML = `
                <div class="payment-confirmation">
                    <div class="confirmation-icon success">
                        <span class="material-icons-sharp">check_circle</span>
                    </div>
                    <h2>Transfer Successful!</h2>
                    <p>Your funds have been transferred successfully</p>

                    <div class="confirmation-details">
                        <div class="detail-row"><span>From Account:</span><span>${from.split(' - ')[0]}</span></div>
                        <div class="detail-row"><span>To Account:</span><span>${to}</span></div>
                        <div class="detail-row"><span>Amount:</span><span>R ${amount}</span></div>
                        <div class="detail-row"><span>Reference:</span><span>${reference}</span></div>
                        <div class="detail-row"><span>Date:</span><span>${new Date().toLocaleString()}</span></div>
                    </div>

                    <div class="confirmation-actions">
                        <button id="done-button" class="done-btn">Done</button>
                        <button id="receipt-button" class="secondary-btn">Download Receipt</button>
                    </div>
                </div>
            `;

            document.getElementById('done-button').onclick = resetToMainView;
            document.getElementById('receipt-button').onclick = () => {
                alert('Transfer receipt downloaded successfully!');
            };
        }

        
        const transferBtn = document.getElementById('Transfer');
        if (transferBtn) {
            transferBtn.addEventListener('click', (e) => {
                e.preventDefault();
                showTransferSection();
            });
        }

        
        resetToMainView();
    });
})();
