// card-navigation.js
document.addEventListener('DOMContentLoaded', function () {
    const navigationStack = [];
    const cardDetails = document.getElementById('Cards-Content');

    // Initial view
    navigationStack.push('cards');

    // Back navigation function
    function navigateBack() {
        if (navigationStack.length > 1) {
            navigationStack.pop(); // Remove current view
            const previousView = navigationStack[navigationStack.length - 1]; // Peek at previous

            if (previousView === 'cards') {
                resetToMainView();
            } else if (previousView === 'Cards-section') {
                showCardsSection();
            }
        } else {
            resetToMainView();
        }
    }

    // Return to main card list
    function resetToMainView() {
        window.location.href = 'Cards.html';
    }

    // Show detailed virtual card section
    function showCardsSection() {
        navigationStack.push('Cards-section');
        cardDetails.innerHTML = `
     <div class="card-details" style="margin-top: 100px;">

  <div class="header-card">
  <a href="Cards.html" class="back" style="margin-left: -10px; color: #1e88e5; bottom: 20px;">
  <span class="material-icons-sharp">arrow_back</span>
  </a>
<h2 style="margin-left: 40px;">Card Details</h2>
  </div>
  <div class="divider"></div>
<div class="container">
  <!-- Card Image Section -->
  <div class="card-section">
    <img src="virtuale.png" alt="Debit Card" class="card-img" style="height: 250px; width: 150px; gap: 10px;">
  </div>

  <!-- Card Info Section -->
  <div class="details-section">
    <div class="info"><strong>Company name:</strong> Kodi Banks</div>
    <div class="info"><span class="status">Active</span></div>
    <div class="info"><strong>Debit Card:</strong> 4016 **** **** 3734</div>
    <div class="info"><strong>Account number:</strong> 1052 2626 43</div>
    <div class="info"><strong>Card expiry date:</strong> 12/28</div>
  </div>

  <!-- Action Buttons Section -->
  <div class="actions">
    <a href="#" class="action-btn">
      <span class="material-icons-sharp">no_sim</span>
      Pause or Stop Card
    </a>
    <a href="#" class="action-btn">
      <span class="material-icons-sharp">remove_red_eye</span>
      Update Card Limits
    </a>
   
    <a href="#" class="action-btn">
      <span class="material-icons-sharp">credit_card</span>
      View Card Details
    </a>
  
  </div>
</div>
</div>
    `;
    }

    // Assign click event to view buttons
    const viewCards = document.getElementById('view-cards');
    if (viewCards) {
        viewCards.addEventListener('click', function (e) {
            e.preventDefault();
            showCardsSection();
        });
    }

    const viewCardDetails = document.getElementById('viewcarddetails');
    if (viewCardDetails) {
        viewCardDetails.addEventListener('click', function (e) {
            e.preventDefault();
            showCardsSection();
        });
    }

    // Dropdown toggle for Debit and Virtual Cards
    window.toggleDropdown = function (id) {
        const content = document.getElementById(id);
        content.style.display = content.style.display === 'block' ? 'none' : 'block';
    };
});
