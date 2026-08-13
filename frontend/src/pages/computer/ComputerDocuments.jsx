import { useEffect, useRef, useState } from 'react';
import useScopedStylesheets from '../../hooks/useScopedStylesheets';

const STYLESHEETS = [
    '/legacy-styles/Document.css',
    '/legacy-styles/Chatbotcomputer.css',
];

const DOC_TYPES = [
    'Account Confirmation Letter',
    'Settlement quote',
    'Stamped statements',
    'IT3b statements',
    'IT3s statements',
];

const ACCOUNT_LABEL = 'Zenzi Digital Holdings - 1052 2626 43 - R1000.00';

function buildPdfHtml(docType) {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    return `<html><head><style>
body { font-family: Arial, sans-serif; margin: 50px; color: #333; }
.header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
.logo { width: 150px; height: auto; }
.title { font-size: 18px; font-weight: bold; text-align: center; margin: 30px 0; text-transform: uppercase; }
.content { line-height: 1.6; font-size: 14px; }
.footer { margin-top: 50px; font-size: 12px; color: #666; }
.signature { margin-top: 50px; font-weight: bold; }
.details-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
.details-table td { padding: 8px; border: 1px solid #ddd; }
.details-table td:first-child { font-weight: bold; width: 30%; background-color: #f5f5f5; }
</style></head><body>
<div class="header"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Capitec_Bank_logo.svg/1200px-Capitec_Bank_logo.svg.png" class="logo" alt="Capitec Logo"><div>${dateStr}</div></div>
<div class="title">${docType.toUpperCase()}</div>
<div class="content">
<p>We hereby confirm that Zenzi Dube has the following active account at Capitec Bank Limited.</p>
<table class="details-table">
<tr><td>SWIFT Address:</td><td>CABLZAJJ</td></tr>
<tr><td>Bank Name:</td><td>Capitec Business</td></tr>
<tr><td>Branch Name:</td><td>Relationship Suite</td></tr>
<tr><td>Branch Code:</td><td>450105</td></tr>
<tr><td>Account Name:</td><td>Zenzi Digital Holdings</td></tr>
<tr><td>Account Number:</td><td>1052262643</td></tr>
<tr><td>Account Type:</td><td>Capitec Business Account</td></tr>
<tr><td>Date Account Opened:</td><td>05/06/2024</td></tr>
<tr><td>Entity Registration/ID Number:</td><td>0105185435085</td></tr>
</table>
<p>The account details provided herein should not be read as extending by implication to any other matter not specifically addressed. The account details are given as at the above date and no obligation is hereby assumed to update the account details on any future date.</p>
<p>Capitec shall have no liability whether in contract, delict (including without limitation negligence) or otherwise to the above account holder or any third party in relation to the account details contained herein.</p>
<p>If any further information is required, kindly contact the Capitec Client Care Centre on 0860 30 92 50.</p>
<div class="signature">Yours Faithfully,<br>THE CAPITEC TEAM<br>Form 104d (4/2023)</div>
</div>
<div class="footer">
Client Care Centre 0860 30 92 50 | T +27 11 302 0400 | E CustomerResolution@capitecbank.co.za<br>
142 West Street, Sandown, 2196 | PO Box 782699, Sandton, 2146 | capitecbank.co.za<br>
Capitec Bank is an authorised financial services provider (FSP46669) and registered credit provider (NCRCP13)<br>
Capitec Bank Limited Reg. No: 1980/003695/06
</div>
</body></html>`;
}

// Faithful React port of Computer/Computer-Document.html's #document generator
// area (header/sidebar/search-container are owned by ComputerShell). The
// original page builds this whole area at runtime via
// scripts/documentGenerator.js (innerHTML injection + a dynamically-created
// <style> tag); this component reproduces the same structure/behaviour as
// React state, using its own "docgen-" prefixed class names (scoped to this
// component's lifetime, same trick the source used) so they can't collide
// with any other Computer page's CSS.
export default function ComputerDocuments() {
    useScopedStylesheets(STYLESHEETS);

    const [selectedDocType, setSelectedDocType] = useState('');
    const [popupOpen, setPopupOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successPopVisible, setSuccessPopVisible] = useState(false);
    const [generatedDoc, setGeneratedDoc] = useState(null);
    const timerRef = useRef(null);
    const urlRef = useRef(null);

    useEffect(() => {
        return () => {
            clearTimeout(timerRef.current);
            if (urlRef.current) URL.revokeObjectURL(urlRef.current);
        };
    }, []);

    function handleDocTypeClick(type) {
        setSelectedDocType(type);
        setPopupOpen(true);
    }

    function handleCancel() {
        setPopupOpen(false);
    }

    function handleGenerate() {
        setPopupOpen(false);
        setSuccessPopVisible(true);
        setLoading(true);
        timerRef.current = setTimeout(() => {
            const now = new Date();
            const dateStr = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
            const blob = new Blob([buildPdfHtml(selectedDocType)], { type: 'application/pdf' });
            if (urlRef.current) URL.revokeObjectURL(urlRef.current);
            const downloadUrl = URL.createObjectURL(blob);
            urlRef.current = downloadUrl;
            setGeneratedDoc({
                date: dateStr,
                type: selectedDocType,
                account: 'Zenzi Digital Holdings 1052 2626 43',
                url: downloadUrl,
                filename: `${selectedDocType.replace(/\s+/g, '_')}_${dateStr.replace(/\s+/g, '_')}.pdf`,
            });
            setSuccessPopVisible(false);
            setLoading(false);
        }, 3000);
    }

    return (
        <div className="docgen-root" id="document">
            <style>{`
                .docgen-root { position: relative; width: 90%; padding: 30px; background: #fff; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08); margin-top: 40px; font-family: 'Segoe UI', sans-serif; }
                .docgen-root h2 { font-size: 24px; margin-bottom: 20px; color: #222; }
                .docgen-banner { background: #e0f7fa; padding: 12px 16px; font-size: 14px; color: #006064; margin-bottom: 20px; }
                .docgen-manage-btn-container { position: relative; display: inline-block; margin-bottom: 20px; }
                .docgen-manage-btn { background: #0078d7; border: 1px solid #ffffff; color: white; padding: 10px 15px; cursor: pointer; height: 50px; }
                .docgen-details-hover { display: none; background-color: #ffffff; position: absolute; top: 100%; left: 0; z-index: 10; box-shadow: 0 2px 8px rgba(0,0,0,0.15); min-width: 220px; }
                .docgen-details-hover ul { list-style: none; margin: 0; padding: 10px 0; }
                .docgen-details-hover li a { display: block; padding: 10px 20px; text-decoration: none; color: #333; }
                .docgen-details-hover li a:hover { background-color: #f0f0f0; }
                .docgen-manage-btn-container:hover .docgen-details-hover { display: block; }
                .docgen-popup { display: block; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: white; padding: 25px; border-radius: 12px; box-shadow: 0 8px 30px rgba(0, 0, 0, 0.2); z-index: 1000; width: 400px; }
                .docgen-popup h3 { margin-bottom: 10px; font-size: 18px; }
                .docgen-popup p { margin: 10px 0 5px; font-size: 14px; }
                .docgen-popup select { width: 100%; padding: 10px; border-radius: 6px; border: 1px solid #ccc; font-size: 14px; margin-bottom: 10px; }
                .docgen-btn-container { display: flex; gap: 10px; justify-content: flex-end; margin-top: 10px; }
                .docgen-overlay { display: block; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.3); z-index: 999; }
                .docgen-btn { padding: 10px 15px; border: none; border-radius: 6px; font-size: 14px; cursor: pointer; text-decoration: none; display: inline-block; }
                .docgen-btn-primary { background: #0288d1; color: white; }
                .docgen-btn-secondary { background: #f1f1f1; color: #333; margin-left: 6px; }
                .docgen-loading { font-size: 14px; margin: 10px 0; color: #555; }
                .docgen-success-pop { background: #d4edda; color: #155724; padding: 12px 16px; border-radius: 6px; font-size: 14px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); margin-bottom: 10px; }
                .docgen-doc-table { width: 100%; border-collapse: collapse; margin-top: 10px; }
                .docgen-doc-table th, .docgen-doc-table td { border: 1px solid #e0e0e0; padding: 12px; font-size: 14px; text-align: left; }
                .docgen-doc-table th { background: #f5f5f5; color: #333; }
            `}</style>

            <h2>Documents</h2>
            <div className="docgen-banner">
                <strong>Note:</strong> Statement not available for accounts open less than 1 month. Visit <b>Accounts</b> and choose an account to see transaction history.
            </div>

            <div className="docgen-manage-btn-container">
                <button className="docgen-manage-btn" type="button">Generate Document</button>
                <div className="docgen-details-hover">
                    <ul>
                        {DOC_TYPES.map((type) => (
                            <li key={type}>
                                <a href="#" onClick={(e) => { e.preventDefault(); handleDocTypeClick(type); }}>{type}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            {successPopVisible && (
                <div className="docgen-success-pop"><b>Success:</b> document will be ready below.</div>
            )}

            {popupOpen && (
                <>
                    <div className="docgen-overlay" onClick={handleCancel}></div>
                    <div className="docgen-popup">
                        <h3>{selectedDocType}</h3>
                        <p>Choose account:</p>
                        <select defaultValue="">
                            <option value="" disabled>Choose account</option>
                            <option>{ACCOUNT_LABEL}</option>
                        </select>
                        <div className="docgen-btn-container">
                            <button className="docgen-btn docgen-btn-primary" type="button" onClick={handleGenerate}>Generate</button>
                            <button className="docgen-btn docgen-btn-secondary" type="button" onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                </>
            )}

            {loading && <div className="docgen-loading">Generating document... Please wait.</div>}

            <table className="docgen-doc-table">
                <thead>
                <tr>
                    <th>Date</th>
                    <th>Document Type</th>
                    <th>Account</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {generatedDoc ? (
                    <tr>
                        <td>{generatedDoc.date}</td>
                        <td>{generatedDoc.type}</td>
                        <td>{generatedDoc.account}</td>
                        <td>
                            <a href={generatedDoc.url} download={generatedDoc.filename} className="docgen-btn docgen-btn-primary">Download</a>
                            <button className="docgen-btn docgen-btn-secondary" type="button">Email</button>
                        </td>
                    </tr>
                ) : (
                    <tr>
                        <td colSpan={4} style={{ textAlign: 'center', color: '#999' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 20 }}>
                                <img src="/images/history.svg" alt="documents" style={{ width: 120, marginBottom: 12 }} />
                                <span style={{ fontWeight: 'bold', color: 'black' }}>No documents generated yet.</span>
                                <span style={{ color: 'black' }}>You will find generated document below</span>
                            </div>
                        </td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
}
