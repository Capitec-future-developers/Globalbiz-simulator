// scripts/platformSelector.js
document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('startBtn');
    const platformButtons = document.querySelectorAll('[data-platform]');
    const proceedBtn = document.getElementById('proceedBtn');
    const platformOptions = document.getElementById('platformOptions');
    const proceedLink = document.getElementById('proceedLink');
    const loading = document.getElementById('loading');
    const deviceScreen = document.getElementById('deviceScreen');
    const progressFill = document.querySelector('.progress-fill');

    let targetPage = '#';
    let selectedPlatform = '';

    // Start button click handler
    startBtn.addEventListener('click', () => {
        startBtn.classList.add('hidden');
        platformOptions.style.display = 'flex';

        // Add animation to platform options
        platformOptions.style.opacity = '0';
        platformOptions.style.transform = 'translateY(20px)';

        setTimeout(() => {
            platformOptions.style.transition = 'all 0.5s ease';
            platformOptions.style.opacity = '1';
            platformOptions.style.transform = 'translateY(0)';
        }, 100);
    });

    // Platform selection handlers
    platformButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            platformButtons.forEach(b => b.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            const platform = btn.getAttribute('data-platform');
            selectedPlatform = platform;
            targetPage = platform === 'app' ? "./App/Phone.html" : "./Computer/Computer.html";

            // Update device preview based on selection
            updateDevicePreview(platform);

            // Show proceed button with animation
            proceedBtn.style.display = 'block';
            proceedBtn.style.opacity = '0';
            proceedBtn.style.transform = 'translateY(20px)';

            setTimeout(() => {
                proceedBtn.style.transition = 'all 0.5s ease';
                proceedBtn.style.opacity = '1';
                proceedBtn.style.transform = 'translateY(0)';
            }, 100);
        });
    });

    // Proceed button click handler
    proceedLink.addEventListener('click', (e) => {
        e.preventDefault();

        // Show loading animation
        loading.style.display = 'flex';
        loading.style.opacity = '0';

        setTimeout(() => {
            loading.style.transition = 'opacity 0.5s ease';
            loading.style.opacity = '1';

            // Start progress bar animation
            progressFill.style.animation = 'progress 2s linear';

            // Redirect after loading completes
            setTimeout(() => {
                window.location.href = targetPage;
            }, 2000);
        }, 100);
    });

    // Update device preview based on platform selection
    function updateDevicePreview(platform) {
        const screenContent = deviceScreen.querySelector('.screen-content');

        if (platform === 'app') {
            // Mobile app preview
            screenContent.innerHTML = `
                <div class="status-bar">
                    <span class="time">14:25</span>
                    <span class="battery">78%</span>
                </div>
                <div class="app-icon-grid">
                    <div class="app-icon"></div>
                    <div class="app-icon"></div>
                    <div class="app-icon"></div>
                    <div class="app-icon"></div>
                </div>
                <div class="app-nav">
                    <div class="nav-item active"></div>
                    <div class="nav-item"></div>
                    <div class="nav-item"></div>
                    <div class="nav-item"></div>
                </div>
            `;

            // Add specific styles for mobile
            deviceScreen.style.height = '500px';
            deviceScreen.style.borderRadius = '25px';
        } else {
            // PC preview
            screenContent.innerHTML = `
                <div class="desktop-bar">
                    <div class="start-menu"></div>
                    <div class="system-tray">
                        <div class="tray-icon"></div>
                        <div class="tray-icon"></div>
                        <div class="tray-icon"></div>
                    </div>
                </div>
                <div class="desktop-icons">
                    <div class="desktop-icon"></div>
                    <div class="desktop-icon"></div>
                    <div class="desktop-icon"></div>
                    <div class="desktop-icon"></div>
                </div>
                <div class="taskbar">
                    <div class="task-item active"></div>
                    <div class="task-item"></div>
                    <div class="task-item"></div>
                </div>
            `;

            // Add specific styles for PC
            deviceScreen.style.height = '350px';
            deviceScreen.style.borderRadius = '10px';
        }

        // Add animation to device preview
        deviceScreen.style.animation = 'none';
        setTimeout(() => {
            deviceScreen.style.animation = 'float 6s ease-in-out infinite';
        }, 10);
    }

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.futuristic-btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});