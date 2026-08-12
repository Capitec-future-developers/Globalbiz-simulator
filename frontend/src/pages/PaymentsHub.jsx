import { Link } from 'react-router-dom';

export default function PaymentsHub() {
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
            </div>
        </div>
    );
}
