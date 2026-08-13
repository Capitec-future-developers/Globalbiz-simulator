import { useMemo, useState } from 'react';
import useScopedStylesheets from '../../hooks/useScopedStylesheets';
import { getBeneficiaries } from '../../hooks/useBeneficiaryStore';

const STYLESHEETS = [
    '/legacy-styles/Computer.css',
    '/legacy-styles/bulk.css',
    '/legacy-styles/Chatbotcomputer.css',
];

// Mirrors Computer/group-payment.html, another empty <div id="mainContent">
// shell whose UI comes entirely from scripts/group-payment.js at runtime.
// That script reads beneficiaries from an IndexedDB-backed BeneficiaryDB;
// this port reads the same beneficiary list the mobile App and other
// Computer/ pages already share via useBeneficiaryStore's getBeneficiaries(),
// so a beneficiary added anywhere shows up here too.
//
// scripts/group-payment.js's "Submit Payment" handler never calls anything
// that debits an account — it only validates the amounts typed in, logs
// them to the console, and alerts "Payment ready to be processed!". There
// is no "from account" selection anywhere in that flow to know which
// balance to adjust, so — matching the source exactly — this port keeps
// that same alert-only ending rather than inventing a deduction target.
function formatDate(iso) {
    if (!iso) return '-';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

function todayIso() {
    return new Date().toISOString().slice(0, 10);
}

export default function ComputerGroupPayment() {
    useScopedStylesheets(STYLESHEETS);

    const [mode, setMode] = useState('group'); // 'group' | 'multiple'
    const [search, setSearch] = useState('');
    const [selectedIds, setSelectedIds] = useState([]);
    const [step, setStep] = useState('select'); // 'select' | 'details'
    const [payFromSameAccount, setPayFromSameAccount] = useState(false);
    const [immediatePayment, setImmediatePayment] = useState(false);
    const [paymentDate, setPaymentDate] = useState(todayIso);
    const [rows, setRows] = useState([]); // { id, nickname, accountNumber, type, amount }

    const allBeneficiaries = useMemo(() => getBeneficiaries(), []);

    const filtered = useMemo(() => {
        const term = search.trim().toLowerCase();
        if (!term) return allBeneficiaries;
        return allBeneficiaries.filter((b) => (
            (b.nickname || b.name || '').toLowerCase().includes(term)
            || (b.accountNumber || '').toLowerCase().includes(term)
        ));
    }, [allBeneficiaries, search]);

    const allChecked = filtered.length > 0 && filtered.every((b) => selectedIds.includes(b.id));
    const someChecked = filtered.some((b) => selectedIds.includes(b.id));

    function toggleSelected(id) {
        setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    }

    function toggleSelectAll() {
        if (allChecked) {
            setSelectedIds((prev) => prev.filter((id) => !filtered.some((b) => b.id === id)));
        } else {
            setSelectedIds((prev) => {
                const ids = new Set(prev);
                filtered.forEach((b) => ids.add(b.id));
                return [...ids];
            });
        }
    }

    function selectMode(next) {
        setMode(next);
        if (next === 'group') setSelectedIds([]);
    }

    function handleContinue() {
        if (mode === 'multiple') {
            if (!selectedIds.length) {
                alert('Select at least one beneficiary to continue.');
                return;
            }
            const selectedBens = allBeneficiaries.filter((b) => selectedIds.includes(b.id));
            setRows(selectedBens.map((b) => ({
                id: b.id,
                nickname: b.nickname || b.name,
                accountNumber: b.accountNumber,
                type: 'eft',
                amount: '',
            })));
            setStep('details');
        } else {
            alert('Group payment logic here.');
        }
    }

    function resetFlow() {
        setStep('select');
        setMode('group');
        setSearch('');
        setSelectedIds([]);
        setRows([]);
        setPayFromSameAccount(false);
        setImmediatePayment(false);
        setPaymentDate(todayIso());
    }

    function updateRow(id, patch) {
        setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    }

    function removeRow(id) {
        setRows((prev) => prev.filter((r) => r.id !== id));
    }

    const total = rows.reduce((sum, r) => sum + (parseFloat(r.amount) || 0), 0);

    function handleSubmit() {
        const valid = rows.every((r) => r.amount && parseFloat(r.amount) > 0);
        if (!valid) {
            alert('Please enter valid amounts for all beneficiaries.');
            return;
        }
        alert('Payment ready to be processed!');
    }

    if (step === 'details') {
        return (
            <div className="content" id="mainContent">
                <div className="content-header"><h1>Multiple Payment</h1></div>

                <div className="payment-options-container">
                    <div className="payment-option-left">
                        <label className="payment-option-checkbox">
                            <input type="checkbox" id="pay-from-same-account" checked={payFromSameAccount} onChange={(e) => setPayFromSameAccount(e.target.checked)} />
                            <span>Pay all from the same account</span>
                        </label>
                    </div>
                    <div className="payment-option-right">
                        <label className="payment-option-checkbox">
                            <input type="checkbox" id="immediate-payment" checked={immediatePayment} onChange={(e) => setImmediatePayment(e.target.checked)} />
                            <span>Pay all as immediate payment</span>
                        </label>
                    </div>
                </div>

                <div className="payment-date-container">
                    <label htmlFor="payment-date">Payment Date:</label>
                    <input type="date" id="payment-date" className="date-input" value={paymentDate} onChange={(e) => setPaymentDate(e.target.value)} />
                </div>

                <div className="payment-details-container">
                    <div className="selected-beneficiaries">
                        <h2>Payment details</h2>
                        <div className="beneficiaries-summary">
                            <button className="add-beneficiary-btn" id="add-beneficiary-btn" type="button" onClick={resetFlow}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                                </svg>
                                Add Beneficiary
                            </button>
                            <div className="total-amount-display">
                                <span>Total:</span>
                                <span id="total-amount">R {total.toFixed(2)}</span>
                            </div>
                        </div>
                        <table className="payment-beneficiaries-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Account</th>
                                    <th>Payment Type</th>
                                    <th>Amount</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody id="payment-beneficiaries-tbody">
                                {rows.map((r) => (
                                    <tr key={r.id} data-id={r.id}>
                                        <td>{r.nickname}</td>
                                        <td>{r.accountNumber}</td>
                                        <td>
                                            <select className="payment-type-select" value={r.type} onChange={(e) => updateRow(r.id, { type: e.target.value })}>
                                                <option value="eft">EFT</option>
                                                <option value="cash">Cash</option>
                                                <option value="cheque">Cheque</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input
                                                type="number"
                                                className="payment-amount-input"
                                                placeholder="0.00"
                                                min="0"
                                                step="0.01"
                                                value={r.amount}
                                                onChange={(e) => updateRow(r.id, { amount: e.target.value })}
                                            />
                                        </td>
                                        <td>
                                            <button className="remove-beneficiary-btn" type="button" onClick={() => removeRow(r.id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="footer-actions">
                    <button className="cancel" id="back-btn" type="button" onClick={resetFlow}>Back</button>
                    <button className="next" id="submit-payment" type="button" onClick={handleSubmit}>Submit Payment</button>
                </div>
            </div>
        );
    }

    return (
        <div className="content" id="mainContent">
            <div className="content-header"><h1>Group and Multiple Payment</h1></div>

            <div className="disclaimer-box" id="disclaimerBox">
                <div className="payment-header"><span>Beneficiary details</span></div>

                <label className={'group-payment-box' + (mode === 'group' ? ' acti' : '')} id="group-payment-box" onClick={() => selectMode('group')}>
                    <div className="circle-radio"></div>
                    <div className="label-text">
                        <span><b>Group of beneficiaries</b></span>
                        <span>Pay a group of beneficiaries</span>
                    </div>
                </label>
                <label className={'mulitple-payment-box' + (mode === 'multiple' ? ' acti' : '')} id="mulitple-payment-box" onClick={() => selectMode('multiple')}>
                    <div className="circle-radio"></div>
                    <div className="label-text">
                        <span><b>Multiple beneficiaries</b></span>
                        <span>Pay multiple beneficiaries</span>
                    </div>
                </label>

                <div className="liner"></div>

                <div className="search-beneficiary" id="search-section">
                    <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path d="M21 20l-5.8-5.8a7 7 0 10-1.4 1.4L20 21l1-1zm-11 0a6 6 0 110-12 6 6 0 010 12z" />
                    </svg>
                    <input type="text" placeholder="Search for a beneficiary" className="search-input" id="search-input" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>

                <table className={'beneficiary-table' + (mode === 'multiple' ? '' : ' hidden')} id="beneficiary-table">
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    id="select-all-checkbox"
                                    checked={allChecked}
                                    onChange={toggleSelectAll}
                                    ref={(el) => { if (el) el.indeterminate = someChecked && !allChecked; }}
                                />
                            </th>
                            <th>Beneficiary Name</th>
                            <th>Account Number</th>
                            <th>Reference</th>
                            <th>Last Payment Date</th>
                            <th>Last Paid Amount</th>
                        </tr>
                    </thead>
                    <tbody id="beneficiary-tbody">
                        {filtered.map((b, index) => (
                            <tr key={b.id}>
                                <td><input type="checkbox" data-index={index} data-id={b.id} checked={selectedIds.includes(b.id)} onChange={() => toggleSelected(b.id)} /></td>
                                <td>{b.nickname || b.name}</td>
                                <td>{b.accountNumber}</td>
                                <td>-</td>
                                <td>{formatDate(b.lastPaidDate)}</td>
                                <td>R {(b.lastPaidAmount || 0).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="footer-actions">
                <button className="cancel" type="button">Cancel</button>
                <button className="next" id="nextBtn" type="button" onClick={handleContinue}>Continue</button>
            </div>
        </div>
    );
}
