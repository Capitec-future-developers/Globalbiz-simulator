// Advanced Automation System with Multi-Page Support
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
    // Enhanced settings
    maxRetries: 3,
    retryDelay: 1500,
    navigationTimeout: 5000,
    elementWaitTimeout: 10000,
    transitionDelay: 800,
    debugMode: false,
    persistAcrossSessions: true,
    smoothScroll: true,
    scrollOffset: 80,
    shadowDOMSupport: false,
    iframeSupport: false
};

// Enhanced state management with localStorage persistence
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
    // Enhanced state tracking
    executionHistory: [],
    elementCache: new Map(),
    retryCount: 0,
    currentElement: null,
    pageTransitions: new Set(),
    observers: [],
    lastCheckpoint: null,
    startTime: null,
    totalStepsCompleted: 0,
    errorCount: 0
};

// Enhanced element finder with multiple strategies
function findElement(selector, timeout = automationConfig.elementWaitTimeout) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        
        // Check cache first
        if (automationState.elementCache.has(selector)) {
            const cached = automationState.elementCache.get(selector);
            if (cached && cached.isConnected) {
                resolve(cached);
                return;
            } else {
                automationState.elementCache.delete(selector);
            }
        }
        
        function tryFind() {
            // Multiple selector strategies
            const selectors = [
                selector, // Original selector
                selector.replace(/^#/, '[id="') + '"]', // ID attribute
                selector.replace(/^\./, '[class*="') + '"]', // Class attribute
                `[data-testid="${selector.replace(/^[#.]/, '')}"]`, // Test ID
                `[aria-label="${selector.replace(/^[#.]/, '')}"]` // ARIA label
            ];
            
            for (const sel of selectors) {
                try {
                    const element = document.querySelector(sel);
                    if (element && isElementVisible(element)) {
                        automationState.elementCache.set(selector, element);
                        resolve(element);
                        return;
                    }
                } catch (e) {
                    // Invalid selector, continue
                }
            }
            
            // Shadow DOM support
            if (automationConfig.shadowDOMSupport) {
                const shadowElements = findInShadowDOM(selector);
                if (shadowElements.length > 0) {
                    automationState.elementCache.set(selector, shadowElements[0]);
                    resolve(shadowElements[0]);
                    return;
                }
            }
            
            // iframe support
            if (automationConfig.iframeSupport) {
                const iframeElements = findInIFrames(selector);
                if (iframeElements.length > 0) {
                    automationState.elementCache.set(selector, iframeElements[0]);
                    resolve(iframeElements[0]);
                    return;
                }
            }
            
            if (Date.now() - startTime >= timeout) {
                reject(new Error(`Element not found: ${selector}`));
                return;
            }
            
            setTimeout(tryFind, 100);
        }
        
        tryFind();
    });
}

function isElementVisible(element) {
    if (!element || !element.isConnected) return false;
    
    const style = window.getComputedStyle(element);
    const rect = element.getBoundingClientRect();
    
    return style.display !== 'none' &&
           style.visibility !== 'hidden' &&
           style.opacity !== '0' &&
           rect.width > 0 &&
           rect.height > 0;
}

function findInShadowDOM(selector) {
    const elements = [];
    const shadowHosts = document.querySelectorAll('*');
    
    shadowHosts.forEach(host => {
        if (host.shadowRoot) {
            const found = host.shadowRoot.querySelectorAll(selector);
            if (found.length > 0) {
                elements.push(...found);
            }
        }
    });
    
    return elements;
}

function findInIFrames(selector) {
    const elements = [];
    const iframes = document.querySelectorAll('iframe');
    
    iframes.forEach(iframe => {
        try {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            const found = iframeDoc.querySelectorAll(selector);
            if (found.length > 0) {
                elements.push(...found);
            }
        } catch (e) {
            // Cross-origin iframe, ignore
        }
    });
    
    return elements;
}

// Enhanced scrolling with smooth behavior and offset
async function smoothScrollToElement(element) {
    if (!element) return;
    
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetY = rect.top + scrollTop - automationConfig.scrollOffset;
    
    if (automationConfig.smoothScroll) {
        await new Promise((resolve) => {
            window.scrollTo({
                top: targetY,
                behavior: 'smooth'
            });
            setTimeout(resolve, 500);
        });
    } else {
        window.scrollTo(0, targetY);
    }
    
    // Wait for any scroll-triggered animations
    await wait(automationConfig.transitionDelay);
}

// Enhanced wait function with optional condition
function wait(duration, condition = null) {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        
        function checkCondition() {
            if (condition && typeof condition === 'function') {
                if (condition()) {
                    resolve();
                    return;
                }
            }
            
            if (Date.now() - startTime >= duration) {
                if (condition) {
                    reject(new Error('Wait condition timeout'));
                } else {
                    resolve();
                }
                return;
            }
            
            setTimeout(checkCondition, 100);
        }
        
        checkCondition();
    });
}

// Enhanced click with retry mechanism
async function enhancedClick(element, step) {
    let attempts = 0;
    
    while (attempts < automationConfig.maxRetries) {
        try {
            // Check if element is clickable
            if (!element || !element.isConnected) {
                throw new Error('Element not available');
            }
            
            // Ensure element is visible
            if (!isElementVisible(element)) {
                throw new Error('Element not visible');
            }
            
            // Simulate realistic click
            const rect = element.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            // Create and dispatch mouse events
            const mouseDownEvent = new MouseEvent('mousedown', {
                view: window,
                bubbles: true,
                cancelable: true,
                clientX: centerX,
                clientY: centerY
            });
            
            const mouseUpEvent = new MouseEvent('mouseup', {
                view: window,
                bubbles: true,
                cancelable: true,
                clientX: centerX,
                clientY: centerY
            });
            
            const clickEvent = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true,
                clientX: centerX,
                clientY: centerY
            });
            
            element.dispatchEvent(mouseDownEvent);
            await wait(50);
            element.dispatchEvent(mouseUpEvent);
            await wait(50);
            element.dispatchEvent(clickEvent);
            
            // Also trigger native click
            if (typeof element.click === 'function') {
                element.click();
            }
            
            // Log success
            if (automationConfig.debugMode) {
                console.log(`Clicked element: ${step.selector} (attempt ${attempts + 1})`);
            }
            
            return true;
        } catch (error) {
            attempts++;
            automationState.errorCount++;
            
            if (automationConfig.debugMode) {
                console.error(`Click failed (attempt ${attempts}):`, error);
            }
            
            if (attempts < automationConfig.maxRetries) {
                await wait(automationConfig.retryDelay);
                
                // Re-find element if it was lost
                element = await findElement(step.selector).catch(() => null);
            }
        }
    }
    
    throw new Error(`Failed to click element after ${automationConfig.maxRetries} attempts`);
}

// Enhanced navigation with progress tracking
async function enhancedNavigate(url, step) {
    return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
            reject(new Error('Navigation timeout'));
        }, automationConfig.navigationTimeout);
        
        function handleLoad() {
            clearTimeout(timeout);
            window.removeEventListener('load', handleLoad);
            window.removeEventListener('DOMContentLoaded', handleLoad);
            
            // Wait for dynamic content to settle
            setTimeout(() => {
                resolve();
            }, automationConfig.transitionDelay);
        }
        
        window.addEventListener('load', handleLoad);
        window.addEventListener('DOMContentLoaded', handleLoad);
        
        // Handle relative URLs for different contexts
        let targetUrl = url;
        const fromRob = /\/rob\//i.test(window.location.pathname);
        if (fromRob && !/^https?:/i.test(targetUrl) && targetUrl.indexOf('../') !== 0) {
            targetUrl = '../App/' + targetUrl;
        }
        
        // Store page transition state
        automationState.pageTransitions.add(targetUrl);
        
        window.location.href = targetUrl;
    });
}

// Enhanced step execution with better error handling
async function executeStep(step, callback) {
    try {
        switch(step.action) {
            case 'click':
                const element = await findElement(step.selector);
                if (!element) {
                    throw new Error(`Element not found: ${step.selector}`);
                }
                
                element.classList.add('automation-target');
                await smoothScrollToElement(element);
                
                // Pre-highlight delay
                await wait(automationConfig.preHighlightDelay);
                highlightElement(element, 'default');
                
                // Pre-click delay
                await wait(automationConfig.preClickDelay);
                highlightElement(element, 'success');
                
                // Perform click with retry
                await enhancedClick(element, step);
                
                const label = getElementLabel(step);
                updateTranscript(`Clicked: ${label}`);
                speak(`Clicked ${label}`);
                
                // Post-click delay
                await wait(automationConfig.highlightDuration);
                element.classList.remove('automation-target');
                clearHighlights();
                
                if (callback) callback();
                break;
                
            case 'wait':
                await wait(step.duration);
                if (callback) callback();
                break;
                
            case 'waitFor':
                const waitElement = await findElement(step.selector, step.timeout || automationConfig.elementWaitTimeout);
                if (waitElement) {
                    if (callback) callback();
                }
                break;
                
            case 'navigate':
                updateTranscript(`Navigating to: ${step.url}`);
                speak(`Navigating`);
                highlightElement(document.documentElement, 'warning');
                
                // Save checkpoint before navigation
                saveCheckpoint();
                
                await enhancedNavigate(step.url, step);
                
                // Wait for page to fully load
                await wait(automationConfig.transitionDelay);
                
                if (callback) callback();
                break;
                
            case 'execute':
                if (typeof step.function === 'string' && window[step.function]) {
                    await window[step.function](step.params);
                } else if (step.code) {
                    await new Function('return ' + step.code)();
                }
                if (callback) callback();
                break;
                
            case 'checkpoint':
                saveCheckpoint();
                if (callback) callback();
                break;
                
            default:
                updateTranscript(`Unknown action: ${step.action}`);
                speak(`Unknown action`);
                if (callback) callback();
        }
    } catch (error) {
        handleStepError(error, step, callback);
    }
}

// Enhanced error handling with recovery
function handleStepError(error, step, callback) {
    automationState.errorCount++;
    
    if (automationConfig.debugMode) {
        console.error('Step execution failed:', error);
    }
    
    updateTranscript(`Error: ${error.message}`);
    speak(`Error: ${error.message}`);
    showFeedbackMessage(`Error: ${error.message}`, 'error');
    
    // Try to recover
    if (automationState.retryCount < automationConfig.maxRetries) {
        automationState.retryCount++;
        setTimeout(() => {
            executeStep(step, callback);
        }, automationConfig.retryDelay);
    } else {
        // Reset retry count
        automationState.retryCount = 0;
        
        // Check if we should skip to next step
        if (automationState.currentStepIndex < automationState.currentSteps.length - 1) {
            updateTranscript('Skipping failed step...');
            if (callback) callback();
        } else {
            finishAutomation();
        }
    }
}

// Checkpoint system for recovery
function saveCheckpoint() {
    const checkpoint = {
        command: automationState.currentCommand,
        stepIndex: automationState.currentStepIndex,
        steps: automationState.currentSteps,
        timestamp: Date.now(),
        url: window.location.href
    };
    
    automationState.lastCheckpoint = checkpoint;
    
    if (automationConfig.persistAcrossSessions) {
        localStorage.setItem('automation_checkpoint', JSON.stringify(checkpoint));
    }
    
    if (automationConfig.debugMode) {
        console.log('Checkpoint saved:', checkpoint);
    }
}

function loadCheckpoint() {
    if (!automationConfig.persistAcrossSessions) return null;
    
    const checkpoint = localStorage.getItem('automation_checkpoint');
    if (checkpoint) {
        try {
            const parsed = JSON.parse(checkpoint);
            if (Date.now() - parsed.timestamp < 3600000) { // Valid for 1 hour
                return parsed;
            }
        } catch (e) {
            console.error('Failed to parse checkpoint:', e);
        }
    }
    return null;
}

// Enhanced MutationObserver for dynamic content
function setupMutationObserver() {
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Check if added nodes match any pending selectors
                if (automationState.currentSteps.length > 0) {
                    const currentStep = automationState.currentSteps[automationState.currentStepIndex];
                    if (currentStep && currentStep.action === 'waitFor') {
                        const element = document.querySelector(currentStep.selector);
                        if (element && isElementVisible(element)) {
                            if (automationConfig.debugMode) {
                                console.log('Element found via MutationObserver:', currentStep.selector);
                            }
                        }
                    }
                }
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true
    });
    
    automationState.observers.push(observer);
}

// Enhanced initialization
function initAutomationSystem() {
    const searchInput = document.getElementById('automation-search');
    const executeBtn = document.getElementById('execute-automation');
    
    // Load commands from API
    loadAutomationCommands();
    
    // Create UI components
    createSettingsButton();
    createSettingsPanel();
    
    const { pauseBtn, playBtn, rewindBtn, forwardBtn, autopilotBtn, terminateBtn } = createControlButtons();
    
    // Setup event listeners
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
    
    // Button event listeners
    pauseBtn.addEventListener('click', pauseAutomation);
    playBtn.addEventListener('click', resumeAutomation);
    rewindBtn.addEventListener('click', rewindAutomation);
    forwardBtn.addEventListener('click', forwardAutomation);
    autopilotBtn.addEventListener('click', toggleAutopilot);
    terminateBtn.addEventListener('click', terminateAutomation);
    
    // Setup enhanced features
    setupMutationObserver();
    
    // Check for pending automation or checkpoint
    const checkpoint = loadCheckpoint();
    const pendingAutomation = sessionStorage.getItem('pendingAutomation');
    
    if (checkpoint && window.confirm('Resume previous automation session?')) {
        resumeFromCheckpoint(checkpoint);
    } else if (pendingAutomation) {
        checkForPendingAutomation();
    }
    
    updateControlButtons();
}

function resumeFromCheckpoint(checkpoint) {
    automationState.currentCommand = checkpoint.command;
    automationState.currentSteps = checkpoint.steps;
    automationState.currentStepIndex = checkpoint.stepIndex;
    
    updateTranscript(`Resuming from checkpoint: ${checkpoint.command}`);
    speak(`Resuming from checkpoint`);
    
    if (automationState.isAutopilot) {
        executeNextStep();
    } else {
        highlightCurrentStep();
    }
}

// Enhanced command execution with progress bar
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
        if (automationConfig.debugMode) {
            console.log(`Executing command: ${bestMatch}`);
        }
        
        // Reset state
        automationState.executionHistory = [];
        automationState.startTime = Date.now();
        automationState.totalStepsCompleted = 0;
        automationState.errorCount = 0;
        
        runAutomationSteps(command.steps, bestMatch);
        showProgressBar();
    } else {
        showFeedbackMessage("Command not recognized. Try 'pay saved beneficiary', 'add new beneficiary', etc.", 'error');
        speak("Command not recognized");
    }
}

// Progress bar UI
function showProgressBar() {
    let progressBar = document.getElementById('automation-progress');
    if (!progressBar) {
        progressBar = document.createElement('div');
        progressBar.id = 'automation-progress';
        progressBar.style.position = 'fixed';
        progressBar.style.top = '0';
        progressBar.style.left = '0';
        progressBar.style.width = '100%';
        progressBar.style.height = '4px';
        progressBar.style.zIndex = '10001';
        progressBar.style.backgroundColor = 'rgba(0,0,0,0.1)';
        
        const progressFill = document.createElement('div');
        progressFill.id = 'automation-progress-fill';
        progressFill.style.height = '100%';
        progressFill.style.backgroundColor = '#007fff';
        progressFill.style.transition = 'width 0.3s ease';
        progressFill.style.width = '0%';
        
        progressBar.appendChild(progressFill);
        document.body.appendChild(progressBar);
    } else {
        progressBar.style.display = 'block';
    }
}

function updateProgressBar() {
    const progressFill = document.getElementById('automation-progress-fill');
    if (progressFill && automationState.currentSteps.length > 0) {
        const progress = (automationState.currentStepIndex / automationState.currentSteps.length) * 100;
        progressFill.style.width = `${progress}%`;
    }
}

function hideProgressBar() {
    const progressBar = document.getElementById('automation-progress');
    if (progressBar) {
        progressBar.style.display = 'none';
    }
}

// Enhanced finish automation with statistics
function finishAutomation() {
    const endTime = Date.now();
    const duration = endTime - (automationState.startTime || endTime);
    const stats = {
        totalSteps: automationState.currentSteps.length,
        completedSteps: automationState.totalStepsCompleted,
        errors: automationState.errorCount,
        duration: duration,
        successRate: automationState.errorCount === 0 ? 100 : 
            ((automationState.totalStepsCompleted - automationState.errorCount) / automationState.totalStepsCompleted) * 100
    };
    
    showFeedbackMessage(`Automation completed: ${stats.completedSteps}/${stats.totalSteps} steps, ${stats.errors} errors`, 
        stats.errors === 0 ? 'success' : 'warning');
    
    if (automationConfig.debugMode) {
        console.log('Automation statistics:', stats);
    }
    
    speak(`Automation completed with ${stats.errors} errors`);
    
    sessionStorage.removeItem('pendingAutomation');
    localStorage.removeItem('automation_checkpoint');
    
    hideProgressBar();
    
    const searchInput = document.getElementById('automation-search');
    const executeBtn = document.getElementById('execute-automation');
    if (searchInput && executeBtn) {
        searchInput.disabled = false;
        executeBtn.disabled = false;
        searchInput.focus();
    }
    
    const transcript = document.getElementById('automation-transcript');
    if (transcript) {
        setTimeout(() => transcript.remove(), 10000);
    }
    
    // Reset state
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
        currentElement: null
    };
    
    updateControlButtons();
}

// Enhanced executeNextStep with better async handling
async function executeNextStep() {
    const { currentStepIndex, currentSteps, currentCommand } = automationState;
    
    if (currentStepIndex >= currentSteps.length) {
        finishAutomation();
        return;
    }
    
    if (automationState.isPaused) return;
    
    const step = currentSteps[currentStepIndex];
    
    // Update progress
    updateProgressBar();
    
    // Wait steps pace the automation silently
    if (step.action !== 'wait') {
        const stepDescription = getStepDescription(step);
        updateTranscript(`Step ${currentStepIndex + 1}: ${stepDescription}`);
        speak(stepDescription);
    }
    
    // Save the pending automation state
    sessionStorage.setItem('pendingAutomation', JSON.stringify({
        command: currentCommand,
        stepIndex: currentStepIndex,
        isAutopilot: automationState.isAutopilot,
        manualNavigation: false
    }));
    
    if (automationState.isAutopilot) {
        await executeStep(step, () => {
            automationState.currentStepIndex++;
            automationState.totalStepsCompleted++;
            automationState.executionHistory.push({
                step: currentStepIndex,
                action: step.action,
                timestamp: Date.now(),
                success: true
            });
            
            automationState.currentTimeout = setTimeout(() => {
                executeNextStep();
            }, automationState.stepDelay);
        });
    } else {
        highlightCurrentStep();
    }
}

// Enhanced highlightCurrentStep with better UX
async function highlightCurrentStep() {
    if (automationState.currentStepIndex >= automationState.currentSteps.length) return;
    
    const step = automationState.currentSteps[automationState.currentStepIndex];
    
    if (step.action !== 'wait') {
        const stepDescription = getStepDescription(step);
        updateTranscript(stepDescription);
        speak(stepDescription);
    }
    
    // Save the pending automation state
    sessionStorage.setItem('pendingAutomation', JSON.stringify({
        command: automationState.currentCommand,
        stepIndex: automationState.currentStepIndex,
        isAutopilot: automationState.isAutopilot,
        manualNavigation: true
    }));
    
    if (step.action === 'click') {
        try {
            const element = await findElement(step.selector);
            if (element) {
                element.classList.add('automation-target');
                await smoothScrollToElement(element);
                
                // Pre-highlight delay
                await wait(automationConfig.preHighlightDelay);
                highlightElement(element, 'default');
                
                const clickHandler = async (e) => {
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
                    
                    await enhancedClick(element, step);
                    
                    setTimeout(() => {
                        automationState.currentStepIndex++;
                        automationState.totalStepsCompleted++;
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
            }
        } catch (error) {
            updateTranscript(`Error: ${error.message}`);
            speak(`Error: element not found`);
            showFeedbackMessage(`Element not found: ${step.selector}`, 'error');
            
            // Skip to next step
            automationState.currentStepIndex++;
            if (automationState.currentStepIndex < automationState.currentSteps.length) {
                if (automationState.isAutopilot) {
                    executeNextStep();
                } else {
                    highlightCurrentStep();
                }
            }
        }
    } else if (step.action === 'wait') {
        await wait(step.duration);
        automationState.currentStepIndex++;
        if (automationState.currentStepIndex < automationState.currentSteps.length) {
            if (automationState.isAutopilot) {
                executeNextStep();
            } else {
                highlightCurrentStep();
            }
        }
    } else if (step.action === 'navigate') {
        updateTranscript(`Ready to navigate to ${step.url}`);
        speak(`Ready to navigate`);
        automationState.manualNavigation = true;
    }
}

// Enhanced cleanup
function cleanup() {
    clearTimeout(automationState.currentTimeout);
    clearClickHandlers();
    clearHighlights();
    
    // Disconnect observers
    automationState.observers.forEach(observer => observer.disconnect());
    automationState.observers = [];
    
    // Clear cache
    automationState.elementCache.clear();
    
    // Clean up UI elements
    const elements = [
        'automation-settings-btn',
        'automation-settings-panel',
        'automation-controls',
        'automation-transcript',
        'automation-progress',
        'suggestions-dropdown',
        'automation-highlighter',
        'automation-feedback'
    ];
    
    elements.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.remove();
    });
}

// Handle page unload
window.addEventListener('beforeunload', () => {
    if (automationState.currentSteps.length > 0 && !automationState.isPaused) {
        saveCheckpoint();
    }
    cleanup();
});

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', initAutomationSystem);

// Export for debugging
if (automationConfig.debugMode) {
    window.automationSystem = {
        state: automationState,
        config: automationConfig,
        commands: () => automationCommands,
        execute: executeCommand,
        pause: pauseAutomation,
        resume: resumeAutomation,
        rewind: rewindAutomation,
        forward: forwardAutomation,
        terminate: terminateAutomation,
        saveCheckpoint: saveCheckpoint,
        loadCheckpoint: loadCheckpoint,
        findElement: findElement
    };
}