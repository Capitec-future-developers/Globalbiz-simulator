import { Link } from 'react-router-dom';

const CARD_OPTIONS = [
    { icon: '/images/stop-card-action.svg', label: 'Pause or stop card', action: 'pause-stop-card' },
    { icon: '/images/cards-action.svg', label: 'Update card limits', action: 'Update-card-limits' },
    { icon: '/images/icon_pin.svg', label: 'Change card Pin', action: 'change-pin' },
    { icon: '/images/contactless-action.svg', label: 'Tap to pay', action: 'tap-to-pay' },
];

export default function ViewCardDetail() {
    return (
        <div>
            <div className="head">
                <Link to="/cards" className="arrow">
                    <span className="material-icons-sharp">arrow_back</span>
                </Link>
                <div className="header" style={{ right: '-90px', fontSize: 20, top: -40 }}>Card Details</div>
            </div>

            <div className="content" id="mainContent">
                <div className="the-card">
                    <img className="the-card" src="/images/card.png" alt="card" />
                </div>
                <div className="statu">Active</div>
                <div className="show">
                    <span className="material-icons-sharp" style={{ position: 'absolute', left: -28, top: -2 }}>visibility_off</span>
                    Show card Details
                </div>
                <div className="card-table">
                    {CARD_OPTIONS.map((opt) => (
                        <div
                            key={opt.action}
                            className="card-table-options"
                            data-action={opt.action}
                            style={{ borderTop: '1px solid #dddddd' }}
                            onClick={() => {}}
                        >
                            <img src={opt.icon} alt="" />
                            {opt.label}
                            <span className="material-icons-sharp yeh" style={{ color: '#00aeff' }}>chevron_right</span>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}
