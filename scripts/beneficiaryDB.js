const BeneficiaryDB = (function() {
    let db;
    const DB_NAME = 'BankAppDB';
    const STORE_NAME = 'beneficiaries';
    const DB_VERSION = 2;

    async function initDB() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(DB_NAME, DB_VERSION);

            request.onerror = (event) => {
                console.error("Database error:", event.target.error);
                reject(event.target.error);
            };

            request.onsuccess = (event) => {
                db = event.target.result;
                resolve(db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(STORE_NAME)) {
                    const store = db.createObjectStore(STORE_NAME, {
                        keyPath: 'id',
                        autoIncrement: false
                    });

                    store.createIndex('by_nickname', 'nickname', { unique: false });
                    store.createIndex('by_bank', 'bank', { unique: false });
                    store.createIndex('by_accountNumber', 'accountNumber', { unique: true });
                }
            };
        });
    }

    async function addBeneficiary(beneficiary) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.add(beneficiary);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async function getAllBeneficiaries() {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async function getBeneficiary(id) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.get(id);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async function updateBeneficiary(beneficiary) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.put(beneficiary);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async function deleteBeneficiary(id) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.delete(id);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }

    async function searchBeneficiaries(searchTerm) {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.getAll();

            request.onsuccess = () => {
                const results = request.result.filter(beneficiary =>
                    beneficiary.nickname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    beneficiary.accountNumber.includes(searchTerm) ||
                    beneficiary.bank.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    beneficiary.reference.toLowerCase().includes(searchTerm.toLowerCase())
                );
                resolve(results);
            };
            request.onerror = () => reject(request.error);
        });
    }

    // Function to add predefined beneficiaries
    async function addPredefinedBeneficiaries() {
        const predefinedBeneficiaries = [
            {
                id: 'ben_001',
                nickname: 'Capitec Bank',
                accountNumber: '1050933435',
                bank: 'Capitec Bank',
                reference: 'Buhle',
                lastPaymentDate: null,
                lastPaidAmount: 0.00
            },
            {
                id: 'ben_002',
                nickname: 'Car',
                accountNumber: '401597008',
                bank: 'FNB',
                reference: '123rfgy12',
                lastPaymentDate: null,
                lastPaidAmount: 0.00
            },
            {
                id: 'ben_003',
                nickname: 'Kamogelo',
                accountNumber: '1441475271',
                bank: 'Standard Bank',
                reference: 'Money',
                lastPaymentDate: '2024-10-21',
                lastPaidAmount: 1.80
            },
            {
                id: 'ben_004',
                nickname: 'Keneiloe',
                accountNumber: '1139338242',
                bank: 'Nedbank',
                reference: 'Kamo gift',
                lastPaymentDate: '2024-08-20',
                lastPaidAmount: 100.00
            },
            {
                id: 'ben_005',
                nickname: 'MOSSEL BAY MUNI',
                accountNumber: '000000000',
                bank: 'ABSA',
                reference: '12530',
                lastPaymentDate: null,
                lastPaidAmount: 0.00
            },
            {
                id: 'ben_006',
                nickname: 'Omphile Mohlala',
                accountNumber: '1726248885',
                bank: 'Standard Bank',
                reference: 'Ye',
                lastPaymentDate: '2025-02-24',
                lastPaidAmount: 6747.37
            },
            {
                id: 'ben_007',
                nickname: 'Pretty Snacks',
                accountNumber: '1051554110',
                bank: 'Capitec Bank',
                reference: 'For snacks',
                lastPaymentDate: '2024-11-28',
                lastPaidAmount: 30.00
            }
        ];

        try {
            // Check if beneficiaries already exist
            const existing = await getAllBeneficiaries();
            if (existing.length === 0) {
                // Add all predefined beneficiaries
                for (const beneficiary of predefinedBeneficiaries) {
                    await addBeneficiary(beneficiary);
                }
                console.log("Predefined beneficiaries added successfully");
            } else {
                console.log("Beneficiaries already exist in database");
            }
        } catch (error) {
            console.error("Error adding predefined beneficiaries:", error);
        }
    }

    return {
        initDB,
        addBeneficiary,
        getAllBeneficiaries,
        getBeneficiary,
        updateBeneficiary,
        deleteBeneficiary,
        searchBeneficiaries,
        addPredefinedBeneficiaries
    };
})();

// Initialize database and add predefined beneficiaries
(async function() {
    try {
        await BeneficiaryDB.initDB();
        console.log("Beneficiary database initialized");

        // Add predefined beneficiaries on first run
        await BeneficiaryDB.addPredefinedBeneficiaries();
    } catch (error) {
        console.error("Failed to initialize beneficiary database:", error);
    }
})();

export default BeneficiaryDB;