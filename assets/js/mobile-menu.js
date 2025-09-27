// ===== Mobile Menu Management =====

class MobileMenuManager {
    constructor() {
        this.mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        this.navMenu = document.querySelector('.nav-menu');
        this.isMenuOpen = false;
        
        this.init();
    }
    
    init() {
        if (this.mobileMenuToggle && this.navMenu) {
            this.bindEvents();
            this.setupResponsiveHandling();
        }
    }
    
    bindEvents() {
        // Toggle menu on button click
        this.mobileMenuToggle.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleMenu();
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isMenuOpen && 
                !this.navMenu.contains(e.target) && 
                !this.mobileMenuToggle.contains(e.target)) {
                this.closeMenu();
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isMenuOpen) {
                this.closeMenu();
            }
        });
        
        // Close menu when clicking on nav links
        const navLinks = this.navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (this.isMenuOpen) {
                    this.closeMenu();
                }
            });
        });
    }
    
    toggleMenu() {
        if (this.isMenuOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }
    
    openMenu() {
        this.navMenu.classList.add('active');
        this.mobileMenuToggle.classList.add('active');
        this.isMenuOpen = true;
        
        // Update button icon
        const icon = this.mobileMenuToggle.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-times';
        }
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
        
        // Add animation
        this.navMenu.style.animation = 'slideDown 0.3s ease-out';
        
        // Update ARIA attributes
        this.mobileMenuToggle.setAttribute('aria-expanded', 'true');
        this.navMenu.setAttribute('aria-hidden', 'false');
    }
    
    closeMenu() {
        this.navMenu.classList.remove('active');
        this.mobileMenuToggle.classList.remove('active');
        this.isMenuOpen = false;
        
        // Update button icon
        const icon = this.mobileMenuToggle.querySelector('i');
        if (icon) {
            icon.className = 'fas fa-bars';
        }
        
        // Restore body scroll
        document.body.style.overflow = '';
        
        // Add animation
        this.navMenu.style.animation = 'slideUp 0.3s ease-out';
        
        // Update ARIA attributes
        this.mobileMenuToggle.setAttribute('aria-expanded', 'false');
        this.navMenu.setAttribute('aria-hidden', 'true');
    }
    
    setupResponsiveHandling() {
        // Close menu when screen size changes to desktop
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.isMenuOpen) {
                this.closeMenu();
            }
        });
    }
}

// ===== Search Functionality =====
class SearchManager {
    constructor() {
        this.searchInput = document.querySelector('.search-box input');
        this.searchButton = document.querySelector('.search-box button');
        this.searchResults = null;
        
        this.init();
    }
    
    init() {
        if (this.searchInput && this.searchButton) {
            this.bindEvents();
            this.createSearchResults();
        }
    }
    
    bindEvents() {
        // Search on button click
        this.searchButton.addEventListener('click', (e) => {
            e.preventDefault();
            this.performSearch();
        });
        
        // Search on Enter key
        this.searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.performSearch();
            }
        });
        
        // Live search suggestions
        this.searchInput.addEventListener('input', (e) => {
            this.debounce(() => {
                this.showSuggestions(e.target.value);
            }, 300);
        });
        
        // Hide suggestions when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.searchInput.contains(e.target) && this.searchResults) {
                this.hideSuggestions();
            }
        });
    }
    
    createSearchResults() {
        this.searchResults = document.createElement('div');
        this.searchResults.className = 'search-results';
        this.searchResults.style.cssText = `
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--bg-card);
            border: 1px solid var(--border-primary);
            border-radius: 8px;
            box-shadow: 0 8px 25px var(--shadow-medium);
            max-height: 300px;
            overflow-y: auto;
            z-index: 1002;
            display: none;
        `;
        
        const searchBox = this.searchInput.closest('.search-box');
        if (searchBox) {
            searchBox.style.position = 'relative';
            searchBox.appendChild(this.searchResults);
        }
    }
    
    performSearch() {
        const query = this.searchInput.value.trim();
        if (query) {
            // Redirect to shop page with search query
            window.location.href = `shop.html?search=${encodeURIComponent(query)}`;
        }
    }
    
    showSuggestions(query) {
        if (!query || query.length < 2) {
            this.hideSuggestions();
            return;
        }
        
        // Mock search suggestions - replace with actual search logic
        const suggestions = [
            'كارت شاشة RTX 4080',
            'معالج Intel Core i7',
            'ذاكرة عشوائية DDR5',
            'قرص صلب SSD',
            'لوحة أم ASUS'
        ].filter(item => 
            item.toLowerCase().includes(query.toLowerCase())
        );
        
        if (suggestions.length > 0) {
            this.renderSuggestions(suggestions);
            this.searchResults.style.display = 'block';
        } else {
            this.hideSuggestions();
        }
    }
    
    renderSuggestions(suggestions) {
        this.searchResults.innerHTML = suggestions.map(suggestion => `
            <div class="search-suggestion" style="
                padding: 0.75rem 1rem;
                cursor: pointer;
                border-bottom: 1px solid var(--border-light);
                transition: background-color 0.3s ease;
            " onmouseover="this.style.background='var(--bg-hover)'" 
               onmouseout="this.style.background='transparent'"
               onclick="document.querySelector('.search-box input').value='${suggestion}'; document.querySelector('.search-box button').click();">
                <i class="fas fa-search" style="color: var(--text-muted); margin-left: 0.5rem;"></i>
                ${suggestion}
            </div>
        `).join('');
    }
    
    hideSuggestions() {
        if (this.searchResults) {
            this.searchResults.style.display = 'none';
        }
    }
    
    debounce(func, wait) {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(func, wait);
    }
}

// ===== Cart Icon Animation =====
class CartIconManager {
    constructor() {
        this.cartIcon = document.querySelector('.cart-icon');
        this.cartCount = document.querySelector('.cart-count');
        
        this.init();
    }
    
    init() {
        if (this.cartIcon) {
            this.bindEvents();
            this.updateCartCount();
        }
    }
    
    bindEvents() {
        // Cart icon click
        this.cartIcon.addEventListener('click', () => {
            this.animateCartIcon();
            // Redirect to cart page
            setTimeout(() => {
                window.location.href = 'cart.html';
            }, 300);
        });
        
        // Listen for cart updates
        document.addEventListener('cartUpdated', (e) => {
            this.updateCartCount();
            this.animateCartIcon();
        });
    }
    
    updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        
        if (this.cartCount) {
            this.cartCount.textContent = totalItems;
            this.cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
        }
    }
    
    animateCartIcon() {
        if (this.cartIcon) {
            this.cartIcon.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.cartIcon.style.transform = 'scale(1)';
            }, 200);
        }
    }
}

// ===== Smooth Scrolling for Anchor Links =====
class SmoothScrollManager {
    constructor() {
        this.init();
    }
    
    init() {
        // Handle anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                const href = anchor.getAttribute('href');
                if (href === '#' || href === '#top') {
                    e.preventDefault();
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth'
                    });
                    return;
                }
                
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const headerHeight = document.querySelector('.header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ===== Initialize All Managers =====
document.addEventListener('DOMContentLoaded', function() {
    new MobileMenuManager();
    new SearchManager();
    new CartIconManager();
    new SmoothScrollManager();
});

// ===== CSS Animations =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateY(0);
        }
        to {
            opacity: 0;
            transform: translateY(-20px);
        }
    }
    
    .search-results::-webkit-scrollbar {
        width: 6px;
    }
    
    .search-results::-webkit-scrollbar-track {
        background: var(--bg-secondary);
    }
    
    .search-results::-webkit-scrollbar-thumb {
        background: var(--border-secondary);
        border-radius: 3px;
    }
    
    .search-results::-webkit-scrollbar-thumb:hover {
        background: var(--primary-color);
    }
`;
document.head.appendChild(style);
