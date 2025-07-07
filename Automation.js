// AUTOMATION SYSTEM

// Configuration
const automationConfig = {
    stepDelay: 500, // 500ms between steps
    highlightDuration: 400, // 400ms highlight duration
    highlightColor: '0 0 0 4px rgba(255, 215, 0, 0.7)' // Gold glow effect
};

// Enhanced command mapping with additional metadata
const automationCommands = {
    'pay saved beneficiary': {
        steps: [
            { action: 'click', selector: '#transact'},
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
            {action: 'click', selector: '#transact'},
            { action: 'click', selector: '#payment' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#onceoff-beneficiary-option' }
        ],
        description: 'Make a once-off payment',
        category: 'payments'
    },
    'go to dashboard': {
        steps: [
            {action: 'click', selector: '#bottomNav'},
            {action: 'click', selector: '#Home' },
            { action: 'wait', duration: 1000 },
        ],
        description: 'Return to dashboard',
        category: 'Home'
    },
    'go to transaction limit': {
        steps: [
            {action: 'click', selector: '#sidebarToggle'},
            { action: 'wait', duration: 1000 },
            {action: 'click', selector: '#settings'},
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#Transaction-Limits' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#editlimits' }
        ],
        description: 'Go to transaction limit',
        category: 'transaction limits'
    },
    'Add new card': {
        steps: [
            {action: 'click', selector: '#bottomNav'},
            { action: 'wait', duration: 1000 },
            {action: 'click', selector: '#cards'},
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#Add-Card' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#new-card' }
        ],
        description: 'Add new card',
        category: 'cards'
    },
    'Debit card': {
        steps: [
            {action: 'click', selector: '#bottomNav'},
            { action: 'wait', duration: 1000 },
            {action: 'click', selector: '#cards'},
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#debitToggle' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#debit-card' }
        ],
        description: 'Debit card',
        category: 'cards'
    }
};

// Automation state management
let automationState = {
    isPaused: false,
    currentStepIndex: 0,
    currentSteps: [],
    currentCommand: '',
    currentTimeout: null
};

// Create control buttons container
function createControlButtons() {
    const controlsContainer = document.createElement('div');
    controlsContainer.id = 'automation-controls';
    controlsContainer.style.position = 'fixed';
    controlsContainer.style.top = '10px';
    controlsContainer.style.right = '10px';
    controlsContainer.style.zIndex = '10000';
    controlsContainer.style.display = 'flex';
    controlsContainer.style.gap = '5px';
    controlsContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    controlsContainer.style.padding = '5px';
    controlsContainer.style.borderRadius = '5px';
    controlsContainer.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';

// Create buttons
    const rewindBtn = document.createElement('button');
    rewindBtn.id = 'rewind-btn';
    rewindBtn.innerHTML = '⏪';
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
    playBtn.innerHTML = '▶';
    playBtn.title = 'Play';
    playBtn.style.padding = '5px 10px';
    playBtn.style.border = 'none';
    playBtn.style.borderRadius = '3px';
    playBtn.style.cursor = 'pointer';
    playBtn.style.backgroundColor = '#f0f0f0';

    const forwardBtn = document.createElement('button');
    forwardBtn.id = 'forward-btn';
    forwardBtn.innerHTML = '⏩';
    forwardBtn.title = 'Fast Forward';
    forwardBtn.style.padding = '5px 10px';
    forwardBtn.style.border = 'none';
    forwardBtn.style.borderRadius = '3px';
    forwardBtn.style.cursor = 'pointer';
    forwardBtn.style.backgroundColor = '#f0f0f0';

// Add buttons to container
    controlsContainer.appendChild(rewindBtn);
    controlsContainer.appendChild(pauseBtn);
    controlsContainer.appendChild(playBtn);
    controlsContainer.appendChild(forwardBtn);

// Add container to body
    document.body.appendChild(controlsContainer);

// Return button references
    return {
        pauseBtn,
        playBtn,
        rewindBtn,
        forwardBtn
    };
}

// Initialize automation system
function initAutomationSystem() {
    const searchInput = document.getElementById('automation-search');
    const executeBtn = document.getElementById('execute-automation');

// Create and get control buttons
    const { pauseBtn, playBtn, rewindBtn, forwardBtn } = createControlButtons();

    if (searchInput && executeBtn) {
// Show suggestions when typing
        searchInput.addEventListener('input', function() {
            showCommandSuggestions(this.value);
        });

// Execute command on button click
        executeBtn.addEventListener('click', function() {
            executeCommand(searchInput.value);
        });

// Also execute on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                executeCommand(this.value);
            }
        });

// Hide suggestions when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.search-container')) {
                const dropdown = document.getElementById('suggestions-dropdown');
                if (dropdown) dropdown.style.display = 'none';
            }
        });
    }

// Set up control buttons event listeners
    pauseBtn.addEventListener('click', pauseAutomation);
    playBtn.addEventListener('click', resumeAutomation);
    rewindBtn.addEventListener('click', rewindAutomation);
    forwardBtn.addEventListener('click', forwardAutomation);

// Initialize button visibility
    updateControlButtons();

// Check for pending automation on page load
    checkForPendingAutomation();
}

function pauseAutomation() {
    if (automationState.currentTimeout) {
        clearTimeout(automationState.currentTimeout);
        automationState.currentTimeout = null;
    }
    automationState.isPaused = true;
    updateControlButtons();
    updateTranscript('Automation paused');
}

function resumeAutomation() {
    if (!automationState.isPaused || automationState.currentSteps.length === 0) return;

    automationState.isPaused = false;
    updateControlButtons();
    updateTranscript('Resuming automation...');
    executeNextStep();
}

function updateControlButtons() {
    const pauseBtn = document.getElementById('pause-btn');
    const playBtn = document.getElementById('play-btn');

    if (pauseBtn && playBtn) {
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
    if (automationState.currentStepIndex > 0) {
// Clear any pending timeouts
        if (automationState.currentTimeout) {
            clearTimeout(automationState.currentTimeout);
            automationState.currentTimeout = null;
        }

// Move back one step
        automationState.currentStepIndex--;
        updateTranscript(`Rewound to step ${automationState.currentStepIndex + 1}`);

// Restart automation from the new position
        restartAutomationFromCurrentStep();
    } else {
        updateTranscript('Already at the first step');
    }
}

function forwardAutomation() {
    if (automationState.currentStepIndex < automationState.currentSteps.length - 1) {
// Clear any pending timeouts
        if (automationState.currentTimeout) {
            clearTimeout(automationState.currentTimeout);
            automationState.currentTimeout = null;
        }

// Move forward one step
        automationState.currentStepIndex++;
        updateTranscript(`Advanced to step ${automationState.currentStepIndex + 1}`);

// Restart automation from the new position
        restartAutomationFromCurrentStep();
    } else {
        updateTranscript('Already at the last step');
    }
}

function restartAutomationFromCurrentStep() {
// Clear any existing highlights
    clearHighlights();

// Update the pending automation state
    sessionStorage.setItem('pendingAutomation', JSON.stringify({
        command: automationState.currentCommand,
        stepIndex: automationState.currentStepIndex
    }));

// If automation isn't paused, execute the current step
    if (!automationState.isPaused) {
        executeNextStep();
    }
}

// Check if there's a pending automation to continue
function checkForPendingAutomation() {
    const pendingAutomation = sessionStorage.getItem('pendingAutomation');
    if (pendingAutomation) {
        try {
            const { command, stepIndex } = JSON.parse(pendingAutomation);
            const commandObj = automationCommands[command];
            if (commandObj && commandObj.steps && stepIndex < commandObj.steps.length) {
                setTimeout(() => {
                    runAutomationSteps(commandObj.steps.slice(stepIndex), command);
                }, 1000);
            }
        } catch (e) {
            console.error('Error parsing pending automation:', e);
            sessionStorage.removeItem('pendingAutomation');
        }
    }
}

// Show command suggestions in dropdown
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

// Execute the automation command
function executeCommand(commandText) {
    if (!commandText) return;

    clearHighlights();

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

// Run the automation steps
function runAutomationSteps(steps, commandName) {
    if (!steps || steps.length === 0) return;

// Clear any existing timeout
    if (automationState.currentTimeout) {
        clearTimeout(automationState.currentTimeout);
        automationState.currentTimeout = null;
    }

    automationState = {
        isPaused: false,
        currentStepIndex: 0,
        currentSteps: steps,
        currentCommand: commandName,
        currentTimeout: null
    };

    const searchInput = document.getElementById('automation-search');
    const executeBtn = document.getElementById('execute-automation');
    if (searchInput && executeBtn) {
        searchInput.disabled = true;
        executeBtn.disabled = true;
    }

    showFeedbackMessage("Automation in progress...", 'info');
    updateTranscript(`Starting automation: ${commandName}`);
    updateControlButtons();

    executeNextStep();
}

function executeNextStep() {
    const { currentStepIndex, currentSteps, currentCommand } = automationState;

    if (currentStepIndex >= currentSteps.length) {
        showFeedbackMessage("Automation completed successfully!", 'success');
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

// Reset automation state
        automationState = {
            isPaused: false,
            currentStepIndex: 0,
            currentSteps: [],
            currentCommand: '',
            currentTimeout: null
        };

        updateControlButtons();
        return;
    }

    if (automationState.isPaused) return;

    const step = currentSteps[currentStepIndex];
    updateTranscript(`Executing step ${currentStepIndex + 1}: ${getStepDescription(step)}`);
    sessionStorage.setItem('pendingAutomation', JSON.stringify({
        command: currentCommand,
        stepIndex: currentStepIndex
    }));

    executeStep(step, () => {
        automationState.currentStepIndex++;
        automationState.currentTimeout = setTimeout(executeNextStep, automationConfig.stepDelay);
    });
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
        case 'click': return `Clicking element: ${step.selector}`;
        case 'wait': return `Waiting for ${step.duration}ms`;
        case 'navigate': return `Navigating to: ${step.url}`;
        default: return `Performing action: ${step.action}`;
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

                    setTimeout(() => {
                        element.classList.remove('automation-target');
                        clearHighlights();
                        if (callback) callback();
                    }, automationConfig.highlightDuration);
                }, 500);
            } else {
                updateTranscript(`Error: Element not found - ${step.selector}`);
                showFeedbackMessage(`Element not found: ${step.selector}`, 'error');
                if (callback) callback();
            }
            break;

        case 'wait':
            updateTranscript(`Waiting for ${step.duration}ms`);
            automationState.currentTimeout = setTimeout(callback, step.duration);
            break;

        case 'navigate':
            updateTranscript(`Navigating to: ${step.url}`);
            highlightElement(document.documentElement, 'warning');
            setTimeout(() => {
                window.location.href = step.url;
            }, 1000);
            break;

        default:
            updateTranscript(`Unknown action: ${step.action}`);
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

    const colors = {
        default: 'rgba(65, 131, 215, 0.7)',
        success: 'rgba(46, 204, 113, 0.7)',
        warning: 'rgba(241, 196, 15, 0.7)',
        error: 'rgba(231, 76, 60, 0.7)'
    };

    highlighter.style.boxShadow = `0 0 0 4px ${colors[status] || colors.default}`;
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
    highlighter.style.boxShadow = '0 0 0 4px rgba(65, 131, 215, 0.7)';
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

// Set colors based on type
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

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initAutomationSystem);
