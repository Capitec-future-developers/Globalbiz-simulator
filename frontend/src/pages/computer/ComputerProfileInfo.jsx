import { useState } from 'react';
import { Link } from 'react-router-dom';
import useScopedStylesheets from '../../hooks/useScopedStylesheets';

const STYLESHEETS = ['/legacy-styles/profile-info.css'];

// Faithful React port of Computer/Profile-info.html's main-content area (the
// header/sidebar Profile-info.html ships itself are discarded here, same as
// every other Computer-platform page, in favour of the shared ComputerShell).
// Note: profile-info.css never actually hides `.tab-content` (both
// `.tab-content` and `.tab-content-active` resolve to `display: block`), so
// both tab sections are always visible in the source page too — the tab
// buttons only ever toggled a (largely invisible) `active` class. Reproduced
// here with both sections always rendered and simple active-tab highlighting
// on the buttons, matching the page's actual rendered behaviour.
export default function ComputerProfileInfo() {
    useScopedStylesheets(STYLESHEETS);
    const [activeTab, setActiveTab] = useState('Profile details');

    return (
        <div className="main-content">
            <div className="back-nav">
                <Link to="/online-banking/accounts">
                    <h3>My Profile</h3>
                </Link>
            </div>

            <div className="tabs">
                <button type="button" onClick={() => setActiveTab('Profile details')}>
                    <div className={'tab' + (activeTab === 'Profile details' ? ' active' : '')}>Profile details</div>
                </button>
                <button type="button" onClick={() => setActiveTab('Transaction limits')}>
                    <div className={'tab' + (activeTab === 'Transaction limits' ? ' active' : '')}>Transaction limits</div>
                </button>
            </div>

            <div className="tab-content-active">
                <span className="info-heading"><h3>Personal information</h3></span>
                <div className="account-box">
                    <div className="account-info-row">
                        <div className="info-item">
                            <span className="info-label">Default notification type:</span>
                            <span className="info-value"><strong>Email &amp; SMS</strong></span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Cellphone number:</span>
                            <span className="info-value"><strong>+27 62 123 4567</strong></span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Email address:</span>
                            <span className="info-value negative"><strong>zen***********@*******.za</strong></span>
                        </div>
                        <div className="info-item"></div>
                        <div className="info-item">
                            <span className="info-label">Residential address:</span>
                            <span className="info-value"><strong>_</strong></span>
                        </div>
                    </div>
                </div>

                <span className="info-heading"><h3>Business information</h3></span>
                <div className="account-box">
                    <div className="account-info-row">
                        <div className="info-item">
                            <span className="info-label">Business name:</span>
                            <span className="info-value"><strong>Zenzi Digital Holdings</strong></span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Work number number:</span>
                            <span className="info-value"><strong>+27 21 234 4567</strong></span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Cellphone number:</span>
                            <span className="info-value negative"><strong>+27 62 123 4567</strong></span>
                        </div>
                        <div className="info-item"></div>
                        <div className="info-item">
                            <span className="info-label">Work address:</span>
                            <span className="info-value">
                                <strong>
                                    123 Main Street<br />
                                    Roodepoort<br />
                                    Gauteng<br />
                                    1724<br />
                                    South Africa
                                </strong>
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="tab-content">
                <span className="info-heading"><h3>Transaction Limits</h3></span>
                <div className="account-box">
                    <div className="account-info-row">
                        <div className="info-item">
                            <span className="info-value">R0.00</span>
                            <span className="info-label"><strong>Today's total spent</strong></span>
                        </div>
                        <div className="info-item">
                            <span className="info-value">R550</span>
                            <span className="info-label"><strong>Maximum daily transaction limit</strong></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
