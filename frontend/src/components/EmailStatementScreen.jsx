import { useState } from 'react';

export default function EmailStatementScreen({ onBack, onSent }) {
    const [range, setRange] = useState('1m');
    const [email, setEmail] = useState('saiyalmahabeer@capitecbank.co.za');
    const [extraEmails, setExtraEmails] = useState([]);

    return (
        <div className="nl-statement-screen new-look-only" style={{ display: 'flex' }}>
            <div className="nl-statement-topbar">
                <a href="#" className="nl-back" onClick={(e) => { e.preventDefault(); onBack(); }}>
                    <span className="material-icons-sharp">arrow_back</span>
                </a>
                <h2>Email Statement</h2>
            </div>

            <div className="nl-statement-label">Select your date range</div>
            <label className="nl-statement-radio-row">
                <span>Last 1 month</span>
                <input type="radio" name="range" checked={range === '1m'} onChange={() => setRange('1m')} />
            </label>
            <label className="nl-statement-radio-row">
                <span>Last 3 months</span>
                <input type="radio" name="range" checked={range === '3m'} onChange={() => setRange('3m')} />
            </label>
            <label className="nl-statement-radio-row">
                <span>Custom date range</span>
                <input type="radio" name="range" checked={range === 'custom'} onChange={() => setRange('custom')} />
            </label>
            <div className={'nl-statement-date-inputs' + (range === 'custom' ? ' active' : '')}>
                <input type="date" />
                <input type="date" />
            </div>

            <div className="nl-statement-label">Enter an email address</div>
            <input
                type="email"
                className="nl-statement-email-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            {extraEmails.map((_, i) => (
                <input key={i} type="email" className="nl-statement-email-input" placeholder="Email address" />
            ))}
            <button
                type="button"
                className="nl-statement-add-email"
                onClick={() => setExtraEmails((prev) => [...prev, ''])}
            >
                <span className="material-icons-sharp">add_circle_outline</span>
                Add another email address
            </button>

            <button type="button" className="nl-statement-send-btn" onClick={onSent}>Send statement</button>
        </div>
    );
}
