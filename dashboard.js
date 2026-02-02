// Dashboard JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Navigation
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.content-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const targetSection = item.getAttribute('href').substring(1);
            showSection(targetSection);
            
            // Update active state
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
        });
    });
    
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
    
    // Close sidebar when clicking outside on mobile
    if (mainContent) {
        mainContent.addEventListener('click', () => {
            if (window.innerWidth <= 768 && sidebar.classList.contains('active')) {
                sidebar.classList.remove('active');
            }
        });
    }
    
    // Close sidebar when clicking nav item on mobile
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('active');
            }
        });
    });
    
    // Logout functionality
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to logout?')) {
                // Clear user session (implement with Firebase)
                localStorage.removeItem('userToken');
                window.location.href = 'login.html';
            }
        });
    }
    
    // Load user data
    loadUserData();
    
    // Load tournaments
    loadTournaments();
});

// Show section function
function showSection(sectionId) {
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

// Load user data from Firebase
function loadUserData() {
    // This will be implemented with actual Firebase
    const userData = {
        username: 'Player123',
        balance: 0,
        tournamentsJoined: 0,
        totalWins: 0,
        totalEarnings: 0
    };
    
    // Update UI
    document.querySelectorAll('.balance-amount').forEach(el => {
        el.textContent = `₹${userData.balance.toFixed(2)}`;
    });
    
    document.querySelector('.user-avatar img').src = 
        `https://ui-avatars.com/api/?name=${userData.username}&background=00d9ff&color=000&bold=true`;
    
    // Update stats
    const statValues = document.querySelectorAll('.stat-value');
    if (statValues[0]) statValues[0].textContent = `₹${userData.balance.toFixed(2)}`;
    if (statValues[1]) statValues[1].textContent = userData.tournamentsJoined;
    if (statValues[2]) statValues[2].textContent = userData.totalWins;
    if (statValues[3]) statValues[3].textContent = `₹${userData.totalEarnings.toFixed(2)}`;
}

// Load tournaments
function loadTournaments() {
    // Sample tournament data
    const tournaments = [
        {
            id: 1,
            game: 'Free Fire',
            title: 'Squad Battle Royale',
            entryFee: 15,
            prizePool: 500,
            players: 42,
            maxPlayers: 50,
            startTime: '10 mins',
            status: 'live'
        },
        {
            id: 2,
            game: 'PUBG',
            title: 'Classic Mode Championship',
            entryFee: 20,
            prizePool: 800,
            players: 28,
            maxPlayers: 50,
            startTime: '35 mins',
            status: 'upcoming'
        },
        {
            id: 3,
            game: 'Ludo King',
            title: 'Quick Match Tournament',
            entryFee: 10,
            prizePool: 400,
            players: 48,
            maxPlayers: 50,
            startTime: '5 mins',
            status: 'live'
        }
    ];
    
    // Render tournaments
    const tournamentsGrid = document.querySelector('.tournaments-grid');
    if (tournamentsGrid) {
        tournamentsGrid.innerHTML = tournaments.map(t => `
            <div class="tournament-card">
                <div class="tournament-header">
                    <div class="tournament-game-badge">${t.game}</div>
                    <div class="tournament-status-badge ${t.status}">${t.status.toUpperCase()}</div>
                </div>
                <h3 class="tournament-title">${t.title}</h3>
                <div class="tournament-info-grid">
                    <div class="info-item">
                        <span class="info-label">Entry Fee</span>
                        <span class="info-value">₹${t.entryFee}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Prize Pool</span>
                        <span class="info-value">₹${t.prizePool}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Players</span>
                        <span class="info-value">${t.players}/${t.maxPlayers}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Starts In</span>
                        <span class="info-value">${t.startTime}</span>
                    </div>
                </div>
                <button class="tournament-join-btn" onclick="joinTournament(${t.id})">
                    Join Tournament
                </button>
            </div>
        `).join('');
    }
}

// Join tournament
function joinTournament(tournamentId) {
    // Check user balance
    const userBalance = 0; // Get from Firebase
    const tournament = getTournamentById(tournamentId);
    
    if (!tournament) {
        showNotification('error', 'Tournament not found!');
        return;
    }
    
    if (userBalance < tournament.entryFee) {
        showNotification('error', 'Insufficient balance! Please recharge your wallet.');
        return;
    }
    
    // Show confirmation
    if (confirm(`Join ${tournament.title} for ₹${tournament.entryFee}?`)) {
        // Implement tournament join logic with Firebase
        showNotification('success', 'Successfully joined tournament!');
        
        // Redirect to match details or update UI
        console.log('Joined tournament:', tournamentId);
    }
}

// Get tournament by ID
function getTournamentById(id) {
    // This should fetch from Firebase
    const tournaments = [
        {id: 1, title: 'Squad Battle Royale', entryFee: 15},
        {id: 2, title: 'Classic Mode Championship', entryFee: 20},
        {id: 3, title: 'Quick Match Tournament', entryFee: 10}
    ];
    return tournaments.find(t => t.id === id);
}

// Recharge modal
function openRechargeModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Add Money to Wallet</h2>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="recharge-amounts">
                    <button class="amount-btn" onclick="selectAmount(50)">₹50</button>
                    <button class="amount-btn" onclick="selectAmount(100)">₹100</button>
                    <button class="amount-btn" onclick="selectAmount(200)">₹200</button>
                    <button class="amount-btn" onclick="selectAmount(500)">₹500</button>
                    <button class="amount-btn" onclick="selectAmount(1000)">₹1000</button>
                </div>
                <div class="form-group">
                    <label>Custom Amount (Min: ₹50)</label>
                    <input type="number" id="customAmount" placeholder="Enter amount" min="50">
                </div>
                <div class="payment-methods">
                    <h4>Payment Method</h4>
                    <button class="payment-btn">
                        <span>UPI</span>
                    </button>
                    <button class="payment-btn">
                        <span>PayTM</span>
                    </button>
                    <button class="payment-btn">
                        <span>PhonePe</span>
                    </button>
                </div>
                <button class="proceed-btn" onclick="processRecharge()">Proceed to Pay</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
}

// Withdraw modal
function openWithdrawModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h2>Withdraw Money</h2>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>Amount (Min: ₹100)</label>
                    <input type="number" id="withdrawAmount" placeholder="Enter amount" min="100">
                </div>
                <div class="form-group">
                    <label>UPI ID</label>
                    <input type="text" id="upiId" placeholder="yourname@upi">
                </div>
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin: 1rem 0;">
                    Withdrawals are processed within 5 minutes
                </p>
                <button class="proceed-btn" onclick="processWithdraw()">Request Withdrawal</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
}

// Close modal
function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }
}

// Process recharge
function processRecharge() {
    const amount = document.getElementById('customAmount').value || selectedAmount;
    if (!amount || amount < 50) {
        showNotification('error', 'Minimum recharge amount is ₹50');
        return;
    }
    
    // Implement payment gateway integration
    showNotification('success', `Recharge request for ₹${amount} initiated`);
    closeModal();
}

// Process withdraw
function processWithdraw() {
    const amount = document.getElementById('withdrawAmount').value;
    const upiId = document.getElementById('upiId').value;
    
    if (!amount || amount < 100) {
        showNotification('error', 'Minimum withdrawal amount is ₹100');
        return;
    }
    
    if (!upiId) {
        showNotification('error', 'Please enter your UPI ID');
        return;
    }
    
    // Implement withdrawal logic with Firebase
    showNotification('success', `Withdrawal request for ₹${amount} submitted`);
    closeModal();
}

// Notification system
function showNotification(type, message) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.classList.add('show'), 10);
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add modal and notification styles
const modalStyles = document.createElement('style');
modalStyles.textContent = `
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    .modal.active {
        opacity: 1;
    }
    
    .modal-content {
        background: var(--glass-bg);
        border: 1px solid var(--glass-border);
        border-radius: 20px;
        padding: 2rem;
        max-width: 500px;
        width: 90%;
        backdrop-filter: blur(20px);
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1.5rem;
    }
    
    .modal-header h2 {
        font-family: 'Orbitron', sans-serif;
        color: var(--neon-blue);
    }
    
    .modal-close {
        background: none;
        border: none;
        color: var(--text-primary);
        font-size: 2rem;
        cursor: pointer;
        line-height: 1;
    }
    
    .recharge-amounts {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1rem;
        margin-bottom: 1.5rem;
    }
    
    .amount-btn {
        padding: 1rem;
        background: rgba(0, 217, 255, 0.1);
        border: 1px solid var(--glass-border);
        border-radius: 10px;
        color: var(--neon-blue);
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .amount-btn:hover {
        background: rgba(0, 217, 255, 0.2);
        border-color: var(--neon-blue);
    }
    
    .payment-methods {
        margin: 1.5rem 0;
    }
    
    .payment-btn {
        width: 100%;
        padding: 1rem;
        margin-bottom: 0.8rem;
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid var(--glass-border);
        border-radius: 10px;
        color: var(--text-primary);
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .payment-btn:hover {
        border-color: var(--neon-blue);
        background: rgba(0, 0, 0, 0.5);
    }
    
    .proceed-btn {
        width: 100%;
        padding: 1rem;
        background: var(--accent-gradient);
        border: none;
        border-radius: 10px;
        color: #000;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .proceed-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 0 30px var(--neon-blue-glow);
    }
    
    .notification {
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: var(--glass-bg);
        border: 1px solid var(--glass-border);
        border-radius: 10px;
        backdrop-filter: blur(20px);
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.success {
        border-color: var(--success-green);
        color: var(--success-green);
    }
    
    .notification.error {
        border-color: var(--danger-red);
        color: var(--danger-red);
    }
`;
document.head.appendChild(modalStyles);

// Save profile
const saveProfileBtn = document.querySelector('.save-profile-btn');
if (saveProfileBtn) {
    saveProfileBtn.addEventListener('click', () => {
        showNotification('success', 'Profile updated successfully!');
    });
}
