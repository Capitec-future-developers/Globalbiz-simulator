(function () {
    function $(id) {
        return document.getElementById(id);
    }

    function init() {
        var screens = {
            chooser: $('robScreenChooser'),
            loading: $('robScreenLoading'),
            application: $('robScreenApplication'),
            biztype: $('robScreenBizType')
        };

        if (!screens.chooser) return;

        function showScreen(name) {
            Object.keys(screens).forEach(function (key) {
                if (screens[key]) screens[key].hidden = key !== name;
            });
        }

        var forRow = $('robForRow');
        var getStartedBtn = $('robGetStarted');

        var mainOpts = document.querySelectorAll('#robMainToggle .rob-toggle-opt');
        mainOpts.forEach(function (opt) {
            opt.addEventListener('click', function () {
                mainOpts.forEach(function (o) { o.classList.remove('active'); });
                opt.classList.add('active');
                if (opt.getAttribute('data-value') === 'open') {
                    forRow.hidden = false;
                } else {
                    forRow.hidden = true;
                    getStartedBtn.hidden = true;
                }
            });
        });

        var forOpts = document.querySelectorAll('#robForToggle .rob-toggle-opt');
        forOpts.forEach(function (opt) {
            opt.addEventListener('click', function () {
                forOpts.forEach(function (o) { o.classList.remove('active'); });
                opt.classList.add('active');
                getStartedBtn.hidden = false;
            });
        });

        getStartedBtn.addEventListener('click', function () {
            showScreen('loading');
            setTimeout(function () {
                showScreen('application');
            }, 1500);
        });

        var startNew = $('robStartNewApplication');
        if (startNew) {
            startNew.addEventListener('click', function () {
                showScreen('biztype');
            });
        }

        var resume = $('robResumeApplication');
        if (resume) {
            resume.addEventListener('click', function (e) { e.preventDefault(); });
        }

        ['robBizTypePrivate', 'robBizTypeSole', 'robBizTypeOther'].forEach(function (id) {
            var el = $(id);
            if (el) el.addEventListener('click', function (e) { e.preventDefault(); });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
