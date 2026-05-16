'use client';
export const dynamic = 'force-dynamic';

import { use, useEffect, useState } from 'react';
import { useNewsStore } from '@/store/useNewsStore';
import { useFacilityStore } from '@/store/useFacilityStore';
import { useContentStore } from '@/store/useContentStore';
import { useLegislationStore } from '@/store/useLegislationStore';
import Link from 'next/link';
import { Cloud, CheckCircle2, Loader2, Zap, Newspaper, MapPin, Settings, ArrowRight, LayoutDashboard, Globe } from 'lucide-react';

export default function AdminDashboardPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params);
    const { articles, syncAllToCloud: syncNews, fetchArticles } = useNewsStore();
    const { facilities, fetchFacilities } = useFacilityStore();
    const { syncAllToCloud: syncContent, fetchContent } = useContentStore();
    const { legislations } = useLegislationStore();
    
    const [isClient, setIsClient] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);
    const [publishSuccess, setPublishSuccess] = useState(false);

    useEffect(() => {
        setIsClient(true);
        fetchFacilities();
        fetchArticles();
        fetchContent();
    }, []);

    const isAr = locale === 'ar';

    const t = {
        ar: {
            welcome: "مرحباً بك في لوحة تحكم TDM",
            summary: "ملخص نشاط المنصة الرقمية الموحدة",
            newsCount: "الأخبار",
            facilitiesCount: "المنشآت",
            quickActions: "إجراءات سريعة",
            addNews: "نشر خبر جديد",
            addFacility: "إضافة منشأة",
            editAbout: "تعديل صفحة المؤسسة",
            recentNews: "أحدث الأخبار",
            publishBtn: "نشر التحديثات الشاملة",
            publishing: "جاري النشر للسحابة...",
            published: "تم النشر بنجاح!",
            viewSite: "عرض الموقع"
        },
        fr: {
            welcome: "Tableau de Bord TDM",
            summary: "Résumé de l'activité numérique",
            newsCount: "Actualités",
            facilitiesCount: "Établissements",
            quickActions: "Actions rapides",
            addNews: "Nouvelle actualité",
            addFacility: "Ajouter établissement",
            editAbout: "Modifier À Propos",
            recentNews: "Dernières actualités",
            publishBtn: "Publier tout",
            publishing: "Publication...",
            published: "Publié !",
            viewSite: "Voir le site"
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

    if (!isClient) return <div className="min-h-screen bg-slate-50"></div>;

    return (
        <div className="space-y-10 pb-20 max-w-7xl mx-auto px-4 sm:px-6">
            {/* Ultra-Premium Header */}
            <div className="relative bg-[#050B14] rounded-[2.5rem] p-10 md:p-16 overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                <div className="absolute top-0 end-0 w-[500px] h-[500px] bg-brand-green/10 blur-[120px] -me-64 -mt-64 animate-pulse"></div>
                <div className="absolute bottom-0 start-0 w-64 h-64 bg-brand-yellow/5 blur-[100px] -ms-32 -mb-32"></div>
                
                <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center gap-10">
                    <div className="text-center lg:text-end space-y-4">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-green/20 rounded-full border border-brand-green/30">
                            <LayoutDashboard className="w-4 h-4 text-brand-green" />
                            <span className="text-[10px] font-black text-brand-green uppercase tracking-[0.3em]">ADMIN PORTAL</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">{t.welcome}</h1>
                        <p className="text-slate-400 text-lg font-medium max-w-xl">{t.summary}</p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                        <button 
                            onClick={handlePublishAll}
                            disabled={isPublishing}
                            className={`group relative flex items-center justify-center gap-4 px-10 py-5 rounded-[2rem] font-black text-sm uppercase tracking-widest transition-all duration-500 shadow-2xl ${
                                publishSuccess 
                                ? 'bg-brand-green text-white scale-105 shadow-brand-green/30' 
                                : 'bg-white text-slate-950 hover:bg-brand-green hover:text-white hover:shadow-brand-green/20'
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
                        
                        <Link href={`/${locale}`} target="_blank" className="flex items-center justify-center gap-3 px-8 py-5 bg-white/5 border border-white/10 rounded-[2rem] text-white font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">
                            <Globe className="w-4 h-4" />
                            {t.viewSite}
                        </Link>
                    </div>
                </div>
            </div>

            {/* Stats Cards - Redesigned */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { icon: <Newspaper />, label: t.newsCount, val: articles.length },
                    { icon: <MapPin />, label: t.facilitiesCount, val: facilities.length },
                    { icon: <CheckCircle2 />, label: isAr ? 'التشريعات' : 'Législations', val: legislations.length },
                    { icon: <Cloud />, label: isAr ? 'الملفات' : 'Fichiers', val: '5' }
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 group hover:shadow-2xl transition-all duration-500">
                        <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-slate-50 text-slate-900 rounded-2xl flex items-center justify-center group-hover:bg-slate-950 group-hover:text-white transition-all duration-500 shrink-0">
                                {stat.icon}
                            </div>
                            <div className="min-w-0">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1 truncate">{stat.label}</p>
                                <p className="text-4xl font-black text-slate-900 tracking-tighter">{stat.val}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Quick Actions */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="flex items-center gap-4">
                        <div className="w-3 h-8 bg-brand-green rounded-full shadow-lg shadow-brand-green/30"></div>
                        <h3 className="text-2xl font-black text-slate-900">{t.quickActions}</h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                        <Link href={`/${locale}/admin/news/new`} className="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-lg hover:shadow-2xl hover:border-brand-green transition-all flex flex-col gap-6 group">
                            <div className="w-14 h-14 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-white transition-all"><Newspaper className="w-7 h-7" /></div>
                            <span className="font-black text-slate-900 text-lg">{t.addNews}</span>
                        </Link>
                        <Link href={`/${locale}/admin/facilities/new`} className="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-lg hover:shadow-2xl hover:border-brand-yellow transition-all flex flex-col gap-6 group">
                            <div className="w-14 h-14 rounded-2xl bg-brand-yellow/10 flex items-center justify-center text-brand-yellow group-hover:bg-brand-yellow group-hover:text-white transition-all"><MapPin className="w-7 h-7" /></div>
                            <span className="font-black text-slate-900 text-lg">{t.addFacility}</span>
                        </Link>
                        <Link href={`/${locale}/admin/legal`} className="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-lg hover:shadow-2xl hover:border-brand-green transition-all flex flex-col gap-6 group">
                            <div className="w-14 h-14 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green group-hover:bg-brand-green group-hover:text-white transition-all"><CheckCircle2 className="w-7 h-7" /></div>
                            <span className="font-black text-slate-900 text-lg">{isAr ? 'إدارة التشريعات' : 'Gérer Législations'}</span>
                        </Link>
                        <Link href={`/${locale}/admin/pages/about`} className="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-lg hover:shadow-2xl hover:border-slate-800 transition-all flex items-center gap-6 group sm:col-span-2">
                            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-slate-950 group-hover:text-white transition-all shrink-0"><Settings className="w-7 h-7" /></div>
                            <span className="font-black text-slate-900 text-lg">{t.editAbout}</span>
                        </Link>
                        <Link href={`/${locale}/admin/settings`} className="p-8 bg-white border border-slate-100 rounded-[2rem] shadow-lg hover:shadow-2xl hover:border-brand-red transition-all flex items-center gap-6 group sm:col-span-1">
                            <div className="w-14 h-14 rounded-2xl bg-brand-red/10 flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-all shrink-0"><Cloud className="w-7 h-7" /></div>
                            <span className="font-black text-slate-900 text-lg">{isAr ? 'الملفات' : 'Fichiers'}</span>
                        </Link>
                    </div>
                </div>

                {/* Recent Feed */}
                <div className="space-y-8">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-3 h-8 bg-brand-yellow rounded-full shadow-lg shadow-brand-yellow/30"></div>
                            <h3 className="text-2xl font-black text-slate-900">{t.recentNews}</h3>
                        </div>
                    </div>
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl divide-y divide-slate-50 overflow-hidden">
                        {articles.slice(0, 5).map((article) => (
                            <div key={article.id} className="p-6 flex items-center gap-6 hover:bg-slate-50 transition-colors group">
                                <Link 
                                    href={`/${locale}/admin/news/${article.id}/edit`}
                                    className="flex items-center gap-6 flex-1 min-w-0"
                                >
                                    <img src={article.imageUrl} className="w-16 h-16 rounded-2xl object-contain bg-slate-50 border border-slate-100 shadow-md transition-transform group-hover:scale-110" alt="" />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-bold text-slate-900 truncate text-lg group-hover:text-brand-green transition-colors">
                                            {isAr ? article.title.ar : article.title.fr}
                                        </p>
                                        <div className="flex items-center gap-2 mt-2">
                                             <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse"></div>
                                             <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">{isAr ? article.date.ar : article.date.fr}</p>
                                        </div>
                                    </div>
                                </Link>
                                <Link 
                                    href={`/${locale}/admin/news/${article.id}/edit`} 
                                    className="w-12 h-12 flex items-center justify-center text-slate-200 hover:text-brand-green hover:bg-brand-green/10 rounded-2xl transition-all"
                                >
                                    <ArrowRight className={`w-6 h-6 ${isAr ? 'rotate-180' : ''}`} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
