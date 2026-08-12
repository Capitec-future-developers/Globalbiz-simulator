import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getBalances, adjustBalance, formatCurrency } from '../hooks/useAccountStore';
import { getBeneficiaries, addBeneficiary, removeBeneficiary } from '../hooks/useBeneficiaryStore';
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

export default function SavedBeneficiaries() {
    const navigate = useNavigate();
    const [step, setStep] = useState('list'); // list | add | amount | success
    const [beneficiaries, setBeneficiaries] = useState(getBeneficiaries);
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState(null);

    const [newName, setNewName] = useState('');
    const [newAccountNumber, setNewAccountNumber] = useState('');
    const [newBank, setNewBank] = useState('');

    const [accounts] = useState(buildAccounts);
    const [account, setAccount] = useState(accounts[0]);
    const [pickerOpen, setPickerOpen] = useState(false);
    const [amount, setAmount] = useState('0.00');
    const [paidAmount, setPaidAmount] = useState(0);

    const numericAmount = parseFloat(amount) || 0;
    const insufficientFunds = numericAmount > account.available;

    const filtered = beneficiaries.filter((b) => {
        const term = search.trim().toLowerCase();
        if (!term) return true;
        return b.name.toLowerCase().includes(term) || (b.nickname || '').toLowerCase().includes(term);
    });

    function handleAdd() {
        if (!newName || !newAccountNumber || !newBank) return;
        const created = addBeneficiary({ name: newName, nickname: newName, bank: newBank, accountNumber: newAccountNumber });
        setBeneficiaries(getBeneficiaries());
        setStep('list');
        setNewName('');
        setNewAccountNumber('');
        setNewBank('');
        void created;
    }

    function handleDelete(id) {
        setBeneficiaries(removeBeneficiary(id));
    }

    function handlePay() {
        adjustBalance(account.id, -numericAmount, 'Payment to ' + (selected.nickname || selected.name));
        setPaidAmount(numericAmount);
        setStep('success');
    }

    if (step === 'success') {
        return (
            <div className="payment-confirmation" style={{ padding: '45px 20px 20px' }}>
                <div className="confirmation-icon success"><span className="material-icons-sharp">check_circle</span></div>
                <h2>Payment submitted</h2>
                <p>{formatCurrency(paidAmount)} will be paid to {selected.nickname || selected.name} from {account.name}.</p>
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
                    <button className="back-button" type="button" onClick={() => setStep('list')}>
                        <span className="material-icons-sharp">arrow_back</span>
                    </button>
                    <h2>Pay {selected.nickname || selected.name}</h2>
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
                    <div style={{ color: '#c0272d', fontSize: '0.85rem', marginBottom: 12 }}>Insufficient funds</div>
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
                    <div className="nl-pay-review-row">
                        <span className="material-icons-sharp nl-pay-review-icon">person</span>
                        <div className="nl-pay-review-body">
                            <div className="nl-pay-review-label">To</div>
                            <div className="nl-pay-review-name">{selected.bank}</div>
                        </div>
                        <div className="nl-pay-review-side">
                            <div className="nl-pay-review-sub">{selected.nickname || selected.name}</div>
                            <div className="nl-pay-review-sub">••••{selected.accountNumber.slice(-4)}</div>
                        </div>
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

    if (step === 'add') {
        const formValid = newName && newAccountNumber && newBank;
        return (
            <div style={{ padding: '45px 20px 20px' }}>
                <div className="nl-pay-header">
                    <button className="back-button" type="button" onClick={() => setStep('list')}>
                        <span className="material-icons-sharp">arrow_back</span>
                    </button>
                    <h2>Add beneficiary</h2>
                </div>
                <div className="nl-pay-field-card" style={{ marginTop: 16 }}>
                    <div className="nl-pay-field">
                        <label>Beneficiary name</label>
                        <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} />
                    </div>
                </div>
                <div className="nl-pay-field-card" style={{ marginTop: 16 }}>
                    <div className="nl-pay-field">
                        <label>Account number</label>
                        <input type="text" value={newAccountNumber} onChange={(e) => setNewAccountNumber(e.target.value)} />
                    </div>
                    <div className="nl-pay-field">
                        <label>Choose bank</label>
                        <select value={newBank} onChange={(e) => setNewBank(e.target.value)}>
                            <option value="" disabled>Select bank</option>
                            <option>Standard Bank</option>
                            <option>First National Bank</option>
                            <option>ABSA</option>
                            <option>Nedbank</option>
                            <option>Capitec Bank</option>
                        </select>
                    </div>
                </div>
                <button className="nl-pay-primary-btn" type="button" disabled={!formValid} onClick={handleAdd} style={{ marginTop: 20 }}>
                    Add beneficiary
                </button>
            </div>
        );
    }

    return (
        <div className="nl-pay-section" style={{ padding: '45px 20px 20px' }}>
            <div className="nl-pay-header">
                <Link to="/transact/payments" className="back-button"><span className="material-icons-sharp">arrow_back</span></Link>
                <h2>Saved beneficiaries</h2>
                <button type="button" className="nl-pay-header-add-btn" onClick={() => setStep('add')} style={{ marginLeft: 'auto', border: 'none', background: 'none', color: '#0096c7', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span className="material-icons-sharp" style={{ fontSize: 16 }}>add</span> Add
                </button>
            </div>
            <div className="nl-pay-search-row" style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'white', border: '1px solid #cfd6e4', borderRadius: 24, padding: '10px 16px', margin: '16px 0' }}>
                <span className="material-icons-sharp">search</span>
                <input
                    type="text"
                    placeholder="Search saved beneficiaries"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ border: 'none', outline: 'none', flex: 1, background: 'transparent', fontSize: '0.9rem' }}
                />
            </div>
            {filtered.length ? (
                <div className="nl-pay-card">
                    {filtered.map((b) => (
                        <div className="nl-pay-row" key={b.id} style={{ display: 'flex', alignItems: 'center' }}>
                            <button
                                type="button"
                                onClick={() => { setSelected(b); setStep('amount'); }}
                                style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12, border: 'none', background: 'none', textAlign: 'left', cursor: 'pointer', padding: '14px 0' }}
                            >
                                <span className="material-icons-sharp">person</span>
                                <div className="nl-pay-row-body">
                                    <div className="nl-pay-row-title">{b.nickname || b.name}</div>
                                    <div className="nl-pay-row-sub">{b.bank} •••• {b.accountNumber.slice(-4)}</div>
                                </div>
                            </button>
                            <button
                                type="button"
                                onClick={() => handleDelete(b.id)}
                                aria-label="Remove beneficiary"
                                style={{ border: 'none', background: 'none', color: '#c0272d', cursor: 'pointer', padding: 8 }}
                            >
                                <span className="material-icons-sharp">delete_outline</span>
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p style={{ textAlign: 'center', padding: '30px 0', color: '#5f6b7a' }}>No saved beneficiaries found.</p>
            )}
        </div>
    );
}
