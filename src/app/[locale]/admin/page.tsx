'use client';

import { useLicenseStore } from '@/store/useLicenseStore';
import { useFacilityStore } from '@/store/useFacilityStore';
import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { differenceInDays, parseISO, isBefore } from 'date-fns';

export default function AdminDashboard({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params) as any;
    const { licenses } = useLicenseStore();
    const { facilities } = useFacilityStore();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const t = {
        ar: {
            welcome: "مرحباً بك في لوحة تحكم TDM",
            subtitle: "نظرة عامة على نشاط المنشآت الإعلامية والتراخيص",
            stats: {
                activeLicenses: "التراخيص السارية",
                pendingRenewals: "طلبات التجديد",
                totalFacilities: "إجمالي المنشآت",
                recentDocs: "الوثائق المضافة مؤخراً"
            },
            alerts: {
                title: "تنبيهات التجديد",
                expiringSoon: "تراخيص ستنتهي قريبًا",
                viewAll: "عرض الكل",
                daysLeft: "يوم متبقي",
                today: "تنتهي اليوم!"
            },
            recentActivity: "أحدث النشاطات",
            noActivity: "لا توجد نشاطات حديثة لعرضها"
        },
        fr: {
            welcome: "Bienvenue sur le tableau de bord TDM",
            subtitle: "Aperçu de l'activité des établissements médias et des licences",
            stats: {
                activeLicenses: "Licences actives",
                pendingRenewals: "Demandes de renouvellement",
                totalFacilities: "Établissements totaux",
                recentDocs: "Documents récents"
            },
            alerts: {
                title: "Alertes de renouvellement",
                expiringSoon: "Licences expirant bientôt",
                viewAll: "Voir tout",
                daysLeft: "jours restants",
                today: "Expire aujourd'hui !"
            },
            recentActivity: "Activité Récente",
            noActivity: "Aucune activité récente à afficher"
        }
    }[locale as 'ar' | 'fr'];

    const expiringLicenses = licenses.filter(l => {
        if (l.status !== 'active') return false;
        const today = new Date();
        const expiry = parseISO(l.expiryDate);
        const diff = differenceInDays(expiry, today);
        return diff >= 0 && diff <= l.renewalThresholdDays;
    }).map(l => {
        const today = new Date();
        const expiry = parseISO(l.expiryDate);
        const diff = differenceInDays(expiry, today);
        const facility = facilities.find(f => f.ref === l.facilityRef);
        return { ...l, daysLeft: diff, facilityName: facility ? facility.name[locale as 'ar' | 'fr'] : l.facilityRef };
    });

    if (!isClient) return null;

    return (
        <div className="space-y-6">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-slate-800 mb-2">{t.welcome}</h1>
                <p className="text-slate-500">{t.subtitle}</p>
            </div>

            {/* Alerts Section (Expiring Soon) */}
            {expiringLicenses.length > 0 && (
                <div className="bg-brand-red/5 border border-brand-red/20 rounded-sm p-6 mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-sm font-black text-brand-red uppercase tracking-widest flex items-center gap-2">
                            <svg className="w-5 h-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                            {t.alerts.expiringSoon}
                        </h2>
                        <Link href={`/${locale}/admin/licenses`} className="text-xs font-bold text-brand-red hover:underline uppercase">
                            {t.alerts.viewAll}
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {expiringLicenses.slice(0, 3).map(l => (
                            <div key={l.id} className="bg-white p-4 border border-brand-red/10 shadow-sm rounded-sm flex flex-col gap-1">
                                <div className="flex justify-between items-start">
                                    <span className="text-xs font-mono text-slate-400">{l.id}</span>
                                    <span className={`text-xs font-bold ${l.daysLeft <= 15 ? 'text-brand-red' : 'text-brand-yellow'}`}>
                                        {l.daysLeft === 0 ? t.alerts.today : `${l.daysLeft} ${t.alerts.daysLeft}`}
                                    </span>
                                </div>
                                <p className="text-sm font-bold text-slate-800 line-clamp-1">{l.facilityName}</p>
                                <p className="text-[10px] text-slate-400 uppercase mt-1">Expiry: {l.expiryDate}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { label: t.stats.activeLicenses, value: licenses.filter(l => l.status === 'active').length.toString(), color: "text-brand-green", bg: "bg-brand-green/10" },
                    { label: t.stats.pendingRenewals, value: licenses.filter(l => l.status === 'pending').length.toString(), color: "text-brand-yellow", bg: "bg-brand-yellow/10" },
                    { label: t.stats.totalFacilities, value: facilities.length.toString(), color: "text-slate-800", bg: "bg-slate-100" },
                    { label: t.stats.recentDocs, value: "24", color: "text-brand-red", bg: "bg-brand-red/10" },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm flex items-center gap-4 hover:border-brand-green/30 transition-colors">
                        <div className={`w-14 h-14 rounded-full flex items-center justify-center ${stat.bg}`}>
                            <span className={`text-2xl font-black ${stat.color}`}>{stat.value}</span>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Recent Activity Placeholder */}
            <div className="bg-white rounded-sm border border-slate-200 shadow-sm mt-8">
                <div className="p-6 border-b border-slate-100 bg-slate-50">
                    <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                        {t.recentActivity}
                    </h2>
                </div>
                <div className="p-12 text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-200">
                        <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <p className="text-slate-500 text-sm">{t.noActivity}</p>
                </div>
            </div>
        </div>
    );
}
