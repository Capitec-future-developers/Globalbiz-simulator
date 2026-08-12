import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    getCards,
    setCardFrozen,
    setCardInternational,
    setCardLimits,
    setCardStatus
} from '../hooks/useCardStore';
import Stub from './Stub';

const STATUS_LABEL = { all: 'All', active: 'Active', stopped: 'Stopped' };

function moneyInputValue(n) {
    return Number(n).toFixed(2);
}

export default function Cards() {
    const [cards, setCards] = useState(getCards);
    const [screen, setScreen] = useState('list'); // list | settings | limits | stop | addCard
    const [selectedId, setSelectedId] = useState(null);

    const [statusFilter, setStatusFilter] = useState('all');
    const [filterOpen, setFilterOpen] = useState(false);
    const [pendingFilter, setPendingFilter] = useState('all');

    const [detailsVisibleMap, setDetailsVisibleMap] = useState({});
    const [applePayOpen, setApplePayOpen] = useState(false);
    const [limitsForm, setLimitsForm] = useState({ per: '0.00', daily: '0.00', monthly: '0.00' });

    const [toast, setToast] = useState(null);
    const toastTimer = useRef(null);
    const returnTimer = useRef(null);

    useEffect(() => {
        return () => {
            if (toastTimer.current) clearTimeout(toastTimer.current);
            if (returnTimer.current) clearTimeout(returnTimer.current);
        };
    }, []);

    function showToast(message, kind) {
        if (toastTimer.current) clearTimeout(toastTimer.current);
        setToast({ message, kind: kind || 'info' });
        toastTimer.current = setTimeout(() => setToast(null), 2600);
    }

    const selected = cards.find((c) => c.id === selectedId);
    const visibleCards = cards.filter((c) => statusFilter === 'all' || c.status === statusFilter);
    const isDetailsVisible = selected ? !!detailsVisibleMap[selected.id] : false;

    const Toast = toast ? (
        <div className={'cd-toast ' + toast.kind}>
            <span className="cd-toast-icon">
                <span className="material-icons-sharp">{toast.kind === 'error' ? 'priority_high' : 'check'}</span>
            </span>
            <span>{toast.message}</span>
        </div>
    ) : null;

    function openFilterSheet() {
        setPendingFilter(statusFilter);
        setFilterOpen(true);
    }

    function openCard(card) {
        setSelectedId(card.id);
        setScreen('settings');
    }

    function openLimits() {
        setLimitsForm({
            per: moneyInputValue(selected.limits.perTransaction),
            daily: moneyInputValue(selected.limits.daily),
            monthly: moneyInputValue(selected.limits.monthly)
        });
        setScreen('limits');
    }

    function toggleFreeze() {
        const updated = setCardFrozen(selected.id, !selected.frozen);
        setCards(updated);
        showToast(!selected.frozen ? 'Card frozen' : 'Card unfrozen', 'success');
    }

    function toggleInternational() {
        const updated = setCardInternational(selected.id, !selected.international);
        setCards(updated);
        showToast(!selected.international ? 'International transactions enabled' : 'International transactions disabled', 'success');
    }

    function copyCardNumber() {
        const text = selected.numberFull.replace(/\s/g, '');
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).catch(() => {});
        }
        showToast('Card number copied', 'success');
    }

    function updateLimits() {
        const per = parseFloat(limitsForm.per.replace(/[^0-9.]/g, '')) || 0;
        const daily = parseFloat(limitsForm.daily.replace(/[^0-9.]/g, '')) || 0;
        const monthly = parseFloat(limitsForm.monthly.replace(/[^0-9.]/g, '')) || 0;
        if (daily > monthly) {
            showToast('Daily limit cannot be greater than the monthly limit', 'error');
            return;
        }
        const updated = setCardLimits(selected.id, { perTransaction: per, daily, monthly });
        setCards(updated);
        showToast('Card limits updated', 'success');
        if (returnTimer.current) clearTimeout(returnTimer.current);
        returnTimer.current = setTimeout(() => setScreen('settings'), 900);
    }

    function confirmStop() {
        const updated = setCardStatus(selected.id, 'stopped');
        setCards(updated);
        showToast('Card stopped', 'success');
        if (returnTimer.current) clearTimeout(returnTimer.current);
        returnTimer.current = setTimeout(() => setScreen('list'), 900);
    }

    /* ---------------- add new card (stub) ---------------- */
    if (screen === 'addCard') {
        return <Stub title="Add new card" />;
    }

    /* ---------------- stop card ---------------- */
    if (screen === 'stop' && selected) {
        return (
            <div className="cd-screen">
                <div className="cd-topbar">
                    <button type="button" onClick={() => setScreen('settings')}><span className="material-icons-sharp">arrow_back</span></button>
                    <h2>Stop card</h2>
                </div>
                <p className="cd-warning-text">
                    {selected.type === 'Virtual'
                        ? 'You will need to create a new virtual card if you stop it.'
                        : 'You will need to order a replacement card if you stop it.'}
                </p>
                <div className="cd-card-summary-row">
                    <span className="cd-card-summary-icon material-icons-sharp">description</span>
                    <div className="cd-card-summary-info">
                        <span className="cd-card-row-number">{selected.numberMasked}</span>
                        <span className="cd-card-row-sub">{selected.type} {selected.kind === 'debit' ? 'Debit' : selected.kind} Card</span>
                    </div>
                </div>
                <button className="cd-secondary-btn" type="button" onClick={confirmStop}>Stop card</button>
                {Toast}
            </div>
        );
    }

    /* ---------------- card limits ---------------- */
    if (screen === 'limits' && selected) {
        return (
            <div className="cd-screen">
                <div className="cd-topbar">
                    <button type="button" onClick={() => setScreen('settings')}><span className="material-icons-sharp">arrow_back</span></button>
                    <h2>Card limits</h2>
                </div>
                <div className="cd-note-banner">
                    <span className="cd-note-icon material-icons-sharp">info</span>
                    <p><b>Note:</b> Remember that the daily card limits cannot be greater than the monthly limits.</p>
                </div>
                <div className="cd-limits-card">
                    <h3>Online Card Limits</h3>
                    <div className="cd-limit-field">
                        <label>Per-transaction limit</label>
                        <div className="cd-limit-input-wrap">
                            <span>R</span>
                            <input
                                type="text"
                                inputMode="decimal"
                                value={limitsForm.per}
                                onChange={(e) => setLimitsForm((f) => ({ ...f, per: e.target.value }))}
                            />
                        </div>
                        <p className="cd-limit-hint">Max R250 000.00</p>
                    </div>
                    <div className="cd-limit-field">
                        <label>Daily limit</label>
                        <div className="cd-limit-input-wrap">
                            <span>R</span>
                            <input
                                type="text"
                                inputMode="decimal"
                                value={limitsForm.daily}
                                onChange={(e) => setLimitsForm((f) => ({ ...f, daily: e.target.value }))}
                            />
                        </div>
                        <p className="cd-limit-hint">Max R250 000.00</p>
                    </div>
                    <div className="cd-limit-field">
                        <label>Monthly limit</label>
                        <div className="cd-limit-input-wrap">
                            <span>R</span>
                            <input
                                type="text"
                                inputMode="decimal"
                                value={limitsForm.monthly}
                                onChange={(e) => setLimitsForm((f) => ({ ...f, monthly: e.target.value }))}
                            />
                        </div>
                        <p className="cd-limit-hint">Max R1 000 000.00</p>
                    </div>
                </div>
                <div className="cd-sticky-footer">
                    <button className="cd-primary-btn" type="button" onClick={updateLimits}>Update limits</button>
                </div>
                {Toast}
            </div>
        );
    }

    /* ---------------- card settings ---------------- */
    if (screen === 'settings' && selected) {
        return (
            <div className="cd-screen">
                <div className="cd-topbar">
                    <button type="button" onClick={() => setScreen('list')}><span className="material-icons-sharp">arrow_back</span></button>
                    <h2>Card settings</h2>
                </div>

                {isDetailsVisible ? (
                    <div className="cd-card-visual">
                        <div className="cd-card-detail-security">{selected.securityCode}</div>
                        <div className="cd-card-detail-label">SECURITY CODE</div>
                        <div className="cd-card-detail-number">{selected.numberFull}</div>
                        <div className="cd-card-detail-expiry">
                            {selected.validThru}
                            <div style={{ fontSize: '0.7rem', fontWeight: 600, opacity: 0.8 }}>VALID THRU</div>
                        </div>
                    </div>
                ) : (
                    <div className="cd-card-visual">
                        <div className="cd-card-visual-badge">25<span>years</span></div>
                        <div className="cd-card-brand">CAPITEC</div>
                        <div className="cd-card-subtitle">Business {selected.type.toLowerCase()} {selected.kind}</div>
                        <div className="cd-card-holder-block">{selected.holder}<br />{selected.bank}<br />{selected.numberMasked}</div>
                        <div className="cd-card-visa">VISA</div>
                    </div>
                )}

                <div className="cd-center">
                    <span className={'cd-status-badge' + (selected.status === 'stopped' ? ' stopped' : '')}>
                        {selected.status === 'stopped' ? 'Stopped' : 'Active'}
                    </span>
                </div>
                <div className="cd-center">
                    <button
                        className="cd-link-btn"
                        type="button"
                        onClick={() => setDetailsVisibleMap((m) => ({ ...m, [selected.id]: !m[selected.id] }))}
                    >
                        <span className="material-icons-sharp">{isDetailsVisible ? 'visibility_off' : 'visibility'}</span>
                        {isDetailsVisible ? 'Hide card details' : 'Show card details'}
                    </button>
                </div>
                <div className="cd-center">
                    <button className="cd-link-btn" type="button" onClick={copyCardNumber}>Copy card number</button>
                </div>

                <div className="cd-settings-list">
                    <button className="cd-settings-row" type="button" onClick={() => setScreen('stop')}>
                        <span className="material-icons-sharp">no_cell</span>
                        <span className="cd-row-label">Stop card</span>
                        <span className="material-icons-sharp">chevron_right</span>
                    </button>
                    <button className="cd-settings-row" type="button" onClick={openLimits}>
                        <span className="material-icons-sharp">description</span>
                        <span className="cd-row-label">Card limits</span>
                        <span className="material-icons-sharp">chevron_right</span>
                    </button>
                </div>

                <div className="cd-toggle-card">
                    <div>
                        <div className="cd-toggle-title">Freeze card</div>
                        <div className="cd-toggle-desc">All transactions will be blocked until you unfreeze the card. You don’t have to replace your card.</div>
                    </div>
                    <button className={'cd-toggle-switch' + (selected.frozen ? ' on' : '')} type="button" onClick={toggleFreeze}>
                        <span className="cd-toggle-knob material-icons-sharp">{selected.frozen ? 'check' : 'close'}</span>
                    </button>
                </div>
                <div className="cd-toggle-card">
                    <div>
                        <div className="cd-toggle-title">International transactions</div>
                        <div className="cd-toggle-desc">Use your card to make international transactions.</div>
                    </div>
                    <button className={'cd-toggle-switch' + (selected.international ? ' on' : '')} type="button" onClick={toggleInternational}>
                        <span className="cd-toggle-knob material-icons-sharp">{selected.international ? 'check' : 'close'}</span>
                    </button>
                </div>
                <button className="cd-wallet-row" type="button" onClick={() => setApplePayOpen(true)}>
                    <span className="cd-wallet-badge"> Pay</span>
                    <span className="cd-wallet-label">Add to Apple Wallet</span>
                    <span className="material-icons-sharp">chevron_right</span>
                </button>

                {applePayOpen && (
                    <div className="cd-modal">
                        <button className="cd-modal-close" type="button" onClick={() => setApplePayOpen(false)}>
                            <span className="material-icons-sharp">close</span>
                        </button>
                        <h2 className="cd-modal-title">Add Card to Apple Pay</h2>
                        <p className="cd-modal-subtitle">“{selected.holder}” will be available in Wallet.</p>
                        <div className="cd-modal-field-group">
                            <input type="text" placeholder="Name" />
                            <input type="text" placeholder="Card Number" />
                        </div>
                        <div className="cd-modal-disclosure">
                            <span className="material-icons-sharp">handshake</span>
                            <p>
                                Card-related information, location, and information about device settings and use patterns may be sent to Apple and may be used together with account information to provide assessments to your card issuer or payment network to set up Apple Pay and prevent transaction fraud.{' '}
                                <a href="#" onClick={(e) => e.preventDefault()}>See how your data is managed…</a>
                            </p>
                        </div>
                        <button
                            className="cd-primary-btn"
                            type="button"
                            onClick={() => {
                                setApplePayOpen(false);
                                showToast('Failed to add card to Apple Wallet', 'error');
                            }}
                        >
                            Continue
                        </button>
                    </div>
                )}

                {Toast}
            </div>
        );
    }

    /* ---------------- card list ---------------- */
    return (
        <div className="cd-screen">
            <div className="cd-topbar">
                <Link to="/"><span className="material-icons-sharp">arrow_back</span></Link>
                <h2>Cards</h2>
            </div>
            <div className="cd-search-row">
                <input type="text" placeholder="Filter cards" readOnly onClick={openFilterSheet} value="" />
                <button type="button" onClick={openFilterSheet}><span className="material-icons-sharp">tune</span></button>
            </div>
            <div className="cd-list-heading-row">
                <h3>{STATUS_LABEL[statusFilter]}</h3>
                <button className="cd-add-new-link" type="button" onClick={() => setScreen('addCard')}>Add new</button>
            </div>
            {visibleCards.length ? (
                <div className="cd-card-list">
                    {visibleCards.map((c) => (
                        <button key={c.id} className="cd-card-row" type="button" onClick={() => openCard(c)}>
                            <div className={'cd-card-chip' + (c.type === 'Virtual' ? ' cd-chip-virtual' : '')}><span>VISA</span></div>
                            <div className="cd-card-row-info">
                                <div className="cd-card-row-number">{c.numberMasked}</div>
                                <div className="cd-card-row-sub">{c.bank}</div>
                                <div className="cd-card-row-sub">{c.holder}</div>
                            </div>
                            <div className="cd-card-row-type">{c.type}</div>
                        </button>
                    ))}
                </div>
            ) : (
                <p className="cd-empty-note">No cards match this filter.</p>
            )}

            {filterOpen && (
                <>
                    <div className="cd-sheet-overlay" onClick={() => setFilterOpen(false)} />
                    <div className="cd-sheet">
                        <div className="cd-sheet-header">
                            <h3>Filter Cards</h3>
                            <button type="button" onClick={() => setFilterOpen(false)}><span className="material-icons-sharp">close</span></button>
                        </div>
                        <div className="cd-sheet-row">
                            <h4>Card status</h4>
                            <button className="cd-clear-link" type="button" onClick={() => setPendingFilter('all')}>Clear</button>
                        </div>
                        <div className="cd-status-pills">
                            {['all', 'active', 'stopped'].map((s) => (
                                <button
                                    key={s}
                                    type="button"
                                    className={'cd-status-pill' + (pendingFilter === s ? ' selected' : '')}
                                    onClick={() => setPendingFilter(s)}
                                >
                                    {pendingFilter === s && <span className="material-icons-sharp" style={{ fontSize: 16 }}>check</span>}
                                    {STATUS_LABEL[s]}
                                </button>
                            ))}
                        </div>
                        <button
                            className="cd-sheet-primary-btn"
                            type="button"
                            onClick={() => {
                                setStatusFilter(pendingFilter);
                                setFilterOpen(false);
                            }}
                        >
                            Apply filters
                        </button>
                    </div>
                </>
            )}

            {Toast}
        </div>
    );
}
