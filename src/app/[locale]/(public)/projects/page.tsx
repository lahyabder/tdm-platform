'use client';

import { useState, useEffect, use } from 'react';
import { useContentStore } from '@/store/useContentStore';
import { projectsData } from '@/mock/projects';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Rocket, Clock, CheckCircle2, ArrowRight, Target, LayoutGrid } from 'lucide-react';

export default function ProjectsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params) as any;
    const { pages, fetchContent } = useContentStore();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        fetchContent();
    }, []);

    const content = pages.projects;
    const isAr = locale === 'ar';

    if (!isClient || !content) return <div className="min-h-screen bg-brand-dark"></div>;

    const t = {
        ar: {
            title: "المشاريع الاستراتيجية",
            subtitle: "نظرة على أهم المشاريع التطويرية التي تقودها المؤسسة لتطوير قطاع البث",
            status: { ongoing: "قيد التنفيذ", completed: "مكتمل" },
            viewDetails: "تفاصيل المشروع",
            progress: "نسبة الإنجاز"
        },
        fr: {
            title: "Projets Stratégiques",
            subtitle: "Aperçu des principaux projets de développement menés par la TDM",
            status: { ongoing: "En cours", completed: "Terminé" },
            viewDetails: "Détails du projet",
            progress: "Progression"
        }
    }[locale as 'ar' | 'fr'];

    return (
        <main className="min-h-screen pb-32 pt-28 bg-brand-dark waves-pattern relative overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-green/5 blur-[120px] rounded-full"></div>
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header Section */}
                <header className="mb-24 text-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6 backdrop-blur-xl"
                    >
                        <Rocket className="w-3.5 h-3.5 text-brand-green" />
                        <span className="text-[10px] font-black text-brand-green uppercase tracking-[0.3em]">
                            {isAr ? 'خارطة الطريق الرقمية' : 'Digital Roadmap'}
                        </span>
                    </motion.div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-tight">
                        {isAr ? 'المشاريع' : 'Strategic'}{" "}
                        <span className="glow-text-gold">{isAr ? 'الاستراتيجية' : 'Projects'}</span>
                    </h1>
                    
                    <p className="max-w-2xl mx-auto text-lg text-slate-400 font-medium leading-relaxed">
                        {content.sections.intro?.content?.[locale] || t.subtitle}
                    </p>
                </header>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {projectsData.map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Link href={`/${locale}/projects/${project.id}`} className="group block h-full">
                                <div className="premium-card h-full p-1 group-hover:border-brand-green/30 transition-all">
                                    <div className="bg-slate-950/40 rounded-[2.4rem] p-8 md:p-12 h-full flex flex-col relative overflow-hidden">
                                        {/* Status Badge */}
                                        <div className="flex justify-between items-start mb-10">
                                            <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 ${
                                                project.status === 'ongoing' 
                                                ? 'bg-brand-yellow/10 text-brand-yellow border border-brand-yellow/20' 
                                                : 'bg-brand-green/10 text-brand-green border border-brand-green/20'
                                            }`}>
                                                {project.status === 'ongoing' ? <Clock className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                                                {t.status[project.status]}
                                            </div>
                                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:bg-brand-green group-hover:text-white transition-all duration-500">
                                                <Target className="w-6 h-6" />
                                            </div>
                                        </div>

                                        <div className="space-y-4 mb-10 flex-1">
                                            <h2 className="text-3xl font-black text-white group-hover:text-brand-green transition-colors leading-tight">
                                                {project.title[locale as 'ar' | 'fr']}
                                            </h2>
                                            <p className="text-slate-400 font-medium leading-relaxed">
                                                {project.description[locale as 'ar' | 'fr']}
                                            </p>
                                        </div>

                                        <div className="mt-auto space-y-6">
                                            <div className="space-y-3">
                                                <div className="flex justify-between items-end">
                                                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t.progress}</span>
                                                    <span className="text-lg font-black text-white">{project.progress}%</span>
                                                </div>
                                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
                                                    <motion.div
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${project.progress}%` }}
                                                        transition={{ duration: 1, ease: "easeOut" }}
                                                        className={`h-full ${project.status === 'ongoing' ? 'bg-brand-yellow shadow-[0_0_15px_rgba(255,204,0,0.3)]' : 'bg-brand-green shadow-[0_0_15px_rgba(0,169,92,0.3)]'}`}
                                                    ></motion.div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-3 text-xs font-black text-brand-green group-hover:gap-5 transition-all">
                                                <span>{t.viewDetails}</span>
                                                <ArrowRight className={`w-4 h-4 ${isAr ? 'rotate-180' : ''}`} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Info Box */}
                <div className="mt-32 p-12 bg-white/5 rounded-[3rem] border border-white/10 flex flex-col md:flex-row items-center gap-12 group backdrop-blur-xl">
                    <div className="w-24 h-24 bg-brand-yellow/10 text-brand-yellow rounded-3xl flex items-center justify-center shrink-0 border border-brand-yellow/20">
                        <LayoutGrid className="w-10 h-10" />
                    </div>
                    <div>
                        <h3 className="text-2xl font-black text-white mb-2">{isAr ? 'التزام بالتطوير المستمر' : 'Engagement au développement'}</h3>
                        <p className="text-slate-400 font-medium max-w-2xl">
                            {isAr ? 'نسعى من خلال هذه المشاريع إلى بناء بنية تحتية رقمية تضمن للمواطن الموريتاني وصولاً سهلاً وموثوقاً لكافة الخدمات الإعلامية.' : 'À travers ces projets, nous visons à construire une infrastructure numérique robuste.'}
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}
