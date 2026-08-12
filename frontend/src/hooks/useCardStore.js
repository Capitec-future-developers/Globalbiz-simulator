const STORAGE_KEY = 'nlCards';

const DEFAULTS = [
    {
        id: 'virtual',
        type: 'Virtual',
        kind: 'debit',
        numberMasked: '**** 0155',
        numberFull: '4016 0001 0212 0155',
        securityCode: '279',
        validThru: '04/31',
        bank: 'Zenzi Digital',
        holder: 'MS Z DUBE',
        status: 'active',
        frozen: false,
        international: true,
        limits: { perTransaction: 1000, daily: 10000, monthly: 10000 }
    },
    {
        id: 'debit',
        type: 'Debit',
        kind: 'debit',
        numberMasked: '**** 3734',
        numberFull: '4016 0007 8821 3734',
        securityCode: '104',
        validThru: '09/29',
        bank: 'Zenzi Digital',
        holder: 'MS Z DUBE',
        status: 'active',
        frozen: false,
        international: true,
        limits: { perTransaction: 5000, daily: 15000, monthly: 50000 }
    }
];

export function getCards() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
        try {
            return JSON.parse(raw);
        } catch (e) {
            /* fall through to reset */
        }
    }
    const fresh = JSON.parse(JSON.stringify(DEFAULTS));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
    return fresh;
}

function saveCards(cards) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
    return cards;
}

export function setCardFrozen(id, frozen) {
    const cards = getCards();
    const card = cards.find((c) => c.id === id);
    if (!card) return cards;
    card.frozen = frozen;
    return saveCards(cards);
}

export function setCardInternational(id, international) {
    const cards = getCards();
    const card = cards.find((c) => c.id === id);
    if (!card) return cards;
    card.international = international;
    return saveCards(cards);
}

export function setCardLimits(id, limits) {
    const cards = getCards();
    const card = cards.find((c) => c.id === id);
    if (!card) return cards;
    card.limits = { ...card.limits, ...limits };
    return saveCards(cards);
}

export function setCardStatus(id, status) {
    const cards = getCards();
    const card = cards.find((c) => c.id === id);
    if (!card) return cards;
    card.status = status;
    return saveCards(cards);
}
