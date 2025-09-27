# 🔧 دليل الصيانة الشامل - موقع Y0 Hardware

## 📋 فهرس المحتويات
1. [نظرة عامة](#نظرة-عامة)
2. [الفحص اليومي](#الفحص-اليومي)
3. [الفحص الأسبوعي](#الفحص-الأسبوعي)
4. [الفحص الشهري](#الفحص-الشهري)
5. [حل المشاكل الشائعة](#حل-المشاكل-الشائعة)
6. [تحديث الملفات](#تحديث-الملفات)
7. [النسخ الاحتياطية](#النسخ-الاحتياطية)
8. [مراقبة الأداء](#مراقبة-الأداء)

---

## 🎯 نظرة عامة

### الملفات الحيوية (لا تحذف أبداً):
```
✅ index.html              - الصفحة الرئيسية
✅ assets/css/style.css    - الأنماط الأساسية
✅ assets/js/theme-toggle.js - تبديل المظهر
✅ assets/js/script.js     - الوظائف الرئيسية
```

### ترتيب الأولوية في الصيانة:
1. **أولوية عالية:** ملفات HTML الرئيسية
2. **أولوية متوسطة:** ملفات CSS والـ JavaScript
3. **أولوية منخفضة:** ملفات التوثيق والاختبار

---

## 📅 الفحص اليومي (5 دقائق)

### ✅ قائمة المراجعة اليومية:
- [ ] فتح الموقع والتأكد من التحميل السليم
- [ ] اختبار زر Dark Mode في الـ navbar
- [ ] فحص الروابط الرئيسية (الرئيسية، المتجر، من نحن، تواصل معنا)
- [ ] اختبار البحث في الـ header
- [ ] فحص القائمة المحمولة على الهاتف

### 🔍 علامات المشاكل:
- ❌ الموقع لا يحمل أو يحمل ببطء
- ❌ زر Dark Mode لا يعمل
- ❌ النصوص غير واضحة أو مختفية
- ❌ الروابط مكسورة (404)
- ❌ القائمة المحمولة لا تفتح

### 🚨 إجراءات الطوارئ:
```bash
# إذا كان الموقع لا يعمل:
1. تحقق من ملف index.html
2. تحقق من ملف style.css
3. تحقق من ملف theme-toggle.js
4. استعد النسخة الاحتياطية إذا لزم الأمر
```

---

## 📊 الفحص الأسبوعي (15 دقيقة)

### ✅ قائمة المراجعة الأسبوعية:
- [ ] اختبار جميع الصفحات (8 صفحات)
- [ ] فحص التصميم المتجاوب على أحجام مختلفة
- [ ] اختبار المظهرين (فاتح وداكن) على جميع الصفحات
- [ ] فحص سرعة التحميل
- [ ] اختبار على متصفحات مختلفة (Chrome, Firefox, Safari, Edge)
- [ ] فحص console للأخطاء JavaScript
- [ ] اختبار النماذج والأزرار التفاعلية

### 📱 اختبار التوافق:
```
Desktop (1920px+):  ✅ Chrome  ✅ Firefox  ✅ Safari  ✅ Edge
Laptop (1366px+):   ✅ Chrome  ✅ Firefox  ✅ Safari  ✅ Edge
Tablet (768px+):    ✅ Chrome  ✅ Firefox  ✅ Safari  ✅ Edge
Mobile (320px+):    ✅ Chrome  ✅ Firefox  ✅ Safari  ✅ Edge
```

### 🔧 أدوات الفحص:
- **Developer Tools:** F12 في المتصفح
- **Responsive Design Mode:** Ctrl+Shift+M
- **Console:** للتحقق من الأخطاء
- **Network Tab:** لفحص سرعة التحميل

---

## 🗓️ الفحص الشهري (30 دقيقة)

### ✅ قائمة المراجعة الشهرية:
- [ ] مراجعة شاملة لجميع الملفات
- [ ] تحديث التعليقات في الكود
- [ ] فحص الأمان والثغرات
- [ ] تحسين الأداء
- [ ] تنظيف الملفات غير المستخدمة
- [ ] تحديث التوثيق
- [ ] إنشاء نسخة احتياطية كاملة

### 📈 تحليل الأداء:
```javascript
// قياس سرعة التحميل
console.time('Page Load');
window.addEventListener('load', () => {
    console.timeEnd('Page Load');
});

// قياس استخدام الذاكرة
console.log('Memory Usage:', performance.memory);
```

### 🧹 تنظيف الملفات:
```bash
# الملفات التي يمكن حذفها بأمان:
- ملفات .tmp
- ملفات النسخ الاحتياطية القديمة
- ملفات الاختبار المؤقتة
- صور غير مستخدمة

# الملفات التي لا يجب حذفها أبداً:
- جميع ملفات HTML
- جميع ملفات CSS في assets/css/
- جميع ملفات JS في assets/js/
- ملفات التوثيق (.md)
```

---

## 🚨 حل المشاكل الشائعة

### مشكلة: زر Dark Mode لا يعمل
```javascript
// الحل:
1. تحقق من تحميل theme-toggle.js
2. تحقق من وجود الزر في HTML:
   <button class="navbar-theme-toggle" id="navbarThemeToggle">
3. تحقق من console للأخطاء
4. تحقق من localStorage:
   localStorage.getItem('theme')
```

### مشكلة: النصوص غير واضحة
```css
/* الحل: */
1. تحقق من ترتيب تحميل CSS
2. تحقق من final-fix.css
3. أضف !important إذا لزم الأمر:
   .element { color: var(--text-primary) !important; }
```

### مشكلة: التصميم مكسور على الهاتف
```css
/* الحل: */
1. تحقق من viewport meta tag:
   <meta name="viewport" content="width=device-width, initial-scale=1.0">
2. تحقق من media queries في fixes.css
3. اختبر mobile-menu.js
```

### مشكلة: الموقع بطيء
```javascript
// الحل:
1. ضغط الصور
2. تقليل ملفات CSS/JS
3. استخدام CDN للمكتبات
4. تحسين الكود:
   // بدلاً من:
   document.querySelectorAll('.element').forEach(...)
   // استخدم:
   const elements = document.querySelectorAll('.element');
   if (elements.length > 0) { ... }
```

---

## 🔄 تحديث الملفات

### تحديث CSS:
```css
/* خطوات آمنة للتحديث: */
1. انسخ الملف الأصلي كنسخة احتياطية
2. اختبر التغيير على صفحة واحدة أولاً
3. تحقق من كلا المظهرين
4. اختبر على أحجام شاشات مختلفة
5. طبق على باقي الصفحات

/* مثال على التحديث الآمن: */
/* الكود القديم (احتفظ به كتعليق):
.old-style { color: #333; }
*/

/* الكود الجديد: */
.new-style { 
    color: var(--text-primary);
    transition: color 0.3s ease;
}
```

### تحديث JavaScript:
```javascript
// خطوات آمنة للتحديث:
1. انسخ الملف الأصلي كنسخة احتياطية
2. أضف console.log للتتبع
3. اختبر الوظيفة الجديدة منفصلة
4. تحقق من عدم كسر الوظائف الموجودة
5. اختبر على متصفحات مختلفة

// مثال على التحديث الآمن:
function updateFunction() {
    try {
        console.log('Starting updateFunction');
        
        // الكود الجديد هنا
        
        console.log('updateFunction completed successfully');
        return true;
    } catch (error) {
        console.error('Error in updateFunction:', error);
        return false;
    }
}
```

---

## 💾 النسخ الاحتياطية

### جدول النسخ الاحتياطية:
- **يومياً:** نسخ الملفات المحدثة
- **أسبوعياً:** نسخة كاملة من المشروع
- **شهرياً:** نسخة مؤرشفة مع التاريخ

### هيكل النسخ الاحتياطية:
```
Backups/
├── Daily/
│   ├── 2024-09-26/
│   ├── 2024-09-25/
│   └── ...
├── Weekly/
│   ├── Week-39-2024/
│   ├── Week-38-2024/
│   └── ...
└── Monthly/
    ├── September-2024/
    ├── August-2024/
    └── ...
```

### الملفات الأساسية للنسخ الاحتياطي:
```bash
# الملفات الحيوية:
index.html
shop.html
product.html
cart.html
checkout.html
about.html
contact.html
test.html

# مجلد CSS كامل:
assets/css/

# مجلد JavaScript كامل:
assets/js/

# ملفات التوثيق:
README.md
DOCUMENTATION.md
MAINTENANCE.md
```

---

## 📊 مراقبة الأداء

### مؤشرات الأداء المهمة:
```javascript
// 1. سرعة التحميل
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime}ms`);
    
    // يجب أن يكون أقل من 3 ثوانٍ
    if (loadTime > 3000) {
        console.warn('Page load time is too slow');
    }
});

// 2. استخدام الذاكرة
if (performance.memory) {
    const memory = performance.memory;
    console.log('Memory usage:', {
        used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
        total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
        limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB'
    });
}

// 3. أخطاء JavaScript
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', {
        message: e.message,
        source: e.filename,
        line: e.lineno,
        column: e.colno
    });
});
```

### تحسين الأداء:
```css
/* تحسين CSS: */
1. استخدم CSS Variables
2. قلل من استخدام !important
3. استخدم efficient selectors
4. ضغط الملفات

/* مثال على تحسين: */
/* بطيء: */
div > ul > li > a:hover { ... }

/* سريع: */
.nav-link:hover { ... }
```

---

## 📞 جهات الاتصال للدعم

### للمساعدة التقنية:
- **المطور الأساسي:** Cascade AI
- **التوثيق:** DOCUMENTATION.md
- **المشاكل الشائعة:** هذا الملف (MAINTENANCE.md)

### للطوارئ:
1. استعادة النسخة الاحتياطية الأخيرة
2. التحقق من ملف DOCUMENTATION.md
3. فحص console للأخطاء
4. اختبار على متصفح آخر

---

## ✅ قائمة مراجعة سريعة

### قبل أي تعديل:
- [ ] إنشاء نسخة احتياطية
- [ ] قراءة التوثيق المرتبط
- [ ] فهم تأثير التغيير
- [ ] تحضير خطة الاستعادة

### بعد أي تعديل:
- [ ] اختبار التغيير
- [ ] فحص console للأخطاء
- [ ] اختبار على متصفحات مختلفة
- [ ] اختبار التصميم المتجاوب
- [ ] تحديث التوثيق إذا لزم الأمر

---

**📝 ملاحظة مهمة:**
هذا الدليل يجب أن يُحدث مع كل تغيير كبير في المشروع. احتفظ به محدثاً ليكون مرجعاً موثوقاً للصيانة.

**آخر تحديث:** 26 سبتمبر 2024  
**الإصدار:** 1.0  
**المطور:** Cascade AI
