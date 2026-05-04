'use client';

import { use, useEffect, useState } from 'react';
import { useFacilityStore } from '@/store/useFacilityStore';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import PrintButton from '@/components/ui/PrintButton';

export default function MediaFacilityDetails({
    params,
}: {
    params: Promise<{ locale: string; ref: string }>;
}) {
    const { locale, ref } = use(params) as any;
    const { getFacilityByRef, fetchFacilities } = useFacilityStore();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        fetchFacilities();
    }, [fetchFacilities]);

    const facility = getFacilityByRef(ref);

    const t = {
        ar: {
            back: "العودة للسجل",
            title: "تفاصيل الترخيص المرئي/المسموع",
            about: "معلومات المنشأة",
            ref: "الرقم المرجعي",
            type: "النوع",
            city: "المدينة",
            status: "حالة الترخيص",
            expiry: "تاريخ الانتهاء",
            legislation: "المرجعية التشريعية",
            types: { tv: "تلفزيون", radio: "إذاعة", data: "بيانات" },
            statuses: { active: "سارية", expired: "منتهية", suspended: "معلقة", renewing: "قيد التجديد" }
        },
        fr: {
            back: "Retour au registre",
            title: "Détails de la licence audiovisuelle",
            about: "Informations sur l'établissement",
            ref: "Référence",
            type: "Type",
            city: "Ville",
            status: "Statut de la licence",
            expiry: "Date d'expiration",
            legislation: "Référence législative",
            types: { tv: "Télévision", radio: "Radio", data: "Données" },
            statuses: { active: "Actif", expired: "Expiré", suspended: "Suspendu", renewing: "En renouvellement" }
        }
    }[locale as 'ar' | 'fr'];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-brand-green/10 text-brand-green border-brand-green/20';
            case 'expired': return 'bg-brand-red/10 text-brand-red border-brand-red/20';
            case 'renewing': return 'bg-brand-yellow/10 text-brand-yellow border-brand-yellow/20';
            case 'suspended': return 'bg-brand-card-hover text-slate-200 border-white/20';
            default: return 'bg-brand-card-hover text-white border-white/20';
        }
    };

    if (!isClient) return <div className="min-h-screen bg-brand-dark"></div>;
    if (!facility) return <div className="min-h-screen bg-brand-dark text-white p-20 text-center">Loading...</div>;

    return (
        <main className="min-h-screen pb-24">
            <div className="bg-brand-dark pt-16 pb-32 text-white border-b-4 border-b-brand-green">
                <div className="max-w-4xl mx-auto px-6">
                    <Link href={`/${locale}/data/media-facilities`} className="text-brand-green hover:text-white text-sm mb-6 inline-block font-mono">
                        &larr; {t.back}
                    </Link>
                    <div className="flex items-center gap-4 mb-4">
                        <span className={`px-3 py-1 rounded-sm text-xs font-bold border uppercase tracking-wider ${getStatusColor(facility.status)}`}>
                            {(t.statuses as any)[facility.status]}
                        </span>
                        <span className="text-slate-300 font-mono text-sm">{facility.ref}</span>
                    </div>
                    <h1 className="text-4xl font-extrabold">{facility.name[locale as 'ar' | 'fr']}</h1>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 -mt-16 relative z-10">
                <div className="bg-brand-card rounded-sm border border-white/20 overflow-hidden">
                    <div className="p-6 border-b border-white/10 bg-brand-card">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <svg className="w-5 h-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            {t.about}
                        </h2>
                    </div>

                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12">
                        <div>
                            <p className="text-sm font-medium text-slate-300 mb-1">{t.type}</p>
                            <p className="text-lg font-bold text-white">{(t.types as any)[facility.type]}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-300 mb-1">{t.city}</p>
                            <p className="text-lg font-bold text-white">{facility.city[locale as 'ar' | 'fr']}</p>
                        </div>

                        <div className="md:col-span-2 border-t border-white/10 pt-8 mt-2"></div>

                        <div>
                            <p className="text-sm font-medium text-slate-300 mb-1">{t.expiry}</p>
                            <p className="text-lg font-mono font-bold text-white">{facility.expiryDate}</p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-slate-300 mb-1">{t.legislation}</p>
                            <a href={`/docs/legislation-${facility.ref}.pdf`} target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-brand-green hover:underline flex items-center gap-2 group w-max">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                {facility.legislationRef}
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
