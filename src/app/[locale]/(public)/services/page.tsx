'use client';

import { useState, useEffect, use } from 'react';
import { useContentStore } from '@/store/useContentStore';
import Link from 'next/link';

export default function ServicesPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params) as any;
    const { getPageContent } = useContentStore();
    const [content, setContent] = useState<any>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        setContent(getPageContent('services'));
    }, [getPageContent]);

    if (!isClient || !content) return <div className="min-h-screen bg-[#050B14]"></div>;

    const isAr = locale === 'ar';

    // Fallback items if store is empty or needs dynamic list
    const servicesItems = [
        { id: 'tv', title: { ar: "البث التلفزي الرقمي", fr: "Diffusion TV Numérique" }, description: { ar: "توفير خدمات البث التلفزي الرقمي عالي الجودة للجمهور.", fr: "Fourniture de services de télévision numérique de haute qualité." } },
        { id: 'radio', title: { ar: "البث الإذاعي (FM)", fr: "Diffusion Radio (FM)" }, description: { ar: "تغطية شاملة للإذاعات الوطنية والمحلية لجميع الولايات.", fr: "Couverture complète des radios nationales et locales." } },
        { id: 'data', title: { ar: "خدمات نقل البيانات", fr: "Services de Données" }, description: { ar: "ربط المؤسسات الإعلامية بشبكات نقل بيانات آمنة.", fr: "Connexion des médias à des réseaux de données sécurisés." } },
    ];

    return (
        <main className="max-w-6xl mx-auto px-6 py-16 animate-in fade-in duration-500">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-12 text-center">
                {content.title?.[locale]}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {servicesItems.map((item: any) => (
                    <Link key={item.id} href={`/${locale}/services/${item.id}`} className="block group">
                        <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg cursor-pointer border border-slate-800 hover:border-brand-green transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                            <div
                                className="absolute inset-0 w-full h-full bg-cover bg-center bg-slate-800 transition-transform duration-500 group-hover:scale-105"
                                style={{ backgroundImage: `url(/${item.id}.jpg)` }}
                                title={item.title[locale]}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/60 to-slate-800/20"></div>
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-green scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                            <div className="absolute inset-0 flex flex-col justify-end p-6">
                                <div className="w-10 h-10 bg-slate-800/80 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 border border-white/20 group-hover:bg-brand-green/20 group-hover:border-brand-green/50 transition-colors">
                                    <svg className="w-5 h-5 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-extrabold text-white mb-2 group-hover:text-brand-green transition-colors">
                                    {item.title[locale]}
                                </h3>
                                <p className="text-slate-100 text-sm leading-relaxed line-clamp-2">
                                    {item.description[locale]}
                                </p>
                                <div className="mt-3 flex items-center text-xs font-bold text-brand-green opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    {isAr ? 'عرض التفاصيل ←' : 'Voir les détails →'}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
