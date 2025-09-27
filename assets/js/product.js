// ===== Product Details Page JavaScript =====

class ProductManager {
    constructor() {
        this.product = null;
        this.currentImageIndex = 0;
        this.quantity = 1;
        this.selectedRating = 0;
        this.reviews = [];
        this.currentReviewsFilter = 'all';
        this.currentReviewsSort = 'newest';
        
        this.init();
    }

    init() {
        this.loadProduct();
        this.bindEvents();
        this.updateCartCount();
        this.generateMockReviews();
    }

    loadProduct() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id'));
        
        if (!productId || !productsDatabase) {
            this.showError('المنتج غير موجود');
            return;
        }

        this.product = productsDatabase.find(p => p.id === productId);
        
        if (!this.product) {
            this.showError('المنتج غير موجود');
            return;
        }

        this.renderProduct();
        this.loadRelatedProducts();
    }

    renderProduct() {
        if (!this.product) return;

        document.title = `${this.product.name} - Y0 Hardware`;
        
        document.getElementById('productCategory').textContent = categories[this.product.category] || 'منتجات';
        document.getElementById('productName').textContent = this.product.name;
        document.getElementById('productCategoryText').textContent = subcategories[this.product.subcategory] || categories[this.product.category];
        document.getElementById('productTitle').textContent = this.product.name;
        document.getElementById('productCode').textContent = `Y0-${this.product.id.toString().padStart(3, '0')}`;
        document.getElementById('productDescription').textContent = this.product.description;

        document.getElementById('productStars').textContent = this.generateStars(this.product.rating);
        document.getElementById('ratingText').textContent = `(${this.product.rating} من 5)`;
        document.getElementById('reviewCount').textContent = `(${this.product.reviewCount} مراجعة)`;

        document.getElementById('currentPrice').textContent = this.formatPrice(this.product.price);
        
        if (this.product.oldPrice) {
            const oldPriceEl = document.getElementById('oldPrice');
            const discountBadgeEl = document.getElementById('discountBadge');
            const savingsEl = document.getElementById('savingsAmount');
            
            oldPriceEl.textContent = this.formatPrice(this.product.oldPrice);
            oldPriceEl.style.display = 'inline';
            
            const discountPercent = Math.round(((this.product.oldPrice - this.product.price) / this.product.oldPrice) * 100);
            discountBadgeEl.textContent = `خصم ${discountPercent}%`;
            discountBadgeEl.style.display = 'inline';
            
            const savings = this.product.oldPrice - this.product.price;
            savingsEl.querySelector('span').textContent = this.formatPrice(savings);
            savingsEl.style.display = 'block';
        }

        this.setupProductImages();
        this.renderSpecifications();
        this.updateStockStatus();
        
        document.getElementById('reviewsTabCount').textContent = `(${this.product.reviewCount})`;
    }

    setupProductImages() {
        const mainImage = document.getElementById('mainProductImage');
        const thumbnailsContainer = document.getElementById('thumbnailsContainer');
        
        const images = [
            this.product.image,
            this.product.image.replace('w=400', 'w=401'),
            this.product.image.replace('h=400', 'h=401'),
            this.product.image.replace('fit=crop', 'fit=fill')
        ];

        mainImage.src = images[0];
        mainImage.alt = this.product.name;

        thumbnailsContainer.innerHTML = '';
        images.forEach((image, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = `thumbnail ${index === 0 ? 'active' : ''}`;
            thumbnail.innerHTML = `<img src="${image}" alt="${this.product.name}">`;
            thumbnail.onclick = () => this.changeMainImage(index);
            thumbnailsContainer.appendChild(thumbnail);
        });

        this.productImages = images;
    }

    changeMainImage(index) {
        if (!this.productImages || index >= this.productImages.length) return;

        const mainImage = document.getElementById('mainProductImage');
        const thumbnails = document.querySelectorAll('.thumbnail');

        mainImage.src = this.productImages[index];
        
        thumbnails.forEach((thumb, i) => {
            thumb.classList.toggle('active', i === index);
        });

        this.currentImageIndex = index;
    }

    prevThumbnail() {
        const newIndex = this.currentImageIndex > 0 ? this.currentImageIndex - 1 : this.productImages.length - 1;
        this.changeMainImage(newIndex);
    }

    nextThumbnail() {
        const newIndex = this.currentImageIndex < this.productImages.length - 1 ? this.currentImageIndex + 1 : 0;
        this.changeMainImage(newIndex);
    }

    renderSpecifications() {
        const specificationsGrid = document.getElementById('specificationsGrid');
        
        if (!this.product.specifications) {
            specificationsGrid.innerHTML = '<p>لا توجد مواصفات متاحة لهذا المنتج.</p>';
            return;
        }

        specificationsGrid.innerHTML = '';
        
        Object.entries(this.product.specifications).forEach(([key, value]) => {
            const specItem = document.createElement('div');
            specItem.className = 'spec-item';
            specItem.innerHTML = `
                <span class="spec-label">${this.getSpecLabel(key)}</span>
                <span class="spec-value">${value}</span>
            `;
            specificationsGrid.appendChild(specItem);
        });
    }

    getSpecLabel(key) {
        const labels = {
            cores: 'عدد الأنوية', threads: 'خيوط المعالجة', baseFreq: 'التردد الأساسي',
            boostFreq: 'التردد المعزز', cache: 'الذاكرة التخزينية', socket: 'المقبس',
            memory: 'الذاكرة', processor: 'المعالج', graphics: 'كارت الشاشة',
            storage: 'التخزين', display: 'الشاشة', battery: 'البطارية'
        };
        return labels[key] || key;
    }

    updateStockStatus() {
        const stockStatus = document.getElementById('stockStatus');
        
        if (this.product.inStock) {
            stockStatus.innerHTML = `<i class="fas fa-check-circle"></i><span>متوفر في المخزن</span>`;
            stockStatus.style.color = '#2ed573';
        } else {
            stockStatus.innerHTML = `<i class="fas fa-times-circle"></i><span>غير متوفر حالياً</span>`;
            stockStatus.style.color = '#ff4757';
        }
    }

    bindEvents() {
        const tabHeaders = document.querySelectorAll('.tab-header');
        tabHeaders.forEach(header => {
            header.addEventListener('click', (e) => {
                const tabName = e.target.dataset.tab;
                this.switchTab(tabName);
            });
        });

        const quantityInput = document.getElementById('quantityInput');
        if (quantityInput) {
            quantityInput.addEventListener('change', (e) => {
                this.quantity = Math.max(1, Math.min(10, parseInt(e.target.value) || 1));
                e.target.value = this.quantity;
            });
        }
    }

    switchTab(tabName) {
        const tabHeaders = document.querySelectorAll('.tab-header');
        tabHeaders.forEach(header => {
            header.classList.toggle('active', header.dataset.tab === tabName);
        });

        const tabPanels = document.querySelectorAll('.tab-panel');
        tabPanels.forEach(panel => {
            panel.classList.toggle('active', panel.id === tabName);
        });

        if (tabName === 'reviews') {
            this.renderReviews();
        }
    }

    increaseQuantity() {
        this.quantity = Math.min(10, this.quantity + 1);
        document.getElementById('quantityInput').value = this.quantity;
    }

    decreaseQuantity() {
        this.quantity = Math.max(1, this.quantity - 1);
        document.getElementById('quantityInput').value = this.quantity;
    }

    addToCart() {
        if (!this.product || !this.product.inStock) {
            this.showNotification('المنتج غير متوفر حالياً', 'error');
            return;
        }

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingItem = cart.find(item => item.id === this.product.id);

        if (existingItem) {
            existingItem.quantity += this.quantity;
        } else {
            cart.push({
                id: this.product.id,
                name: this.product.name,
                price: this.product.price,
                image: this.product.image,
                quantity: this.quantity
            });
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        this.updateCartCount();
        this.showNotification(`تم إضافة ${this.quantity} من ${this.product.name} إلى السلة`, 'success');
    }

    buyNow() {
        this.addToCart();
        setTimeout(() => {
            window.location.href = 'cart.html';
        }, 500);
    }

    generateMockReviews() {
        this.reviews = [
            { id: 1, name: 'أحمد محمد', rating: 5, title: 'منتج ممتاز', text: 'جودة عالية وأداء رائع', date: '2024-01-15', helpful: 12 },
            { id: 2, name: 'فاطمة علي', rating: 4, title: 'جيد جداً', text: 'المنتج جيد ولكن التوصيل كان متأخر قليلاً', date: '2024-01-10', helpful: 8 }
        ];
    }

    renderReviews() {
        const reviewsList = document.getElementById('reviewsList');
        if (!reviewsList) return;

        reviewsList.innerHTML = '';
        this.reviews.forEach(review => {
            const reviewItem = document.createElement('div');
            reviewItem.className = 'review-item';
            reviewItem.innerHTML = `
                <div class="review-header">
                    <div class="reviewer-info">
                        <div class="reviewer-avatar">${review.name.charAt(0)}</div>
                        <div class="reviewer-details">
                            <h4>${review.name}</h4>
                            <span class="review-date">${this.formatDate(review.date)}</span>
                        </div>
                    </div>
                    <div class="review-rating">
                        <span class="stars">${this.generateStars(review.rating)}</span>
                    </div>
                </div>
                <div class="review-content">
                    <h5>${review.title}</h5>
                    <p>${review.text}</p>
                </div>
            `;
            reviewsList.appendChild(reviewItem);
        });
    }

    loadRelatedProducts() {
        if (!this.product || !productsDatabase) return;

        const relatedProducts = productsDatabase
            .filter(p => p.id !== this.product.id && p.category === this.product.category)
            .slice(0, 4);

        const relatedProductsGrid = document.getElementById('relatedProductsGrid');
        relatedProductsGrid.innerHTML = '';

        relatedProducts.forEach(product => {
            const productCard = this.createProductCard(product);
            relatedProductsGrid.appendChild(productCard);
        });
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3 onclick="window.location.href='product.html?id=${product.id}'">${product.name}</h3>
                <div class="product-price">
                    <span class="current-price">${this.formatPrice(product.price)}</span>
                </div>
                <button class="add-to-cart" onclick="productManager.addRelatedToCart(${product.id})">
                    إضافة للسلة
                </button>
            </div>
        `;
        return card;
    }

    addRelatedToCart(productId) {
        const product = productsDatabase.find(p => p.id === productId);
        if (!product) return;

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
        this.showNotification(`تم إضافة ${product.name} إلى السلة`, 'success');
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

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('ar-EG');
    }

    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed; top: 100px; right: 20px; background: #667eea;
            color: white; padding: 15px 20px; border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2); z-index: 10000;
            transform: translateX(100%); transition: transform 0.3s ease;
        `;
        
        if (type === 'error') notification.style.background = '#ff4757';
        if (type === 'success') notification.style.background = '#2ed573';
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.style.transform = 'translateX(0)', 100);
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => document.body.removeChild(notification), 300);
        }, 3000);
    }

    showError(message) {
        document.body.innerHTML = `
            <div style="display: flex; justify-content: center; align-items: center; height: 100vh; flex-direction: column;">
                <h2>خطأ</h2>
                <p>${message}</p>
                <a href="shop.html" style="margin-top: 1rem; padding: 10px 20px; background: #667eea; color: white; text-decoration: none; border-radius: 5px;">العودة للمتجر</a>
            </div>
        `;
    }

    toggleWishlist() {
        let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
        const index = wishlist.indexOf(this.product.id);
        
        if (index > -1) {
            wishlist.splice(index, 1);
            this.showNotification('تم إزالة المنتج من المفضلة');
        } else {
            wishlist.push(this.product.id);
            this.showNotification('تم إضافة المنتج إلى المفضلة');
        }
        
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }

    addToCompare() {
        let compareList = JSON.parse(localStorage.getItem('compareList')) || [];
        
        if (compareList.length >= 4) {
            this.showNotification('يمكنك مقارنة 4 منتجات كحد أقصى');
            return;
        }
        
        if (!compareList.includes(this.product.id)) {
            compareList.push(this.product.id);
            localStorage.setItem('compareList', JSON.stringify(compareList));
            this.showNotification('تم إضافة المنتج للمقارنة');
        }
    }

    shareProduct() {
        if (navigator.share) {
            navigator.share({
                title: this.product.name,
                text: this.product.description,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href).then(() => {
                this.showNotification('تم نسخ رابط المنتج');
            });
        }
    }

    openFullscreen() {
        const mainImage = document.getElementById('mainProductImage');
        if (mainImage.requestFullscreen) {
            mainImage.requestFullscreen();
        }
    }

    openReviewForm() {
        const modal = document.getElementById('reviewModal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    closeReviewForm() {
        const modal = document.getElementById('reviewModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.productManager = new ProductManager();
});
