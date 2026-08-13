import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import useScopedStylesheets from '../../hooks/useScopedStylesheets';

const STYLESHEETS = [
    '/legacy-styles/Computer.css',
    '/legacy-styles/Computer-promo.css',
    '/legacy-styles/Chatbotcomputer.css',
];

function signInDateText() {
    const now = new Date();
    const options = { weekday: 'long', hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'numeric', year: 'numeric' };
    return `Your last Sign-in was on ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}, ${now.toLocaleDateString([], options)}.`;
}

// Faithful React port of Computer/Computer.html's dashboard content
// (everything below the shared header/sidebar, which ComputerShell owns).
// Loads exactly the stylesheets Computer.html itself links.
export default function ComputerHome() {
    useScopedStylesheets(STYLESHEETS);
    const [slide, setSlide] = useState(0);
    const timerRef = useRef(null);
    const slides = ['/images/2people.png', '/images/1person.png'];

    function showSlide(index) {
        setSlide(index);
    }

    function startAutoRotate() {
        clearInterval(timerRef.current);
        timerRef.current = setInterval(() => {
            setSlide((prev) => (prev + 1) % slides.length);
        }, 4000);
    }

    useEffect(() => {
        startAutoRotate();
        return () => clearInterval(timerRef.current);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="notice">
                <h4>Hello</h4>
                <p id="signin-date">{signInDateText()}</p>
            </div>

            <div className="content" id="mainContent">
                <div className="account">
                    <div className="account-header">
                        <h4>Accounts</h4>
                        <Link to="/online-banking/accounts" className="View">View All</Link>
                    </div>
                    <div className="box">
                        <div className="box1">
                            <img src="/images/transact.svg" alt="transact" />
                            <span className="separator"></span>
                            <Link to="/online-banking/accounts">
                                <div className="account-details">
                                    <span className="account-name">1 Current Account</span>
                                    <span className="account-balance" style={{ color: 'black', right: 50, position: 'absolute' }}>R1000.00</span>
                                    <span className="material-icons-sharp" style={{ right: 10, position: 'absolute' }}>chevron_right</span>
                                </div>
                            </Link>
                        </div>

                        <div className="box2">
                            <img src="/images/save.svg" alt="save" />
                            <span className="separator"></span>
                            <Link to="/online-banking/in-progress">
                                <div className="account-details">
                                    <span className="account-name1">1 Savings account</span>
                                    <span className="account-balance1" style={{ color: 'black', right: 50, position: 'absolute' }}>R2260.00</span>
                                    <span className="material-icons-sharp" style={{ right: 10, position: 'absolute' }}>chevron_right</span>
                                </div>
                            </Link>
                        </div>

                        <a href="#" className="box3" style={{ width: 300 }}>
                            <img src="/images/accounts.svg" alt="accounts" style={{ position: 'absolute', color: '#cccccc' }} />
                            <div className="account-details">
                                <span className="account-name1" style={{ position: 'absolute', textAlign: 'center', left: 150, color: '#cccccc' }}>No other account (s)</span>
                            </div>
                        </a>
                    </div>
                </div>

                <div className="dashboard-row">
                    <div className="favorites-container">
                        <div className="favorites">
                            <div className="favorites-header">
                                <h4>Favourites</h4>
                                <h4 className="edit">Edit</h4>
                            </div>
                            <div className="favorites-grid" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', position: 'relative' }}>
                                <div className="favorite-box" style={{ position: 'relative', top: 10, right: 140 }} id="saved-payment-btn">
                                    <span className="material-icons-sharp"><img src="/images/client-insights.svg" alt="" style={{ filter: 'brightness(0) saturate(100%) invert(32%) sepia(89%) saturate(2087%) hue-rotate(202deg) brightness(95%) contrast(90%)' }} /></span>
                                    <span className="favorite-title">Pay Saved beneficary</span>
                                </div>
                                <div className="favorite-box" style={{ position: 'relative', bottom: 105, left: 140 }}>
                                    <span className="material-icons-sharp"><img src="/images/once-off-payment.svg" alt="" style={{ filter: 'brightness(0) saturate(100%) invert(32%) sepia(89%) saturate(2087%) hue-rotate(202deg) brightness(95%) contrast(90%)' }} /></span>
                                    <span className="favorite-title">Pay Once Off</span>
                                </div>
                                <div className="favorite-box" style={{ position: 'relative', top: -80, right: 140 }}>
                                    <span className="material-icons-sharp"><img src="/images/client-insights.svg" alt="" style={{ filter: 'brightness(0) saturate(100%) invert(32%) sepia(89%) saturate(2087%) hue-rotate(202deg) brightness(95%) contrast(90%)' }} /></span>
                                    <span className="favorite-title">Multiple</span>
                                </div>
                                <div className="favorite-box" id="transfer" style={{ position: 'relative', bottom: 195, left: 140 }}>
                                    <span className="material-icons-sharp"><img src="/images/notes.svg" alt="" style={{ filter: 'brightness(0) saturate(100%) invert(32%) sepia(89%) saturate(2087%) hue-rotate(202deg) brightness(95%) contrast(90%)' }} /></span>
                                    <span className="favorite-title">Make bulk payment</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="promo-card">
                        <div className="promo-text">
                            <h4>Take a look around</h4>
                            <p>This is your home dashboard. You'll see your accounts and favourites here. Would you like to take a quick tour of our latest features?</p>
                            <button className="promo-tour-btn" type="button" id="startTourBtn">Start Tour</button>
                        </div>
                        <div className="promo-slideshow" id="promoSlideshow">
                            {slides.map((src, i) => (
                                <img key={src} className={'promo-slide' + (i === slide ? ' active' : '')} src={src} alt={i === 0 ? 'Two colleagues looking at a laptop' : 'Business account holder next to the Invest screen'} />
                            ))}
                            <div className="promo-dots">
                                {slides.map((_, i) => (
                                    <button key={i} className={'dot' + (i === slide ? ' active' : '')} type="button" onClick={() => { showSlide(i); startAutoRotate(); }} aria-label={`Show slide ${i + 1}`}></button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pending">
                    <div className="pending-header">
                        <h4>Pending Authorisations</h4>
                        <Link to="/online-banking/in-progress" className="View">
                            View All <span className="material-icons-sharp">chevron_right</span>
                        </Link>
                    </div>
                    <div className="pending-box">
                        <img src="/images/history.svg" alt="history" style={{ width: 150, height: 150, backgroundColor: '#ffffff' }} />
                        <span style={{ fontWeight: 'bold' }}>You're up to date</span><br />
                        <span>All pending authorasation will show here.</span>
                    </div>
                </div>

                <div className="cash-flow">
                    <div className="cash-flow-header">
                        <h4>Cash Flow</h4>
                    </div>
                    <div className="cash-flow-box">
                        <span className="cash-flow-title"></span>
                        <div className="select-row">
                            <label htmlFor="account-select">1 Transactional Account</label>
                            <select id="account-select" className="account-select">
                                <option value="account1">Account</option>
                            </select>
                            <div className="period-selector">
                                <select className="account-select">
                                    <option value="account1">Period</option>
                                    <option value="account1">1 Month</option>
                                    <option value="account2">3 Months</option>
                                    <option value="account3">6 Months</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
