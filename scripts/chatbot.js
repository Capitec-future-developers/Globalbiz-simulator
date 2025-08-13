const body = document.querySelector('body');
const chatInput = document.querySelector('.chat-input textarea');
const sendChatBtn = document.querySelector('.chat-input span');
const chatbox = document.querySelector('.chatbox');
const chatbotToggler = document.querySelector('.chatbot-toggler');
const closeBtn = document.querySelector('.chatbot header span');

let userMessage;

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

// Main response generator with minimal intent handling
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

    // Intent: check balance or account info
    if (/(balance|how much.*money|account info|account name)/i.test(msg)) {
        const { name, balance } = getCurrentAccountInfo();
        const li = createIncomingHtml(`<p>Your current account is <strong>${name}</strong> with a balance of <strong>${balance}</strong>.</p>`);
        chatbox.appendChild(li);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        return;
    }

    // Default suggestions
    const suggestions = `
        <div>
            <p>Hi! I can help with:</p>
            <ul class="chat-options">
                <li>✅ How to pay a saved beneficiary</li>
                <li>💸 Make a once-off payment</li>
                <li>📄 View or download documents</li>
            </ul>
            <p style="margin-top:6px;font-size:12px;color:#666;">Tip: Use the box at the top to run automations too.</p>
        </div>
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

// Events
sendChatBtn.addEventListener('click', handleChat);
chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleChat();
    }
});

chatbotToggler.addEventListener('click', () => {
    body.classList.toggle('show-chatbot');
});

closeBtn.addEventListener('click', () => {
    body.classList.remove('show-chatbot');
});

// Ensure hidden by default
body.classList.remove('show-chatbot');