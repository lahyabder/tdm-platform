'use client';

import { use, useEffect, useState } from 'react';
import { useNewsStore } from '@/store/useNewsStore';
import { useFacilityStore } from '@/store/useFacilityStore';
import Link from 'next/link';

export default function AdminDashboardPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params);
    const { articles } = useNewsStore();
    const { facilities } = useFacilityStore();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const isAr = locale === 'ar';

    const t = {
        ar: {
            welcome: "مرحباً بك في لوحة تحكم TDM",
            summary: "ملخص نشاط المنصة",
            newsCount: "الأخبار المنشورة",
            facilitiesCount: "المنشآت المسجلة",
            quickActions: "إجراءات سريعة",
            addNews: "نشر خبر جديد",
            addFacility: "إضافة منشأة",
            editAbout: "تعديل صفحة المؤسسة",
            recentNews: "أحدث الأخبار"
        },
        fr: {
            welcome: "Bienvenue sur le portail Admin TDM",
            summary: "Résumé de l'activité",
            newsCount: "Actualités publiées",
            facilitiesCount: "Établissements",
            quickActions: "Actions rapides",
            addNews: "Nouvelle actualité",
            addFacility: "Ajouter établissement",
            editAbout: "Modifier À Propos",
            recentNews: "Dernières actualités"
        }
    }[locale as 'ar' | 'fr'];

    if (!isClient) return null;

    return (
        <div className="space-y-8">
            <div className="relative bg-slate-900 rounded-sm p-8 overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/10 blur-[100px] -mr-32 -mt-32"></div>
                <div className="relative z-10">
                    <h1 className="text-3xl font-black text-white tracking-tight">{t.welcome}</h1>
                    <p className="text-slate-400 mt-2 font-medium">{t.summary}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Stats Cards */}
                <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-brand-green/10 rounded-sm flex items-center justify-center text-brand-green">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z" /></svg>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.newsCount}</p>
                            <p className="text-2xl font-black text-slate-900">{articles.length}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-brand-yellow/10 rounded-sm flex items-center justify-center text-brand-yellow">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1" /></svg>
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.facilitiesCount}</p>
                            <p className="text-2xl font-black text-slate-900">{facilities.length}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-brand-green p-6 rounded-sm shadow-lg shadow-brand-green/20">
                    <div className="flex items-center gap-4 text-white">
                        <div className="w-12 h-12 bg-white/20 rounded-sm flex items-center justify-center">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                        </div>
                        <div>
                            <p className="text-[10px] font-black opacity-80 uppercase tracking-widest">نظام التراخيص</p>
                            <p className="text-2xl font-black">94% نشط</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Quick Actions */}
                <div className="space-y-4">
                    <h3 className="text-lg font-black text-slate-800 flex items-center gap-3">
                        <span className="w-2 h-6 bg-brand-green rounded-full"></span>
                        {t.quickActions}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Link href={`/${locale}/admin/news/new`} className="p-4 bg-white border border-slate-200 rounded-sm hover:border-brand-green hover:shadow-md transition-all flex items-center gap-3 font-bold text-slate-700">
                            <div className="w-8 h-8 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg></div>
                            {t.addNews}
                        </Link>
                        <Link href={`/${locale}/admin/facilities/new`} className="p-4 bg-white border border-slate-200 rounded-sm hover:border-brand-green hover:shadow-md transition-all flex items-center gap-3 font-bold text-slate-700">
                            <div className="w-8 h-8 rounded-full bg-brand-yellow/10 flex items-center justify-center text-brand-yellow"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16" /></svg></div>
                            {t.addFacility}
                        </Link>
                        <Link href={`/${locale}/admin/pages/about`} className="p-4 bg-white border border-slate-200 rounded-sm hover:border-brand-green hover:shadow-md transition-all flex items-center gap-3 font-bold text-slate-700">
                            <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5" /></svg></div>
                            {t.editAbout}
                        </Link>
                    </div>
                </div>

                {/* Recent News List */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-black text-slate-800 flex items-center gap-3">
                            <span className="w-2 h-6 bg-brand-yellow rounded-full"></span>
                            {t.recentNews}
                        </h3>
                        <Link href={`/${locale}/admin/news`} className="text-xs font-bold text-brand-green hover:underline">{isAr ? 'عرض الكل' : 'Voir tout'}</Link>
                    </div>
                    <div className="bg-white rounded-sm border border-slate-200 shadow-sm divide-y divide-slate-100">
                        {articles.slice(0, 3).map((article) => (
                            <div key={article.id} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors group">
                                <Link 
                                    href={`/${locale}/admin/news/${article.id}/edit`}
                                    className="flex items-center gap-4 flex-1 min-w-0"
                                >
                                    <img src={article.imageUrl} className="w-12 h-12 rounded-sm object-cover border border-slate-100" alt="" />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-slate-800 truncate text-sm group-hover:text-brand-green transition-colors">
                                            {isAr ? article.title.ar : article.title.fr}
                                        </p>
                                        <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-widest">{isAr ? article.date.ar : article.date.fr}</p>
                                    </div>
                                </Link>
                                <Link 
                                    href={`/${locale}/admin/news/${article.id}/edit`} 
                                    className="p-2 text-slate-300 hover:text-brand-green hover:bg-brand-green/10 rounded-full transition-all"
                                    title={isAr ? 'تعديل' : 'Modifier'}
                                >
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
