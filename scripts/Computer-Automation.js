


const automationConfig = {
    stepDelay: 500, 
    highlightDuration: 400, 
    autoPilot: false, 
    controlsPosition: 'right', 
    speechEnabled: false, 
    highlightColors: {
        default: 'rgba(65, 131, 215, 0.7)',
        success: 'rgba(46, 204, 113, 0.7)',
        warning: 'rgba(241, 196, 15, 0.7)',
        error: 'rgba(231, 76, 60, 0.7)'
    }
};


let automationState = {
    isPaused: false,
    currentStepIndex: 0,
    currentSteps: [],
    currentCommand: '',
    currentTimeout: null,
    isAutopilot: getStoredSetting('autopilot', automationConfig.autoPilot),
    waitingForUserClick: false,
    manualNavigation: false,
    clickHandlers: [], 
    navigationHistory: [],
    navigationIndex: -1,
    currentHighlightedElement: null,
    isTerminating: false,
    stepDelay: getStoredSetting('stepDelay', automationConfig.stepDelay),
    highlightDuration: getStoredSetting('highlightDuration', automationConfig.highlightDuration),
    controlsPosition: getStoredSetting('controlsPosition', automationConfig.controlsPosition),
    speechEnabled: getStoredSetting('speechEnabled', automationConfig.speechEnabled),
    highlightColors: getStoredSetting('highlightColors', automationConfig.highlightColors)
};


function getStoredSetting(key, defaultValue) {
    const storedValue = localStorage.getItem(`automation_${key}`);
    try {
        return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
    } catch (e) {
        console.error(`Error parsing setting ${key}:`, e);
        return defaultValue;
    }
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
    settingsBtn.style.top = '15px';
    settingsBtn.style.left = '350px';
    settingsBtn.style.zIndex = '10000';
    settingsBtn.style.background = 'none';
    settingsBtn.style.border = 'none';
    settingsBtn.style.color = 'white';
    settingsBtn.style.fontSize = '20px';
    settingsBtn.style.cursor = 'pointer';
    settingsBtn.style.backgroundColor = 'rgba(0,0,0,0.7)';
    settingsBtn.style.padding = '10px';
    settingsBtn.style.borderRadius = '50%';
    settingsBtn.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';

    settingsBtn.addEventListener('click', toggleSettingsPanel);
    document.body.appendChild(settingsBtn);
    return settingsBtn;
}

function createSettingsPanel() {
    const panel = document.createElement('div');
    panel.id = 'automation-settings-panel';
    panel.style.position = 'absolute';
    panel.style.top = '80px';
    panel.style.left = '420px';
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
 <select id="controls-position" style="width: 100%; padding: 5px;">
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
    const settingsBtn = document.getElementById('automation-settings-btn');

    if (controls) {
        controls.style.right = automationState.controlsPosition === 'right' ? '20px' : 'auto';
        controls.style.left = automationState.controlsPosition === 'left' ? '20px' : 'auto';
    }

    if (settingsBtn) {
        settingsBtn.style.right = automationState.controlsPosition === 'left' ? '20px' : 'auto';
        settingsBtn.style.left = automationState.controlsPosition === 'right' ? '20px' : 'auto';
    }
}


function speak(text) {
    if (!automationState.speechEnabled || !window.speechSynthesis) return;

    
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9; 
    window.speechSynthesis.speak(utterance);
}


const defaultAutomationCommands = {
    'pay saved beneficiary': {
        steps: [
            { action: 'click', selector: '#transacts'},
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#payments' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#saved-payment-btn' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#saved-beneficiary' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '.beneficiary-card:first-child' },
            { action: 'wait', duration: 1000 },
            { action: 'setValue', selector: '#amount', value: '100' },
            { action: 'wait', duration: 1000 },
            { action: 'setValue', selector: '#reference', value: 'Automated payment' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '.submit-payment-btn' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#done-button' }
        ],
        description: 'Initiate payment to a saved beneficiary',
        category: 'payments'
    },
    'add new beneficiary': {
        steps: [
            {action: 'click', selector: '#transacts'},
            { action: 'wait', duration: 1000 },
            {action: 'click', selector: '#payments'},
            { action: 'click', selector: '#create-beneficiary-btn' },
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
            {action: 'click', selector: '#transact'},
            { action: 'click', selector: '#payment' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#onceoff-beneficiary-option' }
        ],
        description: 'Make a once-off payment',
        category: 'payments'
    },
    'go to account': {
        steps: [
            {action: 'click', selector: '#accounts' },
            { action: 'wait', duration: 1000 },
            { action: 'click', url: '#view' }
        ],
        description: 'View Accounts',
        category: 'Accounts',
        preventReloop: true
    }
};

let automationCommands = defaultAutomationCommands;

function loadAutomationCommands() {
    try {
        const ctx = 'computer';
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
                                category: t.category || 'general',
                                preventReloop: false
                            };
                        }
                    });
                    if (Object.keys(loaded).length > 0) {
                        automationCommands = loaded;
                        showFeedbackMessage('Automation tasks updated from database', 'info');
                    }
                }
            })
            .catch(() => { /* keep defaults */ });
    } catch (_) { /* ignore */ }
}


function initAutomationSystem() {
    // Load commands from backend (with fallback to defaults)
    loadAutomationCommands();
    
    if (sessionStorage.getItem('terminationInProgress') === 'true') {
        sessionStorage.removeItem('terminationInProgress');
        showFeedbackMessage("Automation terminated successfully", 'warning');
        return;
    }

    const searchInput = document.getElementById('automation-search');
    const executeBtn = document.getElementById('execute-automation');

    
    createSettingsButton();
    createSettingsPanel();

    
    createControlButtons();

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

    
    trackNavigationHistory();

    
    checkForPendingAutomation();
}


function createControlButtons() {
    const controlsContainer = document.createElement('div');
    controlsContainer.id = 'automation-controls';
    controlsContainer.style.position = 'fixed';
    controlsContainer.style.bottom = '20px';
    controlsContainer.style.right = '20px';
    controlsContainer.style.display = 'flex';
    controlsContainer.style.gap = '10px';
    controlsContainer.style.zIndex = '10000';
    controlsContainer.style.backgroundColor = 'rgba(0,0,0,0.7)';
    controlsContainer.style.padding = '10px';
    controlsContainer.style.borderRadius = '5px';
    controlsContainer.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    controlsContainer.style.transition = 'opacity 0.3s ease';
    controlsContainer.style.opacity = '1';

    
    const rewindBtn = document.createElement('button');
    rewindBtn.id = 'rewind-btn';
    rewindBtn.innerHTML = '⏮';
    rewindBtn.title = 'Rewind';
    rewindBtn.style.background = 'none';
    rewindBtn.style.border = 'none';
    rewindBtn.style.color = 'white';
    rewindBtn.style.fontSize = '20px';
    rewindBtn.style.cursor = 'pointer';

    const pauseBtn = document.createElement('button');
    pauseBtn.id = 'pause-btn';
    pauseBtn.innerHTML = '⏸';
    pauseBtn.title = 'Pause';
    pauseBtn.style.background = 'none';
    pauseBtn.style.border = 'none';
    pauseBtn.style.color = 'white';
    pauseBtn.style.fontSize = '20px';
    pauseBtn.style.cursor = 'pointer';

    const playBtn = document.createElement('button');
    playBtn.id = 'play-btn';
    playBtn.innerHTML = '▶';
    playBtn.title = 'Play';
    playBtn.style.background = 'none';
    playBtn.style.border = 'none';
    playBtn.style.color = 'white';
    playBtn.style.fontSize = '20px';
    playBtn.style.cursor = 'pointer';
    playBtn.style.display = 'none';

    const forwardBtn = document.createElement('button');
    forwardBtn.id = 'forward-btn';
    forwardBtn.innerHTML = '⏭';
    forwardBtn.title = 'Fast Forward';
    forwardBtn.style.background = 'none';
    forwardBtn.style.border = 'none';
    forwardBtn.style.color = 'white';
    forwardBtn.style.fontSize = '20px';
    forwardBtn.style.cursor = 'pointer';

    
    const autopilotBtn = document.createElement('button');
    autopilotBtn.id = 'autopilot-btn';
    autopilotBtn.innerHTML = automationState.isAutopilot ? '💻' : '👨‍💻';
    autopilotBtn.title = automationState.isAutopilot ? 'Autopilot: ON' : 'Autopilot: OFF';
    autopilotBtn.style.background = 'none';
    autopilotBtn.style.border = 'none';
    autopilotBtn.style.color = 'white';
    autopilotBtn.style.fontSize = '20px';
    autopilotBtn.style.cursor = 'pointer';

    
    const terminateBtn = document.createElement('button');
    terminateBtn.id = 'terminate-btn';
    terminateBtn.innerHTML = '❌';
    terminateBtn.title = 'Terminate Automation';
    terminateBtn.style.background = 'none';
    terminateBtn.style.border = 'none';
    terminateBtn.style.color = 'white';
    terminateBtn.style.fontSize = '20px';
    terminateBtn.style.cursor = 'pointer';
    terminateBtn.style.display = 'none';

    
    controlsContainer.appendChild(rewindBtn);
    controlsContainer.appendChild(pauseBtn);
    controlsContainer.appendChild(playBtn);
    controlsContainer.appendChild(forwardBtn);
    controlsContainer.appendChild(autopilotBtn);
    controlsContainer.appendChild(terminateBtn);

    
    document.body.appendChild(controlsContainer);

    
    pauseBtn.addEventListener('click', pauseAutomation);
    playBtn.addEventListener('click', resumeAutomation);
    rewindBtn.addEventListener('click', rewindAutomation);
    forwardBtn.addEventListener('click', forwardAutomation);
    autopilotBtn.addEventListener('click', toggleAutopilot);
    terminateBtn.addEventListener('click', terminateAutomation);

    
    const style = document.createElement('style');
    style.textContent = `
 #automation-controls {
 opacity: 1 !important;
 visibility: visible !important;
 }
 #automation-controls button:hover {
 transform: scale(1.1);
 transition: transform 0.2s ease;
 }
 #terminate-btn:hover {
 color: #ff4444 !important;
 }
 `;
    document.head.appendChild(style);
}


function terminateAutomation() {
    if (automationState.currentCommand || automationState.waitingForUserClick) {
        
        automationState.isTerminating = true;

        
        if (automationState.currentTimeout) {
            clearTimeout(automationState.currentTimeout);
            automationState.currentTimeout = null;
        }

        
        clearClickHandlers();

        
        clearHighlights();

        
        sessionStorage.setItem('terminationInProgress', 'true');
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
            currentHighlightedElement: null,
            isTerminating: false
        };

        
        const searchInput = document.getElementById('automation-search');
        const executeBtn = document.getElementById('execute-automation');
        if (searchInput && executeBtn) {
            searchInput.disabled = false;
            executeBtn.disabled = false;
            searchInput.focus();
        }

        
        updateTranscript("Automation terminated by user");
        showFeedbackMessage("Automation terminated", 'warning');

        
        updateControlButtons();

        
        setTimeout(() => {
            const transcriptContainer = document.getElementById('automation-transcript');
            if (transcriptContainer) transcriptContainer.remove();
        }, 3000);
    } else {
        showFeedbackMessage("No automation to terminate", 'info');
    }
}


function toggleAutopilot() {
    automationState.isAutopilot = !automationState.isAutopilot;
    storeSetting('autopilot', automationState.isAutopilot);

    const autopilotBtn = document.getElementById('autopilot-btn');
    if (autopilotBtn) {
        autopilotBtn.innerHTML = automationState.isAutopilot ? '💻' : '👨‍💻';
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


function trackNavigationHistory() {
    
    if (automationState.navigationHistory.length === 0) {
        automationState.navigationHistory.push(window.location.href);
        automationState.navigationIndex = 0;
    }

    
    const originalPushState = history.pushState;
    const originalReplaceState = history.replaceState;

    history.pushState = function() {
        originalPushState.apply(this, arguments);
        handleNavigationChange();
    };

    history.replaceState = function() {
        originalReplaceState.apply(this, arguments);
        handleNavigationChange();
    };

    
    window.addEventListener('popstate', function() {
        handleNavigationChange();
    });

    
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' && e.target.href) {
            setTimeout(() => {
                handleNavigationChange();
            }, 1000); 
        }
    }, true);
}

function handleNavigationChange() {
    const currentUrl = window.location.href;
    const lastUrl = automationState.navigationHistory[automationState.navigationHistory.length - 1];

    if (currentUrl !== lastUrl) {
        
        if (automationState.navigationIndex < automationState.navigationHistory.length - 1) {
            automationState.navigationHistory = automationState.navigationHistory.slice(0, automationState.navigationIndex + 1);
        }

        automationState.navigationHistory.push(currentUrl);
        automationState.navigationIndex++;
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
        if (automationState.currentSteps.length > 0) {
            terminateBtn.style.display = 'inline';
        } else {
            terminateBtn.style.display = 'none';
        }

        if (automationState.isPaused || automationState.currentSteps.length === 0) {
            pauseBtn.style.display = 'none';
            playBtn.style.display = 'inline';
        } else {
            pauseBtn.style.display = 'inline';
            playBtn.style.display = 'none';
        }
    }
}


function rewindAutomation() {
    if (automationState.navigationIndex > 0 && !automationState.isTerminating) {
        
        if (automationState.currentTimeout) {
            clearTimeout(automationState.currentTimeout);
            automationState.currentTimeout = null;
        }

        automationState.navigationIndex--;
        const targetUrl = automationState.navigationHistory[automationState.navigationIndex];

        
        if (automationState.currentCommand) {
            sessionStorage.setItem('pendingAutomation', JSON.stringify({
                command: automationState.currentCommand,
                stepIndex: automationState.currentStepIndex,
                isReload: true,
                isAutopilot: automationState.isAutopilot
            }));
        }

        window.location.href = targetUrl;
        updateTranscript("Rewinding to previous page");
        speak("Rewinding to previous page");
    } else {
        updateTranscript("Already at the beginning of navigation history");
        speak("Already at the beginning of navigation history");
    }
}


function forwardAutomation() {
    if (automationState.navigationIndex < automationState.navigationHistory.length - 1 && !automationState.isTerminating) {
        
        if (automationState.currentTimeout) {
            clearTimeout(automationState.currentTimeout);
            automationState.currentTimeout = null;
        }

        automationState.navigationIndex++;
        const targetUrl = automationState.navigationHistory[automationState.navigationIndex];

        
        if (automationState.currentCommand) {
            sessionStorage.setItem('pendingAutomation', JSON.stringify({
                command: automationState.currentCommand,
                stepIndex: automationState.currentStepIndex,
                isReload: true,
                isAutopilot: automationState.isAutopilot
            }));
        }

        window.location.href = targetUrl;
        updateTranscript("Fast forwarding to next page");
        speak("Fast forwarding to next page");
    } else {
        updateTranscript("Already at the end of navigation history");
        speak("Already at the end of navigation history");
    }
}


function checkForPendingAutomation() {
    
    if (sessionStorage.getItem('terminationInProgress') === 'true') {
        sessionStorage.removeItem('terminationInProgress');
        return;
    }

    const pendingAutomation = sessionStorage.getItem('pendingAutomation');
    if (pendingAutomation) {
        try {
            const { command, stepIndex, isReload, isAutopilot } = JSON.parse(pendingAutomation);
            const commandObj = automationCommands[command];

            
            if (isAutopilot !== undefined) {
                automationState.isAutopilot = isAutopilot;
                const autopilotBtn = document.getElementById('autopilot-btn');
                if (autopilotBtn) {
                    autopilotBtn.innerHTML = automationState.isAutopilot ? '💻' : '👨‍💻';
                    autopilotBtn.title = automationState.isAutopilot ? 'Autopilot: ON' : 'Autopilot: OFF';
                }
            }

            
            if (isReload && commandObj.preventReloop) {
                sessionStorage.removeItem('pendingAutomation');
                return;
            }

            if (commandObj && commandObj.steps && stepIndex < commandObj.steps.length) {
                
                setTimeout(() => {
                    automationState.currentCommand = command;
                    automationState.currentSteps = commandObj.steps;
                    automationState.currentStepIndex = stepIndex;

                    
                    const terminateBtn = document.getElementById('terminate-btn');
                    if (terminateBtn) terminateBtn.style.display = 'inline';

                    if (automationState.isAutopilot) {
                        executeNextStep();
                    } else {
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
                document.getElementById('automation-search').value = match;
                dropdown.style.display = 'none';
                executeCommand(match);
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
    document.querySelector('.search-container').appendChild(dropdown);
    return dropdown;
}


function executeCommand(commandText) {
    if (!commandText || automationState.isTerminating) return;

    
    clearAutomationState();

    
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
        automationState.currentCommand = bestMatch;
        automationState.currentSteps = command.steps;
        automationState.currentStepIndex = 0;

        
        const terminateBtn = document.getElementById('terminate-btn');
        if (terminateBtn) terminateBtn.style.display = 'inline';

        speak(`Starting automation: ${bestMatch}`);

        if (automationState.isAutopilot) {
            executeNextStep();
        } else {
            highlightCurrentStep();
        }
    } else {
        showFeedbackMessage("Command not recognized. Try 'pay saved beneficiary', 'add new beneficiary', etc.", 'error');
        speak("Command not recognized");
    }
}


function clearAutomationState() {
    clearHighlights();
    clearClickHandlers();
    if (automationState.currentTimeout) {
        clearTimeout(automationState.currentTimeout);
        automationState.currentTimeout = null;
    }

    automationState.currentHighlightedElement = null;
    automationState.waitingForUserClick = false;
}


function clearClickHandlers() {
    automationState.clickHandlers.forEach(handler => {
        if (handler.element && handler.callback) {
            handler.element.removeEventListener('click', handler.callback);
        }
    });
    automationState.clickHandlers = [];
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


function executeNextStep() {
    if (automationState.isPaused || automationState.isTerminating) return;

    if (automationState.currentStepIndex >= automationState.currentSteps.length) {
        
        completeAutomation();
        return;
    }

    const step = automationState.currentSteps[automationState.currentStepIndex];
    updateTranscript(`Executing step ${automationState.currentStepIndex + 1}: ${getStepDescription(step)}`);
    speak(`Step ${automationState.currentStepIndex + 1}: ${getStepDescription(step)}`);

    
    if (!automationState.isTerminating) {
        sessionStorage.setItem('pendingAutomation', JSON.stringify({
            command: automationState.currentCommand,
            stepIndex: automationState.currentStepIndex,
            isReload: false,
            isAutopilot: automationState.isAutopilot
        }));

        executeStep(step, () => {
            automationState.currentStepIndex++;
            if (!automationState.isPaused && !automationState.waitingForUserClick && !automationState.isTerminating) {
                automationState.currentTimeout = setTimeout(executeNextStep, automationState.stepDelay);
            }
        });
    }
}


function highlightCurrentStep() {
    if (automationState.currentStepIndex >= automationState.currentSteps.length) return;

    const step = automationState.currentSteps[automationState.currentStepIndex];
    updateTranscript(`Step ${automationState.currentStepIndex + 1}: ${getStepDescription(step)}`);
    speak(`Step ${automationState.currentStepIndex + 1}: ${getStepDescription(step)}`);

    if (step.action === 'click') {
        const element = document.querySelector(step.selector);
        if (element) {
            
            highlightElement(element, 'default');
            element.classList.add('automation-target');
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });

            
            automationState.currentHighlightedElement = element;

            
            const clickHandler = (e) => {
                if (e.target === element || element.contains(e.target)) {
                    e.preventDefault();
                    e.stopPropagation();

                    
                    element.removeEventListener('click', clickHandler);
                    automationState.clickHandlers = automationState.clickHandlers.filter(h => h.callback !== clickHandler);

                    
                    highlightElement(element, 'success');

                    
                    element.click();
                    console.log(`User clicked: ${step.selector}`);
                    updateTranscript(`User clicked: ${step.selector}`);
                    speak(`Clicked ${step.selector.replace(/[#.]/g, ' ').trim()}`);

                    
                    setTimeout(() => {
                        element.classList.remove('automation-target');
                        clearHighlights();

                        
                        automationState.currentStepIndex++;
                        if (!automationState.isPaused && !automationState.isTerminating) {
                            if (automationState.currentStepIndex < automationState.currentSteps.length) {
                                highlightCurrentStep();
                            } else {
                                completeAutomation();
                            }
                        }
                    }, automationState.highlightDuration);
                }
            };

            element.addEventListener('click', clickHandler);
            automationState.clickHandlers.push({ element, callback: clickHandler });

            updateTranscript(`Please click the highlighted element: ${step.selector}`);
            speak(`Please click the highlighted element`);
        } else {
            console.warn(`Element not found: ${step.selector}`);
            updateTranscript(`Error: Element not found - ${step.selector}`);
            speak(`Error: Element not found`);
            showFeedbackMessage(`Element not found: ${step.selector}`, 'error');

            
            automationState.currentStepIndex++;
            if (!automationState.isPaused && !automationState.isTerminating) {
                if (automationState.currentStepIndex < automationState.currentSteps.length) {
                    if (automationState.isAutopilot) {
                        executeNextStep();
                    } else {
                        highlightCurrentStep();
                    }
                } else {
                    completeAutomation();
                }
            }
        }
    } else {
        
        executeStep(step, () => {
            automationState.currentStepIndex++;
            if (!automationState.isPaused && !automationState.isTerminating) {
                if (automationState.currentStepIndex < automationState.currentSteps.length) {
                    if (automationState.isAutopilot) {
                        executeNextStep();
                    } else {
                        highlightCurrentStep();
                    }
                } else {
                    completeAutomation();
                }
            }
        });
    }
}

function completeAutomation() {
    if (automationState.isTerminating) return;

    showFeedbackMessage("Automation completed successfully!", 'success');
    speak("Automation completed successfully");
    sessionStorage.removeItem('pendingAutomation');

    
    clearAutomationState();
    automationState.currentCommand = null;
    automationState.currentSteps = [];
    automationState.currentStepIndex = 0;

    
    const terminateBtn = document.getElementById('terminate-btn');
    if (terminateBtn) terminateBtn.style.display = 'none';

    
    const searchInput = document.getElementById('automation-search');
    const executeBtn = document.getElementById('execute-automation');
    if (searchInput && executeBtn) {
        searchInput.disabled = false;
        executeBtn.disabled = false;
        searchInput.focus();
    }

    
    updateControlButtons();

    
    setTimeout(() => {
        const transcriptContainer = document.getElementById('automation-transcript');
        if (transcriptContainer) transcriptContainer.remove();
    }, 5000);
}

function createTranscriptContainer() {
    const transcriptContainer = document.createElement('div');
    transcriptContainer.id = 'automation-transcript';
    transcriptContainer.style.position = 'fixed';
    transcriptContainer.style.bottom = '80px';
    transcriptContainer.style.right = '20px';
    transcriptContainer.style.backgroundColor = 'rgba(0,0,0,0.8)';
    transcriptContainer.style.color = 'white';
    transcriptContainer.style.padding = '10px';
    transcriptContainer.style.borderRadius = '5px';
    transcriptContainer.style.maxWidth = '300px';
    transcriptContainer.style.zIndex = '10000';
    document.body.appendChild(transcriptContainer);
    return transcriptContainer;
}


function updateTranscript(message) {
    if (automationState.isTerminating) return;

    const transcriptContainer = document.getElementById('automation-transcript') || createTranscriptContainer();

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
    if (highlighter) {
        highlighter.style.opacity = '0';
    }
    document.querySelectorAll('.automation-target').forEach(el => {
        el.classList.remove('automation-target');
    });
    automationState.currentHighlightedElement = null;
}


function executeStep(step, callback) {
    if (automationState.isPaused || automationState.isTerminating) return;

    switch(step.action) {
        case 'click':
            const element = document.querySelector(step.selector);
            if (element) {
                
                automationState.currentHighlightedElement = element;

                
                highlightElement(element, 'default');

                
                element.classList.add('automation-target');

                
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });

                if (automationState.isAutopilot) {
                    
                    setTimeout(() => {
                        if (automationState.isTerminating) return;

                        
                        highlightElement(element, 'success');

                        
                        element.click();
                        console.log(`Clicked: ${step.selector}`);
                        updateTranscript(`Clicked: ${step.selector}`);
                        speak(`Clicked ${step.selector.replace(/[#.]/g, ' ').trim()}`);

                        
                        setTimeout(() => {
                            element.classList.remove('automation-target');
                            clearHighlights();
                            if (callback) callback();
                        }, automationState.highlightDuration);
                    }, 500);
                } else {
                    
                }
            } else {
                console.warn(`Element not found: ${step.selector}`);
                updateTranscript(`Error: Element not found - ${step.selector}`);
                speak(`Error: Element not found`);
                showFeedbackMessage(`Element not found: ${step.selector}`, 'error');
                if (callback) callback();
            }
            break;

        case 'wait':
            updateTranscript(`Waiting for ${step.duration}ms`);
            speak(`Waiting for ${Math.round(step.duration / 1000)} seconds`);
            automationState.currentTimeout = setTimeout(() => {
                if (!automationState.isTerminating && callback) callback();
            }, step.duration);
            break;

        case 'navigate':
            if (automationState.isTerminating) return;

            updateTranscript(`Navigating to: ${step.url}`);
            speak(`Navigating to ${step.url}`);
            
            highlightElement(document.documentElement, 'warning');

            
            if (!automationState.isTerminating) {
                sessionStorage.setItem('pendingAutomation', JSON.stringify({
                    command: automationState.currentCommand,
                    stepIndex: automationState.currentSteps.findIndex(s => s === step) + 1,
                    isReload: true,
                    isAutopilot: automationState.isAutopilot
                }));
            }

            automationState.currentTimeout = setTimeout(() => {
                if (!automationState.isTerminating) {
                    window.location.href = step.url;
                }
            }, 1000);
            break;

        default:
            console.warn(`Unknown action: ${step.action}`);
            updateTranscript(`Unknown action: ${step.action}`);
            speak(`Unknown action`);
            if (callback) callback();
    }
}


function highlightElement(element, status = 'default') {
    if (!element || !element.getBoundingClientRect || automationState.isTerminating) return;

    const highlighter = document.getElementById('automation-highlighter') || createHighlighter();
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

    return highlighter;
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
    if (automationState.isTerminating) return;

    let feedback = document.getElementById('automation-feedback');
    if (!feedback) {
        feedback = document.createElement('div');
        feedback.id = 'automation-feedback';
        feedback.style.position = 'fixed';
        feedback.style.bottom = '20px';
        feedback.style.left = '50%';
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

    
    const colors = {
        info: 'rgba(52, 152, 219, 0.9)',
        success: 'rgba(46, 204, 113, 0.9)',
        warning: 'rgba(241, 196, 15, 0.9)',
        error: 'rgba(231, 76, 60, 0.9)'
    };

    feedback.style.backgroundColor = colors[type] || colors.info;
    feedback.style.opacity = '1';

    
    setTimeout(() => {
        feedback.style.opacity = '0';
        setTimeout(() => feedback.remove(), 500);
    }, 3000);
}


document.addEventListener('DOMContentLoaded', function() {
    
    createHighlighter();

    
    initAutomationSystem();
});