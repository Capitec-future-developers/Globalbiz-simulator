import { useEffect, useRef, useState } from 'react';

// Faithful React port of scripts/Header.js's injected `.gb-app-header` bar
// (logo + Sign In/ROB toggle + automation search + menu button) that sits
// above the phone mockup on every App/*.html page. The original measures its
// own offsetHeight and pushes body content down by that amount; we do the
// same via a ref measurement instead of a hardcoded padding value.
export default function AppHeader() {
    const headerRef = useRef(null);
    const [spacerHeight, setSpacerHeight] = useState(0);

    useEffect(() => {
        if (headerRef.current) {
            setSpacerHeight(headerRef.current.offsetHeight);
        }
    }, []);

    return (
        <>
            <header className="gb-app-header" ref={headerRef}>
                <a href="/" className="gb-app-header-logo">
                    <img src="/images/Logo.png" alt="Capitec logo" />
                </a>
                <div className="gb-app-header-toggle">
                    <a href="/" className="gb-app-header-toggle-opt active">Sign In</a>
                    <a href="/ROB/ROB.html" className="gb-app-header-toggle-opt">ROB</a>
                </div>
                <div className="search-container gb-app-header-search">
                    <button id="execute-automation" className="search-button gb-app-header-search-icon" aria-label="Run command" type="button">
                        <span className="material-icons-sharp">search</span>
                    </button>
                    <input type="text" id="automation-search" placeholder="What would you like to do? (e.g. 'pay saved beneficiary')" />
                    <div id="suggestions-dropdown" className="suggestions-dropdown"></div>
                </div>
                <button type="button" className="gb-app-header-menu-btn" aria-label="Menu">
                    <span className="material-icons-sharp">menu</span>
                </button>
            </header>
            <div style={{ height: spacerHeight }} />
        </>
    );
}
