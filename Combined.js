document.addEventListener('DOMContentLoaded', function() {
    // Profile popup functionality
    const profileLink = document.getElementById('profile-link');
    const profilePopup = document.getElementById('profilePopup');
    const overlay = document.getElementById('overlay');

    if (profileLink && profilePopup && overlay) {
        profileLink.addEventListener('click', function(e) {
            e.preventDefault();
            profilePopup.classList.add('active');
            overlay.classList.add('active');
        });

        overlay.addEventListener('click', function() {
            profilePopup.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    // Sidebar toggle functionality
    const sidebar = document.getElementById('sidebar');
    const mainContent = document.getElementById('mainContent');
    const toggleButton = document.getElementById('sidebarToggle');

    if (sidebar && mainContent && toggleButton) {
        const menuIcon = '<span class="material-icons-sharp">menu</span>';
        const chevronIcon = '<span class="material-icons-sharp">chevron_right</span>';

        toggleButton.addEventListener('click', function() {
            const isCollapsed = sidebar.classList.toggle('collapsed');
            mainContent.classList.toggle('expanded', isCollapsed);
            toggleButton.innerHTML = isCollapsed ? chevronIcon : menuIcon;
            localStorage.setItem('sidebarCollapsed', isCollapsed);
        });

        const savedState = localStorage.getItem('sidebarCollapsed');
        if (savedState === 'true') {
            sidebar.classList.add('collapsed');
            mainContent.classList.add('expanded');
            toggleButton.innerHTML = chevronIcon;
        }
    }

    // Platform selection functionality
    const startBtn = document.getElementById('startBtn');
    if (startBtn) {
        startBtn.addEventListener('click', function() {
            document.getElementById('platformOptions').style.display = 'block';
            this.style.display = 'none';
        });

        const platformButtons = document.querySelectorAll('[data-platform]');
        platformButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const platform = this.getAttribute('data-platform');
                const proceedLink = document.getElementById('proceedLink');

                if (platform === 'app') {
                    proceedLink.href = "Phone.html";
                } else {
                    proceedLink.href = "Computer.html";
                }

                document.getElementById('proceedBtn').style.display = 'block';
                document.getElementById('platformOptions').style.display = 'none';
            });
        });
    }

    // Enhanced Dropdown toggle functionality for Transact
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (dropdownToggle && dropdownMenu) {
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdown = this.parentElement;
            dropdown.classList.toggle('active');

            // Close other open dropdowns if any
            document.querySelectorAll('.dropdown').forEach(item => {
                if (item !== dropdown && item.classList.contains('active')) {
                    item.classList.remove('active');
                }
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.dropdown')) {
                document.querySelectorAll('.dropdown').forEach(item => {
                    item.classList.remove('active');
                });
            }
        });
    }

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

    // Tab functionality
    const btnTransactions = document.getElementById("btn-transactions");
    const btnPaymentHistory = document.getElementById("btn-payment-history");
    const btnStampedStatements = document.getElementById("btn-stamped-statements");
    const btnAccountInformation = document.getElementById("btn-account-information");
    const tabContent = document.getElementById("tab-content");

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
            case "btn-account-information":
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
            console.error("Button not found:", btn && btn.id);
        }
    });

    // Load initial content (Transactions tab)
    if (btnTransactions && tabContent) {
        btnTransactions.classList.add('active');
        const tab = btnTransactions.querySelector('.tab');
        if (tab) tab.classList.add('active');
        displayContent(content[0]);
    }
});