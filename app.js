// Sicily Rent Experience for Host - JavaScript

// DOM Elements
const contactModal = document.getElementById('contact-modal');
const contactForm = document.querySelector('.contact-form');

// Modal Functions
function openContactModal() {
    contactModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeContactModal() {
    contactModal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// FAQ Accordion Functions
function toggleFaq(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq__item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Form Submission Handler
function handleSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const data = {
        name: formData.get('name') || document.getElementById('name').value,
        email: formData.get('email') || document.getElementById('email').value,
        phone: formData.get('phone') || document.getElementById('phone').value,
        city: formData.get('city') || document.getElementById('city').value,
        message: formData.get('message') || document.getElementById('message').value
    };
    
    // Simple validation
    if (!data.name || !data.email || !data.phone || !data.city) {
        alert('Per favore, completa tutti i campi obbligatori.');
        return;
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
        alert('Per favore, inserisci un indirizzo email valido.');
        return;
    }
    
    // Simulate form submission
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    
    submitButton.textContent = 'Invio in corso...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        alert('Grazie per la tua richiesta! Ti contatteremo entro 24 ore.');
        closeContactModal();
        contactForm.reset();
        
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 2000);
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Header Scroll Effect
function initHeaderScrollEffect() {
    const header = document.querySelector('.header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.background = 'rgba(255, 255, 253, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'var(--color-surface)';
            header.style.backdropFilter = 'none';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Animation on Scroll (Simple Implementation)
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animateElements = document.querySelectorAll(
        '.benefit-card, .service-card, .testimonial-card, .process__step, .pricing-card'
    );
    
    animateElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(el);
    });
}

// Close modal when clicking outside
function initModalCloseOnOutsideClick() {
    contactModal.addEventListener('click', function(event) {
        if (event.target === this) {
            closeContactModal();
        }
    });
}

// Keyboard Navigation for Accessibility
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(event) {
        // Close modal with Escape key
        if (event.key === 'Escape' && !contactModal.classList.contains('hidden')) {
            closeContactModal();
        }
    });
}

// Stats Counter Animation
function initStatsCounter() {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.hero__stat-number');
                const finalNumber = statNumber.textContent;
                
                if (finalNumber.includes('+')) {
                    // Animate percentage
                    const number = parseInt(finalNumber.replace(/[^0-9]/g, ''));
                    animateNumber(statNumber, 0, number, finalNumber.replace(/[0-9]/g, ''));
                } else if (finalNumber.includes('1000+')) {
                    animateNumber(statNumber, 0, 1000, '+');
                } else if (finalNumber === '24/7') {
                    // No animation for 24/7
                    return;
                }
                
                statsObserver.unobserve(entry.target);
            }
        });
    });
    
    document.querySelectorAll('.hero__stat').forEach(stat => {
        statsObserver.observe(stat);
    });
}

function animateNumber(element, start, end, suffix) {
    const duration = 2000;
    const startTime = performance.now();
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const current = Math.floor(start + (end - start) * easeOutQuart(progress));
        element.textContent = current + suffix;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

function easeOutQuart(t) {
    return 1 - (--t) * t * t * t;
}

// Mobile Menu Toggle (for future enhancement)
function initMobileMenu() {
    // This can be expanded for mobile hamburger menu functionality
    const navMenu = document.querySelector('.nav__menu');
    
    // Check if screen is mobile size
    function checkMobileScreen() {
        if (window.innerWidth <= 768) {
            navMenu.style.display = 'none';
        } else {
            navMenu.style.display = 'flex';
        }
    }
    
    window.addEventListener('resize', checkMobileScreen);
    checkMobileScreen();
}

// Form Input Enhancement
function initFormEnhancements() {
    const formInputs = document.querySelectorAll('.form-control');
    
    formInputs.forEach(input => {
        // Add focus/blur effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Real-time validation feedback
        input.addEventListener('input', function() {
            if (this.type === 'email') {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (this.value && !emailRegex.test(this.value)) {
                    this.style.borderColor = 'var(--color-error)';
                } else {
                    this.style.borderColor = 'var(--color-border)';
                }
            }
            
            if (this.type === 'tel') {
                // Simple phone validation (Italian format)
                const phoneRegex = /^[+]?[0-9\s\-\(\)]{10,}$/;
                if (this.value && !phoneRegex.test(this.value)) {
                    this.style.borderColor = 'var(--color-error)';
                } else {
                    this.style.borderColor = 'var(--color-border)';
                }
            }
        });
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initSmoothScrolling();
    initHeaderScrollEffect();
    initScrollAnimations();
    initModalCloseOnOutsideClick();
    initKeyboardNavigation();
    initStatsCounter();
    initMobileMenu();
    initFormEnhancements();
    
    // Add loading animation completion
    document.body.classList.add('loaded');
});

// Add some CSS for the loaded state
const style = document.createElement('style');
style.textContent = `
    .form-group.focused .form-label {
        color: var(--color-primary);
    }
    
    body:not(.loaded) * {
        animation-play-state: paused;
    }
    
    .loaded {
        animation-play-state: running;
    }
`;
document.head.appendChild(style);