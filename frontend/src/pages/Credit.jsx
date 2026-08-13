import { Link } from 'react-router-dom';

export default function Credit() {
    return (
        <>
            <div className="head nl-subpage-head">
                <Link to="/explore" className="arrow" style={{ textDecoration: 'none' }}>
                    <span className="material-icons-sharp">arrow_back</span>
                </Link>
                <div className="header" style={{ fontSize: '0.9rem' }}>Credit</div>
            </div>
            <div className="content" id="mainContent" style={{ top: 120 }}>
                <div className="credit-empty-card">
                    <div className="credit-empty-icon">
                        <span className="material-icons-sharp">verified</span>
                        <span className="material-icons-sharp">sync_problem</span>
                    </div>
                    <p>You currently have no available credit offers</p>
                </div>
            </div>
        </>
    );
}
