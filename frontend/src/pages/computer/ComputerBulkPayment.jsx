import { useEffect, useRef, useState } from 'react';
import useScopedStylesheets from '../../hooks/useScopedStylesheets';

const STYLESHEETS = [
    '/legacy-styles/Computer.css',
    '/legacy-styles/bulk.css',
    '/legacy-styles/Chatbotcomputer.css',
];

// Mirrors Computer/"Bulk payment.html". That source page is an empty shell
// (<div id="mainContent">) whose entire UI is injected at runtime by
// scripts/bulk.js — this component reproduces exactly what that script
// renders: a payment-details step (from-account, reference, EFT/Same Day
// selector, cut-off times popup) followed by a CSV/TXT upload step.
//
// scripts/bulk.js never performs a real balance deduction — a bulk upload
// only ever alerts the picked filename ("File selected: ...") or rejects
// an invalid extension, it doesn't debit anything. So this port stays
// faithful to that and does not call adjustBalance; there's no real
// per-beneficiary amount captured here to deduct in the first place (the
// legacy flow parses no CSV contents, it's a purely cosmetic mock).
export default function ComputerBulkPayment() {
    useScopedStylesheets(STYLESHEETS);

    const [paymentType, setPaymentType] = useState('eft'); // 'eft' | 'sameday'
    const [step, setStep] = useState('details'); // 'details' | 'upload'
    const [popupOpen, setPopupOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [reference, setReference] = useState('');
    const [historyMode, setHistoryMode] = useState(null); // 'one' | 'separate'
    const [date, setDate] = useState('');
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef(null);

    useEffect(() => {
        function handleKey(e) {
            if (e.key === 'Escape') setPopupOpen(false);
        }
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, []);

    function handleFiles(files) {
        if (!files || !files.length) return;
        const file = files[0];
        if (file.name.endsWith('.csv') || file.name.endsWith('.txt')) {
            alert('File selected: ' + file.name);
        } else {
            alert('Invalid file type. Please upload a CSV or TXT file.');
        }
    }

    return (
        <div className="content" id="mainContent">
            <div className="content-header">
                <h1 style={{ position: 'absolute', top: 50, textWrap: 'nowrap' }}>Bulk Payment</h1>
            </div>

            <div className="disclaimer-box" id="disclaimerBox">
                {step === 'details' ? (
                    <div className="payment-header">
                        <h2>Payment details</h2>
                        <div className="left">
                            <div className="upper-left">
                                <select className="uu">
                                    <option>From account</option>
                                    <option>105 2626 4558</option>
                                </select>
                                <input type="text" placeholder="Your reference" className="oo" value={reference} onChange={(e) => setReference(e.target.value)} />
                            </div>
                            <div className="lower-left">
                                <h4>Show in transaction history as</h4>
                                <span className="radio-group">
                                    <input type="radio" name="paymentType" id="one" checked={historyMode === 'one'} onChange={() => setHistoryMode('one')} />
                                    <label htmlFor="one">One payment</label>
                                    <input type="radio" name="paymentType" id="separate" checked={historyMode === 'separate'} onChange={() => setHistoryMode('separate')} />
                                    <label htmlFor="separate">Separate Payments</label>
                                </span>
                            </div>
                        </div>
                        <div className="rights">
                            <h4 style={{ position: 'absolute', textWrap: 'nowrap', left: -160, top: -10, fontWeight: 'lighter' }}>Payment type</h4>
                            <div className={'eft' + (paymentType === 'eft' ? ' action' : '')} onClick={() => setPaymentType('eft')}>
                                <img src="/images/send-cash-active.svg" style={{ position: 'absolute', left: 40, width: 50, height: 30, top: 10 }} alt="" />
                                <span style={{ position: 'absolute', top: 45, left: 30 }}>Normal EFT</span>
                            </div>
                            <div className={'same-day' + (paymentType === 'sameday' ? ' action' : '')} id="sameDay" onClick={() => setPaymentType('sameday')}>
                                <img src="/images/same-day.svg" style={{ position: 'absolute', left: 40, width: 50, height: 30, top: 10 }} alt="" />
                                <span style={{ position: 'absolute', top: 45, left: 35 }}>Same Day</span>
                            </div>
                            <div className="cut-off">
                                <img src="/images/info-trans.svg" style={{ position: 'absolute', left: 10, width: 15, height: 30, top: 5 }} alt="" />
                                <span style={{ position: 'absolute', left: 30, top: 15, fontSize: '0.6rem' }}>Transaction fee:</span>
                                <div className="cut-off-box">
                                    <span><b>EFT</b> - R2.00 per beneficiary</span>
                                    <span><b>Immediate</b> - R6.00 per beneficiary</span>
                                    <span><b>Same day</b> - R40.00 per beneficiary</span>
                                    <span><b>Capitec beneficiaries</b> - R1.00</span>
                                    <span><b>SARS eFiling</b> - R10.00</span>
                                    <span style={{ color: '#00aeff', cursor: 'pointer' }} id="cut-off-popup" onClick={() => setPopupOpen(true)}>Cut-off and available times</span>
                                </div>
                            </div>
                            <input type="date" className="date" value={date} onChange={(e) => setDate(e.target.value)} />
                        </div>
                    </div>
                ) : (
                    <>
                        <div
                            id="dropArea"
                            className={'dropArea' + (dragOver ? ' dragover' : '')}
                            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                            onDragLeave={() => setDragOver(false)}
                            onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
                        >
                            <img src="/images/upload.svg" style={{ width: 100, height: 100 }} alt="" />
                            <p>Drag &amp; Drop your CSV or TXT file here</p>
                            <p>or</p>
                            <input
                                type="file"
                                id="fileInput"
                                ref={fileInputRef}
                                accept=".csv, .txt"
                                style={{ display: 'none' }}
                                onChange={(e) => handleFiles(e.target.files)}
                            />
                            <button id="browseBtn" type="button" onClick={() => fileInputRef.current && fileInputRef.current.click()}>Browse Files</button>
                            <p style={{ fontSize: '0.8rem', color: '#555' }}>Only CSV or TXT files are allowed.</p>
                        </div>
                        <div className="drop" onClick={() => setDropdownOpen((v) => !v)}>
                            <img src="/images/info-trans.svg" alt="" />
                            <span style={{ position: 'relative', left: 5 }}>How to format a bulk payment file</span>
                            <img src="/images/more-chevron.svg" style={{ position: 'absolute', right: 10, top: 15 }} alt="" />
                        </div>
                        <div className={'dropdown-content' + (dropdownOpen ? ' open' : '')} id="dropdownTable">
                            <table>
                                <thead>
                                    <tr><th>A</th><th>B</th><th>C</th><th>D</th><th>E</th><th>F</th></tr>
                                </thead>
                                <tbody>
                                    <tr><td>250655</td><td>1600125546</td><td>50</td><td>ABC PTY LTD</td><td>Salaries John</td><td>John Deere</td></tr>
                                    <tr><td>632005</td><td>1600125545</td><td>320</td><td>ABC PTY LTD</td><td>Salaries Mary</td><td>Mary Dlamini</td></tr>
                                    <tr><td>632005</td><td>1600125544</td><td>2000</td><td>ABC PTY LTD</td><td>Salaries Joe</td><td>Jow Nkwana</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </>
                )}
            </div>

            <div className="cut-off-popup" id="popup" style={{ display: popupOpen ? 'flex' : 'none' }}>
                <div className="overlay" onClick={() => setPopupOpen(false)}></div>
                <div className="cut-off-popup-header"><b>Payment types</b></div>
                <div className="cut-off-popup-body">
                    <div className="cut-off-popup-eft">
                        <img src="/images/info-trans.svg" style={{ position: 'absolute', left: 10, width: 15, height: 30, top: 1 }} alt="" />
                        <span style={{ position: 'absolute', left: 30 }}><b>Normal EFT</b> - R2.00 transaction fee will be changed for each beneficairy</span>
                        <h3 style={{ position: 'absolute', top: 50 }}>Cut-off times</h3>
                        <ul>
                            <li>Mon-Fri: 16:00 (transactions up to R5 million)</li>
                            <li>Saturday: 10:15 (transactions up to R5 million)</li>
                            <li>Sunday, public holidays or after cut-times, payments will be processed the next business day</li>
                            <li>Capitec to Capitec payments will be processed immediately</li>
                        </ul>
                    </div>
                    <div className="cut-off-popup-eft">
                        <img src="/images/info-trans.svg" style={{ position: 'absolute', left: 10, width: 15, height: 30, top: 1 }} alt="" />
                        <span style={{ position: 'absolute', left: 30 }}><b>Immediate</b> - R6.00 transactions fee will be charged for each beneficiary</span>
                        <h3 style={{ position: 'absolute', top: 50 }}>Cut-off times</h3>
                        <ul>
                            <li>Mon-Fri: 06:00 - 16:00 (transactions up to R5 million)</li>
                            <li>Mon-Fri: 16:00 - 20:00(transactions up to R250 000)</li>
                            <li>Weekends and public holidays: 06:00 - 18:00 (transactions up to R250 000)</li>
                            <li>Immediate payment cannot be stopped reversed or cancelled</li>
                            <li>Only payment to RTC participating banks can be processed immediately</li>
                        </ul>
                    </div>
                    <div className="cut-off-popup-eft">
                        <img src="/images/info-trans.svg" style={{ position: 'absolute', left: 10, width: 15, height: 30, top: 1 }} alt="" />
                        <span style={{ position: 'absolute', left: 30 }}><b>Same day </b>- Payments above R5 million be processed the same day. A transaction fee of R40.00 will be charged.</span>
                        <h3 style={{ position: 'absolute', top: 50 }}>Cut-off times</h3>
                        <ul>
                            <li>Mon-Fri: 15:30 (transactions up to R5 million)</li>
                            <li>Saturday: Services not available</li>
                            <li>Sunday, public holidays or after cut-times, payments will be processed the next business day</li>
                        </ul>
                    </div>
                    <div className="cut-off-popup-eft">
                        <img src="/images/info-trans.svg" style={{ position: 'absolute', left: 10, width: 15, height: 30, top: 1 }} alt="" />
                        <span style={{ position: 'absolute', left: 30 }}><b>SARS efiling </b>- A R10.00 transaction fee will be charged.</span>
                        <h3 style={{ position: 'absolute', top: 50 }}>Cut-off times</h3>
                        <ul>
                            <li>Mon-Fri: 15:30 (transactions up to R5 million)</li>
                            <li>Saturday: Services not available</li>
                            <li>Sunday, public holidays or after cut-times, payments will be processed the next business day</li>
                        </ul>
                    </div>
                </div>
                <div className="line" style={{ position: 'absolute', borderTop: '1px solid #cccccc', bottom: 55, width: '100%' }}></div>
                <div className="okay" id="okay" onClick={() => setPopupOpen(false)}>Okay</div>
            </div>

            <div className="letsgo">
                <button className="cancel" type="button">Cancel</button>
                <button className="next" id="nextBtn" type="button" onClick={() => setStep('upload')}>Continue</button>
            </div>
        </div>
    );
}
