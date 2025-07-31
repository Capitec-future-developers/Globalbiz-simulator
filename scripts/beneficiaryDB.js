// beneficiaryDB.js
const BeneficiaryDB = (function() {
    let db;
    const DB_NAME = 'BankAppDB';
    const STORE_NAME = 'beneficiaries';
    const DB_VERSION = 2; // Increment version if schema changes

// Initialize the database
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

// Create indexes
                    store.createIndex('by_nickname', 'nickname', { unique: false });
                    store.createIndex('by_bank', 'bank', { unique: false });
                    store.createIndex('by_accountNumber', 'accountNumber', { unique: true });
                }
            };
        });
    }

// Add other DB functions (add, get, update, delete, search) here...
// ... (include all the functions from the previous IndexedDB implementation)

    return {
        initDB,
        addBeneficiary,
        getAllBeneficiaries,
        getBeneficiary,
        updateBeneficiary,
        deleteBeneficiary,
        searchBeneficiaries
    };
})();

// Initialize when the script loads
(async function() {
    try {
        await BeneficiaryDB.initDB();
        console.log("Beneficiary database initialized");
    } catch (error) {
        console.error("Failed to initialize beneficiary database:", error);
    }
})();

export default BeneficiaryDB;