import { Link, useNavigate } from 'react-router-dom';

export default function GlobalOneProfile() {
    const navigate = useNavigate();

    return (
        <div className="go-screen" style={{ background: 'white' }}>
            <div className="go-profile-popup-header">
                <h2>Hello Omphile!</h2>
                <Link to="/global-one/home" aria-label="Close" style={{ textDecoration: 'none' }}>
                    <span className="material-icons-sharp">close</span>
                </Link>
            </div>
            <div className="go-body">
                <div className="go-profile-list">
                    <Link to="/global-one/my-information" className="go-profile-row">
                        <span className="go-profile-row-icon material-icons-outlined">badge</span>
                        <div><h4>My information</h4><p>View and update information</p></div>
                    </Link>
                    <button type="button" className="go-profile-row" onClick={() => {}}>
                        <span className="go-profile-row-icon material-icons-outlined">settings</span>
                        <div><h4>My app settings</h4><p>Update personal and security settings</p></div>
                    </button>
                    <button type="button" className="go-profile-row" onClick={() => {}}>
                        <span className="go-profile-row-icon material-icons-outlined">tune</span>
                        <div><h4>My preferences and consent</h4><p>Choose what we send you</p></div>
                    </button>
                    <button type="button" className="go-profile-row" onClick={() => {}}>
                        <span className="go-profile-row-icon material-icons-outlined">dashboard_customize</span>
                        <div><h4>Personalise my app</h4><p>Display what matters most to you</p></div>
                    </button>
                    <button type="button" className="go-profile-row" onClick={() => {}}>
                        <span className="go-profile-row-icon material-icons-outlined">shield</span>
                        <div><h4>My security centre</h4><p>Manage cases and security settings</p></div>
                    </button>
                </div>

                <button type="button" className="go-signout-btn" onClick={() => navigate('/Sign-In-personal')}>
                    <span className="material-icons-outlined">logout</span>
                    Sign Out
                </button>
            </div>
        </div>
    );
}
