document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // Theme Management
    // ----------------------------------------------------
    const themeToggles = document.querySelectorAll('#theme-toggle, .theme-toggle-btn');
    const setDarkMode = (isDark) => {
        const theme = isDark ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', theme);
        if (isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    };

    // Initialize Theme
    const storedTheme = localStorage.getItem('theme') || 'dark'; // Defaulting to Dark as per user choice
    setDarkMode(storedTheme === 'dark');

    themeToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            setDarkMode(!isDark);
        });
    });

    // ----------------------------------------------------
    // RTL Management
    // ----------------------------------------------------
    const rtlToggles = document.querySelectorAll('#rtl-toggle, .rtl-toggle-btn');
    const setRTL = (isRTL) => {
        const dir = isRTL ? 'rtl' : 'ltr';
        document.documentElement.setAttribute('dir', dir);
        localStorage.setItem('dir', dir);
    };

    // Initialize RTL
    const storedDir = localStorage.getItem('dir') || 'ltr';
    setRTL(storedDir === 'rtl');

    rtlToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
            setRTL(!isRTL);
        });
    });

    // ----------------------------------------------------
    // Mobile Menu & Sidebar Management
    // ----------------------------------------------------
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const sidebar = document.querySelector('.sidebar');
    const mobileOverlay = document.createElement('div');
    mobileOverlay.className = 'mobile-overlay';
    document.body.appendChild(mobileOverlay);

    const toggleMenu = (isOpen) => {
        // Handle standard mobile menu (if exists)
        if (mobileMenu) {
            if (isOpen) {
                mobileMenu.classList.remove('hidden');
                // Small delay to allow 'hidden' removal before starting transition
                setTimeout(() => mobileMenu.classList.add('active'), 10);
            } else {
                mobileMenu.classList.remove('active');
                // Delay hiding until transition completes
                setTimeout(() => mobileMenu.classList.add('hidden'), 400);
            }
        }
        
        // Handle dashboard sidebar (if exists)
        if (sidebar) {
            if (isOpen) {
                sidebar.classList.add('active');
            } else {
                sidebar.classList.remove('active');
            }
        }

        mobileOverlay.classList.toggle('active', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            // Determine state based on which element is present
            let currentlyOpen = false;
            if (mobileMenu) {
                currentlyOpen = !mobileMenu.classList.contains('hidden');
            } else if (sidebar) {
                currentlyOpen = sidebar.classList.contains('active');
            }
            toggleMenu(!currentlyOpen);
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
    // Scroll Effects (Header & Top Button)
    // ----------------------------------------------------
    const header = document.querySelector('header');
    const scrollBtn = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', () => {
        const isScrolled = window.scrollY > 50;
        
        // Header visibility
        if (header) {
            if (isScrolled) {
                header.classList.add('header-scrolled');
            } else {
                header.classList.remove('header-scrolled');
            }
        }

        // Scroll to Top button visibility
        if (scrollBtn) {
            if (window.scrollY > 300) {
                scrollBtn.classList.add('show');
            } else {
                scrollBtn.classList.remove('show');
            }
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

    // ----------------------------------------------------
    // Shop Sorting Logic
    // ----------------------------------------------------
    const priceSort = document.getElementById('price-sort');
    const productGrid = document.getElementById('product-grid');
    if (priceSort && productGrid) {
        const originalProducts = Array.from(productGrid.querySelectorAll('.product-item'));
        
        priceSort.addEventListener('change', (e) => {
            const sortBy = e.target.value;
            let sortedProducts = [...originalProducts];

            if (sortBy === 'low') {
                sortedProducts.sort((a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price));
            } else if (sortBy === 'high') {
                sortedProducts.sort((a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price));
            }

            // Clear and re-append sorted items
            productGrid.innerHTML = '';
            sortedProducts.forEach(product => {
                productGrid.appendChild(product);
            });
            
            // Re-trigger AOS for new positions
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        });
    }
});

// Sidebar (Dashboard) toggle for mobile
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        sidebar.classList.toggle('active');
    }
}
