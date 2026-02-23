'use client';

import { use } from 'react';

export default function AdminReportsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params);

    const t = {
        ar: {
            title: "التقارير والإحصائيات",
            subtitle: "تحليل معمق لنشاط البث والتراخيص الممنوحة.",
            overview: "نظرة عامة",
            metrics: {
                growth: "نمو التراخيص",
                revenue: "العوائد التقديرية",
                usage: "استهلاك النطاق الترددي",
                compliance: "نسبة الامتثال"
            },
            comingSoon: "هذا القسم قيد التطوير. سيتم دمج الرسوم البيانية التفاعلية في التحديث القادم."
        },
        fr: {
            title: "Rapports et Statistiques",
            subtitle: "Analyse approfondie de l'activité de diffusion et des licences accordées.",
            overview: "Vue d'ensemble",
            metrics: {
                growth: "Croissance des licences",
                revenue: "Revenus estimés",
                usage: "Consommation bande passante",
                compliance: "Taux de conformité"
            },
            comingSoon: "Cette section est en cours de développement. Des graphiques interactifs seront intégrés dans la prochaine mise à jour."
        }
    }[locale as 'ar' | 'fr'];

    const stats = [
        { label: t.metrics.growth, value: "+12%", color: "text-brand-green" },
        { label: t.metrics.revenue, value: "1.2M MRU", color: "text-brand-green" },
        { label: t.metrics.usage, value: "85%", color: "text-brand-yellow" },
        { label: t.metrics.compliance, value: "94%", color: "text-brand-green" },
    ];

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 mb-2">{t.title}</h1>
                    <p className="text-slate-500 font-medium">{t.subtitle}</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-white border border-slate-200 text-slate-700 font-bold rounded-sm hover:bg-slate-50 transition-colors text-sm shadow-sm">
                        {locale === 'ar' ? 'تصدير PDF' : 'Exporter PDF'}
                    </button>
                    <button className="px-4 py-2 bg-brand-green text-white font-bold rounded-sm hover:bg-brand-green/90 transition-colors text-sm shadow-sm">
                        {locale === 'ar' ? 'تحديث البيانات' : 'Actualiser'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">{stat.label}</p>
                        <p className={`text-2xl font-black ${stat.color}`}>{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="bg-slate-900 rounded-sm p-12 flex flex-col items-center justify-center text-center border border-slate-800 shadow-xl">
                <div className="w-20 h-20 bg-brand-green/10 rounded-full flex items-center justify-center mb-6">
                    <svg className="w-10 h-10 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{t.overview}</h3>
                <p className="text-slate-400 max-w-md font-medium">
                    {t.comingSoon}
                </p>
                <div className="mt-8 grid grid-cols-6 gap-2 w-full max-w-2xl opacity-20">
                    {[40, 70, 45, 90, 65, 80].map((h, i) => (
                        <div key={i} className="bg-brand-green w-full rounded-t-sm transition-all duration-1000" style={{ height: `${h}px` }}></div>
                    ))}
                </div>
            </div>
        </div>
    );
}
