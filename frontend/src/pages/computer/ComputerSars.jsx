import { useState } from 'react';
import useScopedStylesheets from '../../hooks/useScopedStylesheets';

const STYLESHEETS = [
    '/legacy-styles/Computer.css',
    '/legacy-styles/transaction.css',
    '/legacy-styles/Chatbotcomputer.css',
];

// Faithful React port of Computer/Sars.html's mainContent
// (header/sidebar/search-container are owned by ComputerShell).
export default function ComputerSars() {
    useScopedStylesheets(STYLESHEETS);
    const [tab, setTab] = useState('action'); // 'action' | 'history'

    return (
        <div className="mainContent">
            <div className="head">
                <h1>SARS eFiling</h1>
                <div className="rights" style={{ position: 'absolute', left: 1250, top: -10, display: 'flex', gap: 10, flexDirection: 'column', textWrap: 'nowrap', fontSize: 19 }}>
                    <span>User ID</span>
                    <span><b>39793173</b></span>
                    <span style={{ position: 'absolute', left: 100 }}>Profile ID</span>
                    <span style={{ position: 'absolute', left: 100, top: 30 }}><b>SARSEF18728367483</b></span>
                </div>
            </div>

            <div className="content">
                <div className="tabs">
                    <span className={'t' + (tab === 'action' ? ' act' : '')} onClick={() => setTab('action')}>Payment to action</span>
                    <span className={'t' + (tab === 'history' ? ' act' : '')} onClick={() => setTab('history')}>Payment History</span>
                </div>
                {tab === 'action' ? (
                    <div className="tab-content">
                        <div className="tab-search"></div>
                        <div className="tab-table">
                            <table className="transaction-table">
                                <thead>
                                <tr>
                                    <th><b>Payment Due Date</b></th>
                                    <th style={{ fontWeight: 'bold' }}>Reference Number</th>
                                    <th style={{ fontWeight: 'bold' }}>Created Date</th>
                                    <th style={{ fontWeight: 'bold' }}>Expiry Date</th>
                                    <th style={{ fontWeight: 'bold' }}>Amount</th>
                                    <th style={{ fontWeight: 'bold' }}>Actions</th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="tab-content">
                        <div className="tab-search"></div>
                        <div className="tab-table">
                            <table className="transaction-table">
                                <thead>
                                <tr>
                                    <th style={{ fontWeight: 'bold' }}>Payment Date</th>
                                    <th style={{ fontWeight: 'bold' }}>Reference Number</th>
                                    <th style={{ fontWeight: 'bold' }}>Amount</th>
                                    <th style={{ fontWeight: 'bold' }}>Status</th>
                                </tr>
                                </thead>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
