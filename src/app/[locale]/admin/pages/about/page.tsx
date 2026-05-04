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
            
            // Ensure core sections exist for editing
            const coreSections = ['intro', 'vision', 'mission', 'values'];
            const mergedSections = { ...aboutContent.sections };
            coreSections.forEach(key => {
                if (!mergedSections[key]) {
                    mergedSections[key] = { 
                        title: { ar: '', fr: '' }, 
                        content: { ar: '', fr: '' } 
                    };
                }
            });
            setSections(mergedSections);
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
        setSections((prev: any) => {
            const newSections = { ...prev };
            if (!newSections[sectionKey]) newSections[sectionKey] = {};
            
            if (subField) {
                newSections[sectionKey][field] = {
                    ...(newSections[sectionKey][field] || {}),
                    [subField]: value
                };
            } else {
                newSections[sectionKey][field] = value;
            }
            return newSections;
        });
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
                {/* Director Word Section */}
                <div className="bg-white p-8 rounded-sm border border-slate-200 shadow-sm space-y-8">
                    <h2 className="text-xl font-black text-slate-800 border-b pb-4 flex items-center gap-3">
                        <span className="w-2 h-8 bg-brand-yellow rounded-full"></span>
                        {isAr ? 'كلمة المدير العام' : 'Mot du Directeur Général'}
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Image Upload */}
                        <div className="space-y-4">
                            <label className="admin-label">{isAr ? 'صورة المدير العام' : 'Photo du DG'}</label>
                            <div className="relative aspect-[3/4] bg-slate-100 border-2 border-dashed border-slate-200 rounded-sm overflow-hidden flex items-center justify-center group">
                                {sections.director_word?.image ? (
                                    <img src={sections.director_word.image} alt="DG" className="w-full h-full object-cover" />
                                ) : (
                                    <span className="text-slate-400 text-[10px] uppercase font-black">{isAr ? 'رفع صورة' : 'Uploader'}</span>
                                )}
                                <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => updateNestedField('director_word', 'image', null, reader.result);
                                        reader.readAsDataURL(file);
                                    }
                                }} />
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="md:col-span-3 space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="admin-label">{isAr ? 'الاسم (عربي)' : 'Nom (AR)'}</label>
                                    <input className="admin-input" value={sections.director_word?.name?.ar || sections.director_word?.author?.ar || ''} onChange={e => updateNestedField('director_word', 'name', 'ar', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <label className="admin-label">{isAr ? 'الاسم (فرنسي)' : 'Nom (FR)'}</label>
                                    <input className="admin-input" value={sections.director_word?.name?.fr || sections.director_word?.author?.fr || ''} onChange={e => updateNestedField('director_word', 'name', 'fr', e.target.value)} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="admin-label">{isAr ? 'المنصب (عربي)' : 'Fonction (AR)'}</label>
                                    <input className="admin-input" value={sections.director_word?.role?.ar || ''} onChange={e => updateNestedField('director_word', 'role', 'ar', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <label className="admin-label">{isAr ? 'المنصب (فرنسي)' : 'Fonction (FR)'}</label>
                                    <input className="admin-input" value={sections.director_word?.role?.fr || ''} onChange={e => updateNestedField('director_word', 'role', 'fr', e.target.value)} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="admin-label">{isAr ? 'المحتوى (عربي)' : 'Contenu (AR)'}</label>
                                    <textarea rows={8} className="admin-textarea" value={sections.director_word?.content?.ar || ''} onChange={e => updateNestedField('director_word', 'content', 'ar', e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <label className="admin-label">{isAr ? 'المحتوى (فرنسي)' : 'Contenu (FR)'}</label>
                                    <textarea rows={8} className="admin-textarea" value={sections.director_word?.content?.fr || ''} onChange={e => updateNestedField('director_word', 'content', 'fr', e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Other Sections */}
                {Object.entries(sections).map(([key, section]: [string, any]) => {
                    if (key === 'director_word') return null;
                    return (
                        <div key={key} className="bg-white p-8 rounded-sm border border-slate-200 shadow-sm space-y-8">
                            <h2 className="text-xl font-black text-slate-800 border-b pb-4 flex items-center gap-3">
                                <span className="w-2 h-8 bg-brand-green rounded-full"></span>
                                {isAr ? section.title?.ar : section.title?.fr}
                            </h2>
                            <div className="grid grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <label className="admin-label">{isAr ? 'العنوان (عربي)' : 'Titre (AR)'}</label>
                                    <input className="admin-input" value={section.title?.ar || ''} onChange={e => updateNestedField(key, 'title', 'ar', e.target.value)} />
                                    <label className="admin-label">{isAr ? 'المحتوى (عربي)' : 'Contenu (AR)'}</label>
                                    <textarea rows={4} className="admin-textarea" value={section.content?.ar || ''} onChange={e => updateNestedField(key, 'content', 'ar', e.target.value)} />
                                </div>
                                <div className="space-y-4">
                                    <label className="admin-label">{isAr ? 'العنوان (فرنسي)' : 'Titre (FR)'}</label>
                                    <input className="admin-input" value={section.title?.fr || ''} onChange={e => updateNestedField(key, 'title', 'fr', e.target.value)} />
                                    <label className="admin-label">{isAr ? 'المحتوى (فرنسي)' : 'Contenu (FR)'}</label>
                                    <textarea rows={4} className="admin-textarea" value={section.content?.fr || ''} onChange={e => updateNestedField(key, 'content', 'fr', e.target.value)} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
