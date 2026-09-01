import React, { useState, useRef, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";



/* ------------------------------------------------------------------ */
/*  Small reusable bits                                               */
/* ------------------------------------------------------------------ */

function Icon({ children, className = "" }) {
    return <span className={`material-icons-sharp ${className}`}>{children}</span>;
}

function EyeToggle({ visible, onToggle }) {
    return (
        <span className="material-icons-sharp rob-eye-toggle" onClick={onToggle}>
      {visible ? "visibility_off" : "visibility"}
    </span>
    );
}

function Keypad({ onDigit, onBackspace, onGo }) {
    const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    return (
        <div className="rob-keypad">
            {digits.map((d) => (
                <button
                    type="button"
                    key={d}
                    className="rob-keypad-btn"
                    onClick={() => onDigit(d)}
                >
                    {d}
                </button>
            ))}
            <button type="button" className="rob-keypad-btn rob-keypad-btn-wide" onClick={onGo}>
                Go
            </button>
            <button type="button" className="rob-keypad-btn" onClick={() => onDigit("0")}>
                0
            </button>
            <button type="button" className="rob-keypad-btn" onClick={onBackspace}>
                <span className="material-icons-sharp">backspace</span>
            </button>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */

export default function ROB() {
    /* ---- navigation (mirrors showScreen / goBack / history stack) ---- */
    const [current, setCurrent] = useState("chooser");
    const historyRef = useRef([]);

    const showScreen = useCallback((name, opts = {}) => {
        setCurrent((prev) => {
            if (opts.record !== false && prev !== name) {
                historyRef.current.push(prev);
            }
            return name;
        });
    }, []);

    const goBack = useCallback((fallback) => {
        const prev = historyRef.current.pop();
        setCurrent(prev || fallback || "chooser");
    }, []);

    /* ---- STEP 1-3: chooser / application / biztype ---- */
    const [mainOpt, setMainOpt] = useState("signin");
    const [forOpt, setForOpt] = useState(null);

    const forRowVisible = mainOpt === "open";
    const getStartedVisible = forRowVisible && !!forOpt;

    const handleGetStarted = () => {
        showScreen("loading");
        setTimeout(() => showScreen("application", { record: false }), 1500);
    };

    /* ---- STEP 4: ID type ---- */
    const [idType, setIdType] = useState("said");

    /* ---- STEP 5: Signup form ---- */
    const [cookieBannerVisible, setCookieBannerVisible] = useState(true);
    const [signupSaId, setSignupSaId] = useState("");
    const [signupCell, setSignupCell] = useState("");
    const [signupEmail, setSignupEmail] = useState("");
    const [signupEmailConfirm, setSignupEmailConfirm] = useState("");
    const [signupConsent, setSignupConsent] = useState(false);
    const createProfileEnabled =
        signupSaId.trim() &&
        signupCell.trim() &&
        signupEmail.trim() &&
        signupEmailConfirm.trim() &&
        signupConsent;

    /* ---- STEP 6: Privacy ---- */
    const [privacyOffers, setPrivacyOffers] = useState(true);
    const [privacyMarketing, setPrivacyMarketing] = useState(true);

    /* ---- STEP 7/8: OTP (app) ---- */
    const [otp1Value, setOtp1Value] = useState("");
    const [otp1Visible, setOtp1Visible] = useState(false);
    const [otp1Seconds, setOtp1Seconds] = useState(120);

    useEffect(() => {
        if (current !== "otp1") return undefined;
        const id = setInterval(() => {
            setOtp1Seconds((s) => (s > 0 ? s - 1 : 120));
        }, 1000);
        return () => clearInterval(id);
    }, [current]);

    const otp1TimerText = (() => {
        const m = Math.floor(otp1Seconds / 60);
        const s = otp1Seconds % 60;
        return `Time left to enter OTP: ${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
    })();

    const handleOtp1Submit = () => {
        if (!otp1Value.trim()) return;
        showScreen("otpProcessing");
        setTimeout(() => showScreen("selfieIntro", { record: false }), 1500);
    };

    /* ---- STEP 11: Selfie capture ---- */
    const [selfieCaptureBusy, setSelfieCaptureBusy] = useState(false);
    const handleSelfieCapture = () => {
        setSelfieCaptureBusy(true);
        setTimeout(() => {
            setSelfieCaptureBusy(false);
            showScreen("repDetails", { record: false });
        }, 1200);
    };

    /* ---- STEP 12: Representative details ---- */
    const [addHomeAddressClicked, setAddHomeAddressClicked] = useState(false);
    const [homeAddress, setHomeAddress] = useState("");
    const [repTitle, setRepTitle] = useState("Ms");

    /* ---- STEP 13/14: Trading address ---- */
    const [tradingAddrSame, setTradingAddrSame] = useState(false);

    /* ---- STEP 15: Agreement sign 1 ---- */
    const [agreementSign1DateTime, setAgreementSign1DateTime] = useState("Date and Time");

    const formattedNow = () => {
        const d = new Date();
        return d.toLocaleDateString() + " " + d.toLocaleTimeString();
    };

    const handleAgreementSign1 = () => {
        setAgreementSign1DateTime("Date and Time: " + formattedNow());
        showScreen("businessInfo");
    };

    /* ---- STEP 16: Business information ---- */
    const [tradingName, setTradingName] = useState("");
    const [sector, setSector] = useState("");
    const [sourceFunds, setSourceFunds] = useState("");
    const [turnover, setTurnover] = useState("");
    const [employees, setEmployees] = useState("");
    const [taxSa, setTaxSa] = useState("");
    const [taxOther, setTaxOther] = useState("");
    const businessInfoEnabled =
        sector && sourceFunds && turnover.trim() && employees.trim() && taxSa;

    /* ---- STEP 17: Agreements list (accordion) ---- */
    const [accordionOpen, setAccordionOpen] = useState([true, true, false]);
    const toggleAccordion = (idx) =>
        setAccordionOpen((prev) => prev.map((v, i) => (i === idx ? !v : v)));
    const [agreementsListCheck, setAgreementsListCheck] = useState(false);

    /* ---- STEP 18: E-signature modal ---- */
    const [esigCheck, setEsigCheck] = useState(true);

    /* ---- STEP 19/20: Agreement document ---- */
    const [esigToastVisible, setEsigToastVisible] = useState(true);

    /* ---- STEP 21: Selfie sign ready ---- */
    const [selfieSignBusy, setSelfieSignBusy] = useState(false);
    const [agreementSignedDateTime, setAgreementSignedDateTime] = useState("Date and Time");
    const handleSelfieSignReady = () => {
        setSelfieSignBusy(true);
        setTimeout(() => {
            setSelfieSignBusy(false);
            setAgreementSignedDateTime("Date and Time: " + formattedNow());
            showScreen("agreementSigned", { record: false });
        }, 1200);
    };

    /* ---- STEP 24: Username ---- */
    const [usernameDifferentCheck, setUsernameDifferentCheck] = useState(false);
    const [usernameDifferentValue, setUsernameDifferentValue] = useState("");

    /* ---- STEP 26: SMS notification lock screen ---- */
    const [notif1Visible, setNotif1Visible] = useState(true);
    const [notif2Visible, setNotif2Visible] = useState(true);

    /* ---- STEP 27: Account success -> Online banking login ---- */
    const handleGoToOnlineBanking = () => {
        showScreen("loading");
        setTimeout(() => showScreen("obLogin", { record: false }), 1200);
    };

    /* ---- STEP 28-34: online banking sign in / OTP / new password ---- */
    const [obUsername, setObUsername] = useState("");
    const [obPassword, setObPassword] = useState("");
    const [obPasswordVisible, setObPasswordVisible] = useState(false);
    const [passwordResetToastVisible, setPasswordResetToastVisible] = useState(false);

    const [otpBrowserTitle, setOtpBrowserTitle] = useState("OTP Verification");
    const [otpBrowserSub, setOtpBrowserSub] = useState(
        "An OTP has been sent to your registered mobile number."
    );
    const [otpBrowserValue, setOtpBrowserValue] = useState("");
    const [otpBrowserVisible, setOtpBrowserVisible] = useState(false);
    const otpBrowserNextRef = useRef("newPassword");

    const setOtpBrowserContext = (title, sub, nextKey) => {
        setOtpBrowserTitle(title);
        setOtpBrowserSub(sub);
        setOtpBrowserValue("");
        otpBrowserNextRef.current = nextKey;
    };

    const handleObSignIn = () => {
        const cameFromReset = passwordResetToastVisible;
        setPasswordResetToastVisible(false);
        if (cameFromReset) {
            setOtpBrowserContext(
                "Verification",
                "An OTP has been sent to your registered mobile number.",
                "pinCreate"
            );
            showScreen("otpBrowser");
        } else {
            showScreen("welcomeLetter");
        }
    };

    const handleWelcomeLetterContinue = () => {
        setOtpBrowserContext(
            "OTP Verification",
            "An OTP has been sent to your registered mobile number.",
            "newPassword"
        );
        showScreen("otpBrowser");
    };

    const handleOtpBrowserSubmit = () => {
        if (!otpBrowserValue.trim()) return;
        const next = otpBrowserNextRef.current;
        if (next === "newPassword") {
            showScreen("newPassword");
        } else if (next === "relogin") {
            setPasswordResetToastVisible(true);
            setObUsername("Mariskarossouw5@gmail.com");
            setObPassword("");
            showScreen("obLogin", { record: false });
        } else if (next === "pinCreate") {
            showScreen("pinCreate");
        }
    };

    /* ---- STEP 32: New password ---- */
    const [newPassword1, setNewPassword1] = useState("");
    const [newPassword2, setNewPassword2] = useState("");
    const [newPassword1Visible, setNewPassword1Visible] = useState(false);
    const [newPassword2Visible, setNewPassword2Visible] = useState(false);
    const resetPasswordEnabled =
        newPassword1.trim().length >= 8 && newPassword1 === newPassword2;

    const handleResetPassword = () => {
        if (!resetPasswordEnabled) return;
        setOtpBrowserContext(
            "Verification",
            "An OTP has been sent to your registered mobile number.",
            "relogin"
        );
        showScreen("otpBrowser");
    };

    /* ---- STEP 35: Create Remote PIN ---- */
    const [pin1, setPin1] = useState("");
    const [pin2, setPin2] = useState("");
    const [pin1Visible, setPin1Visible] = useState(false);
    const [pin2Visible, setPin2Visible] = useState(false);
    const pinCreateEnabled = /^\d{5,6}$/.test(pin1) && pin1 === pin2;

    /* ---- STEP 37: Remote PIN login ---- */
    const [remotePin, setRemotePin] = useState("");
    const [remotePinVisible, setRemotePinVisible] = useState(false);
    const remotePinEnabled = remotePin.trim().length >= 5;

    /* ---- STEP 41: Settings limits ---- */
    const [accountLimitValue, setAccountLimitValue] = useState("R0.00");
    const [accountLimitEditVisible, setAccountLimitEditVisible] = useState(false);
    const [accountLimitInput, setAccountLimitInput] = useState("");
    const [limitToastVisible, setLimitToastVisible] = useState(false);
    const limitToastTimerRef = useRef(null);

    const handleAccountLimitSave = () => {
        const val = accountLimitInput.trim();
        if (val) {
            setAccountLimitValue(val.charAt(0) === "R" ? val : "R" + val);
        }
        setAccountLimitEditVisible(false);
        setLimitToastVisible(true);
        if (limitToastTimerRef.current) clearTimeout(limitToastTimerRef.current);
        limitToastTimerRef.current = setTimeout(() => setLimitToastVisible(false), 2500);
    };

    useEffect(() => {
        return () => {
            if (limitToastTimerRef.current) clearTimeout(limitToastTimerRef.current);
        };
    }, []);

    /* ---- STEP 42: Dashboard ---- */
    const [whatNextVisible, setWhatNextVisible] = useState(true);

    /* ---- generic keypad helper: appends/backspaces into a setState ---- */
    const makeKeypadHandlers = (setValue) => ({
        onDigit: (d) => setValue((v) => v + d),
        onBackspace: () => setValue((v) => v.slice(0, -1)),
        onGo: () => {},
    });

    /* ================================================================ */
    /*  Render                                                           */
    /* ================================================================ */

    return (
        <div>
            <Link to="/Sign-In" className="rob-back-btn">
  <span
      className="material-icons-sharp"
      style={{ color: "#00aeff" }}
  >
    arrow_back
  </span>
            </Link>
                <div className="screen-content rob-phone-screen">
                    <div className="rob-app" id="robApp">
                        {/* ---------------- Chooser ---------------- */}
                        <section className="rob-screen rob-screen-chooser" hidden={current !== "chooser"}>
                            <div className="rob-hero">
                                <img src="../images/Logo.png" className="rob-hero-logo" alt="Capitec logo" />
                                <img src="../images/capihello.png" className="rob-hero-hello" alt="hello" />
                            </div>
                            <h2 className="rob-question">What would you like to do?</h2>
                            <div className="rob-toggle">
                                <button
                                    type="button"
                                    className={`rob-toggle-opt ${mainOpt === "signin" ? "active" : ""}`}
                                    onClick={() => setMainOpt("signin")}
                                >
                                    Sign in
                                </button>
                                <button
                                    type="button"
                                    className={`rob-toggle-opt ${mainOpt === "open" ? "active" : ""}`}
                                    onClick={() => setMainOpt("open")}
                                >
                                    Open an account
                                </button>
                            </div>

                            <div className="rob-for-row" hidden={!forRowVisible}>
                                <div className="rob-for-label">for</div>
                                <div className="rob-toggle">
                                    <button
                                        type="button"
                                        className={`rob-toggle-opt ${forOpt === "myself" ? "active" : ""}`}
                                        onClick={() => setForOpt("myself")}
                                    >
                                        Myself
                                    </button>
                                    <button
                                        type="button"
                                        className={`rob-toggle-opt ${forOpt === "business" ? "active" : ""}`}
                                        onClick={() => setForOpt("business")}
                                    >
                                        My Business
                                    </button>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="rob-get-started"
                                hidden={!getStartedVisible}
                                onClick={handleGetStarted}
                            >
                                Get Started
                            </button>
                        </section>

                        {/* ---------------- Loading ---------------- */}
                        <section className="rob-screen rob-screen-loading" hidden={current !== "loading"}>
                            <div className="rob-spinner"></div>
                            <div className="rob-loading-squares">
                                <span className="rob-sq rob-sq-blue"></span>
                                <span className="rob-sq rob-sq-navy"></span>
                                <span className="rob-sq rob-sq-gray"></span>
                                <span className="rob-sq rob-sq-red"></span>
                            </div>
                        </section>

                        {/* ---------------- Application ---------------- */}
                        <section className="rob-screen rob-screen-application" hidden={current !== "application"}>
                            <div className="rob-bar">Business Account Application</div>
                            <h2 className="rob-title">Open a business account</h2>
                            <p className="rob-sub">Start a new application or continue an existing one.</p>

                            <div className="rob-card">
                                <h3 className="rob-card-title">New Application</h3>
                                <p className="rob-card-desc">
                                    You need your SA ID number, email address, SA cellphone number and CIPC number if
                                    you have a registered business.
                                </p>
                                <button type="button" className="rob-btn-solid" onClick={() => showScreen("biztype")}>
                                    Start new application
                                </button>
                            </div>

                            <div className="rob-card">
                                <h3 className="rob-card-title">Resume Application</h3>
                                <p className="rob-card-desc">
                                    If you started an application, you need the reference code we've emailed you to
                                    continue.
                                </p>
                                <a
                                    href="#"
                                    className="rob-btn-outline"
                                    onClick={(e) => e.preventDefault()}
                                >
                                    Continue to existing application
                                </a>
                            </div>
                        </section>

                        {/* ---------------- Business type ---------------- */}
                        <section className="rob-screen rob-screen-biztype" hidden={current !== "biztype"}>
                            <div className="rob-bar">Choose a business type</div>

                            <div className="rob-card rob-biztype-card">
                                <h3 className="rob-card-title">Private company or close corporation</h3>
                                <div className="rob-biztype-art">
                                    <span className="material-icons-sharp">groups</span>
                                </div>
                                <p className="rob-card-label">The business:</p>
                                <ul className="rob-card-list">
                                    <li>Is registered with the Companies and Intellectual Property Commission (CIPC)</li>
                                    <li>Has one or more directors or members making decisions</li>
                                </ul>
                                <p className="rob-card-label">What you need to open the account:</p>
                                <ul className="rob-card-list">
                                    <li>Valid South African ID</li>
                                    <li>CIPC business registration number</li>
                                    <li>Valid email address</li>
                                    <li>Registered SA cellphone number</li>
                                </ul>
                                <button type="button" className="rob-btn-solid" onClick={(e) => e.preventDefault()}>
                                    Get Started
                                </button>
                            </div>

                            <div className="rob-card rob-biztype-card">
                                <h3 className="rob-card-title">Sole proprietorship</h3>
                                <div className="rob-biztype-art">
                                    <span className="material-icons-sharp">badge</span>
                                </div>
                                <p className="rob-card-label">You are:</p>
                                <ul className="rob-card-list">
                                    <li>Self-employed, freelancer or have a side hustle</li>
                                    <li>The only person making business decisions</li>
                                </ul>
                                <p className="rob-card-label">What you need to open the account:</p>
                                <ul className="rob-card-list">
                                    <li>Valid South African ID</li>
                                    <li>Valid email address</li>
                                    <li>Registered SA cellphone number</li>
                                </ul>
                                <button type="button" className="rob-btn-solid" onClick={() => showScreen("idType")}>
                                    Get Started
                                </button>
                            </div>

                            <div className="rob-card rob-biztype-card">
                                <h3 className="rob-card-title">Other</h3>
                                <div className="rob-biztype-art">
                                    <span className="material-icons-sharp">diversity_3</span>
                                </div>
                                <p className="rob-card-desc">
                                    The business is one of the following: If your business is a trust, partnership
                                    and/or if one of the directors or members is a foreign national with a valid
                                    passport.
                                </p>
                                <button type="button" className="rob-btn-solid" onClick={(e) => e.preventDefault()}>
                                    Get in touch
                                </button>
                            </div>
                        </section>

                        {/* ---------------- STEP 4: Tell us about yourself ---------------- */}
                        <section className="rob-screen" hidden={current !== "idType"}>
                            <div className="rob-bar">Tell us about yourself</div>
                            <p className="rob-sub">Please specify your identification type below</p>

                            <div className="rob-radio-pills">
                                <label className="rob-radio-pill">
                                    <input
                                        type="radio"
                                        name="robIdType"
                                        value="said"
                                        checked={idType === "said"}
                                        onChange={() => setIdType("said")}
                                    />
                                    <span className="rob-radio-dot"></span>
                                    <span>SA ID</span>
                                </label>
                                <label className="rob-radio-pill">
                                    <input
                                        type="radio"
                                        name="robIdType"
                                        value="passport"
                                        checked={idType === "passport"}
                                        onChange={() => setIdType("passport")}
                                    />
                                    <span className="rob-radio-dot"></span>
                                    <span>Passport</span>
                                </label>
                            </div>

                            <button type="button" className="rob-btn-solid" onClick={() => showScreen("signupForm")}>
                                Continue
                            </button>

                            <p className="rob-disclaimer">
                                Your information is secured and safe. Capitec Bank is an authorised financial
                                services provider (FSP 46669) and registered credit provider (NCRCP13). Capitec Bank
                                Limited Reg. No: 1980/003695/06
                            </p>
                            <p className="rob-disclaimer-links">
                                <a href="#">Privacy Centre</a> | <a href="#">Terms and Conditions</a> |{" "}
                                <a href="#">Security</a>
                            </p>
                        </section>

                        {/* ---------------- STEP 5: Sign up form ---------------- */}
                        <section className="rob-screen" hidden={current !== "signupForm"}>
                            <div className="rob-bar">Sign up for your business account</div>

                            <div className="rob-cookie-banner" hidden={!cookieBannerVisible}>
                                <span className="material-icons-sharp rob-cookie-icon">info</span>
                                <button
                                    type="button"
                                    className="rob-cookie-close"
                                    aria-label="Close"
                                    onClick={() => setCookieBannerVisible(false)}
                                >
                                    &times;
                                </button>
                                <p className="rob-cookie-text">
                                    This website uses cookies to ensure you get the best experience.
                                </p>
                                <div className="rob-cookie-links">
                                    <a
                                        href="#"
                                        className="rob-cookie-link"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setCookieBannerVisible(false);
                                        }}
                                    >
                                        Read Cookie Policy
                                    </a>
                                    <a
                                        href="#"
                                        className="rob-cookie-link"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setCookieBannerVisible(false);
                                        }}
                                    >
                                        Accept Cookies
                                    </a>
                                </div>
                            </div>

                            <p className="rob-sub">Your journey with Capitec Business starts now.</p>

                            <div className="rob-field">
                                <label className="rob-label" htmlFor="robSignupSaId">
                                    SA ID number
                                </label>
                                <input
                                    type="text"
                                    className="rob-input"
                                    id="robSignupSaId"
                                    value={signupSaId}
                                    onChange={(e) => setSignupSaId(e.target.value)}
                                />
                            </div>
                            <div className="rob-field">
                                <label className="rob-label" htmlFor="robSignupCell">
                                    Cellphone number
                                </label>
                                <input
                                    type="text"
                                    className="rob-input"
                                    id="robSignupCell"
                                    placeholder="e.g 0821234567"
                                    value={signupCell}
                                    onChange={(e) => setSignupCell(e.target.value)}
                                />
                            </div>
                            <div className="rob-field">
                                <label className="rob-label" htmlFor="robSignupEmail">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    className="rob-input"
                                    id="robSignupEmail"
                                    value={signupEmail}
                                    onChange={(e) => setSignupEmail(e.target.value)}
                                />
                            </div>
                            <div className="rob-field">
                                <label className="rob-label" htmlFor="robSignupEmailConfirm">
                                    Confirm email address
                                </label>
                                <input
                                    type="email"
                                    className="rob-input"
                                    id="robSignupEmailConfirm"
                                    value={signupEmailConfirm}
                                    onChange={(e) => setSignupEmailConfirm(e.target.value)}
                                />
                            </div>

                            <label className="rob-checkbox-row">
                                <input
                                    type="checkbox"
                                    checked={signupConsent}
                                    onChange={(e) => setSignupConsent(e.target.checked)}
                                />
                                <span>
                  I confirm that I have been given the opportunity to read the{" "}
                                    <a href="#" className="rob-link">
                    privacy notice
                  </a>
                  , including who Capitec shares personal information with.
                </span>
                            </label>

                            <button
                                type="button"
                                className="rob-btn-solid"
                                disabled={!createProfileEnabled}
                                onClick={() => {
                                    if (!createProfileEnabled) return;
                                    showScreen("privacy");
                                }}
                            >
                                Create Profile
                            </button>

                            <a href="#" className="rob-footer-link" onClick={(e) => e.preventDefault()}>
                                Already have a business account? Sign In
                            </a>

                            <p className="rob-disclaimer">
                                Your information is secured and safe. Capitec Bank is an authorised financial
                                services provider (FSP 46669) and registered credit provider (NCRCP13). Capitec Bank
                                Limited Reg. No: 1980/003695/06
                            </p>
                            <p className="rob-disclaimer-links">
                                <a href="#">Privacy Centre</a> | <a href="#">Terms and Conditions</a> |{" "}
                                <a href="#">Security</a>
                            </p>
                        </section>

                        {/* ---------------- STEP 6: Privacy ---------------- */}
                        <section className="rob-screen" hidden={current !== "privacy"}>
                            <div className="rob-card rob-privacy-card">
                                <h3 className="rob-card-title">Your privacy</h3>
                                <p className="rob-card-desc">
                                    We will only use your business information with your consent. By looking at the
                                    way you bank, we can suggest ways to improve your financial life.
                                </p>
                                <div className="rob-note-box">
                                    <span className="material-icons-sharp rob-note-icon">info</span>
                                    <p>
                                        Note: By continuing you consent to the following. You can update these settings
                                        under your profile on online banking.
                                    </p>
                                </div>
                                <label className="rob-checkbox-row">
                                    <input
                                        type="checkbox"
                                        checked={privacyOffers}
                                        onChange={(e) => setPrivacyOffers(e.target.checked)}
                                    />
                                    <span>Get personalised offers for your business</span>
                                </label>
                                <label className="rob-checkbox-row">
                                    <input
                                        type="checkbox"
                                        checked={privacyMarketing}
                                        onChange={(e) => setPrivacyMarketing(e.target.checked)}
                                    />
                                    <span>Get our latest marketing offers on improved products and services</span>
                                </label>
                                <div className="rob-btn-row">
                                    <button
                                        type="button"
                                        className="rob-btn-outline"
                                        onClick={() => goBack("signupForm")}
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="button"
                                        className="rob-btn-solid"
                                        onClick={() => showScreen("otp1")}
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* ---------------- STEP 7: OTP Verification (app) ---------------- */}
                        <section className="rob-screen" hidden={current !== "otp1"}>
                            <div className="rob-bar">OTP Verification</div>
                            <div className="rob-otp-art">
                                <span className="material-icons-sharp">smartphone</span>
                            </div>
                            <p className="rob-otp-masked">+2773******30</p>
                            <p className="rob-otp-timer">{otp1TimerText}</p>
                            <p className="rob-sub rob-center">
                                A One-Time Password (OTP) has been sent to your cellphone number.
                            </p>

                            <div className="rob-field">
                                <label className="rob-label" htmlFor="robOtp1Input">
                                    OTP
                                </label>
                                <div className="rob-input-eye-wrap">
                                    <input
                                        type={otp1Visible ? "text" : "password"}
                                        className="rob-input"
                                        id="robOtp1Input"
                                        value={otp1Value}
                                        onChange={(e) => setOtp1Value(e.target.value)}
                                    />
                                    <EyeToggle visible={otp1Visible} onToggle={() => setOtp1Visible((v) => !v)} />
                                </div>
                            </div>

                            <button
                                type="button"
                                className="rob-btn-solid"
                                disabled={!otp1Value.trim()}
                                onClick={handleOtp1Submit}
                            >
                                Submit
                            </button>
                            <button type="button" className="rob-btn-outline" onClick={() => {}}>
                                Update cellphone number
                            </button>
                            <a
                                href="#"
                                className="rob-footer-link"
                                onClick={(e) => {
                                    e.preventDefault();
                                    goBack("privacy");
                                }}
                            >
                                Cancel
                            </a>
                        </section>

                        {/* ---------------- STEP 8: OTP processing overlay ---------------- */}
                        <section className="rob-screen" hidden={current !== "otpProcessing"}>
                            <div className="rob-processing-modal">
                                <span className="material-icons-sharp rob-otp-art-icon">smartphone</span>
                                <p className="rob-processing-text">One moment while we process your request&hellip;</p>
                                <div className="rob-loading-squares">
                                    <span className="rob-sq rob-sq-blue"></span>
                                    <span className="rob-sq rob-sq-navy"></span>
                                    <span className="rob-sq rob-sq-gray"></span>
                                    <span className="rob-sq rob-sq-red"></span>
                                </div>
                            </div>
                        </section>

                        {/* ---------------- STEP 9: Verify Identity intro ---------------- */}
                        <section className="rob-screen" hidden={current !== "selfieIntro"}>
                            <p className="rob-step-label">Step 1 of 4</p>
                            <div className="rob-bar">Verify Identity</div>
                            <h2 className="rob-title">Get ready to verify your identity with a selfie</h2>
                            <p className="rob-sub">
                                In the next steps, we will verify your identity with the Department of Home Affairs.
                            </p>

                            <div className="rob-selfie-illustration">
                                <span className="material-icons-sharp rob-selfie-illustration-ring">face</span>
                                <span className="material-icons-sharp rob-selfie-illustration-phone">smartphone</span>
                            </div>

                            <p className="rob-card-label">Make sure you:</p>
                            <ul className="rob-card-list">
                                <li>
                                    Move to a <strong>well-lit area</strong>
                                </li>
                                <li>
                                    <strong>Avoid direct sunlight</strong>
                                </li>
                                <li>
                                    <strong>Avoid shadows</strong>
                                </li>
                                <li>
                                    Remove any <strong>masks, glasses and hats</strong>
                                </li>
                            </ul>

                            <div className="rob-homeaffairs">
                                <span className="material-icons-sharp">shield</span>
                                <span>REPUBLIC OF SOUTH AFRICA</span>
                            </div>

                            <button
                                type="button"
                                className="rob-btn-solid"
                                onClick={() => showScreen("cameraPermission")}
                            >
                                Next
                            </button>
                        </section>

                        {/* ---------------- STEP 10: Camera permission popup ---------------- */}
                        <section className="rob-screen" hidden={current !== "cameraPermission"}>
                            <div className="rob-browser-permission">
                                <span className="material-icons-sharp rob-permission-icon">photo_camera</span>
                                <p className="rob-permission-text">
                                    openbusiness.capitecbank.co.za wants to use your camera
                                </p>
                                <button
                                    type="button"
                                    className="rob-btn-solid"
                                    onClick={() => showScreen("selfieCapture")}
                                >
                                    Allow while visiting the site
                                </button>
                                <button
                                    type="button"
                                    className="rob-btn-solid"
                                    onClick={() => showScreen("selfieCapture")}
                                >
                                    Allow this time
                                </button>
                                <button
                                    type="button"
                                    className="rob-permission-never"
                                    onClick={() => goBack("selfieIntro")}
                                >
                                    Never allow
                                </button>
                            </div>
                        </section>

                        {/* ---------------- STEP 11: Take a selfie ---------------- */}
                        <section className="rob-screen rob-screen-dark" hidden={current !== "selfieCapture"}>
                            <div className="rob-selfie-header">
                                <span className="material-icons-sharp">lock</span> Take a selfie
                            </div>
                            <div className="rob-selfie-frame">
                                <div className="rob-selfie-oval">
                                    <span className="rob-selfie-oval-text">Position your face to fill the frame</span>
                                </div>
                            </div>
                            <div className="rob-btn-row">
                                <a
                                    href="#"
                                    className="rob-footer-link rob-footer-link-light"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        showScreen("selfieIntro", { record: false });
                                    }}
                                >
                                    Cancel
                                </a>
                                <button
                                    type="button"
                                    className="rob-btn-solid rob-btn-narrow"
                                    disabled={selfieCaptureBusy}
                                    onClick={handleSelfieCapture}
                                >
                                    Capture
                                </button>
                            </div>
                        </section>

                        {/* ---------------- STEP 12: Business Representatives Details ---------------- */}
                        <section className="rob-screen" hidden={current !== "repDetails"}>
                            <div className="rob-bar">Business Representatives Details</div>
                            <div className="rob-rep-header">
                                <span className="rob-avatar-circle">MR</span>
                                <h2 className="rob-title">Mariska Rossouw</h2>
                            </div>

                            <p className="rob-card-label">Personal details</p>
                            <div className="rob-field">
                                <label className="rob-label" htmlFor="robRepTitle">
                                    Title
                                </label>
                                <select
                                    className="rob-input"
                                    id="robRepTitle"
                                    value={repTitle}
                                    onChange={(e) => setRepTitle(e.target.value)}
                                >
                                    <option>Mr</option>
                                    <option>Ms</option>
                                    <option>Mrs</option>
                                    <option>Dr</option>
                                </select>
                            </div>
                            <div className="rob-field">
                                <label className="rob-label">Identity number</label>
                                <div className="rob-readonly-field">961005*****81</div>
                            </div>
                            <div className="rob-field">
                                <label className="rob-label">Email address</label>
                                <div className="rob-readonly-field">Mariskarossouw5@gmail.com</div>
                            </div>
                            <div className="rob-field">
                                <label className="rob-label">Cellphone number</label>
                                <div className="rob-readonly-field">0739742230</div>
                            </div>

                            <p className="rob-card-label">Home address</p>
                            <a
                                href="#"
                                className="rob-add-link"
                                hidden={addHomeAddressClicked}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setAddHomeAddressClicked(true);
                                }}
                            >
                                + Add my home address
                            </a>
                            <div className="rob-field" hidden={!addHomeAddressClicked}>
                                <label className="rob-label" htmlFor="robHomeAddressInput">
                                    Home address
                                </label>
                                <textarea
                                    className="rob-input rob-textarea"
                                    id="robHomeAddressInput"
                                    rows="2"
                                    placeholder="Street, suburb, city, postal code"
                                    value={homeAddress}
                                    onChange={(e) => setHomeAddress(e.target.value)}
                                ></textarea>
                            </div>

                            <button
                                type="button"
                                className="rob-btn-solid"
                                disabled={!homeAddress.trim()}
                                onClick={() => {
                                    if (!homeAddress.trim()) return;
                                    showScreen("tradingAddress1");
                                }}
                            >
                                Next
                            </button>
                        </section>

                        {/* ---------------- STEP 13/14: Trading address ---------------- */}
                        <section className="rob-screen" hidden={current !== "tradingAddress1"}>
                            <p className="rob-step-label">Step 2 of 0</p>
                            <div className="rob-bar">Business Information</div>
                            <h2 className="rob-title">Is your trading address the same as one below?</h2>

                            <label className="rob-radio-pill rob-radio-pill-block">
                                <input
                                    type="radio"
                                    name="robTradingAddr"
                                    value="same"
                                    checked={tradingAddrSame}
                                    onChange={() => setTradingAddrSame(true)}
                                />
                                <span className="rob-radio-dot"></span>
                                <span>
                  Yes it's the same: 2 Terblanche Street, Kuils River, Cape Town, 7580, Western Cape,
                  South Africa
                </span>
                            </label>

                            <a href="#" className="rob-add-link" onClick={(e) => e.preventDefault()}>
                                + Add a different trading address
                            </a>

                            <button
                                type="button"
                                className="rob-btn-solid"
                                disabled={!tradingAddrSame}
                                onClick={() => {
                                    if (!tradingAddrSame) return;
                                    showScreen("agreementSign1");
                                }}
                            >
                                Next
                            </button>
                        </section>

                        {/* ---------------- STEP 15: Business account agreement - selfie signature ---------------- */}
                        <section className="rob-screen" hidden={current !== "agreementSign1"}>
                            <div className="rob-doc-bar">
                <span
                    className="material-icons-sharp rob-doc-back"
                    onClick={() => goBack("tradingAddress1")}
                >
                  arrow_back
                </span>{" "}
                                Business account agreement
                            </div>

                            <div className="rob-doc-photo-frame">
                                <div className="rob-doc-photo-placeholder">
                                    <span className="material-icons-sharp">person</span>
                                </div>
                                <p className="rob-doc-caption">
                                    A digital image of a signatory's face, captured with the intent of it being used as
                                    a signature, is uniquely linked to this record together with the date/time
                                    generated at the time that the signatory captured the digital image.
                                </p>
                            </div>

                            <p className="rob-card-label">Electronically signed by:</p>
                            <p className="rob-doc-line">First Name: Mariska</p>
                            <p className="rob-doc-line">Surname: Rossouw</p>
                            <p className="rob-doc-line">{agreementSign1DateTime}</p>
                            <p className="rob-doc-footnote">
                                *Time recorded as Coordinated Universal Time (UTC). South African standard time is 2
                                hours ahead of UTC.
                            </p>

                            <button type="button" className="rob-btn-solid" onClick={handleAgreementSign1}>
                                Sign Agreement
                            </button>
                        </section>

                        {/* ---------------- STEP 16: Business Information - detailed form ---------------- */}
                        <section className="rob-screen" hidden={current !== "businessInfo"}>
                            <p className="rob-step-label">Step 2 of 4</p>
                            <div className="rob-bar">Business Information</div>
                            <h2 className="rob-title">Tell us more about your business</h2>

                            <div className="rob-field">
                                <label className="rob-label">Trading address</label>
                                <div className="rob-readonly-field">2 Terblanche Street, Kuils River, Cape Town, 7580</div>
                            </div>
                            <div className="rob-field">
                                <label className="rob-label" htmlFor="robTradingNameInput">
                                    Trading name
                                </label>
                                <input
                                    type="text"
                                    className="rob-input"
                                    id="robTradingNameInput"
                                    placeholder="Optional"
                                    value={tradingName}
                                    onChange={(e) => setTradingName(e.target.value)}
                                />
                            </div>
                            <div className="rob-field">
                                <label className="rob-label" htmlFor="robSectorSelect">
                                    Which sector does your business operate in?
                                </label>
                                <select
                                    className="rob-input"
                                    id="robSectorSelect"
                                    value={sector}
                                    onChange={(e) => setSector(e.target.value)}
                                >
                                    <option value="">Select a sector</option>
                                    <option>Retail and trade</option>
                                    <option>Food and beverage</option>
                                    <option>Professional services</option>
                                    <option>Transport and logistics</option>
                                    <option>Other</option>
                                </select>
                            </div>
                            <div className="rob-field">
                                <label className="rob-label" htmlFor="robSourceFundsSelect">
                                    Source of funds
                                </label>
                                <select
                                    className="rob-input"
                                    id="robSourceFundsSelect"
                                    value={sourceFunds}
                                    onChange={(e) => setSourceFunds(e.target.value)}
                                >
                                    <option value="">Select a source</option>
                                    <option>Business income</option>
                                    <option>Savings</option>
                                    <option>Loan</option>
                                    <option>Investment</option>
                                </select>
                                <p className="rob-hint">Where you got the money to open the account</p>
                            </div>
                            <div className="rob-field">
                                <label className="rob-label" htmlFor="robTurnoverInput">
                                    Annual sales turnover
                                </label>
                                <input
                                    type="text"
                                    className="rob-input"
                                    id="robTurnoverInput"
                                    value={turnover}
                                    onChange={(e) => setTurnover(e.target.value)}
                                />
                                <p className="rob-hint">How much your business makes in a year</p>
                            </div>
                            <div className="rob-field">
                                <label className="rob-label" htmlFor="robEmployeesInput">
                                    Number of employees
                                </label>
                                <input
                                    type="text"
                                    className="rob-input"
                                    id="robEmployeesInput"
                                    value={employees}
                                    onChange={(e) => setEmployees(e.target.value)}
                                />
                                <p className="rob-hint">Including the owner</p>
                            </div>

                            <p className="rob-card-label">Tax details</p>
                            <p className="rob-question-sm">Do you pay income tax in South Africa?</p>
                            <div className="rob-radio-pills">
                                <label className="rob-radio-pill">
                                    <input
                                        type="radio"
                                        name="robTaxSa"
                                        value="yes"
                                        checked={taxSa === "yes"}
                                        onChange={() => setTaxSa("yes")}
                                    />
                                    <span className="rob-radio-dot"></span>
                                    <span>Yes</span>
                                </label>
                                <label className="rob-radio-pill">
                                    <input
                                        type="radio"
                                        name="robTaxSa"
                                        value="no"
                                        checked={taxSa === "no"}
                                        onChange={() => setTaxSa("no")}
                                    />
                                    <span className="rob-radio-dot"></span>
                                    <span>No</span>
                                </label>
                            </div>
                            <p className="rob-question-sm">Do you pay tax in another country?</p>
                            <div className="rob-radio-pills">
                                <label className="rob-radio-pill">
                                    <input
                                        type="radio"
                                        name="robTaxOther"
                                        value="yes"
                                        checked={taxOther === "yes"}
                                        onChange={() => setTaxOther("yes")}
                                    />
                                    <span className="rob-radio-dot"></span>
                                    <span>Yes</span>
                                </label>
                                <label className="rob-radio-pill">
                                    <input
                                        type="radio"
                                        name="robTaxOther"
                                        value="no"
                                        checked={taxOther === "no"}
                                        onChange={() => setTaxOther("no")}
                                    />
                                    <span className="rob-radio-dot"></span>
                                    <span>No</span>
                                </label>
                            </div>

                            <button
                                type="button"
                                className="rob-btn-solid"
                                disabled={!businessInfoEnabled}
                                onClick={() => {
                                    if (!businessInfoEnabled) return;
                                    showScreen("agreementsList");
                                }}
                            >
                                Next
                            </button>
                        </section>

                        {/* ---------------- STEP 17: Agreements list ---------------- */}
                        <section className="rob-screen" hidden={current !== "agreementsList"}>
                            <p className="rob-step-label">Step 3 of 4</p>
                            <div className="rob-bar">Agreements</div>
                            <p className="rob-sub">
                                Please read and accept the agreement to complete the application process.
                            </p>
                            <p className="rob-agreements-count">No. of Agreements: 1</p>

                            <div className="rob-accordion">
                                <p className="rob-card-label">Business Account</p>
                                {[
                                    {
                                        title: "General terms",
                                        body:
                                            'By giving us information about yourself and your business, you confirm that it is true and correct. Please inform us if your business becomes "financially distressed" by means of liquidation, sequestration, debt review or administration.',
                                    },
                                    {
                                        title: "Use of account",
                                        body:
                                            "You agree and authorise the bank to open your business account. You may not overdraw the account unless you have an approved overdraft facility. You will be charged an extra fee each time a payment causes the account to become overdrawn or exceeds the agreed overdraft limit.",
                                    },
                                    {
                                        title: "Online banking",
                                        body:
                                            "You need to reset your temporary password before signing in to online banking for the first time. Do not share username or passwords details with anyone. Make sure there is updated anti-virus software on your devices.",
                                    },
                                ].map((item, idx) => (
                                    <div className="rob-accordion-item" key={item.title}>
                                        <button
                                            type="button"
                                            className={`rob-accordion-head ${accordionOpen[idx] ? "expanded" : ""}`}
                                            onClick={() => toggleAccordion(idx)}
                                        >
                                            {item.title}{" "}
                                            <span className="material-icons-sharp rob-accordion-chevron">
                        {accordionOpen[idx] ? "expand_less" : "expand_more"}
                      </span>
                                        </button>
                                        <div className="rob-accordion-body" hidden={!accordionOpen[idx]}>
                                            {item.body}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <label className="rob-checkbox-row">
                                <input
                                    type="checkbox"
                                    checked={agreementsListCheck}
                                    onChange={(e) => setAgreementsListCheck(e.target.checked)}
                                />
                                <span>
                  I confirm that I have read, understood and agree to the{" "}
                                    <a href="#" className="rob-link">
                    Electronic Signature Terms &amp; Conditions
                  </a>
                </span>
                            </label>

                            <button
                                type="button"
                                className="rob-btn-solid"
                                disabled={!agreementsListCheck}
                                onClick={() => {
                                    if (!agreementsListCheck) return;
                                    showScreen("esigModal");
                                }}
                            >
                                Continue
                            </button>
                        </section>

                        {/* ---------------- STEP 18: Electronic Signature Agreement modal ---------------- */}
                        <section className="rob-screen" hidden={current !== "esigModal"}>
                            <div className="rob-card">
                                <h3 className="rob-card-title">Electronic Signature Agreement</h3>
                                <p className="rob-esig-sub">Sign with a selfie</p>
                                <p className="rob-card-desc">
                                    We've taken the paperwork out of business banking. With Capitec, you can sign
                                    Agreements and any other documents using a selfie. The image of your face helps us
                                    verify your identity and acts as a signature on Agreements. This helps protect your
                                    accounts against fraud, while giving you the freedom to bank wherever you are.
                                </p>
                                <label className="rob-checkbox-row">
                                    <input
                                        type="checkbox"
                                        checked={esigCheck}
                                        onChange={(e) => setEsigCheck(e.target.checked)}
                                    />
                                    <span>
                    I confirm that I have read, understood and agree to the{" "}
                                        <a href="#" className="rob-link">
                      Electronic Signature Terms &amp; Conditions
                    </a>
                  </span>
                                </label>
                                <div className="rob-btn-row">
                                    <button
                                        type="button"
                                        className="rob-btn-outline"
                                        onClick={() => goBack("agreementsList")}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="button"
                                        className="rob-btn-solid"
                                        onClick={() => showScreen("agreementDoc")}
                                    >
                                        Continue
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* ---------------- STEP 19/20: Business account agreement document ---------------- */}
                        <section className="rob-screen" hidden={current !== "agreementDoc"}>
                            <div className="rob-doc-bar">
                <span
                    className="material-icons-sharp rob-doc-back"
                    onClick={() => goBack("esigModal")}
                >
                  arrow_back
                </span>{" "}
                                Business account agreement
                            </div>

                            <div className="rob-toast rob-toast-inline" hidden={!esigToastVisible}>
                                <span className="material-icons-sharp">info</span>
                                <span>Use of selfie &ndash; You have agreed to using your Selfie to accept Agreements</span>
                                <button
                                    type="button"
                                    className="rob-toast-close"
                                    onClick={() => setEsigToastVisible(false)}
                                >
                                    &times;
                                </button>
                            </div>

                            <div className="rob-doc-scroll">
                                <p className="rob-doc-line">
                                    <strong>Registered Business Name:</strong>
                                </p>
                                <p className="rob-doc-line">
                                    <strong>Registration number:</strong>
                                </p>
                                <p className="rob-doc-line">
                                    <strong>Trading Name:</strong>
                                </p>
                                <p className="rob-doc-line">
                                    <strong>If Incorporated &ndash; Association or Club:</strong> Incorporated Name:,
                                    Date of Incorporation:
                                </p>
                                <p className="rob-doc-line">
                                    <strong>If Sole Proprietor &ndash; Full Names and Surname:</strong> Mariska Rossouw,
                                    ID/Passport Number: 9610050023081, Trading Name: Zoomies
                                </p>
                                <p className="rob-doc-line">
                                    <strong>If Partnership</strong> (Main Partner's details. Full list of partners is
                                    set out in the resolution accepted by Capitec for purposes of opening the account.)
                                    &ndash; Trading Name:, Full Names and Surname:, ID/Passport Number:
                                </p>
                                <p className="rob-doc-line">
                                    <strong>Contact Details &ndash; Residential:</strong> 2 Terblanche Street, Kuils
                                    River, Cape Town, 7580, Western Cape, South Africa
                                </p>
                                <p className="rob-doc-line">
                                    <strong>Business Address:</strong> 2 Terblanche Street, Kuils River, Cape Town,
                                    7580, Western Cape, South Africa
                                </p>
                                <p className="rob-doc-line">
                                    <strong>Cell Phone:</strong> 0739742230
                                </p>
                                <p className="rob-doc-line">
                                    <strong>Business Email Address:</strong> Mariskarossouw5@gmail.com
                                </p>
                                <p className="rob-doc-line">
                                    <strong>Business Number:</strong>
                                </p>
                                <p className="rob-doc-line">
                                    <strong>Business Email:</strong>
                                </p>
                                <p className="rob-doc-para">
                                    Please read the full terms of the Business Client Account Agreement, including the
                                    General Terms and all Product Terms before signing this agreement.
                                </p>

                                <p className="rob-doc-clause-head">8.4 IN THE CASE OF A PARTNERSHIP:</p>
                                <p className="rob-doc-clause">
                                    8.4.1 Each partner will be jointly and severally liable, together with the other
                                    partners, for the debts and obligations of the partnership incurred in relation to
                                    this account.
                                </p>
                                <p className="rob-doc-clause">
                                    8.4.2 Should any partner be placed under sequestration, or should sequestration
                                    proceedings be brought against any partner, the bank may suspend or terminate the
                                    operation of this account pending the outcome of those proceedings.
                                </p>
                                <p className="rob-doc-clause">
                                    8.4.3 A resolution signed by the partners, as accepted by Capitec, will govern who
                                    may operate this account and in what manner on behalf of the partnership.
                                </p>

                                <p className="rob-doc-clause-head">9. TERMINATION</p>
                                <p className="rob-doc-clause">
                                    9.1 Either party may terminate this agreement by giving the other party 60 days'
                                    written notice.
                                </p>
                                <p className="rob-doc-clause">
                                    9.2 The bank reserves the right to terminate this relationship immediately where
                                    required to comply with any law or where the account is used fraudulently or
                                    unlawfully.
                                </p>
                                <p className="rob-doc-clause">
                                    9.3 Termination of this agreement does not affect the bank's right to engage in
                                    business with any other person or entity, including other members of the
                                    partnership.
                                </p>
                            </div>

                            <button
                                type="button"
                                className="rob-btn-solid"
                                onClick={() => showScreen("selfieSignReady")}
                            >
                                Continue
                            </button>
                        </section>

                        {/* ---------------- STEP 21: Take a selfie - ready to sign ---------------- */}
                        <section className="rob-screen rob-screen-dark" hidden={current !== "selfieSignReady"}>
                            <div className="rob-selfie-header">
                                <span className="material-icons-sharp">lock</span> Take a selfie
                            </div>
                            <h2 className="rob-title rob-title-light">
                                Get ready to sign the agreement using a Selfie
                            </h2>

                            <p className="rob-card-label rob-card-label-light">Make sure you:</p>
                            <ul className="rob-card-list rob-card-list-light">
                                <li>
                                    Move to a <strong>well-lit area</strong>
                                </li>
                                <li>
                                    <strong>Avoid direct sunlight</strong>
                                </li>
                                <li>
                                    <strong>Avoid shadows</strong>
                                </li>
                                <li>
                                    Remove any <strong>masks, glasses and hats</strong>
                                </li>
                            </ul>

                            <button
                                type="button"
                                className="rob-btn-solid"
                                disabled={selfieSignBusy}
                                onClick={handleSelfieSignReady}
                            >
                                I am ready
                            </button>
                            <a
                                href="#"
                                className="rob-footer-link rob-footer-link-light"
                                onClick={(e) => {
                                    e.preventDefault();
                                    goBack("agreementDoc");
                                }}
                            >
                                Cancel
                            </a>
                        </section>

                        {/* ---------------- STEP 22/23: Signed agreement ---------------- */}
                        <section className="rob-screen" hidden={current !== "agreementSigned"}>
                            <div className="rob-bar">Business account agreement</div>
                            <p className="rob-doc-para">&hellip;regarding the conduct of the Account.</p>

                            <div className="rob-doc-photo-frame">
                                <div className="rob-doc-photo-placeholder">
                                    <span className="material-icons-sharp">person</span>
                                </div>
                                <p className="rob-doc-caption">
                                    A digital image of a signatory's face, captured with the intent of it being used as
                                    a signature, is uniquely linked to this record together with the date/time
                                    generated at the time that the signatory captured the digital image.
                                </p>
                            </div>

                            <p className="rob-card-label">Electronically signed by:</p>
                            <p className="rob-doc-line">First Name: Mariska</p>
                            <p className="rob-doc-line">Surname: Rossouw</p>
                            <p className="rob-doc-line">{agreementSignedDateTime}</p>
                            <p className="rob-doc-footnote">
                                *Time recorded as Coordinated Universal Time (UTC). South African standard time is 2
                                hours ahead of UTC.
                            </p>

                            <h3 className="rob-card-title">Business Client Account Agreement</h3>
                            <p className="rob-card-label">Business Details ("Client")</p>
                            <div className="rob-doc-scroll rob-doc-scroll-short">
                                <p className="rob-doc-line">
                                    <strong>If Registered &ndash; Business Name:</strong> Registration number:, Trading
                                    Name:
                                </p>
                                <p className="rob-doc-line">
                                    <strong>If Incorporated &ndash; Association or Club:</strong> Incorporated Name:,
                                    Date of Incorporation:
                                </p>
                                <p className="rob-doc-line">
                                    <strong>If Sole Proprietor &ndash; Full Names and Surname:</strong> Mariska Rossouw,
                                    ID/Passport Number: 9610050023081, Trading Name: Zoomies
                                </p>
                                <p className="rob-doc-line">
                                    <strong>If Partnership</strong> (Main Partner's details. Full list of partners is
                                    set out in the resolution accepted by Capitec for purposes of opening the account.)
                                </p>
                                <p className="rob-doc-line">
                                    <strong>Contact Details &ndash; Residential:</strong> 2 Terblanche Street, Kuils
                                    River, Cape Town, 7580, Western Cape, South Africa
                                </p>
                                <p className="rob-doc-line">
                                    <strong>Business Address:</strong> 2 Terblanche Street, Kuils River, Cape Town,
                                    7580, Western Cape, South Africa
                                </p>
                                <p className="rob-doc-line">
                                    <strong>Cell Phone:</strong> 0739742230
                                </p>
                                <p className="rob-doc-line">
                                    <strong>Business Email Address:</strong> Mariskarossouw5@gmail.com
                                </p>
                                <p className="rob-doc-line">
                                    <strong>Business Number:</strong>
                                </p>
                                <p className="rob-doc-line">
                                    <strong>Business Email:</strong>
                                </p>
                                <p className="rob-doc-para">
                                    Please read the full terms of the Business Client Account Agreement, including the
                                    General Terms and all Product Terms before signing this agreement.
                                </p>
                            </div>

                            <button type="button" className="rob-btn-solid" onClick={() => showScreen("username")}>
                                Done
                            </button>
                        </section>

                        {/* ---------------- STEP 24: Choose online banking username ---------------- */}
                        <section className="rob-screen" hidden={current !== "username"}>
                            <p className="rob-step-label">Step 4 of 4</p>
                            <div className="rob-bar">Online Banking Access</div>
                            <h2 className="rob-title">Choose your online banking username</h2>

                            <div className="rob-note-box">
                                <span className="material-icons-sharp rob-note-icon">info</span>
                                <p>This username will be used to access all your banking profiles.</p>
                            </div>

                            <p className="rob-sub">
                                Use this email address as your username for online banking and the app, or enter a
                                different one.
                            </p>

                            <div className="rob-field">
                                <input
                                    type="text"
                                    className="rob-input"
                                    value="Mariskarossouw5@gmail.com"
                                    readOnly
                                />
                            </div>

                            <label className="rob-checkbox-row">
                                <input
                                    type="checkbox"
                                    checked={usernameDifferentCheck}
                                    onChange={(e) => setUsernameDifferentCheck(e.target.checked)}
                                />
                                <span>Enter different email address as username</span>
                            </label>
                            <div className="rob-field" hidden={!usernameDifferentCheck}>
                                <input
                                    type="email"
                                    className="rob-input"
                                    placeholder="Enter a different email address"
                                    value={usernameDifferentValue}
                                    onChange={(e) => setUsernameDifferentValue(e.target.value)}
                                />
                            </div>

                            <button
                                type="button"
                                className="rob-btn-solid"
                                onClick={() => showScreen("profileCreated")}
                            >
                                Next
                            </button>
                        </section>

                        {/* ---------------- STEP 25: Profile Created ---------------- */}
                        <section className="rob-screen" hidden={current !== "profileCreated"}>
                            <div className="rob-bar">
                                <span className="material-icons-sharp rob-bar-icon">smartphone</span> Profile Created
                            </div>
                            <div className="rob-success-check">
                                <span className="material-icons-sharp">check_circle</span>
                            </div>
                            <h2 className="rob-title rob-center">Profile Created</h2>
                            <p className="rob-sub rob-center">
                                Remember to sign in to online banking and the app with your email address. A
                                temporary password will be sent to you by SMS.
                            </p>
                            <button type="button" className="rob-btn-solid" onClick={() => showScreen("smsNotif")}>
                                Continue
                            </button>
                        </section>

                        {/* ---------------- STEP 26: SMS notifications on lock screen ---------------- */}
                        <section className="rob-screen rob-screen-dark" hidden={current !== "smsNotif"}>
                            <div className="rob-lock-screen">
                                <p className="rob-lock-time">15:21</p>
                                <p className="rob-lock-date">Fri, 10 Oct</p>
                                <div
                                    className="rob-notif"
                                    style={{ visibility: notif1Visible ? "visible" : "hidden" }}
                                    onClick={() => showScreen("accountSuccess")}
                                >
                                    <span className="material-icons-sharp rob-notif-icon">account_balance</span>
                                    <div className="rob-notif-body">
                                        <p className="rob-notif-from">+27839300452100</p>
                                        <p className="rob-notif-text">
                                            Capitec Business: Enter OTP 342792 to continue opening your account. Never
                                            share this message with anyone. Info: 0860309250.
                                        </p>
                                    </div>
                                </div>
                                <div
                                    className="rob-notif"
                                    style={{ visibility: notif2Visible ? "visible" : "hidden" }}
                                    onClick={() => showScreen("accountSuccess")}
                                >
                                    <span className="material-icons-sharp rob-notif-icon">account_balance</span>
                                    <div className="rob-notif-body">
                                        <p className="rob-notif-from">Capitec Business</p>
                                        <p className="rob-notif-text">
                                            Your new credentials have been created. Please use your username and the
                                            following temporary password to login: T1B$47xQ
                                        </p>
                                    </div>
                                </div>
                                <div className="rob-btn-row">
                                    <button
                                        type="button"
                                        className="rob-btn-outline rob-btn-outline-light"
                                        onClick={() => {
                                            setNotif1Visible(false);
                                            setNotif2Visible(false);
                                        }}
                                    >
                                        Clear
                                    </button>
                                    <button
                                        type="button"
                                        className="rob-btn-solid"
                                        onClick={() => showScreen("accountSuccess")}
                                    >
                                        Mark as read
                                    </button>
                                </div>
                            </div>
                        </section>

                        {/* ---------------- STEP 27: Account is open ---------------- */}
                        <section className="rob-screen" hidden={current !== "accountSuccess"}>
                            <div className="rob-success-check rob-success-check-confetti">
                                <span className="material-icons-sharp">check_circle</span>
                            </div>
                            <h2 className="rob-title rob-center">Your account is open</h2>
                            <p className="rob-sub rob-center">
                                Capitec Business account number: <strong>1054384754</strong>
                            </p>

                            <div className="rob-next-steps">
                                <div className="rob-next-step">
                                    <p className="rob-next-step-title">1. Sign in to online banking</p>
                                    <p className="rob-next-step-desc">Username: Mariskarossouw5@gmail.com</p>
                                    <p className="rob-next-step-desc">
                                        Temporary password: Sent to your registered cellphone number
                                    </p>
                                    <button type="button" className="rob-btn-solid" onClick={handleGoToOnlineBanking}>
                                        Go to Online Banking
                                    </button>
                                </div>
                                <div className="rob-next-step">
                                    <p className="rob-next-step-title">2. Order your debit card</p>
                                    <p className="rob-next-step-desc">Sign in to online banking</p>
                                    <p className="rob-next-step-desc">Order your debit card</p>
                                </div>
                                <div className="rob-next-step">
                                    <p className="rob-next-step-title">3. Make your first deposit</p>
                                    <p className="rob-next-step-desc">
                                        Keep your account active by depositing money into your new account
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* ---------------- STEP 28: Online banking sign in (browser) ---------------- */}
                        <section className="rob-screen" hidden={current !== "obLogin"}>
                            <div className="rob-browser-chrome">
                                <span className="material-icons-sharp">arrow_back</span>
                                <span className="rob-browser-url">business.capitecbank.co.za</span>
                                <span className="material-icons-sharp">arrow_forward</span>
                            </div>
                            <div className="rob-toast rob-toast-success" hidden={!passwordResetToastVisible}>
                                Success. You have reset your password.
                            </div>
                            <h2 className="rob-title rob-center rob-globalbiz-word">GlobalBiz</h2>
                            <div className="rob-field">
                                <label className="rob-label" htmlFor="robOBUsername">
                                    Username
                                </label>
                                <input
                                    type="text"
                                    className="rob-input"
                                    id="robOBUsername"
                                    value={obUsername}
                                    onChange={(e) => setObUsername(e.target.value)}
                                />
                            </div>
                            <div className="rob-field">
                                <label className="rob-label" htmlFor="robOBPassword">
                                    Password
                                </label>
                                <div className="rob-input-eye-wrap">
                                    <input
                                        type={obPasswordVisible ? "text" : "password"}
                                        className="rob-input"
                                        id="robOBPassword"
                                        value={obPassword}
                                        onChange={(e) => setObPassword(e.target.value)}
                                    />
                                    <EyeToggle
                                        visible={obPasswordVisible}
                                        onToggle={() => setObPasswordVisible((v) => !v)}
                                    />
                                </div>
                            </div>
                            <a href="#" className="rob-footer-link" onClick={(e) => e.preventDefault()}>
                                Forgot Password
                            </a>
                            <button type="button" className="rob-btn-solid" onClick={handleObSignIn}>
                                Sign In
                            </button>
                        </section>

                        {/* ---------------- STEP 29: Welcome letter ---------------- */}
                        <section className="rob-screen" hidden={current !== "welcomeLetter"}>
                            <div className="rob-browser-chrome">
                                <span className="material-icons-sharp">arrow_back</span>
                                <span className="rob-browser-url">business.capitecbank.co.za</span>
                                <span className="material-icons-sharp">arrow_forward</span>
                            </div>
                            <div className="rob-doc-scroll rob-welcome-letter">
                                <p className="rob-welcome-heading">GlobalBiz</p>
                                <p className="rob-doc-line">Dear Mariska Rossouw,</p>
                                <p className="rob-card-title">Welcome to simpler business banking</p>
                                <p className="rob-doc-para">
                                    Thanks for choosing Capitec business banking, here's some important information to
                                    get you started.
                                </p>
                                <p className="rob-card-label">Make a deposit within the next 7 days</p>
                                <p className="rob-doc-line">Bank name: Capitec Business</p>
                                <p className="rob-doc-line">Account type: Current</p>
                                <p className="rob-doc-line">Account number: 1054384754</p>
                                <p className="rob-doc-line">Branch code: 470010</p>
                                <p className="rob-card-label">Manage your cash flow anywhere 24/7</p>
                                <p className="rob-doc-line">
                                    Online banking and app username: Mariskarossouw5@gmail.com
                                </p>
                                <p className="rob-doc-line">Temporary password: Sent to your registered cellphone number</p>
                                <p className="rob-doc-para">
                                    Have made banking simpler and more convenient for you so online banking is easy to
                                    access your accounts, order cards, make payments, and more.
                                </p>
                                <p className="rob-doc-line">Sincerely,</p>
                                <p className="rob-doc-line">The Capitec Business Team.</p>
                            </div>
                            <div className="rob-welcome-footer-banner">
                                Remember: We will never send you a direct link asking for your personal information
                                or bank details.
                            </div>
                            <button
                                type="button"
                                className="rob-btn-solid"
                                onClick={handleWelcomeLetterContinue}
                            >
                                Continue
                            </button>
                        </section>

                        {/* ---------------- Shared OTP screen for online banking sub-journey ---------------- */}
                        <section className="rob-screen" hidden={current !== "otpBrowser"}>
                            <div className="rob-browser-chrome">
                                <span className="material-icons-sharp">arrow_back</span>
                                <span className="rob-browser-url">business.capitecbank.co.za</span>
                                <span className="material-icons-sharp">arrow_forward</span>
                            </div>
                            <div className="rob-bar">{otpBrowserTitle}</div>
                            <div className="rob-otp-art">
                                <span className="material-icons-sharp">smartphone</span>
                            </div>
                            <p className="rob-sub rob-center">{otpBrowserSub}</p>

                            <div className="rob-field">
                                <label className="rob-label" htmlFor="robOtpBrowserInput">
                                    Enter OTP
                                </label>
                                <div className="rob-input-eye-wrap">
                                    <input
                                        type={otpBrowserVisible ? "text" : "password"}
                                        className="rob-input"
                                        id="robOtpBrowserInput"
                                        value={otpBrowserValue}
                                        onChange={(e) => setOtpBrowserValue(e.target.value)}
                                    />
                                    <EyeToggle
                                        visible={otpBrowserVisible}
                                        onToggle={() => setOtpBrowserVisible((v) => !v)}
                                    />
                                </div>
                            </div>
                            <a href="#" className="rob-footer-link" onClick={(e) => e.preventDefault()}>
                                Resend OTP
                            </a>
                            <button
                                type="button"
                                className="rob-btn-solid"
                                disabled={!otpBrowserValue.trim()}
                                onClick={handleOtpBrowserSubmit}
                            >
                                Submit
                            </button>

                            <Keypad {...makeKeypadHandlers(setOtpBrowserValue)} />
                        </section>

                        {/* ---------------- STEP 32: New password ---------------- */}
                        <section className="rob-screen" hidden={current !== "newPassword"}>
                            <div className="rob-browser-chrome">
                                <span className="material-icons-sharp">arrow_back</span>
                                <span className="rob-browser-url">business.capitecbank.co.za</span>
                                <span className="material-icons-sharp">arrow_forward</span>
                            </div>
                            <div className="rob-bar">New password</div>

                            <div className="rob-field">
                                <label className="rob-label" htmlFor="robNewPassword1">
                                    New password
                                </label>
                                <div className="rob-input-eye-wrap">
                                    <input
                                        type={newPassword1Visible ? "text" : "password"}
                                        className="rob-input"
                                        id="robNewPassword1"
                                        value={newPassword1}
                                        onChange={(e) => setNewPassword1(e.target.value)}
                                    />
                                    <EyeToggle
                                        visible={newPassword1Visible}
                                        onToggle={() => setNewPassword1Visible((v) => !v)}
                                    />
                                </div>
                                <p className="rob-hint">8+ characters, 1 uppercase, 1 number, 1 special character</p>
                            </div>
                            <div className="rob-field">
                                <label className="rob-label" htmlFor="robNewPassword2">
                                    Confirm password
                                </label>
                                <div className="rob-input-eye-wrap">
                                    <input
                                        type={newPassword2Visible ? "text" : "password"}
                                        className="rob-input"
                                        id="robNewPassword2"
                                        value={newPassword2}
                                        onChange={(e) => setNewPassword2(e.target.value)}
                                    />
                                    <EyeToggle
                                        visible={newPassword2Visible}
                                        onToggle={() => setNewPassword2Visible((v) => !v)}
                                    />
                                </div>
                            </div>

                            <button
                                type="button"
                                className="rob-btn-solid"
                                disabled={!resetPasswordEnabled}
                                onClick={handleResetPassword}
                            >
                                Reset Password
                            </button>
                            <button
                                type="button"
                                className="rob-btn-outline"
                                onClick={() => goBack("otpBrowser")}
                            >
                                Cancel
                            </button>

                            <Keypad {...makeKeypadHandlers(setNewPassword1)} />
                        </section>

                        {/* ---------------- STEP 35: Create Remote PIN ---------------- */}
                        <section className="rob-screen" hidden={current !== "pinCreate"}>
                            <div className="rob-bar">
                                <span className="material-icons-sharp rob-bar-icon">lock</span> Create Remote PIN
                            </div>
                            <p className="rob-sub">
                                Create a PIN to access all your linked profiles on your business banking app.
                            </p>
                            <div className="rob-note-box">
                                <span className="material-icons-sharp rob-note-icon">info</span>
                                <p>This is not your card PIN or OTP.</p>
                            </div>

                            <div className="rob-field">
                                <label className="rob-label" htmlFor="robPin1">
                                    Remote PIN
                                </label>
                                <div className="rob-input-eye-wrap">
                                    <input
                                        type={pin1Visible ? "text" : "password"}
                                        className="rob-input"
                                        id="robPin1"
                                        maxLength={6}
                                        value={pin1}
                                        onChange={(e) => setPin1(e.target.value)}
                                    />
                                    <EyeToggle visible={pin1Visible} onToggle={() => setPin1Visible((v) => !v)} />
                                </div>
                                <p className="rob-hint">Must be 5 or 6 digits</p>
                            </div>
                            <div className="rob-field">
                                <label className="rob-label" htmlFor="robPin2">
                                    Confirm remote PIN
                                </label>
                                <div className="rob-input-eye-wrap">
                                    <input
                                        type={pin2Visible ? "text" : "password"}
                                        className="rob-input"
                                        id="robPin2"
                                        maxLength={6}
                                        value={pin2}
                                        onChange={(e) => setPin2(e.target.value)}
                                    />
                                    <EyeToggle visible={pin2Visible} onToggle={() => setPin2Visible((v) => !v)} />
                                </div>
                                <p className="rob-hint">Must be 5 or 6 digits</p>
                            </div>

                            <p className="rob-card-label">Tips for a secure remote PIN</p>
                            <ul className="rob-card-list">
                                <li>Do not use a PIN that is easy to guess</li>
                                <li>Do not use your date of birth</li>
                                <li>
                                    Do not use numbers that follow each other (e.g. 12345 or repeating single digits
                                    (e.g 11111)
                                </li>
                                <li>Do not use the same PIN as your bank card</li>
                            </ul>

                            <button
                                type="button"
                                className="rob-btn-solid"
                                disabled={!pinCreateEnabled}
                                onClick={() => {
                                    if (!pinCreateEnabled) return;
                                    showScreen("pinSuccess");
                                }}
                            >
                                Create PIN
                            </button>
                        </section>

                        {/* ---------------- STEP 36: PIN success ---------------- */}
                        <section className="rob-screen" hidden={current !== "pinSuccess"}>
                            <div className="rob-success-check">
                                <span className="material-icons-sharp">check_circle</span>
                            </div>
                            <p className="rob-success-label">Success</p>
                            <h2 className="rob-title rob-center">Remote PIN updated</h2>
                            <p className="rob-sub rob-center">
                                You can now use your new remote PIN to sign in to the App.
                            </p>
                            <button
                                type="button"
                                className="rob-btn-solid"
                                onClick={() => showScreen("remotePinLogin")}
                            >
                                Sign In
                            </button>
                        </section>

                        {/* ---------------- STEP 37: Sign in with remote PIN ---------------- */}
                        <section className="rob-screen" hidden={current !== "remotePinLogin"}>
                            <div className="rob-pill-topleft">For my business</div>
                            <h2 className="rob-title rob-center rob-globalbiz-word">GlobalBiz</h2>

                            <div className="rob-field">
                                <label className="rob-label" htmlFor="robRemotePinInput">
                                    Remote PIN
                                </label>
                                <div className="rob-input-eye-wrap">
                                    <input
                                        type={remotePinVisible ? "text" : "password"}
                                        className="rob-input"
                                        id="robRemotePinInput"
                                        maxLength={6}
                                        value={remotePin}
                                        onChange={(e) => setRemotePin(e.target.value)}
                                    />
                                    <EyeToggle
                                        visible={remotePinVisible}
                                        onToggle={() => setRemotePinVisible((v) => !v)}
                                    />
                                </div>
                            </div>
                            <a href="#" className="rob-footer-link" onClick={(e) => e.preventDefault()}>
                                Forgot PIN
                            </a>
                            <button
                                type="button"
                                className="rob-btn-solid"
                                disabled={!remotePinEnabled}
                                onClick={() => {
                                    if (!remotePinEnabled) return;
                                    showScreen("disclaimer");
                                }}
                            >
                                Submit
                            </button>

                            <Keypad {...makeKeypadHandlers(setRemotePin)} />
                        </section>

                        {/* ---------------- STEP 38: Disclaimer and Legal Notices ---------------- */}
                        <section className="rob-screen" hidden={current !== "disclaimer"}>
                            <div className="rob-bar">Disclaimer and Legal Notices</div>
                            <p className="rob-doc-para">
                                You must read the disclaimer and legal notices before continuing because it contains
                                important terms and conditions that you need to understand and accept.
                            </p>

                            <button
                                type="button"
                                className="rob-expand-row"
                                onClick={() => showScreen("disclaimerDetails")}
                            >
                                <span>View disclaimer details</span>
                                <span className="material-icons-sharp">chevron_right</span>
                            </button>

                            <button
                                type="button"
                                className="rob-btn-solid"
                                onClick={() => showScreen("manageBanking")}
                            >
                                Accept
                            </button>
                            <button
                                type="button"
                                className="rob-btn-outline"
                                onClick={() => goBack("remotePinLogin")}
                            >
                                Cancel
                            </button>
                        </section>

                        {/* ---------------- STEP 39: Disclaimer details ---------------- */}
                        <section className="rob-screen" hidden={current !== "disclaimerDetails"}>
                            <div className="rob-doc-bar">
                <span
                    className="material-icons-sharp rob-doc-back"
                    onClick={() => goBack("disclaimer")}
                >
                  arrow_back
                </span>{" "}
                                Disclaimer Details
                            </div>

                            <div className="rob-doc-scroll">
                                <p className="rob-doc-para">
                                    The Client's attention is drawn to the following clauses{" "}
                                    <strong>[highlighted in bold]</strong>: which limit the risks and liability of
                                    Capitec to the Client and other parties (clauses 3.3, 5.1, 5.8, 6.12, 6.13, 8.1,
                                    8.2, and 9); where the Client assumes certain risks and liabilities (clauses 3.2,
                                    3.3, 3.7, 4.2, 4.5, 5.2, 5.9, 6.8, 6.9, 8.3 and 11); and where the Client
                                    acknowledges certain facts relating to the account (clauses 5.6, 6.3, 6.6, 6.10 and
                                    6.11).
                                </p>

                                <p className="rob-doc-clause-head">1. INTERPRETATION</p>
                                <p className="rob-doc-clause">1.1 In these terms:</p>
                                <p className="rob-doc-clause">
                                    <strong>Agreement</strong> means these online banking terms, which together with
                                    the General Terms and other Product Terms make up the whole agreement between you
                                    and Ca[pitec]...
                                </p>
                                <p className="rob-doc-clause">
                                    <strong>Online Banking</strong> means electronic banking done by accessing a
                                    self-service web-based portal through o[ur] website;
                                </p>
                                <p className="rob-doc-clause">
                                    <strong>Services</strong> means banking facilities, services and prod[ucts] offered
                                    by us; and
                                </p>
                                <p className="rob-doc-clause">
                                    <strong>Users</strong> means Super-users and Sub-users collectively [as defined]
                                    &hellip; Terms used (but not otherwise defined) in this Agree[ment] have, unless
                                    indicated otherwise, the meanings give[n] them in the General Terms; and
                                </p>
                                <p className="rob-doc-clause">1.2 The General Terms shall be deemed to be incorpo[rated]&hellip;</p>
                            </div>

                            <button
                                type="button"
                                className="rob-btn-solid"
                                onClick={() => showScreen("manageBanking")}
                            >
                                Accept
                            </button>
                        </section>

                        {/* ---------------- STEP 40: Manage your banking ---------------- */}
                        <section className="rob-screen" hidden={current !== "manageBanking"}>
                            <div className="rob-bar">Manage your banking</div>
                            <div className="rob-manage-illustration">
                                <span className="material-icons-sharp">groups</span>
                            </div>
                            <h2 className="rob-title rob-center">Take control of your business banking</h2>
                            <p className="rob-sub rob-center">
                                Set your spending and transfer limits to match your business needs. You can update
                                them anytime in Settings.
                            </p>

                            <div className="rob-card">
                                <h3 className="rob-card-title">Account limits</h3>
                                <a
                                    href="#"
                                    className="rob-add-link"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        showScreen("settingsLimits");
                                    }}
                                >
                                    Set up now
                                </a>
                            </div>

                            <a
                                href="#"
                                className="rob-footer-link"
                                onClick={(e) => {
                                    e.preventDefault();
                                    showScreen("dashboard");
                                }}
                            >
                                Start transacting
                            </a>
                        </section>

                        {/* ---------------- STEP 41: Settings - manage limits ---------------- */}
                        <section className="rob-screen" hidden={current !== "settingsLimits"}>
                            <div className="rob-doc-bar">
                <span
                    className="material-icons-sharp rob-doc-back"
                    onClick={() => goBack("dashboard")}
                >
                  arrow_back
                </span>{" "}
                                Settings
                            </div>

                            <p className="rob-card-label">
                                Profile limit <a href="#" className="rob-link">Edit</a>
                            </p>
                            <p className="rob-hint">What is a profile limit?</p>
                            <div className="rob-limit-card">
                                <span>Daily profile limit</span>
                                <strong>R 1 000.00</strong>
                            </div>

                            <p className="rob-card-label">
                                Account limits{" "}
                                <a
                                    href="#"
                                    className="rob-link"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setAccountLimitEditVisible(true);
                                    }}
                                >
                                    Edit
                                </a>
                            </p>
                            <p className="rob-hint">What is an account limit?</p>
                            <div className="rob-limit-card rob-limit-card-account">
                                <div className="rob-limit-card-top">
                                    <span>Zoomies &middot; 1054 3847 54</span>
                                    <span className="material-icons-sharp">chevron_right</span>
                                </div>
                                <div className="rob-limit-card-bottom">
                                    <span>Account limit</span>
                                    <strong>{accountLimitValue}</strong>
                                </div>
                            </div>
                            <div className="rob-field" hidden={!accountLimitEditVisible}>
                                <label className="rob-label" htmlFor="robAccountLimitInput">
                                    New account limit
                                </label>
                                <input
                                    type="text"
                                    className="rob-input"
                                    id="robAccountLimitInput"
                                    placeholder="R0.00"
                                    value={accountLimitInput}
                                    onChange={(e) => setAccountLimitInput(e.target.value)}
                                />
                                <button type="button" className="rob-btn-solid" onClick={handleAccountLimitSave}>
                                    Save
                                </button>
                            </div>

                            <div className="rob-toast rob-toast-success" hidden={!limitToastVisible}>
                                Success. The account limit has been updated.
                            </div>

                            <button
                                type="button"
                                className="rob-btn-outline"
                                onClick={() => showScreen("dashboard")}
                            >
                                Done
                            </button>
                        </section>

                        {/* ---------------- STEP 42: GlobalBiz dashboard ---------------- */}
                        <section className="rob-screen" hidden={current !== "dashboard"}>
                            <div className="rob-dash-topbar">
                                <span className="material-icons-sharp">menu</span>
                                <span className="rob-globalbiz-word rob-dash-word">GlobalBiz</span>
                                <span className="rob-dash-topbar-right">
                  <span className="material-icons-sharp">chat_bubble</span>
                  <span className="rob-avatar-circle rob-avatar-circle-sm">MR</span>
                </span>
                            </div>

                            <h2 className="rob-title">Welcome, Mariska</h2>

                            <div className="rob-card rob-whatnext-card" hidden={!whatNextVisible}>
                                <button
                                    type="button"
                                    className="rob-toast-close rob-whatnext-close"
                                    onClick={() => setWhatNextVisible(false)}
                                >
                                    &times;
                                </button>
                                <p className="rob-card-desc">
                                    Set your spending and transfer limits to match your business needs. You can update
                                    them anytime in Settings.
                                </p>
                                <div
                                    className="rob-expand-row"
                                    onClick={() => showScreen("settingsLimits")}
                                >
                                    <span className="material-icons-sharp">tune</span>
                                    <span>Setup your account limits &ndash; This is not your card limits</span>
                                    <span className="material-icons-sharp">chevron_right</span>
                                </div>
                            </div>

                            <p className="rob-card-label">Accounts</p>
                            <div className="rob-account-row">
                                <span>1 Current Account</span>
                                <span className="rob-account-balance">R0.00</span>
                                <span className="material-icons-sharp">chevron_right</span>
                            </div>

                            <div className="rob-favorites-header">
                                <p className="rob-card-label">Favourites</p>
                                <a href="#" className="rob-link">
                                    Edit
                                </a>
                            </div>
                            <div className="rob-favorites-grid">
                                <div className="rob-favorite-box">
                                    <span className="material-icons-sharp">person</span>
                                    <span className="rob-favorite-title">Pay saved beneficiary</span>
                                </div>
                                <div className="rob-favorite-box">
                                    <span className="material-icons-sharp">send</span>
                                    <span className="rob-favorite-title">Pay once-off beneficiary</span>
                                </div>
                                <div className="rob-favorite-box">
                                    <span className="material-icons-sharp">groups</span>
                                    <span className="rob-favorite-title">Group or Multiple payments</span>
                                </div>
                                <div className="rob-favorite-box">
                                    <span className="material-icons-sharp">sync_alt</span>
                                    <span className="rob-favorite-title">Transfer money</span>
                                </div>
                            </div>

                            <div className="rob-bottom-nav">
                <span className="rob-nav-item active">
                  <span className="material-icons-sharp">home</span>Home
                </span>
                                <span className="rob-nav-item">
                  <span className="material-icons-sharp">account_balance_wallet</span>Accounts
                </span>
                                <span className="rob-nav-item">
                  <span className="material-icons-sharp">sync_alt</span>Transact
                </span>
                                <span className="rob-nav-item">
                  <span className="material-icons-sharp">credit_card</span>Cards
                </span>
                                <span className="rob-nav-item">
                  <span className="material-icons-sharp">explore</span>Explore
                </span>
                            </div>
                        </section>
                    </div>
                </div>

            </div>
    );
}