(function () {
    function ensureOverlay() {
        var existing = document.getElementById('gb-loading-overlay');
        if (existing) return existing;
        var overlay = document.createElement('div');
        overlay.id = 'gb-loading-overlay';
        overlay.className = 'gb-loading-overlay';
        overlay.innerHTML =
            '<div class="gb-loading-text">Initializing simulator</div>' +
            '<div class="gb-loading-dots">' +
                '<div class="gb-loading-block gb-loading-blue"></div>' +
                '<div class="gb-loading-block gb-loading-lightblue"></div>' +
                '<div class="gb-loading-block gb-loading-red"></div>' +
            '</div>' +
            '<div class="gb-progress-bar"><div class="gb-progress-fill"></div></div>';
        document.body.appendChild(overlay);
        return overlay;
    }

    function ensureMenu() {
        var existing = document.getElementById('gbMenuPanel');
        if (existing) return existing;

        var isNested = (window.location.pathname || '').toLowerCase().indexOf('/computer/') !== -1;

        var overlay = document.createElement('div');
        overlay.id = 'gbMenuOverlay';
        overlay.className = 'gb-menu-overlay';
        overlay.hidden = true;

        var panel = document.createElement('nav');
        panel.id = 'gbMenuPanel';
        panel.className = 'gb-menu-panel';
        panel.hidden = true;
        panel.innerHTML =
            '<button type="button" class="gb-menu-close" id="gbMenuClose" aria-label="Close menu">' +
                '<span class="material-icons-sharp">close</span>' +
            '</button>' +
            '<div class="gb-menu-body">' +
                '<div class="gb-menu-nav">' +
                    '<a href="' + (isNested ? '../App/Sign-In.html' : 'App/Sign-In.html') + '" class="gb-menu-nav-item">' +
                        '<span class="material-icons-sharp">phone_iphone</span>' +
                        '<span>App</span>' +
                        '<span class="material-icons-sharp gb-menu-caret">chevron_right</span>' +
                    '</a>' +
                    '<a href="' + (isNested ? 'Computer.html' : 'Computer/Computer.html') + '" class="gb-menu-nav-item">' +
                        '<span class="material-icons-sharp">computer</span>' +
                        '<span>Online Banking</span>' +
                        '<span class="material-icons-sharp gb-menu-caret">chevron_right</span>' +
                    '</a>' +
                    '<a href="' + (isNested ? '../ROB/ROB.html' : 'ROB/ROB.html') + '" class="gb-menu-nav-item">' +
                        '<span class="material-icons-sharp">science</span>' +
                        '<span>ROB</span>' +
                        '<span class="material-icons-sharp gb-menu-caret">chevron_right</span>' +
                    '</a>' +
                    '<div class="gb-menu-nav-links">' +
                        '<a href="#">Help centre</a>' +
                        '<a href="#">Contact us</a>' +
                    '</div>' +
                '</div>' +
                '<div class="gb-menu-cards">' +
                    '<div class="gb-menu-card">' +
                        '<h4>App troubleshooting</h4>' +
                        '<p class="gb-menu-card-empty">More coming soon</p>' +
                    '</div>' +
                    '<div class="gb-menu-card">' +
                        '<h4>Online Banking troubleshooting</h4>' +
                        '<p class="gb-menu-card-empty">More coming soon</p>' +
                    '</div>' +
                    '<div class="gb-menu-card">' +
                        '<h4>ROB troubleshooting</h4>' +
                        '<p class="gb-menu-card-empty">More coming soon</p>' +
                    '</div>' +
                '</div>' +
            '</div>';

        document.body.appendChild(overlay);
        document.body.appendChild(panel);
        return panel;
    }

    function initMenu() {
        var btn = document.querySelector('.gb-landing-menu-btn');
        var header = document.querySelector('.gb-landing-header');
        if (!btn || !header) return;

        var panel = ensureMenu();
        var overlay = document.getElementById('gbMenuOverlay');
        var closeBtn = document.getElementById('gbMenuClose');

        function openMenu() {
            panel.style.top = header.offsetHeight + 'px';
            panel.hidden = false;
            overlay.hidden = false;
            requestAnimationFrame(function () {
                panel.classList.add('open');
                overlay.classList.add('open');
            });
        }

        function closeMenu() {
            panel.classList.remove('open');
            overlay.classList.remove('open');
            setTimeout(function () {
                panel.hidden = true;
                overlay.hidden = true;
            }, 250);
        }

        btn.addEventListener('click', function () {
            if (panel.classList.contains('open')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        closeBtn.addEventListener('click', closeMenu);
        overlay.addEventListener('click', closeMenu);
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') closeMenu();
        });
    }

    function init() {
        var overlay = ensureOverlay();
        var fill = overlay.querySelector('.gb-progress-fill');
        var links = document.querySelectorAll('.gb-hero-btn, .gb-preview-card');

        links.forEach(function (link) {
            link.addEventListener('click', function (e) {
                var href = link.getAttribute('href');
                if (!href || href === '#') return;
                e.preventDefault();

                overlay.style.display = 'flex';
                fill.style.animation = 'none';
                void fill.offsetWidth;
                fill.style.animation = 'gb-progress 1.4s linear forwards';

                setTimeout(function () {
                    window.location.href = href;
                }, 1400);
            });
        });

        initMenu();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
