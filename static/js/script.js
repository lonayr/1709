
// ------------------ Desktop Categories ------------------

const CategoryMenu = document.querySelector('.desktop-categories');
const CategoryMenuBtn = document.querySelector('.desktop-categories-btn');

CategoryMenuBtn.addEventListener('click', () => {
    CategoryMenu.classList.toggle('show');
});

// displays the menu on hover

// CategoryMenuBtn.addEventListener('mouseenter', () => {
//   CategoryMenu.classList.add('show');
// });

// CategoryMenu.addEventListener('mouseleave', () => {
//   CategoryMenu.classList.remove('show');
// });

window.addEventListener('click', (event) => {
    if (!event.target.closest('.desktop-categories') && !event.target.closest('.desktop-categories-btn')) {
        CategoryMenu.classList.remove('show');
    }
});


// ------------------ Mobile Devices Navebar ------------------

const mobMenuBtn = document.querySelector('.menubtn');
const mobMenuCloseBtn = document.querySelector('.menuClosebtn');
const mobMenu = document.querySelector('.mob-menu');

// donot changes the menu icon to x

// mobMenuBtn.addEventListener('click', () => {
//     mobMenu.classList.toggle('show');
// })

// mobCategoriesBtn.addEventListener('click', () => {
//     mobCategoriesMenu.classList.toggle('show');
// })

// changes menu icon to x

mobMenuBtn.addEventListener('click', () => {
    mobMenu.style.display='block';
    mobMenuBtn.style.display='none';
    mobMenuCloseBtn.style.display='block';
})

mobMenuCloseBtn.addEventListener('click', ()=> {
    mobMenu.style.display='none';
    mobMenuBtn.style.display='block';
    mobMenuCloseBtn.style.display='none';
})

window.addEventListener('click', (event) => {
    if (!event.target.closest('.mob-menu') && !event.target.closest('.menubtn')) {
      mobMenu.style.display = 'none';
      mobMenuBtn.style.display = 'block';
      mobMenuCloseBtn.style.display = 'none';
    }
});

//  ------------------ Mobile Devices Categories ------------------

const mobCategoriesBtn = document.querySelector('.categories-btn');
const mobCategorieClosesBtn = document.querySelector('.categories-close-btn');
const mobCategoriesMenu = document.querySelector('.mob-categories');
const mobCategoriesParent = document.querySelector('.categories-btn').parentNode;

// mobCategoriesBtn.addEventListener('click', () => {
//     mobCategoriesMenu.classList.toggle('show');
// })

// mobCategoriesBtn.addEventListener('click', () => {
//     mobCategoriesMenu.style.display='block';
//     mobCategoriesBtn.style.display='none';
//     mobCategorieClosesBtn.style.display='block';
// })

// mobCategorieClosesBtn.addEventListener('click', () => {
//     mobCategoriesMenu.style.display='none';
//     mobCategoriesBtn.style.display='block';
//     mobCategorieClosesBtn.style.display='none';
// })

let isCategoriesOpen = false;

mobCategoriesParent.addEventListener('click', () => {
    isCategoriesOpen = !isCategoriesOpen;
    mobCategoriesMenu.style.display = isCategoriesOpen ? 'block' : 'none';
    mobCategoriesBtn.style.display = isCategoriesOpen ? 'none' : 'block';
    mobCategorieClosesBtn.style.display = isCategoriesOpen ? 'block' : 'none';
});

//  ------------------ FAQ ------------------

const faqs = document.querySelectorAll(".faq");

faqs.forEach((faq) => {
  const ques = faq.querySelector(".question");
  const ans = faq.querySelector(".answer");

  ques.addEventListener("click", () => {
    ans.classList.toggle("show");
  });
});

const sidebarBtn = document.querySelector(".sidebar-toggle");
const sidebarMenu = document.querySelector(".sidebar");

sidebarBtn.addEventListener('click', () => {
    sidebarMenu.classList.toggle('show');
    // sidebarBtn.style.left='66%'
});
// تأثير عد الأرقام بسلاسة
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

// تفعيل عند التمرير
window.addEventListener('scroll', function() {
    const section = document.querySelector('.about-numbers');
    const position = section.getBoundingClientRect();
    
    if (position.top < window.innerHeight && position.bottom >= 0) {
        const counters = document.querySelectorAll('.students-count p, .instructors-count p, .courses-count p');
        counters.forEach(counter => {
            const target = parseInt(counter.textContent.replace(/\D/g, ''));
            animateCounter(counter, target);
        });
        // إزالة المستمع بعد التنفيذ
        window.removeEventListener('scroll', arguments.callee);
    }
});
// تأثير ظهور البطاقات بالتتابع
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.social-card');
    
    cards.forEach((card, index) => {
        card.style.setProperty('--card-index', index);
        card.style.opacity = '0';
        card.style.animation = 'fadeInUp 0.6s ease-out forwards';
        card.style.animationDelay = `${index * 0.2}s`;
    });
    
    // إضافة تأثير عند المرور على البطاقات
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
});

// إضافة تأثيرات للروابط
document.querySelectorAll('.contact-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        
        // تأثير النقر
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
            window.open(href, '_blank');
        }, 150);
    });
});
// var lessonCount = 1;
//     document.getElementById('add-lesson').addEventListener('click', function() {
//       lessonCount++;
//       var lesson = document.createElement('div');
//       lesson.classList.add('form-group', 'lesson');
//       lesson.innerHTML = `
//         <div>
//         <label for="lesson_title_${lessonCount}">Lesson Title:</label>
//         <input type="text" class="form-control" id="lesson_title_${lessonCount}" name="lesson_title_${lessonCount}" required>
//         </div>
//         <div>
//         <label for="lesson_video_${lessonCount}">Lesson Video:</label>
//         <input type="file" class="form-control-file" id="lesson_video_${lessonCount}" name="lesson_video_${lessonCount}" accept="video/*" required>
//         </div>
//       `;
//       document.getElementById('lesson-fields').appendChild(lesson);
//     });

// let lessonCount = 1;

// function addLessonInput() {
//   lessonCount++;
//   const lessonsDiv = document.querySelector('.lesson-inputs');
//   const newLessonDiv = document.createElement('div');
//   newLessonDiv.classList.add('lesson');
//   newLessonDiv.innerHTML = `
//     <h4>Lesson ${lessonCount}</h4>
//     <div>
//       <label for="lesson_${lessonCount}_title">Lesson Title</label>
//       <input type="text" class="form-control" id="lesson_${lessonCount}_title" name="lesson_${lessonCount}_title" required>
//     </div>
//     <div>
//       <label for="lesson_${lessonCount}_video">Lesson Video</label>
//       <input type="file" class="form-control-file" id="lesson_${lessonCount}_video" name="lesson_${lessonCount}_video" accept="video/*" required>
//     </div>
//   `;
//   lessonsDiv.appendChild(newLessonDiv);
// }

// const addLessonButton = document.createElement('button');
// addLessonButton.textContent = 'Add Lesson';
// addLessonButton.type = 'button';
// addLessonButton.style.marginBottom = '1rem'
// addLessonButton.addEventListener('click', addLessonInput);
// const submitButton = document.querySelector('.upload-course');
// submitButton.insertAdjacentElement('beforebegin', addLessonButton);
// script.js محسن
document.addEventListener('DOMContentLoaded', function() {
    // ====== Mobile Menu ======
    const menuBtn = document.querySelector('.menubtn');
    const menuCloseBtn = document.querySelector('.menuClosebtn');
    const mobMenu = document.querySelector('.mob-menu');
    const desktopCategoriesBtn = document.querySelector('.desktop-categories-btn');
    const desktopCategories = document.querySelector('.desktop-categories');
    const categoriesBtn = document.querySelector('.categories-btn');
    const categoriesCloseBtn = document.querySelector('.categories-close-btn');
    const mobCategories = document.querySelector('.mob-categories');

    // Mobile Menu Toggle
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

    // Desktop Categories Hover
    if (desktopCategoriesBtn && desktopCategories) {
        desktopCategoriesBtn.addEventListener('mouseenter', function() {
            desktopCategories.style.opacity = '1';
            desktopCategories.style.visibility = 'visible';
            desktopCategories.style.transform = 'translateY(0)';
        });

        desktopCategoriesBtn.addEventListener('mouseleave', function(e) {
            if (!desktopCategories.matches(':hover')) {
                desktopCategories.style.opacity = '0';
                desktopCategories.style.visibility = 'hidden';
                desktopCategories.style.transform = 'translateY(-10px)';
            }
        });

        desktopCategories.addEventListener('mouseleave', function() {
            desktopCategories.style.opacity = '0';
            desktopCategories.style.visibility = 'hidden';
            desktopCategories.style.transform = 'translateY(-10px)';
        });
    }

    // Mobile Categories Toggle
    if (categoriesBtn && mobCategories) {
        categoriesBtn.addEventListener('click', function() {
            mobCategories.style.display = mobCategories.style.display === 'none' ? 'block' : 'none';
            categoriesBtn.style.display = 'none';
            categoriesCloseBtn.style.display = 'inline-block';
        });
    }

    if (categoriesCloseBtn && mobCategories) {
        categoriesCloseBtn.addEventListener('click', function() {
            mobCategories.style.display = 'none';
            categoriesBtn.style.display = 'inline-block';
            categoriesCloseBtn.style.display = 'none';
        });
    }

    // ====== Smooth Scrolling ======
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ====== Active Nav Link ======
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('nav ul li a');
        
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (linkPath === currentPath) {
                link.style.color = '#8710d8';
                link.style.fontWeight = '600';
            }
        });
    }
    setActiveNavLink();

    // ====== Hover Effects ======
    // Nav Links Hover
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            if (this.style.color !== '#8710d8') {
                this.style.color = '#555';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            const currentPath = window.location.pathname;
            const linkPath = this.getAttribute('href');
            if (linkPath !== currentPath) {
                this.style.color = '';
            }
        });
    });

    // Button Hover Effects
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(135, 16, 216, 0.3)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });

    // Social Icons Hover
    const socialIcons = document.querySelectorAll('.foot-socials a');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ====== Form Validation ======
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const inputs = this.querySelectorAll('input[required], textarea[required]');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#ff4757';
                    
                    // Remove error after 2 seconds
                    setTimeout(() => {
                        input.style.borderColor = '';
                    }, 2000);
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields.');
            }
        });
    });

    // ====== Scroll to Top Button ======
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
        this.style.transform = 'translateY(-3px)';
        this.style.boxShadow = '0 6px 20px rgba(135, 16, 216, 0.4)';
    });
    
    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 15px rgba(135, 16, 216, 0.3)';
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

    // ====== Page Load Animation ======
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // ====== Image Lazy Loading ======
    const images = document.querySelectorAll('img');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    }, {
        rootMargin: '50px'
    });
    
    images.forEach(img => {
        if (img.dataset.src) {
            imageObserver.observe(img);
        }
    });

    // ====== Keyboard Navigation ======
    document.addEventListener('keydown', function(e) {
        // Tab navigation focus style
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('click', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // ====== Counter Animation ======
    function animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value.toLocaleString() + '+';
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Trigger counters when in viewport
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/\D/g, ''));
                animateCounter(counter, 0, target, 2000);
                observer.unobserve(counter);
            }
        });
    });
    
    document.querySelectorAll('.students-count p, .instructors-count p, .courses-count p').forEach(counter => {
        observer.observe(counter);
    });
});
// DASHBOARD NAVBAR INTERACTIONS
document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const nav = document.querySelector('header nav');
    const desktopCategoriesBtn = document.querySelector('.desktop-categories-btn');
    const desktopCategories = document.querySelector('.desktop-categories');
    const menuBtn = document.querySelector('.menubtn');
    const menuCloseBtn = document.querySelector('.menuClosebtn');
    const navList = document.querySelector('header nav ul');
    const navLinks = document.querySelectorAll('header nav ul li a');
    const buttons = document.querySelectorAll('header nav .btn');
    
    // 1. Scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 20) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
    
    // 2. Desktop Categories Hover
    if (desktopCategoriesBtn && desktopCategories) {
        desktopCategoriesBtn.addEventListener('mouseenter', function() {
            desktopCategories.classList.add('show');
        });
        
        desktopCategoriesBtn.addEventListener('mouseleave', function(e) {
            // Check if mouse is over categories
            if (!desktopCategories.matches(':hover')) {
                desktopCategories.classList.remove('show');
            }
        });
        
        desktopCategories.addEventListener('mouseleave', function() {
            desktopCategories.classList.remove('show');
        });
        
        // Also work on click for mobile
        desktopCategoriesBtn.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                desktopCategories.classList.toggle('show');
                e.preventDefault();
            }
        });
    }
    
    // 3. Mobile Menu Toggle
    if (menuBtn && menuCloseBtn && navList) {
        menuBtn.addEventListener('click', function() {
            navList.classList.add('show');
            menuBtn.style.display = 'none';
            menuCloseBtn.style.display = 'block';
        });
        
        menuCloseBtn.addEventListener('click', function() {
            navList.classList.remove('show');
            menuBtn.style.display = 'block';
            menuCloseBtn.style.display = 'none';
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && navList.classList.contains('show')) {
                navList.classList.remove('show');
                menuBtn.style.display = 'block';
                menuCloseBtn.style.display = 'none';
            }
        });
    }
    
    // 4. Active Link Highlighting
    function setActiveLink() {
        const currentPath = window.location.pathname;
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href');
            if (linkPath === currentPath) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
    setActiveLink();
    
    // 5. Button Hover Effects
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 20px rgba(135, 16, 216, 0.4)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
        
        btn.addEventListener('click', function() {
            // Add click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    // 6. Nav Link Hover Effects
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.color = '#8710d8';
            }
        });
        
        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.color = '';
            }
        });
        
        link.addEventListener('click', function() {
            // Close mobile menu if open
            if (window.innerWidth <= 768 && navList.classList.contains('show')) {
                navList.classList.remove('show');
                if (menuBtn && menuCloseBtn) {
                    menuBtn.style.display = 'block';
                    menuCloseBtn.style.display = 'none';
                }
            }
        });
    });
    
    // 7. Logo Animation
    const logo = document.querySelector('header nav > span:first-child a');
    if (logo) {
        logo.addEventListener('click', function(e) {
            // Prevent default if already on homepage
            if (window.location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // 8. Keyboard Navigation
    document.addEventListener('keydown', function(e) {
        // Close categories on Escape
        if (e.key === 'Escape' && desktopCategories && desktopCategories.classList.contains('show')) {
            desktopCategories.classList.remove('show');
        }
        
        // Tab navigation
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    // Remove keyboard navigation class on mouse click
    document.addEventListener('click', function() {
        document.body.classList.remove('keyboard-navigation');
    });
    
    // 9. Responsive Adjustments
    function handleResize() {
        if (window.innerWidth > 768) {
            // Ensure desktop menu is visible
            if (navList) navList.classList.remove('show');
            if (menuBtn) menuBtn.style.display = 'none';
            if (menuCloseBtn) menuCloseBtn.style.display = 'none';
            if (desktopCategories) desktopCategories.classList.remove('show');
        } else {
            // Ensure mobile icons are visible
            if (menuBtn) menuBtn.style.display = 'block';
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Run on load
    
    // 10. Page Load Animation
    nav.style.opacity = '0';
    nav.style.transform = 'translateY(-20px)';
    nav.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    
    setTimeout(() => {
        nav.style.opacity = '1';
        nav.style.transform = 'translateY(0)';
    }, 100);
    
    // 11. Loading State for Form Submissions
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function() {
            nav.classList.add('loading');
            
            // Remove loading state after 3 seconds (or when page loads)
            setTimeout(() => {
                nav.classList.remove('loading');
            }, 3000);
        });
    });
});
// Enhanced Dark Mode System - Fixed and Improved
(function() {
    'use strict';

    // Wait for DOM to be ready
    function ready(callback) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', callback);
        } else {
            callback();
        }
    }

    ready(function() {
        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;

        if (!themeToggle) {
            console.warn('Theme toggle button not found');
            return;
        }

        // Check for saved theme preference or system preference
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        const currentTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

        // Apply the current theme
        body.setAttribute('data-theme', currentTheme);
        updateToggleButton(currentTheme);

        console.log('Dark mode initialized with theme:', currentTheme);

        // Toggle theme on button click
        themeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            const currentTheme = body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            console.log('Switching theme from', currentTheme, 'to', newTheme);

            body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateToggleButton(newTheme);

            // Add transition effect
            body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
            setTimeout(() => {
                body.style.transition = '';
            }, 300);
        });

        function updateToggleButton(theme) {
            const sunIcon = themeToggle.querySelector('.sun-icon');
            const moonIcon = themeToggle.querySelector('.moon-icon');

            if (theme === 'dark') {
                if (sunIcon) sunIcon.style.opacity = '0';
                if (moonIcon) moonIcon.style.opacity = '1';
            } else {
                if (sunIcon) sunIcon.style.opacity = '1';
                if (moonIcon) moonIcon.style.opacity = '0';
            }
        }

        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
                if (!localStorage.getItem('theme')) {
                    const newTheme = e.matches ? 'dark' : 'light';
                    body.setAttribute('data-theme', newTheme);
                    updateToggleButton(newTheme);
                    console.log('System theme changed to:', newTheme);
                }
            });
        }

        // Add keyboard support
        document.addEventListener('keydown', function(e) {
            if (e.key === 'd' && e.ctrlKey) {
                e.preventDefault();
                themeToggle.click();
            }
        });
    });
})();

// Enhanced Mobile Menu Functionality
document.addEventListener('DOMContentLoaded', function() {
    const menubtn = document.querySelector('.menubtn');
    const menuClosebtn = document.querySelector('.menuClosebtn');
    const mobMenu = document.querySelector('.mob-menu');

    if (menubtn && menuClosebtn && mobMenu) {
        menubtn.addEventListener('click', function() {
            mobMenu.style.display = 'block';
            menubtn.style.display = 'none';
            menuClosebtn.style.display = 'block';
            mobMenu.style.animation = 'slideInRight 0.3s ease';
        });

        menuClosebtn.addEventListener('click', function() {
            mobMenu.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                mobMenu.style.display = 'none';
                menubtn.style.display = 'block';
                menuClosebtn.style.display = 'none';
            }, 300);
        });
    }
});

// Enhanced Categories Dropdown
document.addEventListener('DOMContentLoaded', function() {
    const desktopCategoriesBtn = document.querySelector('.desktop-categories-btn');
    const desktopCategories = document.querySelector('.desktop-categories');

    if (desktopCategoriesBtn && desktopCategories) {
        desktopCategoriesBtn.addEventListener('click', function(e) {
            e.preventDefault();
            desktopCategories.classList.toggle('show');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
            if (!desktopCategoriesBtn.contains(e.target) && !desktopCategories.contains(e.target)) {
                desktopCategories.classList.remove('show');
            }
        });
    }
});

// Enhanced Mobile Categories
document.addEventListener('DOMContentLoaded', function() {
    const categoriesBtn = document.querySelector('.categories-btn');
    const categoriesCloseBtn = document.querySelector('.categories-close-btn');
    const mobCategories = document.querySelector('.mob-categories');

    if (categoriesBtn && categoriesCloseBtn && mobCategories) {
        categoriesBtn.addEventListener('click', function() {
            mobCategories.style.display = mobCategories.style.display === 'none' ? 'block' : 'none';
            categoriesBtn.style.display = 'none';
            categoriesCloseBtn.style.display = 'inline';
            mobCategories.style.animation = 'fadeIn 0.3s ease';
        });

        categoriesCloseBtn.addEventListener('click', function() {
            mobCategories.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                mobCategories.style.display = 'none';
                categoriesBtn.style.display = 'inline';
                categoriesCloseBtn.style.display = 'none';
            }, 300);
        });
    }
});

// Enhanced FAQ Accordion
document.addEventListener('DOMContentLoaded', function() {
    const faqs = document.querySelectorAll('.faq');

    faqs.forEach(faq => {
        const question = faq.querySelector('.question');
        const answer = faq.querySelector('.answer');

        if (question && answer) {
            question.addEventListener('click', function() {
                const isOpen = answer.style.display === 'block';

                // Close all FAQs
                document.querySelectorAll('.faq .answer').forEach(ans => {
                    ans.style.display = 'none';
                });
                document.querySelectorAll('.faq').forEach(f => {
                    f.classList.remove('active');
                });

                // Open clicked FAQ if it wasn't open
                if (!isOpen) {
                    answer.style.display = 'block';
                    faq.classList.add('active');
                    answer.style.animation = 'slideDown 0.3s ease';
                }
            });
        }
    });
});

// Smooth Scrolling for Anchor Links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Enhanced Form Validation
document.addEventListener('DOMContentLoaded', function() {
    const forms = document.querySelectorAll('form');

    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;

            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.style.borderColor = '#ef4444';
                    field.style.animation = 'shake 0.5s ease';
                    isValid = false;

                    setTimeout(() => {
                        field.style.borderColor = '';
                        field.style.animation = '';
                    }, 2000);
                } else {
                    field.style.borderColor = '#10b981';
                }
            });

            if (!isValid) {
                e.preventDefault();
                showNotification('يرجى ملء جميع الحقول المطلوبة', 'error');
            }
        });
    });
});

// Loading States for Buttons
document.addEventListener('DOMContentLoaded', function() {
    const buttons = document.querySelectorAll('button[type="submit"], .btn');

    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.form && this.form.checkValidity()) {
                const originalText = this.innerHTML;
                this.innerHTML = '<span>جاري التحميل...</span>';
                this.disabled = true;
                this.style.opacity = '0.7';

                // Reset after 5 seconds if still on page
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                    this.style.opacity = '';
                }, 5000);
            }
        });
    });
});

// Enhanced Testimonials Carousel
document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.querySelector('.testimonial-carousel');

    if (carousel) {
        let scrollAmount = 0;
        const scrollStep = 320;
        let autoScrollInterval;

        function autoScroll() {
            scrollAmount += scrollStep;
            if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
                scrollAmount = 0;
            }
            carousel.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }

        // Start auto-scroll
        autoScrollInterval = setInterval(autoScroll, 5000);

        // Pause on hover
        carousel.addEventListener('mouseenter', () => {
            clearInterval(autoScrollInterval);
        });

        // Resume on mouse leave
        carousel.addEventListener('mouseleave', () => {
            autoScrollInterval = setInterval(autoScroll, 5000);
        });
    }
});

// Enhanced Course Cards Animation
document.addEventListener('DOMContentLoaded', function() {
    const courseCards = document.querySelectorAll('.course');

    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                }, index * 150);
            }
        });
    }, { threshold: 0.1 });

    courseCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) scale(0.95)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        cardObserver.observe(card);
    });
});

// Enhanced Hero Section Animation
document.addEventListener('DOMContentLoaded', function() {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-img img');

    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(30px)';
        heroContent.style.transition = 'opacity 1s ease, transform 1s ease';

        setTimeout(() => {
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }

    if (heroImage) {
        heroImage.style.opacity = '0';
        heroImage.style.transform = 'scale(0.8) rotate(5deg)';
        heroImage.style.transition = 'opacity 1s ease, transform 1s ease';

        setTimeout(() => {
            heroImage.style.opacity = '1';
            heroImage.style.transform = 'scale(1) rotate(-2deg)';
        }, 600);
    }
});

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
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
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
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
    }, 4000);
}

// Enhanced Counter Animation
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
document.addEventListener('DOMContentLoaded', function() {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.textContent.replace(/\D/g, ''));
                animateCounter(counter, target);
                counterObserver.unobserve(counter);
            }
        });
    });

    document.querySelectorAll('.students-count p, .instructors-count p, .courses-count p').forEach(counter => {
        counterObserver.observe(counter);
    });
});

// Enhanced Scroll Effects
document.addEventListener('DOMContentLoaded', function() {
    let lastScrollTop = 0;
    const navbar = document.querySelector('header');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    });
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }

    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-10px); }
    }

    @keyframes slideDown {
        from { max-height: 0; opacity: 0; }
        to { max-height: 500px; opacity: 1; }
    }

    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }

    .notification {
        font-family: 'Poppins', sans-serif;
        font-size: 0.9rem;
    }

    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .notification-icon {
        font-weight: bold;
        font-size: 1.1rem;
    }
`;
document.head.appendChild(style);
