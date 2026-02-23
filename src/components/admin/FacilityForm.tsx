'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MediaFacility } from '@/mock/mediaFacilities';
import { useFacilityStore } from '@/store/useFacilityStore';

interface FacilityFormProps {
    initialData?: MediaFacility;
    locale: string;
    isEdit?: boolean;
}

export default function FacilityForm({ initialData, locale, isEdit }: FacilityFormProps) {
    const router = useRouter();
    const { addFacility, updateFacility, facilities } = useFacilityStore();

    const [formData, setFormData] = useState<MediaFacility>(
        initialData || {
            ref: '',
            name: { ar: '', fr: '' },
            type: 'tv',
            city: { ar: '', fr: '' },
            status: 'active',
            expiryDate: new Date().toISOString().split('T')[0],
            legislationRef: ''
        }
    );

    const [error, setError] = useState('');

    const t = {
        ar: {
            officialName: "الاسم الرسمي (AR)",
            officialNameFr: "الاسم الرسمي (FR)",
            type: "النوع",
            city: "الولاية/المدينة (AR)",
            cityFr: "الولاية/المدينة (FR)",
            ref: "الرقم المرجعي (فريد)",
            legislation: "المرجعية التشريعية",
            expiry: "تاريخ الانتهاء",
            status: "الحالة",
            save: isEdit ? "حفظ التعديلات" : "إضافة المنشأة",
            cancel: "إلغاء",
            errorRef: "الرقم المرجعي مستخدم بالفعل من قبل منشأة أخرى.",
            types: { tv: "تلفزيون", radio: "إذاعة", data: "بيانات" },
            statuses: { active: "سارية", expired: "منتهية", suspended: "معلقة", renewing: "قيد التجديد" }
        },
        fr: {
            officialName: "Nom officiel (AR)",
            officialNameFr: "Nom officiel (FR)",
            type: "Type",
            city: "Ville/Région (AR)",
            cityFr: "Ville/Région (FR)",
            ref: "Référence (Unique)",
            legislation: "Référence Législative",
            expiry: "Date d'expiration",
            status: "Statut",
            save: isEdit ? "Sauvegarder les modifications" : "Ajouter l'établissement",
            cancel: "Annuler",
            errorRef: "La référence est déjà utilisée par un autre établissement.",
            types: { tv: "Télévision", radio: "Radio", data: "Données" },
            statuses: { active: "Actif", expired: "Expiré", suspended: "Suspendu", renewing: "En renouvellement" }
        }
    }[locale as 'ar' | 'fr'];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        // Check ref uniqueness for new facilities
        if (!isEdit && facilities.some(f => f.ref === formData.ref)) {
            setError(t.errorRef);
            return;
        }

        if (isEdit) {
            updateFacility(formData.ref, formData);
        } else {
            addFacility(formData);
        }

        router.push(`/${locale}/admin/facilities`);
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
                {/* Name Fields */}
                <div className="space-y-4 md:col-span-2 border-b border-slate-100 pb-4">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">{locale === 'ar' ? 'البيانات الأساسية' : 'Informations de base'}</h3>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t.officialName}</label>
                    <input
                        type="text"
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-sm focus:ring-brand-green focus:border-brand-green outline-none"
                        value={formData.name.ar}
                        onChange={(e) => setFormData({ ...formData, name: { ...formData.name, ar: e.target.value } })}
                        required
                        dir="rtl"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t.officialNameFr}</label>
                    <input
                        type="text"
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-sm focus:ring-brand-green focus:border-brand-green outline-none"
                        value={formData.name.fr}
                        onChange={(e) => setFormData({ ...formData, name: { ...formData.name, fr: e.target.value } })}
                        required
                        dir="ltr"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t.ref}</label>
                    <input
                        type="text"
                        className={`w-full p-2.5 bg-slate-50 border border-slate-300 rounded-sm focus:ring-brand-green focus:border-brand-green outline-none font-mono ${isEdit ? 'opacity-50 cursor-not-allowed' : ''}`}
                        value={formData.ref}
                        onChange={(e) => setFormData({ ...formData, ref: e.target.value })}
                        required
                        disabled={isEdit}
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t.type}</label>
                    <select
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-sm focus:ring-brand-green focus:border-brand-green outline-none"
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    >
                        {Object.entries(t.types).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                    </select>
                </div>

                <div className="space-y-4 md:col-span-2 border-b border-slate-100 pb-4 mt-4">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">{locale === 'ar' ? 'الموقع والتراخيص' : 'Localisation et Licences'}</h3>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t.city}</label>
                    <input
                        type="text"
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-sm focus:ring-brand-green focus:border-brand-green outline-none"
                        value={formData.city.ar}
                        onChange={(e) => setFormData({ ...formData, city: { ...formData.city, ar: e.target.value } })}
                        required
                        dir="rtl"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t.cityFr}</label>
                    <input
                        type="text"
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-sm focus:ring-brand-green focus:border-brand-green outline-none"
                        value={formData.city.fr}
                        onChange={(e) => setFormData({ ...formData, city: { ...formData.city, fr: e.target.value } })}
                        required
                        dir="ltr"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t.legislation}</label>
                    <input
                        type="text"
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-sm focus:ring-brand-green focus:border-brand-green outline-none"
                        value={formData.legislationRef}
                        onChange={(e) => setFormData({ ...formData, legislationRef: e.target.value })}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t.expiry}</label>
                    <input
                        type="date"
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-sm focus:ring-brand-green focus:border-brand-green outline-none font-mono"
                        value={formData.expiryDate}
                        onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t.status}</label>
                    <select
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-sm focus:ring-brand-green focus:border-brand-green outline-none"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    >
                        {Object.entries(t.statuses).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                    </select>
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
                    className="px-6 py-2 bg-slate-900 border border-slate-900 text-white font-bold rounded-sm hover:bg-slate-800 transition-colors shadow-sm"
                >
                    {t.save}
                </button>
            </div>
        </form>
    );
}
