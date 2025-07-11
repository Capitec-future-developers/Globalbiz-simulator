// AUTOMATION SYSTEM

// Configuration
const automationConfig = {
    stepDelay: 500, // 500ms between steps
    highlightDuration: 400, // 400ms highlight duration
    highlightColor: '0 0 0 4px rgba(255, 215, 0, 0.7)', // Gold glow effect
    autoPilot: false // Default auto-pilot state
};

// Automation state management
let automationState = {
    isPaused: false,
    currentStepIndex: 0,
    currentSteps: [],
    currentCommand: '',
    currentTimeout: null,
    isAutopilot: getStoredAutopilotState(),
    waitingForUserClick: false,
    manualNavigation: false,
    clickHandlers: [], // Track click handlers for cleanup
    navigationHistory: [],
    navigationIndex: -1,
    currentHighlightedElement: null,
    isTerminating: false
};

// Get autopilot state from sessionStorage or use default
function getStoredAutopilotState() {
    const storedState = sessionStorage.getItem('automationAutopilot');
    return storedState !== null ? JSON.parse(storedState) : automationConfig.autoPilot;
}

// Store autopilot state in sessionStorage
function storeAutopilotState(state) {
    sessionStorage.setItem('automationAutopilot', JSON.stringify(state));
}

// Enhanced command mapping with additional metadata
const automationCommands = {
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

// Initialize automation system
function initAutomationSystem() {
// Check if we're recovering from a termination
    if (sessionStorage.getItem('terminationInProgress') === 'true') {
        sessionStorage.removeItem('terminationInProgress');
        showFeedbackMessage("Automation terminated successfully", 'warning');
        return;
    }

    const searchInput = document.getElementById('automation-search');
    const executeBtn = document.getElementById('execute-automation');

// Create control buttons
    createControlButtons();

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

// Track navigation history
    trackNavigationHistory();

// Check for pending automation on page load
    checkForPendingAutomation();
}

// Create control buttons container with autopilot toggle
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

// Create buttons
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
    playBtn.innerHTML = '▶️';
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

// Autopilot toggle button
    const autopilotBtn = document.createElement('button');
    autopilotBtn.id = 'autopilot-btn';
    autopilotBtn.innerHTML = automationState.isAutopilot ? '💻' : '🧑‍🦲';
    autopilotBtn.title = automationState.isAutopilot ? 'Autopilot: ON' : 'Autopilot: OFF';
    autopilotBtn.style.background = 'none';
    autopilotBtn.style.border = 'none';
    autopilotBtn.style.color = 'white';
    autopilotBtn.style.fontSize = '20px';
    autopilotBtn.style.cursor = 'pointer';

// Terminate button - always visible when automation is running
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

// Add buttons to container
    controlsContainer.appendChild(rewindBtn);
    controlsContainer.appendChild(pauseBtn);
    controlsContainer.appendChild(playBtn);
    controlsContainer.appendChild(forwardBtn);
    controlsContainer.appendChild(autopilotBtn);
    controlsContainer.appendChild(terminateBtn);

// Add container to body
    document.body.appendChild(controlsContainer);

// Set up control buttons event listeners
    pauseBtn.addEventListener('click', pauseAutomation);
    playBtn.addEventListener('click', resumeAutomation);
    rewindBtn.addEventListener('click', rewindAutomation);
    forwardBtn.addEventListener('click', forwardAutomation);
    autopilotBtn.addEventListener('click', toggleAutopilot);
    terminateBtn.addEventListener('click', terminateAutomation);

// Add CSS to ensure controls stay visible
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

// Terminate current automation
function terminateAutomation() {
    if (automationState.currentCommand || automationState.waitingForUserClick) {
// Set termination flag
        automationState.isTerminating = true;

// Clear all timeouts and intervals
        if (automationState.currentTimeout) {
            clearTimeout(automationState.currentTimeout);
            automationState.currentTimeout = null;
        }

// Clear all click handlers
        clearClickHandlers();

// Clear highlights
        clearHighlights();

// Mark termination in session storage to prevent continuation
        sessionStorage.setItem('terminationInProgress', 'true');
        sessionStorage.removeItem('pendingAutomation');

// Reset automation state
        automationState = {
            isPaused: false,
            currentStepIndex: 0,
            currentSteps: [],
            currentCommand: '',
            currentTimeout: null,
            isAutopilot: automationState.isAutopilot,
            waitingForUserClick: false,
            manualNavigation: false,
            clickHandlers: [],
            navigationHistory: automationState.navigationHistory,
            navigationIndex: automationState.navigationIndex,
            currentHighlightedElement: null,
            isTerminating: false
        };

// Re-enable search
        const searchInput = document.getElementById('automation-search');
        const executeBtn = document.getElementById('execute-automation');
        if (searchInput && executeBtn) {
            searchInput.disabled = false;
            executeBtn.disabled = false;
            searchInput.focus();
        }

// Update transcript
        updateTranscript("Automation terminated by user");
        showFeedbackMessage("Automation terminated", 'warning');

// Update control buttons
        updateControlButtons();

// Remove transcript after delay
        setTimeout(() => {
            const transcriptContainer = document.getElementById('automation-transcript');
            if (transcriptContainer) transcriptContainer.remove();
        }, 3000);
    } else {
        showFeedbackMessage("No automation to terminate", 'info');
    }
}

// Toggle autopilot mode
function toggleAutopilot() {
    automationState.isAutopilot = !automationState.isAutopilot;
    storeAutopilotState(automationState.isAutopilot);

    const autopilotBtn = document.getElementById('autopilot-btn');
    if (autopilotBtn) {
        autopilotBtn.innerHTML = automationState.isAutopilot ? '💻' : '🧑‍🦲';
        autopilotBtn.title = automationState.isAutopilot ? 'Autopilot: ON' : 'Autopilot: OFF';
    }

    updateTranscript(`Autopilot ${automationState.isAutopilot ? 'enabled' : 'disabled'}`);

// If we're in manual mode and waiting for user click, highlight the current step
    if (!automationState.isAutopilot && automationState.currentSteps.length > 0 && !automationState.isPaused) {
        highlightCurrentStep();
    }

// If we're switching to autopilot and automation is in progress, continue automatically
    if (automationState.isAutopilot && automationState.currentSteps.length > 0 && !automationState.isPaused) {
        executeNextStep();
    }
}

// Track navigation history
function trackNavigationHistory() {
// Store current URL when script loads
    if (automationState.navigationHistory.length === 0) {
        automationState.navigationHistory.push(window.location.href);
        automationState.navigationIndex = 0;
    }

// Override pushState and replaceState to track URL changes
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

// Track popstate events (back/forward navigation)
    window.addEventListener('popstate', function() {
        handleNavigationChange();
    });

// Track link clicks
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' && e.target.href) {
            setTimeout(() => {
                handleNavigationChange();
            }, 1000); // Wait for page to potentially load
        }
    }, true);
}

function handleNavigationChange() {
    const currentUrl = window.location.href;
    const lastUrl = automationState.navigationHistory[automationState.navigationHistory.length - 1];

    if (currentUrl !== lastUrl) {
// If we're not at the end of history, truncate the future history
        if (automationState.navigationIndex < automationState.navigationHistory.length - 1) {
            automationState.navigationHistory = automationState.navigationHistory.slice(0, automationState.navigationIndex + 1);
        }

        automationState.navigationHistory.push(currentUrl);
        automationState.navigationIndex++;
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
}

// Resume automation
function resumeAutomation() {
    if (!automationState.isPaused || automationState.currentSteps.length === 0) return;

    automationState.isPaused = false;
    updateControlButtons();
    updateTranscript('Resuming automation...');

    if (automationState.isAutopilot) {
        executeNextStep();
    } else {
        highlightCurrentStep();
    }
}

// Update control buttons visibility
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

// Rewind automation
function rewindAutomation() {
    if (automationState.navigationIndex > 0 && !automationState.isTerminating) {
// Clear any pending timeouts
        if (automationState.currentTimeout) {
            clearTimeout(automationState.currentTimeout);
            automationState.currentTimeout = null;
        }

        automationState.navigationIndex--;
        const targetUrl = automationState.navigationHistory[automationState.navigationIndex];

// Save current automation state if running
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
    } else {
        updateTranscript("Already at the beginning of navigation history");
    }
}

// Fast forward automation
function forwardAutomation() {
    if (automationState.navigationIndex < automationState.navigationHistory.length - 1 && !automationState.isTerminating) {
// Clear any pending timeouts
        if (automationState.currentTimeout) {
            clearTimeout(automationState.currentTimeout);
            automationState.currentTimeout = null;
        }

        automationState.navigationIndex++;
        const targetUrl = automationState.navigationHistory[automationState.navigationIndex];

// Save current automation state if running
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
    } else {
        updateTranscript("Already at the end of navigation history");
    }
}

// Check if there's a pending automation to continue
function checkForPendingAutomation() {
// Don't continue if termination was requested
    if (sessionStorage.getItem('terminationInProgress') === 'true') {
        sessionStorage.removeItem('terminationInProgress');
        return;
    }

    const pendingAutomation = sessionStorage.getItem('pendingAutomation');
    if (pendingAutomation) {
        try {
            const { command, stepIndex, isReload, isAutopilot } = JSON.parse(pendingAutomation);
            const commandObj = automationCommands[command];

// Restore autopilot state if it exists
            if (isAutopilot !== undefined) {
                automationState.isAutopilot = isAutopilot;
                const autopilotBtn = document.getElementById('autopilot-btn');
                if (autopilotBtn) {
                    autopilotBtn.innerHTML = automationState.isAutopilot ? '💻' : '🧑‍🦲';
                    autopilotBtn.title = automationState.isAutopilot ? 'Autopilot: ON' : 'Autopilot: OFF';
                }
            }

// Skip if this is a reload and the command prevents reloop
            if (isReload && commandObj.preventReloop) {
                sessionStorage.removeItem('pendingAutomation');
                return;
            }

            if (commandObj && commandObj.steps && stepIndex < commandObj.steps.length) {
// Continue from the next step
                setTimeout(() => {
                    automationState.currentCommand = command;
                    automationState.currentSteps = commandObj.steps;
                    automationState.currentStepIndex = stepIndex;

// Show terminate button
                    const terminateBtn = document.getElementById('terminate-btn');
                    if (terminateBtn) terminateBtn.style.display = 'inline';

                    if (automationState.isAutopilot) {
                        executeNextStep();
                    } else {
                        highlightCurrentStep();
                    }
                }, 1000); // Give the page time to load
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

// Highlight matching part of the text
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

// Execute the automation command
function executeCommand(commandText) {
    if (!commandText || automationState.isTerminating) return;

// Clear any existing automation
    clearAutomationState();

// Find the best matching command
    const normalizedInput = commandText.toLowerCase().trim();
    let bestMatch = null;
    let bestScore = 0;

// Enhanced matching algorithm
    Object.keys(automationCommands).forEach(cmd => {
        const cmdLower = cmd.toLowerCase();
// Score based on how much of the command matches the input
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

// Show terminate button
        const terminateBtn = document.getElementById('terminate-btn');
        if (terminateBtn) terminateBtn.style.display = 'inline';

        if (automationState.isAutopilot) {
            executeNextStep();
        } else {
            highlightCurrentStep();
        }
    } else {
        showFeedbackMessage("Command not recognized. Try 'pay saved beneficiary', 'add new beneficiary', etc.", 'error');
    }
}

// Clear all automation state
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

// Clear all click handlers
function clearClickHandlers() {
    automationState.clickHandlers.forEach(handler => {
        if (handler.element && handler.callback) {
            handler.element.removeEventListener('click', handler.callback);
        }
    });
    automationState.clickHandlers = [];
}

// Calculate match score between input and command
function calculateMatchScore(input, command) {
// Exact match gets highest score
    if (input === command) return 100;

// Contains the full command
    if (input.includes(command)) return 90;

// Command contains the input
    if (command.includes(input)) return 80;

// Calculate percentage of matching words
    const inputWords = input.split(/\s+/);
    const commandWords = command.split(/\s+/);
    const matchingWords = inputWords.filter(word =>
        commandWords.some(cmdWord => cmdWord.includes(word))
    );

    return (matchingWords.length / inputWords.length) * 100;
}

// Execute the next step in automation
function executeNextStep() {
    if (automationState.isPaused || automationState.isTerminating) return;

    if (automationState.currentStepIndex >= automationState.currentSteps.length) {
// Automation complete
        completeAutomation();
        return;
    }

    const step = automationState.currentSteps[automationState.currentStepIndex];
    updateTranscript(`Executing step ${automationState.currentStepIndex + 1}: ${getStepDescription(step)}`);

// Save the current state before executing the step
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
                automationState.currentTimeout = setTimeout(executeNextStep, automationConfig.stepDelay);
            }
        });
    }
}

// Highlight the current step for manual execution
function highlightCurrentStep() {
    if (automationState.currentStepIndex >= automationState.currentSteps.length) return;

    const step = automationState.currentSteps[automationState.currentStepIndex];

    if (step.action === 'click') {
        const element = document.querySelector(step.selector);
        if (element) {
// Highlight the element
            highlightElement(element, 'default');
            element.classList.add('automation-target');
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });

// Store the current highlighted element
            automationState.currentHighlightedElement = element;

// Add click handler for manual mode
            const clickHandler = (e) => {
                if (e.target === element || element.contains(e.target)) {
                    e.preventDefault();
                    e.stopPropagation();

// Remove the handler
                    element.removeEventListener('click', clickHandler);
                    automationState.clickHandlers = automationState.clickHandlers.filter(h => h.callback !== clickHandler);

// Change to success color
                    highlightElement(element, 'success');

// Perform the click
                    element.click();
                    console.log(`User clicked: ${step.selector}`);
                    updateTranscript(`User clicked: ${step.selector}`);

// Remove highlight after duration
                    setTimeout(() => {
                        element.classList.remove('automation-target');
                        clearHighlights();

// Move to next step
                        automationState.currentStepIndex++;
                        if (!automationState.isPaused && !automationState.isTerminating) {
                            if (automationState.currentStepIndex < automationState.currentSteps.length) {
                                highlightCurrentStep();
                            } else {
                                completeAutomation();
                            }
                        }
                    }, automationConfig.highlightDuration);
                }
            };

            element.addEventListener('click', clickHandler);
            automationState.clickHandlers.push({ element, callback: clickHandler });

            updateTranscript(`Please click the highlighted element: ${step.selector}`);
        } else {
            console.warn(`Element not found: ${step.selector}`);
            updateTranscript(`Error: Element not found - ${step.selector}`);
            showFeedbackMessage(`Element not found: ${step.selector}`, 'error');

// Move to next step even if element not found
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
// For non-click steps in manual mode, just execute them
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
    sessionStorage.removeItem('pendingAutomation');

// Reset automation state
    clearAutomationState();
    automationState.currentCommand = null;
    automationState.currentSteps = [];
    automationState.currentStepIndex = 0;

// Hide terminate button
    const terminateBtn = document.getElementById('terminate-btn');
    if (terminateBtn) terminateBtn.style.display = 'none';

// Re-enable search
    const searchInput = document.getElementById('automation-search');
    const executeBtn = document.getElementById('execute-automation');
    if (searchInput && executeBtn) {
        searchInput.disabled = false;
        executeBtn.disabled = false;
        searchInput.focus();
    }

// Update control buttons
    updateControlButtons();

// Remove transcript after delay
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

// Update the transcript
function updateTranscript(message) {
    if (automationState.isTerminating) return;

    const transcriptContainer = document.getElementById('automation-transcript') || createTranscriptContainer();

    const entry = document.createElement('div');
    entry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
    entry.style.marginBottom = '5px';
    entry.style.borderBottom = '1px solid #444';
    entry.style.paddingBottom = '5px';
    transcriptContainer.insertBefore(entry, transcriptContainer.firstChild);

// Keep only the last 5 messages
    while (transcriptContainer.children.length > 5) {
        transcriptContainer.removeChild(transcriptContainer.lastChild);
    }
}

// Get a human-readable description of a step
function getStepDescription(step) {
    switch(step.action) {
        case 'click':
            return `Clicking element: ${step.selector}`;
        case 'wait':
            return `Waiting for ${step.duration}ms`;
        case 'navigate':
            return `Navigating to: ${step.url}`;
        default:
            return `Performing action: ${step.action}`;
    }
}

// Clear all highlights
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

// Execute a single automation step
function executeStep(step, callback) {
    if (automationState.isPaused || automationState.isTerminating) return;

    switch(step.action) {
        case 'click':
            const element = document.querySelector(step.selector);
            if (element) {
// Store the current highlighted element
                automationState.currentHighlightedElement = element;

// Highlight the element
                highlightElement(element, 'default');

// Add temporary class to element
                element.classList.add('automation-target');

// Scroll element into view if needed
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });

                if (automationState.isAutopilot) {
// Auto-pilot mode - click automatically after delay
                    setTimeout(() => {
                        if (automationState.isTerminating) return;

// Change to success color just before clicking
                        highlightElement(element, 'success');

// Perform the click
                        element.click();
                        console.log(`Clicked: ${step.selector}`);
                        updateTranscript(`Clicked: ${step.selector}`);

// Remove highlight after duration
                        setTimeout(() => {
                            element.classList.remove('automation-target');
                            clearHighlights();
                            if (callback) callback();
                        }, automationConfig.highlightDuration);
                    }, 500);
                } else {
// Manual mode - handled by highlightCurrentStep
                }
            } else {
                console.warn(`Element not found: ${step.selector}`);
                updateTranscript(`Error: Element not found - ${step.selector}`);
                showFeedbackMessage(`Element not found: ${step.selector}`, 'error');
                if (callback) callback();
            }
            break;

        case 'wait':
            updateTranscript(`Waiting for ${step.duration}ms`);
            automationState.currentTimeout = setTimeout(() => {
                if (!automationState.isTerminating && callback) callback();
            }, step.duration);
            break;

        case 'navigate':
            if (automationState.isTerminating) return;

            updateTranscript(`Navigating to: ${step.url}`);
// Highlight the whole viewport before navigating
            highlightElement(document.documentElement, 'warning');

// Mark this as a reload in session storage
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
            if (callback) callback();
    }
}

// Position and show highlighter around an element
function highlightElement(element, status = 'default') {
    if (!element || !element.getBoundingClientRect || automationState.isTerminating) return;

    const highlighter = document.getElementById('automation-highlighter') || createHighlighter();
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

// Set highlighter position and size
    highlighter.style.width = `${rect.width}px`;
    highlighter.style.height = `${rect.height}px`;
    highlighter.style.top = `${rect.top + scrollTop}px`;
    highlighter.style.left = `${rect.left + scrollLeft}px`;
    highlighter.style.borderRadius = window.getComputedStyle(element).borderRadius;

// Set color based on status
    const colors = {
        default: 'rgba(65, 131, 215, 0.7)', // Blue
        success: 'rgba(46, 204, 113, 0.7)', // Green
        warning: 'rgba(241, 196, 15, 0.7)', // Yellow
        error: 'rgba(231, 76, 60, 0.7)' // Red
    };

    highlighter.style.boxShadow = `0 0 0 4px ${colors[status] || colors.default}`;
    highlighter.style.opacity = '1';
    highlighter.style.transition = 'all 0.3s ease';

    return highlighter;
}

// Create highlighter element
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

// Show feedback message
function showFeedbackMessage(message, type) {
    if (automationState.isTerminating) return;

    let feedback = document.getElementById('automation-feedback');
    if (!feedback) {
        feedback = document.createElement('div');
        feedback.id = 'automation-feedback';
        document.body.appendChild(feedback);
    }

    feedback.textContent = message;
    feedback.className = `feedback-message feedback-${type}`;

// Auto-hide after 3 seconds
    setTimeout(() => {
        feedback.style.opacity = '0';
        setTimeout(() => feedback.remove(), 500);
    }, 3000);
}

// Initialize the automation system when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
// Create highlighter element on startup
    createHighlighter();

// Initialize automation system
    initAutomationSystem();
});
