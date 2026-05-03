'use client';

import { use, useEffect, useState } from 'react';
import { useContentStore } from '@/store/useContentStore';

export default function AdminHomeEditor({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params) as any;
    const { pages, updatePageContent, fetchContent } = useContentStore();
    const [isClient, setIsClient] = useState(false);
    
    const [title, setTitle] = useState({ ar: '', fr: '' });
    const [hero, setHero] = useState<any>({ title: { ar: '', fr: '' }, subtitle: { ar: '', fr: '' } });
    const [stats, setStats] = useState<any[]>([]);

    useEffect(() => {
        setIsClient(true);
        fetchContent();
    }, []);

    useEffect(() => {
        const homeContent = pages.home;
        if (homeContent) {
            setTitle(homeContent.title);
            setHero(homeContent.sections.hero || { title: { ar: '', fr: '' }, subtitle: { ar: '', fr: '' } });
            setStats(homeContent.sections.stats?.items || []);
        }
    }, [pages.home]);

    const handleSave = async () => {
        try {
            await updatePageContent('home', { 
                id: 'home', 
                title, 
                sections: { 
                    ...pages.home?.sections,
                    hero,
                    stats: { items: stats }
                } 
            });
            alert(locale === 'ar' ? '✅ تم حفظ التغييرات بنجاح' : '✅ Enregistré avec succès');
        } catch (err: any) {
            alert(`❌ Error: ${err.message}`);
        }
    };

    if (!isClient) return null;

    const isAr = locale === 'ar';

    return (
        <div className="space-y-10 pb-20">
            <div className="flex items-center justify-between border-b border-slate-200 pb-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tight">
                        {isAr ? 'تعديل الصفحة الرئيسية' : 'Edit Home Page'}
                    </h1>
                    <p className="text-slate-500 font-bold mt-1">
                        {isAr ? 'تحديث نصوص الواجهة والإحصائيات' : 'Update Hero section and Statistics'}
                    </p>
                </div>
                <button 
                    onClick={handleSave}
                    className="bg-brand-green text-white px-10 py-4 rounded-sm font-black hover:bg-brand-green/90 transition-all shadow-lg shadow-brand-green/20"
                >
                    {isAr ? 'حفظ التغييرات' : 'Save Changes'}
                </button>
            </div>

            <div className="grid grid-cols-1 gap-10">
                {/* Hero Section */}
                <section className="bg-white p-8 rounded-sm border-2 border-slate-100 shadow-sm space-y-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-2 h-8 bg-brand-yellow"></div>
                        <h2 className="text-xl font-black text-slate-800 uppercase tracking-wider">{isAr ? 'قسم الواجهة (Hero)' : 'Hero Section'}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="admin-label">{isAr ? 'العنوان الرئيسي (عربي)' : 'Hero Title (AR)'}</label>
                            <input 
                                className="admin-field"
                                value={hero.title.ar}
                                onChange={(e) => setHero({...hero, title: {...hero.title, ar: e.target.value}})}
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="admin-label">{isAr ? 'العنوان الرئيسي (فرنسي)' : 'Hero Title (FR)'}</label>
                            <input 
                                className="admin-field"
                                value={hero.title.fr}
                                onChange={(e) => setHero({...hero, title: {...hero.title, fr: e.target.value}})}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                            <label className="admin-label">{isAr ? 'الوصف الفرعي (عربي)' : 'Hero Subtitle (AR)'}</label>
                            <textarea 
                                className="admin-textarea"
                                rows={3}
                                value={hero.subtitle.ar}
                                onChange={(e) => setHero({...hero, subtitle: {...hero.subtitle, ar: e.target.value}})}
                            />
                        </div>
                        <div className="space-y-3">
                            <label className="admin-label">{isAr ? 'الوصف الفرعي (فرنسي)' : 'Hero Subtitle (FR)'}</label>
                            <textarea 
                                className="admin-textarea"
                                rows={3}
                                value={hero.subtitle.fr}
                                onChange={(e) => setHero({...hero, subtitle: {...hero.subtitle, fr: e.target.value}})}
                            />
                        </div>
                    </div>
                </section>

                {/* Statistics Section */}
                <section className="bg-white p-8 rounded-sm border-2 border-slate-100 shadow-sm space-y-8">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-2 h-8 bg-brand-green"></div>
                        <h2 className="text-xl font-black text-slate-800 uppercase tracking-wider">{isAr ? 'الإحصائيات' : 'Statistics'}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {stats.map((stat, idx) => (
                            <div key={idx} className="p-6 bg-slate-50 border border-slate-200 rounded-sm space-y-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-black text-slate-400">STAT #{idx + 1}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="admin-label text-[10px]">{isAr ? 'القيمة' : 'Value'}</label>
                                        <input 
                                            className="admin-field py-2 text-lg"
                                            value={stat.value}
                                            onChange={(e) => {
                                                const newStats = [...stats];
                                                newStats[idx].value = e.target.value;
                                                setStats(newStats);
                                            }}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="admin-label text-[10px]">{isAr ? 'التسمية (عربي)' : 'Label (AR)'}</label>
                                        <input 
                                            className="admin-field py-2"
                                            value={stat.label.ar}
                                            onChange={(e) => {
                                                const newStats = [...stats];
                                                newStats[idx].label.ar = e.target.value;
                                                setStats(newStats);
                                            }}
                                        />
                                    </div>
                                    <div className="space-y-2 col-span-2">
                                        <label className="admin-label text-[10px]">{isAr ? 'التسمية (فرنسي)' : 'Label (FR)'}</label>
                                        <input 
                                            className="admin-field py-2"
                                            value={stat.label.fr}
                                            onChange={(e) => {
                                                const newStats = [...stats];
                                                newStats[idx].label.fr = e.target.value;
                                                setStats(newStats);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
