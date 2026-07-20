# Omar El Haj Ahmed Logistics

موقع شركة لوجستية مبني بـ `React + Vite` مع:

- موقع كامل متعدد الصفحات
- لوحة تحكم لإدارة المحتوى
- رفع صور إلى `Cloudinary`
- API محلية بـ `Express`
- حفظ البيانات في `MongoDB`

## التشغيل المحلي

1. تثبيت الحزم:

```bash
npm install
```

2. إنشاء ملف `.env` اعتمادًا على `.env.example`

3. تشغيل سيرفر الـ API:

```bash
npm run server
```

4. تشغيل الواجهة:

```bash
npm run dev
```

## بناء نسخة الإنتاج

```bash
npm run build
```

## متغيرات البيئة

الملف `.env.example` يحتوي على الإعدادات المطلوبة:

```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_unsigned_upload_preset
VITE_API_BASE_URL=http://localhost:5000
MONGODB_URI=mongodb://127.0.0.1:27017
MONGODB_DB_NAME=omar_logistics
```

## بيانات دخول لوحة التحكم

- Username: `admin`
- Password: `Omar@2026`

## ملاحظات مهمة

- رفع الصور من لوحة التحكم يدعم `Cloudinary`
- بيانات الموقع تُحفظ في `MongoDB`
- عند عدم توفر الـ API أو قاعدة البيانات، يستخدم المشروع `localStorage` كنسخة احتياطية
- الشعار الافتراضي موجود داخل `public/logo.jpeg`

## جاهزية GitHub

المشروع أصبح مجهزًا للرفع على GitHub مع:

- `.gitignore`
- `.env.example`
- استبعاد `node_modules` و`dist` وملفات البيئة المحلية
