'use client';

import { use, useEffect, useState } from 'react';
import { useContentStore } from '@/store/useContentStore';
import { Plus, Trash2, Rocket, Percent } from 'lucide-react';

export default function AdminProjectsEditor({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params) as any;
    const { pages, updatePageContent, fetchContent } = useContentStore();
    const [isClient, setIsClient] = useState(false);
    
    const [items, setItems] = useState<any[]>([]);

    useEffect(() => {
        setIsClient(true);
        fetchContent();
    }, []);

    useEffect(() => {
        const projectsContent = pages.projects;
        if (projectsContent) {
            setItems(projectsContent.sections.items || []);
        }
    }, [pages.projects]);

    const handleSave = async () => {
        try {
            await updatePageContent('projects', { 
                id: 'projects', 
                title: pages.projects?.title || { ar: 'المشاريع الاستراتيجية', fr: 'Projets Stratégiques' }, 
                sections: { items } 
            });
            alert(locale === 'ar' ? '✅ تم حفظ المشاريع بنجاح' : '✅ Projets enregistrés');
        } catch (err: any) {
            alert(`❌ Error: ${err.message}`);
        }
    };

    const addItem = () => {
        setItems([...items, { 
            id: Date.now().toString(), 
            title: { ar: 'مشروع جديد', fr: 'Nouveau Projet' }, 
            description: { ar: '', fr: '' },
            status: 'ongoing',
            progress: 0
        }]);
    };

    const removeItem = (id: string) => {
        setItems(items.filter(item => item.id !== id));
    };

    if (!isClient) return null;
    const isAr = locale === 'ar';

    return (
        <div className="space-y-10 pb-20">
            <div className="flex items-center justify-between border-b border-slate-200 pb-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-800 uppercase tracking-tight">
                        {isAr ? 'إدارة المشاريع' : 'Manage Projects'}
                    </h1>
                    <p className="text-slate-500 font-bold mt-1">
                        {isAr ? 'تحديث المشاريع الاستراتيجية ونسب الإنجاز' : 'Update strategic projects and progress'}
                    </p>
                </div>
                <div className="flex gap-4">
                    <button 
                        onClick={addItem}
                        className="bg-brand-yellow text-black px-6 py-4 rounded-sm font-black hover:bg-brand-yellow/90 transition-all flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        {isAr ? 'إضافة مشروع' : 'Add Project'}
                    </button>
                    <button 
                        onClick={handleSave}
                        className="bg-brand-green text-white px-10 py-4 rounded-sm font-black hover:bg-brand-green/90 transition-all shadow-lg shadow-brand-green/20"
                    >
                        {isAr ? 'حفظ الكل' : 'Save All'}
                    </button>
                </div>
            </div>

            <div className="space-y-6">
                {items.map((item, idx) => (
                    <div key={item.id} className="bg-white rounded-sm border-2 border-slate-100 shadow-sm overflow-hidden">
                        <div className="bg-slate-50 p-4 border-b border-slate-100 flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <Rocket className="w-5 h-5 text-slate-400" />
                                <span className="font-black text-slate-600 uppercase text-xs">Project Item #{idx + 1}</span>
                            </div>
                            <button onClick={() => removeItem(item.id)} className="text-brand-red hover:bg-brand-red/10 p-2 rounded-sm transition-colors">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-8 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="admin-label">{isAr ? 'اسم المشروع (عربي)' : 'Project Title (AR)'}</label>
                                    <input 
                                        className="admin-field"
                                        value={item.title.ar}
                                        onChange={(e) => {
                                            const newItems = [...items];
                                            newItems[idx].title.ar = e.target.value;
                                            setItems(newItems);
                                        }}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="admin-label">{isAr ? 'اسم المشروع (فرنسي)' : 'Project Title (FR)'}</label>
                                    <input 
                                        className="admin-field"
                                        value={item.title.fr}
                                        onChange={(e) => {
                                            const newItems = [...items];
                                            newItems[idx].title.fr = e.target.value;
                                            setItems(newItems);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="admin-label">{isAr ? 'الحالة' : 'Status'}</label>
                                    <select 
                                        className="admin-field"
                                        value={item.status}
                                        onChange={(e) => {
                                            const newItems = [...items];
                                            newItems[idx].status = e.target.value;
                                            setItems(newItems);
                                        }}
                                    >
                                        <option value="ongoing">{isAr ? 'قيد التنفيذ' : 'Ongoing'}</option>
                                        <option value="completed">{isAr ? 'مكتمل' : 'Completed'}</option>
                                    </select>
                                </div>
                                <div className="space-y-3">
                                    <label className="admin-label flex items-center gap-2">
                                        <Percent className="w-4 h-4" />
                                        {isAr ? 'نسبة الإنجاز' : 'Progress %'}
                                    </label>
                                    <input 
                                        type="number"
                                        className="admin-field"
                                        value={item.progress}
                                        onChange={(e) => {
                                            const newItems = [...items];
                                            newItems[idx].progress = parseInt(e.target.value);
                                            setItems(newItems);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="admin-label">{isAr ? 'وصف المشروع (عربي)' : 'Description (AR)'}</label>
                                    <textarea 
                                        className="admin-textarea"
                                        rows={3}
                                        value={item.description.ar}
                                        onChange={(e) => {
                                            const newItems = [...items];
                                            newItems[idx].description.ar = e.target.value;
                                            setItems(newItems);
                                        }}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="admin-label">{isAr ? 'وصف المشروع (فرنسي)' : 'Description (FR)'}</label>
                                    <textarea 
                                        className="admin-textarea"
                                        rows={3}
                                        value={item.description.fr}
                                        onChange={(e) => {
                                            const newItems = [...items];
                                            newItems[idx].description.fr = e.target.value;
                                            setItems(newItems);
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
