// Bangladesh Payment System
const bdPaymentSystem = {
    methods: {
        bkash: {
            name: 'bKash',
            number: '01XXXXXXXXX', // Admin এর bKash number
            color: '#E2136E',
            icon: '📱'
        },
        nagad: {
            name: 'Nagad',
            number: '01XXXXXXXXX', // Admin এর Nagad number
            color: '#F48024',
            icon: '💳'
        },
        rocket: {
            name: 'Rocket',
            number: '01XXXXXXXXX', // Admin এর Rocket number
            color: '#8B2E8F',
            icon: '🚀'
        }
    },
    
    currency: 'BDT',
    symbol: '৳',
    minRecharge: 50,
    minWithdraw: 100
};

// Recharge Modal - Bangladesh Version
function openRechargeModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content bd-payment-modal">
            <div class="modal-header">
                <h2>💰 টাকা যোগ করুন</h2>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <!-- Amount Selection -->
                <div class="form-group">
                    <label>পরিমাণ নির্বাচন করুন</label>
                    <div class="recharge-amounts">
                        <button class="amount-btn" onclick="selectAmount(50)">৳50</button>
                        <button class="amount-btn" onclick="selectAmount(100)">৳100</button>
                        <button class="amount-btn" onclick="selectAmount(200)">৳200</button>
                        <button class="amount-btn" onclick="selectAmount(500)">৳500</button>
                        <button class="amount-btn" onclick="selectAmount(1000)">৳1000</button>
                        <button class="amount-btn" onclick="selectAmount(2000)">৳2000</button>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>অথবা নিজের পরিমাণ লিখুন (মিনিমাম: ৳50)</label>
                    <input type="number" id="customAmount" placeholder="৳ পরিমাণ লিখুন" min="50" value="100">
                </div>
                
                <!-- Payment Method Selection -->
                <div class="payment-methods">
                    <h4>পেমেন্ট মেথড নির্বাচন করুন</h4>
                    
                    <div class="payment-method-card" onclick="selectPaymentMethod('bkash')">
                        <div class="payment-icon" style="background: #E2136E20; color: #E2136E;">
                            <span style="font-size: 2rem;">📱</span>
                        </div>
                        <div class="payment-info">
                            <div class="payment-name">bKash</div>
                            <div class="payment-number">01XXXXXXXXX</div>
                        </div>
                        <div class="payment-radio">
                            <input type="radio" name="payment-method" value="bkash">
                        </div>
                    </div>
                    
                    <div class="payment-method-card" onclick="selectPaymentMethod('nagad')">
                        <div class="payment-icon" style="background: #F4802420; color: #F48024;">
                            <span style="font-size: 2rem;">💳</span>
                        </div>
                        <div class="payment-info">
                            <div class="payment-name">Nagad</div>
                            <div class="payment-number">01XXXXXXXXX</div>
                        </div>
                        <div class="payment-radio">
                            <input type="radio" name="payment-method" value="nagad">
                        </div>
                    </div>
                    
                    <div class="payment-method-card" onclick="selectPaymentMethod('rocket')">
                        <div class="payment-icon" style="background: #8B2E8F20; color: #8B2E8F;">
                            <span style="font-size: 2rem;">🚀</span>
                        </div>
                        <div class="payment-info">
                            <div class="payment-name">Rocket</div>
                            <div class="payment-number">01XXXXXXXXX</div>
                        </div>
                        <div class="payment-radio">
                            <input type="radio" name="payment-method" value="rocket">
                        </div>
                    </div>
                </div>
                
                <!-- Instructions -->
                <div class="payment-instructions" id="paymentInstructions" style="display: none;">
                    <h4>📋 পেমেন্ট করার নিয়ম:</h4>
                    <ol>
                        <li><span id="selectedMethodName">bKash</span> অ্যাপ খুলুন</li>
                        <li><strong><span id="selectedMethodNumber">01XXXXXXXXX</span></strong> নম্বরে <strong>Send Money</strong> করুন</li>
                        <li>পরিমাণ: <strong>৳<span id="selectedAmount">100</span></strong></li>
                        <li>Transaction সম্পন্ন করুন</li>
                        <li>নিচের ফর্মে তথ্য দিন</li>
                    </ol>
                </div>
                
                <!-- Transaction Details Form -->
                <div class="transaction-form" id="transactionForm" style="display: none;">
                    <h4>💳 Transaction তথ্য দিন</h4>
                    
                    <div class="form-group">
                        <label>আপনার নম্বর (যেখান থেকে পাঠিয়েছেন)</label>
                        <input type="tel" id="senderNumber" placeholder="01XXXXXXXXX" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Transaction ID (TrxID)</label>
                        <input type="text" id="transactionId" placeholder="9A2B3C4D5E" required>
                    </div>
                    
                    <div class="form-group">
                        <label>Screenshot আপলোড করুন</label>
                        <input type="file" id="paymentScreenshot" accept="image/*" required>
                        <small style="color: var(--text-secondary); display: block; margin-top: 0.5rem;">
                            Transaction এর স্ক্রিনশট আপলোড করুন
                        </small>
                    </div>
                    
                    <button class="proceed-btn" onclick="submitRechargeRequest()">
                        📤 রিচার্জ রিকুয়েস্ট পাঠান
                    </button>
                    
                    <p style="color: var(--text-secondary); font-size: 0.9rem; margin-top: 1rem; text-align: center;">
                        ⏱️ ভেরিফিকেশনের পর 5-10 মিনিটে Balance যোগ হবে
                    </p>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
}

// Select Amount
let selectedAmount = 100;
function selectAmount(amount) {
    selectedAmount = amount;
    document.getElementById('customAmount').value = amount;
    
    // Highlight selected button
    document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
    event.target.classList.add('selected');
    
    // Update amount in instructions
    const amountSpan = document.getElementById('selectedAmount');
    if (amountSpan) {
        amountSpan.textContent = amount;
    }
}

// Select Payment Method
let selectedMethod = null;
function selectPaymentMethod(method) {
    selectedMethod = method;
    
    // Check all radio buttons
    document.querySelectorAll('input[name="payment-method"]').forEach(radio => {
        radio.checked = false;
    });
    document.querySelector(`input[value="${method}"]`).checked = true;
    
    // Highlight selected card
    document.querySelectorAll('.payment-method-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
    
    // Show instructions
    const instructions = document.getElementById('paymentInstructions');
    const form = document.getElementById('transactionForm');
    
    instructions.style.display = 'block';
    form.style.display = 'block';
    
    // Update method details
    const methodData = bdPaymentSystem.methods[method];
    document.getElementById('selectedMethodName').textContent = methodData.name;
    document.getElementById('selectedMethodNumber').textContent = methodData.number;
    
    // Get custom amount
    const customAmount = document.getElementById('customAmount').value;
    if (customAmount) {
        selectedAmount = parseInt(customAmount);
        document.getElementById('selectedAmount').textContent = customAmount;
    }
}

// Submit Recharge Request
async function submitRechargeRequest() {
    if (!selectedMethod) {
        showNotification('error', 'দয়া করে পেমেন্ট মেথড নির্বাচন করুন');
        return;
    }
    
    const amount = document.getElementById('customAmount').value;
    const senderNumber = document.getElementById('senderNumber').value;
    const transactionId = document.getElementById('transactionId').value;
    const screenshot = document.getElementById('paymentScreenshot').files[0];
    
    // Validation
    if (!amount || amount < 50) {
        showNotification('error', 'মিনিমাম রিচার্জ ৳50');
        return;
    }
    
    if (!senderNumber || senderNumber.length < 11) {
        showNotification('error', 'সঠিক নম্বর দিন');
        return;
    }
    
    if (!transactionId) {
        showNotification('error', 'Transaction ID দিন');
        return;
    }
    
    if (!screenshot) {
        showNotification('error', 'Screenshot আপলোড করুন');
        return;
    }
    
    // Upload screenshot to Firebase Storage
    try {
        const storageRef = firebase.storage().ref();
        const screenshotRef = storageRef.child(`recharge-screenshots/${Date.now()}_${screenshot.name}`);
        
        // Upload file
        const uploadTask = await screenshotRef.put(screenshot);
        const screenshotUrl = await uploadTask.ref.getDownloadURL();
        
        // Create recharge request in Firestore
        const user = firebase.auth().currentUser;
        await firebase.firestore().collection('recharge-requests').add({
            userId: user.uid,
            amount: parseInt(amount),
            method: selectedMethod,
            senderNumber: senderNumber,
            transactionId: transactionId,
            screenshotUrl: screenshotUrl,
            status: 'pending',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        showNotification('success', '✅ রিচার্জ রিকুয়েস্ট পাঠানো হয়েছে! অপেক্ষা করুন...');
        closeModal();
        
    } catch (error) {
        console.error('Error:', error);
        showNotification('error', 'কিছু সমস্যা হয়েছে! আবার চেষ্টা করুন');
    }
}

// Withdraw Modal - Bangladesh Version
function openWithdrawModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content bd-payment-modal">
            <div class="modal-header">
                <h2>💸 টাকা তুলুন</h2>
                <button class="modal-close" onclick="closeModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label>পরিমাণ (মিনিমাম: ৳100)</label>
                    <input type="number" id="withdrawAmount" placeholder="৳ পরিমাণ লিখুন" min="100">
                </div>
                
                <div class="payment-methods">
                    <h4>কোথায় টাকা পেতে চান?</h4>
                    
                    <div class="payment-method-card" onclick="selectWithdrawMethod('bkash')">
                        <div class="payment-icon" style="background: #E2136E20; color: #E2136E;">
                            <span style="font-size: 2rem;">📱</span>
                        </div>
                        <div class="payment-info">
                            <div class="payment-name">bKash</div>
                        </div>
                        <div class="payment-radio">
                            <input type="radio" name="withdraw-method" value="bkash">
                        </div>
                    </div>
                    
                    <div class="payment-method-card" onclick="selectWithdrawMethod('nagad')">
                        <div class="payment-icon" style="background: #F4802420; color: #F48024;">
                            <span style="font-size: 2rem;">💳</span>
                        </div>
                        <div class="payment-info">
                            <div class="payment-name">Nagad</div>
                        </div>
                        <div class="payment-radio">
                            <input type="radio" name="withdraw-method" value="nagad">
                        </div>
                    </div>
                    
                    <div class="payment-method-card" onclick="selectWithdrawMethod('rocket')">
                        <div class="payment-icon" style="background: #8B2E8F20; color: #8B2E8F;">
                            <span style="font-size: 2rem;">🚀</span>
                        </div>
                        <div class="payment-info">
                            <div class="payment-name">Rocket</div>
                        </div>
                        <div class="payment-radio">
                            <input type="radio" name="withdraw-method" value="rocket">
                        </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>আপনার নম্বর (যেখানে টাকা পাঠাতে হবে)</label>
                    <input type="tel" id="withdrawNumber" placeholder="01XXXXXXXXX" required>
                </div>
                
                <p style="color: var(--text-secondary); font-size: 0.9rem; margin: 1rem 0;">
                    ⏱️ Withdraw রিকুয়েস্ট 5 মিনিটের মধ্যে প্রসেস হবে
                </p>
                
                <button class="proceed-btn" onclick="submitWithdrawRequest()">
                    💸 Withdraw রিকুয়েস্ট পাঠান
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    setTimeout(() => modal.classList.add('active'), 10);
}

let selectedWithdrawMethod = null;
function selectWithdrawMethod(method) {
    selectedWithdrawMethod = method;
    
    document.querySelectorAll('input[name="withdraw-method"]').forEach(radio => {
        radio.checked = false;
    });
    document.querySelector(`input[value="${method}"]`).checked = true;
    
    document.querySelectorAll('.payment-method-card').forEach(card => {
        card.classList.remove('selected');
    });
    event.currentTarget.classList.add('selected');
}

async function submitWithdrawRequest() {
    const amount = document.getElementById('withdrawAmount').value;
    const number = document.getElementById('withdrawNumber').value;
    
    if (!amount || amount < 100) {
        showNotification('error', 'মিনিমাম Withdraw ৳100');
        return;
    }
    
    if (!selectedWithdrawMethod) {
        showNotification('error', 'পেমেন্ট মেথড নির্বাচন করুন');
        return;
    }
    
    if (!number || number.length < 11) {
        showNotification('error', 'সঠিক নম্বর দিন');
        return;
    }
    
    try {
        const user = firebase.auth().currentUser;
        
        // Check balance
        const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
        const userData = userDoc.data();
        
        if (userData.balance < amount) {
            showNotification('error', 'অপর্যাপ্ত Balance!');
            return;
        }
        
        // Create withdraw request
        await firebase.firestore().collection('withdraw-requests').add({
            userId: user.uid,
            amount: parseInt(amount),
            method: selectedWithdrawMethod,
            accountNumber: number,
            status: 'pending',
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
        });
        
        showNotification('success', '✅ Withdraw রিকুয়েস্ট পাঠানো হয়েছে!');
        closeModal();
        
    } catch (error) {
        console.error('Error:', error);
        showNotification('error', 'কিছু সমস্যা হয়েছে!');
    }
}

// CSS for Bangladesh payment system
const bdPaymentStyles = `
    .payment-method-card {
        display: grid;
        grid-template-columns: auto 1fr auto;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: rgba(0, 0, 0, 0.3);
        border: 2px solid var(--glass-border);
        border-radius: 12px;
        margin-bottom: 1rem;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    .payment-method-card:hover {
        border-color: var(--neon-blue);
        background: rgba(0, 0, 0, 0.5);
    }
    
    .payment-method-card.selected {
        border-color: var(--neon-blue);
        background: rgba(0, 217, 255, 0.1);
        box-shadow: 0 0 20px var(--neon-blue-glow);
    }
    
    .payment-icon {
        width: 60px;
        height: 60px;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .payment-name {
        font-weight: 700;
        font-size: 1.2rem;
        margin-bottom: 0.3rem;
    }
    
    .payment-number {
        color: var(--text-secondary);
        font-size: 0.9rem;
    }
    
    .payment-radio input {
        width: 20px;
        height: 20px;
        cursor: pointer;
    }
    
    .payment-instructions {
        background: rgba(0, 217, 255, 0.1);
        border: 1px solid var(--neon-blue);
        border-radius: 12px;
        padding: 1.5rem;
        margin: 1.5rem 0;
    }
    
    .payment-instructions h4 {
        color: var(--neon-blue);
        margin-bottom: 1rem;
    }
    
    .payment-instructions ol {
        padding-left: 1.5rem;
        line-height: 2;
    }
    
    .payment-instructions li {
        margin-bottom: 0.5rem;
    }
    
    .transaction-form {
        margin-top: 1.5rem;
    }
    
    .amount-btn.selected {
        background: var(--accent-gradient);
        color: #000;
        font-weight: 700;
        border-color: var(--neon-blue);
        box-shadow: 0 0 20px var(--neon-blue-glow);
    }
`;

// Add styles to page
const styleSheet = document.createElement('style');
styleSheet.textContent = bdPaymentStyles;
document.head.appendChild(styleSheet);
