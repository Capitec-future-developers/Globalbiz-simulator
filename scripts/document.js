/* Documents screen (new look, App/document.html). */
document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    var body = document.getElementById('maDocsBody');
    if (!body) return;

    var docType = 'Account Confirmation Letter';
    var accountName = 'Current';
    var accountNumber = '1053 2681 65';
    var generated = false;

    function selectRow(rows, selectedRow) {
        rows.forEach(function (r) { r.classList.remove('ma-radio-row-selected'); });
        selectedRow.classList.add('ma-radio-row-selected');
    }

    /* ---------------- Generate documents ---------------- */

    var generateCard = document.getElementById('maGenerateCard');

    function renderGenerateCard() {
        generateCard.innerHTML =
            '<div class="ma-card-row"><h3>Generate documents</h3></div>' +
            '<label class="ma-field-label">Document type</label>' +
            ['Account Confirmation Letter', 'Settle Quote', 'Stamped Statements', 'IT3b Statements'].map(function (t, idx) {
                return '<div class="ma-radio-row' + (t === docType ? ' ma-radio-row-selected' : '') + ' ma-doc-type-row"' +
                    (idx === 0 ? ' id="doc-type"' : '') + ' data-doc-type="' + t + '">' +
                    '<span class="ma-radio-row-label">' + t + '</span>' +
                    '<span class="ma-radio-dot"><span class="ma-radio-dot-fill"></span></span></div>';
            }).join('') +
            '<div class="ma-field"><label class="ma-field-label">Account</label>' +
            ['Current|1053 2681 65', 'Notice Deposit|4100 2538 34'].map(function (a, idx) {
                var parts = a.split('|');
                return '<div class="ma-radio-row' + (parts[0] === accountName ? ' ma-radio-row-selected' : '') + '"' +
                    (idx === 0 ? ' id="account-choice"' : '') + ' data-account-name="' + parts[0] + '" data-account-number="' + parts[1] + '">' +
                    '<span class="ma-radio-row-label">' + parts[0] + ' &middot; ' + parts[1] + '</span>' +
                    '<span class="ma-radio-dot"><span class="ma-radio-dot-fill"></span></span></div>';
            }).join('') +
            '</div>' +
            '<div class="ma-actions"><button class="ma-btn-primary" id="generate-btn" type="button">Generate</button></div>';

        var btn = document.getElementById('generate-btn');
        btn.addEventListener('click', startGenerate);

        generateCard.querySelectorAll('.ma-doc-type-row').forEach(function (row) {
            row.addEventListener('click', function () {
                selectRow(generateCard.querySelectorAll('.ma-doc-type-row'), row);
                docType = row.getAttribute('data-doc-type');
            });
        });
        generateCard.querySelectorAll('[data-account-name]').forEach(function (row) {
            row.addEventListener('click', function () {
                selectRow(generateCard.querySelectorAll('[data-account-name]'), row);
                accountName = row.getAttribute('data-account-name');
                accountNumber = row.getAttribute('data-account-number');
            });
        });
    }

    function startGenerate() {
        var btn = document.getElementById('generate-btn');
        btn.disabled = true;
        btn.innerHTML = '<span class="ma-spinner"></span>Loading...';

        setTimeout(function () {
            generated = true;
            generateCard.innerHTML =
                '<div class="ma-success-wrap">' +
                '<div class="ma-success-icon"><div class="ma-success-icon-inner">' +
                '<svg width="30" height="30" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
                '</div></div>' +
                '<div class="ma-success-title">Document generated</div>' +
                '<p>' + docType + '<br>' + accountName + ' &middot; ' + accountNumber + '</p>' +
                '</div>' +
                '<div class="ma-actions">' +
                '<button class="ma-btn-primary" id="maDocEmailOpen" type="button">Email document</button>' +
                '<button class="ma-btn-outline" id="maDocDone" type="button">Done</button>' +
                '</div>';

            document.getElementById('maDocEmailOpen').addEventListener('click', openEmailScreen);
            document.getElementById('maDocDone').addEventListener('click', resetGenerateCard);
        }, 3000);
    }

    function resetGenerateCard() {
        generated = false;
        renderGenerateCard();
    }

    /* ---------------- Email document ---------------- */

    var emailScreen = document.getElementById('maDocEmailScreen');

    function openEmailScreen() {
        emailScreen.classList.add('visible');
    }

    function closeEmailScreen() {
        emailScreen.classList.remove('visible');
    }

    document.getElementById('maDocEmailBack').addEventListener('click', closeEmailScreen);
    document.getElementById('maDocEmailCancel').addEventListener('click', closeEmailScreen);

    document.getElementById('maDocEmailSend').addEventListener('click', function () {
        var email = document.getElementById('maDocEmailInput').value.trim();
        if (!email) return;
        var label = docType === 'Stamped Statements' ? 'Stamped Bank Statement' : docType;
        closeEmailScreen();
        generateCard.innerHTML =
            '<div class="ma-success-wrap">' +
            '<div class="ma-success-icon"><div class="ma-success-icon-inner">' +
            '<svg width="30" height="30" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg>' +
            '</div></div>' +
            '<div class="ma-success-title">Document emailed</div>' +
            '<p>Your ' + label + ' has been emailed to ' + email + '.</p>' +
            '</div>' +
            '<div class="ma-actions"><button class="ma-btn-primary" id="maDocDone" type="button">Done</button></div>';
        document.getElementById('maDocDone').addEventListener('click', resetGenerateCard);
    });

    /* ---------------- Schedule Statements ---------------- */

    var scheduleSwitch = document.getElementById('maScheduleSwitch');
    var scheduleForm = document.getElementById('maScheduleForm');
    var scheduleSave = document.getElementById('maScheduleSave');

    scheduleSwitch.addEventListener('click', function () {
        var on = scheduleSwitch.classList.toggle('on');
        scheduleForm.style.display = on ? '' : 'none';
    });

    scheduleForm.querySelectorAll('[data-freq]').forEach(function (row) {
        row.addEventListener('click', function () {
            selectRow(scheduleForm.querySelectorAll('[data-freq]'), row);
        });
    });

    scheduleSave.addEventListener('click', function () {
        var email = document.getElementById('maScheduleEmail').value.trim();
        if (!email) return;
        scheduleSave.disabled = true;
        scheduleSave.innerHTML = '<span class="ma-spinner"></span>Saving...';
        setTimeout(function () {
            scheduleSave.innerHTML = 'Saved';
            scheduleSave.disabled = true;
            setTimeout(function () {
                scheduleSave.innerHTML = 'Save';
                scheduleSave.disabled = false;
            }, 2000);
        }, 1200);
    });

    renderGenerateCard();
});
