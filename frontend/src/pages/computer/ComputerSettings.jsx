import { useState } from 'react';
import { Link } from 'react-router-dom';
import useScopedStylesheets from '../../hooks/useScopedStylesheets';

const STYLESHEETS = [
    '/legacy-styles/profile-info.css',
    '/legacy-styles/Chatbotcomputer.css',
];

const TABS = [
    { key: 'transactionLimit', id: 'Transaction-Limits', label: 'Transaction Limits' },
    { key: 'transactionNotification', id: 'Transaction-Notifications', label: 'Transaction Notifications' },
    { key: 'profileNotification', id: 'Profile-Notifications', label: 'Profile Notifications' },
];

// Faithful React port of Computer/settings.html's main-content
// (header/sidebar/search-container are owned by ComputerShell). The three
// tabs and their content reproduce scripts/setting.js's
// displayContent/highlightButton logic as React state instead of innerHTML
// swaps.
export default function ComputerSettings() {
    useScopedStylesheets(STYLESHEETS);
    const [tab, setTab] = useState('transactionLimit');
    const [editPopupOpen, setEditPopupOpen] = useState(false);

    return (
        <div className="main-content">
            <div className="back-nav">
                <Link to="/online-banking/accounts">
                    <h2>Settings</h2>
                </Link>
            </div>

            <div className="tabs">
                {TABS.map((t) => (
                    <button key={t.key} id={t.id} className={tab === t.key ? 'active' : ''} type="button" onClick={() => setTab(t.key)}>
                        <div className={'tab' + (tab === t.key ? ' active' : '')}>{t.label}</div>
                    </button>
                ))}
            </div>

            <div id="tab-content">
                {tab === 'transactionLimit' && (
                    <div className="tab-content tab-content-active">
                        <div className="transaction-container">
                            <span className="info-heading"><h3>Transaction Limits</h3></span>
                            <div className="account-box">
                                <div className="account-info-row" style={{ borderLeft: '6px solid #3498db', borderRadius: 5 }}>
                                    <div className="info-item">
                                        <span className="info-value">R0.00</span>
                                        <span className="info-label"><strong>Today's total spent</strong></span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-value">R550</span>
                                        <span className="info-label"><strong>Maximum daily transaction limit</strong></span>
                                    </div>
                                    <span className="edit-limit">
                                        <div className="edit-limit-btn" onClick={() => setEditPopupOpen(true)}>Edit Maximum Limit</div>
                                        {editPopupOpen && (
                                            <div className="edit-popup" style={{ display: 'block' }}>
                                                <div className="edit-popup-content">Edit Maximum Daily Limit</div>
                                                <div className="edit-popup-body">
                                                    <input type="text" placeholder="R0.00" />
                                                    <p>Leave empty to set zero limits</p>
                                                    <input type="text" placeholder="R550" />
                                                    <p>Set new transaction limits</p>
                                                    <div className="buttons">
                                                        <div className="cancel-btn" onClick={() => setEditPopupOpen(false)}>Cancel</div>
                                                        <div className="update-btn">Update</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </span>
                                </div>
                            </div>
                            <div className="search-section">
                                <button className="edit-btn" type="button">Edit Account Limits</button>
                                <input type="text" placeholder="Search..." className="search-bar" />
                                <select className="account-select">
                                    <option value="">Account Type</option>
                                    <option value="savings">Savings</option>
                                    <option value="current">Current</option>
                                </select>
                            </div>
                            <div className="account-header">
                                <span className="header-item">Account</span>
                                <span className="header-item center">Limit Amount</span>
                                <span className="header-item right">Today's Total</span>
                            </div>
                            <div className="account-details">
                                <span className="detail-item">Zenzi Digital Holdings 1052 2626 43</span>
                                <span className="detail-item center">R90 000</span>
                                <span className="detail-item right">R1000.00</span>
                            </div>
                        </div>
                    </div>
                )}

                {tab === 'transactionNotification' && (
                    <div className="tab-content">
                        <div className="transaction-container">
                            <div className="notification-header flex-row">
                                <span className="header-item">Account</span>
                                <span className="header-item center">Currency</span>
                                <span className="header-item">Transaction Alert Type</span>
                                <span className="header-item">Credit Threshold</span>
                                <span className="header-item">Debit Threshold</span>
                                <span className="header-item">Actions</span>
                            </div>
                            <div className="account-details flex-row">
                                <span className="details-item">Zenzi Digital Holdings 1052 2626 43</span>
                                <span className="currency">ZAR</span>
                                <span className="credit-and-debit">Credit and Debit</span>
                                <span className="credit-item">R1.00</span>
                                <span className="debit-item">R1.00</span>
                                <div className="btn">Edit</div>
                            </div>
                        </div>
                    </div>
                )}

                {tab === 'profileNotification' && (
                    <div className="tab-content">
                        <h3>Profile Notifications</h3>
                        <p>Content for Profile Notifications tab goes here.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
