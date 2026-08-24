import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import {
    getPreviewNewLook,
    setPreviewNewLook as persistPreviewNewLook
} from '../utils/previewNewLook.js';
import ChatbotWidget from '../components/ChatbotWidget.jsx';

const helloArt = '/images/capihelo.png';

export default function BusinessWelcomeScreen() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const screenContentRef = useRef(null);
    const overlayRef = useRef(null);

    const [previewNewLook, setPreviewNewLook] = useState(true);

    useEffect(() => {
        setPreviewNewLook(getPreviewNewLook());
    }, []);

    const handlePreviewToggle = (e) => {
        const checked = e.target.checked;

        setPreviewNewLook(checked);
        persistPreviewNewLook(checked);
    };

    // Slide screen in when returning from personal screen
    useEffect(() => {
        const el = screenContentRef.current;

        if (!el || searchParams.get('from') !== 'personal') {
            return;
        }

        el.style.transform = 'translateX(100%)';
        el.style.opacity = '0';

        const raf = requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                el.style.transition =
                    'transform 0.3s ease, opacity 0.3s ease';
                el.style.transform = 'translateX(0)';
                el.style.opacity = '1';
            });
        });

        const clearTransform = () => {
            el.style.transform = '';
            el.style.transition = '';
            el.style.opacity = '';
        };

        el.addEventListener('transitionend', clearTransform, {
            once: true
        });

        const timeout = setTimeout(clearTransform, 400);

        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(timeout);
        };
    }, [searchParams]);

    // Animate before going home
    const handleBackToHome = (e) => {
        e.preventDefault();

        const overlay = overlayRef.current;

        if (overlay) {
            overlay.style.opacity = '1';
            overlay.style.transform = 'scale(0.92)';
        }

        setTimeout(() => {
            navigate('/IOSHome');
        }, 400);
    };

    // Slide to personal banking
    const handleHeroNextArrow = () => {
        const el = screenContentRef.current;

        if (el) {
            el.style.transition =
                'transform 0.3s ease, opacity 0.3s ease';
            el.style.transform = 'translateX(100%)';
            el.style.opacity = '0';
        }

        setTimeout(() => {
            navigate('/Sign-In?from=business');
        }, 300);
    };

    return (
        <>
            {/* =========================
                PAGE STYLES
            ========================== */}
            <style>{`
                @import url('https://fonts.googleapis.com/icon?family=Material+Icons+Sharp');

                .business-welcome-screen {
                    position: relative;
                    width: 100%;
                    height: 100%;
                    min-height: 100%;
                    box-sizing: border-box;

                    display: flex;
                    flex-direction: column;
                    align-items: center;

                    gap: 12px;

                    padding: 55px 20px 40px;

                    text-align: center;

                    color: #333;
                    background: #ffffff;

                    overflow: hidden;
                    font-family: Arial, sans-serif;

                    transition:
                        transform 0.3s ease,
                        opacity 0.3s ease;
                }

                /* =========================
                   BACK ARROW
                ========================== */

                .business-back-arrow {
                    position: absolute;
                    top: 10px;
                    left: 10px;

                    width: 32px;
                    height: 32px;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    color: #00aeff;

                    cursor: pointer;

                    z-index: 20;

                    text-decoration: none;
                }

                .business-back-arrow .material-icons-sharp {
                    font-size: 24px;
                }

                /* =========================
                   BUSINESS TOGGLE
                ========================== */

                .business-toggle {
                    display: inline-flex;
                    align-items: center;

                    height: 32px;

                    position: relative;
                }

                .business-toggle-track {
                    width: 46px;
                    height: 26px;

                    background: #e2e2e2;

                    border-radius: 20px;

                    margin-right: -24px;

                    flex-shrink: 0;
                }

                .business-toggle-label {
                    position: relative;
                    z-index: 1;

                    display: inline-flex;
                    align-items: center;
                    justify-content: center;

                    min-width: 92px;

                    padding: 8px 19px;

                    background: #074358;

                    border-radius: 30px;

                    color: #ffffff;

                    font-size: 10px;
                    font-weight: bold;

                    white-space: nowrap;
                }

                /* =========================
                   HERO
                ========================== */

                .business-hello-hero {
                    position: relative;

                    width: 100%;

                    background-image:
                        radial-gradient(
                            circle,
                            #e6e6e6 1px,
                            transparent 1px
                        );

                    background-size: 10px 10px;

                    border-radius: 8px;

                    padding: 8px 0;

                    box-sizing: border-box;
                }

                .business-hello-art {
                    position: static;

                    display: block;

                    width: 100%;
                    height: auto;

                    object-fit: contain;
                }

                /* =========================
                   HERO NAVIGATION
                ========================== */

                .business-hero-nav-arrow {
                    position: absolute;

                    top: 50%;
                    left: -17px;

                    transform: translateY(-50%);

                    width: 34px;
                    height: 34px;

                    padding: 0;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    border: none;
                    border-radius: 50%;

                    background: #ffffff;

                    color: #333;

                    box-shadow:
                        0 2px 6px rgba(0, 0, 0, 0.20);

                    cursor: pointer;

                    z-index: 5;

                    transition:
                        transform 0.2s ease,
                        box-shadow 0.2s ease;
                }

                .business-hero-nav-arrow:hover {
                    transform:
                        translateY(-50%)
                        scale(1.08);

                    box-shadow:
                        0 4px 10px rgba(0, 0, 0, 0.20);
                }

                .business-hero-nav-arrow:active {
                    transform:
                        translateY(-50%)
                        scale(0.95);
                }

                .business-hero-nav-arrow .material-icons-sharp {
                    font-size: 22px;
                }

                /* =========================
                   USER NAME
                ========================== */

                .business-user-name {
                    font-size: 1.3rem;

                    color: #1b2b4b;

                    font-weight: 500;

                    margin-top: 2px;
                }

                /* =========================
                   DOTS
                ========================== */

                .business-dots-row {
                    display: flex;

                    align-items: center;
                    justify-content: center;

                    gap: 8px;
                }

                .business-dot {
                    width: 10px;
                    height: 10px;

                    border-radius: 50%;

                    border: 2px solid #0096c7;

                    background: transparent;

                    box-sizing: border-box;
                }

                .business-dot.active {
                    background: #1b2b4b;

                    border-color: #1b2b4b;
                }

                /* =========================
                   PREVIEW NEW LOOK
                ========================== */

                .business-preview-row {
                    display: flex;

                    align-items: center;
                    justify-content: center;

                    gap: 10px;

                    font-size: 0.8rem;

                    color: #333;
                }

                .business-preview-switch {
                    position: relative;

                    display: inline-block;

                    width: 38px;
                    height: 22px;
                }

                .business-preview-switch input {
                    position: absolute;

                    opacity: 0;

                    width: 0;
                    height: 0;
                }

                .business-preview-slider {
                    position: absolute;

                    inset: 0;

                    background: #ccc;

                    border-radius: 22px;

                    cursor: pointer;

                    transition: background 0.3s ease;
                }

                .business-preview-slider::before {
                    content: "";

                    position: absolute;

                    width: 16px;
                    height: 16px;

                    left: 3px;
                    top: 3px;

                    background: #ffffff;

                    border-radius: 50%;

                    transition:
                        transform 0.3s ease;
                }

                .business-preview-switch
                input:checked
                + .business-preview-slider {
                    background: #0096c7;
                }

                .business-preview-switch
                input:checked
                + .business-preview-slider::before {
                    transform: translateX(16px);
                }

                /* =========================
                   QUICK ACTIONS
                ========================== */

                .business-qa-grid {
                    display: grid;

                    grid-template-columns: 1fr 1fr;

                    gap: 10px;

                    width: 100%;
                }

                .business-qa-card {
                    display: flex;

                    flex-direction: column;

                    align-items: center;
                    justify-content: center;

                    gap: 6px;

                    min-height: 70px;

                    padding: 14px 6px;

                    box-sizing: border-box;

                    background: #ffffff;

                    border: 1px solid #e0e0e0;

                    border-radius: 10px;

                    box-shadow:
                        0 2px 4px rgba(0, 0, 0, 0.06);

                    cursor: pointer;

                    transition:
                        transform 0.2s ease,
                        box-shadow 0.2s ease,
                        border-color 0.2s ease;
                }

                .business-qa-card:hover {
                    transform: translateY(-2px);

                    border-color: #0096c7;

                    box-shadow:
                        0 5px 12px rgba(0, 0, 0, 0.10);
                }

                .business-qa-card:active {
                    transform: scale(0.98);
                }

                .business-qa-card
                .material-icons-sharp {
                    color: #0096c7;

                    font-size: 22px;
                }

                .business-qa-card-label {
                    font-size: 0.68rem;

                    color: #333;

                    line-height: 1.2;
                }

                /* =========================
                   SIGN IN BUTTON
                ========================== */

                .business-sign-in-link {
                    width: 100%;

                    text-decoration: none;

                    display: block;
                }

                .business-sign-in-button {
                    width: 100%;

                    margin-top: 6px;

                    padding: 10px 32px;

                    background: #0096c7;

                    border: none;

                    border-radius: 4px;

                    color: #ffffff;

                    font-size: 16px;

                    font-weight: 500;

                    text-align: center;

                    cursor: pointer;

                    box-sizing: border-box;

                    transition:
                        background 0.2s ease,
                        transform 0.2s ease,
                        box-shadow 0.2s ease;
                }

                .business-sign-in-button:hover {
                    background: #0085b2;

                    box-shadow:
                        0 4px 10px rgba(0, 150, 199, 0.25);
                }

                .business-sign-in-button:active {
                    transform: scale(0.98);
                }

                /* =========================
                   CLOSE / TRANSITION OVERLAY
                ========================== */

                .business-close-overlay {
                    position: absolute;

                    left: 0;
                    top: 0;
                    right: 0;
                    bottom: 0;

                    background: #ffffff;

                    opacity: 0;

                    pointer-events: none;

                    transform-origin: center center;

                    transform: scale(1);

                    transition:
                        transform 0.4s cubic-bezier(.2,.7,.2,1),
                        opacity 0.2s linear;

                    z-index: 100;
                }

                /* =========================
                   MOBILE SAFETY
                ========================== */

                @media (max-height: 700px) {
                    .business-welcome-screen {
                        gap: 7px;

                        padding-top: 45px;
                        padding-bottom: 30px;
                    }

                    .business-hello-hero {
                        padding: 4px 0;
                    }

                    .business-qa-card {
                        min-height: 60px;

                        padding: 10px 5px;
                    }

                    .business-user-name {
                        font-size: 1.15rem;
                    }
                }

                @media (max-width: 340px) {
                    .business-welcome-screen {
                        padding-left: 14px;
                        padding-right: 14px;
                    }

                    .business-qa-grid {
                        gap: 7px;
                    }

                    .business-qa-card-label {
                        font-size: 0.62rem;
                    }
                }
            `}</style>

            {/* =========================
                SCREEN
            ========================== */}

            <div
                className="business-welcome-screen"
                ref={screenContentRef}
            >
                <ChatbotWidget />

                {/* Back button */}
                <Link
                    to="/IOSHome"
                    onClick={handleBackToHome}
                    className="business-back-arrow"
                    aria-label="Back to home"
                >
                    <span className="material-icons-sharp">
                        arrow_back
                    </span>
                </Link>

                {/* Business toggle */}
                <div className="business-toggle">
                    <span className="business-toggle-track"></span>

                    <span className="business-toggle-label">
                        For my business
                    </span>
                </div>

                {/* Hero */}
                <div className="business-hello-hero">
                    <button
                        type="button"
                        className="business-hero-nav-arrow"
                        aria-label="Switch to personal banking"
                        onClick={handleHeroNextArrow}
                    >
                        <span className="material-icons-sharp">
                            chevron_right
                        </span>
                    </button>

                    <img
                        className="business-hello-art"
                        src={helloArt}
                        alt="Hello"
                    />
                </div>

                {/* User */}
                <div className="business-user-name">
                    Omphile
                </div>

                {/* Page dots */}
                <div className="business-dots-row">
                    <span className="business-dot"></span>
                    <span className="business-dot active"></span>
                </div>

                {/* Preview toggle */}
                <div className="business-preview-row">
                    <span>Preview New Look</span>

                    <label className="business-preview-switch">
                        <input
                            type="checkbox"
                            checked={previewNewLook}
                            onChange={handlePreviewToggle}
                        />

                        <span className="business-preview-slider"></span>
                    </label>
                </div>

                {/* Quick actions */}
                <div className="business-qa-grid">

                    <div className="business-qa-card">
                        <span className="material-icons-sharp">
                            group
                        </span>

                        <span className="business-qa-card-label">
                            Pay beneficiary
                        </span>
                    </div>

                    <div className="business-qa-card">
                        <span className="material-icons-sharp">
                            swap_horiz
                        </span>

                        <span className="business-qa-card-label">
                            Transfer money
                        </span>
                    </div>

                    <div className="business-qa-card">
                        <span className="material-icons-sharp">
                            person_add
                        </span>

                        <span className="business-qa-card-label">
                            Add beneficiary
                        </span>
                    </div>

                    <div className="business-qa-card">
                        <span className="material-icons-sharp">
                            account_balance_wallet
                        </span>

                        <span className="business-qa-card-label">
                            Transaction limits
                        </span>
                    </div>

                </div>

                {/* Sign in */}
                <Link
                    to="/"
                    className="business-sign-in-link"
                >
                    <button
                        className="business-sign-in-button"
                        type="button"
                    >
                        Sign In
                    </button>
                </Link>

                {/* Transition overlay */}
                <div
                    ref={overlayRef}
                    className="business-close-overlay"
                ></div>

            </div>
        </>
    );
}