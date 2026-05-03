'use client';

import { use, useEffect, useState } from 'react';
import { useNewsStore } from '@/store/useNewsStore';
import { useFacilityStore } from '@/store/useFacilityStore';
import { useContentStore } from '@/store/useContentStore';
import Link from 'next/link';
import { Cloud, CheckCircle2, Loader2, Zap, Newspaper, MapPin, Settings } from 'lucide-react';

export default function AdminDashboardPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params);
    const { articles, syncAllToCloud: syncNews } = useNewsStore();
    const { facilities, fetchFacilities } = useFacilityStore();
    const { syncAllToCloud: syncContent } = useContentStore();
    
    const [isClient, setIsClient] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);
    const [publishSuccess, setPublishSuccess] = useState(false);

    useEffect(() => {
        setIsClient(true);
        fetchFacilities();
    }, []);

    const isAr = locale === 'ar';

    const t = {
        ar: {
            welcome: "مرحباً بك في لوحة تحكم TDM",
            summary: "ملخص نشاط المنصة الرقمية",
            newsCount: "الأخبار المنشورة",
            facilitiesCount: "المنشآت المسجلة",
            quickActions: "إجراءات سريعة",
            addNews: "نشر خبر جديد",
            addFacility: "إضافة منشأة",
            editAbout: "تعديل صفحة المؤسسة",
            recentNews: "أحدث الأخبار",
            publishBtn: "نشر التحديثات الشاملة",
            publishing: "جاري النشر...",
            published: "تم نشر كل شيء بنجاح!"
        },
        fr: {
            welcome: "Bienvenue sur le portail Admin TDM",
            summary: "Résumé de l'activité numérique",
            newsCount: "Actualités publiées",
            facilitiesCount: "Établissements",
            quickActions: "Actions rapides",
            addNews: "Nouvelle actualité",
            addFacility: "Ajouter établissement",
            editAbout: "Modifier À Propos",
            recentNews: "Dernières actualités",
            publishBtn: "Publier tout",
            publishing: "Publication...",
            published: "Tout est publié !"
        }
    }[locale as 'ar' | 'fr'];

    const handlePublishAll = async () => {
        setIsPublishing(true);
        try {
            await Promise.all([syncContent(), syncNews()]);
            setPublishSuccess(true);
            setTimeout(() => setPublishSuccess(false), 5000);
        } catch (e) {
            console.error("Publication Error:", e);
        } finally {
            setIsPublishing(false);
        }
    };

    if (!isClient) return null;

    return (
        <div className="space-y-10 pb-20">
            {/* Hero Header with Publish Button */}
            <div className="relative bg-slate-950 rounded-2xl p-10 overflow-hidden border border-white/5 shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-green/10 blur-[120px] -mr-48 -mt-48 animate-pulse"></div>
                <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-center md:text-right">
                        <h1 className="text-4xl font-black text-white tracking-tight">{t.welcome}</h1>
                        <p className="text-slate-400 mt-2 font-medium">{t.summary}</p>
                    </div>
                    
                    <button 
                        onClick={handlePublishAll}
                        disabled={isPublishing}
                        className={`group relative flex items-center gap-3 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all ${
                            publishSuccess 
                            ? 'bg-brand-green text-white scale-105' 
                            : 'bg-white text-slate-950 hover:bg-brand-green hover:text-white'
                        } disabled:opacity-70`}
                    >
                        {isPublishing ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                {t.publishing}
                            </>
                        ) : publishSuccess ? (
                            <>
                                <CheckCircle2 className="w-5 h-5" />
                                {t.published}
                            </>
                        ) : (
                            <>
                                <Cloud className="w-5 h-5 group-hover:animate-bounce" />
                                {t.publishBtn}
                            </>
                        )}
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group hover:border-brand-green/30 transition-all">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-green/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="flex items-center gap-6 relative z-10">
                        <div className="w-16 h-16 bg-brand-green/10 rounded-2xl flex items-center justify-center text-brand-green border border-brand-green/20">
                            <Newspaper className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{t.newsCount}</p>
                            <p className="text-4xl font-black text-slate-900 tracking-tighter">{articles.length}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group hover:border-brand-yellow/30 transition-all">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-brand-yellow/5 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform duration-700"></div>
                    <div className="flex items-center gap-6 relative z-10">
                        <div className="w-16 h-16 bg-brand-yellow/10 rounded-2xl flex items-center justify-center text-brand-yellow border border-brand-yellow/20">
                            <MapPin className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{t.facilitiesCount}</p>
                            <p className="text-4xl font-black text-slate-900 tracking-tighter">{facilities.length}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-brand-green p-8 rounded-2xl shadow-2xl shadow-brand-green/30 relative overflow-hidden group">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
                     <div className="flex items-center gap-6 text-white relative z-10">
                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center border border-white/20">
                            <Zap className="w-8 h-8" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black opacity-80 uppercase tracking-[0.2em] mb-1">الحالة التقنية</p>
                            <p className="text-4xl font-black tracking-tighter">100% نشط</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Quick Actions */}
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-8 bg-brand-green rounded-full"></div>
                        <h3 className="text-xl font-black text-slate-900">{t.quickActions}</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Link href={`/${locale}/admin/news/new`} className="p-6 bg-white border border-slate-100 rounded-2xl shadow-lg hover:shadow-xl hover:border-brand-green transition-all flex flex-col gap-4 group">
                            <div className="w-12 h-12 rounded-xl bg-brand-green/10 flex items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-white transition-all"><Newspaper className="w-6 h-6" /></div>
                            <span className="font-black text-slate-800">{t.addNews}</span>
                        </Link>
                        <Link href={`/${locale}/admin/facilities/new`} className="p-6 bg-white border border-slate-100 rounded-2xl shadow-lg hover:shadow-xl hover:border-brand-yellow transition-all flex flex-col gap-4 group">
                            <div className="w-12 h-12 rounded-xl bg-brand-yellow/10 flex items-center justify-center text-brand-yellow group-hover:bg-brand-yellow group-hover:text-white transition-all"><MapPin className="w-6 h-6" /></div>
                            <span className="font-black text-slate-800">{t.addFacility}</span>
                        </Link>
                        <Link href={`/${locale}/admin/pages/about`} className="p-6 bg-white border border-slate-100 rounded-2xl shadow-lg hover:shadow-xl hover:border-slate-300 transition-all flex flex-col gap-4 group sm:col-span-2">
                            <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-slate-800 group-hover:text-white transition-all"><Settings className="w-6 h-6" /></div>
                            <span className="font-black text-slate-800">{t.editAbout}</span>
                        </Link>
                    </div>
                </div>

                {/* Recent News List */}
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-2 h-8 bg-brand-yellow rounded-full"></div>
                            <h3 className="text-xl font-black text-slate-900">{t.recentNews}</h3>
                        </div>
                        <Link href={`/${locale}/admin/news`} className="text-xs font-black text-brand-green hover:underline tracking-widest">{isAr ? 'عرض الكل' : 'Voir tout'}</Link>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-xl divide-y divide-slate-100 overflow-hidden">
                        {articles.slice(0, 4).map((article) => (
                            <div key={article.id} className="p-5 flex items-center gap-5 hover:bg-slate-50 transition-colors group">
                                <Link 
                                    href={`/${locale}/admin/news/${article.id}/edit`}
                                    className="flex items-center gap-5 flex-1 min-w-0"
                                >
                                    <img src={article.imageUrl} className="w-14 h-14 rounded-xl object-cover border border-slate-100 shadow-sm" alt="" />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-slate-900 truncate text-sm group-hover:text-brand-green transition-colors">
                                            {isAr ? article.title.ar : article.title.fr}
                                        </p>
                                        <div className="flex items-center gap-2 mt-1">
                                             <div className="w-1.5 h-1.5 rounded-full bg-brand-green/40"></div>
                                             <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{isAr ? article.date.ar : article.date.fr}</p>
                                        </div>
                                    </div>
                                </Link>
                                <Link 
                                    href={`/${locale}/admin/news/${article.id}/edit`} 
                                    className="w-10 h-10 flex items-center justify-center text-slate-300 hover:text-brand-green hover:bg-brand-green/10 rounded-xl transition-all"
                                >
                                    <ArrowRight className={`w-5 h-5 ${isAr ? 'rotate-180' : ''}`} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
