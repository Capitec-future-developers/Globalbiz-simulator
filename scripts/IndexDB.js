// Database Service Module
const BeneficiaryDB = (function() {
    let db;
    const DB_NAME = 'BankAppDB';
    const STORE_NAME = 'beneficiaries';
    const DB_VERSION = 1;

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

// Create indexes for efficient querying
                    store.createIndex('by_nickname', 'nickname', { unique: false });
                    store.createIndex('by_bank', 'bank', { unique: false });
                    store.createIndex('by_accountNumber', 'accountNumber', { unique: true });
                }
            };
        });
    }

// Add a new beneficiary
    async function addBeneficiary(beneficiary) {
        if (!db) await initDB();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);

// Generate a unique ID
            beneficiary.id = `ben_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
            beneficiary.createdAt = new Date().toISOString();
            beneficiary.updatedAt = new Date().toISOString();

            const request = store.add(beneficiary);

            request.onsuccess = () => resolve(beneficiary);
            request.onerror = (event) => {
                console.error("Error adding beneficiary:", event.target.error);
                reject(event.target.error);
            };
        });
    }

// Get all beneficiaries
    async function getAllBeneficiaries() {
        if (!db) await initDB();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = (event) => {
                console.error("Error getting beneficiaries:", event.target.error);
                reject(event.target.error);
            };
        });
    }

// Get beneficiary by ID
    async function getBeneficiary(id) {
        if (!db) await initDB();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.get(id);

            request.onsuccess = () => resolve(request.result);
            request.onerror = (event) => {
                console.error("Error getting beneficiary:", event.target.error);
                reject(event.target.error);
            };
        });
    }

// Update a beneficiary
    async function updateBeneficiary(id, updates) {
        if (!db) await initDB();

        return new Promise(async (resolve, reject) => {
// First get the existing beneficiary
            const existing = await getBeneficiary(id);
            if (!existing) {
                reject(new Error("Beneficiary not found"));
                return;
            }

            const updatedBeneficiary = {
                ...existing,
                ...updates,
                updatedAt: new Date().toISOString()
            };

            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.put(updatedBeneficiary);

            request.onsuccess = () => resolve(updatedBeneficiary);
            request.onerror = (event) => {
                console.error("Error updating beneficiary:", event.target.error);
                reject(event.target.error);
            };
        });
    }

// Delete a beneficiary
    async function deleteBeneficiary(id) {
        if (!db) await initDB();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readwrite');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.delete(id);

            request.onsuccess = () => resolve(true);
            request.onerror = (event) => {
                console.error("Error deleting beneficiary:", event.target.error);
                reject(event.target.error);
            };
        });
    }

// Search beneficiaries by nickname or account number
    async function searchBeneficiaries(query) {
        if (!db) await initDB();

        return new Promise((resolve, reject) => {
            const transaction = db.transaction([STORE_NAME], 'readonly');
            const store = transaction.objectStore(STORE_NAME);
            const request = store.getAll();

            request.onsuccess = () => {
                const results = request.result.filter(ben => {
                    return (
                        ben.nickname?.toLowerCase().includes(query.toLowerCase()) ||
                        ben.name?.toLowerCase().includes(query.toLowerCase()) ||
                        ben.accountNumber?.includes(query)
                    );
                });
                resolve(results);
            };

            request.onerror = (event) => {
                console.error("Error searching beneficiaries:", event.target.error);
                reject(event.target.error);
            };
        });
    }

// Export public methods
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

// Usage Examples
(async function() {
    try {
// Initialize the database
        await BeneficiaryDB.initDB();

// Add a new beneficiary
        const newBeneficiary = await BeneficiaryDB.addBeneficiary({
            name: "John Doe",
            accountNumber: "123456789",
            bank: "Standard Bank",
            nickname: "John's Savings"
        });
        console.log("Added beneficiary:", newBeneficiary);

// Get all beneficiaries
        const allBeneficiaries = await BeneficiaryDB.getAllBeneficiaries();
        console.log("All beneficiaries:", allBeneficiaries);

// Update a beneficiary
        const updatedBeneficiary = await BeneficiaryDB.updateBeneficiary(newBeneficiary.id, {
            nickname: "John's Main Account"
        });
        console.log("Updated beneficiary:", updatedBeneficiary);

// Search beneficiaries
        const searchResults = await BeneficiaryDB.searchBeneficiaries("John");
        console.log("Search results:", searchResults);

// Delete a beneficiary
        const deletionResult = await BeneficiaryDB.deleteBeneficiary(newBeneficiary.id);
        console.log("Deletion result:", deletionResult);

    } catch (error) {
        console.error("Database operation failed:", error);
    }
})();