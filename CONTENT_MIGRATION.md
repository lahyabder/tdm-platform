# دليل هجرة المحتوى | Guide de Migration de Contenu

هذا المستند يشرح كيفية تحديث نصوص الموقع التجريبي بنصوص موقع TDM الرسمي.
Ce document explique comment mettre à jour les textes de la démo avec les contenus officiels de la TDM.

## 1. الهيكل التنظيمي (JSON Content)
توجد جميع نصوص الصفحات العامة في المجلد التالي:
Tous les textes des pages publiques se trouvent dans :
`src/content/[ar|fr]/`

### الملفات والمواقع | Fichiers et Emplacements :

| الصفحة | Page | الملف | Fichier |
| :--- | :--- | :--- | :--- |
| الرئيسية | Accueil | `home.json` | البطل، الإحصائيات، الخدمات المصغرة |
| من نحن | À Propos | `about.json` | المهام، الأهداف، الهيكل التنظيمي |
| الخدمات | Services | `services/*.json` | تفاصيل كل خدمة (TV, Radio...) |
| البيانات | Data | `data.json` | نصوص بوابة البيانات المفتوحة |
| اتصل بنا | Contact | `contact.json` | معلومات العنوان والمكاتب الجهوية |

## 2. البيانات الديناميكية (Mock Data)
البيانات التي تظهر في الجداول ولوحة التحكم موجودة في:
Les données dynamiques (Tableaux, Admin) se trouvent dans :
`src/mock/`

- **المنشآت الإعلامية**: `src/mock/mediaFacilities.ts`
- **الصفقات وعروض السعر**: `src/mock/tenders.ts`
- **المشاريع الاستراتيجية**: `src/mock/projects.ts`
- **التشريعات**: `src/mock/legislation.ts`

## 3. كيفية التحديث | Comment mettre à jour
1. ابحث عن وسم `[TODO]` داخل ملفات JSON.
2. استبدل النص الموجود بنظيره من الموقع الرسمي.
3. لحفظ التغييرات في لوحة التحكم بشكل دائم، يفضل تحديث ملفات `initialFacilities` أو `initialLegislations` داخل ملفات الـ `store` في `src/store/`.

---
*ملاحظة: الموقع يدعم تنسيق Markdown في بعض الحقول لسهولة التنسيق.*
*Note: Le site supporte le format Markdown dans certains champs pour faciliter la mise en forme.*
