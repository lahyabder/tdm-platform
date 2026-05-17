'use client';

import { useState, useEffect, use } from 'react';
import { useLicenseStore, LicenseStatus } from '@/store/useLicenseStore';
import { useFacilityStore } from '@/store/useFacilityStore';
import Link from 'next/link';
import { format, addDays, isBefore, parseISO, differenceInDays } from 'date-fns';

export default function AdminLicensesPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params) as any;
    const { licenses, deleteLicense, fetchLicenses } = useLicenseStore();
    const { facilities, fetchFacilities } = useFacilityStore();

    const [filterStatus, setFilterStatus] = useState<LicenseStatus | 'all'>('all');
    const [expiryRange, setExpiryRange] = useState<string>('all');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        fetchLicenses();
        fetchFacilities();
    }, [fetchLicenses, fetchFacilities]);

    const t = {
        ar: {
            title: "إدارة التراخيص",
            add: "إصدار ترخيص جديد",
            export: "تصدير CSV",
            filters: {
                status: "الحالة",
                expiry: "تنتهي خلال",
                all: "الكل",
                days30: "30 يوم",
                days60: "60 يوم",
                days90: "90 يوم"
            },
            table: {
                id: "رقم الترخيص",
                facility: "المنشأة",
                expiry: "تاريخ الانتهاء",
                status: "الحالة",
                actions: "العمليات"
            },
            statuses: {
                active: "ساري",
                expired: "منتهي",
                pending: "قيد التجديد",
                suspended: "معلق"
            },
            confirmDelete: "هل أنت متأكد من حذف هذا الترخيص؟",
            actions: { edit: "تعديل", delete: "حذف" }
        },
        fr: {
            title: "Gestion des Licences",
            add: "Nouvelle Licence",
            export: "Exporter CSV",
            filters: {
                status: "Statut",
                expiry: "Expire dans",
                all: "Tous",
                days30: "30 jours",
                days60: "60 jours",
                days90: "90 jours"
            },
            table: {
                id: "N° Licence",
                facility: "Établissement",
                expiry: "Date d'expiration",
                status: "Statut",
                actions: "Actions"
            },
            statuses: {
                active: "Actif",
                expired: "Expiré",
                pending: "En renouvellement",
                suspended: "Suspendu"
            },
            confirmDelete: "Confirmez-vous la suppression de cette licence ?",
            actions: { edit: "Modifier", delete: "Supprimer" }
        }
    }[locale as 'ar' | 'fr'];

    const filteredLicenses = licenses.filter(l => {
        const matchesStatus = filterStatus === 'all' || l.status === filterStatus;

        let matchesExpiry = true;
        if (expiryRange !== 'all') {
            const days = parseInt(expiryRange);
            const today = new Date();
            const thresholdDate = addDays(today, days);
            const expiryDate = parseISO(l.expiryDate);
            matchesExpiry = isBefore(expiryDate, thresholdDate) && !isBefore(expiryDate, today);
        }

        return matchesStatus && matchesExpiry;
    });

    const getFacilityName = (ref: string) => {
        const f = facilities.find(fac => fac.ref === ref);
        return f ? f.name[locale as 'ar' | 'fr'] : ref;
    };

    const statusColors = {
        active: "bg-brand-green/10 text-brand-green border-brand-green/20",
        expired: "bg-brand-red/10 text-brand-red border-brand-red/20",
        pending: "bg-brand-yellow/10 text-brand-yellow border-brand-yellow/20",
        suspended: "bg-slate-100 text-slate-600 border-slate-200"
    };

    const handleExportCSV = () => {
        const headers = [t.table.id, t.table.facility, t.table.expiry, t.table.status];
        const rows = filteredLicenses.map(l => [
            l.id,
            getFacilityName(l.facilityRef),
            l.expiryDate,
            t.statuses[l.status]
        ]);

        let csvContent = "data:text/csv;charset=utf-8,\ufeff"
            + headers.join(",") + "\n"
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `tdm_licences_${format(new Date(), 'yyyy-MM-dd')}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (!isClient) return null;

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-2xl font-extrabold text-slate-800">{t.title}</h1>
                <div className="flex gap-3">
                    <button onClick={handleExportCSV} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 font-bold rounded-sm hover:bg-slate-50 transition-colors flex items-center gap-2 text-sm shadow-sm">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        {t.export}
                    </button>
                    <Link href={`/${locale}/admin/licenses/new`} className="px-4 py-2 bg-brand-green text-white font-bold rounded-sm hover:bg-brand-green/90 transition-colors flex items-center gap-2 text-sm shadow-sm ring-1 ring-brand-green/20">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                        {t.add}
                    </Link>
                </div>
            </div>

            <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-slate-500 uppercase px-1">{t.filters.status}</label>
                    <select
                        className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-sm focus:ring-brand-green focus:border-brand-green p-2.5 outline-none"
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value as any)}
                    >
                        <option value="all">{t.filters.all}</option>
                        {Object.entries(t.statuses).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                    </select>
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-slate-500 uppercase px-1">{t.filters.expiry}</label>
                    <select
                        className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-sm focus:ring-brand-green focus:border-brand-green p-2.5 outline-none"
                        value={expiryRange}
                        onChange={(e) => setExpiryRange(e.target.value)}
                    >
                        <option value="all">{t.filters.all}</option>
                        <option value="30">{t.filters.days30}</option>
                        <option value="60">{t.filters.days60}</option>
                        <option value="90">{t.filters.days90}</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-start rtl:text-end text-slate-600">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">{t.table.id}</th>
                                <th className="px-6 py-4">{t.table.facility}</th>
                                <th className="px-6 py-4">{t.table.expiry}</th>
                                <th className="px-6 py-4">{t.table.status}</th>
                                <th className="px-6 py-4 text-center">{t.table.actions}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredLicenses.map((l) => (
                                <tr key={l.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-mono font-medium text-slate-900">{l.id}</td>
                                    <td className="px-6 py-4 font-bold text-slate-800">
                                        <Link href={`/${locale}/admin/facilities/${l.facilityRef}/edit`} className="hover:text-brand-green underline decoration-slate-200 decoration-1 underline-offset-4">
                                            {getFacilityName(l.facilityRef)}
                                        </Link>
                                    </td>
                                    <td className="px-6 py-4 font-mono">{l.expiryDate}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-0.5 rounded-sm text-xs font-bold border ${statusColors[l.status]}`}>
                                            {t.statuses[l.status]}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-4">
                                            <Link href={`/${locale}/admin/licenses/${l.id}/edit`} className="text-brand-green hover:underline font-bold text-xs uppercase tracking-wider">{t.actions.edit}</Link>
                                            <button onClick={() => { if (window.confirm(t.confirmDelete)) deleteLicense(l.id); }} className="text-brand-red hover:underline font-bold text-xs uppercase tracking-wider">{t.actions.delete}</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
