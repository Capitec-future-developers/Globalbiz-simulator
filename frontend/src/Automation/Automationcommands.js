// Auto-generated from the original Automation.js and Computer-Automation.js
// command dictionaries. Both apps used the SAME engine but different UI
// contexts ("app"/mobile vs "computer"/desktop), each with its own selectors,
// so they're kept as two named sets rather than merged into one flat object
// (merging would collide keys like 'open payments' with different selectors).
//
// getDefaultCommands(context) picks the right set; you can also fetch a
// fresh set from your backend (see loadRemoteCommands in useAutomation.js),
// which will override whichever of these is passed in as the initial value.

export const appCommands = {
    'Documents': {
        steps: [
            { action: 'click', selector: '#sidebarToggle' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#documents' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#doc-type' },
            { action: 'wait', selector: '#doc-type' }
        ],
        description: 'Documents',
        category: 'documents'
    },
    'pay saved beneficiary': {
        steps: [
            { action: 'click', selector: '#transact' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#payment' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#pay-hub-saved' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '.nl-pay-row[data-index="0"]' }
        ],
        description: 'Initiate payment to a saved beneficiary',
        category: 'payments'
    },
    'add new beneficiary': {
        steps: [
            { action: 'click', selector: '#transact' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#beneficiaries' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#ben-hub-add' }
        ],
        description: 'Add a new beneficiary',
        category: 'beneficiaries'
    },
    'view transactions': {
        steps: [
            { action: 'click', selector: '#btn-transactions' }
        ],
        description: 'View transaction history',
        category: 'navigation'
    },
    'make once off payment': {
        steps: [
            { action: 'click', selector: '#transact' },
            { action: 'click', selector: '#payment' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#pay-hub-onceoff' }
        ],
        description: 'Make a once-off payment',
        category: 'payments'
    },
    'go to dashboard': {
        steps: [
            { action: 'click', selector: '#bottomNav' },
            { action: 'click', selector: '#Home' },
            { action: 'wait', duration: 1000 }
        ],
        description: 'Return to dashboard',
        category: 'Home'
    },
    'go to transaction limit': {
        steps: [
            { action: 'click', selector: '#sidebarToggle' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#settings' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#Transaction-Limits' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#editlimits' }
        ],
        description: 'Go to transaction limit',
        category: 'transaction limits'
    },
    'Create New Profile limits': {
        steps: [
            { action: 'click', selector: '#sidebarToggle' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#settings' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#Transaction-Limits' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#editlimits' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#limitInput'},
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#continueEdit'},
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#finalConfirm'}
        ],
        description: 'Create New Profile limits',
        category: 'transaction limits'
    },
    'Create New Account limits': {
        steps: [
            { action: 'click', selector: '#sidebarToggle' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#settings' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#Transaction-Limits' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#editAccountLimit' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#activateDrop'},
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#btnUpdateLimit'}
        ],
        description: 'Create New Account limits',
        category: 'transaction limits'
    },
    'Add new card': {
        steps: [
            { action: 'click', selector: '#cards' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#Add-Card' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#debit-card-option' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#continue-btn' }
        ],
        description: 'Add new card',
        category: 'cards'
    },
    'Debit card': {
        steps: [
            { action: 'click', selector: '#bottomNav' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#cards' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#debitToggle' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#debit-card' }
        ],
        description: 'Debit card',
        category: 'cards'
    },
    'open accounts': {
        steps: [
            { action: 'navigate', url: 'Phone%20accounts.html' }
        ],
        description: 'Open accounts page',
        category: 'navigation'
    },
    'open transact': {
        steps: [
            { action: 'click', selector: '#transact' }
        ],
        description: 'Open Transact tab',
        category: 'navigation'
    },
    'open cards': {
        steps: [
            { action: 'click', selector: '#cards' }
        ],
        description: 'Open Cards tab',
        category: 'navigation'
    },
    'open settings': {
        steps: [
            { action: 'click', selector: '#sidebarToggle' },
            { action: 'wait', duration: 500 },
            { action: 'click', selector: '#settings' }
        ],
        description: 'Open Settings',
        category: 'navigation'
    },
    'open documents': {
        steps: [
            { action: 'click', selector: '#sidebarToggle' },
            { action: 'wait', duration: 500 },
            { action: 'click', selector: '#documents' }
        ],
        description: 'Open Documents',
        category: 'navigation'
    },
    'open chatbot': {
        steps: [
            { action: 'click', selector: '.chatbot-toggler' }
        ],
        description: 'Toggle chatbot window',
        category: 'assistance'
    },
    'view profile': {
        steps: [
            { action: 'click', selector: '#profile-link' }
        ],
        description: 'Open profile popup',
        category: 'profile'
    },
    'log out to login screen': {
        steps: [
            { action: 'navigate', url: 'Phone.html' }
        ],
        description: 'Sign out to login screen',
        category: 'session'
    },
    'open explore': {
        steps: [
            { action: 'navigate', url: 'Explore.html' }
        ],
        description: 'Open Explore page',
        category: 'navigation'
    },
    'open profile menu': {
        steps: [
            { action: 'click', selector: '.nl-avatar-link' }
        ],
        description: 'Open the new-look profile menu page',
        category: 'profile'
    },
    'switch profile': {
        steps: [
            { action: 'click', selector: '#switchProfileBtn' }
        ],
        description: 'Open the switch-profile popup on the profile menu page',
        category: 'profile'
    },
    'expand user management': {
        steps: [
            { action: 'click', selector: '#userManagementToggle' }
        ],
        description: 'Expand the User Management accordion on the profile menu page',
        category: 'profile'
    },
    'expand authorisations': {
        steps: [
            { action: 'click', selector: '#authorisationsToggle' }
        ],
        description: 'Expand the Authorisations accordion on the profile menu page',
        category: 'profile'
    },
    'sign out': {
        steps: [
            { action: 'click', selector: '#signOutLink' }
        ],
        description: 'Sign out from the profile menu page',
        category: 'session'
    }
    ,
    'open transfers': {
        steps: [
            { action: 'click', selector: '#transact' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#transfer' }
        ],
        description: 'Open the Transfers hub (new look)',
        category: 'payments'
    },
    'new transfer': {
        steps: [
            { action: 'click', selector: '#transact' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#transfer' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#transfers-hub-new' }
        ],
        description: 'Move money between your own accounts (new look)',
        category: 'payments'
    },
    'open payments': {
        steps: [
            { action: 'click', selector: '#transact' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#payment' }
        ],
        description: 'Open the Payments hub (new look)',
        category: 'payments'
    },
    'once-off payment new look': {
        steps: [
            { action: 'click', selector: '#transact' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#payment' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#pay-hub-onceoff' }
        ],
        description: 'Once-off payment chooser (new look)',
        category: 'payments'
    },
    'pay a bank account': {
        steps: [
            { action: 'click', selector: '#transact' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#payment' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#pay-hub-onceoff' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#onceoff-bank' }
        ],
        description: 'Pay a bank account (new look)',
        category: 'payments'
    },
    'pay a public beneficiary': {
        steps: [
            { action: 'click', selector: '#transact' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#payment' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#pay-hub-onceoff' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#onceoff-public' }
        ],
        description: 'Pay a public beneficiary (new look)',
        category: 'payments'
    },
    'multiple beneficiaries': {
        steps: [
            { action: 'click', selector: '#transact' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#payment' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#pay-hub-multiple' }
        ],
        description: 'Saved group or multiple-beneficiary payments (new look)',
        category: 'beneficiaries'
    },
    'manage beneficiary groups': {
        steps: [
            { action: 'click', selector: '#transact' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#payment' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#pay-hub-multiple' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#multi-saved-group' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#ben-group-pay-search' }
        ],
        description: 'Add or manage beneficiary groups (new look)',
        category: 'beneficiaries'
    },
    'authorisation settings': {
        steps: [
            { action: 'click', selector: '#transact' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#payment' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#pay-hub-auth' }
        ],
        description: 'Who must approve beneficiary changes (new look)',
        category: 'settings'
    },
    'manage beneficiaries new look': {
        steps: [
            { action: 'click', selector: '#transact' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#beneficiaries' }
        ],
        description: 'Open Beneficiaries (new look)',
        category: 'beneficiaries'
    },
    'card settings': {
        steps: [
            { action: 'click', selector: '#cards' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '.cd-card-row:first-child' }
        ],
        description: 'Open card settings for the first card (new look)',
        category: 'cards'
    },
    'card limits new look': {
        steps: [
            { action: 'click', selector: '#cards' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '.cd-card-row:first-child' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#cd-card-limits-row' }
        ],
        description: 'Update card limits (new look)',
        category: 'cards'
    },
    'stop card': {
        steps: [
            { action: 'click', selector: '#cards' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '.cd-card-row:first-child' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#cd-stop-card-row' }
        ],
        description: 'Stop a card (new look)',
        category: 'cards'
    },
    'add to apple wallet': {
        steps: [
            { action: 'click', selector: '#cards' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '.cd-card-row:first-child' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#cd-apple-wallet-row' }
        ],
        description: 'Add a card to Apple Wallet (new look)',
        category: 'cards'
    },
    'open savings account': {
        steps: [
            { action: 'navigate', url: 'Savings-account.html' }
        ],
        description: 'Open the Savings/Investment account opening wizard',
        category: 'products'
    },
    'open card machines': {
        steps: [
            { action: 'navigate', url: 'Card-machines.html' }
        ],
        description: 'Open the Card Machines product page',
        category: 'products'
    },
    'open credit': {
        steps: [
            { action: 'navigate', url: 'Credit.html' }
        ],
        description: 'Open the Credit page',
        category: 'products'
    },
    'contact support': {
        steps: [
            { action: 'navigate', url: 'Support.html?from=business' }
        ],
        description: 'Contact Client Care / in-app calling',
        category: 'assistance'
    }
    ,
    'open globalone home': {
        steps: [
            { action: 'navigate', url: 'GlobalOne-Home.html' }
        ],
        description: 'Open GlobalOne personal banking home',
        category: 'globalone'
    },
    'open globalone cards': {
        steps: [
            { action: 'navigate', url: 'GlobalOne-Cards.html' }
        ],
        description: 'Open GlobalOne Cards tab',
        category: 'globalone'
    },
    'open globalone transact': {
        steps: [
            { action: 'navigate', url: 'GlobalOne-Transact.html' }
        ],
        description: 'Open GlobalOne Transact tab',
        category: 'globalone'
    },
    'open globalone profile': {
        steps: [
            { action: 'navigate', url: 'GlobalOne-Profile.html' }
        ],
        description: 'Open GlobalOne profile menu',
        category: 'globalone'
    },
    'view personal card details': {
        steps: [
            { action: 'navigate', url: 'GlobalOne-Cards.html' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#goCardDetailsToggle' }
        ],
        description: 'Show personal debit card number and CVV',
        category: 'globalone'
    },
    'freeze personal card': {
        steps: [
            { action: 'navigate', url: 'GlobalOne-Cards.html' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#goFreezeToggle' }
        ],
        description: 'Freeze the GlobalOne debit card',
        category: 'globalone'
    },
    'search personal transactions': {
        steps: [
            { action: 'navigate', url: 'GlobalOne-Transact.html' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#goAccSearch' }
        ],
        description: 'Search GlobalOne account transactions',
        category: 'globalone'
    },
    'get insurance cover': {
        steps: [
            { action: 'navigate', url: 'GlobalOne-Home.html' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: 'a[href="GlobalOne-Insure.html"]' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#goGetCover' }
        ],
        description: 'Open Insure and get cover',
        category: 'globalone'
    },
    'view globalone rewards': {
        steps: [
            { action: 'navigate', url: 'GlobalOne-Rewards.html' }
        ],
        description: 'Open GlobalOne Rewards',
        category: 'globalone'
    },
    'sign out globalone': {
        steps: [
            { action: 'navigate', url: 'GlobalOne-Profile.html' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#goSignOut' }
        ],
        description: 'Sign out of GlobalOne',
        category: 'globalone'
    }
    ,
    'open an account': {
        steps: [
            { action: 'click', selector: '#robOpenAccountOpt' },
            { action: 'wait', duration: 500 },
            { action: 'click', selector: '#robBusinessOpt' },
            { action: 'wait', duration: 500 },
            { action: 'click', selector: '#robGetStarted' },
            { action: 'wait', duration: 1800 }
        ],
        description: 'Start opening a business account (ROB)',
        category: 'rob'
    },
    'start new business application': {
        steps: [
            { action: 'click', selector: '#robOpenAccountOpt' },
            { action: 'wait', duration: 500 },
            { action: 'click', selector: '#robBusinessOpt' },
            { action: 'wait', duration: 500 },
            { action: 'click', selector: '#robGetStarted' },
            { action: 'wait', duration: 1800 },
            { action: 'click', selector: '#robStartNewApplication' }
        ],
        description: 'Open a business account and start a new application (ROB)',
        category: 'rob'
    },
    'choose business type': {
        steps: [
            { action: 'click', selector: '#robOpenAccountOpt' },
            { action: 'wait', duration: 500 },
            { action: 'click', selector: '#robBusinessOpt' },
            { action: 'wait', duration: 500 },
            { action: 'click', selector: '#robGetStarted' },
            { action: 'wait', duration: 1800 },
            { action: 'click', selector: '#robStartNewApplication' },
            { action: 'wait', duration: 500 }
        ],
        description: 'Go to the choose-a-business-type screen (ROB)',
        category: 'rob'
    }

};

export const computerCommands = {
    'pay saved beneficiary': {
        steps: [
            { action: 'click', selector: '#transacts'},
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#payments' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#saved-payment-btn' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#saved-beneficiary' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '.beneficiary-card:first-child' },
            { action: 'wait', duration: 1000 },
            { action: 'setValue', selector: '#amount', value: '100' },
            { action: 'wait', duration: 1000 },
            { action: 'setValue', selector: '#reference', value: 'Automated payment' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '.submit-payment-btn' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#done-button' }
        ],
        description: 'Initiate payment to a saved beneficiary',
        category: 'payments'
    },
    'add new beneficiary': {
        steps: [
            {action: 'click', selector: '#transacts'},
            { action: 'wait', duration: 1000 },
            {action: 'click', selector: '#payments'},
            { action: 'click', selector: '#create-beneficiary-btn' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '[data-type="beneficiary"]' }
        ],
        description: 'Add a new beneficiary',
        category: 'beneficiaries'
    },
    'view transactions': {
        steps: [
            { action: 'click', selector: '#btn-transactions' }
        ],
        description: 'View transaction history',
        category: 'navigation'
    },
    'make once off payment': {
        steps: [
            {action: 'click', selector: '#transact'},
            { action: 'click', selector: '#payment' },
            { action: 'wait', duration: 1000 },
            { action: 'click', selector: '#onceoff-beneficiary-option' }
        ],
        description: 'Make a once-off payment',
        category: 'payments'
    },
    'go to account': {
        steps: [
            { action: 'navigate', url: 'Accounts.html' }
        ],
        description: 'View Accounts',
        category: 'navigation',
        preventReloop: true
    },
    'open payments': {
        steps: [
            { action: 'navigate', url: 'transact.html' }
        ],
        description: 'Open Payments page',
        category: 'navigation'
    },
    'open transfers': {
        steps: [
            { action: 'navigate', url: 'transfer.html' }
        ],
        description: 'Open Transfers page',
        category: 'navigation'
    },
    'open beneficiaries': {
        steps: [
            { action: 'navigate', url: 'Add-benficiaries.html' }
        ],
        description: 'Open Beneficiaries page',
        category: 'navigation'
    },
    'open cards': {
        steps: [
            { action: 'navigate', url: 'Cards.html' }
        ],
        description: 'Open Cards page',
        category: 'navigation'
    },
    'open documents': {
        steps: [
            { action: 'navigate', url: 'Computer-Document.html' }
        ],
        description: 'Open Documents page',
        category: 'navigation'
    },
    'open settings': {
        steps: [
            { action: 'navigate', url: 'settings.html' }
        ],
        description: 'Open Settings page',
        category: 'navigation'
    },
    'open secure messages': {
        steps: [
            { action: 'navigate', url: 'Secure-Messages.html' }
        ],
        description: 'Open Secure Messages page',
        category: 'navigation'
    },
    'open user management': {
        steps: [
            { action: 'navigate', url: 'user-management.html' }
        ],
        description: 'Open User Management page',
        category: 'navigation'
    },
    'open products and services': {
        steps: [
            { action: 'navigate', url: 'Product&Services.html' }
        ],
        description: 'Open Products & Services page',
        category: 'navigation'
    },
    'open home': {
        steps: [
            { action: 'navigate', url: 'Computer.html' }
        ],
        description: 'Open Home dashboard',
        category: 'navigation'
    }
};

/**
 * @param {'app'|'computer'} context
 * @returns {typeof appCommands}
 */
export function getDefaultCommands(context = 'app') {
    return context === 'computer' ? computerCommands : appCommands;
}