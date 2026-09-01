import { Link, useNavigate } from 'react-router-dom';
import ChatbotWidget from '../../components/ChatbotWidget';

export default function SignInPersonal() {
    const navigate = useNavigate();

    return (
        <div className="sign-in-page welcome-screen">
            <ChatbotWidget />

            <div className="personal-toggle-row">
                <div className="personal-toggle">
                    <span className="head personal-head">For me</span>
                    <span className="personal-toggle-track"></span>
                </div>
                <button className="personal-menu-btn" type="button" aria-label="More options">
                    <span className="material-icons-sharp">more_vert</span>
                </button>
            </div>

            <div className="hello-hero">
                <img className="hello-art" src="/images/capihello.png" alt="hello" />
                <button
                    className="hero-nav-arrow hero-nav-arrow-left"
                    type="button"
                    aria-label="Switch to business banking"
                    onClick={() => navigate('/Sign-In?from=personal')}
                >
                    <span className="material-icons-sharp">chevron_left</span>
                </button>
            </div>

            <div className="user-name">Omphile</div>

            <div className="dots-row">
                <span className="dot active"></span>
                <span className="dot"></span>
            </div>

            <div className="qa-grid">
                <div className="qa-card"><span className="material-icons-sharp">hub</span><span>PayShap</span></div>
                <div className="qa-card"><span className="material-icons-sharp">smartphone</span><span>Buy airtime and data</span></div>
                <div className="qa-card"><span className="material-icons-sharp">paid</span><span>Send cash</span></div>
                <div className="qa-card"><span className="material-icons-sharp">swap_horiz</span><span>Transfer money</span></div>
            </div>

            <Link to="/global-one" className="sign-in" style={{ textDecoration: 'none', display: 'block', textAlign: 'center' }}>Sign In</Link>

            <div className="personal-shortcuts">
                <a href="#" className="personal-shortcut" onClick={e => e.preventDefault()}>
                    <span className="personal-shortcut-icon material-icons-sharp">card_giftcard</span>
                    <span>CapiTip</span>
                </a>
                <a href="#" className="personal-shortcut" onClick={e => e.preventDefault()}>
                    <span className="personal-shortcut-icon material-icons-sharp">qr_code_2</span>
                    <span>Scan to pay</span>
                </a>
            </div>
        </div>
    );
}
