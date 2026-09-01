import { Link } from 'react-router-dom';
import GlobalOneBottomNav from '../../components/GlobalOneBottomNav';

export default function GlobalOneHome() {
    return (
        <div className="go-screen">
            <div className="go-header">
                <Link to="/global-one/profile" className="go-header-icon" aria-label="Profile">
                    <span className="material-icons-sharp">account_circle</span>
                </Link>
                <div className="go-header-title">GlobalOne</div>
                <Link to="/support" className="go-header-icon" aria-label="Call">
                    <span className="material-icons-sharp">call</span>
                </Link>
            </div>

            <div className="go-body go-home-body">
                <div className="go-dash-row">
                    <h3>My dashboard</h3>
                    <a href="#" onClick={e => e.preventDefault()}>Edit <span className="material-icons-sharp" style={{ fontSize: 18 }}>chevron_right</span></a>
                </div>

                <Link to="/global-one/transact" className="go-dash-card">
                    <span className="go-dash-icon go-icon-main">
                        <img src="/images/transact-white.svg" className="go-dash-icon-img" alt="" />
                    </span>
                    <div className="go-dash-info">
                        <div className="go-dash-title go-title-main">Main Account</div>
                        <div className="go-dash-sub">Available balance</div>
                    </div>
                    <div className="go-dash-amount">R14.00</div>
                </Link>

                <a href="#" className="go-dash-card" onClick={e => e.preventDefault()}>
                    <span className="go-dash-icon go-icon-savings">
                        <img src="/images/save-white.svg" className="go-dash-icon-img" alt="" />
                    </span>
                    <div className="go-dash-info">
                        <div className="go-dash-title go-title-savings">Savings Plans</div>
                        <div className="go-dash-sub">Total saved</div>
                    </div>
                    <div className="go-dash-amount">R565.56</div>
                </a>

                <Link to="/global-one/insure" className="go-dash-card">
                    <span className="go-dash-icon go-icon-insure">
                        <span className="material-icons-sharp">shield</span>
                    </span>
                    <div className="go-dash-info">
                        <div className="go-dash-title go-title-insure">Insure</div>
                        <div className="go-dash-sub">Cover for you and your family</div>
                    </div>
                </Link>

                <Link to="/explore" className="go-explore-card">
                    <span className="go-explore-icon material-icons-sharp">add</span>
                    <div className="go-explore-body">
                        <h4>Explore products and benefits</h4>
                        <p>Find what suits your goals</p>
                    </div>
                    <span className="material-icons-sharp" style={{ color: 'var(--go-primary)' }}>chevron_right</span>
                </Link>

                <h3 className="go-section-heading">Live Better</h3>
                <Link to="/global-one/rewards" className="go-rewards-teaser">
                    <div className="go-rewards-teaser-art"></div>
                    <div className="go-rewards-teaser-info">Rewards<span>Available balance</span></div>
                    <div className="go-rewards-teaser-amount">R0.00</div>
                </Link>

                <h3 className="go-section-heading">Partners</h3>
                <a href="#" className="go-partner-card" onClick={e => e.preventDefault()}>
                    <span className="go-partner-icon material-icons-sharp" style={{ color: '#cc0033' }}>show_chart</span>
                    <div>
                        <h4>EasyEquities</h4>
                        <p>Investing made easy</p>
                    </div>
                </a>

                <div className="go-dash-row">
                    <h3 className="go-section-heading" style={{ margin: 0 }}>Favourites</h3>
                    <a href="#" onClick={e => e.preventDefault()}>Edit <span className="material-icons-sharp" style={{ fontSize: 18 }}>chevron_right</span></a>
                </div>
                <div className="go-fav-grid">
                    <a href="#" className="go-fav-card" onClick={e => e.preventDefault()}><span className="material-icons-sharp">hub</span>PayShap</a>
                    <a href="#" className="go-fav-card" onClick={e => e.preventDefault()}><span className="material-icons-sharp">smartphone</span>Buy airtime and data</a>
                    <a href="#" className="go-fav-card" onClick={e => e.preventDefault()}><span className="material-icons-sharp">payments</span>Send cash</a>
                    <Link to="/global-one/transact" className="go-fav-card"><span className="material-icons-sharp">swap_horiz</span>Transfer money</Link>
                    <a href="#" className="go-fav-card" onClick={e => e.preventDefault()}><span className="material-icons-sharp">qr_code_2</span>Scan to pay</a>
                    <Link to="/global-one/transact" className="go-fav-card"><span className="material-icons-sharp">group</span>Pay beneficiary</Link>
                </div>
            </div>

            <GlobalOneBottomNav active="home" />
        </div>
    );
}
