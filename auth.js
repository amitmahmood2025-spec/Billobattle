// Auth JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Password toggle functionality
    const togglePasswordButtons = document.querySelectorAll('.toggle-password');
    togglePasswordButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.closest('.form-group').querySelector('input');
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            
            // Toggle icon
            this.classList.toggle('active');
        });
    });
    
    // Login Form Handler
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const btn = loginForm.querySelector('.auth-btn');
            btn.classList.add('loading');
            
            // Get form data
            const formData = new FormData(loginForm);
            const data = {
                email: formData.get('email'),
                password: formData.get('password'),
                remember: formData.get('remember') ? true : false
            };
            
            // Simulate API call (Replace with actual Firebase authentication)
            setTimeout(() => {
                console.log('Login data:', data);
                
                // For demo purposes - redirect to dashboard
                showMessage('success', 'Login successful! Redirecting...');
                
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            }, 1500);
        });
    }
    
    // Register Form Handler
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const btn = registerForm.querySelector('.auth-btn');
            btn.classList.add('loading');
            
            // Get form data
            const formData = new FormData(registerForm);
            const password = formData.get('password');
            const confirmPassword = formData.get('confirm-password');
            
            // Validate passwords match
            if (password !== confirmPassword) {
                btn.classList.remove('loading');
                showMessage('error', 'Passwords do not match!');
                return;
            }
            
            // Validate age checkbox
            if (!formData.get('age')) {
                btn.classList.remove('loading');
                showMessage('error', 'You must be 18+ to register!');
                return;
            }
            
            // Validate terms checkbox
            if (!formData.get('terms')) {
                btn.classList.remove('loading');
                showMessage('error', 'Please accept Terms & Conditions!');
                return;
            }
            
            const data = {
                username: formData.get('username'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                freefire: formData.get('freefire') || null,
                pubg: formData.get('pubg') || null,
                password: password
            };
            
            // Simulate API call (Replace with actual Firebase authentication)
            setTimeout(() => {
                console.log('Register data:', data);
                
                // For demo purposes - show success and redirect
                showMessage('success', 'Account created successfully! Redirecting...');
                
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
            }, 2000);
        });
    }
    
    // Social Login Handlers
    const googleBtn = document.querySelector('.google-btn');
    if (googleBtn) {
        googleBtn.addEventListener('click', () => {
            console.log('Google login clicked');
            // Implement Google OAuth here
            showMessage('error', 'Google login not configured yet!');
        });
    }
    
    // Form validation on input
    const inputs = document.querySelectorAll('input[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', () => {
            validateInput(input);
        });
        
        input.addEventListener('input', () => {
            if (input.classList.contains('invalid')) {
                validateInput(input);
            }
        });
    });
    
    // Input validation function
    function validateInput(input) {
        const value = input.value.trim();
        const type = input.type;
        let isValid = true;
        
        if (!value) {
            isValid = false;
        } else if (type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
        } else if (type === 'tel') {
            const phoneRegex = /^[\d\s\+\-\(\)]+$/;
            isValid = phoneRegex.test(value) && value.length >= 10;
        } else if (input.name === 'password') {
            isValid = value.length >= 6;
        }
        
        if (isValid) {
            input.classList.remove('invalid');
            input.classList.add('valid');
        } else {
            input.classList.add('invalid');
            input.classList.remove('valid');
        }
        
        return isValid;
    }
    
    // Show message function
    function showMessage(type, message) {
        // Remove existing message
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // Create new message
        const messageDiv = document.createElement('div');
        messageDiv.className = `form-message ${type}`;
        messageDiv.textContent = message;
        
        // Insert before form
        const form = document.querySelector('.auth-form');
        form.insertBefore(messageDiv, form.firstChild);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            setTimeout(() => messageDiv.remove(), 300);
        }, 5000);
    }
    
    // Input focus animations
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input');
        if (input) {
            input.addEventListener('focus', () => {
                group.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    group.classList.remove('focused');
                }
            });
        }
    });
});

// Additional styles for input validation
const style = document.createElement('style');
style.textContent = `
    input.valid {
        border-color: var(--success-green) !important;
    }
    
    input.invalid {
        border-color: var(--danger-red) !important;
    }
    
    .form-group.focused label {
        color: var(--neon-blue);
    }
`;
document.head.appendChild(style);
