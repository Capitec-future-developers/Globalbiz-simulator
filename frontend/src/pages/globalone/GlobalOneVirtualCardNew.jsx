import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function YesNoToggle({ label, desc, defaultOn }) {
    const [on, setOn] = useState(defaultOn);
    return (
        <div className="go-toggle-row" style={{ borderBottom: 'none' }}>
            <div className="go-toggle-info"><h4>{label}</h4><p>{desc}</p></div>
            <button className={'go-yn-toggle' + (on ? ' on' : '')} type="button" onClick={() => setOn(v => !v)}>
                {on ? <>YES<span className="go-yn-knob"></span></> : <><span className="go-yn-knob"></span>NO</>}
            </button>
        </div>
    );
}

export default function GlobalOneVirtualCardNew() {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const invalid = /[^a-zA-Z0-9 ]/;

    const handleNext = () => {
        if (invalid.test(name)) { setError('Invalid special character(s)'); return; }
        if (!name.trim()) { setError('Please name your card'); return; }
        setError('');
        navigate('/global-one/virtual-card-limits');
    };

    return (
        <div className="go-screen" style={{ background: 'white' }}>
            <div className="go-vc-header">
                <Link to="/global-one/cards" className="go-vc-back"><span className="material-icons-sharp">arrow_back</span></Link>
                <h2>New Virtual Card</h2>
            </div>
            <div className="go-body">
                <div className="go-vc-body">
                    <div className="go-vc-section-label">Card settings</div>
                    <label className="go-vc-field-label" htmlFor="goCardNameInput">Name your card</label>
                    <input
                        type="text"
                        id="goCardNameInput"
                        className="go-vc-input"
                        placeholder="e.g. Netflix"
                        maxLength={20}
                        value={name}
                        onChange={e => { setName(e.target.value); setError(''); }}
                    />
                    {error && <p className="go-vc-error visible">{error}</p>}

                    <div className="go-vc-section-label go-vc-section-label-spaced">Purchase options</div>
                    <YesNoToggle label="Online purchases" desc="Use your card to shop online" defaultOn={true} />
                    <YesNoToggle label="International purchases" desc="Use your card to make international purchases" defaultOn={true} />
                </div>
            </div>
            <div className="go-vc-footer">
                <button type="button" className="go-vc-next" onClick={handleNext}>Next</button>
            </div>
        </div>
    );
}
