// Simple iOS-like open animation when launching the Capitec app
(function(){
    const capitecApp = document.getElementById('capitecApp');
    const safariApp = document.getElementById('safariApp');
    const shutdownApp = document.getElementById('shutdownApp');
    const overlay = document.getElementById('openOverlay');
    const safariOverlay = document.getElementById('safariOverlay');
    const safariBackBtn = document.getElementById('safariBackBtn');
    const powerDownOverlay = document.getElementById('powerDownOverlay');
    const shutdownBlackScreen = document.getElementById('shutdownBlackScreen');
    const sliderHandle = document.getElementById('sliderHandle');
    const sliderContainer = document.getElementById('sliderContainer');
    const cancelShutdown = document.getElementById('cancelShutdown');

    if (!capitecApp || !overlay || !safariApp || !safariOverlay) return;

    function openCapitec(e){
        e.preventDefault();
        const rect = capitecApp.getBoundingClientRect();
        const screen = document.querySelector('.screen').getBoundingClientRect();
        // compute transform from icon center to screen
        const iconCx = rect.left + rect.width/2;
        const iconCy = rect.top + rect.height/2;
        const originX = ((iconCx - screen.left) / screen.width) * 100 + '%';
        const originY = ((iconCy - screen.top) / screen.height) * 100 + '%';
        overlay.style.setProperty('--ox', originX);
        overlay.style.setProperty('--oy', originY);
        overlay.style.setProperty('--tx', (iconCx - (screen.left + screen.width/2)) + 'px');
        overlay.style.setProperty('--ty', (iconCy - (screen.top + screen.height/2)) + 'px');
        overlay.classList.add('active');
        setTimeout(()=>{ window.location.href = 'Phone.html'; }, 450);
    }

    function openSafari(e){
        e.preventDefault();
        safariOverlay.classList.add('active');
        
        // Open Capitec in a new tab as Safari would do
        const targetUrl = 'https://www.capitecbank.co.za';
        window.open(targetUrl, '_blank');

        // Automatically close the safari overlay after a moment
        // so the user is back home when they return to the simulator
        setTimeout(() => {
            safariOverlay.classList.remove('active');
        }, 1000);
    }

    function shutdownPhone(e) {
        e.preventDefault();
        powerDownOverlay.classList.add('active');
    }

    // Slider logic for power down
    let isDragging = false;
    let startX = 0;
    let maxSlide = 0;

    function startDrag(e) {
        isDragging = true;
        startX = (e.type === 'touchstart') ? e.touches[0].clientX : e.clientX;
        maxSlide = sliderContainer.offsetWidth - sliderHandle.offsetWidth - 10;
        sliderHandle.style.transition = 'none';
    }

    function doDrag(e) {
        if (!isDragging) return;
        const currentX = (e.type === 'touchmove') ? e.touches[0].clientX : e.clientX;
        let deltaX = currentX - startX;
        if (deltaX < 0) deltaX = 0;
        if (deltaX > maxSlide) deltaX = maxSlide;
        sliderHandle.style.left = (deltaX + 5) + 'px';
        
        // If they reach the end, trigger shutdown
        if (deltaX >= maxSlide) {
            isDragging = false;
            triggerFinalShutdown();
        }
    }

    function endDrag() {
        if (!isDragging) return;
        isDragging = false;
        sliderHandle.style.transition = 'left 0.3s ease';
        sliderHandle.style.left = '5px';
    }

    function triggerFinalShutdown() {
        powerDownOverlay.classList.remove('active');
        shutdownBlackScreen.style.display = 'flex';
        setTimeout(() => {
            // Fade out the spinner and redirect
            shutdownBlackScreen.style.background = 'black';
            setTimeout(() => {
                window.location.href = '../Computer/home%20page.html';
            }, 1500);
        }, 2000);
    }

    cancelShutdown.addEventListener('click', () => {
        powerDownOverlay.classList.remove('active');
    });

    sliderHandle.addEventListener('mousedown', startDrag);
    sliderHandle.addEventListener('touchstart', startDrag);
    window.addEventListener('mousemove', doDrag);
    window.addEventListener('touchmove', doDrag);
    window.addEventListener('mouseup', endDrag);
    window.addEventListener('touchend', endDrag);

    function closeSafari(e) {
        e.preventDefault();
        safariOverlay.classList.remove('active');
    }

    capitecApp.addEventListener('click', openCapitec);
    capitecApp.addEventListener('touchend', openCapitec);

    safariApp.addEventListener('click', openSafari);
    safariApp.addEventListener('touchend', openSafari);

    shutdownApp.addEventListener('click', shutdownPhone);
    shutdownApp.addEventListener('touchend', shutdownPhone);

    safariBackBtn.addEventListener('click', closeSafari);
})();

// Wallpaper rotation
const wallpapers = [
    '../images/iphonebackgroundBlue.png',
    '../images/iphoneBackground.png'
];
let currentWallpaperIndex = 0;
const wallpaperElement = document.querySelector('.wallpaper');

function rotateWallpaper() {
    currentWallpaperIndex = (currentWallpaperIndex + 1) % wallpapers.length;
    wallpaperElement.style.backgroundImage = `url('${wallpapers[currentWallpaperIndex]}')`;
}

// Change wallpaper every 5 minutes (300,000 milliseconds)
setInterval(rotateWallpaper, 30000);