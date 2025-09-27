// ===== Shop Page JavaScript =====

class ShopManager {
    constructor() {
        this.products = productsDatabase || [];
        this.filteredProducts = [...this.products];
        this.currentPage = 1;
        this.productsPerPage = 12;
        this.currentView = 'grid';
        this.currentSort = 'default';
        this.filters = {
            categories: [],
            brands: [],
            priceMin: 0,
            priceMax: 999999,
            rating: 0,
            search: ''
        };
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadFiltersFromURL();
        this.applyFilters();
        this.renderProducts();
        this.updateCartCount();
    }

    bindEvents() {
        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const searchBtn = document.getElementById('searchBtn');
        
        if (searchInput) {
            searchInput.addEventListener('input', debounce((e) => {
                this.filters.search = e.target.value.toLowerCase();
                this.applyFilters();
                this.renderProducts();
            }, 300));
        }

        if (searchBtn) {
            searchBtn.addEventListener('click', () => {
                this.filters.search = searchInput.value.toLowerCase();
                this.applyFilters();
                this.renderProducts();
            });
        }

        // Category filters
        const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
        categoryCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                if (e.target.value === 'all') {
                    if (e.target.checked) {
                        this.filters.categories = [];
                        categoryCheckboxes.forEach(cb => {
                            if (cb.value !== 'all') cb.checked = false;
                        });
                    }
                } else {
                    const allCheckbox = document.querySelector('input[name="category"][value="all"]');
                    if (allCheckbox) allCheckbox.checked = false;
                    
                    if (e.target.checked) {
                        this.filters.categories.push(e.target.value);
                    } else {
                        this.filters.categories = this.filters.categories.filter(cat => cat !== e.target.value);
                    }
                }
                this.applyFilters();
                this.renderProducts();
            });
        });

        // Brand filters
        const brandCheckboxes = document.querySelectorAll('input[name="brand"]');
        brandCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                if (e.target.checked) {
                    this.filters.brands.push(e.target.value);
                } else {
                    this.filters.brands = this.filters.brands.filter(brand => brand !== e.target.value);
                }
                this.applyFilters();
                this.renderProducts();
            });
        });

        // Rating filters
        const ratingRadios = document.querySelectorAll('input[name="rating"]');
        ratingRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.filters.rating = parseInt(e.target.value);
                this.applyFilters();
                this.renderProducts();
            });
        });

        // Price range
        const applyPriceBtn = document.querySelector('.apply-price-btn');
        if (applyPriceBtn) {
            applyPriceBtn.addEventListener('click', () => {
                const minPrice = document.getElementById('minPrice').value;
                const maxPrice = document.getElementById('maxPrice').value;
                
                this.filters.priceMin = minPrice ? parseInt(minPrice) : 0;
                this.filters.priceMax = maxPrice ? parseInt(maxPrice) : 999999;
                
                this.applyFilters();
                this.renderProducts();
            });
        }

        // Price presets
        const pricePresets = document.querySelectorAll('.price-preset');
        pricePresets.forEach(preset => {
            preset.addEventListener('click', (e) => {
                const min = parseInt(e.target.dataset.min);
                const max = parseInt(e.target.dataset.max);
                
                this.filters.priceMin = min;
                this.filters.priceMax = max;
                
                document.getElementById('minPrice').value = min === 0 ? '' : min;
                document.getElementById('maxPrice').value = max === 999999 ? '' : max;
                
                this.applyFilters();
                this.renderProducts();
            });
        });

        // Clear filters
        const clearFiltersBtn = document.querySelector('.clear-filters-btn');
        if (clearFiltersBtn) {
            clearFiltersBtn.addEventListener('click', () => {
                this.clearAllFilters();
            });
        }

        // View toggle
        const viewBtns = document.querySelectorAll('.view-btn');
        viewBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.target.closest('.view-btn').dataset.view;
                this.setView(view);
            });
        });

        // Sort dropdown
        const sortSelect = document.getElementById('sortSelect');
        if (sortSelect) {
            sortSelect.addEventListener('change', (e) => {
                this.currentSort = e.target.value;
                this.sortProducts();
                this.renderProducts();
            });
        }

        // Mobile filter toggle
        const mobileFilterToggle = document.querySelector('.mobile-filter-toggle');
        const sidebar = document.querySelector('.shop-sidebar');
        const filterOverlay = document.createElement('div');
        filterOverlay.className = 'filter-overlay';
        document.body.appendChild(filterOverlay);

        if (mobileFilterToggle && sidebar) {
            mobileFilterToggle.addEventListener('click', () => {
                sidebar.classList.add('active');
                filterOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            });

            filterOverlay.addEventListener('click', () => {
                sidebar.classList.remove('active');
                filterOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    }

    loadFiltersFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        
        if (category) {
            this.filters.categories = [category];
            const categoryCheckbox = document.querySelector(`input[name="category"][value="${category}"]`);
            if (categoryCheckbox) {
                categoryCheckbox.checked = true;
                const allCheckbox = document.querySelector('input[name="category"][value="all"]');
                if (allCheckbox) allCheckbox.checked = false;
            }
        }
    }

    applyFilters() {
        this.filteredProducts = this.products.filter(product => {
            // Search filter
            if (this.filters.search) {
                const searchTerm = this.filters.search.toLowerCase();
                const productText = `${product.name} ${product.description} ${product.brand}`.toLowerCase();
                if (!productText.includes(searchTerm)) return false;
            }

            // Category filter
            if (this.filters.categories.length > 0) {
                if (!this.filters.categories.includes(product.category)) return false;
            }

            // Brand filter
            if (this.filters.brands.length > 0) {
                if (!this.filters.brands.includes(product.brand)) return false;
            }

            // Price filter
            if (product.price < this.filters.priceMin || product.price > this.filters.priceMax) {
                return false;
            }

            // Rating filter
            if (this.filters.rating > 0) {
                if (product.rating < this.filters.rating) return false;
            }

            return true;
        });

        this.sortProducts();
        this.currentPage = 1;
        this.updateResultsCount();
    }

    sortProducts() {
        switch (this.currentSort) {
            case 'price-low':
                this.filteredProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                this.filteredProducts.sort((a, b) => b.price - a.price);
                break;
            case 'name':
                this.filteredProducts.sort((a, b) => a.name.localeCompare(b.name, 'ar'));
                break;
            case 'rating':
                this.filteredProducts.sort((a, b) => b.rating - a.rating);
                break;
            case 'newest':
                this.filteredProducts.sort((a, b) => b.id - a.id);
                break;
            default:
                // Keep original order
                break;
        }
    }

    renderProducts() {
        const productsGrid = document.getElementById('productsGrid');
        const loadingState = document.getElementById('loadingState');
        const noResults = document.getElementById('noResults');

        if (!productsGrid) return;

        // Show loading
        if (loadingState) loadingState.style.display = 'flex';
        productsGrid.innerHTML = '';

        // Simulate loading delay
        setTimeout(() => {
            if (loadingState) loadingState.style.display = 'none';

            if (this.filteredProducts.length === 0) {
                if (noResults) noResults.style.display = 'flex';
                return;
            }

            if (noResults) noResults.style.display = 'none';

            // Calculate pagination
            const startIndex = (this.currentPage - 1) * this.productsPerPage;
            const endIndex = startIndex + this.productsPerPage;
            const productsToShow = this.filteredProducts.slice(startIndex, endIndex);

            // Render products
            productsToShow.forEach((product, index) => {
                const productCard = this.createProductCard(product);
                productsGrid.appendChild(productCard);
                
                // Animate product cards
                setTimeout(() => {
                    productCard.style.opacity = '1';
                    productCard.style.transform = 'translateY(0)';
                }, index * 100);
            });

            this.renderPagination();
        }, 500);
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';

        const discountPercent = product.oldPrice ? 
            Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.badge ? `<div class="product-badge ${product.badge === 'sale' ? 'sale' : product.badge === 'new' ? 'new' : ''}">${this.getBadgeText(product.badge)}</div>` : ''}
                <div class="product-actions">
                    <button class="quick-view" onclick="shopManager.showQuickView(${product.id})" title="عرض سريع">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="add-to-wishlist" onclick="shopManager.toggleWishlist(${product.id})" title="إضافة للمفضلة">
                        <i class="fas fa-heart"></i>
                    </button>
                    <button class="compare" onclick="shopManager.addToCompare(${product.id})" title="مقارنة">
                        <i class="fas fa-balance-scale"></i>
                    </button>
                </div>
            </div>
            <div class="product-info">
                <div class="product-category">${subcategories[product.subcategory] || categories[product.category]}</div>
                <h3 onclick="shopManager.goToProduct(${product.id})">${product.name}</h3>
                <div class="product-rating">
                    <span class="stars">${this.generateStars(product.rating)}</span>
                    <span class="rating-count">(${product.reviewCount})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">${this.formatPrice(product.price)}</span>
                    ${product.oldPrice ? `<span class="old-price">${this.formatPrice(product.oldPrice)}</span>` : ''}
                    ${discountPercent > 0 ? `<span class="discount-percent">-${discountPercent}%</span>` : ''}
                </div>
                <button class="add-to-cart" onclick="shopManager.addToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i>
                    إضافة للسلة
                </button>
            </div>
        `;

        return card;
    }

    getBadgeText(badge) {
        const badges = {
            'new': 'جديد',
            'sale': 'خصم',
            'bestseller': 'الأكثر مبيعاً'
        };
        return badges[badge] || badge;
    }

    generateStars(rating) {
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            stars += i <= rating ? '★' : '☆';
        }
        return stars;
    }

    formatPrice(price) {
        return new Intl.NumberFormat('ar-EG').format(price) + ' ج.م';
    }

    setView(view) {
        this.currentView = view;
        const productsGrid = document.getElementById('productsGrid');
        const viewBtns = document.querySelectorAll('.view-btn');
        
        viewBtns.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-view="${view}"]`).classList.add('active');
        
        if (view === 'list') {
            productsGrid.classList.add('list-view');
        } else {
            productsGrid.classList.remove('list-view');
        }
    }

    updateResultsCount() {
        const resultsCount = document.getElementById('resultsCount');
        if (resultsCount) {
            const total = this.filteredProducts.length;
            const startIndex = (this.currentPage - 1) * this.productsPerPage + 1;
            const endIndex = Math.min(startIndex + this.productsPerPage - 1, total);
            
            if (total === 0) {
                resultsCount.textContent = 'لم يتم العثور على منتجات';
            } else {
                resultsCount.textContent = `عرض ${startIndex}-${endIndex} من أصل ${total} منتج`;
            }
        }
    }

    renderPagination() {
        const pagination = document.getElementById('pagination');
        if (!pagination) return;

        const totalPages = Math.ceil(this.filteredProducts.length / this.productsPerPage);
        
        if (totalPages <= 1) {
            pagination.style.display = 'none';
            return;
        }

        pagination.style.display = 'flex';
        
        const prevBtn = pagination.querySelector('.prev-btn');
        const nextBtn = pagination.querySelector('.next-btn');
        const pageNumbers = pagination.querySelector('.page-numbers');

        // Update prev/next buttons
        prevBtn.disabled = this.currentPage === 1;
        nextBtn.disabled = this.currentPage === totalPages;

        // Generate page numbers
        pageNumbers.innerHTML = '';
        
        const maxVisiblePages = 5;
        let startPage = Math.max(1, this.currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
        
        if (endPage - startPage < maxVisiblePages - 1) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        // First page
        if (startPage > 1) {
            pageNumbers.appendChild(this.createPageButton(1));
            if (startPage > 2) {
                const dots = document.createElement('span');
                dots.className = 'page-dots';
                dots.textContent = '...';
                pageNumbers.appendChild(dots);
            }
        }

        // Page numbers
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.appendChild(this.createPageButton(i));
        }

        // Last page
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                const dots = document.createElement('span');
                dots.className = 'page-dots';
                dots.textContent = '...';
                pageNumbers.appendChild(dots);
            }
            pageNumbers.appendChild(this.createPageButton(totalPages));
        }

        // Bind pagination events
        prevBtn.onclick = () => this.goToPage(this.currentPage - 1);
        nextBtn.onclick = () => this.goToPage(this.currentPage + 1);
    }

    createPageButton(pageNum) {
        const button = document.createElement('button');
        button.className = 'page-number';
        button.textContent = pageNum;
        
        if (pageNum === this.currentPage) {
            button.classList.add('active');
        }
        
        button.onclick = () => this.goToPage(pageNum);
        return button;
    }

    goToPage(page) {
        this.currentPage = page;
        this.renderProducts();
        
        // Scroll to top of products
        const shopSection = document.querySelector('.shop-section');
        if (shopSection) {
            shopSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    clearAllFilters() {
        // Reset filters
        this.filters = {
            categories: [],
            brands: [],
            priceMin: 0,
            priceMax: 999999,
            rating: 0,
            search: ''
        };

        // Reset UI
        document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
        document.querySelectorAll('input[type="radio"]').forEach(rb => rb.checked = false);
        document.querySelector('input[name="category"][value="all"]').checked = true;
        document.getElementById('minPrice').value = '';
        document.getElementById('maxPrice').value = '';
        document.getElementById('searchInput').value = '';
        document.getElementById('sortSelect').value = 'default';

        this.currentSort = 'default';
        this.applyFilters();
        this.renderProducts();
    }

    // Product actions
    addToCart(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        // Use the existing cart functionality from main script
        if (typeof addToCart === 'function') {
            addToCart(productId, product.name, product.price, product.image);
        } else {
            // Fallback cart functionality
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1
                });
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            this.updateCartCount();
            this.showNotification(`تم إضافة ${product.name} إلى السلة`);
        }
    }

    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }

    showQuickView(productId) {
        const product = this.products.find(p => p.id === productId);
        if (!product) return;

        // Create quick view modal
        const modal = document.createElement('div');
        modal.className = 'quick-view-modal';
        modal.innerHTML = `
            <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
            <div class="modal-content">
                <button class="modal-close" onclick="this.closest('.quick-view-modal').remove()">
                    <i class="fas fa-times"></i>
                </button>
                <div class="quick-view-content">
                    <div class="quick-view-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="quick-view-info">
                        <h2>${product.name}</h2>
                        <div class="product-rating">
                            <span class="stars">${this.generateStars(product.rating)}</span>
                            <span class="rating-count">(${product.reviewCount} مراجعة)</span>
                        </div>
                        <div class="product-price">
                            <span class="current-price">${this.formatPrice(product.price)}</span>
                            ${product.oldPrice ? `<span class="old-price">${this.formatPrice(product.oldPrice)}</span>` : ''}
                        </div>
                        <p class="product-description">${product.description}</p>
                        <div class="quick-view-actions">
                            <button class="add-to-cart" onclick="shopManager.addToCart(${product.id}); this.closest('.quick-view-modal').remove();">
                                <i class="fas fa-shopping-cart"></i>
                                إضافة للسلة
                            </button>
                            <button class="view-details" onclick="shopManager.goToProduct(${product.id})">
                                عرض التفاصيل
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        // Add styles for quick view modal
        if (!document.getElementById('quickViewStyles')) {
            const styles = document.createElement('style');
            styles.id = 'quickViewStyles';
            styles.textContent = `
                .quick-view-modal {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .modal-overlay {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.8);
                }
                .modal-content {
                    position: relative;
                    background: white;
                    border-radius: 12px;
                    max-width: 800px;
                    width: 90%;
                    max-height: 90%;
                    overflow-y: auto;
                }
                .modal-close {
                    position: absolute;
                    top: 15px;
                    left: 15px;
                    background: none;
                    border: none;
                    font-size: 1.5rem;
                    cursor: pointer;
                    z-index: 1;
                    color: #666;
                }
                .quick-view-content {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 2rem;
                    padding: 2rem;
                }
                .quick-view-image img {
                    width: 100%;
                    border-radius: 8px;
                }
                .quick-view-info h2 {
                    margin-bottom: 1rem;
                    color: #333;
                }
                .quick-view-actions {
                    display: flex;
                    gap: 1rem;
                    margin-top: 1.5rem;
                }
                .quick-view-actions button {
                    flex: 1;
                    padding: 12px;
                    border: none;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                }
                .quick-view-actions .add-to-cart {
                    background: #667eea;
                    color: white;
                }
                .quick-view-actions .view-details {
                    background: #f8f9fa;
                    color: #333;
                    border: 1px solid #ddd;
                }
                @media (max-width: 768px) {
                    .quick-view-content {
                        grid-template-columns: 1fr;
                        padding: 1rem;
                    }
                }
            `;
            document.head.appendChild(styles);
        }
    }

    toggleWishlist(productId) {
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const index = wishlist.indexOf(productId);
        
        if (index > -1) {
            wishlist.splice(index, 1);
            this.showNotification('تم إزالة المنتج من المفضلة');
        } else {
            wishlist.push(productId);
            this.showNotification('تم إضافة المنتج إلى المفضلة');
        }
        
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }

    addToCompare(productId) {
        let compareList = JSON.parse(localStorage.getItem('compareList')) || [];
        
        if (compareList.length >= 4) {
            this.showNotification('يمكنك مقارنة 4 منتجات كحد أقصى');
            return;
        }
        
        if (!compareList.includes(productId)) {
            compareList.push(productId);
            localStorage.setItem('compareList', JSON.stringify(compareList));
            this.showNotification('تم إضافة المنتج للمقارنة');
        }
    }

    goToProduct(productId) {
        window.location.href = `product.html?id=${productId}`;
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'shop-notification';
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
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Utility function
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

// Initialize shop manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.shopManager = new ShopManager();
});

// Handle browser back/forward buttons
window.addEventListener('popstate', function() {
    if (window.shopManager) {
        window.shopManager.loadFiltersFromURL();
        window.shopManager.applyFilters();
        window.shopManager.renderProducts();
    }
});
