// ===== About Page JavaScript =====

class AboutPageManager {
    constructor() {
        this.countersAnimated = false;
        this.init();
    }

    init() {
        this.updateCartCount();
        this.setupScrollAnimations();
        this.setupCounterAnimation();
        this.bindEvents();
    }

    updateCartCount() {
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
            const cart = JSON.parse(localStorage.getItem('cart')) || [];
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            cartCount.textContent = totalItems;
        }
    }

    setupScrollAnimations() {
        // Create intersection observer for scroll animations
        const observerOptions = {
            threshold: 0.2,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, observerOptions);

        // Add animation classes to elements
        const animateElements = document.querySelectorAll(
            '.value-card, .team-member, .partner-logo, .story-text, .story-image'
        );

        animateElements.forEach((element, index) => {
            element.classList.add('animate-on-scroll');
            element.style.animationDelay = `${index * 0.1}s`;
            observer.observe(element);
        });
    }

    setupCounterAnimation() {
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.countersAnimated) {
                    this.animateCounters();
                    this.countersAnimated = true;
                }
            });
        }, { threshold: 0.5 });

        const statsSection = document.querySelector('.statistics');
        if (statsSection) {
            counterObserver.observe(statsSection);
        }
    }

    animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const step = target / (duration / 16); // 60fps
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current).toLocaleString('ar-EG');
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString('ar-EG');
                    counter.classList.add('counting');
                    setTimeout(() => counter.classList.remove('counting'), 500);
                }
            };

            // Add a small delay for each counter
            const delay = Array.from(counters).indexOf(counter) * 200;
            setTimeout(updateCounter, delay);
        });
    }

    bindEvents() {
        // Team member hover effects
        const teamMembers = document.querySelectorAll('.team-member');
        teamMembers.forEach(member => {
            member.addEventListener('mouseenter', () => {
                this.highlightTeamMember(member);
            });
            
            member.addEventListener('mouseleave', () => {
                this.resetTeamMember(member);
            });
        });

        // Value card interactions
        const valueCards = document.querySelectorAll('.value-card');
        valueCards.forEach(card => {
            card.addEventListener('click', () => {
                this.showValueDetails(card);
            });
        });

        // Partner logo interactions
        const partnerLogos = document.querySelectorAll('.partner-logo');
        partnerLogos.forEach(logo => {
            logo.addEventListener('click', () => {
                this.showPartnerInfo(logo);
            });
        });

        // Smooth scrolling for CTA buttons
        const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
        ctaButtons.forEach(button => {
            if (button.getAttribute('href').startsWith('#')) {
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.smoothScrollTo(button.getAttribute('href'));
                });
            }
        });

        // Social media links tracking
        const socialLinks = document.querySelectorAll('.member-social a');
        socialLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleSocialClick(link);
            });
        });
    }

    highlightTeamMember(member) {
        const memberImage = member.querySelector('.member-image img');
        const memberInfo = member.querySelector('.member-info');
        
        if (memberImage) {
            memberImage.style.filter = 'brightness(1.1) saturate(1.2)';
        }
        
        if (memberInfo) {
            memberInfo.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            memberInfo.style.color = 'white';
        }
    }

    resetTeamMember(member) {
        const memberImage = member.querySelector('.member-image img');
        const memberInfo = member.querySelector('.member-info');
        
        if (memberImage) {
            memberImage.style.filter = '';
        }
        
        if (memberInfo) {
            memberInfo.style.background = '';
            memberInfo.style.color = '';
        }
    }

    showValueDetails(card) {
        const title = card.querySelector('h3').textContent;
        const description = card.querySelector('p').textContent;
        
        // Create a simple modal or alert with value details
        const valueDetails = {
            'الجودة العالية': 'نحن ملتزمون بتوفير منتجات عالية الجودة من أفضل الماركات العالمية. كل منتج يخضع لفحص دقيق قبل وصوله إليك.',
            'الثقة والشفافية': 'نؤمن بأهمية الثقة في العلاقة مع عملائنا. لذلك نوفر معلومات شاملة وواضحة عن جميع منتجاتنا وخدماتنا.',
            'الابتكار المستمر': 'نواكب أحدث التطورات في عالم التكنولوجيا ونسعى دائماً لتقديم الحلول الأكثر تطوراً وابتكاراً.',
            'خدمة العملاء': 'فريق خدمة العملاء لدينا متاح 24/7 لمساعدتك في أي استفسار أو مشكلة قد تواجهها.',
            'الأمان والضمان': 'جميع منتجاتنا أصلية ومضمونة. نوفر ضمان شامل وخدمة ما بعد البيع المتميزة.',
            'السرعة والكفاءة': 'نعمل على توصيل طلبك في أسرع وقت ممكن مع ضمان سلامة المنتج ودقة التوصيل.'
        };

        const detailedDescription = valueDetails[title] || description;
        
        this.showNotification(`${title}: ${detailedDescription}`, 'info', 8000);
    }

    showPartnerInfo(logo) {
        const partnerName = logo.querySelector('span').textContent;
        
        const partnerInfo = {
            'Microsoft': 'شريك معتمد لحلول Microsoft وأنظمة Windows الأصلية',
            'Intel': 'موزع معتمد لمعالجات Intel الأصلية مع ضمان كامل',
            'AMD': 'شريك رسمي لمعالجات وكروت الشاشة AMD',
            'NVIDIA': 'موزع معتمد لكروت الشاشة NVIDIA GeForce و RTX',
            'ASUS': 'وكيل معتمد لمنتجات ASUS من اللابتوب واللوحات الأم',
            'Corsair': 'شريك رسمي لاكسسوارات الألعاب وقطع الكمبيوتر Corsair'
        };

        const info = partnerInfo[partnerName] || `شريك معتمد مع ${partnerName}`;
        this.showNotification(info, 'success', 4000);
    }

    smoothScrollTo(target) {
        const element = document.querySelector(target);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    handleSocialClick(link) {
        const platform = this.getSocialPlatform(link);
        const memberName = link.closest('.team-member').querySelector('h3').textContent;
        
        // In a real application, these would be actual social media links
        this.showNotification(`تواصل مع ${memberName} عبر ${platform}`, 'info', 3000);
        
        // Track social media clicks (for analytics)
        this.trackSocialClick(memberName, platform);
    }

    getSocialPlatform(link) {
        const icon = link.querySelector('i');
        if (icon.classList.contains('fa-linkedin')) return 'LinkedIn';
        if (icon.classList.contains('fa-twitter')) return 'Twitter';
        if (icon.classList.contains('fa-facebook')) return 'Facebook';
        if (icon.classList.contains('fa-instagram')) return 'Instagram';
        if (icon.classList.contains('fa-envelope')) return 'البريد الإلكتروني';
        return 'وسائل التواصل الاجتماعي';
    }

    trackSocialClick(memberName, platform) {
        // Analytics tracking (would integrate with Google Analytics, etc.)
        console.log(`Social click tracked: ${memberName} - ${platform}`);
        
        // Store in localStorage for demo purposes
        const socialClicks = JSON.parse(localStorage.getItem('socialClicks')) || [];
        socialClicks.push({
            member: memberName,
            platform: platform,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem('socialClicks', JSON.stringify(socialClicks));
    }

    showNotification(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `about-notification ${type}`;
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
            z-index: 10000;
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
        
        closeButton.addEventListener('mouseenter', () => {
            closeButton.style.opacity = '1';
            closeButton.style.background = 'rgba(255,255,255,0.2)';
        });
        
        closeButton.addEventListener('mouseleave', () => {
            closeButton.style.opacity = '0.8';
            closeButton.style.background = 'none';
        });
        
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

    // Method to add dynamic content loading
    loadTeamDetails() {
        // This could load additional team member details from an API
        const teamMembers = [
            {
                name: 'يوسف محمود',
                role: 'المؤسس والرئيس التنفيذي',
                bio: 'مهندس برمجيات مع خبرة واسعة في التجارة الإلكترونية والتكنولوجيا',
                achievements: ['10+ سنوات خبرة', 'خريج هندسة حاسوب', 'خبير في التجارة الإلكترونية']
            },
            {
                name: 'سارة أحمد',
                role: 'مديرة خدمة العملاء',
                bio: 'متخصصة في إدارة علاقات العملاء وضمان رضاهم',
                achievements: ['7+ سنوات في خدمة العملاء', 'شهادة في إدارة الأعمال', 'خبيرة في حل المشاكل']
            }
            // يمكن إضافة المزيد من التفاصيل
        ];

        return teamMembers;
    }

    // Method to handle dynamic statistics updates
    updateStatistics() {
        // This could fetch real-time statistics from an API
        const stats = {
            customers: Math.floor(Math.random() * 1000) + 10000,
            products: Math.floor(Math.random() * 100) + 50000,
            available: Math.floor(Math.random() * 50) + 500,
            satisfaction: 99
        };

        return stats;
    }
}

// Initialize about page manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.aboutPageManager = new AboutPageManager();
});

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (!document.hidden && window.aboutPageManager) {
        // Refresh cart count when page becomes visible
        window.aboutPageManager.updateCartCount();
    }
});
