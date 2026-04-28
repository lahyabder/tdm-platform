'use client';

import { useState, use } from 'react';

const MOCK_DOCS = [
  { id: 'TDM-2025-001', title: 'اللائحة العامة لتنظيم قطاع الإعلام', category: 'لوائح', dept: 'الإدارة العامة', date: '2025-01-15', size: 2.4, type: 'PDF', status: 'نشط' },
  { id: 'TDM-2025-002', title: 'دليل إجراءات منح التراخيص الإعلامية', category: 'إجراءات', dept: 'قسم التراخيص', date: '2025-02-10', size: 5.1, type: 'PDF', status: 'نشط' },
  { id: 'TDM-2025-003', title: 'تقرير مؤشرات القطاع السمعي البصري 2024', category: 'تقارير', dept: 'قسم الدراسات', date: '2025-03-01', size: 8.7, type: 'PDF', status: 'نشط' },
  { id: 'TDM-2025-004', title: 'الميزانية التقديرية 2025', category: 'مالية', dept: 'المديرية المالية', date: '2024-12-30', size: 1.8, type: 'XLSX', status: 'نشط' },
  { id: 'TDM-2025-005', title: 'دورية توجيهية بشأن المحتوى الرقمي', category: 'دوريات', dept: 'الإدارة العامة', date: '2025-04-01', size: 0.5, type: 'PDF', status: 'نشط' },
  { id: 'TDM-2025-006', title: 'عقود التعاون الإعلامي الدولي', category: 'عقود', dept: 'الشؤون القانونية', date: '2025-03-22', size: 3.8, type: 'PDF', status: 'نشط' },
];

const CORRESPONDENCES = [
  { id: 'MR-2025-041', subject: 'طلب تجديد رخصة قناة المستقبل', from: 'قناة المستقبل', to: 'قسم التراخيص', date: '2025-04-20', status: 'قيد المعالجة', type: 'وارد' },
  { id: 'MR-2025-042', subject: 'إشعار بانتهاء مهلة تقديم تقرير الامتثال', from: 'قسم التراخيص', to: 'إذاعة موريتانيا', date: '2025-04-22', status: 'أُرسل', type: 'صادر' },
  { id: 'MR-2025-043', subject: 'استفسار عن شروط الترخيص للمنصات الرقمية', from: 'شبكة الجزيرة', to: 'الإدارة العامة', date: '2025-04-25', status: 'مكتمل', type: 'وارد' },
  { id: 'MR-2025-044', subject: 'قرار تعليق بث قناة X', from: 'مجلس الإدارة', to: 'قناة X', date: '2025-04-26', status: 'أُرسل', type: 'صادر' },
];

const CATEGORIES = ['الكل', 'لوائح', 'إجراءات', 'تقارير', 'مالية', 'دوريات', 'عقود'];

export default function AdminDocumentsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params) as any;
  const isAr = locale === 'ar';

  const [tab, setTab] = useState<'archive' | 'correspondence' | 'compose'>('archive');
  const [activeCat, setActiveCat] = useState('الكل');
  const [search, setSearch] = useState('');
  const [showCompose, setShowCompose] = useState(false);
  const [compose, setCompose] = useState({ subject: '', to: '', body: '', category: 'لوائح', file: '' });

  const filtered = MOCK_DOCS.filter(d =>
    (activeCat === 'الكل' || d.category === activeCat) &&
    (d.title.includes(search) || d.id.includes(search) || !search)
  );

  const typeColor = (t: string) => t === 'PDF' ? 'bg-red-50 text-red-600 border-red-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100';
  const statusColor = (s: string) => {
    if (s === 'قيد المعالجة') return 'bg-amber-50 text-amber-700 border-amber-100';
    if (s === 'أُرسل') return 'bg-blue-50 text-blue-700 border-blue-100';
    if (s === 'مكتمل') return 'bg-emerald-50 text-emerald-700 border-emerald-100';
    return 'bg-slate-50 text-slate-600 border-slate-100';
  };

  const T = {
    ar: {
      archive: 'أرشيف الوثائق', correspondence: 'المراسلات', compose: 'إنشاء وثيقة',
      search: 'بحث في الوثائق...', upload: 'رفع وثيقة',
      cols: ['رقم الوثيقة', 'العنوان', 'الفئة', 'الجهة', 'التاريخ', 'الحجم', 'إجراءات'],
      corrCols: ['الرقم', 'الموضوع', 'من', 'إلى', 'التاريخ', 'النوع', 'الحالة'],
      download: 'تحميل', view: 'عرض', send: 'إرسال', cancel: 'إلغاء',
      subject: 'موضوع المراسلة', recipient: 'الجهة المستقبِلة', body: 'نص المراسلة',
      catLabel: 'الفئة', fileLabel: 'إرفاق ملف',
      total: 'إجمالي الوثائق', pending: 'مراسلات معلقة', categories: 'الفئات النشطة',
    },
    fr: {
      archive: 'Archive des documents', correspondence: 'Correspondance', compose: 'Créer un document',
      search: 'Rechercher...', upload: 'Téléverser',
      cols: ['N° Document', 'Titre', 'Catégorie', 'Service', 'Date', 'Taille', 'Actions'],
      corrCols: ['N°', 'Objet', 'De', 'À', 'Date', 'Type', 'Statut'],
      download: 'Télécharger', view: 'Voir', send: 'Envoyer', cancel: 'Annuler',
      subject: 'Objet', recipient: 'Destinataire', body: 'Corps du message',
      catLabel: 'Catégorie', fileLabel: 'Joindre un fichier',
      total: 'Total documents', pending: 'Correspondances en attente', categories: 'Catégories actives',
    }
  }[locale as 'ar' | 'fr'] ?? {
    archive: 'Archive', correspondence: 'Correspondance', compose: 'Créer',
    search: 'Rechercher...', upload: 'Téléverser',
    cols: ['N°', 'Titre', 'Catégorie', 'Service', 'Date', 'Taille', 'Actions'],
    corrCols: ['N°', 'Objet', 'De', 'À', 'Date', 'Type', 'Statut'],
    download: 'Télécharger', view: 'Voir', send: 'Envoyer', cancel: 'Annuler',
    subject: 'Objet', recipient: 'Destinataire', body: 'Corps',
    catLabel: 'Catégorie', fileLabel: 'Fichier',
    total: 'Total', pending: 'En attente', categories: 'Catégories',
  };

  return (
    <div className="space-y-6" dir={isAr ? 'rtl' : 'ltr'}>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: T.total, value: MOCK_DOCS.length, icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', color: 'text-brand-green' },
          { label: T.pending, value: CORRESPONDENCES.filter(c => c.status === 'قيد المعالجة').length, icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', color: 'text-amber-500' },
          { label: T.categories, value: CATEGORIES.length - 1, icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z', color: 'text-blue-500' },
        ].map((s, i) => (
          <div key={i} className="bg-white rounded-sm border border-slate-200 shadow-sm p-5 flex items-center gap-4">
            <div className={`w-10 h-10 rounded-sm bg-slate-50 flex items-center justify-center ${s.color}`}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={s.icon} />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-black text-slate-800">{s.value}</div>
              <div className="text-xs font-bold text-slate-400 uppercase">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-1">
        {(['archive', 'correspondence', 'compose'] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-5 py-3 text-sm font-bold border-b-2 transition-colors -mb-px ${tab === t ? 'border-brand-green text-brand-green' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
          >
            {T[t as keyof typeof T] as string}
          </button>
        ))}
      </div>

      {/* Archive Tab */}
      {tab === 'archive' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <svg className="w-4 h-4 absolute top-1/2 -translate-y-1/2 start-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder={T.search}
                className="w-full ps-9 pe-4 py-2.5 text-sm border border-slate-200 rounded-sm bg-white focus:outline-none focus:ring-1 focus:ring-brand-green"
              />
            </div>
            <div className="flex gap-1 flex-wrap">
              {CATEGORIES.map(c => (
                <button key={c} onClick={() => setActiveCat(c)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-sm border transition-colors ${activeCat === c ? 'bg-brand-green text-white border-brand-green' : 'bg-white text-slate-600 border-slate-200 hover:border-brand-green/50'}`}>
                  {c}
                </button>
              ))}
            </div>
            <button onClick={() => { setTab('compose'); setShowCompose(true); }}
              className="flex items-center gap-2 px-4 py-2.5 bg-brand-green text-white text-sm font-bold rounded-sm hover:bg-brand-green/90 transition-colors shadow-sm shrink-0">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              {T.upload}
            </button>
          </div>

          <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-bold">
                <tr>{T.cols.map((c, i) => <th key={i} className="px-4 py-3 text-start">{c}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map(doc => (
                  <tr key={doc.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">{doc.id}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-red-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                        </svg>
                        <span className="font-bold text-slate-800 text-sm">{doc.title}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 text-xs font-bold border rounded-sm bg-blue-50 text-blue-700 border-blue-100">{doc.category}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-600 text-xs">{doc.dept}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">{doc.date}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 text-[10px] font-black border rounded-sm ${typeColor(doc.type)}`}>{doc.type} · {doc.size} MB</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button className="text-brand-green font-bold text-xs hover:underline">{T.download}</button>
                        <button className="text-slate-500 font-bold text-xs hover:underline">{T.view}</button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={7} className="px-4 py-12 text-center text-slate-400 italic">
                    {isAr ? 'لا توجد وثائق مطابقة' : 'Aucun document trouvé'}
                  </td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Correspondence Tab */}
      {tab === 'correspondence' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {['الكل', 'وارد', 'صادر'].map(f => (
                <button key={f} className="px-3 py-1.5 text-xs font-bold rounded-sm border border-slate-200 bg-white hover:border-brand-green/50 transition-colors">{f}</button>
              ))}
            </div>
            <button onClick={() => setTab('compose')}
              className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-sm font-bold rounded-sm hover:bg-slate-800 transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              {isAr ? 'مراسلة جديدة' : 'Nouvelle correspondance'}
            </button>
          </div>

          <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 border-b border-slate-200 text-xs uppercase text-slate-500 font-bold">
                <tr>{T.corrCols.map((c, i) => <th key={i} className="px-4 py-3 text-start">{c}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {CORRESPONDENCES.map(c => (
                  <tr key={c.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">{c.id}</td>
                    <td className="px-4 py-3 font-bold text-slate-800">{c.subject}</td>
                    <td className="px-4 py-3 text-xs text-slate-600">{c.from}</td>
                    <td className="px-4 py-3 text-xs text-slate-600">{c.to}</td>
                    <td className="px-4 py-3 font-mono text-xs text-slate-500">{c.date}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 text-[10px] font-black border rounded-sm ${c.type === 'وارد' ? 'bg-sky-50 text-sky-700 border-sky-100' : 'bg-violet-50 text-violet-700 border-violet-100'}`}>
                        {c.type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 text-[10px] font-black border rounded-sm ${statusColor(c.status)}`}>{c.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Compose Tab */}
      {tab === 'compose' && (
        <div className="bg-white rounded-sm border border-slate-200 shadow-sm">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="font-bold text-slate-800">{isAr ? 'إنشاء وثيقة / مراسلة جديدة' : 'Créer un document / correspondance'}</h2>
          </div>
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">{T.subject}</label>
                <input value={compose.subject} onChange={e => setCompose({ ...compose, subject: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-brand-green bg-slate-50"
                  placeholder={isAr ? 'موضوع الوثيقة...' : 'Objet du document...'} />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">{T.recipient}</label>
                <input value={compose.to} onChange={e => setCompose({ ...compose, to: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-brand-green bg-slate-50"
                  placeholder={isAr ? 'الجهة المستقبلة...' : 'Destinataire...'} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">{T.catLabel}</label>
                <select value={compose.category} onChange={e => setCompose({ ...compose, category: e.target.value })}
                  className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-brand-green bg-slate-50">
                  {CATEGORIES.filter(c => c !== 'الكل').map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">{T.fileLabel}</label>
                <div className="w-full px-3 py-2.5 text-sm border-2 border-dashed border-slate-200 rounded-sm text-slate-400 text-center cursor-pointer hover:border-brand-green/50 transition-colors">
                  {isAr ? 'اسحب الملف هنا أو انقر للاختيار' : 'Glissez un fichier ou cliquez'}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">{T.body}</label>
              <textarea rows={6} value={compose.body} onChange={e => setCompose({ ...compose, body: e.target.value })}
                className="w-full px-3 py-2.5 text-sm border border-slate-200 rounded-sm focus:outline-none focus:ring-1 focus:ring-brand-green bg-slate-50 resize-none"
                placeholder={isAr ? 'نص الوثيقة أو المراسلة...' : 'Contenu du document...'} />
            </div>

            <div className="flex justify-end gap-3 pt-2 border-t border-slate-100">
              <button onClick={() => setTab('archive')}
                className="px-4 py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-sm transition-colors">{T.cancel}</button>
              <button className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-sm hover:bg-slate-800 transition-colors">{T.send}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
