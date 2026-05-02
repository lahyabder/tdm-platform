'use client';

import { useState, useEffect, use } from 'react';
import { useFacilityStore } from '@/store/useFacilityStore';
import Link from 'next/link';
import { MediaFacility } from '@/mock/mediaFacilities';

export default function AdminFacilitiesPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params) as any;
    const { facilities, deleteFacility, fetchFacilities } = useFacilityStore();
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('all');
    const [filterCity, setFilterCity] = useState('all');
    const [isClient, setIsClient] = useState(false);

    // Avoid hydration mismatch
    useEffect(() => {
        setIsClient(true);
        fetchFacilities();
    }, [fetchFacilities]);

    const t = {
        ar: {
            title: "إدارة المنشآت الإعلامية",
            add: "إضافة منشأة جديدة",
            export: "تصدير CSV",
            search: "البحث بالاسم أو الرقم المرجعي...",
            filters: { type: "النوع", city: "المدينة", all: "الكل" },
            table: { ref: "المرجع", name: "المنشأة", type: "النوع", city: "المدينة", status: "الحالة", actions: "العمليات" },
            actions: { edit: "تعديل", delete: "حذف" },
            confirmDelete: "هل أنت متأكد من حذف هذه المنشأة؟",
            types: { tv: "تلفزيون", radio: "إذاعة", data: "بيانات" },
            statuses: { active: "سارية", expired: "منتهية", suspended: "معلقة", renewing: "قيد التجديد" }
        },
        fr: {
            title: "Gestion des Établissements",
            add: "Ajouter un établissement",
            export: "Exporter CSV",
            search: "Rechercher par nom ou référence...",
            filters: { type: "Type", city: "Ville", all: "Tous" },
            table: { ref: "Réf", name: "Établissement", type: "Type", city: "Ville", status: "Statut", actions: "Actions" },
            actions: { edit: "Modifier", delete: "Supprimer" },
            confirmDelete: "Êtes-vous sûr de vouloir supprimer cet établissement ?",
            types: { tv: "Télévision", radio: "Radio", data: "Données" },
            statuses: { active: "Actif", expired: "Expiré", suspended: "Suspendu", renewing: "En renouvellement" }
        }
    }[locale as 'ar' | 'fr'];

    const filteredFacilities = facilities.filter(f => {
        const matchesSearch = f.name[locale as 'ar' | 'fr'].toLowerCase().includes(searchQuery.toLowerCase()) ||
            f.ref.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = filterType === 'all' || f.type === filterType;
        const matchesCity = filterCity === 'all' || f.city[locale as 'ar' | 'fr'] === filterCity;
        return matchesSearch && matchesType && matchesCity;
    });

    const uniqueCities = Array.from(new Set(facilities.map(f => f.city[locale as 'ar' | 'fr'])));

    const handleExportCSV = () => {
        const headers = [t.table.ref, t.table.name, t.table.type, t.table.city, t.table.status];
        const rows = filteredFacilities.map(f => [
            f.ref,
            f.name[locale as 'ar' | 'fr'],
            t.types[f.type],
            f.city[locale as 'ar' | 'fr'],
            t.statuses[f.status]
        ]);

        let csvContent = "data:text/csv;charset=utf-8,\ufeff"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `tdm_facilities_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDelete = (ref: string) => {
        if (window.confirm(t.confirmDelete)) {
            deleteFacility(ref);
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'active': return 'bg-brand-green/10 text-brand-green border-brand-green/20';
            case 'expired': return 'bg-brand-red/10 text-brand-red border-brand-red/20';
            case 'renewing': return 'bg-brand-yellow/10 text-brand-yellow border-brand-yellow/20';
            default: return 'bg-slate-100 text-slate-600 border-slate-200';
        }
    };

    if (!isClient) return null;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-800">{t.title}</h1>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleExportCSV}
                        className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-bold rounded-sm hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        {t.export}
                    </button>
                    <Link
                        href={`/${locale}/admin/facilities/new`}
                        className="px-4 py-2 bg-brand-green text-white font-bold rounded-sm hover:bg-brand-green/90 transition-colors flex items-center gap-2 text-sm shadow-sm"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        {t.add}
                    </Link>
                </div>
            </div>

            <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                    <input
                        type="text"
                        placeholder={t.search}
                        className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-sm focus:ring-brand-green focus:border-brand-green p-2.5 outline-none"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <select
                    className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-sm focus:ring-brand-green focus:border-brand-green p-2.5 outline-none"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                >
                    <option value="all">{t.filters.type}: {t.filters.all}</option>
                    {Object.entries(t.types).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
                <select
                    className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-sm focus:ring-brand-green focus:border-brand-green p-2.5 outline-none"
                    value={filterCity}
                    onChange={(e) => setFilterCity(e.target.value)}
                >
                    <option value="all">{t.filters.city}: {t.filters.all}</option>
                    {uniqueCities.map(city => <option key={city} value={city}>{city}</option>)}
                </select>
            </div>

            <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-slate-600">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">{t.table.ref}</th>
                                <th className="px-6 py-4">{t.table.name}</th>
                                <th className="px-6 py-4">{t.table.type}</th>
                                <th className="px-6 py-4">{t.table.city}</th>
                                <th className="px-6 py-4">{t.table.status}</th>
                                <th className="px-6 py-4 text-center">{t.table.actions}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredFacilities.map((f) => (
                                <tr key={f.ref} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-mono font-medium text-slate-900">{f.ref}</td>
                                    <td className="px-6 py-4 font-bold text-slate-800">{f.name[locale as 'ar' | 'fr']}</td>
                                    <td className="px-6 py-4 text-slate-600">{t.types[f.type]}</td>
                                    <td className="px-6 py-4 text-slate-600">{f.city[locale as 'ar' | 'fr']}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-0.5 rounded-sm text-xs font-bold border ${getStatusStyle(f.status)}`}>
                                            {t.statuses[f.status]}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-3">
                                            <Link
                                                href={`/${locale}/admin/facilities/${f.ref}/edit`}
                                                className="text-brand-green hover:underline font-bold text-xs"
                                            >
                                                {t.actions.edit}
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(f.ref)}
                                                className="text-brand-red hover:underline font-bold text-xs"
                                            >
                                                {t.actions.delete}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredFacilities.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                                        {locale === 'ar' ? 'لا توجد منشآت مطابقة' : 'Aucun établissement correspondant'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
