import { Link } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { getBalances, formatNlBalance } from '../hooks/useAccountStore';
import { ACCOUNT_INFO } from '../data/accounts';

const CARDS = [
    { accId: 'notice32', type: 'savings', to: '/accounts/notice32' },
    { accId: 'flexible', type: 'savings', to: '/accounts/flexible' },
    { accId: 'credit', type: 'credit', to: '/accounts/credit', accent: '#c0272d' }
];

export default function Accounts() {
    const [balances, setBalances] = useState(null);
    const [filter, setFilter] = useState('savings');
    const [query, setQuery] = useState('');

    useEffect(() => {
        setBalances(getBalances());
    }, []);

    const visibleCards = useMemo(() => {
        const q = query.toLowerCase().trim();
        return CARDS.filter((card) => {
            const matchesFilter = filter === 'all' || card.type === filter;
            const matchesQuery = !q || ACCOUNT_INFO[card.accId].name.toLowerCase().includes(q);
            return matchesFilter && matchesQuery;
        });
    }, [filter, query]);

    return (
        <div className="nl-accounts-content new-look-only" style={{ display: 'flex' }}>
            <div className="nl-accounts-topbar">
                <Link to="/" className="nl-back"><span className="material-icons-sharp">arrow_back</span></Link>
                <h2>Accounts</h2>
            </div>

            <div className="nl-accounts-search">
                <span className="material-icons-sharp">search</span>
                <input
                    type="text"
                    placeholder="Search accounts"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
            </div>

            <div className="nl-filter-pills">
                {['all', 'current', 'savings', 'credit'].map((f) => (
                    <button
                        key={f}
                        type="button"
                        className={'nl-pill' + (filter === f ? ' active' : '')}
                        onClick={() => setFilter(f)}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            <div className="nl-account-list">
                {visibleCards.map((card) => {
                    const info = ACCOUNT_INFO[card.accId];
                    const balance = balances ? balances[card.accId].available : 0;
                    return (
                        <Link key={card.accId} to={card.to} className="nl-account-list-card">
                            <span className="nl-account-accent" style={card.accent ? { background: card.accent } : undefined}></span>
                            <div className="nl-account-list-info">
                                <div className="nl-account-list-name">{info.name}</div>
                                <div className="nl-account-list-label">Available balance</div>
                            </div>
                            <div className="nl-account-list-balance">{formatNlBalance(balance)}</div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}
