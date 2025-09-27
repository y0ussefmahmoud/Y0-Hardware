/**
 * ===== إدارة تبديل المظهر البسيط =====
 * 
 * هذا الملف مسؤول عن:
 * - تبديل المظهر بين الفاتح والداكن
 * - حفظ تفضيلات المستخدم في localStorage
 * - تحديث أيقونات الأزرار
 * - عرض الإشعارات
 * 
 * @version 1.0
 * @author Cascade AI
 * @date 2024-09-26
 */

/**
 * تهيئة وظيفة تبديل المظهر
 * - يقرأ المظهر المحفوظ من localStorage
 * - يطبق المظهر على الصفحة
 * - يضيف مستمعي الأحداث للأزرار
 */
function initThemeToggle() {
    // Get current theme from localStorage or default to light
    let currentTheme = localStorage.getItem('theme') || 'light';
    
    // Apply theme on page load
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update button icon based on current theme
    updateThemeButton();
    
    // Add event listener to navbar theme toggle button
    const navbarToggle = document.querySelector('.navbar-theme-toggle');
    if (navbarToggle) {
        navbarToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleTheme();
        });
    }
    
    // Add event listener to floating theme toggle button (if exists)
    const floatingToggle = document.querySelector('.theme-toggle');
    if (floatingToggle) {
        floatingToggle.addEventListener('click', function(e) {
            e.preventDefault();
            toggleTheme();
        });
    }
}

/**
 * تبديل المظهر بين الفاتح والداكن
 * - يغير المظهر الحالي
 * - يحفظ التفضيل الجديد
 * - يحدث أيقونات الأزرار
 * - يعرض إشعار التأكيد
 */
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    // Apply new theme
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Save to localStorage
    localStorage.setItem('theme', newTheme);
    
    // Update button icons
    updateThemeButton();
    
    // Add transition class for smooth change
    document.body.classList.add('theme-transitioning');
    setTimeout(() => {
        document.body.classList.remove('theme-transitioning');
    }, 300);
    
    // Show notification
    showThemeNotification(newTheme);
    
    console.log('Theme changed to:', newTheme);
}

// Update theme button icons
function updateThemeButton() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const navbarToggle = document.querySelector('.navbar-theme-toggle');
    const floatingToggle = document.querySelector('.theme-toggle');
    
    // Update navbar toggle button
    if (navbarToggle) {
        const sunIcon = navbarToggle.querySelector('.sun-icon');
        const moonIcon = navbarToggle.querySelector('.moon-icon');
        
        if (currentTheme === 'dark') {
            if (sunIcon) {
                sunIcon.style.opacity = '1';
                sunIcon.style.transform = 'rotate(0deg) scale(1)';
            }
            if (moonIcon) {
                moonIcon.style.opacity = '0';
                moonIcon.style.transform = 'rotate(-180deg) scale(0.5)';
            }
        } else {
            if (sunIcon) {
                sunIcon.style.opacity = '0';
                sunIcon.style.transform = 'rotate(180deg) scale(0.5)';
            }
            if (moonIcon) {
                moonIcon.style.opacity = '1';
                moonIcon.style.transform = 'rotate(0deg) scale(1)';
            }
        }
    }
    
    // Update floating toggle button
    if (floatingToggle) {
        const sunIcon = floatingToggle.querySelector('.sun-icon');
        const moonIcon = floatingToggle.querySelector('.moon-icon');
        
        if (currentTheme === 'dark') {
            if (sunIcon) {
                sunIcon.style.opacity = '1';
                sunIcon.style.transform = 'rotate(0deg) scale(1)';
            }
            if (moonIcon) {
                moonIcon.style.opacity = '0';
                moonIcon.style.transform = 'rotate(-180deg) scale(0.5)';
            }
        } else {
            if (sunIcon) {
                sunIcon.style.opacity = '0';
                sunIcon.style.transform = 'rotate(180deg) scale(0.5)';
            }
            if (moonIcon) {
                moonIcon.style.opacity = '1';
                moonIcon.style.transform = 'rotate(0deg) scale(1)';
            }
        }
    }
}

// Show theme change notification
function showThemeNotification(theme) {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.theme-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'theme-notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${theme === 'dark' ? '#2ed573' : '#667eea'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        font-weight: 600;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    const messages = {
        light: 'تم التبديل إلى المظهر الفاتح ☀️',
        dark: 'تم التبديل إلى المظهر الداكن 🌙'
    };
    
    notification.textContent = messages[theme];
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Animate out and remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 2000);
}

// Detect system theme preference
function detectSystemTheme() {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Set initial theme based on saved preference or system preference
    if (!localStorage.getItem('theme')) {
        const systemTheme = detectSystemTheme();
        localStorage.setItem('theme', systemTheme);
        document.documentElement.setAttribute('data-theme', systemTheme);
    }
    
    initThemeToggle();
});

// Initialize when page loads (fallback)
window.addEventListener('load', function() {
    initThemeToggle();
});

// Listen for system theme changes
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        // Only auto-switch if user hasn't manually set a preference
        if (!localStorage.getItem('theme-user-set')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeButton();
        }
    });
}

// Export functions for global access
window.toggleTheme = toggleTheme;
window.updateThemeButton = updateThemeButton;
