// Automation command mapping
const automationCommands = {
    'pay saved beneficiary': {
        steps: [
            { action: 'click', selector: '#payment' },
            { action: 'click', selector: '#saved-beneficiary-option' },
            { action: 'click', selector: '.beneficiary-card:first-child' }
        ],
        description: 'Initiate payment to a saved beneficiary'
    },
    'add new beneficiary': {
        steps: [
            { action: 'click', selector: '#create' },
            { action: 'click', selector: '[data-type="beneficiary"]' }
        ],
        description: 'Add a new beneficiary'
    },
    'view transactions': {
        steps: [
            { action: 'click', selector: '#btn-transactions' }
        ],
        description: 'View transaction history'
    },
    'make once off payment': {
        steps: [
            { action: 'click', selector: '#payment' },
            { action: 'click', selector: '#onceoff-beneficiary-option' }
        ],
        description: 'Make a once-off payment'
    }
    // Add more commands as needed
};

// Configuration
const automationConfig = {
    stepDelay: 1000, // 1 second between steps (increased from 500ms)
    highlightDuration: 1500, // 1.5 seconds highlight duration
    highlightColor: '0 0 0 4px rgba(255, 215, 0, 0.7)' // Gold glow effect
};

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
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
});

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
            const item = document.createElement('div');
            item.className = 'suggestion-item';

            // Highlight matching part of the text
            const matchIndex = match.toLowerCase().indexOf(input.toLowerCase());
            if (matchIndex >= 0) {
                const before = match.substring(0, matchIndex);
                const matched = match.substring(matchIndex, matchIndex + input.length);
                const after = match.substring(matchIndex + input.length);

                item.innerHTML = `${before}<strong>${matched}</strong>${after}`;
            } else {
                item.textContent = match;
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

    // Simple matching algorithm - could be enhanced
    Object.keys(automationCommands).forEach(cmd => {
        const cmdLower = cmd.toLowerCase();
        if (normalizedInput.includes(cmdLower) && cmdLower.length > bestScore) {
            bestMatch = cmd;
            bestScore = cmdLower.length;
        }
    });

    if (bestMatch) {
        const command = automationCommands[bestMatch];
        console.log(`Executing command: ${bestMatch}`);
        runAutomationSteps(command.steps);
    } else {
        alert("Command not recognized. Try 'pay saved beneficiary', 'add new beneficiary', etc.");
    }
}

// Run the automation steps
function runAutomationSteps(steps) {
    if (!steps || steps.length === 0) return;

    // Disable search during automation
    const searchInput = document.getElementById('automation-search');
    const executeBtn = document.getElementById('execute-automation');
    if (searchInput && executeBtn) {
        searchInput.disabled = true;
        executeBtn.disabled = true;
    }

    // Execute steps with delay between them
    steps.forEach((step, index) => {
        setTimeout(() => {
            executeStep(step, index === steps.length - 1);
        }, index * automationConfig.stepDelay);
    });
}

// Clear all highlights
function clearHighlights() {
    document.querySelectorAll('.automation-highlight').forEach(el => {
        el.classList.remove('automation-highlight');
    });
}

// Execute a single automation step
function executeStep(step, isLastStep) {
    if (step.action === 'click') {
        const element = document.querySelector(step.selector);
        if (element) {
            // Add highlight class
            element.classList.add('automation-highlight');

            // Scroll element into view if needed
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });

            // Click after a brief pause to make highlight visible
            setTimeout(() => {
                element.click();
                console.log(`Clicked: ${step.selector}`);

                // Remove highlight after duration
                setTimeout(() => {
                    element.classList.remove('automation-highlight');

                    // Re-enable search if this was the last step
                    if (isLastStep) {
                        const searchInput = document.getElementById('automation-search');
                        const executeBtn = document.getElementById('execute-automation');
                        if (searchInput && executeBtn) {
                            searchInput.disabled = false;
                            executeBtn.disabled = false;
                            searchInput.focus();
                        }
                    }
                }, automationConfig.highlightDuration);
            }, 700); // Small delay before click to ensure highlight is visible
        } else {
            console.warn(`Element not found: ${step.selector}`);
        }
    }
}