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

const LIST_TITLES = { all: 'All Transfers', recurring: 'Recurring Transfers', future: 'Future-dated Transfers' };

export default function TransferFlow() {
    const navigate = useNavigate();
    const [accounts, setAccounts] = useState(buildAccounts);
    const [amount, setAmount] = useState('0.00');
    const [fromAccount, setFromAccount] = useState(null);
    const [toAccount, setToAccount] = useState(null);
    const [picker, setPicker] = useState(null); // 'from' | 'to' | null
    const [step, setStep] = useState('hub'); // 'hub' | 'list' | 'form' | 'review' | 'success'
    const [listFilter, setListFilter] = useState('all');
    const [recentTab, setRecentTab] = useState('past'); // 'past' | 'upcoming'

    const numericAmount = parseFloat(amount) || 0;
    const insufficientFunds = !!(fromAccount && numericAmount > fromAccount.available);
    const nextDisabled = !(numericAmount > 0 && fromAccount && toAccount && fromAccount.id !== toAccount.id) || insufficientFunds;

    function goToHub() {
        setRecentTab('past');
        setStep('hub');
    }

    function goToForm() {
        setAccounts(buildAccounts());
        setAmount('0.00');
        setFromAccount(null);
        setToAccount(null);
        setPicker(null);
        setStep('form');
    }

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
                    <button className="secondary-btn" onClick={goToForm}>Transfer again</button>
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

    if (step === 'form') {
        return (
            <div className="nl-transfer-section" style={{ padding: '45px 20px 20px' }}>
                <div className="nl-transfer-header">
                    <button className="back-button" type="button" onClick={goToHub}>
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

    if (step === 'list') {
        return (
            <div className="nl-transfer-section" style={{ padding: '45px 20px 20px' }}>
                <div className="nl-transfer-header">
                    <button className="back-button" type="button" onClick={goToHub}>
                        <span className="material-icons-sharp">arrow_back</span>
                    </button>
                    <h2>{LIST_TITLES[listFilter]}</h2>
                </div>
                <div className="nl-transfer-search-row">
                    <span className="material-icons-sharp">search</span>
                    <input type="text" placeholder="Search all transfers" />
                    <span className="material-icons-sharp">tune</span>
                </div>
                <div className="nl-transfer-filter-chips">
                    <button
                        className={'nl-transfer-chip' + (listFilter === 'all' ? ' active' : '')}
                        type="button"
                        onClick={() => setListFilter('all')}
                    >All</button>
                    <button
                        className={'nl-transfer-chip' + (listFilter === 'recurring' ? ' active' : '')}
                        type="button"
                        onClick={() => setListFilter('recurring')}
                    >Recurring</button>
                    <button
                        className={'nl-transfer-chip' + (listFilter === 'future' ? ' active' : '')}
                        type="button"
                        onClick={() => setListFilter('future')}
                    >Future-dated</button>
                </div>
                <div className="nl-transfer-empty-state">
                    <div className="nl-transfer-empty-illustration"><span className="material-icons-sharp">sync_alt</span></div>
                    <div className="nl-transfer-empty-title">No transfers to show</div>
                    <div className="nl-transfer-empty-desc">All your transfers will show here.</div>
                </div>
            </div>
        );
    }

    // step === 'hub'
    return (
        <div className="nl-transfer-section" style={{ padding: '45px 20px 20px' }}>
            <div className="nl-transfer-header">
                <button className="back-button" type="button" onClick={() => navigate('/transact')}>
                    <span className="material-icons-sharp">arrow_back</span>
                </button>
                <h2>Transfers</h2>
            </div>
            <div className="nl-transfer-accounts-card">
                <button className="nl-transfer-hub-row" type="button" onClick={goToForm}>
                    <span className="material-icons-sharp">sync_alt</span>
                    <div className="nl-transfer-hub-row-title">New transfer
                        <div className="nl-transfer-hub-row-sub" style={{ fontWeight: 400 }}>Move money between your accounts</div>
                    </div>
                    <span className="material-icons-sharp">chevron_right</span>
                </button>
            </div>
            <p className="nl-transfer-hub-section-label">Manage</p>
            <div className="nl-transfer-accounts-card">
                <button className="nl-transfer-hub-row" type="button" onClick={() => { setListFilter('all'); setStep('list'); }}>
                    <span className="material-icons-sharp">sync_alt</span>
                    <div className="nl-transfer-hub-row-title">All transfers
                        <div className="nl-transfer-hub-row-sub" style={{ fontWeight: 400 }}>View all your past transfers</div>
                    </div>
                    <span className="material-icons-sharp">chevron_right</span>
                </button>
                <button className="nl-transfer-hub-row" type="button" onClick={() => { setListFilter('recurring'); setStep('list'); }}>
                    <span className="material-icons-sharp">event_repeat</span>
                    <div className="nl-transfer-hub-row-title">Recurring transfers
                        <div className="nl-transfer-hub-row-sub" style={{ fontWeight: 400 }}>Manage transfers that repeat automatically</div>
                    </div>
                    <span className="material-icons-sharp">chevron_right</span>
                </button>
                <button className="nl-transfer-hub-row" type="button" onClick={() => { setListFilter('future'); setStep('list'); }}>
                    <span className="material-icons-sharp">update</span>
                    <div className="nl-transfer-hub-row-title">Future-dated transfers
                        <div className="nl-transfer-hub-row-sub" style={{ fontWeight: 400 }}>Review transfers scheduled for a later date</div>
                    </div>
                    <span className="material-icons-sharp">chevron_right</span>
                </button>
            </div>
            <p className="nl-transfer-hub-section-label">Recent transfers</p>
            <div className="nl-transfer-recent-tabs">
                <button
                    className={'nl-transfer-recent-tab' + (recentTab === 'past' ? ' active' : '')}
                    type="button"
                    onClick={() => setRecentTab('past')}
                >Past</button>
                <button
                    className={'nl-transfer-recent-tab' + (recentTab === 'upcoming' ? ' active' : '')}
                    type="button"
                    onClick={() => setRecentTab('upcoming')}
                >Upcoming</button>
            </div>
            <div className="nl-transfer-empty-state">
                <div className="nl-transfer-empty-illustration"><span className="material-icons-sharp">sync_alt</span></div>
                <div className="nl-transfer-empty-title">No transfers to show</div>
                <div className="nl-transfer-empty-desc">All your transfers will show here.</div>
            </div>
        </div>
    );
}
