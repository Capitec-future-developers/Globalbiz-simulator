// Tab content data
const content = [
    // Transactions tab
    [
        `<table class="transaction-table">
            <thead>
            <tr>
                <th>Date</th>
                <th>Transaction Type</th>
                <th>Reference</th>
                <th>Amount</th>
                <th>Fees</th>
                <th>Balance</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>30 April 2025</td>
                <td>Debit</td>
                <td>Month S/Fee</td>
                <td class="positive">R0.00</td>
                <td class="negative">- R50.00</td>
                <td class="negative">- R154.21</td>
            </tr>
            <tr>
                <td>30 April 2025</td>
                <td>Debit</td>
                <td>Debit Interest - System Generated</td>
                <td class="negative">- R1.86</td>
                <td>R0.00</td>
                <td class="negative">- R104.21</td>
            </tr>
            </tbody>
        </table>`
    ],
    // Payment history tab
    [
        "Payment 1: R500.00 to John Doe",
        "Payment 2: R1,200.00 to ABC Suppliers",
        "Payment 3: R350.00 to Utility Company"
    ],
    // Stamped statements tab
    [
        "Statement for April 2025",
        "Statement for March 2025",
        "Statement for February 2025"
    ],
    // Account information tab
    [
        "Account opened: 15 January 2023",
        "Account status: Active",
        "Overdraft limit: R10,000.00",
        "Linked accounts: Savings (1052 2626 44)"
    ]
];

// Get all tab buttons and content container
const btnTransactions = document.getElementById("btn-transactions");
const btnPaymentHistory = document.getElementById("btn-payment-history");
const btnStampedStatements = document.getElementById("btn-stamped-statements");
const btnAccountInformation = document.getElementById("btn-acccount-information"); // Note the 3 'c's
const tabContent = document.getElementById("tab-content");

// Verify all elements exist
if (!btnTransactions || !btnPaymentHistory || !btnStampedStatements || !btnAccountInformation || !tabContent) {
    console.error("One or more required elements not found");
}

// Function to display content in the tab
function displayContent(items) {
    if (!tabContent) return;

    tabContent.innerHTML = "";

    if (items.length === 1 && items[0].startsWith('<table')) {
        tabContent.innerHTML = items[0];
    } else {
        const list = document.createElement("ul");
        list.className = "content-list";

        items.forEach(item => {
            const listItem = document.createElement("li");
            listItem.textContent = item;
            list.appendChild(listItem);
        });

        tabContent.appendChild(list);
    }
}

// Function to highlight the active button
function highlightButton(btn) {
    const allButtons = document.querySelectorAll('.tabs button');
    allButtons.forEach(button => {
        button.classList.remove('active');
        const tab = button.querySelector('.tab');
        if (tab) tab.classList.remove('active');
    });

    if (btn) {
        btn.classList.add('active');
        const tab = btn.querySelector('.tab');
        if (tab) tab.classList.add('active');
    }
}

// Function to handle button clicks
function handleClick(event) {
    const button = event.target.closest('button');
    if (!button) return;

    // Add click animation
    button.style.transform = 'translateY(2px)';
    setTimeout(() => {
        button.style.transform = '';
    }, 100);

    highlightButton(button);

    // Load appropriate content
    switch(button.id) {
        case "btn-transactions":
            displayContent(content[0]);
            break;
        case "btn-payment-history":
            displayContent(content[1]);
            break;
        case "btn-stamped-statements":
            displayContent(content[2]);
            break;
        case "btn-acccount-information": // Note the 3 'c's
            displayContent(content[3]);
            break;
        default:
            console.warn("Unknown button clicked:", button.id);
    }
}

// Add event listeners to all tab buttons
[btnTransactions, btnPaymentHistory, btnStampedStatements, btnAccountInformation].forEach(btn => {
    if (btn) {
        btn.addEventListener('click', handleClick);
    } else {
        console.error("Button not found:", btn);
    }
});

// Load initial content (Transactions tab)
if (btnTransactions) {
    btnTransactions.classList.add('active');
    const tab = btnTransactions.querySelector('.tab');
    if (tab) tab.classList.add('active');
    displayContent(content[0]);
}