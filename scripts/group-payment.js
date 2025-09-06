import BeneficiaryDB from './beneficiaryDB.js';

document.getElementById('mainContent').innerHTML = `
<div class="content-header">
    <h1>Group and Multiple Payment</h1>
</div>
<div class="disclaimer-box" id="disclaimerBox">
    <div class="payment-header">
        <span>Beneficiary details</span>
    </div>
    <label class="group-payment-box acti" id="group-payment-box">
        <div class="circle-radio"></div>
        <div class="label-text">
            <span><b>Group of beneficiaries</b></span>
            <span>Pay a group of beneficiaries</span>
        </div>
    </label>
    <label class="mulitple-payment-box" id="mulitple-payment-box">
        <div class="circle-radio"></div>
        <div class="label-text">
            <span><b>Multiple beneficiaries</b></span>
            <span>Pay multiple beneficiaries</span>
        </div>
    </label>
    <div class="liner"></div>
    <div class="search-beneficiary" id="search-section">
        <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M21 20l-5.8-5.8a7 7 0 10-1.4 1.4L20 21l1-1zm-11 0a6 6 0 110-12 6 6 0 010 12z"/>
        </svg>
        <input type="text" placeholder="Search for a beneficiary" class="search-input" id="search-input">
    </div>
    <table class="beneficiary-table hidden" id="beneficiary-table">
        <thead>
            <tr>
                <th><input type="checkbox" id="select-all-checkbox"></th>
                <th>Beneficiary Name</th>
                <th>Account Number</th>
                <th>Reference</th>
                <th>Last Payment Date</th>
                <th>Last Paid Amount</th>
            </tr>
        </thead>
        <tbody id="beneficiary-tbody"></tbody>
    </table>
</div>
<div class="footer-actions">
    <button class="cancel">Cancel</button>
    <button class="next" id="nextBtn">Continue</button>
</div>
`;

const groupBox = document.getElementById('group-payment-box');
const multipleBox = document.getElementById('mulitple-payment-box');
const beneficiaryTable = document.getElementById('beneficiary-table');
const tbody = document.getElementById('beneficiary-tbody');
const searchInput = document.getElementById('search-input');
const nextBtn = document.getElementById('nextBtn');
const selectAllCheckbox = document.getElementById('select-all-checkbox');

let selectedBeneficiaries = [];

function selectBox(selected, other) {
    selected.classList.add('acti');
    other.classList.remove('acti');
}

async function populateTable(searchTerm = '') {
    try {
        const beneficiaries = searchTerm
            ? await BeneficiaryDB.searchBeneficiaries(searchTerm)
            : await BeneficiaryDB.getAllBeneficiaries();
        tbody.innerHTML = beneficiaries.map((b, index) => `
            <tr>
                <td><input type="checkbox" data-index="${index}" data-id="${b.id}"></td>
                <td>${b.nickname}</td>
                <td>${b.accountNumber}</td>
                <td>${b.reference}</td>
                <td>${b.lastPaymentDate || '-'}</td>
                <td>R ${b.lastPaidAmount.toFixed(2)}</td>
            </tr>
        `).join('');
        tbody.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', handleCheckboxChange);
        });
    } catch (error) {
        console.error("Error populating beneficiaries:", error);
    }
}

function handleCheckboxChange(e) {
    const checkbox = e.target;
    const beneficiaryId = checkbox.dataset.id;
    if (checkbox.checked) {
        if (!selectedBeneficiaries.some(b => b.id === beneficiaryId)) {
            const row = checkbox.closest('tr');
            selectedBeneficiaries.push({
                id: beneficiaryId,
                nickname: row.cells[1].textContent,
                accountNumber: row.cells[2].textContent,
                reference: row.cells[3].textContent
            });
        }
    } else {
        selectedBeneficiaries = selectedBeneficiaries.filter(b => b.id !== beneficiaryId);
    }
    updateSelectAllCheckbox();
}

function updateSelectAllCheckbox() {
    const checkboxes = tbody.querySelectorAll('input[type="checkbox"]');
    const allChecked = checkboxes.length > 0 && Array.from(checkboxes).every(cb => cb.checked);
    const someChecked = Array.from(checkboxes).some(cb => cb.checked);
    selectAllCheckbox.checked = allChecked;
    selectAllCheckbox.indeterminate = someChecked && !allChecked;
}

selectAllCheckbox.addEventListener('change', function () {
    tbody.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = this.checked;
        checkbox.dispatchEvent(new Event('change'));
    });
});

function navigateToPaymentDetails() {
    const paymentDetailsHTML = `
        <div class="content-header">
            <h1>Multiple Payment</h1>
        </div>
        <div class="payment-options-container">
            <div class="payment-option-left">
                <label class="payment-option-checkbox">
                    <input type="checkbox" id="pay-from-same-account">
                    <span>Pay all from the same account</span>
                </label>
            </div>
            <div class="payment-option-right">
                <label class="payment-option-checkbox">
                    <input type="checkbox" id="immediate-payment">
                    <span>Pay all as immediate payment</span>
                </label>
            </div>
        </div>
        <div class="payment-date-container">
            <label for="payment-date">Payment Date:</label>
            <input type="date" id="payment-date" class="date-input">
        </div>
        <div class="payment-details-container">
            <div class="selected-beneficiaries">
                <h2>Payment details</h2>
                <div class="beneficiaries-summary">
                    <button class="add-beneficiary-btn" id="add-beneficiary-btn">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                        Add Beneficiary
                    </button>
                    <div class="total-amount-display">
                        <span>Total:</span>
                        <span id="total-amount">R 0.00</span>
                    </div>
                </div>
                <table class="payment-beneficiaries-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Account</th>
                            <th>Payment Type</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody id="payment-beneficiaries-tbody">
                        ${selectedBeneficiaries.map(b => `
                            <tr data-id="${b.id}">
                                <td>${b.nickname}</td>
                                <td>${b.accountNumber}</td>
                                <td>
                                    <select class="payment-type-select">
                                        <option value="eft">EFT</option>
                                        <option value="cash">Cash</option>
                                        <option value="cheque">Cheque</option>
                                    </select>
                                </td>
                                <td><input type="number" class="payment-amount-input" placeholder="0.00" min="0" step="0.01"></td>
                                <td>
                                    <button class="remove-beneficiary-btn">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
        <div class="footer-actions">
            <button class="cancel" id="back-btn">Back</button>
            <button class="next" id="submit-payment">Submit Payment</button>
        </div>
    `;
    document.getElementById('mainContent').innerHTML = paymentDetailsHTML;
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('payment-date').value = today;
    document.getElementById('back-btn').addEventListener('click', () => location.reload());
    document.getElementById('add-beneficiary-btn').addEventListener('click', () => location.reload());

    const amountInputs = document.querySelectorAll('.payment-amount-input');
    amountInputs.forEach(input => input.addEventListener('input', calculateTotal));

    document.querySelectorAll('.remove-beneficiary-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const row = this.closest('tr');
            const id = row.dataset.id;
            selectedBeneficiaries = selectedBeneficiaries.filter(b => b.id !== id);
            row.remove();
            calculateTotal();
        });
    });

    function calculateTotal() {
        let total = 0;
        document.querySelectorAll('.payment-amount-input').forEach(input => total += parseFloat(input.value) || 0);
        document.getElementById('total-amount').textContent = `R ${total.toFixed(2)}`;
    }

    document.getElementById('submit-payment').addEventListener('click', () => {
        const paymentData = [];
        let isValid = true;
        document.querySelectorAll('#payment-beneficiaries-tbody tr').forEach(row => {
            const id = row.dataset.id;
            const amountInput = row.querySelector('.payment-amount-input');
            const typeSelect = row.querySelector('.payment-type-select');
            const amount = parseFloat(amountInput.value);
            const type = typeSelect.value;
            if (!amount || amount <= 0) {
                isValid = false;
                amountInput.style.border = '1px solid red';
            } else {
                amountInput.style.border = '';
            }
            if (isValid) {
                paymentData.push({
                    id,
                    amount,
                    type,
                    name: row.cells[0].textContent,
                    account: row.cells[1].textContent
                });
            }
        });
        if (!isValid) {
            alert("Please enter valid amounts for all beneficiaries.");
            return;
        }
        const payFromSameAccount = document.getElementById('pay-from-same-account').checked;
        const immediatePayment = document.getElementById('immediate-payment').checked;
        const paymentDate = document.getElementById('payment-date').value;
        console.log("Payment Data:", {
            payments: paymentData,
            options: { payFromSameAccount, immediatePayment, paymentDate },
            total: document.getElementById('total-amount').textContent
        });
        alert("Payment ready to be processed!");
    });
}

document.addEventListener('click', (e) => {
    if (e.target.id === 'nextBtn') {
        if (multipleBox.classList.contains('acti')) {
            if (!selectedBeneficiaries.length) {
                alert("Select at least one beneficiary to continue.");
                return;
            }
            navigateToPaymentDetails();
        } else {
            alert("Group payment logic here.");
        }
    }
    if (e.target.closest('#group-payment-box')) {
        selectBox(groupBox, multipleBox);
        beneficiaryTable.classList.add('hidden');
        selectedBeneficiaries = [];
    }
    if (e.target.closest('#mulitple-payment-box')) {
        selectBox(multipleBox, groupBox);
        beneficiaryTable.classList.remove('hidden');
        populateTable();
    }
});

searchInput.addEventListener('input', () => {
    if (multipleBox.classList.contains('acti')) populateTable(searchInput.value);
});

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const popup = document.getElementById('popup');
        if (popup) popup.style.display = 'none';
    }
});

document.getElementById('search-section').classList.remove('hidden');
