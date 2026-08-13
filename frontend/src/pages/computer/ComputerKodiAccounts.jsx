import { Link } from 'react-router-dom';
import useScopedStylesheets from '../../hooks/useScopedStylesheets';

const STYLESHEETS = [
    '/legacy-styles/accounts.css',
    '/legacy-styles/Chatbotcomputer.css',
];

// Faithful React port of Computer/Kodi-accounts.html's content (its own
// self-contained header/sidebar/searchContent duplicate is dropped in
// favour of the shared ComputerShell, same pattern as every other
// Computer-platform page). This is the second business profile's
// ("Zenzi Digital Holdings", switched to via the profile popup) own
// Accounts view — a back arrow to its Home (kodi-code) plus its current +
// savings account tiles, distinct balances from the primary profile's
// Accounts page.
export default function ComputerKodiAccounts() {
    useScopedStylesheets(STYLESHEETS);

    return (
        <>
            <div className="searchContent" style={{ backgroundColor: '#ffffff', border: '1px solid #cccccc' }}>
                <div className="searchHead" style={{ borderBottom: '1px solid #cccccc', width: '100%' }}>
                    <Link to="/online-banking/kodi-code">
                        <span className="material-icons-sharp" style={{ color: '#007FFF', fontSize: '2rem', left: -10 }}>arrow_back</span>
                    </Link>
                    <div style={{ position: 'absolute', top: 10, left: 60, fontSize: '1.2rem', fontWeight: 'bold' }}>
                        Current Account
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

            <div className="account-box">
                <div className="account">
                    <div className="account-header">
                        <img src="/images/transact.svg" alt="transact" style={{ position: 'absolute', top: 30, left: 10 }} />
                    </div>
                    <div className="account-info-row">
                        <div className="info-item">
                            <span className="info-label">Account Name:</span>
                            <span className="info-value">1052 2626 43</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Current balance:</span>
                            <span className="info-value negative">- R154.21</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Available balance:</span>
                            <span className="info-value">R0.00</span>
                        </div>
                    </div>

                    <Link to="/online-banking/account-details" className="View" id="view">
                        <span className="material-icons-sharp">chevron_right</span>
                    </Link>
                </div>
            </div>

            <div className="account-box2">
                <div className="account">
                    <div className="account-header">
                        <img src="/images/save.svg" alt="save" style={{ position: 'absolute', top: 30, left: 10 }} />
                    </div>
                    <div className="account-info-row">
                        <div className="info-item">
                            <span className="info-label">Account Name:</span>
                            <span className="info-value">4001 2345 67</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Current balance:</span>
                            <span className="info-value">R10 800.00</span>
                        </div>
                        <div className="info-item">
                            <span className="info-label">Available balance:</span>
                            <span className="info-value">R10 800.00</span>
                        </div>
                    </div>

                    <Link to="/online-banking/savings" className="View" id="view">
                        <span className="material-icons-sharp">chevron_right</span>
                    </Link>
                </div>
            </div>
        </>
    );
}
