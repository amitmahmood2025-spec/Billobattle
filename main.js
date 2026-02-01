// Optimized Main JavaScript - Better Performance
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const navButtons = document.querySelector('.nav-buttons');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navButtons.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }
    
    // Smooth scrolling (with passive listener)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Intersection Observer for scroll animations (more efficient)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });
    
    // Active navigation (throttled for performance)
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) return;
        
        scrollTimeout = setTimeout(() => {
            scrollTimeout = null;
            
            let current = '';
            const sections = document.querySelectorAll('section[id]');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (scrollY >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').slice(1) === current) {
                    link.classList.add('active');
                }
            });
        }, 100);
    }, { passive: true });
    
    // Reduced parallax effect (better performance)
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
        }, 16); // ~60fps
    }, { passive: true });
    
    // Optimized counter animation
    const animateCounter = (element, target, duration = 1500) => {
        let start = 0;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 16);
    };
    
    // Observe stat numbers
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                const text = entry.target.textContent;
                const number = parseInt(text.replace(/[^\d]/g, ''));
                if (!isNaN(number)) {
                    entry.target.textContent = '0';
                    animateCounter(entry.target, number);
                }
                statObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    document.querySelectorAll('.stat-number').forEach(stat => {
        statObserver.observe(stat);
    });
    
    // Debounced button loading
    document.querySelectorAll('.btn-primary, .btn-register, .game-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 800);
            }
        });
    });
});

// Disable animations on low-performance devices
if (navigator.hardwareConcurrency < 4 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
    document.documentElement.classList.add('reduce-motion');
}

// Add performance-friendly CSS
const style = document.createElement('style');
style.textContent = `
    .reduce-motion * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
    
    /* GPU acceleration for smooth animations */
    .game-card, .tournament-item, .stat-card {
        transform: translateZ(0);
        will-change: transform;
    }
    
    /* Optimize hover effects */
    @media (hover: hover) {
        .game-card:hover, .tournament-item:hover {
            transform: translateY(-5px) translateZ(0);
        }
    }
`;
document.head.appendChild(style);

// Console message
console.log('%c⚡ Optimized Performance Mode Active', 'color: #00d9ff; font-size: 14px; font-weight: bold;');
