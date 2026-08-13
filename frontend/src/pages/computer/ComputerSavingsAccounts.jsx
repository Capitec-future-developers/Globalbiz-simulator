import { useState } from 'react';
import { Link } from 'react-router-dom';
import useScopedStylesheets from '../../hooks/useScopedStylesheets';
import { getBalances, formatCurrency } from '../../hooks/useAccountStore';
import { ACCOUNT_INFO } from '../../data/accounts';

const STYLESHEETS = [
    '/legacy-styles/account details.css',
    '/legacy-styles/Chatbotcomputer.css',
];

// Mirrors Computer/savingsAccounts1.html, the desktop drill-down for the
// Flexible Savings Account (dark "account-box" variant, save-white.svg
// icon). Structurally identical to Account details.html — same tabs,
// controls, info banner and "Manage Account" auth popup — but it is its
// own page in the golden master (with its own, slightly different broken
// sidebar) so it is ported as its own component here, per the desktop
// convention of one component per source HTML file.
//
// Reads/writes nothing itself (no payment flow lives on this screen) but
// pulls balances from the same shared useAccountStore as the mobile App's
// SavingsAccount.jsx / AccountDetails.jsx so figures never drift apart.
const ACCOUNT_ID = 'flexible';

function groupByMonth(transactions) {
    const groups = [];
    let lastMonth = null;
    transactions.forEach((tx) => {
        const monthYear = tx.date.split(' ').slice(1).join(' ');
        if (monthYear !== lastMonth) {
            groups.push({ monthYear, items: [] });
            lastMonth = monthYear;
        }
        groups[groups.length - 1].items.push(tx);
    });
    return groups;
}

function spacedNumber(num) {
    return num.replace(/(\d{4})(?=\d)/g, '$1 ');
}

const CREATE_PAYMENT_LABELS = { authoriser: 'Authoriser', capturer: 'Capturer' };
const APPROVE_PAYMENT_LABELS = { none: 'No one', one: 'One person', two: 'Two people' };

export default function ComputerSavingsAccounts() {
    useScopedStylesheets(STYLESHEETS);

    const [balances] = useState(getBalances);
    const [tab, setTab] = useState('transactions');
    const [authOpen, setAuthOpen] = useState(false);
    const [authStep, setAuthStep] = useState('form'); // 'form' | 'confirmation'
    const [createPayment, setCreatePayment] = useState('');
    const [approvePayment, setApprovePayment] = useState('');

    const info = ACCOUNT_INFO[ACCOUNT_ID];
    const bal = balances[ACCOUNT_ID];
    const transactions = bal.transactions || [];

    let running = bal.balance;
    const rows = transactions.map((tx) => {
        const row = { ...tx, runningBalance: running };
        running -= tx.amount;
        return row;
    });
    const monthGroups = groupByMonth(rows);

    function openAuthPopup() {
        setAuthStep('form');
        setCreatePayment('');
        setApprovePayment('');
        setAuthOpen(true);
    }

    function handleContinue() {
        if (!createPayment || !approvePayment) {
            alert('Please select options for both fields');
            return;
        }
        setAuthStep('confirmation');
    }

    function handleSave() {
        alert('Authorization settings saved successfully!');
        setAuthOpen(false);
    }

    return (
        <div className="main-content">
            <div className="back-nav">
                <Link to="/online-banking/accounts">
                    <span className="material-icons-sharp" style={{ fontSize: 30, color: '#007FFF' }}>arrow_back</span> Account Details
                </Link>
            </div>

            <div className="account-box" style={{ backgroundColor: '#16232f' }}>
                <div className="account-info-row">
                    <div className="info-item">
                        <span className="info-label"><img src="/images/save-white.svg" alt="" /></span>
                        <span className="info-value" style={{ position: 'relative', left: 50, top: -25, fontWeight: 'bold', fontSize: 20 }}>Flexible Savings</span>
                    </div>
                    <div className="yohyoh">
                        <div className="info-item"><span className="info-label">Account type:</span> <span className="info-value">Transact</span></div>
                        <div className="info-item"><span className="info-label">Account number:</span> <span className="info-value">{spacedNumber(info.number)}</span></div>
                        <div className="info-item"><span className="info-label">Current balance:</span> <span className={'info-value' + (bal.balance < 0 ? ' negative' : ' positive')}>{formatCurrency(bal.balance)}</span></div>
                        <div className="info-item"><span className="info-label">Available balance:</span> <span className="info-value">{formatCurrency(bal.available)}</span></div>
                        <div className="info-item"><span className="info-label">Status:</span> <span className="info-value">Open</span></div>
                    </div>
                </div>

                <div className="manage-btn-container" style={{ backgroundColor: '#16232f', position: 'absolute', border: '1px solid #ffffff', right: 50 }}>
                    <button className="manage-btn" type="button" style={{ backgroundColor: '#16232f' }}>Manage Account</button>
                    <div className="details-hover">
                        <ul>
                            <li><a href="#" id="set-auth-level" onClick={(e) => { e.preventDefault(); openAuthPopup(); }}>Set account authorization</a></li>
                            <li><a href="#" onClick={(e) => e.preventDefault()}>Edit account nickname</a></li>
                        </ul>
                    </div>
                </div>

                <div className="popup-overlay" id="authPopup" style={{ display: authOpen ? 'flex' : 'none' }}>
                    <div className="auth-popup">
                        <div className="popup-header">Set Authorization Level</div>

                        {authStep === 'form' ? (
                            <div className="form-page" id="formPage">
                                <div className="form-group">
                                    <label htmlFor="createPayment">Who can create payment:<img src="/images/info-trans.svg" alt="" /></label>
                                    <select id="createPayment" value={createPayment} onChange={(e) => setCreatePayment(e.target.value)}>
                                        <option value="">Choose Approver</option>
                                        <option value="authoriser">Authoriser</option>
                                        <option value="capturer">Capturer</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="approvePayment">Who must approve payment:<img src="/images/info-trans.svg" alt="" /></label>
                                    <select id="approvePayment" value={approvePayment} onChange={(e) => setApprovePayment(e.target.value)}>
                                        <option value="">Choose</option>
                                        <option value="one">One person</option>
                                        <option value="two">Two people</option>
                                        <option value="none">No one</option>
                                    </select>
                                </div>

                                <div className="popup-footer">
                                    <button className="btn btn-cancel" type="button" onClick={() => setAuthOpen(false)}>Cancel</button>
                                    <button className="btn btn-continue" type="button" onClick={handleContinue}>Continue</button>
                                </div>
                            </div>
                        ) : (
                            <div className="confirmation-page" id="confirmationPage">
                                <div className="confirmation-item">
                                    <div className="confirmation-label">Who can create payment? <img src="/images/info-trans.svg" alt="" /></div>
                                    <div className="confirmation-value">{CREATE_PAYMENT_LABELS[createPayment] || ''}</div>
                                </div>

                                <div className="confirmation-item">
                                    <div className="confirmation-label">Who must approve payment? <img src="/images/info-trans.svg" alt="" /></div>
                                    <div className="confirmation-value">{APPROVE_PAYMENT_LABELS[approvePayment] || ''}</div>
                                </div>

                                <div className="popup-footer">
                                    <button className="btn btn-cancel" type="button" onClick={() => setAuthStep('form')}>Back</button>
                                    <button className="btn btn-save" type="button" onClick={handleSave}>Save</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="tabs">
                <button type="button" id="btn-transactions" onClick={() => setTab('transactions')}><div className={'tab' + (tab === 'transactions' ? ' active' : '')}>Transactions</div></button>
                <button type="button" id="btn-payment-history" onClick={() => setTab('payment-history')}><div className={'tab' + (tab === 'payment-history' ? ' active' : '')}>Payment history</div></button>
                <button type="button" id="btn-stamped-statements" onClick={() => setTab('stamped-statements')}><div className={'tab' + (tab === 'stamped-statements' ? ' active' : '')}>Stamped statements</div></button>
                <button type="button" id="btn-account-information" onClick={() => setTab('account-information')}><div className={'tab' + (tab === 'account-information' ? ' active' : '')}>Account information</div></button>
            </div>

            <div className="controls">
                <input type="text" placeholder="Search transactions" />
                <input type="date" />
                <select><option>Filter history by</option></select>
                <select><option>Transaction type</option></select>
                <button className="download-btn" type="button">Download</button>
            </div>

            <div className="info-banner">
                <span className="material-icons-sharp">info</span>
                Choose a date range of up to 6 months before you download
            </div>

            <div id="tab-content">
                {tab === 'transactions' ? (
                    <table className="transaction-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Transaction Type</th>
                                <th>Reference</th>
                                <th>Amount</th>
                                <th>Fees</th>
                                <th>Balance</th>
                            </tr>
                        </thead>
                        {monthGroups.map((group) => (
                            <tbody key={group.monthYear}>
                                <tr><th colSpan={6}>{group.monthYear}</th></tr>
                                {group.items.map((tx) => (
                                    <tr key={tx.id}>
                                        <td>{tx.date}</td>
                                        <td>{tx.amount < 0 ? 'Debit' : 'Credit'}</td>
                                        <td>{tx.name}</td>
                                        <td className={tx.amount < 0 ? 'negative' : 'positive'}>{formatCurrency(tx.amount)}</td>
                                        <td>R0.00</td>
                                        <td className={tx.runningBalance < 0 ? 'negative' : 'positive'}>{formatCurrency(tx.runningBalance)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        ))}
                    </table>
                ) : (
                    <div style={{ padding: 40, textAlign: 'center', color: '#888' }}>Nothing to show here yet.</div>
                )}
            </div>
        </div>
    );
}
