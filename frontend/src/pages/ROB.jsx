import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

/* ── helpers ──────────────────────────────────────────── */
function EyeInput({ id, placeholder, value, onChange, maxLength }) {
    const [show, setShow] = useState(false);
    return (
        <div className="rob-input-eye-wrap">
            <input
                type={show ? 'text' : 'password'}
                className="rob-input"
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                maxLength={maxLength}
            />
            <span
                className="material-icons-sharp rob-eye-toggle"
                onClick={() => setShow((s) => !s)}
            >
                {show ? 'visibility_off' : 'visibility'}
            </span>
        </div>
    );
}

function LoadingSquares() {
    return (
        <div className="rob-loading-squares">
            <span className="rob-sq rob-sq-blue"></span>
            <span className="rob-sq rob-sq-navy"></span>
            <span className="rob-sq rob-sq-gray"></span>
            <span className="rob-sq rob-sq-red"></span>
        </div>
    );
}

function BrowserChrome() {
    return (
        <div className="rob-browser-chrome">
            <span className="material-icons-sharp">arrow_back</span>
            <span className="rob-browser-url">business.capitecbank.co.za</span>
            <span className="material-icons-sharp">arrow_forward</span>
        </div>
    );
}

/* ── main component ───────────────────────────────────── */
export default function ROB() {
    const navigate = useNavigate();
    const [screen, setScreen] = useState('chooser');

    /* chooser state */
    const [mainToggle, setMainToggle] = useState('signin'); // 'signin' | 'open'
    const [forToggle, setForToggle] = useState(null); // 'myself' | 'business'

    /* forms */
    const [signupSaId, setSignupSaId] = useState('');
    const [signupCell, setSignupCell] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupEmailConfirm, setSignupEmailConfirm] = useState('');
    const [signupConsent, setSignupConsent] = useState(false);
    const [cookieBannerVisible, setCookieBannerVisible] = useState(true);

    const [idType, setIdType] = useState('said');

    const [privacyOffers, setPrivacyOffers] = useState(true);
    const [privacyMarketing, setPrivacyMarketing] = useState(true);

    const [otp1, setOtp1] = useState('');
    const [otp1Timer, setOtp1Timer] = useState(120);
    const otp1Interval = useRef(null);

    const [homeAddressVisible, setHomeAddressVisible] = useState(false);
    const [homeAddress, setHomeAddress] = useState('');
    const [repTitle, setRepTitle] = useState('Ms');
    const [tradingAddrSame, setTradingAddrSame] = useState(false);
    const [differentTradingVisible, setDifferentTradingVisible] = useState(false);

    const [tradingName, setTradingName] = useState('');
    const [sector, setSector] = useState('');
    const [sourceFunds, setSourceFunds] = useState('');
    const [turnover, setTurnover] = useState('');
    const [employees, setEmployees] = useState('');
    const [taxSa, setTaxSa] = useState('');
    const [taxOther, setTaxOther] = useState('');

    const [accordionOpen, setAccordionOpen] = useState({ terms: true, useOfAccount: true, onlineBanking: false });
    const [agreementsCheck, setAgreementsCheck] = useState(false);
    const [eSigCheck, setESigCheck] = useState(true);
    const [esigToastVisible, setEsigToastVisible] = useState(true);
    const [agreementSignDate, setAgreementSignDate] = useState('');

    const [usernameVal, setUsernameVal] = useState('Mariskarossouw5@gmail.com');
    const [usernameCustom, setUsernameCustom] = useState(false);
    const [differentEmail, setDifferentEmail] = useState('');

    const [obUsername, setObUsername] = useState('');
    const [obPassword, setObPassword] = useState('');
    const [passwordResetToast, setPasswordResetToast] = useState(false);

    const [otpBrowserVal, setOtpBrowserVal] = useState('');
    const [otpBrowserTitle, setOtpBrowserTitle] = useState('OTP Verification');
    const [otpBrowserSub, setOtpBrowserSub] = useState('An OTP has been sent to your registered mobile number.');
    const [otpBrowserNext, setOtpBrowserNext] = useState('welcomeLetter');

    const [newPw1, setNewPw1] = useState('');
    const [newPw2, setNewPw2] = useState('');

    const [pin1, setPin1] = useState('');
    const [pin2, setPin2] = useState('');

    const [remotePinVal, setRemotePinVal] = useState('');

    const [accountLimitVal, setAccountLimitVal] = useState('R0.00');
    const [accountLimitEdit, setAccountLimitEdit] = useState(false);
    const [accountLimitInput, setAccountLimitInput] = useState('');
    const [limitToastVisible, setLimitToastVisible] = useState(false);

    const [whatNextVisible, setWhatNextVisible] = useState(true);
    const [selfieFor, setSelfieFor] = useState('otp'); // 'otp' | 'sign'

    /* OTP timer */
    useEffect(() => {
        if (screen === 'otp1') {
            setOtp1Timer(120);
            otp1Interval.current = setInterval(() => {
                setOtp1Timer((t) => {
                    if (t <= 1) { clearInterval(otp1Interval.current); return 0; }
                    return t - 1;
                });
            }, 1000);
        }
        return () => clearInterval(otp1Interval.current);
    }, [screen]);

    /* Auto-advance loading screen */
    useEffect(() => {
        if (screen === 'loading') {
            const t = setTimeout(() => setScreen('application'), 1800);
            return () => clearTimeout(t);
        }
        if (screen === 'otpProcessing') {
            const t = setTimeout(() => setScreen('selfieIntro'), 1800);
            return () => clearTimeout(t);
        }
    }, [screen]);

    /* stamp datetime when agreement sign screen appears */
    useEffect(() => {
        if (screen === 'agreementSign1' || screen === 'agreementSigned') {
            const d = new Date();
            setAgreementSignDate(d.toISOString().replace('T', ' ').substring(0, 19) + ' UTC');
        }
    }, [screen]);

    function fmtTimer(s) {
        const m = Math.floor(s / 60).toString().padStart(2, '0');
        const sec = (s % 60).toString().padStart(2, '0');
        return `${m}:${sec}`;
    }

    function go(s) { setScreen(s); }

    /* chooser "Get Started" logic */
    function handleGetStarted() {
        if (mainToggle === 'signin') {
            navigate('/Sign-In');
        } else {
            go('loading');
        }
    }

    /* OTP browser helper — sets context then navigates */
    function goOtpBrowser(title, sub, next) {
        setOtpBrowserTitle(title);
        setOtpBrowserSub(sub);
        setOtpBrowserNext(next);
        setOtpBrowserVal('');
        go('otpBrowser');
    }

    /* Keypad helper for browser screens */
    function handleKeypad(target, setter, max) {
        return (key) => {
            if (key === 'backspace') { setter((v) => v.slice(0, -1)); return; }
            if (key === 'go') return;
            setter((v) => (v.length < (max || 20) ? v + key : v));
        };
    }

    function Keypad({ onKey }) {
        const keys = ['1','2','3','4','5','6','7','8','9','go','0','backspace'];
        return (
            <div className="rob-keypad">
                {keys.map((k) => (
                    <button
                        key={k}
                        type="button"
                        className={'rob-keypad-btn' + (k === 'go' ? ' rob-keypad-btn-wide' : '')}
                        onClick={() => onKey(k)}
                    >
                        {k === 'backspace' ? <span className="material-icons-sharp">backspace</span> : k === 'go' ? 'Go' : k}
                    </button>
                ))}
            </div>
        );
    }

    /* ── screens ──────────────────────────────────────── */
    const screens = {

        /* 1. Chooser */
        chooser: (
            <section className="rob-screen rob-screen-chooser">
                <div className="rob-hero">
                    <img src="/images/Logo.png" className="rob-hero-logo" alt="Capitec logo" />
                    <img src="/images/capihello.png" className="rob-hero-hello" alt="hello" />
                </div>
                <h2 className="rob-question">What would you like to do?</h2>
                <div className="rob-toggle">
                    <button type="button" className={'rob-toggle-opt' + (mainToggle === 'signin' ? ' active' : '')} onClick={() => { setMainToggle('signin'); setForToggle(null); }}>Sign in</button>
                    <button type="button" className={'rob-toggle-opt' + (mainToggle === 'open' ? ' active' : '')} onClick={() => setMainToggle('open')}>Open an account</button>
                </div>
                {mainToggle === 'open' && (
                    <div className="rob-for-row">
                        <div className="rob-for-label">for</div>
                        <div className="rob-toggle">
                            <button type="button" className={'rob-toggle-opt' + (forToggle === 'myself' ? ' active' : '')} onClick={() => setForToggle('myself')}>Myself</button>
                            <button type="button" className={'rob-toggle-opt' + (forToggle === 'business' ? ' active' : '')} onClick={() => setForToggle('business')}>My Business</button>
                        </div>
                    </div>
                )}
                {(mainToggle === 'signin' || forToggle) && (
                    <button type="button" className="rob-get-started" onClick={handleGetStarted}>Get Started</button>
                )}
            </section>
        ),

        /* 2. Loading */
        loading: (
            <section className="rob-screen rob-screen-loading">
                <div className="rob-spinner"></div>
                <LoadingSquares />
            </section>
        ),

        /* 3. Application */
        application: (
            <section className="rob-screen rob-screen-application">
                <div className="rob-bar">Business Account Application</div>
                <h2 className="rob-title">Open a business account</h2>
                <p className="rob-sub">Start a new application or continue an existing one.</p>
                <div className="rob-card">
                    <h3 className="rob-card-title">New Application</h3>
                    <p className="rob-card-desc">You need your SA ID number, email address, SA cellphone number and CIPC number if you have a registered business.</p>
                    <button type="button" className="rob-btn-solid" onClick={() => go('biztype')}>Start new application</button>
                </div>
                <div className="rob-card">
                    <h3 className="rob-card-title">Resume Application</h3>
                    <p className="rob-card-desc">If you started an application, you need the reference code we've emailed you to continue.</p>
                    <button type="button" className="rob-btn-outline" onClick={() => go('biztype')}>Continue to existing application</button>
                </div>
            </section>
        ),

        /* 4. Business type */
        biztype: (
            <section className="rob-screen rob-screen-biztype">
                <div className="rob-bar">Choose a business type</div>
                <div className="rob-card rob-biztype-card">
                    <h3 className="rob-card-title">Private company or close corporation</h3>
                    <div className="rob-biztype-art"><span className="material-icons-sharp">groups</span></div>
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
                    <button type="button" className="rob-btn-solid" onClick={() => go('idtype')}>Get Started</button>
                </div>
                <div className="rob-card rob-biztype-card">
                    <h3 className="rob-card-title">Sole proprietorship</h3>
                    <div className="rob-biztype-art"><span className="material-icons-sharp">badge</span></div>
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
                    <button type="button" className="rob-btn-solid" onClick={() => go('idtype')}>Get Started</button>
                </div>
                <div className="rob-card rob-biztype-card">
                    <h3 className="rob-card-title">Other</h3>
                    <div className="rob-biztype-art"><span className="material-icons-sharp">diversity_3</span></div>
                    <p className="rob-card-desc">The business is one of the following: If your business is a trust, partnership and/or if one of the directors or members is a foreign national with a valid passport.</p>
                    <button type="button" className="rob-btn-solid" onClick={() => go('idtype')}>Get in touch</button>
                </div>
            </section>
        ),

        /* 5. ID type */
        idtype: (
            <section className="rob-screen">
                <div className="rob-bar">Tell us about yourself</div>
                <p className="rob-sub">Please specify your identification type below</p>
                <div className="rob-radio-pills">
                    <label className="rob-radio-pill">
                        <input type="radio" name="robIdType" value="said" checked={idType === 'said'} onChange={() => setIdType('said')} />
                        <span className="rob-radio-dot"></span>
                        <span>SA ID</span>
                    </label>
                    <label className="rob-radio-pill">
                        <input type="radio" name="robIdType" value="passport" checked={idType === 'passport'} onChange={() => setIdType('passport')} />
                        <span className="rob-radio-dot"></span>
                        <span>Passport</span>
                    </label>
                </div>
                <button type="button" className="rob-btn-solid" onClick={() => go('signupForm')}>Continue</button>
                <p className="rob-disclaimer">Your information is secured and safe. Capitec Bank is an authorised financial services provider (FSP 46669) and registered credit provider (NCRCP13). Capitec Bank Limited Reg. No: 1980/003695/06</p>
                <p className="rob-disclaimer-links"><a href="#s">Privacy Centre</a> | <a href="#s">Terms and Conditions</a> | <a href="#s">Security</a></p>
            </section>
        ),

        /* 6. Sign-up form */
        signupForm: (
            <section className="rob-screen">
                <div className="rob-bar">Sign up for your business account</div>
                {cookieBannerVisible && (
                    <div className="rob-cookie-banner">
                        <span className="material-icons-sharp rob-cookie-icon">info</span>
                        <button type="button" className="rob-cookie-close" aria-label="Close" onClick={() => setCookieBannerVisible(false)}>&times;</button>
                        <p className="rob-cookie-text">This website uses cookies to ensure you get the best experience.</p>
                        <div className="rob-cookie-links">
                            <a href="#s" className="rob-cookie-link">Read Cookie Policy</a>
                            <a href="#s" className="rob-cookie-link" onClick={(e) => { e.preventDefault(); setCookieBannerVisible(false); }}>Accept Cookies</a>
                        </div>
                    </div>
                )}
                <p className="rob-sub">Your journey with Capitec Business starts now.</p>
                <div className="rob-field">
                    <label className="rob-label" htmlFor="robSignupSaId">SA ID number</label>
                    <input type="text" className="rob-input" id="robSignupSaId" value={signupSaId} onChange={(e) => setSignupSaId(e.target.value)} />
                </div>
                <div className="rob-field">
                    <label className="rob-label" htmlFor="robSignupCell">Cellphone number</label>
                    <input type="text" className="rob-input" id="robSignupCell" placeholder="e.g 0821234567" value={signupCell} onChange={(e) => setSignupCell(e.target.value)} />
                </div>
                <div className="rob-field">
                    <label className="rob-label" htmlFor="robSignupEmail">Email address</label>
                    <input type="email" className="rob-input" id="robSignupEmail" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
                </div>
                <div className="rob-field">
                    <label className="rob-label" htmlFor="robSignupEmailConfirm">Confirm email address</label>
                    <input type="email" className="rob-input" id="robSignupEmailConfirm" value={signupEmailConfirm} onChange={(e) => setSignupEmailConfirm(e.target.value)} />
                </div>
                <label className="rob-checkbox-row">
                    <input type="checkbox" checked={signupConsent} onChange={(e) => setSignupConsent(e.target.checked)} />
                    <span>I confirm that I have been given the opportunity to read the <a href="#s" className="rob-link">privacy notice</a>, including who Capitec shares personal information with.</span>
                </label>
                <button
                    type="button"
                    className="rob-btn-solid"
                    disabled={!signupSaId || !signupCell || !signupEmail || !signupEmailConfirm || !signupConsent}
                    onClick={() => go('privacy')}
                >
                    Create Profile
                </button>
                <a href="#s" className="rob-footer-link">Already have a business account? Sign In</a>
                <p className="rob-disclaimer">Your information is secured and safe. Capitec Bank is an authorised financial services provider (FSP 46669) and registered credit provider (NCRCP13). Capitec Bank Limited Reg. No: 1980/003695/06</p>
                <p className="rob-disclaimer-links"><a href="#s">Privacy Centre</a> | <a href="#s">Terms and Conditions</a> | <a href="#s">Security</a></p>
            </section>
        ),

        /* 7. Privacy */
        privacy: (
            <section className="rob-screen">
                <div className="rob-card rob-privacy-card">
                    <h3 className="rob-card-title">Your privacy</h3>
                    <p className="rob-card-desc">We will only use your business information with your consent. By looking at the way you bank, we can suggest ways to improve your financial life.</p>
                    <div className="rob-note-box">
                        <span className="material-icons-sharp rob-note-icon">info</span>
                        <p>Note: By continuing you consent to the following. You can update these settings under your profile on online banking.</p>
                    </div>
                    <label className="rob-checkbox-row">
                        <input type="checkbox" checked={privacyOffers} onChange={(e) => setPrivacyOffers(e.target.checked)} />
                        <span>Get personalised offers for your business</span>
                    </label>
                    <label className="rob-checkbox-row">
                        <input type="checkbox" checked={privacyMarketing} onChange={(e) => setPrivacyMarketing(e.target.checked)} />
                        <span>Get our latest marketing offers on improved products and services</span>
                    </label>
                    <div className="rob-btn-row">
                        <button type="button" className="rob-btn-outline" onClick={() => go('signupForm')}>Back</button>
                        <button type="button" className="rob-btn-solid" onClick={() => go('otp1')}>Continue</button>
                    </div>
                </div>
            </section>
        ),

        /* 8. OTP Verification */
        otp1: (
            <section className="rob-screen">
                <div className="rob-bar">OTP Verification</div>
                <div className="rob-otp-art"><span className="material-icons-sharp">smartphone</span></div>
                <p className="rob-otp-masked">+2773******30</p>
                <p className="rob-otp-timer">Time left to enter OTP: {fmtTimer(otp1Timer)}</p>
                <p className="rob-sub rob-center">A One-Time Password (OTP) has been sent to your cellphone number.</p>
                <div className="rob-field">
                    <label className="rob-label">OTP</label>
                    <EyeInput id="robOtp1Input" value={otp1} onChange={(e) => setOtp1(e.target.value)} />
                </div>
                <button type="button" className="rob-btn-solid" disabled={!otp1} onClick={() => go('otpProcessing')}>Submit</button>
                <button type="button" className="rob-btn-outline" onClick={() => {}}>Update cellphone number</button>
                <a href="#s" className="rob-footer-link" onClick={(e) => { e.preventDefault(); go('signupForm'); }}>Cancel</a>
            </section>
        ),

        /* 9. OTP Processing */
        otpProcessing: (
            <section className="rob-screen">
                <div className="rob-processing-modal">
                    <span className="material-icons-sharp rob-otp-art-icon">smartphone</span>
                    <p className="rob-processing-text">One moment while we process your request&hellip;</p>
                    <LoadingSquares />
                </div>
            </section>
        ),

        /* 10. Selfie intro */
        selfieIntro: (
            <section className="rob-screen">
                <p className="rob-step-label">Step 1 of 4</p>
                <div className="rob-bar">Verify Identity</div>
                <h2 className="rob-title">Get ready to verify your identity with a selfie</h2>
                <p className="rob-sub">In the next steps, we will verify your identity with the Department of Home Affairs.</p>
                <div className="rob-selfie-illustration">
                    <span className="material-icons-sharp rob-selfie-illustration-ring">face</span>
                    <span className="material-icons-sharp rob-selfie-illustration-phone">smartphone</span>
                </div>
                <p className="rob-card-label">Make sure you:</p>
                <ul className="rob-card-list">
                    <li>Move to a <strong>well-lit area</strong></li>
                    <li><strong>Avoid direct sunlight</strong></li>
                    <li><strong>Avoid shadows</strong></li>
                    <li>Remove any <strong>masks, glasses and hats</strong></li>
                </ul>
                <div className="rob-homeaffairs">
                    <span className="material-icons-sharp">shield</span>
                    <span>REPUBLIC OF SOUTH AFRICA</span>
                </div>
                <button type="button" className="rob-btn-solid" onClick={() => { setSelfieFor('otp'); go('cameraPermission'); }}>Next</button>
            </section>
        ),

        /* 11. Camera permission */
        cameraPermission: (
            <section className="rob-screen">
                <div className="rob-browser-permission">
                    <span className="material-icons-sharp rob-permission-icon">photo_camera</span>
                    <p className="rob-permission-text">openbusiness.capitecbank.co.za wants to use your camera</p>
                    <button type="button" className="rob-btn-solid" onClick={() => go('selfieCapture')}>Allow while visiting the site</button>
                    <button type="button" className="rob-btn-solid" onClick={() => go('selfieCapture')}>Allow this time</button>
                    <button type="button" className="rob-permission-never" onClick={() => go('selfieCapture')}>Never allow</button>
                </div>
            </section>
        ),

        /* 12. Take selfie (dark) */
        selfieCapture: (
            <section className="rob-screen rob-screen-dark">
                <div className="rob-selfie-header"><span className="material-icons-sharp">lock</span> Take a selfie</div>
                <div className="rob-selfie-frame">
                    <div className="rob-selfie-oval">
                        <span className="rob-selfie-oval-text">Position your face to fill the frame</span>
                    </div>
                </div>
                <div className="rob-btn-row">
                    <a href="#s" className="rob-footer-link rob-footer-link-light" onClick={(e) => { e.preventDefault(); go(selfieFor === 'sign' ? 'agreementDoc' : 'selfieIntro'); }}>Cancel</a>
                    <button type="button" className="rob-btn-solid rob-btn-narrow" onClick={() => go(selfieFor === 'sign' ? 'agreementSigned' : 'repDetails')}>Capture</button>
                </div>
            </section>
        ),

        /* 13. Business representative details */
        repDetails: (
            <section className="rob-screen">
                <div className="rob-bar">Business Representatives Details</div>
                <div className="rob-rep-header">
                    <span className="rob-avatar-circle">MR</span>
                    <h2 className="rob-title">Mariska Rossouw</h2>
                </div>
                <p className="rob-card-label">Personal details</p>
                <div className="rob-field">
                    <label className="rob-label" htmlFor="robRepTitle">Title</label>
                    <select className="rob-input" id="robRepTitle" value={repTitle} onChange={(e) => setRepTitle(e.target.value)}>
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
                {!homeAddressVisible && (
                    <a href="#s" className="rob-add-link" onClick={(e) => { e.preventDefault(); setHomeAddressVisible(true); }}>+ Add my home address</a>
                )}
                {homeAddressVisible && (
                    <div className="rob-field">
                        <label className="rob-label">Home address</label>
                        <textarea className="rob-input rob-textarea" rows="2" placeholder="Street, suburb, city, postal code" value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)}></textarea>
                    </div>
                )}
                <button type="button" className="rob-btn-solid" disabled={homeAddressVisible && !homeAddress} onClick={() => go('tradingAddress1')}>Next</button>
            </section>
        ),

        /* 14. Trading address */
        tradingAddress1: (
            <section className="rob-screen">
                <p className="rob-step-label">Step 2 of 4</p>
                <div className="rob-bar">Business Information</div>
                <h2 className="rob-title">Is your trading address the same as one below?</h2>
                <label className="rob-radio-pill rob-radio-pill-block">
                    <input type="radio" name="robTradingAddr" checked={tradingAddrSame} onChange={() => { setTradingAddrSame(true); setDifferentTradingVisible(false); }} />
                    <span className="rob-radio-dot"></span>
                    <span>Yes it's the same: 2 Terblanche Street, Kuils River, Cape Town, 7580, Western Cape, South Africa</span>
                </label>
                {!differentTradingVisible && (
                    <a href="#s" className="rob-add-link" onClick={(e) => { e.preventDefault(); setDifferentTradingVisible(true); setTradingAddrSame(false); }}>+ Add a different trading address</a>
                )}
                {differentTradingVisible && (
                    <div className="rob-field">
                        <label className="rob-label">Different trading address</label>
                        <textarea className="rob-input rob-textarea" rows="2" placeholder="Street, suburb, city, postal code"></textarea>
                    </div>
                )}
                <button type="button" className="rob-btn-solid" disabled={!tradingAddrSame && !differentTradingVisible} onClick={() => go('agreementSign1')}>Next</button>
            </section>
        ),

        /* 15. Agreement sign — selfie signature */
        agreementSign1: (
            <section className="rob-screen">
                <div className="rob-doc-bar">
                    <span className="material-icons-sharp rob-doc-back" onClick={() => go('tradingAddress1')}>arrow_back</span> Business account agreement
                </div>
                <div className="rob-doc-photo-frame">
                    <div className="rob-doc-photo-placeholder"><span className="material-icons-sharp">person</span></div>
                    <p className="rob-doc-caption">A digital image of a signatory's face, captured with the intent of it being used as a signature, is uniquely linked to this record together with the date/time generated at the time that the signatory captured the digital image.</p>
                </div>
                <p className="rob-card-label">Electronically signed by:</p>
                <p className="rob-doc-line">First Name: Mariska</p>
                <p className="rob-doc-line">Surname: Rossouw</p>
                <p className="rob-doc-line">{agreementSignDate}</p>
                <p className="rob-doc-footnote">*Time recorded as Coordinated Universal Time (UTC). South African standard time is 2 hours ahead of UTC.</p>
                <button type="button" className="rob-btn-solid" onClick={() => go('businessInfo')}>Sign Agreement</button>
            </section>
        ),

        /* 16. Business information */
        businessInfo: (
            <section className="rob-screen">
                <p className="rob-step-label">Step 2 of 4</p>
                <div className="rob-bar">Business Information</div>
                <h2 className="rob-title">Tell us more about your business</h2>
                <div className="rob-field">
                    <label className="rob-label">Trading address</label>
                    <div className="rob-readonly-field">2 Terblanche Street, Kuils River, Cape Town, 7580</div>
                </div>
                <div className="rob-field">
                    <label className="rob-label" htmlFor="robTradingName">Trading name</label>
                    <input type="text" className="rob-input" id="robTradingName" placeholder="Optional" value={tradingName} onChange={(e) => setTradingName(e.target.value)} />
                </div>
                <div className="rob-field">
                    <label className="rob-label" htmlFor="robSector">Which sector does your business operate in?</label>
                    <select className="rob-input" id="robSector" value={sector} onChange={(e) => setSector(e.target.value)}>
                        <option value="">Select a sector</option>
                        <option>Retail and trade</option>
                        <option>Food and beverage</option>
                        <option>Professional services</option>
                        <option>Transport and logistics</option>
                        <option>Other</option>
                    </select>
                </div>
                <div className="rob-field">
                    <label className="rob-label" htmlFor="robSourceFunds">Source of funds</label>
                    <select className="rob-input" id="robSourceFunds" value={sourceFunds} onChange={(e) => setSourceFunds(e.target.value)}>
                        <option value="">Select a source</option>
                        <option>Business income</option>
                        <option>Savings</option>
                        <option>Loan</option>
                        <option>Investment</option>
                    </select>
                    <p className="rob-hint">Where you got the money to open the account</p>
                </div>
                <div className="rob-field">
                    <label className="rob-label" htmlFor="robTurnover">Annual sales turnover</label>
                    <input type="text" className="rob-input" id="robTurnover" value={turnover} onChange={(e) => setTurnover(e.target.value)} />
                    <p className="rob-hint">How much your business makes in a year</p>
                </div>
                <div className="rob-field">
                    <label className="rob-label" htmlFor="robEmployees">Number of employees</label>
                    <input type="text" className="rob-input" id="robEmployees" value={employees} onChange={(e) => setEmployees(e.target.value)} />
                    <p className="rob-hint">Including the owner</p>
                </div>
                <p className="rob-card-label">Tax details</p>
                <p className="rob-question-sm">Do you pay income tax in South Africa?</p>
                <div className="rob-radio-pills">
                    <label className="rob-radio-pill"><input type="radio" name="robTaxSa" value="yes" checked={taxSa === 'yes'} onChange={() => setTaxSa('yes')} /><span className="rob-radio-dot"></span><span>Yes</span></label>
                    <label className="rob-radio-pill"><input type="radio" name="robTaxSa" value="no" checked={taxSa === 'no'} onChange={() => setTaxSa('no')} /><span className="rob-radio-dot"></span><span>No</span></label>
                </div>
                <p className="rob-question-sm">Do you pay tax in another country?</p>
                <div className="rob-radio-pills">
                    <label className="rob-radio-pill"><input type="radio" name="robTaxOther" value="yes" checked={taxOther === 'yes'} onChange={() => setTaxOther('yes')} /><span className="rob-radio-dot"></span><span>Yes</span></label>
                    <label className="rob-radio-pill"><input type="radio" name="robTaxOther" value="no" checked={taxOther === 'no'} onChange={() => setTaxOther('no')} /><span className="rob-radio-dot"></span><span>No</span></label>
                </div>
                <button type="button" className="rob-btn-solid" disabled={!sector || !sourceFunds || !taxSa || !taxOther} onClick={() => go('agreementsList')}>Next</button>
            </section>
        ),

        /* 17. Agreements list */
        agreementsList: (
            <section className="rob-screen">
                <p className="rob-step-label">Step 3 of 4</p>
                <div className="rob-bar">Agreements</div>
                <p className="rob-sub">Please read and accept the agreement to complete the application process.</p>
                <p className="rob-agreements-count">No. of Agreements: 1</p>
                <div className="rob-accordion">
                    <p className="rob-card-label">Business Account</p>
                    {[
                        { key: 'terms', label: 'General terms', body: 'By giving us information about yourself and your business, you confirm that it is true and correct. Please inform us if your business becomes "financially distressed" by means of liquidation, sequestration, debt review or administration.' },
                        { key: 'useOfAccount', label: 'Use of account', body: 'You agree and authorise the bank to open your business account. You may not overdraw the account unless you have an approved overdraft facility. You will be charged an extra fee each time a payment causes the account to become overdrawn or exceeds the agreed overdraft limit.' },
                        { key: 'onlineBanking', label: 'Online banking', body: 'You need to reset your temporary password before signing in to online banking for the first time. Do not share username or passwords details with anyone. Make sure there is updated anti-virus software on your devices.' },
                    ].map((item) => (
                        <div className="rob-accordion-item" key={item.key}>
                            <button
                                type="button"
                                className={'rob-accordion-head' + (accordionOpen[item.key] ? ' expanded' : '')}
                                onClick={() => setAccordionOpen((s) => ({ ...s, [item.key]: !s[item.key] }))}
                            >
                                {item.label} <span className="material-icons-sharp rob-accordion-chevron">{accordionOpen[item.key] ? 'expand_less' : 'expand_more'}</span>
                            </button>
                            {accordionOpen[item.key] && <div className="rob-accordion-body">{item.body}</div>}
                        </div>
                    ))}
                </div>
                <label className="rob-checkbox-row">
                    <input type="checkbox" checked={agreementsCheck} onChange={(e) => setAgreementsCheck(e.target.checked)} />
                    <span>I confirm that I have read, understood and agree to the <a href="#s" className="rob-link">Electronic Signature Terms &amp; Conditions</a></span>
                </label>
                <button type="button" className="rob-btn-solid" disabled={!agreementsCheck} onClick={() => go('eSigModal')}>Continue</button>
            </section>
        ),

        /* 18. Electronic signature modal */
        eSigModal: (
            <section className="rob-screen">
                <div className="rob-card">
                    <h3 className="rob-card-title">Electronic Signature Agreement</h3>
                    <p className="rob-esig-sub">Sign with a selfie</p>
                    <p className="rob-card-desc">We've taken the paperwork out of business banking. With Capitec, you can sign Agreements and any other documents using a selfie. The image of your face helps us verify your identity and acts as a signature on Agreements. This helps protect your accounts against fraud, while giving you the freedom to bank wherever you are.</p>
                    <label className="rob-checkbox-row">
                        <input type="checkbox" checked={eSigCheck} onChange={(e) => setESigCheck(e.target.checked)} />
                        <span>I confirm that I have read, understood and agree to the <a href="#s" className="rob-link">Electronic Signature Terms &amp; Conditions</a></span>
                    </label>
                    <div className="rob-btn-row">
                        <button type="button" className="rob-btn-outline" onClick={() => go('agreementsList')}>Cancel</button>
                        <button type="button" className="rob-btn-solid" onClick={() => go('agreementDoc')}>Continue</button>
                    </div>
                </div>
            </section>
        ),

        /* 19. Agreement document */
        agreementDoc: (
            <section className="rob-screen">
                <div className="rob-doc-bar">
                    <span className="material-icons-sharp rob-doc-back" onClick={() => go('eSigModal')}>arrow_back</span> Business account agreement
                </div>
                {esigToastVisible && (
                    <div className="rob-toast rob-toast-inline">
                        <span className="material-icons-sharp">info</span>
                        <span>Use of selfie &ndash; You have agreed to using your Selfie to accept Agreements</span>
                        <button type="button" className="rob-toast-close" onClick={() => setEsigToastVisible(false)}>&times;</button>
                    </div>
                )}
                <div className="rob-doc-scroll">
                    <p className="rob-doc-line"><strong>Registered Business Name:</strong></p>
                    <p className="rob-doc-line"><strong>Registration number:</strong></p>
                    <p className="rob-doc-line"><strong>Trading Name:</strong></p>
                    <p className="rob-doc-line"><strong>If Incorporated &ndash; Association or Club:</strong> Incorporated Name:, Date of Incorporation:</p>
                    <p className="rob-doc-line"><strong>If Sole Proprietor &ndash; Full Names and Surname:</strong> Mariska Rossouw, ID/Passport Number: 9610050023081, Trading Name: Zoomies</p>
                    <p className="rob-doc-line"><strong>Contact Details &ndash; Residential:</strong> 2 Terblanche Street, Kuils River, Cape Town, 7580, Western Cape, South Africa</p>
                    <p className="rob-doc-line"><strong>Business Address:</strong> 2 Terblanche Street, Kuils River, Cape Town, 7580, Western Cape, South Africa</p>
                    <p className="rob-doc-line"><strong>Cell Phone:</strong> 0739742230</p>
                    <p className="rob-doc-line"><strong>Business Email Address:</strong> Mariskarossouw5@gmail.com</p>
                    <p className="rob-doc-para">Please read the full terms of the Business Client Account Agreement, including the General Terms and all Product Terms before signing this agreement.</p>
                    <p className="rob-doc-clause-head">9. TERMINATION</p>
                    <p className="rob-doc-clause">9.1 Either party may terminate this agreement by giving the other party 60 days' written notice.</p>
                    <p className="rob-doc-clause">9.2 The bank reserves the right to terminate this relationship immediately where required to comply with any law or where the account is used fraudulently or unlawfully.</p>
                    <p className="rob-doc-clause">9.3 Termination of this agreement does not affect the bank's right to engage in business with any other person or entity, including other members of the partnership.</p>
                </div>
                <button type="button" className="rob-btn-solid" onClick={() => { setSelfieFor('sign'); go('selfieSignReady'); }}>Continue</button>
            </section>
        ),

        /* 20. Selfie sign ready (dark) */
        selfieSignReady: (
            <section className="rob-screen rob-screen-dark">
                <div className="rob-selfie-header"><span className="material-icons-sharp">lock</span> Take a selfie</div>
                <h2 className="rob-title rob-title-light">Get ready to sign the agreement using a Selfie</h2>
                <p className="rob-card-label rob-card-label-light">Make sure you:</p>
                <ul className="rob-card-list rob-card-list-light">
                    <li>Move to a <strong>well-lit area</strong></li>
                    <li><strong>Avoid direct sunlight</strong></li>
                    <li><strong>Avoid shadows</strong></li>
                    <li>Remove any <strong>masks, glasses and hats</strong></li>
                </ul>
                <button type="button" className="rob-btn-solid" onClick={() => go('selfieCapture')}>I am ready</button>
                <a href="#s" className="rob-footer-link rob-footer-link-light" onClick={(e) => { e.preventDefault(); go('agreementDoc'); }}>Cancel</a>
            </section>
        ),

        /* 21. Signed agreement */
        agreementSigned: (
            <section className="rob-screen">
                <div className="rob-bar">Business account agreement</div>
                <p className="rob-doc-para">&hellip;regarding the conduct of the Account.</p>
                <div className="rob-doc-photo-frame">
                    <div className="rob-doc-photo-placeholder"><span className="material-icons-sharp">person</span></div>
                    <p className="rob-doc-caption">A digital image of a signatory's face, captured with the intent of it being used as a signature, is uniquely linked to this record together with the date/time generated at the time that the signatory captured the digital image.</p>
                </div>
                <p className="rob-card-label">Electronically signed by:</p>
                <p className="rob-doc-line">First Name: Mariska</p>
                <p className="rob-doc-line">Surname: Rossouw</p>
                <p className="rob-doc-line">{agreementSignDate}</p>
                <p className="rob-doc-footnote">*Time recorded as Coordinated Universal Time (UTC). South African standard time is 2 hours ahead of UTC.</p>
                <h3 className="rob-card-title">Business Client Account Agreement</h3>
                <p className="rob-card-label">Business Details ("Client")</p>
                <div className="rob-doc-scroll rob-doc-scroll-short">
                    <p className="rob-doc-line"><strong>If Sole Proprietor &ndash; Full Names and Surname:</strong> Mariska Rossouw, ID/Passport Number: 9610050023081, Trading Name: Zoomies</p>
                    <p className="rob-doc-line"><strong>Contact Details &ndash; Residential:</strong> 2 Terblanche Street, Kuils River, Cape Town, 7580, Western Cape, South Africa</p>
                    <p className="rob-doc-line"><strong>Business Address:</strong> 2 Terblanche Street, Kuils River, Cape Town, 7580, Western Cape, South Africa</p>
                    <p className="rob-doc-line"><strong>Cell Phone:</strong> 0739742230</p>
                    <p className="rob-doc-line"><strong>Business Email Address:</strong> Mariskarossouw5@gmail.com</p>
                </div>
                <button type="button" className="rob-btn-solid" onClick={() => go('username')}>Done</button>
            </section>
        ),

        /* 22. Choose username */
        username: (
            <section className="rob-screen">
                <p className="rob-step-label">Step 4 of 4</p>
                <div className="rob-bar">Online Banking Access</div>
                <h2 className="rob-title">Choose your online banking username</h2>
                <div className="rob-note-box">
                    <span className="material-icons-sharp rob-note-icon">info</span>
                    <p>This username will be used to access all your banking profiles.</p>
                </div>
                <p className="rob-sub">Use this email address as your username for online banking and the app, or enter a different one.</p>
                <div className="rob-field">
                    <input type="text" className="rob-input" value={usernameVal} readOnly />
                </div>
                <label className="rob-checkbox-row">
                    <input type="checkbox" checked={usernameCustom} onChange={(e) => setUsernameCustom(e.target.checked)} />
                    <span>Enter different email address as username</span>
                </label>
                {usernameCustom && (
                    <div className="rob-field">
                        <input type="email" className="rob-input" placeholder="Enter a different email address" value={differentEmail} onChange={(e) => setDifferentEmail(e.target.value)} />
                    </div>
                )}
                <button type="button" className="rob-btn-solid" onClick={() => go('profileCreated')}>Next</button>
            </section>
        ),

        /* 23. Profile created */
        profileCreated: (
            <section className="rob-screen">
                <div className="rob-bar"><span className="material-icons-sharp rob-bar-icon">smartphone</span> Profile Created</div>
                <div className="rob-success-check"><span className="material-icons-sharp">check_circle</span></div>
                <h2 className="rob-title rob-center">Profile Created</h2>
                <p className="rob-sub rob-center">Remember to sign in to online banking and the app with your email address. A temporary password will be sent to you by SMS.</p>
                <button type="button" className="rob-btn-solid" onClick={() => go('smsNotif')}>Continue</button>
            </section>
        ),

        /* 24. SMS lock screen notifications */
        smsNotif: (
            <section className="rob-screen rob-screen-dark">
                <div className="rob-lock-screen">
                    <p className="rob-lock-time">15:21</p>
                    <p className="rob-lock-date">Fri, 10 Oct</p>
                    <div className="rob-notif">
                        <span className="material-icons-sharp rob-notif-icon">account_balance</span>
                        <div className="rob-notif-body">
                            <p className="rob-notif-from">+27839300452100</p>
                            <p className="rob-notif-text">Capitec Business: Enter OTP 342792 to continue opening your account. Never share this message with anyone. Info: 0860309250.</p>
                        </div>
                    </div>
                    <div className="rob-notif">
                        <span className="material-icons-sharp rob-notif-icon">account_balance</span>
                        <div className="rob-notif-body">
                            <p className="rob-notif-from">Capitec Business</p>
                            <p className="rob-notif-text">Your new credentials have been created. Please use your username and the following temporary password to login: T1B$47xQ</p>
                        </div>
                    </div>
                    <div className="rob-btn-row">
                        <button type="button" className="rob-btn-outline rob-btn-outline-light" onClick={() => go('accountSuccess')}>Clear</button>
                        <button type="button" className="rob-btn-solid" onClick={() => go('accountSuccess')}>Mark as read</button>
                    </div>
                </div>
            </section>
        ),

        /* 25. Account open success */
        accountSuccess: (
            <section className="rob-screen">
                <div className="rob-success-check rob-success-check-confetti"><span className="material-icons-sharp">check_circle</span></div>
                <h2 className="rob-title rob-center">Your account is open</h2>
                <p className="rob-sub rob-center">Capitec Business account number: <strong>1054384754</strong></p>
                <div className="rob-next-steps">
                    <div className="rob-next-step">
                        <p className="rob-next-step-title">1. Sign in to online banking</p>
                        <p className="rob-next-step-desc">Username: Mariskarossouw5@gmail.com</p>
                        <p className="rob-next-step-desc">Temporary password: Sent to your registered cellphone number</p>
                        <button type="button" className="rob-btn-solid" onClick={() => go('obLogin')}>Go to Online Banking</button>
                    </div>
                    <div className="rob-next-step">
                        <p className="rob-next-step-title">2. Order your debit card</p>
                        <p className="rob-next-step-desc">Sign in to online banking</p>
                        <p className="rob-next-step-desc">Order your debit card</p>
                    </div>
                    <div className="rob-next-step">
                        <p className="rob-next-step-title">3. Make your first deposit</p>
                        <p className="rob-next-step-desc">Keep your account active by depositing money into your new account</p>
                    </div>
                </div>
            </section>
        ),

        /* 26. Online banking login */
        obLogin: (
            <section className="rob-screen">
                <BrowserChrome />
                {passwordResetToast && <div className="rob-toast rob-toast-success">Success. You have reset your password.</div>}
                <h2 className="rob-title rob-center rob-globalbiz-word">GlobalBiz</h2>
                <div className="rob-field">
                    <label className="rob-label" htmlFor="robOBUsername">Username</label>
                    <input type="text" className="rob-input" id="robOBUsername" value={obUsername} onChange={(e) => setObUsername(e.target.value)} />
                </div>
                <div className="rob-field">
                    <label className="rob-label" htmlFor="robOBPassword">Password</label>
                    <EyeInput id="robOBPassword" value={obPassword} onChange={(e) => setObPassword(e.target.value)} />
                </div>
                <a href="#s" className="rob-footer-link">Forgot Password</a>
                <button type="button" className="rob-btn-solid" onClick={() => goOtpBrowser('OTP Verification', 'An OTP has been sent to your registered mobile number.', 'welcomeLetter')}>Sign In</button>
            </section>
        ),

        /* 27. Shared OTP browser screen */
        otpBrowser: (
            <section className="rob-screen">
                <BrowserChrome />
                <div className="rob-bar">{otpBrowserTitle}</div>
                <div className="rob-otp-art"><span className="material-icons-sharp">smartphone</span></div>
                <p className="rob-sub rob-center">{otpBrowserSub}</p>
                <div className="rob-field">
                    <label className="rob-label">Enter OTP</label>
                    <EyeInput value={otpBrowserVal} onChange={(e) => setOtpBrowserVal(e.target.value)} />
                </div>
                <a href="#s" className="rob-footer-link">Resend OTP</a>
                <button type="button" className="rob-btn-solid" disabled={!otpBrowserVal} onClick={() => go(otpBrowserNext)}>Submit</button>
                <Keypad onKey={handleKeypad('otpBrowser', setOtpBrowserVal, 6)} />
            </section>
        ),

        /* 28. Welcome letter */
        welcomeLetter: (
            <section className="rob-screen">
                <BrowserChrome />
                <div className="rob-doc-scroll rob-welcome-letter">
                    <p className="rob-welcome-heading">GlobalBiz</p>
                    <p className="rob-doc-line">Dear Mariska Rossouw,</p>
                    <p className="rob-card-title">Welcome to simpler business banking</p>
                    <p className="rob-doc-para">Thanks for choosing Capitec business banking, here's some important information to get you started.</p>
                    <p className="rob-card-label">Make a deposit within the next 7 days</p>
                    <p className="rob-doc-line">Bank name: Capitec Business</p>
                    <p className="rob-doc-line">Account type: Current</p>
                    <p className="rob-doc-line">Account number: 1054384754</p>
                    <p className="rob-doc-line">Branch code: 470010</p>
                    <p className="rob-card-label">Manage your cash flow anywhere 24/7</p>
                    <p className="rob-doc-line">Online banking and app username: Mariskarossouw5@gmail.com</p>
                    <p className="rob-doc-line">Temporary password: Sent to your registered cellphone number</p>
                    <p className="rob-doc-para">We have made banking simpler and more convenient for you so online banking is easy to access your accounts, order cards, make payments, and more.</p>
                    <p className="rob-doc-line">Sincerely,</p>
                    <p className="rob-doc-line">The Capitec Business Team.</p>
                </div>
                <div className="rob-welcome-footer-banner">Remember: We will never send you a direct link asking for your personal information or bank details.</div>
                <button type="button" className="rob-btn-solid" onClick={() => goOtpBrowser('OTP Verification', 'An OTP has been sent to your registered mobile number.', 'newPassword')}>Continue</button>
            </section>
        ),

        /* 29. New password */
        newPassword: (
            <section className="rob-screen">
                <BrowserChrome />
                <div className="rob-bar">New password</div>
                <div className="rob-field">
                    <label className="rob-label">New password</label>
                    <EyeInput value={newPw1} onChange={(e) => setNewPw1(e.target.value)} />
                    <p className="rob-hint">8+ characters, 1 uppercase, 1 number, 1 special character</p>
                </div>
                <div className="rob-field">
                    <label className="rob-label">Confirm password</label>
                    <EyeInput value={newPw2} onChange={(e) => setNewPw2(e.target.value)} />
                </div>
                <button type="button" className="rob-btn-solid" disabled={!newPw1 || !newPw2} onClick={() => { setPasswordResetToast(true); goOtpBrowser('OTP Verification', 'An OTP has been sent to your registered mobile number.', 'pinCreate'); }}>Reset Password</button>
                <button type="button" className="rob-btn-outline" onClick={() => go('obLogin')}>Cancel</button>
                <Keypad onKey={handleKeypad('pw', setNewPw1, 20)} />
            </section>
        ),

        /* 30. Create remote PIN */
        pinCreate: (
            <section className="rob-screen">
                <div className="rob-bar"><span className="material-icons-sharp rob-bar-icon">lock</span> Create Remote PIN</div>
                <p className="rob-sub">Create a PIN to access all your linked profiles on your business banking app.</p>
                <div className="rob-note-box">
                    <span className="material-icons-sharp rob-note-icon">info</span>
                    <p>This is not your card PIN or OTP.</p>
                </div>
                <div className="rob-field">
                    <label className="rob-label">Remote PIN</label>
                    <EyeInput value={pin1} onChange={(e) => setPin1(e.target.value)} maxLength={6} />
                    <p className="rob-hint">Must be 5 or 6 digits</p>
                </div>
                <div className="rob-field">
                    <label className="rob-label">Confirm remote PIN</label>
                    <EyeInput value={pin2} onChange={(e) => setPin2(e.target.value)} maxLength={6} />
                    <p className="rob-hint">Must be 5 or 6 digits</p>
                </div>
                <p className="rob-card-label">Tips for a secure remote PIN</p>
                <ul className="rob-card-list">
                    <li>Do not use a PIN that is easy to guess</li>
                    <li>Do not use your date of birth</li>
                    <li>Do not use numbers that follow each other (e.g. 12345) or repeating single digits (e.g 11111)</li>
                    <li>Do not use the same PIN as your bank card</li>
                </ul>
                <button type="button" className="rob-btn-solid" disabled={!pin1 || !pin2} onClick={() => go('pinSuccess')}>Create PIN</button>
            </section>
        ),

        /* 31. PIN success */
        pinSuccess: (
            <section className="rob-screen">
                <div className="rob-success-check"><span className="material-icons-sharp">check_circle</span></div>
                <p className="rob-success-label">Success</p>
                <h2 className="rob-title rob-center">Remote PIN updated</h2>
                <p className="rob-sub rob-center">You can now use your new remote PIN to sign in to the App.</p>
                <button type="button" className="rob-btn-solid" onClick={() => go('remotePinLogin')}>Sign In</button>
            </section>
        ),

        /* 32. Sign in with remote PIN */
        remotePinLogin: (
            <section className="rob-screen">
                <div className="rob-pill-topleft">For my business</div>
                <h2 className="rob-title rob-center rob-globalbiz-word">GlobalBiz</h2>
                <div className="rob-field">
                    <label className="rob-label">Remote PIN</label>
                    <EyeInput value={remotePinVal} onChange={(e) => setRemotePinVal(e.target.value)} maxLength={6} />
                </div>
                <a href="#s" className="rob-footer-link">Forgot PIN</a>
                <button type="button" className="rob-btn-solid" disabled={!remotePinVal} onClick={() => go('disclaimer')}>Submit</button>
                <Keypad onKey={handleKeypad('pin', setRemotePinVal, 6)} />
            </section>
        ),

        /* 33. Disclaimer */
        disclaimer: (
            <section className="rob-screen">
                <div className="rob-bar">Disclaimer and Legal Notices</div>
                <p className="rob-doc-para">You must read the disclaimer and legal notices before continuing because it contains important terms and conditions that you need to understand and accept.</p>
                <button type="button" className="rob-expand-row" onClick={() => go('disclaimerDetails')}>
                    <span>View disclaimer details</span>
                    <span className="material-icons-sharp">chevron_right</span>
                </button>
                <button type="button" className="rob-btn-solid" onClick={() => go('manageBanking')}>Accept</button>
                <button type="button" className="rob-btn-outline" onClick={() => go('remotePinLogin')}>Cancel</button>
            </section>
        ),

        /* 34. Disclaimer details */
        disclaimerDetails: (
            <section className="rob-screen">
                <div className="rob-doc-bar">
                    <span className="material-icons-sharp rob-doc-back" onClick={() => go('disclaimer')}>arrow_back</span> Disclaimer Details
                </div>
                <div className="rob-doc-scroll">
                    <p className="rob-doc-para">The Client's attention is drawn to the following clauses <strong>[highlighted in bold]</strong> which limit the risks and liability of Capitec to the Client and other parties (clauses 3.3, 5.1, 5.8, 6.12, 6.13, 8.1, 8.2, and 9); where the Client assumes certain risks and liabilities (clauses 3.2, 3.3, 3.7, 4.2, 4.5, 5.2, 5.9, 6.8, 6.9, 8.3 and 11); and where the Client acknowledges certain facts relating to the account (clauses 5.6, 6.3, 6.6, 6.10 and 6.11).</p>
                    <p className="rob-doc-clause-head">1. INTERPRETATION</p>
                    <p className="rob-doc-clause">1.1 In these terms:</p>
                    <p className="rob-doc-clause"><strong>Agreement</strong> means these online banking terms, which together with the General Terms and other Product Terms make up the whole agreement between you and Capitec...</p>
                    <p className="rob-doc-clause"><strong>Online Banking</strong> means electronic banking done by accessing a self-service web-based portal through our website;</p>
                    <p className="rob-doc-clause"><strong>Services</strong> means banking facilities, services and products offered by us; and</p>
                    <p className="rob-doc-clause"><strong>Users</strong> means Super-users and Sub-users collectively. Terms used (but not otherwise defined) in this Agreement have, unless indicated otherwise, the meanings given them in the General Terms; and</p>
                    <p className="rob-doc-clause">1.2 The General Terms shall be deemed to be incorporated by reference into this Agreement.</p>
                </div>
                <button type="button" className="rob-btn-solid" onClick={() => go('manageBanking')}>Accept</button>
            </section>
        ),

        /* 35. Manage banking */
        manageBanking: (
            <section className="rob-screen">
                <div className="rob-bar">Manage your banking</div>
                <div className="rob-manage-illustration"><span className="material-icons-sharp">groups</span></div>
                <h2 className="rob-title rob-center">Take control of your business banking</h2>
                <p className="rob-sub rob-center">Set your spending and transfer limits to match your business needs. You can update them anytime in Settings.</p>
                <div className="rob-card">
                    <h3 className="rob-card-title">Account limits</h3>
                    <a href="#s" className="rob-add-link" onClick={(e) => { e.preventDefault(); go('settingsLimits'); }}>Set up now</a>
                </div>
                <a href="#s" className="rob-footer-link" onClick={(e) => { e.preventDefault(); go('dashboard'); }}>Start transacting</a>
            </section>
        ),

        /* 36. Settings - limits */
        settingsLimits: (
            <section className="rob-screen">
                <div className="rob-doc-bar">
                    <span className="material-icons-sharp rob-doc-back" onClick={() => go('manageBanking')}>arrow_back</span> Settings
                </div>
                <p className="rob-card-label">Profile limit <a href="#s" className="rob-link">Edit</a></p>
                <p className="rob-hint">What is a profile limit?</p>
                <div className="rob-limit-card">
                    <span>Daily profile limit</span>
                    <strong>R 1 000.00</strong>
                </div>
                <p className="rob-card-label">Account limits <a href="#s" className="rob-link" onClick={(e) => { e.preventDefault(); setAccountLimitEdit((v) => !v); }}>Edit</a></p>
                <p className="rob-hint">What is an account limit?</p>
                <div className="rob-limit-card rob-limit-card-account">
                    <div className="rob-limit-card-top">
                        <span>Zoomies &middot; 1054 3847 54</span>
                        <span className="material-icons-sharp">chevron_right</span>
                    </div>
                    <div className="rob-limit-card-bottom">
                        <span>Account limit</span>
                        <strong>{accountLimitVal}</strong>
                    </div>
                </div>
                {accountLimitEdit && (
                    <div className="rob-field">
                        <label className="rob-label">New account limit</label>
                        <input type="text" className="rob-input" placeholder="R0.00" value={accountLimitInput} onChange={(e) => setAccountLimitInput(e.target.value)} />
                        <button type="button" className="rob-btn-solid" onClick={() => { setAccountLimitVal(accountLimitInput || 'R0.00'); setAccountLimitEdit(false); setLimitToastVisible(true); setTimeout(() => setLimitToastVisible(false), 3000); }}>Save</button>
                    </div>
                )}
                {limitToastVisible && <div className="rob-toast rob-toast-success">Success. The account limit has been updated.</div>}
                <button type="button" className="rob-btn-outline" onClick={() => go('dashboard')}>Done</button>
            </section>
        ),

        /* 37. GlobalBiz dashboard */
        dashboard: (
            <section className="rob-screen">
                <div className="rob-dash-topbar">
                    <span className="material-icons-sharp">menu</span>
                    <span className="rob-globalbiz-word rob-dash-word">GlobalBiz</span>
                    <span className="rob-dash-topbar-right">
                        <span className="material-icons-sharp">chat_bubble</span>
                        <span className="rob-avatar-circle rob-avatar-circle-sm">MR</span>
                    </span>
                </div>
                <h2 className="rob-title">Welcome, Mariska</h2>
                {whatNextVisible && (
                    <div className="rob-card rob-whatnext-card">
                        <button type="button" className="rob-toast-close rob-whatnext-close" onClick={() => setWhatNextVisible(false)}>&times;</button>
                        <p className="rob-card-desc">Set your spending and transfer limits to match your business needs. You can update them anytime in Settings.</p>
                        <div className="rob-expand-row" onClick={() => go('settingsLimits')}>
                            <span className="material-icons-sharp">tune</span>
                            <span>Setup your account limits &ndash; This is not your card limits</span>
                            <span className="material-icons-sharp">chevron_right</span>
                        </div>
                    </div>
                )}
                <p className="rob-card-label">Accounts</p>
                <div className="rob-account-row">
                    <span>1 Current Account</span>
                    <span className="rob-account-balance">R0.00</span>
                    <span className="material-icons-sharp">chevron_right</span>
                </div>
                <div className="rob-favorites-header">
                    <p className="rob-card-label">Favourites</p>
                    <a href="#s" className="rob-link">Edit</a>
                </div>
                <div className="rob-favorites-grid">
                    {[
                        { icon: 'person', label: 'Pay saved beneficiary' },
                        { icon: 'send', label: 'Pay once-off beneficiary' },
                        { icon: 'groups', label: 'Group or Multiple payments' },
                        { icon: 'sync_alt', label: 'Transfer money' },
                    ].map((f) => (
                        <div key={f.icon} className="rob-favorite-box">
                            <span className="material-icons-sharp">{f.icon}</span>
                            <span className="rob-favorite-title">{f.label}</span>
                        </div>
                    ))}
                </div>
                <div className="rob-bottom-nav">
                    <span className="rob-nav-item active"><span className="material-icons-sharp">home</span>Home</span>
                    <span className="rob-nav-item"><span className="material-icons-sharp">account_balance_wallet</span>Accounts</span>
                    <span className="rob-nav-item"><span className="material-icons-sharp">sync_alt</span>Transact</span>
                    <span className="rob-nav-item"><span className="material-icons-sharp">credit_card</span>Cards</span>
                    <span className="rob-nav-item"><span className="material-icons-sharp">explore</span>Explore</span>
                </div>
            </section>
        ),
    };

    return (
        <div className="rob-phone-screen">
            {screen !== 'chooser' && screen !== 'loading' && screen !== 'dashboard' && screen !== 'otpProcessing' && (
                <button
                    type="button"
                    className="rob-back-btn"
                    onClick={() => {
                        const backMap = {
                            application: 'chooser', biztype: 'application', idtype: 'biztype',
                            signupForm: 'idtype', privacy: 'signupForm', otp1: 'privacy',
                            selfieIntro: 'otp1', cameraPermission: 'selfieIntro',
                            selfieCapture: selfieFor === 'sign' ? 'selfieSignReady' : 'cameraPermission',
                            repDetails: 'selfieCapture', tradingAddress1: 'repDetails',
                            agreementSign1: 'tradingAddress1', businessInfo: 'agreementSign1',
                            agreementsList: 'businessInfo', eSigModal: 'agreementsList',
                            agreementDoc: 'eSigModal', selfieSignReady: 'agreementDoc',
                            agreementSigned: 'agreementDoc', username: 'agreementSigned',
                            profileCreated: 'username', smsNotif: 'profileCreated',
                            accountSuccess: 'smsNotif', obLogin: 'accountSuccess',
                            otpBrowser: 'obLogin', welcomeLetter: 'otpBrowser',
                            newPassword: 'welcomeLetter', pinCreate: 'newPassword',
                            pinSuccess: 'pinCreate', remotePinLogin: 'pinSuccess',
                            disclaimer: 'remotePinLogin', disclaimerDetails: 'disclaimer',
                            manageBanking: 'disclaimer', settingsLimits: 'manageBanking',
                        };
                        const prev = backMap[screen];
                        if (prev) go(prev);
                        else navigate('/Sign-In');
                    }}
                >
                    <span className="material-icons-sharp" style={{ color: '#00aeff' }}>arrow_back</span>
                </button>
            )}
            {screen === 'chooser' && (
                <Link to="/Sign-In" className="rob-back-btn">
                    <span className="material-icons-sharp" style={{ color: '#00aeff' }}>arrow_back</span>
                </Link>
            )}
            <div className="rob-app">
                {screens[screen] || screens.chooser}
            </div>
        </div>
    );
}
