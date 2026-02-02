# 🇧🇩 Billo Battle Zone - Bangladesh Setup Guide

## ✅ যা যা নতুন যোগ করা হয়েছে:

### 1. 🏦 Bangladesh Payment System
- ✅ bKash integration
- ✅ Nagad integration  
- ✅ Rocket integration
- ✅ Transaction ID system
- ✅ Screenshot upload
- ✅ Manual approval by admin

### 2. 🌐 Language Toggle (বাংলা ⇄ English)
- ✅ Dynamic language switching
- ✅ Bangla and English translations
- ✅ Saved in localStorage
- ✅ Toggle button in navbar

### 3. 📱 Sidebar Fix
- ✅ Click outside to close
- ✅ Auto-close on navigation
- ✅ Mobile responsive
- ✅ Smooth animations

### 4. 👑 Complete Admin Panel
- ✅ Dashboard with stats
- ✅ Recharge request management
- ✅ Withdraw request management  
- ✅ Tournament creation/editing
- ✅ User management
- ✅ Payment number settings

### 5. 🎨 Site Rebranding
- ✅ Name: Billo Battle Zone
- ✅ Bangladesh focused
- ✅ Taka (৳) currency
- ✅ Local payment methods

---

## 📁 New Files Added:

1. **admin.html** - Complete admin panel
2. **admin.js** - Admin functionality
3. **admin.css** - Admin panel styling
4. **bd-payment.js** - Bangladesh payment system
5. **language.js** - Bangla/English toggle

---

## 🚀 Setup Instructions:

### Step 1: Upload All Files to Netlify

সব files একসাথে upload করুন:
```
✅ index.html
✅ login.html
✅ register.html
✅ dashboard.html
✅ admin.html (NEW!)
✅ styles.css
✅ auth.css
✅ dashboard.css
✅ admin.css (NEW!)
✅ particles.js
✅ main.js
✅ auth.js
✅ dashboard.js
✅ bd-payment.js (NEW!)
✅ language.js (NEW!)
✅ admin.js (NEW!)
✅ firebase-config.js
```

### Step 2: Firebase Configuration

1. Firebase Console এ যান
2. Storage enable করুন (screenshot এর জন্য):
   - Storage → Get Started
   - Start in production mode
   
3. Firestore Collections তৈরি করুন:
```
collections:
├── users
├── tournaments
├── transactions
├── recharge-requests (NEW!)
└── withdraw-requests (NEW!)
```

4. Security Rules update করুন:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /recharge-requests/{request} {
      allow read, create: if request.auth != null;
      allow update: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
    
    match /withdraw-requests/{request} {
      allow read, create: if request.auth != null;
      allow update: if request.auth != null && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
  }
}
```

### Step 3: Admin Account তৈরি করুন

1. প্রথমে normal user হিসেবে register করুন
2. Firebase Console → Firestore → users collection
3. আপনার user document খুলুন
4. নতুন field যোগ করুন:
   - Field: `isAdmin`
   - Type: `boolean`
   - Value: `true`
5. Save করুন

এখন আপনি admin panel এ access পাবেন: `/admin.html`

---

## 💰 Payment System Setup:

### bKash/Nagad/Rocket Numbers Update করুন:

#### Option 1: Admin Panel থেকে
1. Admin Panel → Settings
2. Payment Numbers section এ যান
3. আপনার bKash/Nagad/Rocket numbers দিন
4. Save করুন

#### Option 2: Code এ Directly
`bd-payment.js` file এ:
```javascript
bkash: {
    name: 'bKash',
    number: '01712345678', // আপনার নম্বর দিন
    color: '#E2136E',
    icon: '📱'
},
nagad: {
    name: 'Nagad',
    number: '01812345678', // আপনার নম্বর দিন
    color: '#F48024',
    icon: '💳'
},
```

---

## 🎮 Tournament Management:

### Admin Panel থেকে Tournament তৈরি করুন:

1. Admin Panel → Tournaments
2. "Create New Tournament" button click করুন
3. Fill করুন:
   - Game: Free Fire/PUBG/Ludo
   - Title: "Squad Battle"
   - Entry Fee: ৳15
   - Prize Pool: ৳500
   - Max Players: 50
   - Start Time: Select date and time
4. "Create Tournament" click করুন

### Tournament Edit/Delete:
- Admin panel এ tournament list থেকে
- Edit/Delete buttons পাবেন
- Status change করতে পারবেন (upcoming → live → completed)

---

## 💳 Payment Request Management:

### Recharge Requests:

1. User টাকা পাঠায় (bKash/Nagad/Rocket)
2. Screenshot upload করে
3. Admin panel এ notification আসে
4. Admin screenshot verify করে
5. "Approve" click করে
6. User এর wallet এ balance add হয়

### Withdraw Requests:

1. User withdraw request করে
2. Admin panel এ দেখায়
3. Admin manually টাকা পাঠায় (bKash/Nagad/Rocket)
4. "Mark as Paid" click করে
5. Status completed হয়

---

## 🌐 Language System:

### Navbar এ Toggle Button থাকবে:
- বাং (Bangla)
- ENG (English)

### নতুন Translation যোগ করতে:

`language.js` file এ:
```javascript
bn: {
    'new.key': 'বাংলা টেক্সট',
},
en: {
    'new.key': 'English Text',
}
```

### HTML এ use করুন:
```html
<span data-i18n="new.key">Default Text</span>
```

---

## 📱 Mobile Sidebar Fix:

এখন:
- ✅ Sidebar খোলার পর outside click করলে close হবে
- ✅ Navigation item click করলে auto-close হবে
- ✅ Smooth animation থাকবে

---

## 🔐 Security Tips:

1. **Firebase Rules properly set করুন**
2. **Admin credentials secure রাখুন**
3. **Screenshot গুলো verify করুন পেমেন্ট approve করার আগে**
4. **Fake transaction ID check করুন**
5. **Regular backup নিন Firestore এর**

---

## 🎯 Admin Panel Features:

### Dashboard:
- Total users count
- Active tournaments
- Pending requests
- Total revenue

### Recharge Management:
- View all requests
- See screenshot
- Approve/Reject
- Auto balance update

### Withdraw Management:
- View requests
- Verify details
- Mark as paid
- Track completed withdrawals

### Tournament Management:
- Create tournaments
- Edit details
- Change status
- View participants

### User Management:
- View all users
- Check balances
- See history
- Ban/Unban (if needed)

### Settings:
- Update payment numbers
- Set min/max limits
- Platform configuration

---

## 📊 Testing Checklist:

- [ ] User registration works
- [ ] Login works
- [ ] Language toggle works
- [ ] Recharge system works
- [ ] Screenshot upload works
- [ ] Admin can approve recharge
- [ ] Balance updates correctly
- [ ] Withdraw system works
- [ ] Tournament creation works
- [ ] Users can join tournaments
- [ ] Payment methods show correctly
- [ ] Sidebar closes properly
- [ ] Mobile responsive

---

## 🚨 Common Issues & Solutions:

### Issue 1: Admin Panel Access Denied
**Solution:** 
- Firestore এ user document এ `isAdmin: true` set করুন

### Issue 2: Screenshot Upload Failed
**Solution:**
- Firebase Storage enable করুন
- Storage rules check করুন

### Issue 3: Payment Numbers Not Showing
**Solution:**
- `bd-payment.js` এ numbers update করুন
- Browser cache clear করুন

### Issue 4: Language Not Changing
**Solution:**
- localStorage clear করুন
- Page reload করুন

---

## 📞 Support:

কোনো সমস্যা হলে:
1. Browser console check করুন (F12)
2. Firebase console এ errors দেখুন
3. Network tab এ failed requests দেখুন

---

## 🎉 You're All Set!

এখন আপনার Billo Battle Zone সম্পূর্ণ functional:
- ✅ Bangladesh payment system
- ✅ Bangla/English support
- ✅ Complete admin control
- ✅ User-friendly interface
- ✅ Mobile responsive

**Live Link:** `https://billobattlezone.netlify.app`

Good luck! 🚀🇧🇩
