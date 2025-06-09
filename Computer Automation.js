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
        preventReloop: true // Add this flag to prevent re-execution
    }
};

// Track currently executing command
let currentCommand = null;

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

    // Check for pending automation on page load
    checkForPendingAutomation();
}

// Check if there's a pending automation to continue
function checkForPendingAutomation() {
    const pendingAutomation = sessionStorage.getItem('pendingAutomation');
    if (pendingAutomation) {
        try {
            const { command, stepIndex, isReload } = JSON.parse(pendingAutomation);
            const commandObj = automationCommands[command];

            // Skip if this is a reload and the command prevents reloop
            if (isReload && commandObj.preventReloop) {
                sessionStorage.removeItem('pendingAutomation');
                return;
            }

            if (commandObj && commandObj.steps && stepIndex < commandObj.steps.length) {
                // Continue from the next step
                setTimeout(() => {
                    runAutomationSteps(commandObj.steps.slice(stepIndex), command);
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
    if (!commandText) return;

    // Clear any existing highlights
    clearHighlights();

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
        currentCommand = bestMatch;
        runAutomationSteps(command.steps, bestMatch);
    } else {
        showFeedbackMessage("Command not recognized. Try 'pay saved beneficiary', 'add new beneficiary', etc.", 'error');
    }
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

// Run the automation steps
function runAutomationSteps(steps, commandName) {
    if (!steps || steps.length === 0) return;

    // Disable search during automation
    const searchInput = document.getElementById('automation-search');
    const executeBtn = document.getElementById('execute-automation');
    if (searchInput && executeBtn) {
        searchInput.disabled = true;
        executeBtn.disabled = true;
    }

    // Show feedback message
    showFeedbackMessage("Automation in progress...", 'info');

    // Create transcript container
    const transcriptContainer = document.createElement('div');
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

    // Execute steps with delay between them
    let stepIndex = 0;

    function executeNextStep() {
        if (stepIndex >= steps.length) {
            // Automation complete
            showFeedbackMessage("Automation completed successfully!", 'success');
            sessionStorage.removeItem('pendingAutomation');
            currentCommand = null;

            // Re-enable search
            if (searchInput && executeBtn) {
                searchInput.disabled = false;
                executeBtn.disabled = false;
                searchInput.focus();
            }

            // Remove transcript after delay
            setTimeout(() => {
                if (transcriptContainer) transcriptContainer.remove();
            }, 5000);
            return;
        }

        const step = steps[stepIndex];
        updateTranscript(`Executing step ${stepIndex + 1}: ${getStepDescription(step)}`);

        // Save the current state before executing the step
        sessionStorage.setItem('pendingAutomation', JSON.stringify({
            command: commandName,
            stepIndex: stepIndex,
            isReload: false
        }));

        executeStep(step, () => {
            stepIndex++;
            setTimeout(executeNextStep, automationConfig.stepDelay);
        });
    }

    executeNextStep();
}

// Update the transcript
function updateTranscript(message) {
    const transcriptContainer = document.getElementById('automation-transcript') || document.createElement('div');
    if (!transcriptContainer.id) {
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
}

// Execute a single automation step
function executeStep(step, callback) {
    switch(step.action) {
        case 'click':
            const element = document.querySelector(step.selector);
            if (element) {
                // Highlight the element
                highlightElement(element, 'default');

                // Add temporary class to element
                element.classList.add('automation-target');

                // Scroll element into view if needed
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });

                // Click after a brief pause to make highlight visible
                setTimeout(() => {
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
                console.warn(`Element not found: ${step.selector}`);
                updateTranscript(`Error: Element not found - ${step.selector}`);
                showFeedbackMessage(`Element not found: ${step.selector}`, 'error');
                if (callback) callback();
            }
            break;

        case 'wait':
            updateTranscript(`Waiting for ${step.duration}ms`);
            setTimeout(() => {
                if (callback) callback();
            }, step.duration);
            break;

        case 'navigate':
            updateTranscript(`Navigating to: ${step.url}`);
            // Highlight the whole viewport before navigating
            highlightElement(document.documentElement, 'warning');

            // Mark this as a reload in session storage
            sessionStorage.setItem('pendingAutomation', JSON.stringify({
                command: currentCommand,
                stepIndex: steps.findIndex(s => s === step) + 1,
                isReload: true
            }));

            setTimeout(() => {
                window.location.href = step.url;
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
    if (!element || !element.getBoundingClientRect) return;

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
        default: 'rgba(65, 131, 215, 0.7)',    // Blue
        success: 'rgba(46, 204, 113, 0.7)',     // Green
        warning: 'rgba(241, 196, 15, 0.7)',     // Yellow
        error: 'rgba(231, 76, 60, 0.7)'         // Red
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