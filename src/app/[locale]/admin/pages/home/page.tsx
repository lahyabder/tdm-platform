'use client';

import { useState, useEffect, use } from 'react';
import { useContentStore } from '@/store/useContentStore';
import { useRouter } from 'next/navigation';

export default function AdminHomeEditor({
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
        const homeContent = pages.home;
        if (homeContent) {
            setTitle(homeContent.title);
            setSections(homeContent.sections);
        }
    }, [pages.home]);

    const isAr = locale === 'ar';

    const handleSave = async () => {
        try {
            await updatePageContent('home', { id: 'home', title, sections });
            alert(isAr ? '✅ تم حفظ التغييرات بنجاح' : '✅ Changements enregistrés');
        } catch (err) {
            console.error(err);
            alert(isAr ? '❌ فشل الحفظ' : '❌ Échec de l\'enregistrement');
        }
    };

    const updateSection = (path: string[], value: any) => {
        const newSections = { ...sections };
        let current = newSections;
        for (let i = 0; i < path.length - 1; i++) {
            current = current[path[i]];
        }
        current[path[path.length - 1]] = value;
        setSections(newSections);
    };

    if (!isClient || !sections.hero) return null;

    return (
        <div className="space-y-8 pb-20">
            <div className="flex items-center justify-between sticky top-0 bg-slate-50/80 backdrop-blur-md z-50 py-4 border-b">
                <div>
                    <h1 className="text-2xl font-extrabold text-slate-800">
                        {isAr ? 'تعديل الصفحة الرئيسية' : 'Éditer la Page d\'Accueil'}
                    </h1>
                </div>
                <button
                    onClick={handleSave}
                    className="px-10 py-2 bg-brand-green text-white font-black rounded-sm hover:bg-brand-green/90 transition-all shadow-lg shadow-brand-green/20"
                >
                    {isAr ? 'حفظ التغييرات' : 'Enregistrer'}
                </button>
            </div>

            <div className="space-y-12">
                {/* Hero Section */}
                <div className="bg-white p-8 rounded-sm border border-slate-200 shadow-sm space-y-8">
                    <h2 className="text-xl font-black text-slate-800 border-b pb-4 flex items-center gap-3">
                        <span className="w-2 h-8 bg-brand-green rounded-full"></span>
                        {isAr ? 'قسم الواجهة (Hero)' : 'Section Hero'}
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="admin-label">{isAr ? 'العنوان الرئيسي (عربي)' : 'Titre Principal (AR)'}</label>
                            <textarea className="admin-textarea" value={sections.hero.title.ar} onChange={e => updateSection(['hero', 'title', 'ar'], e.target.value)} />
                        </div>
                        <div className="space-y-4">
                            <label className="admin-label">{isAr ? 'العنوان الرئيسي (فرنسي)' : 'Titre Principal (FR)'}</label>
                            <textarea className="admin-textarea" value={sections.hero.title.fr} onChange={e => updateSection(['hero', 'title', 'fr'], e.target.value)} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <label className="admin-label">{isAr ? 'العنوان الفرعي (عربي)' : 'Sous-titre (AR)'}</label>
                            <textarea rows={4} className="admin-textarea" value={sections.hero.subtitle.ar} onChange={e => updateSection(['hero', 'subtitle', 'ar'], e.target.value)} />
                        </div>
                        <div className="space-y-4">
                            <label className="admin-label">{isAr ? 'العنوان الفرعي (فرنسي)' : 'Sous-titre (FR)'}</label>
                            <textarea rows={4} className="admin-textarea" value={sections.hero.subtitle.fr} onChange={e => updateSection(['hero', 'subtitle', 'fr'], e.target.value)} />
                        </div>
                    </div>
                </div>

                {/* Statistics Section */}
                <div className="bg-white p-8 rounded-sm border border-slate-200 shadow-sm space-y-8">
                    <h2 className="text-xl font-black text-slate-800 border-b pb-4 flex items-center gap-3">
                        <span className="w-2 h-8 bg-brand-yellow rounded-full"></span>
                        {isAr ? 'الإحصائيات' : 'Statistiques'}
                    </h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {sections.stats.items.map((stat: any, idx: number) => (
                            <div key={stat.id} className="p-4 bg-slate-50 border border-slate-200 rounded-sm space-y-4">
                                <div>
                                    <label className="admin-label">{isAr ? 'القيمة' : 'Valeur'}</label>
                                    <input className="admin-input" value={stat.value} onChange={e => {
                                        const items = [...sections.stats.items];
                                        items[idx].value = e.target.value;
                                        updateSection(['stats', 'items'], items);
                                    }} />
                                </div>
                                <div>
                                    <label className="admin-label">{isAr ? 'التسمية (عربي)' : 'Label (AR)'}</label>
                                    <input className="admin-input text-xs" value={stat.label.ar} onChange={e => {
                                        const items = [...sections.stats.items];
                                        items[idx].label.ar = e.target.value;
                                        updateSection(['stats', 'items'], items);
                                    }} />
                                </div>
                                <div>
                                    <label className="admin-label">{isAr ? 'التسمية (فرنسي)' : 'Label (FR)'}</label>
                                    <input className="admin-input text-xs" value={stat.label.fr} onChange={e => {
                                        const items = [...sections.stats.items];
                                        items[idx].label.fr = e.target.value;
                                        updateSection(['stats', 'items'], items);
                                    }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* News Section */}
                <div className="bg-white p-8 rounded-sm border border-slate-200 shadow-sm space-y-8">
                    <h2 className="text-xl font-black text-slate-800 border-b pb-4 flex items-center gap-3">
                        <span className="w-2 h-8 bg-brand-red rounded-full"></span>
                        {isAr ? 'آخر الأنشطة' : 'Dernières Activités'}
                    </h2>
                    
                    <div className="space-y-6">
                        {sections.news.items.map((item: any, idx: number) => (
                            <div key={item.id} className="p-6 bg-slate-50 border border-slate-200 rounded-sm grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <label className="admin-label">{isAr ? 'العنوان (عربي)' : 'Titre (AR)'}</label>
                                    <input className="admin-input" value={item.title.ar} onChange={e => {
                                        const items = [...sections.news.items];
                                        items[idx].title.ar = e.target.value;
                                        updateSection(['news', 'items'], items);
                                    }} />
                                </div>
                                <div className="space-y-4">
                                    <label className="admin-label">{isAr ? 'العنوان (فرنسي)' : 'Titre (FR)'}</label>
                                    <input className="admin-input" value={item.title.fr} onChange={e => {
                                        const items = [...sections.news.items];
                                        items[idx].title.fr = e.target.value;
                                        updateSection(['news', 'items'], items);
                                    }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
