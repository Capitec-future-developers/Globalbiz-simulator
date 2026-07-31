document.addEventListener('DOMContentLoaded', function () {
    var root = document.getElementById('go-txn-root');
    if (!root) return;

    var TRANSACTIONS = [
        { desc: 'Royaldelitakeaway', date: '29 Jul 2026 16:14', category: 'Takeaways', amount: 16.00, type: 'out' },
        { desc: 'Transfer', date: '29 Jul 2026 16:12', category: 'Transfer', amount: 30.00, type: 'in' },
        { desc: 'Transfer: Our Future', date: '29 Jul 2026 12:48', category: 'Transfer', amount: 8.80, type: 'out' },
        { desc: 'Gauteng Provincial Go', date: '29 Jul 2026 11:29', category: 'Doctors & Therapists', amount: 228.00, type: 'out' },
        { desc: 'Transfer', date: '29 Jul 2026 10:56', category: 'Transfer', amount: 200.00, type: 'in' },
        { desc: 'Hpy*malik Spice And G', date: '28 Jul 2026 18:16', category: 'Groceries', amount: 23.00, type: 'out' },
        { desc: 'Food Lover\'s Market', date: '28 Jul 2026 12:50', category: 'Groceries', amount: 41.20, type: 'out' },
        { desc: 'Transfer', date: '28 Jul 2026 12:47', category: 'Transfer', amount: 100.00, type: 'in' },
        { desc: 'Transfer', date: '28 Jul 2026 07:56', category: 'Transfer', amount: 2.00, type: 'in' },
        { desc: 'Transfer', date: '28 Jul 2026 07:56', category: 'Transfer', amount: 15.00, type: 'in' }
    ];

    var TRACK_CATEGORIES = [
        { name: 'Personal & Family', amount: 3689.97, color: '#1976d2' },
        { name: 'Loans & Accounts', amount: 2519.15, color: '#2e7d32' },
        { name: 'Transfer', amount: 2030.07, color: '#8e24aa' }
    ];

    function formatMoney(n) {
        return 'R' + Number(n).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }

    function render(html) {
        root.innerHTML = html;
    }

    function renderList(filter) {
        var filtered = TRANSACTIONS.filter(function (t) {
            return filter === 'all' || t.type === (filter === 'in' ? 'in' : 'out');
        });
        render(
            '<div class="go-txn-body">' +
            '<div class="go-txn-month-row"><h4>Jul 2026</h4><a href="#" id="goStatementLink">Statement <span class="material-icons-sharp" style="font-size:16px;">chevron_right</span></a></div>' +
            (filtered.length
                ? filtered.map(function (t) {
                    var amountText = filter === 'all'
                        ? (t.type === 'out' ? '-' + formatMoney(t.amount) : formatMoney(t.amount))
                        : formatMoney(t.amount);
                    return '<div class="go-txn-row"><div><div class="go-txn-desc">' + t.desc + '</div><div class="go-txn-sub">' + t.date + ' - ' + t.category + '</div></div><div class="go-txn-amount' + (t.type === 'in' ? ' go-txn-in' : '') + '">' + amountText + '</div></div>';
                }).join('')
                : '<p class="go-empty-note">No transactions to show.</p>'
            ) +
            '</div>'
        );
        var statementLink = document.getElementById('goStatementLink');
        if (statementLink) statementLink.addEventListener('click', function (e) { e.preventDefault(); });
    }

    function renderTrack() {
        render(
            '<div class="go-txn-body">' +
            '<div class="go-track-view-row"><div><span class="go-track-view-label">View</span><span class="go-track-view-value">Money out</span></div><button type="button" id="goTrackMenu"><span class="material-icons-sharp">more_vert</span></button></div>' +
            '<div class="go-track-month-nav"><button type="button" id="goTrackPrev"><span class="material-icons-sharp" style="font-size:18px;">chevron_left</span></button><div class="go-track-total"><div class="go-track-total-amount">R10 707.04</div><div class="go-track-total-month">Jul 2026</div></div><button type="button" id="goTrackNext"><span class="material-icons-sharp" style="font-size:18px;">chevron_right</span></button></div>' +
            TRACK_CATEGORIES.map(function (c) {
                return '<a href="#" class="go-track-cat-row"><span class="go-track-cat-dot" style="background:' + c.color + ';"></span><span class="go-track-cat-name">' + c.name + '</span><span class="go-track-cat-amount">' + formatMoney(c.amount) + '</span><span class="material-icons-sharp" style="color:var(--go-primary);">chevron_right</span></a>';
            }).join('') +
            '</div>'
        );
        document.getElementById('goTrackMenu').addEventListener('click', function (e) { e.preventDefault(); });
        document.getElementById('goTrackPrev').addEventListener('click', function (e) { e.preventDefault(); });
        document.getElementById('goTrackNext').addEventListener('click', function (e) { e.preventDefault(); });
        root.querySelectorAll('.go-track-cat-row').forEach(function (row) {
            row.addEventListener('click', function (e) { e.preventDefault(); });
        });
    }

    function selectTab(tab) {
        document.querySelectorAll('.go-acc-tab').forEach(function (btn) {
            btn.classList.toggle('active', btn.dataset.tab === tab);
        });
        if (tab === 'track') {
            renderTrack();
        } else {
            renderList(tab);
        }
    }

    document.querySelectorAll('.go-acc-tab').forEach(function (btn) {
        btn.addEventListener('click', function () { selectTab(btn.dataset.tab); });
    });

    selectTab('all');
});
