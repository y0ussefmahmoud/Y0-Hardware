// ===== Cart Page JavaScript =====

class CartManager {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.appliedCoupon = JSON.parse(localStorage.getItem('appliedCoupon')) || null;
        this.savedForLater = JSON.parse(localStorage.getItem('savedForLater')) || [];
        this.currentItemToSave = null;
        
        this.coupons = {
            'WELCOME10': { discount: 10, type: 'percentage', minAmount: 500 },
            'SAVE20': { discount: 20, type: 'percentage', minAmount: 1000 },
            'FREESHIP': { discount: 50, type: 'fixed', minAmount: 0 },
            'STUDENT15': { discount: 15, type: 'percentage', minAmount: 300 }
        };
        
        this.init();
    }

    init() {
        this.renderCart();
        this.updateCartCount();
        this.loadRecommendedProducts();
        this.bindEvents();
    }

    bindEvents() {
        // Coupon input enter key
        const couponInput = document.getElementById('couponCode');
        if (couponInput) {
            couponInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.applyCoupon();
                }
            });
        }
    }

    renderCart() {
        const cartContent = document.getElementById('cartContent');
        const emptyCart = document.getElementById('emptyCart');
        const cartMain = document.getElementById('cartMain');

        if (this.cart.length === 0) {
            emptyCart.style.display = 'block';
            cartMain.style.display = 'none';
            return;
        }

        emptyCart.style.display = 'none';
        cartMain.style.display = 'block';

        this.renderCartItems();
        this.updateSummary();
        this.renderAppliedCoupon();
    }

    renderCartItems() {
        const cartItemsList = document.getElementById('cartItemsList');
        const itemsCount = document.getElementById('itemsCount');

        if (!cartItemsList) return;

        cartItemsList.innerHTML = '';
        itemsCount.textContent = this.cart.length;

        this.cart.forEach((item, index) => {
            const product = this.getProductById(item.id);
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.style.animationDelay = `${index * 0.1}s`;

            const originalPrice = product?.oldPrice || item.price;
            const savings = originalPrice > item.price ? originalPrice - item.price : 0;

            cartItem.innerHTML = `
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-details">
                    <div class="item-name" onclick="window.location.href='product.html?id=${item.id}'">${item.name}</div>
                    <div class="item-specs">${this.getProductSpecs(product)}</div>
                    <div class="item-actions">
                        <a class="item-action" onclick="cartManager.saveForLater(${index})">
                            <i class="fas fa-heart"></i> حفظ للمراجعة لاحقاً
                        </a>
                        <a class="item-action remove" onclick="cartManager.removeItem(${index})">
                            <i class="fas fa-trash"></i> إزالة
                        </a>
                    </div>
                </div>
                <div class="quantity-controls">
                    <button class="qty-btn" onclick="cartManager.decreaseQuantity(${index})" ${item.quantity <= 1 ? 'disabled' : ''}>-</button>
                    <input type="number" class="qty-input" value="${item.quantity}" min="1" max="10" onchange="cartManager.updateQuantity(${index}, this.value)">
                    <button class="qty-btn" onclick="cartManager.increaseQuantity(${index})" ${item.quantity >= 10 ? 'disabled' : ''}>+</button>
                </div>
                <div class="item-price">
                    <div class="current-price">${this.formatPrice(item.price * item.quantity)}</div>
                    ${savings > 0 ? `
                        <div class="original-price">${this.formatPrice(originalPrice * item.quantity)}</div>
                        <div class="price-savings">توفر ${this.formatPrice(savings * item.quantity)}</div>
                    ` : ''}
                </div>
            `;

            cartItemsList.appendChild(cartItem);
        });
    }

    getProductById(id) {
        return productsDatabase ? productsDatabase.find(p => p.id === id) : null;
    }

    getProductSpecs(product) {
        if (!product || !product.specifications) return 'مواصفات غير متاحة';
        
        const specs = [];
        if (product.specifications.processor) specs.push(product.specifications.processor);
        if (product.specifications.memory) specs.push(product.specifications.memory);
        if (product.specifications.storage) specs.push(product.specifications.storage);
        if (product.specifications.cores) specs.push(`${product.specifications.cores} أنوية`);
        
        return specs.slice(0, 2).join(' • ') || 'مواصفات متنوعة';
    }

    updateQuantity(index, newQuantity) {
        const quantity = Math.max(1, Math.min(10, parseInt(newQuantity) || 1));
        
        if (this.cart[index]) {
            this.cart[index].quantity = quantity;
            this.saveCart();
            this.renderCart();
            this.updateCartCount();
            this.showNotification('تم تحديث الكمية', 'success');
        }
    }

    increaseQuantity(index) {
        if (this.cart[index] && this.cart[index].quantity < 10) {
            this.cart[index].quantity += 1;
            this.saveCart();
            this.renderCart();
            this.updateCartCount();
        }
    }

    decreaseQuantity(index) {
        if (this.cart[index] && this.cart[index].quantity > 1) {
            this.cart[index].quantity -= 1;
            this.saveCart();
            this.renderCart();
            this.updateCartCount();
        }
    }

    removeItem(index) {
        if (this.cart[index]) {
            const itemName = this.cart[index].name;
            this.cart.splice(index, 1);
            this.saveCart();
            this.renderCart();
            this.updateCartCount();
            this.showNotification(`تم حذف ${itemName} من السلة`, 'info');
        }
    }

    saveForLater(index) {
        this.currentItemToSave = index;
        const modal = document.getElementById('saveForLaterModal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    confirmSaveForLater() {
        if (this.currentItemToSave !== null && this.cart[this.currentItemToSave]) {
            const item = this.cart[this.currentItemToSave];
            this.savedForLater.push(item);
            localStorage.setItem('savedForLater', JSON.stringify(this.savedForLater));
            
            this.cart.splice(this.currentItemToSave, 1);
            this.saveCart();
            this.renderCart();
            this.updateCartCount();
            
            this.closeSaveForLaterModal();
            this.showNotification('تم حفظ المنتج للمراجعة لاحقاً', 'success');
        }
    }

    closeSaveForLaterModal() {
        const modal = document.getElementById('saveForLaterModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
        this.currentItemToSave = null;
    }

    clearCart() {
        if (this.cart.length === 0) return;
        
        if (confirm('هل أنت متأكد من حذف جميع المنتجات من السلة؟')) {
            this.cart = [];
            this.saveCart();
            this.renderCart();
            this.updateCartCount();
            this.showNotification('تم مسح السلة بالكامل', 'info');
        }
    }

    updateSummary() {
        const subtotal = this.calculateSubtotal();
        const shipping = this.calculateShipping(subtotal);
        const discount = this.calculateDiscount(subtotal);
        const total = subtotal + shipping - discount;

        document.getElementById('subtotal').textContent = this.formatPrice(subtotal);
        document.getElementById('shipping').textContent = shipping === 0 ? 'مجاني' : this.formatPrice(shipping);
        document.getElementById('total').textContent = this.formatPrice(total);

        const discountRow = document.getElementById('discountRow');
        if (discount > 0) {
            document.getElementById('discount').textContent = `-${this.formatPrice(discount)}`;
            discountRow.style.display = 'flex';
        } else {
            discountRow.style.display = 'none';
        }

        // Enable/disable checkout button
        const checkoutBtn = document.querySelector('.checkout-btn');
        if (checkoutBtn) {
            checkoutBtn.disabled = this.cart.length === 0;
        }
    }

    calculateSubtotal() {
        return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    calculateShipping(subtotal) {
        return subtotal >= 1000 ? 0 : 50; // Free shipping over 1000 EGP
    }

    calculateDiscount(subtotal) {
        if (!this.appliedCoupon) return 0;

        const coupon = this.coupons[this.appliedCoupon.code];
        if (!coupon || subtotal < coupon.minAmount) return 0;

        if (coupon.type === 'percentage') {
            return Math.round(subtotal * (coupon.discount / 100));
        } else {
            return coupon.discount;
        }
    }

    applyCoupon() {
        const couponInput = document.getElementById('couponCode');
        const code = couponInput.value.trim().toUpperCase();

        if (!code) {
            this.showNotification('يرجى إدخال كود الخصم', 'error');
            return;
        }

        const coupon = this.coupons[code];
        if (!coupon) {
            this.showNotification('كود الخصم غير صحيح', 'error');
            return;
        }

        const subtotal = this.calculateSubtotal();
        if (subtotal < coupon.minAmount) {
            this.showNotification(`الحد الأدنى للطلب ${this.formatPrice(coupon.minAmount)} لاستخدام هذا الكود`, 'warning');
            return;
        }

        this.appliedCoupon = { code, discount: coupon.discount, type: coupon.type };
        localStorage.setItem('appliedCoupon', JSON.stringify(this.appliedCoupon));

        couponInput.value = '';
        this.renderAppliedCoupon();
        this.updateSummary();

        const discountAmount = this.calculateDiscount(subtotal);
        this.showNotification(`تم تطبيق كود الخصم! وفرت ${this.formatPrice(discountAmount)}`, 'success');
    }

    removeCoupon() {
        this.appliedCoupon = null;
        localStorage.removeItem('appliedCoupon');
        this.renderAppliedCoupon();
        this.updateSummary();
        this.showNotification('تم إزالة كود الخصم', 'info');
    }

    renderAppliedCoupon() {
        const couponInput = document.querySelector('.coupon-input');
        const appliedCoupon = document.getElementById('appliedCoupon');

        if (this.appliedCoupon) {
            couponInput.style.display = 'none';
            appliedCoupon.style.display = 'flex';
            appliedCoupon.querySelector('.coupon-name').textContent = this.appliedCoupon.code;
        } else {
            couponInput.style.display = 'flex';
            appliedCoupon.style.display = 'none';
        }
    }

    proceedToCheckout() {
        if (this.cart.length === 0) {
            this.showNotification('السلة فارغة', 'error');
            return;
        }

        // Save cart state for checkout
        localStorage.setItem('checkoutCart', JSON.stringify({
            items: this.cart,
            coupon: this.appliedCoupon,
            subtotal: this.calculateSubtotal(),
            shipping: this.calculateShipping(this.calculateSubtotal()),
            discount: this.calculateDiscount(this.calculateSubtotal()),
            total: this.calculateSubtotal() + this.calculateShipping(this.calculateSubtotal()) - this.calculateDiscount(this.calculateSubtotal())
        }));

        window.location.href = 'checkout.html';
    }

    loadRecommendedProducts() {
        if (!productsDatabase) return;

        // Get random products for recommendations
        const shuffled = [...productsDatabase].sort(() => 0.5 - Math.random());
        const recommended = shuffled.slice(0, 4);

        const recommendedGrid = document.getElementById('recommendedGrid');
        if (!recommendedGrid) return;

        recommendedGrid.innerHTML = '';

        recommended.forEach(product => {
            const productCard = this.createProductCard(product);
            recommendedGrid.appendChild(productCard);
        });
    }

    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';

        const discountPercent = product.oldPrice ? 
            Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : 0;

        card.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                ${product.badge ? `<div class="product-badge ${product.badge === 'sale' ? 'sale' : product.badge === 'new' ? 'new' : ''}">${this.getBadgeText(product.badge)}</div>` : ''}
            </div>
            <div class="product-info">
                <h3 onclick="window.location.href='product.html?id=${product.id}'">${product.name}</h3>
                <div class="product-rating">
                    <span class="stars">${this.generateStars(product.rating)}</span>
                    <span class="rating-count">(${product.reviewCount})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">${this.formatPrice(product.price)}</span>
                    ${product.oldPrice ? `<span class="old-price">${this.formatPrice(product.oldPrice)}</span>` : ''}
                    ${discountPercent > 0 ? `<span class="discount-percent">-${discountPercent}%</span>` : ''}
                </div>
                <button class="add-to-cart" onclick="cartManager.addRecommendedToCart(${product.id})">
                    <i class="fas fa-shopping-cart"></i>
                    إضافة للسلة
                </button>
            </div>
        `;

        return card;
    }

    addRecommendedToCart(productId) {
        const product = productsDatabase.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.cart.push({
                id: productId,
                name: product.name,
                price: product.price,
                image: product.image,
                quantity: 1
            });
        }

        this.saveCart();
        this.renderCart();
        this.updateCartCount();
        this.showNotification(`تم إضافة ${product.name} إلى السلة`, 'success');
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

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const totalItems = this.cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `cart-notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize cart manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.cartManager = new CartManager();
});

// Handle browser back/forward buttons
window.addEventListener('beforeunload', function() {
    if (window.cartManager) {
        window.cartManager.saveCart();
    }
});
