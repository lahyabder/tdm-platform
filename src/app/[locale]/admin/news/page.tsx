'use client';

import { useState, useEffect, use } from 'react';
import { useNewsStore } from '@/store/useNewsStore';
import Link from 'next/link';

export default function AdminNewsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params) as any;
    const { articles, deleteArticle } = useNewsStore();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const isAr = locale === 'ar';

    const t = {
        ar: {
            title: "إدارة الأخبار والمستجدات",
            add: "إضافة خبر جديد",
            search: "البحث في الأخبار...",
            table: { id: "ID", title: "العنوان", date: "التاريخ", tag: "التصنيف", actions: "العمليات" },
            actions: { edit: "تعديل", delete: "حذف" },
            confirmDelete: "هل أنت متأكد من حذف هذا الخبر؟",
        },
        fr: {
            title: "Gestion des Actualités",
            add: "Ajouter une actualité",
            search: "Rechercher...",
            table: { id: "ID", title: "Titre", date: "Date", tag: "Tag", actions: "Actions" },
            actions: { edit: "Modifier", delete: "Supprimer" },
            confirmDelete: "Êtes-vous sûr de vouloir supprimer cette actualité ?",
        }
    }[locale as 'ar' | 'fr'];

    const handleDelete = (id: number) => {
        if (window.confirm(t.confirmDelete)) {
            deleteArticle(id);
        }
    };

    if (!isClient) return null;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-800">{t.title}</h1>
                </div>
                <div className="flex gap-3">
                    <Link
                        href={`/${locale}/admin/news/new`}
                        className="px-4 py-2 bg-brand-green text-white font-bold rounded-sm hover:bg-brand-green/90 transition-colors flex items-center gap-2 text-sm shadow-sm"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        {t.add}
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-slate-600">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">{t.table.id}</th>
                                <th className="px-6 py-4">{t.table.title}</th>
                                <th className="px-6 py-4">{t.table.date}</th>
                                <th className="px-6 py-4">{t.table.tag}</th>
                                <th className="px-6 py-4 text-center">{t.table.actions}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {articles.map((a) => (
                                <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-mono text-xs">{a.id}</td>
                                    <td className="px-6 py-4 font-bold text-slate-800">
                                        <div className="flex items-center gap-3">
                                            <img src={a.imageUrl} className="w-10 h-10 rounded-sm object-cover" alt="" />
                                            <span className="line-clamp-1">{isAr ? a.title.ar : a.title.fr}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600">{isAr ? a.date.ar : a.date.fr}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[10px] font-bold text-slate-600 border border-slate-200">
                                            {isAr ? a.tag.ar : a.tag.fr}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-3">
                                            <Link
                                                href={`/${locale}/admin/news/${a.id}/edit`}
                                                className="text-brand-green hover:underline font-bold text-xs"
                                            >
                                                {t.actions.edit}
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(a.id)}
                                                className="text-brand-red hover:underline font-bold text-xs"
                                            >
                                                {t.actions.delete}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
