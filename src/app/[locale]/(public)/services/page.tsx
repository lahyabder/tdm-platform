'use client';

import { useState, useEffect, use } from 'react';
import { useContentStore } from '@/store/useContentStore';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Tv, Radio, Zap, ArrowRight, Share2, Database, ShieldCheck } from 'lucide-react';

export default function ServicesPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params) as any;
    const { pages, fetchContent, isLoading } = useContentStore();
    const [isClient, setIsClient] = useState(false);
    const [hasFetched, setHasFetched] = useState(false);

    useEffect(() => {
        setIsClient(true);
        fetchContent().then(() => setHasFetched(true));
    }, []);

    const content = pages.services;
    const isAr = locale === 'ar';

    if (!isClient) return <div className="min-h-screen bg-brand-dark"></div>;
    
    // Prevent flashing initial content by waiting for the fetch to complete
    if (!hasFetched || isLoading) {
        return (
            <div className="min-h-screen bg-brand-dark flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-brand-green border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!content) return <div className="min-h-screen bg-brand-dark"></div>;

    const servicesItems = content.sections.items || [];

    return (
        <main className="min-h-screen pb-32 pt-28 bg-brand-dark waves-pattern relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-green/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-yellow/5 blur-[120px] rounded-full"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <header className="mb-24 text-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6"
                    >
                        <Zap className="w-3.5 h-3.5 text-brand-yellow" />
                        <span className="text-[10px] font-black text-brand-yellow uppercase tracking-[0.3em]">
                            {isAr ? 'حلول بث متكاملة' : 'Integrated Solutions'}
                        </span>
                    </motion.div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-tight">
                        {isAr ? 'خدماتنا' : 'Our Services'}{" "}
                        <span className="glow-text-gold">{isAr ? 'الاستراتيجية' : 'Strategic'}</span>
                    </h1>
                    
                    <p className="max-w-2xl mx-auto text-lg text-slate-400 font-medium leading-relaxed">
                        {content.title?.[locale as 'ar' | 'fr']}
                    </p>
                </header>

                {/* Services Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {servicesItems.map((item: any, i: number) => (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link href={`/${locale}/services/${item.id}`} className="group block h-full">
                                <div className="premium-card h-full p-10 flex flex-col hover:bg-white/[0.04] relative overflow-hidden">
                                    {/* Decoration */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/5 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
                                    
                                    <div className="w-16 h-16 bg-brand-green/10 text-brand-green rounded-2xl flex items-center justify-center mb-8 border border-brand-green/20 group-hover:bg-brand-green group-hover:text-white transition-all duration-500 shadow-xl shadow-brand-green/5">
                                        {item.icon || <Zap className="w-8 h-8" />}
                                    </div>
                                    
                                    <h3 className="text-2xl font-black text-white mb-6 group-hover:text-brand-green transition-colors duration-300">
                                        {item.title[locale as 'ar' | 'fr']}
                                    </h3>
                                    
                                    <p className="text-slate-400 font-medium leading-relaxed mb-8 flex-1">
                                        {item.description[locale as 'ar' | 'fr']}
                                    </p>
                                    
                                    <div className="space-y-3 mb-10">
                                        {(item.features?.[locale as 'ar' | 'fr'] || []).map((f: any, idx: number) => (
                                            <div key={idx} className="flex items-center gap-3">
                                                <div className="w-1.5 h-1.5 bg-brand-yellow rounded-full"></div>
                                                <span className="text-xs font-bold text-slate-300">{f}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-2 text-sm font-black text-brand-green group-hover:gap-4 transition-all">
                                        <span>{isAr ? 'استكشف الخدمة' : 'Explorer la service'}</span>
                                        <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom CTA */}
                <div className="mt-32 p-12 bg-gradient-to-br from-brand-green/20 to-brand-yellow/5 rounded-[3rem] border border-white/10 text-center relative overflow-hidden group">
                    <div className="absolute inset-0 bg-mesh opacity-30"></div>
                    <div className="relative z-10">
                        <ShieldCheck className="w-12 h-12 text-brand-green mx-auto mb-6" />
                        <h2 className="text-3xl font-black text-white mb-4">
                            {isAr ? 'هل تحتاج إلى استشارة تقنية؟' : 'Besoin d\'une consultation technique ?'}
                        </h2>
                        <p className="text-slate-300 font-medium mb-10 max-w-xl mx-auto">
                            {isAr ? 'فريقنا من الخبراء جاهز لتقديم أفضل الحلول المخصصة لاحتياجاتكم في مجال البث ونقل البيانات.' : 'Nos experts sont prêts à fournir les meilleures solutions pour vos besoins.'}
                        </p>
                        <Link href={`/${locale}/contact`} className="glass-button inline-block">
                            {isAr ? 'تواصل معنا الآن' : 'Contactez-nous maintenant'}
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    );
}
