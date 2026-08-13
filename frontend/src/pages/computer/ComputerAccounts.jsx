import { Link } from 'react-router-dom';
import useScopedStylesheets from '../../hooks/useScopedStylesheets';
import { getBalances, formatCurrency } from '../../hooks/useAccountStore';
import { ACCOUNT_INFO, NL_ACCOUNTS } from '../../data/accounts';

const STYLESHEETS = [
    '/legacy-styles/accounts.css',
    '/legacy-styles/Chatbotcomputer.css',
];

const ACCOUNT_ICON = {
    transactional: '/images/transact.svg',
    notice32: '/images/save.svg',
    flexible: '/images/save.svg',
    credit: '/images/cards_icon.svg',
};

// Faithful React port of Computer/Accounts.html's content (everything below
// the shared header/sidebar, which ComputerShell owns). Computer/Accounts.html
// hard-coded a single account box; here every account from the shared
// useAccountStore is rendered so a transfer/payment made anywhere in the app
// (mobile App or this desktop platform) is reflected here too.
export default function ComputerAccounts() {
    useScopedStylesheets(STYLESHEETS);
    const balances = getBalances();

    return (
        <>
            <div className="searchContent" style={{ backgroundColor: '#ffffff', border: '1px solid #cccccc' }}>
                <div className="searchHead" style={{ borderBottom: '1px solid #cccccc', width: '100%' }}>
                    <Link to="/online-banking">
                        <span className="material-icons-sharp" style={{ color: '#007FFF', fontSize: '2rem', left: -10 }}>arrow_back</span>
                    </Link>
                    <div style={{ position: 'absolute', top: 10, left: 60, fontSize: '1.2rem', fontWeight: 'bold' }}>
                        Accounts
                    </div>
                </div>
                <br />
                <div className="search-container">
                    <input
                        type="text"
                        id="automation-search"
                        placeholder="What would you like to do? (e.g., 'Pay saved beneficiary')"
                    />
                    <button id="execute-automation" className="search-button" type="button">
                        <span className="material-icons-sharp">search</span> Go
                    </button>
                    <div id="suggestions-dropdown" className="suggestions-dropdown"></div>
                </div>
            </div>

            {/*
                accounts.css's .account-box is a single absolutely-positioned
                row (fixed top/left/width, sized for exactly one hard-coded
                account in the source HTML). To render every account from the
                shared store without them all stacking on top of each other,
                each row below keeps the .account-box look (white card, blue
                left accent, padding) via className but overrides its
                position/sizing inline so multiple rows flow one under the
                other instead of sharing the same fixed coordinates.
            */}
            <div style={{ position: 'absolute', top: 230, left: 300, display: 'flex', flexDirection: 'column', gap: 16, width: 'calc(100% - 340px)', maxWidth: 900 }}>
                {NL_ACCOUNTS.map((id) => {
                    const info = ACCOUNT_INFO[id];
                    const bal = balances[id];
                    return (
                        <div
                            className="account-box"
                            key={id}
                            style={{ position: 'relative', top: 'auto', left: 'auto', width: '100%', height: 'auto', minHeight: 90, marginBottom: 0 }}
                        >
                            <div className="account">
                                <div className="account-header">
                                    <img src={ACCOUNT_ICON[id]} alt="account" style={{ position: 'absolute', top: 30, left: 10 }} />
                                </div>
                                <div className="account-info-row" style={{ position: 'relative', top: 'auto', left: 40, gap: 60 }}>
                                    <div className="info-item">
                                        <span className="info-label">Account Name:</span>
                                        <span className="info-value">{info.name} ({info.number})</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Current balance:</span>
                                        <span className={'info-value' + (bal.balance < 0 ? ' negative' : '')}>{formatCurrency(bal.balance)}</span>
                                    </div>
                                    <div className="info-item">
                                        <span className="info-label">Available balance:</span>
                                        <span className="info-value">{formatCurrency(bal.available)}</span>
                                    </div>
                                </div>
                                <Link to="/online-banking/account-details" className="View" id="view">
                                    <span className="material-icons-sharp">chevron_right</span>
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
}
