'use client';

import { useState, useEffect, use } from 'react';
import { useContentStore } from '@/store/useContentStore';

export default function AdminAboutEditor({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params) as any;
    const { pages, updatePageContent, fetchContent } = useContentStore();
    const [isClient, setIsClient] = useState(false);
    
    const [title, setTitle] = useState({ ar: '', fr: '' });
    const [sections, setSections] = useState<any>({});

    useEffect(() => {
        setIsClient(true);
        fetchContent();
    }, []);

    useEffect(() => {
        const aboutContent = pages.about;
        if (aboutContent) {
            setTitle(aboutContent.title);
            setSections(aboutContent.sections);
        }
    }, [pages.about]);

    const isAr = locale === 'ar';

    const handleSave = async () => {
        try {
            await updatePageContent('about', { id: 'about', title, sections });
            alert(isAr ? '✅ تم حفظ التغييرات بنجاح' : '✅ Changements enregistrés');
        } catch (err: any) {
            console.error("Save Operation Error:", err);
            alert(isAr ? `❌ فشل الحفظ: ${err.message || 'خطأ غير معروف'}` : `❌ Échec: ${err.message || 'Erreur inconnue'}`);
        }
    };

    const updateNestedField = (sectionKey: string, field: string, subField: string | null, value: any) => {
        const newSections = { ...sections };
        if (subField) {
            newSections[sectionKey][field][subField] = value;
        } else {
            newSections[sectionKey][field] = value;
        }
        setSections(newSections);
    };

    if (!isClient || !sections) return null;

    return (
        <div className="space-y-8 pb-20">
            <div className="flex items-center justify-between sticky top-0 bg-slate-50/80 backdrop-blur-md z-50 py-4 border-b">
                <h1 className="text-2xl font-extrabold text-slate-800">
                    {isAr ? 'تعديل صفحة عن المؤسسة' : 'Éditer la page À propos'}
                </h1>
                <button onClick={handleSave} className="px-10 py-2 bg-brand-green text-white font-black rounded-sm hover:bg-brand-green/90 transition-all shadow-lg">
                    {isAr ? 'حفظ التغييرات' : 'Enregistrer'}
                </button>
            </div>

            <div className="space-y-12">

                {/* Other Sections */}
                {Object.entries(sections).map(([key, section]: [string, any]) => {
                    return (
                        <div key={key} className="bg-white p-8 rounded-sm border border-slate-200 shadow-sm space-y-8">
                            <h2 className="text-xl font-black text-slate-800 border-b pb-4 flex items-center gap-3">
                                <span className="w-2 h-8 bg-brand-green rounded-full"></span>
                                {isAr ? section.title.ar : section.title.fr}
                            </h2>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="admin-label">{isAr ? 'العنوان (عربي)' : 'Titre (AR)'}</label>
                                    <input className="admin-input" value={section.title.ar} onChange={e => updateNestedField(key, 'title', 'ar', e.target.value)} />
                                    <label className="admin-label">{isAr ? 'المحتوى (عربي)' : 'Contenu (AR)'}</label>
                                    <textarea rows={4} className="admin-textarea" value={section.content.ar} onChange={e => updateNestedField(key, 'content', 'ar', e.target.value)} />
                                </div>
                                <div className="space-y-4">
                                    <label className="admin-label">{isAr ? 'العنوان (فرنسي)' : 'Titre (FR)'}</label>
                                    <input className="admin-input" value={section.title.fr} onChange={e => updateNestedField(key, 'title', 'fr', e.target.value)} />
                                    <label className="admin-label">{isAr ? 'المحتوى (فرنسي)' : 'Contenu (FR)'}</label>
                                    <textarea rows={4} className="admin-textarea" value={section.content.fr} onChange={e => updateNestedField(key, 'content', 'fr', e.target.value)} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
