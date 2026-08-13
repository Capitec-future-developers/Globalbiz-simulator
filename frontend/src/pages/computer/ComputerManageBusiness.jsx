import { Link } from 'react-router-dom';
import useScopedStylesheets from '../../hooks/useScopedStylesheets';

const STYLESHEETS = [
    '/legacy-styles/Computer.css',
    '/legacy-styles/Chatbotcomputer.css',
    '/legacy-styles/Manager.css',
];

// Faithful React port of Computer/Managebusiness.html's #mainContent, whose
// markup the source page builds at runtime via scripts/managebusiness.js
// (a manageContentData.manageBusiness template string injected into
// #mainContent on DOMContentLoaded). Reproduced here as static JSX with the
// same structure/classes so Manager.css applies identically.
export default function ComputerManageBusiness() {
    useScopedStylesheets(STYLESHEETS);

    return (
        <div className="content" id="mainContent">
            <div className="back">
                <Link to="/online-banking" className="back-btn">
                    <span className="material-icons-sharp" style={{ position: 'absolute', left: -30 }}>arrow_back</span>
                    <h1 style={{ color: '#111111' }}>Manage Business Profile</h1>
                </Link>
            </div>

            <div className="signin-content">
                <div className="signin-header">
                    <h3>Sign In details</h3>
                </div>
                <p style={{ position: 'absolute', top: 90, left: 25 }}>You can sign in to all linked profiles with this username and password.</p>
                <div className="username">
                    <span>Username</span>
                    <span style={{ fontWeight: 'bold' }}>zenzi.dube@zenzidigital.co.za</span>
                </div>
                <div className="contacts">
                    <span>Cellphone</span>
                    <span style={{ fontWeight: 'bold' }}>+27 60 291 0591</span>
                </div>
                <div className="Password">
                    <span>Password</span>
                    <span aria-hidden="true" style={{ fontWeight: 'bold' }}>***************</span>
                </div>
                <span style={{ position: 'absolute', top: 150, left: 1050, color: '#00aeff', cursor: 'pointer' }}>Update</span>
            </div>

            <div className="Singin-details">
                <div className="circle">ZD</div>
                <div className="top">
                    <span style={{ fontWeight: 'bold' }}>Zenzi Digital Holdings</span>
                    <span><p>Always sign me in with this profile</p></span>
                </div>
                <div className="Zenzi">Default profile</div>
                <span className="material-icons-sharp" style={{ position: 'absolute', color: '#00aeff', left: 1080, top: 35, cursor: 'pointer', fontSize: 20 }}>more_vert</span>
                <div className="bottom" style={{ borderBottom: '1px solid #dddddd', width: '100%' }}></div>
                <div className="user-details">
                    <h1>User details</h1>
                    <div className="names">
                        <span>Name</span>
                        <span style={{ fontWeight: 'bold' }}>Zenzi</span>
                    </div>
                    <div className="usernames">
                        <span>Surname</span>
                        <span style={{ fontWeight: 'bold' }}>Dube</span>
                    </div>
                    <div className="contact">
                        <span>Cellphone</span>
                        <span style={{ fontWeight: 'bold' }}>+27 60 291 0591</span>
                    </div>
                    <div className="email">
                        <span>Email</span>
                        <span style={{ fontWeight: 'bold' }}>zenzi.dube@zenzidigital.co.za</span>
                    </div>
                </div>
            </div>

            <div className="link">
                <h2 style={{ position: 'absolute', top: 15, left: 15 }}>Linked business profiles</h2>
                <div className="profile">
                    <div className="circles">zd</div>
                    <span className="material-icons-sharp" style={{ position: 'absolute', color: '#00aeff', left: 200, top: 35, cursor: 'pointer', fontSize: 30 }}>more_vert</span>
                    <div className="made">
                        <span>Zenzi</span>
                        <span>Profile nickname</span>
                        <div className="Zenzis">Default</div>
                    </div>
                </div>
                <div className="profile2">
                    <img src="/images/Link-profile.png" alt="" style={{ position: 'absolute', height: 100, width: 100, borderRadius: '50%', top: 100, left: 70 }} />
                    <span style={{ position: 'relative', top: 210, left: 35 }}>Link Business Profile</span>
                </div>
            </div>
        </div>
    );
}
