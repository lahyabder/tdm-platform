'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLicenseStore, License, LicenseStatus } from '@/store/useLicenseStore';
import { useFacilityStore } from '@/store/useFacilityStore';
import { legislationData } from '@/mock/legislation';
import { format, addYears, parseISO } from 'date-fns';

interface LicenseFormProps {
    initialData?: License;
    locale: string;
    isEdit?: boolean;
}

export default function LicenseForm({ initialData, locale, isEdit }: LicenseFormProps) {
    const router = useRouter();
    const { addLicense, updateLicense, licenses } = useLicenseStore();
    const { facilities } = useFacilityStore();

    const [formData, setFormData] = useState<License>(
        initialData || {
            id: '',
            facilityRef: facilities[0]?.ref || '',
            issueDate: format(new Date(), 'yyyy-MM-dd'),
            expiryDate: format(addYears(new Date(), 5), 'yyyy-MM-dd'),
            validityYears: 5,
            renewalThresholdDays: 60,
            status: 'active',
            legislationId: legislationData[0]?.id || ''
        }
    );

    const [error, setError] = useState('');

    const t = {
        ar: {
            id: "رقم الترخيص",
            facility: "المنشأة المستفيدة",
            issueDate: "تاريخ الإصدار",
            expiryDate: "تاريخ الانتهاء",
            validity: "مدة الصلاحية (بالسنوات)",
            threshold: "تذكير بالتجديد (قبل X يوم)",
            status: "الحالة الحالية",
            legislation: "المرجعية التشريعية",
            notes: "ملاحظات إضافية",
            save: isEdit ? "تحديث الترخيص" : "إصدار الترخيص",
            cancel: "إلغاء",
            errorId: "رقم الترخيص هذا مسجل بالفعل.",
            selectFacility: "اختر المنشأة",
            selectLegislation: "اختر المرجع التشريعي",
            statuses: {
                active: "ساري",
                expired: "منتهي",
                pending: "قيد التجديد",
                suspended: "معلق"
            }
        },
        fr: {
            id: "Numéro de Licence",
            facility: "Établissement Bénéficiaire",
            issueDate: "Date d'émission",
            expiryDate: "Date d'expiration",
            validity: "Durée de validité (années)",
            threshold: "Seuil de renouvellement (jours)",
            status: "Statut actuel",
            legislation: "Référence Législative",
            notes: "Notes additionnelles",
            save: isEdit ? "Mettre à jour" : "Délivrer la licence",
            cancel: "Annuler",
            errorId: "Ce numéro de licence existe déjà.",
            selectFacility: "Choisir un établissement",
            selectLegislation: "Choisir une législation",
            statuses: {
                active: "Actif",
                expired: "Expiré",
                pending: "En renouvellement",
                suspended: "Suspendu"
            }
        }
    }[locale as 'ar' | 'fr'];

    const handleValidityChange = (years: number) => {
        try {
            const newExpiry = format(addYears(parseISO(formData.issueDate), years), 'yyyy-MM-dd');
            setFormData({ ...formData, validityYears: years, expiryDate: newExpiry });
        } catch (e) { }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!isEdit && licenses.some(l => l.id === formData.id)) {
            setError(t.errorId);
            return;
        }

        if (isEdit) {
            updateLicense(formData.id, formData);
        } else {
            addLicense(formData);
        }

        router.push(`/${locale}/admin/licenses`);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-sm border border-slate-200 shadow-sm space-y-6">
            {error && (
                <div className="p-4 bg-brand-red/10 border-l-4 border-brand-red text-brand-red text-sm font-bold flex items-center gap-2">
                    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2 border-b border-slate-100 pb-4">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">{locale === 'ar' ? 'بيانات الترخيص الأساسية' : 'Informations de Base'}</h3>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t.id}</label>
                    <input
                        type="text"
                        className={`w-full p-2.5 bg-slate-50 border border-slate-300 rounded-sm focus:ring-brand-green focus:border-brand-green outline-none font-mono ${isEdit ? 'opacity-50 cursor-not-allowed' : ''}`}
                        value={formData.id}
                        onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                        required
                        disabled={isEdit}
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t.facility}</label>
                    <select
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-sm focus:ring-brand-green focus:border-brand-green outline-none"
                        value={formData.facilityRef}
                        onChange={(e) => setFormData({ ...formData, facilityRef: e.target.value })}
                        required
                    >
                        <option value="">{t.selectFacility}</option>
                        {facilities.map(f => (
                            <option key={f.ref} value={f.ref}>{f.name[locale as 'ar' | 'fr']}</option>
                        ))}
                    </select>
                </div>

                <div className="md:col-span-2 border-b border-slate-100 pb-4 mt-4">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">{locale === 'ar' ? 'الفترة المرجعية والقانونية' : 'Validité et Cadre Légal'}</h3>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t.issueDate}</label>
                    <input
                        type="date"
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-sm focus:ring-brand-green focus:border-brand-green outline-none font-mono"
                        value={formData.issueDate}
                        onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t.validity}</label>
                    <input
                        type="number"
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-sm focus:ring-brand-green focus:border-brand-green outline-none font-mono"
                        value={formData.validityYears}
                        onChange={(e) => handleValidityChange(parseInt(e.target.value))}
                        required
                        min="1"
                        max="50"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t.expiryDate}</label>
                    <input
                        type="date"
                        className="w-full p-2.5 bg-slate-100 border border-slate-300 rounded-sm outline-none font-mono cursor-not-allowed"
                        value={formData.expiryDate}
                        readOnly
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t.legislation}</label>
                    <select
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-sm focus:ring-brand-green focus:border-brand-green outline-none"
                        value={formData.legislationId}
                        onChange={(e) => setFormData({ ...formData, legislationId: e.target.value })}
                        required
                    >
                        <option value="">{t.selectLegislation}</option>
                        {legislationData.map(l => (
                            <option key={l.id} value={l.id}>{l.title[locale as 'ar' | 'fr']} ({l.id})</option>
                        ))}
                    </select>
                </div>

                <div className="md:col-span-2 border-b border-slate-100 pb-4 mt-4">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">{locale === 'ar' ? 'تتبع الحالة' : 'Suivi du Statut'}</h3>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t.status}</label>
                    <select
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-sm focus:ring-brand-green focus:border-brand-green outline-none"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as LicenseStatus })}
                    >
                        {Object.entries(t.statuses).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t.threshold}</label>
                    <input
                        type="number"
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-sm focus:ring-brand-green focus:border-brand-green outline-none font-mono"
                        value={formData.renewalThresholdDays}
                        onChange={(e) => setFormData({ ...formData, renewalThresholdDays: parseInt(e.target.value) })}
                        required
                        min="10"
                        max="365"
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t.notes}</label>
                    <textarea
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-sm focus:ring-brand-green focus:border-brand-green outline-none"
                        rows={3}
                        value={formData.notes || ''}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    />
                </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-6 py-2 border border-slate-300 text-slate-600 font-bold rounded-sm hover:bg-slate-50 transition-colors"
                >
                    {t.cancel}
                </button>
                <button
                    type="submit"
                    className="px-6 py-2 bg-slate-900 border border-slate-900 text-white font-bold rounded-sm hover:bg-slate-800 transition-colors shadow-sm ring-1 ring-slate-900/5"
                >
                    {t.save}
                </button>
            </div>
        </form>
    );
}
