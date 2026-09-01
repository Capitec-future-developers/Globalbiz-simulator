import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getDefaultCommands } from './automationCommands';
import {
    calculateMatchScore,
    getElementLabel,
    getStepDescription,
    speak as speakUtil,
} from './automationUtils';

const DEFAULT_CONFIG = {
    stepDelay: 900,
    highlightDuration: 700,
    preHighlightDelay: 550,
    preClickDelay: 400,
    autopilot: true,
    speechEnabled: false,
    controlsPosition: 'right',
    highlightColors: {
        default: 'rgba(65, 131, 215, 0.7)',
        success: 'rgba(46, 204, 113, 0.7)',
        warning: 'rgba(241, 196, 15, 0.7)',
        error: 'rgba(231, 76, 60, 0.7)',
    },
};

function getStoredSetting(key, defaultValue) {
    if (typeof window === 'undefined') return defaultValue;
    try {
        const stored = window.localStorage.getItem(`automation_${key}`);
        return stored !== null ? JSON.parse(stored) : defaultValue;
    } catch (e) {
        console.error(`Error parsing setting ${key}:`, e);
        return defaultValue;
    }
}

function storeSetting(key, value) {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(`automation_${key}`, JSON.stringify(value));
}

/**
 * React port of the original Automation.js / Computer-Automation.js engine.
 *
 * @param {object} options
 * @param {'app'|'computer'} [options.context='app'] - which built-in command set to start with
 * @param {object} [options.commands] - override the command dictionary entirely
 * @param {object} [options.config] - override any of DEFAULT_CONFIG
 * @param {(url: string) => void} [options.onNavigate] - called for `navigate` steps.
 *   Defaults to `window.location.href = url`. Pass your router's navigate
 *   function here (react-router's `navigate`, etc.) if this is a true SPA -
 *   note the original scripts assumed a full page reload between steps and
 *   used sessionStorage to resume, which still works either way.
 * @param {string} [options.remoteCommandsUrl] - if set, fetched on mount;
 *   response shape: { tasks: [{ key, steps, description, category }] }
 */
export function useAutomation({
                                  context = 'app',
                                  commands: commandsProp,
                                  config: configProp,
                                  onNavigate,
                                  remoteCommandsUrl,
                              } = {}) {
    const config = useMemo(() => ({ ...DEFAULT_CONFIG, ...configProp }), [configProp]);

    // --- settings (persisted) ---------------------------------------------
    const [settings, setSettings] = useState(() => ({
        stepDelay: getStoredSetting('stepDelay', config.stepDelay),
        controlsPosition: getStoredSetting('controlsPosition', config.controlsPosition),
        speechEnabled: getStoredSetting('speechEnabled', config.speechEnabled),
        highlightColors: getStoredSetting('highlightColors', config.highlightColors),
    }));
    const [isAutopilot, setIsAutopilotState] = useState(() =>
        getStoredSetting('autopilot', config.autopilot)
    );

    const updateSettings = useCallback((partial) => {
        setSettings((prev) => {
            const next = { ...prev, ...partial };
            Object.keys(partial).forEach((key) => storeSetting(key, next[key]));
            return next;
        });
    }, []);

    // --- command dictionary --------------------------------------------------
    const [commands, setCommands] = useState(
        () => commandsProp || getDefaultCommands(context)
    );

    useEffect(() => {
        if (commandsProp) return; // caller controls the dictionary
        if (!remoteCommandsUrl) return;
        let cancelled = false;
        fetch(remoteCommandsUrl)
            .then((r) => (r.ok ? r.json() : Promise.reject(r.statusText)))
            .then((data) => {
                if (cancelled || !data || !Array.isArray(data.tasks)) return;
                const loaded = {};
                data.tasks.forEach((t) => {
                    if (t && t.key && Array.isArray(t.steps)) {
                        loaded[t.key] = {
                            steps: t.steps,
                            description: t.description || t.key,
                            category: t.category || 'general',
                            preventReloop: !!t.preventReloop,
                        };
                    }
                });
                if (Object.keys(loaded).length > 0) {
                    setCommands(loaded);
                    showFeedback('Automation tasks updated from database', 'info');
                }
            })
            .catch(() => {});
        return () => {
            cancelled = true;
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [remoteCommandsUrl, commandsProp]);

    // --- live/mutable engine state (refs avoid stale closures in timeouts) --
    const stateRef = useRef({
        isPaused: false,
        isTerminating: false,
        waitingForUserClick: false,
        currentStepIndex: 0,
        currentSteps: [],
        currentCommand: '',
        currentTimeout: null,
        clickHandlers: [],
    });

    // --- UI-facing state (triggers re-render) --------------------------------
    const [currentCommand, setCurrentCommand] = useState('');
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [totalSteps, setTotalSteps] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [transcript, setTranscript] = useState([]);
    const [feedback, setFeedback] = useState(null); // { message, type }
    const [highlightBox, setHighlightBox] = useState(null); // { top,left,width,height,radius,color }
    const [suggestions, setSuggestions] = useState([]);

    const activeElementRef = useRef(null);
    const repositionRef = useRef(null);
    const feedbackTimeoutRef = useRef(null);
    const transcriptClearTimeoutRef = useRef(null);

    // ---- small stable helpers -----------------------------------------------

    const speak = useCallback(
        (text) => speakUtil(text, settings.speechEnabled),
        [settings.speechEnabled]
    );

    const addTranscriptEntry = useCallback((message) => {
        if (!message || stateRef.current.isTerminating) return;
        setTranscript((prev) => {
            const entry = { message, time: new Date().toLocaleTimeString() };
            return [entry, ...prev].slice(0, 5);
        });
    }, []);

    const showFeedback = useCallback((message, type = 'info') => {
        if (stateRef.current.isTerminating) return;
        setFeedback({ message, type });
        if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
        feedbackTimeoutRef.current = setTimeout(() => setFeedback(null), 3000);
    }, []);

    const stopTrackingHighlight = useCallback(() => {
        if (repositionRef.current) {
            window.removeEventListener('scroll', repositionRef.current, true);
            window.removeEventListener('resize', repositionRef.current);
            repositionRef.current = null;
        }
        activeElementRef.current = null;
    }, []);

    const clearHighlights = useCallback(() => {
        setHighlightBox(null);
        document.querySelectorAll('.automation-target').forEach((el) => {
            el.classList.remove('automation-target');
        });
        stopTrackingHighlight();
    }, [stopTrackingHighlight]);

    const highlightElement = useCallback(
        (element, status = 'default') => {
            if (!element || !element.getBoundingClientRect || stateRef.current.isTerminating) return;

            const position = () => {
                const rect = element.getBoundingClientRect();
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
                const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
                setHighlightBox({
                    top: rect.top + scrollTop,
                    left: rect.left + scrollLeft,
                    width: rect.width,
                    height: rect.height,
                    radius: window.getComputedStyle(element).borderRadius,
                    color: settings.highlightColors[status] || settings.highlightColors.default,
                });
            };

            position();
            stopTrackingHighlight();
            activeElementRef.current = element;
            repositionRef.current = () => {
                if (activeElementRef.current === element) position();
            };
            window.addEventListener('scroll', repositionRef.current, true);
            window.addEventListener('resize', repositionRef.current);
        },
        [settings.highlightColors, stopTrackingHighlight]
    );

    const clearClickHandlers = useCallback(() => {
        stateRef.current.clickHandlers.forEach((h) => {
            if (h.element && h.callback) h.element.removeEventListener('click', h.callback);
        });
        stateRef.current.clickHandlers = [];
    }, []);

    const clearCurrentTimeout = useCallback(() => {
        if (stateRef.current.currentTimeout) {
            clearTimeout(stateRef.current.currentTimeout);
            stateRef.current.currentTimeout = null;
        }
    }, []);

    const persistPending = useCallback((overrides = {}) => {
        if (typeof window === 'undefined') return;
        window.sessionStorage.setItem(
            'pendingAutomation',
            JSON.stringify({
                command: stateRef.current.currentCommand,
                stepIndex: stateRef.current.currentStepIndex,
                isAutopilot,
                ...overrides,
            })
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAutopilot]);

    const navigate = useCallback(
        (url) => {
            if (onNavigate) onNavigate(url);
            else window.location.href = url;
        },
        [onNavigate]
    );

    // ---- core step execution --------------------------------------------

    const executeStep = useCallback(
        (step, callback) => {
            if (stateRef.current.isPaused || stateRef.current.isTerminating) return;

            switch (step.action) {
                case 'click': {
                    const element = document.querySelector(step.selector);
                    if (!element) {
                        addTranscriptEntry('Error: could not find that step on this screen');
                        speak('Error: element not found');
                        showFeedback(`Element not found: ${step.selector}`, 'error');
                        callback?.();
                        break;
                    }
                    element.classList.add('automation-target');
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });

                    stateRef.current.currentTimeout = setTimeout(() => {
                        if (stateRef.current.isTerminating) return;
                        highlightElement(element, 'default');

                        stateRef.current.currentTimeout = setTimeout(() => {
                            if (stateRef.current.isTerminating) return;
                            highlightElement(element, 'success');
                            element.click();
                            const label = getElementLabel(step);
                            addTranscriptEntry(`Clicked: ${label}`);
                            speak(`Clicked ${label}`);

                            stateRef.current.currentTimeout = setTimeout(() => {
                                element.classList.remove('automation-target');
                                clearHighlights();
                                callback?.();
                            }, config.highlightDuration);
                        }, config.preClickDelay);
                    }, config.preHighlightDelay);
                    break;
                }

                case 'setValue': {
                    const element = document.querySelector(step.selector);
                    if (!element) {
                        addTranscriptEntry('Error: could not find that step on this screen');
                        speak('Error: element not found');
                        showFeedback(`Element not found: ${step.selector}`, 'error');
                        callback?.();
                        break;
                    }
                    element.classList.add('automation-target');
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    stateRef.current.currentTimeout = setTimeout(() => {
                        if (stateRef.current.isTerminating) return;
                        highlightElement(element, 'default');
                        const nativeSetter = Object.getOwnPropertyDescriptor(
                            window.HTMLInputElement.prototype,
                            'value'
                        )?.set;
                        if (nativeSetter) nativeSetter.call(element, step.value);
                        else element.value = step.value;
                        element.dispatchEvent(new Event('input', { bubbles: true }));
                        element.dispatchEvent(new Event('change', { bubbles: true }));
                        const label = getElementLabel(step);
                        addTranscriptEntry(`Filled: ${label}`);
                        speak(`Filled in ${label}`);
                        stateRef.current.currentTimeout = setTimeout(() => {
                            element.classList.remove('automation-target');
                            clearHighlights();
                            callback?.();
                        }, config.highlightDuration);
                    }, config.preHighlightDelay);
                    break;
                }

                case 'wait':
                    // Silent pacing pause - no transcript entry, no speech.
                    stateRef.current.currentTimeout = setTimeout(callback, step.duration);
                    break;

                case 'navigate': {
                    addTranscriptEntry(`Navigating to: ${step.url}`);
                    speak('Navigating');
                    highlightElement(document.documentElement, 'warning');

                    const nextStepIndex = stateRef.current.currentStepIndex + 1;
                    persistPending({ stepIndex: nextStepIndex, isReload: true });

                    stateRef.current.currentTimeout = setTimeout(() => {
                        if (!stateRef.current.isTerminating) navigate(step.url);
                    }, 1000);
                    break;
                }

                default:
                    addTranscriptEntry(`Unknown action: ${step.action}`);
                    speak('Unknown action');
                    callback?.();
            }
        },
        [
            addTranscriptEntry,
            clearHighlights,
            config.highlightDuration,
            config.preClickDelay,
            config.preHighlightDelay,
            highlightElement,
            navigate,
            persistPending,
            showFeedback,
            speak,
        ]
    );

    const finishAutomation = useCallback(() => {
        if (stateRef.current.isTerminating) return;
        showFeedback('Automation completed successfully!', 'success');
        speak('Automation completed successfully');
        window.sessionStorage.removeItem('pendingAutomation');

        stateRef.current = {
            ...stateRef.current,
            isPaused: false,
            currentStepIndex: 0,
            currentSteps: [],
            currentCommand: '',
            currentTimeout: null,
            waitingForUserClick: false,
            clickHandlers: [],
        };
        setCurrentCommand('');
        setCurrentStepIndex(0);
        setTotalSteps(0);
        setIsPaused(false);
        setIsRunning(false);

        if (transcriptClearTimeoutRef.current) clearTimeout(transcriptClearTimeoutRef.current);
        transcriptClearTimeoutRef.current = setTimeout(() => setTranscript([]), 5000);
    }, [showFeedback, speak]);

    const executeNextStep = useCallback(() => {
        const s = stateRef.current;
        if (s.currentStepIndex >= s.currentSteps.length) {
            finishAutomation();
            return;
        }
        if (s.isPaused || s.isTerminating) return;

        const step = s.currentSteps[s.currentStepIndex];
        const description = getStepDescription(step);
        if (description) {
            addTranscriptEntry(`Step ${s.currentStepIndex + 1}: ${description}`);
            speak(description);
        }
        persistPending();

        executeStep(step, () => {
            stateRef.current.currentStepIndex += 1;
            setCurrentStepIndex(stateRef.current.currentStepIndex);
            stateRef.current.currentTimeout = setTimeout(executeNextStepRef.current, settings.stepDelay);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [addTranscriptEntry, executeStep, finishAutomation, persistPending, settings.stepDelay, speak]);

    // executeNextStep and highlightCurrentStep call themselves/each other
    // recursively via timeouts, so keep latest versions in refs to dodge
    // the classic stale-closure trap.
    const executeNextStepRef = useRef(executeNextStep);
    useEffect(() => {
        executeNextStepRef.current = executeNextStep;
    }, [executeNextStep]);

    const highlightCurrentStep = useCallback(() => {
        const s = stateRef.current;
        if (s.currentStepIndex >= s.currentSteps.length) return;
        const step = s.currentSteps[s.currentStepIndex];

        if (step.action !== 'wait') {
            const description = getStepDescription(step);
            addTranscriptEntry(description);
            speak(description);
        }
        persistPending({ manualNavigation: true });

        if (step.action === 'click' || step.action === 'setValue') {
            const element = document.querySelector(step.selector);
            if (!element) {
                addTranscriptEntry('Error: could not find that step on this screen');
                speak('Error: element not found');
                showFeedback(`Element not found: ${step.selector}`, 'error');
                stateRef.current.currentStepIndex += 1;
                setCurrentStepIndex(stateRef.current.currentStepIndex);
                highlightCurrentStepRef.current();
                return;
            }
            element.classList.add('automation-target');
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            stateRef.current.currentTimeout = setTimeout(() => {
                highlightElement(element, 'default');
            }, config.preHighlightDelay);

            const clickHandler = (e) => {
                if (stateRef.current.waitingForUserClick) return;
                stateRef.current.waitingForUserClick = true;
                e.stopPropagation();
                e.preventDefault();

                const label = getElementLabel(step);
                addTranscriptEntry(`User clicked: ${label}`);
                speak(`Clicked ${label}`);

                element.removeEventListener('click', clickHandler);
                stateRef.current.clickHandlers = stateRef.current.clickHandlers.filter(
                    (h) => h.callback !== clickHandler
                );
                element.click();

                setTimeout(() => {
                    stateRef.current.currentStepIndex += 1;
                    stateRef.current.waitingForUserClick = false;
                    setCurrentStepIndex(stateRef.current.currentStepIndex);

                    if (stateRef.current.currentStepIndex < stateRef.current.currentSteps.length) {
                        if (isAutopilot) executeNextStepRef.current();
                        else highlightCurrentStepRef.current();
                    } else {
                        finishAutomation();
                    }
                }, 300);
            };

            element.addEventListener('click', clickHandler);
            stateRef.current.clickHandlers.push({ element, callback: clickHandler });
        } else if (step.action === 'wait') {
            stateRef.current.currentTimeout = setTimeout(() => {
                stateRef.current.currentStepIndex += 1;
                setCurrentStepIndex(stateRef.current.currentStepIndex);
                if (isAutopilot) executeNextStepRef.current();
                else highlightCurrentStepRef.current();
            }, step.duration);
        } else if (step.action === 'navigate') {
            addTranscriptEntry(`Ready to navigate to ${step.url}`);
            speak('Ready to navigate');
        } else {
            executeStep(step, () => {
                stateRef.current.currentStepIndex += 1;
                setCurrentStepIndex(stateRef.current.currentStepIndex);
                if (isAutopilot) executeNextStepRef.current();
                else highlightCurrentStepRef.current();
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        addTranscriptEntry,
        config.preHighlightDelay,
        executeStep,
        finishAutomation,
        highlightElement,
        isAutopilot,
        persistPending,
        showFeedback,
        speak,
    ]);

    const highlightCurrentStepRef = useRef(highlightCurrentStep);
    useEffect(() => {
        highlightCurrentStepRef.current = highlightCurrentStep;
    }, [highlightCurrentStep]);

    // ---- public actions ------------------------------------------------

    const runSteps = useCallback(
        (steps, commandName) => {
            if (!steps || steps.length === 0) return;
            clearCurrentTimeout();
            clearClickHandlers();

            stateRef.current = {
                ...stateRef.current,
                isPaused: false,
                isTerminating: false,
                currentStepIndex: 0,
                currentSteps: steps,
                currentCommand: commandName,
                currentTimeout: null,
                waitingForUserClick: false,
                clickHandlers: [],
            };
            setCurrentCommand(commandName);
            setCurrentStepIndex(0);
            setTotalSteps(steps.length);
            setIsPaused(false);
            setIsRunning(true);

            showFeedback('Automation in progress...', 'info');
            addTranscriptEntry(`Starting automation: ${commandName}`);
            speak(`Starting: ${commandName}`);

            if (isAutopilot) executeNextStepRef.current();
            else highlightCurrentStepRef.current();
        },
        [addTranscriptEntry, clearClickHandlers, clearCurrentTimeout, isAutopilot, showFeedback, speak]
    );

    const executeCommand = useCallback(
        (commandText) => {
            if (!commandText) return;
            clearHighlights();
            clearClickHandlers();

            const normalized = commandText.toLowerCase().trim();
            let bestMatch = null;
            let bestScore = 0;
            Object.keys(commands).forEach((cmd) => {
                const score = calculateMatchScore(normalized, cmd.toLowerCase());
                if (score > bestScore) {
                    bestMatch = cmd;
                    bestScore = score;
                }
            });

            if (bestMatch) {
                runSteps(commands[bestMatch].steps, bestMatch);
            } else {
                showFeedback(
                    "Command not recognized. Try 'pay saved beneficiary', 'add new beneficiary', etc.",
                    'error'
                );
                speak('Command not recognized');
            }
        },
        [clearClickHandlers, clearHighlights, commands, runSteps, showFeedback, speak]
    );

    const search = useCallback(
        (input) => {
            if (!input) {
                setSuggestions([]);
                return;
            }
            const lower = input.toLowerCase();
            const matches = Object.keys(commands)
                .filter((cmd) => cmd.toLowerCase().includes(lower))
                .map((cmd) => ({ name: cmd, description: commands[cmd].description }));
            setSuggestions(matches);
        },
        [commands]
    );

    const pause = useCallback(() => {
        clearCurrentTimeout();
        stateRef.current.isPaused = true;
        setIsPaused(true);
        addTranscriptEntry('Automation paused');
        speak('Automation paused');
    }, [addTranscriptEntry, clearCurrentTimeout, speak]);

    const resume = useCallback(() => {
        if (!stateRef.current.isPaused || stateRef.current.currentSteps.length === 0) return;
        stateRef.current.isPaused = false;
        setIsPaused(false);
        addTranscriptEntry('Resuming automation...');
        speak('Resuming automation');
        if (isAutopilot) executeNextStepRef.current();
        else highlightCurrentStepRef.current();
    }, [addTranscriptEntry, isAutopilot, speak]);

    const restartFromCurrentStep = useCallback(() => {
        clearHighlights();
        clearClickHandlers();
        persistPending({
            manualNavigation:
                !isAutopilot &&
                stateRef.current.currentSteps[stateRef.current.currentStepIndex]?.action !== 'navigate',
        });
        setTimeout(() => {
            if (stateRef.current.isPaused) return;
            if (isAutopilot) {
                clearCurrentTimeout();
                executeNextStepRef.current();
            } else {
                highlightCurrentStepRef.current();
            }
        }, 100);
    }, [clearClickHandlers, clearCurrentTimeout, clearHighlights, isAutopilot, persistPending]);

    const rewind = useCallback(() => {
        if (stateRef.current.currentStepIndex > 0) {
            clearCurrentTimeout();
            stateRef.current.waitingForUserClick = false;
            stateRef.current.currentStepIndex -= 1;
            setCurrentStepIndex(stateRef.current.currentStepIndex);
            addTranscriptEntry(`Rewound to step ${stateRef.current.currentStepIndex + 1}`);
            speak(`Rewound to step ${stateRef.current.currentStepIndex + 1}`);
            restartFromCurrentStep();
        } else {
            addTranscriptEntry('Already at the first step');
            speak('Already at the first step');
        }
    }, [addTranscriptEntry, clearCurrentTimeout, restartFromCurrentStep, speak]);

    const forward = useCallback(() => {
        if (stateRef.current.currentStepIndex < stateRef.current.currentSteps.length - 1) {
            clearCurrentTimeout();
            stateRef.current.waitingForUserClick = false;
            stateRef.current.currentStepIndex += 1;
            setCurrentStepIndex(stateRef.current.currentStepIndex);
            addTranscriptEntry(`Advanced to step ${stateRef.current.currentStepIndex + 1}`);
            speak(`Advanced to step ${stateRef.current.currentStepIndex + 1}`);
            restartFromCurrentStep();
        } else {
            addTranscriptEntry('Already at the last step');
            speak('Already at the last step');
        }
    }, [addTranscriptEntry, clearCurrentTimeout, restartFromCurrentStep, speak]);

    const toggleAutopilot = useCallback(() => {
        clearCurrentTimeout();
        clearClickHandlers();
        clearHighlights();

        setIsAutopilotState((prev) => {
            const next = !prev;
            storeSetting('autopilot', next);
            addTranscriptEntry(`Autopilot ${next ? 'enabled' : 'disabled'}`);
            speak(`Autopilot ${next ? 'enabled' : 'disabled'}`);
            return next;
        });
    }, [addTranscriptEntry, clearClickHandlers, clearCurrentTimeout, clearHighlights, speak]);

    // React to autopilot flips while a run is in progress (mirrors original
    // behaviour of immediately continuing in the new mode).
    const prevAutopilotRef = useRef(isAutopilot);
    useEffect(() => {
        if (prevAutopilotRef.current === isAutopilot) return;
        prevAutopilotRef.current = isAutopilot;
        if (stateRef.current.currentSteps.length > 0 && !stateRef.current.isPaused) {
            if (isAutopilot) executeNextStepRef.current();
            else highlightCurrentStepRef.current();
        }
    }, [isAutopilot]);

    const terminate = useCallback(() => {
        stateRef.current.isTerminating = true;
        clearCurrentTimeout();
        clearClickHandlers();
        clearHighlights();
        window.sessionStorage.removeItem('pendingAutomation');

        stateRef.current = {
            ...stateRef.current,
            isPaused: false,
            isTerminating: false,
            currentStepIndex: 0,
            currentSteps: [],
            currentCommand: '',
            currentTimeout: null,
            waitingForUserClick: false,
            clickHandlers: [],
        };
        setCurrentCommand('');
        setCurrentStepIndex(0);
        setTotalSteps(0);
        setIsPaused(false);
        setIsRunning(false);

        showFeedback('Automation terminated', 'warning');
        addTranscriptEntry('Automation was terminated by user');
        speak('Automation terminated');

        if (transcriptClearTimeoutRef.current) clearTimeout(transcriptClearTimeoutRef.current);
        transcriptClearTimeoutRef.current = setTimeout(() => setTranscript([]), 5000);
    }, [addTranscriptEntry, clearClickHandlers, clearCurrentTimeout, clearHighlights, showFeedback, speak]);

    // ---- resume automation left pending across a page reload ---------------
    useEffect(() => {
        const pending = window.sessionStorage.getItem('pendingAutomation');
        if (!pending) return;
        try {
            const { command, stepIndex, isAutopilot: pendingAutopilot, isReload } = JSON.parse(pending);
            const commandObj = commands[command];
            if (isReload && commandObj?.preventReloop) {
                window.sessionStorage.removeItem('pendingAutomation');
                return;
            }
            if (commandObj?.steps && stepIndex < commandObj.steps.length) {
                if (pendingAutopilot !== undefined) setIsAutopilotState(pendingAutopilot);
                stateRef.current.currentCommand = command;
                stateRef.current.currentSteps = commandObj.steps;
                stateRef.current.currentStepIndex = stepIndex;
                setCurrentCommand(command);
                setCurrentStepIndex(stepIndex);
                setTotalSteps(commandObj.steps.length);
                setIsRunning(true);

                const t = setTimeout(() => {
                    if (pendingAutopilot) executeNextStepRef.current();
                    else highlightCurrentStepRef.current();
                }, 1000);
                return () => clearTimeout(t);
            }
        } catch (e) {
            console.error('Error parsing pending automation:', e);
            window.sessionStorage.removeItem('pendingAutomation');
        }
        // Runs once on mount, mirroring the original's DOMContentLoaded check.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ---- cleanup on unmount --------------------------------------------
    useEffect(
        () => () => {
            clearCurrentTimeout();
            clearClickHandlers();
            stopTrackingHighlight();
            if (feedbackTimeoutRef.current) clearTimeout(feedbackTimeoutRef.current);
            if (transcriptClearTimeoutRef.current) clearTimeout(transcriptClearTimeoutRef.current);
        },
        [clearClickHandlers, clearCurrentTimeout, stopTrackingHighlight]
    );

    return {
        // state
        commands,
        currentCommand,
        currentStepIndex,
        totalSteps,
        isPaused,
        isRunning,
        isAutopilot,
        transcript,
        feedback,
        highlightBox,
        suggestions,
        settings,

        // actions
        search,
        executeCommand,
        pause,
        resume,
        rewind,
        forward,
        toggleAutopilot,
        terminate,
        updateSettings,
    };
}

export default useAutomation;