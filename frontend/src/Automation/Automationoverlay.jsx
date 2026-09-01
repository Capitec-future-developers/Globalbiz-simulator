import { useState } from 'react';
import { useAutomationContext } from './AutomationContext';
import { hexToRgb, hexToRgba } from './automationUtils';
import './automation.css';

/**
 * Floating overlay: play/pause/rewind/forward/autopilot/terminate controls,
 * a settings gear, a live transcript, a toast, and the highlight overlay
 * box. Mount this ONCE, inside <AutomationProvider>, anywhere in the tree -
 * it no longer renders a search box, since AppHeader's own search bar is
 * wired directly to the same shared automation instance via
 * useAutomationContext().
 */
export default function AutomationOverlay() {
    const {
        currentCommand,
        isPaused,
        isRunning,
        isAutopilot,
        transcript,
        feedback,
        highlightBox,
        settings,
        pause,
        resume,
        rewind,
        forward,
        toggleAutopilot,
        terminate,
        updateSettings,
    } = useAutomationContext();

    const [showSettings, setShowSettings] = useState(false);

    return (
        <>
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
        </>
    );
}