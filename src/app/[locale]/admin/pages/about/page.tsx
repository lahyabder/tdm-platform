'use client';

import { useState, useEffect, use } from 'react';
import { useContentStore } from '@/store/useContentStore';
import { useRouter } from 'next/navigation';

export default function AdminAboutEditor({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params) as any;
    const { pages, updatePageContent } = useContentStore();
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    
    const [title, setTitle] = useState('');
    const [sections, setSections] = useState<any>({});

    useEffect(() => {
        setIsClient(true);
        const aboutContent = pages.about;
        if (aboutContent) {
            setTitle(aboutContent.title);
            setSections(aboutContent.sections);
        }
    }, [pages.about]);

    const handleSave = () => {
        updatePageContent('about', { title, sections });
        alert(locale === 'ar' ? 'تم حفظ التغييرات بنجاح' : 'Changements enregistrés avec succès');
    };

    const updateSection = (key: string, field: string, value: string) => {
        setSections({
            ...sections,
            [key]: {
                ...sections[key],
                [field]: value
            }
        });
    };

    if (!isClient) return null;

    const isAr = locale === 'ar';

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-800">
                        {isAr ? 'تعديل صفحة عن المؤسسة' : 'Éditer la page À propos'}
                    </h1>
                </div>
                <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-brand-green text-white font-black rounded-sm hover:bg-brand-green/90 transition-all shadow-lg shadow-brand-green/20"
                >
                    {isAr ? 'حفظ التغييرات' : 'Enregistrer'}
                </button>
            </div>

            <div className="space-y-6">
                {/* Director Word Section */}
                <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm space-y-6">
                    <h2 className="text-lg font-black text-slate-800 border-b pb-4 flex items-center gap-2">
                        <span className="w-2 h-6 bg-brand-yellow rounded-full"></span>
                        {isAr ? 'كلمة المدير العام' : 'Mot du Directeur Général'}
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">{isAr ? 'الاسم' : 'Nom'}</label>
                            <input 
                                type="text"
                                className="w-full bg-slate-50 border border-slate-200 p-3 rounded-sm outline-none focus:border-brand-green"
                                value={sections.director_word?.author || ''}
                                onChange={(e) => updateSection('director_word', 'author', e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">{isAr ? 'العنوان' : 'Titre'}</label>
                            <input 
                                type="text"
                                className="w-full bg-slate-50 border border-slate-200 p-3 rounded-sm outline-none focus:border-brand-green"
                                value={sections.director_word?.title || ''}
                                onChange={(e) => updateSection('director_word', 'title', e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">{isAr ? 'المحتوى' : 'Contenu'}</label>
                        <textarea 
                            rows={8}
                            className="w-full bg-slate-50 border border-slate-200 p-3 rounded-sm outline-none focus:border-brand-green text-sm"
                            value={sections.director_word?.content || ''}
                            onChange={(e) => updateSection('director_word', 'content', e.target.value)}
                        />
                    </div>
                </div>

                {/* Other Sections */}
                {Object.entries(sections).map(([key, section]: [string, any]) => {
                    if (key === 'director_word') return null;
                    return (
                        <div key={key} className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm space-y-6">
                            <h2 className="text-lg font-black text-slate-800 border-b pb-4 flex items-center gap-2">
                                <span className="w-2 h-6 bg-brand-green rounded-full"></span>
                                {section.title}
                            </h2>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase">{isAr ? 'العنوان' : 'Titre'}</label>
                                <input 
                                    type="text"
                                    className="w-full bg-slate-50 border border-slate-200 p-3 rounded-sm outline-none focus:border-brand-green"
                                    value={section.title}
                                    onChange={(e) => updateSection(key, 'title', e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase">{isAr ? 'المحتوى' : 'Contenu'}</label>
                                <textarea 
                                    rows={4}
                                    className="w-full bg-slate-50 border border-slate-200 p-3 rounded-sm outline-none focus:border-brand-green text-sm"
                                    value={section.content}
                                    onChange={(e) => updateSection(key, 'content', e.target.value)}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
