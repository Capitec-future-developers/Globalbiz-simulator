import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getPreviewNewLook, setPreviewNewLook as persistPreviewNewLook } from '../../utils/previewNewLook.js';
import ChatbotWidget from '../../components/ChatbotWidget.jsx';
import './SignIn.css'

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
        setPreviewNewLook(checked);       // updates local component state
        persistPreviewNewLook(checked);   // persists to localStorage + syncs body.new-look-active
    };

    // Slide the screen in from the right when arriving back from the personal screen
    useEffect(() => {
        const el = screenContentRef.current;
        if (!el || searchParams.get('from') !== 'personal') return;

        el.style.transform = 'translateX(100%)';
        el.style.opacity = '0';

        const raf = requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                el.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
                el.style.transform = 'translateX(0)';
                el.style.opacity = '1';
            });
        });

        const clearTransform = () => {
            el.style.transform = '';
            el.style.transition = '';
            el.style.opacity = '';
        };
        el.addEventListener('transitionend', clearTransform, { once: true });
        const timeout = setTimeout(clearTransform, 400);

        return () => {
            cancelAnimationFrame(raf);
            clearTimeout(timeout);
        };
    }, [searchParams]);

    // Play a quick close animation before navigating home
    const handleBackToHome = (e) => {
        e.preventDefault();
        const overlay = overlayRef.current;
        if (overlay) {
            overlay.style.opacity = '1';
            overlay.style.transform = 'scale(0.92)';
        }
        setTimeout(() => navigate('/IOSHome'), 400);
    };

    // Slide across to the personal welcome screen
    const handleHeroNextArrow = () => {
        const el = screenContentRef.current;
        if (el) {
            el.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            el.style.transform = 'translateX(100%)';
            el.style.opacity = '0';
        }
        // TODO: point this at your personal sign-in route once it exists
        setTimeout(() => navigate('/Sign-In?from=business'), 300);
    };

    return (
        <div className="sign-in-page welcome-screen" ref={screenContentRef}>
            <ChatbotWidget />

            <div className="arrow">
                <Link to="/IOSHome" onClick={handleBackToHome}>
                    <span className="material-icons-sharp" style={{ position: 'absolute', color: '#00aeff', left: 10, top: 10, cursor: 'pointer' }} >
                        arrow_back
                    </span>
                </Link>
            </div>

            <div className="biz-toggle">
                <span className="biz-toggle-track"></span>
                <span className="head4">For my business</span>
            </div>

            <div className="hello-hero">
                <button
                    type="button"
                    className="hero-nav-arrow hero-nav-arrow-right"
                    aria-label="Switch to personal banking"
                    onClick={handleHeroNextArrow}
                >
                    <span className="material-icons-sharp">chevron_right</span>
                </button>
                <img className="hello-art" src={helloArt} alt="hello" />
            </div>

            <div className="user-name">Omphile</div>

            <div className="dots-row">
                <span className="dot"></span>
                <span className="dot active"></span>
            </div>

            <div className="preview-row">
                <span>Preview New Look</span>
                <label className="switch">
                    <input
                        type="checkbox"
                        checked={previewNewLook}
                        onChange={handlePreviewToggle}
                    />
                    <span className="slider"></span>
                </label>
            </div>

            <div className="qa-grid">
                <div className="qa-card">
                    <span className="material-icons-sharp">group</span>
                    <span>Pay beneficiary</span>
                </div>
                <div className="qa-card">
                    <span className="material-icons-sharp">swap_horiz</span>
                    <span>Transfer money</span>
                </div>
                <div className="qa-card">
                    <span className="material-icons-sharp">person_add</span>
                    <span>Add beneficiary</span>
                </div>
                <div className="qa-card">
                    <span className="material-icons-sharp">account_balance_wallet</span>
                    <span>Transaction limits</span>
                </div>
            </div>

            <Link to="/" className="sign-in-link">
                <button className="sign-in" type="submit">Sign In</button>
            </Link>

            <div
                ref={overlayRef}
                className="nl-close-overlay"
                style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0,
                    background: '#ffffff',
                    opacity: 0,
                    pointerEvents: 'none',
                    transformOrigin: 'center center',
                    transform: 'scale(1)',
                    transition: 'transform .4s cubic-bezier(.2,.7,.2,1), opacity .2s linear'
                }}
            ></div>
        </div>
    );
}