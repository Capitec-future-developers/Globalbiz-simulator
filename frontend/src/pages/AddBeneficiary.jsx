import { useState } from 'react';
import { addBeneficiary } from '../hooks/useBeneficiaryStore';

// Mirrors showAddBeneficiaryFormNewLook(returnTo) in scripts/Transacct.js.
// `returnTo` is invoked both by the back button and after a successful save, exactly like
// the HTML source's `goBack = returnTo` pattern -- this lets it be reused from both the
// Saved Beneficiary payment flow and the Beneficiaries management hub.
export default function AddBeneficiary({ returnTo }) {
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [bank, setBank] = useState('');

    const formValid = name.trim() !== '' && accountNumber.trim() !== '' && bank.trim() !== '';

    function handleSave() {
        if (!formValid) return;
        addBeneficiary({
            name,
            accountNumber,
            bank,
            nickname: nickname || '',
            type: 'own'
        });
        returnTo();
    }

    return (
        <div className="nl-pay-section">
            <div className="nl-pay-header">
                <button className="back-button" type="button" onClick={returnTo}>
                    <span className="material-icons-sharp">arrow_back</span>
                </button>
                <h2>Add beneficiary</h2>
            </div>
            <div className="nl-pay-section-label">Beneficiary information</div>
            <div className="nl-pay-field-card">
                <div className="nl-pay-field">
                    <label>Beneficiary name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="nl-pay-field">
                    <label>Their reference</label>
                    <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
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
                        <option value="">Select a bank</option>
                        <option>Standard Bank</option>
                        <option>First National Bank</option>
                        <option>ABSA</option>
                        <option>Nedbank</option>
                        <option>Capitec</option>
                    </select>
                </div>
            </div>
            <div className="nl-pay-section-label">Optional information</div>
            <div className="nl-pay-card">
                <button
                    type="button"
                    className="nl-pay-choice-card"
                    onClick={() => alert('Payment notification settings would open here')}
                >
                    <span className="nl-pay-choice-icon material-icons-sharp">notifications</span>
                    <div>
                        <div className="nl-pay-choice-title">Payment notification</div>
                        <div className="nl-pay-choice-desc">Set up proof of payments</div>
                    </div>
                    <span className="material-icons-sharp" style={{ color: '#5f6b7a', marginLeft: 'auto', alignSelf: 'center' }}>chevron_right</span>
                </button>
            </div>
            <button className="nl-pay-primary-btn" type="button" disabled={!formValid} onClick={handleSave}>
                Add beneficiary
            </button>
        </div>
    );
}
