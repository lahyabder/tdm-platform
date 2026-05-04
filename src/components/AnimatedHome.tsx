'use client';

import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import Link from 'next/link';
import { useContentStore } from '@/store/useContentStore';
import { MauritaniaMap } from '@/components/ui/MauritaniaMap';
import { ArrowUpRight, Radio, Zap, Tv, Share2, ArrowRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

export function AnimatedHome({ locale, content: initialContent }: { locale: string; content: any }) {
    const containerRef = useRef(null);
    const { pages, fetchContent } = useContentStore();
    const [hasFetched, setHasFetched] = useState(false);
    
    useEffect(() => {
        fetchContent().then(() => setHasFetched(true));
    }, []);

    const content = hasFetched ? pages.home : initialContent;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    if (!content) return <div className="min-h-screen bg-brand-dark"></div>;

    const isAr = locale === 'ar';
    const hero = content.sections.hero || {};
    const stats = content.sections.stats?.items || [];
    const news = content.sections.news?.items || [];
    const services = pages.services?.sections?.items?.slice(0, 3) || [];

    const staggeredContainer: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.3 }
        }
    };

    const itemFadeUp: Variants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: "tween", duration: 0.5, ease: "easeOut" } }
    };

    const serviceIcons = [<Tv className="w-8 h-8" />, <Radio className="w-6 h-6" />, <Share2 className="w-6 h-6" />];

    return (
        <div ref={containerRef} className="relative min-h-screen bg-brand-dark waves-pattern overflow-hidden text-slate-200 selection:bg-brand-green selection:text-white">
            
            {/* 1. Radical Hero Section */}
            <motion.section
                style={{ opacity: opacityHero }}
                className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-10 overflow-hidden"
            >
                <motion.div style={{ y: yBackground }} className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-brand-green/10 rounded-full blur-[120px] opacity-40"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-brand-yellow/5 rounded-full blur-[120px] opacity-40"></div>
                </motion.div>

                <div className="relative z-10 w-full mx-auto flex flex-col items-center gap-12 pt-8 lg:pt-16">
                    <motion.div
                        variants={staggeredContainer} initial="hidden" animate="show"
                        className="w-full max-w-6xl px-6 text-center space-y-8 flex flex-col items-center z-30"
                    >
                        <motion.div variants={itemFadeUp} className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl">
                            <Zap className="w-4 h-4 text-brand-yellow animate-pulse" />
                            <span className="text-[10px] font-black tracking-[0.3em] text-slate-300 uppercase">
                                {isAr ? 'الشبكة الوطنية الرسمية للإرسال' : 'Réseau National Officiel de Diffusion'}
                            </span>
                        </motion.div>

                        <motion.h1 variants={itemFadeUp} className="text-5xl sm:text-7xl lg:text-9xl font-black leading-none tracking-tighter">
                            <span className="text-white block mb-4">
                                {hero.title?.[locale] || (isAr ? 'نحن نصل' : 'Connecting')}
                            </span>
                            <span className="glow-text-gold block">
                                {isAr ? 'بكم للجميع' : 'The Nation'}
                            </span>
                        </motion.h1>

                        <motion.p variants={itemFadeUp} className="text-lg sm:text-2xl text-slate-400 font-medium leading-relaxed max-w-3xl mx-auto">
                            {hero.subtitle?.[locale]}
                        </motion.p>

                        <motion.div variants={itemFadeUp} className="flex flex-wrap justify-center gap-6 pt-8">
                            <Link href={`/${locale}/services`} className="glass-button bg-brand-green border-brand-green text-white shadow-[0_10px_40px_rgba(0,169,92,0.3)]">
                                {hero.cta?.services?.[locale] || (isAr ? 'خدماتنا' : 'Services')}
                            </Link>
                            <Link href={`/${locale}/live`} className="glass-button flex items-center gap-3">
                                <div className="w-2 h-2 rounded-full bg-brand-red animate-ping" />
                                {isAr ? 'البث المباشر' : 'Live Streaming'}
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Bottom: Map Container */}
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.5, delay: 0.4, type: 'spring' }}
                        className="w-[100vw] lg:w-[95vw] xl:w-[1600px] max-w-full relative z-20 mt-12 perspective-[1500px]"
                    >
                        <div className="relative w-full h-full drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
                            <MauritaniaMap locale={locale} />
                        </div>
                    </motion.div>
                </div>
            </motion.section>

            {/* 2. Dynamic Bento Services */}
            <section className="py-40 relative z-30">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8"
                    >
                        <div className="space-y-4">
                            <p className="text-brand-green font-black text-sm uppercase tracking-[0.3em]">{isAr ? 'بنيتنا التحتية' : 'Infrastructure'}</p>
                            <h2 className="text-5xl md:text-7xl font-black text-white leading-tight">
                                {isAr ? 'خدماتنا' : 'Our'}<br/>
                                <span className="glow-text-gold">{isAr ? 'الرقمية' : 'Digital'}</span>
                            </h2>
                        </div>
                        <Link href={`/${locale}/services`} className="glass-button inline-flex items-center gap-3 group">
                            {isAr ? 'عرض الكل' : 'Voir tout'}
                            <ArrowRight className={`w-5 h-5 group-hover:translate-x-2 transition-transform ${isAr ? 'rotate-180 group-hover:-translate-x-2' : ''}`} />
                        </Link>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                        {services.map((service: any, idx: number) => (
                            <motion.div 
                                key={service.id}
                                initial={{ opacity: 0, scale: 0.95 }} 
                                whileInView={{ opacity: 1, scale: 1 }} 
                                viewport={{ once: true }} 
                                className={`${idx === 0 ? 'md:col-span-8' : 'md:col-span-4'} group`}
                            >
                                <div className={`premium-card p-10 h-full flex flex-col justify-between relative overflow-hidden group hover:bg-white/[0.04]`}>
                                    <div className="relative z-10">
                                        <div className="w-12 h-12 bg-brand-green/10 text-brand-green rounded-xl flex items-center justify-center mb-6 border border-brand-green/20 group-hover:bg-brand-green group-hover:text-white transition-all">
                                            {serviceIcons[idx] || <Zap className="w-6 h-6" />}
                                        </div>
                                        <h3 className={`${idx === 0 ? 'text-4xl' : 'text-2xl'} font-black text-white mb-4 leading-tight`}>{service.title?.[locale]}</h3>
                                        <p className="text-slate-400 font-medium text-sm leading-relaxed">{service.description?.[locale]}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 3. Dynamic News Section */}
            <section className="py-40 bg-slate-950/20 relative border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex items-center justify-between mb-20">
                        <h2 className="text-4xl font-black text-white">{content.sections.news?.title?.[locale]}</h2>
                        <Link href={`/${locale}/news`} className="text-brand-green font-black text-sm uppercase tracking-widest hover:text-brand-yellow transition-colors">{isAr ? 'جميع الأخبار' : 'Toutes les actualités'}</Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {news.slice(0, 3).map((newsItem: any, i: number) => (
                            <motion.div
                                key={newsItem.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                            >
                                <Link href={`/${locale}/news/${newsItem.id}`} className="group block h-full">
                                    <div className="premium-card p-8 h-full flex flex-col group-hover:border-brand-green/30 transition-all">
                                        <div className="mb-6 flex items-center justify-between">
                                            <span className="text-[10px] font-black text-brand-green uppercase tracking-[0.2em] px-3 py-1 bg-brand-green/10 rounded-full">{newsItem.date}</span>
                                            <ArrowUpRight className="w-5 h-5 text-slate-600 group-hover:text-brand-green group-hover:rotate-45 transition-all" />
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-4 group-hover:text-brand-green transition-colors leading-tight">{newsItem.title?.[locale]}</h3>
                                        <p className="text-slate-400 text-sm font-medium leading-relaxed line-clamp-3 mb-6 flex-1">{newsItem.summary?.[locale]}</p>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
