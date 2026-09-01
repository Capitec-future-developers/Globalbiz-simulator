import { createContext, useContext } from 'react';
import { useAutomation } from './useAutomation';

const AutomationContext = createContext(null);

/**
 * Wrap your app (inside the Router) in this once. Every descendant -
 * AppHeader's search bar, the floating controls/transcript/highlight
 * overlay, anything else - shares the SAME automation run via
 * useAutomationContext(). Don't call useAutomation() directly in more than
 * one place, or you'll end up with two independent engines.
 *
 * Props are passed straight through to useAutomation (context, commands,
 * config, onNavigate, remoteCommandsUrl).
 */
export function AutomationProvider({ children, ...automationOptions }) {
    const automation = useAutomation(automationOptions);
    return (
        <AutomationContext.Provider value={automation}>{children}</AutomationContext.Provider>
    );
}

export function useAutomationContext() {
    const ctx = useContext(AutomationContext);
    if (!ctx) {
        throw new Error('useAutomationContext must be used inside <AutomationProvider>');
    }
    return ctx;
}