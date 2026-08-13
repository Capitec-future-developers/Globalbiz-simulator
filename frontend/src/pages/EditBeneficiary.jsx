import { useState } from 'react';
import { updateBeneficiary, removeBeneficiary } from '../hooks/useBeneficiaryStore';

// Mirrors showEditBeneficiaryNewLook(beneficiary, index) in scripts/Transacct.js.
// beneficiary/name/account/bank fields are disabled; only "Their reference" is editable.
// Delete is hidden when beneficiary.isDefault is true. "Pay" hands off to PayBeneficiaryFlow.
export default function EditBeneficiary({ beneficiary, onBack, onPay }) {
    const [nickname, setNickname] = useState(beneficiary.nickname || '');
    const canDelete = !beneficiary.isDefault;

    function handleDelete() {
        if (window.confirm('Remove this beneficiary?')) {
            removeBeneficiary(beneficiary.id);
            onBack();
        }
    }

    function handleSave() {
        updateBeneficiary(beneficiary.id, { nickname: nickname.trim() });
        onBack();
    }

    return (
        <div className="nl-pay-section">
            <div className="nl-pay-header">
                <button className="back-button" type="button" onClick={onBack}>
                    <span className="material-icons-sharp">arrow_back</span>
                </button>
                <h2>Update beneficiary</h2>
                <span className="nl-pay-header-spacer"></span>
                {canDelete && (
                    <button
                        className="nl-pay-header-icon-btn nl-pay-danger"
                        type="button"
                        aria-label="Delete beneficiary"
                        onClick={handleDelete}
                    >
                        <span className="material-icons-sharp">delete</span>
                    </button>
                )}
            </div>
            <div className="nl-pay-field-card">
                <div className="nl-pay-field">
                    <label>Beneficiary name</label>
                    <input type="text" value={beneficiary.name} disabled readOnly />
                </div>
                <div className="nl-pay-field">
                    <label>Their reference</label>
                    <input type="text" value={nickname} onChange={(e) => setNickname(e.target.value)} />
                </div>
            </div>
            <div className="nl-pay-field-card">
                <div className="nl-pay-field">
                    <label>Account number</label>
                    <input type="text" value={beneficiary.accountNumber} disabled readOnly />
                </div>
                <div className="nl-pay-field">
                    <label>Choose bank</label>
                    <input type="text" value={beneficiary.bank} disabled readOnly />
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
            <button className="nl-pay-primary-btn" type="button" onClick={handleSave}>Update beneficiary</button>
            <button className="nl-pay-secondary-btn" type="button" onClick={() => onPay(beneficiary)}>Pay</button>
        </div>
    );
}
