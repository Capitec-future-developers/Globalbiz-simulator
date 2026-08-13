import { useState } from 'react';
import { Link } from 'react-router-dom';

const DOC_TYPES = ['Account Confirmation Letter', 'Settle Quote', 'Stamped Statements', 'IT3b Statements'];
const ACCOUNTS = ['Kodi Code 1052 2626 43 R1000.00'];

export default function Documents() {
    const [docType, setDocType] = useState('');
    const [account, setAccount] = useState('');
    const [status, setStatus] = useState('Not ready for email');
    const [generating, setGenerating] = useState(false);
    const [docCount, setDocCount] = useState(0);
    const [screen, setScreen] = useState('main'); // 'main' | 'email' | 'success'
    const [email, setEmail] = useState('saiyalmahabeer@capitecbank.co.za');
    const [extraEmails, setExtraEmails] = useState([]);
    const [emailedLabel, setEmailedLabel] = useState('');

    function handleGenerate() {
        setStatus('Generating...');
        setGenerating(true);
        setTimeout(() => {
            setDocCount((c) => c + 1);
            setStatus('Ready for email');
            setGenerating(false);
        }, 3000);
    }

    function handleCancel() {
        setDocType('');
        setAccount('');
        setStatus('Not ready for email');
    }

    function handleSend() {
        const label = docType === 'Stamped Statements' ? 'Stamped Bank Statement' : docType;
        setEmailedLabel(`Your ${label} has been emailed to ${email}.`);
        setScreen('success');
    }

    if (screen === 'email') {
        return (
            <div style={{ padding: '45px 20px 20px' }}>
                <div className="doc-email-header">
                    <span className="material-icons-sharp" style={{ cursor: 'pointer' }} onClick={() => setScreen('main')}>arrow_back</span>
                    <h3>Email Document</h3>
                </div>
                <div className="doc-email-label">Send to</div>
                <input type="email" className="doc-email-input" value={email} onChange={(e) => setEmail(e.target.value)} />
                {extraEmails.map((_, i) => (
                    <input key={i} type="email" className="doc-email-input" placeholder="Email address" />
                ))}
                <button type="button" className="doc-add-email" onClick={() => setExtraEmails((p) => [...p, ''])}>+ Add another email address</button>
                <button type="button" className="doc-email-send-btn" onClick={handleSend}>Send</button>
                <button type="button" className="doc-email-cancel-btn" onClick={() => setScreen('main')}>Cancel</button>
            </div>
        );
    }

    if (screen === 'success') {
        return (
            <div className="doc-email-success" style={{ padding: '80px 20px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <div className="doc-success-icon"><span className="material-icons-sharp">check_circle</span></div>
                <h3>Document emailed</h3>
                <p>{emailedLabel}</p>
                <button type="button" className="doc-email-send-btn" onClick={() => setScreen('main')}>Done</button>
            </div>
        );
    }

    return (
        <div style={{ padding: '45px 20px 20px' }}>
            <div className="doc-topbar">
                <Link to="/" className="back-button"><span className="material-icons-sharp">arrow_back</span></Link>
                <h2>Documents</h2>
            </div>

            <div className="document-header">
                <span className="material-icons-sharp">description</span>
                <div>
                    <p style={{ margin: 0 }}>Your documents:</p>
                    <p id="doc-status" style={{ margin: 0, color: '#666' }}>{status}</p>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                    <div className="doc-counter" id="doc-count">{docCount}</div>
                </div>
            </div>

            <div className="generate-box">
                <h3>Generate New Document</h3>
                <select id="doc-type" value={docType} onChange={(e) => setDocType(e.target.value)}>
                    <option value="" disabled>Choose document type</option>
                    {DOC_TYPES.map((t) => <option key={t}>{t}</option>)}
                </select>
                {docType && (
                    <div id="account-container">
                        <select id="account-choice" value={account} onChange={(e) => setAccount(e.target.value)}>
                            <option value="" disabled>Choose account</option>
                            {ACCOUNTS.map((a) => <option key={a}>{a}</option>)}
                        </select>
                    </div>
                )}
                {account && (
                    <div id="action-buttons">
                        <button type="button" id="generate-btn" disabled={generating} onClick={handleGenerate}>
                            Generate
                        </button>
                        <button type="button" id="cancel-btn" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                )}
                {status === 'Ready for email' && (
                    <button type="button" id="email-doc-btn" onClick={() => setScreen('email')}>
                        Email document
                    </button>
                )}
            </div>
        </div>
    );
}
