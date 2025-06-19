// Navigation Stack and Card Details Logic
const navigationStack = [];
const cardDetails = document.getElementById('Cards-Content');

function navigateBack() {
    if (navigationStack.length > 1) {
        navigationStack.pop(); // Remove current view
        const previousView = navigationStack[navigationStack.length - 1]; // Peek at previous view

        if (previousView === 'cards') {
            resetToMainView();
        } else if (previousView === 'Cards-section') {
            showCardsSection();
        }
    } else {
        resetToMainView(); // If stack is empty or only one, go home
    }
}

function resetToMainView() {
    // Redirect to real Cards.html page
    window.location.href = 'Cards.html';
}

function showCardsSection() {
    navigationStack.push('Cards-section');
    cardDetails.innerHTML = `
      <div class="card-details" style="margin-top: 100px;">
        <div class="header-card">
          <a href="#" onclick="navigateBack()" class="back" style="margin-left: -10px; color: #1e88e5;">
            <span class="material-icons-sharp">arrow_back</span>
          </a>
          <h2 style="margin-left: 40px;">Virtual Card Details</h2>
        </div>
        <div class="divider"></div>
        <div class="container">
          <div class="card-section">
            <img src="virtuale.png" alt="Debit Card" class="card-img" style="height: 250px; width: 150px;">
          </div>
          <div class="details-section">
            <div class="info"><strong>Company name:</strong> Kodi Banks</div>
            <div class="info"><span class="status">Active</span></div>
            <div class="info"><strong>Debit Card:</strong> 4016 **** **** 3734</div>
            <div class="info"><strong>Account number:</strong> 1052 2626 43</div>
            <div class="info"><strong>Card expiry date:</strong> 12/28</div>
          </div>
          <div class="actions">
            <a href="#" class="action-btn"><span class="material-icons-sharp">no_sim</span>Pause or Stop Card</a>
            <a href="#" class="action-btn"><span class="material-icons-sharp">remove_red_eye</span>Update Card Limits</a>
            <a href="#" class="action-btn"><span class="material-icons-sharp">credit_card</span>View Card Details</a>
          </div>
        </div>
      </div>
    `;
}

document.addEventListener('DOMContentLoaded', function() {
    navigationStack.push('cards'); // Set the initial view in the stack

    const viewCards = document.getElementById('view-cards');
    if (viewCards) {
        viewCards.addEventListener('click', function(e) {
            e.preventDefault();
            showCardsSection();
        });
    }

    const viewCardDetails = document.getElementById('viewcarddetails');
    if (viewCardDetails) {
        viewCardDetails.addEventListener('click', function(e) {
            e.preventDefault();
            showCardsSection();
        });
    }
});

// Dropdown Toggle Logic
function toggleDropdown(id) {
    const dropdown = document.getElementById(id);
    dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
}

// Add Card Popup Logic
const addCardBtn = document.querySelector('#Cards-Content .btn');
const addCardPopup = document.getElementById('addCardPopup');
const cancelBtn = document.getElementById('cancelAddCard');
const continueBtn = document.getElementById('continueAddCard');

// Show popup when "Add New Card" button is clicked
addCardBtn.addEventListener('click', () => {
    addCardPopup.style.display = 'flex';
});

// Hide popup when "Cancel" button is clicked
cancelBtn.addEventListener('click', () => {
    addCardPopup.style.display = 'none';
});

// Continue button (you can later add logic to handle selection)
continueBtn.addEventListener('click', () => {
    const selectedCard = document.querySelector('input[name="cardType"]:checked');
    if (selectedCard) {
        alert('Selected Card Type: ' + selectedCard.value);
        addCardPopup.style.display = 'none'; // close after selection
    } else {
        alert('Please select a card type.');
    }
});
