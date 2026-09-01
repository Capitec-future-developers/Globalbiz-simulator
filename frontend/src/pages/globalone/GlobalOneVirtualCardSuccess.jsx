import { Link } from 'react-router-dom';

export default function GlobalOneVirtualCardSuccess() {
    return (
        <div className="go-screen" style={{ background: 'white' }}>
            <div className="go-vc-success-body">
                <div className="go-vc-success-icon">
                    <span className="material-icons-sharp">check</span>
                </div>
                <h2>Successful</h2>
                <p>You can now use your virtual card.</p>
            </div>
            <div className="go-vc-success-footer">
                <button type="button" className="go-vc-wallet-btn" onClick={() => {}}>Add to G Pay</button>
                <button type="button" className="go-vc-wallet-btn" onClick={() => {}}>Add to SAMSUNG Wallet</button>
                <Link to="/global-one/cards">
                    <button type="button" className="go-vc-done-btn">Done</button>
                </Link>
            </div>
        </div>
    );
}
