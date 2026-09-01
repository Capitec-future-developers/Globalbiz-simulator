import { Link } from 'react-router-dom';
import GlobalOneBottomNav from '../../components/GlobalOneBottomNav';

const OPTIONS = [
    { section: 'Funeral plan', title: 'Funeral costs', desc: 'For you and up to 21 family members.', color: '#6a1b9a', badgeBg: '#6a1b9a', badgeIcon: 'favorite' },
    { section: 'Life cover', title: 'Monthly income', desc: 'Income for 24 months.', color: '#d81b60', badgeBg: '#d81b60', badgeIcon: 'autorenew' },
    { section: null, title: 'Lump sum', desc: 'A once-off payment.', color: '#8e24aa', badgeBg: '#8e24aa', badgeIcon: 'volunteer_activism' },
    { section: null, title: "Children's needs", desc: 'Education, clothing, transport, etc', color: '#00897b', badgeBg: '#00897b', badgeIcon: 'school' },
];

export default function GlobalOneInsure() {
    return (
        <div className="go-screen">
            <div className="go-insure-header">
                <div className="go-insure-header-row">
                    <Link to="/global-one/home"><span className="material-icons-sharp">arrow_back</span></Link>
                    <h2>Insure</h2>
                </div>
                <div className="go-insure-subheader">For you and your family</div>
            </div>
            <div className="go-body">
                <div className="go-insure-body">
                    <div className="go-insure-summary-card">
                        <div className="go-insure-icon">
                            <span className="material-icons-sharp">shield</span>
                            <span className="go-insure-badge" style={{ background: '#6a1b9a' }}>
                                <span className="material-icons-sharp">favorite</span>
                            </span>
                        </div>
                        <div>
                            <div className="go-insure-summary-title" style={{ color: '#6a1b9a' }}>Funeral Plan</div>
                            <div className="go-insure-summary-stats">
                                <span>Active policies<b>1</b></span>
                                <span style={{ borderLeft: '1px solid #e4e8f2', paddingLeft: 16 }}>Premium<b>R62.95 pm</b></span>
                            </div>
                        </div>
                    </div>

                    <h3 className="go-insure-question">When I pass away, Capitec should pay for:</h3>
                    <p className="go-insure-hint">(Pick as many as you want)</p>

                    {OPTIONS.map((opt, i) => (
                        <div key={i}>
                            {opt.section && <h4 className="go-insure-section-label">{opt.section}</h4>}
                            <div className="go-insure-option-card">
                                <div className="go-insure-icon">
                                    <span className="material-icons-sharp">shield</span>
                                    <span className="go-insure-badge" style={{ background: opt.badgeBg }}>
                                        <span className="material-icons-sharp">{opt.badgeIcon}</span>
                                    </span>
                                </div>
                                <div>
                                    <div className="go-insure-option-title" style={{ color: opt.color }}>{opt.title}</div>
                                    <div className="go-insure-option-desc">{opt.desc}</div>
                                    <a href="#" className="go-insure-learn-more" onClick={e => e.preventDefault()}>Learn More</a>
                                </div>
                                <div className="go-insure-checkbox">
                                    <span className="material-icons-sharp">check</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <GlobalOneBottomNav active="" />
        </div>
    );
}
