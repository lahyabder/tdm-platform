'use client';

import { useState, useEffect, use } from 'react';
import { useDownloadStore, DownloadableFile } from '@/store/useDownloadStore';
import { FileText, Download, Plus, Trash2, Edit2, X, Check } from 'lucide-react';

export default function AdminDownloadsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params) as any;
    const { files, addFile, updateFile, deleteFile, fetchFiles } = useDownloadStore();
    const [isClient, setIsClient] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [formData, setFormData] = useState<Partial<DownloadableFile>>({
        title: { ar: '', fr: '' },
        type: 'pdf',
        size: '',
        url: '',
        category: 'forms'
    });

    useEffect(() => {
        setIsClient(true);
        fetchFiles();
    }, [fetchFiles]);

    const isAr = locale === 'ar';

    const t = {
        ar: {
            title: "إدارة الملفات والنماذج",
            add: "إضافة ملف جديد",
            categories: { forms: "نماذج", technical: "تقني", guides: "أدلة" },
            table: { name: "اسم الملف", type: "النوع", size: "الحجم", category: "الفئة", actions: "العمليات" },
            fields: { titleAr: "الاسم (بالعربية)", titleFr: "الاسم (بالفرنسية)", type: "النوع", size: "الحجم", url: "رابط الملف", category: "الفئة" }
        },
        fr: {
            title: "Gestion des Fichiers",
            add: "Nouveau fichier",
            categories: { forms: "Formulaires", technical: "Technique", guides: "Guides" },
            table: { name: "Nom du fichier", type: "Type", size: "Taille", category: "Catégorie", actions: "Actions" },
            fields: { titleAr: "Nom (AR)", titleFr: "Nom (FR)", type: "Type", size: "Taille", url: "URL", category: "Catégorie" }
        }
    }[locale as 'ar' | 'fr'];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingId) {
            updateFile(editingId, formData);
        } else {
            addFile({ ...formData as DownloadableFile, id: Date.now().toString() });
        }
        setIsAdding(false);
        setEditingId(null);
        setFormData({ title: { ar: '', fr: '' }, type: 'pdf', size: '', url: '', category: 'forms' });
    };

    const handleEdit = (file: DownloadableFile) => {
        setFormData(file);
        setEditingId(file.id);
        setIsAdding(true);
    };

    if (!isClient) return null;

    return (
        <div className="space-y-8 pb-20 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-black text-slate-900">{t.title}</h1>
                <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 px-6 py-3 bg-brand-green text-white font-black rounded-xl hover:bg-brand-green/90 transition-all shadow-lg shadow-brand-green/20">
                    <Plus className="w-5 h-5" />
                    {t.add}
                </button>
            </div>

            {isAdding && (
                <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-xl space-y-6">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{t.fields.titleAr}</label>
                            <input required className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl font-bold outline-none focus:border-brand-green transition-all" dir="rtl" value={formData.title?.ar} onChange={e => setFormData({ ...formData, title: { ...formData.title!, ar: e.target.value } })} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{t.fields.titleFr}</label>
                            <input required className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl font-bold outline-none focus:border-brand-green transition-all" dir="ltr" value={formData.title?.fr} onChange={e => setFormData({ ...formData, title: { ...formData.title!, fr: e.target.value } })} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{t.fields.category}</label>
                            <select className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl font-bold outline-none focus:border-brand-green appearance-none" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value as any })}>
                                {Object.entries(t.categories).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{t.fields.type}</label>
                            <select className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl font-bold outline-none focus:border-brand-green appearance-none" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value as any })}>
                                <option value="pdf">PDF</option>
                                <option value="docx">Word (DOCX)</option>
                                <option value="xlsx">Excel (XLSX)</option>
                            </select>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{t.fields.size}</label>
                            <input placeholder="e.g. 1.5 MB" className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl font-bold outline-none focus:border-brand-green transition-all" value={formData.size} onChange={e => setFormData({ ...formData, size: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-slate-400 uppercase tracking-widest">{t.fields.url}</label>
                            <input placeholder="/documents/file.pdf" className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl font-bold outline-none focus:border-brand-green transition-all" value={formData.url} onChange={e => setFormData({ ...formData, url: e.target.value })} />
                        </div>
                        <div className="md:col-span-2 flex justify-end gap-4 pt-4 border-t border-slate-50">
                            <button type="button" onClick={() => setIsAdding(false)} className="px-6 py-3 font-black text-slate-400 hover:text-slate-900 transition-colors uppercase text-sm tracking-widest">
                                {isAr ? 'إلغاء' : 'Annuler'}
                            </button>
                            <button type="submit" className="px-10 py-3 bg-slate-950 text-white font-black rounded-xl hover:bg-slate-800 transition-all shadow-xl">
                                {isAr ? 'حفظ الملف' : 'Enregistrer'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden">
                <table className="w-full text-end">
                    <thead>
                        <tr className="bg-slate-50 border-b border-slate-100">
                            <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">{t.table.name}</th>
                            <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">{t.table.category}</th>
                            <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest">{t.table.type}</th>
                            <th className="p-6 text-xs font-black text-slate-400 uppercase tracking-widest text-center">{t.table.actions}</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {files.map(file => (
                            <tr key={file.id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-500 group-hover:bg-brand-green group-hover:text-white transition-all shrink-0">
                                            <FileText className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <p className="font-black text-slate-900">{file.title[locale as 'ar' | 'fr']}</p>
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{file.size}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-6">
                                    <span className="px-3 py-1 bg-slate-100 text-slate-500 rounded-full text-[10px] font-black uppercase tracking-widest">
                                        {t.categories[file.category]}
                                    </span>
                                </td>
                                <td className="p-6">
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                        file.type === 'pdf' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'
                                    }`}>
                                        {file.type}
                                    </span>
                                </td>
                                <td className="p-6">
                                    <div className="flex items-center justify-center gap-4">
                                        <button onClick={() => handleEdit(file)} className="w-10 h-10 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-slate-950 hover:text-white transition-all shadow-sm">
                                            <Edit2 className="w-4 h-4" />
                                        </button>
                                        <button onClick={() => { if(confirm(isAr ? 'حذف؟' : 'Supprimer?')) deleteFile(file.id); }} className="w-10 h-10 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-brand-red hover:text-white transition-all shadow-sm">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
