        /* ============================================
   Personal Portfolio - Main JavaScript
   Author: Ahmed Al-Mutairi
   Description: Typing effect, Intersection Observer,
                hamburger menu, header scroll, language toggle
   ============================================ */


/* ============================================
   THEME TOGGLE - DAY / NIGHT MODE
   ============================================ */
(() => {
    const root = document.documentElement;
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const themeLabel = document.getElementById('themeLabel');

    if (!themeToggle) return;

    const savedTheme = localStorage.getItem('portfolio-theme');
    const systemDark = window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches;

    const initialTheme = savedTheme || (systemDark ? 'dark' : 'light');
    root.setAttribute('data-theme', initialTheme);

    function updateThemeUI(theme) {
        const isDark = theme === 'dark';
        themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        themeLabel.textContent = isDark ? 'نهاري' : 'ليلي';
        themeToggle.setAttribute(
            'aria-label',
            isDark ? 'تفعيل الوضع النهاري' : 'تفعيل الوضع الليلي'
        );
        themeToggle.setAttribute(
            'title',
            isDark ? 'تفعيل الوضع النهاري' : 'تفعيل الوضع الليلي'
        );
    }

    updateThemeUI(initialTheme);

    themeToggle.addEventListener('click', () => {
        const current = root.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';

        root.classList.add('theme-transition');
        root.setAttribute('data-theme', next);
        localStorage.setItem('portfolio-theme', next);
        updateThemeUI(next);

        window.setTimeout(() => {
            root.classList.remove('theme-transition');
        }, 400);
    });
})();

document.addEventListener('DOMContentLoaded', () => {

    /* ============================================
       1. TYPING EFFECT
       ============================================ */
    const typingElement = document.getElementById('typingText');
    if (typingElement) {
        const phrases = {
            ar: [
                'أبدع في تحويل الأفكار إلى تجارب رقمية',
                'أصنع مواقع سريعة ومتجاوبة',
                'أهتم بالتفاصيل وأعشق التصميم'
            ],
            en: [
                'Turning ideas into digital experiences',
                'Building fast, responsive websites',
                'Passionate about design & detail'
            ]
        };

        let currentLang = document.documentElement.getAttribute('dir') === 'ltr' ? 'en' : 'ar';
        let currentPhraseIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let cursorSpan = null;

        function createCursor() {
            cursorSpan = document.createElement('span');
            cursorSpan.className = 'typing-cursor';
            return cursorSpan;
        }

        // Prepend cursor to element
        createCursor();
        typingElement.appendChild(cursorSpan);

/* ============================================
       13. PORTFOLIO LINKS MANAGER (إدارة روابط المشاريع)
       ============================================ */
    // هنا يمكنك كمطور إضافة أو تعديل روابط مشاريعك الثلاثة
    const projectLinks = [
        {
            // المشروع الأول: E-Commerce Website
            live: "https://your-live-link-1.com", // ضع رابط السيرفر الحي هنا
            github: "https://github.com/yourusername/project1" // ضع رابط جيت هاب هنا
        },
        {
            // المشروع الثاني: Business Dashboard
            live: "https://your-live-link-2.com",
            github: "https://github.com/yourusername/project2"
        },
        {
            // المشروع الثالث: Portfolio Template
            // (الروابط الحالية موجودة مسبقاً، يمكنك تعديلها من هنا)
            live: "https://ymrw3643-ship-it.github.io/---/",
            github: "https://github.com/ymrw3643/---/"
        }
    ];

    // جلب جميع بطاقات المشاريع من الـ HTML
    const portfolioCardsUI = document.querySelectorAll('.portfolio-card');

    // المرور على كل بطاقة وربطها بالبيانات الموجودة في المصفوفة
    portfolioCardsUI.forEach((card, index) => {
        // التأكد من وجود بيانات للمشروع في المصفوفة
        if (projectLinks[index]) {
            
            // جلب أزرار الروابط داخل الكرت بناءً على الـ aria-label
            const liveLinkBtn = card.querySelector('a[aria-label="View Live"]');
            const githubLinkBtn = card.querySelector('a[aria-label="View Code"]');

            // إذا كان الرابط الحي موجوداً في المصفوفة، قم بتعيينه للزر
            if (liveLinkBtn && projectLinks[index].live !== "") {
                liveLinkBtn.href = projectLinks[index].live;
                liveLinkBtn.target = "_blank"; // لفتح الرابط في نافذة جديدة
                liveLinkBtn.rel = "noopener noreferrer"; // لحماية إضافية
            }
            
            // إذا كان رابط جيت هاب موجوداً في المصفوفة، قم بتعيينه للزر
            if (githubLinkBtn && projectLinks[index].github !== "") {
                githubLinkBtn.href = projectLinks[index].github;
                githubLinkBtn.target = "_blank";
                githubLinkBtn.rel = "noopener noreferrer";
            }
        }
    });

        function getCurrentPhrase() {
            const phrasesArr = phrases[currentLang] || phrases.ar;
            return phrasesArr[currentPhraseIndex % phrasesArr.length];
        }

        function typeEffect() {
            const fullText = getCurrentPhrase();

            if (isDeleting) {
                currentCharIndex--;
            } else {
                currentCharIndex++;
            }

            // Set text before cursor
            const displayText = fullText.substring(0, currentCharIndex);
            // Remove all text nodes, keep cursor
            const childNodes = Array.from(typingElement.childNodes);
            for (const node of childNodes) {
                if (node.nodeType === Node.TEXT_NODE) {
                    typingElement.removeChild(node);
                }
            }
            // Insert text before cursor
            const textNode = document.createTextNode(displayText);
            typingElement.insertBefore(textNode, cursorSpan);

            let delay = isDeleting ? 40 : 80;

            if (!isDeleting && currentCharIndex === fullText.length) {
                // Wait at the end
                delay = 2500;
                isDeleting = true;
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentPhraseIndex++;
                delay = 600;
            }

            setTimeout(typeEffect, delay);
        }

        // Start typing effect
        setTimeout(typeEffect, 1000);

        // Update typing when language changes
        document.addEventListener('languageChanged', (e) => {
            currentLang = e.detail.lang;
            currentCharIndex = 0;
            isDeleting = false;
            currentPhraseIndex = 0;
            // Clear text nodes
            const childNodes = Array.from(typingElement.childNodes);
            for (const node of childNodes) {
                if (node.nodeType === Node.TEXT_NODE) {
                    typingElement.removeChild(node);
                }
            }
        });
    }

    /* ============================================
       2. LANGUAGE TOGGLE
       ============================================ */
    const langToggle = document.getElementById('langToggle');
    const langLabel = document.getElementById('langLabel');

    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const html = document.documentElement;
            const currentDir = html.getAttribute('dir');
            const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
            const newLang = newDir === 'rtl' ? 'ar' : 'en';

            html.setAttribute('dir', newDir);
            html.setAttribute('lang', newLang);

            // Update toggle button label
            langLabel.textContent = newDir === 'rtl' ? 'EN' : 'AR';

            // Update all elements with data-en and data-ar attributes
            const elements = document.querySelectorAll('[data-en][data-ar]');
            elements.forEach(el => {
                if (newDir === 'ltr') {
                    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                        el.placeholder = el.getAttribute('data-en') || el.placeholder;
                    } else {
                        el.textContent = el.getAttribute('data-en') || el.textContent;
                    }
                } else {
                    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                        el.placeholder = el.getAttribute('data-ar') || el.placeholder;
                    } else {
                        el.textContent = el.getAttribute('data-ar') || el.textContent;
                    }
                }
            });

            // Update form labels separately (they have 'for' attribute, not inside form-group structure)
            // The labels are part of the form-group structure already handled above

            // Dispatche event for typing effect
            document.dispatchEvent(new CustomEvent('languageChanged', {
                detail: { lang: newLang }
            }));
        });
    }

    /* ============================================
       3. MOBILE HAMBURGER MENU
       ============================================ */
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    /* ============================================
       4. HEADER SCROLL EFFECT
       ============================================ */
    const header = document.getElementById('header');
    let lastScroll = 0;

    if (header) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;

            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });
    }

    /* ============================================
       5. INTERSECTION OBSERVER (Fade-in on Scroll)
       ============================================ */
    const fadeElements = document.querySelectorAll('.fade-section');

    if (fadeElements.length > 0) {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -80px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        fadeElements.forEach(el => observer.observe(el));
    }

    /* ============================================
       6. SKILL BAR ANIMATION
       ============================================ */
    const skillBars = document.querySelectorAll('.skill-progress');

    if (skillBars.length > 0) {
        const barObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target.getAttribute('data-progress');
                    entry.target.style.width = progress + '%';
                    barObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        skillBars.forEach(bar => barObserver.observe(bar));
    }

    /* ============================================
       7. PORTFOLIO FILTER
       ============================================ */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card');

    if (filterBtns.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Update active button
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                portfolioCards.forEach(card => {
                    if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                        card.style.display = 'block';
                        card.style.opacity = '0';
                        setTimeout(() => {
                            card.style.opacity = '1';
                        }, 50);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    /* ============================================
       8. CONTACT FORM (UI Only)
       ============================================ */
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('formName').value.trim();
            const email = document.getElementById('formEmail').value.trim();
            const message = document.getElementById('formMessage').value.trim();

            // Simple validation
            if (!name || !email || !message) {
                showToast('Please fill in all required fields', 'error');
                return;
            }

            // Basic email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                showToast('Please enter a valid email address', 'error');
                return;
            }

            // Success (UI only - no backend)
            showToast('Message sent successfully! I\'ll get back to you soon.', 'success');
            contactForm.reset();
        });
    }

    /* ============================================
       9. TOAST NOTIFICATION
       ============================================ */
    function showToast(message, type = 'success') {
        // Remove existing toast
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }

        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;
        document.body.appendChild(toast);

        // Trigger animation
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Auto remove after 4 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 4000);
    }

    /* ============================================
       10. SCROLL TO TOP BUTTON
       ============================================ */
    const scrollTopBtn = document.getElementById('scrollTop');

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    /* ============================================
       11. ACTIVE NAV LINK ON SCROLL
       ============================================ */
    const sections = document.querySelectorAll('section[id]');

    if (sections.length > 0) {
        window.addEventListener('scroll', () => {
            let current = '';
            const scrollPos = window.scrollY + 200;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
    }

    /* ============================================
       12. CURRENT YEAR FOR FOOTER
       ============================================ */
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

}); // End DOMContentLoaded