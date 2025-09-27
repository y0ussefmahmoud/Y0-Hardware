// ===== Theme Manager JavaScript =====

class ThemeManager {
    constructor() {
        this.currentTheme = 'light';
        this.storageKey = 'y0-hardware-theme';
        this.transitionDuration = 300;
        
        this.init();
    }

    init() {
        this.loadSavedTheme();
        this.createThemeToggle();
        this.bindEvents();
        this.detectSystemTheme();
    }

    // Load saved theme from localStorage
    loadSavedTheme() {
        const savedTheme = localStorage.getItem(this.storageKey);
        
        if (savedTheme) {
            this.currentTheme = savedTheme;
        } else {
            // Check system preference
            const systemTheme = this.getSystemTheme();
            this.currentTheme = systemTheme;
        }
        
        this.applyTheme(this.currentTheme);
    }

    // Get system theme preference
    getSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }

    // Detect system theme changes
    detectSystemTheme() {
        if (window.matchMedia) {
            const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
            
            mediaQuery.addEventListener('change', (e) => {
                // Only auto-switch if user hasn't manually set a preference
                if (!localStorage.getItem(this.storageKey)) {
                    const newTheme = e.matches ? 'dark' : 'light';
                }
            });
        }
    }

    // Initialize theme toggle button
    initThemeToggle() {
        // Create theme toggle button if it doesn't exist
        if (!document.querySelector('.theme-toggle')) {
            this.createThemeToggleButton();
        }
        
        // Add event listeners for both buttons
        const toggleButton = document.querySelector('.theme-toggle');
        const navbarToggleButton = document.querySelector('.navbar-theme-toggle');
        
        if (toggleButton) {
            toggleButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleTheme();
                this.addToggleAnimation();
            });
        }
        
        if (navbarToggleButton) {
            navbarToggleButton.addEventListener('click', (e) => {
                e.preventDefault();
                this.toggleTheme();
                this.updateNavbarToggleIcon();
            });
        }
        
        // Update toggle button attributes and content
        if (toggleButton) {
            toggleButton.setAttribute('aria-label', 'تبديل المظهر');
            toggleButton.setAttribute('title', 'تبديل بين المظهر الفاتح والداكن');
            
            toggleButton.innerHTML = `
                <span class="icon sun-icon">
                    <i class="fas fa-sun"></i>
                </span>
                <span class="icon moon-icon">
                    <i class="fas fa-moon"></i>
                </span>
            `;
        }
        
        // Update navbar toggle button attributes
        if (navbarToggleButton) {
            navbarToggleButton.setAttribute('aria-label', 'تبديل المظهر');
            navbarToggleButton.setAttribute('title', 'تبديل بين المظهر الفاتح والداكن');
            this.updateNavbarToggleIcon();
        }

        document.body.appendChild(toggleButton);
        
        return toggleButton;
    }

    // Bind events
    bindEvents() {
        // Theme toggle button click
        document.addEventListener('click', (e) => {
            if (e.target.closest('.theme-toggle')) {
                this.toggleTheme();
            }
        });

        // Keyboard shortcut (Ctrl/Cmd + Shift + D for Dark mode)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                this.toggleTheme();
            }
        });

        // Listen for storage changes (sync across tabs)
        window.addEventListener('storage', (e) => {
            if (e.key === this.storageKey && e.newValue !== this.currentTheme) {
                this.setTheme(e.newValue || 'light');
            }
        });
    }

    // Toggle between light and dark themes
    toggleTheme() {
        const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.setTheme(newTheme);
        
        // Add animation effect
        this.addToggleAnimation();
        
        // Show notification
        this.showThemeNotification(newTheme);
    }

    // Set specific theme
    setTheme(theme) {
        if (theme !== 'light' && theme !== 'dark') {
            theme = 'light';
        }

        this.currentTheme = theme;
        this.applyTheme(theme);
        this.saveTheme(theme);
        this.updateToggleButton();
        
        // Dispatch custom event
        this.dispatchThemeChangeEvent(theme);
    }

    // Apply theme to document
    applyTheme(theme) {
        const root = document.documentElement;
        
        // Add transition class for smooth change
        root.classList.add('theme-transitioning');
        
        // Set theme attribute
        root.setAttribute('data-theme', theme);
        
        // Update meta theme-color for mobile browsers
        this.updateMetaThemeColor(theme);
        
        // Remove transition class after animation
        setTimeout(() => {
            root.classList.remove('theme-transitioning');
        }, this.transitionDuration);
    }

    // Update meta theme-color
    updateMetaThemeColor(theme) {
        let metaThemeColor = document.querySelector('meta[name="theme-color"]');
        
        if (!metaThemeColor) {
            metaThemeColor = document.createElement('meta');
            metaThemeColor.name = 'theme-color';
            document.head.appendChild(metaThemeColor);
        }
        
        const colors = {
            light: '#667eea',
            dark: '#1a1a1a'
        };
        
        metaThemeColor.content = colors[theme];
    }

    // Save theme to localStorage
    saveTheme(theme) {
        localStorage.setItem(this.storageKey, theme);
    }

    // Update toggle button appearance
    updateToggleButton() {
        const toggleButton = document.querySelector('.theme-toggle');
        if (toggleButton) {
            const sunIcon = toggleButton.querySelector('.sun-icon');
            const moonIcon = toggleButton.querySelector('.moon-icon');
            
            if (this.currentTheme === 'dark') {
                toggleButton.setAttribute('title', 'تبديل إلى المظهر الفاتح');
                toggleButton.setAttribute('aria-label', 'تبديل إلى المظهر الفاتح');
            } else {
                toggleButton.setAttribute('title', 'تبديل إلى المظهر الداكن');
                toggleButton.setAttribute('aria-label', 'تبديل إلى المظهر الداكن');
            }
        }
    }

    // Enhanced toggle animation effect
    addToggleAnimation() {
        const toggleButton = document.querySelector('.theme-toggle');
        if (toggleButton) {
            // Add pulsing effect
            toggleButton.classList.add('pulsing');
            
            // Rotation animation
            toggleButton.style.transform = 'translateY(-50%) scale(1.2) rotate(360deg)';
            
            setTimeout(() => {
                toggleButton.style.transform = 'translateY(-50%) scale(1) rotate(0deg)';
                toggleButton.classList.remove('pulsing');
            }, 600);
            
            // Add ripple effect
            this.createRippleEffect(toggleButton);
        }
    }

    // Create ripple effect on toggle
    createRippleEffect(button) {
        const ripple = document.createElement('div');
        ripple.style.cssText = `
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
            top: 50%;
            left: 50%;
            width: 20px;
            height: 20px;
            margin-top: -10px;
            margin-left: -10px;
        `;
        
        button.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    // Update navbar toggle icon based on current theme
    updateNavbarToggleIcon() {
        const navbarToggleButton = document.querySelector('.navbar-theme-toggle');
        if (!navbarToggleButton) return;

        const currentTheme = document.documentElement.getAttribute('data-theme');
        const sunIcon = navbarToggleButton.querySelector('.sun-icon');
        const moonIcon = navbarToggleButton.querySelector('.moon-icon');

        if (currentTheme === 'dark') {
            if (sunIcon) sunIcon.style.opacity = '1';
            if (moonIcon) moonIcon.style.opacity = '0';
        } else {
            if (sunIcon) sunIcon.style.opacity = '0';
            if (moonIcon) moonIcon.style.opacity = '1';
        }
    }

    // Show theme change notification
    showThemeNotification(theme) {
        const messages = {
            light: 'تم التبديل إلى المظهر الفاتح ☀️',
            dark: 'تم التبديل إلى المظهر الداكن 🌙'
        };
        
        this.createNotification(messages[theme], 'success');
    }

    // Create notification
    createNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.theme-notification');
        existingNotifications.forEach(notification => notification.remove());
        
        const notification = document.createElement('div');
        notification.className = `theme-notification ${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${this.currentTheme === 'dark' ? '#2ed573' : '#667eea'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 10002;
            font-size: 14px;
            font-weight: 500;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;
        
        const content = notification.querySelector('.notification-content');
        content.style.cssText = `
            display: flex;
            align-items: center;
            gap: 8px;
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 2000);
    }

    // Dispatch theme change event
    dispatchThemeChangeEvent(theme) {
        const event = new CustomEvent('themeChanged', {
            detail: {
                theme: theme,
                timestamp: new Date().toISOString()
            }
        });
        
        document.dispatchEvent(event);
    }

    // Get current theme
    getCurrentTheme() {
        return this.currentTheme;
    }

    // Check if dark mode is active
    isDarkMode() {
        return this.currentTheme === 'dark';
    }

    // Auto theme based on time
    setAutoTheme() {
        const hour = new Date().getHours();
        const isNightTime = hour < 7 || hour > 19; // 7 PM to 7 AM
        
        const autoTheme = isNightTime ? 'dark' : 'light';
        this.setTheme(autoTheme);
        
        return autoTheme;
    }

    // Theme presets
    applyPreset(presetName) {
        const presets = {
            'auto': () => this.setAutoTheme(),
            'system': () => this.setTheme(this.getSystemTheme()),
            'light': () => this.setTheme('light'),
            'dark': () => this.setTheme('dark')
        };
        
        if (presets[presetName]) {
            presets[presetName]();
            return true;
        }
        
        return false;
    }

    // Advanced theme settings
    setCustomTheme(customColors) {
        const root = document.documentElement;
        
        Object.keys(customColors).forEach(property => {
            root.style.setProperty(`--${property}`, customColors[property]);
        });
    }

    // Reset to default theme
    resetTheme() {
        localStorage.removeItem(this.storageKey);
        const systemTheme = this.getSystemTheme();
        this.setTheme(systemTheme);
    }

    // Export theme settings
    exportThemeSettings() {
        return {
            currentTheme: this.currentTheme,
            timestamp: new Date().toISOString(),
            version: '1.0'
        };
    }

    // Import theme settings
    importThemeSettings(settings) {
        if (settings && settings.currentTheme) {
            this.setTheme(settings.currentTheme);
            return true;
        }
        return false;
    }

    // Analytics tracking
    trackThemeUsage() {
        const usage = JSON.parse(localStorage.getItem('theme-usage')) || {};
        const today = new Date().toDateString();
        
        if (!usage[today]) {
            usage[today] = {};
        }
        
        if (!usage[today][this.currentTheme]) {
            usage[today][this.currentTheme] = 0;
        }
        
        usage[today][this.currentTheme]++;
        
        localStorage.setItem('theme-usage', JSON.stringify(usage));
    }

    // Get theme statistics
    getThemeStats() {
        const usage = JSON.parse(localStorage.getItem('theme-usage')) || {};
        const stats = {
            totalDays: Object.keys(usage).length,
            lightModeUsage: 0,
            darkModeUsage: 0,
            mostUsedTheme: 'light'
        };
        
        Object.values(usage).forEach(dayUsage => {
            stats.lightModeUsage += dayUsage.light || 0;
            stats.darkModeUsage += dayUsage.dark || 0;
        });
        
        stats.mostUsedTheme = stats.darkModeUsage > stats.lightModeUsage ? 'dark' : 'light';
        
        return stats;
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
    
    // Additional initialization for navbar toggle
    setTimeout(() => {
        const navbarToggle = document.querySelector('.navbar-theme-toggle');
        if (navbarToggle && window.themeManager) {
            window.themeManager.updateNavbarToggleIcon();
        }
    }, 100);
});

// Also initialize when page loads (fallback)
window.addEventListener('load', () => {
    if (!window.themeManager) {
        window.themeManager = new ThemeManager();
    }
    
    // Ensure navbar toggle is working
    const navbarToggle = document.querySelector('.navbar-theme-toggle');
    if (navbarToggle && window.themeManager) {
        window.themeManager.updateNavbarToggleIcon();
        
        // Add click listener if not already added
        if (!navbarToggle.hasAttribute('data-listener-added')) {
            navbarToggle.addEventListener('click', (e) => {
                e.preventDefault();
                window.themeManager.toggleTheme();
                window.themeManager.updateNavbarToggleIcon();
            });
            navbarToggle.setAttribute('data-listener-added', 'true');
        }
    }
});

// Track theme usage
window.themeManager.trackThemeUsage();

// Listen for theme changes
document.addEventListener('themeChanged', (e) => {
    console.log('Theme changed to:', e.detail.theme);
    
    // Update any theme-dependent components
    if (window.cartManager) {
        window.cartManager.updateCartCount();
    }
    
    // Track theme change
    if (window.themeManager) {
        window.themeManager.trackThemeUsage();
    }
});

// Export for global access
window.ThemeManager = ThemeManager;
