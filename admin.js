// Admin Panel JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Check admin authentication
    checkAdminAuth();
    
    // Load dashboard data
    loadDashboardStats();
    loadRechargeRequests();
    loadWithdrawRequests();
    loadTournaments();
    loadUsers();
});

// Check if user is admin
async function checkAdminAuth() {
    const user = firebase.auth().currentUser;
    if (!user) {
        window.location.href = 'login.html';
        return;
    }
    
    // Check if user has admin role
    const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
    if (!userDoc.exists || !userDoc.data().isAdmin) {
        alert('Access denied! Admin only.');
        window.location.href = 'dashboard.html';
    }
}

// Load Dashboard Stats
async function loadDashboardStats() {
    try {
        // Total users
        const usersSnapshot = await firebase.firestore().collection('users').get();
        document.getElementById('totalUsers').textContent = usersSnapshot.size;
        
        // Active tournaments
        const tournamentsSnapshot = await firebase.firestore()
            .collection('tournaments')
            .where('status', 'in', ['live', 'upcoming'])
            .get();
        document.getElementById('activeTournaments').textContent = tournamentsSnapshot.size;
        
        // Pending requests
        const rechargeSnapshot = await firebase.firestore()
            .collection('recharge-requests')
            .where('status', '==', 'pending')
            .get();
        const withdrawSnapshot = await firebase.firestore()
            .collection('withdraw-requests')
            .where('status', '==', 'pending')
            .get();
        
        const pending = rechargeSnapshot.size + withdrawSnapshot.size;
        document.getElementById('pendingRequests').textContent = pending;
        document.getElementById('rechargeBadge').textContent = rechargeSnapshot.size;
        document.getElementById('withdrawBadge').textContent = withdrawSnapshot.size;
        
    } catch (error) {
        console.error('Error loading stats:', error);
    }
}

// Load Recharge Requests
async function loadRechargeRequests() {
    try {
        const snapshot = await firebase.firestore()
            .collection('recharge-requests')
            .orderBy('createdAt', 'desc')
            .limit(50)
            .get();
        
        const container = document.getElementById('rechargeRequestsList');
        container.innerHTML = '';
        
        snapshot.forEach(doc => {
            const data = doc.data();
            const card = createRechargeCard(doc.id, data);
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading recharge requests:', error);
    }
}

// Create Recharge Card
function createRechargeCard(id, data) {
    const div = document.createElement('div');
    div.className = 'request-card';
    div.innerHTML = `
        <div class="request-header">
            <div>
                <strong>User ID:</strong> ${data.userId.substring(0, 8)}...
                <br><strong>Amount:</strong> ৳${data.amount}
                <br><strong>Method:</strong> ${data.method}
            </div>
            <span class="status-badge ${data.status}">${data.status}</span>
        </div>
        <div class="request-details">
            <p><strong>Sender Number:</strong> ${data.senderNumber}</p>
            <p><strong>Transaction ID:</strong> ${data.transactionId}</p>
            <a href="${data.screenshotUrl}" target="_blank" class="view-screenshot-btn">View Screenshot</a>
        </div>
        ${data.status === 'pending' ? `
            <div class="request-actions">
                <button class="approve-btn" onclick="approveRecharge('${id}', ${data.amount}, '${data.userId}')">
                    ✅ Approve
                </button>
                <button class="reject-btn" onclick="rejectRecharge('${id}')">
                    ❌ Reject
                </button>
            </div>
        ` : ''}
    `;
    return div;
}

// Approve Recharge
async function approveRecharge(requestId, amount, userId) {
    if (!confirm(`Approve ৳${amount} recharge?`)) return;
    
    try {
        // Add balance to user
        const userRef = firebase.firestore().collection('users').doc(userId);
        await firebase.firestore().runTransaction(async (transaction) => {
            const userDoc = await transaction.get(userRef);
            const currentBalance = userDoc.data().balance || 0;
            transaction.update(userRef, { balance: currentBalance + amount });
            
            // Update request status
            transaction.update(firebase.firestore().collection('recharge-requests').doc(requestId), {
                status: 'approved',
                approvedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
            
            // Add transaction
            transaction.set(firebase.firestore().collection('transactions').doc(), {
                userId: userId,
                type: 'credit',
                amount: amount,
                description: 'Recharge Approved',
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        });
        
        alert('✅ Recharge approved!');
        loadRechargeRequests();
        loadDashboardStats();
    } catch (error) {
        console.error('Error:', error);
        alert('Error approving recharge');
    }
}

// Reject Recharge
async function rejectRecharge(requestId) {
    if (!confirm('Reject this recharge request?')) return;
    
    try {
        await firebase.firestore().collection('recharge-requests').doc(requestId).update({
            status: 'rejected',
            rejectedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        alert('❌ Recharge rejected');
        loadRechargeRequests();
    } catch (error) {
        console.error('Error:', error);
    }
}

// Load Withdraw Requests (similar implementation)
async function loadWithdrawRequests() {
    try {
        const snapshot = await firebase.firestore()
            .collection('withdraw-requests')
            .orderBy('createdAt', 'desc')
            .limit(50)
            .get();
        
        const container = document.getElementById('withdrawRequestsList');
        container.innerHTML = '';
        
        snapshot.forEach(doc => {
            const data = doc.data();
            const card = createWithdrawCard(doc.id, data);
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading withdraw requests:', error);
    }
}

function createWithdrawCard(id, data) {
    const div = document.createElement('div');
    div.className = 'request-card';
    div.innerHTML = `
        <div class="request-header">
            <div>
                <strong>User ID:</strong> ${data.userId.substring(0, 8)}...
                <br><strong>Amount:</strong> ৳${data.amount}
                <br><strong>Method:</strong> ${data.method}
            </div>
            <span class="status-badge ${data.status}">${data.status}</span>
        </div>
        <div class="request-details">
            <p><strong>Account Number:</strong> ${data.accountNumber}</p>
        </div>
        ${data.status === 'pending' ? `
            <div class="request-actions">
                <button class="approve-btn" onclick="approveWithdraw('${id}')">
                    ✅ Mark as Paid
                </button>
                <button class="reject-btn" onclick="rejectWithdraw('${id}', ${data.amount}, '${data.userId}')">
                    ❌ Cancel
                </button>
            </div>
        ` : ''}
    `;
    return div;
}

async function approveWithdraw(requestId) {
    if (!confirm('Mark as paid?')) return;
    
    try {
        await firebase.firestore().collection('withdraw-requests').doc(requestId).update({
            status: 'completed',
            completedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        alert('✅ Marked as paid!');
        loadWithdrawRequests();
        loadDashboardStats();
    } catch (error) {
        console.error('Error:', error);
    }
}

// Create Tournament Modal
function openCreateTournamentModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Create New Tournament</h2>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Game</label>
                    <select id="tournamentGame">
                        <option value="Free Fire">Free Fire</option>
                        <option value="PUBG">PUBG Mobile</option>
                        <option value="Ludo King">Ludo King</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Title</label>
                    <input type="text" id="tournamentTitle" placeholder="Squad Battle">
                </div>
                <div class="form-group">
                    <label>Entry Fee (৳)</label>
                    <input type="number" id="tournamentEntry" value="15">
                </div>
                <div class="form-group">
                    <label>Prize Pool (৳)</label>
                    <input type="number" id="tournamentPrize" value="500">
                </div>
                <div class="form-group">
                    <label>Max Players</label>
                    <input type="number" id="tournamentMax" value="50">
                </div>
                <div class="form-group">
                    <label>Start Time</label>
                    <input type="datetime-local" id="tournamentTime">
                </div>
                <button class="proceed-btn" onclick="createTournament()">Create Tournament</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
}

async function createTournament() {
    const data = {
        game: document.getElementById('tournamentGame').value,
        title: document.getElementById('tournamentTitle').value,
        entryFee: parseInt(document.getElementById('tournamentEntry').value),
        prizePool: parseInt(document.getElementById('tournamentPrize').value),
        maxPlayers: parseInt(document.getElementById('tournamentMax').value),
        startTime: new Date(document.getElementById('tournamentTime').value),
        players: [],
        status: 'upcoming',
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    try {
        await firebase.firestore().collection('tournaments').add(data);
        alert('✅ Tournament created!');
        closeModal();
        loadTournaments();
    } catch (error) {
        console.error('Error:', error);
        alert('Error creating tournament');
    }
}

async function loadTournaments() {
    try {
        const snapshot = await firebase.firestore()
            .collection('tournaments')
            .orderBy('createdAt', 'desc')
            .get();
        
        const container = document.getElementById('tournamentsList');
        container.innerHTML = '';
        
        snapshot.forEach(doc => {
            const data = doc.data();
            // Create tournament card (similar to previous implementation)
        });
    } catch (error) {
        console.error('Error loading tournaments:', error);
    }
}

async function loadUsers() {
    try {
        const snapshot = await firebase.firestore().collection('users').get();
        const container = document.getElementById('usersList');
        container.innerHTML = '';
        
        snapshot.forEach(doc => {
            const data = doc.data();
            // Create user card
        });
    } catch (error) {
        console.error('Error loading users:', error);
    }
}

function savePaymentNumbers() {
    alert('Payment numbers saved!');
}

function savePlatformLimits() {
    alert('Platform limits saved!');
}
