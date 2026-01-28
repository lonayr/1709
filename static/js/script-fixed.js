// Simple Dark Mode Toggle
document.addEventListener('DOMContentLoaded', function() {
    console.log('Simple dark mode script loaded');

    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    if (!themeToggle) {
        console.error('Theme toggle button not found');
        return;
    }

    console.log('Theme toggle found');

    // Check for saved theme preference or system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

    // Apply the current theme
    body.setAttribute('data-theme', currentTheme);
    console.log('Initial theme set to:', currentTheme);

    // Toggle theme on button click
    themeToggle.addEventListener('click', function(e) {
        e.preventDefault();
        console.log('Theme toggle clicked');

        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

        console.log('Switching from', currentTheme, 'to', newTheme);

        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        console.log('Theme switched to:', newTheme);
    });
});

// ------------------ Page Transition System ------------------
class PageTransition {
    constructor() {
        this.currentEffect = localStorage.getItem('transitionEffect') || 'rotate';
        this.init();
    }

    init() {
        this.createTransitionContainer();
        this.addLinkListeners();
        this.createSelectorUI();
        this.updateSelectorUI();
    }

    createTransitionContainer() {
        const container = document.createElement('div');
        container.id = 'page-transition';
        container.innerHTML = '<div class="transition-overlay"></div>';
        document.body.appendChild(container);
        this.container = container;
        this.overlay = container.querySelector('.transition-overlay');
    }

    addLinkListeners() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a[href]');
            if (link && this.shouldTransition(link)) {
                e.preventDefault();
                this.transitionTo(link.href);
            }
        });
    }

    shouldTransition(link) {
        const href = link.getAttribute('href');
        return href &&
               !href.startsWith('#') &&
               !href.startsWith('javascript:') &&
               !href.includes('mailto:') &&
               !href.includes('tel:') &&
               !link.hasAttribute('download') &&
               !link.getAttribute('target') === '_blank';
    }

    transitionTo(url) {
        this.showTransition();

        setTimeout(() => {
            window.location.href = url;
        }, 600);
    }

    showTransition() {
        this.container.classList.add('active');
        this.overlay.className = `transition-overlay ${this.currentEffect}`;

        // Add spinner
        const spinner = document.createElement('div');
        spinner.className = 'transition-spinner';
        this.overlay.appendChild(spinner);
    }

    setEffect(effect) {
        this.currentEffect = effect;
        localStorage.setItem('transitionEffect', effect);
        this.updateSelectorUI();
        this.showNotification(`تم تغيير التأثير إلى: ${this.getEffectName(effect)}`, 'success');
    }

    getEffectName(effect) {
        const names = {
            'rotate': 'دوران',
            'flip': 'قلب',
            'swipe': 'انزلاق',
            'fade': 'تلاشي',
            'circle': 'دائري'
        };
        return names[effect] || effect;
    }

    createSelectorUI() {
        const selector = document.createElement('div');
        selector.id = 'transition-selector';
        selector.innerHTML = `
            <div class="selector-toggle" title="تأثيرات الانتقال">🎭</div>
            <div class="selector-menu">
                <h4>اختر تأثير الانتقال</h4>
                <div class="effect-buttons">
                    <button class="effect-btn" data-effect="rotate">دوران</button>
                    <button class="effect-btn" data-effect="flip">قلب</button>
                    <button class="effect-btn" data-effect="swipe">انزلاق</button>
                    <button class="effect-btn" data-effect="fade">تلاشي</button>
                    <button class="effect-btn" data-effect="circle">دائري</button>
                </div>
                <div class="selector-info">اضغط 1-5 للتغيير السريع</div>
            </div>
        `;
        document.body.appendChild(selector);

        // Add event listeners
        const toggle = selector.querySelector('.selector-toggle');
        const menu = selector.querySelector('.selector-menu');
        const buttons = selector.querySelectorAll('.effect-btn');

        toggle.addEventListener('click', () => {
            menu.classList.toggle('show');
        });

        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const effect = btn.dataset.effect;
                this.setEffect(effect);
                menu.classList.remove('show');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!selector.contains(e.target)) {
                menu.classList.remove('show');
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            const effects = ['rotate', 'flip', 'swipe', 'fade', 'circle'];
            const key = parseInt(e.key) - 1;
            if (key >= 0 && key < effects.length) {
                this.setEffect(effects[key]);
            }
        });
    }

    updateSelectorUI() {
        const buttons = document.querySelectorAll('.effect-btn');
        buttons.forEach(btn => {
            if (btn.dataset.effect === this.currentEffect) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `transition-notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ'}</span>
                <span class="notification-message">${message}</span>
            </div>
        `;

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--bg-white);
            color: var(--text-dark);
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: var(--shadow-lg);
            border: 1px solid var(--border-color);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-family: 'Poppins', sans-serif;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

// ------------------ Initialize Everything ------------------
document.addEventListener('DOMContentLoaded', function() {
    // Initialize page transitions
    new PageTransition();

    // Initialize other interactions
    initializeInteractions();
});

function initializeInteractions() {
    // Mobile Menu
    const menuBtn = document.querySelector('.menubtn');
    const menuCloseBtn = document.querySelector('.menuClosebtn');
    const mobMenu = document.querySelector('.mob-menu');

    if (menuBtn && mobMenu) {
        menuBtn.addEventListener('click', function() {
            mobMenu.style.display = 'block';
            menuBtn.style.display = 'none';
            menuCloseBtn.style.display = 'block';
        });
    }

    if (menuCloseBtn && mobMenu) {
        menuCloseBtn.addEventListener('click', function() {
            mobMenu.style.display = 'none';
            menuBtn.style.display = 'block';
            menuCloseBtn.style.display = 'none';
        });
    }

    // Desktop Categories
    const categoryMenu = document.querySelector('.desktop-categories');
    const categoryBtn = document.querySelector('.desktop-categories-btn');

    if (categoryBtn && categoryMenu) {
        categoryBtn.addEventListener('click', function() {
            categoryMenu.classList.toggle('show');
        });

        window.addEventListener('click', (event) => {
            if (!event.target.closest('.desktop-categories') && !event.target.closest('.desktop-categories-btn')) {
                categoryMenu.classList.remove('show');
            }
        });
    }

    // FAQ Accordion
    const faqs = document.querySelectorAll(".faq");
    faqs.forEach((faq) => {
        const ques = faq.querySelector(".question");
        const ans = faq.querySelector(".answer");

        if (ques && ans) {
            ques.addEventListener("click", () => {
                ans.classList.toggle("show");
            });
        }
    });

    // Counter Animation
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toLocaleString() + '+';
        }, 16);
    }

    // Trigger counters when in viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/\D/g, ''));
                animateCounter(counter, target);
                observer.unobserve(counter);
            }
        });
    });

    document.querySelectorAll('.students-count p, .instructors-count p, .courses-count p').forEach(counter => {
        observer.observe(counter);
    });

    // Scroll to Top Button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 45px;
        height: 45px;
        background: #8710d8;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 20px;
        display: none;
        z-index: 100;
        box-shadow: 0 4px 15px rgba(135, 16, 216, 0.3);
        transition: all 0.3s ease;
    `;

    document.body.appendChild(scrollTopBtn);

    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.05)';
        this.style.boxShadow = 'var(--shadow-xl)';
        this.style.background = 'var(--gradient-secondary)';
    });

    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = 'var(--shadow-lg)';
        this.style.background = 'var(--gradient-primary)';
    });

    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });

    // Form Validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff4757';

                    setTimeout(() => {
                        input.style.borderColor = '';
                    }, 2000);
                }
            });

            if (!isValid) {
                e.preventDefault();
                alert('يرجى ملء جميع الحقول المطلوبة.');
            }
        });
    });

    // Enhanced Course Selection with Loading Animation
    const courseLinks = document.querySelectorAll('.course-link');
    courseLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const courseCard = this.closest('.course');
            if (courseCard) {
                courseCard.classList.add('course-loading');

                // Add success animation after a short delay
                setTimeout(() => {
                    courseCard.classList.add('success-animation');
                    setTimeout(() => {
                        courseCard.classList.remove('course-loading', 'success-animation');
                    }, 500);
                }, 300);
            }
        });
    });

    // Enhanced Button Interactions
    const interactiveButtons = document.querySelectorAll('.btn, .enroll-btn, .category-link');
    interactiveButtons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.classList.add('scale-hover');
        });

        button.addEventListener('mouseup', function() {
            this.classList.remove('scale-hover');
        });

        button.addEventListener('mouseleave', function() {
            this.classList.remove('scale-hover');
        });
    });

    // Page Transition Effects
    function createPageTransition() {
        const overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        overlay.innerHTML = '<div class="spinner"></div>';
        document.body.appendChild(overlay);
        return overlay;
    }

    const transitionOverlay = createPageTransition();

    document.addEventListener('click', function(e) {
        const link = e.target.closest('a[href]');
        if (link && shouldUseTransition(link)) {
            e.preventDefault();
            showPageTransition(link.href);
        }
    });

    function shouldUseTransition(link) {
        const href = link.getAttribute('href');
        return href &&
               !href.startsWith('#') &&
               !href.startsWith('javascript:') &&
               !href.includes('mailto:') &&
               !href.includes('tel:') &&
               !link.hasAttribute('download') &&
               !link.getAttribute('target') === '_blank' &&
               !link.classList.contains('no-transition');
    }

    function showPageTransition(url) {
        transitionOverlay.classList.add('active');

        setTimeout(() => {
            window.location.href = url;
        }, 500);
    }

    // Smooth Scroll for Anchor Links
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

    // Enhanced Mobile Menu with Animation
    const mobileMenuBtn = document.querySelector('.menubtn');
    const mobileMenu = document.querySelector('.mob-menu');
    const mobileMenuClose = document.querySelector('.menuClosebtn');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.add('active');
            mobileMenuBtn.style.display = 'none';
            if (mobileMenuClose) mobileMenuClose.style.display = 'block';
        });
    }

    if (mobileMenuClose && mobileMenu) {
        mobileMenuClose.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.style.display = 'block';
            mobileMenuClose.style.display = 'none';
        });
    }

    // Intersection Observer for Fade-in Animations
    const fadeObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeObserver.unobserve(entry.target);
            }
        });
    }, fadeObserverOptions);

    // Observe elements for fade-in animation
    document.querySelectorAll('.course, .category, .testimonial, .faq').forEach(el => {
        fadeObserver.observe(el);
    });

    // Enhanced Counter Animation with Intersection Observer
    const counterObserverOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/\D/g, ''));
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    }, counterObserverOptions);

    document.querySelectorAll('.students-count p, .instructors-count p, .courses-count p').forEach(counter => {
        counterObserver.observe(counter);
    });

    // Notification System
    function showNotification(message, type = 'info', duration = 3000) {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${getNotificationIcon(type)}</span>
                <span class="notification-message">${message}</span>
            </div>
        `;

        Object.assign(notification.style, {
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: 'var(--bg-white)',
            color: 'var(--text-dark)',
            padding: '1rem 1.5rem',
            borderRadius: '8px',
            boxShadow: 'var(--shadow-lg)',
            border: '1px solid var(--border-color)',
            zIndex: '10000',
            transform: 'translateX(100%)',
            transition: 'transform 0.3s ease',
            fontFamily: "'Poppins', sans-serif",
            maxWidth: '300px'
        });

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, duration);
    }

    function getNotificationIcon(type) {
        const icons = {
            success: '✓',
            error: '✕',
            warning: '⚠',
            info: 'ℹ'
        };
        return icons[type] || 'ℹ';
    }

    // Add pulse effect to important buttons
    document.querySelectorAll('.hero-cta-btn .btn').forEach(btn => {
        btn.classList.add('pulse');
    });

    // Enhanced Form Feedback
    document.querySelectorAll('input, textarea').forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function() {
            this.parentElement.classList.remove('focused');
        });
    });

    // FAQ Functionality
    const faqQuestions = document.querySelectorAll('.faq');
    faqQuestions.forEach(faq => {
        const question = faq.querySelector('.question');
        if (question) {
            question.addEventListener('click', () => {
                faq.classList.toggle('active');
            });
        }
    });

    // Courses Popover Functionality
    const coursesPopoverBtn = document.getElementById('courses-popover-btn');
    const coursesPopover = document.getElementById('courses-popover');
    const closePopoverBtn = document.getElementById('close-popover');

    if (coursesPopoverBtn && coursesPopover) {
        // Open popover
        coursesPopoverBtn.addEventListener('click', () => {
            coursesPopover.classList.add('show');
            document.body.style.overflow = 'hidden';
        });
    }

    if (closePopoverBtn && coursesPopover) {
        // Close popover
        closePopoverBtn.addEventListener('click', () => {
            coursesPopover.classList.remove('show');
            document.body.style.overflow = 'auto';
        });
    }

    if (coursesPopover) {
        // Close popover when clicking outside
        coursesPopover.addEventListener('click', (e) => {
            if (e.target === coursesPopover) {
                coursesPopover.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });

        // Close popover on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && coursesPopover.classList.contains('show')) {
                coursesPopover.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Testimonial Carousel Auto-scroll
    const testimonialCarousel = document.querySelector('.testimonial-carousel');
    if (testimonialCarousel) {
        setInterval(() => {
            testimonialCarousel.scrollBy({ left: 300, behavior: 'smooth' });
            
            // Reset to start if reached end
            if (testimonialCarousel.scrollLeft + testimonialCarousel.clientWidth >= testimonialCarousel.scrollWidth) {
                setTimeout(() => {
                    testimonialCarousel.scrollTo({ left: 0, behavior: 'smooth' });
                }, 2000);
            }
        }, 4000);
    }
}
