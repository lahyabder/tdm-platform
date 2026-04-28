'use client';

import { useEffect, useState, use } from 'react';
import { projectsData } from '@/mock/projects';
import Link from 'next/link';

export default function ProjectDetail({
    params,
}: {
    params: Promise<{ locale: string; id: string }>;
}) {
    const resolvedParams = use(params) as any;
    const { locale, id } = resolvedParams;
    const [isClient, setIsClient] = useState(false);
    const project = projectsData.find(p => p.id === id);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!isClient) return null;
    if (!project) return <div>Project not found</div>;

    const t = {
        ar: {
            back: "العودة للمشاريع",
            details: "تفاصيل المشروع",
            goals: "أهداف المشروع",
            status: { ongoing: "قيد التنفيذ", completed: "مكتمل" },
            startDate: "تاريخ البدء",
            compDate: "تاريخ الانتهاء المتوقع"
        },
        fr: {
            back: "Retour aux projets",
            details: "Détails du projet",
            goals: "Objectifs du projet",
            status: { ongoing: "En cours", completed: "Terminé" },
            startDate: "Date de début",
            compDate: "Date de fin prévue"
        }
    }[locale as 'ar' | 'fr'];

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Header */}
            <section className="bg-brand-dark py-24 px-6 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-dark to-brand-green/20"></div>
                <div className="max-w-4xl mx-auto relative z-10 space-y-6">
                    <Link href={`/${locale}/projects`} className="text-xs font-bold text-slate-400 hover:text-white transition-colors flex items-center gap-2 uppercase tracking-widest">
                        <svg className={`w-4 h-4 ${locale === 'ar' ? 'rotate-0' : 'rotate-180'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        {t.back}
                    </Link>
                    <div className="space-y-4">
                        <span className="px-3 py-1 bg-brand-green/20 text-brand-green text-[10px] font-black uppercase rounded-sm border border-brand-green/30 tracking-widest">
                            {project.category[locale as 'ar' | 'fr']}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
                            {project.title[locale as 'ar' | 'fr']}
                        </h1>
                    </div>
                </div>
                <div className="absolute bottom-0 w-full h-1.5 bg-gradient-to-r from-brand-green via-brand-yellow to-brand-red"></div>
            </section>

            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16">

                    <div className="md:col-span-2 space-y-12">
                        <div className="space-y-6">
                            <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">{t.details}</h2>
                            <p className="text-xl text-slate-600 leading-relaxed font-medium">
                                {project.fullContent[locale as 'ar' | 'fr']}
                            </p>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">{t.goals}</h2>
                            <ul className="grid grid-cols-1 gap-4">
                                {project.goals[locale as 'ar' | 'fr'].map((goal, idx) => (
                                    <li key={idx} className="flex items-start gap-4 p-4 bg-slate-50 border border-slate-100 rounded-xl group hover:border-brand-green hover:bg-white transition-all">
                                        <span className="w-8 h-8 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0 font-bold group-hover:bg-brand-green group-hover:text-white transition-colors">
                                            {idx + 1}
                                        </span>
                                        <span className="text-slate-800 font-bold self-center">{goal}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 space-y-6">
                            <div className="space-y-2">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</p>
                                <p className={`text-lg font-black uppercase ${project.status === 'ongoing' ? 'text-brand-yellow' : 'text-brand-green'}`}>
                                    {t.status[project.status]}
                                </p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.startDate}</p>
                                <p className="text-lg font-bold text-slate-800">{project.startDate}</p>
                            </div>
                            {project.completionDate && (
                                <div className="space-y-2">
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.compDate}</p>
                                    <p className="text-lg font-bold text-slate-800">{project.completionDate}</p>
                                </div>
                            )}
                            <div className="pt-6 border-t border-slate-200">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Progress</span>
                                    <span className="text-lg font-black text-slate-900">{project.progress}%</span>
                                </div>
                                <div className="h-3 w-full bg-slate-200 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-1000 ${project.status === 'ongoing' ? 'bg-brand-yellow' : 'bg-brand-green'}`}
                                        style={{ width: `${project.progress}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-brand-red/5 rounded-2xl p-8 border border-brand-red/10">
                            <h3 className="text-xs font-black text-brand-red uppercase mb-2 tracking-widest">Besoin d'info ?</h3>
                            <p className="text-sm font-bold text-slate-600">Contactez le département des projets stratégiques pour toute question technique.</p>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
}
