// =============================================
// CONFIGURATION AND INITIALIZATION
// =============================================
const API_BASE_URL = 'http://localhost:3000/api';
let currentUser = null;
let authToken = null;

// =============================================
// AUTHENTICATION FUNCTIONS
// =============================================
async function apiRequest(endpoint, method = 'GET', data = null) {
    const config = {
        method,
        headers: {
            'Content-Type': 'application/json',
            ...(authToken && { 'Authorization': `Bearer ${authToken}` })
        },
        ...(data && { body: JSON.stringify(data) })
    };

    try {
        const response = await fetch(`${API_BASE_URL}/${endpoint}`, config);
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || `API request failed: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`API error (${endpoint}):`, error);
        throw error;
    }
}

async function login(email, password) {
    try {
        const data = await apiRequest('login', 'POST', { email, password });
        authToken = data.token;
        currentUser = data.user;

        // Store user data in sessionStorage
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        sessionStorage.setItem('authToken', authToken);

        return true;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}

async function register(firstName, lastName, email, password) {
    try {
        const data = await apiRequest('register', 'POST', { firstName, lastName, email, password });
        authToken = data.token;
        currentUser = data.user;

        // Store user data in sessionStorage
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        sessionStorage.setItem('authToken', authToken);

        return true;
    } catch (error) {
        console.error('Registration error:', error);
        throw error;
    }
}

async function getUserProfile() {
    try {
        const data = await apiRequest('user');
        return data;
    } catch (error) {
        console.error('Failed to fetch user profile:', error);
        throw error;
    }
}

async function getAccountTransactions(accountId) {
    try {
        const data = await apiRequest(`accounts/${accountId}/transactions`);
        return data;
    } catch (error) {
        console.error('Failed to fetch transactions:', error);
        throw error;
    }
}

async function createBeneficiary(name, accountNumber, bank, nickname = '') {
    try {
        const data = await apiRequest('beneficiaries', 'POST', { name, accountNumber, bank, nickname });
        return data;
    } catch (error) {
        console.error('Failed to create beneficiary:', error);
        throw error;
    }
}

async function makePayment(fromAccountId, toAccountNumber, amount, reference, beneficiaryId = null) {
    try {
        const data = await apiRequest('payments', 'POST', {
            fromAccountId,
            toAccountNumber,
            amount,
            reference,
            beneficiaryId
        });
        return data;
    } catch (error) {
        console.error('Payment failed:', error);
        throw error;
    }
}

// =============================================
// LOGIN FORM HANDLER
// =============================================
async function handleLogin(event) {
    event.preventDefault();

    const email = document.getElementById('login-email').value.trim();
    const password = document.getElementById('login-password').value;

    if (!email || !password) {
        alert('Please enter both email and password');
        return;
    }

    try {
        const success = await login(email, password);
        if (success) {
            // Load user profile and accounts
            const userProfile = await getUserProfile();
            sessionStorage.setItem('currentUser', JSON.stringify(userProfile));

            // Redirect to Computer.html after successful login
            window.location.href = 'Computer.html';
        }
    } catch (error) {
        console.error('Login error:', error);
        alert(error.message || 'Login failed. Please check your credentials and try again.');
    }
}

// =============================================
// INITIALIZATION
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on the login page and set up the form handler
    if (window.location.pathname.includes('Login.html') ||
        window.location.pathname.endsWith('/') ||
        window.location.pathname === '') {
        const loginForm = document.getElementById('loginForm');
        if (loginForm) {
            loginForm.addEventListener('submit', handleLogin);
        }
    }

    // If we're on Computer.html, check for existing session
    if (window.location.pathname.includes('Computer.html')) {
        const storedUser = sessionStorage.getItem('currentUser');
        const storedToken = sessionStorage.getItem('authToken');

        if (!storedUser || !storedToken) {
            // Redirect to login if no user is logged in
            window.location.href = 'Login.html';
        } else {
            // Initialize the application with the logged-in user
            currentUser = JSON.parse(storedUser);
            authToken = storedToken;
            initializeApp();
        }
    }
});

function initializeApp() {
    console.log('App initialized for user:', currentUser.firstName, currentUser.lastName);

    // Update UI with user information
    document.querySelectorAll('.profile-Name').forEach(el => {
        if (el) el.textContent = `${currentUser.firstName} ${currentUser.lastName}`;
    });

    const popupHeader = document.querySelector('.popup-header');
    if (popupHeader) popupHeader.textContent = currentUser.email;

    // Update account information
    if (currentUser.accounts && currentUser.accounts.length > 0) {
        const accountElement = document.querySelector('.account-balance');
        if (accountElement) {
            accountElement.textContent = `R${currentUser.accounts[0].balance.toFixed(2)}`;
        }
    }

    // Initialize other components...
}