import { useState } from 'react';
import { Link } from 'react-router-dom';
import useScopedStylesheets from '../../hooks/useScopedStylesheets';
import { getCards } from '../../hooks/useCardStore';
import Stub from '../Stub';

const STYLESHEETS = [
    '/legacy-styles/cards.css',
    '/legacy-styles/Chatbotcomputer.css',
];

function maskedFull(card) {
    const digits = card.numberFull.replace(/\s/g, '');
    return digits.slice(0, 4) + '**** ****' + digits.slice(-4);
}

// Faithful React port of Computer/Cards.html's content (everything below the
// shared header/sidebar, which ComputerShell owns). Renders the shared
// useCardStore's cards (same data the mobile App's Cards screen uses) instead
// of the source HTML's two hard-coded card blocks, so status/details here
// stay in sync with the rest of the app.
export default function ComputerCards() {
    useScopedStylesheets(STYLESHEETS);
    const [cards] = useState(getCards);
    const [openId, setOpenId] = useState(null);
    const [addCardOpen, setAddCardOpen] = useState(false);
    const [cardTypeChoice, setCardTypeChoice] = useState('');
    const [screen, setScreen] = useState('list'); // list | addCard

    function toggleDropdown(id) {
        setOpenId((prev) => (prev === id ? null : id));
    }

    function continueAddCard() {
        if (!cardTypeChoice) {
            alert('Please choose a card type');
            return;
        }
        setAddCardOpen(false);
        setScreen('addCard');
    }

    if (screen === 'addCard') {
        return <Stub title="Add new card" />;
    }

    return (
        <>
            <div className="notice" style={{ left: 20, top: 50, position: 'absolute', color: 'black' }}>
                <h1>Cards</h1>
            </div>
            <br />
            <br />

            <div className="right-bottom" id="Cards-Content">
                <button className="btn" type="button" onClick={() => { setCardTypeChoice(''); setAddCardOpen(true); }}>Add New Card</button>
            </div>

            {addCardOpen && (
                <div className="popupoverlay" id="addCardPopup" style={{ display: 'flex' }}>
                    <div className="add-card-popup">
                        <div className="header">Add New Card</div>

                        <div className="sub-header">
                            <span className="material-icons-sharp profile-icon">account_circle</span>
                            Choose Card Type
                        </div>
                        <div className="blue-separator"></div>

                        <div className="card-options">
                            <div className="card-box">
                                <img src="/images/card.png" alt="Physical Card" className="card-image" />
                                <div className="separator-box"></div>
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="cardType"
                                        value="physical"
                                        checked={cardTypeChoice === 'physical'}
                                        onChange={() => setCardTypeChoice('physical')}
                                    />
                                    New Physical Card
                                </label>
                            </div>

                            <div className="card-box">
                                <img src="/images/virtuale.png" alt="Virtual Card" className="card-image" />
                                <div className="separator-box"></div>
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="cardType"
                                        value="virtual"
                                        checked={cardTypeChoice === 'virtual'}
                                        onChange={() => setCardTypeChoice('virtual')}
                                    />
                                    New Virtual Card
                                </label>
                            </div>
                        </div>

                        <div className="popup-buttons">
                            <button id="cancelAddCard" className="btn-cancel" type="button" onClick={() => setAddCardOpen(false)}>Cancel</button>
                            <button id="continueAddCard" className="btn-continue" type="button" onClick={continueAddCard}>Continue</button>
                        </div>
                    </div>
                </div>
            )}

            <div className="main-content">
                {cards.map((card) => {
                    const isVirtual = card.type === 'Virtual';
                    const dropdownId = card.id + '-dropdown';
                    return (
                        <div key={card.id}>
                            <div className={isVirtual ? 'virtual-card' : 'card'}>
                                <div className="lins">
                                    <span className="material-icons-sharp">
                                        <img
                                            src={isVirtual ? '/images/transact-white.svg' : '/images/transact.svg'}
                                            alt=""
                                            style={isVirtual ? { filter: 'brightness(0) invert(50%) contrast(80%)' } : undefined}
                                        />
                                    </span>
                                </div>
                                <h1 className="h1">{card.type}{!isVirtual ? '' : ' Card'}</h1>
                                <div className="open" onClick={() => toggleDropdown(card.id)}>
                                    <span className="material-icons-sharp"><img src="/images/more-chevron.svg" alt="" /></span>
                                </div>
                            </div>

                            {openId === card.id && (
                                <div className="dropdown-content show" id={dropdownId} style={{ display: 'block' }}>
                                    <img
                                        src={isVirtual ? '/images/virtuale.png' : '/images/card.png'}
                                        alt={card.type + ' Card'}
                                        className="card-img"
                                        style={{ height: 100, width: 100, gap: 10 }}
                                    />
                                    <div className="card-info" style={{ display: 'flex', flexDirection: 'column', right: 10 }}>
                                        <p>{card.bank}</p>
                                        <p style={{ alignItems: 'flex-end' }}>{maskedFull(card)}</p>
                                    </div>
                                    <div className="separator"></div>
                                    <div className="card-info">
                                        <p>Card expiry date</p>
                                        <p>{card.validThru}</p>
                                    </div>
                                    <div className="status">{card.status === 'stopped' ? 'Stopped' : (card.frozen ? 'Frozen' : 'Active')}</div>
                                    <div className="separator"></div>
                                    <Link to={`/online-banking/view-card-details?cardId=${card.id}`} className="view-details-btn">View Card Details</Link>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </>
    );
}
