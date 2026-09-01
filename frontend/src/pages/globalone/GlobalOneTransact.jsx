import { useState } from 'react';
import { Link } from 'react-router-dom';
import GlobalOneBottomNav from '../../components/GlobalOneBottomNav';

const TRANSACTIONS = [
    { desc: 'Takeaway Restaurant', date: '29 Jul 2026 16:14', category: 'Takeaways', amount: 16.00, type: 'out' },
    { desc: 'Transfer', date: '29 Jul 2026 16:12', category: 'Transfer', amount: 30.00, type: 'in' },
    { desc: 'Transfer', date: '29 Jul 2026 12:48', category: 'Transfer', amount: 8.80, type: 'out' },
    { desc: 'Medical Centre', date: '29 Jul 2026 11:29', category: 'Doctors & Therapists', amount: 228.00, type: 'out' },
    { desc: 'Transfer', date: '29 Jul 2026 10:56', category: 'Transfer', amount: 200.00, type: 'in' },
    { desc: 'Grocery Store', date: '28 Jul 2026 18:16', category: 'Groceries', amount: 23.00, type: 'out' },
    { desc: 'Supermarket', date: '28 Jul 2026 12:50', category: 'Groceries', amount: 41.20, type: 'out' },
    { desc: 'Transfer', date: '28 Jul 2026 12:47', category: 'Transfer', amount: 100.00, type: 'in' },
    { desc: 'Transfer', date: '28 Jul 2026 07:56', category: 'Transfer', amount: 2.00, type: 'in' },
    { desc: 'Transfer', date: '28 Jul 2026 07:56', category: 'Transfer', amount: 15.00, type: 'in' },
];

const TRACK_CATEGORIES = [
    { name: 'Personal & Family', amount: 3689.97, color: '#1976d2' },
    { name: 'Loans & Accounts', amount: 2519.15, color: '#2e7d32' },
    { name: 'Transfer', amount: 2030.07, color: '#8e24aa' },
];

function fmt(n) { return 'R' + n.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); }

export default function GlobalOneTransact() {
    const [tab, setTab] = useState('all');

    const filtered = tab === 'track' ? null : TRANSACTIONS.filter(t =>
        tab === 'all' || (tab === 'in' ? t.type === 'in' : t.type === 'out')
    );

    return (
        <div className="go-screen">
            <div className="go-acc-header">
                <div className="go-acc-header-row">
                    <Link to="/global-one/home"><span className="material-icons-sharp">arrow_back</span></Link>
                    <div className="go-acc-header-title">Main Account</div>
                    <button type="button" onClick={() => {}}><img src="/images/search.svg" className="go-acc-header-icon-img" alt="" /></button>
                    <button type="button" onClick={() => {}}><span className="material-icons-sharp">more_vert</span></button>
                </div>
                <div className="go-acc-available-card">
                    <span className="go-acc-label">Available</span>
                    <div className="go-acc-amount">R14.00</div>
                    <span className="material-icons-sharp go-acc-info-icon" style={{ fontSize: 20 }}>info</span>
                </div>
                <div className="go-acc-balance-row">
                    <span className="go-acc-label">Balance</span>
                    <div className="go-acc-amount">R44.00</div>
                </div>
                <div className="go-acc-tabs">
                    {['all', 'in', 'out', 'track'].map(t => (
                        <button key={t} className={'go-acc-tab' + (tab === t ? ' active' : '')} type="button" onClick={() => setTab(t)}>
                            {t === 'all' ? 'All' : t === 'in' ? 'Money In' : t === 'out' ? 'Money Out' : 'Track'}
                        </button>
                    ))}
                </div>
            </div>

            <div className="go-body">
                {tab === 'track' ? (
                    <div className="go-txn-body">
                        <div className="go-track-view-row">
                            <div><span className="go-track-view-label">View</span><span className="go-track-view-value">Money out</span></div>
                            <button type="button" onClick={() => {}}><span className="material-icons-sharp">more_vert</span></button>
                        </div>
                        <div className="go-track-month-nav">
                            <button type="button" onClick={() => {}}><span className="material-icons-sharp" style={{ fontSize: 18 }}>chevron_left</span></button>
                            <div className="go-track-total">
                                <div className="go-track-total-amount">R10 707.04</div>
                                <div className="go-track-total-month">Jul 2026</div>
                            </div>
                            <button type="button" onClick={() => {}}><span className="material-icons-sharp" style={{ fontSize: 18 }}>chevron_right</span></button>
                        </div>
                        {TRACK_CATEGORIES.map(c => (
                            <a key={c.name} href="#" className="go-track-cat-row" onClick={e => e.preventDefault()}>
                                <span className="go-track-cat-dot" style={{ background: c.color }}></span>
                                <span className="go-track-cat-name">{c.name}</span>
                                <span className="go-track-cat-amount">{fmt(c.amount)}</span>
                                <span className="material-icons-sharp" style={{ color: 'var(--go-primary)' }}>chevron_right</span>
                            </a>
                        ))}
                    </div>
                ) : (
                    <div className="go-txn-body">
                        <div className="go-txn-month-row">
                            <h4>Jul 2026</h4>
                            <a href="#" onClick={e => e.preventDefault()}>Statement <span className="material-icons-sharp" style={{ fontSize: 16 }}>chevron_right</span></a>
                        </div>
                        {filtered.map((t, i) => (
                            <div key={i} className="go-txn-row">
                                <div>
                                    <div className="go-txn-desc">{t.desc}</div>
                                    <div className="go-txn-sub">{t.date} - {t.category}</div>
                                </div>
                                <div className={'go-txn-amount' + (t.type === 'in' ? ' go-txn-in' : '')}>
                                    {tab === 'all' ? (t.type === 'out' ? '-' : '') + fmt(t.amount) : fmt(t.amount)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <GlobalOneBottomNav active="transact" />
        </div>
    );
}
