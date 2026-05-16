'use client';

import { useState, useEffect } from 'react';
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
            legislationRef: '',
            logoUrl: ''
        }
    );

    // Sync formData with initialData when it loads
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const [error, setError] = useState('');

    const isAr = locale === 'ar';

    const t = {
        ar: {
            identity: "هوية المنشأة",
            logo: "شعار المنشأة",
            uploadLogo: "رفع شعار جديد",
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
            identity: "Identité",
            logo: "Logo de l'établissement",
            uploadLogo: "Uploader un logo",
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
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-sm border border-slate-200 shadow-sm space-y-8">
            {error && (
                <div className="p-4 bg-brand-red/10 border-s-4 border-brand-red text-brand-red text-sm font-bold flex items-center gap-2">
                    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {error}
                </div>
            )}

            {/* Logo Section */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-4">
                    <span className="w-2 h-6 bg-brand-green rounded-full"></span>
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">{t.identity}</h3>
                </div>
                
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start pt-2">
                    <div className="w-32 h-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-sm overflow-hidden flex items-center justify-center relative group shrink-0">
                        {formData.logoUrl ? (
                            <>
                                <img src={formData.logoUrl} alt="Logo" className="w-full h-full object-contain p-2" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button 
                                        type="button"
                                        onClick={() => setFormData({...formData, logoUrl: ''})}
                                        className="bg-brand-red text-white p-1.5 rounded-full hover:scale-110 transition-transform"
                                    >
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </div>
                            </>
                        ) : (
                            <svg className="w-12 h-12 text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 00-2 2z" /></svg>
                        )}
                    </div>
                    
                    <div className="flex-1 space-y-4 w-full">
                        <label className="admin-label">{t.logo}</label>
                        <div className="relative group max-w-md">
                            <input 
                                type="file" 
                                accept="image/*"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setFormData({...formData, logoUrl: reader.result as string});
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                            <div className="border border-slate-200 bg-slate-50 rounded-sm px-6 py-4 flex items-center justify-between group-hover:border-brand-green group-hover:bg-white transition-all shadow-sm">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-white rounded-full text-brand-green shadow-sm">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                                    </div>
                                    <span className="text-sm font-bold text-slate-700">{t.uploadLogo}</span>
                                </div>
                                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">PNG, SVG (Max 1MB)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name Fields */}
                <div className="space-y-4 md:col-span-2 border-b border-slate-100 pb-4 mt-4">
                    <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest">{isAr ? 'البيانات الأساسية' : 'Informations de base'}</h3>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t.officialName}</label>
                    <input
                        type="text"
                        className="admin-input"
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
                        className="admin-input"
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
                        className={`admin-input font-mono ${isEdit ? 'opacity-50 cursor-not-allowed' : ''}`}
                        value={formData.ref}
                        onChange={(e) => setFormData({ ...formData, ref: e.target.value })}
                        required
                        disabled={isEdit}
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t.type}</label>
                    <select
                        className="admin-input"
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
                        className="admin-input"
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
                        className="admin-input"
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
                        className="admin-input"
                        value={formData.legislationRef}
                        onChange={(e) => setFormData({ ...formData, legislationRef: e.target.value })}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t.expiry}</label>
                    <input
                        type="date"
                        className="admin-input font-mono"
                        value={formData.expiryDate}
                        onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t.status}</label>
                    <select
                        className="admin-input"
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
