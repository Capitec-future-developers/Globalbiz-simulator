let body = document.querySelector('body');
let chatInput = document.querySelector('.chat-input textarea');
let sendChatBtn = document.querySelector('.chat-input span');
let chatbox = document.querySelector('.chatbox');
let chatbotToggler = document.querySelector('.chatbot-toggler');
let closeBtn = document.querySelector('.chatbot header span');

let userMessage;

// Ensure chatbot widget and assets exist on every page
(function ensureChatbot() {
    try {
        // Inject Material Icons if missing
        const hasIcons = Array.from(document.querySelectorAll('link[rel="stylesheet"], link[rel="preload"]')).some(l => (l.href || '').includes('fonts.googleapis.com/icon?family=Material+Icons+Sharp'));
        if (!hasIcons) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = 'https://fonts.googleapis.com/icon?family=Material+Icons+Sharp';
            document.head.appendChild(link);
        }

        // Helper to add stylesheet if not already present
        const addStylesheetOnce = (href) => {
            if (!href) return;
            const exists = Array.from(document.querySelectorAll('link[rel="stylesheet"]')).some(l => (l.getAttribute('href') || '').endsWith(href) || (l.href || '').includes(href));
            if (!exists) {
                const link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = href;
                document.head.appendChild(link);
            }
        };

        // Determine relative path to styles based on current location
        const path = (location.pathname || '').toLowerCase();
        const isComputer = path.includes('/computer/') || path.includes('\\computer\\');
        const isApp = path.includes('/app/') || path.includes('\\app\\');
        const stylesBase = (isComputer || isApp) ? '../styles/' : 'styles/';
        // Use standard web paths for CSS hrefs
        addStylesheetOnce(isComputer ? `${stylesBase}Chatbotcomputer.css` : `${stylesBase}chatbot.css`);

        // Inject chatbot markup if missing
        if (!document.querySelector('.chatbot')) {
            const toggler = document.createElement('button');
            toggler.className = 'chatbot-toggler';
            toggler.innerHTML = '<span class="material-icons-sharp">mode_comment<\/span><span class="material-icons-sharp">close<\/span>';

            const wrapper = document.createElement('div');
            wrapper.className = 'chatbot';
            wrapper.innerHTML = [
                '<header>',
                '  <h2>BIZCHAT<\/h2>',
                '  <span class="material-icons-sharp">close<\/span>',
                '<\/header>',
                '<ul class="chatbox">',
                '  <li class="chat incoming">',
                '    <span class="material-icons-sharp">account_circle<\/span>',
                '    <p>Welcome to Bizchat, how can I assist.<\/p>',
                '  <\/li>',
                '<\/ul>',
                '<div class="chat-input">',
                '  <textarea placeholder="Type your message here..." required><\/textarea>',
                '  <span id="send-btn" class="material-icons-sharp">send<\/span>',
                '<\/div>'
            ].join('');

            // Append near end of body to avoid layout clashes
            document.body.appendChild(toggler);
            document.body.appendChild(wrapper);
        }

        // Reselect elements now that we may have injected them
        body = document.body;
        chatInput = document.querySelector('.chat-input textarea');
        sendChatBtn = document.querySelector('.chat-input span');
        chatbox = document.querySelector('.chatbox');
        chatbotToggler = document.querySelector('.chatbot-toggler');
        closeBtn = document.querySelector('.chatbot header span');

    } catch (e) {
        console.error('Failed to ensure chatbot presence:', e);
    }
})();

// Helper to create chat message list items
const createChatLi = (message, className) => {
    const chatLi = document.createElement('li');
    chatLi.classList.add('chat', className);

    let contentHtml;
    if (className === 'outgoing') {
        contentHtml = `<p>${message}</p>`;
    } else {
        contentHtml = `<span class="material-icons-sharp">account_circle</span><p class="incoming">${message}</p>`;
    }

    chatLi.innerHTML = contentHtml;
    return chatLi;
};

// Insert HTML content as an incoming chat message (allows buttons/lists)
const createIncomingHtml = (html) => {
    const chatLi = document.createElement('li');
    chatLi.classList.add('chat', 'incoming');
    chatLi.innerHTML = `<span class="material-icons-sharp">account_circle</span><div class="incoming">${html}</div>`;
    return chatLi;
};

// Build a rich "card" style response block
const buildCard = ({ title, subtitle = '', body = '', list = [], links = [], chips = [] }) => {
    const listHtml = list.length ? `<ul class="chat-list">${list.map(item => `<li>${item}</li>`).join('')}</ul>` : '';
    const linksHtml = links.length ? `<div class="chat-links">${links.map(l => `<a class="chat-link" href="${l.href}" target="_blank" rel="noopener">${l.text}</a>`).join('')}</div>` : '';
    const chipsHtml = chips.length ? `<div class="chat-chips">${chips.map(c => `<button class="chip" data-chip="${c.value}">${c.label}</button>`).join('')}</div>` : '';
    const subtitleHtml = subtitle ? `<div class="chat-subtitle">${subtitle}</div>` : '';
    return `
      <div class="chat-card">
        <div class="chat-title">${title}</div>
        ${subtitleHtml}
        ${body ? `<div class="chat-body">${body}</div>` : ''}
        ${listHtml}
        ${linksHtml}
        ${chipsHtml}
      </div>
    `;
};

// Try to read current account info from the page (project data already rendered by App.js)
const getCurrentAccountInfo = () => {
    const nameEl = document.getElementById('account-name');
    const balEl = document.getElementById('account-balance');
    return {
        name: nameEl ? nameEl.textContent.trim() : 'Account',
        balance: balEl ? balEl.textContent.trim() : 'N/A'
    };
};

// Build HTML for the "how to pay saved beneficiary" response with step list and automation button
const buildPaySavedBeneficiaryHelp = () => {
    const steps = [
        "Tap Transact at the bottom.",
        "Select Payments.",
        "Choose Pay Saved beneficiary.",
        "Pick a beneficiary from the list.",
        "Enter amount and reference, then confirm."
    ];

    const stepsHtml = `<ol>${steps.map(s => `<li>${s}</li>`).join('')}</ol>`;
    const html = `
        <div>
            <p>Here are the steps to pay a saved beneficiary:</p>
            ${stepsHtml}
            <div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap;">
                <button id="btn-start-pay-saved" style="padding:6px 10px;background:#007fff;color:#fff;border:none;border-radius:4px;cursor:pointer;">Start automation</button>
                <button id="btn-show-where" style="padding:6px 10px;background:#f0f0f0;color:#333;border:none;border-radius:4px;cursor:pointer;">Highlight steps</button>
            </div>
            <p style="font-size:12px;color:#666;margin-top:6px;">Automation will try to click through the UI for you. You can pause or terminate anytime.</p>
        </div>
    `;
    return html;
};

// Safe wrapper to execute an automation command if available
const tryExecuteAutomation = (command) => {
    try {
        if (typeof executeCommand === 'function') {
            executeCommand(command);
        } else {
            // Fallback: type into the automation search and click Go if present
            const input = document.getElementById('automation-search');
            const btn = document.getElementById('execute-automation');
            if (input && btn) {
                input.value = command;
                btn.click();
            } else {
                alert('Automation controls not available on this page.');
            }
        }
    } catch (e) {
        console.error('Failed to start automation:', e);
        alert('Unable to start automation.');
    }
};


const generateResponse = (text) => {
    const msg = (text || '').toLowerCase();

    // Intent: how to pay saved beneficiary
    if (/(how.*pay.*saved.*beneficiar|pay saved beneficiar|saved beneficiar.*pay)/i.test(msg)) {
        const html = buildPaySavedBeneficiaryHelp();
        const li = createIncomingHtml(html);
        chatbox.appendChild(li);
        chatbox.scrollTo(0, chatbox.scrollHeight);

        // Wire the buttons after insertion
        const startBtn = li.querySelector('#btn-start-pay-saved');
        const highlightBtn = li.querySelector('#btn-show-where');
        if (startBtn) startBtn.addEventListener('click', () => tryExecuteAutomation('pay saved beneficiary'));
        if (highlightBtn) highlightBtn.addEventListener('click', () => {
            // Turn off autopilot and run the command so the user can click along
            try {
                if (typeof sessionStorage !== 'undefined') {
                    const pending = sessionStorage.getItem('pendingAutomation');
                    if (pending) sessionStorage.removeItem('pendingAutomation');
                }
            } catch (_) {}
            tryExecuteAutomation('pay saved beneficiary');
        });
        return;
    }


    if (/(once\s*-?\s*off|once off|one-?time|single.*payment|make a payment)/i.test(msg)) {
        const steps = [
            'Tap Transact at the bottom.',
            'Select Payments.',
            'Choose Once-off payment.',
            'Enter recipient details, amount, and reference.',
            'Review and confirm.'
        ];
        const html = `
            <div>
                <p>Here are the steps to make a once-off payment:</p>
                <ol>${steps.map(s => `<li>${s}</li>`).join('')}</ol>
                <div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap;">
                    <button id="btn-start-onceoff" style="padding:6px 10px;background:#007fff;color:#fff;border:none;border-radius:4px;cursor:pointer;">Start automation</button>
                </div>
            </div>
        `;
        const li = createIncomingHtml(html);
        chatbox.appendChild(li);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        const startBtn = li.querySelector('#btn-start-onceoff');
        if (startBtn) startBtn.addEventListener('click', () => tryExecuteAutomation('make once off payment'));
        return;
    }

    // Intent: view or download documents
    if (/((view|download).*(document|statement|invoice|proof)|documents)/i.test(msg)) {
        const html = `
            <div>
                <p>To view or download your documents:</p>
                <ol>
                    <li>Go to Documents in the main menu.</li>
                    <li>Choose the document type (e.g., Statements, Proof of payment).</li>
                    <li>Select the account and period if prompted.</li>
                    <li>Tap View to preview or Download to save/share.</li>
                </ol>
                <div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap;">
                    <button id="btn-start-docs" style="padding:6px 10px;background:#007fff;color:#fff;border:none;border-radius:4px;cursor:pointer;">Open documents</button>
                </div>
            </div>
        `;
        const li = createIncomingHtml(html);
        chatbox.appendChild(li);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        const startBtn = li.querySelector('#btn-start-docs');
        if (startBtn) startBtn.addEventListener('click', () => tryExecuteAutomation('open documents'));
        return;
    }

    // Intent: check balance or account info
    if (/(balance|how much.*money|account info|account name)/i.test(msg)) {
        const { name, balance } = getCurrentAccountInfo();
        const li = createIncomingHtml(`<div class="chat-card"><div class="chat-title">Account balance</div><div class="chat-body">Your current account is <strong>${name}</strong> with a balance of <strong>${balance}</strong>.</div></div>`);
        chatbox.appendChild(li);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        return;
    }

    // Intent: fees / charges
    if (/(fees?|charges|pricing|costs|monthly fee)/i.test(msg)) {
        const html = buildCard({
            title: 'Fees and pricing (Business)',
            body: 'Capitec Business offers simple, transparent pricing designed for businesses. View our latest business banking fees online.',
            links: [
                { text: 'Capitec Business fees', href: 'https://www.capitecbank.co.za/business/' }
            ],
            chips: [
                { label: 'Open Payments', value: 'open payments' },
                { label: 'Open Cards', value: 'open cards' }
            ]
        });
        const li = createIncomingHtml(html);
        chatbox.appendChild(li);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        return;
    }

    // Intent: Capitec Business / Global Biz accounts
    if (/(global\s*one|global\s*biz|business account|account(s)?|types of account|open account)/i.test(msg)) {
        const html = buildCard({
            title: 'Capitec Business (Global Biz)',
            body: 'Business banking built to simplify your operations: pay suppliers, manage cards and control limits with powerful digital tools.',
            links: [
                { text: 'Capitec Business overview', href: 'https://www.capitecbank.co.za/business/' }
            ],
            chips: [
                { label: 'Open Accounts', value: 'go to account' },
                { label: 'Open Products', value: 'open products and services' }
            ]
        });
        const li = createIncomingHtml(html);
        chatbox.appendChild(li);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        return;
    }

    // Intent: Immediate payments (Business)
    if (/(immediate|instant|real\s*time|rtc).*pay/i.test(msg)) {
        const html = buildCard({
            title: 'Immediate payments (Business)',
            body: 'Make immediate payments to suppliers or other banks. Fees and limits apply per business profile. For details, see Capitec Business.',
            links: [
                { text: 'Capitec Business payments', href: 'https://www.capitecbank.co.za/business/' }
            ],
            chips: [
                { label: 'Make a payment', value: 'open payments' },
                { label: 'Adjust limits', value: 'open settings' }
            ]
        });
        const li = createIncomingHtml(html);
        chatbox.appendChild(li);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        return;
    }

    // Intent: Business payments
    if (/(cash\s*send|send cash|cashsend|pay supplier|pay suppliers|supplier payment)/i.test(msg)) {
        const html = buildCard({
            title: 'Business payments',
            body: 'Pay suppliers or transfer between accounts. For cash-related services and other business tools, see Capitec Business.',
            links: [
                { text: 'Capitec Business payments', href: 'https://www.capitecbank.co.za/business/' }
            ],
            chips: [
                { label: 'Open Payments', value: 'open payments' }
            ]
        });
        const li = createIncomingHtml(html);
        chatbox.appendChild(li);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        return;
    }

    // Intent: Limits
    if (/(limit(s)?|increase limit|card limit|daily limit|transaction limit)/i.test(msg)) {
        const html = buildCard({
            title: 'Card & transaction limits (Business)',
            list: [
                'Adjust card online/ATM limits',
                'Set daily EFT/payment limits',
                'Manage per-channel controls in Settings'
            ],
            links: [ { text: 'Capitec Business limits', href: 'https://www.capitecbank.co.za/business/' } ],
            chips: [ { label: 'Open Settings', value: 'open settings' } ]
        });
        const li = createIncomingHtml(html);
        chatbox.appendChild(li);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        return;
    }

    // Intent: Security
    if (/(security|fraud|scam|safe|pin|otp)/i.test(msg)) {
        const html = buildCard({
            title: 'Security tips for business',
            list: [
                'Never share your PIN, OTP, or app login details',
                'Verify payment requests and beneficiaries',
                'Use the official app and keep your device updated',
                'Report suspicious activity immediately'
            ],
            links: [ { text: 'Capitec Business security', href: 'https://www.capitecbank.co.za/business/' } ]
        });
        const li = createIncomingHtml(html);
        chatbox.appendChild(li);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        return;
    }

    // Intent: Cards
    if (/(card|debit card|virtual card)/i.test(msg)) {
        const html = buildCard({
            title: 'Business cards',
            list: [
                'Business debit cards for everyday purchases',
                'Virtual cards for safer online payments',
                'Freeze/unfreeze and manage limits in-app'
            ],
            links: [ { text: 'Capitec Business cards', href: 'https://www.capitecbank.co.za/business/' } ],
            chips: [ { label: 'Open Cards', value: 'open cards' } ]
        });
        const li = createIncomingHtml(html);
        chatbox.appendChild(li);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        return;
    }

    // Intent: Credit / Loans
    if (/(credit|loan|personal loan|access facility)/i.test(msg)) {
        const html = buildCard({
            title: 'Business credit options',
            body: 'Explore business-focused credit solutions (subject to approval). For more information, visit Capitec Business.',
            links: [ { text: 'Capitec Business credit', href: 'https://www.capitecbank.co.za/business/' } ]
        });
        const li = createIncomingHtml(html);
        chatbox.appendChild(li);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        return;
    }

    // Intent: Savings
    if (/(save|savings|fixed deposit|notice account)/i.test(msg)) {
        const html = buildCard({
            title: 'Business savings & tools',
            list: [
                'Flexible options to manage surplus business funds',
                'Fixed-term options depending on availability',
                'Set goals and track progress'
            ],
            links: [ { text: 'Capitec Business savings', href: 'https://www.capitecbank.co.za/business/' } ]
        });
        const li = createIncomingHtml(html);
        chatbox.appendChild(li);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        return;
    }

    // Intent: Contact us / Branch hours
    if (/(contact|call|support|client care|branch|hours|lost card)/i.test(msg)) {
        const html = buildCard({
            title: 'Contact Capitec Business',
            body: 'Get business banking help via the app or online. For urgent issues like a lost or stolen card, block it in-app and contact support.',
            links: [
                { text: 'Capitec Business', href: 'https://www.capitecbank.co.za/business/' }
            ]
        });
        const li = createIncomingHtml(html);
        chatbox.appendChild(li);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        return;
    }

    // Default suggestions
    const suggestions = `
        ${buildCard({
            title: 'How can I help?',
            body: 'Try one of these topics or ask your own question:',
            list: [
                'Pay a saved beneficiary',
                'Make an immediate payment',
                'View/download documents',
                'Manage card and limits',
                'Fees and pricing',
                'Contact support'
            ],
            chips: [
                { label: 'Open Payments', value: 'open payments' },
                { label: 'Open Cards', value: 'open cards' },
                { label: 'Open Settings', value: 'open settings' }
            ]
        })}
    `;
    const li = createIncomingHtml(suggestions);
    chatbox.appendChild(li);
    chatbox.scrollTo(0, chatbox.scrollHeight);
};

// Handle outgoing user message and respond
const handleChat = () => {
    const text = chatInput.value.trim();
    if (!text) return;

    chatbox.appendChild(createChatLi(text, 'outgoing'));
    chatInput.value = '';
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        // lightweight thinking effect
        const thinking = createChatLi('Thinking...', 'incoming');
        chatbox.appendChild(thinking);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        // replace with actual response
        setTimeout(() => {
            thinking.remove();
            generateResponse(text);
        }, 400);
    }, 300);
};

// Events - guard against missing elements
if (sendChatBtn && chatInput && chatbox) {
    sendChatBtn.addEventListener('click', handleChat);
    chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleChat();
        }
    });

    // Delegate click handling for quick-reply chips inside chatbot
    chatbox.addEventListener('click', (e) => {
        const target = e.target;
        if (target && target.classList && target.classList.contains('chip')) {
            const value = target.getAttribute('data-chip') || target.textContent || '';
            const text = value.trim();
            if (!text) return;
            // Show the selected chip as outgoing for context
            chatbox.appendChild(createChatLi(text, 'outgoing'));
            chatbox.scrollTo(0, chatbox.scrollHeight);
            // Attempt to execute an automation if it looks like a command
            if (/^(open |go to|make|pay|view)/i.test(text)) {
                tryExecuteAutomation(text.toLowerCase());
                return;
            }
            setTimeout(() => generateResponse(text), 150);
        }
    });
}

if (chatbotToggler) {
    chatbotToggler.addEventListener('click', () => {
        if (body && body.classList) body.classList.toggle('show-chatbot');
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        if (body && body.classList) body.classList.remove('show-chatbot');
    });
}

// Ensure hidden by default
if (body && body.classList) body.classList.remove('show-chatbot');