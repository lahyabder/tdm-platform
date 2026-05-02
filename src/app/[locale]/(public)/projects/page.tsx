'use client';

import { useState, useEffect, use } from 'react';
import { projectsData } from '@/mock/projects';
import Link from 'next/link';

export default function ProjectsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params) as any;
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

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

    if (!isClient) return null;

    return (
        <div className="min-h-screen py-12 px-6">
            <div className="max-w-6xl mx-auto space-y-12">

                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">{t.title}</h1>
                    <p className="text-lg text-slate-300 max-w-2xl mx-auto">{t.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {projectsData.map(project => (
                        <div key={project.id} className="bg-brand-card rounded-2xl border border-white/20 overflow-hidden flex flex-col group hover:border-brand-green transition-all transform hover:-translate-y-1">
                            <div className="h-48 bg-brand-dark-2 relative overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 to-transparent z-10"></div>
                                <div className={`absolute top-4 ${locale === 'ar' ? 'right-4' : 'left-4'} z-20`}>
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase text-white shadow-lg border ${project.status === 'ongoing' ? 'bg-brand-yellow border-brand-yellow/20' : 'bg-brand-green border-brand-green/20'}`}>
                                        {t.status[project.status]}
                                    </span>
                                </div>
                                <div className="absolute bottom-4 left-4 right-4 z-20">
                                    <span className="text-xs font-bold text-white/80 uppercase tracking-widest">{project.category[locale as 'ar' | 'fr']}</span>
                                </div>
                            </div>

                            <div className="p-8 space-y-4 flex-1 flex flex-col">
                                <h2 className="text-2xl font-black text-white leading-tight group-hover:text-brand-green transition-colors">
                                    {project.title[locale as 'ar' | 'fr']}
                                </h2>
                                <p className="text-slate-300 text-sm leading-relaxed line-clamp-2">
                                    {project.description[locale as 'ar' | 'fr']}
                                </p>

                                <div className="mt-auto space-y-3">
                                    <div className="flex justify-between items-center text-xs font-bold text-slate-400 uppercase tracking-widest">
                                        <span>{t.progress}</span>
                                        <span className="text-white">{project.progress}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full transition-all duration-1000 ${project.status === 'ongoing' ? 'bg-brand-yellow' : 'bg-brand-green'}`}
                                            style={{ width: `${project.progress}%` }}
                                        ></div>
                                    </div>

                                    <Link
                                        href={`/${locale}/projects/${project.id}`}
                                        className="block w-full text-center py-4 bg-brand-green text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-brand-green/80 transition-all mt-6"
                                    >
                                        {t.viewDetails}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
