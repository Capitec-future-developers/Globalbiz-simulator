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
            {action: 'click', selector: '#Home' },
            { action: 'navigate', url: 'Phone2.html' }
        ],
        description: 'Return to dashboard',
        category: 'navigation'
    }
};

// Automation state management
let automationState = {
    isPaused: false,
    currentStepIndex: 0,
    currentSteps: [],
    currentCommand: ''
};

// Initialize automation system
function initAutomationSystem() {
    const searchInput = document.getElementById('automation-search');
    const executeBtn = document.getElementById('execute-automation');

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

// Set up control buttons
    const pauseBtn = document.getElementById('pause-btn');
    const playBtn = document.getElementById('play-btn');
    const rewindBtn = document.getElementById('rewind-btn');
    const forwardBtn = document.getElementById('forward-btn');

    if (pauseBtn) pauseBtn.addEventListener('click', pauseAutomation);
    if (playBtn) playBtn.addEventListener('click', resumeAutomation);
    if (rewindBtn) rewindBtn.addEventListener('click', rewindAutomation);
    if (forwardBtn) forwardBtn.addEventListener('click', forwardAutomation);

// Check for pending automation on page load
    checkForPendingAutomation();
}

function pauseAutomation() {
    automationState.isPaused = true;
    const pauseBtn = document.getElementById('pause-btn');
    const playBtn = document.getElementById('play-btn');
    if (pauseBtn) pauseBtn.style.display = 'none';
    if (playBtn) playBtn.style.display = 'inline';
    updateTranscript('Automation paused');
}

function resumeAutomation() {
    if (!automationState.isPaused) return;
    automationState.isPaused = false;
    const pauseBtn = document.getElementById('pause-btn');
    const playBtn = document.getElementById('play-btn');
    if (pauseBtn) pauseBtn.style.display = 'inline';
    if (playBtn) playBtn.style.display = 'none';
    updateTranscript('Resuming automation...');
    executeNextStep();
}

function rewindAutomation() {
    if (automationState.currentStepIndex > 0) {
        automationState.currentStepIndex--;
        updateTranscript(`Rewinding to step ${automationState.currentStepIndex + 1}`);
        if (!automationState.isPaused) {
            runAutomationSteps(automationState.currentSteps.slice(automationState.currentStepIndex), automationState.currentCommand);
        }
    }
}

function forwardAutomation() {
    if (automationState.currentStepIndex < automationState.currentSteps.length - 1) {
        automationState.currentStepIndex++;
        updateTranscript(`Fast forwarding to step ${automationState.currentStepIndex + 1}`);
        if (!automationState.isPaused) {
            runAutomationSteps(automationState.currentSteps.slice(automationState.currentStepIndex), automationState.currentCommand);
        }
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

    automationState = {
        isPaused: false,
        currentStepIndex: 0,
        currentSteps: steps,
        currentCommand: commandName
    };

    const searchInput = document.getElementById('automation-search');
    const executeBtn = document.getElementById('execute-automation');
    if (searchInput && executeBtn) {
        searchInput.disabled = true;
        executeBtn.disabled = true;
    }

    showFeedbackMessage("Automation in progress...", 'info');
    updateTranscript(`Starting automation: ${commandName}`);

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
        setTimeout(executeNextStep, automationConfig.stepDelay);
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
            setTimeout(callback, step.duration);
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
        document.body.appendChild(feedback);
    }

    feedback.textContent = message;
    feedback.className = `feedback-message feedback-${type}`;

    setTimeout(() => {
        feedback.style.opacity = '0';
        setTimeout(() => feedback.remove(), 500);
    }, 3000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initAutomationSystem);