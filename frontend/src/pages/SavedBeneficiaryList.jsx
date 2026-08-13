import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBeneficiaries } from '../hooks/useBeneficiaryStore';
import BeneficiaryRow from '../components/BeneficiaryRow';
import PayBeneficiaryFlow from '../components/PayBeneficiaryFlow';
import AddBeneficiary from './AddBeneficiary';

// Mirrors showSavedBeneficiaryListNewLook() in scripts/Transacct.js -- the "pay a saved
// beneficiary" flow reached from the Payments hub's "Saved beneficiary" row. This is
// deliberately separate from BeneficiariesHub (the beneficiary *management* flow reached
// from the Transact hub's "Beneficiaries" tile), even though both reuse BeneficiaryRow,
// AddBeneficiary and PayBeneficiaryFlow.
export default function SavedBeneficiaryList() {
    const navigate = useNavigate();
    const [step, setStep] = useState('list'); // list | add | pay
    const [beneficiaries, setBeneficiaries] = useState(getBeneficiaries);
    const [search, setSearch] = useState('');
    const [activeFilter, setActiveFilter] = useState('all'); // all | own | public
    const [selected, setSelected] = useState(null);

    function goToList() {
        setBeneficiaries(getBeneficiaries());
        setStep('list');
    }

    if (step === 'add') {
        return <AddBeneficiary returnTo={goToList} />;
    }

    if (step === 'pay' && selected) {
        return (
            <PayBeneficiaryFlow
                beneficiary={selected}
                onBack={() => setStep('list')}
            />
        );
    }

    const term = search.trim().toLowerCase();
    const searchActive = term.length >= 3;
    const filtered = beneficiaries.filter((b) => {
        const matchesType = activeFilter === 'all' || (b.type || 'own') === activeFilter;
        const matchesSearch = !searchActive || (b.nickname || '').toLowerCase().includes(term) || b.name.toLowerCase().includes(term);
        return matchesType && matchesSearch;
    });

    return (
        <div className="nl-pay-section">
            <div className="nl-pay-header">
                <button className="back-button" type="button" onClick={() => navigate('/transact/payments')}>
                    <span className="material-icons-sharp">arrow_back</span>
                </button>
                <h2>Saved beneficiaries</h2>
                <span className="nl-pay-header-spacer"></span>
                <button className="nl-pay-header-add-btn" type="button" onClick={() => setStep('add')}>
                    <span className="material-icons-sharp" style={{ fontSize: 16 }}>add</span> Add
                </button>
            </div>
            <div className="nl-pay-search-row">
                <span className="material-icons-sharp">search</span>
                <input
                    type="text"
                    placeholder="Search saved beneficiaries"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className="nl-pay-search-hint">Type 3 or more characters to search</div>
            <div className="nl-pay-filter-chips">
                <button
                    type="button"
                    className={'nl-pay-chip' + (activeFilter === 'all' ? ' active' : '')}
                    onClick={() => setActiveFilter('all')}
                >
                    All
                </button>
                <button
                    type="button"
                    className={'nl-pay-chip' + (activeFilter === 'own' ? ' active' : '')}
                    onClick={() => setActiveFilter('own')}
                >
                    Own
                </button>
                <button
                    type="button"
                    className={'nl-pay-chip' + (activeFilter === 'public' ? ' active' : '')}
                    onClick={() => setActiveFilter('public')}
                >
                    Public
                </button>
            </div>
            {filtered.length ? (
                <div className="nl-pay-card">
                    {filtered.map((b) => (
                        <BeneficiaryRow key={b.id} beneficiary={b} onClick={() => { setSelected(b); setStep('pay'); }} />
                    ))}
                </div>
            ) : (
                <p className="nl-pay-empty-desc" style={{ textAlign: 'center', padding: '30px 0' }}>No saved beneficiaries found.</p>
            )}
        </div>
    );
}
