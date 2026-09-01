import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GlobalOnePin() {
    const navigate = useNavigate();
    const [pin, setPin] = useState('');
    const [error, setError] = useState(false);

    const handleSubmit = () => {
        if (!pin.trim()) {
            setError(true);
            return;
        }
        setError(false);
        navigate('/global-one/home');
    };

    return (
        <div className="go-screen" style={{ background: 'white' }}>
            <div className="go-pin-toggle-row">
                <a href="/Sign-In-personal" className="go-pin-back" onClick={e => { e.preventDefault(); navigate('/Sign-In-personal'); }}>
                    <span className="material-icons-sharp">arrow_back</span>
                </a>
                <span className="go-pin-pill">For me</span>
            </div>

            <div className="go-pin-logo">
                <span className="go-logo-dark">Global</span><span className="go-logo-light">One</span>
            </div>

            <div className="go-pin-body">
                <div className="go-pin-field-row">
                    <label htmlFor="goPinInput">Enter app PIN</label>
                    <a href="#" onClick={e => e.preventDefault()} id="goForgotPin">Forgot PIN</a>
                </div>
                <input
                    type="password"
                    id="goPinInput"
                    className="go-pin-input"
                    inputMode="numeric"
                    autoComplete="off"
                    value={pin}
                    onChange={e => { setPin(e.target.value); if (e.target.value.trim()) setError(false); }}
                />
                {error && <p className="go-pin-error visible">Please enter your app PIN.</p>}
                <button type="button" className="go-pin-submit" onClick={handleSubmit}>Submit</button>
            </div>

            <div className="go-pin-disclaimer">
                Capitec Bank is an authorised financial services provider (FSP 46669) and registered credit provider (NCRCP13). Capitec Bank Limited Reg. No: 1980/003695/06
            </div>
        </div>
    );
}
