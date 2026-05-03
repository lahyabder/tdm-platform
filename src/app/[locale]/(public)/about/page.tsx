'use client';

import { use, useEffect, useState } from 'react';
import { useContentStore } from '@/store/useContentStore';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Target, Eye, Shield, Award, Users, MapPin, Zap, Radio, Globe } from 'lucide-react';

export default function AboutPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params) as any;
    const { pages } = useContentStore();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const content = pages.about;
    const isAr = locale === 'ar';

    if (!isClient || !content) return <div className="min-h-screen bg-brand-dark"></div>;

    const stats = [
        { icon: <Zap className="w-5 h-5" />, value: "98%", label: { ar: "تغطية شاملة", fr: "Couverture" } },
        { icon: <Radio className="w-5 h-5" />, value: "45+", label: { ar: "محطة بث", fr: "Stations" } },
        { icon: <Globe className="w-5 h-5" />, value: "100%", label: { ar: "سيادة رقمية", fr: "Souveraineté" } }
    ];

    return (
        <main className="min-h-screen pb-32 pt-28 bg-brand-dark relative waves-pattern selection:bg-brand-green selection:text-white">
            {/* Ultra-Premium Glowing Background */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-gradient-to-b from-brand-green/10 via-brand-dark to-transparent"></div>
                <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-brand-yellow/5 blur-[150px] rounded-full animate-pulse"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                
                {/* 1. Institutional Hero Header */}
                <header className="mb-32 text-center relative">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-xl"
                    >
                        <span className="w-2 h-2 bg-brand-green rounded-full animate-ping"></span>
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">
                            {isAr ? 'البث الإذاعي والتلفزيوني الموريتاني' : 'Télédiffusion de Mauritanie'}
                        </span>
                    </motion.div>
                    
                    <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none mb-8">
                        {isAr ? 'ريادة' : 'Leadership'}{" "}
                        <span className="glow-text-gold">{isAr ? 'المشهد' : 'Digital'}</span>
                        <br />
                        {isAr ? 'الرقمي' : 'Excellence'}
                    </h1>
                    
                    <p className="max-w-2xl mx-auto text-lg text-slate-400 font-medium leading-relaxed mb-12">
                         {isAr ? 'نحن المحرك التقني للسيادة الإعلامية الموريتانية، نربط الوطن بالعالم عبر أحدث تكنولوجيات البث.' : 'Le moteur technologique de la souveraineté médiatique mauritanienne.'}
                    </p>

                    <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                        {stats.map((s, i) => (
                            <div key={i} className="flex flex-col items-center">
                                <div className="text-brand-green mb-2">{s.icon}</div>
                                <span className="text-3xl font-black text-white">{s.value}</span>
                                <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">{s.label[locale as 'ar' | 'fr']}</span>
                            </div>
                        ))}
                    </div>
                </header>

                {/* 2. Director's Word - The Golden Card */}
                <section className="mb-40">
                    <div className="premium-card p-1 md:p-2 group">
                        <div className="bg-slate-950/40 rounded-[2.4rem] p-8 md:p-20 relative overflow-hidden">
                            {/* Abstract signal pattern background */}
                            <div className="absolute inset-0 opacity-10 pointer-events-none">
                                <div className="absolute top-0 right-0 w-full h-full border-[1px] border-white/10 rounded-full scale-150 -translate-y-1/2 translate-x-1/2"></div>
                            </div>

                            <div className="flex flex-col lg:flex-row gap-20 items-center lg:items-start relative z-10">
                                <div className="w-full lg:w-[450px] shrink-0">
                                    <div className="relative">
                                        <div className="absolute -inset-4 bg-brand-green/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                                        <div className="relative rounded-[3.5rem] overflow-hidden border-2 border-white/10 shadow-2xl bg-slate-900">
                                            <img 
                                                src={content.sections.director_word?.image || "/images/dg.png"} 
                                                alt={content.sections.director_word?.author?.[locale]} 
                                                className="w-full h-auto object-contain transition-all duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-105"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                                        </div>
                                        
                                        <div className={`absolute -bottom-8 ${isAr ? '-left-8' : '-right-8'} bg-brand-yellow p-6 rounded-3xl shadow-[0_20px_50px_rgba(255,204,0,0.3)] border border-white/20`}>
                                            <p className="text-black font-black text-lg leading-tight">{content.sections.director_word?.author?.[locale]}</p>
                                            <p className="text-black/60 text-[10px] font-black uppercase tracking-widest mt-1">{isAr ? 'المدير العام' : 'Directeur Général'}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center gap-4 mb-10">
                                        <div className="w-12 h-1 bg-brand-green"></div>
                                        <h2 className="text-2xl font-black text-white tracking-wide">{content.sections.director_word?.title?.[locale]}</h2>
                                    </div>
                                    
                                    <div className="relative">
                                        <p className="text-slate-300 text-xl md:text-2xl leading-[1.8] font-medium italic whitespace-pre-line">
                                            {content.sections.director_word?.content?.[locale]}
                                        </p>
                                    </div>
                                    
                                    <div className="mt-12 pt-12 border-t border-white/10">
                                        <img src="/logo.png" className="h-12 w-auto opacity-30 grayscale brightness-200" alt="TDM Logo" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Strategic Grid */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[
                         { icon: <Target className="w-8 h-8" />, color: 'brand-green', title: { ar: "رؤيتنا", fr: "Notre Vision" }, text: { ar: "أن نكون القوة الدافعة للتحول الرقمي الشامل في الفضاء السمعي البصري الوطني.", fr: "Être le moteur de la transformation numérique nationale." } },
                         { icon: <Eye className="w-8 h-8" />, color: 'brand-yellow', title: { ar: "رسالتنا", fr: "Notre Mission" }, text: { ar: "توفير بنية تحتية تقنية عالمية المستوى تضمن السيادة الإعلامية والانتشار الواسع.", fr: "Fournir une infrastructure de classe mondiale assurant la souveraineté." } },
                         { icon: <Shield className="w-8 h-8" />, color: 'brand-green', title: { ar: "قيمنا", fr: "Nos Valeurs" }, text: { ar: "الالتزام بالتميز التقني، والشفافية المؤسسية، والمسؤولية تجاه المجتمع.", fr: "Engagement envers l'excellence technique et la transparence." } }
                    ].map((item, i) => (
                        <div key={i} className="premium-card p-12 group hover:bg-white/[0.04]">
                            <div className={`w-16 h-16 bg-${item.color}/10 text-${item.color} rounded-2xl flex items-center justify-center mb-8 border border-${item.color}/20 group-hover:scale-110 transition-transform`}>
                                {item.icon}
                            </div>
                            <h3 className="text-2xl font-black text-white mb-4">{item.title[locale as 'ar' | 'fr']}</h3>
                            <p className="text-slate-400 font-medium leading-relaxed">
                                {item.text[locale as 'ar' | 'fr']}
                            </p>
                        </div>
                    ))}
                </section>
            </div>
        </main>
    );
}
