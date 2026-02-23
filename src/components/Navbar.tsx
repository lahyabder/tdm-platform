'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Menu, X, ChevronDown, Activity, Radio, FileText, Blocks, Building2, Map, ShieldAlert } from 'lucide-react';

export function Navbar({ locale, dict }: { locale: string; dict: any }) {
    const pathname = usePathname();
    const nextLocale = locale === 'ar' ? 'fr' : 'ar';
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleLanguage = () => {
        if (!pathname) return '/';
        const segments = pathname.split('/');
        if (segments[1] === locale) {
            segments[1] = nextLocale;
        } else {
            segments.splice(1, 0, nextLocale);
        }
        return segments.join('/') || '/';
    };

    const navLinks = [
        { name: locale === 'ar' ? 'المؤسسة' : 'Institution', path: `/${locale}/about`, icon: Building2 },
        { name: locale === 'ar' ? 'الخدمات' : 'Services', path: `/${locale}/services`, icon: Blocks },
        { name: locale === 'ar' ? 'البث الحي' : 'Direct', path: `/${locale}/live`, icon: Radio },
        { name: locale === 'ar' ? 'البيانات' : 'Données', path: `/${locale}/data`, icon: Activity },
        { name: locale === 'ar' ? 'سجل المنشآت' : 'Registre', path: `/${locale}/data/media-facilities`, icon: Map },
        { name: locale === 'ar' ? 'الصفقات' : 'Marchés', path: `/${locale}/tenders`, icon: FileText },
        { name: dict.dashboard, path: `/${locale}/admin`, icon: ShieldAlert },
    ];

    return (
        <>
            {/* Floating Pill Navbar Wrapper */}
            <motion.div
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                className={`fixed top-6 left-0 right-0 z-[100] flex justify-center px-4 transition-all duration-500`}
            >
                <div className={`relative px-2 py-2 flex items-center justify-between gap-6 transition-all duration-500 overflow-hidden ${scrolled ? 'w-[calc(100%-2rem)] max-w-4xl bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)]' : 'w-full max-w-7xl bg-transparent'}`}>

                    {/* Logo & Identity */}
                    <Link href={`/${locale}`} className="flex items-center gap-3 relative z-20 pl-4 rtl:pl-0 rtl:pr-4 group shrink-0">
                        <div className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-lg group-hover:scale-110 transition-transform shrink-0 relative overflow-hidden border-2 border-slate-900/10">
                            <img src="/logo.png" alt="TDM Logo" className="w-[85%] h-[85%] object-contain" />
                        </div>
                        <div className={`flex flex-col ${scrolled ? 'opacity-0 w-0' : 'opacity-100'} transition-all duration-300 overflow-hidden whitespace-nowrap hidden sm:flex`}>
                            <span className="font-extrabold text-lg tracking-tight text-white drop-shadow-md leading-none">
                                {locale === 'ar' ? 'البث الإذاعي والتلفزي الموريتاني' : 'Télédiffusion de Mauritanie'}
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Center Links (visible only when not heavily scrolled or if screen is large enough) */}
                    <div className="hidden lg:flex items-center justify-center absolute left-1/2 -translate-x-1/2 z-10">
                        <div className={`flex items-center gap-1 p-1 bg-white/5 backdrop-blur-md rounded-full border border-white/10 transition-all duration-500 ${scrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                            {navLinks.slice(0, 4).map((link) => (
                                <Link key={link.path} href={link.path} className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${pathname === link.path ? 'bg-white/10 text-white shadow-inner' : 'text-slate-300 hover:text-white hover:bg-white/5'}`}>
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Controls (Lang + Menu Toggle) */}
                    <div className="flex items-center gap-2 relative z-20 pr-2 rtl:pr-0 rtl:pl-2 shrink-0">
                        <Link
                            href={toggleLanguage()}
                            className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-600 text-brand-yellow font-bold backdrop-blur-md transition-all hover:scale-105 active:scale-95 shrink-0 shadow-lg"
                            title={dict.switchLang}
                        >
                            <span className="text-sm tracking-widest leading-none mt-1">{locale === 'ar' ? 'FR' : 'عربي'}</span>
                        </Link>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center gap-2 px-4 h-10 rounded-full bg-brand-green hover:bg-brand-green/90 text-white font-bold backdrop-blur-md transition-all shadow-[0_0_20px_rgba(0,169,92,0.3)] hover:scale-105 active:scale-95 shrink-0"
                        >
                            <span className="hidden sm:inline-block">{locale === 'ar' ? 'القائمة' : 'Menu'}</span>
                            <motion.div animate={{ rotate: isOpen ? 90 : 0 }}>
                                {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </motion.div>
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Fullscreen Overlay Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
                        animate={{ opacity: 1, clipPath: 'circle(150% at top right)' }}
                        exit={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed inset-0 z-[90] bg-slate-950/95 backdrop-blur-3xl overflow-y-auto flex flex-col justify-start lg:justify-center pt-28 pb-12 lg:py-0"
                    >
                        {/* Decorative Background Glows */}
                        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-brand-green/20 rounded-full blur-[100px]"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-yellow/10 rounded-full blur-[100px]"></div>

                        <div className="max-w-7xl w-full mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-12 relative z-10">

                            <motion.div
                                initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
                                className="col-span-1 lg:col-span-2 space-y-12"
                            >
                                <div>
                                    <h2 className="text-sm font-bold text-brand-green tracking-widest uppercase mb-6 px-4">{locale === 'ar' ? 'الشبكة الرئيسية' : 'Réseau Principal'}</h2>
                                    <div className="grid sm:grid-cols-2 gap-4">
                                        {navLinks.map((link, index) => {
                                            const Icon = link.icon;
                                            return (
                                                <motion.div key={link.path} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + (index * 0.05) }}>
                                                    <Link
                                                        href={link.path}
                                                        onClick={() => setIsOpen(false)}
                                                        className="group flex items-center gap-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 transition-all backdrop-blur-sm"
                                                    >
                                                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:bg-brand-green/20 group-hover:text-brand-green group-hover:border-brand-green/30 transition-all text-slate-400">
                                                            <Icon className="w-6 h-6" />
                                                        </div>
                                                        <span className="text-xl font-bold text-white group-hover:text-brand-green transition-colors">{link.name}</span>
                                                    </Link>
                                                </motion.div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6, duration: 0.5 }}
                                className="col-span-1 border-t md:border-t-0 md:border-l border-white/10 pt-12 md:pt-0 pl-0 md:pl-12 flex flex-col justify-center"
                            >
                                <div className="space-y-6">
                                    <div className="w-28 h-28 flex items-center justify-center mb-8">
                                        <img src="/logo.png" alt="TDM Logo" className="w-full h-full object-contain drop-shadow-2xl" />
                                    </div>
                                    <h3 className="text-3xl font-extrabold text-white leading-tight">
                                        {locale === 'ar' ? 'الريادة في البث الرقمي الموريتاني.' : 'Leader de la diffusion numérique en Mauritanie.'}
                                    </h3>
                                    <p className="text-slate-400 text-lg font-light leading-relaxed">
                                        {locale === 'ar' ? 'حلول بث احترافية، بنية تحتية وطنية، وبيانات شفافة للجميع.' : 'Solutions de diffusion professionnelles, infrastructure nationale et données transparentes pour tous.'}
                                    </p>
                                    <div className="pt-6 flex gap-4">
                                        <Link href={`/${locale}/contact`} onClick={() => setIsOpen(false)} className="px-6 py-3 bg-brand-green text-white font-bold rounded-full hover:bg-brand-green/80 transition-colors">
                                            {locale === 'ar' ? 'اتصل بنا' : 'Contactez-nous'}
                                        </Link>
                                    </div>
                                    <div className="pt-6 border-t border-white/10 mt-6 flex gap-2 w-full h-1">
                                        <div className="h-full bg-brand-green w-1/2 rounded-full"></div>
                                        <div className="h-full bg-brand-yellow w-1/4 rounded-full"></div>
                                        <div className="h-full bg-brand-red w-1/4 rounded-full"></div>
                                    </div>
                                </div>
                            </motion.div>

                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
