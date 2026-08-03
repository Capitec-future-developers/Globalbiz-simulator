document.addEventListener('DOMContentLoaded', function () {
    var root = document.getElementById('support-root');
    if (!root) return;

    var TOPICS = [
        { icon: 'computer', title: 'Digital banking and service queries' },
        { icon: 'no_cell', title: 'Fraud or stopping a card' },
        { icon: 'volunteer_activism', title: 'Applying for credit' },
        { icon: 'rocket_launch', title: 'New products' },
        { icon: 'point_of_sale', title: 'Merchant support' }
    ];

    function render(html) {
        root.innerHTML = html;
    }

    function exitSupport() {
        var origin = new URLSearchParams(window.location.search).get('from');
        window.location.href = origin === 'personal' ? 'GlobalOne-Home.html' : 'Phone2.html';
    }

    function renderTopicList() {
        render(
            '<div class="sp-screen">' +
            '<div class="sp-topbar"><button id="sp-back-btn" type="button"><span class="material-icons-sharp">arrow_back</span></button></div>' +
            '<h2 class="sp-heading">I need to speak to someone about</h2>' +
            TOPICS.map(function (t, i) {
                return '<button class="sp-list-item" type="button" data-topic-index="' + i + '">' +
                    '<span class="material-icons-sharp">' + t.icon + '</span>' +
                    '<div><div class="sp-list-title">' + t.title + '</div><div class="sp-list-status">Available</div></div>' +
                    '</button>';
            }).join('') +
            '</div>'
        );
        document.getElementById('sp-back-btn').addEventListener('click', exitSupport);
        document.querySelectorAll('.sp-list-item').forEach(function (item) {
            item.addEventListener('click', renderCallWelcome);
        });
    }

    function renderCallWelcome() {
        render(
            '<div class="sp-screen">' +
            '<div class="sp-call-center">' +
            '<div class="sp-call-hero"><div class="sp-call-hero-bg"></div><div class="sp-call-hero-phone"><div class="sp-call-hero-notch"></div><div class="sp-call-hero-dots"><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span></div><div class="sp-call-hero-home"></div></div><div class="sp-call-hero-badge sp-call-hero-badge-arrow"><span class="material-icons-sharp">arrow_forward</span></div><div class="sp-call-hero-badge sp-call-hero-badge-phone"><span class="material-icons-sharp">call</span></div></div>' +
            '<div class="sp-call-title">Welcome to in-app calling</div>' +
            '<div class="sp-call-desc">Need assistance? Now you can speak to a Client Care agent while you’re banking on the app.</div>' +
            '<button class="sp-btn-primary" id="sp-next-btn">Next</button>' +
            '</div>' +
            '</div>'
        );
        document.getElementById('sp-next-btn').addEventListener('click', renderPermissionRequest);
    }

    function renderPermissionRequest() {
        render(
            '<div class="sp-screen">' +
            '<div class="sp-call-center">' +
            '<div class="sp-call-illustration sp-permission"><span class="material-icons-sharp">smartphone</span><span class="material-icons-sharp">call</span></div>' +
            '<div class="sp-call-title">Allow us to use your microphone while using the app</div>' +
            '<div class="sp-call-desc">We need access to your microphone for you to make in-app calls. Your privacy is our priority, so your microphone will only be used during a call. You can change this option later in your phone’s settings.</div>' +
            '<button class="sp-btn-primary" id="sp-allow-btn">Allow microphone</button>' +
            '</div>' +
            '</div>'
        );
        document.getElementById('sp-allow-btn').addEventListener('click', renderMicActivated);
    }

    function renderMicActivated() {
        render(
            '<div class="sp-screen">' +
            '<div class="sp-call-center">' +
            '<div style="width:90px; height:90px; margin: 0 auto 30px; display:flex; align-items:center; justify-content:center;"><span class="material-icons-sharp" style="font-size:70px; color:#1a9c4a;">check_circle</span></div>' +
            '<div class="sp-call-title">Microphone activated</div>' +
            '<div class="sp-call-desc">You’re all set to use our in-app calling feature. Tap below to start the call.</div>' +
            '<button class="sp-btn-primary" id="sp-start-call-btn">Start Calling</button>' +
            '</div>' +
            '</div>'
        );
        document.getElementById('sp-start-call-btn').addEventListener('click', renderCalling);
    }

    function renderCalling() {
        render(
            '<div class="sp-screen">' +
            '<div class="sp-call-center">' +
            '<div class="sp-spinner"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>' +
            '<div class="sp-call-title">Calling Client Care…</div>' +
            '<div class="sp-call-desc">You’ll be connected to the next available agent.</div>' +
            '<button class="sp-btn-secondary" id="sp-end-call-btn">Cancel</button>' +
            '</div>' +
            '</div>'
        );
        document.getElementById('sp-end-call-btn').addEventListener('click', renderTopicList);
    }

    renderTopicList();
});
