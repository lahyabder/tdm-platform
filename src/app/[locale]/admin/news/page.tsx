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
    const { articles, deleteArticle, resetArticles, fetchArticles } = useNewsStore();
    const [isClient, setIsClient] = useState(false);

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        setIsClient(true);
        fetchArticles();
    }, [fetchArticles]);

    const isAr = locale === 'ar';

    const t = {
        ar: {
            title: "إدارة الأخبار والمستجدات",
            add: "إضافة خبر جديد",
            search: "البحث في الأخبار...",
            table: { id: "ID", title: "العنوان", date: "التاريخ", tag: "التصنيف", actions: "العمليات" },
            actions: { edit: "تعديل", delete: "حذف" },
            confirmDelete: "هل أنت متأكد من حذف هذا الخبر؟",
            noResults: "لم يتم العثور على نتائج للبحث",
            restore: "استعادة الافتراضي",
            confirmRestore: "هل تريد حقاً مسح جميع التغييرات واستعادة البيانات الأصلية؟",
        },
        fr: {
            title: "Gestion des Actualités",
            add: "Ajouter une actualité",
            search: "Rechercher...",
            table: { id: "ID", title: "Titre", date: "Date", tag: "Tag", actions: "Actions" },
            actions: { edit: "Modifier", delete: "Supprimer" },
            confirmDelete: "Êtes-vous sûr de vouloir supprimer cette actualité ?",
            noResults: "Aucun résultat trouvé",
            restore: "Restaurer défaut",
            confirmRestore: "Voulez-vous vraiment effacer tous les changements et restaurer les données originales ?",
        }
    }[locale as 'ar' | 'fr'];

    const handleDelete = (id: number) => {
        if (window.confirm(t.confirmDelete)) {
            deleteArticle(id);
        }
    };

    const handleRestore = () => {
        if (window.confirm(t.confirmRestore)) {
            resetArticles();
        }
    };

    const filteredArticles = articles.filter(a => {
        const title = isAr ? a.title.ar : a.title.fr;
        const tag = isAr ? a.tag.ar : a.tag.fr;
        return title.toLowerCase().includes(searchQuery.toLowerCase()) || 
               tag.toLowerCase().includes(searchQuery.toLowerCase());
    });

    if (!isClient) return null;

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-800 flex items-center gap-3">
                        <span className="w-2 h-8 bg-brand-green rounded-full"></span>
                        {t.title}
                    </h1>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder={t.search}
                            className="w-full sm:w-64 px-10 py-2 bg-white border border-slate-200 rounded-sm focus:outline-none focus:border-brand-green text-sm transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <svg className="absolute start-3 top-2.5 w-4 h-4 text-slate-400 rtl:start-auto rtl:end-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                    <button
                        onClick={handleRestore}
                        className="px-4 py-2 bg-slate-100 text-slate-600 font-bold rounded-sm hover:bg-slate-200 transition-all flex items-center justify-center gap-2 text-sm border border-slate-200"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                        {t.restore}
                    </button>
                    <Link
                        href={`/${locale}/admin/news/new`}
                        className="px-6 py-2 bg-brand-green text-white font-bold rounded-sm hover:bg-brand-green/90 transition-all flex items-center justify-center gap-2 text-sm shadow-md shadow-brand-green/10"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        {t.add}
                    </Link>
                </div>
            </div>

            <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-start rtl:text-end text-slate-600">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-black">{t.table.id}</th>
                                <th className="px-6 py-4 font-black">{t.table.title}</th>
                                <th className="px-6 py-4 font-black">{t.table.date}</th>
                                <th className="px-6 py-4 font-black">{t.table.tag}</th>
                                <th className="px-6 py-4 text-center font-black">{t.table.actions}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredArticles.length > 0 ? (
                                filteredArticles.map((a) => (
                                    <tr key={a.id} className="hover:bg-slate-50 transition-colors group">
                                        <td className="px-6 py-4 font-mono text-[10px] text-slate-400">#{a.id}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="relative w-12 h-12 flex-shrink-0">
                                                    <img src={a.imageUrl} className="w-full h-full rounded-sm object-cover border border-slate-100" alt="" />
                                                </div>
                                                <div>
                                                    <span className="font-bold text-slate-800 line-clamp-1 group-hover:text-brand-green transition-colors">{isAr ? a.title.ar : a.title.fr}</span>
                                                    <p className="text-[10px] text-slate-400 line-clamp-1 mt-0.5">{isAr ? a.description.ar : a.description.fr}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500 font-medium">{isAr ? a.date.ar : a.date.fr}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2.5 py-1 rounded-sm bg-slate-100 text-[10px] font-black text-slate-600 border border-slate-200 uppercase tracking-tighter">
                                                {isAr ? a.tag.ar : a.tag.fr}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-center gap-4">
                                                <Link
                                                    href={`/${locale}/admin/news/${a.id}/edit`}
                                                    className="inline-flex items-center gap-1 text-brand-green hover:bg-brand-green/10 px-3 py-1.5 rounded-sm transition-all font-black text-xs"
                                                >
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                                    {t.actions.edit}
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(a.id)}
                                                    className="inline-flex items-center gap-1 text-brand-red hover:bg-brand-red/10 px-3 py-1.5 rounded-sm transition-all font-black text-xs"
                                                >
                                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                                    {t.actions.delete}
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic">
                                        {t.noResults}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

}
