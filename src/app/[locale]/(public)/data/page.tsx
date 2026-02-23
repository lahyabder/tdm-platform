import Link from 'next/link';

export default async function DataHubPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const resolvedParams = await params;
    const locale = resolvedParams.locale;

    const content = {
        ar: {
            title: "بوابة البيانات المفتوحة",
            subtitle: "المنصة المركزية للوصول إلى السجلات، التشريعات، والإحصائيات الخاصة بقطاع البث.",
            cards: [
                {
                    id: "directory",
                    title: "سجل المنشآت الإعلامية",
                    desc: "دليل شامل لجميع القنوات والإذاعات ومزودي خدمات نقل البيانات المرخصة.",
                    link: "/data/media-facilities",
                    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
                    color: "brand-green"
                },
                {
                    id: "legislation",
                    title: "مكتبة التشريعات والمرجعيات",
                    desc: "النصوص القانونية والمراسيم المنظمة لقطاع السمعي البصري.",
                    link: "/data/legal",
                    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
                    color: "slate-800"
                },
                {
                    id: "downloads",
                    title: "نماذج وملفات للتحميل",
                    desc: "استمارات التراخيص، دفاتر الشروط، ونماذج الرسوم.",
                    link: "/data/downloads",
                    icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4",
                    color: "brand-red"
                },
                {
                    id: "stats",
                    title: "إحصاءات وخرائط التغطية",
                    desc: "بيانات تفاعلية حول تطور شبكة البث ونسب التغطية الوطنية.",
                    link: "/data/stats",
                    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
                    color: "brand-yellow"
                }
            ]
        },
        fr: {
            title: "Portail des Données Ouvertes",
            subtitle: "La plateforme centrale pour accéder aux registres, législations et statistiques du secteur de la diffusion.",
            cards: [
                {
                    id: "directory",
                    title: "Registre des Établissements Médiatiques",
                    desc: "Un annuaire complet de toutes les chaînes, radios et fournisseurs de services de transmission de données agréés.",
                    link: "/data/media-facilities",
                    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
                    color: "brand-green"
                },
                {
                    id: "legislation",
                    title: "Bibliothèque des Législations",
                    desc: "Textes législatifs et décrets régissant le secteur audiovisuel.",
                    link: "/data/legal",
                    icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",
                    color: "slate-800"
                },
                {
                    id: "downloads",
                    title: "Formulaires et Téléchargements",
                    desc: "Formulaires de licence, cahiers des charges et modèles de frais.",
                    link: "/data/downloads",
                    icon: "M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4",
                    color: "brand-red"
                },
                {
                    id: "stats",
                    title: "Statistiques et Cartes de Couverture",
                    desc: "Données interactives sur le développement du réseau de diffusion et les taux de couverture nationale.",
                    link: "/data/stats",
                    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
                    color: "brand-yellow"
                }
            ]
        }
    }[locale as 'ar' | 'fr'];

    return (
        <main className="min-h-screen bg-slate-50 pb-24">
            {/* Header */}
            <section className="bg-slate-900 pt-24 pb-32 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800"></div>
                <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-brand-green via-brand-yellow to-brand-red"></div>
                <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                        {content.title}
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
                        {content.subtitle}
                    </p>
                </div>
            </section>

            {/* Grid */}
            <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {content.cards.map((card: any) => (
                        <Link key={card.id} href={`/${locale}${card.link}`} className="block group">
                            <div className={`bg-white p-8 rounded-sm shadow-sm border border-slate-200 hover:border-${card.color} hover:shadow-md transition-all h-full flex items-start gap-6`}>
                                <div className={`p-4 bg-${card.color}/10 text-${card.color} rounded-sm group-hover:bg-${card.color} group-hover:text-white transition-colors shrink-0`}>
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={card.icon} />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className={`text-2xl font-bold text-slate-800 mb-3 group-hover:text-${card.color} transition-colors`}>{card.title}</h2>
                                    <p className="text-slate-600 leading-relaxed">
                                        {card.desc}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
