import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useScopedStylesheets from '../../hooks/useScopedStylesheets';

const STYLESHEETS = ['/legacy-styles/Windows11.css'];

const WALLPAPERS = ['/images/windowsBackground.png', '/images/windowsBackgroundLight.png'];

function useClock() {
    const [now, setNow] = useState(() => new Date());
    useEffect(() => {
        const id = setInterval(() => setNow(new Date()), 1000);
        return () => clearInterval(id);
    }, []);
    return now;
}

// Faithful React port of Computer/Windows11.html — a standalone mock
// Windows 11 desktop (the "Sign Out" destination for the Online Banking
// platform) with no bank header/sidebar at all, ported from
// scripts/Windows11.js's clock/start-menu/Edge-browser-window/shutdown
// behaviour into React state. Deliberately does NOT render <ComputerShell>
// (per the task's explicit exception for this one page), but still needs
// its own top-level `computer-shell` class so Windows11.css's
// `@scope (.computer-shell) { ... }` rules actually apply.
export default function ComputerWindows11() {
    useScopedStylesheets(STYLESHEETS);
    const navigate = useNavigate();
    const now = useClock();

    const [startOpen, setStartOpen] = useState(false);
    const [browserOpen, setBrowserOpen] = useState(false);
    const [browserLoading, setBrowserLoading] = useState(true);
    const [shuttingDown, setShuttingDown] = useState(false);
    const [shutdownProgress, setShutdownProgress] = useState(0);
    const [wallpaperIndex, setWallpaperIndex] = useState(0);

    const startRef = useRef(null);
    const startBtnRef = useRef(null);

    useEffect(() => {
        const id = setInterval(() => {
            setWallpaperIndex((prev) => (prev + 1) % WALLPAPERS.length);
        }, 30000);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        function handleOutsideClick(e) {
            if (
                startRef.current && !startRef.current.contains(e.target) &&
                startBtnRef.current && !startBtnRef.current.contains(e.target)
            ) {
                setStartOpen(false);
            }
        }
        document.addEventListener('click', handleOutsideClick);
        return () => document.removeEventListener('click', handleOutsideClick);
    }, []);

    function openEdge() {
        setBrowserOpen(true);
        setBrowserLoading(true);
        setStartOpen(false);
    }

    function closeBrowser() {
        setBrowserOpen(false);
    }

    function handleShutdown() {
        setStartOpen(false);
        setShuttingDown(true);
        setShutdownProgress(0);
        let progress = 0;
        const id = setInterval(() => {
            progress += 2;
            setShutdownProgress(progress);
            if (progress >= 100) {
                clearInterval(id);
                setTimeout(() => {
                    navigate('/');
                }, 500);
            }
        }, 50);
    }

    const timeText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateText = now.toLocaleDateString();

    return (
        <div className="computer-shell">
            <div className="desktop">
                <div className="wallpaper" style={{ backgroundImage: `url('${WALLPAPERS[wallpaperIndex]}')` }}></div>
                <div className="wallpaper-overlay"></div>

                <div className="desktop-icons">
                    <a className="desktop-icon" id="capitecIcon" href="#" onClick={(e) => { e.preventDefault(); navigate('/online-banking'); }}>
                        <div className="icon">
                            <img src="/images/bankIcon.png" alt="Capitec" />
                        </div>
                        <div className="label">Capitec</div>
                    </a>
                    <div className="desktop-icon" id="edgeIcon" onClick={openEdge}>
                        <div className="icon">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Microsoft_Edge_logo_%282019%29.svg/1200px-Microsoft_Edge_logo_%282019%29.svg.png" alt="Edge" />
                        </div>
                        <div className="label">Microsoft Edge</div>
                    </div>
                    <div className="desktop-icon">
                        <div className="icon">
                            <img src="/images/outlook.png" alt="Mail" />
                        </div>
                        <div className="label">Outlook</div>
                    </div>
                    <div className="desktop-icon">
                        <div className="icon">
                            <img src="/images/files.png" alt="" />
                        </div>
                        <div className="label">File Explorer</div>
                    </div>
                </div>

                <div className="taskbar">
                    <div className="start-button" id="startBtn" ref={startBtnRef} onClick={(e) => { e.stopPropagation(); setStartOpen((v) => !v); }}>
                        <div className="windows-logo"></div>
                    </div>
                    <div className="taskbar-apps">
                        <div className="taskbar-app" id="taskbarEdge" onClick={openEdge}>
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Microsoft_Edge_logo_%282019%29.svg/1200px-Microsoft_Edge_logo_%282019%29.svg.png" alt="Edge" />
                        </div>
                        <div className="taskbar-app">
                            <img src="/images/outlook.png" alt="Mail" />
                        </div>
                        <div className="taskbar-app">
                            <img src="/images/files.png" alt="File Explorer" />
                        </div>
                    </div>
                    <div className="taskbar-widgets">
                        <div className="widget-icon">🔍</div>
                        <div className="widget-icon">◐</div>
                        <div className="widget-icon">💬</div>
                        <div className="time-widget" id="timeWidget">
                            <div className="time" id="time">{timeText}</div>
                            <div className="date" id="date">{dateText}</div>
                        </div>
                    </div>
                </div>

                <div className={'start-menu' + (startOpen ? ' open' : '')} id="startMenu" ref={startRef}>
                    <div className="start-header">
                        <input className="start-search" placeholder="Type here to search" />
                    </div>
                    <div className="start-content">
                        <div className="pinned-apps">
                            <div className="pinned-app" id="startEdge" onClick={openEdge}>
                                <div className="icon">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Microsoft_Edge_logo_%282019%29.svg/1200px-Microsoft_Edge_logo_%282019%29.svg.png" alt="Edge" />
                                </div>
                                <div className="label">Microsoft Edge</div>
                            </div>
                            <div className="pinned-app">
                                <div className="icon">
                                    <img src="/images/outlook.png" alt="Mail" />
                                </div>
                                <div className="label">Outlook</div>
                            </div>
                            <div className="pinned-app">
                                <div className="icon">
                                    <img src="/images/files.png" alt="File Explorer" />
                                </div>
                                <div className="label">File Explorer</div>
                            </div>
                            <div className="pinned-app">
                                <div className="icon">
                                    <img src="/images/microsoftStore.png" alt="Microsoft Store" />
                                </div>
                                <div className="label">Microsoft Store</div>
                            </div>
                            <div className="pinned-app">
                                <div className="icon">
                                    <img src="/images/word.png" alt="Office" />
                                </div>
                                <div className="label">Office</div>
                            </div>
                            <div className="pinned-app">
                                <div className="icon">
                                    <img src="/images/microsoftSetting.png" alt="Settings" />
                                </div>
                                <div className="label">Settings</div>
                            </div>
                        </div>
                        <div className="recommended">
                            <div className="recommended-title">Recommended</div>
                            <div className="recommended-item">
                                <div className="icon">
                                    <img src="/images/bankIcon.png" alt="Capitec" />
                                </div>
                                <div className="label">Capitec Banking</div>
                            </div>
                            <div className="recommended-item">
                                <div className="icon">
                                    <img src="/images/chrome.png" alt="Chrome" />
                                </div>
                                <div className="label">Google Chrome</div>
                            </div>
                            <div className="recommended-item">
                                <div className="icon">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Windows_10_Logo.svg/1024px-Windows_10_Logo.svg.png" alt="Photos" />
                                </div>
                                <div className="label">Photos</div>
                            </div>
                        </div>
                    </div>
                    <div className="start-footer">
                        <div className="user-profile">
                            <div className="user-avatar">ZD</div>
                            <div className="user-name">Zenzi Dube</div>
                        </div>
                        <div className="power-options">
                            <button className="power-button" type="button">🔒</button>
                            <button className="power-button" type="button">⭮</button>
                            <button className="power-button shutdown" id="shutdownBtn" type="button" onClick={handleShutdown}>⏻</button>
                        </div>
                    </div>
                </div>

                <div className={'browser-window' + (browserOpen ? ' open' : '')} id="browserWindow">
                    <div className="browser-titlebar">
                        <div className="browser-title">Microsoft Edge</div>
                        <div className="browser-controls">
                            <div className="browser-control minimize"></div>
                            <div className="browser-control maximize"></div>
                            <div className="browser-control close" id="browserClose" onClick={closeBrowser}></div>
                        </div>
                    </div>
                    <div className="browser-toolbar">
                        <div className="browser-nav">
                            <button className="browser-nav-button" type="button">←</button>
                            <button className="browser-nav-button" type="button">→</button>
                            <button className="browser-nav-button" type="button">↻</button>
                        </div>
                        <div className="browser-address-bar">https://www.capitecbank.co.za</div>
                    </div>
                    <div className="browser-content">
                        {browserLoading && (
                            <div className="browser-loading" id="browserLoading">
                                <div className="browser-spinner"></div>
                                <div>Loading Capitec Bank...</div>
                            </div>
                        )}
                        {browserOpen && (
                            <iframe
                                className="browser-iframe"
                                id="browserIframe"
                                src="https://www.capitecbank.co.za"
                                title="Capitec Bank"
                                style={{ display: browserLoading ? 'none' : 'block' }}
                                onLoad={() => setBrowserLoading(false)}
                            />
                        )}
                    </div>
                </div>

                <div className={'shutdown-overlay' + (shuttingDown ? ' active' : '')} id="shutdownOverlay">
                    <div className="shutdown-circle"></div>
                    <div className="shutdown-text">Shutting down</div>
                    <div className="shutdown-subtext">Please wait while we prepare your device</div>
                    <div className="dots">
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                    <div className="shutdown-progress">
                        <div className="shutdown-progress-bar" id="shutdownProgress" style={{ width: `${shutdownProgress}%` }}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}
