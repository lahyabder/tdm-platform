'use client';

import { useState, use, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Calendar, Tag, ChevronRight, Share2, Newspaper, ArrowRight } from 'lucide-react';
import { useNewsStore } from '@/store/useNewsStore';

const tagColors: Record<string, string> = {
    "تقنية": "bg-brand-green/20 text-brand-green border-brand-green/30",
    "مؤسسة": "bg-brand-yellow/20 text-brand-yellow border-brand-yellow/30",
    "زيارات": "bg-blue-500/20 text-blue-300 border-blue-500/30",
    "فعاليات": "bg-purple-500/20 text-purple-300 border-purple-500/30",
    "دولي": "bg-brand-red/20 text-brand-red border-brand-red/30",
    "تدريب": "bg-teal-500/20 text-teal-300 border-teal-500/30",
    "إعلانات": "bg-orange-500/20 text-orange-300 border-orange-500/30",
    "Technologie": "bg-brand-green/20 text-brand-green border-brand-green/30",
    "Institutionnel": "bg-brand-yellow/20 text-brand-yellow border-brand-yellow/30",
    "Visites": "bg-blue-500/20 text-blue-300 border-blue-500/30",
    "Événements": "bg-purple-500/20 text-purple-300 border-purple-500/30",
    "International": "bg-brand-red/20 text-brand-red border-brand-red/30",
    "Formation": "bg-teal-500/20 text-teal-300 border-teal-500/30",
    "Communiqués": "bg-orange-500/20 text-orange-300 border-orange-500/30",
};

export default function NewsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params) as any;
    const { articles } = useNewsStore();
    const [selectedArticle, setSelectedArticle] = useState<any>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const isAr = locale === 'ar';

    const t = {
        title: isAr ? "أخبار TDM" : "Actualités TDM",
        subtitle: isAr
            ? "آخر الأخبار والأحداث من شركة البث الإذاعي والتلفزي الموريتاني"
            : "Les dernières nouvelles et événements de la Télédiffusion de Mauritanie",
        readMore: isAr ? "اقرأ المزيد" : "Lire la suite",
        source: isAr ? "المصدر الرسمي" : "Source Officielle",
        close: isAr ? "إغلاق" : "Fermer",
        share: isAr ? "مشاركة الخبر" : "Partager",
    };

    if (!isClient) return <div className="min-h-screen bg-brand-dark"></div>;

    return (
        <main className="min-h-screen pb-32 pt-28 bg-brand-dark waves-pattern relative overflow-hidden">
             {/* Background Glows */}
             <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-green/5 blur-[120px] rounded-full"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <header className="mb-24 text-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6 backdrop-blur-xl"
                    >
                        <Newspaper className="w-3.5 h-3.5 text-brand-green" />
                        <span className="text-[10px] font-black text-brand-green uppercase tracking-[0.3em]">
                            {isAr ? 'المركز الإعلامي' : 'Média Center'}
                        </span>
                    </motion.div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-tight">
                        {isAr ? 'أخبار' : 'Latest'}{" "}
                        <span className="glow-text-gold">{isAr ? 'المؤسسة' : 'Updates'}</span>
                    </h1>
                    
                    <p className="max-w-2xl mx-auto text-lg text-slate-400 font-medium leading-relaxed">
                        {t.subtitle}
                    </p>
                </header>

                {/* News Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {articles.map((article, idx) => {
                        const tagText = isAr ? article.tag.ar : article.tag.fr;
                        const tagClass = tagColors[tagText] || "bg-white/10 text-slate-300 border-white/20";
                        return (
                            <motion.div
                                key={article.id}
                                layoutId={`article-${article.id}`}
                                onClick={() => setSelectedArticle(article)}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                className={`premium-card h-full group cursor-pointer overflow-hidden flex flex-col ${idx === 0 ? 'md:col-span-2' : ''}`}
                            >
                                <div className={`relative overflow-hidden bg-slate-900 flex items-center justify-center ${idx === 0 ? 'h-[450px]' : 'h-80'}`}>
                                    {/* Blurred Backdrop for full image appearance */}
                                    <img
                                        src={article.imageUrl}
                                        alt=""
                                        className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-20 scale-110"
                                    />
                                    <img
                                        src={article.imageUrl}
                                        alt={isAr ? article.title.ar : article.title.fr}
                                        className="relative z-10 w-full h-full object-contain transition-transform duration-1000 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent"></div>
                                    <div className="absolute top-6 start-6">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border backdrop-blur-md ${tagClass}`}>
                                            {tagText}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-6 start-6 text-[10px] font-black text-white/60 bg-black/40 backdrop-blur-sm px-3 py-1 rounded-md uppercase tracking-[0.2em]">
                                        {isAr ? article.date.ar : article.date.fr}
                                    </div>
                                </div>

                                <div className="p-8 md:p-10 flex flex-col flex-1">
                                    <h2 className={`font-black text-white leading-tight mb-4 group-hover:text-brand-green transition-colors ${idx === 0 ? 'text-3xl' : 'text-xl'}`}>
                                        {isAr ? article.title.ar : article.title.fr}
                                    </h2>
                                    <p className="text-slate-400 font-medium leading-relaxed line-clamp-3 mb-8 flex-1">
                                        {isAr ? article.description.ar : article.description.fr}
                                    </p>
                                    <div className="flex items-center gap-3 text-xs font-black text-brand-green group-hover:gap-5 transition-all">
                                        <span>{t.readMore}</span>
                                        <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Source Link */}
                <div className="mt-20 text-center">
                    <a href="https://siteweb.tdm.mr" target="_blank" rel="noopener noreferrer" className="glass-button inline-flex items-center gap-3 text-xs">
                        <ExternalLink className="w-4 h-4" />
                        {t.source}
                    </a>
                </div>
            </div>

            {/* Premium Modal View */}
            <AnimatePresence>
                {selectedArticle && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedArticle(null)}
                            className="fixed inset-0 bg-brand-dark/95 backdrop-blur-xl z-[110] cursor-zoom-out"
                        />
                        <motion.div
                            layoutId={`article-${selectedArticle.id}`}
                            className="fixed inset-4 md:inset-x-12 md:inset-y-8 lg:inset-x-32 lg:inset-y-12 z-[120] premium-card overflow-hidden flex flex-col p-1"
                        >
                            <div className="bg-slate-950/60 rounded-[2.4rem] h-full overflow-y-auto custom-scrollbar relative">
                                <button
                                    onClick={() => setSelectedArticle(null)}
                                    className="absolute top-8 right-8 z-[130] w-12 h-12 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-white flex items-center justify-center hover:bg-brand-red transition-all group"
                                >
                                    <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                                </button>

                                <div className="h-[400px] md:h-[600px] relative bg-black flex items-center justify-center overflow-hidden">
                                    <img
                                        src={selectedArticle.imageUrl}
                                        alt=""
                                        className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-30 scale-125"
                                    />
                                    <img
                                        src={selectedArticle.imageUrl}
                                        alt={isAr ? selectedArticle.title.ar : selectedArticle.title.fr}
                                        className="relative z-10 w-full h-full object-contain"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                                    <div className="absolute bottom-12 left-12 right-12 max-w-4xl">
                                        <div className="flex gap-4 mb-6">
                                             <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border backdrop-blur-md ${tagColors[isAr ? selectedArticle.tag.ar : selectedArticle.tag.fr]}`}>
                                                {isAr ? selectedArticle.tag.ar : selectedArticle.tag.fr}
                                            </span>
                                        </div>
                                        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                                            {isAr ? selectedArticle.title.ar : selectedArticle.title.fr}
                                        </h2>
                                    </div>
                                </div>

                                <div className="px-12 py-16 max-w-4xl mx-auto">
                                    <p className="text-slate-300 text-xl md:text-2xl leading-relaxed italic border-s-4 border-brand-green ps-8 mb-16">
                                        {isAr ? selectedArticle.description.ar : selectedArticle.description.fr}
                                    </p>
                                    
                                    <div className="space-y-8 text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
                                        <p>
                                            {isAr 
                                                ? "في خطوة استراتيجية جديدة، تواصل شركة البث الإذاعي والتلفزي الموريتاني (TDM) ريادتها في تحديث البنية التحتية للإعلام الوطني، مع التركيز على تقديم خدمات بث عالية الجودة تخدم كافة التطلعات."
                                                : "Dans une nouvelle étape stratégique, la Télédiffusion de Mauritanie (TDM) poursuit son leadership dans la modernisation de l'infrastructure médiatique nationale."}
                                        </p>
                                        <p>
                                            {isAr 
                                                ? "وتؤكد المؤسسة التزامها الدائم بالابتكار التقني كركيزة أساسية لتطوير المشهد السمعي البصري، بما يضمن السيادة الرقمية والتميز في الأداء."
                                                : "L'institution confirme son engagement permanent envers l'innovation technique comme pilier fondamental du développement du paysage audiovisuel."}
                                        </p>
                                    </div>

                                    <div className="mt-20 pt-12 border-t border-white/5 flex flex-wrap gap-6">
                                        <button className="glass-button bg-brand-green border-brand-green flex items-center gap-3">
                                            <Share2 className="w-5 h-5" />
                                            {t.share}
                                        </button>
                                        <button onClick={() => setSelectedArticle(null)} className="glass-button">
                                            {t.close}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </main>
    );
}
