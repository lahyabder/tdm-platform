'use client';

import { use } from 'react';
import Link from 'next/link';
import { useNewsStore } from '@/store/useNewsStore';
import { useFacilityStore } from '@/store/useFacilityStore';

export default function AdminReportsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params);
    const { articles } = useNewsStore();
    const { facilities } = useFacilityStore();

    const t = {
        ar: {
            title: "التقارير والإحصائيات",
            subtitle: "تحليل حي لنشاط البث وتوزيع التراخيص.",
            metrics: {
                growth: "نمو التراخيص",
                revenue: "العوائد التقديرية",
                usage: "استهلاك النطاق",
                compliance: "نسبة الامتثال"
            },
            distribution: "توزيع المنشآت حسب النوع",
            recentActivity: "آخر التحديثات في النظام"
        },
        fr: {
            title: "Rapports et Statistiques",
            subtitle: "Analyse en temps réel de l'activité de diffusion.",
            metrics: {
                growth: "Croissance",
                revenue: "Revenus estimés",
                usage: "Bande passante",
                compliance: "Conformité"
            },
            distribution: "Distribution par type",
            recentActivity: "Activités récentes"
        }
    }[locale as 'ar' | 'fr'];

    const stats = [
        { label: t.metrics.growth, value: "+12.4%", color: "text-brand-green" },
        { label: t.metrics.revenue, value: "1,240,000 MRU", color: "text-brand-green" },
        { label: t.metrics.usage, value: "78.2%", color: "text-brand-yellow" },
        { label: t.metrics.compliance, value: "96%", color: "text-brand-green" },
    ];

    const isAr = locale === 'ar';

    return (
        <div className="space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 mb-2">{t.title}</h1>
                    <p className="text-slate-500 font-medium">{t.subtitle}</p>
                </div>
                <div className="flex gap-2 w-full md:w-auto">
                    <button className="flex-1 md:flex-none px-4 py-2 bg-white border border-slate-200 text-slate-700 font-bold rounded-sm hover:bg-slate-50 transition-colors text-sm shadow-sm">
                        {isAr ? 'تصدير PDF' : 'Exporter PDF'}
                    </button>
                    <button className="flex-1 md:flex-none px-4 py-2 bg-brand-green text-white font-black rounded-sm hover:bg-brand-green/90 transition-colors text-sm shadow-sm">
                        {isAr ? 'تحديث البيانات' : 'Actualiser'}
                    </button>
                </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-5 md:p-6 rounded-sm border border-slate-200 shadow-sm relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1 h-full bg-brand-green opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{stat.label}</p>
                        <p className={`text-xl md:text-2xl font-black ${stat.color}`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Visual Report Card */}
                <div className="lg:col-span-2 bg-white rounded-sm border border-slate-200 shadow-sm p-8">
                    <h3 className="text-lg font-black text-slate-800 mb-8 flex items-center gap-3">
                        <span className="w-2 h-6 bg-brand-green rounded-full"></span>
                        {t.distribution}
                    </h3>
                    <div className="flex items-end justify-between gap-2 md:gap-4 h-64 border-b border-slate-100 pb-2">
                        {['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو'].map((month, i) => {
                            const heights = [40, 70, 55, 90, 65, 85, 95];
                            return (
                                <div key={i} className="flex-1 flex flex-col items-center gap-4 group">
                                    <div className="relative w-full flex justify-center">
                                        <div 
                                            className="w-full md:w-8 bg-brand-green/10 rounded-t-sm group-hover:bg-brand-green/30 transition-all duration-500 relative"
                                            style={{ height: `${heights[i] * 2}px` }}
                                        >
                                            <div 
                                                className="absolute bottom-0 left-0 w-full bg-brand-green rounded-t-sm transition-all duration-1000 delay-100"
                                                style={{ height: `${heights[i] * 1.5}px` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter md:tracking-normal">{isAr ? month : `M${i+1}`}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="bg-slate-900 rounded-sm shadow-xl p-8 border border-slate-800 text-white">
                    <h3 className="text-lg font-black mb-8 flex items-center gap-3">
                        <span className="w-2 h-6 bg-brand-yellow rounded-full"></span>
                        {t.recentActivity}
                    </h3>
                    <div className="space-y-6">
                        {articles.slice(0, 4).map((article, i) => (
                            <div key={i} className="flex gap-4 group cursor-pointer">
                                <div className="w-2 h-2 rounded-full bg-brand-green mt-1.5 shrink-0 group-hover:scale-150 transition-transform"></div>
                                <div>
                                    <p className="text-sm font-bold text-slate-200 line-clamp-1 group-hover:text-brand-green transition-colors">{isAr ? article.title.ar : article.title.fr}</p>
                                    <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-widest">{isAr ? article.date.ar : article.date.fr}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button className="w-full mt-10 py-3 bg-white/5 border border-white/10 rounded-sm text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">
                        {isAr ? 'مشاهدة السجل الكامل' : 'Voir tout le journal'}
                    </button>
                </div>
            </div>
        </div>
    );
}
