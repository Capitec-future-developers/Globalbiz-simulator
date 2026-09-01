import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LIMITS = [
    { id: 'cash', label: 'Cash withdrawals', max: 5000 },
    { id: 'card', label: 'Card machine purchases', max: 5000 },
    { id: 'online', label: 'Online/scan to pay/phone', max: 5000 },
];

export default function GlobalOneVirtualCardLimits() {
    const navigate = useNavigate();
    const [values, setValues] = useState({ cash: '', card: '', online: '' });
    const [showModal, setShowModal] = useState(false);

    const allZero = Object.values(values).every(v => !v || parseFloat(v) === 0);

    const handleNext = () => {
        if (allZero) { setShowModal(true); return; }
        navigate('/global-one/virtual-card-success');
    };

    return (
        <div className="go-screen" style={{ background: 'white' }}>
            <div className="go-vc-header">
                <Link to="/global-one/virtual-card-new" className="go-vc-back"><span className="material-icons-sharp">arrow_back</span></Link>
                <h2>Update Permanent Limits</h2>
            </div>
            <div className="go-body">
                <div className="go-vc-body">
                    <p className="go-vc-intro">Set virtual daily limits</p>
                    {LIMITS.map(l => (
                        <div key={l.id} className="go-vc-limit-row">
                            <div className="go-vc-limit-label">
                                <span>{l.label}</span>
                                <span className="go-vc-limit-max">(max R{l.max.toLocaleString()})</span>
                            </div>
                            <div className="go-vc-limit-input-wrap">
                                <span>R</span>
                                <input
                                    type="number"
                                    inputMode="decimal"
                                    min={0}
                                    max={l.max}
                                    placeholder="0.00"
                                    value={values[l.id]}
                                    onChange={e => setValues(v => ({ ...v, [l.id]: e.target.value }))}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="go-vc-footer">
                <button type="button" className="go-vc-next" onClick={handleNext}>Next</button>
            </div>

            {showModal && (
                <div className="go-vc-modal-backdrop">
                    <div className="go-vc-modal">
                        <h3>Set Limits</h3>
                        <p>The following permanent limits have been set to R0.00. You will not be able to do these transactions until you increase the limits.</p>
                        <ul><li>Cash withdrawals</li><li>Card machine</li><li>Online/scan to pay</li></ul>
                        <div className="go-vc-modal-actions">
                            <button type="button" onClick={() => setShowModal(false)}>CANCEL</button>
                            <button type="button" className="go-vc-modal-confirm" onClick={() => navigate('/global-one/virtual-card-success')}>CONFIRM</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
