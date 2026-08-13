import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TOPICS = [
    { icon: 'computer', title: 'Digital banking and service queries' },
    { icon: 'no_cell', title: 'Fraud or stopping a card' },
    { icon: 'volunteer_activism', title: 'Applying for credit' },
    { icon: 'rocket_launch', title: 'New products' },
    { icon: 'point_of_sale', title: 'Merchant support' }
];

export default function Support() {
    const navigate = useNavigate();
    const [step, setStep] = useState('topics'); // topics | welcome | permission | activated | calling

    if (step === 'welcome' || step === 'permission' || step === 'activated' || step === 'calling') {
        return (
            <div className="sp-screen">
                <div className="sp-call-center">
                    {step === 'welcome' && (
                        <>
                            <div className="sp-call-hero">
                                <div className="sp-call-hero-bg"></div>
                                <div className="sp-call-hero-phone">
                                    <div className="sp-call-hero-notch"></div>
                                    <div className="sp-call-hero-dots">
                                        {Array.from({ length: 9 }).map((_, i) => <span key={i}></span>)}
                                    </div>
                                    <div className="sp-call-hero-home"></div>
                                </div>
                                <div className="sp-call-hero-badge sp-call-hero-badge-arrow"><span className="material-icons-sharp">arrow_forward</span></div>
                                <div className="sp-call-hero-badge sp-call-hero-badge-phone"><span className="material-icons-sharp">call</span></div>
                            </div>
                            <div className="sp-call-title">Welcome to in-app calling</div>
                            <div className="sp-call-desc">Need assistance? Now you can speak to a Client Care agent while you're banking on the app.</div>
                            <button className="sp-btn-primary" type="button" onClick={() => setStep('permission')}>Next</button>
                        </>
                    )}
                    {step === 'permission' && (
                        <>
                            <div className="sp-call-illustration sp-permission">
                                <span className="material-icons-sharp">smartphone</span>
                                <span className="material-icons-sharp">call</span>
                            </div>
                            <div className="sp-call-title">Allow us to use your microphone while using the app</div>
                            <div className="sp-call-desc">We need access to your microphone for you to make in-app calls. Your privacy is our priority, so your microphone will only be used during a call. You can change this option later in your phone's settings.</div>
                            <button className="sp-btn-primary" type="button" onClick={() => setStep('activated')}>Allow microphone</button>
                        </>
                    )}
                    {step === 'activated' && (
                        <>
                            <div style={{ width: 90, height: 90, margin: '0 auto 30px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span className="material-icons-sharp" style={{ fontSize: 70, color: '#1a9c4a' }}>check_circle</span>
                            </div>
                            <div className="sp-call-title">Microphone activated</div>
                            <div className="sp-call-desc">You're all set to use our in-app calling feature. Tap below to start the call.</div>
                            <button className="sp-btn-primary" type="button" onClick={() => setStep('calling')}>Start Calling</button>
                        </>
                    )}
                    {step === 'calling' && (
                        <>
                            <div className="sp-spinner"><div className="double-bounce1"></div><div className="double-bounce2"></div></div>
                            <div className="sp-call-title">Calling Client Care…</div>
                            <div className="sp-call-desc">You'll be connected to the next available agent.</div>
                            <button className="sp-btn-secondary" type="button" onClick={() => setStep('topics')}>Cancel</button>
                        </>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="sp-screen">
            <div className="sp-topbar">
                <button type="button" onClick={() => navigate('/')}><span className="material-icons-sharp">arrow_back</span></button>
            </div>
            <h2 className="sp-heading">I need to speak to someone about</h2>
            {TOPICS.map((t) => (
                <button key={t.title} className="sp-list-item" type="button" onClick={() => setStep('welcome')}>
                    <span className="material-icons-sharp">{t.icon}</span>
                    <div><div className="sp-list-title">{t.title}</div><div className="sp-list-status">Available</div></div>
                </button>
            ))}
        </div>
    );
}
