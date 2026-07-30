document.addEventListener('DOMContentLoaded', function () {
    var root = document.getElementById('savings-wizard-root');
    if (!root) return;

    var ACCOUNT_TYPES = {
        flexible: {
            name: 'Business Flexible Savings Account',
            blurb: 'Earn interest with access to your money immediately.',
            why: 'Choose this account if you need same-day access to your savings while still earning interest.',
            noticePeriod: 'None (available immediately)',
            nominal: '1.75%',
            effective: '1.76%'
        },
        notice32: {
            name: '32-Day Notice Account',
            blurb: 'Maximise your interest with our 32-day Notice Account.',
            why: 'Choose this account if you can give 32 days’ notice before withdrawing, in exchange for a higher interest rate.',
            noticePeriod: '32 days',
            nominal: '6.25%',
            effective: '6.43%'
        }
    };

    var state = {
        accountType: null,
        interestOption: 'reinvest'
    };

    function todayFormatted() {
        var d = new Date();
        return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    }

    function render(html) {
        root.innerHTML = html;
    }

    function progressBar(step, total) {
        var out = '<div class="nl-wizard-progress">';
        for (var i = 1; i <= total; i++) {
            out += '<span class="' + (i <= step ? 'done' : '') + '"></span>';
        }
        out += '</div>';
        return out;
    }

    function topbar(title, onBack) {
        return '<div class="nl-wizard-topbar">' +
            '<button class="back-button" id="wizard-back-btn"><span class="material-icons-sharp">arrow_back</span></button>' +
            '<h2>' + title + '</h2>' +
            '</div>';
    }

    function wireBack(handler) {
        var btn = document.getElementById('wizard-back-btn');
        if (btn) btn.addEventListener('click', handler);
    }

    function exitWizard() {
        window.location.href = 'Explore.html';
    }

    // -------- Step 1: choose account type --------
    function renderAccountTypeStep() {
        render(
            '<div class="nl-wizard-screen">' +
            topbar('Savings account', exitWizard) +
            '<div class="nl-wizard-step-label">Step 1 of 3: <b>Choose a savings account type</b></div>' +
            progressBar(1, 3) +
            '<div class="nl-wizard-body">' +
            Object.keys(ACCOUNT_TYPES).map(function (key) {
                var acc = ACCOUNT_TYPES[key];
                var selected = state.accountType === key;
                return '<div class="nl-wizard-radio-option' + (selected ? ' selected' : '') + '" data-account-key="' + key + '">' +
                    '<div class="nl-wizard-radio-row">' +
                    '<div><div class="nl-wizard-radio-title">' + acc.name + '</div><div class="nl-wizard-radio-desc">' + acc.blurb + '</div></div>' +
                    '<div class="nl-wizard-radio-circle"></div>' +
                    '</div>' +
                    '<hr class="nl-wizard-divider">' +
                    '<div class="nl-wizard-why-row">' +
                    '<button class="nl-wizard-why-link" type="button" data-why-key="' + key + '">Why choose this account?</button>' +
                    '<button class="nl-wizard-info-btn" type="button" data-why-key="' + key + '"><span class="material-icons-sharp">info</span></button>' +
                    '</div>' +
                    '</div>';
            }).join('') +
            '<button class="nl-wizard-link-row" type="button" id="compare-rates-btn">Compare interest rates <span class="material-icons-sharp">chevron_right</span></button>' +
            '</div>' +
            '<div class="nl-wizard-footer">' +
            '<button class="nl-wizard-btn-primary" id="wizard-next-btn" ' + (state.accountType ? '' : 'disabled') + '>Next</button>' +
            '</div>' +
            '</div>'
        );
        wireBack(exitWizard);
        document.querySelectorAll('.nl-wizard-radio-option').forEach(function (el) {
            el.addEventListener('click', function (e) {
                if (e.target.closest('.nl-wizard-why-link, .nl-wizard-info-btn')) return;
                state.accountType = el.dataset.accountKey;
                renderAccountTypeStep();
            });
        });
        document.querySelectorAll('[data-why-key]').forEach(function (el) {
            el.addEventListener('click', function (e) {
                e.stopPropagation();
                alert(ACCOUNT_TYPES[el.dataset.whyKey].why);
            });
        });
        document.getElementById('compare-rates-btn').addEventListener('click', renderCompareRatesStep);
        var nextBtn = document.getElementById('wizard-next-btn');
        nextBtn.addEventListener('click', function () {
            if (!state.accountType) return;
            renderInterestOptionStep();
        });
    }

    // -------- Compare interest rates (reachable from step 1) --------
    function renderCompareRatesStep() {
        var brackets = {
            '0-24999': { label: 'R0 – R24 999', flexible: { nominal: '1.75%', effective: '1.76%' }, notice32: { nominal: '6.25%', effective: '6.43%' } },
            '25000-99999': { label: 'R25 000 – R99 999', flexible: { nominal: '2.10%', effective: '2.12%' }, notice32: { nominal: '6.65%', effective: '6.85%' } },
            '100000+': { label: 'R100 000+', flexible: { nominal: '2.55%', effective: '2.58%' }, notice32: { nominal: '7.10%', effective: '7.35%' } }
        };
        var selectedBracket = null;

        function renderTable() {
            var rates = selectedBracket ? brackets[selectedBracket] : brackets['0-24999'];
            var goalLine = selectedBracket
                ? 'Rates shown for a balance in the ' + brackets[selectedBracket].label + ' range.'
                : 'No savings goal selected.';
            return '<div class="nl-wizard-helper-text">' + goalLine + '</div>' +
                '<div class="nl-wizard-table">' +
                '<div class="nl-wizard-table-row header"><span>Notice period</span><span>Nominal</span><span>Effective</span></div>' +
                '<div class="nl-wizard-table-row"><span>Business Flexible</span><span>' + rates.flexible.nominal + '</span><span>' + rates.flexible.effective + '</span></div>' +
                '<div class="nl-wizard-table-row"><span>32-day Notice</span><span>' + rates.notice32.nominal + '</span><span>' + rates.notice32.effective + '</span></div>' +
                '</div>';
        }

        render(
            '<div class="nl-wizard-screen">' +
            topbar('Compare interest rates', renderAccountTypeStep) +
            '<div class="nl-wizard-body">' +
            '<div class="nl-wizard-card">' +
            '<label class="nl-wizard-detail-label" for="savings-goal-select">Savings goal</label>' +
            '<select class="nl-wizard-select" id="savings-goal-select" style="margin-top: 8px;">' +
            '<option value="">Choose amount</option>' +
            '<option value="0-24999">R0 – R24 999</option>' +
            '<option value="25000-99999">R25 000 – R99 999</option>' +
            '<option value="100000+">R100 000+</option>' +
            '</select>' +
            '<div class="nl-wizard-helper-text" style="margin-bottom: 0;">Choose an amount to see the interest you can earn.</div>' +
            '</div>' +
            '<div id="rates-table-container">' + renderTable() + '</div>' +
            '<h4 style="color:#16232f; margin: 20px 0 10px;">Interest rate types</h4>' +
            '<div class="nl-wizard-card">' +
            '<p style="margin:0; font-size:0.9rem; color:#2d3748; line-height:1.5;">You will earn interest on the money in your 32-Day Notice Account every day. This interest adds up and is paid to you monthly. No monthly fees apply.</p>' +
            '<h5 style="margin:14px 0 4px; color:#16232f;">Nominal vs Effective</h5>' +
            '<p style="margin:0; font-size:0.9rem; color:#2d3748; line-height:1.5;">The nominal rate is the stated annual rate. The effective rate includes the impact of interest being compounded monthly, so it is slightly higher.</p>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
        wireBack(renderAccountTypeStep);
        document.getElementById('savings-goal-select').addEventListener('change', function (e) {
            selectedBracket = e.target.value || null;
            document.getElementById('rates-table-container').innerHTML = renderTable();
        });
    }

    // -------- Step 2: interest option --------
    function renderInterestOptionStep() {
        var acc = ACCOUNT_TYPES[state.accountType];
        render(
            '<div class="nl-wizard-screen">' +
            topbar(acc.name, renderAccountTypeStep) +
            '<div class="nl-wizard-step-label">Step 2 of 3: <b>Choose interest option</b></div>' +
            progressBar(2, 3) +
            '<div class="nl-wizard-body">' +
            '<div class="nl-wizard-helper-text" style="font-size:1.05rem; font-weight:600;">What would you like to do with the interest earned every month?</div>' +
            '<div class="nl-wizard-radio-option selected">' +
            '<div class="nl-wizard-radio-row">' +
            '<div><div class="nl-wizard-radio-title">Reinvest interest</div><div class="nl-wizard-radio-desc">The monthly interest earned will be reinvested into this ' + acc.name + '.</div></div>' +
            '<div class="nl-wizard-radio-circle"></div>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="nl-wizard-footer">' +
            '<button class="nl-wizard-btn-primary" id="wizard-next-btn">Next</button>' +
            '</div>' +
            '</div>'
        );
        wireBack(renderAccountTypeStep);
        document.getElementById('wizard-next-btn').addEventListener('click', renderConfirmDetailsStep);
    }

    // -------- Step 3: confirm details --------
    function renderConfirmDetailsStep() {
        var acc = ACCOUNT_TYPES[state.accountType];
        render(
            '<div class="nl-wizard-screen">' +
            topbar('Confirm details', renderInterestOptionStep) +
            '<div class="nl-wizard-step-label">Step 3 of 3: <b>' + acc.name.replace(' Account', '') + ' details</b></div>' +
            progressBar(3, 3) +
            '<div class="nl-wizard-body">' +
            '<div class="nl-wizard-hero"><span class="material-icons-sharp">savings</span></div>' +
            '<div class="nl-wizard-card">' +
            '<div class="nl-wizard-heading" style="font-size:1.1rem; margin-bottom:10px;">Account details</div>' +
            '<div class="nl-wizard-detail-row"><span class="nl-wizard-detail-label">Account type</span><span class="nl-wizard-detail-value">' + acc.name + '</span></div>' +
            '<div class="nl-wizard-detail-row"><span class="nl-wizard-detail-label">Notice period</span><span class="nl-wizard-detail-value">' + acc.noticePeriod + '</span></div>' +
            '<div class="nl-wizard-detail-row"><span class="nl-wizard-detail-label">Date created</span><span class="nl-wizard-detail-value">' + todayFormatted() + '</span></div>' +
            '</div>' +
            '</div>' +
            '<div class="nl-wizard-footer">' +
            '<button class="nl-wizard-btn-primary" id="wizard-confirm-btn">Confirm</button>' +
            '<button class="nl-wizard-btn-secondary" id="wizard-cancel-btn">Cancel</button>' +
            '</div>' +
            '</div>'
        );
        wireBack(renderInterestOptionStep);
        document.getElementById('wizard-confirm-btn').addEventListener('click', renderDisclosuresStep);
        document.getElementById('wizard-cancel-btn').addEventListener('click', exitWizard);
    }

    // -------- Disclosures --------
    function renderDisclosuresStep() {
        render(
            '<div class="nl-wizard-screen">' +
            topbar('Disclosures', renderConfirmDetailsStep) +
            '<div class="nl-wizard-body">' +
            '<div class="nl-wizard-hero"><span class="material-icons-sharp">verified</span></div>' +
            '<div class="nl-wizard-heading">Important information</div>' +
            '<div class="nl-wizard-card">' +
            '<ul style="margin:0; padding-left: 18px; color:#2d3748; font-size:0.95rem; line-height:1.8;">' +
            '<li>You will earn interest at our current rates, which can change over time.</li>' +
            '<li>The interest rates will depend on the notice deposit account balance.</li>' +
            '<li>You must give 32 days’ notice before withdrawing from a 32-Day Notice Account.</li>' +
            '</ul>' +
            '</div>' +
            '</div>' +
            '<div class="nl-wizard-footer">' +
            '<button class="nl-wizard-btn-primary" id="wizard-view-agreement-btn">View agreement</button>' +
            '<button class="nl-wizard-btn-secondary" id="wizard-cancel-btn">Cancel</button>' +
            '</div>' +
            '</div>'
        );
        wireBack(renderConfirmDetailsStep);
        document.getElementById('wizard-view-agreement-btn').addEventListener('click', renderAgreementStep);
        document.getElementById('wizard-cancel-btn').addEventListener('click', exitWizard);
    }

    // -------- Agreement --------
    function renderAgreementStep() {
        render(
            '<div class="nl-wizard-screen">' +
            topbar('Agreement', renderDisclosuresStep) +
            '<div class="nl-wizard-body">' +
            '<div class="nl-wizard-card nl-wizard-agreement-text">' +
            '<h3>Investment Account Opening Agreement</h3>' +
            '<h4>Applicant Details</h4>' +
            '<p>Full Names: Omphile</p>' +
            '<p>Surname: Mohlala</p>' +
            '<p>ID/Passport Number: 0105185435085</p>' +
            '<h4>Business Details</h4>' +
            '<p>Trading Name: GlobalBiz</p>' +
            '<h4>Contact Details</h4>' +
            '<p>Residential Address: 1 Leeuw Street, Rosettenville, Gauteng, 2190</p>' +
            '<p>Business Address: 1 Leeuw Street, Rosettenville, Gauteng, 2190</p>' +
            '</div>' +
            '</div>' +
            '<div class="nl-wizard-footer">' +
            '<label class="nl-wizard-checkbox-row">' +
            '<input type="checkbox" id="agreement-checkbox">' +
            '<span>I have read and understand the terms of the Investment Account Opening Agreement. By continuing, I accept the terms of the agreement and electronically sign the agreement by entering my app PIN/Biometric.</span>' +
            '</label>' +
            '<button class="nl-wizard-btn-primary" id="wizard-agree-continue-btn" disabled>Continue</button>' +
            '</div>' +
            '</div>'
        );
        wireBack(renderDisclosuresStep);
        var checkbox = document.getElementById('agreement-checkbox');
        var continueBtn = document.getElementById('wizard-agree-continue-btn');
        checkbox.addEventListener('change', function () {
            continueBtn.disabled = !checkbox.checked;
        });
        continueBtn.addEventListener('click', function () {
            if (continueBtn.disabled) return;
            renderSuccessStep();
        });
    }

    // -------- Success --------
    function renderSuccessStep() {
        var acc = ACCOUNT_TYPES[state.accountType];
        render(
            '<div class="nl-wizard-screen">' +
            '<div class="nl-wizard-body" style="padding-top: 60px;">' +
            '<div class="payment-confirmation">' +
            '<div class="confirmation-icon success"><span class="material-icons-sharp">check_circle</span></div>' +
            '<h2>Account opened</h2>' +
            '<p>Your ' + acc.name + ' has been created and is ready to use.</p>' +
            '<div class="confirmation-actions">' +
            '<button class="primary-btn" id="wizard-done-btn">Done</button>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</div>'
        );
        document.getElementById('wizard-done-btn').addEventListener('click', exitWizard);
    }

    renderAccountTypeStep();
});
