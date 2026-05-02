'use client';

import { use, useEffect, useState } from 'react';
import { useContentStore } from '@/store/useContentStore';

export default function AboutPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const resolvedParams = use(params) as any;
    const locale = resolvedParams.locale;
    const isAr = locale === 'ar';
    const { getPageContent } = useContentStore();
    const [content, setContent] = useState<any>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        setContent(getPageContent('about'));
    }, [getPageContent]);

    if (!isClient || !content) return <div className="min-h-screen bg-brand-dark"></div>;

    return (
        <main className="min-h-screen pb-20 pt-20">
            <div className="max-w-6xl mx-auto px-6">
                
                {/* Director's Word / Compact Hero */}
                <section className="relative max-w-4xl mx-auto mb-20">
                    <div className="bg-brand-card/40 backdrop-blur-xl rounded-3xl border border-white/10 p-6 md:p-8 shadow-xl relative overflow-hidden group">
                        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                            
                            {/* Compact Portrait */}
                            <div className="shrink-0 text-center">
                                <div className="w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-2 border-white/10 shadow-lg relative z-10 mx-auto">
                                    <img 
                                        src={content.sections.director_word?.image || "/images/dg.png"} 
                                        alt={content.sections.director_word?.author} 
                                        className="w-full h-full object-cover transition-all duration-700"
                                    />
                                </div>
                                <div className="mt-4">
                                    <h3 className="text-lg font-black text-white leading-tight">{content.sections.director_word?.author}</h3>
                                    <p className="text-brand-green text-[10px] font-black uppercase tracking-widest mt-1">
                                        {isAr ? 'المدير العام' : 'Directeur Général'}
                                    </p>
                                </div>
                            </div>

                            {/* Compact Content */}
                            <div className="flex-1 space-y-4">
                                <div className="flex items-center gap-3">
                                    <span className="h-px w-6 bg-brand-yellow/50"></span>
                                    <span className="text-brand-yellow text-[10px] font-black uppercase tracking-widest">{content.sections.director_word?.title}</span>
                                </div>

                                <div className="prose prose-invert max-w-none">
                                    <p className="text-slate-200 text-sm md:text-base leading-relaxed whitespace-pre-line opacity-90 italic">
                                        {content.sections.director_word?.content}
                                    </p>
                                </div>

                                <div className="pt-4 border-t border-white/5 flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full border border-brand-green/30 flex items-center justify-center p-1.5 bg-brand-green/5">
                                        <img src="/logo.png" alt="TDM" className="w-full h-auto opacity-40" />
                                    </div>
                                    <p className="text-slate-500 text-[9px] uppercase tracking-widest">{isAr ? 'الإدارة العامة - TDM' : 'Direction Générale - TDM'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Additional Sections */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {Object.entries(content.sections).map(([key, section]: [string, any], idx) => {
                        if (key === 'director_word') return null;
                        return (
                            <motion.div
                                key={key}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-brand-card/30 backdrop-blur-sm p-8 rounded-2xl border border-white/5 hover:border-brand-green/30 transition-all group"
                            >
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-10 h-10 rounded-lg bg-brand-green/10 flex items-center justify-center text-brand-green font-black group-hover:bg-brand-green group-hover:text-brand-dark transition-all">
                                        {idx}
                                    </div>
                                    <h2 className="text-xl font-black text-white">{section.title}</h2>
                                </div>
                                <p className="text-slate-400 leading-relaxed text-sm">
                                    {section.content}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}

// Added motion import since I used it
import { motion } from 'framer-motion';
