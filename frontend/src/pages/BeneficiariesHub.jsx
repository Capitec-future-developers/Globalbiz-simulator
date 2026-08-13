import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBeneficiaries } from '../hooks/useBeneficiaryStore';
import BeneficiaryRow from '../components/BeneficiaryRow';
import PayBeneficiaryFlow from '../components/PayBeneficiaryFlow';
import AddBeneficiary from './AddBeneficiary';
import EditBeneficiary from './EditBeneficiary';
import Stub from './Stub';

// Mirrors showBeneficiariesHubNewLook() in scripts/Transacct.js -- the Beneficiaries
// *management* flow reached from the Transact hub's "Beneficiaries" tile. This is
// deliberately separate from SavedBeneficiaryList (the *payment* flow reached from the
// Payments hub's "Saved beneficiary" row), even though both reuse BeneficiaryRow,
// AddBeneficiary and PayBeneficiaryFlow.
export default function BeneficiariesHub() {
    const navigate = useNavigate();
    const [step, setStep] = useState('hub'); // hub | add | edit | pay | stub-groups | stub-auth
    const [beneficiaries, setBeneficiaries] = useState(getBeneficiaries);
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    function goToHub() {
        setBeneficiaries(getBeneficiaries());
        setStep('hub');
    }

    if (step === 'add') {
        return <AddBeneficiary returnTo={goToHub} />;
    }

    if (step === 'edit' && selected) {
        return (
            <EditBeneficiary
                beneficiary={selected}
                onBack={goToHub}
                onPay={(b) => { setSelected(b); setStep('pay'); }}
            />
        );
    }

    if (step === 'pay' && selected) {
        return (
            <PayBeneficiaryFlow
                beneficiary={selected}
                onBack={() => setStep('edit')}
            />
        );
    }

    if (step === 'stub-groups') return <Stub title="View groups" />;
    if (step === 'stub-auth') return <Stub title="Authorisations" />;

    const term = search.trim().toLowerCase();
    const filtered = term
        ? beneficiaries.filter((b) => (b.nickname || '').toLowerCase().includes(term) || b.name.toLowerCase().includes(term))
        : beneficiaries;

    return (
        <div className="nl-pay-section">
            <div className="nl-pay-header">
                <button className="back-button" type="button" onClick={() => navigate('/')}>
                    <span className="material-icons-sharp">arrow_back</span>
                </button>
                <h2>Beneficiaries</h2>
                <span className="nl-pay-header-spacer"></span>
                <button className="nl-pay-header-add-btn" type="button" onClick={() => setStep('add')}>
                    <span className="material-icons-sharp" style={{ fontSize: 16 }}>add</span> Add
                </button>
                <button className="nl-pay-header-icon-btn" type="button" aria-label="More options" onClick={() => setMenuOpen(true)}>
                    <span className="material-icons-sharp">more_vert</span>
                </button>
            </div>
            <div className="nl-pay-search-row">
                <span className="material-icons-sharp">search</span>
                <input
                    type="text"
                    placeholder="Search beneficiaries"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            {filtered.length ? (
                <div className="nl-pay-card">
                    {filtered.map((b) => (
                        <BeneficiaryRow key={b.id} beneficiary={b} onClick={() => { setSelected(b); setStep('edit'); }} />
                    ))}
                </div>
            ) : (
                <div className="nl-pay-empty-state">
                    <div className="nl-pay-empty-illustration"><span className="material-icons-sharp">group</span></div>
                    <div className="nl-pay-empty-title">{term ? 'No beneficiaries match your search' : 'No saved beneficiaries found'}</div>
                </div>
            )}

            {menuOpen && (
                <>
                    <div className="nl-account-picker-overlay" onClick={() => setMenuOpen(false)}></div>
                    <div className="nl-account-picker-sheet">
                        <div className="nl-sheet-handle"></div>
                        <div className="nl-sheet-header">
                            <h3>Select an option</h3>
                            <button type="button" onClick={() => setMenuOpen(false)}><span className="material-icons-sharp">close</span></button>
                        </div>
                        <div
                            className="nl-account-picker-item nl-ben-option-item"
                            onClick={() => { setMenuOpen(false); setStep('stub-groups'); }}
                        >
                            <span className="material-icons-sharp nl-ben-option-icon">groups</span>
                            <span className="nl-account-picker-name">View groups</span>
                        </div>
                        <div
                            className="nl-account-picker-item nl-ben-option-item"
                            onClick={() => { setMenuOpen(false); setStep('stub-auth'); }}
                        >
                            <span className="material-icons-sharp nl-ben-option-icon">verified_user</span>
                            <span className="nl-account-picker-name">Authorisations</span>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
