// Pure helper functions extracted from the original scripts. No DOM/React
// dependencies here beyond reading live elements for labels, so they're easy
// to unit test on their own.

/** Fuzzy match score between typed input and a command name (0-100). */
export function calculateMatchScore(input, command) {
    if (input === command) return 100;
    if (input.includes(command)) return 90;
    if (command.includes(input)) return 80;

    const inputWords = input.split(/\s+/);
    const commandWords = command.split(/\s+/);
    const matchingWords = inputWords.filter((word) =>
        commandWords.some((cmdWord) => cmdWord.includes(word))
    );
    return (matchingWords.length / inputWords.length) * 100;
}

/** Turns a step into a human-readable label for callouts/transcript. */
export function getElementLabel(step) {
    if (step.label) return step.label;

    const element = step.selector ? document.querySelector(step.selector) : null;
    if (element) {
        const raw =
            element.getAttribute('data-automation-label') ||
            element.getAttribute('aria-label') ||
            element.getAttribute('title') ||
            element.textContent;
        if (raw) {
            const clean = raw.replace(/\s+/g, ' ').trim();
            if (clean) return clean.length > 40 ? `${clean.slice(0, 40)}…` : clean;
        }
    }

    // Last resort: prettify the selector itself.
    return (
        (step.selector || '')
            .replace(/^[#.]/, '')
            .replace(/\[.*?\]/g, '')
            .replace(/[-_]/g, ' ')
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .trim() || 'this step'
    );
}

export function getStepDescription(step) {
    switch (step.action) {
        case 'click':
            return `Clicking ${getElementLabel(step)}`;
        case 'setValue':
            return `Filling in ${getElementLabel(step)}`;
        case 'wait':
            return null; // wait steps are never surfaced to transcript/speech
        case 'navigate':
            return `Navigating to ${step.url}`;
        default:
            return `Performing ${step.action}`;
    }
}

export function hexToRgb(rgba) {
    const parts = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (!parts) return '#000000';
    const r = parseInt(parts[1], 10).toString(16).padStart(2, '0');
    const g = parseInt(parts[2], 10).toString(16).padStart(2, '0');
    const b = parseInt(parts[3], 10).toString(16).padStart(2, '0');
    return `#${r}${g}${b}`;
}

export function hexToRgba(hex, alpha = 0.7) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function speak(text, enabled) {
    if (!text || !enabled || typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
}