# 📚 دليل الصيانة والتطوير - موقع Y0 Hardware

## 🏗️ هيكل المشروع

```
Y0 Hardware/
├── 📄 HTML Files (8 ملفات)
│   ├── index.html          # الصفحة الرئيسية
│   ├── shop.html           # صفحة المتجر
│   ├── product.html        # تفاصيل المنتج
│   ├── cart.html           # سلة المشتريات
│   ├── checkout.html       # إتمام الشراء
│   ├── about.html          # من نحن
│   ├── contact.html        # تواصل معنا
│   └── test.html           # صفحة الاختبار
│
├── 🎨 CSS Files (8 ملفات)
│   ├── style.css           # الأنماط الأساسية
│   ├── typography-enhanced.css  # تحسينات الخطوط
│   ├── fixes.css           # إصلاحات التخطيط
│   ├── color-fixes.css     # إصلاحات الألوان
│   ├── final-fix.css       # الإصلاحات النهائية
│   ├── dark-mode.css       # المظهر الداكن
│   ├── shop.css            # أنماط صفحة المتجر
│   └── [page].css          # أنماط الصفحات المتخصصة
│
├── ⚙️ JavaScript Files (7 ملفات)
│   ├── theme-toggle.js     # إدارة تبديل المظهر (بسيط)
│   ├── theme-manager.js    # إدارة المظاهر (متقدم)
│   ├── mobile-menu.js      # القائمة المحمولة والتفاعلات
│   ├── script.js           # الوظائف الرئيسية
│   ├── products-data.js    # بيانات المنتجات
│   ├── shop.js             # وظائف صفحة المتجر
│   └── [page].js           # وظائف الصفحات المتخصصة
│
└── 📁 assets/
    ├── css/                # ملفات الأنماط
    ├── js/                 # ملفات JavaScript
    └── images/             # الصور والأيقونات
```

## 🎯 ترتيب تحميل CSS (مهم جداً!)

```html
<!-- ترتيب التحميل الصحيح -->
<link rel="stylesheet" href="assets/css/style.css">                    <!-- 1. الأساسيات -->
<link rel="stylesheet" href="assets/css/typography-enhanced.css">      <!-- 2. الخطوط -->
<link rel="stylesheet" href="assets/css/fixes.css">                    <!-- 3. إصلاحات التخطيط -->
<link rel="stylesheet" href="assets/css/color-fixes.css">              <!-- 4. إصلاحات الألوان -->
<link rel="stylesheet" href="assets/css/[page].css">                   <!-- 5. أنماط الصفحة -->
<link rel="stylesheet" href="assets/css/dark-mode.css">                <!-- 6. المظهر الداكن -->
<link rel="stylesheet" href="assets/css/final-fix.css">                <!-- 7. الإصلاحات النهائية -->
```

## ⚙️ ترتيب تحميل JavaScript

```html
<!-- ترتيب التحميل الصحيح -->
<script src="assets/js/theme-toggle.js"></script>      <!-- 1. تبديل المظهر (أولوية) -->
<script src="assets/js/theme-manager.js"></script>     <!-- 2. إدارة المظاهر -->
<script src="assets/js/mobile-menu.js"></script>       <!-- 3. القائمة المحمولة -->
<script src="assets/js/script.js"></script>            <!-- 4. الوظائف الرئيسية -->
<script src="assets/js/[page].js"></script>            <!-- 5. وظائف الصفحة -->
```

## 🎨 نظام الألوان والمتغيرات

### متغيرات CSS الأساسية:
```css
:root {
    /* الألوان الأساسية */
    --primary-color: #667eea;      /* اللون الأساسي */
    --secondary-color: #764ba2;    /* اللون الثانوي */
    --accent-color: #2ed573;       /* لون التمييز */
    
    /* ألوان الخلفيات */
    --bg-primary: #ffffff;         /* خلفية أساسية */
    --bg-secondary: #f8f9fa;       /* خلفية ثانوية */
    --bg-card: #ffffff;            /* خلفية البطاقات */
    
    /* ألوان النصوص */
    --text-primary: #333333;       /* نص أساسي */
    --text-secondary: #666666;     /* نص ثانوي */
    --text-muted: #999999;         /* نص مكتوم */
}
```

### نظام المظهر الداكن:
```css
[data-theme="dark"] {
    --bg-primary: #1a1a1a;
    --bg-secondary: #2d2d2d;
    --text-primary: #ffffff;
    --text-secondary: #cccccc;
}
```

## 🔧 دليل الصيانة

### إضافة صفحة جديدة:
1. **إنشاء ملف HTML:**
   ```html
   <!DOCTYPE html>
   <html lang="ar" dir="rtl">
   <head>
       <!-- نسخ الـ head من index.html -->
       <title>عنوان الصفحة - Y0 Hardware</title>
   </head>
   <body>
       <!-- نسخ الـ header من أي صفحة -->
       <!-- محتوى الصفحة -->
       <!-- نسخ الـ footer من أي صفحة -->
       <!-- نسخ الـ scripts من أي صفحة -->
   </body>
   </html>
   ```

2. **إنشاء ملف CSS (اختياري):**
   ```css
   /* أنماط خاصة بالصفحة الجديدة */
   .new-page-specific-styles {
       /* الأنماط هنا */
   }
   ```

3. **إضافة رابط في Navigation:**
   ```html
   <li><a href="new-page.html">الصفحة الجديدة</a></li>
   ```

### تعديل الألوان:
1. **تعديل المتغيرات في `style.css`**
2. **التأكد من التحديث في `dark-mode.css`**
3. **اختبار جميع الصفحات**

### إضافة وظيفة JavaScript جديدة:
1. **إضافة الوظيفة في الملف المناسب**
2. **إضافة تعليقات شاملة**
3. **اختبار على جميع المتصفحات**

## 🐛 حل المشاكل الشائعة

### مشكلة: زر Dark Mode لا يعمل
**الحل:**
1. التأكد من تحميل `theme-toggle.js` أولاً
2. فحص console للأخطاء
3. التأكد من وجود الزر في HTML: `.navbar-theme-toggle`

### مشكلة: ألوان النصوص غير واضحة
**الحل:**
1. التأكد من ترتيب CSS الصحيح
2. فحص `final-fix.css` للتأكد من `!important`
3. التأكد من تطبيق المتغيرات

### مشكلة: التصميم مكسور على الهاتف
**الحل:**
1. فحص `fixes.css` للـ media queries
2. اختبار `mobile-menu.js`
3. التأكد من viewport meta tag

## 📱 اختبار التوافق

### المتصفحات المدعومة:
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### الأجهزة المدعومة:
- ✅ Desktop (1920px+)
- ✅ Laptop (1366px+)
- ✅ Tablet (768px+)
- ✅ Mobile (320px+)

## 🚀 تحسينات الأداء

### CSS:
- استخدام CSS Variables للألوان
- تجميع الأنماط المتشابهة
- تقليل استخدام `!important`

### JavaScript:
- تحميل الملفات بالترتيب الصحيح
- استخدام Event Delegation
- تجنب Global Variables

### HTML:
- استخدام Semantic Elements
- تحسين SEO meta tags
- ضغط الصور

## 🔒 الأمان

### أفضل الممارسات:
- تنظيف المدخلات من المستخدم
- استخدام HTTPS
- تجنب inline scripts
- التحقق من صحة البيانات

## 📊 المراقبة والتحليل

### ملفات المراقبة:
- `theme-manager.js` - إحصائيات استخدام المظاهر
- `script.js` - تتبع التفاعلات
- Local Storage - حفظ التفضيلات

## 🔄 التحديثات المستقبلية

### خطة التطوير:
1. **المرحلة 1:** إضافة نظام دفع
2. **المرحلة 2:** تطبيق PWA
3. **المرحلة 3:** إضافة API backend
4. **المرحلة 4:** تحسينات AI

## 📞 الدعم الفني

### للمساعدة في:
- إضافة ميزات جديدة
- حل المشاكل التقنية
- تحسين الأداء
- تطوير وظائف متقدمة

---

**تم إنشاء هذا الدليل بواسطة Cascade AI**  
**آخر تحديث: 26 سبتمبر 2024**
