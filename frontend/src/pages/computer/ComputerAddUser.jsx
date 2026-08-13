import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useScopedStylesheets from '../../hooks/useScopedStylesheets';

const STYLESHEETS = [
    '/legacy-styles/Computer.css',
    '/legacy-styles/user.css',
    '/legacy-styles/Chatbotcomputer.css',
];

const STEP_COUNT = 5;

function StepHeader({ active }) {
    return (
        <div className="step-header">
            {Array.from({ length: STEP_COUNT }, (_, i) => i + 1).map((n) => (
                <div key={n} className={'step' + (n === active ? ' active' : '')}>{n}</div>
            ))}
        </div>
    );
}

// Faithful React port of Computer/Add-user.html's content + scripts/add-user.js
// wizard behaviour (everything below the shared header/sidebar, which
// ComputerShell owns). Loads exactly the stylesheets Add-user.html itself
// links.
//
// scripts/add-user.js drives a real multi-step flow: an initial "Digital ID"
// disclaimer -> Next reveals a 5-step wizard (User Details -> Select Role ->
// Account Access -> Confirmation -> All done) driven entirely by re-rendering
// .disclaimer-box's innerHTML and toggling the outer Cancel/Next buttons'
// visibility. Reproduced here as React state (step + form field state)
// instead of DOM innerHTML swapping.
export default function ComputerAddUser() {
    useScopedStylesheets(STYLESHEETS);
    const navigate = useNavigate();
    const formRef = useRef(null);

    // step: 'intro' | 1 | 2 | 3 | 4 | 5
    const [step, setStep] = useState('intro');
    const [userState, setUserState] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        identityType: '',
        identityValue: '',
        communications: [],
        role: '',
        access: [],
    });
    function resetToIntro() {
        setStep('intro');
    }

    function handleOuterNext() {
        setStep(1);
    }

    function handleStep1Next(e) {
        e.preventDefault();
        const form = formRef.current;
        if (form && !form.checkValidity()) {
            form.reportValidity();
            return;
        }
        setStep(2);
    }

    function toggleCommunication(value) {
        setUserState((prev) => {
            const has = prev.communications.includes(value);
            return {
                ...prev,
                communications: has
                    ? prev.communications.filter((v) => v !== value)
                    : [...prev.communications, value],
            };
        });
    }

    function handleStep2Next() {
        if (!userState.role) {
            window.alert('Please select a role');
            return;
        }
        setStep(3);
    }

    function toggleAccess(value) {
        setUserState((prev) => {
            const has = prev.access.includes(value);
            return {
                ...prev,
                access: has ? prev.access.filter((v) => v !== value) : [...prev.access, value],
            };
        });
    }

    function handleStep3Next() {
        if (userState.access.length === 0) {
            window.alert('Please select at least one access level');
            return;
        }
        setStep(4);
    }

    function handleSubmit() {
        setStep(5);
    }

    function handleGoToUsers() {
        navigate('/online-banking/user-management');
    }

    function identityLabel() {
        if (!userState.identityType) return '';
        return `${userState.identityType.toUpperCase()}: ${userState.identityValue}`;
    }

    const name = `${userState.firstName} ${userState.lastName}`.trim();

    return (
        <>
            <div className="content" id="mainContent">
                <div className="content-header">
                    <h1>Add user</h1>
                </div>
                <div className="disclaimer-box">
                    {step === 'intro' && (
                        <>
                            <h4>What is Digital ID?</h4><br />
                            <p>WE&apos;ve made business banking even easier by introducing Digital ID. It&apos;s the easiest way to sign in to all your banking profiles</p><br />
                            <h4>What you get</h4><br />
                            <ul>
                                <li>One username and password to remember</li>
                                <li>Link all banking profiles for a simpler sign in</li>
                                <li>Quick and easy access to your accounts</li>
                            </ul><br />
                            <div className="seperator"></div><br />
                            <p>Click Next to continue with user creation.</p>
                        </>
                    )}

                    {step === 1 && (
                        <>
                            <StepHeader active={1} />
                            <h2>User Details</h2>
                            <p><strong>Note:</strong> The email address you give will become the username of the added user.</p><br />
                            <form className="user-form" ref={formRef}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>First Name</label>
                                        <input
                                            id="firstName"
                                            type="text"
                                            placeholder="Enter first name"
                                            required
                                            value={userState.firstName}
                                            onChange={(e) => setUserState((prev) => ({ ...prev, firstName: e.target.value }))}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Last Name</label>
                                        <input
                                            id="lastName"
                                            type="text"
                                            placeholder="Enter last name"
                                            required
                                            value={userState.lastName}
                                            onChange={(e) => setUserState((prev) => ({ ...prev, lastName: e.target.value }))}
                                        />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="Enter email"
                                            required
                                            value={userState.email}
                                            onChange={(e) => setUserState((prev) => ({ ...prev, email: e.target.value }))}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Cellphone Number</label>
                                        <input
                                            id="phone"
                                            type="tel"
                                            placeholder="Enter phone number"
                                            required
                                            value={userState.phone}
                                            onChange={(e) => setUserState((prev) => ({ ...prev, phone: e.target.value }))}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>Choose Identity Type</label>
                                    <select
                                        id="identityTypeSelect"
                                        required
                                        value={userState.identityType}
                                        onChange={(e) => setUserState((prev) => ({ ...prev, identityType: e.target.value, identityValue: '' }))}
                                    >
                                        <option value="">Select identity type</option>
                                        <option value="rsa">RSA Identity</option>
                                        <option value="passport">Passport</option>
                                    </select>
                                </div>
                                <div className="form-group" id="identityInputWrapper" style={{ display: userState.identityType ? 'block' : 'none' }}>
                                    {userState.identityType === 'rsa' && (
                                        <>
                                            <label>RSA ID Number</label>
                                            <input
                                                id="identityValue"
                                                type="text"
                                                maxLength={13}
                                                placeholder="Enter 13-digit RSA ID"
                                                required
                                                value={userState.identityValue}
                                                onChange={(e) => setUserState((prev) => ({ ...prev, identityValue: e.target.value }))}
                                            />
                                        </>
                                    )}
                                    {userState.identityType === 'passport' && (
                                        <>
                                            <label>Passport Number</label>
                                            <input
                                                id="identityValue"
                                                type="text"
                                                placeholder="Enter passport number"
                                                required
                                                value={userState.identityValue}
                                                onChange={(e) => setUserState((prev) => ({ ...prev, identityValue: e.target.value }))}
                                            />
                                        </>
                                    )}
                                </div>
                                <h3>Preferred Method of Communication</h3>
                                <div className="checkbox-group">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="communication"
                                            value="email"
                                            checked={userState.communications.includes('email')}
                                            onChange={() => toggleCommunication('email')}
                                        /> Email
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="communication"
                                            value="sms"
                                            checked={userState.communications.includes('sms')}
                                            onChange={() => toggleCommunication('sms')}
                                        /> SMS
                                    </label>
                                </div>
                                <div className="letsgo">
                                    <button type="button" className="cancel" onClick={resetToIntro}>Cancel</button>
                                    <button type="button" className="next" onClick={handleStep1Next}>Next</button>
                                </div>
                            </form>
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <StepHeader active={2} />
                            <h2>Select User Role</h2>
                            <p>Please choose the role to assign to this user:</p>
                            <form className="role-form">
                                <div className="form-group">
                                    <label>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="authoriser"
                                            required
                                            checked={userState.role === 'authoriser'}
                                            onChange={() => setUserState((prev) => ({ ...prev, role: 'authoriser' }))}
                                        /> Authoriser
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="capturer"
                                            checked={userState.role === 'capturer'}
                                            onChange={() => setUserState((prev) => ({ ...prev, role: 'capturer' }))}
                                        /> Capturer
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="viewer"
                                            checked={userState.role === 'viewer'}
                                            onChange={() => setUserState((prev) => ({ ...prev, role: 'viewer' }))}
                                        /> Viewer
                                    </label>
                                </div>
                                <div className="letsgo">
                                    <button type="button" className="cancel" onClick={resetToIntro}>Cancel</button>
                                    <button type="button" className="next" onClick={handleStep2Next}>Next</button>
                                </div>
                            </form>
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <StepHeader active={3} />
                            <h2>Account Access</h2>
                            <p>Select which accounts this user should have access to:</p>
                            <form className="access-form">
                                <div className="form-group">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="access"
                                            value="admin"
                                            checked={userState.access.includes('admin')}
                                            onChange={() => toggleAccess('admin')}
                                        /> Administrator Access
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="access"
                                            value="transactions"
                                            checked={userState.access.includes('transactions')}
                                            onChange={() => toggleAccess('transactions')}
                                        /> Transaction Access
                                    </label>
                                </div>
                                <div className="form-group">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="access"
                                            value="reports"
                                            checked={userState.access.includes('reports')}
                                            onChange={() => toggleAccess('reports')}
                                        /> Reports Access
                                    </label>
                                </div>
                                <div className="letsgo">
                                    <button type="button" className="cancel" onClick={resetToIntro}>Cancel</button>
                                    <button type="button" className="next" onClick={handleStep3Next}>Next</button>
                                </div>
                            </form>
                        </>
                    )}

                    {step === 4 && (
                        <>
                            <StepHeader active={4} />
                            <h2>Confirmation</h2>
                            <p>Please review the information below before submitting:</p>
                            <div className="confirmation-details">
                                <h3>User Details</h3>
                                <p>Name: <span id="confirm-name">{name || '—'}</span></p>
                                <p>Email: <span id="confirm-email">{userState.email || '—'}</span></p>
                                <p>Phone: <span id="confirm-phone">{userState.phone || '—'}</span></p>
                                <p>Identity: <span id="confirm-identity">{identityLabel() || '—'}</span></p>
                                <p>Preferred Contact: <span id="confirm-comm">{userState.communications.join(', ') || '—'}</span></p>
                                <p>Role: <span id="confirm-role">{userState.role || '—'}</span></p>
                                <p>Access Levels: <span id="confirm-access">{userState.access.join(', ') || '—'}</span></p>
                            </div>
                            <div className="letsgo">
                                <button type="button" className="cancel" onClick={resetToIntro}>Cancel</button>
                                <button type="button" className="next" id="submitBtn" onClick={handleSubmit}>Submit</button>
                            </div>
                        </>
                    )}

                    {step === 5 && (
                        <>
                            <StepHeader active={5} />
                            <h2>All done</h2>
                            <p>The user has been created successfully.</p>
                            <div className="letsgo">
                                <button type="button" className="cancel" onClick={resetToIntro}>Close</button>
                                <button type="button" className="next" onClick={handleGoToUsers}>Go to Users</button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {step === 'intro' && (
                <div className="letsgo">
                    <button type="button" className="cancel" onClick={resetToIntro}>Cancel</button>
                    <button type="button" className="next" id="nextBtn" onClick={handleOuterNext}>Next</button>
                </div>
            )}
        </>
    );
}
