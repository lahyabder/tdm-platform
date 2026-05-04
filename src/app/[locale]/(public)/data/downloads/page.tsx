'use client';

import Link from 'next/link';
import { use, useState, useEffect } from 'react';
import { useDownloadStore } from '@/store/useDownloadStore';

export default function DownloadsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const resolvedParams = use(params) as any;
    const locale = resolvedParams.locale as "ar" | "fr";
    const { files } = useDownloadStore();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const content = {
        ar: {
            title: "نماذج وملفات للتحميل",
            subtitle: "استمارات التراخيص، دفاتر الشروط الفنية، والنماذج المتعلقة بالرسوم.",
            back: "العودة لبوابة البيانات",
            categories: {
                forms: "نماذج",
                technical: "تقني",
                guides: "أدلة"
            },
            downloadBtn: "تحميل"
        },
        fr: {
            title: "Formulaires et Téléchargements",
            subtitle: "Formulaires de licence, cahiers des charges techniques et modèles de frais.",
            back: "Retour au portail",
            categories: {
                forms: "Formulaires",
                technical: "Technique",
                guides: "Guides"
            },
            downloadBtn: "Télécharger"
        }
    }[locale];

    if (!isClient) return <div className="min-h-screen bg-brand-dark"></div>;

    return (
        <main className="min-h-screen pb-32 bg-mesh" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
            {/* Header */}
            <section className="bg-brand-dark pt-32 pb-48 text-white relative overflow-hidden">
                <div className="absolute inset-0">
                    <img src="/data_bg.jpg" alt="Data background" className="w-full h-full object-cover opacity-10 mix-blend-luminosity" />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-dark/90 to-brand-dark"></div>
                </div>
                
                <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
                    <Link href={`/${locale}/data`} className="inline-flex items-center gap-2 text-brand-red hover:underline mb-8 font-black uppercase tracking-widest text-xs">
                        {locale === 'ar' ? '←' : '→'} {content.back}
                    </Link>
                    <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-tight glow-text-gold">
                        {content.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl mx-auto font-medium">
                        {content.subtitle}
                    </p>
                </div>
            </section>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 -mt-24 relative z-20">
                <div className="premium-card p-6 md:p-10 shadow-2xl border-white/5">
                    <div className="grid grid-cols-1 gap-6">
                        {files.map((file) => (
                            <div key={file.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl border border-white/10 hover:border-brand-red/40 hover:bg-white/5 transition-all gap-6 group">
                                <div className="flex items-start gap-6">
                                    <div className="w-16 h-16 rounded-2xl bg-brand-red/10 text-brand-red flex items-center justify-center shrink-0 border border-brand-red/20 group-hover:scale-110 transition-transform">
                                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                    </div>
                                    <div className="min-w-0">
                                        <h3 className="font-black text-white text-xl mb-2 group-hover:text-brand-red transition-colors leading-tight truncate">
                                            {file.title[locale]}
                                        </h3>
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                                            <span className="inline-block px-3 py-1 rounded-lg bg-white/5 text-brand-yellow border border-white/5">
                                                {content.categories[file.category as keyof typeof content.categories]}
                                            </span>
                                            <span className="text-slate-300">{file.type}</span>
                                            <span className="opacity-30">•</span>
                                            <span>{file.size}</span>
                                        </div>
                                    </div>
                                </div>
                                <a 
                                    href={file.url} 
                                    download 
                                    className="shrink-0 px-8 py-4 rounded-xl bg-brand-red text-white font-black hover:bg-red-700 shadow-xl border border-transparent transition-all self-start md:self-auto flex items-center justify-center gap-3 group-hover:scale-105"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    {content.downloadBtn}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
