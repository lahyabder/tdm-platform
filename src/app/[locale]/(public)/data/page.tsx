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
                    id: "facilities",
                    title: "سجل المنشآت الإعلامية",
                    desc: "دليل القنوات الإذاعية والتلفزيونية المرخصة ومزودي خدمة البيانات.",
                    link: "/data/media-facilities",
                    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1",
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
                    id: "facilities",
                    title: "Registre des Établissements",
                    desc: "Annuaire des chaînes radio, TV et fournisseurs de données agréés.",
                    link: "/data/media-facilities",
                    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1",
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
        <main className="min-h-screen pb-32 bg-mesh">
            {/* Header / Hero Section */}
            <section className="bg-brand-dark pt-32 pb-56 text-white relative overflow-hidden">
                <div className="absolute inset-0">
                    <img src="/data_bg.jpg" alt="Data background" className="w-full h-full object-cover opacity-10 mix-blend-luminosity" />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-dark/90 to-brand-dark"></div>
                </div>
                
                {/* Decorative mesh blobs */}
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-green/20 blur-[120px] rounded-full"></div>
                <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-brand-yellow/10 blur-[120px] rounded-full"></div>

                <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
                        <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></span>
                        <span className="text-xs font-black uppercase tracking-widest text-slate-300">{locale === 'ar' ? 'البيانات المفتوحة' : 'Open Data'}</span>
                    </div>
                    <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9] glow-text-gold">
                        {content.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl mx-auto font-medium">
                        {content.subtitle}
                    </p>
                </div>
            </section>

            {/* Grid of Interactive Cards */}
            <div className="max-w-6xl mx-auto px-6 -mt-24 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {content.cards.map((card: any) => {
                        const iconColor = card.color === 'brand-green' ? 'text-brand-green' : 
                                         card.color === 'brand-red' ? 'text-brand-red' : 
                                         card.color === 'brand-yellow' ? 'text-brand-yellow' : 'text-white';
                        
                        const bgColor = card.color === 'brand-green' ? 'bg-brand-green/10' : 
                                       card.color === 'brand-red' ? 'bg-brand-red/10' : 
                                       card.color === 'brand-yellow' ? 'bg-brand-yellow/10' : 'bg-white/10';

                        const hoverBorder = card.color === 'brand-green' ? 'hover:border-brand-green/40' : 
                                           card.color === 'brand-red' ? 'hover:border-brand-red/40' : 
                                           card.color === 'brand-yellow' ? 'hover:border-brand-yellow/40' : 'hover:border-white/40';

                        return (
                            <Link key={card.id} href={`/${locale}${card.link}`} className="block group">
                                <div className={`premium-card p-10 h-full flex flex-col md:flex-row items-start gap-8 border-white/5 ${hoverBorder}`}>
                                    <div className={`w-20 h-20 shrink-0 ${bgColor} ${iconColor} rounded-2xl flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500 shadow-xl`}>
                                        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={card.icon} />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <h2 className="text-3xl font-black text-white mb-4 group-hover:text-brand-green transition-colors leading-tight">
                                            {card.title}
                                        </h2>
                                        <p className="text-lg text-slate-300 leading-relaxed font-bold opacity-80 group-hover:opacity-100 transition-opacity">
                                            {card.desc}
                                        </p>
                                        <div className="mt-8 flex items-center gap-2 text-sm font-black text-brand-green uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                                            <span>{locale === 'ar' ? 'استكشاف' : 'Explorer'}</span>
                                            <svg className={`w-4 h-4 ${locale === 'ar' ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}
