'use client';

import { useState, use } from 'react';
import { useNewsStore, NewsArticle } from '@/store/useNewsStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminNewNewsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params) as any;
    const { addArticle } = useNewsStore();
    const router = useRouter();
    const isAr = locale === 'ar';

    const [formData, setFormData] = useState<Partial<NewsArticle>>({
        id: Date.now(),
        title: { ar: '', fr: '' },
        date: { ar: new Date().toLocaleDateString('ar-MA'), fr: new Date().toLocaleDateString('fr-FR') },
        description: { ar: '', fr: '' },
        imageUrl: 'https://siteweb.tdm.mr/wp-content/uploads/2025/03/cropped-%D8%B4%D8%B9%D8%A7%D8%B1-tdm-3.jpg',
        tag: { ar: 'مؤسسة', fr: 'Institutionnel' }
    });

    const handleSave = () => {
        addArticle(formData as NewsArticle);
        router.push(`/${locale}/admin/news`);
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href={`/${locale}/admin/news`} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isAr ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} /></svg>
                    </Link>
                    <h1 className="text-2xl font-extrabold text-slate-800">{isAr ? 'إضافة خبر جديد' : 'Ajouter une actualité'}</h1>
                </div>
                <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-brand-green text-white font-black rounded-sm hover:bg-brand-green/90 transition-all shadow-lg shadow-brand-green/20"
                >
                    {isAr ? 'نشر الخبر' : 'Publier'}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Arabic Content */}
                <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm space-y-6" dir="rtl">
                    <h2 className="text-lg font-black text-brand-green border-b pb-4 flex items-center gap-2">
                        <span className="w-2 h-6 bg-brand-green rounded-full"></span>
                        المحتوى العربي
                    </h2>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">العنوان</label>
                            <input 
                                type="text"
                                className="w-full bg-slate-50 border border-slate-200 p-3 rounded-sm outline-none focus:border-brand-green"
                                value={formData.title?.ar}
                                onChange={(e) => setFormData({...formData, title: {...formData.title!, ar: e.target.value}})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">الوصف</label>
                            <textarea 
                                rows={6}
                                className="w-full bg-slate-50 border border-slate-200 p-3 rounded-sm outline-none focus:border-brand-green text-sm"
                                value={formData.description?.ar}
                                onChange={(e) => setFormData({...formData, description: {...formData.description!, ar: e.target.value}})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">التصنيف</label>
                            <input 
                                type="text"
                                className="w-full bg-slate-50 border border-slate-200 p-3 rounded-sm outline-none focus:border-brand-green"
                                value={formData.tag?.ar}
                                onChange={(e) => setFormData({...formData, tag: {...formData.tag!, ar: e.target.value}})}
                            />
                        </div>
                    </div>
                </div>

                {/* French Content */}
                <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm space-y-6" dir="ltr">
                    <h2 className="text-lg font-black text-slate-800 border-b pb-4 flex items-center gap-2">
                        <span className="w-2 h-6 bg-slate-800 rounded-full"></span>
                        Contenu Français
                    </h2>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Titre</label>
                            <input 
                                type="text"
                                className="w-full bg-slate-50 border border-slate-200 p-3 rounded-sm outline-none focus:border-brand-green"
                                value={formData.title?.fr}
                                onChange={(e) => setFormData({...formData, title: {...formData.title!, fr: e.target.value}})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
                            <textarea 
                                rows={6}
                                className="w-full bg-slate-50 border border-slate-200 p-3 rounded-sm outline-none focus:border-brand-green text-sm"
                                value={formData.description?.fr}
                                onChange={(e) => setFormData({...formData, description: {...formData.description!, fr: e.target.value}})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Tag</label>
                            <input 
                                type="text"
                                className="w-full bg-slate-50 border border-slate-200 p-3 rounded-sm outline-none focus:border-brand-green"
                                value={formData.tag?.fr}
                                onChange={(e) => setFormData({...formData, tag: {...formData.tag!, fr: e.target.value}})}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Common Media */}
            <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm space-y-6">
                <h2 className="text-lg font-black text-slate-800 border-b pb-4">الوسائط / Média</h2>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase">{isAr ? 'رابط الصورة' : "L'URL de l'image"}</label>
                        <input 
                            type="text"
                            className="w-full bg-slate-50 border border-slate-200 p-3 rounded-sm outline-none focus:border-brand-green"
                            value={formData.imageUrl}
                            onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                            placeholder="https://..."
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
