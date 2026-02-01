// main.js - updated: mobile menu fixes, i18n, Netlify-based recharge form (client-side), and existing performance optimizations
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navButtons = document.querySelector('.nav-buttons');

    const closeMobileMenu = () => {
        if (navLinks) navLinks.classList.remove('active');
        if (navButtons) navButtons.classList.remove('active');
        if (mobileToggle) mobileToggle.classList.remove('active');
    };

    if (mobileToggle) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinks.classList.toggle('active');
            navButtons.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }

    // Close when clicking a nav link (mobile)
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Close when clicking outside the menu on mobile
    document.addEventListener('click', (e) => {
        const target = e.target;
        if (!mobileToggle || !navLinks || !navButtons) return;
        const isOpen = mobileToggle.classList.contains('active');
        if (!isOpen) return;
        const clickInside = navLinks.contains(target) || navButtons.contains(target) || mobileToggle.contains(target);
        if (!clickInside) closeMobileMenu();
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeMobileMenu();
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            closeMobileMenu();
        });
    });

    // -------------------- i18n (simple client-side) --------------------
    const translations = {
        en: {
            nav_home: 'Home', nav_tournaments: 'Tournaments', nav_prizes: 'Prizes', nav_rules: 'Rules', nav_dashboard: 'Dashboard',
            btn_login: 'Login', btn_register: 'Register', hero_subtitle: 'Daily tournaments • Real prizes • Instant withdrawals',
            btn_start: 'START PLAYING', btn_view: 'VIEW TOURNAMENTS', section_featured_games: 'FEATURED GAMES', section_live_tournaments: 'LIVE TOURNAMENTS', footer_tagline: "India's #1 Gaming Tournament Platform",
            btn_recharge: 'Recharge'
        },
        bn: {
            nav_home: 'হোম', nav_tournaments: 'টূর্নামেন্ট', nav_prizes: 'পুরস্কার', nav_rules: 'নিয়ম', nav_dashboard: 'ড্যাশবোর্ড',
            btn_login: 'লগইন', btn_register: 'রেজিস্টার', hero_subtitle: 'দৈনিক টূর্নামেন্ট • আসল পুরস্কার • তাৎক্ষণিক উইথড্রয়াল',
            btn_start: 'খেলা শুরু করুন', btn_view: 'টূর্নামেন্ট দেখুন', section_featured_games: 'নির্বাচিত গেম', section_live_tournaments: 'লাইভ টূর্নামেন্ট', footer_tagline: 'ভারতের #1 গেমিং টূর্নামেন্ট প্ল্যাটফর্ম',
            btn_recharge: 'রিচার্জ'
        }
    };

    const getLang = () => localStorage.getItem('bb_lang') || 'en';
    const setLang = (lang) => { localStorage.setItem('bb_lang', lang); applyTranslations(lang); };

    const applyTranslations = (lang) => {
        const t = translations[lang] || translations.en;
        const nav = document.querySelector('.nav-links');
        if (nav) {
            const links = nav.querySelectorAll('.nav-link');
            if (links[0]) links[0].textContent = t.nav_home;
            if (links[1]) links[1].textContent = t.nav_tournaments;
            if (links[2]) links[2].textContent = t.nav_prizes;
            if (links[3]) links[3].textContent = t.nav_rules;
            if (links[4]) links[4].textContent = t.nav_dashboard;
        }
        const loginBtn = document.querySelector('.btn-login');
        const regBtn = document.querySelector('.btn-register');
        if (loginBtn) loginBtn.textContent = t.btn_login;
        if (regBtn) regBtn.textContent = t.btn_register;
        const heroSubtitle = document.querySelector('.hero-subtitle');
        if (heroSubtitle) heroSubtitle.textContent = t.hero_subtitle;
        const startBtn = document.querySelector('.btn-primary .btn-text');
        const viewBtn = document.querySelector('.btn-secondary .btn-text');
        if (startBtn) startBtn.textContent = t.btn_start;
        if (viewBtn) viewBtn.textContent = t.btn_view;
        document.querySelectorAll('.section-title').forEach(el => {
            const text = el.textContent.toLowerCase();
            if (text.includes('featured')) el.textContent = t.section_featured_games;
            if (text.includes('live')) el.textContent = t.section_live_tournaments;
        });
        const footerTag = document.querySelector('.footer-tagline');
        if (footerTag) footerTag.textContent = t.footer_tagline;
        // Recharge button text if present
        const rBtn = document.querySelector('.btn-recharge');
        if (rBtn) rBtn.textContent = t.btn_recharge;
    };

    // Create language switcher
    const createLangSwitcher = () => {
        if (!navButtons) return;
        const container = document.createElement('div');
        container.className = 'lang-switcher';
        container.innerHTML = `\n      <button class="lang-btn" data-lang="en">EN</button>\n      <button class="lang-btn" data-lang="bn">বাংলা</button>\n    `;
        navButtons.prepend(container);
        container.addEventListener('click', (e) => {
            const btn = e.target.closest('.lang-btn');
            if (!btn) return;
            const lang = btn.getAttribute('data-lang');
            setLang(lang);
            container.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-lang') === lang));
        });
        const active = getLang();
        container.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.getAttribute('data-lang') === active));
    };

    createLangSwitcher();
    applyTranslations(getLang());

    // -------------------- Recharge UI (Netlify form submission) --------------------
    const createRechargeUI = () => {
        if (!navButtons) return;
        const rechargeBtn = document.createElement('button');
        rechargeBtn.className = 'btn-recharge';
        rechargeBtn.type = 'button';
        rechargeBtn.textContent = translations[getLang()].btn_recharge || 'Recharge';
        navButtons.appendChild(rechargeBtn);

        // Modal markup
        const modalHtml = `
      <div class="payment-modal" id="paymentModal" aria-hidden="true">
        <div class="payment-modal-backdrop"></div>
        <div class="payment-modal-content" role="dialog" aria-modal="true">
          <button class="pm-close" aria-label="Close">&times;</button>
          <h3>Recharge Wallet</h3>
          <form id="rechargeForm" name="recharge-request" data-netlify="true" enctype="multipart/form-data">
            <input type="hidden" name="form-name" value="recharge-request">
            <div class="pm-amount">
              <label>Amount (BDT)</label>
              <input type="number" name="amount" id="pmAmount" value="100" min="10" required>
            </div>
            <div class="pm-methods">
              <button type="button" class="pm-method active" data-method="bkash">bKash</button>
              <button type="button" class="pm-method" data-method="nagad">Nagad</button>
              <button type="button" class="pm-method" data-method="rocket">Rocket</button>
            </div>
            <div class="pm-contact">
              <label>Sender Mobile Number</label>
              <input type="text" name="sender_number" id="pmSender" placeholder="01XXXXXXXXX" required>
            </div>
            <div class="pm-txn">
              <label>Transaction ID</label>
              <input type="text" name="transaction_id" id="pmTxn" placeholder="Txn ID" required>
            </div>
            <div class="pm-user">
              <label>Name (optional)</label>
              <input type="text" name="name" placeholder="Your name">
              <label>Email (optional)</label>
              <input type="email" name="email" placeholder="you@example.com">
            </div>
            <div class="pm-upload">
              <label>Screenshot(s) (jpg/png/pdf) - max 3 files, 5MB each</label>
              <input type="file" name="screenshots[]" id="pmFiles" multiple accept="image/png,image/jpeg,application/pdf">
            </div>
            <div class="pm-actions">
              <button class="pm-pay btn-primary" type="submit">Submit</button>
              <div class="pm-status" aria-live="polite"></div>
            </div>
          </form>
        </div>
      </div>
    `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        const modal = document.getElementById('paymentModal');
        const methods = modal.querySelectorAll('.pm-method');
        let selected = 'bkash';
        methods.forEach(m => m.addEventListener('click', () => {
            methods.forEach(x => x.classList.remove('active'));
            m.classList.add('active');
            selected = m.getAttribute('data-method');
        }));

        modal.querySelector('.pm-close').addEventListener('click', () => { closePayment(); });
        modal.querySelector('.payment-modal-backdrop').addEventListener('click', () => { closePayment(); });

        rechargeBtn.addEventListener('click', () => {
            modal.setAttribute('aria-hidden', 'false');
            modal.classList.add('open');
            modal.querySelector('#pmAmount').focus();
        });

        const closePayment = () => { modal.setAttribute('aria-hidden', 'true'); modal.classList.remove('open'); };

        // Form submission via AJAX (FormData) to Netlify
        const form = modal.querySelector('#rechargeForm');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const statusEl = form.querySelector('.pm-status');
            statusEl.textContent = 'Submitting...';

            // Basic client-side validation
            const amount = parseFloat(form.amount.value) || 0;
            const sender = form.sender_number.value.trim();
            const txn = form.transaction_id.value.trim();
            const files = document.getElementById('pmFiles').files;
            if (amount < 10) { statusEl.textContent = 'Minimum amount is 10 BDT.'; return; }
            if (!/^01[0-9]{9}$/.test(sender)) { statusEl.textContent = 'Enter a valid Bangladeshi mobile number.'; return; }
            if (!txn) { statusEl.textContent = 'Transaction ID is required.'; return; }
            if (files.length > 3) { statusEl.textContent = 'Upload up to 3 files.'; return; }
            for (let i=0;i<files.length;i++){
                const f = files[i];
                if (f.size > 5 * 1024 * 1024) { statusEl.textContent = 'Each file must be under 5MB.'; return; }
                const okTypes = ['image/png','image/jpeg','application/pdf'];
                if (!okTypes.includes(f.type)) { statusEl.textContent = 'Only PNG/JPG/PDF files allowed.'; return; }
            }

            // Build FormData
            const formData = new FormData();
            formData.append('form-name', 'recharge-request');
            formData.append('payment_method', selected);
            formData.append('amount', amount);
            formData.append('sender_number', sender);
            formData.append('transaction_id', txn);
            if (form.name && form.name.value) formData.append('name', form.name.value);
            if (form.email && form.email.value) formData.append('email', form.email.value);
            for (let i=0;i<files.length;i++) formData.append('screenshots[]', files[i]);

            try {
                const resp = await fetch('/', { method: 'POST', body: formData });
                if (resp.ok) {
                    statusEl.textContent = 'Submission received. Admin will verify and credit within 24 hours.';
                    form.reset();
                    setTimeout(() => closePayment(), 1500);
                } else {
                    statusEl.textContent = 'Submission failed. Please try again.';
                }
            } catch (err) {
                console.error(err);
                statusEl.textContent = 'Network error. Please try again.';
            }
        });
    };

    createRechargeUI();

    // -------------------- existing performance optimizations (IntersectionObserver, counters, etc) --------------------
    // (preserve original optimized behavior)

    // Intersection Observer for scroll animations
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });

    // Active navigation (throttled)
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) return;
        scrollTimeout = setTimeout(() => {
            scrollTimeout = null;
            let current = '';
            const sections = document.querySelectorAll('section[id]');
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (scrollY >= sectionTop - 200) current = section.getAttribute('id');
            });
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) link.classList.add('active');
            });
        }, 100);
    }, { passive: true });

    // Parallax
    let parallaxTimeout;
    window.addEventListener('scroll', () => {
        if (parallaxTimeout) return;
        parallaxTimeout = setTimeout(() => {
            parallaxTimeout = null;
            const scrolled = window.scrollY;
            const hero = document.querySelector('.hero-content');
            if (hero && scrolled < 500) {
                hero.style.transform = `translateY(${scrolled * 0.2}px)`;
                hero.style.opacity = 1 - scrolled / 600;
            }
        }, 16);
    }, { passive: true });

    // Counters
    const animateCounter = (element, target, duration = 1500) => {
        let start = 0;
        const increment = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) { element.textContent = target; clearInterval(timer); }
            else element.textContent = Math.floor(current);
        }, 16);
    };
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const text = entry.target.textContent;
                const number = parseInt(text.replace(/[^	\d]/g, ''));
                if (!isNaN(number)) { entry.target.textContent = '0'; animateCounter(entry.target, number); }
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    document.querySelectorAll('.stat-number').forEach(stat => statObserver.observe(stat));

    // Debounced button loading
    document.querySelectorAll('.btn-primary, .btn-register, .game-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                setTimeout(() => this.classList.remove('loading'), 800);
            }
        });
    });
});

// Reduce motion for low-performance devices
if (navigator.hardwareConcurrency < 4 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    document.documentElement.classList.add('reduce-motion');
}

const style = document.createElement('style');
style.textContent = `
    .reduce-motion * { animation-duration: 0.01ms !important; animation-iteration-count: 1 !important; transition-duration: 0.01ms !important; }
    .game-card, .tournament-item, .stat-card { transform: translateZ(0); will-change: transform; }
    @media (hover: hover) { .game-card:hover, .tournament-item:hover { transform: translateY(-5px) translateZ(0); } }
`;
document.head.appendChild(style);

console.log('%c⚡ Optimized Performance Mode Active', 'color: #00d9ff; font-size: 14px; font-weight: bold;');