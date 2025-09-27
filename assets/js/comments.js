/**
 * ===== دليل التعليقات والصيانة لملفات JavaScript =====
 * 
 * هذا الملف يحتوي على شرح مفصل لجميع ملفات JavaScript
 * وكيفية صيانتها وتطويرها
 * 
 * @version 1.0
 * @author Cascade AI
 * @date 2024-09-26
 */

/* 
=============================================================================
📁 ملف theme-toggle.js - إدارة تبديل المظهر البسيط
=============================================================================

الغرض: إدارة تبديل المظهر بطريقة بسيطة وموثوقة
الوظائف الرئيسية:
- initThemeToggle(): تهيئة وظيفة تبديل المظهر
- toggleTheme(): تبديل المظهر الحالي
- updateThemeButton(): تحديث أيقونات الأزرار
- showThemeNotification(): عرض إشعار التأكيد
- detectSystemTheme(): كشف تفضيلات النظام

المتغيرات المهمة:
- currentTheme: المظهر الحالي
- localStorage.getItem('theme'): المظهر المحفوظ

نصائح الصيانة:
- لا تغير أسماء الفئات (.navbar-theme-toggle)
- تأكد من تحميل الملف قبل DOM
- اختبر على متصفحات مختلفة

مثال على إضافة وظيفة:
function newThemeFunction() {
    // شرح الوظيفة
    const element = document.querySelector('.selector');
    if (element) {
        // الكود هنا
    }
}
*/

/* 
=============================================================================
📁 ملف theme-manager.js - إدارة المظاهر المتقدمة
=============================================================================

الغرض: إدارة متقدمة للمظاهر مع إحصائيات وتتبع
الكلاسات الرئيسية:
- ThemeManager: الكلاس الرئيسي لإدارة المظاهر

الوظائف الرئيسية:
- constructor(): إنشاء مدير المظاهر
- init(): تهيئة النظام
- toggleTheme(): تبديل المظهر
- trackThemeUsage(): تتبع الاستخدام
- createNotification(): إنشاء الإشعارات

المتغيرات المهمة:
- this.storageKey: مفتاح التخزين
- this.currentTheme: المظهر الحالي
- this.themeStats: إحصائيات الاستخدام

نصائح الصيانة:
- لا تغير this.storageKey
- احرص على معالجة الأخطاء
- اختبر localStorage

مثال على إضافة وظيفة:
newFeature() {
    try {
        // الكود هنا
        console.log('Feature executed successfully');
    } catch (error) {
        console.error('Error in newFeature:', error);
    }
}
*/

/* 
=============================================================================
📁 ملف mobile-menu.js - إدارة القائمة المحمولة
=============================================================================

الغرض: إدارة القائمة المحمولة والتفاعلات
الكلاسات الرئيسية:
- MobileMenuManager: إدارة القائمة المحمولة
- SearchManager: إدارة البحث
- CartIconManager: إدارة أيقونة السلة
- SmoothScrollManager: إدارة التمرير السلس

الوظائف الرئيسية:
- toggleMenu(): فتح/إغلاق القائمة
- performSearch(): تنفيذ البحث
- updateCartCount(): تحديث عداد السلة

المتغيرات المهمة:
- this.isMenuOpen: حالة القائمة
- this.searchResults: نتائج البحث
- this.cartCount: عدد المنتجات في السلة

نصائح الصيانة:
- اختبر على الهواتف المختلفة
- تأكد من إغلاق القائمة عند تغيير الحجم
- فحص Event Listeners

مثال على إضافة مدير جديد:
class NewManager {
    constructor() {
        this.element = document.querySelector('.selector');
        this.init();
    }
    
    init() {
        if (this.element) {
            this.bindEvents();
        }
    }
    
    bindEvents() {
        this.element.addEventListener('click', () => {
            // الكود هنا
        });
    }
}
*/

/* 
=============================================================================
📁 ملف script.js - الوظائف الرئيسية
=============================================================================

الغرض: الوظائف الرئيسية للموقع
الوظائف الرئيسية:
- initializeComponents(): تهيئة جميع المكونات
- initializeScrollToTop(): تهيئة زر الصعود لأعلى
- initMobileMenu(): تهيئة القائمة المحمولة
- initSearch(): تهيئة البحث
- initCart(): تهيئة السلة
- initProductCards(): تهيئة بطاقات المنتجات
- initCountdown(): تهيئة العداد التنازلي
- initSmoothScrolling(): تهيئة التمرير السلس
- initAnimations(): تهيئة الأنيميشن
- initThemeSupport(): تهيئة دعم المظاهر

المتغيرات المهمة:
- cart: سلة المشتريات
- products: قائمة المنتجات
- currentUser: المستخدم الحالي

نصائح الصيانة:
- تأكد من تحميل DOM قبل التنفيذ
- معالجة الأخطاء في كل وظيفة
- اختبار على جميع الصفحات

مثال على إضافة وظيفة:
function initNewFeature() {
    try {
        const elements = document.querySelectorAll('.new-feature');
        elements.forEach(element => {
            // الكود هنا
        });
        console.log('New feature initialized');
    } catch (error) {
        console.error('Error initializing new feature:', error);
    }
}
*/

/* 
=============================================================================
📁 ملف products-data.js - بيانات المنتجات
=============================================================================

الغرض: تخزين بيانات المنتجات والفئات
المتغيرات الرئيسية:
- products: مصفوفة جميع المنتجات
- categories: مصفوفة الفئات
- brands: مصفوفة العلامات التجارية

هيكل المنتج:
{
    id: رقم فريد,
    name: اسم المنتج,
    price: السعر,
    oldPrice: السعر القديم,
    image: رابط الصورة,
    category: الفئة,
    brand: العلامة التجارية,
    rating: التقييم,
    reviews: عدد المراجعات,
    inStock: متوفر أم لا,
    description: الوصف,
    specifications: المواصفات
}

نصائح الصيانة:
- تأكد من صحة البيانات
- استخدم IDs فريدة
- اختبر الصور والروابط

مثال على إضافة منتج:
const newProduct = {
    id: 21,
    name: "منتج جديد",
    price: 1000,
    oldPrice: 1200,
    image: "path/to/image.jpg",
    category: "laptops",
    brand: "Dell",
    rating: 4.5,
    reviews: 10,
    inStock: true,
    description: "وصف المنتج",
    specifications: {
        processor: "Intel i7",
        ram: "16GB",
        storage: "512GB SSD"
    }
};
*/

/* 
=============================================================================
🔧 نصائح عامة للصيانة
=============================================================================

1. هيكل الكود:
   - استخدم التعليقات الوصفية
   - اتبع نمط التسمية المتسق
   - قسم الكود إلى وظائف صغيرة

2. معالجة الأخطاء:
   - استخدم try-catch للعمليات المعقدة
   - تحقق من وجود العناصر قبل استخدامها
   - اعرض رسائل خطأ مفيدة

3. الأداء:
   - تجنب Global Variables غير الضرورية
   - استخدم Event Delegation
   - قلل من DOM Queries

4. التوافق:
   - اختبر على متصفحات مختلفة
   - استخدم Polyfills عند الحاجة
   - تجنب الميزات التجريبية

5. الأمان:
   - نظف المدخلات من المستخدم
   - تجنب eval() و innerHTML مع بيانات المستخدم
   - تحقق من صحة البيانات
*/

/* 
=============================================================================
🚨 تحذيرات مهمة
=============================================================================

❌ لا تفعل:
- تغيير أسماء الفئات المستخدمة في CSS
- حذف Event Listeners بدون إضافة بدائل
- استخدام Global Variables بلا داعي
- تجاهل معالجة الأخطاء

✅ افعل:
- اختبر الكود على أجهزة مختلفة
- استخدم console.log للتتبع
- احتفظ بنسخة احتياطية
- اتبع نمط التعليقات

🔍 عند المشاكل:
1. فحص Console للأخطاء
2. التأكد من تحميل الملفات
3. فحص Event Listeners
4. اختبار في متصفح آخر
5. التحقق من localStorage

📊 أدوات التتبع:
- console.log() للتتبع العام
- console.error() للأخطاء
- console.warn() للتحذيرات
- console.table() لعرض البيانات
*/

/* 
=============================================================================
🔄 إضافة ميزات جديدة
=============================================================================

خطوات إضافة ميزة جديدة:

1. التخطيط:
   - حدد الغرض من الميزة
   - اكتب الخطوات المطلوبة
   - حدد الملفات المتأثرة

2. الكتابة:
   - اكتب الكود مع التعليقات
   - اختبر كل جزء على حدة
   - تأكد من معالجة الأخطاء

3. التكامل:
   - أضف الميزة للملف المناسب
   - حدث الملفات المرتبطة
   - اختبر التكامل الكامل

4. الاختبار:
   - اختبر على متصفحات مختلفة
   - اختبر على أحجام شاشات مختلفة
   - اختبر حالات الخطأ

5. التوثيق:
   - أضف التعليقات المناسبة
   - حدث ملف DOCUMENTATION.md
   - اكتب مثال على الاستخدام

مثال كامل:
/**
 * ميزة جديدة لتحسين تجربة المستخدم
 * @param {string} selector - محدد العنصر
 * @param {Object} options - خيارات الميزة
 * @returns {boolean} - نجح التنفيذ أم لا
 */
function newFeature(selector, options = {}) {
    try {
        // 1. التحقق من المدخلات
        if (!selector) {
            console.warn('Selector is required for newFeature');
            return false;
        }
        
        // 2. البحث عن العنصر
        const element = document.querySelector(selector);
        if (!element) {
            console.warn(`Element not found: ${selector}`);
            return false;
        }
        
        // 3. تطبيق الميزة
        const defaultOptions = {
            animation: true,
            duration: 300
        };
        const config = { ...defaultOptions, ...options };
        
        // 4. تنفيذ الكود
        element.style.transition = `all ${config.duration}ms ease`;
        
        // 5. إضافة Event Listeners
        element.addEventListener('click', function() {
            console.log('New feature activated');
        });
        
        console.log(`New feature applied to ${selector}`);
        return true;
        
    } catch (error) {
        console.error('Error in newFeature:', error);
        return false;
    }
}

// الاستخدام:
// newFeature('.my-element', { duration: 500 });
*/
