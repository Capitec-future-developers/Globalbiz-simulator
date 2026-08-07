(function () {
    if (document.querySelector('.gb-app-header')) return;

    var path = (window.location.pathname || '').toLowerCase();
    var isRob = path.indexOf('/rob/') !== -1;

    var signInHref = isRob ? '../App/Sign-In.html' : 'Sign-In.html';
    var robHref = isRob ? 'ROB.html' : '../ROB/ROB.html';
    var logoSrc = '../images/Logo.png';

    var header = document.createElement('header');
    header.className = 'gb-app-header';
    header.innerHTML =
        '<a href="' + signInHref + '" class="gb-app-header-logo"><img src="' + logoSrc + '" alt="Capitec logo"></a>' +
        '<div class="gb-app-header-toggle">' +
            '<a href="' + signInHref + '" class="gb-app-header-toggle-opt' + (isRob ? '' : ' active') + '">Sign In</a>' +
            '<a href="' + robHref + '" class="gb-app-header-toggle-opt' + (isRob ? ' active' : '') + '">ROB</a>' +
        '</div>' +
        '<div class="search-container gb-app-header-search">' +
            '<button id="execute-automation" class="search-button gb-app-header-search-icon" aria-label="Run command" type="button">' +
                '<span class="material-icons-sharp">search</span>' +
            '</button>' +
            '<input type="text" id="automation-search" placeholder="What would you like to do? (e.g. \'pay saved beneficiary\')">' +
            '<div id="suggestions-dropdown" class="suggestions-dropdown"></div>' +
        '</div>' +
        '<button type="button" class="gb-app-header-menu-btn" aria-label="Menu">' +
            '<span class="material-icons-sharp">menu</span>' +
        '</button>';

    document.body.insertBefore(header, document.body.firstChild);
    document.body.style.paddingTop = header.offsetHeight + 'px';
})();
