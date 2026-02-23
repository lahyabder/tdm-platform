'use client';

import { useState, use } from 'react';
import { mediaFacilities } from '@/mock/mediaFacilities';
import Link from 'next/link';

export default function MediaFacilitiesDirectory({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params);

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

    const filteredData = mediaFacilities.filter(facility => {
        const matchesSearch = facility.name[locale as 'ar' | 'fr'].toLowerCase().includes(searchQuery.toLowerCase()) ||
            facility.ref.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === 'all' || facility.type === filterType;
        const matchesStatus = filterStatus === 'all' || facility.status === filterStatus;

        return matchesSearch && matchesType && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'bg-brand-green/10 text-brand-green border-brand-green/20';
            case 'expired': return 'bg-brand-red/10 text-brand-red border-brand-red/20';
            case 'renewing': return 'bg-brand-yellow/10 text-brand-yellow border-brand-yellow/20';
            case 'suspended': return 'bg-slate-100 text-slate-600 border-slate-200';
            default: return 'bg-slate-100 text-slate-800 border-slate-200';
        }
    };

    return (
        <main className="min-h-screen bg-slate-50 pb-24">
            <div className="bg-slate-900 pt-16 pb-12 text-white border-b-4 border-b-brand-green">
                <div className="max-w-7xl mx-auto px-6">
                    <Link href={`/${locale}/data`} className="text-brand-green hover:text-white text-sm mb-6 inline-block">
                        &larr; {locale === 'ar' ? 'العودة للبوابة' : 'Retour au portail'}
                    </Link>
                    <h1 className="text-3xl font-extrabold mb-4">{t.title}</h1>
                    <p className="text-slate-400">{t.subtitle}</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                {/* Filters */}
                <div className="bg-white p-6 rounded-sm shadow-sm border border-slate-200 mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <input
                            type="text"
                            placeholder={t.search}
                            className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-sm focus:ring-brand-green focus:border-brand-green p-2.5"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <div>
                        <select
                            className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-sm focus:ring-brand-green focus:border-brand-green p-2.5"
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                        >
                            <option value="all">{t.filters.type}: {t.filters.all}</option>
                            {Object.entries(t.types).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                        </select>
                    </div>
                    <div>
                        <select
                            className="w-full bg-slate-50 border border-slate-300 text-slate-900 rounded-sm focus:ring-brand-green focus:border-brand-green p-2.5"
                            value={filterStatus}
                            onChange={(e) => setFilterStatus(e.target.value)}
                        >
                            <option value="all">{t.filters.status}: {t.filters.all}</option>
                            {Object.entries(t.statuses).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                        </select>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white rounded-sm shadow-sm border border-slate-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left rtl:text-right text-slate-600">
                            <thead className="text-xs text-slate-700 uppercase bg-slate-100 border-b border-slate-200">
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
                                    <tr key={facility.ref} className="bg-white border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-mono font-medium text-slate-900">{facility.ref}</td>
                                        <td className="px-6 py-4 font-bold text-slate-800">{facility.name[locale as 'ar' | 'fr']}</td>
                                        <td className="px-6 py-4">{t.types[facility.type]}</td>
                                        <td className="px-6 py-4">{facility.city[locale as 'ar' | 'fr']}</td>
                                        <td className="px-6 py-4 font-mono">{facility.expiryDate}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-sm text-xs font-bold border ${getStatusColor(facility.status)}`}>
                                                {t.statuses[facility.status]}
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
                                        <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
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
