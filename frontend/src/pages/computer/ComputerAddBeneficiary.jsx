import { useState } from 'react';
import { Link } from 'react-router-dom';
import useScopedStylesheets from '../../hooks/useScopedStylesheets';
import { getBeneficiaries, addBeneficiary } from '../../hooks/useBeneficiaryStore';
import { formatCurrency } from '../../hooks/useAccountStore';

const STYLESHEETS = [
    '/legacy-styles/Computer.css',
    '/legacy-styles/Chatbotcomputer.css',
    '/legacy-styles/beneficary.css',
];

const BANKS = ['Standard Bank', 'First National Bank', 'Absa Bank', 'Nedbank', 'Capitec Bank'];

function formatLastPaid(b) {
    if (b.lastPaidAmount == null || !b.lastPaidDate) return '—';
    const d = new Date(b.lastPaidDate);
    return d.toLocaleDateString('en-ZA', { day: 'numeric', month: 'long', year: 'numeric' });
}

// Faithful React port of Computer/Add-benficiaries.html's content
// (everything below the shared header/sidebar, which ComputerShell owns).
// scripts/Add-beneficary.js drove the "Your beneficiaries"/"Public
// Beneficiary"/"Beneficiary groups" tabs and the "Add Beneficiary" modal via
// innerHTML injection; reproduced here as React state. The tables and the
// favourite beneficiary read straight from the shared useBeneficiaryStore
// (instead of the source HTML's hard-coded rows) and adding a beneficiary
// persists to that same store, so it's reflected in the mobile App too.
export default function ComputerAddBeneficiary() {
    useScopedStylesheets(STYLESHEETS);

    const [beneficiaries, setBeneficiaries] = useState(getBeneficiaries);
    const [activeTab, setActiveTab] = useState('yourBeneficiaries');
    const [modalOpen, setModalOpen] = useState(false);
    const [modalStep, setModalStep] = useState(1);

    const [benType, setBenType] = useState('new');
    const [name, setName] = useState('');
    const [bank, setBank] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [theirRef, setTheirRef] = useState('');
    const [notificationType, setNotificationType] = useState('');
    const [confirmChecked, setConfirmChecked] = useState(false);

    const favourite = beneficiaries.find((b) => b.isDefault) || beneficiaries[0];
    const ownBeneficiaries = beneficiaries.filter((b) => b.type === 'own');
    const publicBeneficiaries = beneficiaries.filter((b) => b.type === 'public');

    function openModal() {
        setBenType('new');
        setName('');
        setBank('');
        setAccountNumber('');
        setTheirRef('');
        setNotificationType('');
        setConfirmChecked(false);
        setModalStep(1);
        setModalOpen(true);
    }

    function closeModal() {
        setModalOpen(false);
    }

    function handleContinue() {
        if (!name || !bank || !accountNumber || !theirRef) {
            alert('Please fill in all required fields');
            return;
        }
        setModalStep(2);
    }

    function handleConfirm() {
        if (!confirmChecked) {
            alert('Please confirm that the details are correct');
            return;
        }
        addBeneficiary({
            name,
            bank,
            accountNumber,
            nickname: theirRef,
            type: benType === 'public' ? 'public' : 'own'
        });
        setBeneficiaries(getBeneficiaries());
        alert('Beneficiary added successfully!');
        setModalOpen(false);
    }

    return (
        <main className="main-content" id="mainContent">
            <div className="header-content">
                <h1>Beneficiaries</h1>
                <div className="those">
                    <div className="yohs auths">Authorisations</div>
                    <div className="yohs imports" onClick={() => alert('Import list coming soon')}><span>Import</span> List</div>
                    <div className="yohs bens" id="addBeneficiaryBtn" onClick={openModal}><span>Add</span> Beneficiary</div>
                </div>
            </div>
            <div className="content-body">
                <div className="fav">
                    <div className="fav-header">Favorites</div>
                    <div className="edit">Edit</div>
                    <div className="fav-boxes">
                        {favourite && (
                            <div className="fav-box">
                                <div className="Name">{favourite.nickname || favourite.name}</div>
                                <p style={{ position: 'absolute', right: 75, bottom: 60 }}>
                                    {favourite.lastPaidDate ? `Last paid: ${formatLastPaid(favourite)}` : `${favourite.bank} ••••${String(favourite.accountNumber).slice(-4)}`}
                                </p>
                                <Link to="/online-banking/transact" className="pay">Pay</Link>
                            </div>
                        )}
                    </div>
                </div>
                <div className="next-box">
                    <div className="tabz">
                        <div className="tabz-header">
                            <div className={'tabz1' + (activeTab === 'yourBeneficiaries' ? ' actives' : '')} id="yourBeneficiaries" onClick={() => setActiveTab('yourBeneficiaries')}>Your beneficiaries</div>
                            <div className={'tabz2' + (activeTab === 'publicBeneficiary' ? ' actives' : '')} id="publicBeneficiary" onClick={() => setActiveTab('publicBeneficiary')}>Public Beneficiary</div>
                            <div className={'tabz3' + (activeTab === 'beneficiaryGroups' ? ' actives' : '')} id="beneficiaryGroups" onClick={() => setActiveTab('beneficiaryGroups')}>Beneficiary groups</div>
                        </div>
                    </div>
                    <div id="tabzContent">
                        {activeTab === 'yourBeneficiaries' && (
                            <>
                                <div className="tabz-search">
                                    <input type="search" placeholder="Search beneficiaries" />
                                    <select className="select">
                                        <option>Filter by</option>
                                        <option>Last 6 Months</option>
                                        <option>Last 12 Months</option>
                                        <option>Never Paid</option>
                                        <option>Show All</option>
                                    </select>
                                </div>
                                <div className="table-wrapper">
                                    <table className="beneficiary-table">
                                        <thead>
                                            <tr className="beneficiary-header-row">
                                                <th>Beneficiary Name</th>
                                                <th>Account Number</th>
                                                <th>Their reference</th>
                                                <th>Last payment date</th>
                                                <th>Amount</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ownBeneficiaries.map((b) => (
                                                <tr key={b.id}>
                                                    <td>{b.name}</td>
                                                    <td>{b.accountNumber}</td>
                                                    <td>{b.nickname || '—'}</td>
                                                    <td>{formatLastPaid(b)}</td>
                                                    <td>{b.lastPaidAmount != null ? formatCurrency(b.lastPaidAmount) : '—'}</td>
                                                    <td>
                                                        <Link to="/online-banking/transact">Edit</Link> | <Link to="/online-banking/transact">Pay</Link>
                                                        <img src="/images/chevron-down-white.svg" alt="dropdown" style={{ position: 'absolute', right: 40, filter: 'invert(31%) sepia(95%) saturate(3053%) hue-rotate(203deg) brightness(97%) contrast(101%)' }} />
                                                    </td>
                                                </tr>
                                            ))}
                                            {ownBeneficiaries.length === 0 && (
                                                <tr><td colSpan={6}>No beneficiaries yet. Add one above.</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}
                        {activeTab === 'publicBeneficiary' && (
                            <>
                                <div className="tabz-search">
                                    <input type="search" placeholder="Search beneficiaries" />
                                    <select className="select">
                                        <option>Filter by</option>
                                        <option>Last 6 Months</option>
                                        <option>Last 12 Months</option>
                                        <option>Never Paid</option>
                                        <option>Show All</option>
                                    </select>
                                </div>
                                <div className="table-wrapper">
                                    <table className="beneficiary-table">
                                        <thead>
                                            <tr className="beneficiary-header-row">
                                                <th>Beneficiary Name</th>
                                                <th>Their reference</th>
                                                <th>Last payment date</th>
                                                <th>Amount</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {publicBeneficiaries.map((b) => (
                                                <tr key={b.id}>
                                                    <td>{b.name}</td>
                                                    <td>{b.nickname || '—'}</td>
                                                    <td>{formatLastPaid(b)}</td>
                                                    <td>{b.lastPaidAmount != null ? formatCurrency(b.lastPaidAmount) : '—'}</td>
                                                    <td style={{ color: '#178be1' }}>
                                                        <Link to="/online-banking/transact">Edit</Link> | <Link to="/online-banking/transact">Pay</Link>
                                                        <img src="/images/chevron-down-white.svg" alt="dropdown" style={{ position: 'absolute', right: 40, filter: 'invert(31%) sepia(95%) saturate(3053%) hue-rotate(203deg) brightness(97%) contrast(101%)' }} />
                                                    </td>
                                                </tr>
                                            ))}
                                            {publicBeneficiaries.length === 0 && (
                                                <tr><td colSpan={5}>No public beneficiaries yet.</td></tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </>
                        )}
                        {activeTab === 'beneficiaryGroups' && (
                            <div className="tabz-search" style={{ padding: 20, color: '#666' }}>No beneficiary groups yet.</div>
                        )}
                    </div>
                    <div className="tabz-search"></div>
                </div>
            </div>

            {modalOpen && (
                <div className="beneficiary-modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
                    <div className="beneficiary-modal">
                        {modalStep === 1 ? (
                            <>
                                <div className="modal-header">
                                    <h4>Add Beneficiary</h4>
                                    <div className="steps-indicator">
                                        <span className="step active">1</span>
                                        <span className="step">2</span>
                                    </div>
                                    <span className="close-modal" onClick={closeModal}>&times;</span>
                                </div>
                                <div className="modal-body">
                                    <div className="form-section">
                                        <h5 className="section-title">Choose Beneficiary Type</h5>
                                        <div className="radio-group">
                                            <label className="radio-option">
                                                <input type="radio" name="beneficiaryType" value="new" checked={benType === 'new'} onChange={() => setBenType('new')} />
                                                <span>New Beneficiary</span>
                                            </label>
                                            <label className="radio-option">
                                                <input type="radio" name="beneficiaryType" value="public" checked={benType === 'public'} onChange={() => setBenType('public')} />
                                                <span>Public Beneficiary</span>
                                            </label>
                                        </div>
                                    </div>
                                    <div className="form-section">
                                        <label className="form-label">Beneficiary Name</label>
                                        <input type="text" className="form-input" placeholder="Enter beneficiary name" value={name} onChange={(e) => setName(e.target.value)} />
                                    </div>
                                    <div className="bank-details">
                                        <h5 className="section-title">Bank Details</h5>
                                        <div className="form-row">
                                            <div className="form-group">
                                                <label className="form-label">Bank Name</label>
                                                <select className="form-input" value={bank} onChange={(e) => setBank(e.target.value)}>
                                                    <option value="">Select Bank</option>
                                                    {BANKS.map((b) => <option key={b}>{b}</option>)}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label className="form-label">Account Number</label>
                                                <input type="text" className="form-input" placeholder="Enter account number" value={accountNumber} onChange={(e) => setAccountNumber(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="form-label">Their Reference</label>
                                            <input type="text" className="form-input" placeholder="Enter their reference" value={theirRef} onChange={(e) => setTheirRef(e.target.value)} />
                                        </div>
                                    </div>
                                    <div className="form-section">
                                        <h5 className="section-title">Payment Notification</h5>
                                        <div className="form-group">
                                            <label className="form-label">Notification Type</label>
                                            <select className="form-input" value={notificationType} onChange={(e) => setNotificationType(e.target.value)}>
                                                <option value="">Select notification type</option>
                                                <option>SMS</option>
                                                <option>Email</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn-cancel" type="button" onClick={closeModal}>Cancel</button>
                                    <button className="btn-continue" type="button" onClick={handleContinue}>Continue</button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="modal-header">
                                    <h4>Confirm Beneficiary</h4>
                                    <div className="steps-indicator">
                                        <span className="step">1</span>
                                        <span className="step active">2</span>
                                    </div>
                                    <span className="close-modal" onClick={closeModal}>&times;</span>
                                </div>
                                <div className="modal-body">
                                    <div className="confirmation-details">
                                        <div className="detail-row"><span className="detail-label">Beneficiary Name:</span><span className="detail-value">{name}</span></div>
                                        <div className="detail-row"><span className="detail-label">Bank Name:</span><span className="detail-value">{bank}</span></div>
                                        <div className="detail-row"><span className="detail-label">Account Number:</span><span className="detail-value">{accountNumber}</span></div>
                                        <div className="detail-row"><span className="detail-label">Their Reference:</span><span className="detail-value">{theirRef}</span></div>
                                    </div>
                                    <div className="terms-checkbox">
                                        <input type="checkbox" id="confirmTerms" checked={confirmChecked} onChange={(e) => setConfirmChecked(e.target.checked)} />
                                        <label htmlFor="confirmTerms">I confirm that the details above are correct</label>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn-back" type="button" onClick={() => setModalStep(1)}>Back</button>
                                    <button className="btn-confirm" type="button" onClick={handleConfirm}>Confirm</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </main>
    );
}
