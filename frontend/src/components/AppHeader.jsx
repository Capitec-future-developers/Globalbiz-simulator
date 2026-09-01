import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useAutomationContext } from '../Automation/AutomationContext';
import '../Automation/automation.css';

export default function AppHeader() {
    const headerRef = useRef(null);
    const [spacerHeight, setSpacerHeight] = useState(0);
    const searchContainerRef = useRef(null);
    const inputRef = useRef(null);

    const [searchValue, setSearchValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [dropdownRect, setDropdownRect] = useState(null);

    const { search, suggestions, executeCommand, isRunning } = useAutomationContext();

    useEffect(() => {
        if (headerRef.current) {
            setSpacerHeight(headerRef.current.offsetHeight);
        }
    }, []);

    useEffect(() => {
        if (!showSuggestions) return;
        const updateRect = () => {
            if (!inputRef.current) return;
            const rect = inputRef.current.getBoundingClientRect();
            setDropdownRect({
                top: rect.bottom,
                left: rect.left,
                width: Math.max(rect.width, 280),
            });
        };
        updateRect();
        window.addEventListener('scroll', updateRect, true);
        window.addEventListener('resize', updateRect);
        return () => {
            window.removeEventListener('scroll', updateRect, true);
            window.removeEventListener('resize', updateRect);
        };
    }, [showSuggestions, suggestions]);

    const dropdownRef = useRef(null);


    useEffect(() => {
        const handleClickOutside = (e) => {
            const insideSearch = searchContainerRef.current?.contains(e.target);
            const insideDropdown = dropdownRef.current?.contains(e.target);
            if (!insideSearch && !insideDropdown) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const handleChange = (value) => {
        setSearchValue(value);
        search(value);
        setShowSuggestions(true);
    };

    const runCommand = (commandText) => {
        setShowSuggestions(false);
        executeCommand(commandText);
    };

    const pickSuggestion = (name) => {
        setSearchValue(name);
        runCommand(name);
    };

    return (
        <>
            <header className="gb-app-header" ref={headerRef}>
                <a href="/" className="gb-app-header-logo">
                    <img src="/images/Logo.png" alt="Capitec logo" />
                </a>
                <div className="gb-app-header-toggle">
                    <a href="/" className="gb-app-header-toggle-opt active">Sign In</a>
                    <a href="/ROBapp" className="gb-app-header-toggle-opt">ROB</a>
                </div>
                <div
                    ref={searchContainerRef}
                    className="search-container gb-app-header-search"
                >
                    <button
                        id="execute-automation"
                        className="search-button gb-app-header-search-icon"
                        aria-label="Run command"
                        type="button"
                        disabled={isRunning}
                        onClick={() => runCommand(searchValue)}
                    >
                        <span className="material-icons-sharp">search</span>
                    </button>
                    <input
                        type="text"
                        id="automation-search"
                        ref={inputRef}
                        placeholder="What would you like to do? (e.g. 'pay saved beneficiary')"
                        value={searchValue}
                        disabled={isRunning}
                        onChange={(e) => handleChange(e.target.value)}
                        onFocus={() => searchValue && setShowSuggestions(true)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') runCommand(searchValue);
                        }}
                    />
                    {showSuggestions && suggestions.length > 0 && dropdownRect &&
                        createPortal(
                            <div
                                id="suggestions-dropdown"
                                className="suggestions-dropdown suggestions-dropdown-portal"
                                ref={dropdownRef}
                                style={{
                                    position: 'fixed',
                                    top: dropdownRect.top,
                                    left: dropdownRect.left,
                                    width: dropdownRect.width,
                                }}
                            >
                                {suggestions.map((s) => (
                                    <div
                                        key={s.name}
                                        className="suggestion-item"
                                        onClick={() => pickSuggestion(s.name)}
                                    >
                                        <div className="suggestion-title">{s.name}</div>
                                        <div className="suggestion-description">{s.description}</div>
                                    </div>
                                ))}
                            </div>,
                            document.body
                        )}
                </div>
                <button type="button" className="gb-app-header-menu-btn" aria-label="Menu">
                    <span className="material-icons-sharp">menu</span>
                </button>
            </header>
            <div style={{ height: spacerHeight }} />
        </>
    );
}