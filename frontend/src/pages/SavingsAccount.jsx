import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ACCOUNT_TYPES = {
    flexible: {
        name: 'Business Flexible Savings Account',
        blurb: 'Earn interest with access to your money immediately.',
        why: 'Choose this account if you need same-day access to your savings while still earning interest.',
        noticePeriod: 'None (available immediately)',
        nominal: '1.75%',
        effective: '1.76%'
    },
    notice32: {
        name: '32-Day Notice Account',
        blurb: 'Maximise your interest with our 32-day Notice Account.',
        why: 'Choose this account if you can give 32 days’ notice before withdrawing, in exchange for a higher interest rate.',
        noticePeriod: '32 days',
        nominal: '6.25%',
        effective: '6.43%'
    }
};

const RATE_BRACKETS = {
    '0-24999': { label: 'R0 – R24 999', flexible: { nominal: '1.75%', effective: '1.76%' }, notice32: { nominal: '6.25%', effective: '6.43%' } },
    '25000-99999': { label: 'R25 000 – R99 999', flexible: { nominal: '2.10%', effective: '2.12%' }, notice32: { nominal: '6.65%', effective: '6.85%' } },
    '100000+': { label: 'R100 000+', flexible: { nominal: '2.55%', effective: '2.58%' }, notice32: { nominal: '7.10%', effective: '7.35%' } }
};

function todayFormatted() {
    return new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

function ProgressBar({ step, total }) {
    return (
        <div className="nl-wizard-progress">
            {Array.from({ length: total }).map((_, i) => (
                <span key={i} className={i + 1 <= step ? 'done' : ''}></span>
            ))}
        </div>
    );
}

function Topbar({ title, onBack }) {
    return (
        <div className="nl-wizard-topbar">
            <button className="back-button" type="button" onClick={onBack}><span className="material-icons-sharp">arrow_back</span></button>
            <h2>{title}</h2>
        </div>
    );
}

export default function SavingsAccount() {
    const navigate = useNavigate();
    const [step, setStep] = useState('accountType'); // accountType | compareRates | interestOption | confirm | disclosures | agreement | success
    const [accountType, setAccountType] = useState(null);
    const [bracket, setBracket] = useState(null);
    const [agreementChecked, setAgreementChecked] = useState(false);

    function exitWizard() {
        navigate('/explore');
    }

    if (step === 'compareRates') {
        const rates = bracket ? RATE_BRACKETS[bracket] : RATE_BRACKETS['0-24999'];
        const goalLine = bracket
            ? `Rates shown for a balance in the ${RATE_BRACKETS[bracket].label} range.`
            : 'No savings goal selected.';
        return (
            <div className="nl-wizard-screen">
                <Topbar title="Compare interest rates" onBack={() => setStep('accountType')} />
                <div className="nl-wizard-body">
                    <div className="nl-wizard-card">
                        <label className="nl-wizard-detail-label" htmlFor="savings-goal-select">Savings goal</label>
                        <select className="nl-wizard-select" id="savings-goal-select" style={{ marginTop: 8 }} value={bracket || ''} onChange={(e) => setBracket(e.target.value || null)}>
                            <option value="">Choose amount</option>
                            <option value="0-24999">R0 – R24 999</option>
                            <option value="25000-99999">R25 000 – R99 999</option>
                            <option value="100000+">R100 000+</option>
                        </select>
                        <div className="nl-wizard-helper-text" style={{ marginBottom: 0 }}>Choose an amount to see the interest you can earn.</div>
                    </div>
                    <div>
                        <div className="nl-wizard-helper-text">{goalLine}</div>
                        <div className="nl-wizard-table">
                            <div className="nl-wizard-table-row header"><span>Notice period</span><span>Nominal</span><span>Effective</span></div>
                            <div className="nl-wizard-table-row"><span>Business Flexible</span><span>{rates.flexible.nominal}</span><span>{rates.flexible.effective}</span></div>
                            <div className="nl-wizard-table-row"><span>32-day Notice</span><span>{rates.notice32.nominal}</span><span>{rates.notice32.effective}</span></div>
                        </div>
                    </div>
                    <h4 style={{ color: '#16232f', margin: '20px 0 10px' }}>Interest rate types</h4>
                    <div className="nl-wizard-card">
                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#2d3748', lineHeight: 1.5 }}>You will earn interest on the money in your 32-Day Notice Account every day. This interest adds up and is paid to you monthly. No monthly fees apply.</p>
                        <h5 style={{ margin: '14px 0 4px', color: '#16232f' }}>Nominal vs Effective</h5>
                        <p style={{ margin: 0, fontSize: '0.9rem', color: '#2d3748', lineHeight: 1.5 }}>The nominal rate is the stated annual rate. The effective rate includes the impact of interest being compounded monthly, so it is slightly higher.</p>
                    </div>
                </div>
            </div>
        );
    }

    if (step === 'interestOption') {
        const acc = ACCOUNT_TYPES[accountType];
        return (
            <div className="nl-wizard-screen">
                <Topbar title={acc.name} onBack={() => setStep('accountType')} />
                <div className="nl-wizard-step-label">Step 2 of 3: <b>Choose interest option</b></div>
                <ProgressBar step={2} total={3} />
                <div className="nl-wizard-body">
                    <div className="nl-wizard-helper-text" style={{ fontSize: '1.05rem', fontWeight: 600 }}>What would you like to do with the interest earned every month?</div>
                    <div className="nl-wizard-radio-option selected">
                        <div className="nl-wizard-radio-row">
                            <div>
                                <div className="nl-wizard-radio-title">Reinvest interest</div>
                                <div className="nl-wizard-radio-desc">The monthly interest earned will be reinvested into this {acc.name}.</div>
                            </div>
                            <div className="nl-wizard-radio-circle"></div>
                        </div>
                    </div>
                </div>
                <div className="nl-wizard-footer">
                    <button className="nl-wizard-btn-primary" type="button" onClick={() => setStep('confirm')}>Next</button>
                </div>
            </div>
        );
    }

    if (step === 'confirm') {
        const acc = ACCOUNT_TYPES[accountType];
        return (
            <div className="nl-wizard-screen">
                <Topbar title="Confirm details" onBack={() => setStep('interestOption')} />
                <div className="nl-wizard-step-label">Step 3 of 3: <b>{acc.name.replace(' Account', '')} details</b></div>
                <ProgressBar step={3} total={3} />
                <div className="nl-wizard-body">
                    <div className="nl-wizard-hero"><span className="material-icons-sharp">savings</span></div>
                    <div className="nl-wizard-card">
                        <div className="nl-wizard-heading" style={{ fontSize: '1.1rem', marginBottom: 10 }}>Account details</div>
                        <div className="nl-wizard-detail-row"><span className="nl-wizard-detail-label">Account type</span><span className="nl-wizard-detail-value">{acc.name}</span></div>
                        <div className="nl-wizard-detail-row"><span className="nl-wizard-detail-label">Notice period</span><span className="nl-wizard-detail-value">{acc.noticePeriod}</span></div>
                        <div className="nl-wizard-detail-row"><span className="nl-wizard-detail-label">Date created</span><span className="nl-wizard-detail-value">{todayFormatted()}</span></div>
                    </div>
                </div>
                <div className="nl-wizard-footer">
                    <button className="nl-wizard-btn-primary" type="button" onClick={() => setStep('disclosures')}>Confirm</button>
                    <button className="nl-wizard-btn-secondary" type="button" onClick={exitWizard}>Cancel</button>
                </div>
            </div>
        );
    }

    if (step === 'disclosures') {
        return (
            <div className="nl-wizard-screen">
                <Topbar title="Disclosures" onBack={() => setStep('confirm')} />
                <div className="nl-wizard-body">
                    <div className="nl-wizard-hero"><span className="material-icons-sharp">verified</span></div>
                    <div className="nl-wizard-heading">Important information</div>
                    <div className="nl-wizard-card">
                        <ul style={{ margin: 0, paddingLeft: 18, color: '#2d3748', fontSize: '0.95rem', lineHeight: 1.8 }}>
                            <li>You will earn interest at our current rates, which can change over time.</li>
                            <li>The interest rates will depend on the notice deposit account balance.</li>
                            <li>You must give 32 days’ notice before withdrawing from a 32-Day Notice Account.</li>
                        </ul>
                    </div>
                </div>
                <div className="nl-wizard-footer">
                    <button className="nl-wizard-btn-primary" type="button" onClick={() => setStep('agreement')}>View agreement</button>
                    <button className="nl-wizard-btn-secondary" type="button" onClick={exitWizard}>Cancel</button>
                </div>
            </div>
        );
    }

    if (step === 'agreement') {
        return (
            <div className="nl-wizard-screen">
                <Topbar title="Agreement" onBack={() => setStep('disclosures')} />
                <div className="nl-wizard-body">
                    <div className="nl-wizard-card nl-wizard-agreement-text">
                        <h3>Investment Account Opening Agreement</h3>
                        <h4>Applicant Details</h4>
                        <p>Full Names: Zenzi</p>
                        <p>Surname: Dube</p>
                        <p>ID/Passport Number: 8905125435085</p>
                        <h4>Business Details</h4>
                        <p>Trading Name: Zenzi Digital</p>
                        <h4>Contact Details</h4>
                        <p>Residential Address: 14 Marula Street, Soweto, Gauteng, 1818</p>
                        <p>Business Address: 14 Marula Street, Soweto, Gauteng, 1818</p>
                    </div>
                </div>
                <div className="nl-wizard-footer">
                    <label className="nl-wizard-checkbox-row">
                        <input type="checkbox" checked={agreementChecked} onChange={(e) => setAgreementChecked(e.target.checked)} />
                        <span>I have read and understand the terms of the Investment Account Opening Agreement. By continuing, I accept the terms of the agreement and electronically sign the agreement by entering my app PIN/Biometric.</span>
                    </label>
                    <button className="nl-wizard-btn-primary" type="button" disabled={!agreementChecked} onClick={() => setStep('success')}>Continue</button>
                </div>
            </div>
        );
    }

    if (step === 'success') {
        const acc = ACCOUNT_TYPES[accountType];
        return (
            <div className="nl-wizard-screen">
                <div className="nl-wizard-body" style={{ paddingTop: 60 }}>
                    <div className="payment-confirmation">
                        <div className="confirmation-icon success"><span className="material-icons-sharp">check_circle</span></div>
                        <h2>Account opened</h2>
                        <p>Your {acc.name} has been created and is ready to use.</p>
                        <div className="confirmation-actions">
                            <button className="primary-btn" type="button" onClick={exitWizard}>Done</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="nl-wizard-screen">
            <Topbar title="Savings account" onBack={exitWizard} />
            <div className="nl-wizard-step-label">Step 1 of 3: <b>Choose a savings account type</b></div>
            <ProgressBar step={1} total={3} />
            <div className="nl-wizard-body">
                {Object.entries(ACCOUNT_TYPES).map(([key, acc]) => (
                    <div
                        key={key}
                        className={'nl-wizard-radio-option' + (accountType === key ? ' selected' : '')}
                        onClick={() => setAccountType(key)}
                    >
                        <div className="nl-wizard-radio-row">
                            <div>
                                <div className="nl-wizard-radio-title">{acc.name}</div>
                                <div className="nl-wizard-radio-desc">{acc.blurb}</div>
                            </div>
                            <div className="nl-wizard-radio-circle"></div>
                        </div>
                        <hr className="nl-wizard-divider" />
                        <div className="nl-wizard-why-row">
                            <button className="nl-wizard-why-link" type="button" onClick={(e) => { e.stopPropagation(); alert(acc.why); }}>Why choose this account?</button>
                            <button className="nl-wizard-info-btn" type="button" onClick={(e) => { e.stopPropagation(); alert(acc.why); }}><span className="material-icons-sharp">info</span></button>
                        </div>
                    </div>
                ))}
                <button className="nl-wizard-link-row" type="button" onClick={() => setStep('compareRates')}>
                    Compare interest rates <span className="material-icons-sharp">chevron_right</span>
                </button>
            </div>
            <div className="nl-wizard-footer">
                <button className="nl-wizard-btn-primary" type="button" disabled={!accountType} onClick={() => setStep('interestOption')}>Next</button>
            </div>
        </div>
    );
}
