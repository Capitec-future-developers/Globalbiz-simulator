import { useState } from 'react';
import useScopedStylesheets from '../../hooks/useScopedStylesheets';

const STYLESHEETS = [
    '/legacy-styles/Beneficiaries.css',
    '/legacy-styles/Chatbotcomputer.css',
];

// Faithful React port of Computer/Beneficiaries.html's content (everything
// below the shared header/sidebar, which ComputerShell owns). This is the
// "Authorisations > Beneficiaries" queue -- a list of beneficiary
// additions/edits/deletions awaiting a second approver's sign-off. The
// source HTML ships the table with zero rows (no authorisation workflow is
// implemented anywhere in the golden master), so this stays intentionally
// empty here too, with a friendly empty-state row instead of a bare table.
export default function ComputerBeneficiaries() {
    useScopedStylesheets(STYLESHEETS);
    const [status, setStatus] = useState('');

    return (
        <>
            <div className="main-header">
                <h3>Beneficiaries</h3>
            </div>
            <p style={{ paddingTop: 10, paddingBottom: 10 }}>Authorisation queue</p>

            <div className="searchInput">
                <input type="text" placeholder="Search" />
                <select id="beneficiaryStatus" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Beneficiary status</option>
                    <option value="New">New</option>
                    <option value="Updated">Updated</option>
                    <option value="Deleted">Deleted</option>
                </select>
            </div>

            <div className="contentBody">
                <table className="transaction-table">
                    <thead>
                        <tr>
                            <th style={{ fontWeight: 'normal' }}>Beneficiary name</th>
                            <th style={{ fontWeight: 'normal' }}>Beneficiary reference</th>
                            <th style={{ fontWeight: 'normal' }}>Account number</th>
                            <th style={{ fontWeight: 'normal' }}>Beneficiary status</th>
                            <th style={{ fontWeight: 'normal' }}>Created date</th>
                            <th style={{ fontWeight: 'normal' }}>Created by</th>
                            <th style={{ fontWeight: 'normal' }}>Authorizations due</th>
                            <th style={{ fontWeight: 'normal' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={8} style={{ textAlign: 'center', padding: 20, color: '#666' }}>
                                You&apos;re up to date &mdash; no beneficiaries are pending authorisation.
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}
