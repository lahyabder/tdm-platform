'use client';

import { useState, useEffect, use } from 'react';
import { useContentStore } from '@/store/useContentStore';

export default function AdminContactEditor({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params) as any;
    const { pages, updatePageContent } = useContentStore();
    const [isClient, setIsClient] = useState(false);
    
    const [title, setTitle] = useState({ ar: '', fr: '' });
    const [sections, setSections] = useState<any>({});

    useEffect(() => {
        setIsClient(true);
        const contactContent = pages.contact;
        if (contactContent) {
            setTitle(contactContent.title);
            setSections(contactContent.sections);
        }
    }, [pages.contact]);

    const isAr = locale === 'ar';

    const handleSave = async () => {
        try {
            await updatePageContent('contact', { id: 'contact', title, sections });
            alert(isAr ? '✅ تم حفظ التغييرات بنجاح' : '✅ Changements enregistrés');
        } catch (err) {
            console.error(err);
            alert(isAr ? '❌ فشل الحفظ' : '❌ Échec de l\'enregistrement');
        }
    };

    const updateInfoField = (field: string, subField: string, value: string) => {
        setSections((prev: any) => ({
            ...prev,
            info: {
                ...prev.info,
                [field]: {
                    ...prev.info[field],
                    [subField]: value
                }
            }
        }));
    };

    if (!isClient || !sections.info) return null;

    return (
        <div className="space-y-8 pb-20">
            <div className="flex items-center justify-between sticky top-0 bg-slate-50/80 backdrop-blur-md z-50 py-4 border-b">
                <h1 className="text-2xl font-extrabold text-slate-800">
                    {isAr ? 'تعديل معلومات التواصل' : 'Éditer les Infos de Contact'}
                </h1>
                <button onClick={handleSave} className="px-10 py-2 bg-brand-green text-white font-black rounded-sm hover:bg-brand-green/90 transition-all shadow-lg">
                    {isAr ? 'حفظ التغييرات' : 'Enregistrer'}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Address */}
                <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm space-y-4">
                    <h2 className="font-black text-slate-800 flex items-center gap-2">
                        <span className="w-1.5 h-5 bg-brand-green rounded-full"></span>
                        {isAr ? 'العنوان الإداري' : 'Adresse'}
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="admin-label">{isAr ? 'بالعربية' : 'Arabe'}</label>
                            <input className="admin-input" value={sections.info.address.ar} onChange={e => updateInfoField('address', 'ar', e.target.value)} />
                        </div>
                        <div>
                            <label className="admin-label">{isAr ? 'بالفرنسية' : 'Français'}</label>
                            <input className="admin-input" value={sections.info.address.fr} onChange={e => updateInfoField('address', 'fr', e.target.value)} />
                        </div>
                    </div>
                </div>

                {/* Phone */}
                <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm space-y-4">
                    <h2 className="font-black text-slate-800 flex items-center gap-2">
                        <span className="w-1.5 h-5 bg-brand-yellow rounded-full"></span>
                        {isAr ? 'رقم الهاتف' : 'Téléphone'}
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="admin-label">{isAr ? 'بالعربية' : 'Arabe'}</label>
                            <input className="admin-input" value={sections.info.phone.ar} onChange={e => updateInfoField('phone', 'ar', e.target.value)} />
                        </div>
                        <div>
                            <label className="admin-label">{isAr ? 'بالفرنسية' : 'Français'}</label>
                            <input className="admin-input" value={sections.info.phone.fr} onChange={e => updateInfoField('phone', 'fr', e.target.value)} />
                        </div>
                    </div>
                </div>

                {/* Email */}
                <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm space-y-4">
                    <h2 className="font-black text-slate-800 flex items-center gap-2">
                        <span className="w-1.5 h-5 bg-brand-red rounded-full"></span>
                        {isAr ? 'البريد الإلكتروني' : 'Email'}
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="admin-label">{isAr ? 'بالعربية' : 'Arabe'}</label>
                            <input className="admin-input" value={sections.info.email.ar} onChange={e => updateInfoField('email', 'ar', e.target.value)} />
                        </div>
                        <div>
                            <label className="admin-label">{isAr ? 'بالفرنسية' : 'Français'}</label>
                            <input className="admin-input" value={sections.info.email.fr} onChange={e => updateInfoField('email', 'fr', e.target.value)} />
                        </div>
                    </div>
                </div>

                {/* Working Hours */}
                <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm space-y-4">
                    <h2 className="font-black text-slate-800 flex items-center gap-2">
                        <span className="w-1.5 h-5 bg-blue-500 rounded-full"></span>
                        {isAr ? 'ساعات العمل' : 'Heures de Travail'}
                    </h2>
                    <div className="space-y-4">
                        <div>
                            <label className="admin-label">{isAr ? 'بالعربية' : 'Arabe'}</label>
                            <input className="admin-input" value={sections.info.hours.ar} onChange={e => updateInfoField('hours', 'ar', e.target.value)} />
                        </div>
                        <div>
                            <label className="admin-label">{isAr ? 'بالفرنسية' : 'Français'}</label>
                            <input className="admin-input" value={sections.info.hours.fr} onChange={e => updateInfoField('hours', 'fr', e.target.value)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
