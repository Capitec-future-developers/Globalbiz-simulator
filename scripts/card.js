
const navigationStack = [];
const cardDetails = document.getElementById('Cards-Content');

function navigateBack() {
    if (navigationStack.length > 1) {
        navigationStack.pop();
        const previousView = navigationStack[navigationStack.length - 1];

        if (previousView === 'cards') {
            resetToMainView();
        } else if (previousView === 'Cards-section') {
            showCardsSection();
        }
    } else {
        resetToMainView();
    }
}

function resetToMainView() {

    window.location.href = 'Cards.html';
}

function showCardsSection() {
    navigationStack.push('Cards-section');
    cardDetails.innerHTML = `
    <div class="content" style="position: relative;">
      <div class="card-details" style="top: 80px; left: -100px; width: 100%;">
        <div class="header-card">
          <a href="#" onclick="navigateBack()" class="back" style="margin-left: -10px; color: #1e88e5;">
            <span class="material-icons-sharp">arrow_back</span>
          </a>
          <h2 style="margin-left: 40px;">Virtual Card Details</h2>
        </div>
        <div class="divider"></div>
        <div class="container">
          <div class="card-section">
            <img src="../images/virtuale.png" alt="Debit Card" class="card-img" style="height: 250px; width: 150px;">
          </div>
          <div class="details-section">
            <div class="info"><strong>Company name:</strong> Kodi Banks</div>
            <div class="info"><span class="status">Active</span></div>
            <div class="info"><strong>Debit Card:</strong> 4016 **** **** 3734</div>
            <div class="info"><strong>Account number:</strong> 1052 2626 43</div>
            <div class="info"><strong>Card expiry date:</strong> 12/28</div>
          </div>
          <div class="actions">
            <a href="#" class="action-btn"><span class="material-icons-sharp"><img src="../images/stop-card-action.svg"></span>Pause or Stop Card</a>
            <a href="#" class="action-btn"><span class="material-icons-sharp"><img src="../images/view-action.svg"> </span>Update Card Limits</a>
            <a href="#" class="action-btn"><span class="material-icons-sharp"><img src="../images/cards-action.svg"></span>View Card Details</a>
          </div>
        </div>
      </div>
      </div>
    `;
}

document.addEventListener('DOMContentLoaded', function() {
    navigationStack.push('cards');

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


function toggleDropdown(id) {
    const dropdown = document.getElementById(id);
    dropdown.style.display = dropdown.style.display === 'flex' ? 'none' : 'flex';
}


const addCardBtn = document.querySelector('#Cards-Content .btn');
const addCardPopup = document.getElementById('addCardPopup');
const cancelBtn = document.getElementById('cancelAddCard');
const continueBtn = document.getElementById('continueAddCard');


addCardBtn.addEventListener('click', () => {
    addCardPopup.style.display = 'flex';
});


cancelBtn.addEventListener('click', () => {
    addCardPopup.style.display = 'none';
});


continueBtn.addEventListener('click', () => {
    const selectedCard = document.querySelector('input[name="cardType"]:checked');
    if (selectedCard) {
        alert('Selected Card Type: ' + selectedCard.value);
        addCardPopup.style.display = 'none';
    } else {
        alert('Please select a card type.');
    }
});

