import { Link, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { getBalances, formatNlBalance } from '../hooks/useAccountStore';
import { ACCOUNT_INFO } from '../data/accounts';
import EmailStatementScreen from '../components/EmailStatementScreen';
import Stub from './Stub';

const CREDIT_MASKED_NUMBER = '4140 45•• •••• 3588';

function groupByMonth(transactions) {
    const groups = [];
    let lastMonth = null;
    transactions.forEach((tx) => {
        const monthYear = tx.date.split(' ').slice(1).join(' ');
        if (monthYear !== lastMonth) {
            groups.push({ monthYear, items: [] });
            lastMonth = monthYear;
        }
        groups[groups.length - 1].items.push(tx);
    });
    return groups;
}

export default function AccountDetails() {
    const { accId } = useParams();
    const [balances, setBalances] = useState(null);
    const [screen, setScreen] = useState('details');
    const [nickname, setNickname] = useState(ACCOUNT_INFO[accId]?.name || '');
    const [nicknameDraft, setNicknameDraft] = useState(ACCOUNT_INFO[accId]?.name || '');
    const [moreOpen, setMoreOpen] = useState(false);
    const [txTab, setTxTab] = useState('all');
    const [sheetOpen, setSheetOpen] = useState(false);
    const [infoOpen, setInfoOpen] = useState(false);
    const [datePillVisible, setDatePillVisible] = useState(true);
    const topbarRef = useRef(null);

    useEffect(() => {
        if (!moreOpen) return;
        function handleOutsideClick(e) {
            if (!topbarRef.current || !topbarRef.current.contains(e.target)) {
                setMoreOpen(false);
            }
        }
        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick);
    }, [moreOpen]);

    useEffect(() => {
        setBalances(getBalances());
        setNickname(ACCOUNT_INFO[accId]?.name || '');
        setNicknameDraft(ACCOUNT_INFO[accId]?.name || '');
        setScreen('details');
        setTxTab('all');
        setMoreOpen(false);
        setSheetOpen(false);
        setInfoOpen(false);
        setDatePillVisible(true);
    }, [accId]);

    if (!ACCOUNT_INFO[accId] || !balances) return null;

    const isCredit = accId === 'credit';
    const info = ACCOUNT_INFO[accId];
    const bal = balances[accId];
    const transactions = bal.transactions || [];
    const monthGroups = groupByMonth(transactions);

    if (screen === 'statement') {
        return (
            <EmailStatementScreen
                onBack={() => setScreen('details')}
                onSent={() => setScreen('statementSuccess')}
            />
        );
    }

    if (screen === 'statementSuccess') {
        return (
            <div className="nl-statement-success new-look-only" style={{ display: 'flex' }}>
                <div className="confirmation-icon success"><span className="material-icons-sharp">check_circle</span></div>
                <h2>Statement sent</h2>
                <p>Your statement has been emailed.</p>
                <button type="button" className="nl-statement-send-btn" style={{ maxWidth: 240 }} onClick={() => setScreen('details')}>Done</button>
            </div>
        );
    }

    if (screen === 'viewDetails') {
        return <Stub title="Account details" />;
    }

    function openSheet() {
        setMoreOpen(false);
        setSheetOpen(true);
    }

    function closeSheet() {
        setSheetOpen(false);
    }

    function saveNickname() {
        if (nicknameDraft.trim()) setNickname(nicknameDraft.trim());
        closeSheet();
    }

    return (
        <div className="nl-account-details new-look-only" style={{ display: 'flex' }}>
            <div className="nl-details-topbar" ref={topbarRef}>
                <Link to="/accounts" className="nl-back"><span className="material-icons-sharp">arrow_back</span></Link>
                <div className="nl-details-title">
                    <h2>{nickname}</h2>
                    <span className="nl-account-number">{isCredit ? CREDIT_MASKED_NUMBER : info.number}</span>
                </div>
                <button className="nl-more-btn" type="button" onClick={() => setMoreOpen((v) => !v)}>
                    <span className="material-icons-sharp">more_vert</span>
                </button>
                <div className={'nl-more-menu' + (moreOpen ? ' open' : '')}>
                    <button type="button" onClick={openSheet}>Edit account nickname</button>
                    <a href="#" onClick={(e) => { e.preventDefault(); setMoreOpen(false); setScreen('viewDetails'); }}>View account details</a>
                </div>
            </div>

            <div className={'nl-balance-card' + (isCredit ? ' credit' : '')} style={isCredit ? { background: 'linear-gradient(135deg, #7a0f16, #c0272d)' } : undefined}>
                <div className="nl-balance-decor"></div>
                <div className="nl-balance-content">
                    <div className="nl-balance-row">
                        <span className="nl-balance-label">Available</span>
                        <button className="nl-info-btn" type="button" onClick={() => setInfoOpen(true)}><span className="material-icons-sharp">info</span></button>
                    </div>
                    <div className="nl-balance-amount">{formatNlBalance(bal.available)}</div>
                    <div className="nl-balance-row" style={{ marginTop: 14 }}>
                        <span className="nl-balance-label">Balance</span>
                    </div>
                    <div className="nl-balance-amount">{formatNlBalance(bal.balance)}</div>
                </div>
            </div>

            <div className="nl-search-share-row">
                <div className="nl-transaction-search">
                    <span className="material-icons-sharp">search</span>
                    <input type="text" placeholder="Search transactions" />
                    <span className="material-icons-sharp">tune</span>
                </div>
                <button className="nl-share-btn" type="button" aria-label="Share statement" onClick={() => setScreen('statement')}>
                    <span className="material-icons-sharp">share</span>
                </button>
            </div>

            {datePillVisible && (
                <div className="nl-date-pill">
                    <span>{isCredit ? '6 Feb 2026 - 12 Aug 2026' : '30 Jan 2026 - 30 Jul 2026'}</span>
                    <span className="material-icons-sharp" onClick={() => setDatePillVisible(false)}>close</span>
                </div>
            )}

            <div className="nl-tx-tabs">
                <button className={'nl-tx-tab' + (txTab === 'all' ? ' active' : '')} type="button" onClick={() => setTxTab('all')}>All transactions</button>
                <button className={'nl-tx-tab' + (txTab === 'payments' ? ' active' : '')} type="button" onClick={() => setTxTab('payments')}>Payments</button>
            </div>

            {txTab === 'all' ? (
                transactions.length ? (
                    <div className="nl-tx-panel">
                        {monthGroups.map((group) => (
                            <div key={group.monthYear}>
                                <div className="nl-tx-month">{group.monthYear}</div>
                                {group.items.map((tx) => (
                                    <div className="nl-tx-row" key={tx.id}>
                                        <div>
                                            <div className="nl-tx-name">{tx.name}</div>
                                            <div className="nl-tx-date">{tx.date}</div>
                                        </div>
                                        <div className="nl-tx-amount" style={tx.amount < 0 ? { color: '#c0272d' } : undefined}>
                                            {tx.amount < 0 ? '-' : ''}{formatNlBalance(Math.abs(tx.amount))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="nl-tx-panel nl-tx-empty">
                        <div className="nl-empty-illustration"><span className="material-icons-sharp">receipt_long</span></div>
                        <p>No transactions yet.</p>
                    </div>
                )
            ) : (
                <div className="nl-tx-panel nl-tx-empty">
                    <div className="nl-empty-illustration"><span className="material-icons-sharp">receipt_long</span></div>
                    <p>No payments in this period.</p>
                </div>
            )}

            <div id="overlay-info" className={'overlay-info' + (infoOpen ? ' active' : '')} onClick={() => setInfoOpen(false)}></div>
            <div className={'popup-info-details' + (infoOpen ? ' active' : '')}>
                <div className="popup-info-details-content">
                    <div className="popup-info-details-header">
                        <span>Why the difference?</span>
                    </div>
                    <div className="popup-info-details-options">
                        {isCredit ? (
                            <span>Your <b>Available Balance</b> is how much you may still spend on this credit facility. The Balance is the amount you currently owe.</span>
                        ) : (
                            <span>
                                Your <b>Available Balance</b> is how much you may spend. The Balance could differ from the Available Balance because:
                                <br /><br />
                                • R150 is reserved in your account as this is the minimum account balance required to have a GlobalBiz account (Refer to our fees for further information).
                                <br />
                                • Your account might have transactions that are reserved on your card but have not yet cleared.
                                <br />
                                • In the case of a negative balance, you may have outstanding fees that must be settled before you can continue transacting.
                            </span>
                        )}
                        <span className="popup-info-details-option close-btn" onClick={() => setInfoOpen(false)}></span>
                    </div>
                </div>
            </div>

            <div className="nl-overlay new-look-only" style={{ display: sheetOpen ? 'block' : 'none' }} onClick={closeSheet}></div>
            <div className="nl-sheet new-look-only" style={{ display: sheetOpen ? 'block' : 'none' }}>
                <div className="nl-sheet-handle"></div>
                <div className="nl-sheet-header">
                    <h3>Edit account nickname</h3>
                    <button type="button" onClick={closeSheet}><span className="material-icons-sharp">close</span></button>
                </div>
                <label className="nl-sheet-label" htmlFor="nlNicknameInput">Account nickname</label>
                <input
                    type="text"
                    className="nl-sheet-input"
                    id="nlNicknameInput"
                    value={nicknameDraft}
                    onChange={(e) => setNicknameDraft(e.target.value)}
                />
                <button className="nl-sheet-save" type="button" onClick={saveNickname}>Save</button>
            </div>
        </div>
    );
}
