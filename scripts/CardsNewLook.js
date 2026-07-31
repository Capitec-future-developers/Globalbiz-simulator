document.addEventListener('DOMContentLoaded', function () {
    var root = document.getElementById('cards-newlook-root');
    if (!root) return;

    var CARDS = [
        {
            id: 'virtual',
            type: 'Virtual',
            kind: 'debit',
            numberMasked: '**** 0155',
            numberFull: '4016 0001 0212 0155',
            securityCode: '279',
            validThru: '04/31',
            bank: 'Kodi banks',
            holder: 'MR O MOHLALA',
            status: 'active',
            detailsVisible: false,
            frozen: false,
            international: true,
            limits: { perTransaction: 1000, daily: 10000, monthly: 10000 }
        },
        {
            id: 'debit',
            type: 'Debit',
            kind: 'debit',
            numberMasked: '**** 3734',
            numberFull: '4016 0007 8821 3734',
            securityCode: '104',
            validThru: '09/29',
            bank: 'Kodi Banks',
            holder: 'MR O MOHLALA',
            status: 'active',
            detailsVisible: false,
            frozen: false,
            international: true,
            limits: { perTransaction: 5000, daily: 15000, monthly: 50000 }
        }
    ];

    var statusFilter = 'all';

    function render(html) {
        root.innerHTML = html;
    }

    function exitCards() {
        window.location.href = 'Phone2.html';
    }

    function showToast(message, kind) {
        var existing = root.querySelector('.cd-toast');
        if (existing) existing.remove();
        var toast = document.createElement('div');
        toast.className = 'cd-toast ' + (kind || 'info');
        toast.innerHTML = '<span class="cd-toast-icon"><span class="material-icons-sharp">' +
            (kind === 'error' ? 'priority_high' : 'check') + '</span></span><span>' + message + '</span>';
        var screen = root.querySelector('.cd-screen') || root.querySelector('.cd-modal');
        if (screen) {
            screen.appendChild(toast);
            setTimeout(function () { toast.remove(); }, 2600);
        }
    }

    function formatMoney(n) {
        return 'R' + Number(n).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$& ').replace('.', ' ');
    }

    function moneyInputValue(n) {
        return Number(n).toFixed(2);
    }

    /* ---------------- card list ---------------- */
    function renderList() {
        var visibleCards = CARDS.filter(function (c) {
            return statusFilter === 'all' || c.status === statusFilter;
        });
        render(
            '<div class="cd-screen">' +
            '<div class="cd-topbar"><button id="cd-back-btn" type="button"><span class="material-icons-sharp">arrow_back</span></button><h2>Cards</h2><a href="Support.html?from=business" id="cd-call-link" aria-label="Get help"><span class="material-icons-sharp">call</span></a></div>' +
            '<div class="cd-search-row"><input type="text" id="cd-filter-input" placeholder="Filter cards" readonly><button id="cd-filter-btn" type="button"><span class="material-icons-sharp">tune</span></button></div>' +
            '<div class="cd-list-heading-row"><h3>' + (statusFilter === 'all' ? 'All' : statusFilter === 'active' ? 'Active' : 'Stopped') + '</h3><button class="cd-add-new-link" id="cd-add-new-link" type="button">Add new</button></div>' +
            (visibleCards.length
                ? '<div class="cd-card-list">' + visibleCards.map(function (c, i) {
                    return '<button class="cd-card-row" type="button" data-card-index="' + CARDS.indexOf(c) + '">' +
                        '<div class="cd-card-chip' + (c.type === 'Virtual' ? ' cd-chip-virtual' : '') + '"><span>VISA</span></div>' +
                        '<div class="cd-card-row-info"><div class="cd-card-row-number">' + c.numberMasked + '</div><div class="cd-card-row-sub">' + c.bank + '</div><div class="cd-card-row-sub">' + c.holder + '</div></div>' +
                        '<div class="cd-card-row-type">' + c.type + '</div>' +
                        '</button>';
                }).join('') + '</div>'
                : '<p class="cd-empty-note">No cards match this filter.</p>'
            ) +
            '</div>'
        );
        document.getElementById('cd-back-btn').addEventListener('click', exitCards);
        document.getElementById('cd-filter-btn').addEventListener('click', openFilterSheet);
        document.getElementById('cd-filter-input').addEventListener('click', openFilterSheet);
        document.getElementById('cd-add-new-link').addEventListener('click', function () {
            var trigger = document.getElementById('Add-Card');
            if (trigger) trigger.click();
        });
        root.querySelectorAll('.cd-card-row').forEach(function (row) {
            row.addEventListener('click', function () {
                renderSettings(CARDS[parseInt(row.dataset.cardIndex, 10)]);
            });
        });
    }

    function openFilterSheet() {
        var screen = root.querySelector('.cd-screen');
        var pending = statusFilter;
        var wrap = document.createElement('div');
        wrap.innerHTML =
            '<div class="cd-sheet-overlay" id="cd-filter-overlay"></div>' +
            '<div class="cd-sheet" id="cd-filter-sheet">' +
            '<div class="cd-sheet-header"><h3>Filter Cards</h3><button type="button" id="cd-filter-close"><span class="material-icons-sharp">close</span></button></div>' +
            '<div class="cd-sheet-row"><h4>Card status</h4><button class="cd-clear-link" id="cd-filter-clear" type="button">Clear</button></div>' +
            '<div class="cd-status-pills" id="cd-status-pills">' +
            ['all', 'active', 'stopped'].map(function (s) {
                var label = s === 'all' ? 'All' : s === 'active' ? 'Active' : 'Stopped';
                return '<button type="button" class="cd-status-pill' + (pending === s ? ' selected' : '') + '" data-status="' + s + '">' +
                    (pending === s ? '<span class="material-icons-sharp" style="font-size:16px;">check</span>' : '') + label + '</button>';
            }).join('') +
            '</div>' +
            '<button class="cd-sheet-primary-btn" id="cd-apply-filters" type="button">Apply filters</button>' +
            '</div>';
        screen.appendChild(wrap);

        function closeSheet() { wrap.remove(); }

        wrap.querySelector('#cd-filter-overlay').addEventListener('click', closeSheet);
        wrap.querySelector('#cd-filter-close').addEventListener('click', closeSheet);
        wrap.querySelectorAll('.cd-status-pill').forEach(function (pill) {
            pill.addEventListener('click', function () {
                pending = pill.dataset.status;
                wrap.querySelectorAll('.cd-status-pill').forEach(function (p) {
                    var label = p.dataset.status === 'all' ? 'All' : p.dataset.status === 'active' ? 'Active' : 'Stopped';
                    var selected = p.dataset.status === pending;
                    p.classList.toggle('selected', selected);
                    p.innerHTML = (selected ? '<span class="material-icons-sharp" style="font-size:16px;">check</span>' : '') + label;
                });
            });
        });
        wrap.querySelector('#cd-filter-clear').addEventListener('click', function () {
            pending = 'all';
            wrap.querySelectorAll('.cd-status-pill').forEach(function (p) {
                var label = p.dataset.status === 'all' ? 'All' : p.dataset.status === 'active' ? 'Active' : 'Stopped';
                var selected = p.dataset.status === 'all';
                p.classList.toggle('selected', selected);
                p.innerHTML = (selected ? '<span class="material-icons-sharp" style="font-size:16px;">check</span>' : '') + label;
            });
        });
        wrap.querySelector('#cd-apply-filters').addEventListener('click', function () {
            statusFilter = pending;
            renderList();
        });
    }

    /* ---------------- card settings ---------------- */
    function cardVisualHtml(card) {
        if (card.detailsVisible) {
            return '<div class="cd-card-visual">' +
                '<div class="cd-card-detail-security">' + card.securityCode + '</div>' +
                '<div class="cd-card-detail-label">SECURITY CODE</div>' +
                '<div class="cd-card-detail-number">' + card.numberFull + '</div>' +
                '<div class="cd-card-detail-expiry">' + card.validThru + '<div style="font-size:0.7rem; font-weight:600; opacity:0.8;">VALID THRU</div></div>' +
                '</div>';
        }
        return '<div class="cd-card-visual">' +
            '<div class="cd-card-visual-badge">25<span>years</span></div>' +
            '<div class="cd-card-brand">CAPITEC</div>' +
            '<div class="cd-card-subtitle">Business ' + card.type.toLowerCase() + ' ' + card.kind + '</div>' +
            '<div class="cd-card-holder-block">' + card.holder + '<br>' + card.bank + '<br>' + card.numberMasked + '</div>' +
            '<div class="cd-card-visa">VISA</div>' +
            '</div>';
    }

    function renderSettings(card) {
        render(
            '<div class="cd-screen">' +
            '<div class="cd-topbar"><button id="cd-settings-back" type="button"><span class="material-icons-sharp">arrow_back</span></button><h2>Card settings</h2></div>' +
            cardVisualHtml(card) +
            '<div class="cd-center"><span class="cd-status-badge' + (card.status === 'stopped' ? ' stopped' : '') + '">' + (card.status === 'stopped' ? 'Stopped' : 'Active') + '</span></div>' +
            '<div class="cd-center"><button class="cd-link-btn" id="cd-toggle-details" type="button"><span class="material-icons-sharp">' + (card.detailsVisible ? 'visibility_off' : 'visibility') + '</span>' + (card.detailsVisible ? 'Hide card details' : 'Show card details') + '</button></div>' +
            '<div class="cd-center"><button class="cd-link-btn" id="cd-copy-number" type="button">Copy card number</button></div>' +
            '<div class="cd-settings-list">' +
            '<button class="cd-settings-row" id="cd-stop-card-row" type="button"><span class="material-icons-sharp">no_cell</span><span class="cd-row-label">Stop card</span><span class="material-icons-sharp">chevron_right</span></button>' +
            '<button class="cd-settings-row" id="cd-card-limits-row" type="button"><span class="material-icons-sharp">description</span><span class="cd-row-label">Card limits</span><span class="material-icons-sharp">chevron_right</span></button>' +
            '</div>' +
            '<div class="cd-toggle-card"><div><div class="cd-toggle-title">Freeze card</div><div class="cd-toggle-desc">All transactions will be blocked until you unfreeze the card. You don’t have to replace your card.</div></div><button class="cd-toggle-switch' + (card.frozen ? ' on' : '') + '" id="cd-freeze-toggle" type="button"><span class="cd-toggle-knob material-icons-sharp">' + (card.frozen ? 'check' : 'close') + '</span></button></div>' +
            '<div class="cd-toggle-card"><div><div class="cd-toggle-title">International transactions</div><div class="cd-toggle-desc">Use your card to make international transactions.</div></div><button class="cd-toggle-switch' + (card.international ? ' on' : '') + '" id="cd-intl-toggle" type="button"><span class="cd-toggle-knob material-icons-sharp">' + (card.international ? 'check' : 'close') + '</span></button></div>' +
            '<button class="cd-wallet-row" id="cd-apple-wallet-row" type="button"><span class="cd-wallet-badge"> Pay</span><span class="cd-wallet-label">Add to Apple Wallet</span><span class="material-icons-sharp">chevron_right</span></button>' +
            '</div>'
        );
        document.getElementById('cd-settings-back').addEventListener('click', renderList);
        document.getElementById('cd-toggle-details').addEventListener('click', function () {
            card.detailsVisible = !card.detailsVisible;
            renderSettings(card);
        });
        document.getElementById('cd-copy-number').addEventListener('click', function () {
            var text = card.numberFull.replace(/\s/g, '');
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).catch(function () {});
            }
            showToast('Card number copied', 'success');
        });
        document.getElementById('cd-stop-card-row').addEventListener('click', function () { renderStopCard(card); });
        document.getElementById('cd-card-limits-row').addEventListener('click', function () { renderLimits(card); });
        document.getElementById('cd-freeze-toggle').addEventListener('click', function () {
            card.frozen = !card.frozen;
            renderSettings(card);
            showToast(card.frozen ? 'Card frozen' : 'Card unfrozen', 'success');
        });
        document.getElementById('cd-intl-toggle').addEventListener('click', function () {
            card.international = !card.international;
            renderSettings(card);
            showToast(card.international ? 'International transactions enabled' : 'International transactions disabled', 'success');
        });
        document.getElementById('cd-apple-wallet-row').addEventListener('click', function () { renderApplePay(card); });
    }

    /* ---------------- card limits ---------------- */
    function renderLimits(card) {
        render(
            '<div class="cd-screen">' +
            '<div class="cd-topbar"><button id="cd-limits-back" type="button"><span class="material-icons-sharp">arrow_back</span></button><h2>Card limits</h2></div>' +
            '<div class="cd-note-banner"><span class="cd-note-icon material-icons-sharp">info</span><p><b>Note:</b> Remember that the daily card limits cannot be greater than the monthly limits.</p></div>' +
            '<div class="cd-limits-card">' +
            '<h3>Online Card Limits</h3>' +
            '<div class="cd-limit-field"><label>Per-transaction limit</label><div class="cd-limit-input-wrap"><span>R</span><input type="text" inputmode="decimal" id="cd-limit-per" value="' + moneyInputValue(card.limits.perTransaction) + '"></div><p class="cd-limit-hint">Max R250 000.00</p></div>' +
            '<div class="cd-limit-field"><label>Daily limit</label><div class="cd-limit-input-wrap"><span>R</span><input type="text" inputmode="decimal" id="cd-limit-daily" value="' + moneyInputValue(card.limits.daily) + '"></div><p class="cd-limit-hint">Max R250 000.00</p></div>' +
            '<div class="cd-limit-field"><label>Monthly limit</label><div class="cd-limit-input-wrap"><span>R</span><input type="text" inputmode="decimal" id="cd-limit-monthly" value="' + moneyInputValue(card.limits.monthly) + '"></div><p class="cd-limit-hint">Max R1 000 000.00</p></div>' +
            '</div>' +
            '<div class="cd-sticky-footer"><button class="cd-primary-btn" id="cd-update-limits" type="button">Update limits</button></div>' +
            '</div>'
        );
        document.getElementById('cd-limits-back').addEventListener('click', function () { renderSettings(card); });
        document.getElementById('cd-update-limits').addEventListener('click', function () {
            var per = parseFloat(document.getElementById('cd-limit-per').value.replace(/[^0-9.]/g, '')) || 0;
            var daily = parseFloat(document.getElementById('cd-limit-daily').value.replace(/[^0-9.]/g, '')) || 0;
            var monthly = parseFloat(document.getElementById('cd-limit-monthly').value.replace(/[^0-9.]/g, '')) || 0;
            if (daily > monthly) {
                showToast('Daily limit cannot be greater than the monthly limit', 'error');
                return;
            }
            card.limits.perTransaction = per;
            card.limits.daily = daily;
            card.limits.monthly = monthly;
            showToast('Card limits updated', 'success');
            setTimeout(function () { renderSettings(card); }, 900);
        });
    }

    /* ---------------- stop card ---------------- */
    function renderStopCard(card) {
        render(
            '<div class="cd-screen">' +
            '<div class="cd-topbar"><button id="cd-stop-back" type="button"><span class="material-icons-sharp">arrow_back</span></button><h2>Stop card</h2></div>' +
            '<p class="cd-warning-text">' + (card.type === 'Virtual'
                ? 'You will need to create a new virtual card if you stop it.'
                : 'You will need to order a replacement card if you stop it.') + '</p>' +
            '<div class="cd-card-summary-row"><span class="cd-card-summary-icon material-icons-sharp">description</span><div class="cd-card-summary-info"><span class="cd-card-row-number">' + card.numberMasked + '</span><span class="cd-card-row-sub">' + card.type + ' ' + (card.kind === 'debit' ? 'Debit' : card.kind) + ' Card</span></div></div>' +
            '<button class="cd-secondary-btn" id="cd-confirm-stop" type="button">Stop card</button>' +
            '</div>'
        );
        document.getElementById('cd-stop-back').addEventListener('click', function () { renderSettings(card); });
        document.getElementById('cd-confirm-stop').addEventListener('click', function () {
            card.status = 'stopped';
            showToast('Card stopped', 'success');
            setTimeout(renderList, 900);
        });
    }

    /* ---------------- add to apple pay ---------------- */
    function renderApplePay(card) {
        var screen = root.querySelector('.cd-screen');
        var modal = document.createElement('div');
        modal.className = 'cd-modal';
        modal.innerHTML =
            '<button class="cd-modal-close" id="cd-applepay-close" type="button"><span class="material-icons-sharp">close</span></button>' +
            '<h2 class="cd-modal-title">Add Card to Apple Pay</h2>' +
            '<p class="cd-modal-subtitle">“' + card.holder + '” will be available in Wallet.</p>' +
            '<div class="cd-modal-field-group"><input type="text" id="cd-applepay-name" placeholder="Name"><input type="text" id="cd-applepay-number" placeholder="Card Number"></div>' +
            '<div class="cd-modal-disclosure"><span class="material-icons-sharp">handshake</span><p>Card-related information, location, and information about device settings and use patterns may be sent to Apple and may be used together with account information to provide assessments to your card issuer or payment network to set up Apple Pay and prevent transaction fraud. <a href="#" id="cd-applepay-data-link">See how your data is managed…</a></p></div>' +
            '<button class="cd-primary-btn" id="cd-applepay-continue" type="button">Continue</button>';
        screen.appendChild(modal);

        modal.querySelector('#cd-applepay-close').addEventListener('click', function () { modal.remove(); });
        modal.querySelector('#cd-applepay-data-link').addEventListener('click', function (e) {
            e.preventDefault();
        });
        modal.querySelector('#cd-applepay-continue').addEventListener('click', function () {
            modal.remove();
            renderSettings(card);
            showToast('Failed to add card to Apple Wallet', 'error');
        });
    }

    renderList();
});
