'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Radio, Newspaper, Search } from 'lucide-react';
import { use } from 'react';

export default function NotFound({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = use(params) as any;
    const isAr = locale === 'ar';

    return (
        <main className="min-h-screen bg-brand-dark flex items-center justify-center p-6 relative overflow-hidden waves-pattern">
            {/* Background Glows */}
            <div className="absolute top-0 start-0 w-[500px] h-[500px] bg-brand-green/10 blur-[120px] rounded-full"></div>
            <div className="absolute bottom-0 end-0 w-[500px] h-[500px] bg-brand-yellow/5 blur-[120px] rounded-full"></div>

            <div className="max-w-2xl w-full text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mb-12"
                >
                    <div className="w-32 h-32 bg-white/5 border border-white/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-8 relative">
                        <Search className="w-12 h-12 text-brand-green" />
                        <div className="absolute -top-2 -end-2 w-10 h-10 bg-brand-red rounded-full flex items-center justify-center text-white font-black text-xs border-4 border-brand-dark">
                            404
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
                        {isAr ? 'عذراً، الصفحة' : 'Oups, Page'}{" "}
                        <span className="glow-text-gold">{isAr ? 'غير موجودة' : 'Introuvable'}</span>
                    </h1>
                    <p className="text-xl text-slate-400 font-medium leading-relaxed mb-12">
                        {isAr 
                            ? 'يبدو أن الرابط الذي تحاول الوصول إليه غير صحيح أو تم نقله لمكان آخر.' 
                            : 'Il semble que le lien que vous essayez d\'accéder est incorrect ou a été déplacé.'}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Link href={`/${locale}`} className="premium-card p-6 flex flex-col items-center gap-4 group hover:bg-brand-green/10 transition-all">
                        <Home className="w-6 h-6 text-brand-green" />
                        <span className="text-sm font-bold text-white">{isAr ? 'الرئيسية' : 'Accueil'}</span>
                    </Link>
                    <Link href={`/${locale}/live`} className="premium-card p-6 flex flex-col items-center gap-4 group hover:bg-brand-green/10 transition-all">
                        <Radio className="w-6 h-6 text-brand-green" />
                        <span className="text-sm font-bold text-white">{isAr ? 'البث المباشر' : 'En Direct'}</span>
                    </Link>
                    <Link href={`/${locale}/news`} className="premium-card p-6 flex flex-col items-center gap-4 group hover:bg-brand-green/10 transition-all">
                        <Newspaper className="w-6 h-6 text-brand-green" />
                        <span className="text-sm font-bold text-white">{isAr ? 'الأخبار' : 'Actualités'}</span>
                    </Link>
                </div>

                <div className="mt-16">
                    <Link href={`/${locale}`} className="text-brand-green font-black uppercase tracking-widest text-xs hover:text-brand-yellow transition-colors">
                        {isAr ? 'العودة للمنصة الرئيسية' : 'Retour à la plateforme'}
                    </Link>
                </div>
            </div>
        </main>
    );
}
