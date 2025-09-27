// ===== Checkout Page JavaScript =====

class CheckoutManager {
    constructor() {
        this.checkoutData = JSON.parse(localStorage.getItem('checkoutCart')) || null;
        this.formData = {};
        this.shippingCost = 0;
        this.paymentMethod = 'cod';
        this.shippingMethod = 'standard';
        
        this.init();
    }

    init() {
        if (!this.checkoutData || !this.checkoutData.items || this.checkoutData.items.length === 0) {
            this.redirectToCart();
            return;
        }

        this.renderOrderSummary();
        this.bindEvents();
        this.setupFormValidation();
        this.loadSavedData();
    }

    redirectToCart() {
        window.location.href = 'cart.html';
    }

    renderOrderSummary() {
        const orderItems = document.getElementById('orderItems');
        const summarySubtotal = document.getElementById('summarySubtotal');
        const summaryShipping = document.getElementById('summaryShipping');
        const summaryDiscount = document.getElementById('summaryDiscount');
        const summaryDiscountRow = document.getElementById('summaryDiscountRow');
        const summaryTotal = document.getElementById('summaryTotal');

        // Render order items
        orderItems.innerHTML = '';
        this.checkoutData.items.forEach(item => {
            const orderItem = document.createElement('div');
            orderItem.className = 'order-item';
            orderItem.innerHTML = `
                <div class="item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="item-details">
                    <div class="item-name">${item.name}</div>
                    <div class="item-quantity">الكمية: ${item.quantity}</div>
                </div>
                <div class="item-price">${this.formatPrice(item.price * item.quantity)}</div>
            `;
            orderItems.appendChild(orderItem);
        });

        // Update summary
        summarySubtotal.textContent = this.formatPrice(this.checkoutData.subtotal);
        summaryShipping.textContent = this.checkoutData.shipping === 0 ? 'مجاني' : this.formatPrice(this.checkoutData.shipping);
        summaryTotal.textContent = this.formatPrice(this.checkoutData.total);

        if (this.checkoutData.discount > 0) {
            summaryDiscount.textContent = `-${this.formatPrice(this.checkoutData.discount)}`;
            summaryDiscountRow.style.display = 'flex';
        } else {
            summaryDiscountRow.style.display = 'none';
        }
    }

    bindEvents() {
        // Payment method change
        const paymentRadios = document.querySelectorAll('input[name="payment"]');
        paymentRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.paymentMethod = e.target.value;
                this.toggleCardDetails();
            });
        });

        // Shipping method change
        const shippingRadios = document.querySelectorAll('input[name="shipping"]');
        shippingRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.shippingMethod = e.target.value;
                this.updateShippingCost();
            });
        });

        // Form submission
        const checkoutForm = document.getElementById('checkoutForm');
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.processOrder();
        });

        // Card number formatting
        const cardNumberInput = document.getElementById('cardNumber');
        if (cardNumberInput) {
            cardNumberInput.addEventListener('input', (e) => {
                this.formatCardNumber(e.target);
            });
        }

        // Expiry date formatting
        const expiryDateInput = document.getElementById('expiryDate');
        if (expiryDateInput) {
            expiryDateInput.addEventListener('input', (e) => {
                this.formatExpiryDate(e.target);
            });
        }

        // CVV formatting
        const cvvInput = document.getElementById('cvv');
        if (cvvInput) {
            cvvInput.addEventListener('input', (e) => {
                e.target.value = e.target.value.replace(/\D/g, '');
            });
        }

        // Auto-save form data
        const formInputs = document.querySelectorAll('#checkoutForm input, #checkoutForm select, #checkoutForm textarea');
        formInputs.forEach(input => {
            input.addEventListener('change', () => {
                this.saveFormData();
            });
        });
    }

    toggleCardDetails() {
        const cardDetails = document.getElementById('cardDetails');
        const cardInputs = cardDetails.querySelectorAll('input');
        
        if (this.paymentMethod === 'card') {
            cardDetails.style.display = 'block';
            cardInputs.forEach(input => {
                input.setAttribute('required', 'required');
            });
        } else {
            cardDetails.style.display = 'none';
            cardInputs.forEach(input => {
                input.removeAttribute('required');
                input.value = '';
            });
        }
    }

    updateShippingCost() {
        const summaryShipping = document.getElementById('summaryShipping');
        const summaryTotal = document.getElementById('summaryTotal');
        
        if (this.shippingMethod === 'express') {
            this.shippingCost = 100;
        } else {
            this.shippingCost = this.checkoutData.subtotal >= 1000 ? 0 : 50;
        }

        const newTotal = this.checkoutData.subtotal + this.shippingCost - this.checkoutData.discount;
        
        summaryShipping.textContent = this.shippingCost === 0 ? 'مجاني' : this.formatPrice(this.shippingCost);
        summaryTotal.textContent = this.formatPrice(newTotal);
    }

    formatCardNumber(input) {
        let value = input.value.replace(/\D/g, '');
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        input.value = value;
    }

    formatExpiryDate(input) {
        let value = input.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        input.value = value;
    }

    setupFormValidation() {
        const form = document.getElementById('checkoutForm');
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
            
            input.addEventListener('input', () => {
                this.clearFieldError(input);
            });
        });
    }

    validateField(field) {
        const formGroup = field.closest('.form-group');
        const errorMessage = formGroup.querySelector('.error-message') || this.createErrorMessage(formGroup);
        
        let isValid = true;
        let message = '';

        // Required field validation
        if (field.hasAttribute('required') && !field.value.trim()) {
            isValid = false;
            message = 'هذا الحقل مطلوب';
        }
        
        // Email validation
        else if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                isValid = false;
                message = 'يرجى إدخال بريد إلكتروني صحيح';
            }
        }
        
        // Phone validation
        else if (field.type === 'tel' && field.value) {
            const phoneRegex = /^[0-9]{10,11}$/;
            if (!phoneRegex.test(field.value.replace(/\D/g, ''))) {
                isValid = false;
                message = 'يرجى إدخال رقم هاتف صحيح';
            }
        }
        
        // Card number validation
        else if (field.id === 'cardNumber' && field.value) {
            const cardNumber = field.value.replace(/\D/g, '');
            if (cardNumber.length < 13 || cardNumber.length > 19) {
                isValid = false;
                message = 'رقم البطاقة غير صحيح';
            }
        }
        
        // Expiry date validation
        else if (field.id === 'expiryDate' && field.value) {
            const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
            if (!expiryRegex.test(field.value)) {
                isValid = false;
                message = 'تاريخ انتهاء غير صحيح';
            } else {
                const [month, year] = field.value.split('/');
                const currentDate = new Date();
                const currentYear = currentDate.getFullYear() % 100;
                const currentMonth = currentDate.getMonth() + 1;
                
                if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
                    isValid = false;
                    message = 'البطاقة منتهية الصلاحية';
                }
            }
        }
        
        // CVV validation
        else if (field.id === 'cvv' && field.value) {
            if (field.value.length < 3 || field.value.length > 4) {
                isValid = false;
                message = 'CVV غير صحيح';
            }
        }

        if (isValid) {
            formGroup.classList.remove('error');
            formGroup.classList.add('success');
            errorMessage.style.display = 'none';
        } else {
            formGroup.classList.remove('success');
            formGroup.classList.add('error');
            errorMessage.textContent = message;
            errorMessage.style.display = 'block';
        }

        return isValid;
    }

    createErrorMessage(formGroup) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        formGroup.appendChild(errorMessage);
        return errorMessage;
    }

    clearFieldError(field) {
        const formGroup = field.closest('.form-group');
        formGroup.classList.remove('error');
        
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.style.display = 'none';
        }
    }

    validateForm() {
        const form = document.getElementById('checkoutForm');
        const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        // Terms and conditions validation
        const agreeTerms = document.getElementById('agreeTerms');
        if (!agreeTerms.checked) {
            isValid = false;
            this.showNotification('يجب الموافقة على الشروط والأحكام', 'error');
        }

        return isValid;
    }

    collectFormData() {
        const form = document.getElementById('checkoutForm');
        const formData = new FormData(form);
        const data = {};

        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        return data;
    }

    saveFormData() {
        const data = this.collectFormData();
        localStorage.setItem('checkoutFormData', JSON.stringify(data));
    }

    loadSavedData() {
        const savedData = JSON.parse(localStorage.getItem('checkoutFormData'));
        if (!savedData) return;

        Object.keys(savedData).forEach(key => {
            const field = document.querySelector(`[name="${key}"]`);
            if (field) {
                if (field.type === 'checkbox' || field.type === 'radio') {
                    if (field.value === savedData[key]) {
                        field.checked = true;
                        if (field.name === 'payment') {
                            this.paymentMethod = savedData[key];
                            this.toggleCardDetails();
                        }
                        if (field.name === 'shipping') {
                            this.shippingMethod = savedData[key];
                            this.updateShippingCost();
                        }
                    }
                } else {
                    field.value = savedData[key];
                }
            }
        });
    }

    async processOrder() {
        if (!this.validateForm()) {
            this.showNotification('يرجى تصحيح الأخطاء في النموذج', 'error');
            return;
        }

        const loadingOverlay = document.getElementById('loadingOverlay');
        loadingOverlay.style.display = 'flex';

        try {
            // Collect all order data
            const orderData = {
                customer: this.collectFormData(),
                items: this.checkoutData.items,
                pricing: {
                    subtotal: this.checkoutData.subtotal,
                    shipping: this.shippingCost,
                    discount: this.checkoutData.discount,
                    total: this.checkoutData.subtotal + this.shippingCost - this.checkoutData.discount
                },
                paymentMethod: this.paymentMethod,
                shippingMethod: this.shippingMethod,
                orderDate: new Date().toISOString(),
                orderId: this.generateOrderId()
            };

            // Simulate API call
            await this.simulateOrderProcessing(orderData);

            // Save order to localStorage (in real app, this would be sent to server)
            this.saveOrder(orderData);

            // Clear cart and form data
            localStorage.removeItem('cart');
            localStorage.removeItem('checkoutCart');
            localStorage.removeItem('checkoutFormData');

            // Redirect to success page
            this.redirectToSuccess(orderData.orderId);

        } catch (error) {
            console.error('Order processing failed:', error);
            this.showNotification('حدث خطأ أثناء معالجة الطلب. يرجى المحاولة مرة أخرى.', 'error');
        } finally {
            loadingOverlay.style.display = 'none';
        }
    }

    async simulateOrderProcessing(orderData) {
        // Simulate different processing times based on payment method
        const processingTime = {
            'cod': 2000,
            'card': 3000,
            'transfer': 2500,
            'vodafone': 2000
        };

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate random failure (5% chance)
                if (Math.random() < 0.05) {
                    reject(new Error('Payment processing failed'));
                } else {
                    resolve(orderData);
                }
            }, processingTime[this.paymentMethod] || 2000);
        });
    }

    generateOrderId() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `Y0-${timestamp}-${random}`;
    }

    saveOrder(orderData) {
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.unshift(orderData);
        
        // Keep only last 10 orders
        if (orders.length > 10) {
            orders = orders.slice(0, 10);
        }
        
        localStorage.setItem('orders', JSON.stringify(orders));
    }

    redirectToSuccess(orderId) {
        // Create a simple success page redirect
        const successUrl = `success.html?order=${orderId}`;
        
        // If success page doesn't exist, show success message and redirect to home
        setTimeout(() => {
            alert(`تم تأكيد طلبك بنجاح!\nرقم الطلب: ${orderId}\n\nسيتم توجيهك للصفحة الرئيسية.`);
            window.location.href = 'index.html';
        }, 1000);
    }

    formatPrice(price) {
        return new Intl.NumberFormat('ar-EG').format(price) + ' ج.م';
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'error' ? '#ff4757' : type === 'success' ? '#2ed573' : '#667eea'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 10001;
            font-weight: 600;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
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
        }, 5000);
    }
}

// Initialize checkout manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.checkoutManager = new CheckoutManager();
});

// Prevent form submission on page refresh
window.addEventListener('beforeunload', function(e) {
    const form = document.getElementById('checkoutForm');
    if (form && form.checkValidity && form.checkValidity()) {
        // Save form data before leaving
        if (window.checkoutManager) {
            window.checkoutManager.saveFormData();
        }
    }
});
