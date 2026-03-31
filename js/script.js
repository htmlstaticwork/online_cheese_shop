document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // Theme Management
    // ----------------------------------------------------
    const themeToggle = document.getElementById('theme-toggle');
    const setDarkMode = (isDark) => {
        const theme = isDark ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        // Update Toggle Switch Icon or Button State
    };

    // Initialize Theme
    const storedTheme = localStorage.getItem('theme') || 'dark'; // Defaulting to Dark as per user choice
    setDarkMode(storedTheme === 'dark');

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            setDarkMode(!isDark);
        });
    }

    // ----------------------------------------------------
    // RTL Management
    // ----------------------------------------------------
    const rtlToggle = document.getElementById('rtl-toggle');
    const setRTL = (isRTL) => {
        const dir = isRTL ? 'rtl' : 'ltr';
        document.documentElement.setAttribute('dir', dir);
        localStorage.setItem('dir', dir);
    };

    // Initialize RTL
    const storedDir = localStorage.getItem('dir') || 'ltr';
    setRTL(storedDir === 'rtl');

    if (rtlToggle) {
        rtlToggle.addEventListener('click', () => {
            const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
            setRTL(!isRTL);
        });
    }

    // ----------------------------------------------------
    // Mobile Menu Management
    // ----------------------------------------------------
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileOverlay = document.createElement('div');
    mobileOverlay.className = 'mobile-overlay';
    document.body.appendChild(mobileOverlay);

    const toggleMenu = (isOpen) => {
        if (mobileMenu) {
            mobileMenu.classList.toggle('hidden', !isOpen);
            mobileOverlay.classList.toggle('active', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        }
    };

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            const isHidden = mobileMenu.classList.contains('hidden');
            toggleMenu(isHidden);
        });
    }

    // Auto-close menu on click and Overlay
    mobileOverlay.addEventListener('click', () => toggleMenu(false));
    if (mobileMenu) {
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
        });
    }

    // ----------------------------------------------------
    // Scroll to Top
    // ----------------------------------------------------
    const scrollBtn = document.getElementById('scroll-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    });

    if (scrollBtn) {
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ----------------------------------------------------
    // AOS (Animate On Scroll) Initialization
    // ----------------------------------------------------
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    // Lazy load logic for images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src; 
                    img.classList.remove('lazy');
                    observer.unobserve(img);
                }
            });
        });
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ----------------------------------------------------
    // Hero Slider (Home 1)
    // ----------------------------------------------------
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length > 1) {
        let currentSlide = 0;
        const rotateSlides = () => {
            if (slides[currentSlide]) {
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
            }
        };
        setInterval(rotateSlides, 6000); // Rotate every 6 seconds
    }
});

// Sidebar (Dashboard) toggle for mobile
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}
