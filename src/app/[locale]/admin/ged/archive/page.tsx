'use client';

import { useState, use } from 'react';
import { useGEDStore, GEDDocument } from '@/store/useGEDStore';

const CATEGORIES = ['الكل', 'لوائح', 'إجراءات', 'تقارير', 'مالية', 'دوريات', 'عقود', 'مذكرات'];

export default function ArchivePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params) as any;
  const isAr = locale === 'ar';
  const { documents, addDocument, archiveDocument, deleteDocument } = useGEDStore();

  const [cat, setCat] = useState('الكل');
  const [search, setSearch] = useState('');
  const [showUpload, setShowUpload] = useState(false);
  const [form, setForm] = useState({ title: '', category: 'لوائح', department: '', fileType: 'PDF', confidential: false, tags: '' });

  const upd = (k: keyof typeof form, v: any) => setForm(f => ({ ...f, [k]: v }));

  const filtered = documents.filter(d =>
    (cat === 'الكل' || d.category === cat) &&
    (d.status !== 'archived') &&
    (!search || d.title.includes(search) || d.ref.includes(search))
  );
  const archived = documents.filter(d => d.status === 'archived');

  const handleUpload = () => {
    if (!form.title) return;
    const doc: GEDDocument = {
      id: `d${Date.now()}`,
      ref: `TDM-DOC-2025-${String(Date.now()).slice(-3)}`,
      title: form.title,
      category: form.category,
      department: form.department,
      fileType: form.fileType,
      fileSize: '—',
      version: '1.0',
      status: 'active',
      confidential: form.confidential,
      tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
      createdBy: 'u1',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
    };
    addDocument(doc);
    setShowUpload(false);
    setForm({ title: '', category: 'لوائح', department: '', fileType: 'PDF', confidential: false, tags: '' });
  };

  const typeColor = (t: string) => t === 'PDF' ? 'bg-red-50 text-red-600 border-red-100' : t === 'XLSX' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-blue-50 text-blue-600 border-blue-100';

  return (
    <div dir={isAr ? 'rtl' : 'ltr'} className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[180px]">
          <svg className="w-4 h-4 absolute top-1/2 -translate-y-1/2 start-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder={isAr ? 'بحث في الأرشيف...' : 'Rechercher...'}
            className="w-full ps-9 pe-4 py-2.5 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-1 focus:ring-brand-green" />
        </div>
        <div className="flex gap-1 flex-wrap">
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setCat(c)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors ${cat === c ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}`}>
              {c}
            </button>
          ))}
        </div>
        <button onClick={() => setShowUpload(!showUpload)}
          className="flex items-center gap-2 px-4 py-2.5 bg-brand-green text-white text-sm font-bold rounded-lg hover:bg-brand-green/90 transition-colors shrink-0">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          {isAr ? 'رفع وثيقة' : 'Téléverser'}
        </button>
      </div>

      {/* Upload Form */}
      {showUpload && (
        <div className="bg-white rounded-xl border-2 border-brand-green/20 shadow-sm p-5">
          <h3 className="font-bold text-slate-800 mb-4">{isAr ? 'رفع وثيقة جديدة' : 'Téléverser un document'}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">{isAr ? 'عنوان الوثيقة *' : 'Titre *'}</label>
              <input value={form.title} onChange={e => upd('title', e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-2 focus:ring-brand-green/30"
                placeholder={isAr ? 'اسم الوثيقة...' : 'Titre du document...'} />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">{isAr ? 'الفئة' : 'Catégorie'}</label>
              <select value={form.category} onChange={e => upd('category', e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none">
                {CATEGORIES.filter(c => c !== 'الكل').map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">{isAr ? 'نوع الملف' : 'Type de fichier'}</label>
              <select value={form.fileType} onChange={e => upd('fileType', e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none">
                {['PDF', 'DOCX', 'XLSX', 'PPTX'].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">{isAr ? 'الإدارة' : 'Service'}</label>
              <select value={form.department} onChange={e => upd('department', e.target.value)}
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none">
                <option value="">{isAr ? 'اختر' : 'Choisir'}</option>
                {['الإدارة العامة', 'قسم التراخيص', 'المديرية التقنية', 'المديرية المالية', 'الشؤون القانونية'].map(d => <option key={d}>{d}</option>)}
              </select>
            </div>
            <div className="flex items-center gap-3">
              <input type="checkbox" id="conf" checked={form.confidential} onChange={e => upd('confidential', e.target.checked)} className="w-4 h-4 accent-brand-green" />
              <label htmlFor="conf" className="text-sm font-bold text-slate-700">{isAr ? 'وثيقة سرية' : 'Document confidentiel'}</label>
            </div>
          </div>
          <div className="mt-4 border-2 border-dashed border-slate-200 rounded-lg p-6 text-center text-slate-400 cursor-pointer hover:border-brand-green/40 transition-colors">
            <p className="text-sm font-bold">{isAr ? 'اسحب الملف هنا أو انقر' : 'Glissez ou cliquez'}</p>
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <button onClick={() => setShowUpload(false)} className="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-lg">{isAr ? 'إلغاء' : 'Annuler'}</button>
            <button onClick={handleUpload} className="px-6 py-2 bg-brand-green text-white text-sm font-bold rounded-lg hover:bg-brand-green/90">{isAr ? 'رفع' : 'Téléverser'}</button>
          </div>
        </div>
      )}

      {/* Active Documents */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase">
            <tr>
              {[isAr ? 'الرقم' : 'Réf', isAr ? 'العنوان' : 'Titre', isAr ? 'الفئة' : 'Catégorie', isAr ? 'الإدارة' : 'Service', isAr ? 'التاريخ' : 'Date', isAr ? 'النوع' : 'Type', ''].map((h, i) => (
                <th key={i} className="px-4 py-3 text-start">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {filtered.map(d => (
              <tr key={d.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-slate-400">{d.ref}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-red-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                    </svg>
                    <span className="font-bold text-slate-800">{d.title}</span>
                    {d.confidential && <span className="px-1.5 py-0.5 bg-red-50 text-red-600 text-[9px] font-black rounded border border-red-100">سري</span>}
                  </div>
                </td>
                <td className="px-4 py-3"><span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-full border border-blue-100">{d.category}</span></td>
                <td className="px-4 py-3 text-xs text-slate-500">{d.department}</td>
                <td className="px-4 py-3 font-mono text-xs text-slate-400">{d.createdAt}</td>
                <td className="px-4 py-3"><span className={`px-2 py-0.5 text-[10px] font-black border rounded ${typeColor(d.fileType)}`}>{d.fileType} · {d.fileSize}</span></td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button className="text-brand-green text-xs font-bold hover:underline">{isAr ? 'تحميل' : 'Télécharger'}</button>
                    <button onClick={() => archiveDocument(d.id)} className="text-slate-400 text-xs font-bold hover:underline">{isAr ? 'أرشفة' : 'Archiver'}</button>
                    <button onClick={() => deleteDocument(d.id)} className="text-red-400 text-xs font-bold hover:underline">{isAr ? 'حذف' : 'Supprimer'}</button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={7} className="px-4 py-10 text-center text-slate-400 italic text-sm">{isAr ? 'لا توجد وثائق' : 'Aucun document'}</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Archived section */}
      {archived.length > 0 && (
        <details className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <summary className="px-4 py-3 text-sm font-bold text-slate-600 cursor-pointer hover:bg-slate-50">
            🗄️ {isAr ? `الوثائق المؤرشفة (${archived.length})` : `Documents archivés (${archived.length})`}
          </summary>
          <div className="px-4 pb-4 space-y-2 mt-2">
            {archived.map(d => (
              <div key={d.id} className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg">
                <span className="font-mono text-xs text-slate-400">{d.ref}</span>
                <span className="flex-1 text-xs font-bold text-slate-500">{d.title}</span>
                <button onClick={() => deleteDocument(d.id)} className="text-red-400 text-xs font-bold hover:underline">{isAr ? 'حذف نهائي' : 'Supprimer'}</button>
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}
