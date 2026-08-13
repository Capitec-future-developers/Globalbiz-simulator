import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useScopedStylesheets from '../../hooks/useScopedStylesheets';
import { getBalances, adjustBalance, formatCurrency } from '../../hooks/useAccountStore';
import { ACCOUNT_INFO, NL_ACCOUNTS } from '../../data/accounts';

const STYLESHEETS = [
    '/legacy-styles/accounts.css',
    '/legacy-styles/Chatbotcomputer.css',
    '/legacy-styles/inter-transfer.css',
];

function buildAccounts() {
    const balances = getBalances();
    return NL_ACCOUNTS.map((id) => ({
        id,
        name: ACCOUNT_INFO[id].name,
        number: ACCOUNT_INFO[id].number,
        available: balances[id].available
    }));
}

// Faithful React port of Computer/transfer.html's content (everything below
// the shared header/sidebar, which ComputerShell owns). Computer/transfer.html
// itself ships an empty #mainContent that scripts/Combined.js's
// showTransferSection() fills in via innerHTML injection when the sidebar's
// "Transfer" link is clicked; here that same screen (from/to account picker
// -> amount/reference/type/date -> processing -> confirmation) is rendered
// directly as this page's content, reproduced as React step-state. Both
// accounts move through the shared useAccountStore's adjustBalance(), so the
// transfer is reflected in the mobile App too.
export default function ComputerTransfer() {
    useScopedStylesheets(STYLESHEETS);

    const [accounts, setAccounts] = useState(buildAccounts);
    const [screen, setScreen] = useState('form'); // form | processing | confirmation
    const [fromId, setFromId] = useState('');
    const [toId, setToId] = useState('');
    const [amount, setAmount] = useState('');
    const [reference, setReference] = useState('');
    const [transferType, setTransferType] = useState('once-off');
    const [transferDate, setTransferDate] = useState(new Date().toISOString().slice(0, 10));
    const [confirmation, setConfirmation] = useState(null);

    const fromAccount = accounts.find((a) => a.id === fromId);
    const toAccount = accounts.find((a) => a.id === toId);

    useEffect(() => {
        if (screen !== 'processing') return undefined;
        const timer = setTimeout(() => {
            const amt = parseFloat(amount) || 0;
            adjustBalance(fromId, -amt, 'Transfer to ' + toAccount.name);
            adjustBalance(toId, amt, 'Transfer from ' + fromAccount.name);
            setAccounts(buildAccounts());
            setConfirmation({
                fromName: fromAccount.name,
                toName: toAccount.name,
                amount: amt,
                reference,
                date: new Date().toLocaleString()
            });
            setScreen('confirmation');
        }, 2200);
        return () => clearTimeout(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [screen]);

    function resetForm() {
        setAccounts(buildAccounts());
        setFromId('');
        setToId('');
        setAmount('');
        setReference('');
        setTransferType('once-off');
        setTransferDate(new Date().toISOString().slice(0, 10));
        setConfirmation(null);
        setScreen('form');
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (fromId === toId) {
            alert('You cannot transfer to the same account!');
            return;
        }
        const amt = parseFloat(amount) || 0;
        if (fromAccount && amt > fromAccount.available) {
            alert('Insufficient funds in the selected account.');
            return;
        }
        setScreen('processing');
    }

    if (screen === 'processing') {
        return (
            <div className="payment-processing">
                <div className="spinner"><div className="double-bounce1"></div><div className="double-bounce2"></div></div>
                <h2>Processing Transfer...</h2>
                <p>Please wait while we process your transfer</p>
            </div>
        );
    }

    if (screen === 'confirmation' && confirmation) {
        return (
            <div className="payment-confirmation">
                <div className="confirmation-icon success"><span className="material-icons-sharp">check_circle</span></div>
                <h2>Transfer Successful!</h2>
                <p>Your funds have been transferred successfully</p>
                <div className="confirmation-details">
                    <div className="detail-row"><span>From Account:</span><span>{confirmation.fromName}</span></div>
                    <div className="detail-row"><span>To Account:</span><span>{confirmation.toName}</span></div>
                    <div className="detail-row"><span>Amount:</span><span>{formatCurrency(confirmation.amount)}</span></div>
                    <div className="detail-row"><span>Reference:</span><span>{confirmation.reference}</span></div>
                    <div className="detail-row"><span>Date:</span><span>{confirmation.date}</span></div>
                </div>
                <div className="confirmation-actions">
                    <button className="done-btn" type="button" onClick={resetForm}>Done</button>
                    <button className="secondary-btn" type="button" onClick={() => alert('Transfer receipt downloaded successfully!')}>Download Receipt</button>
                </div>
            </div>
        );
    }

    return (
        <div className="transfer-section">
            <div className="payment-header">
                <Link className="back-button" id="back-button" to="/online-banking">
                    <span className="material-icons-sharp">arrow_back</span> Back
                </Link>
                <h2 className="transferheader">Transfer</h2>
                <p>Move money between your accounts</p>
            </div>
            <div className="transfer-details-box">
                <h3>Transfer Details</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="from-account">From Account</label>
                        <select id="from-account" required value={fromId} onChange={(e) => setFromId(e.target.value)}>
                            <option value="">From account</option>
                            {accounts.map((a) => (
                                <option key={a.id} value={a.id}>{a.name} ({a.number}) - {formatCurrency(a.available)}</option>
                            ))}
                        </select>
                        {fromAccount && <div id="balance-info" className="balance-info">Available: {formatCurrency(fromAccount.available)}</div>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="to-account">To Account</label>
                        <select id="to-account" required value={toId} onChange={(e) => setToId(e.target.value)}>
                            <option value="">To account</option>
                            {accounts.map((a) => (
                                <option key={a.id} value={a.id}>{a.name} ({a.number})</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="transfer-amount">Amount (ZAR)</label>
                        <input type="number" id="transfer-amount" placeholder="0.00" min="1" required value={amount} onChange={(e) => setAmount(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="transfer-reference">Reference</label>
                        <input type="text" id="transfer-reference" placeholder="Enter reference" required value={reference} onChange={(e) => setReference(e.target.value)} />
                    </div>
                    <h4>Transfer Type</h4>
                    <div className="transfer-type-options">
                        <div className="transfer-type-box">
                            <input type="radio" id="once-off" name="transfer-type" value="once-off" checked={transferType === 'once-off'} onChange={() => setTransferType('once-off')} required />
                            <label htmlFor="once-off">Once-Off</label>
                        </div>
                        <div className="transfer-type-box">
                            <input type="radio" id="recurring" name="transfer-type" value="recurring" checked={transferType === 'recurring'} onChange={() => setTransferType('recurring')} />
                            <label htmlFor="recurring">Recurring</label>
                        </div>
                        <div className="transfer-type-box">
                            <input type="radio" id="future-dated" name="transfer-type" value="future-dated" checked={transferType === 'future-dated'} onChange={() => setTransferType('future-dated')} />
                            <label htmlFor="future-dated">Future-Dated</label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="transfer-date">Transfer Date</label>
                        <input type="date" id="transfer-date" required value={transferDate} onChange={(e) => setTransferDate(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <button className="submit-payment-btn" type="submit">Transfer Funds</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
