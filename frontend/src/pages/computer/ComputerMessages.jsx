import useScopedStylesheets from '../../hooks/useScopedStylesheets';

const STYLESHEETS = [
    '/legacy-styles/messages.css',
    '/legacy-styles/Chatbotcomputer.css',
];

// Faithful React port of Computer/messages.html's content
// (everything below the shared header/sidebar, which ComputerShell owns).
// Loads exactly the stylesheets messages.html itself links.
export default function ComputerMessages() {
    useScopedStylesheets(STYLESHEETS);

    return (
        <>
            <div className="main-header" style={{ fontWeight: 'inherit' }}>
                <h1>Messages</h1>
            </div>
            <span className="subHeader">Authorisation queue</span>

            <div className="mainContent"></div>
            <div className="info-banner">
                <span className="material-icons-sharp"><img src="/images/info-trans.svg" alt="" /></span>
                You must approve a message request before it is sent to a relationship Banker
            </div>
            <div className="contentBody">
                <table className="transaction-table">
                    <thead>
                        <tr>
                            <th><strong>Date and time</strong></th>
                            <th><strong>For Account</strong></th>
                            <th><strong>Created By</strong></th>
                            <th><strong>1st authorizer</strong></th>
                            <th><strong>2nd authorizer</strong></th>
                        </tr>
                    </thead>
                </table>
            </div>
            <div className="message-icon">
                <img className="messageIcon" src="/images/messages.svg" alt="" />
                <h3>No outstanding authorisations</h3>
                <p>You&apos;ll find the messages that need authorisation here</p>
            </div>
        </>
    );
}
