import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getBalances, formatNlBalance } from '../hooks/useAccountStore';

export default function Home() {
    const [balances, setBalances] = useState(null);

    useEffect(() => {
        setBalances(getBalances());
    }, []);

    const savingsTotal = balances ? balances.notice32.available + balances.flexible.available : 0;

    return (
        <>
            <div className="new-look-header new-look-only" style={{ display: 'flex' }}>
                <Link to="/profile" className="nl-avatar-link" aria-label="Open profile menu">
                    <div className="nl-avatar">ZD</div>
                </Link>
                <div className="nl-identity">
                    <div className="nl-fullname">Zenzi Dube</div>
                    <Link to="/profile" className="nl-profile-toggle">
                        Zenzi Dube <span className="material-icons-sharp">expand_more</span>
                    </Link>
                </div>
                <Link to="/support" className="nl-call-icon" aria-label="Call support">
                    <span className="material-icons-sharp">call</span>
                </Link>
            </div>

            <div className="content" id="mainContent" style={{ padding: '0 20px 80px' }}>
                <div className="account new-look-only" style={{ display: 'block' }}>
                    <div className="account-header">
                        <h4>Accounts</h4>
                        <Link to="/accounts" className="View">View all</Link>
                    </div>
                    <Link to="/accounts" style={{ cursor: 'pointer', textDecoration: 'none' }}>
                        <div className="nl-account-card">
                            <img src="/images/save.svg" alt="save" className="material-icons-sharp nl-account-icon" />
                            <span className="nl-account-name">2 Savings Accounts</span>
                            <span className="nl-account-balance">{balances ? formatNlBalance(savingsTotal) : ''}</span>
                        </div>
                    </Link>
                    <Link to="/accounts/credit" style={{ cursor: 'pointer', textDecoration: 'none' }}>
                        <div className="nl-account-card" style={{ marginTop: 10 }}>
                            <span className="material-icons-sharp nl-account-icon" style={{ color: '#c0272d' }}>credit_card</span>
                            <span className="nl-account-name">Credit Account</span>
                            <span className="nl-account-balance">{balances ? formatNlBalance(balances.credit.available) : ''}</span>
                        </div>
                    </Link>
                </div>

                <div className="favorites-container new-look-only" style={{ display: 'block' }}>
                    <div className="favorites">
                        <div className="favorites-header">
                            <h4>Favourites</h4>
                            <a href="#" className="View">Edit</a>
                        </div>
                        <div className="favorites-grid">
                            <Link to="/transact/payments/saved" className="favorite-box" style={{ textDecoration: 'none' }}>
                                <span className="material-icons-sharp">group</span>
                                <span className="favorite-title">Pay beneficiary</span>
                            </Link>
                            <Link to="/transact/payments/once-off" className="favorite-box" style={{ textDecoration: 'none' }}>
                                <span className="material-icons-sharp">credit_card</span>
                                <span className="favorite-title">Pay once-off beneficiary</span>
                            </Link>
                            <Link to="/transact/payments" className="favorite-box" style={{ textDecoration: 'none' }}>
                                <span className="material-icons-sharp">group</span>
                                <span className="favorite-title">Group or Multiple payments</span>
                            </Link>
                            <Link to="/transact/transfer" className="favorite-box" style={{ textDecoration: 'none' }}>
                                <span className="material-icons-sharp">sync_alt</span>
                                <span className="favorite-title">Transfer money</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="pending-container new-look-only" style={{ display: 'block' }}>
                    <div className="pending">
                        <div className="pending-header">
                            <h4>Pending Authorisations (0)</h4>
                        </div>
                        <div className="nl-pending-empty">You have no pending authorisations to approve.</div>
                    </div>
                </div>
            </div>
        </>
    );
}
