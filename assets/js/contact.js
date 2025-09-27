// ===== Contact Page JavaScript =====

class ContactManager {
    constructor() {
        this.chatMessages = [];
        this.chatResponses = [
            'شكراً لتواصلك معنا! كيف يمكنني مساعدتك؟',
            'سأقوم بتوجيه استفسارك لفريق المختص.',
            'هل تحتاج مساعدة في اختيار منتج معين؟',
            'يمكنك تصفح منتجاتنا من خلال المتجر الإلكتروني.',
            'فريق خدمة العملاء متاح لمساعدتك 24/7.',
            'هل لديك رقم طلب تريد الاستفسار عنه؟'
        ];
        
        this.init();
    }

    init() {
        this.updateCartCount();
        this.bindEvents();
        this.setupFormValidation();
        this.loadSavedFormData();
    }

    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }

    bindEvents() {
        // Contact form submission
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.submitContactForm();
            });
        }

        // Auto-save form data
        const formInputs = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');
        formInputs.forEach(input => {
            input.addEventListener('change', () => {
                this.saveFormData();
            });
        });

        // Chat input enter key
        const chatInput = document.getElementById('chatMessageInput');
        if (chatInput) {
            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.sendChatMessage();
                }
            });
        }

        // Social media links
        const socialLinks = document.querySelectorAll('.social-link');
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleSocialClick(link);
            });
        });

        // Method cards interaction
        const methodCards = document.querySelectorAll('.method-card');
        methodCards.forEach(card => {
            card.addEventListener('click', () => {
                this.highlightMethodCard(card);
            });
        });
    }

    setupFormValidation() {
        const form = document.getElementById('contactForm');
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
        const form = document.getElementById('contactForm');
        const requiredFields = form.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        // Agreement checkbox validation
        const agreeContact = document.getElementById('agreeContact');
        if (!agreeContact.checked) {
            isValid = false;
            this.showNotification('يجب الموافقة على سياسة الخصوصية', 'error');
        }

        return isValid;
    }

    async submitContactForm() {
        if (!this.validateForm()) {
            this.showNotification('يرجى تصحيح الأخطاء في النموذج', 'error');
            return;
        }

        const submitBtn = document.querySelector('.submit-btn');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
        submitBtn.disabled = true;

        try {
            // Collect form data
            const formData = this.collectFormData();
            
            // Simulate API call
            await this.simulateFormSubmission(formData);
            
            // Save to localStorage (in real app, this would be sent to server)
            this.saveContactMessage(formData);
            
            // Show success message
            this.showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');
            
            // Reset form
            document.getElementById('contactForm').reset();
            this.clearFormData();
            
            // Remove validation classes
            const formGroups = document.querySelectorAll('.form-group');
            formGroups.forEach(group => {
                group.classList.remove('success', 'error');
            });

        } catch (error) {
            console.error('Form submission failed:', error);
            this.showNotification('حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.', 'error');
        } finally {
            // Reset button state
            submitBtn.classList.remove('loading');
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    async simulateFormSubmission(formData) {
        // Simulate network delay
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate random failure (5% chance)
                if (Math.random() < 0.05) {
                    reject(new Error('Network error'));
                } else {
                    resolve(formData);
                }
            }, 2000);
        });
    }

    collectFormData() {
        const form = document.getElementById('contactForm');
        const formData = new FormData(form);
        const data = {};

        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }

        data.timestamp = new Date().toISOString();
        data.messageId = this.generateMessageId();

        return data;
    }

    generateMessageId() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `MSG-${timestamp}-${random}`;
    }

    saveContactMessage(data) {
        let messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
        messages.unshift(data);
        
        // Keep only last 50 messages
        if (messages.length > 50) {
            messages = messages.slice(0, 50);
        }
        
        localStorage.setItem('contactMessages', JSON.stringify(messages));
    }

    saveFormData() {
        const data = this.collectFormData();
        localStorage.setItem('contactFormData', JSON.stringify(data));
    }

    loadSavedFormData() {
        const savedData = JSON.parse(localStorage.getItem('contactFormData'));
        if (!savedData) return;

        Object.keys(savedData).forEach(key => {
            const field = document.querySelector(`[name="${key}"]`);
            if (field) {
                if (field.type === 'checkbox') {
                    field.checked = savedData[key] === 'on';
                } else {
                    field.value = savedData[key];
                }
            }
        });
    }

    clearFormData() {
        localStorage.removeItem('contactFormData');
    }

    // FAQ Functions
    toggleFAQ(questionElement) {
        const faqItem = questionElement.closest('.faq-item');
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    }

    // Live Chat Functions
    openLiveChat() {
        const modal = document.getElementById('liveChatModal');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Initialize chat if first time
        if (this.chatMessages.length === 0) {
            this.addChatMessage('مرحباً! كيف يمكنني مساعدتك اليوم؟', 'bot');
        }
    }

    closeLiveChat() {
        const modal = document.getElementById('liveChatModal');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    sendChatMessage() {
        const input = document.getElementById('chatMessageInput');
        const message = input.value.trim();
        
        if (!message) return;
        
        // Add user message
        this.addChatMessage(message, 'user');
        input.value = '';
        
        // Simulate bot response
        setTimeout(() => {
            const response = this.generateBotResponse(message);
            this.addChatMessage(response, 'bot');
        }, 1000);
    }

    addChatMessage(message, sender) {
        const chatMessages = document.getElementById('chatMessages');
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}-message`;
        
        const time = new Date().toLocaleTimeString('ar-EG', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
        
        messageElement.innerHTML = `
            <div class="message-avatar">
                <i class="fas fa-${sender === 'user' ? 'user' : 'robot'}"></i>
            </div>
            <div class="message-content">
                <p>${message}</p>
                <span class="message-time">${time}</span>
            </div>
        `;
        
        chatMessages.appendChild(messageElement);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Save message
        this.chatMessages.push({
            message,
            sender,
            timestamp: new Date().toISOString()
        });
    }

    generateBotResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Simple keyword-based responses
        if (message.includes('سعر') || message.includes('تكلفة')) {
            return 'يمكنك الاطلاع على أسعار جميع المنتجات في متجرنا الإلكتروني. هل تبحث عن منتج معين؟';
        }
        
        if (message.includes('طلب') || message.includes('شراء')) {
            return 'لتتبع طلبك، يرجى تزويدي برقم الطلب. أو يمكنك إنشاء طلب جديد من خلال المتجر.';
        }
        
        if (message.includes('ضمان') || message.includes('كفالة')) {
            return 'جميع منتجاتنا تأتي بضمان شامل. مدة الضمان تختلف حسب نوع المنتج من سنة إلى ثلاث سنوات.';
        }
        
        if (message.includes('توصيل') || message.includes('شحن')) {
            return 'نوفر خدمة التوصيل المجاني للطلبات فوق 1000 ج.م. التوصيل خلال 2-5 أيام عمل.';
        }
        
        if (message.includes('مساعدة') || message.includes('استفسار')) {
            return 'بالطبع! أنا هنا لمساعدتك. يمكنك أيضاً التواصل مع فريق خدمة العملاء على الرقم 01234567890.';
        }
        
        // Random response if no keyword match
        const randomIndex = Math.floor(Math.random() * this.chatResponses.length);
        return this.chatResponses[randomIndex];
    }

    // Social Media Functions
    handleSocialClick(link) {
        const platform = this.getSocialPlatform(link);
        
        // In a real application, these would be actual social media links
        this.showNotification(`سيتم توجيهك إلى صفحتنا على ${platform}`, 'info');
        
        // Track social media clicks
        this.trackSocialClick(platform);
    }

    getSocialPlatform(link) {
        if (link.classList.contains('facebook')) return 'Facebook';
        if (link.classList.contains('instagram')) return 'Instagram';
        if (link.classList.contains('twitter')) return 'Twitter';
        if (link.classList.contains('youtube')) return 'YouTube';
        if (link.classList.contains('whatsapp')) return 'WhatsApp';
        if (link.classList.contains('telegram')) return 'Telegram';
        return 'وسائل التواصل الاجتماعي';
    }

    trackSocialClick(platform) {
        // Analytics tracking
        console.log(`Social click tracked: ${platform}`);
        
        const socialClicks = JSON.parse(localStorage.getItem('socialClicks')) || [];
        socialClicks.push({
            platform: platform,
            timestamp: new Date().toISOString(),
            page: 'contact'
        });
        localStorage.setItem('socialClicks', JSON.stringify(socialClicks));
    }

    // Map Functions
    getDirections() {
        // In a real application, this would open Google Maps or similar
        const address = 'شارع التحرير، وسط البلد، القاهرة، مصر';
        const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
        
        this.showNotification('سيتم فتح خرائط جوجل للحصول على الاتجاهات', 'info');
        
        // In a real app, you would open the URL
        // window.open(mapsUrl, '_blank');
        
        console.log('Maps URL:', mapsUrl);
    }

    // Method Card Interaction
    highlightMethodCard(card) {
        // Remove highlight from all cards
        document.querySelectorAll('.method-card').forEach(c => {
            c.style.transform = '';
            c.style.boxShadow = '';
        });
        
        // Highlight clicked card
        card.style.transform = 'translateY(-5px) scale(1.02)';
        card.style.boxShadow = '0 25px 50px rgba(102, 126, 234, 0.2)';
        
        // Reset after animation
        setTimeout(() => {
            card.style.transform = '';
            card.style.boxShadow = '';
        }, 2000);
    }

    // Notification System
    showNotification(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `contact-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close" onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'error' ? '#ff4757' : type === 'success' ? '#2ed573' : '#667eea'};
            color: white;
            padding: 15px 20px;
            border-radius: 12px;
            box-shadow: 0 8px 25px rgba(0,0,0,0.2);
            z-index: 10001;
            max-width: 400px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            font-size: 14px;
            line-height: 1.4;
        `;
        
        const notificationContent = notification.querySelector('.notification-content');
        notificationContent.style.cssText = `
            display: flex;
            align-items: flex-start;
            gap: 10px;
        `;
        
        const closeButton = notification.querySelector('.notification-close');
        closeButton.style.cssText = `
            position: absolute;
            top: 5px;
            left: 5px;
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            padding: 5px;
            border-radius: 4px;
            opacity: 0.8;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => {
                    if (notification.parentNode) {
                        document.body.removeChild(notification);
                    }
                }, 300);
            }
        }, duration);
    }

    // Analytics and Tracking
    trackFormInteraction(action, field = null) {
        const interaction = {
            action: action,
            field: field,
            timestamp: new Date().toISOString(),
            page: 'contact'
        };
        
        let interactions = JSON.parse(localStorage.getItem('formInteractions')) || [];
        interactions.push(interaction);
        
        // Keep only last 100 interactions
        if (interactions.length > 100) {
            interactions = interactions.slice(-100);
        }
        
        localStorage.setItem('formInteractions', JSON.stringify(interactions));
    }
}

// Initialize contact manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.contactManager = new ContactManager();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (!document.hidden && window.contactManager) {
        window.contactManager.updateCartCount();
    }
});
