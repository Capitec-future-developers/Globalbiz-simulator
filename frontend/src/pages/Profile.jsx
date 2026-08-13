import { useState } from 'react';
import { Link } from 'react-router-dom';
import Stub from './Stub';

const ACCORDIONS = {
    userManagement: {
        icon: 'client-insights',
        label: 'User Management',
        items: ['Users', 'Account & Limits', 'Notification Setup']
    },
    authorisations: {
        icon: 'authorisations',
        label: 'Authorisations',
        items: ['Transactions', 'Beneficiaries', 'Authorisation Levels', 'Messages']
    }
};

export default function Profile() {
    const [openAccordion, setOpenAccordion] = useState(null);
    const [switchOpen, setSwitchOpen] = useState(false);
    const [screen, setScreen] = useState('profile');

    function toggleAccordion(key) {
        setOpenAccordion((cur) => (cur === key ? null : key));
    }

    if (screen === 'stub') {
        return <Stub title="Profile Information" />;
    }

    return (
        <div className="nl-profile-screen">
            <div className="nl-profile-topbar">
                <Link to="/" className="nl-back">
                    <span className="material-icons-sharp">arrow_back</span>
                </Link>
            </div>

            <div className="nl-profile-hero">
                <div className="nl-avatar-lg">ZD</div>
                <div className="nl-profile-fullname">Zenzi Dube</div>
                <div className="nl-profile-subtitle">Business profile &bull; Zenzi Dube</div>
                <button className="nl-switch-profile-btn" type="button" onClick={() => setSwitchOpen(true)}>
                    Switch Profile <span className="material-icons-sharp">expand_more</span>
                </button>
            </div>

            <div className="nl-menu-card">
                <button className="nl-menu-row" type="button" onClick={() => setScreen('stub')} style={{ width: '100%', border: 'none', background: 'none', textAlign: 'left' }}>
                    <span className="material-icons-sharp">person</span>
                    <span>Profile Information</span>
                </button>
                <Link to="/support" className="nl-menu-row">
                    <img className="nl-row-icon" src="/images/efiling.svg" alt="" />
                    <span>SARS eFiling</span>
                </Link>
            </div>

            <div className="nl-menu-card">
                {Object.entries(ACCORDIONS).map(([key, section]) => (
                    <div key={key}>
                        <button
                            className={'nl-menu-row nl-accordion-toggle' + (openAccordion === key ? ' open' : '')}
                            type="button"
                            onClick={() => toggleAccordion(key)}
                        >
                            <img className="nl-row-icon" src={`/images/${section.icon}.svg`} alt="" />
                            <span className="nl-menu-label">{section.label}</span>
                            <span className="material-icons-sharp nl-chevron">expand_more</span>
                        </button>
                        <div className="nl-accordion-menu" style={{ display: openAccordion === key ? 'flex' : 'none' }}>
                            {section.items.map((item) => (
                                <Link key={item} to="/support">{item}</Link>
                            ))}
                        </div>
                    </div>
                ))}
                <Link to="/documents" className="nl-menu-row">
                    <img className="nl-row-icon" src="/images/document.svg" alt="" />
                    <span>Documents</span>
                </Link>
                <Link to="/support" className="nl-menu-row">
                    <img className="nl-row-icon" src="/images/chat.svg" alt="" />
                    <span>Secure Messages</span>
                </Link>
            </div>

            <div className="nl-menu-card">
                <Link to="/support" className="nl-menu-row">
                    <img className="nl-row-icon" src="/images/settings.svg" alt="" />
                    <span>Settings</span>
                </Link>
            </div>

            <Link to="/Sign-In" className="nl-signout">
                Sign out <span className="material-icons-sharp">logout</span>
            </Link>

            {switchOpen && (
                <>
                    <div className="nl-overlay" onClick={() => setSwitchOpen(false)}></div>
                    <div className="nl-sheet nl-switch-sheet">
                        <div className="nl-sheet-handle"></div>
                        <div className="nl-sheet-header">
                            <h3>Current Profile</h3>
                            <button type="button" onClick={() => setSwitchOpen(false)}><span className="material-icons-sharp">close</span></button>
                        </div>

                        <div className="nl-current-profile-card">
                            <div className="nl-current-avatar-wrap">
                                <div className="nl-current-avatar">ZD</div>
                                <span className="material-icons-sharp nl-current-badge">check_circle</span>
                            </div>
                            <div className="nl-current-name">Zenzi Dube</div>
                            <div className="nl-current-email">zenzidube@example.com</div>
                            <span className="material-icons-sharp nl-current-chevron">chevron_right</span>
                        </div>

                        <div className="nl-switch-header-row">
                            <span>Switch to another profile</span>
                            <Link to="/support">Manage</Link>
                        </div>

                        <div className="nl-switch-list">
                            <div className="nl-switch-item">
                                <div className="nl-switch-avatar">ZD</div>
                                <div className="nl-switch-info">
                                    <div className="nl-switch-name">Zenzi</div>
                                    <div className="nl-switch-sub">Zenzi18</div>
                                    <span className="nl-default-pill">Default profile</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
