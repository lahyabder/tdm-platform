import Link from 'next/link';

export default async function StatsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const resolvedParams = await params;
    const locale = resolvedParams.locale as "ar" | "fr";

    const content = {
        ar: {
            title: "إحصاءات وخرائط التغطية",
            subtitle: "بيانات تفاعلية حول تطور شبكة البث ونسب التغطية الوطنية عبر التراب الموريتاني.",
            back: "العودة لبوابة البيانات",
            metrics: [
                { label: "نسبة التغطية الإذاعية", value: "85%", change: "+2%", icon: "Radio" },
                { label: "نسبة التغطية التلفزيونية", value: "78%", change: "+4%", icon: "Tv Monitor" },
                { label: "عدد النقاط النشطة", value: "24", change: "+3", icon: "Map Pin" },
                { label: "الوقت الإجمالي للبث سنوياً", value: "8,760 س", change: "99.9%", icon: "Clock" }
            ],
            comingSoon: "لوحة البيانات التفاعلية قيد التطوير..."
        },
        fr: {
            title: "Statistiques et Cartes de Couverture",
            subtitle: "Données interactives sur le développement du réseau de diffusion en Mauritanie.",
            back: "Retour au portail",
            metrics: [
                { label: "Couverture Radiophonique", value: "85%", change: "+2%", icon: "Radio" },
                { label: "Couverture Télévisuelle", value: "78%", change: "+4%", icon: "Tv Monitor" },
                { label: "Stations Actives", value: "24", change: "+3", icon: "Map Pin" },
                { label: "Temps de diffusion annuel", value: "8,760 h", change: "99.9%", icon: "Clock" }
            ],
            comingSoon: "Tableau de bord interactif en cours de développement..."
        }
    }[locale];

    return (
        <main className="min-h-screen bg-slate-50 pb-24">
            {/* Header */}
            <section className="bg-slate-900 pt-24 pb-32 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800"></div>
                <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-brand-green via-brand-yellow to-brand-red"></div>
                <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
                    <Link href={`/${locale}/data`} className="inline-flex items-center gap-2 text-brand-yellow hover:underline mb-6 font-medium">
                        {locale === 'ar' ? '←' : '→'} {content.back}
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                        {content.title}
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
                        {content.subtitle}
                    </p>
                </div>
            </section>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {content.metrics.map((metric, i) => {
                        const numValue = metric.value.replace(/[^0-9.,]/g, '');
                        const strValue = metric.value.replace(/[0-9.,]/g, '').trim();
                        const isPositive = metric.change.includes('+');

                        let Icon;
                        if (metric.icon === 'Radio') Icon = <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4.9 19.1C1 15.2 1 8.8 4.9 4.9"/><path d="M7.8 16.2c-2.3-2.3-2.3-6.1 0-8.5"/><circle cx="12" cy="12" r="2"/><path d="M16.2 7.8c2.3 2.3 2.3 6.1 0 8.5"/><path d="M19.1 4.9C23 8.8 23 15.2 19.1 19.1"/></svg>;
                        else if (metric.icon === 'Tv Monitor') Icon = <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="15" rx="2" ry="2"/><polyline points="17 2 12 7 7 2"/></svg>;
                        else if (metric.icon === 'Map Pin') Icon = <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
                        else Icon = <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>;

                        return (
                            <div key={i} className="relative overflow-hidden bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-200/80 p-6 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300 group">
                                <div className="absolute top-0 ltr:right-0 rtl:left-0 w-32 h-32 bg-brand-green/5 rounded-full blur-3xl ltr:-mr-10 rtl:-ml-10 -mt-10 group-hover:bg-brand-green/15 transition-colors duration-500"></div>
                                <div className="relative z-10">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200/80 flex items-center justify-center text-brand-green shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                                            {Icon}
                                        </div>
                                        <div className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold border ${isPositive ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-brand-green/10 text-brand-green border-brand-green/20'}`}>
                                            {isPositive && <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>}
                                            {metric.change}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-slate-500 text-sm font-bold mb-2">{metric.label}</h3>
                                        <div className="flex items-baseline gap-2">
                                            <span className="text-4xl lg:text-5xl font-black tracking-tight text-slate-800 font-mono">{numValue}</span>
                                            {strValue && <span className="text-lg font-bold text-slate-400">{strValue}</span>}
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-green to-brand-yellow scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                            </div>
                        );
                    })}
                </div>

                {/* Coming Soon BI Dashboard Mockup */}
                <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden relative">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <div className="relative z-10 p-12 lg:p-20 text-center backdrop-blur-sm bg-white/60">
                        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white shadow-xl border border-slate-100 mb-8 relative">
                            <div className="absolute inset-0 rounded-full border-4 border-brand-green border-t-transparent animate-spin"></div>
                            <svg className="w-10 h-10 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                            </svg>
                        </div>
                        <h2 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">{content.comingSoon}</h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            {locale === 'ar' ? 'نعمل حالياً على بناء لوحة ذكاء أعمال (Business Intelligence) متطورة، لربط هذه الإحصائيات مباشرة بقواعد بياناتنا الحية، لتوفير تقارير دقيقة ومحدثة آنياً حول تغطية الشبكة وأداء البث عبر التراب الوطني.' : 'Nous construisons actuellement un tableau de bord de Business Intelligence avancé, connectant ces statistiques à nos bases de données en direct pour fournir des rapports précis et en temps réel sur la couverture réseau.'}
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
