import { useState } from 'react';
import { Link } from 'react-router-dom';
import Stub from './Stub';

export default function PaymentsHub() {
    const [stubTitle, setStubTitle] = useState(null);

    if (stubTitle) {
        return <Stub title={stubTitle} />;
    }

    return (
        <div className="nl-pay-section" style={{ padding: '45px 20px 20px' }}>
            <div className="nl-pay-header">
                <Link to="/transact" className="back-button"><span className="material-icons-sharp">arrow_back</span></Link>
                <h2>Payments</h2>
            </div>
            <div className="nl-pay-card">
                <Link to="/transact/payments/saved" className="nl-pay-row" style={{ textDecoration: 'none' }}>
                    <span className="material-icons-sharp">person</span>
                    <div className="nl-pay-row-body">
                        <div className="nl-pay-row-title">Saved beneficiary</div>
                        <div className="nl-pay-row-sub">Beneficiaries you've saved</div>
                    </div>
                    <span className="material-icons-sharp">chevron_right</span>
                </Link>
                <Link to="/transact/payments/once-off" className="nl-pay-row" style={{ textDecoration: 'none' }}>
                    <span className="material-icons-sharp">exit_to_app</span>
                    <div className="nl-pay-row-body">
                        <div className="nl-pay-row-title">Once-off payment</div>
                        <div className="nl-pay-row-sub">Quick payment to anyone</div>
                    </div>
                    <span className="material-icons-sharp">chevron_right</span>
                </Link>
                <button className="nl-pay-row" type="button" onClick={() => setStubTitle('Multiple beneficiaries')}>
                    <span className="material-icons-sharp">groups</span>
                    <div className="nl-pay-row-body">
                        <div className="nl-pay-row-title">Multiple beneficiaries</div>
                        <div className="nl-pay-row-sub">Groups you've created</div>
                    </div>
                    <span className="material-icons-sharp">chevron_right</span>
                </button>
            </div>
            <p className="nl-pay-section-label">View payments</p>
            <div className="nl-pay-card">
                <button className="nl-pay-row" type="button" onClick={() => setStubTitle('All payments')}>
                    <div className="nl-pay-row-body">
                        <div className="nl-pay-row-title">All payments</div>
                    </div>
                    <span className="material-icons-sharp">chevron_right</span>
                </button>
                <button className="nl-pay-row" type="button" onClick={() => setStubTitle('Recurring payments')}>
                    <div className="nl-pay-row-body">
                        <div className="nl-pay-row-title">Recurring payments</div>
                    </div>
                    <span className="material-icons-sharp">chevron_right</span>
                </button>
                <button className="nl-pay-row" type="button" onClick={() => setStubTitle('Future-dated payments')}>
                    <div className="nl-pay-row-body">
                        <div className="nl-pay-row-title">Future-dated payments</div>
                    </div>
                    <span className="material-icons-sharp">chevron_right</span>
                </button>
            </div>
            <p className="nl-pay-section-label">Manage</p>
            <div className="nl-pay-card">
                <button className="nl-pay-row" type="button" onClick={() => setStubTitle('Authorisation settings')}>
                    <span className="material-icons-sharp">verified_user</span>
                    <div className="nl-pay-row-body">
                        <div className="nl-pay-row-title">Authorisation settings</div>
                        <div className="nl-pay-row-sub">Who must approve beneficiary changes</div>
                    </div>
                    <span className="material-icons-sharp">chevron_right</span>
                </button>
            </div>
        </div>
    );
}
