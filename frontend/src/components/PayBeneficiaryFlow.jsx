import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBalances, adjustBalance, formatCurrency } from '../hooks/useAccountStore';
import { updateBeneficiary } from '../hooks/useBeneficiaryStore';
import { ACCOUNT_INFO, NL_ACCOUNTS } from '../data/accounts';
import AccountPickerSheet from './AccountPickerSheet';

// Zenzi Dube's registered mobile number, used for the review screen's "Notification details" row
// (mirrors currentUserContext.phone in scripts/Transacct.js).
const USER_PHONE = '+27821234567';
const FEE = 2.00;

function buildAccounts() {
    const balances = getBalances();
    return NL_ACCOUNTS.map((id) => ({
        id,
        name: ACCOUNT_INFO[id].name,
        number: ACCOUNT_INFO[id].number,
        available: balances[id].available
    }));
}

// Mirrors showPayScreen() -> showReviewPaymentScreen() -> success confirmation in scripts/Transacct.js.
// Reused from both the Saved Beneficiary payment flow and the Beneficiaries hub's "Pay" button.
export default function PayBeneficiaryFlow({ beneficiary, onBack, onDone }) {
    const navigate = useNavigate();
    const label = beneficiary.nickname || beneficiary.name;

    const [step, setStep] = useState('amount'); // 'amount' | 'review' | 'success'
    const [accounts] = useState(buildAccounts);
    const [account, setAccount] = useState(accounts[0]);
    const [pickerOpen, setPickerOpen] = useState(false);
    const [amount, setAmount] = useState('0.00');
    const [theirRef, setTheirRef] = useState(label);
    const [yourRef, setYourRef] = useState('Payment');
    const [paymentDate, setPaymentDate] = useState(new Date().toISOString().slice(0, 10));
    const [paidAmount, setPaidAmount] = useState(0);

    const numericAmount = parseFloat(amount) || 0;
    const insufficientFunds = !!(account && numericAmount > account.available);

    function handlePay() {
        adjustBalance(account.id, -numericAmount, 'Payment to ' + label);
        updateBeneficiary(beneficiary.id, { lastPaidAmount: numericAmount, lastPaidDate: new Date().toISOString() });
        setPaidAmount(numericAmount);
        setStep('success');
    }

    if (step === 'success') {
        return (
            <div className="payment-confirmation" style={{ padding: '45px 20px 20px' }}>
                <div className="confirmation-icon success"><span className="material-icons-sharp">check_circle</span></div>
                <h2>Payment submitted</h2>
                <p>{formatCurrency(paidAmount)} will be paid to {label}.</p>
                <div className="confirmation-actions">
                    <button className="primary-btn" type="button" onClick={() => (onDone ? onDone() : navigate('/'))}>Done</button>
                </div>
            </div>
        );
    }

    if (step === 'review') {
        return (
            <div className="nl-pay-section" style={{ paddingBottom: 150 }}>
                <div className="nl-pay-header">
                    <button className="back-button" type="button" onClick={() => setStep('amount')}>
                        <span className="material-icons-sharp">arrow_back</span>
                    </button>
                    <h2>Review payment</h2>
                </div>
                <div className="nl-pay-card">
                    <div className="nl-pay-review-row">
                        <span className="material-icons-sharp nl-pay-review-icon">trending_up</span>
                        <div className="nl-pay-review-body">
                            <div className="nl-pay-review-label">From</div>
                            <div className="nl-pay-review-name">{account ? account.name : 'No account'}</div>
                            {insufficientFunds && <div className="nl-pay-review-warning">Insufficient funds</div>}
                        </div>
                        <div className="nl-pay-review-side">
                            <div className="nl-pay-review-sub">Available</div>
                            <div className="nl-pay-review-amount">{account ? formatCurrency(account.available) : ''}</div>
                        </div>
                    </div>
                    <div className="nl-pay-review-row">
                        <span className="material-icons-sharp nl-pay-review-icon">person</span>
                        <div className="nl-pay-review-body">
                            <div className="nl-pay-review-label">To</div>
                            <div className="nl-pay-review-name">{beneficiary.bank}</div>
                        </div>
                        <div className="nl-pay-review-side">
                            <div className="nl-pay-review-sub">{label}</div>
                            <div className="nl-pay-review-sub">••••{beneficiary.accountNumber.slice(-4)}</div>
                        </div>
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
                <div className="nl-pay-card">
                    <div className="nl-pay-fee-row">
                        <div className="nl-pay-review-name">Capitec beneficiary</div>
                        <div className="nl-pay-fee-side">
                            <div className="nl-pay-review-sub">Fee</div>
                            <div className="nl-pay-review-amount">{formatCurrency(FEE)}</div>
                        </div>
                        <span className="nl-pay-fee-radio"></span>
                    </div>
                </div>
                <div className="nl-pay-card" style={{ padding: 18 }}>
                    <div className="nl-pay-review-label" style={{ marginBottom: 8 }}>Payment date</div>
                    <input
                        type="date"
                        className="nl-pay-date-input"
                        value={paymentDate}
                        onChange={(e) => setPaymentDate(e.target.value)}
                    />
                    <button
                        type="button"
                        className="nl-pay-inline-link"
                        style={{ display: 'block', marginTop: 12 }}
                        onClick={() => alert('Recurring payments would be set up here')}
                    >
                        Set up recurring
                    </button>
                </div>
                <div className="nl-pay-card" style={{ padding: 18 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                        <div className="nl-pay-review-label">Notification details</div>
                        <button
                            type="button"
                            className="nl-pay-inline-link"
                            onClick={() => alert('Notification details would be editable here')}
                        >
                            Edit
                        </button>
                    </div>
                    <div className="nl-pay-review-sub">SMS</div>
                    <div className="nl-pay-review-name">{USER_PHONE}</div>
                </div>
                <div className="nl-pay-summary-bar">
                    <div className="nl-pay-summary-row"><span>Recipient gets</span><span>{formatCurrency(numericAmount)}</span></div>
                    <div className="nl-pay-summary-row"><span>Fee</span><span>{formatCurrency(FEE)}</span></div>
                    <div className="nl-pay-summary-cutoff-row">
                        <button
                            type="button"
                            className="nl-pay-inline-link"
                            onClick={() => alert('Cut-off times would be shown here')}
                        >
                            See cut-off times
                        </button>
                    </div>
                    <button className="nl-pay-primary-btn" type="button" disabled={insufficientFunds} onClick={handlePay}>
                        Pay
                    </button>
                </div>
            </div>
        );
    }

    // step === 'amount' -- mirrors showPayScreen()
    return (
        <div className="nl-pay-section" style={{ paddingBottom: 40 }}>
            <div className="nl-pay-header">
                <button className="back-button" type="button" onClick={onBack}>
                    <span className="material-icons-sharp">arrow_back</span>
                </button>
                <h2>Pay</h2>
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
                <div className="nl-pay-review-row">
                    <span className="material-icons-sharp nl-pay-review-icon">person</span>
                    <div className="nl-pay-review-body">
                        <div className="nl-pay-review-label">To</div>
                        <div className="nl-pay-review-name">{label}</div>
                    </div>
                    <div className="nl-pay-review-side">
                        <div className="nl-pay-review-sub">{beneficiary.bank}</div>
                        <div className="nl-pay-review-sub">••••{beneficiary.accountNumber.slice(-4)}</div>
                    </div>
                </div>
            </div>
            {insufficientFunds && (
                <div style={{ display: 'block', color: '#c0272d', fontSize: '0.85rem', marginBottom: 12 }}>Insufficient funds</div>
            )}
            <button
                className="nl-pay-primary-btn"
                type="button"
                disabled={!(numericAmount > 0 && !insufficientFunds)}
                onClick={() => setStep('review')}
            >
                Review Payment
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
