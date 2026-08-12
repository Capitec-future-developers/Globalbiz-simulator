import { Link } from 'react-router-dom';

export default function Stub({ title }) {
    return (
        <div style={{ padding: '45px 20px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: '100%', justifyContent: 'center', boxSizing: 'border-box' }}>
            <h2>{title}</h2>
            <p style={{ color: '#5f6b7a' }}>Not yet ported to the new stack.</p>
            <Link to="/" style={{ color: '#0096c7', fontWeight: 600 }}>Back to Home</Link>
        </div>
    );
}
