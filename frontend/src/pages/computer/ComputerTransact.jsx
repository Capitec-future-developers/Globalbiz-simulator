import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useScopedStylesheets from '../../hooks/useScopedStylesheets';
import { getBeneficiaries, addBeneficiary } from '../../hooks/useBeneficiaryStore';
import { adjustBalance, formatCurrency } from '../../hooks/useAccountStore';

const STYLESHEETS = [
    '/legacy-styles/transct.css',
    '/legacy-styles/Chatbotcomputer.css',
];

const BANKS = ['Standard Bank', 'First National Bank', 'ABSA', 'Nedbank', 'Capitec'];

// Faithful React port of Computer/transact.html's content (everything below
// the shared header/sidebar, which ComputerShell owns). scripts/Combined.js
// drove this page's "Saved beneficiary"/"Once-off beneficiary" flow via
// innerHTML string injection into #main-content-area; reproduced here as
// React step-state instead. Every payment still lands on the shared
// useAccountStore ('transactional' account) via adjustBalance(), and any
// beneficiary added here is persisted via useBeneficiaryStore, so both are
// reflected everywhere else in the app (mobile App included).
export default function ComputerTransact() {
    useScopedStylesheets(STYLESHEETS);

    const [screen, setScreen] = useState('default');
    const [beneficiaries, setBeneficiaries] = useState(getBeneficiaries);

    const [paymentType, setPaymentType] = useState('onceoff'); // 'saved' | 'onceoff'
    const [selectedBeneficiary, setSelectedBeneficiary] = useState(null);
    const [amount, setAmount] = useState('');
    const [reference, setReference] = useState('');
    const [onceoffAccountNumber, setOnceoffAccountNumber] = useState('');
    const [onceoffBank, setOnceoffBank] = useState('');
    const [onceoffName, setOnceoffName] = useState('');

    const [newBenName, setNewBenName] = useState('');
    const [newBenAccount, setNewBenAccount] = useState('');
    const [newBenBank, setNewBenBank] = useState('');
    const [newBenNickname, setNewBenNickname] = useState('');
    const [savedBeneficiaryName, setSavedBeneficiaryName] = useState('');

    const [confirmation, setConfirmation] = useState(null);

    useEffect(() => {
        if (screen !== 'processing') return undefined;
        const timer = setTimeout(() => {
            const amt = parseFloat(amount) || 0;
            const label = paymentType === 'saved'
                ? (selectedBeneficiary.nickname || selectedBeneficiary.name)
                : (onceoffName || 'New Beneficiary');
            adjustBalance('transactional', -amt, 'Payment to ' + label);
            if (paymentType === 'onceoff') {
                addBeneficiary({ name: onceoffName, accountNumber: onceoffAccountNumber, bank: onceoffBank, nickname: '', type: 'own' });
                setBeneficiaries(getBeneficiaries());
            }
            setConfirmation({ label, amount: amt, reference, date: new Date().toLocaleString() });
            setScreen('confirmation');
        }, 1800);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [screen]);

    function resetToDefault() {
        setScreen('default');
        setSelectedBeneficiary(null);
        setConfirmation(null);
    }

    function goToPaymentForm(type, beneficiary) {
        setPaymentType(type);
        setSelectedBeneficiary(beneficiary || null);
        setAmount('');
        setReference('');
        setOnceoffAccountNumber('');
        setOnceoffBank('');
        setOnceoffName('');
        setScreen('paymentForm');
    }

    function goToAddBeneficiaryForm() {
        setNewBenName('');
        setNewBenAccount('');
        setNewBenBank('');
        setNewBenNickname('');
        setScreen('addBeneficiary');
    }

    function handleAddBeneficiarySubmit(e) {
        e.preventDefault();
        if (!newBenName || !newBenAccount || !newBenBank) return;
        const saved = addBeneficiary({ name: newBenName, accountNumber: newBenAccount, bank: newBenBank, nickname: newBenNickname, type: 'own' });
        setBeneficiaries(getBeneficiaries());
        setSavedBeneficiaryName(saved.name);
        setScreen('beneficiarySaved');
    }

    function handlePaymentSubmit(e) {
        e.preventDefault();
        setScreen('processing');
    }

    /* ---------------- processing ---------------- */
    if (screen === 'processing') {
        return (
            <div className="payment-processing">
                <div className="spinner"><div className="double-bounce1"></div><div className="double-bounce2"></div></div>
                <h2>Processing Payment...</h2>
                <p>Please wait while we process your payment</p>
            </div>
        );
    }

    /* ---------------- confirmation ---------------- */
    if (screen === 'confirmation' && confirmation) {
        return (
            <div className="payment-confirmation">
                <div className="confirmation-icon success"><span className="material-icons-sharp">check_circle</span></div>
                <h2>Payment Successful!</h2>
                <p>Your payment has been processed successfully</p>
                <div className="confirmation-details">
                    <div className="detail-row"><span>Recipient:</span><span>{confirmation.label}</span></div>
                    <div className="detail-row"><span>Amount:</span><span>{formatCurrency(confirmation.amount)}</span></div>
                    <div className="detail-row"><span>Reference:</span><span>{confirmation.reference}</span></div>
                    <div className="detail-row"><span>Date:</span><span>{confirmation.date}</span></div>
                </div>
                <div className="confirmation-actions">
                    <button className="done-btn" type="button" onClick={resetToDefault}>Done</button>
                    <button className="secondary-btn" type="button" onClick={() => alert('Receipt downloaded successfully!')}>Download Receipt</button>
                </div>
            </div>
        );
    }

    /* ---------------- beneficiary saved ---------------- */
    if (screen === 'beneficiarySaved') {
        return (
            <div className="payment-confirmation">
                <div className="confirmation-icon success"><span className="material-icons-sharp">check_circle</span></div>
                <h2>Beneficiary Saved!</h2>
                <p>{savedBeneficiaryName} has been added to your beneficiaries</p>
                <div className="confirmation-actions">
                    <button className="done-btn" type="button" onClick={resetToDefault}>Done</button>
                    <button className="primary-btn" type="button" onClick={() => goToPaymentForm('saved', beneficiaries.find((b) => b.name === savedBeneficiaryName) || { name: savedBeneficiaryName })}>Pay Now</button>
                </div>
            </div>
        );
    }

    /* ---------------- add beneficiary form ---------------- */
    if (screen === 'addBeneficiary') {
        return (
            <div className="add-beneficiary-form">
                <div className="payment-header">
                    <button className="back-button" type="button" onClick={() => setScreen('beneficiarySelection')}>
                        <span className="material-icons-sharp">arrow_back</span> Back
                    </button>
                    <h2>Add New Beneficiary</h2>
                </div>
                <form onSubmit={handleAddBeneficiarySubmit}>
                    <div className="form-group">
                        <label htmlFor="beneficiary-name">Full Name</label>
                        <input type="text" id="beneficiary-name" placeholder="Enter full name" required value={newBenName} onChange={(e) => setNewBenName(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="account-number">Account Number</label>
                        <input type="text" id="account-number" placeholder="Enter account number" required value={newBenAccount} onChange={(e) => setNewBenAccount(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bank">Bank</label>
                        <select id="bank" required value={newBenBank} onChange={(e) => setNewBenBank(e.target.value)}>
                            <option value="">Select bank</option>
                            {BANKS.map((b) => <option key={b} value={b}>{b}</option>)}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="nickname">Nickname (Optional)</label>
                        <input type="text" id="nickname" placeholder="e.g. Mom's Account" value={newBenNickname} onChange={(e) => setNewBenNickname(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <button className="submit-btn" type="submit">Save Beneficiary</button>
                    </div>
                </form>
            </div>
        );
    }

    /* ---------------- beneficiary selection ---------------- */
    if (screen === 'beneficiarySelection') {
        const ownBeneficiaries = beneficiaries.filter((b) => b.type === 'own');
        return (
            <div className="beneficiary-selection">
                <div className="payment-header">
                    <button className="back-button" type="button" onClick={resetToDefault}>
                        <span className="material-icons-sharp">arrow_back</span> Back
                    </button>
                    <h2>Select Beneficiary</h2>
                    <p>Choose from your saved beneficiaries</p>
                </div>
                <div className="beneficiary-list">
                    {ownBeneficiaries.length === 0 && (
                        <div className="empty-state" style={{ padding: 16, color: '#666' }}>No beneficiaries yet. Add one below.</div>
                    )}
                    {ownBeneficiaries.map((b) => (
                        <div className="beneficiary-card" key={b.id} onClick={() => goToPaymentForm('saved', b)}>
                            <div className="beneficiary-avatar"><span className="material-icons-sharp">person</span></div>
                            <div className="beneficiary-details">
                                <h3>{b.name}{b.nickname ? ` (${b.nickname})` : ''}</h3>
                                <p>Account: ****{String(b.accountNumber || '').slice(-4)}</p>
                                <p>Bank: {b.bank}</p>
                            </div>
                            <span className="material-icons-sharp chevron-right">chevron_right</span>
                        </div>
                    ))}
                </div>
                <div className="add-beneficiary-footer">
                    <button id="add-new-beneficiary" className="add-beneficiary-btn" type="button" onClick={goToAddBeneficiaryForm}>
                        <span className="material-icons-sharp">add</span> Add New Beneficiary
                    </button>
                </div>
            </div>
        );
    }

    /* ---------------- payment form ---------------- */
    if (screen === 'paymentForm') {
        const label = paymentType === 'saved' ? (selectedBeneficiary.nickname || selectedBeneficiary.name) : '';
        const title = paymentType === 'saved' ? `Pay ${label}` : 'Pay New Beneficiary';
        return (
            <div className="payment-form-section">
                <div className="payment-header">
                    <button className="back-button" type="button" onClick={() => setScreen(paymentType === 'saved' ? 'beneficiarySelection' : 'default')}>
                        <span className="material-icons-sharp">arrow_back</span> Back
                    </button>
                    <h2>{title}</h2>
                    <p>Enter payment details</p>
                </div>
                <form onSubmit={handlePaymentSubmit}>
                    {paymentType === 'saved' && (
                        <div className="form-group">
                            <label>Beneficiary</label>
                            <div className="read-only-field">{label}</div>
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="amount">Amount (ZAR)</label>
                        <input type="number" id="amount" placeholder="0.00" min="1" required value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="reference">Payment Reference</label>
                        <input type="text" id="reference" placeholder="Enter reference" required value={reference} onChange={(e) => setReference(e.target.value)} />
                    </div>
                    {paymentType === 'onceoff' && (
                        <>
                            <div className="form-group">
                                <label htmlFor="account-number">Account Number</label>
                                <input type="text" id="account-number" placeholder="Enter account number" required value={onceoffAccountNumber} onChange={(e) => setOnceoffAccountNumber(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="bank">Bank</label>
                                <select id="bank" required value={onceoffBank} onChange={(e) => setOnceoffBank(e.target.value)}>
                                    <option value="">Select bank</option>
                                    {BANKS.map((b) => <option key={b} value={b}>{b}</option>)}
                                </select>
                            </div>
                            <div className="form-group">
                                <label htmlFor="beneficiary-name">Beneficiary Name</label>
                                <input type="text" id="beneficiary-name" placeholder="Enter beneficiary name" required value={onceoffName} onChange={(e) => setOnceoffName(e.target.value)} />
                            </div>
                        </>
                    )}
                    <div className="form-group">
                        <button className="submit-payment-btn" type="submit">{paymentType === 'onceoff' ? 'Pay & Save Beneficiary' : 'Confirm Payment'}</button>
                    </div>
                </form>
            </div>
        );
    }

    /* ---------------- default (Computer/transact.html landing content) ---------------- */
    return (
        <>
            <h1 className="page-title" style={{ color: 'black' }}>Payments</h1>

            <div className="the-box">
                <div className="quick-actions">
                    <div className="action-card" id="saved-payment-btn" onClick={() => setScreen('beneficiarySelection')}>
                        <h3>Saved beneficiary</h3>
                        <div className="separator"></div>
                        <p className="right">Pay</p>
                    </div>
                    <div className="action-card" id="onceoff-payment-btn" onClick={() => goToPaymentForm('onceoff', null)}>
                        <h3>Once-off beneficiary</h3>
                        <div className="separator"></div>
                        <p className="right">Pay</p>
                    </div>
                    <div className="action-card">
                        <h3>Group or multiple beneficiaries</h3>
                        <div className="separator"></div>
                        <Link className="right" to="/online-banking/group-payment" style={{ textDecoration: 'none', color: 'grey', fontSize: 15 }}>Pay</Link>
                    </div>
                    <div className="action-card">
                        <h3>Bulk beneficiaries</h3>
                        <div className="separator"></div>
                        <p className="right"><Link style={{ textDecoration: 'none', color: 'grey' }} to="/online-banking/bulk-payment">Pay</Link></p>
                    </div>
                </div>
            </div>

            <div className="divider"></div>

            <section className="payment-history">
                <header className="history-header">
                    <h2 className="history-title">All payments</h2>
                    <div className="history-filters">
                        <div className="filter-item">
                            <label>Search payments</label>
                            <input type="text" placeholder="Search..." />
                        </div>
                        <div className="filter-item">
                            <label>From account</label>
                            <select><option>All accounts</option></select>
                        </div>
                        <div className="filter-item">
                            <label>Date range</label>
                            <select><option>Last 30 days</option></select>
                        </div>
                        <div className="filter-item">
                            <label>Filter history by</label>
                            <select>
                                <option>All payments</option>
                                <option>Recurring payments</option>
                                <option>Future-dated payments</option>
                                <option>Bulk payments</option>
                            </select>
                        </div>
                        <div className="filter-item">
                            <label>Payment type</label>
                            <select><option>All types</option></select>
                        </div>
                    </div>
                </header>

                <table className="payment-table">
                    <thead>
                        <tr>
                            <th>Payment date</th>
                            <th>Payment type</th>
                            <th>From account</th>
                            <th>Beneficiary name</th>
                            <th>Their reference</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={5} className="no-payments">No payments match your search.</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </>
    );
}
