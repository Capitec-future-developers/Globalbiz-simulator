// Create the popup when needed
function createPauseStopCardPopup() {
// Create the main container
    const popupContainer = document.createElement('div');
    popupContainer.className = 'popup-overlay';

// Create the popup content
    const popupContent = document.createElement('div');
    popupContent.className = 'popup-content';

// Create the header
    const popupHeader = document.createElement('div');
    popupHeader.className = 'popup-header';

    const backArrow = document.createElement('span');
    backArrow.className = 'material-icons-sharp popup-back-arrow';
    backArrow.textContent = 'arrow_back';
    backArrow.style.cursor = 'pointer';
    backArrow.addEventListener('click', () => {
        document.body.removeChild(popupContainer);
    });

    const headerTitle = document.createElement('div');
    headerTitle.className = 'popup-header-title';
    headerTitle.textContent = 'Pause or Stop Card';

    popupHeader.appendChild(backArrow);
    popupHeader.appendChild(headerTitle);

// Create scrollable content container
    const scrollableContent = document.createElement('div');
    scrollableContent.className = 'scrollable-content';

// Create card details section
    const cardDetailsSection = document.createElement('div');
    cardDetailsSection.className = 'card-details-section';

    const cardDetailsTitle = document.createElement('h4');
    cardDetailsTitle.textContent = 'Card details';

    const detailsContainer = document.createElement('div');
    detailsContainer.className = 'details-container';

// Cardholder name
    const cardholderTitle = document.createElement('span');
    cardholderTitle.className = 'details-title';
    cardholderTitle.textContent = 'Cardholder name';

    const cardholderName = document.createElement('span');
    cardholderName.className = 'details-name';
    cardholderName.textContent = 'MR O MOHLALA';

// Card number
    const cardNumberTitle = document.createElement('span');
    cardNumberTitle.className = 'details-title';
    cardNumberTitle.textContent = 'Debit Card';

    const cardNumber = document.createElement('span');
    cardNumber.className = 'details-name';
    cardNumber.textContent = '4016**** ****3734';

    detailsContainer.appendChild(cardholderTitle);
    detailsContainer.appendChild(cardholderName);
    detailsContainer.appendChild(cardNumberTitle);
    detailsContainer.appendChild(cardNumber);

    cardDetailsSection.appendChild(cardDetailsTitle);
    cardDetailsSection.appendChild(detailsContainer);

// Create what to do section
    const whatToDoSection = document.createElement('div');
    whatToDoSection.className = 'what-to-do-section';

    const whatToDoTitle = document.createElement('h4');
    whatToDoTitle.textContent = 'What would you like to do?';

    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'options-container';

// Pause option
    const pauseOption = document.createElement('div');
    pauseOption.className = 'option';

    const pauseIcon = document.createElement('img');
    pauseIcon.src = '../images/stop-card-action.svg';

    const pauseText = document.createElement('span');
    pauseText.textContent = 'Pause card';

    const pauseRadio = document.createElement('input');
    pauseRadio.type = 'radio';
    pauseRadio.name = 'cardAction';
    pauseRadio.className = 'blue-radio';

    pauseOption.appendChild(pauseIcon);
    pauseOption.appendChild(pauseText);
    pauseOption.appendChild(pauseRadio);

// Stop option
    const stopOption = document.createElement('div');
    stopOption.className = 'option';

    const stopIcon = document.createElement('img');
    stopIcon.src = '../images/stop-card-action.svg';

    const stopText = document.createElement('span');
    stopText.textContent = 'Stop card';

    const stopRadio = document.createElement('input');
    stopRadio.type = 'radio';
    stopRadio.name = 'cardAction';
    stopRadio.className = 'blue-radio';

    stopOption.appendChild(stopIcon);
    stopOption.appendChild(stopText);
    stopOption.appendChild(stopRadio);

    optionsContainer.appendChild(pauseOption);
    optionsContainer.appendChild(stopOption);

    whatToDoSection.appendChild(whatToDoTitle);
    whatToDoSection.appendChild(optionsContainer);

// Assemble the scrollable content
    scrollableContent.appendChild(cardDetailsSection);
    scrollableContent.appendChild(whatToDoSection);

// Create buttons container
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'popup-buttons';

// Continue button
    const continueButton = document.createElement('button');
    continueButton.className = 'continue-btn';
    continueButton.textContent = 'Continue';
    continueButton.addEventListener('click', () => {
// Handle continue action
        document.body.removeChild(popupContainer);
    });

// Cancel button
    const cancelButton = document.createElement('button');
    cancelButton.className = 'cancel-btn';
    cancelButton.textContent = 'Cancel';
    cancelButton.addEventListener('click', () => {
        document.body.removeChild(popupContainer);
    });

    buttonsContainer.appendChild(continueButton);
    buttonsContainer.appendChild(cancelButton);

// Assemble the popup
    popupContent.appendChild(popupHeader);
    popupContent.appendChild(scrollableContent);
    popupContent.appendChild(buttonsContainer);
    popupContainer.appendChild(popupContent);

// Add to the body
    document.body.appendChild(popupContainer);

// Close when clicking outside the popup
    popupContainer.addEventListener('click', (e) => {
        if (e.target === popupContainer) {
            document.body.removeChild(popupContainer);
        }
    });
}

// Function to initialize the "Pause or Stop Card" functionality
function initPauseStopCard() {
// Find the continue button in the existing UI
    const continueButton = document.querySelector('.continue');
    if (continueButton) {
        continueButton.addEventListener('click', createPauseStopCardPopup);
    }

// Also allow clicking on the radio options to trigger the popup
    const radioOptions = document.querySelectorAll('input[type="radio"][name="cardAction"]');
    radioOptions.forEach(radio => {
        radio.addEventListener('click', createPauseStopCardPopup);
    });
}

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', initPauseStopCard);

// Existing scripts
document.addEventListener('DOMContentLoaded', function() {
// Your existing initialization code here
    const sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function(e) {
// Your sidebar toggle logic
        });
    }

// Search functionality
    const searchInput = document.getElementById('automation-search');
    const searchButton = document.getElementById('execute-automation');
    const suggestionsDropdown = document.getElementById('suggestions-dropdown');

    if (searchInput && searchButton && suggestionsDropdown) {
        searchButton.addEventListener('click', function() {
// Your search execution logic
        });

        searchInput.addEventListener('input', function() {
// Your search suggestions logic
        });
    }
});