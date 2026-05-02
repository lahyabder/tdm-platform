'use client';

import { useState, useEffect, use } from 'react';
import { useNewsStore, NewsArticle } from '@/store/useNewsStore';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminEditNewsPage({
    params,
}: {
    params: Promise<{ locale: string; id: string }>;
}) {
    const resolvedParams = use(params) as any;
    const locale = resolvedParams.locale;
    const articleId = parseInt(resolvedParams.id);
    
    const { articles, updateArticle } = useNewsStore();
    const router = useRouter();
    const isAr = locale === 'ar';
    const [isSaving, setIsSaving] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const [isClient, setIsClient] = useState(false);

    const [formData, setFormData] = useState<NewsArticle | null>(null);

    useEffect(() => {
        setIsClient(true);
        if (articles.length > 0) {
            // Find article with loose equality
            const article = articles.find(a => String(a.id) === String(resolvedParams.id));
            if (article) {
                setFormData(article);
            }
        }
    }, [resolvedParams.id, articles]);

    const handleSave = async () => {
        if (formData) {
            setIsSaving(true);
            await new Promise(resolve => setTimeout(resolve, 800));
            updateArticle(articleId, formData);
            setSaveSuccess(true);
            setIsSaving(false);
            
            setTimeout(() => {
                router.push(`/${locale}/admin/news`);
            }, 1000);
        }
    };

    if (!isClient) return null;

    if (articles.length === 0) {
        return (
            <div className="min-h-[400px] flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-green"></div>
            </div>
        );
    }

    if (!formData) {
        return (
            <div className="min-h-[400px] flex flex-col items-center justify-center space-y-4">
                <p className="text-slate-500 font-bold">{isAr ? 'لم يتم العثور على الخبر' : 'Article non trouvé'}</p>
                <Link href={`/${locale}/admin/news`} className="px-4 py-2 bg-slate-100 rounded-sm text-sm font-bold">
                    {isAr ? 'العودة للقائمة' : 'Retour à la liste'}
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href={`/${locale}/admin/news`} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isAr ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} /></svg>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-extrabold text-slate-800">{isAr ? 'تعديل الخبر' : "Modifier l'actualité"}</h1>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">ID: #{articleId}</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {saveSuccess && (
                        <span className="text-brand-green font-bold text-sm animate-pulse">
                            {isAr ? 'تم الحفظ بنجاح!' : 'Enregistré avec succès !'}
                        </span>
                    )}
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className={`px-6 py-2 ${isSaving ? 'bg-slate-400' : 'bg-brand-green'} text-white font-black rounded-sm hover:opacity-90 transition-all shadow-lg shadow-brand-green/20 flex items-center gap-2`}
                    >
                        {isSaving && <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>}
                        {isAr ? 'حفظ التغييرات' : 'Enregistrer'}
                    </button>
                </div>
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
                                className="admin-input"
                                value={formData.title.ar}
                                onChange={(e) => setFormData({...formData, title: {...formData.title, ar: e.target.value}})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">الوصف</label>
                            <textarea 
                                rows={6}
                                className="admin-textarea"
                                value={formData.description.ar}
                                onChange={(e) => setFormData({...formData, description: {...formData.description, ar: e.target.value}})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">التصنيف</label>
                            <input 
                                type="text"
                                className="admin-input"
                                value={formData.tag.ar}
                                onChange={(e) => setFormData({...formData, tag: {...formData.tag, ar: e.target.value}})}
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
                                className="admin-input"
                                value={formData.title.fr}
                                onChange={(e) => setFormData({...formData, title: {...formData.title, fr: e.target.value}})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
                            <textarea 
                                rows={6}
                                className="admin-textarea"
                                value={formData.description.fr}
                                onChange={(e) => setFormData({...formData, description: {...formData.description, fr: e.target.value}})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase">Tag</label>
                            <input 
                                type="text"
                                className="admin-input"
                                value={formData.tag.fr}
                                onChange={(e) => setFormData({...formData, tag: {...formData.tag, fr: e.target.value}})}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Common Media */}
            <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm space-y-6">
                <h2 className="text-lg font-black text-slate-800 border-b pb-4 flex items-center justify-between">
                    <span>{isAr ? 'الوسائط' : 'Média'}</span>
                    <span className="text-[10px] bg-slate-100 px-2 py-0.5 rounded-sm text-slate-500 uppercase font-black tracking-widest">Image Upload</span>
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {/* Upload Zone */}
                    <div className="space-y-4">
                        <label className="admin-label">{isAr ? 'تغيير الصورة' : 'Modifier l\'image'}</label>
                        <div className="relative group">
                            <input 
                                type="file" 
                                accept="image/*"
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setFormData({...formData!, imageUrl: reader.result as string});
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                            />
                            <div className="border-2 border-dashed border-slate-200 rounded-sm p-10 flex flex-col items-center justify-center gap-4 group-hover:border-brand-green group-hover:bg-brand-green/5 transition-all">
                                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-400 group-hover:text-brand-green group-hover:bg-white shadow-sm transition-all">
                                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 00-2 2z" /></svg>
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-black text-slate-700">{isAr ? 'اضغط لرفع صورة جديدة' : 'Cliquez pour changer d\'image'}</p>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">JPG, PNG, WebP (Max 5MB)</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Preview Zone */}
                    <div className="space-y-4">
                        <label className="admin-label">{isAr ? 'معاينة الصورة' : 'Aperçu de l\'image'}</label>
                        <div className="aspect-video w-full bg-slate-50 rounded-sm border border-slate-200 overflow-hidden flex items-center justify-center relative group">
                            {formData.imageUrl ? (
                                <>
                                    <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button 
                                            onClick={() => setFormData({...formData!, imageUrl: ''})}
                                            className="bg-brand-red text-white p-2 rounded-full hover:scale-110 transition-transform"
                                        >
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </div>
                                </>
                            ) : (
                                <div className="text-slate-300 flex flex-col items-center gap-2">
                                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 00-2 2z" /></svg>
                                    <span className="text-[10px] font-black uppercase tracking-widest">{isAr ? 'لا توجد صورة' : 'Aucune image'}</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
