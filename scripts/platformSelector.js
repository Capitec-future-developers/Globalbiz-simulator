document.addEventListener('DOMContentLoaded', () => {
    const platformButtons = document.querySelectorAll('[data-platform]');
    const proceedBtn = document.getElementById('proceedBtn');
    const platformOptions = document.getElementById('platformOptions');
    const proceedLink = document.getElementById('proceedLink');
    const loading = document.getElementById('loading');

    let targetPage = '#';

    platformButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const platform = btn.getAttribute('data-platform');
            targetPage = platform === 'app' ? "./App/Phone.html" : "./Computer/Computer.html";

            proceedBtn.style.display = 'block';
            platformOptions.style.display = 'none';
        });
    });

    proceedLink.addEventListener('click', (e) => {
        e.preventDefault();
        loading.style.display = 'flex';
        proceedBtn.style.display = 'none';

        setTimeout(() => {
            window.location.href = targetPage;
        }, 2000);
    });
});
