import BeneficiaryDB from './beneficiaryDB.js';

/* -----------------------------
   DOM Setup
----------------------------- */
document.getElementById('mainContent').innerHTML = `
<div class="content-header">
    <h1>Group and Multiple Payment</h1>
</div>
<div class="disclaimer-box" id="disclaimerBox">
    <div class="payment-header">
        <span>Beneficiary details</span>
    </div>

    <!-- Payment type selection -->
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

    <!-- Search section -->
    <div class="search-beneficiary" id="search-section">
        <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M21 20l-5.8-5.8a7 7 0 10-1.4 1.4L20 21l1-1zm-11 0a6 6 0 110-12 6 6 0 010 12z"/>
        </svg>
        <input type="text" placeholder="Search for a beneficiary" class="search-input" id="search-input">
    </div>

    <!-- Beneficiary table -->
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

<!-- Footer actions -->
<div class="footer-actions">
    <button class="cancel">Cancel</button>
    <button class="next" id="nextBtn">Continue</button>
</div>
`;

/* -----------------------------
   DOM References
----------------------------- */
const groupBox = document.getElementById('group-payment-box');
const multipleBox = document.getElementById('mulitple-payment-box');
const beneficiaryTable = document.getElementById('beneficiary-table');
const tbody = document.getElementById('beneficiary-tbody');
const searchInput = document.getElementById('search-input');
const nextBtn = document.getElementById('nextBtn');
const selectAllCheckbox = document.getElementById('select-all-checkbox');

/* -----------------------------
   State
----------------------------- */
let selectedBeneficiaries = [];

/* -----------------------------
   Helper Functions
----------------------------- */

// Toggle selection boxes like radio buttons
function selectBox(selected, other) {
    selected.classList.add('acti');
    other.classList.remove('acti');
}

// Populate table with beneficiaries
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

        // Attach change events to checkboxes
        tbody.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', handleCheckboxChange);
        });
    } catch (error) {
        console.error("Error populating beneficiaries:", error);
    }
}

// Handle individual checkbox changes
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

// Update "select all" checkbox state
function updateSelectAllCheckbox() {
    const checkboxes = tbody.querySelectorAll('input[type="checkbox"]');
    const allChecked = checkboxes.length > 0 && Array.from(checkboxes).every(cb => cb.checked);
    const someChecked = Array.from(checkboxes).some(cb => cb.checked);

    selectAllCheckbox.checked = allChecked;
    selectAllCheckbox.indeterminate = someChecked && !allChecked;
}

// Handle "select all" checkbox
selectAllCheckbox.addEventListener('change', function () {
    tbody.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = this.checked;
        checkbox.dispatchEvent(new Event('change'));
    });
});

// Navigate to payment details page
function navigateToPaymentDetails() {
    const paymentDetailsHTML = `
        <div class="content-header">
            <h1>Mulitple Payment</h1>
        </div>
        <div class="payment-details-container">
            <div class="selected-beneficiaries">
                <h2>Payment details</h2>
                <div class="beneficiaries-list">
                    ${selectedBeneficiaries.map(b => `
                        <div class="beneficiary-item">
                            <div class="beneficiary-info">
                                <h3>${b.nickname}</h3>
                                <p>Account: ${b.accountNumber}</p>
                                <p>Reference: ${b.reference}</p>
                            </div>
                            <div class="payment-amount">
                                <input type="number" placeholder="0.00" class="amount-input" data-id="${b.id}" min="0">
                                <select class="payment-method" data-id="${b.id}">
                                    <option value="">Select Method</option>
                                    <option value="eft">EFT</option>
                                    <option value="cash">Cash</option>
                                    <option value="cheque">Cheque</option>
                                </select>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="payment-summary">
                <h2>Payment Summary</h2>
                <div class="summary-details">
                    <p>Total Amount: <span id="total-amount">R 0.00</span></p>
                    <button id="confirm-payment" class="confirm-btn">Confirm Payment</button>
                </div>
            </div>
        </div>
        <div class="footer-actions">
            <button class="cancel" id="back-btn">Back</button>
            <button class="next" id="submit-payment">Submit Payment</button>
        </div>
    `;

    document.getElementById('mainContent').innerHTML = paymentDetailsHTML;

    // Back button
    document.getElementById('back-btn').addEventListener('click', () => location.reload());

    // Amount calculation
    const amountInputs = document.querySelectorAll('.amount-input');
    amountInputs.forEach(input => input.addEventListener('input', calculateTotal));

    function calculateTotal() {
        let total = 0;
        amountInputs.forEach(input => total += parseFloat(input.value) || 0);
        document.getElementById('total-amount').textContent = `R ${total.toFixed(2)}`;
    }

    // Confirm payment validation
    document.getElementById('confirm-payment').addEventListener('click', () => {
        const paymentData = [];
        document.querySelectorAll('.beneficiary-item').forEach(item => {
            const id = item.querySelector('.amount-input').dataset.id;
            const amount = parseFloat(item.querySelector('.amount-input').value);
            const method = item.querySelector('.payment-method').value;

            if (!amount || amount <= 0) alert("Enter valid amount");
            if (!method) alert("Select payment method");

            paymentData.push({ id, amount, method });
        });
        console.log("Payment Data:", paymentData);
        alert("Payment ready to submit!");
    });
}

/* -----------------------------
   Event Listeners
----------------------------- */

// Continue button & selection toggles
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

// Search filter
searchInput.addEventListener('input', () => {
    if (multipleBox.classList.contains('acti')) {
        populateTable(searchInput.value);
    }
});

// Escape closes popup
window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const popup = document.getElementById('popup');
        if (popup) popup.style.display = 'none';
    }
});

/* -----------------------------
   Initialization
----------------------------- */
document.getElementById('search-section').classList
