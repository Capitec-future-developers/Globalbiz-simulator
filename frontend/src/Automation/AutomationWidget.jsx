import { useEffect, useRef, useState } from 'react';
import { useAutomation } from './useAutomation';
import { hexToRgb, hexToRgba } from './automationUtils';
import './automation.css';

/**
 * Drop-in floating widget: search box + suggestions, play/pause/rewind/
 * forward/autopilot/terminate controls, a settings gear, a live transcript,
 * a toast, and the highlight overlay box. Renders nothing but its own
 * fixed-position UI, so mount it once near the root of your app.
 *
 * All the props are the same ones useAutomation accepts - see that file.
 */
export default function AutomationWidget(props) {
    const {
        currentCommand,
        isPaused,
        isRunning,
        isAutopilot,
        transcript,
        feedback,
        highlightBox,
        suggestions,
        settings,
        search,
        executeCommand,
        pause,
        resume,
        rewind,
        forward,
        toggleAutopilot,
        terminate,
        updateSettings,
    } = useAutomation(props);

    const [searchValue, setSearchValue] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const containerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, []);

    const runSearch = (value) => {
        setSearchValue(value);
        search(value);
        setShowSuggestions(true);
    };

    const pick = (name) => {
        setSearchValue(name);
        setShowSuggestions(false);
        executeCommand(name);
    };

    const submit = () => {
        setShowSuggestions(false);
        executeCommand(searchValue);
    };

    return (
        <div ref={containerRef}>
            {/* highlight overlay */}
            {highlightBox && (
                <div
                    className="automation-highlighter"
                    style={{
                        top: highlightBox.top,
                        left: highlightBox.left,
                        width: highlightBox.width,
                        height: highlightBox.height,
                        borderRadius: highlightBox.radius,
                        boxShadow: `0 0 0 4px ${highlightBox.color}`,
                    }}
                />
            )}

            {/* search box */}
            <div className="automation-search-container search-container">
                <input
                    id="automation-search"
                    className="automation-search-input"
                    placeholder="Try 'pay saved beneficiary'..."
                    value={searchValue}
                    disabled={isRunning}
                    onChange={(e) => runSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && submit()}
                />
                <button id="execute-automation" onClick={submit} disabled={isRunning}>
                    Go
                </button>
                {showSuggestions && suggestions.length > 0 && (
                    <div id="suggestions-dropdown" className="suggestions-dropdown">
                        {suggestions.map((s) => (
                            <div key={s.name} className="suggestion-item" onClick={() => pick(s.name)}>
                                <div className="suggestion-title">{s.name}</div>
                                <div className="suggestion-description">{s.description}</div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* controls */}
            <div
                id="automation-controls"
                className="automation-controls"
                style={{
                    right: settings.controlsPosition === 'right' ? 15 : 'auto',
                    left: settings.controlsPosition === 'left' ? 15 : 'auto',
                }}
            >
                <button title="Rewind" onClick={rewind}>⏮</button>
                {isPaused || !isRunning ? (
                    <button title="Play" onClick={resume}>▶️</button>
                ) : (
                    <button title="Pause" onClick={pause}>⏸</button>
                )}
                <button title="Fast Forward" onClick={forward}>⏭</button>
                <button
                    title={isAutopilot ? 'Autopilot: ON' : 'Autopilot: OFF'}
                    onClick={toggleAutopilot}
                    style={{ backgroundColor: isAutopilot ? '#007fff' : '#f0f0f0' }}
                >
                    🛬
                </button>
                {isRunning && (
                    <button title="Terminate Automation" onClick={terminate} className="automation-terminate">
                        ❌
                    </button>
                )}
            </div>

            {/* settings */}
            <button
                id="automation-settings-btn"
                className="automation-settings-btn"
                title="Automation Settings"
                onClick={() => setShowSettings((v) => !v)}
            >
                ⚙️
            </button>
            {showSettings && (
                <div id="automation-settings-panel" className="automation-settings-panel">
                    <div className="setting-group">
                        <h3>Automation Speed</h3>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <input
                                type="range"
                                min={100}
                                max={2000}
                                step={100}
                                value={settings.stepDelay}
                                onChange={(e) => updateSettings({ stepDelay: parseInt(e.target.value, 10) })}
                            />
                            <span>{settings.stepDelay}ms</span>
                        </div>
                    </div>

                    <div className="setting-group">
                        <h3>Controls Position</h3>
                        <select
                            value={settings.controlsPosition}
                            onChange={(e) => updateSettings({ controlsPosition: e.target.value })}
                        >
                            <option value="left">Left</option>
                            <option value="right">Right</option>
                        </select>
                    </div>

                    <div className="setting-group">
                        <h3>Highlight Colors</h3>
                        <div className="automation-color-grid">
                            {['default', 'success', 'warning', 'error'].map((key) => (
                                <div key={key}>
                                    <label>{key[0].toUpperCase() + key.slice(1)}</label>
                                    <input
                                        type="color"
                                        value={hexToRgb(settings.highlightColors[key])}
                                        onChange={(e) =>
                                            updateSettings({
                                                highlightColors: {
                                                    ...settings.highlightColors,
                                                    [key]: hexToRgba(e.target.value),
                                                },
                                            })
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="setting-group automation-toggle-row">
                        <div>
                            <h3>Read Aloud</h3>
                            <p>Read automation steps aloud</p>
                        </div>
                        <label className="automation-switch">
                            <input
                                type="checkbox"
                                checked={settings.speechEnabled}
                                onChange={(e) => updateSettings({ speechEnabled: e.target.checked })}
                            />
                            <span className="automation-slider" />
                        </label>
                    </div>
                </div>
            )}

            {/* transcript */}
            {transcript.length > 0 && (
                <div id="automation-transcript" className="automation-transcript">
                    {transcript.map((entry, i) => (
                        <div key={i} className="automation-transcript-entry">
                            [{entry.time}] {entry.message}
                        </div>
                    ))}
                </div>
            )}

            {/* feedback toast */}
            {feedback && (
                <div className={`automation-feedback automation-feedback-${feedback.type}`}>
                    {feedback.message}
                </div>
            )}

            {isRunning && (
                <div className="automation-current-command-badge">Running: {currentCommand}</div>
            )}
        </div>
    );
}