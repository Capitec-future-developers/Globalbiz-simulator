import { useState } from 'react';
import useScopedStylesheets from '../../hooks/useScopedStylesheets';

const STYLESHEETS = [
    '/legacy-styles/Computer.css',
    '/legacy-styles/transaction.css',
    '/legacy-styles/Chatbotcomputer.css',
];

const TABS = [
    { key: 'beneficiary', label: 'Beneficiary Payment(0)' },
    { key: 'bulk', label: 'Bulk Payment(0)' },
    { key: 'sars', label: 'SARS Payment (0)' },
    { key: 'transfer', label: 'Transfer (0)' },
];

// Faithful React port of Computer/Uath-transaction.html's content
// (everything below the shared header/sidebar, which ComputerShell owns).
// Loads exactly the stylesheets Uath-transaction.html itself links.
export default function ComputerAuthTransactions() {
    useScopedStylesheets(STYLESHEETS);
    const [activeTab, setActiveTab] = useState('beneficiary');

    return (
        <div className="mainContent">
            <div className="head">
                <h1>Transactions</h1>
                <span>Authorisation Queue</span>
            </div>

            <div className="content">
                <div className="tabs">
                    {TABS.map((tab) => (
                        <span
                            key={tab.key}
                            className={'t' + (activeTab === tab.key ? ' act' : '')}
                            onClick={() => setActiveTab(tab.key)}
                            style={{ cursor: 'pointer' }}
                        >
                            {tab.label}
                        </span>
                    ))}
                </div>
                <div className="tab-content">
                    <div className="tab-search"></div>
                    <div className="tab-table">
                        <table className="transaction-table">
                            <thead>
                                <tr>
                                    <th>From Account</th>
                                    <th>To Beneficiary</th>
                                    <th>Created Date</th>
                                    <th>Created By</th>
                                    <th>Amount</th>
                                    <th>Authorised By</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
