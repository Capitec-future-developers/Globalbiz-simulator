import { useState } from 'react';
import { Link } from 'react-router-dom';
import GlobalOneBottomNav from '../../components/GlobalOneBottomNav';

function YesNoToggle({ label, desc, defaultOn }) {
    const [on, setOn] = useState(defaultOn);
    return (
        <div className="go-toggle-row">
            <div className="go-toggle-info">
                <h4>{label}</h4>
                <p>{desc}</p>
            </div>
            <button
                className={'go-yn-toggle' + (on ? ' on' : '')}
                type="button"
                onClick={() => setOn(v => !v)}
            >
                {on ? <>YES<span className="go-yn-knob"></span></> : <><span className="go-yn-knob"></span>NO</>}
            </button>
        </div>
    );
}

export default function GlobalOneCards() {
    const [activeTab, setActiveTab] = useState('cards');

    return (
        <div className="go-screen">
            <div className="go-cards-tabbar">
                <Link to="/global-one/home" className="go-cards-back">
                    <span className="material-icons-sharp">arrow_back</span>
                </Link>
                <button className={'go-cards-tab' + (activeTab === 'cards' ? ' active' : '')} type="button" onClick={() => setActiveTab('cards')}>Cards</button>
                <button className={'go-cards-tab' + (activeTab === 'virtual' ? ' active' : '')} type="button" onClick={() => setActiveTab('virtual')}>Virtual</button>
            </div>

            <div className="go-body">
                {activeTab === 'virtual' ? (
                    <div className="go-virtual-body">
                        <div className="go-virtual-empty">
                            <h3>Add new virtual card</h3>
                            <p>Up to 5 virtual cards allowed</p>
                            <Link to="/global-one/virtual-card-new" className="go-virtual-add-card">
                                <span className="material-icons-sharp">add</span>
                                <span>Add new virtual card</span>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="go-cards-body">
                        <div className="go-card-visual">
                            <div className="go-card-active-badge">ACTIVE</div>
                            <div className="go-card-top-row">
                                <div className="go-card-type">Personal<b>debit</b></div>
                                <span className="material-icons-sharp" style={{ transform: 'rotate(90deg)' }}>wifi</span>
                            </div>
                            <div className="go-card-brand-row">
                                <span className="go-card-brand-name">CAPITEC</span>
                            </div>
                            <div className="go-card-holder-row">
                                <div>Mr O MOHLALA</div>
                                <div className="go-card-number">1726248885</div>
                                <div className="go-card-label">SAVINGS ACCOUNT NUMBER</div>
                            </div>
                            <div className="go-card-mastercard"><span></span><span></span></div>
                        </div>

                        <button className="go-card-detail-link" type="button">Show Card Details</button>

                        <div className="go-limit-banner">
                            <span className="go-limit-strip"></span>
                            <span>Your daily online limit is <b>R5 000</b></span>
                            <a href="#" onClick={e => e.preventDefault()}>Manage</a>
                        </div>

                        <YesNoToggle label="Freeze card" desc="Lost or misplaced your card? No transactions can be done while it's frozen. You can unfreeze anytime to get full use again – no need to replace your card." defaultOn={false} />
                        <YesNoToggle label="Online purchases" desc="Use your card to shop online" defaultOn={true} />
                        <YesNoToggle label="International transactions" desc="Use your card to make international transactions" defaultOn={true} />
                        <YesNoToggle label="Online betting" desc="Allow online betting transactions within South Africa" defaultOn={false} />
                    </div>
                )}
            </div>

            <GlobalOneBottomNav active="cards" />
        </div>
    );
}
