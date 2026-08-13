import { useEffect, useRef, useState } from "react";

const wallpapers = [
    "/images/IphoneBackground.jpg",
    "/images/iphoneBackgroundBlue.png",
];

function IOSHome() {
    const [wallpaperIndex, setWallpaperIndex] = useState(0);

    const [safariOpen, setSafariOpen] = useState(false);
    const [powerDownOpen, setPowerDownOpen] = useState(false);
    const [shuttingDown, setShuttingDown] = useState(false);

    const sliderContainerRef = useRef(null);
    const sliderHandleRef = useRef(null);

    const draggingRef = useRef(false);
    const startXRef = useRef(0);
    const maxSlideRef = useRef(0);

    // ----------------------------------------
    // Wallpaper
    // ----------------------------------------

    useEffect(() => {
        wallpapers.forEach((url) => {
            const img = new Image();
            img.src = url;
        });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setWallpaperIndex((current) => (current + 1) % wallpapers.length);
        }, 300000); // 5 minutes

        return () => clearInterval(interval);
    }, []);

    // ----------------------------------------
    // Capitec
    // ----------------------------------------

    const openCapitec = (e) => {
        e.preventDefault();
        window.location.href = "/Sign-In";
    };

    // ----------------------------------------
    // Safari
    // ----------------------------------------

    const openSafari = (e) => {
        e.preventDefault();
        setSafariOpen(true);
        window.open("https://www.capitecbank.co.za", "_blank");
    };

    const closeSafari = (e) => {
        e.preventDefault();
        setSafariOpen(false);
    };

    // ----------------------------------------
    // Power menu
    // ----------------------------------------

    const openShutdown = (e) => {
        e.preventDefault();
        setPowerDownOpen(true);
    };

    const cancelShutdown = () => {
        setPowerDownOpen(false);
        resetSlider();
    };

    // ----------------------------------------
    // Slider
    // ----------------------------------------

    const startDrag = (e) => {
        e.preventDefault();

        const clientX = e.type === "touchstart" ? e.touches[0].clientX : e.clientX;

        draggingRef.current = true;
        startXRef.current = clientX;

        if (sliderContainerRef.current && sliderHandleRef.current) {
            maxSlideRef.current =
                sliderContainerRef.current.offsetWidth -
                sliderHandleRef.current.offsetWidth -
                10;

            sliderHandleRef.current.style.transition = "none";
        }
    };

    const doDrag = (e) => {
        if (!draggingRef.current) return;

        const clientX = e.type === "touchmove" ? e.touches[0].clientX : e.clientX;

        let deltaX = clientX - startXRef.current;

        if (deltaX < 0) deltaX = 0;
        if (deltaX > maxSlideRef.current) deltaX = maxSlideRef.current;

        if (sliderHandleRef.current) {
            sliderHandleRef.current.style.left = `${deltaX + 5}px`;
        }

        if (deltaX >= maxSlideRef.current) {
            draggingRef.current = false;
            triggerFinalShutdown();
        }
    };

    const endDrag = () => {
        if (!draggingRef.current) return;

        draggingRef.current = false;
        resetSlider();
    };

    const resetSlider = () => {
        if (sliderHandleRef.current) {
            sliderHandleRef.current.style.transition = "left 0.3s ease";
            sliderHandleRef.current.style.left = "5px";
        }
    };

    // ----------------------------------------
    // Final shutdown
    // ----------------------------------------

    const triggerFinalShutdown = () => {
        setPowerDownOpen(false);
        setShuttingDown(true);

        setTimeout(() => {
            setTimeout(() => {
                window.location.href = "/Computer/home%20page.html";
            }, 1500);
        }, 2000);
    };

    // ----------------------------------------
    // Global mouse/touch events
    // ----------------------------------------

    useEffect(() => {
        window.addEventListener("mousemove", doDrag);
        window.addEventListener("touchmove", doDrag, { passive: false });
        window.addEventListener("mouseup", endDrag);
        window.addEventListener("touchend", endDrag);

        return () => {
            window.removeEventListener("mousemove", doDrag);
            window.removeEventListener("touchmove", doDrag);
            window.removeEventListener("mouseup", endDrag);
            window.removeEventListener("touchend", endDrag);
        };
    });

    // ----------------------------------------
    // Render — no outer .iphone/.screen/.notch/.home-indicator here.
    // PhoneShell already supplies that chrome; this just fills .screen-content.
    // ----------------------------------------

    return (
        <div className="ios-home-content">

            {/* Wallpaper */}
            <div
                className="wallpaper"
                style={{
                    backgroundImage: `url("${wallpapers[wallpaperIndex]}")`,
                }}
            />

            {/* Status */}
            <div className="status">
                <div className="left">
                    <span>9:41</span>
                </div>
                <div className="right">
                    <span>78%</span>
                </div>
            </div>

            {/* App Grid */}
            <div className="app-grid" id="grid">
                <App image="/images/appStore.jpg" alt="App Store" label="App Store" />
                <App image="/images/photo.png" alt="Photos" label="Photos" />
                <App image="/images/mail.png" alt="Mail" label="Mail" />
                <App image="/images/calendar.png" alt="Calendar" label="Calendar" />
                <App image="/images/phone.png" alt="Phone" label="Phone" />
                <App image="/images/messages.png" alt="Messages" label="Messages" />
                <App id="safariApp" image="/images/safari.png" alt="Safari" label="Safari" onClick={openSafari} />
                <App id="capitecApp" image="/images/bankIcon.png" alt="Capitec" label="Capitec" onClick={openCapitec} />
                <App image="/images/map.png" alt="Maps" label="Maps" />
                <App image="/images/weather.png" alt="Weather" label="Weather" />
                <App image="/images/clock.png" alt="Clock" label="Clock" />
                <App id="shutdownApp" image="/images/shutdown.png" alt="Shutdown" label="Power" onClick={openShutdown} />
            </div>

            {/* Dock */}
            <div className="dock">
                <DockApp image="/images/phone.png" alt="Phone" />
                <DockApp image="/images/messages.png" alt="Messages" />
                <DockApp image="/images/safari.png" alt="Safari" />
                <DockApp image="/images/appleMusic.png" alt="Music" />
            </div>

            {/* Open animation overlay */}
            <div className="open-overlay" id="openOverlay" />

            {/* Safari Overlay */}
            <div className={`safari-overlay ${safariOpen ? "active" : ""}`} id="safariOverlay">
                <div className="safari-header">
                    <button className="safari-back-btn" onClick={closeSafari}>
                        ← Back
                    </button>
                    <div className="safari-address-bar">https://www.capitecbank.co.za</div>
                    <div style={{ width: "60px" }} />
                </div>
                <div className="safari-content">
                    <iframe className="safari-iframe" title="Capitec Bank" src="https://www.capitecbank.co.za" />
                </div>
            </div>

            {/* Power Down Overlay */}
            <div className={`power-down-overlay ${powerDownOpen ? "active" : ""}`} id="powerDownOverlay">
                <div className="slider-container" ref={sliderContainerRef}>
                    <div
                        className="slider-handle"
                        ref={sliderHandleRef}
                        onMouseDown={startDrag}
                        onTouchStart={startDrag}
                    >
                        <img src="/images/shutdown.png" alt="Power" style={{ filter: "invert(1)" }} />
                    </div>
                    <div className="slider-text">slide to power off</div>
                </div>
                <div className="cancel-btn" onClick={cancelShutdown}>
                    Cancel
                </div>
            </div>

            {/* Shutdown Screen */}
            <div
                className="shutdown-black-screen"
                id="shutdownBlackScreen"
                style={{ display: shuttingDown ? "flex" : undefined }}
            >
                <div className="shutdown-spinner" />
            </div>

        </div>
    );
}

function App({ id, image, alt, label, onClick }) {
    return (
        <div className="app" id={id} onClick={onClick} onTouchEnd={onClick}>
            <div className="icon">
                <img src={image} alt={alt} />
            </div>
            <div className="label">{label}</div>
        </div>
    );
}

function DockApp({ image, alt }) {
    return (
        <div className="app">
            <div className="icon">
                <img src={image} alt={alt} />
            </div>
        </div>
    );
}

export default IOSHome;