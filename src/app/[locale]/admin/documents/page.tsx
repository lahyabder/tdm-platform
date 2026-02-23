'use client';

import { useState, useEffect, use } from 'react';
import { useDocumentStore, DocumentMetadata } from '@/store/useDocumentStore';
import { useFacilityStore } from '@/store/useFacilityStore';
import { useLicenseStore } from '@/store/useLicenseStore';

export default function AdminDocumentsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params) as any;
    const { documents, addDocument, deleteDocument } = useDocumentStore();
    const { facilities } = useFacilityStore();
    const { licenses } = useLicenseStore();

    const [isClient, setIsClient] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const [formData, setFormData] = useState({
        linkedEntity: '',
        name: ''
    });

    useEffect(() => {
        setIsClient(true);
    }, []);

    const t = {
        ar: {
            title: "إدارة الوثائق",
            upload: "رفع وثيقة جديدة",
            dropzone: "اسحب الملف هنا أو انقر للإضافة",
            mapping: "ربط الوثيقة بـ",
            table: { name: "اسم الملف", entity: "الارتباط", date: "تاريخ الرفع", size: "الحجم", actions: "العمليات" },
            selectPrompt: "اختر منشأة أو ترخيص",
            actions: { delete: "حذف", save: "إتمام الرفع", cancel: "إلغاء" },
            success: "تم رفع الوثيقة بنجاح (محاكاة)"
        },
        fr: {
            title: "Gestion des Documents",
            upload: "Nouveau Document",
            dropzone: "Glissez un fichier ou cliquez pour ajouter",
            mapping: "Lier à",
            table: { name: "Nom du fichier", entity: "Lien", date: "Date", size: "Taille", actions: "Actions" },
            selectPrompt: "Choisir un établissement ou une licence",
            actions: { delete: "Supprimer", save: "Finaliser", cancel: "Annuler" },
            success: "Document téléchargé avec succès (simulation)"
        }
    }[locale as 'ar' | 'fr'];

    const handleUpload = (e: React.FormEvent) => {
        e.preventDefault();
        const newDoc: DocumentMetadata = {
            id: Math.random().toString(36).substr(2, 9).toUpperCase(),
            name: formData.name || "document_upload.pdf",
            type: "application/pdf",
            size: Math.floor(Math.random() * 5000000) + 100000,
            uploadDate: new Date().toISOString().split('T')[0],
            linkedEntity: formData.linkedEntity,
            fileUrl: "#"
        };
        addDocument(newDoc);
        setIsUploading(false);
        setFormData({ linkedEntity: '', name: '' });
    };

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    };

    if (!isClient) return null;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-extrabold text-slate-800">{t.title}</h1>
                <button
                    onClick={() => setIsUploading(true)}
                    className="px-4 py-2 bg-brand-green text-white font-bold rounded-sm hover:bg-brand-green/90 transition-colors flex items-center gap-2 text-sm shadow-sm"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                    {t.upload}
                </button>
            </div>

            {isUploading && (
                <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm animate-in fade-in slide-in-from-top-4">
                    <form onSubmit={handleUpload} className="space-y-4">
                        <div
                            className={`border-2 border-dashed rounded-sm p-12 text-center transition-colors ${dragActive ? 'border-brand-green bg-brand-green/5' : 'border-slate-200'}`}
                            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                            onDragLeave={() => setDragActive(false)}
                            onDrop={(e) => { e.preventDefault(); setDragActive(false); }}
                        >
                            <svg className="w-10 h-10 text-slate-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            <p className="text-sm font-bold text-slate-400">{t.dropzone}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{locale === 'ar' ? 'اسم الوثيقة' : 'Nom du document'}</label>
                                <input required className="w-full p-2 bg-slate-50 border border-slate-300 rounded-sm text-sm" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="example.pdf" />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t.mapping}</label>
                                <select required className="w-full p-2 bg-slate-50 border border-slate-300 rounded-sm text-sm" value={formData.linkedEntity} onChange={e => setFormData({ ...formData, linkedEntity: e.target.value })}>
                                    <option value="">{t.selectPrompt}</option>
                                    <optgroup label={locale === 'ar' ? 'المنشآت' : 'Établissements'}>
                                        {facilities.map(f => <option key={f.ref} value={f.ref}>{f.name[locale as 'ar' | 'fr']} ({f.ref})</option>)}
                                    </optgroup>
                                    <optgroup label={locale === 'ar' ? 'التراخيص' : 'Licences'}>
                                        {licenses.map(l => <option key={l.id} value={l.id}>{l.id}</option>)}
                                    </optgroup>
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
                            <button type="button" onClick={() => setIsUploading(false)} className="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-sm">{t.actions.cancel}</button>
                            <button type="submit" className="px-6 py-2 bg-slate-900 text-white text-sm font-bold rounded-sm hover:bg-slate-800 transition-colors">{t.actions.save}</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-slate-600">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">{t.table.name}</th>
                                <th className="px-6 py-4">{t.table.entity}</th>
                                <th className="px-6 py-4">{t.table.date}</th>
                                <th className="px-6 py-4">{t.table.size}</th>
                                <th className="px-6 py-4 text-center">{t.table.actions}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {documents.map(d => (
                                <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 flex items-center gap-3">
                                        <svg className="w-5 h-5 text-brand-red/60" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" /></svg>
                                        <span className="font-bold text-slate-800">{d.name}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-0.5 bg-brand-green/5 text-brand-green text-[10px] font-black border border-brand-green/10 rounded-sm">
                                            {d.linkedEntity}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-xs">{d.uploadDate}</td>
                                    <td className="px-6 py-4 text-xs italic">{formatSize(d.size)}</td>
                                    <td className="px-6 py-4 text-center">
                                        <button onClick={() => deleteDocument(d.id)} className="text-brand-red hover:underline font-bold text-xs uppercase">{t.actions.delete}</button>
                                    </td>
                                </tr>
                            ))}
                            {documents.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic">
                                        {locale === 'ar' ? 'لا توجد وثائق مرفوعة حالياً' : 'Aucun document téléchargé pour le moment'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
