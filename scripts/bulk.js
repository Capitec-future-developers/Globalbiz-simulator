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
                    </select>
                    <input type="text" placeholder="Your reference" class="oo">
                </div>
                <div class="lower-left">
                    <h4>Show in transaction history as</h4>
                    <span class="radio-group">
                        <input type="radio" name="paymentType" id="one"><label for="one">One payment</label>
                        <input type="radio" name="paymentType" id="separate"><label for="separate">Separate Payments</label>
                    </span>
                </div>
            </div>
            <div class="rights">
                <h4 style="position: absolute; text-wrap: nowrap; left: -160px; top: -10px; font-weight: lighter;">Payment type</h4>
                <div class="eft action">
                    <img src="../images/send-cash-active.svg" style="position: absolute; left: 40px; width: 50px; height: 30px; top: 10px;">
                    <span style="position: absolute; top: 45px; left: 30px">Normal EFT</span>
                </div>
                <div class="same-day">
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
                        <span><b>Capitec benficiaries</b> - R1.00</span>
                        <span><b>SARS efilling</b> - R10.00</span>
                        <span style="color: #00aeff; cursor: pointer;" id="cut-off-popup">Cut-off and available times</span>
                    </div>
                </div>
                <input type="date" class="date">
            </div>
        </div>
    </div>

    <div class="cut-off-popup">
        <div class="overlay"></div>
        <div class="cut-off-popup-header">Payment types</div>
        <div class="cut-off-popup-body">
            <div class="cut-off-popup-eft">
                <img src="../images/info-trans.svg" style="position: absolute; left: 30px; width: 15px; height: 30px; top: 65px;">
                <span style="position: absolute; left: 50px;"><b>Normal EFT</b></span>
                <span></span>
            </div>
        </div>
        <div class="okay" id="okay">Okay</div>
    </div>

    <div class="letsgo">
        <button class="cancel">Cancel</button>
        <button class="next" id="nextBtn">Continue</button>
    </div>
`;

// Popup functionality
const cutOffBtn = document.getElementById('cut-off-popup');
const popup = document.querySelector('.cut-off-popup');
const overlay = document.querySelector('.cut-off-popup .overlay');
const closeBtn = document.getElementById('okay');

popup.style.display = 'none';

cutOffBtn.addEventListener('click', () => {
    popup.style.display = 'flex';
});

overlay.addEventListener('click', () => {
    popup.style.display = 'none';
});

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
    });
}

window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        popup.style.display = 'none';
    }
});


document.getElementById('nextBtn').addEventListener('click', () => {
    document.getElementById('disclaimerBox').innerHTML = `
       
        <div id="dropArea" class="dropArea">
        <img src="../images/upload.svg" style="position: absolute; width: 300px; height: 300px; align-content: center;"
            <p>Drag & Drop your CSV or TXT file here</p>
            <p>or</p>
            <input type="file" id="fileInput" accept=".csv, .txt" style="display:none;">
            <button id="browseBtn">Browse Files</button>
            <p style="font-size: 0.8rem; color: #555;">Only CSV or TXT files are allowed.</p>
        </div>
        <div class="drop">
        <img src="../images/info-trans.svg"  >
        <span style="position: absolute; top: 10px; left: 30px;">How to format a bulk payment file</span>
        <img src="../images/more-chevron.svg" style="position: absolute; right: 10px; top: 20px;">
</div>
    `;

    // Drag and drop logic
    const dropArea = document.getElementById('dropArea');
    const fileInput = document.getElementById('fileInput');
    const browseBtn = document.getElementById('browseBtn');

    browseBtn.addEventListener('click', () => fileInput.click());

    dropArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropArea.style.background = '#e3f2fd';
    });

    dropArea.addEventListener('dragleave', () => {
        dropArea.style.background = '#f9f9f9';
    });

    dropArea.addEventListener('drop', (e) => {
        e.preventDefault();
        dropArea.style.background = '#f9f9f9';
        handleFiles(e.dataTransfer.files);
    });

    fileInput.addEventListener('change', (e) => {
        handleFiles(e.target.files);
    });

    function handleFiles(files) {
        const file = files[0];
        if (file && (file.name.endsWith('.csv') || file.name.endsWith('.txt'))) {
            alert('File selected: ' + file.name);
            // Process file here
        } else {
            alert('Invalid file type. Please upload a CSV or TXT file.');
        }
    }
});
