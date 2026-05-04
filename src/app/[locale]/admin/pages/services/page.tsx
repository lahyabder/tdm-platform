'use client';

import { use, useEffect, useState } from 'react';
import { useContentStore } from '@/store/useContentStore';
import { Plus, Trash2, Layout } from 'lucide-react';

export default function AdminServicesEditor({
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
        const servicesContent = pages.services;
        if (servicesContent) {
            setItems(servicesContent.sections.items || []);
        }
    }, [pages.services]);

    const handleSave = async () => {
        try {
            await updatePageContent('services', { 
                id: 'services', 
                title: pages.services?.title || { ar: 'خدماتنا', fr: 'Nos Services' }, 
                sections: { items } 
            });
            alert(locale === 'ar' ? '✅ تم حفظ الخدمات بنجاح' : '✅ Services enregistrés');
        } catch (err: any) {
            alert(`❌ Error: ${err.message}`);
        }
    };

    const addItem = () => {
        setItems(prev => [...prev, { 
            id: Date.now().toString(), 
            title: { ar: 'خدمة جديدة', fr: 'Nouveau Service' }, 
            description: { ar: '', fr: '' },
            features: { ar: [], fr: [] }
        }]);
    };

    const updateItemField = (idx: number, field: string, subField: string, value: string) => {
        setItems(prev => {
            const newItems = [...prev];
            newItems[idx] = {
                ...newItems[idx],
                [field]: {
                    ...newItems[idx][field],
                    [subField]: value
                }
            };
            return newItems;
        });
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
                        {isAr ? 'إدارة الخدمات' : 'Manage Services'}
                    </h1>
                    <p className="text-slate-500 font-bold mt-1">
                        {isAr ? 'إضافة، تعديل أو حذف الخدمات التقنية' : 'Add, edit or delete technical services'}
                    </p>
                </div>
                <div className="flex gap-4">
                    <button 
                        onClick={addItem}
                        className="bg-brand-yellow text-black px-6 py-4 rounded-sm font-black hover:bg-brand-yellow/90 transition-all flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        {isAr ? 'إضافة خدمة' : 'Add Service'}
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
                                <Layout className="w-5 h-5 text-slate-400" />
                                <span className="font-black text-slate-600 uppercase text-xs">Service Item #{idx + 1}</span>
                            </div>
                            <button onClick={() => removeItem(item.id)} className="text-brand-red hover:bg-brand-red/10 p-2 rounded-sm transition-colors">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-8 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="admin-label">{isAr ? 'اسم الخدمة (عربي)' : 'Service Name (AR)'}</label>
                                    <input 
                                        className="admin-field"
                                        value={item.title.ar}
                                        onChange={(e) => updateItemField(idx, 'title', 'ar', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="admin-label">{isAr ? 'اسم الخدمة (فرنسي)' : 'Service Name (FR)'}</label>
                                    <input 
                                        className="admin-field"
                                        value={item.title.fr}
                                        onChange={(e) => updateItemField(idx, 'title', 'fr', e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-3">
                                    <label className="admin-label">{isAr ? 'الوصف (عربي)' : 'Description (AR)'}</label>
                                    <textarea 
                                        className="admin-textarea"
                                        rows={3}
                                        value={item.description.ar}
                                        onChange={(e) => updateItemField(idx, 'description', 'ar', e.target.value)}
                                    />
                                </div>
                                <div className="space-y-3">
                                    <label className="admin-label">{isAr ? 'الوصف (فرنسي)' : 'Description (FR)'}</label>
                                    <textarea 
                                        className="admin-textarea"
                                        rows={3}
                                        value={item.description.fr}
                                        onChange={(e) => updateItemField(idx, 'description', 'fr', e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {items.length === 0 && (
                    <div className="text-center py-20 bg-white border-2 border-dashed border-slate-200 rounded-sm">
                        <p className="text-slate-400 font-bold">{isAr ? 'لا توجد خدمات حالياً' : 'No services found'}</p>
                        <button onClick={addItem} className="text-brand-green font-black mt-2 hover:underline">
                            {isAr ? 'أضف أول خدمة' : 'Add your first service'}
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
