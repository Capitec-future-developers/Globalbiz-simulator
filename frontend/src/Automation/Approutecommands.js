// Command set built directly from App.jsx's <Route> paths. Since this is a
// React Router SPA, page-to-page "commands" are just a navigate step to the
// matching path (handled client-side via onNavigate, no full reload) rather
// than the click-chains the original multi-page-HTML scripts used.
//
// A few commands (marked TODO below) still need a follow-up 'click' step
// once you tell me the actual element ids/classes on those pages — e.g.
// which selector picks "the first saved beneficiary" on SavedBeneficiaryList.
// Until then those commands just navigate to the right screen and stop there.

export const appRouteCommands = {
    'go to landing': {
        steps: [{ action: 'navigate', url: '/Landing' }],
        description: 'Open the landing page',
        category: 'navigation',
    },
    'go to home': {
        steps: [{ action: 'navigate', url: '/home' }],
        description: 'Open the dashboard/home screen',
        category: 'navigation',
    },
    'view accounts': {
        steps: [{ action: 'navigate', url: '/accounts' }],
        description: 'Open the accounts list',
        category: 'navigation',
    },
    'open transact hub': {
        steps: [{ action: 'navigate', url: '/transact' }],
        description: 'Open the Transact hub',
        category: 'navigation',
    },
    'new transfer': {
        steps: [{ action: 'navigate', url: '/transact/transfer' }],
        description: 'Move money between your own accounts',
        category: 'payments',
    },
    'open payments': {
        steps: [{ action: 'navigate', url: '/transact/payments' }],
        description: 'Open the Payments hub',
        category: 'payments',
    },
    'make once off payment': {
        steps: [{ action: 'navigate', url: '/transact/payments/once-off' }],
        description: 'Start a once-off payment',
        category: 'payments',
    },
    'pay saved beneficiary': {
        steps: [
            { action: 'navigate', url: '/transact/payments/saved' },
            // TODO: add a click step here once you share SavedBeneficiaryList's
            // markup, e.g. { action: 'click', selector: '.beneficiary-row:first-child' }
        ],
        description: 'Pay a saved beneficiary',
        category: 'payments',
    },
    'manage beneficiaries': {
        steps: [{ action: 'navigate', url: '/transact/beneficiaries' }],
        description: 'Open the Beneficiaries hub',
        category: 'beneficiaries',
    },
    'open cards': {
        steps: [{ action: 'navigate', url: '/cards' }],
        description: 'Open the Cards page',
        category: 'cards',
    },
    'open explore': {
        steps: [{ action: 'navigate', url: '/explore' }],
        description: 'Open Explore',
        category: 'navigation',
    },
    'open credit': {
        steps: [{ action: 'navigate', url: '/explore/credit' }],
        description: 'Open the Credit page',
        category: 'products',
    },
    'open card machines': {
        steps: [{ action: 'navigate', url: '/explore/card-machines' }],
        description: 'Open the Card Machines page',
        category: 'products',
    },
    'open savings account': {
        steps: [{ action: 'navigate', url: '/explore/savings' }],
        description: 'Open the Savings/Investment account wizard',
        category: 'products',
    },
    'open documents': {
        steps: [{ action: 'navigate', url: '/documents' }],
        description: 'Open Documents',
        category: 'documents',
    },
    'view profile': {
        steps: [{ action: 'navigate', url: '/profile' }],
        description: 'Open the profile page',
        category: 'profile',
    },
    'contact support': {
        steps: [{ action: 'navigate', url: '/support' }],
        description: 'Open Support / Client Care',
        category: 'assistance',
    },
    'open online banking': {
        steps: [{ action: 'navigate', url: '/online-banking' }],
        description: 'Open the desktop Online Banking app',
        category: 'navigation',
    },
    'sign in': {
        steps: [{ action: 'navigate', url: '/Sign-In' }],
        description: 'Open the sign-in screen',
        category: 'session',
    },
};