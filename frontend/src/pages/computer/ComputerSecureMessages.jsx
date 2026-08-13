import { useState } from 'react';
import useScopedStylesheets from '../../hooks/useScopedStylesheets';

const STYLESHEETS = [
    '/legacy-styles/Computer.css',
    '/legacy-styles/Chatbotcomputer.css',
    '/legacy-styles/Secure.css',
];

const HELP_TOPICS = [
    'Beneficiary payment',
    'Credit Card Enquiries',
    'Debit Card Enquiries',
    'Device Registration',
    'Estate Late Account Close',
    'Limit increase/Decrease',
    'One Time Password/USSD',
    'Recall - Counterman Message',
    'Request for list of Beneficiaries',
    'Statement Request',
    'Stop/Dispute Debit Order',
    'TPMM_Account Close',
    'TPMM-Account Guarantee Request',
    'TPMM-Account Open',
    'TPMM-Account Payout Request',
];

// Faithful React port of Computer/Secure-Messages.html's main-content
// (header/sidebar/search-container are owned by ComputerShell). The "Create
// New Message" modal reproduces scripts/Secure.js's dynamically-built modal
// as React state instead of DOM innerHTML injection.
export default function ComputerSecureMessages() {
    useScopedStylesheets(STYLESHEETS);
    const [tab, setTab] = useState('inbox'); // 'inbox' | 'sent'
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <main className="main-content" id="mainContent">
            <div className="header-content">
                <h1>Secure Messages</h1>
                <div className="those">
                    <div className="yohs bens" id="createMessageBtn" onClick={() => setModalOpen(true)}>
                        <span>Create</span><span>New</span>Message
                    </div>
                </div>
            </div>
            <div className="content-body">
                <div className="fav">
                    <div className="tabx">
                        <div className={'tab' + (tab === 'inbox' ? ' activez' : '')} onClick={() => setTab('inbox')}>Inbox</div>
                        <div className={'tab' + (tab === 'sent' ? ' activez' : '')} onClick={() => setTab('sent')}>Sent</div>
                    </div>
                    <div className="messages">
                        <table className="messages">
                            <thead className="table-header">
                            <tr className="table-row">
                                <th>Date and Time</th>
                                <th>For Account</th>
                                <th>Subject</th>
                            </tr>
                            </thead>
                            <tbody className="table-body">
                            <tr>
                                <td colSpan={3} style={{ textAlign: 'center' }}>
                                    <img src="/images/messages.svg" alt="message" className="pic" /><br />
                                    {tab === 'inbox'
                                        ? 'No Messages. Please click on "Create New Message" above.'
                                        : 'No Sent Messages.'}
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {modalOpen && (
                <div className="createMessage-modal" onClick={(e) => { if (e.target === e.currentTarget) setModalOpen(false); }}>
                    <div className="modal">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h2 className="hedin" style={{ position: 'relative', color: '#111111', fontSize: '1.1rem', left: -140, height: 20 }}>Create New Message</h2>
                            </div>
                            <br />
                            <form onSubmit={(e) => e.preventDefault()}>
                                <div className="form-group">
                                    <div className="Drop">
                                        <select required defaultValue="" className="down low">
                                            <option value="" disabled>Select Account</option>
                                            <option>Zenzi Digital Holdings - 1052 2626 43 - R1000.00</option>
                                        </select>
                                        <select required defaultValue="" style={{ position: 'relative', right: -10, top: -1 }} className="down low">
                                            <option value="" disabled>What do you need help with</option>
                                            {HELP_TOPICS.map((topic) => <option key={topic}>{topic}</option>)}
                                        </select>
                                    </div>
                                    <input type="text" id="Message" name="Message" required placeholder="Type your message..." />
                                </div>
                                <div className="form-group button">
                                    <div className="btn btn-cancel" onClick={() => setModalOpen(false)}>Cancel</div>
                                    <div className="btn btn-send">Send</div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
