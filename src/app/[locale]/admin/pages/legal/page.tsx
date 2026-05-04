'use client';

import { useState, useEffect, use } from 'react';
import { useContentStore } from '@/store/useContentStore';
import Link from 'next/link';

export default function AdminLegalEditor({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params) as any;
    const { pages, updatePageContent, fetchContent, isLoading } = useContentStore();
    const [isClient, setIsClient] = useState(false);
    
    const [title, setTitle] = useState({ ar: '', fr: '' });
    const [sections, setSections] = useState<any>({});

    useEffect(() => {
        setIsClient(true);
        fetchContent();
    }, []);

    useEffect(() => {
        const pageContent = pages.legal;
        if (pageContent) {
            setTitle(pageContent.title);
            setSections(pageContent.sections);
        }
    }, [pages.legal]);

    const isAr = locale === 'ar';

    const handleSave = async () => {
        try {
            await updatePageContent('legal', { id: 'legal', title, sections });
            alert(isAr ? '✅ تم حفظ التغييرات بنجاح' : '✅ Changements enregistrés');
        } catch (err) {
            console.error(err);
            alert(isAr ? '❌ فشل الحفظ' : '❌ Échec de l\'enregistrement');
        }
    };

    const updateNestedField = (sectionKey: string, field: string, subField: string, value: string) => {
        const newSections = { ...sections };
        if (!newSections[sectionKey]) newSections[sectionKey] = {};
        if (!newSections[sectionKey][field]) newSections[sectionKey][field] = {};
        newSections[sectionKey][field][subField] = value;
        setSections(newSections);
    };

    if (!isClient || isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-8 h-8 border-4 border-brand-green border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const introData = sections?.intro || {
        title: { ar: '', fr: '' },
        content: { ar: '', fr: '' }
    };

    return (
        <div className="space-y-8 pb-20 animate-in fade-in duration-500">
            <div className="flex items-center justify-between sticky top-0 bg-slate-50/80 backdrop-blur-md z-50 py-4 border-b">
                <h1 className="text-2xl font-extrabold text-slate-800">
                    {isAr ? 'تعديل صفحة المرجعيات التشريعية' : 'Éditer la page Législation'}
                </h1>
                <button onClick={handleSave} className="px-10 py-2 bg-brand-green text-white font-black rounded-sm hover:bg-brand-green/90 transition-all shadow-lg">
                    {isAr ? 'حفظ التغييرات' : 'Enregistrer'}
                </button>
            </div>

            <div className="bg-white p-8 rounded-sm border border-slate-200 shadow-sm space-y-8">
                <h2 className="text-xl font-black text-slate-800 border-b pb-4 flex items-center gap-3">
                    <span className="w-2 h-8 bg-brand-red rounded-full"></span>
                    {isAr ? 'القسم التعريفي' : 'Section Introduction'}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <label className="admin-label">{isAr ? 'العنوان (عربي)' : 'Titre (AR)'}</label>
                        <input className="admin-field" value={introData.title?.ar || ''} onChange={e => updateNestedField('intro', 'title', 'ar', e.target.value)} />
                        <label className="admin-label">{isAr ? 'المحتوى (عربي)' : 'Contenu (AR)'}</label>
                        <textarea rows={6} className="admin-field" value={introData.content?.ar || ''} onChange={e => updateNestedField('intro', 'content', 'ar', e.target.value)} />
                    </div>
                    <div className="space-y-4">
                        <label className="admin-label">{isAr ? 'العنوان (فرنسي)' : 'Titre (FR)'}</label>
                        <input className="admin-field" value={introData.title?.fr || ''} onChange={e => updateNestedField('intro', 'title', 'fr', e.target.value)} />
                        <label className="admin-label">{isAr ? 'المحتوى (فرنسي)' : 'Contenu (FR)'}</label>
                        <textarea rows={6} className="admin-field" value={introData.content?.fr || ''} onChange={e => updateNestedField('intro', 'content', 'fr', e.target.value)} />
                    </div>
                </div>
            </div>
            
            {/* Quick link to item manager */}
            <div className="p-8 bg-slate-900 rounded-sm text-white flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-black">{isAr ? 'إدارة بنود القوانين والمراسيم' : 'Gérer les articles de loi'}</h3>
                    <p className="text-slate-400 text-sm mt-1">{isAr ? 'انتقل إلى المحرر المخصص لإضافة وتعديل نصوص القوانين' : 'Accéder à l\'éditeur pour ajouter des textes de loi'}</p>
                </div>
                <Link href={`/${locale}/admin/legal`} className="glass-button">
                    {isAr ? 'فتح مدير النصوص' : 'Ouvrir le gestionnaire'}
                </Link>
            </div>
        </div>
    );
}
