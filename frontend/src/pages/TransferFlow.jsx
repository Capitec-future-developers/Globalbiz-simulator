import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBalances, adjustBalance, formatCurrency } from '../hooks/useAccountStore';
import { ACCOUNT_INFO, NL_ACCOUNTS } from '../data/accounts';
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

export default function TransferFlow() {
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState(buildAccounts);
    const [amount, setAmount] = useState('0.00');
    const [fromAccount, setFromAccount] = useState(null);
    const [toAccount, setToAccount] = useState(null);
    const [picker, setPicker] = useState(null); // 'from' | 'to' | null
    const [step, setStep] = useState('form'); // 'form' | 'review' | 'success'

    const numericAmount = parseFloat(amount) || 0;
    const insufficientFunds = !!(fromAccount && numericAmount > fromAccount.available);
    const nextDisabled = !(numericAmount > 0 && fromAccount && toAccount && fromAccount.id !== toAccount.id) || insufficientFunds;

    function handleSelect(acc) {
        if (picker === 'from') setFromAccount(acc);
        if (picker === 'to') setToAccount(acc);
        setPicker(null);
    }

    function handleTransferConfirm() {
        adjustBalance(fromAccount.id, -numericAmount, 'Transfer to ' + toAccount.name);
        adjustBalance(toAccount.id, numericAmount, 'Transfer from ' + fromAccount.name);
        setAccounts(buildAccounts());
        setStep('success');
    }

    if (step === 'success') {
        return (
            <div className="payment-confirmation" style={{ padding: '45px 20px 20px' }}>
                <div className="confirmation-icon success"><span className="material-icons-sharp">check_circle</span></div>
                <h2>Successful</h2>
                <p>Transferred {formatCurrency(numericAmount)} from {fromAccount.name} to {toAccount.name}.</p>
                <div className="confirmation-actions">
                    <button className="secondary-btn" onClick={() => {
                        setStep('form');
                        setAmount('0.00');
                        setFromAccount(null);
                        setToAccount(null);
                    }}>Transfer again</button>
                    <button className="primary-btn" onClick={() => navigate('/')}>Done</button>
                </div>
            </div>
        );
    }

    if (step === 'review') {
        return (
            <div className="nl-pay-section" style={{ padding: '45px 20px 150px' }}>
                <div className="nl-pay-header">
                    <button className="back-button" type="button" onClick={() => setStep('form')}>
                        <span className="material-icons-sharp">arrow_back</span>
                    </button>
                    <h2>Review transfer</h2>
                </div>
                <div className="nl-pay-card">
                    <div className="nl-pay-review-row">
                        <span className="material-icons-sharp nl-pay-review-icon">trending_up</span>
                        <div className="nl-pay-review-body">
                            <div className="nl-pay-review-label">From</div>
                            <div className="nl-pay-review-name">{fromAccount.name}</div>
                        </div>
                        <div className="nl-pay-review-side">
                            <div className="nl-pay-review-sub">Available</div>
                            <div className="nl-pay-review-amount">{formatCurrency(fromAccount.available)}</div>
                        </div>
                    </div>
                    <div className="nl-pay-review-row">
                        <span className="material-icons-sharp nl-pay-review-icon">trending_down</span>
                        <div className="nl-pay-review-body">
                            <div className="nl-pay-review-label">To</div>
                            <div className="nl-pay-review-name">{toAccount.name}</div>
                        </div>
                        <div className="nl-pay-review-side">
                            <div className="nl-pay-review-sub">Available</div>
                            <div className="nl-pay-review-amount">{formatCurrency(toAccount.available)}</div>
                        </div>
                    </div>
                </div>
                <div className="nl-pay-summary-bar">
                    <div className="nl-pay-summary-row"><span>Amount</span><span>{formatCurrency(numericAmount)}</span></div>
                    <div className="nl-pay-summary-row"><span>Fee</span><span>{formatCurrency(0)}</span></div>
                    <button className="nl-pay-primary-btn" type="button" onClick={handleTransferConfirm}>Transfer</button>
                </div>
            </div>
        );
    }

    return (
        <div className="nl-transfer-section" style={{ padding: '45px 20px 20px' }}>
            <div className="nl-transfer-header">
                <button className="back-button" type="button" onClick={() => navigate('/transact')}>
                    <span className="material-icons-sharp">arrow_back</span>
                </button>
                <h2>New Transfer</h2>
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
            <div className="nl-transfer-accounts-card">
                <button className="nl-transfer-account-row" type="button" onClick={() => setPicker('from')}>
                    <div>
                        <div className="nl-transfer-account-label">From</div>
                        <div className="nl-transfer-account-value">{fromAccount ? fromAccount.name : 'Choose account'}</div>
                    </div>
                    <span className="material-icons-sharp">chevron_right</span>
                </button>
                <button className="nl-transfer-account-row" type="button" onClick={() => setPicker('to')}>
                    <div>
                        <div className="nl-transfer-account-label">To</div>
                        <div className="nl-transfer-account-value">{toAccount ? toAccount.name : 'Choose account'}</div>
                    </div>
                    <span className="material-icons-sharp">chevron_right</span>
                </button>
            </div>
            <button className="nl-transfer-next-btn" type="button" disabled={nextDisabled} onClick={() => setStep('review')}>
                Next
            </button>

            {picker && (
                <AccountPickerSheet
                    title={picker === 'from' ? 'Transfer from' : 'Transfer to'}
                    accounts={accounts}
                    disabledId={picker === 'from' ? (toAccount && toAccount.id) : (fromAccount && fromAccount.id)}
                    onClose={() => setPicker(null)}
                    onSelect={handleSelect}
                />
            )}
        </div>
    );
}
