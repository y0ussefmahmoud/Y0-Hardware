// ===== Main JavaScript File =====

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeComponents();
    initializeScrollToTop();
    initMobileMenu();
    initSearch();
    initCart();
    initProductCards();
    initCountdown();
    initSmoothScrolling();
    initAnimations();
    initThemeSupport();
});

// ===== Theme Support Integration =====
function initThemeSupport() {
    // Listen for theme changes and update header accordingly
    document.addEventListener('themeChanged', function(e) {
        updateHeaderForTheme(e.detail.theme);
        updateAnimationsForTheme(e.detail.theme);
    });
    
    // Initial theme setup
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    updateHeaderForTheme(currentTheme);
}

function updateHeaderForTheme(theme) {
    const header = document.querySelector('.header');
    if (!header) return;
    
    // Update header scroll effect based on theme
    const scrollHandler = function() {
        if (window.scrollY > 100) {
            if (theme === 'dark') {
                header.style.background = 'rgba(45, 45, 45, 0.98)';
                header.style.boxShadow = '0 4px 30px rgba(255, 255, 255, 0.1)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.98)';
                header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
            }
        } else {
            if (theme === 'dark') {
                header.style.background = 'rgba(45, 45, 45, 0.95)';
                header.style.boxShadow = '0 2px 20px rgba(255, 255, 255, 0.05)';
            } else {
                header.style.background = 'rgba(255, 255, 255, 0.95)';
                header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            }
        }
    };
    
    // Remove existing scroll listeners and add new one
    window.removeEventListener('scroll', window.currentScrollHandler);
    window.currentScrollHandler = scrollHandler;
    window.addEventListener('scroll', scrollHandler);
    
    // Apply initial styles
    scrollHandler();
}

function updateAnimationsForTheme(theme) {
    // Update any theme-specific animations
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => {
        if (theme === 'dark') {
            element.style.filter = 'brightness(1.1)';
        } else {
            element.style.filter = 'brightness(1)';
        }
    });
}

// ===== Header Functionality =====
function initHeader() {
    const header = document.querySelector('.header');
    
    // Header scroll effect
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Active navigation highlighting
    const navLinks = document.querySelectorAll('.nav-menu a');
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===== Mobile Menu =====
function initMobileMenu() {
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                document.body.style.overflow = 'hidden';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on links
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            });
        });
    }
}

// ===== Search Functionality =====
function initSearch() {
    const searchInput = document.querySelector('.search-box input');
    const searchButton = document.querySelector('.search-box button');
    
    if (searchInput && searchButton) {
        // Search on button click
        searchButton.addEventListener('click', function() {
            performSearch(searchInput.value);
        });
        
        // Search on Enter key
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
        
        // Search suggestions (placeholder functionality)
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            if (query.length > 2) {
                // Here you would implement search suggestions
                console.log('Searching for:', query);
            }
        });
    }
}

function performSearch(query) {
    if (query.trim() === '') {
        alert('يرجى إدخال كلمة البحث');
        return;
    }
    
    // Placeholder search functionality
    console.log('Searching for:', query);
    alert(`البحث عن: ${query}`);
    
    // In a real application, you would:
    // 1. Send request to search API
    // 2. Filter products
    // 3. Display results
}

// ===== Shopping Cart =====
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function initCart() {
    updateCartCount();
    
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', function() {
            showCart();
        });
    }
}

function addToCart(productId, productName, price, image) {
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: price,
            image: image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showCartNotification(productName);
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = totalItems;
        
        // Animate cart count
        if (totalItems > 0) {
            cartCount.style.transform = 'scale(1.2)';
            setTimeout(() => {
                cartCount.style.transform = 'scale(1)';
            }, 200);
        }
    }
}

function showCart() {
    // Placeholder cart display
    if (cart.length === 0) {
        alert('السلة فارغة');
        return;
    }
    
    let cartHTML = 'محتويات السلة:\n\n';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        cartHTML += `${item.name} - ${item.quantity} × ${item.price} ج.م = ${itemTotal} ج.م\n`;
        total += itemTotal;
    });
    
    cartHTML += `\nالإجمالي: ${total} ج.م`;
    alert(cartHTML);
}

function showCartNotification(productName) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>تم إضافة ${productName} إلى السلة</span>
    `;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #28a745;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-weight: 600;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// ===== Product Cards =====
function initProductCards() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const quickViewButtons = document.querySelectorAll('.quick-view');
    const wishlistButtons = document.querySelectorAll('.add-to-wishlist');
    
    // Add to cart functionality
    addToCartButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            const productPrice = parseFloat(productCard.querySelector('.current-price').textContent.replace(/[^\d]/g, ''));
            const productImage = productCard.querySelector('img').src;
            const productId = `product-${index + 1}`;
            
            addToCart(productId, productName, productPrice, productImage);
        });
    });
    
    // Quick view functionality
    quickViewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('h3').textContent;
            showQuickView(productName);
        });
    });
    
    // Wishlist functionality
    wishlistButtons.forEach(button => {
        button.addEventListener('click', function() {
            this.classList.toggle('active');
            const icon = this.querySelector('i');
            
            if (this.classList.contains('active')) {
                icon.style.color = '#ff4757';
                showNotification('تم إضافة المنتج إلى المفضلة');
            } else {
                icon.style.color = '';
                showNotification('تم إزالة المنتج من المفضلة');
            }
        });
    });
}

function showQuickView(productName) {
    // Placeholder quick view
    alert(`عرض سريع لـ: ${productName}`);
    
    // In a real application, you would:
    // 1. Create a modal
    // 2. Load product details
    // 3. Display in popup
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #667eea;
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: 600;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// ===== Countdown Timer =====
function initCountdown() {
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    
    if (daysElement && hoursElement && minutesElement) {
        // Set countdown end date (3 days from now)
        const countdownDate = new Date().getTime() + (3 * 24 * 60 * 60 * 1000);
        
        function updateCountdown() {
            const now = new Date().getTime();
            const distance = countdownDate - now;
            
            if (distance > 0) {
                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                
                daysElement.textContent = days.toString().padStart(2, '0');
                hoursElement.textContent = hours.toString().padStart(2, '0');
                minutesElement.textContent = minutes.toString().padStart(2, '0');
            } else {
                daysElement.textContent = '00';
                hoursElement.textContent = '00';
                minutesElement.textContent = '00';
            }
        }
        
        // Update countdown every minute
        updateCountdown();
        setInterval(updateCountdown, 60000);
    }
}

// ===== Smooth Scrolling =====
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== Scroll Animations =====
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.category-card, .product-card, .deal-card');
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// ===== Category Navigation =====
function initCategoryNavigation() {
    const categoryCards = document.querySelectorAll('.category-card');
    
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            navigateToCategory(category);
        });
    });
}

function navigateToCategory(category) {
    // Placeholder category navigation
    console.log('Navigating to category:', category);
    
    // In a real application, you would:
    // 1. Filter products by category
    // 2. Update URL
    // 3. Load category page
    
    // For now, scroll to products section
    const productsSection = document.querySelector('#featured');
    if (productsSection) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const targetPosition = productsSection.offsetTop - headerHeight;
        
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}

// ===== Utility Functions =====
function formatPrice(price) {
    return new Intl.NumberFormat('ar-EG', {
        style: 'currency',
        currency: 'EGP'
    }).format(price);
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===== Error Handling =====
window.addEventListener('error', function(e) {
    console.error('JavaScript Error:', e.error);
});

// ===== Performance Optimization =====
// Lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize category navigation
document.addEventListener('DOMContentLoaded', function() {
    initCategoryNavigation();
    initLazyLoading();
    initializeScrollToTop();
});

// ===== Scroll to Top Functionality =====
function initializeScrollToTop() {
    const scrollToTopBtn = document.getElementById('scrollToTop');
    
    if (!scrollToTopBtn) return;
    
    // Show/hide scroll to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Add click animation
        scrollToTopBtn.style.transform = 'translateY(-5px) scale(0.95)';
        setTimeout(() => {
            scrollToTopBtn.style.transform = '';
        }, 150);
    });
}

// ===== Service Worker Registration (for PWA) =====
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}