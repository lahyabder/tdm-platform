'use client';

import { use } from 'react';
import Link from 'next/link';

export default function AdminPagesListPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params) as any;
    const isAr = locale === 'ar';

    const pages = [
        { id: 'about', title: { ar: "عن المؤسسة", fr: "À propos" }, description: { ar: "تعديل كلمة المدير العام وأقسام التعريف بالمؤسسة", fr: "Éditer le mot du DG et les sections de présentation" } },
        { id: 'legal', title: { ar: "المرجعيات التشريعية", fr: "Législation" }, description: { ar: "إدارة النصوص القانونية والمراسيم", fr: "Gérer les textes légaux et décrets" } },
    ];

    const t = {
        ar: { title: "إدارة محتوى الصفحات", subtitle: "اختر الصفحة التي ترغب في تعديل محتواها" },
        fr: { title: "Gestion du contenu des pages", subtitle: "Choisissez la page à modifier" }
    }[locale as 'ar' | 'fr'];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-extrabold text-slate-800">{t.title}</h1>
                <p className="text-slate-500 mt-1">{t.subtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pages.map((page) => (
                    <Link
                        key={page.id}
                        href={`/${locale}/admin/pages/${page.id}`}
                        className="group bg-white p-6 rounded-sm border border-slate-200 shadow-sm hover:border-brand-green/50 hover:shadow-md transition-all"
                    >
                        <div className="flex items-start justify-between">
                            <div className="space-y-2">
                                <h2 className="text-lg font-black text-slate-800 group-hover:text-brand-green transition-colors">
                                    {isAr ? page.title.ar : page.title.fr}
                                </h2>
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    {isAr ? page.description.ar : page.description.fr}
                                </p>
                            </div>
                            <div className="p-2 bg-slate-50 rounded-sm group-hover:bg-brand-green/10 group-hover:text-brand-green text-slate-400 transition-colors">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
