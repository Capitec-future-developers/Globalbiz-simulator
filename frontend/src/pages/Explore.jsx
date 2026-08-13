import { Link } from 'react-router-dom';

const CARDS = [
    { to: '/explore/credit', title: 'Credit', desc: 'Credit Card Facility & Loan', icon: 'autorenew', iconClass: 'nl-explore-icon-credit', titleClass: 'nl-explore-title-credit' },
    { to: '/explore/card-machines', title: 'Card Machines', desc: 'Print & Pro card machines', icon: 'point_of_sale', iconClass: 'nl-explore-icon-cardmachine', titleClass: 'nl-explore-title-cardmachine' },
    { to: '/explore/savings', title: 'Save', desc: 'Business Flexible Savings Account and 32-Day Notice Account', icon: 'trending_up', iconClass: 'nl-explore-icon-save', titleClass: 'nl-explore-title-save' }
];

export default function Explore() {
    return (
        <div className="nl-explore-screen new-look-only" style={{ display: 'block' }}>
            <div className="nl-explore-topbar">
                <Link to="/" className="nl-back"><span className="material-icons-sharp">arrow_back</span></Link>
                <h2>Products and services</h2>
            </div>
            <h3 className="nl-explore-heading">Business solutions</h3>
            <p className="nl-explore-desc">Grow your business with our simplified solutions.</p>
            {CARDS.map((card) => (
                <Link key={card.to} to={card.to} className="nl-explore-card">
                    <span className={`nl-explore-card-icon ${card.iconClass} material-icons-sharp`}>{card.icon}</span>
                    <div className="nl-explore-card-body">
                        <div className={`nl-explore-card-title ${card.titleClass}`}>{card.title}</div>
                        <div className="nl-explore-card-desc">{card.desc}</div>
                    </div>
                    <span className="material-icons-sharp nl-explore-card-chevron">chevron_right</span>
                </Link>
            ))}
        </div>
    );
}
