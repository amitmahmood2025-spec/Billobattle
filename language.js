// Language Toggle System - Bangla ⇄ English
const translations = {
    bn: {
        // Navbar
        'nav.home': 'হোম',
        'nav.tournaments': 'টুর্নামেন্ট',
        'nav.prizes': 'পুরস্কার',
        'nav.rules': 'নিয়মাবলী',
        'nav.dashboard': 'ড্যাশবোর্ড',
        'nav.login': 'লগইন',
        'nav.register': 'রেজিস্টার',
        
        // Hero Section
        'hero.badge': 'লাইভ টুর্নামেন্ট',
        'hero.title1': 'ব্যাটেলগ্রাউন্ডে',
        'hero.title2': 'আধিপত্য বিস্তার করুন',
        'hero.subtitle': 'প্রতিদিন টুর্নামেন্ট • সত্যিকার পুরস্কার • তাৎক্ষণিক উত্তোলন',
        'hero.stat1.number': '১,২৪৭',
        'hero.stat1.label': 'সক্রিয় খেলোয়াড়',
        'hero.stat2.number': '৳২.৫ লক্ষ+',
        'hero.stat2.label': 'পুরস্কার পুল',
        'hero.stat3.number': '২৪/৭',
        'hero.stat3.label': 'টুর্নামেন্ট',
        'hero.btn.start': 'খেলা শুরু করুন',
        'hero.btn.view': 'টুর্নামেন্ট দেখুন',
        
        // Games Section
        'games.title': 'ফিচার্ড',
        'games.title.glow': 'গেমস',
        'games.subtitle': 'আপনার যুদ্ধক্ষেত্র বেছে নিন এবং জয়ী হন',
        'games.players': 'খেলোয়াড়',
        'games.pool': 'পুল',
        'games.entry': 'এন্ট্রি ফি',
        'games.join': 'টুর্নামেন্টে যোগ দিন',
        
        // Live Tournaments
        'live.title': 'লাইভ',
        'live.title.glow': 'টুর্নামেন্ট',
        'live.subtitle': 'এখনই যোগ দিন এবং জিততে শুরু করুন',
        'live.status.live': 'এখন লাইভ',
        'live.status.upcoming': 'আসছে',
        'live.starts': 'শুরু হবে',
        'live.mins': 'মিনিটে',
        'live.prize': 'পুরস্কার পুল',
        
        // How It Works
        'how.title': 'কিভাবে এটি',
        'how.title.glow': 'কাজ করে',
        'how.subtitle': '৩টি সহজ ধাপে জয় শুরু করুন',
        'how.step1.title': 'রেজিস্টার ও রিচার্জ',
        'how.step1.desc': 'আপনার অ্যাকাউন্ট তৈরি করুন এবং ওয়ালেটে টাকা যোগ করুন। মিনিমাম রিচার্জ ৳৫০।',
        'how.step2.title': 'টুর্নামেন্টে যোগ দিন',
        'how.step2.desc': 'আপনার গেম বেছে নিন এবং যেকোনো টুর্নামেন্টে যোগ দিন। এন্ট্রি ফি ওয়ালেট থেকে কেটে নেওয়া হবে।',
        'how.step3.title': 'জিতুন ও তুলুন',
        'how.step3.desc': 'পুরস্কার তাৎক্ষণিকভাবে ওয়ালেটে জমা হয়। যেকোনো সময় উত্তোলন করুন, মিনিমাম ৳১০০।',
        
        // Prizes
        'prizes.title': 'আজকের',
        'prizes.title.glow': 'পুরস্কার',
        'prizes.subtitle': 'সত্যিকার টাকা, তাৎক্ষণিক উত্তোলন',
        'prizes.1st': '১ম স্থান',
        'prizes.2nd': '২য় স্থান',
        'prizes.3rd': '৩য় স্থান',
        'prizes.games': 'সব গেম',
        
        // Footer
        'footer.tagline': 'বাংলাদেশের #১ গেমিং টুর্নামেন্ট প্ল্যাটফর্ম',
        'footer.quick': 'দ্রুত লিংক',
        'footer.support': 'সাপোর্ট',
        'footer.games': 'গেমস',
        'footer.help': 'সাহায্য কেন্দ্র',
        'footer.contact': 'যোগাযোগ',
        'footer.terms': 'শর্তাবলী',
        'footer.privacy': 'গোপনীয়তা নীতি',
        'footer.rights': 'সর্বস্বত্ব সংরক্ষিত।',
        'footer.note': 'দায়িত্বশীলভাবে খেলুন • ১৮+ শুধুমাত্র • দক্ষতা-ভিত্তিক গেমিং প্ল্যাটফর্ম',
        
        // Dashboard
        'dash.title': 'ড্যাশবোর্ড',
        'dash.wallet': 'ওয়ালেট',
        'dash.history': 'ইতিহাস',
        'dash.profile': 'প্রোফাইল',
        'dash.balance': 'ওয়ালেট ব্যালেন্স',
        'dash.joined': 'টুর্নামেন্টে যোগদান',
        'dash.wins': 'মোট জয়',
        'dash.earnings': 'মোট আয়',
        'dash.addmoney': 'টাকা যোগ করুন',
        'dash.withdraw': 'টাকা তুলুন',
        
        // Common
        'common.currency': '৳'
    },
    
    en: {
        // Navbar
        'nav.home': 'Home',
        'nav.tournaments': 'Tournaments',
        'nav.prizes': 'Prizes',
        'nav.rules': 'Rules',
        'nav.dashboard': 'Dashboard',
        'nav.login': 'Login',
        'nav.register': 'Register',
        
        // Hero Section
        'hero.badge': 'LIVE TOURNAMENTS',
        'hero.title1': 'DOMINATE THE',
        'hero.title2': 'BATTLEGROUND',
        'hero.subtitle': 'Daily tournaments • Real prizes • Instant withdrawals',
        'hero.stat1.number': '1,247',
        'hero.stat1.label': 'Active Players',
        'hero.stat2.number': '৳2.5L+',
        'hero.stat2.label': 'Prize Pool',
        'hero.stat3.number': '24/7',
        'hero.stat3.label': 'Tournaments',
        'hero.btn.start': 'START PLAYING',
        'hero.btn.view': 'VIEW TOURNAMENTS',
        
        // Games Section
        'games.title': 'FEATURED',
        'games.title.glow': 'GAMES',
        'games.subtitle': 'Choose your battlefield and dominate',
        'games.players': 'Players',
        'games.pool': 'Pool',
        'games.entry': 'Entry Fee',
        'games.join': 'JOIN TOURNAMENT',
        
        // Live Tournaments
        'live.title': 'LIVE',
        'live.title.glow': 'TOURNAMENTS',
        'live.subtitle': 'Join now and start winning',
        'live.status.live': 'LIVE NOW',
        'live.status.upcoming': 'UPCOMING',
        'live.starts': 'Starts in',
        'live.mins': 'mins',
        'live.prize': 'Prize Pool',
        
        // How It Works
        'how.title': 'HOW IT',
        'how.title.glow': 'WORKS',
        'how.subtitle': 'Start winning in 3 simple steps',
        'how.step1.title': 'Register & Recharge',
        'how.step1.desc': 'Create your account and add funds to your wallet. Minimum recharge ৳50.',
        'how.step2.title': 'Join Tournament',
        'how.step2.desc': 'Choose your game and join any tournament. Entry fee deducted from wallet.',
        'how.step3.title': 'Win & Withdraw',
        'how.step3.desc': 'Win prizes instantly credited to wallet. Withdraw anytime, minimum ৳100.',
        
        // Prizes
        'prizes.title': "TODAY'S",
        'prizes.title.glow': 'PRIZES',
        'prizes.subtitle': 'Real money, instant withdrawals',
        'prizes.1st': '1st Place',
        'prizes.2nd': '2nd Place',
        'prizes.3rd': '3rd Place',
        'prizes.games': 'All Games',
        
        // Footer
        'footer.tagline': "Bangladesh's #1 Gaming Tournament Platform",
        'footer.quick': 'Quick Links',
        'footer.support': 'Support',
        'footer.games': 'Games',
        'footer.help': 'Help Center',
        'footer.contact': 'Contact Us',
        'footer.terms': 'Terms & Conditions',
        'footer.privacy': 'Privacy Policy',
        'footer.rights': 'All rights reserved.',
        'footer.note': 'Play responsibly • 18+ only • Skill-based gaming platform',
        
        // Dashboard
        'dash.title': 'Dashboard',
        'dash.wallet': 'Wallet',
        'dash.history': 'History',
        'dash.profile': 'Profile',
        'dash.balance': 'Wallet Balance',
        'dash.joined': 'Tournaments Joined',
        'dash.wins': 'Total Wins',
        'dash.earnings': 'Total Earnings',
        'dash.addmoney': 'Add Money',
        'dash.withdraw': 'Withdraw',
        
        // Common
        'common.currency': '৳'
    }
};

// Language Management
class LanguageManager {
    constructor() {
        this.currentLang = localStorage.getItem('language') || 'bn';
        this.init();
    }
    
    init() {
        this.createToggleButton();
        this.applyLanguage(this.currentLang);
    }
    
    createToggleButton() {
        const toggle = document.createElement('div');
        toggle.className = 'language-toggle';
        toggle.innerHTML = `
            <button class="lang-btn ${this.currentLang === 'bn' ? 'active' : ''}" onclick="languageManager.setLanguage('bn')">
                বাং
            </button>
            <button class="lang-btn ${this.currentLang === 'en' ? 'active' : ''}" onclick="languageManager.setLanguage('en')">
                ENG
            </button>
        `;
        
        // Add to navbar
        const navbar = document.querySelector('.nav-container');
        if (navbar) {
            navbar.appendChild(toggle);
        }
    }
    
    setLanguage(lang) {
        this.currentLang = lang;
        localStorage.setItem('language', lang);
        this.applyLanguage(lang);
        
        // Update toggle buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
    }
    
    applyLanguage(lang) {
        const trans = translations[lang];
        
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (trans[key]) {
                element.textContent = trans[key];
            }
        });
        
        // Update HTML lang attribute
        document.documentElement.lang = lang;
    }
    
    t(key) {
        return translations[this.currentLang][key] || key;
    }
}

// Initialize language manager
let languageManager;
document.addEventListener('DOMContentLoaded', () => {
    languageManager = new LanguageManager();
});

// Language Toggle Styles
const langStyles = `
    .language-toggle {
        display: flex;
        gap: 0.5rem;
        background: rgba(0, 0, 0, 0.3);
        padding: 0.3rem;
        border-radius: 20px;
        border: 1px solid var(--glass-border);
    }
    
    .lang-btn {
        padding: 0.4rem 1rem;
        background: transparent;
        border: none;
        color: var(--text-secondary);
        font-weight: 600;
        font-size: 0.85rem;
        border-radius: 15px;
        cursor: pointer;
        transition: all 0.3s ease;
        font-family: 'Rajdhani', sans-serif;
    }
    
    .lang-btn:hover {
        color: var(--neon-blue);
    }
    
    .lang-btn.active {
        background: var(--accent-gradient);
        color: #000;
        box-shadow: 0 0 15px var(--neon-blue-glow);
    }
    
    @media (max-width: 768px) {
        .language-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            box-shadow: 0 5px 20px rgba(0, 217, 255, 0.3);
        }
    }
`;

const langStyleSheet = document.createElement('style');
langStyleSheet.textContent = langStyles;
document.head.appendChild(langStyleSheet);
