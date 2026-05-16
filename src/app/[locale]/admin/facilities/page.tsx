'use client';

import { useState, useEffect, use } from 'react';
import { useFacilityStore } from '@/store/useFacilityStore';
import Link from 'next/link';
import { MediaFacility } from '@/mock/mediaFacilities';
import { Plus, Edit2, Trash2, Download, Search, Filter } from 'lucide-react';

export default function AdminFacilitiesPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params) as any;
    const { facilities, deleteFacility, fetchFacilities } = useFacilityStore();
    const isAr = locale === 'ar';
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
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter">{t.title}</h1>
                    <p className="text-slate-500 font-bold mt-1 uppercase text-[10px] tracking-widest">{facilities.length} {isAr ? 'منشأة مسجلة' : 'établissements enregistrés'}</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={handleExportCSV}
                        className="px-6 py-3 bg-white border border-slate-200 text-slate-900 font-black rounded-xl hover:bg-slate-50 transition-all flex items-center gap-3 text-xs uppercase tracking-widest shadow-sm"
                    >
                        <Download className="w-4 h-4" />
                        {t.export}
                    </button>
                    <Link
                        href={`/${locale}/admin/facilities/new`}
                        className="px-8 py-3 bg-brand-green text-white font-black rounded-xl hover:bg-brand-green/90 transition-all flex items-center gap-3 text-xs uppercase tracking-widest shadow-lg shadow-brand-green/20"
                    >
                        <Plus className="w-4 h-4" />
                        {t.add}
                    </Link>
                </div>
            </div>

            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="relative">
                    <input
                        type="text"
                        placeholder={t.search}
                        className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-sm font-bold rounded-xl focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green p-4 outline-none transition-all"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <select
                    className="bg-slate-50 border border-slate-200 text-slate-900 text-sm font-black rounded-xl focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green p-4 outline-none appearance-none transition-all cursor-pointer"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                >
                    <option value="all">{t.filters.type}: {t.filters.all}</option>
                    {Object.entries(t.types).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </select>
                <select
                    className="bg-slate-50 border border-slate-200 text-slate-900 text-sm font-black rounded-xl focus:ring-4 focus:ring-brand-green/10 focus:border-brand-green p-4 outline-none appearance-none transition-all cursor-pointer"
                    value={filterCity}
                    onChange={(e) => setFilterCity(e.target.value)}
                >
                    <option value="all">{t.filters.city}: {t.filters.all}</option>
                    {uniqueCities.map(city => <option key={city} value={city}>{city}</option>)}
                </select>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-start rtl:text-end text-slate-600">
                        <thead className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em] bg-slate-50/50 border-b border-slate-100">
                            <tr>
                                <th className="px-8 py-6">{t.table.ref}</th>
                                <th className="px-8 py-6">{t.table.name}</th>
                                <th className="px-8 py-6">{t.table.type}</th>
                                <th className="px-8 py-6">{t.table.city}</th>
                                <th className="px-8 py-6">{t.table.status}</th>
                                <th className="px-8 py-6 text-center">{t.table.actions}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredFacilities.map((f) => (
                                <tr key={f.ref} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-6 font-mono font-black text-[10px] text-slate-400">{f.ref}</td>
                                    <td className="px-8 py-6">
                                        <p className="font-black text-slate-900 text-base group-hover:text-brand-green transition-colors">{f.name[locale as 'ar' | 'fr']}</p>
                                    </td>
                                    <td className="px-8 py-6 font-bold text-slate-500 uppercase text-[10px] tracking-widest">{t.types[f.type]}</td>
                                    <td className="px-8 py-6 font-bold text-slate-500 uppercase text-[10px] tracking-widest">{f.city[locale as 'ar' | 'fr']}</td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(f.status)}`}>
                                            {t.statuses[f.status]}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center justify-center gap-4">
                                            <Link
                                                href={`/${locale}/admin/facilities/${f.ref}/edit`}
                                                className="w-10 h-10 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-950 hover:text-white transition-all shadow-sm"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(f.ref)}
                                                className="w-10 h-10 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-brand-red hover:text-white transition-all shadow-sm"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredFacilities.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-8 py-12 text-center text-slate-400 font-bold">
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
