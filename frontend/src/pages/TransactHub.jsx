import { Link } from 'react-router-dom';

export default function TransactHub() {
    return (
        <div className="nl-transact-screen new-look-only" style={{ display: 'block' }}>
            <div className="nl-transact-topbar">
                <Link to="/" className="nl-back"><span className="material-icons-sharp">arrow_back</span></Link>
                <h2>Transact</h2>
            </div>
            <div className="nl-transact-menu">
                <Link to="/transact/payments" className="nl-transact-card" style={{ textDecoration: 'none' }}>
                    <h3>Payments</h3>
                    <p>Make payments and view history</p>
                    <span className="material-icons-sharp nl-transact-card-icon">exit_to_app</span>
                </Link>
                <Link to="/transact/transfer" className="nl-transact-card" style={{ textDecoration: 'none' }}>
                    <h3>Transfers</h3>
                    <p>Move money between accounts</p>
                    <span className="material-icons-sharp nl-transact-card-icon">sync_alt</span>
                </Link>
                <Link to="/transact/beneficiaries" className="nl-transact-card" style={{ textDecoration: 'none' }}>
                    <h3>Beneficiaries</h3>
                    <p>Add, group and manage beneficiaries</p>
                    <span className="material-icons-sharp nl-transact-card-icon">group</span>
                </Link>
            </div>
        </div>
    );
}
