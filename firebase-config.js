// Firebase Configuration Template
// Replace these values with your actual Firebase project credentials

const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    databaseURL: "https://YOUR_PROJECT_ID.firebaseio.com"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase services
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// ========== AUTHENTICATION FUNCTIONS ==========

// Register new user
async function registerUser(email, password, userData) {
    try {
        const userCredential = await auth.createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;
        
        // Store additional user data in Firestore
        await db.collection('users').doc(user.uid).set({
            uid: user.uid,
            email: email,
            username: userData.username,
            phone: userData.phone,
            freefire: userData.freefire || null,
            pubg: userData.pubg || null,
            balance: 0,
            totalWins: 0,
            totalEarnings: 0,
            tournamentsJoined: 0,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        return { success: true, user: user };
    } catch (error) {
        console.error('Registration error:', error);
        return { success: false, error: error.message };
    }
}

// Login user
async function loginUser(email, password) {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        return { success: true, user: userCredential.user };
    } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: error.message };
    }
}

// Logout user
async function logoutUser() {
    try {
        await auth.signOut();
        return { success: true };
    } catch (error) {
        console.error('Logout error:', error);
        return { success: false, error: error.message };
    }
}

// ========== USER DATA FUNCTIONS ==========

// Get user data
async function getUserData(uid) {
    try {
        const doc = await db.collection('users').doc(uid).get();
        if (doc.exists) {
            return { success: true, data: doc.data() };
        } else {
            return { success: false, error: 'User not found' };
        }
    } catch (error) {
        console.error('Error getting user data:', error);
        return { success: false, error: error.message };
    }
}

// Update user data
async function updateUserData(uid, data) {
    try {
        await db.collection('users').doc(uid).update(data);
        return { success: true };
    } catch (error) {
        console.error('Error updating user data:', error);
        return { success: false, error: error.message };
    }
}

// ========== WALLET FUNCTIONS ==========

// Add money to wallet
async function addMoneyToWallet(uid, amount, transactionId) {
    try {
        const userRef = db.collection('users').doc(uid);
        
        await db.runTransaction(async (transaction) => {
            const userDoc = await transaction.get(userRef);
            if (!userDoc.exists) {
                throw new Error('User not found');
            }
            
            const currentBalance = userDoc.data().balance || 0;
            const newBalance = currentBalance + amount;
            
            transaction.update(userRef, { balance: newBalance });
            
            // Add transaction record
            transaction.set(db.collection('transactions').doc(), {
                userId: uid,
                type: 'credit',
                amount: amount,
                description: 'Wallet Recharge',
                transactionId: transactionId,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        });
        
        return { success: true };
    } catch (error) {
        console.error('Error adding money:', error);
        return { success: false, error: error.message };
    }
}

// Withdraw money from wallet
async function withdrawMoney(uid, amount, upiId) {
    try {
        const userRef = db.collection('users').doc(uid);
        
        const result = await db.runTransaction(async (transaction) => {
            const userDoc = await transaction.get(userRef);
            if (!userDoc.exists) {
                throw new Error('User not found');
            }
            
            const currentBalance = userDoc.data().balance || 0;
            if (currentBalance < amount) {
                throw new Error('Insufficient balance');
            }
            
            if (amount < 100) {
                throw new Error('Minimum withdrawal amount is ₹100');
            }
            
            const newBalance = currentBalance - amount;
            transaction.update(userRef, { balance: newBalance });
            
            // Create withdrawal request
            transaction.set(db.collection('withdrawals').doc(), {
                userId: uid,
                amount: amount,
                upiId: upiId,
                status: 'pending',
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            // Add transaction record
            transaction.set(db.collection('transactions').doc(), {
                userId: uid,
                type: 'debit',
                amount: amount,
                description: 'Withdrawal Request',
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        });
        
        return { success: true };
    } catch (error) {
        console.error('Error withdrawing money:', error);
        return { success: false, error: error.message };
    }
}

// Get transaction history
async function getTransactions(uid, limit = 10) {
    try {
        const snapshot = await db.collection('transactions')
            .where('userId', '==', uid)
            .orderBy('timestamp', 'desc')
            .limit(limit)
            .get();
        
        const transactions = [];
        snapshot.forEach(doc => {
            transactions.push({ id: doc.id, ...doc.data() });
        });
        
        return { success: true, transactions: transactions };
    } catch (error) {
        console.error('Error getting transactions:', error);
        return { success: false, error: error.message };
    }
}

// ========== TOURNAMENT FUNCTIONS ==========

// Create tournament
async function createTournament(tournamentData) {
    try {
        const docRef = await db.collection('tournaments').add({
            ...tournamentData,
            players: [],
            status: 'upcoming',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        return { success: true, tournamentId: docRef.id };
    } catch (error) {
        console.error('Error creating tournament:', error);
        return { success: false, error: error.message };
    }
}

// Join tournament
async function joinTournament(uid, tournamentId) {
    try {
        const tournamentRef = db.collection('tournaments').doc(tournamentId);
        const userRef = db.collection('users').doc(uid);
        
        await db.runTransaction(async (transaction) => {
            const tournamentDoc = await transaction.get(tournamentRef);
            const userDoc = await transaction.get(userRef);
            
            if (!tournamentDoc.exists || !userDoc.exists) {
                throw new Error('Tournament or user not found');
            }
            
            const tournament = tournamentDoc.data();
            const user = userDoc.data();
            
            // Check if tournament is full
            if (tournament.players.length >= tournament.maxPlayers) {
                throw new Error('Tournament is full');
            }
            
            // Check if user has enough balance
            if (user.balance < tournament.entryFee) {
                throw new Error('Insufficient balance');
            }
            
            // Check if user already joined
            if (tournament.players.includes(uid)) {
                throw new Error('Already joined this tournament');
            }
            
            // Deduct entry fee
            const newBalance = user.balance - tournament.entryFee;
            transaction.update(userRef, { 
                balance: newBalance,
                tournamentsJoined: (user.tournamentsJoined || 0) + 1
            });
            
            // Add player to tournament
            transaction.update(tournamentRef, {
                players: firebase.firestore.FieldValue.arrayUnion(uid)
            });
            
            // Add transaction record
            transaction.set(db.collection('transactions').doc(), {
                userId: uid,
                type: 'debit',
                amount: tournament.entryFee,
                description: `Tournament Entry - ${tournament.title}`,
                tournamentId: tournamentId,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        });
        
        return { success: true };
    } catch (error) {
        console.error('Error joining tournament:', error);
        return { success: false, error: error.message };
    }
}

// Get tournaments
async function getTournaments(status = 'all') {
    try {
        let query = db.collection('tournaments');
        
        if (status !== 'all') {
            query = query.where('status', '==', status);
        }
        
        const snapshot = await query.orderBy('createdAt', 'desc').get();
        
        const tournaments = [];
        snapshot.forEach(doc => {
            tournaments.push({ id: doc.id, ...doc.data() });
        });
        
        return { success: true, tournaments: tournaments };
    } catch (error) {
        console.error('Error getting tournaments:', error);
        return { success: false, error: error.message };
    }
}

// Update tournament result
async function updateTournamentResult(tournamentId, results) {
    try {
        // results = [{ uid, position, prize }, ...]
        const batch = db.batch();
        
        // Update tournament status
        const tournamentRef = db.collection('tournaments').doc(tournamentId);
        batch.update(tournamentRef, { status: 'completed', results: results });
        
        // Update user balances and stats
        for (const result of results) {
            const userRef = db.collection('users').doc(result.uid);
            const userDoc = await userRef.get();
            const userData = userDoc.data();
            
            batch.update(userRef, {
                balance: (userData.balance || 0) + result.prize,
                totalWins: result.position === 1 ? (userData.totalWins || 0) + 1 : userData.totalWins,
                totalEarnings: (userData.totalEarnings || 0) + result.prize
            });
            
            // Add transaction
            const transactionRef = db.collection('transactions').doc();
            batch.set(transactionRef, {
                userId: result.uid,
                type: 'credit',
                amount: result.prize,
                description: `Tournament Prize - Position ${result.position}`,
                tournamentId: tournamentId,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        }
        
        await batch.commit();
        return { success: true };
    } catch (error) {
        console.error('Error updating tournament result:', error);
        return { success: false, error: error.message };
    }
}

// ========== ADMIN FUNCTIONS ==========

// Get all users
async function getAllUsers() {
    try {
        const snapshot = await db.collection('users').get();
        const users = [];
        snapshot.forEach(doc => {
            users.push({ id: doc.id, ...doc.data() });
        });
        return { success: true, users: users };
    } catch (error) {
        console.error('Error getting users:', error);
        return { success: false, error: error.message };
    }
}

// Get pending withdrawals
async function getPendingWithdrawals() {
    try {
        const snapshot = await db.collection('withdrawals')
            .where('status', '==', 'pending')
            .orderBy('createdAt', 'desc')
            .get();
        
        const withdrawals = [];
        snapshot.forEach(doc => {
            withdrawals.push({ id: doc.id, ...doc.data() });
        });
        
        return { success: true, withdrawals: withdrawals };
    } catch (error) {
        console.error('Error getting withdrawals:', error);
        return { success: false, error: error.message };
    }
}

// Approve withdrawal
async function approveWithdrawal(withdrawalId) {
    try {
        await db.collection('withdrawals').doc(withdrawalId).update({
            status: 'approved',
            approvedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        return { success: true };
    } catch (error) {
        console.error('Error approving withdrawal:', error);
        return { success: false, error: error.message };
    }
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        registerUser,
        loginUser,
        logoutUser,
        getUserData,
        updateUserData,
        addMoneyToWallet,
        withdrawMoney,
        getTransactions,
        createTournament,
        joinTournament,
        getTournaments,
        updateTournamentResult,
        getAllUsers,
        getPendingWithdrawals,
        approveWithdrawal
    };
}
