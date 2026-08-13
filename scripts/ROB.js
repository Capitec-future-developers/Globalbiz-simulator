(function () {
    function $(id) {
        return document.getElementById(id);
    }

    function init() {
        var screens = {
            chooser: $('robScreenChooser'),
            loading: $('robScreenLoading'),
            application: $('robScreenApplication'),
            biztype: $('robScreenBizType'),
            idType: $('robScreenIdType'),
            signupForm: $('robScreenSignupForm'),
            privacy: $('robScreenPrivacy'),
            otp1: $('robScreenOtp1'),
            otpProcessing: $('robScreenOtpProcessing'),
            selfieIntro: $('robScreenSelfieIntro'),
            cameraPermission: $('robScreenCameraPermission'),
            selfieCapture: $('robScreenSelfieCapture'),
            repDetails: $('robScreenRepDetails'),
            tradingAddress1: $('robScreenTradingAddress1'),
            agreementSign1: $('robScreenAgreementSign1'),
            businessInfo: $('robScreenBusinessInfo'),
            agreementsList: $('robScreenAgreementsList'),
            esigModal: $('robScreenESigModal'),
            agreementDoc: $('robScreenAgreementDoc'),
            selfieSignReady: $('robScreenSelfieSignReady'),
            agreementSigned: $('robScreenAgreementSigned'),
            username: $('robScreenUsername'),
            profileCreated: $('robScreenProfileCreated'),
            smsNotif: $('robScreenSmsNotif'),
            accountSuccess: $('robScreenAccountSuccess'),
            obLogin: $('robScreenOBLogin'),
            welcomeLetter: $('robScreenWelcomeLetter'),
            otpBrowser: $('robScreenOtpBrowser'),
            newPassword: $('robScreenNewPassword'),
            pinCreate: $('robScreenPinCreate'),
            pinSuccess: $('robScreenPinSuccess'),
            remotePinLogin: $('robScreenRemotePinLogin'),
            disclaimer: $('robScreenDisclaimer'),
            disclaimerDetails: $('robScreenDisclaimerDetails'),
            manageBanking: $('robScreenManageBanking'),
            settingsLimits: $('robScreenSettingsLimits'),
            dashboard: $('robScreenDashboard')
        };

        if (!screens.chooser) return;

        var history = [];
        var current = 'chooser';

        function showScreen(name, opts) {
            opts = opts || {};
            if (!screens[name]) return;
            if (opts.record !== false && current !== name) {
                history.push(current);
            }
            current = name;
            Object.keys(screens).forEach(function (key) {
                if (screens[key]) screens[key].hidden = key !== name;
            });
        }

        function goBack(fallback) {
            var prev = history.pop();
            showScreen(prev || fallback || 'chooser', { record: false });
        }

        // ---------- Step 1-3: chooser / application / biztype (existing) ----------

        var forRow = $('robForRow');
        var getStartedBtn = $('robGetStarted');

        var mainOpts = document.querySelectorAll('#robMainToggle .rob-toggle-opt');
        mainOpts.forEach(function (opt) {
            opt.addEventListener('click', function () {
                mainOpts.forEach(function (o) { o.classList.remove('active'); });
                opt.classList.add('active');
                if (opt.getAttribute('data-value') === 'open') {
                    forRow.hidden = false;
                } else {
                    forRow.hidden = true;
                    getStartedBtn.hidden = true;
                }
            });
        });

        var forOpts = document.querySelectorAll('#robForToggle .rob-toggle-opt');
        forOpts.forEach(function (opt) {
            opt.addEventListener('click', function () {
                forOpts.forEach(function (o) { o.classList.remove('active'); });
                opt.classList.add('active');
                getStartedBtn.hidden = false;
            });
        });

        getStartedBtn.addEventListener('click', function () {
            showScreen('loading');
            setTimeout(function () {
                showScreen('application', { record: false });
            }, 1500);
        });

        var startNew = $('robStartNewApplication');
        if (startNew) {
            startNew.addEventListener('click', function () {
                showScreen('biztype');
            });
        }

        var resume = $('robResumeApplication');
        if (resume) {
            resume.addEventListener('click', function (e) { e.preventDefault(); });
        }

        ['robBizTypePrivate', 'robBizTypeOther'].forEach(function (id) {
            var el = $(id);
            if (el) el.addEventListener('click', function (e) { e.preventDefault(); });
        });

        var bizTypeSole = $('robBizTypeSole');
        if (bizTypeSole) {
            bizTypeSole.addEventListener('click', function () {
                showScreen('idType');
            });
        }

        // ---------- helpers ----------

        function enableWhen(button, checkFn, inputs) {
            function update() {
                button.disabled = !checkFn();
            }
            inputs.forEach(function (el) {
                el.addEventListener('input', update);
                el.addEventListener('change', update);
            });
            update();
        }

        function wireEyeToggles(root) {
            (root || document).querySelectorAll('.rob-eye-toggle').forEach(function (eye) {
                if (eye._wired) return;
                eye._wired = true;
                eye.addEventListener('click', function () {
                    var target = $(eye.getAttribute('data-target'));
                    if (!target) return;
                    if (target.type === 'password') {
                        target.type = 'text';
                        eye.textContent = 'visibility_off';
                    } else {
                        target.type = 'password';
                        eye.textContent = 'visibility';
                    }
                });
            });
        }
        wireEyeToggles(document);

        function keypadDigit(char, activeInput) {
            if (!activeInput) return;
            if (char === 'back') {
                activeInput.value = activeInput.value.slice(0, -1);
            } else if (char === 'go') {
                // no-op decorative
            } else {
                activeInput.value += char;
            }
            activeInput.dispatchEvent(new Event('input', { bubbles: true }));
        }

        document.querySelectorAll('.rob-keypad').forEach(function (pad) {
            pad.querySelectorAll('.rob-keypad-btn').forEach(function (btn) {
                btn.addEventListener('click', function () {
                    var screen = pad.closest('.rob-screen');
                    var activeInput = screen ? screen.querySelector('input[type="password"]:not([disabled]), input[type="password"]') : null;
                    var label = btn.textContent.trim();
                    if (btn.querySelector('.material-icons-sharp')) {
                        keypadDigit('back', activeInput);
                    } else if (label === 'Go') {
                        keypadDigit('go', activeInput);
                    } else {
                        keypadDigit(label, activeInput);
                    }
                });
            });
        });

        // ---------- STEP 4: ID type ----------

        var idTypeContinue = $('robIdTypeContinue');
        if (idTypeContinue) {
            idTypeContinue.addEventListener('click', function () {
                showScreen('signupForm');
            });
        }

        // ---------- STEP 5: Signup form ----------

        var cookieBanner = $('robCookieBanner');
        function dismissCookieBanner() { if (cookieBanner) cookieBanner.hidden = true; }
        ['robCookieClose', 'robCookieRead', 'robCookieAccept'].forEach(function (id) {
            var el = $(id);
            if (el) el.addEventListener('click', function (e) { e.preventDefault(); dismissCookieBanner(); });
        });

        var signupInputs = [$('robSignupSaId'), $('robSignupCell'), $('robSignupEmail'), $('robSignupEmailConfirm'), $('robSignupConsent')];
        var createProfileBtn = $('robCreateProfile');
        if (createProfileBtn) {
            enableWhen(createProfileBtn, function () {
                return $('robSignupSaId').value.trim() && $('robSignupCell').value.trim() &&
                    $('robSignupEmail').value.trim() && $('robSignupEmailConfirm').value.trim() &&
                    $('robSignupConsent').checked;
            }, signupInputs);
            createProfileBtn.addEventListener('click', function () {
                if (createProfileBtn.disabled) return;
                showScreen('privacy');
            });
        }

        // ---------- STEP 6: Privacy ----------

        var privacyBack = $('robPrivacyBack');
        if (privacyBack) privacyBack.addEventListener('click', function () { goBack('signupForm'); });
        var privacyContinue = $('robPrivacyContinue');
        if (privacyContinue) privacyContinue.addEventListener('click', function () { showScreen('otp1'); });

        // ---------- STEP 7/8: OTP (app) ----------

        var otp1Input = $('robOtp1Input');
        var otp1Submit = $('robOtp1Submit');
        if (otp1Submit && otp1Input) {
            enableWhen(otp1Submit, function () { return otp1Input.value.trim().length > 0; }, [otp1Input]);
            otp1Submit.addEventListener('click', function () {
                if (otp1Submit.disabled) return;
                showScreen('otpProcessing');
                setTimeout(function () {
                    showScreen('selfieIntro', { record: false });
                }, 1500);
            });
        }
        var otp1UpdateCell = $('robOtp1UpdateCell');
        if (otp1UpdateCell) otp1UpdateCell.addEventListener('click', function () { /* simulated, no-op */ });
        var otp1Cancel = $('robOtp1Cancel');
        if (otp1Cancel) otp1Cancel.addEventListener('click', function (e) { e.preventDefault(); goBack('privacy'); });

        // simple OTP countdown for step 7
        (function () {
            var timerEl = $('robOtp1Timer');
            if (!timerEl) return;
            var seconds = 120;
            setInterval(function () {
                if (screens.otp1.hidden) return;
                seconds = seconds > 0 ? seconds - 1 : 120;
                var m = Math.floor(seconds / 60);
                var s = seconds % 60;
                timerEl.textContent = 'Time left to enter OTP: ' + (m < 10 ? '0' + m : m) + ':' + (s < 10 ? '0' + s : s);
            }, 1000);
        })();

        // ---------- STEP 9: Selfie intro ----------

        var selfieIntroNext = $('robSelfieIntroNext');
        if (selfieIntroNext) selfieIntroNext.addEventListener('click', function () { showScreen('cameraPermission'); });

        // ---------- STEP 10: Camera permission ----------

        ['robCamAllowAlways', 'robCamAllowOnce'].forEach(function (id) {
            var el = $(id);
            if (el) el.addEventListener('click', function () { showScreen('selfieCapture'); });
        });
        var camNever = $('robCamNeverAllow');
        if (camNever) camNever.addEventListener('click', function () { goBack('selfieIntro'); });

        // ---------- STEP 11: Selfie capture ----------

        var selfieCaptureBtn = $('robSelfieCaptureBtn');
        if (selfieCaptureBtn) {
            selfieCaptureBtn.addEventListener('click', function () {
                selfieCaptureBtn.disabled = true;
                setTimeout(function () {
                    selfieCaptureBtn.disabled = false;
                    showScreen('repDetails', { record: false });
                }, 1200);
            });
        }
        var selfieCaptureCancel = $('robSelfieCaptureCancel');
        if (selfieCaptureCancel) selfieCaptureCancel.addEventListener('click', function (e) { e.preventDefault(); showScreen('selfieIntro', { record: false }); });

        // ---------- STEP 12: Representative details ----------

        var addHomeAddress = $('robAddHomeAddress');
        var homeAddressFields = $('robHomeAddressFields');
        var homeAddressInput = $('robHomeAddressInput');
        var repDetailsNext = $('robRepDetailsNext');
        if (addHomeAddress) {
            addHomeAddress.addEventListener('click', function (e) {
                e.preventDefault();
                homeAddressFields.hidden = false;
                addHomeAddress.hidden = true;
            });
        }
        if (repDetailsNext && homeAddressInput) {
            enableWhen(repDetailsNext, function () { return homeAddressInput.value.trim().length > 0; }, [homeAddressInput]);
            repDetailsNext.addEventListener('click', function () {
                if (repDetailsNext.disabled) return;
                showScreen('tradingAddress1');
            });
        }

        // ---------- STEP 13/14: Trading address ----------

        var tradingAddrSame = $('robTradingAddrSame');
        var tradingAddr1Next = $('robTradingAddr1Next');
        var addDifferentTradingAddr = $('robAddDifferentTradingAddr');
        if (tradingAddr1Next && tradingAddrSame) {
            enableWhen(tradingAddr1Next, function () { return tradingAddrSame.checked; }, [tradingAddrSame]);
            tradingAddr1Next.addEventListener('click', function () {
                if (tradingAddr1Next.disabled) return;
                showScreen('agreementSign1');
            });
        }
        if (addDifferentTradingAddr) {
            addDifferentTradingAddr.addEventListener('click', function (e) { e.preventDefault(); });
        }

        // ---------- STEP 15: Agreement sign 1 ----------

        var agreementSign1Back = $('robAgreementSign1Back');
        if (agreementSign1Back) agreementSign1Back.addEventListener('click', function () { goBack('tradingAddress1'); });

        function formattedNow() {
            var d = new Date();
            return d.toLocaleDateString() + ' ' + d.toLocaleTimeString();
        }

        var agreementSign1Btn = $('robAgreementSign1Btn');
        if (agreementSign1Btn) {
            agreementSign1Btn.addEventListener('click', function () {
                var dt = $('robAgreementSign1DateTime');
                if (dt) dt.textContent = 'Date and Time: ' + formattedNow();
                showScreen('businessInfo');
            });
        }

        // ---------- STEP 16: Business information ----------

        var businessInfoInputs = [$('robSectorSelect'), $('robSourceFundsSelect'), $('robTurnoverInput'), $('robEmployeesInput')];
        var taxSaRadios = document.querySelectorAll('input[name="robTaxSa"]');
        var businessInfoNext = $('robBusinessInfoNext');
        if (businessInfoNext) {
            var businessInfoAllInputs = businessInfoInputs.concat(Array.prototype.slice.call(taxSaRadios));
            enableWhen(businessInfoNext, function () {
                var taxSaChecked = false;
                taxSaRadios.forEach(function (r) { if (r.checked) taxSaChecked = true; });
                return $('robSectorSelect').value && $('robSourceFundsSelect').value &&
                    $('robTurnoverInput').value.trim() && $('robEmployeesInput').value.trim() && taxSaChecked;
            }, businessInfoAllInputs);
            businessInfoNext.addEventListener('click', function () {
                if (businessInfoNext.disabled) return;
                showScreen('agreementsList');
            });
        }

        // ---------- STEP 17: Agreements list (accordion) ----------

        document.querySelectorAll('#robAccordion .rob-accordion-head').forEach(function (head) {
            head.addEventListener('click', function () {
                var body = head.nextElementSibling;
                var chevron = head.querySelector('.rob-accordion-chevron');
                var isOpen = head.classList.contains('expanded');
                head.classList.toggle('expanded', !isOpen);
                body.hidden = isOpen;
                if (chevron) chevron.textContent = isOpen ? 'expand_more' : 'expand_less';
            });
        });

        var agreementsListCheck = $('robAgreementsListCheck');
        var agreementsListContinue = $('robAgreementsListContinue');
        if (agreementsListContinue && agreementsListCheck) {
            enableWhen(agreementsListContinue, function () { return agreementsListCheck.checked; }, [agreementsListCheck]);
            agreementsListContinue.addEventListener('click', function () {
                if (agreementsListContinue.disabled) return;
                showScreen('esigModal');
            });
        }

        // ---------- STEP 18: E-signature modal ----------

        var esigCancel = $('robESigCancel');
        if (esigCancel) esigCancel.addEventListener('click', function () { goBack('agreementsList'); });
        var esigContinue = $('robESigContinue');
        if (esigContinue) esigContinue.addEventListener('click', function () { showScreen('agreementDoc'); });

        // ---------- STEP 19/20: Agreement document ----------

        var agreementDocBack = $('robAgreementDocBack');
        if (agreementDocBack) agreementDocBack.addEventListener('click', function () { goBack('esigModal'); });
        var esigToastClose = $('robEsigToastClose');
        if (esigToastClose) esigToastClose.addEventListener('click', function () { $('robEsigToast').hidden = true; });
        var agreementDocContinue = $('robAgreementDocContinue');
        if (agreementDocContinue) agreementDocContinue.addEventListener('click', function () { showScreen('selfieSignReady'); });

        // ---------- STEP 21: Selfie sign ready ----------

        var selfieSignReadyBtn = $('robSelfieSignReadyBtn');
        if (selfieSignReadyBtn) {
            selfieSignReadyBtn.addEventListener('click', function () {
                selfieSignReadyBtn.disabled = true;
                setTimeout(function () {
                    selfieSignReadyBtn.disabled = false;
                    var dt = $('robAgreementSignedDateTime');
                    if (dt) dt.textContent = 'Date and Time: ' + formattedNow();
                    showScreen('agreementSigned', { record: false });
                }, 1200);
            });
        }
        var selfieSignReadyCancel = $('robSelfieSignReadyCancel');
        if (selfieSignReadyCancel) selfieSignReadyCancel.addEventListener('click', function (e) { e.preventDefault(); goBack('agreementDoc'); });

        // ---------- STEP 22/23: Signed agreement ----------

        var agreementSignedDone = $('robAgreementSignedDone');
        if (agreementSignedDone) agreementSignedDone.addEventListener('click', function () { showScreen('username'); });

        // ---------- STEP 24: Username ----------

        var usernameDifferentCheck = $('robUsernameDifferentCheck');
        var usernameDifferentField = $('robUsernameDifferentField');
        if (usernameDifferentCheck) {
            usernameDifferentCheck.addEventListener('change', function () {
                usernameDifferentField.hidden = !usernameDifferentCheck.checked;
            });
        }
        var usernameNext = $('robUsernameNext');
        if (usernameNext) usernameNext.addEventListener('click', function () { showScreen('profileCreated'); });

        // ---------- STEP 25: Profile created ----------

        var profileCreatedContinue = $('robProfileCreatedContinue');
        if (profileCreatedContinue) profileCreatedContinue.addEventListener('click', function () { showScreen('smsNotif'); });

        // ---------- STEP 26: SMS notification lock screen ----------

        ['robNotif1', 'robNotif2', 'robSmsNotifContinue'].forEach(function (id) {
            var el = $(id);
            if (el) el.addEventListener('click', function () { showScreen('accountSuccess'); });
        });
        var smsNotifClear = $('robSmsNotifClear');
        if (smsNotifClear) {
            smsNotifClear.addEventListener('click', function () {
                ['robNotif1', 'robNotif2'].forEach(function (id) {
                    var n = $(id);
                    if (n) n.style.visibility = 'hidden';
                });
            });
        }

        // ---------- STEP 27: Account success ----------

        var goToOnlineBanking = $('robGoToOnlineBanking');
        if (goToOnlineBanking) {
            goToOnlineBanking.addEventListener('click', function () {
                showScreen('loading');
                setTimeout(function () {
                    showScreen('obLogin', { record: false });
                }, 1200);
            });
        }

        // ---------- STEP 28: Online banking login ----------

        var otpBrowserNext = 'newPassword';

        function setOtpBrowserContext(title, sub, nextKey) {
            $('robOtpBrowserTitle').textContent = title;
            $('robOtpBrowserSub').textContent = sub;
            $('robOtpBrowserInput').value = '';
            $('robOtpBrowserSubmit').disabled = true;
            otpBrowserNext = nextKey;
        }

        var obSignIn = $('robOBSignIn');
        if (obSignIn) {
            obSignIn.addEventListener('click', function () {
                var toast = $('robPasswordResetToast');
                var cameFromReset = toast && !toast.hidden;
                if (toast) toast.hidden = true;
                if (cameFromReset) {
                    // Step 33->34: re-login after a password reset leads straight
                    // into the final OTP screen before Remote PIN creation.
                    setOtpBrowserContext('Verification', 'An OTP has been sent to your registered mobile number.', 'pinCreate');
                    showScreen('otpBrowser');
                } else {
                    showScreen('welcomeLetter');
                }
            });
        }

        // ---------- STEP 29: Welcome letter ----------

        var welcomeLetterContinue = $('robWelcomeLetterContinue');
        if (welcomeLetterContinue) {
            welcomeLetterContinue.addEventListener('click', function () {
                setOtpBrowserContext('OTP Verification', 'An OTP has been sent to your registered mobile number.', 'newPassword');
                showScreen('otpBrowser');
            });
        }

        // ---------- Shared browser OTP screen (steps 30/31, 33, 34) ----------

        var otpBrowserInput = $('robOtpBrowserInput');
        var otpBrowserSubmit = $('robOtpBrowserSubmit');
        if (otpBrowserSubmit && otpBrowserInput) {
            enableWhen(otpBrowserSubmit, function () { return otpBrowserInput.value.trim().length > 0; }, [otpBrowserInput]);
            otpBrowserSubmit.addEventListener('click', function () {
                if (otpBrowserSubmit.disabled) return;
                if (otpBrowserNext === 'newPassword') {
                    showScreen('newPassword');
                } else if (otpBrowserNext === 'relogin') {
                    var toast = $('robPasswordResetToast');
                    if (toast) toast.hidden = false;
                    $('robOBUsername').value = 'Mariskarossouw5@gmail.com';
                    $('robOBPassword').value = '';
                    showScreen('obLogin', { record: false });
                } else if (otpBrowserNext === 'pinCreate') {
                    showScreen('pinCreate');
                }
            });
        }
        var otpBrowserResend = $('robOtpBrowserResend');
        if (otpBrowserResend) otpBrowserResend.addEventListener('click', function (e) { e.preventDefault(); });

        // ---------- STEP 32: New password ----------

        var newPassword1 = $('robNewPassword1');
        var newPassword2 = $('robNewPassword2');
        var resetPasswordBtn = $('robResetPasswordBtn');
        if (resetPasswordBtn && newPassword1 && newPassword2) {
            enableWhen(resetPasswordBtn, function () {
                return newPassword1.value.trim().length >= 8 && newPassword1.value === newPassword2.value;
            }, [newPassword1, newPassword2]);
            resetPasswordBtn.addEventListener('click', function () {
                if (resetPasswordBtn.disabled) return;
                setOtpBrowserContext('Verification', 'An OTP has been sent to your registered mobile number.', 'relogin');
                showScreen('otpBrowser');
            });
        }
        var resetPasswordCancel = $('robResetPasswordCancel');
        if (resetPasswordCancel) resetPasswordCancel.addEventListener('click', function () { goBack('otpBrowser'); });

        // ---------- STEP 35: Create Remote PIN ----------

        var pin1 = $('robPin1');
        var pin2 = $('robPin2');
        var pinCreateBtn = $('robPinCreateBtn');
        if (pinCreateBtn && pin1 && pin2) {
            enableWhen(pinCreateBtn, function () {
                var re = /^\d{5,6}$/;
                return re.test(pin1.value) && pin1.value === pin2.value;
            }, [pin1, pin2]);
            pinCreateBtn.addEventListener('click', function () {
                if (pinCreateBtn.disabled) return;
                showScreen('pinSuccess');
            });
        }

        // ---------- STEP 36: PIN success ----------

        var pinSuccessSignIn = $('robPinSuccessSignIn');
        if (pinSuccessSignIn) pinSuccessSignIn.addEventListener('click', function () { showScreen('remotePinLogin'); });

        // ---------- STEP 37: Remote PIN login ----------

        var remotePinInput = $('robRemotePinInput');
        var remotePinSubmit = $('robRemotePinSubmit');
        if (remotePinSubmit && remotePinInput) {
            enableWhen(remotePinSubmit, function () { return remotePinInput.value.trim().length >= 5; }, [remotePinInput]);
            remotePinSubmit.addEventListener('click', function () {
                if (remotePinSubmit.disabled) return;
                showScreen('disclaimer');
            });
        }

        // ---------- STEP 38: Disclaimer ----------

        var viewDisclaimerDetails = $('robViewDisclaimerDetails');
        if (viewDisclaimerDetails) viewDisclaimerDetails.addEventListener('click', function () { showScreen('disclaimerDetails'); });
        var disclaimerAccept = $('robDisclaimerAccept');
        if (disclaimerAccept) disclaimerAccept.addEventListener('click', function () { showScreen('manageBanking'); });
        var disclaimerCancel = $('robDisclaimerCancel');
        if (disclaimerCancel) disclaimerCancel.addEventListener('click', function () { goBack('remotePinLogin'); });

        // ---------- STEP 39: Disclaimer details ----------

        var disclaimerDetailsBack = $('robDisclaimerDetailsBack');
        if (disclaimerDetailsBack) disclaimerDetailsBack.addEventListener('click', function () { goBack('disclaimer'); });
        var disclaimerDetailsAccept = $('robDisclaimerDetailsAccept');
        if (disclaimerDetailsAccept) disclaimerDetailsAccept.addEventListener('click', function () { showScreen('manageBanking'); });

        // ---------- STEP 40: Manage banking ----------

        var setupLimitsNow = $('robSetupLimitsNow');
        if (setupLimitsNow) setupLimitsNow.addEventListener('click', function (e) { e.preventDefault(); showScreen('settingsLimits'); });
        var startTransacting = $('robStartTransacting');
        if (startTransacting) startTransacting.addEventListener('click', function (e) { e.preventDefault(); showScreen('dashboard'); });

        // ---------- STEP 41: Settings limits ----------

        var settingsLimitsBack = $('robSettingsLimitsBack');
        if (settingsLimitsBack) settingsLimitsBack.addEventListener('click', function () { goBack('dashboard'); });
        var editAccountLimit = $('robEditAccountLimit');
        var accountLimitEditField = $('robAccountLimitEditField');
        if (editAccountLimit) {
            editAccountLimit.addEventListener('click', function (e) {
                e.preventDefault();
                accountLimitEditField.hidden = false;
            });
        }
        var accountLimitSave = $('robAccountLimitSave');
        if (accountLimitSave) {
            accountLimitSave.addEventListener('click', function () {
                var val = $('robAccountLimitInput').value.trim();
                if (val) {
                    $('robAccountLimitValue').textContent = (val.charAt(0) === 'R' ? val : 'R' + val);
                }
                accountLimitEditField.hidden = true;
                var toast = $('robLimitToast');
                toast.hidden = false;
                setTimeout(function () { toast.hidden = true; }, 2500);
            });
        }
        var settingsLimitsDone = $('robSettingsLimitsDone');
        if (settingsLimitsDone) settingsLimitsDone.addEventListener('click', function () { showScreen('dashboard'); });

        // ---------- STEP 42: Dashboard ----------

        var whatNextClose = $('robWhatNextClose');
        if (whatNextClose) whatNextClose.addEventListener('click', function () { $('robWhatNextCard').hidden = true; });
        var setupAccountLimitsRow = $('robSetupAccountLimitsRow');
        if (setupAccountLimitsRow) setupAccountLimitsRow.addEventListener('click', function () { showScreen('settingsLimits'); });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
