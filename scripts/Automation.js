// Complete Advanced Automation System
const automationConfig = {
    stepDelay: 900,
    highlightDuration: 700,
    preHighlightDelay: 550,
    preClickDelay: 400,
    highlightColor: '0 0 0 4px rgba(255, 215, 0, 0.7)',
    autopilot: true,
    speechEnabled: false,
    controlsPosition: 'right',
    highlightColors: {
        default: 'rgba(65, 131, 215, 0.7)',
        success: 'rgba(46, 204, 113, 0.7)',
        warning: 'rgba(241, 196, 15, 0.7)',
        error: 'rgba(231, 76, 60, 0.7)'
    },
    maxRetries: 3,
    retryDelay: 1500,
    navigationTimeout: 5000,
    elementWaitTimeout: 10000,
    transitionDelay: 800,
    debugMode: false
};

// Your existing defaultAutomationCommands object - KEEP THIS EXACTLY AS IS
const defaultAutomationCommands = {
    'Documents': {
        steps: [
            { action: 'click', selector: '#sidebarToggle' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#documents' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#doc-type' },
            { action: 'wait', selector: '#doc-type' }
        ],
        description: 'Documents',
        category: 'documents'
    },
    'pay saved beneficiary': {
        steps: [
            { action: 'click', selector: '#transact' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#payment' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#pay-hub-saved' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '.nl-pay-row[data-index="0"]' }
        ],
        description: 'Initiate payment to a saved beneficiary',
        category: 'payments'
    },
    'add new beneficiary': {
        steps: [
            { action: 'click', selector: '#transact' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#beneficiaries' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#ben-hub-add' }
        ],
        description: 'Add a new beneficiary',
        category: 'beneficiaries'
    },
    'view transactions': {
        steps: [
            { action: 'click', selector: '#btn-transactions' }
        ],
        description: 'View transaction history',
        category: 'navigation'
    },
    'make once off payment': {
        steps: [
            { action: 'click', selector: '#transact' },
            { action: 'click', selector: '#payment' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#pay-hub-onceoff' }
        ],
        description: 'Make a once-off payment',
        category: 'payments'
    },
    'go to dashboard': {
        steps: [
            { action: 'click', selector: '#bottomNav' },
            { action: 'click', selector: '#Home' },
            { action: 'wait', duration: 1000 }
        ],
        description: 'Return to dashboard',
        category: 'Home'
    },
    'go to transaction limit': {
        steps: [
            { action: 'click', selector: '#sidebarToggle' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#settings' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#Transaction-Limits' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#editlimits' }
        ],
        description: 'Go to transaction limit',
        category: 'transaction limits'
    },
    'Create New Profile limits': {
        steps: [
            { action: 'click', selector: '#sidebarToggle' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#settings' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#Transaction-Limits' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#editlimits' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#limitInput'},
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#continueEdit'},
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#finalConfirm'}
        ],
        description: 'Create New Profile limits',
        category: 'transaction limits'
    },
    'Create New Account limits': {
        steps: [
            { action: 'click', selector: '#sidebarToggle' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#settings' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#Transaction-Limits' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#editAccountLimit' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#activateDrop'},
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#btnUpdateLimit'}
        ],
        description: 'Create New Account limits',
        category: 'transaction limits'
    },
    'Add new card': {
        steps: [
            { action: 'click', selector: '#cards' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#Add-Card' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#debit-card-option' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#continue-btn' }
        ],
        description: 'Add new card',
        category: 'cards'
    },
    'Debit card': {
        steps: [
            { action: 'click', selector: '#bottomNav' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#cards' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#debitToggle' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#debit-card' }
        ],
        description: 'Debit card',
        category: 'cards'
    },
    'open accounts': {
        steps: [
            { action: 'navigate', url: 'Phone%20accounts.html' }
        ],
        description: 'Open accounts page',
        category: 'navigation'
    },
    'open transact': {
        steps: [
            { action: 'click', selector: '#transact' }
        ],
        description: 'Open Transact tab',
        category: 'navigation'
    },
    'open cards': {
        steps: [
            { action: 'click', selector: '#cards' }
        ],
        description: 'Open Cards tab',
        category: 'navigation'
    },
    'open settings': {
        steps: [
            { action: 'click', selector: '#sidebarToggle' },
            { action: 'wait', duration: 500 },
            { action: 'click', selector: '#settings' }
        ],
        description: 'Open Settings',
        category: 'navigation'
    },
    'open documents': {
        steps: [
            { action: 'click', selector: '#sidebarToggle' },
            { action: 'wait', duration: 500 },
            { action: 'click', selector: '#documents' }
        ],
        description: 'Open Documents',
        category: 'navigation'
    },
    'open chatbot': {
        steps: [
            { action: 'click', selector: '.chatbot-toggler' }
        ],
        description: 'Toggle chatbot window',
        category: 'assistance'
    },
    'view profile': {
        steps: [
            { action: 'click', selector: '#profile-link' }
        ],
        description: 'Open profile popup',
        category: 'profile'
    },
    'log out to login screen': {
        steps: [
            { action: 'navigate', url: 'Phone.html' }
        ],
        description: 'Sign out to login screen',
        category: 'session'
    },
    'open explore': {
        steps: [
            { action: 'navigate', url: 'Explore.html' }
        ],
        description: 'Open Explore page',
        category: 'navigation'
    },
    'open profile menu': {
        steps: [
            { action: 'click', selector: '.nl-avatar-link' }
        ],
        description: 'Open the new-look profile menu page',
        category: 'profile'
    },
    'switch profile': {
        steps: [
            { action: 'click', selector: '#switchProfileBtn' }
        ],
        description: 'Open the switch-profile popup on the profile menu page',
        category: 'profile'
    },
    'expand user management': {
        steps: [
            { action: 'click', selector: '#userManagementToggle' }
        ],
        description: 'Expand the User Management accordion on the profile menu page',
        category: 'profile'
    },
    'expand authorisations': {
        steps: [
            { action: 'click', selector: '#authorisationsToggle' }
        ],
        description: 'Expand the Authorisations accordion on the profile menu page',
        category: 'profile'
    },
    'sign out': {
        steps: [
            { action: 'click', selector: '#signOutLink' }
        ],
        description: 'Sign out from the profile menu page',
        category: 'session'
    },
    'open transfers': {
        steps: [
            { action: 'click', selector: '#transact' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#transfer' }
        ],
        description: 'Open the Transfers hub (new look)',
        category: 'payments'
    },
    'new transfer': {
        steps: [
            { action: 'click', selector: '#transact' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#transfer' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#transfers-hub-new' }
        ],
        description: 'Move money between your own accounts (new look)',
        category: 'payments'
    },
    'open payments': {
        steps: [
            { action: 'click', selector: '#transact' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#payment' }
        ],
        description: 'Open the Payments hub (new look)',
        category: 'payments'
    },
    'once-off payment new look': {
        steps: [
            { action: 'click', selector: '#transact' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#payment' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#pay-hub-onceoff' }
        ],
        description: 'Once-off payment chooser (new look)',
        category: 'payments'
    },
    'pay a bank account': {
        steps: [
            { action: 'click', selector: '#transact' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#payment' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#pay-hub-onceoff' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#onceoff-bank' }
        ],
        description: 'Pay a bank account (new look)',
        category: 'payments'
    },
    'pay a public beneficiary': {
        steps: [
            { action: 'click', selector: '#transact' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#payment' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#pay-hub-onceoff' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#onceoff-public' }
        ],
        description: 'Pay a public beneficiary (new look)',
        category: 'payments'
    },
    'multiple beneficiaries': {
        steps: [
            { action: 'click', selector: '#transact' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#payment' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#pay-hub-multiple' }
        ],
        description: 'Saved group or multiple-beneficiary payments (new look)',
        category: 'beneficiaries'
    },
    'manage beneficiary groups': {
        steps: [
            { action: 'click', selector: '#transact' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#payment' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#pay-hub-multiple' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#multi-saved-group' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#ben-group-pay-search' }
        ],
        description: 'Add or manage beneficiary groups (new look)',
        category: 'beneficiaries'
    },
    'authorisation settings': {
        steps: [
            { action: 'click', selector: '#transact' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#payment' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#pay-hub-auth' }
        ],
        description: 'Who must approve beneficiary changes (new look)',
        category: 'settings'
    },
    'manage beneficiaries new look': {
        steps: [
            { action: 'click', selector: '#transact' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#beneficiaries' }
        ],
        description: 'Open Beneficiaries (new look)',
        category: 'beneficiaries'
    },
    'card settings': {
        steps: [
            { action: 'click', selector: '#cards' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '.cd-card-row:first-child' }
        ],
        description: 'Open card settings for the first card (new look)',
        category: 'cards'
    },
    'card limits new look': {
        steps: [
            { action: 'click', selector: '#cards' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '.cd-card-row:first-child' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#cd-card-limits-row' }
        ],
        description: 'Update card limits (new look)',
        category: 'cards'
    },
    'stop card': {
        steps: [
            { action: 'click', selector: '#cards' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '.cd-card-row:first-child' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#cd-stop-card-row' }
        ],
        description: 'Stop a card (new look)',
        category: 'cards'
    },
    'add to apple wallet': {
        steps: [
            { action: 'click', selector: '#cards' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '.cd-card-row:first-child' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#cd-apple-wallet-row' }
        ],
        description: 'Add a card to Apple Wallet (new look)',
        category: 'cards'
    },
    'open savings account': {
        steps: [
            { action: 'navigate', url: 'Savings-account.html' }
        ],
        description: 'Open the Savings/Investment account opening wizard',
        category: 'products'
    },
    'open card machines': {
        steps: [
            { action: 'navigate', url: 'Card-machines.html' }
        ],
        description: 'Open the Card Machines product page',
        category: 'products'
    },
    'open credit': {
        steps: [
            { action: 'navigate', url: 'Credit.html' }
        ],
        description: 'Open the Credit page',
        category: 'products'
    },
    'contact support': {
        steps: [
            { action: 'navigate', url: 'Support.html?from=business' }
        ],
        description: 'Contact Client Care / in-app calling',
        category: 'assistance'
    },
    'open globalone home': {
        steps: [
            { action: 'navigate', url: 'GlobalOne-Home.html' }
        ],
        description: 'Open GlobalOne personal banking home',
        category: 'globalone'
    },
    'open globalone cards': {
        steps: [
            { action: 'navigate', url: 'GlobalOne-Cards.html' }
        ],
        description: 'Open GlobalOne Cards tab',
        category: 'globalone'
    },
    'open globalone transact': {
        steps: [
            { action: 'navigate', url: 'GlobalOne-Transact.html' }
        ],
        description: 'Open GlobalOne Transact tab',
        category: 'globalone'
    },
    'open globalone profile': {
        steps: [
            { action: 'navigate', url: 'GlobalOne-Profile.html' }
        ],
        description: 'Open GlobalOne profile menu',
        category: 'globalone'
    },
    'view personal card details': {
        steps: [
            { action: 'navigate', url: 'GlobalOne-Cards.html' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#goCardDetailsToggle' }
        ],
        description: 'Show personal debit card number and CVV',
        category: 'globalone'
    },
    'freeze personal card': {
        steps: [
            { action: 'navigate', url: 'GlobalOne-Cards.html' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#goFreezeToggle' }
        ],
        description: 'Freeze the GlobalOne debit card',
        category: 'globalone'
    },
    'search personal transactions': {
        steps: [
            { action: 'navigate', url: 'GlobalOne-Transact.html' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#goAccSearch' }
        ],
        description: 'Search GlobalOne account transactions',
        category: 'globalone'
    },
    'get insurance cover': {
        steps: [
            { action: 'navigate', url: 'GlobalOne-Home.html' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: 'a[href="GlobalOne-Insure.html"]' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#goGetCover' }
        ],
        description: 'Open Insure and get cover',
        category: 'globalone'
    },
    'view globalone rewards': {
        steps: [
            { action: 'navigate', url: 'GlobalOne-Rewards.html' }
        ],
        description: 'Open GlobalOne Rewards',
        category: 'globalone'
    },
    'sign out globalone': {
        steps: [
            { action: 'navigate', url: 'GlobalOne-Profile.html' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#goSignOut' }
        ],
        description: 'Sign out of GlobalOne',
        category: 'globalone'
    },
    'open an account': {
        steps: [
            { action: 'click', selector: '#robOpenAccountOpt' },
            { action: 'wait', duration: 500 },
            { action: 'click', selector: '#robBusinessOpt' },
            { action: 'wait', duration: 500 },
            { action: 'click', selector: '#robGetStarted' },
            { action: 'wait', duration: 1800 }
        ],
        description: 'Start opening a business account (ROB)',
        category: 'rob'
    },
    'start new business application': {
        steps: [
            { action: 'click', selector: '#robOpenAccountOpt' },
            { action: 'wait', duration: 500 },
            { action: 'click', selector: '#robBusinessOpt' },
            { action: 'wait', duration: 500 },
            { action: 'click', selector: '#robGetStarted' },
            { action: 'wait', duration: 1800 },
            { action: 'click', selector: '#robStartNewApplication' }
        ],
        description: 'Open a business account and start a new application (ROB)',
        category: 'rob'
    },
    'choose business type': {
        steps: [
            { action: 'click', selector: '#robOpenAccountOpt' },
            { action: 'wait', duration: 500 },
            { action: 'click', selector: '#robBusinessOpt' },
            { action: 'wait', duration: 500 },
            { action: 'click', selector: '#robGetStarted' },
            { action: 'wait', duration: 1800 },
            { action: 'click', selector: '#robStartNewApplication' },
            { action: 'wait', duration: 500 }
        ],
        description: 'Go to the choose-a-business-type screen (ROB)',
        category: 'rob'
    }
};

let automationCommands = defaultAutomationCommands;

// Enhanced state management
let automationState = {
    isPaused: false,
    currentStepIndex: 0,
    currentSteps: [],
    currentCommand: '',
    currentTimeout: null,
    isAutopilot: getStoredSetting('autopilot', automationConfig.autopilot),
    waitingForUserClick: false,
    manualNavigation: false,
    clickHandlers: [],
    speechEnabled: getStoredSetting('speechEnabled', automationConfig.speechEnabled),
    stepDelay: getStoredSetting('stepDelay', automationConfig.stepDelay),
    controlsPosition: getStoredSetting('controlsPosition', automationConfig.controlsPosition),
    highlightColors: getStoredSetting('highlightColors', automationConfig.highlightColors),
    retryCount: 0,
    errorCount: 0,
    startTime: null,
    totalStepsCompleted: 0
};

function getStoredSetting(key, defaultValue) {
    try {
        const storedValue = localStorage.getItem(`automation_${key}`);
        if (storedValue !== null) {
            return key === 'highlightColors' ? JSON.parse(storedValue) : JSON.parse(storedValue);
        }
    } catch (e) {
        console.error('Error parsing stored setting:', e);
    }
    return defaultValue;
}

function storeSetting(key, value) {
    localStorage.setItem(`automation_${key}`, JSON.stringify(value));
}

// Load commands from API
function loadAutomationCommands() {
    try {
        const isComputer = /Computer\\|Computer\//i.test(window.location.pathname) || /Computer/i.test(document.title);
        const ctx = isComputer ? 'computer' : 'app';
        fetch(`/api/automation-tasks?context=${ctx}`)
            .then(r => r.ok ? r.json() : Promise.reject(r.statusText))
            .then(data => {
                if (data && Array.isArray(data.tasks)) {
                    const loaded = {};
                    data.tasks.forEach(t => {
                        if (t && t.key && Array.isArray(t.steps)) {
                            loaded[t.key] = {
                                steps: t.steps,
                                description: t.description || t.key,
                                category: t.category || 'general'
                            };
                        }
                    });
                    if (Object.keys(loaded).length > 0) {
                        automationCommands = loaded;
                        showFeedbackMessage('Automation tasks updated from database', 'info');
                    }
                }
            })
            .catch(() => {
                // Silently fail - use defaults
            });
    } catch (_) {
        // Silently fail
    }
}

// Create settings button
function createSettingsButton() {
    const settingsBtn = document.createElement('button');
    settingsBtn.id = 'automation-settings-btn';
    settingsBtn.innerHTML = '⚙️';
    settingsBtn.title = 'Automation Settings';
    settingsBtn.style.cssText = `
        position: fixed;
        top: 20px;
        left: 15px;
        z-index: 10000;
        padding: 8px 12px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        background-color: #f0f0f0;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    `;
    settingsBtn.addEventListener('click', toggleSettingsPanel);
    document.body.appendChild(settingsBtn);
    return settingsBtn;
}

// Create settings panel
function createSettingsPanel() {
    const panel = document.createElement('div');
    panel.id = 'automation-settings-panel';
    panel.style.cssText = `
        position: fixed;
        top: 60px;
        left: 20px;
        z-index: 10000;
        background-color: rgba(255, 255, 255, 0.95);
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        width: 300px;
        display: none;
    `;

    panel.innerHTML = `
        <div class="setting-group">
            <h3 style="margin-top: 0;">Automation Speed</h3>
            <div style="display: flex; align-items: center; gap: 10px;">
                <input type="range" id="automation-speed" min="100" max="2000" step="100" value="${automationState.stepDelay}">
                <span id="speed-value">${automationState.stepDelay}ms</span>
            </div>
        </div>
        <div class="setting-group" style="margin-top: 15px;">
            <h3>Controls Position</h3>
            <select id="controls-position">
                <option value="left" ${automationState.controlsPosition === 'left' ? 'selected' : ''}>Left</option>
                <option value="right" ${automationState.controlsPosition === 'right' ? 'selected' : ''}>Right</option>
            </select>
        </div>
        <div class="setting-group" style="margin-top: 15px;">
            <h3>Highlight Colors</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                <div>
                    <label>Default</label>
                    <input type="color" id="highlight-default" value="${hexToRgb(automationState.highlightColors.default)}">
                </div>
                <div>
                    <label>Success</label>
                    <input type="color" id="highlight-success" value="${hexToRgb(automationState.highlightColors.success)}">
                </div>
                <div>
                    <label>Warning</label>
                    <input type="color" id="highlight-warning" value="${hexToRgb(automationState.highlightColors.warning)}">
                </div>
                <div>
                    <label>Error</label>
                    <input type="color" id="highlight-error" value="${hexToRgb(automationState.highlightColors.error)}">
                </div>
            </div>
        </div>
        <div class="setting-group" style="margin-top: 15px; display: flex; align-items: center; justify-content: space-between;">
            <div>
                <h3 style="margin: 0;">Read Aloud</h3>
                <p style="margin: 5px 0 0; font-size: 12px; color: #666;">Read automation steps aloud</p>
            </div>
            <label class="switch">
                <input type="checkbox" id="speech-toggle" ${automationState.speechEnabled ? 'checked' : ''}>
                <span class="slider round"></span>
            </label>
        </div>
        <button id="save-settings" style="margin-top: 20px; padding: 8px 15px; background-color: #007fff; color: white; border: none; border-radius: 4px; cursor: pointer; width: 100%;">Save Settings</button>
        <div class="setting-group" style="margin-top: 15px; border-top: 1px solid #e2e5ea; padding-top: 12px;">
            <a href="Database.html" style="display:block; text-align:center; background:#0070a0; color:#fff; text-decoration:none; padding:10px; border-radius:6px; font-size:0.9rem; font-weight:500;">Open Database</a>
        </div>
        <style>
            .switch {
                position: relative;
                display: inline-block;
                width: 60px;
                height: 34px;
            }
            .switch input {
                opacity: 0;
                width: 0;
                height: 0;
            }
            .slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #ccc;
                transition: .4s;
            }
            .slider:before {
                position: absolute;
                content: "";
                height: 26px;
                width: 26px;
                left: 4px;
                bottom: 4px;
                background-color: white;
                transition: .4s;
            }
            input:checked + .slider {
                background-color: #007fff;
            }
            input:checked + .slider:before {
                transform: translateX(26px);
            }
            .slider.round {
                border-radius: 34px;
            }
            .slider.round:before {
                border-radius: 50%;
            }
            #automation-speed {
                width: 100%;
            }
            #controls-position {
                padding: 5px;
                width: 100%;
            }
        </style>
    `;

    document.body.appendChild(panel);
    document.getElementById('automation-speed').addEventListener('input', function() {
        document.getElementById('speed-value').textContent = `${this.value}ms`;
    });
    document.getElementById('save-settings').addEventListener('click', saveSettings);
    return panel;
}

function hexToRgb(rgba) {
    const parts = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (!parts) return '#000000';
    const r = parseInt(parts[1]).toString(16).padStart(2, '0');
    const g = parseInt(parts[2]).toString(16).padStart(2, '0');
    const b = parseInt(parts[3]).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
}

function hexToRgba(hex, alpha = 0.7) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function toggleSettingsPanel() {
    const panel = document.getElementById('automation-settings-panel');
    if (panel) {
        panel.style.display = panel.style.display === 'none' ? 'block' : 'none';
    }
}

function saveSettings() {
    const speed = parseInt(document.getElementById('automation-speed').value);
    const position = document.getElementById('controls-position').value;
    const speechEnabled = document.getElementById('speech-toggle').checked;
    const highlightColors = {
        default: hexToRgba(document.getElementById('highlight-default').value),
        success: hexToRgba(document.getElementById('highlight-success').value),
        warning: hexToRgba(document.getElementById('highlight-warning').value),
        error: hexToRgba(document.getElementById('highlight-error').value)
    };

    automationState.stepDelay = speed;
    automationState.controlsPosition = position;
    automationState.speechEnabled = speechEnabled;
    automationState.highlightColors = highlightColors;

    storeSetting('stepDelay', speed);
    storeSetting('controlsPosition', position);
    storeSetting('speechEnabled', speechEnabled);
    storeSetting('highlightColors', highlightColors);

    updateControlsPosition();
    toggleSettingsPanel();
    showFeedbackMessage("Settings saved successfully!", 'success');
}

function updateControlsPosition() {
    const controls = document.getElementById('automation-controls');
    if (controls) {
        controls.style.right = automationState.controlsPosition === 'right' ? '15px' : 'auto';
        controls.style.left = automationState.controlsPosition === 'left' ? '15px' : 'auto';
    }
}

// Create control buttons
function createControlButtons() {
    const controlsContainer = document.createElement('div');
    controlsContainer.id = 'automation-controls';
    controlsContainer.style.cssText = `
        position: fixed;
        right: 15px;
        top: 20px;
        z-index: 10000;
        display: flex;
        gap: 5px;
        background-color: rgba(255, 255, 255, 0.9);
        padding: 5px;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
    `;
    updateControlsPosition();

    const buttons = [
        { id: 'rewind-btn', icon: '⏮', title: 'Rewind' },
        { id: 'pause-btn', icon: '⏸', title: 'Pause' },
        { id: 'play-btn', icon: '▶️', title: 'Play' },
        { id: 'forward-btn', icon: '⏭', title: 'Fast Forward' },
        { id: 'autopilot-btn', icon: '🛬', title: 'Toggle Autopilot' },
        { id: 'terminate-btn', icon: '❌', title: 'Terminate Automation' }
    ];

    const buttonRefs = {};
    buttons.forEach(btn => {
        const button = document.createElement('button');
        button.id = btn.id;
        button.innerHTML = btn.icon;
        button.title = btn.title;
        button.style.cssText = `
            padding: 8px 12px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            background-color: #f0f0f0;
        `;
        if (btn.id === 'autopilot-btn') {
            button.style.backgroundColor = automationState.isAutopilot ? '#007FFF' : '#f0f0f0';
        }
        if (btn.id === 'terminate-btn') {
            button.style.color = '#e74c3c';
            button.style.display = 'none';
        }
        controlsContainer.appendChild(button);
        buttonRefs[btn.id.replace('-btn', 'Btn')] = button;
    });

    document.body.appendChild(controlsContainer);
    return buttonRefs;
}

// Initialize automation system
function initAutomationSystem() {
    const searchInput = document.getElementById('automation-search');
    const executeBtn = document.getElementById('execute-automation');

    loadAutomationCommands();
    createSettingsButton();
    createSettingsPanel();

    const { pauseBtn, playBtn, rewindBtn, forwardBtn, autopilotBtn, terminateBtn } = createControlButtons();

    if (searchInput && executeBtn) {
        searchInput.addEventListener('input', function() {
            showCommandSuggestions(this.value);
        });

        executeBtn.addEventListener('click', function() {
            executeCommand(searchInput.value);
        });

        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                executeCommand(this.value);
            }
        });

        document.addEventListener('click', function(e) {
            if (!e.target.closest('.search-container')) {
                const dropdown = document.getElementById('suggestions-dropdown');
                if (dropdown) dropdown.style.display = 'none';
            }
        });
    }

    pauseBtn.addEventListener('click', pauseAutomation);
    playBtn.addEventListener('click', resumeAutomation);
    rewindBtn.addEventListener('click', rewindAutomation);
    forwardBtn.addEventListener('click', forwardAutomation);
    autopilotBtn.addEventListener('click', toggleAutopilot);
    terminateBtn.addEventListener('click', terminateAutomation);

    updateControlButtons();
    checkForPendingAutomation();
}

// Speak function
function speak(text) {
    if (!text || !automationState.speechEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
}

// Terminate automation
function terminateAutomation() {
    if (automationState.currentTimeout) {
        clearTimeout(automationState.currentTimeout);
        automationState.currentTimeout = null;
    }

    clearClickHandlers();
    clearHighlights();
    sessionStorage.removeItem('pendingAutomation');

    automationState = {
        ...automationState,
        isPaused: false,
        currentStepIndex: 0,
        currentSteps: [],
        currentCommand: '',
        currentTimeout: null,
        waitingForUserClick: false,
        manualNavigation: false,
        clickHandlers: [],
        retryCount: 0,
        errorCount: 0
    };

    const searchInput = document.getElementById('automation-search');
    const executeBtn = document.getElementById('execute-automation');
    if (searchInput && executeBtn) {
        searchInput.disabled = false;
        executeBtn.disabled = false;
        searchInput.focus();
    }

    updateControlButtons();
    showFeedbackMessage("Automation terminated", 'warning');
    updateTranscript("Automation was terminated by user");
    speak("Automation terminated");

    setTimeout(() => {
        const transcript = document.getElementById('automation-transcript');
        if (transcript) transcript.remove();
    }, 5000);
}

// Toggle autopilot
function toggleAutopilot() {
    if (automationState.currentTimeout) {
        clearTimeout(automationState.currentTimeout);
        automationState.currentTimeout = null;
    }
    clearClickHandlers();
    clearHighlights();

    automationState.isAutopilot = !automationState.isAutopilot;
    storeSetting('autopilot', automationState.isAutopilot);

    const autopilotBtn = document.getElementById('autopilot-btn');
    if (autopilotBtn) {
        autopilotBtn.style.backgroundColor = automationState.isAutopilot ? '#007fff' : '#f0f0f0';
        autopilotBtn.title = automationState.isAutopilot ? 'Autopilot: ON' : 'Autopilot: OFF';
    }

    updateTranscript(`Autopilot ${automationState.isAutopilot ? 'enabled' : 'disabled'}`);
    speak(`Autopilot ${automationState.isAutopilot ? 'enabled' : 'disabled'}`);

    if (automationState.currentSteps.length > 0 && !automationState.isPaused) {
        if (automationState.isAutopilot) {
            executeNextStep();
        } else {
            highlightCurrentStep();
        }
    }
}

// Pause automation
function pauseAutomation() {
    if (automationState.currentTimeout) {
        clearTimeout(automationState.currentTimeout);
        automationState.currentTimeout = null;
    }

    automationState.isPaused = true;
    updateControlButtons();
    updateTranscript('Automation paused');
    speak('Automation paused');
}

// Resume automation
function resumeAutomation() {
    if (!automationState.isPaused || automationState.currentSteps.length === 0) return;

    automationState.isPaused = false;
    updateControlButtons();
    updateTranscript('Resuming automation...');
    speak('Resuming automation');

    if (automationState.isAutopilot) {
        executeNextStep();
    } else {
        highlightCurrentStep();
    }
}

// Update control buttons
function updateControlButtons() {
    const pauseBtn = document.getElementById('pause-btn');
    const playBtn = document.getElementById('play-btn');
    const terminateBtn = document.getElementById('terminate-btn');

    if (pauseBtn && playBtn && terminateBtn) {
        if (automationState.isPaused || automationState.currentSteps.length === 0) {
            pauseBtn.style.display = 'none';
            playBtn.style.display = 'inline';
            terminateBtn.style.display = 'none';
        } else {
            pauseBtn.style.display = 'inline';
            playBtn.style.display = 'none';
            terminateBtn.style.display = 'inline';
        }
    }
}

// Rewind automation
function rewindAutomation() {
    if (automationState.currentStepIndex > 0) {
        if (automationState.currentTimeout) {
            clearTimeout(automationState.currentTimeout);
            automationState.currentTimeout = null;
        }

        automationState.waitingForUserClick = false;
        automationState.currentStepIndex--;
        updateTranscript(`Rewound to step ${automationState.currentStepIndex + 1}`);
        speak(`Rewound to step ${automationState.currentStepIndex + 1}`);

        restartAutomationFromCurrentStep();
    } else {
        updateTranscript('Already at the first step');
        speak('Already at the first step');
    }
}

// Forward automation
function forwardAutomation() {
    if (automationState.currentStepIndex < automationState.currentSteps.length - 1) {
        if (automationState.currentTimeout) {
            clearTimeout(automationState.currentTimeout);
            automationState.currentTimeout = null;
        }

        automationState.waitingForUserClick = false;
        automationState.currentStepIndex++;
        updateTranscript(`Advanced to step ${automationState.currentStepIndex + 1}`);
        speak(`Advanced to step ${automationState.currentStepIndex + 1}`);

        restartAutomationFromCurrentStep();
    } else {
        updateTranscript('Already at the last step');
        speak('Already at the last step');
    }
}

// Restart from current step
function restartAutomationFromCurrentStep() {
    clearHighlights();
    clearClickHandlers();

    sessionStorage.setItem('pendingAutomation', JSON.stringify({
        command: automationState.currentCommand,
        stepIndex: automationState.currentStepIndex,
        isAutopilot: automationState.isAutopilot,
        manualNavigation: !automationState.isAutopilot && automationState.currentSteps[automationState.currentStepIndex]?.action !== 'navigate'
    }));

    setTimeout(() => {
        if (!automationState.isPaused) {
            if (automationState.isAutopilot) {
                if (automationState.currentTimeout) {
                    clearTimeout(automationState.currentTimeout);
                    automationState.currentTimeout = null;
                }
                executeNextStep();
            } else {
                highlightCurrentStep();
            }
        }
    }, 100);
}

// Clear click handlers
function clearClickHandlers() {
    automationState.clickHandlers.forEach(handler => {
        if (handler.element && handler.callback) {
            handler.element.removeEventListener('click', handler.callback);
        }
    });
    automationState.clickHandlers = [];
}

// Clear highlights
function clearHighlights() {
    const highlighter = document.getElementById('automation-highlighter');
    if (highlighter) highlighter.style.opacity = '0';
    document.querySelectorAll('.automation-target').forEach(el => {
        el.classList.remove('automation-target');
    });
    stopTrackingHighlight();
}

// Highlight current step
function highlightCurrentStep() {
    if (automationState.currentStepIndex >= automationState.currentSteps.length) return;

    const step = automationState.currentSteps[automationState.currentStepIndex];

    if (step.action !== 'wait') {
        const stepDescription = getStepDescription(step);
        updateTranscript(stepDescription);
        speak(stepDescription);
    }

    sessionStorage.setItem('pendingAutomation', JSON.stringify({
        command: automationState.currentCommand,
        stepIndex: automationState.currentStepIndex,
        isAutopilot: automationState.isAutopilot,
        manualNavigation: true
    }));

    if (step.action === 'click') {
        const element = document.querySelector(step.selector);
        if (element) {
            element.classList.add('automation-target');
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });

            automationState.currentTimeout = setTimeout(() => {
                highlightElement(element, 'default');
            }, automationConfig.preHighlightDelay);

            const clickHandler = (e) => {
                if (automationState.waitingForUserClick) return;
                automationState.waitingForUserClick = true;

                e.stopPropagation();
                e.preventDefault();

                const label = getElementLabel(step);
                updateTranscript(`User clicked: ${label}`);
                speak(`Clicked ${label}`);

                element.removeEventListener('click', clickHandler);
                automationState.clickHandlers = automationState.clickHandlers.filter(
                    h => h.callback !== clickHandler
                );

                element.click();

                setTimeout(() => {
                    automationState.currentStepIndex++;
                    automationState.waitingForUserClick = false;

                    if (automationState.currentStepIndex < automationState.currentSteps.length) {
                        if (automationState.isAutopilot) {
                            executeNextStep();
                        } else {
                            highlightCurrentStep();
                        }
                    } else {
                        finishAutomation();
                    }
                }, 300);
            };

            element.addEventListener('click', clickHandler);
            automationState.clickHandlers.push({
                element: element,
                callback: clickHandler
            });
        } else {
            updateTranscript(`Error: could not find that step on this screen`);
            speak(`Error: element not found`);
            showFeedbackMessage(`Element not found: ${step.selector}`, 'error');

            automationState.currentStepIndex++;
            if (automationState.isAutopilot) {
                executeNextStep();
            } else {
                highlightCurrentStep();
            }
        }
    } else if (step.action === 'wait') {
        automationState.currentTimeout = setTimeout(() => {
            automationState.currentStepIndex++;
            if (automationState.isAutopilot) {
                executeNextStep();
            } else {
                highlightCurrentStep();
            }
        }, step.duration);
    } else if (step.action === 'navigate') {
        updateTranscript(`Ready to navigate to ${step.url}`);
        speak(`Ready to navigate`);
        automationState.manualNavigation = true;
    }
}

// Check for pending automation
function checkForPendingAutomation() {
    const pendingAutomation = sessionStorage.getItem('pendingAutomation');
    if (pendingAutomation) {
        try {
            const { command, stepIndex, isAutopilot, manualNavigation } = JSON.parse(pendingAutomation);
            const commandObj = automationCommands[command];
            if (commandObj && commandObj.steps && stepIndex < commandObj.steps.length) {
                automationState.isAutopilot = isAutopilot !== undefined ? isAutopilot : automationConfig.autopilot;
                automationState.manualNavigation = manualNavigation || false;

                automationState.currentCommand = command;
                automationState.currentSteps = commandObj.steps;
                automationState.currentStepIndex = stepIndex;

                setTimeout(() => {
                    if (automationState.manualNavigation && !automationState.isAutopilot) {
                        highlightCurrentStep();
                    } else if (automationState.isAutopilot) {
                        executeNextStep();
                    }
                }, 1000);
            }
        } catch (e) {
            console.error('Error parsing pending automation:', e);
            sessionStorage.removeItem('pendingAutomation');
        }
    }
}

// Show command suggestions
function showCommandSuggestions(input) {
    const dropdown = document.getElementById('suggestions-dropdown') || createSuggestionsDropdown();
    dropdown.innerHTML = '';

    if (!input) {
        dropdown.style.display = 'none';
        return;
    }

    const matches = Object.keys(automationCommands).filter(cmd =>
        cmd.toLowerCase().includes(input.toLowerCase())
    );

    if (matches.length > 0) {
        matches.forEach(match => {
            const command = automationCommands[match];
            const item = document.createElement('div');
            item.className = 'suggestion-item';

            const matchIndex = match.toLowerCase().indexOf(input.toLowerCase());
            if (matchIndex >= 0) {
                const before = match.substring(0, matchIndex);
                const matched = match.substring(matchIndex, matchIndex + input.length);
                const after = match.substring(matchIndex + input.length);
                item.innerHTML = `
                    <div class="suggestion-title">
                        ${before}<strong>${matched}</strong>${after}
                    </div>
                    <div class="suggestion-description">${command.description}</div>
                `;
            } else {
                item.innerHTML = `
                    <div class="suggestion-title">${match}</div>
                    <div class="suggestion-description">${command.description}</div>
                `;
            }

            item.addEventListener('click', () => {
                const searchInput = document.getElementById('automation-search');
                if (searchInput) {
                    searchInput.value = match;
                    dropdown.style.display = 'none';
                    executeCommand(match);
                }
            });
            dropdown.appendChild(item);
        });
        dropdown.style.display = 'block';
    } else {
        dropdown.style.display = 'none';
    }
}

// Create suggestions dropdown
function createSuggestionsDropdown() {
    const dropdown = document.createElement('div');
    dropdown.id = 'suggestions-dropdown';
    dropdown.className = 'suggestions-dropdown';
    const container = document.querySelector('.search-container');
    if (container) container.appendChild(dropdown);
    return dropdown;
}

// Execute command
function executeCommand(commandText) {
    if (!commandText) return;

    clearHighlights();
    clearClickHandlers();

    const normalizedInput = commandText.toLowerCase().trim();
    let bestMatch = null;
    let bestScore = 0;

    Object.keys(automationCommands).forEach(cmd => {
        const cmdLower = cmd.toLowerCase();
        const score = calculateMatchScore(normalizedInput, cmdLower);
        if (score > bestScore) {
            bestMatch = cmd;
            bestScore = score;
        }
    });

    if (bestMatch) {
        const command = automationCommands[bestMatch];
        console.log(`Executing command: ${bestMatch}`);
        runAutomationSteps(command.steps, bestMatch);
    } else {
        showFeedbackMessage("Command not recognized. Try 'pay saved beneficiary', 'add new beneficiary', etc.", 'error');
        speak("Command not recognized");
    }
}

// Calculate match score
function calculateMatchScore(input, command) {
    if (input === command) return 100;
    if (input.includes(command)) return 90;
    if (command.includes(input)) return 80;

    const inputWords = input.split(/\s+/);
    const commandWords = command.split(/\s+/);
    const matchingWords = inputWords.filter(word =>
        commandWords.some(cmdWord => cmdWord.includes(word))
    );
    return (matchingWords.length / inputWords.length) * 100;
}

// Run automation steps
function runAutomationSteps(steps, commandName) {
    if (!steps || steps.length === 0) return;

    if (automationState.currentTimeout) {
        clearTimeout(automationState.currentTimeout);
        automationState.currentTimeout = null;
    }

    clearClickHandlers();

    automationState = {
        ...automationState,
        isPaused: false,
        currentStepIndex: 0,
        currentSteps: steps,
        currentCommand: commandName,
        currentTimeout: null,
        waitingForUserClick: false,
        manualNavigation: false,
        clickHandlers: [],
        retryCount: 0,
        errorCount: 0,
        startTime: Date.now(),
        totalStepsCompleted: 0
    };

    const searchInput = document.getElementById('automation-search');
    const executeBtn = document.getElementById('execute-automation');
    if (searchInput && executeBtn) {
        searchInput.disabled = true;
        executeBtn.disabled = true;
    }

    showFeedbackMessage("Automation in progress...", 'info');
    updateTranscript(`Starting automation: ${commandName}`);
    speak(`Starting: ${commandName}`);

    updateControlButtons();

    const autopilotBtn = document.getElementById('autopilot-btn');
    if (autopilotBtn) {
        autopilotBtn.style.backgroundColor = automationState.isAutopilot ? '#007fff' : '#f0f0f0';
        autopilotBtn.title = automationState.isAutopilot ? 'Autopilot: ON' : 'Autopilot: OFF';
    }

    if (automationState.isAutopilot) {
        executeNextStep();
    } else {
        highlightCurrentStep();
    }
}

// Execute next step
function executeNextStep() {
    const { currentStepIndex, currentSteps, currentCommand } = automationState;

    if (currentStepIndex >= currentSteps.length) {
        finishAutomation();
        return;
    }

    if (automationState.isPaused) return;

    const step = currentSteps[currentStepIndex];

    if (step.action !== 'wait') {
        const stepDescription = getStepDescription(step);
        updateTranscript(`Step ${currentStepIndex + 1}: ${stepDescription}`);
        speak(stepDescription);
    }

    sessionStorage.setItem('pendingAutomation', JSON.stringify({
        command: currentCommand,
        stepIndex: currentStepIndex,
        isAutopilot: automationState.isAutopilot,
        manualNavigation: false
    }));

    if (automationState.isAutopilot) {
        executeStep(step, () => {
            automationState.currentStepIndex++;
            automationState.totalStepsCompleted++;
            automationState.currentTimeout = setTimeout(executeNextStep, automationState.stepDelay);
        });
    } else {
        highlightCurrentStep();
    }
}

// Finish automation
function finishAutomation() {
    const endTime = Date.now();
    const duration = endTime - (automationState.startTime || endTime);

    showFeedbackMessage(`Automation completed: ${automationState.totalStepsCompleted} steps, ${automationState.errorCount} errors`, 
        automationState.errorCount === 0 ? 'success' : 'warning');
    speak(`Automation completed with ${automationState.errorCount} errors`);

    sessionStorage.removeItem('pendingAutomation');

    const searchInput = document.getElementById('automation-search');
    const executeBtn = document.getElementById('execute-automation');
    if (searchInput && executeBtn) {
        searchInput.disabled = false;
        executeBtn.disabled = false;
        searchInput.focus();
    }

    const transcript = document.getElementById('automation-transcript');
    if (transcript) {
        setTimeout(() => transcript.remove(), 5000);
    }

    automationState = {
        ...automationState,
        isPaused: false,
        currentStepIndex: 0,
        currentSteps: [],
        currentCommand: '',
        currentTimeout: null,
        waitingForUserClick: false,
        manualNavigation: false,
        clickHandlers: [],
        retryCount: 0,
        errorCount: 0
    };

    updateControlButtons();
}

// Update transcript
function updateTranscript(message) {
    if (!message) return;

    let transcriptContainer = document.getElementById('automation-transcript');
    if (!transcriptContainer) {
        transcriptContainer = document.createElement('div');
        transcriptContainer.id = 'automation-transcript';
        transcriptContainer.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background-color: rgba(0,0,0,0.8);
            color: white;
            padding: 10px;
            border-radius: 5px;
            max-width: 300px;
            z-index: 10000;
        `;
        document.body.appendChild(transcriptContainer);
    }

    const entry = document.createElement('div');
    entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    entry.style.cssText = `
        margin-bottom: 5px;
        border-bottom: 1px solid #444;
        padding-bottom: 5px;
    `;
    transcriptContainer.insertBefore(entry, transcriptContainer.firstChild);

    while (transcriptContainer.children.length > 5) {
        transcriptContainer.removeChild(transcriptContainer.lastChild);
    }
}

// Get element label
function getElementLabel(step) {
    if (step.label) return step.label;

    const element = step.selector ? document.querySelector(step.selector) : null;
    if (element) {
        const raw = element.getAttribute('data-automation-label')
            || element.getAttribute('aria-label')
            || element.getAttribute('title')
            || element.textContent;
        if (raw) {
            const clean = raw.replace(/\s+/g, ' ').trim();
            if (clean) return clean.length > 40 ? `${clean.slice(0, 40)}…` : clean;
        }
    }

    return (step.selector || '')
        .replace(/^[#.]/, '')
        .replace(/\[.*?\]/g, '')
        .replace(/[-_]/g, ' ')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .trim() || 'this step';
}

// Get step description
function getStepDescription(step) {
    switch(step.action) {
        case 'click':
            return `Clicking ${getElementLabel(step)}`;
        case 'wait':
            return null;
        case 'navigate':
            return `Navigating to ${step.url}`;
        default:
            return `Performing ${step.action}`;
    }
}

// Track highlight
let activeHighlightElement = null;
let highlightReposition = null;

function stopTrackingHighlight() {
    if (highlightReposition) {
        window.removeEventListener('scroll', highlightReposition, true);
        window.removeEventListener('resize', highlightReposition);
        highlightReposition = null;
    }
    activeHighlightElement = null;
}

// Highlight element
function highlightElement(element, status = 'default') {
    if (!element || !element.getBoundingClientRect) return;

    let highlighter = document.getElementById('automation-highlighter');
    if (!highlighter) highlighter = createHighlighter();

    const position = () => {
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        highlighter.style.width = `${rect.width}px`;
        highlighter.style.height = `${rect.height}px`;
        highlighter.style.top = `${rect.top + scrollTop}px`;
        highlighter.style.left = `${rect.left + scrollLeft}px`;
        highlighter.style.borderRadius = window.getComputedStyle(element).borderRadius;
    };

    position();
    highlighter.style.boxShadow = `0 0 0 4px ${automationState.highlightColors[status] || automationState.highlightColors.default}`;
    highlighter.style.opacity = '1';
    highlighter.style.transition = 'all 0.3s ease';

    stopTrackingHighlight();
    activeHighlightElement = element;
    highlightReposition = () => { if (activeHighlightElement === element) position(); };
    window.addEventListener('scroll', highlightReposition, true);
    window.addEventListener('resize', highlightReposition);
}

// Create highlighter
function createHighlighter() {
    const highlighter = document.createElement('div');
    highlighter.id = 'automation-highlighter';
    highlighter.style.cssText = `
        position: absolute;
        pointer-events: none;
        transition: all 0.3s ease;
        z-index: 9999;
        box-shadow: 0 0 0 4px ${automationState.highlightColors.default};
        border-radius: 4px;
        opacity: 0;
    `;
    document.body.appendChild(highlighter);
    return highlighter;
}

// Execute step
function executeStep(step, callback) {
    switch(step.action) {
        case 'click':
            const element = document.querySelector(step.selector);
            if (element) {
                element.classList.add('automation-target');
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });

                automationState.currentTimeout = setTimeout(() => {
                    highlightElement(element, 'default');

                    automationState.currentTimeout = setTimeout(() => {
                        highlightElement(element, 'success');
                        element.click();
                        const label = getElementLabel(step);
                        updateTranscript(`Clicked: ${label}`);
                        speak(`Clicked ${label}`);

                        automationState.currentTimeout = setTimeout(() => {
                            element.classList.remove('automation-target');
                            clearHighlights();
                            if (callback) callback();
                        }, automationConfig.highlightDuration);
                    }, automationConfig.preClickDelay);
                }, automationConfig.preHighlightDelay);
            } else {
                automationState.errorCount++;
                updateTranscript(`Error: could not find that step on this screen`);
                speak(`Error: element not found`);
                showFeedbackMessage(`Element not found: ${step.selector}`, 'error');
                if (callback) callback();
            }
            break;

        case 'wait':
            automationState.currentTimeout = setTimeout(callback, step.duration);
            break;

        case 'navigate':
            updateTranscript(`Navigating to: ${step.url}`);
            speak(`Navigating`);
            highlightElement(document.documentElement, 'warning');

            const nextStepIndex = automationState.currentStepIndex + 1;
            sessionStorage.setItem('pendingAutomation', JSON.stringify({
                command: automationState.currentCommand,
                stepIndex: nextStepIndex,
                isAutopilot: automationState.isAutopilot,
                manualNavigation: !automationState.isAutopilot
            }));

            automationState.currentTimeout = setTimeout(() => {
                var targetUrl = step.url;
                var fromRob = /\/rob\//i.test(window.location.pathname);
                if (fromRob && !/^https?:/i.test(targetUrl) && targetUrl.indexOf('../') !== 0) {
                    targetUrl = '../App/' + targetUrl;
                }
                window.location.href = targetUrl;
            }, 1000);
            break;

        default:
            updateTranscript(`Unknown action: ${step.action}`);
            speak(`Unknown action`);
            if (callback) callback();
    }
}

// Show feedback message
function showFeedbackMessage(message, type) {
    let feedback = document.getElementById('automation-feedback');
    if (!feedback) {
        feedback = document.createElement('div');
        feedback.id = 'automation-feedback';
        feedback.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            padding: 8px 16px;
            border-radius: 4px;
            color: white;
            z-index: 10000;
            transition: all 0.3s ease;
        `;
        document.body.appendChild(feedback);
    }

    feedback.textContent = message;
    feedback.className = `feedback-message feedback-${type}`;
    feedback.style.opacity = '1';

    const colors = {
        info: 'rgba(52, 152, 219, 0.9)',
        success: 'rgba(46, 204, 113, 0.9)',
        warning: 'rgba(241, 196, 15, 0.9)',
        error: 'rgba(231, 76, 60, 0.9)'
    };
    feedback.style.backgroundColor = colors[type] || colors.info;

    setTimeout(() => {
        feedback.style.opacity = '0';
        setTimeout(() => feedback.remove(), 500);
    }, 3000);
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initAutomationSystem);