import useScopedStylesheets from '../../hooks/useScopedStylesheets';

const STYLESHEETS = [
    '/legacy-styles/Computer.css',
    '/legacy-styles/Chatbotcomputer.css',
    '/legacy-styles/Product&Service.css',
];

// Faithful React port of Computer/Product&Services.html's main content
// (header/sidebar/search-container are owned by ComputerShell).
export default function ComputerProductsServices() {
    useScopedStylesheets(STYLESHEETS);

    return (
        <main className="main-content">
            <h2>Products and Services</h2>
            <div className="container">
                <div className="heading"> Everything your business needs </div>
                <p className="ye">Grow your business with our simplified solutions.</p>
                <div className="line" style={{ borderBottom: '1px solid #cccccc', position: 'absolute', top: 100 }}></div>
                <div className="Product-container">
                    <img src="/images/save.svg" alt="Save icon" style={{ position: 'absolute', width: 40, height: 40, top: 10 }} />
                    <h2 style={{ position: 'absolute', left: 60, top: 20 }}>Save</h2>
                    <div className="Savings">
                        <h2 style={{ color: '#222450', position: 'absolute', left: 20 }}>Business Flexible Savings</h2>
                        <br /><br />
                        <p style={{ position: 'absolute', left: 20 }}>Earn attractive interest and access your money anytime.<br /> Open Now.</p>
                        <img src="/images/Her.png" alt="her" style={{ position: 'absolute', width: 200, height: 200, top: -10, right: 10 }} />
                        <button className="btn read-more" type="button">
                            <a href="https://www.capitecbank.co.za/business/save/business-flexible-savings/" target="_blank" rel="noopener noreferrer">Read More</a>
                        </button>
                        <button className="btn Add-account" type="button">Add Account</button>
                    </div>
                    <div className="Savings-32">
                        <h2 style={{ color: '#222450', position: 'absolute', left: 20 }}>32 Day Notice Account</h2>
                        <br /><br />
                        <p style={{ position: 'absolute', left: 20 }}>Earn even higher interest with our 32-day.<br /> notice savings plan.</p>
                        <img src="/images/She.png" alt="her" style={{ position: 'absolute', width: 200, height: 200, top: -10, right: 10 }} />
                        <button className="btns read-mores" type="button">Read More</button>
                        <button className="btns Add-accounts" type="button">Add Account</button>
                    </div>
                </div>

                <div className="transact">
                    <img src="/images/transact.svg" alt="Save icon" style={{ position: 'absolute', width: 40, height: 40, top: 10 }} />
                    <h2 style={{ position: 'absolute', left: 60, top: 20 }}>Transact</h2>
                    <div className="transacts">
                        <h2 style={{ color: '#222450', position: 'absolute', left: 20 }}>Special offer</h2>
                        <br /><br />
                        <p style={{ position: 'absolute', left: 20 }}>Buy a pro for R699.00 or Print for R1 399.00.<br /> once-off, no contact or hidden fees.</p>
                        <img src="/images/Machine.png" alt="her" style={{ position: 'absolute', width: 200, height: 200, top: -10, right: 10 }} />
                        <button className="btn read-more" type="button">
                            <a href="https://www.capitecbank.co.za/business/save/notice-account/" target="_blank" rel="noopener noreferrer">Read More</a>
                        </button>
                        <button className="btn Add-account" type="button">Contact Me</button>
                    </div>
                </div>
            </div>
        </main>
    );
}
