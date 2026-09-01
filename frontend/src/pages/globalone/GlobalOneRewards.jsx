import { Link } from 'react-router-dom';
import GlobalOneBottomNav from '../../components/GlobalOneBottomNav';

const PARTNERS = [
    { art: "Dis-Chem\nBetter Rewards", bg: '#2e7d32', isNew: true, title: "Get 15% off", desc: "Save every time you shop at Dis-Chem" },
    { art: "Dragonpass", bg: '#0f1f3d', isNew: true, title: "Free lounge access", desc: "Airport lounge and dining benefits." },
    { art: "Cashbuild", bg: '#0d47a1', isNew: false, title: "1% cash back", desc: "Pay with your card in-store or online." },
    { art: "getsmarter with edX", bg: '#0f1f3d', isNew: false, title: "R4 000 off", desc: "Register for online courses on our app." },
];

export default function GlobalOneRewards() {
    return (
        <div className="go-screen">
            <div className="go-rewards-header">
                <Link to="/global-one/home"><span className="material-icons-sharp">arrow_back</span></Link>
                <h2>Rewards</h2>
            </div>
            <div className="go-body">
                <div className="go-rewards-body">
                    <a href="#" className="go-live-better-card" onClick={e => e.preventDefault()}>
                        <span className="go-live-better-icon material-icons-sharp">eco</span>
                        <div className="go-live-better-info">
                            <div className="go-lb-title">Live Better Savings</div>
                            <div className="go-lb-sub">Total available</div>
                        </div>
                        <div className="go-live-better-amount">R0.00</div>
                    </a>

                    <h4 className="go-rewards-section-label">Deals for you</h4>
                    <div className="go-deal-card">
                        <div className="go-deal-art">Rewards just<br />got better</div>
                        <div className="go-deal-footer">
                            <p>Offers from brands you love</p>
                            <a href="#" onClick={e => e.preventDefault()}>View rewards</a>
                        </div>
                    </div>

                    <div className="go-partners-heading-row">
                        <h4>Most-loved partners</h4>
                        <a href="#" onClick={e => e.preventDefault()}>View all <span className="material-icons-sharp" style={{ fontSize: 16 }}>chevron_right</span></a>
                    </div>
                    <div className="go-partner-carousel">
                        {PARTNERS.map((p, i) => (
                            <div key={i} className="go-partner-tile">
                                <div className="go-partner-tile-art" style={{ background: p.bg }}>
                                    {p.isNew && <span className="go-partner-new-badge">NEW</span>}
                                    {p.art}
                                </div>
                                <div className="go-partner-tile-body">
                                    <h5>{p.title}</h5>
                                    <p>{p.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <GlobalOneBottomNav active="" />
        </div>
    );
}
