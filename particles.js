// Optimized Particle Animation - Better Performance
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        if (!this.canvas) return;
        
        this.ctx = this.canvas.getContext('2d', { alpha: true });
        this.particles = [];
        this.particleCount = 40; // Reduced from 80
        this.connectionDistance = 120; // Reduced from 150
        this.animationFrameId = null;
        
        this.resize();
        this.init();
        this.animate();
        
        // Debounced resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => this.resize(), 250);
        });
        
        // Pause on scroll for better performance
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                if (!this.isAnimating) {
                    this.animate();
                }
            }, 100);
        }, { passive: true });
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    init() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.3, // Slower movement
                vy: (Math.random() - 0.5) * 0.3,
                radius: Math.random() * 1.5 + 0.5
            });
        }
    }
    
    animate() {
        this.isAnimating = true;
        
        // Clear with fade effect
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw particles
        for (let i = 0; i < this.particles.length; i++) {
            const particle = this.particles[i];
            
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(0, 217, 255, 0.5)';
            this.ctx.fill();
            
            // Draw connections (optimized - only forward connections)
            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = this.particles[j].x - particle.x;
                const dy = this.particles[j].y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < this.connectionDistance) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = `rgba(0, 217, 255, ${0.15 * (1 - distance / this.connectionDistance)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        }
        
        this.animationFrameId = requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        if (this.animationFrameId) {
            cancelAnimationFrame(this.animationFrameId);
        }
    }
}

// Initialize with performance check
document.addEventListener('DOMContentLoaded', () => {
    // Check if device can handle animations
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const hasLowPerformance = isMobile || navigator.hardwareConcurrency < 4;
    
    if (!hasLowPerformance) {
        new ParticleSystem();
    } else {
        // Use static gradient background for low-performance devices
        const canvas = document.getElementById('particleCanvas');
        if (canvas) {
            canvas.style.background = 'radial-gradient(circle at 20% 50%, rgba(0, 217, 255, 0.03) 0%, transparent 50%)';
        }
    }
});
