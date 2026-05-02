'use client';

import { useState, use, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Calendar, Tag, ChevronRight, Share2 } from 'lucide-react';
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
        readMore: isAr ? "اقرأ المزيد ←" : "Lire la suite →",
        source: isAr ? "المصدر: siteweb.tdm.mr" : "Source: siteweb.tdm.mr",
        close: isAr ? "إغلاق" : "Fermer",
        share: isAr ? "مشاركة" : "Partager",
    };

    if (!isClient) return <div className="min-h-screen bg-brand-dark"></div>;

    return (
        <main className="min-h-screen pb-24">
            {/* Header */}
            <section className="bg-brand-dark pt-24 pb-32 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-dark via-brand-dark to-brand-green/20"></div>
                <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #00A95C 0%, transparent 50%), radial-gradient(circle at 80% 20%, #FFD700 0%, transparent 40%)' }}
                ></div>
                <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-brand-green via-brand-yellow to-brand-red z-10"></div>
                <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-green/10 border border-brand-green/30 text-brand-green text-xs font-bold uppercase tracking-widest mb-6">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse"></span>
                        {isAr ? "آخر المستجدات" : "Dernières nouvelles"}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">{t.title}</h1>
                    <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">{t.subtitle}</p>
                </div>
            </section>

            {/* News Grid */}
            <div className="max-w-6xl mx-auto px-6 -mt-16 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article, idx) => {
                        const tagText = isAr ? article.tag.ar : article.tag.fr;
                        const tagClass = tagColors[tagText] || "bg-white/10 text-slate-300 border-white/20";
                        return (
                            <motion.div
                                key={article.id}
                                layoutId={`article-${article.id}`}
                                onClick={() => setSelectedArticle(article)}
                                className={`group cursor-pointer bg-brand-card rounded-2xl border border-white/15 hover:border-brand-green/50 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,169,92,0.15)] overflow-hidden ${idx === 0 ? 'md:col-span-2 lg:col-span-2' : ''}`}
                            >
                                {/* Image */}
                                <div className={`relative overflow-hidden bg-brand-dark-2 ${idx === 0 ? 'h-64' : 'h-48'}`}>
                                    <img
                                        src={article.imageUrl}
                                        alt={isAr ? article.title.ar : article.title.fr}
                                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent"></div>
                                    <div className="absolute top-4 start-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${tagClass}`}>
                                            {tagText}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-4 start-4 text-xs font-bold text-white/70 uppercase tracking-widest">
                                        {isAr ? article.date.ar : article.date.fr}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6 space-y-3">
                                    <h2 className={`font-black text-white leading-snug group-hover:text-brand-green transition-colors ${idx === 0 ? 'text-xl' : 'text-base'}`}>
                                        {isAr ? article.title.ar : article.title.fr}
                                    </h2>
                                    <p className="text-slate-300 text-sm leading-relaxed line-clamp-2">
                                        {isAr ? article.description.ar : article.description.fr}
                                    </p>
                                    <div className="pt-2 flex items-center justify-between">
                                        <span className="text-brand-green text-xs font-black uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                                            {t.readMore}
                                        </span>
                                        <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:bg-brand-green/10 group-hover:border-brand-green/30 transition-colors">
                                            <ChevronRight className={`w-4 h-4 text-white/50 group-hover:text-brand-green transition-colors ${isAr ? 'rotate-180' : ''}`} />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Source Attribution */}
                <div className="mt-12 text-center">
                    <a
                        href="https://siteweb.tdm.mr"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-brand-green transition-colors border border-white/10 px-4 py-2 rounded-full hover:border-brand-green/30"
                    >
                        <ExternalLink className="w-3.5 h-3.5" />
                        {t.source}
                    </a>
                </div>
            </div>

            {/* Premium Modal */}
            <AnimatePresence>
                {selectedArticle && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedArticle(null)}
                            className="fixed inset-0 bg-brand-dark/90 backdrop-blur-md z-[110] cursor-zoom-out"
                        />
                        <motion.div
                            layoutId={`article-${selectedArticle.id}`}
                            className="fixed inset-4 md:inset-x-20 md:inset-y-10 lg:inset-x-64 lg:inset-y-20 z-[120] bg-brand-card rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col"
                        >
                            <button
                                onClick={() => setSelectedArticle(null)}
                                className="absolute top-6 right-6 z-[130] p-2 rounded-full bg-brand-dark/50 backdrop-blur-md border border-white/10 text-white hover:bg-brand-red/20 hover:border-brand-red/30 transition-all group"
                            >
                                <X className="w-6 h-6 group-hover:rotate-90 transition-transform" />
                            </button>

                            <div className="flex-1 overflow-y-auto custom-scrollbar pb-12">
                                {/* Modal Header Image */}
                                <div className="h-[300px] md:h-[400px] relative">
                                    <img
                                        src={selectedArticle.imageUrl}
                                        alt={isAr ? selectedArticle.title.ar : selectedArticle.title.fr}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-brand-card via-transparent to-transparent"></div>
                                    <div className="absolute bottom-8 left-8 right-8">
                                        <div className="flex flex-wrap items-center gap-4 mb-4">
                                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${tagColors[isAr ? selectedArticle.tag.ar : selectedArticle.tag.fr]}`}>
                                                {isAr ? selectedArticle.tag.ar : selectedArticle.tag.fr}
                                            </span>
                                            <span className="flex items-center gap-2 text-xs font-bold text-white/70 bg-brand-dark/40 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/5">
                                                <Calendar className="w-3.5 h-3.5" />
                                                {isAr ? selectedArticle.date.ar : selectedArticle.date.fr}
                                            </span>
                                        </div>
                                        <h2 className="text-2xl md:text-4xl font-black text-white leading-tight">
                                            {isAr ? selectedArticle.title.ar : selectedArticle.title.fr}
                                        </h2>
                                    </div>
                                </div>

                                {/* Modal Content Body */}
                                <div className="px-8 md:px-12 py-8 max-w-3xl mx-auto">
                                    <div className="prose prose-invert max-w-none">
                                        <p className="text-slate-100 text-lg md:text-xl leading-relaxed whitespace-pre-line border-l-4 border-brand-green pl-6 italic mb-12">
                                            {isAr ? selectedArticle.description.ar : selectedArticle.description.fr}
                                        </p>
                                        
                                        <div className="space-y-6 text-slate-300 leading-relaxed text-base md:text-lg">
                                            <p>
                                                {isAr 
                                                    ? "في إطار جهودها المستمرة لتطوير البنية التحتية الإعلامية في موريتانيا، تواصل شركة البث الإذاعي والتلفزي الموريتاني (TDM) تنفيذ مشاريعها الاستراتيجية الرامية إلى ضمان وصول المحتوى السمعي البصري إلى كافة المواطنين بأعلى معايير الجودة الممكنة."
                                                    : "Dans le cadre de ses efforts continus pour développer l'infrastructure médiatique en Mauritanie, la Télédiffusion de Mauritanie (TDM) poursuit la mise en œuvre de ses projets stratégiques visant à garantir l'accès au contenu audiovisuel."}
                                            </p>
                                            <p>
                                                {isAr 
                                                    ? "وقد أكدت الإدارة العامة للشركة أن هذه الخطوة تأتي تنفيذاً للرؤية الوطنية الشاملة لتحديث قطاع الاتصالات، وتعزيز قدرة المؤسسات الإعلامية الوطنية على المنافسة في الفضاء الرقمي المتطور باستمرار."
                                                    : "La direction générale de la société a souligné que cette étape s'inscrit dans la mise en œuvre de la vision nationale globale de modernisation du secteur des télécommunications."}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4 border-t border-white/10 pt-12">
                                        <button className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-brand-green text-brand-dark px-10 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-white hover:scale-105 transition-all shadow-xl shadow-brand-green/20">
                                            <Share2 className="w-5 h-5" />
                                            {t.share}
                                        </button>
                                        <button 
                                            onClick={() => setSelectedArticle(null)}
                                            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-white/5 border border-white/10 text-white px-10 py-4 rounded-xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all"
                                        >
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
