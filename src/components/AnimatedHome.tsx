'use client';

import { motion, useScroll, useTransform, Variants } from 'framer-motion';
import Link from 'next/link';
import { MauritaniaMap } from '@/components/ui/MauritaniaMap';
import { ArrowUpRight, Radio, Activity, Globe2, Network } from 'lucide-react';
import { useRef } from 'react';

export function AnimatedHome({ locale, content }: { locale: string; content: any }) {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"]
    });

    const yBackground = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
    const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

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

    return (
        <div ref={containerRef} className="relative min-h-screen bg-[#050B14] overflow-hidden text-slate-200">
            {/* 1. Radical Hero Section */}
            <motion.section
                style={{ opacity: opacityHero }}
                className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-10 overflow-hidden"
            >
                {/* Immersive Parallax Background */}
                <motion.div style={{ y: yBackground }} className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-brand-green/10 rounded-full blur-[120px] mix-blend-screen mix-blend-mode"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-brand-yellow/10 rounded-full blur-[120px] mix-blend-screen"></div>
                    <div className="absolute top-[40%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] opacity-20 blur-3xl mix-blend-overlay bg-gradient-to-r from-brand-green via-transparent to-brand-red"></div>

                    {/* Abstract Grid Overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_30%,transparent_100%)]"></div>
                </motion.div>

                <div className="relative z-10 w-full mx-auto flex flex-col items-center gap-12 pt-8 lg:pt-16">
                    {/* Top: Huge Typography & Identity */}
                    <motion.div
                        variants={staggeredContainer} initial="hidden" animate="show"
                        className="w-full max-w-4xl px-4 sm:px-6 text-center space-y-8 flex flex-col items-center z-30"
                    >
                        <motion.div variants={itemFadeUp} className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl">
                            <span className="w-2.5 h-2.5 rounded-full bg-brand-green shadow-[0_0_15px_rgba(0,169,92,1)] animate-pulse border border-white/20"></span>
                            <span className="text-sm font-semibold tracking-wide text-white/90">
                                {locale === 'ar' ? 'الشبكة الوطنية الرسمية للإرسال' : 'Réseau National Officiel de Diffusion'}
                            </span>
                        </motion.div>

                        <motion.h1 variants={itemFadeUp} className="text-4xl sm:text-5xl lg:text-7xl font-black leading-[1.2] tracking-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500 block mb-2">
                                {content.hero.title.split(' ').slice(0, 2).join(' ')}
                            </span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-[#00DF7A] to-brand-yellow block text-[0.85em]">
                                {content.hero.title.split(' ').slice(2).join(' ')}
                            </span>
                        </motion.h1>

                        <motion.p variants={itemFadeUp} className="text-lg sm:text-2xl text-slate-400 font-light leading-relaxed max-w-3xl">
                            {content.hero.subtitle}
                        </motion.p>

                        <motion.div variants={itemFadeUp} className="flex flex-wrap justify-center gap-5 pt-4">
                            <Link href={`/${locale}/services`} className="group relative px-8 py-4 bg-white text-[#050B14] font-black rounded-2xl overflow-hidden hover:scale-105 transition-transform flex items-center gap-3">
                                <span className="relative z-10">{content.hero.cta.services}</span>
                                <ArrowUpRight className="w-5 h-5 relative z-10 group-hover:rotate-45 transition-transform" />
                                <div className="absolute inset-0 bg-brand-green translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"></div>
                            </Link>
                            <Link href={`/${locale}/live`} className="group px-8 py-4 bg-[#050B14] border border-white/10 text-white font-bold rounded-2xl hover:bg-white/5 transition-all flex items-center gap-3 backdrop-blur-md">
                                <Radio className="w-5 h-5 text-brand-red animate-pulse" />
                                {content.hero.cta.live}
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Bottom: Massive High-Tech Map Container */}
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, delay: 0.5, type: 'spring' }}
                        className="w-[100vw] lg:w-[95vw] xl:w-[1600px] max-w-full relative z-20 mt-4 md:mt-8 perspective-[1000px]"
                    >
                        <div className="relative w-full h-auto flex flex-col items-center group transition-colors duration-700">

                            {/* High-Tech Grid & Scanline Overlays */}
                            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none opacity-40"></div>
                            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,169,92,0.03)_50%,transparent_100%)] bg-[length:100%_200%] animate-pulse pointer-events-none opacity-40"></div>

                            {/* Corner Accents */}
                            <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-brand-green/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="absolute top-6 right-6 w-8 h-8 border-t-2 border-r-2 border-brand-green/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="absolute bottom-6 left-6 w-8 h-8 border-b-2 border-l-2 border-brand-green/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-brand-green/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                            {/* Inner Glow Orbs */}
                            <div className="absolute top-1/4 right-1/4 w-40 h-40 bg-brand-yellow/10 blur-[80px] pointer-events-none group-hover:bg-brand-yellow/20 transition-colors duration-1000"></div>
                            <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-brand-green/10 blur-[80px] pointer-events-none group-hover:bg-brand-green/20 transition-colors duration-1000"></div>

                            <div className="relative z-10 w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] filter">
                                <MauritaniaMap locale={locale} />
                            </div>
                        </div>

                        {/* Decorative floating badges */}
                        <motion.div
                            animate={{ y: [0, -15, 0] }} transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                            className="absolute -top-6 -right-6 px-4 py-3 bg-[#050B14]/80 border border-brand-green/30 rounded-2xl backdrop-blur-xl shadow-2xl flex items-center gap-3 z-30 hidden sm:flex"
                        >
                            <Globe2 className="w-5 h-5 text-brand-green" />
                            <span className="font-bold text-white text-sm">98% {locale === 'ar' ? 'تغطية' : 'Couverture'}</span>
                        </motion.div>
                        <motion.div
                            animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                            className="absolute -bottom-6 -left-6 px-4 py-3 bg-[#050B14]/80 border border-brand-yellow/30 rounded-2xl backdrop-blur-xl shadow-2xl flex items-center gap-3 z-30 hidden sm:flex"
                        >
                            <Network className="w-5 h-5 text-brand-yellow" />
                            <span className="font-bold text-white text-sm">TNT Live</span>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>

            {/* 2. Radical Glass Statistics */}
            <section className="relative z-30 pt-10 mx-4 md:mx-auto max-w-7xl">
                <motion.div
                    initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }}
                    variants={staggeredContainer}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4"
                >
                    {content.stats.items.map((stat: any, index: number) => (
                        <motion.div
                            key={stat.id} variants={itemFadeUp}
                            className="relative group p-8 rounded-3xl bg-[#0a1120]/80 border border-white/5 backdrop-blur-2xl hover:bg-white/5 transition-colors overflow-hidden"
                        >
                            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${index === 0 ? 'from-brand-green to-transparent' : index === 1 ? 'from-brand-yellow to-transparent' : index === 2 ? 'from-brand-red to-transparent' : 'from-blue-500 to-transparent'}`}></div>

                            <p className={`text-5xl font-black mb-3 tracking-tighter ${index === 0 ? 'text-brand-green' : index === 1 ? 'text-brand-yellow' : index === 2 ? 'text-brand-red' : 'text-blue-400'}`}>
                                {stat.value}
                            </p>
                            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                        </motion.div>
                    ))}
                </motion.div>
            </section >

            {/* 3. Immersive Bento Services */}
            < section className="py-32 relative" >
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                        className="mb-20 space-y-4"
                    >
                        <h2 className="text-5xl md:text-6xl font-black text-white">{content.services.title}</h2>
                        <div className="w-24 h-2 bg-gradient-to-r from-brand-green to-brand-yellow rounded-full"></div>
                    </motion.div>

                    <motion.div
                        variants={staggeredContainer} initial="hidden" whileInView="show" viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[350px]"
                    >
                        {content.services.items.map((service: any, index: number) => (
                            <motion.div
                                key={service.id} variants={itemFadeUp}
                                className={`group relative rounded-[2.5rem] bg-[#0a1120] border border-white/5 p-10 overflow-hidden hover:border-white/15 transition-all duration-500 ${index === 0 ? 'md:col-span-2 md:row-span-2' : index === 3 ? 'md:col-span-2' : ''}`}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent"></div>
                                <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 translate-x-1/2 -translate-y-1/2 pointer-events-none ${index % 2 === 0 ? 'bg-brand-green' : 'bg-brand-yellow'}`}></div>

                                <div className="relative z-10 h-full flex flex-col justify-between">
                                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 group-hover:bg-brand-green group-hover:border-transparent transition-all duration-500">
                                        <Activity className="w-8 h-8 text-slate-400 group-hover:text-white transition-colors" />
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className={`font-black text-white ${index === 0 ? 'text-4xl' : 'text-2xl'}`}>{service.title}</h3>
                                        <p className="text-slate-400 text-lg font-light leading-relaxed max-w-lg">{service.description}</p>
                                    </div>

                                    <div className="absolute bottom-10 rtl:left-10 ltr:right-10 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                        <ArrowUpRight className="w-10 h-10 text-brand-green rtl:-scale-x-100" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section >

            {/* 4. Asymmetrical News & Links Panel */}
            < section className="py-32 relative bg-[#03070c] border-t border-white/5" >
                <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12">

                    {/* Left: Animated News Feed */}
                    <div className="lg:col-span-8 space-y-12">
                        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <h2 className="text-4xl font-black text-white">{content.news.title}</h2>
                        </motion.div>

                        <motion.div variants={staggeredContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid gap-6">
                            {content.news.items.map((newsItem: any) => (
                                <motion.div key={newsItem.id} variants={itemFadeUp}>
                                    <Link href="#" className="group flex flex-col sm:flex-row gap-6 p-6 rounded-3xl bg-[#0a1120] border border-white/5 hover:border-brand-green/30 hover:bg-white/5 transition-all duration-300">
                                        <div className="w-full sm:w-40 shrink-0">
                                            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-green/10 text-brand-green text-xs font-bold tracking-widest">{newsItem.date}</span>
                                        </div>
                                        <div className="space-y-3">
                                            <h3 className="text-xl font-bold text-white group-hover:text-brand-green transition-colors">{newsItem.title}</h3>
                                            <p className="text-slate-400 font-light leading-relaxed">{newsItem.summary}</p>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right: Quick Links & Radical Contact Box */}
                    <div className="lg:col-span-4 space-y-12 block">
                        <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                            <h2 className="text-2xl font-black text-white">{content.quickLinks.title}</h2>
                        </motion.div>

                        <motion.div variants={staggeredContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="space-y-4">
                            {content.quickLinks.items.map((link: any, index: number) => (
                                <motion.div key={link.id} variants={itemFadeUp}>
                                    <Link href={`/${locale}${link.path}`} className="group flex items-center justify-between p-6 rounded-3xl bg-[#0a1120] border border-white/5 hover:bg-brand-yellow hover:border-brand-yellow transition-all duration-300">
                                        <span className="font-bold text-slate-300 group-hover:text-amber-950 transition-colors">{link.title}</span>
                                        <ArrowUpRight className="w-6 h-6 text-slate-500 group-hover:text-amber-950 transition-colors rtl:-scale-x-100" />
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Radical Contact Box */}
                        <motion.div
                            initial={{ opacity: 0, y: 50, scale: 0.9 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }}
                            className="relative overflow-hidden p-10 rounded-[3rem] bg-gradient-to-br from-brand-green to-[#006e3c] text-center"
                        >
                            <div className="absolute top-0 right-0 w-40 h-40 bg-white/20 blur-[50px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                            <div className="relative z-10 space-y-6">
                                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto border border-white/20 shadow-2xl">
                                    <Globe2 className="w-10 h-10 text-white" />
                                </div>
                                <h4 className="text-2xl font-black text-white">{locale === 'ar' ? 'البوابة الإلكترونية' : 'Portail en ligne'}</h4>
                                <p className="text-brand-green-50 font-light text-slate-100">{locale === 'ar' ? 'تواصل معنا لطرح استفساراتك عبر بوابتنا الرسمية.' : 'Contactez-nous pour vos requêtes via notre portail officiel.'}</p>
                                <Link href={`/${locale}/contact`} className="inline-block w-full py-4 bg-white text-brand-green font-black rounded-2xl hover:scale-105 active:scale-95 transition-transform shadow-xl">
                                    {locale === 'ar' ? 'اتصل بنا الآن' : 'Contactez-nous'}
                                </Link>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </section >
        </div >
    );
}
