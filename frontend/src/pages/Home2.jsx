import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBalances, formatNlBalance } from '../hooks/useAccountStore';
import ChatbotWidget from '../components/ChatbotWidget';

export default function Home2() {
    const [balances, setBalances] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const [authOpen, setAuthOpen] = useState(false);

    useEffect(() => {
        setBalances(getBalances());
    }, []);

    const savingsTotal = balances ? balances.notice32.available + balances.flexible.available : 0;

    return (
        <>
            <ChatbotWidget />

            {/* Classic header */}
            <div className="head classic-only">
                <div className="arrow" id="sidebarToggle" onClick={() => setSidebarOpen(true)}>
                    <span className="material-icons-sharp" id="menuIcon">menu</span>
                </div>
                <div className="header" style={{ left: '-10px' }}>GlobalBiz</div>
                <div
                    className="om-circle"
                    id="profile-initials"
                    style={{ textDecoration: 'none', cursor: 'pointer' }}
                    onClick={() => setProfileOpen(true)}
                >OM</div>
            </div>

            {/* New-look header */}
            <div className="new-look-header new-look-only" style={{ display: 'flex' }}>
                <Link to="/profile" className="nl-avatar-link" aria-label="Open profile menu">
                    <div className="nl-avatar">OM</div>
                </Link>
                <div className="nl-identity">
                    <div className="nl-fullname">Omphile Mohlala</div>
                    <Link to="/profile" className="nl-profile-toggle">
                        Omphile Mohlala <span className="material-icons-sharp">expand_more</span>
                    </Link>
                </div>
                <Link to="/support" className="nl-call-icon" aria-label="Call support">
                    <span className="material-icons-sharp">call</span>
                </Link>
            </div>

            {/* Overlay */}
            {(sidebarOpen || profileOpen) && (
                <div className="overlay" id="overlay" onClick={() => { setSidebarOpen(false); setProfileOpen(false); }}></div>
            )}

            {/* Profile popup */}
            {profileOpen && (
                <div className="profile-popup" id="profilePopup" style={{ width: '200px', right: '10px', left: 'auto' }}>
                    <div className="popup-header">Profile</div>
                    <div className="bottom-seperator"></div>
                    <div className="current-profile">
                        <span className="material-icons-sharp">account_circle</span>
                        <div className="profile-info">
                            <div className="profile-name" id="current-profile-name">Omphile Mohlala</div>
                            <div className="profile-email" id="current-profile-email">omphilestudent@gmail.com</div>
                        </div>
                    </div>
                    <div className="bottom-seperator"></div>
                    <div className="profile-switcher">
                        <h4>Switch Profile</h4>
                        <div className="profile-option">
                            <span className="material-icons-sharp">account_circle</span>
                            <div className="profile-info">
                                <div className="profile-name">Omphile Mohlala</div>
                                <div className="profile-email">omphilestudent@gmail.com</div>
                            </div>
                        </div>
                        <div className="profile-option">
                            <span className="material-icons-sharp">account_circle</span>
                            <div className="profile-info">
                                <div className="profile-name">Kodi Codes PTY LTD</div>
                                <div className="profile-email">Kodi@codes.com</div>
                            </div>
                        </div>
                        <div className="profile-option">
                            <span className="material-icons-sharp">account_circle</span>
                            <div className="profile-info">
                                <div className="profile-name">ABC Enterprises</div>
                                <div className="profile-email">business@example.com</div>
                            </div>
                        </div>
                    </div>
                    <div className="bottom-seperator"></div>
                    <Link to="/manage-business" className="manage-business" onClick={() => setProfileOpen(false)}>Manage business profile</Link>
                </div>
            )}

            {/* Sidebar */}
            {sidebarOpen && (
                <div className="sidebar" id="sidebar" style={{ display: 'block' }}>
                    <Link to="/home2" className="active" onClick={() => setSidebarOpen(false)}>
                        <span className="material-icons-sharp"><img src="/images/home.svg" alt="" /></span> Home
                    </Link>
                    <p className="side">MANAGEMENT</p>
                    <div className="dropdown">
                        <div className="dropdown-toggle" onClick={() => setAuthOpen(o => !o)} style={{ cursor: 'pointer' }}>
                            <span className="material-icons-sharp"><img src="/images/authorisations.svg" alt="" /></span>
                            Authorisations
                            <span className="dropdown-arrow"><img src="/images/chevron-down-white.svg" alt="" /></span>
                        </div>
                        {authOpen && (
                            <div className="dropdown-menu" style={{ display: 'block' }}>
                                <Link to="/support" onClick={() => setSidebarOpen(false)}>Transactions</Link>
                                <Link to="/support" onClick={() => setSidebarOpen(false)}>Beneficiaries</Link>
                                <Link to="/support" onClick={() => setSidebarOpen(false)}>User Management</Link>
                                <Link to="/support" onClick={() => setSidebarOpen(false)}>Account &amp; Limits</Link>
                                <Link to="/support" onClick={() => setSidebarOpen(false)}>Authorisation Levels</Link>
                                <Link to="/support" onClick={() => setSidebarOpen(false)}>Notification Setup</Link>
                                <Link to="/support" onClick={() => setSidebarOpen(false)}>Messages</Link>
                            </div>
                        )}
                    </div>
                    <p className="side">SERVICES</p>
                    <Link to="/explore" onClick={() => setSidebarOpen(false)}>
                        <span className="material-icons-sharp"><img src="/images/productsandservices.svg" alt="" /></span> Products &amp; Services
                    </Link>
                    <Link to="/sars" onClick={() => setSidebarOpen(false)}>
                        <span className="material-icons-sharp"><img src="/images/efiling.svg" alt="" /></span> SARS eFILLING
                    </Link>
                    <Link to="/documents" id="documents" onClick={() => setSidebarOpen(false)}>
                        <span className="material-icons-sharp"><img src="/images/document.svg" alt="" /></span> Documents
                    </Link>
                    <Link to="/settings" id="settings" onClick={() => setSidebarOpen(false)}>
                        <span className="material-icons-sharp"><img src="/images/settings.svg" alt="" /></span> Settings
                    </Link>
                    <Link
                        to="/Sign-In"
                        style={{ position: 'relative', bottom: '-60px', borderTop: '1px solid #FFFFFF', left: '1px', width: '100%', textDecoration: 'none' }}
                        onClick={() => setSidebarOpen(false)}
                    >
                        <span className="material-icons-sharp">lock</span> Sign Out
                    </Link>
                </div>
            )}

            <div className="content" id="mainContent" style={{ paddingBottom: '100px' }}>
                {/* Classic welcome */}
                <div className="welcome-container classic-only">
                    <div className="om-circle" style={{ marginTop: '-10px' }}>OM</div>
                    <b>Welcome, Omphile</b>
                </div>
                <br className="classic-only" />

                {/* Classic accounts */}
                <div className="account classic-only">
                    <div className="account-header">
                        <h4>Accounts</h4>
                        <Link to="/accounts" className="View">
                            View All <span className="material-icons-sharp" style={{ top: '88px', position: 'absolute' }}>chevron_right</span>
                        </Link>
                    </div>
                    <Link to="/accounts" style={{ cursor: 'pointer', textDecoration: 'none' }}>
                        <div className="box" style={{ textDecoration: 'none' }}>
                            <div className="box1" style={{ cursor: 'pointer' }}>
                                <img src="/images/transact.svg" alt="transact" />
                                <span className="separator"></span>
                                <div className="account-details">
                                    <span className="account-name" id="account-name">1 Account Current</span>
                                    <span className="account-balance" id="account-balance">R1000</span>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* New-look accounts */}
                <div className="account new-look-only" style={{ display: 'block' }}>
                    <div className="account-header">
                        <p style={{ fontWeight: 400 }}>Accounts</p>
                        <Link to="/accounts" className="View" style={{ color: '#1a56db' }}>View all</Link>
                    </div>
                    <Link to="/accounts/current" style={{ cursor: 'pointer', textDecoration: 'none' }}>
                        <div className="nl-account-card" style={{ marginTop: '10px' }}>
                            <img src="/images/transact.svg" alt="account" className="nl-account-icon" />
                            <span className="nl-account-name">1 Current AccountS</span>
                            <span className="nl-account-balance" id="nlHomeCreditBalance">
                                {balances ? formatNlBalance(balances.credit.available) : 'R97,159.36'}
                            </span>
                        </div>
                    </Link>
                    <br />
                    <Link to="/accounts" style={{ cursor: 'pointer', textDecoration: 'none' }}>
                        <div className="nl-account-card">
                            <img src="/images/save.svg" alt="save" className="material-icons-sharp nl-account-icon" />
                            <span className="nl-account-name">2 Savings Accounts</span>
                            <span className="nl-account-balance" id="nlHomeSavingsBalance">
                                {balances ? formatNlBalance(savingsTotal) : 'R90.99'}
                            </span>
                        </div>
                    </Link>
                    <Link to="/accounts/credit" style={{ cursor: 'pointer', textDecoration: 'none' }}>
                        <div className="nl-account-card" style={{ marginTop: '10px' }}>
                            <img src="/images/Credit.png" alt="credit" className="nl-account-icon" style={{ width: '30px', height: '30px' }} />
                            <span className="nl-account-name">Credit Account</span>
                            <span className="nl-account-balance">
                                {balances ? formatNlBalance(balances.credit.available) : 'R97,159.36'}
                            </span>
                        </div>
                    </Link>
                </div>

                {/* Classic favourites */}
                <div className="favorites-container classic-only">
                    <div className="favorites">
                        <div className="favorites-header">
                            <h4 style={{ marginLeft: '-20px' }}>Favourites</h4>
                        </div>
                        <div className="favorites-grid">
                            <div className="favorite-box">
                                <span className="material-icons-sharp">
                                    <img src="/images/client-insights.svg" style={{ filter: 'brightness(0) saturate(100%) invert(32%) sepia(89%) saturate(2087%) hue-rotate(202deg) brightness(95%) contrast(90%)' }} alt="" />
                                </span>
                                <span className="favorite-title">Pay Saved beneficiary</span>
                            </div>
                            <div className="favorite-box">
                                <span className="material-icons-sharp">
                                    <img src="/images/once-off-payment.svg" style={{ filter: 'brightness(0) saturate(100%) invert(32%) sepia(89%) saturate(2087%) hue-rotate(202deg) brightness(95%) contrast(90%)' }} alt="" />
                                </span>
                                <span className="favorite-title">Pay Once Off beneficiary</span>
                            </div>
                            <div className="favorite-box">
                                <span className="material-icons-sharp">
                                    <img src="/images/client-insights.svg" style={{ filter: 'brightness(0) saturate(100%) invert(32%) sepia(89%) saturate(2087%) hue-rotate(202deg) brightness(95%) contrast(90%)' }} alt="" />
                                </span>
                                <span className="favorite-title">Group or Multiple payments</span>
                            </div>
                            <div className="favorite-box">
                                <span className="material-icons-sharp">sync_alt</span>
                                <span className="favorite-title">Transfer Money</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* New-look favourites */}
                <div className="favorites-container new-look-only" style={{ display: 'block' }}>
                    <div className="favorites">
                        <div className="favorites-header">
                            <h4>Favourites</h4>
                            <a href="#f" className="View">Edit</a>
                        </div>
                        <div className="favorites-grid">
                            <div className="favorite-box">
                                <span className="material-icons-sharp">group</span>
                                <span className="favorite-title">Pay beneficiary</span>
                            </div>
                            <div className="favorite-box">
                                <span className="material-icons-sharp">credit_card</span>
                                <span className="favorite-title">Pay once-off beneficiary</span>
                            </div>
                            <div className="favorite-box">
                                <span className="material-icons-sharp">group</span>
                                <span className="favorite-title">Group or Multiple payments</span>
                            </div>
                            <div className="favorite-box">
                                <span className="material-icons-sharp">sync_alt</span>
                                <span className="favorite-title">Transfer money</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Classic pending */}
                <div className="pending-container classic-only">
                    <div className="pending">
                        <div className="pending-header">
                            <h4 style={{ position: 'relative', left: '-5px' }}>Pending authorisations (0)</h4>
                            <div className="pending-box">
                                <img src="/images/beneficiaryList.svg" alt="pending" style={{ position: 'absolute', bottom: '-50px', right: '65px', width: '200px', height: '200px' }} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* New-look pending */}
                <div className="pending-container new-look-only" style={{ display: 'block' }}>
                    <div className="pending">
                        <div className="pending-header">
                            <h4>Pending Authorisations (0)</h4>
                        </div>
                        <div className="nl-pending-empty">You have no pending authorisations to approve.</div>
                    </div>
                </div>
            </div>
        </>
    );
}
