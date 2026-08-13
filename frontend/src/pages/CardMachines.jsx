import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';

export default function CardMachines() {
    const [tab, setTab] = useState('about');
    const [contactSent, setContactSent] = useState(false);
    const timerRef = useRef(null);

    function handleContact() {
        setContactSent(true);
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => setContactSent(false), 1800);
    }

    return (
        <>
            <div className="head nl-subpage-head">
                <Link to="/explore" className="arrow" style={{ textDecoration: 'none' }}>
                    <span className="material-icons-sharp">arrow_back</span>
                </Link>
                <div className="header" style={{ fontSize: '0.9rem' }}>Card Machines</div>
            </div>

            <div className="content" id="mainContent" style={{ top: 120 }}>
                <div className="cm-hero">
                    <span className="cm-badge cm-badge-pro">Pro</span>
                    <span className="cm-badge cm-badge-print">print</span>
                    <div className="cm-hero-text">save up to 60% on commission</div>
                </div>

                <div className="cm-price-card">Buy a Print for <b>R1,399</b> or a Pro for <b>R699</b></div>

                <div className="cm-tabs">
                    <button className={'cm-tab' + (tab === 'about' ? ' active' : '')} type="button" onClick={() => setTab('about')}>About</button>
                    <button className={'cm-tab' + (tab === 'features' ? ' active' : '')} type="button" onClick={() => setTab('features')}>Features</button>
                    <button className={'cm-tab' + (tab === 'compare' ? ' active' : '')} type="button" onClick={() => setTab('compare')}>Compare</button>
                </div>

                {tab === 'about' && (
                    <div className="cm-card cm-tab-panel">
                        <h4>No contracts, monthly fees, or hidden costs</h4>
                        <ul>
                            <li>Order in minutes and get free delivery in 3 days</li>
                            <li>Get free next-day payout, even on weekends and public holidays</li>
                            <li>Pay commission of only 1.85% on local debit card, 1.85% on local credit card and 2.3% on international card transactions (exl. VAT)</li>
                        </ul>
                    </div>
                )}

                {tab === 'features' && (
                    <div className="cm-card cm-tab-panel">
                        <h4>Never miss a sale</h4>
                        <ul>
                            <li>All-day battery life</li>
                            <li>Unlimited free, fast 4G and Wi-Fi</li>
                            <li>Hassle-free sales tracking</li>
                        </ul>
                        <div className="cm-payment-logos">
                            <span>VISA</span>
                            <span>Mastercard</span>
                            <span>AMEX</span>
                            <span>Diners Club</span>
                            <span>Apple Pay</span>
                            <span>Google Pay</span>
                            <span>Samsung Pay</span>
                        </div>
                    </div>
                )}

                {tab === 'compare' && (
                    <div className="cm-card cm-tab-panel">
                        <h4>Choose what works for you</h4>
                        <p>Designed with your business in mind, our card machines offer a sleek HD design with fast payments and sales tracking.</p>
                        <p>While the Print can print receipts, the Pro is lighter with a bigger screen.</p>
                    </div>
                )}

                <button className="cm-contact-btn" type="button" disabled={contactSent} onClick={handleContact}>
                    {contactSent ? 'Request sent' : 'Contact me'}
                </button>
            </div>
        </>
    );
}
