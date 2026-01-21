document.getElementById('mainContent').innerHTML = `
<div class="content-header">
    <h1 style="position: absolute; top: 50px; text-wrap: nowrap;">Bulk Payment</h1>
</div>
<div class="disclaimer-box" id="disclaimerBox">
    <div class="payment-header">
        <h2>Payment details</h2>
        <div class="left">
            <div class="upper-left">
                <select class="uu">
                    <option>From account</option>
                    <option>
                    <div class="account-number" style="position: absolute;"><img src="../images/transact.svg" alt="transact">105 2626 4558</div>
</option>
                </select>
                <input type="text" placeholder="Your reference" class="oo">
            </div>
            <div class="lower-left">
                <h4>Show in transaction history as</h4>
                <span class="radio-group">
                    <input type="radio" name="paymentType" id="one">
                    <label for="one">One payment</label>
                    <input type="radio" name="paymentType" id="separate">
                    <label for="separate">Separate Payments</label>
                </span>
            </div>
        </div>
        <div class="rights">
            <h4 style="position: absolute; text-wrap: nowrap; left: -160px; top: -10px; font-weight: lighter;">Payment type</h4>
            <div class="eft action">
                <img src="../images/send-cash-active.svg" style="position: absolute; left: 40px; width: 50px; height: 30px; top: 10px;">
                <span style="position: absolute; top: 45px; left: 30px">Normal EFT</span>
            </div>
            <div class="same-day" id="sameDay">
                <img src="../images/same-day.svg" style="position: absolute; left: 40px; width: 50px; height: 30px; top: 10px;">
                <span style="position: absolute; top: 45px; left: 35px">Same Day</span>
            </div>
            <div class="cut-off">
                <img src="../images/info-trans.svg" style="position: absolute; left: 10px; width: 15px; height: 30px; top: 5px;">
                <span style="position: absolute; left: 30px; top: 15px; font-size: 0.6rem;">Transaction fee:</span>
                <div class="cut-off-box">
                    <span><b>EFT</b> - R2.00 per beneficiary</span>
                    <span><b>Immediate</b> - R6.00 per beneficiary</span>
                    <span><b>Same day</b> - R40.00 per beneficiary</span>
                    <span><b>Capitec beneficiaries</b> - R1.00</span>
                    <span><b>SARS eFiling</b> - R10.00</span>
                    <span style="color: #00aeff; cursor: pointer;" id="cut-off-popup">Cut-off and available times</span>
                </div>
            </div>
            <input type="date" class="date">
        </div>
    </div>
</div>
<div class="cut-off-popup" id="popup" style="display:none;">
    <div class="overlay"></div>
    <div class="cut-off-popup-header"><b>Payment types</b></div>
    <div class="cut-off-popup-body">
        <div class="cut-off-popup-eft">
            <img src="../images/info-trans.svg" style="position: absolute; left: 10px; width: 15px; height: 30px; top: 1px; ">
            <span style="position: absolute; left: 30px;"><b>Normal EFT</b> - R2.00 transaction fee will be changed for each beneficairy</span>
            <h3 style="position: absolute; top: 50px;">Cut-off times</h3>
            <ul>
            <li>Mon-Fri: 16:00 (transactions up to R5 million)</li>
            <li>Saturday: 10:15 (transactions up to R5 million)</li>
            <li>Sunday, public holidays or after cut-times, payments will be processed the next business day</li>
            <li>Capitec to Capitec payments will be processed immediately</li>
</ul>
        </div>
        <div class="cut-off-popup-eft" >
            <img src="../images/info-trans.svg" style="position: absolute; left: 10px; width: 15px; height: 30px; top: 1px; ">
            <span style="position: absolute; left: 30px;"><b>Immediate</b> - R6.00 transactions fee will be charged for each beneficiary</span>
            <h3 style="position: absolute; top: 50px;">Cut-off times</h3>
            <ul>
            <li>Mon-Fri: 06:00 - 16:00 (transactions up to R5 million)</li>
            <li>Mon-Fri: 16:00 - 20:00(transactions up to R250 000)</li>
            <li>Weekends and public holidays: 06:00 - 18:00 (transactions up to R250 000)</li>
            <li>Immediate payment cannot be stopped reversed or cancelled</li>
            <li>Only payment to RTC participating banks can be processed immediately</li>
</ul>
        </div>
         <div class="cut-off-popup-eft">
            <img src="../images/info-trans.svg" style="position: absolute; left: 10px; width: 15px; height: 30px; top: 1px; ">
            <span style="position: absolute; left: 30px;"><b>Same day </b>- Payments above R5 million be processed the same day. A transaction fee of R40.00 will be charged.</span>
            <h3 style="position: absolute; top: 50px;">Cut-off times</h3>
            <ul>
            <li>Mon-Fri: 15:30 (transactions up to R5 million)</li>
            <li>Saturday: Services not available</li>
            <li>Sunday, public holidays or after cut-times, payments will be processed the next business day</li>
           </ul>
        </div>
        <div class="cut-off-popup-eft">
            <img src="../images/info-trans.svg" style="position: absolute; left: 10px; width: 15px; height: 30px; top: 1px; ">
            <span style="position: absolute; left: 30px;"><b>SARS efiling </b>- A R10.00 transaction fee will be charged.</span>
            <h3 style="position: absolute; top: 50px;">Cut-off times</h3>
            <ul>
            <li>Mon-Fri: 15:30 (transactions up to R5 million)</li>
            <li>Saturday: Services not available</li>
            <li>Sunday, public holidays or after cut-times, payments will be processed the next business day</li>
           </ul>
        </div>
    </div>
    <div class="line" style="position: absolute; border-top: 1px solid #cccccc; bottom: 55px; width: 100%"></div>
    <div class="okay" id="okay" >Okay</div>
</div>
<div class="letsgo">
    <button class="cancel">Cancel</button>
    <button class="next" id="nextBtn">Continue</button>
</div>
`;

const style = document.createElement('style');
style.textContent = `
.dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 100%;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    padding: 10px;
    border-radius: 5px;
}
.dropdown-content table {
    width: 100%;
    border-collapse: collapse;
}
.dropdown-content th, .dropdown-content td {
    border: 1px solid #ddd;
    padding: 8px;
    text-align: left;
}
.dropdown-content th {
    background-color: #f2f2f2;
}
.dropdown-content.open {
    display: block;
}
.drop {
    position: relative;
    padding: 10px;
    background-color: #f5f5f5;
    border-radius: 5px;
    margin-top: 20px;
    cursor: pointer;
}
.drop img:first-child {
    position: relative;
    top: 3px;
    margin-right: 5px;
}
.dragover {
    border: 2px dashed #00aeff !important;
    background-color: #f0f8ff !important;
}
`;
document.head.appendChild(style);

document.addEventListener('click', function (e) {
    if (e.target.id === 'cut-off-popup') {
        document.getElementById('popup').style.display = 'flex';
    }
    if (e.target.classList.contains('overlay') || e.target.id === 'okay') {
        document.getElementById('popup').style.display = 'none';
    }
    if (e.target.id === 'nextBtn') {
        showUploadStep();
    }
    if (e.target.closest('.drop')) {
        const dropdown = document.getElementById('dropdownTable');
        if (dropdown) {
            dropdown.classList.toggle('open');
        }
    } else {
        const dropdowns = document.querySelectorAll('.dropdown-content');
        dropdowns.forEach(dropdown => {
            dropdown.classList.remove('open');
        });
    }
});

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        document.getElementById('popup').style.display = 'none';
    }
});

function showUploadStep() {
    document.getElementById('disclaimerBox').innerHTML = `
    <div id="dropArea" class="dropArea">
        <img src="../images/upload.svg" style="width: 100px; height: 100px;">
        <p>Drag & Drop your CSV or TXT file here</p>
        <p>or</p>
        <input type="file" id="fileInput" accept=".csv, .txt" style="display:none;">
        <button id="browseBtn">Browse Files</button>
        <p style="font-size: 0.8rem; color: #555;">Only CSV or TXT files are allowed.</p>
    </div>
    <div class="drop">
        <img src="../images/info-trans.svg">
        <span style="position: relative; left: 5px;">How to format a bulk payment file</span>
        <img src="../images/more-chevron.svg" style="position: absolute; right: 10px; top: 15px;">
    </div>
    <div class="dropdown-content" id="dropdownTable">
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
    `;

    const dropArea = document.getElementById('dropArea');
    const fileInput = document.getElementById('fileInput');
    const browseBtn = document.getElementById('browseBtn');

    browseBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => handleFiles(e.target.files));

    dropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropArea.classList.add('dragover');
    });
    dropArea.addEventListener('dragleave', () => dropArea.classList.remove('dragover'));
    dropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        dropArea.classList.remove('dragover');
        handleFiles(e.dataTransfer.files);
    });
}

function handleFiles(files) {
    if (!files.length) return;
    const file = files[0];
    if (file.name.endsWith('.csv') || file.name.endsWith('.txt')) {
        alert('File selected: ' + file.name);
    } else {
        alert('Invalid file type. Please upload a CSV or TXT file.');
    }
}

const sameDayBtn = document.getElementById('sameDay');
sameDayBtn.addEventListener('click', function() {
    document.getElementById('mainContent').innerHTML =  `
            <div class="content-header">
            <h1 style="position: absolute; top: 50px; text-wrap: nowrap;">Bulk Payment</h1>
    </div>
        <div class="disclaimer-box" id="disclaimerBox">
            <div class="payment-header">
                <h2>Payment details</h2>
                <div class="left">
                    <div class="upper-left">
                        <select class="uu">
                            <option>From account</option>
                            <option>
                                <div class="account-number" style="position: absolute;"><img src="../images/transact.svg" alt="transact">105 2626 4558</div>
                            </option>
                        </select>
                        <input type="text" placeholder="Your reference" class="oo">
                    </div>
                    <div class="lower-left">
                        <h4>Show in transaction history as</h4>
                        <span class="radio-group">
                    <input type="radio" name="paymentType" id="one">
                    <label for="one">One payment</label>
                    <input type="radio" name="paymentType" id="separate">
                    <label for="separate">Separate Payments</label>
                </span>
                    </div>
                </div>
                <div class="rights">
                    <h4 style="position: absolute; text-wrap: nowrap; left: -160px; top: -10px; font-weight: lighter;">Payment type</h4>
                    <div class="eft" id="">
                        <img src="../images/send-cash-active.svg" style="position: absolute; left: 40px; width: 50px; height: 30px; top: 10px;">
                            <span style="position: absolute; top: 45px; left: 30px">Normal EFT</span>
                    </div>
                    <div class="same-day action" id="sameDay">
                        <img src="../images/same-day.svg" style="position: absolute; left: 40px; width: 50px; height: 30px; top: 10px;">
                            <span style="position: absolute; top: 45px; left: 35px">Same Day</span>
                    </div>
                    <div class="cut-off">
                        <img src="../images/info-trans.svg" style="position: absolute; left: 10px; width: 15px; height: 30px; top: 5px;">
                            <span style="position: absolute; left: 30px; top: 15px; font-size: 0.6rem;">Transaction fee:</span>
                            <div class="cut-off-box">
                                <span><b>EFT</b> - R2.00 per beneficiary</span>
                                <span><b>Immediate</b> - R6.00 per beneficiary</span>
                                <span><b>Same day</b> - R40.00 per beneficiary</span>
                                <span><b>Capitec beneficiaries</b> - R1.00</span>
                                <span><b>SARS eFiling</b> - R10.00</span>
                                <span style="color: #00aeff; cursor: pointer;" id="cut-off-popup">Cut-off and available times</span>
                            </div>
                    </div>
                   
                </div>
            </div>
        </div>
        <div class="cut-off-popup" id="popup" style="display:none;">
            <div class="overlay"></div>
            <div class="cut-off-popup-header"><b>Payment types</b></div>
            <div class="cut-off-popup-body">
                <div class="cut-off-popup-eft">
                    <img src="../images/info-trans.svg" style="position: absolute; left: 10px; width: 15px; height: 30px; top: 1px; ">
                        <span style="position: absolute; left: 30px;"><b>Normal EFT</b> - R2.00 transaction fee will be changed for each beneficairy</span>
                        <h3 style="position: absolute; top: 50px;">Cut-off times</h3>
                        <ul>
                            <li>Mon-Fri: 16:00 (transactions up to R5 million)</li>
                            <li>Saturday: 10:15 (transactions up to R5 million)</li>
                            <li>Sunday, public holidays or after cut-times, payments will be processed the next business day</li>
                            <li>Capitec to Capitec payments will be processed immediately</li>
                        </ul>
                </div>
                <div class="cut-off-popup-eft" >
                    <img src="../images/info-trans.svg" style="position: absolute; left: 10px; width: 15px; height: 30px; top: 1px; ">
                        <span style="position: absolute; left: 30px;"><b>Immediate</b> - R6.00 transactions fee will be charged for each beneficiary</span>
                        <h3 style="position: absolute; top: 50px;">Cut-off times</h3>
                        <ul>
                            <li>Mon-Fri: 06:00 - 16:00 (transactions up to R5 million)</li>
                            <li>Mon-Fri: 16:00 - 20:00(transactions up to R250 000)</li>
                            <li>Weekends and public holidays: 06:00 - 18:00 (transactions up to R250 000)</li>
                            <li>Immediate payment cannot be stopped reversed or cancelled</li>
                            <li>Only payment to RTC participating banks can be processed immediately</li>
                        </ul>
                </div>
                <div class="cut-off-popup-eft">
                    <img src="../images/info-trans.svg" style="position: absolute; left: 10px; width: 15px; height: 30px; top: 1px; ">
                        <span style="position: absolute; left: 30px;"><b>Same day </b>- Payments above R5 million be processed the same day. A transaction fee of R40.00 will be charged.</span>
                        <h3 style="position: absolute; top: 50px;">Cut-off times</h3>
                        <ul>
                            <li>Mon-Fri: 15:30 (transactions up to R5 million)</li>
                            <li>Saturday: Services not available</li>
                            <li>Sunday, public holidays or after cut-times, payments will be processed the next business day</li>
                        </ul>
                </div>
                <div class="cut-off-popup-eft">
                    <img src="../images/info-trans.svg" style="position: absolute; left: 10px; width: 15px; height: 30px; top: 1px; ">
                        <span style="position: absolute; left: 30px;"><b>SARS efiling </b>- A R10.00 transaction fee will be charged.</span>
                        <h3 style="position: absolute; top: 50px;">Cut-off times</h3>
                        <ul>
                            <li>Mon-Fri: 15:30 (transactions up to R5 million)</li>
                            <li>Saturday: Services not available</li>
                            <li>Sunday, public holidays or after cut-times, payments will be processed the next business day</li>
                        </ul>
                </div>
            </div>
            <div class="line" style="position: absolute; border-top: 1px solid #cccccc; bottom: 55px; width: 100%"></div>
            <div class="okay" id="okay" >Okay</div>
        </div>
        <div class="letsgo">
            <button class="cancel">Cancel</button>
            <button class="next" id="nextBtn">Continue</button>
        </div>

    `
    })
