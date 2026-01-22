// Clock
function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'});
    const date = now.toLocaleDateString();
    document.getElementById('time').textContent = time;
    document.getElementById('date').textContent = date;
}
updateClock();
setInterval(updateClock, 1000);

// Start menu toggle
const startBtn = document.getElementById('startBtn');
const startMenu = document.getElementById('startMenu');

startBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    startMenu.classList.toggle('open');
});

document.addEventListener('click', (e) => {
    if (!startMenu.contains(e.target) && !startBtn.contains(e.target)) {
        startMenu.classList.remove('open');
    }
});

// Edge browser functionality
const edgeIcon = document.getElementById('edgeIcon');
const taskbarEdge = document.getElementById('taskbarEdge');
const startEdge = document.getElementById('startEdge');
const browserWindow = document.getElementById('browserWindow');
const browserClose = document.getElementById('browserClose');
const browserIframe = document.getElementById('browserIframe');
const browserLoading = document.getElementById('browserLoading');

function openEdge() {
    browserWindow.classList.add('open');
    browserLoading.style.display = 'flex';
    browserIframe.style.display = 'none';

    // Load the Capitec website
    browserIframe.src = 'https://www.capitecbank.co.za';

    // Show the iframe once it's loaded
    browserIframe.onload = function() {
        browserLoading.style.display = 'none';
        browserIframe.style.display = 'block';
    };

    // Close start menu if open
    startMenu.classList.remove('open');
}

edgeIcon.addEventListener('click', openEdge);
taskbarEdge.addEventListener('click', openEdge);
startEdge.addEventListener('click', openEdge);

browserClose.addEventListener('click', () => {
    browserWindow.classList.remove('open');
    browserIframe.src = 'about:blank';
});

// Shutdown functionality with animation
const shutdownBtn = document.getElementById('shutdownBtn');
const shutdownOverlay = document.getElementById('shutdownOverlay');
const shutdownProgress = document.getElementById('shutdownProgress');

shutdownBtn.addEventListener('click', () => {
    // Close start menu if open
    startMenu.classList.remove('open');

    // Show shutdown overlay
    shutdownOverlay.classList.add('active');

    // Animate progress bar
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 2;
        shutdownProgress.style.width = `${progress}%`;

        if (progress >= 100) {
            clearInterval(progressInterval);
            // Redirect after animation completes
            setTimeout(() => {
                window.location.href = './home%20page.html';
            }, 500);
        }
    }, 50);
});

// Wallpaper rotation
const wallpapers = [
    '../images/windowsBackground.png',
    '../images/windowsBackgroundLight.png'
];
let currentWallpaperIndex = 0;
const wallpaperElement = document.querySelector('.wallpaper');

function rotateWallpaper() {
    currentWallpaperIndex = (currentWallpaperIndex + 1) % wallpapers.length;
    wallpaperElement.style.backgroundImage = `url('${wallpapers[currentWallpaperIndex]}')`;
}

// Change wallpaper every 5 minutes (300,000 milliseconds)
setInterval(rotateWallpaper, 30000);