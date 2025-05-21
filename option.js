document.getElementById('startBtn').addEventListener('click', function() {
            document.getElementById('platformOptions').style.display = 'block';
            this.style.display = 'none';
        });
        
        const platformButtons = document.querySelectorAll('[data-platform]');
        platformButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const platform = this.getAttribute('data-platform');
                const proceedLink = document.getElementById('proceedLink');
                
                if (platform === 'app') {
                    proceedLink.href = "Phone.html";
                } else {
                    proceedLink.href = "PC.html"; 
                }
                
                document.getElementById('proceedBtn').style.display = 'block';
                document.getElementById('platformOptions').style.display = 'none';
            });
        });