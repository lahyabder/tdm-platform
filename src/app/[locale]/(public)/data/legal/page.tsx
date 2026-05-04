'use client';

import { useLegislationStore } from '@/store/useLegislationStore';
import Link from 'next/link';
import { use, useState, useEffect } from 'react';
import DocModal from '@/components/ui/DocModal';

export default function LegalLibraryPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const resolvedParams = use(params) as any;
    const locale = resolvedParams.locale as "ar" | "fr";
    const { legislations } = useLegislationStore();
    const [isClient, setIsClient] = useState(false);
    
    const [selectedDoc, setSelectedDoc] = useState<any>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const content = {
        ar: {
            title: "مكتبة التشريعات والمرجعيات",
            subtitle: "النصوص القانونية والمراسيم والقرارات التنظيمية الخاصة بقطاع السمعي البصري.",
            back: "العودة لبوابة البيانات",
            searchPlaceholder: "ابحث عن قانون، مرسوم...",
            types: {
                law: "قانون",
                decree: "مرسوم",
                order: "قرار",
                circular: "تعميم"
            },
            empty: "لا توجد تشريعات تطابق بحثك."
        },
        fr: {
            title: "Bibliothèque des Législations",
            subtitle: "Textes juridiques, décrets et arrêtés réglementaires du secteur audiovisuel.",
            back: "Retour au portail",
            searchPlaceholder: "Rechercher une loi, un décret...",
            types: {
                law: "Loi",
                decree: "Décret",
                order: "Arrêté",
                circular: "Circulaire"
            },
            empty: "Aucune législation ne correspond à votre recherche."
        }
    }[locale];

    if (!isClient) return <div className="min-h-screen bg-brand-dark"></div>;

    return (
        <main className="min-h-screen pb-32 bg-mesh" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            {/* Header */}
            <section className="bg-brand-dark pt-32 pb-56 text-white relative overflow-hidden">
                <div className="absolute inset-0">
                    <img src="/data_bg.jpg" alt="" className="w-full h-full object-cover opacity-10 mix-blend-luminosity" />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-dark/90 to-brand-dark"></div>
                </div>
                
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-brand-green/20 blur-[120px] rounded-full"></div>

                <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
                    <Link href={`/${locale}/data`} className="inline-flex items-center gap-2 text-brand-yellow hover:underline mb-8 font-black uppercase tracking-widest text-xs">
                        {locale === 'ar' ? '←' : '→'} {content.back}
                    </Link>
                    <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9] glow-text-gold">
                        {content.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl mx-auto font-medium">
                        {content.subtitle}
                    </p>
                </div>
            </section>

            {/* Content */}
            <div className="max-w-5xl mx-auto px-6 -mt-32 relative z-20">
                <div className="premium-card p-10 md:p-16 border-white/5 shadow-2xl">
                    <div className="mb-12">
                        <input
                            type="text"
                            placeholder={content.searchPlaceholder}
                            className="w-full px-8 py-6 rounded-2xl border border-white/10 focus:outline-none focus:ring-4 focus:ring-brand-green/20 bg-white/5 text-white text-lg font-bold placeholder:text-slate-500 transition-all shadow-inner"
                        />
                    </div>

                    <div className="space-y-6">
                        {legislations.map((item) => (
                            <div key={item.id} className="group flex flex-col md:flex-row md:items-center justify-between p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-brand-green/30 hover:bg-white/[0.04] transition-all gap-8">
                                <div className="flex items-start gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 text-slate-400 flex items-center justify-center shrink-0 group-hover:bg-brand-green group-hover:text-white transition-all shadow-lg">
                                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-white mb-3 group-hover:text-brand-green transition-colors leading-tight">
                                            {item.title[locale]}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-500">
                                            <span className="px-3 py-1 rounded-lg bg-brand-green/10 text-brand-green border border-brand-green/20">
                                                {content.types[item.type]}
                                            </span>
                                            <span className="opacity-20">•</span>
                                            <span className="text-slate-400">{item.date.split('-')[0]}</span>
                                            <span className="opacity-20">•</span>
                                            <span className="font-mono">{item.id}</span>
                                        </div>
                                    </div>
                                </div>
                                <button 
                                    onClick={() => setSelectedDoc(item)}
                                    className="shrink-0 px-8 py-4 rounded-xl bg-white/5 text-white font-black hover:bg-brand-green hover:text-white border border-white/10 group-hover:border-brand-green/30 transition-all text-sm uppercase tracking-widest shadow-xl"
                                >
                                    {locale === 'ar' ? 'عرض الوثيقة' : 'Voir le document'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <DocModal 
                isOpen={!!selectedDoc} 
                onClose={() => setSelectedDoc(null)} 
                url={selectedDoc?.pdfUrl || ''} 
                title={selectedDoc?.title[locale] || ''} 
            />
        </main>
    );
}
