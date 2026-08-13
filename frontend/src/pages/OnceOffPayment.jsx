import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getBalances, adjustBalance, formatCurrency } from '../hooks/useAccountStore';
import { ACCOUNT_INFO, NL_ACCOUNTS } from '../data/accounts';
import { nlPublicBeneficiaries } from '../data/publicBeneficiaries';
import AccountPickerSheet from '../components/AccountPickerSheet';

function buildAccounts() {
    const balances = getBalances();
    return NL_ACCOUNTS.map((id) => ({
        id,
        name: ACCOUNT_INFO[id].name,
        number: ACCOUNT_INFO[id].number,
        available: balances[id].available
    }));
}

const LIMIT_LETTERS = ['A', 'B'];

export default function OnceOffPayment() {
    const navigate = useNavigate();
    // 'chooser' | 'bank-form' | 'public-list' | 'amount' | 'success'
    const [step, setStep] = useState('chooser');
    const [amountReturnStep, setAmountReturnStep] = useState('bank-form');

    // bank-account form fields
    const [beneficiaryName, setBeneficiaryName] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [bank, setBank] = useState('');
    const [theirRef, setTheirRef] = useState('');
    const [yourRef, setYourRef] = useState('');

    // public beneficiary list
    const [searchTerm, setSearchTerm] = useState('');
    const [showAll, setShowAll] = useState(false);

    // shared amount step
    const [payeeName, setPayeeName] = useState('');
    const [accounts] = useState(buildAccounts);
    const [account, setAccount] = useState(accounts[0]);
    const [pickerOpen, setPickerOpen] = useState(false);
    const [amount, setAmount] = useState('0.00');
    const [paidAmount, setPaidAmount] = useState(0);
    const [paidFromAccountName, setPaidFromAccountName] = useState('');

    const formValid = beneficiaryName && accountNumber && bank;
    const numericAmount = parseFloat(amount) || 0;
    const insufficientFunds = numericAmount > account.available;

    function goToAmount(name, returnStep) {
        setPayeeName(name);
        setAmountReturnStep(returnStep);
        setAmount('0.00');
        setYourRef('');
        setAccount(accounts[0]);
        setStep('amount');
    }

    function handlePay() {
        adjustBalance(account.id, -numericAmount, 'Payment to ' + payeeName);
        setPaidAmount(numericAmount);
        setPaidFromAccountName(account.name);
        setStep('success');
    }

    if (step === 'success') {
        return (
            <div className="payment-confirmation" style={{ padding: '45px 20px 20px' }}>
                <div className="confirmation-icon success"><span className="material-icons-sharp">check_circle</span></div>
                <h2>Payment submitted</h2>
                <p>{formatCurrency(paidAmount)} will be paid to {payeeName} from {paidFromAccountName}.</p>
                <div className="confirmation-actions">
                    <button className="primary-btn" onClick={() => navigate('/')}>Done</button>
                </div>
            </div>
        );
    }

    if (step === 'amount') {
        return (
            <div className="nl-pay-section" style={{ padding: '45px 20px 20px' }}>
                <div className="nl-pay-header">
                    <button className="back-button" type="button" onClick={() => setStep(amountReturnStep)}>
                        <span className="material-icons-sharp">arrow_back</span>
                    </button>
                    <h2>Pay {payeeName}</h2>
                </div>
                <label className="nl-transfer-amount-label">Amount</label>
                <div className="nl-transfer-amount-box">
                    <span className="nl-transfer-amount-currency">R</span>
                    <input
                        type="text"
                        inputMode="decimal"
                        className="nl-transfer-amount-input"
                        value={amount}
                        onFocus={() => { if (amount === '0.00') setAmount(''); }}
                        onBlur={() => {
                            const v = parseFloat(amount);
                            setAmount(isNaN(v) ? '0.00' : v.toFixed(2));
                        }}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                {insufficientFunds && (
                    <div style={{ color: '#c0272d', fontSize: '0.85rem', marginTop: -8, marginBottom: 12 }}>Insufficient funds</div>
                )}
                <div className="nl-pay-card">
                    <button
                        className="nl-pay-review-row"
                        type="button"
                        style={{ width: '100%', border: 'none', background: 'none', textAlign: 'left', cursor: 'pointer', whiteSpace: 'normal' }}
                        onClick={() => setPickerOpen(true)}
                    >
                        <span className="material-icons-sharp nl-pay-review-icon">trending_up</span>
                        <div className="nl-pay-review-body">
                            <div className="nl-pay-review-label">From</div>
                            <div className="nl-pay-review-name" style={{ overflowWrap: 'break-word' }}>{account.name}</div>
                        </div>
                        <div className="nl-pay-review-side">
                            <div className="nl-pay-review-sub">Available</div>
                            <div className="nl-pay-review-amount">{formatCurrency(account.available)}</div>
                        </div>
                        <span className="material-icons-sharp">chevron_right</span>
                    </button>
                </div>
                <div className="nl-pay-field-card">
                    <div className="nl-pay-field">
                        <label>My reference</label>
                        <input type="text" value={yourRef || payeeName} onChange={(e) => setYourRef(e.target.value)} />
                    </div>
                </div>
                <button className="nl-pay-primary-btn" type="button" disabled={numericAmount <= 0 || insufficientFunds} onClick={handlePay}>
                    Pay
                </button>

                {pickerOpen && (
                    <AccountPickerSheet
                        title="Choose account"
                        accounts={accounts}
                        disabledId={account.id}
                        onClose={() => setPickerOpen(false)}
                        onSelect={(acc) => { setAccount(acc); setPickerOpen(false); }}
                    />
                )}
            </div>
        );
    }

    if (step === 'bank-form') {
        return (
            <div style={{ padding: '45px 20px 20px' }}>
                <div className="nl-pay-header">
                    <button className="back-button" type="button" onClick={() => setStep('chooser')}>
                        <span className="material-icons-sharp">arrow_back</span>
                    </button>
                    <h2>Pay a bank account</h2>
                </div>
                <div className="nl-pay-field-card">
                    <div className="nl-pay-field">
                        <label>Beneficiary name</label>
                        <input type="text" value={beneficiaryName} onChange={(e) => setBeneficiaryName(e.target.value)} />
                    </div>
                </div>
                <div className="nl-pay-field-card">
                    <div className="nl-pay-field">
                        <label>Account number</label>
                        <input type="text" inputMode="numeric" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                    </div>
                    <div className="nl-pay-field">
                        <label>Choose bank</label>
                        <select value={bank} onChange={(e) => setBank(e.target.value)}>
                            <option value="">Select bank</option>
                            <option>Standard Bank</option>
                            <option>First National Bank</option>
                            <option>ABSA</option>
                            <option>Nedbank</option>
                            <option>Capitec</option>
                        </select>
                    </div>
                </div>
                <div className="nl-pay-field-card">
                    <div className="nl-pay-field">
                        <label>Their reference</label>
                        <input type="text" value={theirRef} onChange={(e) => setTheirRef(e.target.value)} />
                    </div>
                    <div className="nl-pay-field">
                        <label>Your reference</label>
                        <input type="text" value={yourRef} onChange={(e) => setYourRef(e.target.value)} />
                    </div>
                </div>
                <button
                    className="nl-pay-primary-btn"
                    type="button"
                    disabled={!formValid}
                    onClick={() => goToAmount(beneficiaryName, 'bank-form')}
                >
                    Continue to payment
                </button>
            </div>
        );
    }

    if (step === 'public-list') {
        const term = (searchTerm || '').toLowerCase();
        const filtered = nlPublicBeneficiaries.filter((n) => n.toLowerCase().indexOf(term) !== -1);
        const visible = (showAll || term) ? filtered : filtered.filter((n) => LIMIT_LETTERS.indexOf(n[0]) !== -1);
        const groups = {};
        visible.forEach((n) => {
            const letter = n[0];
            if (!groups[letter]) groups[letter] = [];
            groups[letter].push(n);
        });
        const letters = Object.keys(groups).sort();
        const hasMore = !showAll && !term && filtered.length > visible.length;

        return (
            <div className="nl-pay-section" style={{ padding: '45px 20px 20px' }}>
                <div className="nl-pay-header">
                    <button className="back-button" type="button" onClick={() => setStep('chooser')}>
                        <span className="material-icons-sharp">arrow_back</span>
                    </button>
                    <h2>Pay a public beneficiary</h2>
                </div>
                <div className="nl-pay-search-row">
                    <span className="material-icons-sharp">search</span>
                    <input
                        type="text"
                        placeholder="Search public beneficiaries"
                        value={searchTerm}
                        autoFocus
                        onChange={(e) => { setSearchTerm(e.target.value); setShowAll(false); }}
                    />
                </div>
                {letters.map((letter) => (
                    <div key={letter}>
                        <div className="nl-pay-letter-heading">{letter}</div>
                        <div className="nl-pay-card">
                            {groups[letter].map((name) => (
                                <button
                                    key={name}
                                    className="nl-pay-beneficiary-row"
                                    type="button"
                                    onClick={() => goToAmount(name, 'public-list')}
                                >
                                    {name}
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
                {hasMore ? (
                    <button className="nl-pay-show-more" type="button" onClick={() => setShowAll(true)}>Show more</button>
                ) : letters.length === 0 ? (
                    <p className="nl-pay-empty-desc" style={{ textAlign: 'center', padding: '30px 10px' }}>No matching beneficiaries.</p>
                ) : null}
            </div>
        );
    }

    // step === 'chooser'
    return (
        <div className="nl-pay-section" style={{ padding: '45px 20px 20px' }}>
            <div className="nl-pay-header">
                <Link to="/transact/payments" className="back-button"><span className="material-icons-sharp">arrow_back</span></Link>
                <h2>Once-off payment</h2>
            </div>
            <div className="nl-pay-card">
                <button className="nl-pay-choice-card" type="button" onClick={() => setStep('bank-form')}>
                    <span className="nl-pay-choice-icon material-icons-sharp">credit_card</span>
                    <div>
                        <div className="nl-pay-choice-title">Bank account</div>
                        <div className="nl-pay-choice-desc">Enter the beneficiary's bank details</div>
                    </div>
                </button>
                <button className="nl-pay-choice-card" type="button" onClick={() => setStep('public-list')}>
                    <span className="nl-pay-choice-icon material-icons-sharp">apartment</span>
                    <div>
                        <div className="nl-pay-choice-title">Public beneficiary</div>
                        <div className="nl-pay-choice-desc">Pay a registered beneficiary (municipality, Eskom, DSTV, etc.)</div>
                    </div>
                </button>
            </div>
        </div>
    );
}
