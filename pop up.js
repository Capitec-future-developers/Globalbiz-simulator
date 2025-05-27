document.addEventListener('DOMContentLoaded', function() {
    const profileLink = document.getElementById('profile-link');
    const profilePopup = document.getElementById('profilePopup');
    const overlay = document.getElementById('overlay');

    profileLink.addEventListener('click', function(e) {
        e.preventDefault();
        profilePopup.classList.add('active');
        overlay.classList.add('active');
    });

    overlay.addEventListener('click', function() {
        profilePopup.classList.remove('active');
        overlay.classList.remove('active');
    });
});