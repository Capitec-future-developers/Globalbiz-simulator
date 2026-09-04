/* Shared behaviour for MobileApp/*.html. One file for all five pages —
   each init function checks for its own markup before doing anything, so
   loading this on every page is harmless. Persistence uses localStorage
   (maVirtualCards, maSentMessages) so a card created in the wizard shows
   up back on Cards.html and a sent message shows up on Secure Messages,
   the same "no backend, state lives in the browser" approach the rest of
   the simulator uses. */

(function () {
    'use strict';

    function pad(n) {
        return String(n).padStart(2, '0');
    }

    function startClock() {
        var els = document.querySelectorAll('.ma-statusbar-time');
        if (!els.length) return;
        function tick() {
            var now = new Date();
            var text = pad(now.getHours()) + ':' + pad(now.getMinutes());
            els.forEach(function (el) { el.textContent = text; });
        }
        tick();
        setInterval(tick, 15000);
    }

    function money(n) {
        var sign = n < 0 ? '-' : '';
        return sign + 'R ' + Math.abs(Number(n)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    }

    function getVirtualCards() {
        try {
            return JSON.parse(localStorage.getItem('maVirtualCards') || '[]');
        } catch (e) {
            return [];
        }
    }

    function addVirtualCard(card) {
        var cards = getVirtualCards();
        cards.push(card);
        localStorage.setItem('maVirtualCards', JSON.stringify(cards));
    }

    function getSentMessages() {
        try {
            return JSON.parse(localStorage.getItem('maSentMessages') || '[]');
        } catch (e) {
            return [];
        }
    }

    function addSentMessage(msg) {
        var list = getSentMessages();
        list.unshift(msg);
        localStorage.setItem('maSentMessages', JSON.stringify(list));
    }

    /* ---------------- Bottom sheet (Create Message) ---------------- */

    function initSheets() {
        var sheets = document.querySelectorAll('[data-sheet]');
        if (!sheets.length) return;

        function open(name) {
            var sheet = document.querySelector('[data-sheet="' + name + '"]');
            if (sheet) sheet.classList.add('visible');
        }

        function close(name) {
            var sheet = document.querySelector('[data-sheet="' + name + '"]');
            if (sheet) sheet.classList.remove('visible');
        }

        document.querySelectorAll('[data-open-sheet]').forEach(function (trigger) {
            trigger.addEventListener('click', function () {
                open(trigger.getAttribute('data-open-sheet'));
            });
        });

        sheets.forEach(function (sheet) {
            var name = sheet.getAttribute('data-sheet');
            sheet.addEventListener('click', function (e) {
                if (e.target === sheet) close(name);
            });

            sheet.querySelectorAll('[data-sheet-item]').forEach(function (item) {
                item.addEventListener('click', function () {
                    var fieldName = sheet.getAttribute('data-sheet');
                    var label = item.getAttribute('data-sheet-item');
                    var target = document.querySelector('[data-field-value="' + fieldName + '"]');
                    if (target) {
                        target.textContent = label;
                        target.classList.remove('ma-placeholder');
                    }
                    var shell = document.querySelector('[data-field-shell="' + fieldName + '"]');
                    if (shell) shell.setAttribute('data-filled', 'true');
                    close(fieldName);
                    updateSendButton();
                });
            });
        });
    }

    function updateSendButton() {
        var sendBtn = document.getElementById('maSendBtn');
        if (!sendBtn) return;
        var accountFilled = document.querySelector('[data-field-shell="account"]')?.getAttribute('data-filled') === 'true';
        var topicFilled = document.querySelector('[data-field-shell="topic"]')?.getAttribute('data-filled') === 'true';
        var messageBox = document.getElementById('maMessageInput');
        var hasMessage = messageBox && messageBox.value.trim().length > 0;
        sendBtn.disabled = !(accountFilled && topicFilled && hasMessage);
    }

    function initCreateMessage() {
        var form = document.getElementById('maCreateMessageForm');
        if (!form) return;

        var messageBox = document.getElementById('maMessageInput');
        if (messageBox) messageBox.addEventListener('input', updateSendButton);
        updateSendButton();

        var sendBtn = document.getElementById('maSendBtn');
        sendBtn.addEventListener('click', function () {
            if (sendBtn.disabled) return;
            addSentMessage({
                account: document.querySelector('[data-field-value="account"]').textContent,
                topic: document.querySelector('[data-field-value="topic"]').textContent,
                message: messageBox.value.trim(),
                date: new Date().toDateString()
            });
            window.location.href = 'SecureMessages.html?tab=sent';
        });
    }

    /* ---------------- Secure Messages ---------------- */

    function initSecureMessages() {
        var tabs = document.querySelectorAll('.ma-tab[data-tab]');
        if (!tabs.length) return;

        var params = new URLSearchParams(window.location.search);
        var initial = params.get('tab') === 'sent' ? 'sent' : 'inbox';

        function render(tab) {
            tabs.forEach(function (t) {
                t.classList.toggle('active', t.getAttribute('data-tab') === tab);
            });

            var inboxPane = document.getElementById('maInboxPane');
            var sentPane = document.getElementById('maSentPane');
            if (inboxPane) inboxPane.style.display = tab === 'inbox' ? '' : 'none';
            if (sentPane) sentPane.style.display = tab === 'sent' ? '' : 'none';

            if (tab === 'sent') renderSentList();
        }

        function renderSentList() {
            var list = getSentMessages();
            var emptyEl = document.getElementById('maSentEmpty');
            var listEl = document.getElementById('maSentList');
            if (!listEl || !emptyEl) return;

            if (!list.length) {
                emptyEl.style.display = '';
                listEl.style.display = 'none';
                return;
            }

            emptyEl.style.display = 'none';
            listEl.style.display = '';
            listEl.innerHTML = list.map(function (m) {
                return '<div class="ma-list-row" style="cursor: default;">' +
                    '<div class="ma-list-row-body">' +
                    '<span class="ma-list-row-name">' + m.topic + '</span>' +
                    '<span class="ma-list-row-sub">' + m.account + ' &middot; ' + m.date + '</span>' +
                    '</div></div>';
            }).join('');
        }

        tabs.forEach(function (t) {
            t.addEventListener('click', function () {
                render(t.getAttribute('data-tab'));
            });
        });

        render(initial);
    }

    /* ---------------- Cards ---------------- */

    function initCards() {
        var emptyEl = document.getElementById('maCardsEmpty');
        var listEl = document.getElementById('maCardsList');
        if (!emptyEl || !listEl) return;

        var cards = getVirtualCards();

        if (!cards.length) {
            emptyEl.style.display = '';
            listEl.style.display = 'none';
            return;
        }

        emptyEl.style.display = 'none';
        listEl.style.display = '';
        listEl.innerHTML = cards.map(function (card) {
            return '<div class="ma-card" style="display:flex; align-items:center; gap:14px;">' +
                '<div style="width:44px;height:30px;border-radius:6px;background:' + card.color + ';flex-shrink:0;"></div>' +
                '<div style="flex:1;">' +
                '<div class="ma-list-row-name">' + card.name + '</div>' +
                '<div class="ma-list-row-sub">' + card.cardholder + ' &middot; Virtual Debit Card</div>' +
                '</div></div>';
        }).join('');
    }

    /* ---------------- Add Virtual Card wizard ---------------- */

    var LINKED_ACCOUNTS = [
        { id: 'current', name: 'Current', number: '1053 2681 65', display: '1053268165' },
        { id: 'notice', name: 'Notice Deposit', number: '4100 2538 34', display: '4100253834' }
    ];

    var CARDHOLDERS = ['Omphile Mohlala', 'Mr O Mohlala', 'O Mohlala'];

    function initAddVirtualCard() {
        var root = document.getElementById('maWizardRoot');
        if (!root) return;

        var TOTAL_STEPS = 5;
        var state = {
            step: 1,
            cardType: null,
            linkedAccount: LINKED_ACCOUNTS[0].id,
            businessName: 'Omphile Mohlala',
            cardholder: CARDHOLDERS[0],
            perTx: '1000',
            daily: '5000',
            monthly: '10000'
        };

        var progressFill = document.getElementById('maProgressFill');
        var stepLabel = document.getElementById('maStepLabel');
        var stepBody = document.getElementById('maStepBody');
        var continueBtn = document.getElementById('maContinueBtn');
        var cancelBtn = document.getElementById('maCancelBtn');
        var backBtn = document.getElementById('maBackBtn');

        function limitsValid() {
            var perTx = parseFloat(state.perTx) || 0;
            var daily = parseFloat(state.daily) || 0;
            var monthly = parseFloat(state.monthly) || 0;
            return perTx > 0 && daily > 0 && perTx < daily && monthly <= 1000000;
        }

        function renderStep() {
            progressFill.style.width = (state.step / TOTAL_STEPS * 100) + '%';

            var titles = {
                1: 'Card type',
                2: 'Linked account',
                3: 'Card details',
                4: 'Online Card Limits',
                5: 'Confirm order details'
            };
            stepLabel.innerHTML = 'Step ' + state.step + ' of ' + TOTAL_STEPS + ': <b>' + titles[state.step] + '</b>';

            if (state.step === 1) {
                stepBody.innerHTML =
                    '<div class="ma-card">' +
                    '<div class="ma-card-row"><h3>Choose card type</h3></div>' +
                    cardTypeRow('physical', 'Physical Card', 'Use your physical card for everyday payments.') +
                    cardTypeRow('virtual', 'Virtual Card', 'Create a virtual card for online payments.') +
                    '</div>';
                stepBody.querySelectorAll('[data-card-type]').forEach(function (row) {
                    row.addEventListener('click', function () {
                        state.cardType = row.getAttribute('data-card-type');
                        renderStep();
                    });
                });
                continueBtn.disabled = !state.cardType;
                continueBtn.classList.toggle('ma-btn-disabled', !state.cardType);
            } else if (state.step === 2) {
                stepBody.innerHTML =
                    '<div class="ma-card"><div class="ma-card-row"><h3>Linked account</h3></div>' +
                    LINKED_ACCOUNTS.map(function (acc) {
                        var selected = acc.id === state.linkedAccount;
                        return '<div class="ma-radio-row' + (selected ? ' ma-radio-row-selected' : '') + '" data-account="' + acc.id + '">' +
                            '<span class="ma-radio-row-label">' + acc.name + ' &middot; ' + acc.number + '</span>' +
                            '<span class="ma-radio-dot"><span class="ma-radio-dot-fill"></span></span>' +
                            '</div>';
                    }).join('') + '</div>';
                stepBody.querySelectorAll('[data-account]').forEach(function (row) {
                    row.addEventListener('click', function () {
                        state.linkedAccount = row.getAttribute('data-account');
                        renderStep();
                    });
                });
                continueBtn.disabled = false;
            } else if (state.step === 3) {
                stepBody.innerHTML =
                    '<div class="ma-info-banner">' +
                    '<span class="ma-info-banner-icon">i</span>' +
                    '<span>These details will be shown on your ' + (state.cardType === 'physical' ? 'physical' : 'virtual') + ' card</span>' +
                    '</div>' +
                    '<div class="ma-card">' +
                    '<div class="ma-card-row"><h3>Card details</h3></div>' +
                    '<div class="ma-field">' +
                    '<label class="ma-field-label" for="maBusinessName">Business name</label>' +
                    '<input class="ma-text-input" id="maBusinessName" type="text" value="' + state.businessName + '">' +
                    '</div>' +
                    '<label class="ma-field-label">Cardholder name</label>' +
                    CARDHOLDERS.map(function (name) {
                        var selected = name === state.cardholder;
                        return '<div class="ma-radio-row' + (selected ? ' ma-radio-row-selected' : '') + '" data-cardholder="' + name + '">' +
                            '<span class="ma-radio-row-label">' + name + '</span>' +
                            '<span class="ma-radio-dot"><span class="ma-radio-dot-fill"></span></span>' +
                            '</div>';
                    }).join('') +
                    '</div>';

                var nameInput = document.getElementById('maBusinessName');
                nameInput.addEventListener('input', function () {
                    state.businessName = nameInput.value;
                    validateStep3();
                });
                stepBody.querySelectorAll('[data-cardholder]').forEach(function (row) {
                    row.addEventListener('click', function () {
                        state.cardholder = row.getAttribute('data-cardholder');
                        renderStep();
                    });
                });
                validateStep3();
            } else if (state.step === 4) {
                stepBody.innerHTML =
                    '<div class="ma-card">' +
                    '<div class="ma-card-row"><h3>Online Card Limits</h3></div>' +
                    limitField('perTx', 'Per-transaction limit', state.perTx) +
                    limitField('daily', 'Daily limit', state.daily) +
                    limitField('monthly', 'Monthly limit', state.monthly, 'Max R1 000 000.00') +
                    '</div>';

                ['perTx', 'daily', 'monthly'].forEach(function (key) {
                    var input = document.getElementById('maLimit_' + key);
                    input.addEventListener('input', function () {
                        state[key] = input.value;
                        renderStep();
                    });
                });
                continueBtn.disabled = !limitsValid();
                continueBtn.classList.toggle('ma-btn-disabled', !limitsValid());
            } else if (state.step === 5) {
                var acc = LINKED_ACCOUNTS.find(function (a) { return a.id === state.linkedAccount; });
                stepBody.innerHTML =
                    '<div class="ma-card">' +
                    '<div class="ma-card-row"><h3>Card details</h3><button class="ma-link" data-goto-step="3">Edit</button></div>' +
                    '<div class="ma-detail-stack"><span class="ma-detail-label">Card Type</span><span class="ma-detail-value">' + cardTypeLabel() + '</span></div>' +
                    '<div class="ma-detail-stack"><span class="ma-detail-label">Linked account</span><span class="ma-detail-value">' + acc.display + '</span></div>' +
                    '<div class="ma-detail-stack"><span class="ma-detail-label">Business name</span><span class="ma-detail-value">' + state.businessName + '</span></div>' +
                    '<div class="ma-detail-stack"><span class="ma-detail-label">Cardholder name</span><span class="ma-detail-value">' + state.cardholder + '</span></div>' +
                    '</div>';
                stepBody.querySelector('[data-goto-step]').addEventListener('click', function (e) {
                    state.step = Number(e.target.getAttribute('data-goto-step'));
                    renderStep();
                });
                continueBtn.disabled = false;
            }

            backBtn.style.visibility = state.step === 1 ? 'hidden' : 'visible';
            continueBtn.textContent = state.step === TOTAL_STEPS ? 'Continue' : 'Continue';
        }

        function cardTypeRow(id, title, desc) {
            var selected = state.cardType === id;
            return '<div class="ma-radio-row' + (selected ? ' ma-radio-row-selected' : '') + '" data-card-type="' + id + '">' +
                '<div><span class="ma-radio-row-label">' + title + '</span>' +
                '<div style="font-size:0.78rem; color:#666; margin-top:3px;">' + desc + '</div></div>' +
                '<span class="ma-radio-dot"><span class="ma-radio-dot-fill"></span></span>' +
                '</div>';
        }

        function cardTypeLabel() {
            return state.cardType === 'physical' ? 'Physical Debit Card' : 'Virtual Debit Card';
        }

        function limitField(key, label, value, hint) {
            var num = parseFloat(value) || 0;
            var error = '';
            if (key === 'perTx' && num >= (parseFloat(state.daily) || 0)) {
                error = 'Per-transaction limit must be less than daily limit';
            }
            if (key === 'daily' && num <= (parseFloat(state.perTx) || 0)) {
                error = 'Daily limit must be greater than transaction limit';
            }
            return '<div class="ma-field">' +
                '<label class="ma-field-label">' + label + (hint ? '' : ' <span style="font-weight:400;">(max R5 000)</span>') + '</label>' +
                '<div class="ma-amount-input' + (error ? ' ma-amount-input-error' : '') + '">' +
                '<span>R</span><input type="number" step="0.01" min="0" id="maLimit_' + key + '" value="' + value + '">' +
                '</div>' +
                (error ? '<div class="ma-error-text">' + warningIcon() + '<span>' + error + '</span></div>' : '') +
                (hint ? '<div class="ma-hint-text">' + hint + '</div>' : '') +
                '</div>';
        }

        function warningIcon() {
            return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 3l9 16H3L12 3z" fill="#c0272d"/><rect x="11" y="9" width="2" height="6" fill="#fff"/><rect x="11" y="16" width="2" height="2" fill="#fff"/></svg>';
        }

        function validateStep3() {
            var ok = state.businessName.trim().length > 0;
            continueBtn.disabled = !ok;
            continueBtn.classList.toggle('ma-btn-disabled', !ok);
        }

        continueBtn.addEventListener('click', function () {
            if (continueBtn.disabled) return;
            if (state.step < TOTAL_STEPS) {
                state.step += 1;
                renderStep();
                stepBody.scrollIntoView({ block: 'start' });
            } else {
                var acc = LINKED_ACCOUNTS.find(function (a) { return a.id === state.linkedAccount; });
                addVirtualCard({
                    name: state.businessName,
                    cardholder: state.cardholder,
                    account: acc.display,
                    color: '#122a3d'
                });
                showSuccess();
            }
        });

        backBtn.addEventListener('click', function () {
            if (state.step > 1) {
                state.step -= 1;
                renderStep();
            }
        });

        cancelBtn.addEventListener('click', function () {
            window.location.href = 'Cards.html';
        });

        function showSuccess() {
            var isPhysical = state.cardType === 'physical';
            root.innerHTML =
                '<div class="ma-success-wrap">' +
                '<div class="ma-success-icon"><div class="ma-success-icon-inner">' +
                '<svg width="30" height="30" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
                '</div></div>' +
                '<div class="ma-success-title">' + (isPhysical ? 'Physical Debit Card ordered' : 'Virtual Debit Card created') + '</div>' +
                '</div>' +
                '<div class="ma-actions"><a class="ma-btn-primary" href="Cards.html">Done</a></div>';
        }

        renderStep();
    }

    /* ---------------- Boot ---------------- */

    document.addEventListener('DOMContentLoaded', function () {
        startClock();
        initSheets();
        initCreateMessage();
        initSecureMessages();
        initCards();
        initAddVirtualCard();
    });

    window.MobileApp = { money: money };
})();
