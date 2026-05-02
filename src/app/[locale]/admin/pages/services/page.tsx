'use client';

import { useState, useEffect, use } from 'react';
import { useContentStore } from '@/store/useContentStore';

export default function AdminServicesEditor({
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
        const pageContent = pages.services;
        if (pageContent) {
            setTitle(pageContent.title);
            setSections(pageContent.sections);
        }
    }, [pages.services]);

    const isAr = locale === 'ar';

    const handleSave = async () => {
        try {
            await updatePageContent('services', { id: 'services', title, sections });
            alert(isAr ? '✅ تم حفظ التغييرات بنجاح' : '✅ Changements enregistrés');
        } catch (err) {
            console.error(err);
            alert(isAr ? '❌ فشل الحفظ' : '❌ Échec de l\'enregistrement');
        }
    };

    const updateNestedField = (sectionKey: string, field: string, subField: string, value: string) => {
        const newSections = { ...sections };
        newSections[sectionKey][field][subField] = value;
        setSections(newSections);
    };

    if (!isClient || !sections.intro) return null;

    return (
        <div className="space-y-8 pb-20">
            <div className="flex items-center justify-between sticky top-0 bg-slate-50/80 backdrop-blur-md z-50 py-4 border-b">
                <h1 className="text-2xl font-extrabold text-slate-800">
                    {isAr ? 'تعديل صفحة الخدمات' : 'Éditer la page Services'}
                </h1>
                <button onClick={handleSave} className="px-10 py-2 bg-brand-green text-white font-black rounded-sm hover:bg-brand-green/90 transition-all shadow-lg">
                    {isAr ? 'حفظ التغييرات' : 'Enregistrer'}
                </button>
            </div>

            <div className="bg-white p-8 rounded-sm border border-slate-200 shadow-sm space-y-8">
                <h2 className="text-xl font-black text-slate-800 border-b pb-4 flex items-center gap-3">
                    <span className="w-2 h-8 bg-brand-green rounded-full"></span>
                    {isAr ? 'القسم التعريفي' : 'Section Introduction'}
                </h2>
                
                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <label className="admin-label">{isAr ? 'العنوان (عربي)' : 'Titre (AR)'}</label>
                        <input className="admin-input" value={sections.intro.title.ar} onChange={e => updateNestedField('intro', 'title', 'ar', e.target.value)} />
                        <label className="admin-label">{isAr ? 'المحتوى (عربي)' : 'Contenu (AR)'}</label>
                        <textarea rows={4} className="admin-textarea" value={sections.intro.content.ar} onChange={e => updateNestedField('intro', 'content', 'ar', e.target.value)} />
                    </div>
                    <div className="space-y-4">
                        <label className="admin-label">{isAr ? 'العنوان (فرنسي)' : 'Titre (FR)'}</label>
                        <input className="admin-input" value={sections.intro.title.fr} onChange={e => updateNestedField('intro', 'title', 'fr', e.target.value)} />
                        <label className="admin-label">{isAr ? 'المحتوى (فرنسي)' : 'Contenu (FR)'}</label>
                        <textarea rows={4} className="admin-textarea" value={sections.intro.content.fr} onChange={e => updateNestedField('intro', 'content', 'fr', e.target.value)} />
                    </div>
                </div>
            </div>
            
            <div className="p-10 text-center bg-slate-50 border border-dashed border-slate-200 rounded-sm">
                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">
                    {isAr ? 'سيتم إضافة إدارة قائمة الخدمات التفصيلية قريباً' : 'La gestion détaillée de la liste des services sera disponible bientôt'}
                </p>
            </div>
        </div>
    );
}
