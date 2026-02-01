# BilloBattleHub - Tournament Platform

## 🎮 Premium Gaming Tournament Platform

A complete tournament management system with wallet, recharge, withdrawal, and admin panel.

---

## 📁 Files Structure

```
BilloBattleHub/
├── index.html              # Landing page
├── login.html              # Login page
├── register.html           # Registration page
├── dashboard.html          # User dashboard
├── styles.css              # Main stylesheet
├── auth.css                # Authentication pages styles
├── dashboard.css           # Dashboard styles
├── particles.js            # Particle animation
├── main.js                 # Main JavaScript
├── auth.js                 # Authentication logic
├── dashboard.js            # Dashboard functionality
├── firebase-config.js      # Firebase configuration
└── README.md              # This file
```

---

## 🚀 Setup Instructions

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Enter project name: `billobattlehub`
4. Disable Google Analytics (optional)
5. Click "Create Project"

### Step 2: Enable Firebase Services

#### Authentication:
1. Go to Authentication → Get Started
2. Enable "Email/Password" sign-in method
3. Enable "Google" sign-in (optional)

#### Firestore Database:
1. Go to Firestore Database → Create Database
2. Start in **Production mode**
3. Choose location (asia-south1 for India)

#### Security Rules (paste this):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
      allow read: if request.auth != null;
    }
    
    match /tournaments/{tournamentId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null;
    }
    
    match /transactions/{transactionId} {
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null;
    }
    
    match /withdrawals/{withdrawalId} {
      allow read, create: if request.auth != null;
      allow update: if request.auth != null; // Admin only in production
    }
  }
}
```

### Step 3: Get Firebase Configuration

1. Go to Project Settings (gear icon)
2. Scroll to "Your apps" → Web
3. Click "Add app" or select existing web app
4. Copy the configuration object
5. Open `firebase-config.js`
6. Replace the config values:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

### Step 4: Add Firebase SDK to HTML Files

Add these scripts **before closing `</body>` tag** in all HTML files:

```html
<!-- Firebase SDK -->
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-auth-compat.js"></script>
<script src="https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore-compat.js"></script>

<!-- Your Firebase Config -->
<script src="firebase-config.js"></script>
```

### Step 5: Upload to Blogger

#### Option A: Using Blogger's HTML Editor

1. Go to Blogger Dashboard
2. Create a new post for each page
3. Switch to HTML view
4. Paste the complete HTML code
5. Publish

#### Option B: Using External Hosting + Blogger Embed

1. Host files on GitHub Pages / Netlify / Vercel
2. In Blogger, create iframe embeds:
```html
<iframe src="YOUR_HOSTED_URL" width="100%" height="800px" frameborder="0"></iframe>
```

#### Option C: Direct Blogger Theme (Recommended)

1. Go to Theme → Edit HTML
2. Back up current theme
3. Replace with your custom HTML
4. Add CSS in `<b:skin>` section
5. Add JavaScript before `</body>`

### Step 6: Create Firestore Collections

Initialize these collections in Firestore:

1. **users**
   - Document ID: User UID
   - Fields: username, email, phone, balance, totalWins, etc.

2. **tournaments**
   - Document ID: Auto-generated
   - Fields: title, game, entryFee, prizePool, players[], status

3. **transactions**
   - Document ID: Auto-generated
   - Fields: userId, type, amount, description, timestamp

4. **withdrawals**
   - Document ID: Auto-generated
   - Fields: userId, amount, upiId, status, createdAt

---

## 💰 Payment Gateway Integration

### For Recharge (Add Money):

1. **Razorpay** (Recommended for India)
   - Sign up at https://razorpay.com
   - Get API keys
   - Add Razorpay script in HTML:
   ```html
   <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
   ```

2. **Paytm**
   - Sign up at https://business.paytm.com
   - Get merchant credentials

3. **PhonePe**
   - Business account required

### For Withdrawal:

Implement manual approval system:
1. Admin reviews withdrawal requests in dashboard
2. Admin processes payment via UPI manually
3. Admin marks withdrawal as completed in Firebase

---

## 🎨 Customization

### Change Colors:

Edit CSS variables in `styles.css`:

```css
:root {
    --neon-blue: #00d9ff;        /* Main brand color */
    --neon-blue-glow: rgba(0, 217, 255, 0.6);
    --glass-bg: rgba(20, 20, 30, 0.7);
    --text-primary: #ffffff;
    --text-secondary: #a0aec0;
}
```

### Change Fonts:

Replace Google Fonts link in HTML:

```html
<link href="https://fonts.googleapis.com/css2?family=YOUR_FONT&display=swap" rel="stylesheet">
```

### Update Logo:

Search for "BILLOBATTLEHUB" in HTML files and replace with your site name.

---

## 🔒 Security Best Practices

1. **Never expose Firebase Admin SDK keys**
2. **Use Firebase Security Rules** (provided above)
3. **Validate all inputs** on both client and server
4. **Implement rate limiting** for API calls
5. **Use HTTPS only** (Blogger provides this by default)
6. **Validate transactions** before crediting balance
7. **Log all financial transactions**

---

## 📱 Features Included

✅ User Registration & Login
✅ Wallet System (Recharge & Withdraw)
✅ Tournament Listing
✅ Join Tournaments
✅ Transaction History
✅ User Dashboard
✅ Responsive Design
✅ Particle Animations
✅ Real-time Updates (with Firebase)

---

## 🎯 Admin Panel Features Needed

Create separate admin panel (`admin.html`) with:
- User management
- Tournament creation/editing
- Withdrawal approvals
- Transaction monitoring
- Platform analytics

---

## 📞 Support & Contact

For any issues or questions:
- Check Firebase Console for errors
- Review browser console for JavaScript errors
- Verify all Firebase SDK scripts are loaded
- Ensure correct Firebase configuration

---

## 🚨 Important Notes

1. **Test thoroughly** before going live
2. **Start with test accounts** to verify all flows
3. **Backup Firebase data** regularly
4. **Monitor transactions** closely
5. **Have legal terms & conditions**
6. **Comply with gaming laws** in your region
7. **Age restriction: 18+ only**
8. **This is skill-based gaming** - clarify in T&C

---

## 📈 Future Enhancements

- [ ] Admin panel
- [ ] Automated payment processing
- [ ] Email notifications
- [ ] Referral system
- [ ] Leaderboards
- [ ] Match result submission
- [ ] Screenshot upload for proof
- [ ] Live chat support
- [ ] Push notifications
- [ ] Mobile app (PWA)

---

## 💡 Tips for Blogger Hosting

1. **Use GitHub Pages for assets**: Host CSS/JS files separately
2. **Minify code**: Reduces load time
3. **Use CDN for libraries**: Faster loading
4. **Enable HTTPS**: Already enabled by Blogger
5. **Custom domain**: Buy and connect to Blogger

---

## 🎮 Game Integration

Currently supports:
- Free Fire
- PUBG Mobile
- Ludo King

To add more games:
1. Add game card in HTML
2. Create tournament templates
3. Update Firebase collections
4. Add validation logic

---

## 📄 License

This is a custom project. Use responsibly and legally.

**Disclaimer**: Ensure compliance with local gaming and gambling laws. The developer is not responsible for misuse.

---

## ✨ Credits

Designed and Developed for BilloBattleHub
Premium Gaming Tournament Platform

---

**Ready to Launch!** 🚀

Follow the steps above carefully and your tournament platform will be live!
