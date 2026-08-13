const STORAGE_KEY = 'nlBeneficiaries';

const DEFAULTS = [
    { id: 'ben_1', name: 'Thabo Nkosi', nickname: 'Thabo', bank: 'Capitec Bank', accountNumber: '1234567890', type: 'own' },
    { id: 'ben_2', name: 'Lindiwe Mkhize', nickname: 'Lindiwe', bank: 'FNB', accountNumber: '9876543210', type: 'own', lastPaidAmount: 350.00, lastPaidDate: '2026-07-18' },
    { id: 'ben_3', name: 'City Power', nickname: 'Electricity Bill', bank: 'ABSA', accountNumber: '876543210', type: 'public' },
    { id: 'ben_default_zola', name: 'Zola Nene', nickname: 'Zola Nene', bank: 'Standard Bank', accountNumber: '1052270042', type: 'own', isDefault: true }
];

export function getBeneficiaries() {
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

export function addBeneficiary(beneficiary) {
    const list = getBeneficiaries();
    const withId = { ...beneficiary, id: 'ben_' + Date.now() };
    list.push(withId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return withId;
}

export function removeBeneficiary(id) {
    const list = getBeneficiaries().filter((b) => b.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return list;
}

export function updateBeneficiary(id, patch) {
    const list = getBeneficiaries();
    const index = list.findIndex((b) => b.id === id);
    if (index === -1) return null;
    list[index] = { ...list[index], ...patch };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return list[index];
}
