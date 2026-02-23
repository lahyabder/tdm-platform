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
            <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {content.metrics.map((metric, i) => (
                        <div key={i} className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 flex flex-col justify-between hover:-translate-y-1 transition-transform">
                            <div className="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center text-brand-yellow mb-4">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                            <div>
                                <h3 className="text-slate-500 text-sm font-medium mb-1">{metric.label}</h3>
                                <div className="flex items-end gap-3">
                                    <span className="text-3xl font-black text-slate-800">{metric.value}</span>
                                    <span className="text-sm font-bold text-brand-green mb-1">{metric.change}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-12 text-center">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-slate-50 border border-slate-100 mb-6">
                        <svg className="w-10 h-10 text-slate-300 animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">{content.comingSoon}</h2>
                    <p className="text-slate-500 max-w-md mx-auto">
                        {locale === 'ar' ? 'نعمل حالياً على بناء لوحة ذكاء أعمال (BI) لربط الإحصائيات مباشرة بقواعد البيانات الحية.' : 'Nous construisons actuellement un tableau de bord BI pour connecter les statistiques directement aux bases de données en direct.'}
                    </p>
                </div>
            </div>
        </main>
    );
}
