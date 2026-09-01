import { Link } from 'react-router-dom';
import ChatbotWidget from '../components/ChatbotWidget';

/* All styles inlined — Manage.css uses generic class names (.content, .Header,
   .contact, .Email, .Password, .body) that conflict with app-wide CSS. */
const S = {
    signinDetails: {
        position: 'relative',
        backgroundColor: '#FFFFFF',
        height: '230px',
        width: '100%',
        marginBottom: '10px',
        padding: '10px',
    },
    signinLabel: { display: 'flex', flexDirection: 'column', marginBottom: '12px' },
    updateBtn: { color: '#00aeff', cursor: 'pointer', position: 'absolute', right: '10px', bottom: '10px' },
    remote: {
        position: 'relative',
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: '70px',
        marginBottom: '10px',
        padding: '10px',
    },
    profileHeader: {
        position: 'relative',
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: '80px',
        marginBottom: '10px',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    circle: {
        width: '60px',
        height: '60px',
        borderRadius: '50%',
        backgroundColor: '#031035',
        textAlign: 'center',
        fontSize: '20px',
        color: '#fff',
        lineHeight: '60px',
        flexShrink: 0,
    },
    defaultPill: {
        marginLeft: 'auto',
        backgroundColor: 'rgba(196,239,213,0.47)',
        borderRadius: '4px',
        fontSize: '12px',
        padding: '2px 6px',
    },
    userDetails: {
        position: 'relative',
        backgroundColor: '#FFFFFF',
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
    },
    userDetailsHeader: { fontSize: '18px', fontWeight: 500, marginBottom: '16px' },
    detailRow: { display: 'flex', flexDirection: 'column', marginBottom: '16px' },
    linkAccount: {
        position: 'relative',
        backgroundColor: '#FFFFFF',
        width: '100%',
        padding: '10px',
        marginBottom: '10px',
    },
    linkAccountHeader: { fontWeight: 'bold', marginBottom: '12px' },
    linkAccountItem: {
        position: 'relative',
        border: '1px solid #dddddd',
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: '60px',
        fontSize: '15px',
        display: 'flex',
        alignItems: 'center',
        padding: '8px',
        gap: '8px',
        marginBottom: '10px',
    },
    smallCircle: {
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        backgroundColor: '#031035',
        textAlign: 'center',
        fontSize: '13px',
        color: '#fff',
        lineHeight: '30px',
        flexShrink: 0,
    },
    defaultSmall: {
        marginLeft: 'auto',
        backgroundColor: 'rgba(196,239,213,0.47)',
        borderRadius: '30%',
        fontSize: '10px',
        padding: '2px 4px',
        fontWeight: 'bold',
    },
    linkBusiness: {
        width: '100%',
        height: '55px',
        fontSize: '15px',
        border: '1px solid #1aa0e8',
        borderRadius: '7px',
        color: '#1aa0e8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '8px',
        cursor: 'pointer',
    },
};

export default function ManageBusiness() {
    return (
        <>
            <ChatbotWidget />

            <div className="head">
                <Link to="/home2" className="arrow" style={{ textDecoration: 'none' }}>
                    <span className="material-icons-sharp">arrow_back</span>
                </Link>
                <div className="header" style={{ fontSize: '0.9rem' }}>Manage Business Profiles</div>
                <span></span>
            </div>

            <div className="content" id="mainContent">

                {/* Sign In details */}
                <div style={{ ...S.signinDetails, position: 'relative' }}>
                    <h4 style={{ margin: '0 0 10px' }}>Sign In details</h4>
                    <div style={S.signinLabel}>
                        <span>Username</span>
                        <span style={{ fontWeight: 'bold' }}>omphilestudent@gmail.com</span>
                    </div>
                    <div style={S.signinLabel}>
                        <span>Cellphone</span>
                        <span style={{ fontWeight: 'bold' }}>+27 60 291 0591</span>
                    </div>
                    <div style={S.signinLabel}>
                        <span>Password</span>
                        <span style={{ fontWeight: 'bold' }}>***************</span>
                    </div>
                    <span style={S.updateBtn}>Update</span>
                </div>

                {/* Remote PIN */}
                <div style={S.remote}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span>Remote Pin</span>
                        <span style={{ fontWeight: 'bold' }}>****************</span>
                    </div>
                    <span style={{ color: '#00aeff', fontSize: '14px', cursor: 'pointer' }}>Update Remote Pin</span>
                </div>

                {/* Profile header */}
                <div style={S.profileHeader}>
                    <div style={S.circle}>Kc</div>
                    <div>
                        <p style={{ margin: 0, fontSize: '13px' }}>Always sign me in with this Profile</p>
                        <span style={{ fontWeight: 'bold' }}>Kodi Codes</span>
                    </div>
                    <div style={S.defaultPill}>Default profile</div>
                    <span className="material-icons-sharp" style={{ color: '#00aeff', cursor: 'pointer', marginLeft: 'auto' }}>more_vert</span>
                </div>

                {/* User details */}
                <div style={S.userDetails}>
                    <div style={S.userDetailsHeader}>User details</div>
                    <div style={S.detailRow}>
                        <span>Cellphone</span>
                        <span style={{ fontWeight: 'bold' }}>+27 60 291 0591</span>
                    </div>
                    <div style={S.detailRow}>
                        <span>Email</span>
                        <span style={{ fontWeight: 'bold' }}>omphilemohlala@capitecbank.co.za</span>
                    </div>
                </div>

                {/* Link business profiles */}
                <div style={S.linkAccount}>
                    <div style={S.linkAccountHeader}>Link business profiles</div>
                    <div style={S.linkAccountItem}>
                        <div style={S.smallCircle}>OM</div>
                        <div>
                            <div>Omphile</div>
                            <div style={{ fontWeight: 'bold' }}>Profile nickname</div>
                        </div>
                        <div style={S.defaultSmall}>Default</div>
                        <span className="material-icons-sharp" style={{ color: '#00aeff', cursor: 'pointer', marginLeft: '4px' }}>more_vert</span>
                    </div>
                    <div style={S.linkBusiness}>
                        <img src="/images/Link-profile.png" alt="" style={{ width: '25px', height: '25px' }} />
                        <span>Link Business Profile</span>
                    </div>
                </div>

            </div>
        </>
    );
}
