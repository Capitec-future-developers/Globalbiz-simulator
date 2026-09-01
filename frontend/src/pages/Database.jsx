import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBalances } from '../hooks/useAccountStore';
import { getBeneficiaries } from '../hooks/useBeneficiaryStore';

function toCSV(rows, headers) {
    return [headers.join(','), ...rows.map(r => headers.map(h => JSON.stringify(r[h] ?? '')).join(','))].join('\n');
}

function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
}

export default function Database() {
    const [balances, setBalances] = useState(null);
    const [beneficiaries, setBeneficiaries] = useState([]);
    const [expandedAcc, setExpandedAcc] = useState(null);
    const [toast, setToast] = useState('');

    useEffect(() => {
        setBalances(getBalances());
        setBeneficiaries(getBeneficiaries());
    }, []);

    function showToast(msg) {
        setToast(msg);
        setTimeout(() => setToast(''), 2000);
    }

    function handleExport() {
        if (!balances) return;
        const accRows = Object.entries(balances).map(([id, acc]) => ({
            id, available: acc.available, balance: acc.balance
        }));
        downloadCSV(toCSV(accRows, ['id', 'available', 'balance']), 'accounts.csv');
        showToast('Exported accounts.csv');
    }

    if (!balances) return <div style={{ padding: 40 }}>Loading…</div>;

    return (
        <div style={{ fontFamily: 'system-ui, sans-serif', minHeight: '100vh', background: '#f0f4f8' }}>
            <div className="db-header" style={{ background: '#0f3057', color: 'white', padding: '20px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ margin: 0, fontSize: '1.4rem' }}>GlobalBiz Data Manager</h1>
                    <div style={{ fontSize: '0.82rem', opacity: 0.75, marginTop: 4 }}>
                        Live view of accounts and beneficiaries stored in this session.
                    </div>
                </div>
                <Link to="/" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span className="material-icons-sharp">arrow_back</span> Back to app
                </Link>
            </div>

            <div className="db-toolbar" style={{ background: 'white', padding: '12px 32px', display: 'flex', gap: 12, alignItems: 'center', borderBottom: '1px solid #ddd' }}>
                <button className="db-btn db-btn-primary" style={{ background: '#0096c7', color: 'white', border: 'none', borderRadius: 6, padding: '8px 18px', cursor: 'pointer' }} onClick={handleExport}>
                    Export CSV
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, padding: 32 }}>
                {/* Accounts panel */}
                <div style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,.08)' }}>
                    <h2 style={{ margin: '0 0 16px', fontSize: '1.05rem' }}>Accounts &amp; transactions</h2>
                    {Object.entries(balances).map(([id, acc]) => (
                        <div key={id}>
                            <div
                                style={{ padding: '12px 0', borderBottom: '1px solid #eee', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                                onClick={() => setExpandedAcc(expandedAcc === id ? null : id)}
                            >
                                <div>
                                    <strong style={{ textTransform: 'capitalize' }}>{id}</strong>
                                    <div style={{ fontSize: '0.78rem', color: '#5f6b7a' }}>Available: R{acc.available?.toFixed(2)} · Balance: R{acc.balance?.toFixed(2)}</div>
                                </div>
                                <span className="material-icons-sharp" style={{ fontSize: 18, color: '#0096c7' }}>
                                    {expandedAcc === id ? 'expand_less' : 'expand_more'}
                                </span>
                            </div>
                            {expandedAcc === id && acc.transactions?.length > 0 && (
                                <div style={{ padding: '8px 0 8px 16px' }}>
                                    {acc.transactions.map(tx => (
                                        <div key={tx.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: '0.82rem', borderBottom: '1px solid #f0f0f0' }}>
                                            <div>
                                                <div>{tx.name}</div>
                                                <div style={{ color: '#888' }}>{tx.date}</div>
                                            </div>
                                            <div style={{ color: tx.amount < 0 ? '#c0272d' : '#1a7a3a', fontWeight: 600 }}>
                                                {tx.amount < 0 ? '' : '+'}R{Math.abs(tx.amount).toFixed(2)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {expandedAcc === id && (!acc.transactions || acc.transactions.length === 0) && (
                                <p style={{ padding: '8px 0 8px 16px', fontSize: '0.82rem', color: '#888' }}>No transactions.</p>
                            )}
                        </div>
                    ))}
                    <p style={{ fontSize: '0.78rem', color: '#888', marginTop: 12 }}>Click an account row to expand its transaction list.</p>
                </div>

                {/* Beneficiaries panel */}
                <div style={{ background: 'white', borderRadius: 12, padding: 24, boxShadow: '0 1px 4px rgba(0,0,0,.08)' }}>
                    <h2 style={{ margin: '0 0 16px', fontSize: '1.05rem' }}>Beneficiaries</h2>
                    {beneficiaries.length === 0 && <p style={{ color: '#888', fontSize: '0.85rem' }}>No beneficiaries saved yet.</p>}
                    {beneficiaries.map((b, i) => (
                        <div key={i} style={{ padding: '10px 0', borderBottom: '1px solid #eee' }}>
                            <div style={{ fontWeight: 600 }}>{b.name}</div>
                            <div style={{ fontSize: '0.78rem', color: '#5f6b7a' }}>{b.bank} · {b.account}</div>
                            {b.theirRef && <div style={{ fontSize: '0.75rem', color: '#888' }}>Ref: {b.theirRef}</div>}
                        </div>
                    ))}
                    <p style={{ fontSize: '0.78rem', color: '#888', marginTop: 12 }}>Default beneficiaries are protected and cannot be deleted here.</p>
                </div>
            </div>

            {toast && (
                <div style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', background: '#0f3057', color: 'white', padding: '10px 24px', borderRadius: 8, fontSize: '0.9rem' }}>
                    {toast}
                </div>
            )}
        </div>
    );
}
