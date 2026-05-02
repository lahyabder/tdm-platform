'use client';

import { useState } from 'react';
import { useLiveStore, LiveChannel } from '@/store/useLiveStore';

interface Props {
    locale: string;
    initialData?: LiveChannel;
    onClose: () => void;
}

export default function LiveChannelForm({ locale, initialData, onClose }: Props) {
    const { addChannel, updateChannel } = useLiveStore();
    const isAr = locale === 'ar';
    const isEdit = !!initialData;

    const [formData, setFormData] = useState<LiveChannel>(
        initialData || {
            id: '',
            type: 'tv',
            category: 'public',
            name: { ar: '', fr: '' },
            desc: { ar: '', fr: '' },
            url: '',
            logo: '',
            isActive: true
        }
    );

    const t = {
        ar: {
            title: isEdit ? "تعديل بيانات القناة" : "إضافة قناة جديدة",
            nameAr: "الاسم (بالعربية)",
            nameFr: "الاسم (بالفرنسية)",
            descAr: "الوصف (بالعربية)",
            descFr: "الوصف (بالفرنسية)",
            url: "رابط البث (URL)",
            type: "نوع البث",
            category: "الفئة",
            logo: "شعار القناة",
            save: "حفظ البيانات",
            cancel: "إلغاء",
            types: { tv: "تلفزيون", radio: "إذاعة" },
            categories: { public: "عمومية", private: "خاصة", international: "دولية" }
        },
        fr: {
            title: isEdit ? "Modifier la chaîne" : "Ajouter une chaîne",
            nameAr: "Nom (AR)",
            nameFr: "Nom (FR)",
            descAr: "Description (AR)",
            descFr: "Description (FR)",
            url: "URL du flux",
            type: "Type de flux",
            category: "Catégorie",
            logo: "Logo de la chaîne",
            save: "Enregistrer",
            cancel: "Annuler",
            types: { tv: "Télévision", radio: "Radio" },
            categories: { public: "Public", private: "Privé", international: "International" }
        }
    }[locale as 'ar' | 'fr'];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            updateChannel(initialData!.id, formData);
        } else {
            addChannel(formData);
        }
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-lg font-black text-slate-800 border-b pb-4 mb-6 flex items-center gap-2">
                <span className="w-2 h-6 bg-brand-green rounded-full"></span>
                {t.title}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Logo Section */}
                <div className="space-y-4">
                    <label className="admin-label">{t.logo}</label>
                    <div className="relative group aspect-square w-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-sm overflow-hidden flex items-center justify-center">
                        {formData.logo ? (
                            <>
                                <img src={formData.logo} alt="Logo" className="w-full h-full object-contain p-4" />
                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button 
                                        type="button"
                                        onClick={() => setFormData({...formData, logo: ''})}
                                        className="bg-brand-red text-white p-2 rounded-full hover:scale-110 transition-transform"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </div>
                            </>
                        ) : (
                            <div className="text-center p-4">
                                <svg className="w-12 h-12 text-slate-300 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{isAr ? 'رفع شعار' : 'Logo'}</p>
                            </div>
                        )}
                        <input 
                            type="file" accept="image/*"
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => setFormData({...formData, logo: reader.result as string});
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                    </div>
                </div>

                {/* Info Fields */}
                <div className="md:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="admin-label">{t.nameAr}</label>
                            <input required className="admin-input" value={formData.name.ar} onChange={e => setFormData({...formData, name: {...formData.name, ar: e.target.value}})} />
                        </div>
                        <div>
                            <label className="admin-label">{t.nameFr}</label>
                            <input required className="admin-input" value={formData.name.fr} onChange={e => setFormData({...formData, name: {...formData.name, fr: e.target.value}})} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="admin-label">{t.type}</label>
                            <select className="admin-input" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as any})}>
                                {Object.entries(t.types).map(([val, label]) => <option key={val} value={val}>{label}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="admin-label">{t.category}</label>
                            <select className="admin-input" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value as any})}>
                                {Object.entries(t.categories).map(([val, label]) => <option key={val} value={val}>{label}</option>)}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="admin-label">{t.url}</label>
                        <input required className="admin-input font-mono text-xs" value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} placeholder="https://..." />
                        <p className="text-[10px] text-slate-400 mt-1 italic">{isAr ? 'ملاحظة: لليوتيوب استخدم رابط الـ Embed' : 'Note: Utilisez le lien Embed pour YouTube'}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="admin-label">{t.descAr}</label>
                            <textarea className="admin-textarea" rows={3} value={formData.desc.ar} onChange={e => setFormData({...formData, desc: {...formData.desc, ar: e.target.value}})} />
                        </div>
                        <div>
                            <label className="admin-label">{t.descFr}</label>
                            <textarea className="admin-textarea" rows={3} value={formData.desc.fr} onChange={e => setFormData({...formData, desc: {...formData.desc, fr: e.target.value}})} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t">
                <button type="button" onClick={onClose} className="px-6 py-2 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-sm">{t.cancel}</button>
                <button type="submit" className="px-10 py-2 bg-slate-900 text-white text-sm font-black rounded-sm hover:bg-slate-800 shadow-lg shadow-slate-900/20">{t.save}</button>
            </div>
        </form>
    );
}
