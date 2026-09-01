import { Link } from 'react-router-dom';
import ChatbotWidget from '../components/ChatbotWidget';

const S = {
    save: {
        position: 'relative',
        display: 'flex',
        left: '-15px',
        flexDirection: 'row',
        top: '-10px',
        border: '1px solid #ddd',
        borderRadius: '2px',
        backgroundColor: '#FFFFFF',
        height: '70px',
        width: '120%',
        gap: '10px',
        cursor: 'pointer',
    },
    headers: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
    },
    yoh: {
        position: 'relative',
        display: 'flex',
        top: '-35px',
        right: '-140px',
    },
};

export default function AppSars() {
    return (
        <>
            <ChatbotWidget />

            <div className="head">
                <Link to="/home2" className="arrow" style={{ textDecoration: 'none' }}>
                    <span className="material-icons-sharp">arrow_back</span>
                </Link>
                <div className="header" style={{ fontSize: '0.9rem' }}>Products &amp; Services</div>
                <span></span>
            </div>

            <div className="content" id="mainContent">
                <div style={S.headers}>
                    <br />
                    <span>User ID</span>
                    <span style={{ fontWeight: 'bold', fontSize: '0.8rem' }}>52376377</span>
                    <span style={S.yoh}>Profile ID</span>
                    <span style={{ ...S.yoh, fontWeight: 'bold', fontSize: '0.8rem' }}>SARSEF123456543</span>
                </div>

                <div>
                    <div style={S.save}>
                        <div style={{ position: 'relative', left: '10px' }}></div>
                        <p style={{ whiteSpace: 'nowrap', fontWeight: 500, fontSize: '0.7rem', position: 'relative', top: '35px', left: '1px' }}>
                            Payments To Action
                        </p>
                        <span className="material-icons-sharp" style={{ position: 'relative', color: '#00aeff', right: '-140px', bottom: '-20px' }}>chevron_right</span>
                    </div>

                    <div style={{ ...S.save, top: '-10px' }}>
                        <div style={{ position: 'relative', left: '5px' }}></div>
                        <p style={{ whiteSpace: 'nowrap', fontWeight: 500, fontSize: '0.7rem', position: 'relative', top: '35px', left: '1px' }}>
                            Payments History
                        </p>
                        <span className="material-icons-sharp" style={{ position: 'relative', color: '#00aeff', right: '-150px', bottom: '-20px' }}>chevron_right</span>
                    </div>
                </div>
            </div>
        </>
    );
}
