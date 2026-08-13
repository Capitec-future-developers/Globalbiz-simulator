import { Link } from 'react-router-dom';
import useScopedStylesheets from '../../hooks/useScopedStylesheets';

const STYLESHEETS = [
    '/legacy-styles/Computer.css',
    '/legacy-styles/Chatbotcomputer.css',
];

function signInDateText() {
    const now = new Date();
    const options = { weekday: 'long', hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'numeric', year: 'numeric' };
    return `Your last Sign-in was on ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}, ${now.toLocaleDateString([], options)}.`;
}

// Faithful React port of Computer/KodiCode.html's content below its own
// (self-contained) header/sidebar — discarded here in favour of the shared
// ComputerShell, same as ComputerHome.jsx. KodiCode.html/Kodi-accounts.html
// represent the "second business profile" reached via the profile-switcher
// popup's "Switch to Zenzi Digital Holdings" link, so this is that second
// profile's own Home dashboard (its own accounts/favourites/pending/cash
// flow, distinct numbers from the primary Zenzi Dube profile's Home).
export default function ComputerKodiCode() {
    useScopedStylesheets(STYLESHEETS);

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
                        <Link to="/online-banking/in-progress" className="View">View All</Link>
                    </div>
                    <div className="box">
                        <div className="box1">
                            <img src="/images/transact.svg" alt="transact" />
                            <span className="separator"></span>
                            <Link to="/online-banking/accounts">
                                <div className="account-details">
                                    <span className="account-name">1 Current Account</span>
                                    <span className="account-balance" style={{ color: 'black', right: 50, position: 'absolute' }}>R1000</span>
                                    <span className="material-icons-sharp" style={{ right: 10, position: 'absolute' }}>chevron_right</span>
                                </div>
                            </Link>
                        </div>

                        <div className="box2">
                            <img src="/images/save.svg" alt="save" />
                            <span className="separator"></span>
                            <Link to="/online-banking/kodi-accounts">
                                <div className="account-details">
                                    <span className="account-name1">1 Savings account</span>
                                    <span className="account-balance1" style={{ color: 'black', right: 50, position: 'absolute' }}>R10 800.00</span>
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

                <div className="favorites-container">
                    <div className="favorites">
                        <div className="favorites-header">
                            <h4>Favourites</h4>
                            <h4 className="edit">Edit</h4>
                        </div>
                        <div className="favorites-grid" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', position: 'relative' }}>
                            <div className="favorite-box" style={{ position: 'relative', top: 10, right: 140 }}>
                                <span className="material-icons-sharp"><img src="/images/client-insights.svg" alt="" /></span>
                                <span className="favorite-title">Pay Saved beneficary</span>
                            </div>
                            <div className="favorite-box" style={{ position: 'relative', bottom: 105, left: 140 }}>
                                <span className="material-icons-sharp"><img src="/images/once-off-payment.svg" alt="" /></span>
                                <span className="favorite-title">Pay Once Off</span>
                            </div>
                            <div className="favorite-box" style={{ position: 'relative', top: -80, right: 140 }}>
                                <span className="material-icons-sharp"><img src="/images/client-insights.svg" alt="" /></span>
                                <span className="favorite-title">Multiple</span>
                            </div>
                            <div className="favorite-box" id="transfer" style={{ position: 'relative', bottom: 195, left: 140 }}>
                                <span className="material-icons-sharp"><img src="/images/notes.svg" alt="" /></span>
                                <span className="favorite-title">Make bulk payment</span>
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
