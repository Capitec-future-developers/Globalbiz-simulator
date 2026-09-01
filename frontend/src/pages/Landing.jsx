import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Landing() {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [loadingTarget, setLoadingTarget] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);

    /*
     * Navigate with the original 1.4 second loading animation
     */
    const navigateWithLoading = (path) => {
        if (!path) return;

        setMenuOpen(false);
        setLoadingTarget(path);
        setLoading(true);
    };


    /*
     * After loading animation finishes
     */
    useEffect(() => {
        if (!loading || !loadingTarget) {
            return;
        }

        const timer = setTimeout(() => {
            setLoading(false);
            navigate(loadingTarget);
        }, 1400);

        return () => clearTimeout(timer);
    }, [loading, loadingTarget, navigate]);


    /*
     * ESC closes menu
     */
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setMenuOpen(false);
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


    /*
     * Prevent background scrolling while menu is open
     */
    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }

        return () => {
            document.body.style.overflow = '';
        };
    }, [menuOpen]);


    return (
        <div className="gb-landing-page">

            {/* =========================================
                HEADER
            ========================================= */}

            <header className="gb-landing-header" style={{width: '200%'}}>

                <button
                    type="button"
                    className="gb-landing-logo"
                    onClick={() => navigate('/')}
                    aria-label="GlobalBiz Simulator home"
                >
                    <img
                        src="/images/Logo.png"
                        alt="Capitec logo"
                    />
                </button>


                <div className="gb-landing-toggle">

                    <button
                        type="button"
                        className="gb-landing-toggle-opt active"
                        onClick={() =>
                            navigateWithLoading('/Sign-In')
                        }
                    >
                        App
                    </button>


                    <button
                        type="button"
                        className="gb-landing-toggle-opt"
                        onClick={() =>
                            navigateWithLoading('/online-banking')
                        }
                    >
                        Online Banking
                    </button>

                </div>


                <button
                    type="button"
                    className="gb-landing-menu-btn"
                    aria-label="Menu"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen(true)}
                >
                    <span className="material-icons-sharp">
                        menu
                    </span>
                </button>

            </header>


            {/* =========================================
                MAIN
            ========================================= */}

            <main>

                {/* HERO */}

                <section className="gb-hero">

                    <div className="gb-hero-copy">

                        <h1>
                            Simulated banking,
                            <br />
                            made real.
                        </h1>


                        <p>
                            GlobalBiz Simulator is a training sandbox for
                            Capitec agents &mdash; a fully working mock of
                            our business app and online banking, plus an
                            experimental ROB workspace, all with no real
                            accounts or data. Practise walkthroughs, test
                            new flows, and get comfortable before you're
                            in front of a client.
                        </p>


                        <div className="gb-hero-actions">

                            <button
                                type="button"
                                className="gb-hero-btn gb-hero-btn-outline"
                                onClick={() =>
                                    navigateWithLoading('/Sign-In')
                                }
                            >
                                Open the App
                            </button>


                            <button
                                type="button"
                                className="gb-hero-btn gb-hero-btn-outline"
                                onClick={() =>
                                    navigateWithLoading('/online-banking')
                                }
                            >
                                Open Online Banking
                            </button>


                            <button
                                type="button"
                                className="gb-hero-btn gb-hero-btn-solid"
                                onClick={() =>
                                    navigateWithLoading('/rob')
                                }
                            >
                                Open ROB
                            </button>

                        </div>

                    </div>


                    <div className="gb-hero-art">

                        <div className="gb-hero-blob"></div>

                        <img
                            src="/images/hero-image.png"
                            alt=""
                            className="gb-hero-image"
                        />

                    </div>

                </section>


                {/* =========================================
                    PREVIEWS
                ========================================= */}

                <section className="gb-previews">

                    <h2>
                        Three ways to explore
                    </h2>


                    <div className="gb-preview-grid">

                        {/* APP */}

                        <button
                            type="button"
                            className="gb-preview-card"
                            onClick={() =>
                                navigateWithLoading('/Sign-In')
                            }
                        >

                            <div className="gb-preview-mock">

                                <div className="gb-mock-phone">

                                    <span className="gb-mock-notch"></span>

                                    <div className="gb-mock-screen">

                                        <span className="gb-mock-bar"></span>

                                        <span className="gb-mock-row"></span>

                                        <span className="gb-mock-row"></span>

                                        <span className="gb-mock-row"></span>

                                    </div>

                                </div>

                            </div>


                            <h3>
                                App
                            </h3>


                            <p>
                                The mobile business banking experience
                                &mdash; sign in, pay beneficiaries, manage
                                cards and more.
                            </p>

                        </button>


                        {/* ONLINE BANKING */}

                        <button
                            type="button"
                            className="gb-preview-card"
                            onClick={() =>
                                navigateWithLoading('/online-banking')
                            }
                        >

                            <div className="gb-preview-mock">

                                <div className="gb-mock-computer">

                                    <span className="gb-mock-titlebar"></span>

                                    <div className="gb-mock-screen">

                                        <span className="gb-mock-sidebar"></span>

                                        <div className="gb-mock-content">

                                            <span className="gb-mock-row accent"></span>

                                            <span className="gb-mock-row"></span>

                                            <span className="gb-mock-row"></span>

                                            <span className="gb-mock-row"></span>

                                        </div>

                                    </div>

                                </div>

                            </div>


                            <h3>
                                Online Banking
                            </h3>


                            <p>
                                The desktop internet banking experience,
                                styled after our Windows workspace.
                            </p>

                        </button>


                        {/* ROB */}

                        <button
                            type="button"
                            className="gb-preview-card"
                            onClick={() =>
                                navigateWithLoading('/rob')
                            }
                        >

                            <div className="gb-preview-mock">

                                <div className="gb-mock-rob">

                                    <span className="gb-mock-notch"></span>

                                    <div className="gb-mock-screen">

                                        <span className="material-icons-sharp">
                                            science
                                        </span>

                                    </div>

                                </div>

                            </div>


                            <h3>
                                ROB
                            </h3>


                            <p>
                                An experimental workspace for trying out
                                new ideas outside the main app.
                            </p>

                        </button>

                    </div>

                </section>

            </main>


            {/* =========================================
                LOADING OVERLAY
            ========================================= */}

            {loading && (

                <div
                    className="gb-loading-overlay active"
                    role="status"
                    aria-live="polite"
                >

                    <div className="gb-loading-text">
                        Initializing simulator
                    </div>


                    <div className="gb-loading-dots">

                        <div className="gb-loading-block gb-loading-blue"></div>

                        <div className="gb-loading-block gb-loading-lightblue"></div>

                        <div className="gb-loading-block gb-loading-red"></div>

                    </div>


                    <div className="gb-progress-bar">

                        <div className="gb-progress-fill"></div>

                    </div>

                </div>

            )}


            {/* =========================================
                MENU
            ========================================= */}

            {menuOpen && (

                <>

                    <div
                        className="gb-menu-overlay open"
                        onClick={() => setMenuOpen(false)}
                    />


                    <nav
                        className="gb-menu-panel open"
                        aria-label="GlobalBiz menu"
                    >

                        <button
                            type="button"
                            className="gb-menu-close"
                            aria-label="Close menu"
                            onClick={() => setMenuOpen(false)}
                        >
                            <span className="material-icons-sharp">
                                close
                            </span>
                        </button>


                        <div className="gb-menu-body">

                            <div className="gb-menu-nav">

                                <button
                                    type="button"
                                    className="gb-menu-nav-item"
                                    onClick={() =>
                                        navigateWithLoading('/Sign-In')
                                    }
                                >

                                    <span className="material-icons-sharp">
                                        phone_iphone
                                    </span>

                                    <span>
                                        App
                                    </span>

                                    <span className="material-icons-sharp gb-menu-caret">
                                        chevron_right
                                    </span>

                                </button>


                                <button
                                    type="button"
                                    className="gb-menu-nav-item"
                                    onClick={() =>
                                        navigateWithLoading('/online-banking')
                                    }
                                >

                                    <span className="material-icons-sharp">
                                        computer
                                    </span>

                                    <span>
                                        Online Banking
                                    </span>

                                    <span className="material-icons-sharp gb-menu-caret">
                                        chevron_right
                                    </span>

                                </button>


                                <button
                                    type="button"
                                    className="gb-menu-nav-item"
                                    onClick={() =>
                                        navigateWithLoading('/rob')
                                    }
                                >

                                    <span className="material-icons-sharp">
                                        science
                                    </span>

                                    <span>
                                        ROB
                                    </span>

                                    <span className="material-icons-sharp gb-menu-caret">
                                        chevron_right
                                    </span>

                                </button>


                                <div className="gb-menu-nav-links">

                                    <a href="#">
                                        Help centre
                                    </a>

                                    <a href="#">
                                        Contact us
                                    </a>

                                </div>

                            </div>


                            <div className="gb-menu-cards">

                                <div className="gb-menu-card">

                                    <h4>
                                        App troubleshooting
                                    </h4>

                                    <p className="gb-menu-card-empty">
                                        More coming soon
                                    </p>

                                </div>


                                <div className="gb-menu-card">

                                    <h4>
                                        Online Banking troubleshooting
                                    </h4>

                                    <p className="gb-menu-card-empty">
                                        More coming soon
                                    </p>

                                </div>


                                <div className="gb-menu-card">

                                    <h4>
                                        ROB troubleshooting
                                    </h4>

                                    <p className="gb-menu-card-empty">
                                        More coming soon
                                    </p>

                                </div>

                            </div>

                        </div>

                    </nav>

                </>

            )}

        </div>
    );
}
