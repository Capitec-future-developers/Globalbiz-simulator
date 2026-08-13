import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import useScopedStylesheets from '../../hooks/useScopedStylesheets';
import { getCards, setCardFrozen } from '../../hooks/useCardStore';
import { ACCOUNT_INFO } from '../../data/accounts';

const STYLESHEETS = [
    '/legacy-styles/cards.css',
    '/legacy-styles/Chatbotcomputer.css',
];

function maskedFull(card) {
    const digits = card.numberFull.replace(/\s/g, '');
    return digits.slice(0, 4) + ' **** **** ' + digits.slice(-4);
}

// Faithful React port of Computer/"view card details.html"'s content
// (everything below the shared header/sidebar, which ComputerShell owns).
// Reads the card via a ?cardId= query param set by ComputerCards.jsx's
// "View Card Details" links, and renders the shared useCardStore's data so
// freezing the card here is reflected on the Cards page and mobile App too.
export default function ComputerViewCardDetails() {
    useScopedStylesheets(STYLESHEETS);
    const [searchParams] = useSearchParams();
    const [cards, setCards] = useState(getCards);
    const cardId = searchParams.get('cardId');
    const card = cards.find((c) => c.id === cardId) || cards[0];

    if (!card) return null;

    function toggleFreeze() {
        const updated = setCardFrozen(card.id, !card.frozen);
        setCards(updated);
    }

    return (
        <div className="card-details" style={{ marginTop: 100 }}>
            <div className="header-card">
                <Link to="/online-banking/cards" className="back" style={{ position: 'absolute', fontSize: 25, left: 10, top: 20, color: '#1e88e5' }}>
                    <span className="material-icons-sharp">arrow_back</span>
                </Link>
                <h2 style={{ position: 'absolute', top: 20, left: 40 }}>Card Details</h2>
            </div>
            <div className="divider"></div>
            <div className="container">
                <div className="card-section">
                    <img
                        src={card.type === 'Virtual' ? '/images/virtuale.png' : '/images/card.png'}
                        alt={card.type + ' Card'}
                        className="card-img"
                        style={{ height: 250, width: 150, gap: 10 }}
                    />
                </div>

                <div className="details-section">
                    <div className="info"><strong>Company name:</strong> {card.bank}</div>
                    <div className="info"><span className="status">{card.status === 'stopped' ? 'Stopped' : (card.frozen ? 'Frozen' : 'Active')}</span></div>
                    <div className="info"><strong>{card.type} Card:</strong> {maskedFull(card)}</div>
                    <div className="info"><strong>Account number:</strong> {ACCOUNT_INFO.transactional.number}</div>
                    <div className="info"><strong>Card expiry date:</strong> {card.validThru}</div>
                </div>

                <div className="actions">
                    <a href="#" className="action-btn" onClick={(e) => { e.preventDefault(); toggleFreeze(); }}>
                        <span className="material-icons-sharp"><img src="/images/stop-card-action.svg" alt="" /></span>
                        {card.frozen ? 'Unfreeze Card' : 'Pause or Stop Card'}
                    </a>
                    <Link to="/online-banking/in-progress" className="action-btn">
                        <span className="material-icons-sharp"><img src="/images/view-action.svg" alt="" /></span> Update Card Limits
                    </Link>
                    <Link to="/online-banking/in-progress" className="action-btn">
                        <span className="material-icons-sharp"><img src="/images/icon_pin.svg" alt="" /></span> Change Card PIN
                    </Link>
                    <Link to="/online-banking/in-progress" className="action-btn">
                        <span className="material-icons-sharp"><img src="/images/contactless-action.svg" alt="" /></span> Tap to Pay
                    </Link>
                    <Link to="/online-banking/view-card-details" className="action-btn" onClick={(e) => e.preventDefault()}>
                        <span className="material-icons-sharp"><img src="/images/cards-action.svg" alt="" /></span> View Card Details
                    </Link>
                    <Link to="/online-banking/in-progress" className="action-btn">
                        <span className="material-icons-sharp"><img src="/images/identity-action.svg" alt="" /></span> International Travel
                    </Link>
                </div>
            </div>
        </div>
    );
}
