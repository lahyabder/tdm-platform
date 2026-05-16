'use client';

import { useState, useEffect } from 'react';
import { tendersData, TenderCategory } from '@/mock/tenders';
import Link from 'next/link';
import { toArabicNumerals } from '@/lib/utils';

export function TendersClient({ locale }: { locale: string }) {
    const [activeCategory, setActiveCategory] = useState<TenderCategory>('announcement');
    const [activeYear, setActiveYear] = useState<number | 'all'>('all');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const t = {
        ar: {
            title: "عروض وصفقات المؤسسة (CPMP)",
            subtitle: "منصة الشفافية لإعلانات ونتائج الصفقات العمومية والخطط السنوية",
            filters: {
                year: "السنة",
                allYears: "جميع السنوات",
                categories: {
                    announcement: "إعلانات",
                    result: "نتائج",
                    report: "تقارير",
                    plan: "الخطة السنوية"
                }
            },
            table: {
                id: "المرجع",
                title: "العنوان",
                date: "تاريخ النشر",
                download: "تحميل"
            },
            noData: "لا توجد بيانات متاحة لهذا التصنيف أو السنة المختارة"
        },
        fr: {
            title: "Appels d'Offres et CPMP",
            subtitle: "Portail de transparence pour les annonces, résultats et plans de passation des marchés",
            filters: {
                year: "Année",
                allYears: "Toutes les années",
                categories: {
                    announcement: "Annonces",
                    result: "Résultats",
                    report: "Rapports",
                    plan: "Plan Annuel"
                }
            },
            table: {
                id: "Référence",
                title: "Titre",
                date: "Date de publication",
                download: "Télécharger"
            },
            noData: "Aucune donnée disponible pour cette catégorie ou l'année sélectionnée"
        }
    }[locale as 'ar' | 'fr'] as any;

    const filteredTenders = tendersData.filter(tender => {
        const matchesCategory = tender.category === activeCategory;
        const matchesYear = activeYear === 'all' || tender.year === activeYear;
        return matchesCategory && matchesYear;
    });

    const uniqueYears = Array.from(new Set(tendersData.map(t => t.year))).sort((a, b) => b - a);

    if (!isClient) return null;

    return (
        <div className="min-h-screen py-12 px-6">
            <div className="max-w-6xl mx-auto space-y-12">

                {/* Header Section */}
                <div className="text-center space-y-4">
                    <div className="inline-block px-4 py-1.5 bg-brand-green/10 text-brand-green text-xs font-black uppercase rounded-full border border-brand-green/20 mb-4 tracking-widest">
                        CPMP Dashboard
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                        {t.title}
                    </h1>
                    <p className="text-lg text-slate-100 max-w-3xl mx-auto font-medium">
                        {t.subtitle}
                    </p>
                </div>

                {/* Filters & Tabs */}
                <div className="space-y-6">
                    {/* Year Filter */}
                    <div className="flex justify-center gap-2 overflow-x-auto pb-4 scrollbar-hide">
                        <button
                            onClick={() => setActiveYear('all')}
                            className={`flex-shrink-0 px-6 py-2 rounded-full text-sm font-bold border transition-all ${activeYear === 'all'
                                    ? 'bg-brand-green border-brand-green text-white shadow-lg'
                                    : 'bg-brand-card border-white/20 text-slate-100 hover:border-brand-green'
                                }`}
                        >
                            {t.filters.allYears}
                        </button>
                        {uniqueYears.map(year => (
                            <button
                                key={year}
                                onClick={() => setActiveYear(year)}
                                className={`flex-shrink-0 px-8 py-2 rounded-full text-sm font-bold border transition-all ${activeYear === year
                                        ? 'bg-brand-green border-brand-green text-white shadow-lg'
                                        : 'bg-brand-card border-white/20 text-slate-100 hover:border-brand-green'
                                    }`}
                            >
                                {locale === 'ar' ? toArabicNumerals(year) : year}
                            </button>
                        ))}
                    </div>

                    {/* Category Tabs */}
                    <div className="bg-brand-card p-1.5 rounded-2xl border border-white/20 flex flex-wrap md:flex-nowrap gap-2 items-center">
                        {(['announcement', 'result', 'report', 'plan'] as TenderCategory[]).map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`flex-1 min-w-[120px] py-3.5 rounded-xl text-sm font-black transition-all ${activeCategory === cat
                                        ? 'bg-brand-green text-white shadow-md transform scale-[1.02]'
                                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                                    }`}
                            >
                                {t.filters.categories[cat]}
                            </button>
                        ))}
                    </div>
                </div>

                {/* List of Tenders */}
                <div className="bg-brand-card rounded-3xl border border-white/20 overflow-hidden">
                    {filteredTenders.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-start">
                                <thead className="bg-brand-card border-b border-white/20">
                                    <tr>
                                        <th className="px-8 py-6 text-xs font-black text-slate-300 uppercase tracking-widest">{t.table.id}</th>
                                        <th className="px-8 py-6 text-xs font-black text-slate-300 uppercase tracking-widest">{t.table.title}</th>
                                        <th className="px-8 py-6 text-xs font-black text-slate-300 uppercase tracking-widest">{t.table.date}</th>
                                        <th className="px-8 py-6 text-xs font-black text-slate-300 uppercase tracking-widest text-center">{t.table.download}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/5">
                                    {filteredTenders.map(tender => (
                                        <tr key={tender.id} className="group hover:bg-brand-green/[0.02] transition-colors">
                                            <td className="px-8 py-8 font-mono text-sm text-slate-300">{tender.id}</td>
                                            <td className="px-8 py-8">
                                                <span className="text-xl font-bold text-white group-hover:text-brand-green transition-colors leading-tight">
                                                    {tender.title[locale as 'ar' | 'fr']}
                                                </span>
                                            </td>
                                            <td className="px-8 py-8">
                                                <div className="flex flex-col gap-1 text-start">
                                                    <span className="text-sm font-bold text-slate-200">{formatDate(tender.date, locale)}</span>
                                                    <span className="text-[10px] font-black text-slate-100 uppercase tracking-tighter">PUBLISHED</span>
                                                </div>
                                            </td>
                                            <td className="px-8 py-8 text-center">
                                                <button className="relative p-4 bg-slate-900 text-white rounded-2xl hover:bg-brand-green transition-all transform group-hover:scale-110 shadow-lg shadow-slate-900/10">
                                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="p-24 text-center space-y-6">
                            <div className="w-20 h-20 bg-brand-card rounded-full flex items-center justify-center mx-auto border border-white/10">
                                <svg className="w-10 h-10 text-slate-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                                </svg>
                            </div>
                            <p className="text-xl font-bold text-slate-300 max-w-sm mx-auto">
                                {t.noData}
                            </p>
                        </div>
                    )}
                </div>

                {/* Bottom Banner */}
                <div className="bg-brand-dark/80 border border-white/20 p-12 rounded-3xl text-white relative overflow-hidden group">
                    <div className="absolute top-0 end-0 w-64 h-64 bg-brand-green/10 rounded-full blur-3xl -me-32 -mt-32"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-start">
                        <div>
                            <h2 className="text-2xl font-black mb-2">
                                {locale === 'ar' ? 'هل لديك استفسار حول الصفقات؟' : 'Une question sur les marchés ?'}
                            </h2>
                            <p className="text-slate-300 font-medium">
                                {locale === 'ar' ? 'تواصل مع لجنة إبرام الصفقات العمومية للمزيد من التفاصيل.' : 'Contactez la CPMP pour plus de détails.'}
                            </p>
                        </div>
                        <Link href={`/${locale}/contact`} className="px-10 py-4 bg-brand-green text-white font-black rounded-xl hover:bg-brand-green/90 transition-all shadow-xl shadow-brand-green/20">
                            {locale === 'ar' ? 'اتصل بنا' : 'Contactez-nous'}
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}
