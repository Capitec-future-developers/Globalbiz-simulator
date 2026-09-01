import { useState } from 'react';
import { Link } from 'react-router-dom';

const SETTINGS_ITEMS = [
    { id: 'limits', label: 'Transaction Limits' },
    { id: 'notifications', label: 'Transaction Notifications' },
    { id: 'profileNotif', label: 'Profile Notifications' },
];

export default function PhoneSettings() {
    const [biometrics, setBiometrics] = useState(false);
    const [showBalance, setShowBalance] = useState(true);

    return (
        <div>
            <div className="head">
                <div className="arrow">
                    <Link to="/">
                        <span className="material-icons-sharp">arrow_back</span>
                    </Link>
                </div>
                <div className="header">Settings</div>
            </div>

            <div className="content" id="mainContent" style={{ backgroundColor: '#ccc' }}>
                <div className="setting-container">
                    <div className="setting-item">
                        <p>Allow fingerprints or FaceID to unlock</p>
                        <label className="switch">
                            <input type="checkbox" checked={biometrics} onChange={e => setBiometrics(e.target.checked)} />
                            <span className="slider"></span>
                        </label>
                    </div>
                    <div className="separator-bottom"></div>

                    <div className="setting-item">
                        <p>Show or hide balance on the home screen</p>
                        <label className="switch">
                            <input type="checkbox" checked={showBalance} onChange={e => setShowBalance(e.target.checked)} />
                            <span className="slider"></span>
                        </label>
                    </div>
                    <div className="separator-bottom"></div>

                    <div className="tabs">
                        {SETTINGS_ITEMS.map((item, i) => (
                            <div key={item.id}>
                                <button id={item.id} type="button" onClick={() => {}}>
                                    <div className={'tab' + (i === 0 ? ' active' : '')}>{item.label}</div>
                                </button>
                                <div className="yohs">
                                    <span className="material-icons-sharp">keyboard_arrow_right</span>
                                </div>
                                <div className="separator-bottom"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}
