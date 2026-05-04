# TDM Digital Platform | منصة البث الإذاعي والتلفزي الموريتاني الرقمية

![TDM Platform](public/logo.png)

## 🌐 Overview | نظرة عامة | Aperçu
Professional digital platform for **Télédiffusion de Mauritanie (TDM)**. This platform manages technical services, national news, and infrastructure sharing through an integrated administrative dashboard.

منصة رقمية احترافية لـ **شركة البث الإذاعي والتلفزي الموريتاني (TDM)**. تهدف المنصة إلى إدارة الخدمات التقنية، الأخبار الوطنية، والتجميع المشترك للبنية التحتية عبر لوحة تحكم إدارية متكاملة.

Plateforme numérique professionnelle pour la **Télédiffusion de Mauritanie (TDM)**. Elle gère les services techniques, les actualités nationales et la colocalisation d'infrastructure via un tableau de bord intégré.

---

## 🚀 Tech Stack | التقنيات المستخدمة | Technologies
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Database & Auth:** Supabase
- **State Management:** Zustand
- **Icons:** Lucide React

---

## 🛠 Installation | التثبيت | Installation

```bash
# Clone the repository | استنساخ المشروع
git clone https://github.com/lahyabder/tdm-platform.git

# Install dependencies | تثبيت المكتبات
npm install

# Run development server | تشغيل بيئة التطوير
npm run dev
```

---

## 🔑 Environment Variables | متغيرات البيئة | Variables d'environnement
Create a `.env.local` file in the root directory:
أنشئ ملف `.env.local` في المجلد الرئيسي:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 🖥 Admin Panel | لوحة التحكم | Panneau d'administration
The admin panel is accessible at `/admin`. It allows full control over:
يمكن الوصول للوحة التحكم عبر `/admin`. تتيح الإدارة الكاملة لـ:
Le panneau d'administration est accessible via `/admin`. Il permet de gérer :

1. **News Management:** Add, edit, and delete news migrated from the old site.
   (إدارة الأخبار: إضافة وتعديل وحذف الأخبار المنقولة من الموقع القديم)
2. **Services Editor:** Manage technical services like DTT, OTT, and Colocation.
   (إدارة الخدمات: التحكم في خدمات البث الأرضي والرقمي والتجميع المشترك)
3. **Page Content:** Update text and images across all site pages.
   (محتوى الصفحات: تحديث النصوص والصور في كافة صفحات الموقع)

---

## 📂 Reference Backups | النسخة المرجعية | Sauvegardes de référence
A stable reference version is stored in the `reference_backups` directory. It contains:
توجد نسخة مرجعية مستقرة في مجلد `reference_backups` تحتوي على:
Une version de référence stable est stockée dans le dossier `reference_backups` :

- `pages_backup.json`: Snapshot of all page contents.
- `news_backup.json`: All migrated news articles.

---

## 📜 License | الترخيص | Licence
Internal project for **Télédiffusion de Mauritanie (TDM)**.
مشروع داخلي خاص بـ **شركة البث الإذاعي والتلفزي الموريتاني**.

---

## ✉️ Support | الدعم | Support
For technical inquiries, please contact the developer.
للاستفسارات التقنية، يرجى التواصل مع المطور.
Pour toute question technique, veuillez contacter le développeur.

---
*Created with ❤️ for TDM Mauritanie - 2026*
