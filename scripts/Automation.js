const automationConfig = {
    stepDelay: 500,
    highlightDuration: 400,
    highlightColor: '0 0 0 4px rgba(255, 215, 0, 0.7)',
    autopilot: true,
    speechEnabled: false,
    controlsPosition: 'right',
    highlightColors: {
        default: 'rgba(65, 131, 215, 0.7)',
        success: 'rgba(46, 204, 113, 0.7)',
        warning: 'rgba(241, 196, 15, 0.7)',
        error: 'rgba(231, 76, 60, 0.7)'
    }
};

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
            { action: 'click', selector: '#saved-beneficiary-option' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '.beneficiary-card:first-child' }
        ],
        description: 'Initiate payment to a saved beneficiary',
        category: 'payments'
    },
    'add new beneficiary': {
        steps: [
            { action: 'click', selector: '#create' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '[data-type="beneficiary"]' }
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
            { action: 'click', selector: '#onceoff-beneficiary-option' }
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
    'sign out': {
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
    }
};

let automationCommands = defaultAutomationCommands;

function loadAutomationCommands() {
    try {
        const isComputer = /Computer\\\\|Computer\//i.test(window.location.pathname) || /Computer/i.test(document.title);
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
                // Silently keep defaults if fetch fails
            });
    } catch (_) {
        // ignore
    }
}



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
    highlightColors: getStoredSetting('highlightColors', automationConfig.highlightColors)
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


function createSettingsButton() {
    const settingsBtn = document.createElement('button');
    settingsBtn.id = 'automation-settings-btn';
    settingsBtn.innerHTML = '⚙️';
    settingsBtn.title = 'Automation Settings';
    settingsBtn.style.position = 'fixed';
    settingsBtn.style.top = '10px';
    settingsBtn.style.left = '15px';
    settingsBtn.style.zIndex = '10000';
    settingsBtn.style.padding = '5px 10px';
    settingsBtn.style.border = 'none';
    settingsBtn.style.borderRadius = '3px';
    settingsBtn.style.cursor = 'pointer';
    settingsBtn.style.backgroundColor = '#f0f0f0';
    settingsBtn.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';

    settingsBtn.addEventListener('click', toggleSettingsPanel);

    document.body.appendChild(settingsBtn);
    return settingsBtn;
}


function createSettingsPanel() {
    const panel = document.createElement('div');
    panel.id = 'automation-settings-panel';
    panel.style.position = 'fixed';
    panel.style.top = '50px';
    panel.style.left = '20px';
    panel.style.zIndex = '10000';
    panel.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    panel.style.padding = '15px';
    panel.style.borderRadius = '5px';
    panel.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    panel.style.width = '300px';
    panel.style.display = 'none';


    panel.innerHTML += `
<div class="setting-group">
<h3 style="margin-top: 0;">Automation Speed</h3>
<div style="display: flex; align-items: center; gap: 10px;">
<input type="range" id="automation-speed" min="100" max="2000" step="100" value="${automationState.stepDelay}">
<span id="speed-value">${automationState.stepDelay}ms</span>
</div>
</div>
`;


    panel.innerHTML += `
<div class="setting-group" style="margin-top: 15px;">
<h3>Controls Position</h3>
<select id="controls-position">
<option value="left" ${automationState.controlsPosition === 'left' ? 'selected' : ''}>Left</option>
<option value="right" ${automationState.controlsPosition === 'right' ? 'selected' : ''}>Right</option>
</select>
</div>
`;


    panel.innerHTML += `
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
`;


    panel.innerHTML += `
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
`;


    panel.innerHTML += `
<button id="save-settings" style="margin-top: 20px; padding: 8px 15px; background-color: #007fff; color: white; border: none; border-radius: 3px; cursor: pointer; width: 100%;">Save Settings</button>
`;


    panel.innerHTML += `
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


function createControlButtons() {
    const controlsContainer = document.createElement('div');
    controlsContainer.id = 'automation-controls';
    controlsContainer.style.position = 'absolute';
    controlsContainer.style.right = '15px';
    controlsContainer.style.top = '10px';
    controlsContainer.style.zIndex = '10000';
    controlsContainer.style.display = 'flex';
    controlsContainer.style.gap = '5px';
    controlsContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    controlsContainer.style.padding = '5px';
    controlsContainer.style.borderRadius = '5px';
    controlsContainer.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';


    updateControlsPosition();


    const rewindBtn = document.createElement('button');
    rewindBtn.id = 'rewind-btn';
    rewindBtn.innerHTML = '⏮';
    rewindBtn.title = 'Rewind';
    rewindBtn.style.padding = '5px 10px';
    rewindBtn.style.border = 'none';
    rewindBtn.style.borderRadius = '3px';
    rewindBtn.style.cursor = 'pointer';
    rewindBtn.style.backgroundColor = '#f0f0f0';

    const pauseBtn = document.createElement('button');
    pauseBtn.id = 'pause-btn';
    pauseBtn.innerHTML = '⏸';
    pauseBtn.title = 'Pause';
    pauseBtn.style.padding = '5px 10px';
    pauseBtn.style.border = 'none';
    pauseBtn.style.borderRadius = '3px';
    pauseBtn.style.cursor = 'pointer';
    pauseBtn.style.backgroundColor = '#f0f0f0';

    const playBtn = document.createElement('button');
    playBtn.id = 'play-btn';
    playBtn.innerHTML = '▶️';
    playBtn.title = 'Play';
    playBtn.style.padding = '5px 10px';
    playBtn.style.border = 'none';
    playBtn.style.borderRadius = '3px';
    playBtn.style.cursor = 'pointer';
    playBtn.style.backgroundColor = '#f0f0f0';

    const forwardBtn = document.createElement('button');
    forwardBtn.id = 'forward-btn';
    forwardBtn.innerHTML = '⏭';
    forwardBtn.title = 'Fast Forward';
    forwardBtn.style.padding = '5px 10px';
    forwardBtn.style.border = 'none';
    forwardBtn.style.borderRadius = '3px';
    forwardBtn.style.cursor = 'pointer';
    forwardBtn.style.backgroundColor = '#f0f0f0';


    const autopilotBtn = document.createElement('button');
    autopilotBtn.id = 'autopilot-btn';
    autopilotBtn.innerHTML = '🛬';
    autopilotBtn.title = 'Toggle Autopilot';
    autopilotBtn.style.padding = '5px 10px';
    autopilotBtn.style.border = 'none';
    autopilotBtn.style.borderRadius = '3px';
    autopilotBtn.style.cursor = 'pointer';
    autopilotBtn.style.backgroundColor = automationState.isAutopilot ? '#007FFF' : '#f0f0f0';


    const terminateBtn = document.createElement('button');
    terminateBtn.id = 'terminate-btn';
    terminateBtn.innerHTML = '❌';
    terminateBtn.title = 'Terminate Automation';
    terminateBtn.style.padding = '5px 10px';
    terminateBtn.style.border = 'none';
    terminateBtn.style.borderRadius = '3px';
    terminateBtn.style.cursor = 'pointer';
    terminateBtn.style.backgroundColor = '#f0f0f0';
    terminateBtn.style.color = '#e74c3c';
    terminateBtn.style.display = 'none';


    controlsContainer.appendChild(rewindBtn);
    controlsContainer.appendChild(pauseBtn);
    controlsContainer.appendChild(playBtn);
    controlsContainer.appendChild(forwardBtn);
    controlsContainer.appendChild(autopilotBtn);
    controlsContainer.appendChild(terminateBtn);


    document.body.appendChild(controlsContainer);


    return {
        pauseBtn,
        playBtn,
        rewindBtn,
        forwardBtn,
        autopilotBtn,
        terminateBtn
    };
}


function initAutomationSystem() {
    const searchInput = document.getElementById('automation-search');
    const executeBtn = document.getElementById('execute-automation');

    // Load commands from backend (with fallback to defaults)
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


function speak(text) {
    if (!automationState.speechEnabled || !window.speechSynthesis) return;


    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
}


function terminateAutomation() {

    if (automationState.currentTimeout) {
        clearTimeout(automationState.currentTimeout);
        automationState.currentTimeout = null;
    }


    automationState.clickHandlers.forEach(handler => {
        if (handler.element && handler.callback) {
            handler.element.removeEventListener('click', handler.callback);
        }
    });
    automationState.clickHandlers = [];


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
        clickHandlers: []
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

function toggleAutopilot() {
    automationState.isAutopilot = !automationState.isAutopilot;
    storeSetting('autopilot', automationState.isAutopilot);

    const autopilotBtn = document.getElementById('autopilot-btn');
    if (autopilotBtn) {
        autopilotBtn.style.backgroundColor = automationState.isAutopilot ? '#007fff' : '#f0f0f0';
        autopilotBtn.title = automationState.isAutopilot ? 'Autopilot: ON' : 'Autopilot: OFF';
    }

    updateTranscript(`Autopilot ${automationState.isAutopilot ? 'enabled' : 'disabled'}`);
    speak(`Autopilot ${automationState.isAutopilot ? 'enabled' : 'disabled'}`);


    if (!automationState.isAutopilot && automationState.currentSteps.length > 0 && !automationState.isPaused) {
        highlightCurrentStep();
    }


    if (automationState.isAutopilot && automationState.currentSteps.length > 0 && !automationState.isPaused) {
        executeNextStep();
    }
}

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

function rewindAutomation() {
    if (automationState.currentStepIndex > 0) {

        if (automationState.currentTimeout) {
            clearTimeout(automationState.currentTimeout);
            automationState.currentTimeout = null;
        }


        automationState.currentStepIndex--;
        updateTranscript(`Rewound to step ${automationState.currentStepIndex + 1}`);
        speak(`Rewound to step ${automationState.currentStepIndex + 1}`);


        restartAutomationFromCurrentStep();
    } else {
        updateTranscript('Already at the first step');
        speak('Already at the first step');
    }
}

function forwardAutomation() {
    if (automationState.currentStepIndex < automationState.currentSteps.length - 1) {

        if (automationState.currentTimeout) {
            clearTimeout(automationState.currentTimeout);
            automationState.currentTimeout = null;
        }


        automationState.currentStepIndex++;
        updateTranscript(`Advanced to step ${automationState.currentStepIndex + 1}`);
        speak(`Advanced to step ${automationState.currentStepIndex + 1}`);


        restartAutomationFromCurrentStep();
    } else {
        updateTranscript('Already at the last step');
        speak('Already at the last step');
    }
}

function restartAutomationFromCurrentStep() {

    clearHighlights();
    clearClickHandlers();


    sessionStorage.setItem('pendingAutomation', JSON.stringify({
        command: automationState.currentCommand,
        stepIndex: automationState.currentStepIndex,
        isAutopilot: automationState.isAutopilot,
        manualNavigation: !automationState.isAutopilot
    }));


    if (!automationState.isPaused) {
        if (automationState.isAutopilot) {
            executeNextStep();
        } else {
            highlightCurrentStep();
        }
    }
}


function clearClickHandlers() {
    automationState.clickHandlers.forEach(handler => {
        if (handler.element && handler.callback) {
            handler.element.removeEventListener('click', handler.callback);
        }
    });
    automationState.clickHandlers = [];
}


function highlightCurrentStep() {
    if (automationState.currentStepIndex >= automationState.currentSteps.length) return;

    const step = automationState.currentSteps[automationState.currentStepIndex];
    const stepDescription = getStepDescription(step);

    updateTranscript(stepDescription);
    speak(stepDescription);

    if (step.action === 'click') {
        const element = document.querySelector(step.selector);
        if (element) {

            highlightElement(element, 'default');
            element.classList.add('automation-target');
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });


            const clickHandler = (e) => {
                if (automationState.waitingForUserClick) return;

                automationState.waitingForUserClick = true;
                e.stopPropagation();
                e.preventDefault();

                updateTranscript(`User clicked: ${step.selector}`);
                speak(`Clicked ${step.selector.replace(/[#.]/g, ' ').trim()}`);


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
            updateTranscript(`Error: Element not found - ${step.selector}`);
            speak(`Error: Element not found`);
            showFeedbackMessage(`Element not found: ${step.selector}`, 'error');
            automationState.currentStepIndex++;
            executeNextStep();
        }
    } else if (step.action === 'wait') {

        updateTranscript(`Waiting for ${step.duration}ms`);
        speak(`Waiting for ${Math.round(step.duration / 1000)} seconds`);
        automationState.currentTimeout = setTimeout(() => {
            automationState.currentStepIndex++;
            if (automationState.isAutopilot) {
                executeNextStep();
            } else {
                highlightCurrentStep();
            }
        }, step.duration);
    } else {

        executeStep(step, () => {
            automationState.currentStepIndex++;
            if (automationState.isAutopilot) {
                executeNextStep();
            } else {
                highlightCurrentStep();
            }
        });
    }
}


function checkForPendingAutomation() {
    const pendingAutomation = sessionStorage.getItem('pendingAutomation');
    if (pendingAutomation) {
        try {
            const { command, stepIndex, isAutopilot, manualNavigation } = JSON.parse(pendingAutomation);
            const commandObj = automationCommands[command];
            if (commandObj && commandObj.steps && stepIndex < commandObj.steps.length) {
                automationState.isAutopilot = isAutopilot !== undefined ? isAutopilot : automationConfig.autopilot;
                automationState.manualNavigation = manualNavigation || false;

                setTimeout(() => {
                    runAutomationSteps(commandObj.steps.slice(stepIndex), command);


                    if (automationState.manualNavigation && !automationState.isAutopilot) {
                        highlightCurrentStep();
                    }
                }, 1000);
            }
        } catch (e) {
            console.error('Error parsing pending automation:', e);
            sessionStorage.removeItem('pendingAutomation');
        }
    }
}


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

function createSuggestionsDropdown() {
    const dropdown = document.createElement('div');
    dropdown.id = 'suggestions-dropdown';
    dropdown.className = 'suggestions-dropdown';
    const container = document.querySelector('.search-container');
    if (container) container.appendChild(dropdown);
    return dropdown;
}


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


function runAutomationSteps(steps, commandName) {
    if (!steps || steps.length === 0) return;


    if (automationState.currentTimeout) {
        clearTimeout(automationState.currentTimeout);
        automationState.currentTimeout = null;
    }

    automationState = {
        ...automationState,
        isPaused: false,
        currentStepIndex: 0,
        currentSteps: steps,
        currentCommand: commandName,
        currentTimeout: null,
        waitingForUserClick: false,
        manualNavigation: false,
        clickHandlers: []
    };

    const searchInput = document.getElementById('automation-search');
    const executeBtn = document.getElementById('execute-automation');
    if (searchInput && executeBtn) {
        searchInput.disabled = true;
        executeBtn.disabled = true;
    }

    showFeedbackMessage("Automation in progress...", 'info');
    updateTranscript(`Starting automation: ${commandName}`);
    speak(`Starting automation: ${commandName}`);
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

function executeNextStep() {
    const { currentStepIndex, currentSteps, currentCommand } = automationState;

    if (currentStepIndex >= currentSteps.length) {
        finishAutomation();
        return;
    }

    if (automationState.isPaused) return;

    const step = currentSteps[currentStepIndex];
    updateTranscript(`Executing step ${currentStepIndex + 1}: ${getStepDescription(step)}`);
    speak(`Step ${currentStepIndex + 1}: ${getStepDescription(step)}`);
    sessionStorage.setItem('pendingAutomation', JSON.stringify({
        command: currentCommand,
        stepIndex: currentStepIndex,
        isAutopilot: automationState.isAutopilot,
        manualNavigation: !automationState.isAutopilot && step.action === 'navigate'
    }));

    if (automationState.isAutopilot) {
        executeStep(step, () => {
            automationState.currentStepIndex++;
            automationState.currentTimeout = setTimeout(executeNextStep, automationState.stepDelay);
        });
    } else {
        highlightCurrentStep();
    }
}

function finishAutomation() {
    showFeedbackMessage("Automation completed successfully!", 'success');
    speak("Automation completed successfully");
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
        clickHandlers: []
    };

    updateControlButtons();
}

function updateTranscript(message) {
    let transcriptContainer = document.getElementById('automation-transcript');
    if (!transcriptContainer) {
        transcriptContainer = document.createElement('div');
        transcriptContainer.id = 'automation-transcript';
        transcriptContainer.style.position = 'fixed';
        transcriptContainer.style.bottom = '20px';
        transcriptContainer.style.right = '20px';
        transcriptContainer.style.backgroundColor = 'rgba(0,0,0,0.8)';
        transcriptContainer.style.color = 'white';
        transcriptContainer.style.padding = '10px';
        transcriptContainer.style.borderRadius = '5px';
        transcriptContainer.style.maxWidth = '300px';
        transcriptContainer.style.zIndex = '10000';
        document.body.appendChild(transcriptContainer);
    }

    const entry = document.createElement('div');
    entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    entry.style.marginBottom = '5px';
    entry.style.borderBottom = '1px solid #444';
    entry.style.paddingBottom = '5px';
    transcriptContainer.insertBefore(entry, transcriptContainer.firstChild);

    while (transcriptContainer.children.length > 5) {
        transcriptContainer.removeChild(transcriptContainer.lastChild);
    }
}

function getStepDescription(step) {
    switch(step.action) {
        case 'click':
            return `Clicking ${step.selector.replace(/[#.]/g, ' ').trim()}`;
        case 'wait':
            return `Waiting for ${Math.round(step.duration / 1000)} seconds`;
        case 'navigate':
            return `Navigating to ${step.url}`;
        default:
            return `Performing ${step.action}`;
    }
}

function clearHighlights() {
    const highlighter = document.getElementById('automation-highlighter');
    if (highlighter) highlighter.style.opacity = '0';
    document.querySelectorAll('.automation-target').forEach(el => {
        el.classList.remove('automation-target');
    });
}

function executeStep(step, callback) {
    switch(step.action) {
        case 'click':
            const element = document.querySelector(step.selector);
            if (element) {
                highlightElement(element, 'default');
                element.classList.add('automation-target');
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });

                setTimeout(() => {
                    highlightElement(element, 'success');
                    element.click();
                    updateTranscript(`Clicked: ${step.selector}`);
                    speak(`Clicked ${step.selector.replace(/[#.]/g, ' ').trim()}`);

                    setTimeout(() => {
                        element.classList.remove('automation-target');
                        clearHighlights();
                        if (callback) callback();
                    }, automationConfig.highlightDuration);
                }, 500);
            } else {
                updateTranscript(`Error: Element not found - ${step.selector}`);
                speak(`Error: Element not found`);
                showFeedbackMessage(`Element not found: ${step.selector}`, 'error');
                if (callback) callback();
            }
            break;

        case 'wait':
            updateTranscript(`Waiting for ${step.duration}ms`);
            speak(`Waiting for ${Math.round(step.duration / 1000)} seconds`);
            automationState.currentTimeout = setTimeout(callback, step.duration);
            break;

        case 'navigate':
            updateTranscript(`Navigating to: ${step.url}`);
            speak(`Navigating to ${step.url}`);
            highlightElement(document.documentElement, 'warning');


            const nextStepIndex = automationState.currentStepIndex + 1;
            sessionStorage.setItem('pendingAutomation', JSON.stringify({
                command: automationState.currentCommand,
                stepIndex: nextStepIndex,
                isAutopilot: automationState.isAutopilot,
                manualNavigation: !automationState.isAutopilot
            }));

            setTimeout(() => {
                window.location.href = step.url;
            }, 1000);
            break;

        default:
            updateTranscript(`Unknown action: ${step.action}`);
            speak(`Unknown action`);
            if (callback) callback();
    }
}

function highlightElement(element, status = 'default') {
    if (!element || !element.getBoundingClientRect) return;

    let highlighter = document.getElementById('automation-highlighter');
    if (!highlighter) highlighter = createHighlighter();

    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

    highlighter.style.width = `${rect.width}px`;
    highlighter.style.height = `${rect.height}px`;
    highlighter.style.top = `${rect.top + scrollTop}px`;
    highlighter.style.left = `${rect.left + scrollLeft}px`;
    highlighter.style.borderRadius = window.getComputedStyle(element).borderRadius;

    highlighter.style.boxShadow = `0 0 0 4px ${automationState.highlightColors[status] || automationState.highlightColors.default}`;
    highlighter.style.opacity = '1';
    highlighter.style.transition = 'all 0.3s ease';
}

function createHighlighter() {
    const highlighter = document.createElement('div');
    highlighter.id = 'automation-highlighter';
    highlighter.style.position = 'absolute';
    highlighter.style.pointerEvents = 'none';
    highlighter.style.transition = 'all 0.3s ease';
    highlighter.style.zIndex = '9999';
    highlighter.style.boxShadow = `0 0 0 4px ${automationState.highlightColors.default}`;
    highlighter.style.borderRadius = '4px';
    highlighter.style.opacity = '0';
    document.body.appendChild(highlighter);
    return highlighter;
}

function showFeedbackMessage(message, type) {
    let feedback = document.getElementById('automation-feedback');
    if (!feedback) {
        feedback = document.createElement('div');
        feedback.id = 'automation-feedback';
        feedback.style.position = 'fixed';
        feedback.style.bottom = '20px';
        feedback.style.left = '50%';
        feedback.style.height = '10px';
        feedback.style.transform = 'translateX(-50%)';
        feedback.style.padding = '8px 16px';
        feedback.style.borderRadius = '4px';
        feedback.style.color = 'white';
        feedback.style.zIndex = '10000';
        feedback.style.transition = 'all 0.3s ease';
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


document.addEventListener('DOMContentLoaded', initAutomationSystem);