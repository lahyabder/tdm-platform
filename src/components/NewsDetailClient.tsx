'use client';

import { motion } from 'framer-motion';
import { Calendar, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { NewsArticle } from '@/store/useNewsStore';
import { formatDate } from '@/lib/utils';

export function NewsDetailClient({ 
    article, 
    locale 
}: { 
    article: NewsArticle; 
    locale: string 
}) {
    const isAr = locale === 'ar';
    const t = {
        back: isAr ? "العودة للأخبار" : "Retour aux actualités",
    };

    return (
        <main className="min-h-screen pb-32 pt-28 bg-brand-dark waves-pattern relative overflow-hidden">
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 end-0 w-[500px] h-[500px] bg-brand-green/5 blur-[120px] rounded-full"></div>
            </div>

            <div className="max-w-4xl mx-auto px-6 relative z-10">
                <Link 
                    href={`/${locale}/news`}
                    className="inline-flex items-center gap-3 text-slate-400 hover:text-brand-green transition-colors mb-12 group font-bold"
                >
                    <ArrowLeft className={`w-5 h-5 transition-transform group-hover:-translate-x-2 ${isAr ? 'rotate-180 group-hover:translate-x-2' : ''}`} />
                    {t.back}
                </Link>

                <article className="space-y-12">
                    <header className="space-y-8">
                        <div className="flex flex-wrap items-center gap-6">
                            <span className="px-4 py-1.5 rounded-full bg-brand-green/10 text-brand-green border border-brand-green/20 text-[10px] font-black uppercase tracking-widest">
                                {isAr ? article.tag.ar : article.tag.fr}
                            </span>
                            <div className="flex items-center gap-2 text-slate-500 text-xs font-black uppercase tracking-widest">
                                <Calendar className="w-4 h-4" />
                                {formatDate(isAr ? article.date.ar : article.date.fr, locale)}
                            </div>
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
                            {isAr ? article.title.ar : article.title.fr}
                        </h1>
                    </header>

                    <div className="premium-card overflow-hidden group">
                        <div className="relative h-[400px] md:h-[600px] bg-slate-900 flex items-center justify-center">
                            <img
                                src={article.imageUrl}
                                alt=""
                                className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-20 scale-125"
                            />
                            <img
                                src={article.imageUrl}
                                alt={isAr ? article.title.ar : article.title.fr}
                                className="relative z-10 w-full h-full object-contain"
                            />
                        </div>
                    </div>

                    <div className="space-y-10">
                        <p className="text-slate-300 text-xl md:text-2xl leading-relaxed italic border-s-4 border-brand-green ps-8">
                            {isAr ? article.description.ar : article.description.fr}
                        </p>
                        
                        <div className="prose prose-invert prose-lg max-w-none text-slate-400 font-medium leading-relaxed space-y-8">
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
                    </div>
                </article>
            </div>
        </main>
    );
}
