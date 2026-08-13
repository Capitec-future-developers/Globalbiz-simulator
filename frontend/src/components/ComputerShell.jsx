import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

// Faithful React port of Computer/Computer.html's persistent shell: the
// fixed top .header (logo/business label/chatbot/profile popup/sign out)
// and the fixed .sidebar (Home, Transact + Authorisations + User management
// dropdowns, Products & Services, SARS eFiling, Secure Messages, Documents,
// Settings). scripts/Combined.js drives dropdown toggle/outside-click-close,
// sidebar collapse+localStorage persistence, and the profile popup+overlay
// — reproduced here as React state instead of DOM classList toggling.
//
// Deliberately owns NO stylesheet of its own: in the golden-master source,
// every Computer/*.html page ships its own <link> list (some share
// Computer.css as a base, others — Accounts.html, Cards.html,
// Beneficiaries.html, transact.html, transfer.html, messages.html,
// Profile-info.html, "Account details.html" — are fully self-contained with
// their own .header/.sidebar redefinitions). Reproducing that per-page
// variation faithfully means each *page* component calls
// useScopedStylesheets with its own exact source list; ComputerShell just
// renders the shared markup on top of whatever the active page loaded.
export default function ComputerShell({ children }) {
    const location = useLocation();

    const [collapsed, setCollapsed] = useState(false);
    const [openDropdown, setOpenDropdown] = useState(null);
    const [profileOpen, setProfileOpen] = useState(false);
    const [chatOpen, setChatOpen] = useState(false);
    const sidebarRef = useRef(null);

    useEffect(() => {
        const saved = localStorage.getItem('sidebarCollapsed');
        if (saved === 'true') setCollapsed(true);
    }, []);

    useEffect(() => {
        localStorage.setItem('sidebarCollapsed', collapsed);
    }, [collapsed]);

    useEffect(() => {
        function handleOutsideClick(e) {
            if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
                setOpenDropdown(null);
            }
        }
        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick);
    }, []);

    function toggleDropdown(key) {
        setOpenDropdown((prev) => (prev === key ? null : key));
    }

    const isActive = (path) => location.pathname === path;

    return (
        <div className="computer-shell">
            <div className="header">
                <Link to="/online-banking" className="logo"><img src="/images/Logo.png" alt="logo" /></Link>
                <span className="separator"></span>
                <div className="business">Business</div>

                <div className="header-right">
                    <button className="chatbot-toggler" onClick={() => setChatOpen((v) => !v)} type="button">
                        <span className="material-icons-sharp"><img src="/images/chat.svg" alt="chat" style={{ position: 'absolute', color: '#cccccc', top: -10 }} /></span>
                        <span className="material-icons-sharp" style={{ color: '#111111' }}>close</span>
                    </button>
                    banker

                    {chatOpen && (
                        <div className="chatbot" style={{ display: 'block' }}>
                            <header>
                                <h2>BIZCHAT</h2>
                                <span className="material-icons-sharp" onClick={() => setChatOpen(false)}>close</span>
                            </header>
                            <ul className="chatbox">
                                <li className="chat incoming">
                                    <span className="material-icons-sharp">account_circle</span>
                                    <p>Welcome to Bizchat, how can I assist.</p>
                                </li>
                                <li className="chat outgoing"></li>
                            </ul>
                            <div className="chat-input">
                                <textarea placeholder="Type your message here..." required></textarea>
                                <span id="send-btn" className="material-icons-sharp">send</span>
                            </div>
                        </div>
                    )}

                    <div className="profile-container">
                        <a href="#" id="profile-link" style={{ textDecoration: 'none' }} onClick={(e) => { e.preventDefault(); setProfileOpen(true); }}>
                            <div className="om-circle" style={{ textDecoration: 'none' }}>ZD</div>
                            <div className="name">Zenzi Dube</div>
                        </a>

                        {profileOpen && <div className="overlay active" onClick={() => setProfileOpen(false)}></div>}
                        <div className={'profile-popup' + (profileOpen ? ' active' : '')} id="profilePopup">
                            <Link className="popup-header" to="/online-banking/profile-info">
                                <div className="popup-header">zenzi.dube@zenzidigital.co.za</div>
                            </Link>
                            <div className="profile-item">
                                <span className="material-icons-sharp profile-icon">account_circle</span>
                                <div className="profile-info">
                                    <div className="profile-active">ACTIVE PROFILE</div>
                                    <div className="profile-Name">Zenzi Dube</div>
                                </div>
                            </div>
                            <div id="page-transition"></div>
                            <Link to="/online-banking/kodi-code" className="switch-profile">
                                <span className="material-icons-sharp" style={{ fontSize: 16, verticalAlign: 'middle' }}>swap_horiz</span>
                                Switch to Zenzi Digital Holdings
                            </Link>
                            <Link to="/online-banking/manage-business" className="manage-business">Manage business profile</Link>
                        </div>
                    </div>
                    <Link to="/online-banking/online-banking-signout" className="sign">Sign Out</Link>
                </div>
            </div>

            <nav className={'sidebar' + (collapsed ? ' collapsed' : '')} ref={sidebarRef}>
                <div className="menu-toggle" id="sidebarToggle" onClick={() => setCollapsed((v) => !v)}>
                    <span className="material-icons-sharp">{collapsed ? 'chevron_right' : 'menu'}</span>
                </div>
                <Link to="/online-banking" className={isActive('/online-banking') ? 'active' : ''} id="home">
                    <span className="material-icons-sharp"><img src="/images/home.svg" alt="home" style={{ color: '#cccccc' }} /></span>
                    Home
                </Link>
                <p className="side">BANKING</p>
                <Link to="/online-banking/accounts" id="accounts">
                    <span className="material-icons-sharp"><img src="/images/accounts.svg" alt="accounts" style={{ color: '#cccccc' }} /></span>
                    Accounts
                </Link>
                <div className={'dropdown' + (openDropdown === 'transact' ? ' active open' : '')}>
                    <a href="#" className="dropdown-toggle" id="transacts" onClick={(e) => { e.preventDefault(); toggleDropdown('transact'); }}>
                        <span className="material-icons-sharp"><img src="/images/transact-white.svg" alt="transact" style={{ color: '#cccccc' }} /></span>
                        Transact
                        <span className="dropdown-arrow"><img src="/images/chevron-down-white.svg" alt="" /></span>
                    </a>
                    <div className="dropdown-menu">
                        <Link to="/online-banking/transact" id="payments">Payment</Link>
                        <Link to="/online-banking/transfer" id="Transfers">Transfer</Link>
                        <Link to="/online-banking/add-beneficiaries" id="beneficiars">Beneficiary</Link>
                    </div>
                </div>
                <Link to="/online-banking/cards">
                    <span className="material-icons-sharp"><img src="/images/cards_icon.svg" alt="cards" style={{ color: '#cccccc' }} /></span>
                    Cards
                </Link>
                <p className="side">MANAGEMENT</p>

                <div className={'dropdown' + (openDropdown === 'auth' ? ' active open' : '')}>
                    <a href="#" className="dropdown-toggle" onClick={(e) => { e.preventDefault(); toggleDropdown('auth'); }}>
                        <span className="material-icons-sharp"><img src="/images/authorisations.svg" alt="authorisations" style={{ color: '#cccccc' }} /></span>
                        Authorisations
                        <span className="dropdown-arrow"><img src="/images/chevron-down-white.svg" alt="" /></span>
                    </a>
                    <div className="dropdown-menu">
                        <Link to="/online-banking/auth-transactions">Transactions</Link>
                        <Link to="/online-banking/beneficiaries">Beneficiaries</Link>
                        <Link to="/online-banking/in-progress">User Management</Link>
                        <Link to="/online-banking/in-progress">Account &amp; Limits</Link>
                        <Link to="/online-banking/in-progress">Authorisation Levels</Link>
                        <Link to="/online-banking/in-progress">Notification Setup</Link>
                        <Link to="/online-banking/messages">Messages</Link>
                    </div>
                </div>
                <div className={'dropdown' + (openDropdown === 'usermgmt' ? ' active open' : '')}>
                    <a href="#" className="dropdown-toggle" onClick={(e) => { e.preventDefault(); toggleDropdown('usermgmt'); }}>
                        <span className="material-icons-sharp">groups</span>
                        User management
                        <span className="dropdown-arrow"><img src="/images/chevron-down-white.svg" alt="" /></span>
                    </a>
                    <div className="dropdown-menu">
                        <Link to="/online-banking/user-management">User Details</Link>
                        <a href="#">Activity History</a>
                    </div>
                </div>
                <p className="side">SERVICES</p>
                <Link to="/online-banking/products-services">
                    <span className="material-icons-sharp"><img src="/images/productsandservices.svg" alt="products" style={{ color: '#cccccc' }} /></span>
                    Products &amp; Services
                </Link>
                <Link to="/online-banking/sars">
                    <span className="material-icons-sharp"><img src="/images/efiling.svg" alt="sars" style={{ color: '#cccccc' }} /></span>
                    SARS eFiling
                </Link>
                <Link to="/online-banking/secure-messages">
                    <span className="material-icons-sharp"><img src="/images/messages (1).svg" alt="messages" style={{ color: '#cccccc' }} /></span>
                    Secure Messages
                </Link>
                <Link to="/online-banking/documents">
                    <span className="material-icons-sharp"><img src="/images/document.svg" alt="documents" style={{ color: '#cccccc' }} /></span>
                    Documents
                </Link>
                <Link to="/online-banking/settings">
                    <span className="material-icons-sharp"><img src="/images/settings.svg" alt="settings" style={{ color: '#cccccc' }} /></span>
                    Settings
                </Link>
                <a href="#" className="signout">
                    <span className="material-icons-sharp">lock</span>
                    We secure your data in line with our Privacy Notice and Terms &amp; Conditions
                </a>
            </nav>

            <div className={'search-container' + (collapsed ? '' : '')} style={{ marginLeft: collapsed ? 90 : 290, position: 'relative', top: 90 }}>
                <input type="text" id="automation-search" placeholder="What would you like to do? (e.g., 'Pay saved beneficiary')" />
                <button id="execute-automation" className="search-button" aria-label="Execute search" type="button">
                    <span className="material-icons-sharp">search</span> Go
                </button>
                <div id="suggestions-dropdown" className="suggestions-dropdown"></div>
            </div>

            <div className={collapsed ? 'expanded' : ''} style={{ marginLeft: collapsed ? 90 : 290, paddingTop: 40, paddingRight: 30, paddingBottom: 30 }}>
                {children}
            </div>
        </div>
    );
}
