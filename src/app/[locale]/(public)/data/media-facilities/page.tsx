'use client';

import { useState, use, useEffect } from 'react';
import { useFacilityStore } from '@/store/useFacilityStore';
import Link from 'next/link';

export default function MediaFacilitiesDirectory({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params) as any;
    const { facilities, fetchFacilities } = useFacilityStore();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        fetchFacilities();
    }, [fetchFacilities]);

    const [filterType, setFilterType] = useState('all');
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    const t = {
        ar: {
            title: "سجل المنشآت الإعلامية",
            subtitle: "دليل عام بجميع التراخيص الممنوحة للقنوات التلفزيونية والإذاعية ومقدمي خدمة البيانات.",
            search: "البحث بالاسم أو الرقم المرجعي...",
            filters: { type: "النوع", status: "الحالة", all: "الكل" },
            types: { tv: "تلفزيون", radio: "إذاعة", data: "بيانات" },
            statuses: { active: "سارية", expired: "منتهية", suspended: "معلقة", renewing: "قيد التجديد" },
            table: { ref: "المرجع", name: "المنشأة", type: "النوع", city: "المدينة", expiry: "تاريخ الانتهاء", status: "الحالة", action: "التفاصيل" },
            actions: { view: "عرض التفاصيل" }
        },
        fr: {
            title: "Registre des Établissements Médiatiques",
            subtitle: "Annuaire public de toutes les licences accordées aux chaînes de télévision, radios et fournisseurs de données.",
            search: "Rechercher par nom ou référence...",
            filters: { type: "Type", status: "Statut", all: "Tous" },
            types: { tv: "Télévision", radio: "Radio", data: "Données" },
            statuses: { active: "Actif", expired: "Expiré", suspended: "Suspendu", renewing: "En renouvellement" },
            table: { ref: "Réf", name: "Établissement", type: "Type", city: "Ville", expiry: "Date d'expiration", status: "Statut", action: "Détails" },
            actions: { view: "Voir les détails" }
        }
    }[locale as 'ar' | 'fr'];

    const filteredData = (facilities || []).filter(facility => {
        const nameStr = facility.name[locale as 'ar' | 'fr'] || '';
        const refStr = facility.ref || '';
        const matchesSearch = nameStr.toLowerCase().includes(searchQuery.toLowerCase()) ||
            refStr.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === 'all' || facility.type === filterType;
        const matchesStatus = filterStatus === 'all' || facility.status === filterStatus;

        return matchesSearch && matchesType && matchesStatus;
    });

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

    return (
        <main className="min-h-screen pb-24">
            <div className="bg-brand-dark pt-16 pb-12 text-white border-b-4 border-b-brand-green">
                <div className="max-w-7xl mx-auto px-6">
                    <Link href={`/${locale}/data`} className="text-brand-green hover:text-white text-sm mb-6 inline-block">
                        &larr; {locale === 'ar' ? 'العودة للبوابة' : 'Retour au portail'}
                    </Link>
                    <h1 className="text-3xl font-extrabold mb-4">{t.title}</h1>
                    <p className="text-slate-300">{t.subtitle}</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Filters */}
                <div className="bg-brand-card p-6 rounded-sm border border-white/20 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <input
                            type="text"
                            placeholder={t.search}
                            className="w-full bg-brand-card border border-white/25 text-white rounded-sm focus:ring-brand-green focus:border-brand-green p-2.5"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div>
                        <select
                            className="w-full bg-brand-card border border-white/25 text-white rounded-sm focus:ring-brand-green focus:border-brand-green p-2.5"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option value="all">{t.filters.type}: {t.filters.all}</option>
                            {Object.entries(t.types).map(([k, v]) => <option key={k} value={k}>{v as string}</option>)}
                        </select>
                    </div>
                    <div>
                        <select
                            className="w-full bg-brand-card border border-white/25 text-white rounded-sm focus:ring-brand-green focus:border-brand-green p-2.5"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="all">{t.filters.status}: {t.filters.all}</option>
                            {Object.entries(t.statuses).map(([k, v]) => <option key={k} value={k}>{v as string}</option>)}
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-brand-card rounded-sm border border-white/20 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-slate-200">
                            <thead className="text-xs text-slate-100 uppercase bg-brand-card-hover border-b border-white/20">
                                <tr>
                                    <th className="px-6 py-4">{t.table.ref}</th>
                                    <th className="px-6 py-4">{t.table.name}</th>
                                    <th className="px-6 py-4">{t.table.type}</th>
                                    <th className="px-6 py-4">{t.table.city}</th>
                                    <th className="px-6 py-4">{t.table.expiry}</th>
                                    <th className="px-6 py-4">{t.table.status}</th>
                                    <th className="px-6 py-4 text-center">{t.table.action}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((facility) => (
                                    <tr key={facility.ref} className="border-b border-white/10 hover:bg-brand-card-hover transition-colors">
                                        <td className="px-6 py-4 font-mono font-medium text-white">{facility.ref}</td>
                                        <td className="px-6 py-4 font-bold text-white">{facility.name[locale as 'ar' | 'fr']}</td>
                                        <td className="px-6 py-4">{(t.types as any)[facility.type]}</td>
                                        <td className="px-6 py-4">{facility.city[locale as 'ar' | 'fr']}</td>
                                        <td className="px-6 py-4 font-mono">{facility.expiryDate}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-sm text-xs font-bold border ${getStatusColor(facility.status)}`}>
                                                {(t.statuses as any)[facility.status]}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <Link href={`/${locale}/data/media-facilities/${facility.ref}`} className="inline-flex items-center gap-1 text-xs font-bold text-brand-green hover:underline">
                                                <span>{t.actions.view}</span>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                {filteredData.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-12 text-center text-slate-300">
                                            {locale === 'ar' ? 'لا توجد بيانات مطابقة للبحث.' : 'Aucune donnée ne correspond à la recherche.'}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    );
}
