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
                
                {/* Director's Word - Premium Redesign */}
                <section className="relative max-w-5xl mx-auto mb-24 mt-12">
                    <div className="bg-gradient-to-br from-[#0a1628] to-[#050b14] rounded-[3rem] border border-white/10 p-8 md:p-12 shadow-2xl relative overflow-hidden group">
                        
                        {/* Decorative Background Elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-green/5 blur-[100px] rounded-full -mr-32 -mt-32"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-yellow/5 blur-[100px] rounded-full -ml-32 -mb-32"></div>

                        <div className="flex flex-col lg:flex-row gap-12 items-center lg:items-start relative z-10">
                            
                            {/* Prominent Portrait Container */}
                            <div className="w-full lg:w-[40%] shrink-0 text-center lg:text-start">
                                <div className="relative mx-auto lg:mx-0">
                                    <div className="absolute inset-0 bg-brand-green/20 blur-3xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-1000 opacity-30"></div>
                                    <div className="relative rounded-[2.5rem] overflow-hidden border border-white/20 shadow-2xl bg-brand-dark/40 backdrop-blur-sm group-hover:border-brand-green/50 transition-colors duration-500">
                                        <img 
                                            src={content.sections.director_word?.image || "/images/dg.png"} 
                                            alt={content.sections.director_word?.author?.[locale]} 
                                            className="w-full h-auto max-h-[500px] object-contain transition-all duration-700 hover:scale-105"
                                        />
                                    </div>
                                    
                                    {/* Signature Badge */}
                                    <div className={`absolute -bottom-6 ${isAr ? '-left-4' : '-right-4'} bg-brand-green px-6 py-3 rounded-2xl shadow-xl border border-white/10 hidden md:block`}>
                                        <p className="text-white text-xs font-black uppercase tracking-tighter whitespace-nowrap">
                                            {isAr ? 'المدير العام' : 'Directeur Général'}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="mt-12 space-y-2 px-4 lg:px-0">
                                    <h3 className="text-2xl font-black text-white leading-tight">
                                        {content.sections.director_word?.author?.[locale]}
                                    </h3>
                                    <div className="w-12 h-1 bg-brand-green rounded-full mx-auto lg:mx-0"></div>
                                </div>
                            </div>

                            {/* Refined Content Area */}
                            <div className="flex-1 space-y-8">
                                <div className="flex items-center gap-4">
                                    <span className="h-px w-12 bg-brand-yellow/50"></span>
                                    <span className="text-brand-yellow text-xs font-black uppercase tracking-[0.2em]">
                                        {content.sections.director_word?.title?.[locale]}
                                    </span>
                                </div>

                                <div className="relative">
                                    <svg className={`absolute -top-6 ${isAr ? '-right-6' : '-left-6'} w-12 h-12 text-white/5`} fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H15.017C14.4647 8 14.017 8.44772 14.017 9V11M14.017 21H7.017C5.91243 21 5.017 20.1046 5.017 19V12C5.017 10.8954 5.91243 10 7.017 10H10.017C10.5693 10 11.017 9.55228 11.017 9V5C11.017 4.44772 10.5693 4 10.017 4H5.017C4.46472 4 4.017 4.44772 4.017 5V12.5C4.017 13.0523 4.46472 13.5 5.017 13.5H9.017C9.56928 13.5 10.017 13.9477 10.017 14.5V17C10.017 17.5523 9.56928 18 9.017 18H5.017C4.46472 18 4.017 18.4477 4.017 19V21H14.017Z" />
                                    </svg>
                                    <p className="text-slate-200 text-base md:text-lg leading-[1.8] whitespace-pre-line font-light italic">
                                        {content.sections.director_word?.content?.[locale]}
                                    </p>
                                </div>

                                <div className="pt-8 flex justify-end">
                                    <div className="flex flex-col items-end opacity-40 group-hover:opacity-100 transition-opacity duration-1000">
                                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2">{isAr ? 'الإدارة العامة' : 'Direction Générale'}</div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-full bg-brand-green/20 flex items-center justify-center">
                                                <div className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse"></div>
                                            </div>
                                            <span className="text-white font-bold text-xs">TDM - 2024</span>
                                        </div>
                                    </div>
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
                                    <h2 className="text-xl font-black text-white">{section.title?.[locale]}</h2>
                                </div>
                                <p className="text-slate-400 leading-relaxed text-sm">
                                    {section.content?.[locale]}
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
