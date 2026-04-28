'use client';

import { useState, use } from 'react';
import { useGEDStore, STATUS_LABELS, PRIORITY_LABELS, Correspondence, CorrespondenceStatus } from '@/store/useGEDStore';

interface Props { params: Promise<{ locale: string }>; type: 'incoming' | 'outgoing' | 'internal'; }

export function CorrespondenceList({ params, type }: Props) {
  const { locale } = use(params) as any;
  const isAr = locale === 'ar';
  const { correspondences, updateStatus, deleteCorrespondence, getUserById } = useGEDStore();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<CorrespondenceStatus | 'all'>('all');
  const [selected, setSelected] = useState<Correspondence | null>(null);

  const items = correspondences.filter(c =>
    c.type === type &&
    (statusFilter === 'all' || c.status === statusFilter) &&
    (!search || c.subject.includes(search) || c.ref.includes(search) || c.from.includes(search))
  );

  const statuses: Array<CorrespondenceStatus | 'all'> = ['all', 'new', 'processing', 'completed', 'archived'];
  const statusAllLabel = isAr ? 'الكل' : 'Tous';

  return (
    <div dir={isAr ? 'rtl' : 'ltr'} className="flex gap-6 h-[calc(100vh-260px)] min-h-[500px]">
      {/* List Panel */}
      <div className="flex-1 flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-w-0">
        {/* Toolbar */}
        <div className="px-4 py-3 border-b border-slate-100 flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[160px]">
            <svg className="w-4 h-4 absolute top-1/2 -translate-y-1/2 start-3 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder={isAr ? 'بحث...' : 'Rechercher...'}
              className="w-full ps-9 pe-4 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:outline-none focus:ring-1 focus:ring-brand-green" />
          </div>
          <div className="flex gap-1">
            {statuses.map(s => (
              <button key={s} onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 text-xs font-bold rounded-lg border transition-colors ${statusFilter === s ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-200 hover:border-slate-400'}`}>
                {s === 'all' ? statusAllLabel : STATUS_LABELS[s].ar}
              </button>
            ))}
          </div>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
          {items.length === 0 && (
            <div className="p-12 text-center text-slate-400">
              <svg className="w-12 h-12 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <p className="font-bold text-sm">{isAr ? 'لا توجد مراسلات' : 'Aucune correspondance'}</p>
            </div>
          )}
          {items.map(c => {
            const assignee = c.assignedTo ? getUserById(c.assignedTo) : null;
            return (
              <div key={c.id} onClick={() => setSelected(c)}
                className={`px-4 py-3.5 cursor-pointer hover:bg-slate-50 transition-colors ${selected?.id === c.id ? 'bg-brand-green/5 border-s-2 border-brand-green' : ''}`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-800 truncate">{c.subject}</p>
                    <p className="text-xs text-slate-500 mt-0.5 truncate">{c.ref} · {c.from} · {c.date}</p>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className={`px-2 py-0.5 text-[9px] font-black border rounded-full ${PRIORITY_LABELS[c.priority].color}`}>
                      {PRIORITY_LABELS[c.priority].ar}
                    </span>
                    <span className={`px-2 py-0.5 text-[9px] font-black border rounded-full ${STATUS_LABELS[c.status].color}`}>
                      {STATUS_LABELS[c.status].ar}
                    </span>
                  </div>
                </div>
                {assignee && (
                  <div className="flex items-center gap-1.5 mt-2">
                    <div className="w-5 h-5 rounded-full bg-brand-green/10 text-brand-green text-[9px] font-black flex items-center justify-center">{assignee.avatar}</div>
                    <span className="text-[10px] text-slate-500">{assignee.name}</span>
                  </div>
                )}
                {c.attachments.length > 0 && (
                  <div className="mt-1.5 flex items-center gap-1 text-[10px] text-slate-400">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                    </svg>
                    {c.attachments.length} {isAr ? 'مرفق' : 'pièce(s)'}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail Panel */}
      <div className="w-96 shrink-0 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
        {!selected ? (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-300 p-8 text-center">
            <svg className="w-16 h-16 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            <p className="text-sm font-bold">{isAr ? 'اختر مراسلة للعرض' : 'Sélectionnez une correspondance'}</p>
          </div>
        ) : (
          <>
            <div className="px-5 py-4 border-b border-slate-100 flex items-start justify-between gap-2">
              <div>
                <p className="font-mono text-xs text-slate-400">{selected.ref}</p>
                <h3 className="font-bold text-slate-800 mt-0.5 text-sm leading-tight">{selected.subject}</h3>
              </div>
              <button onClick={() => setSelected(null)} className="text-slate-400 hover:text-slate-600 shrink-0">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-slate-400 font-bold mb-1">{isAr ? 'من' : 'De'}</p>
                  <p className="font-bold text-slate-700">{selected.from}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold mb-1">{isAr ? 'التاريخ' : 'Date'}</p>
                  <p className="font-bold text-slate-700">{selected.date}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold mb-1">{isAr ? 'الأولوية' : 'Priorité'}</p>
                  <span className={`px-2 py-0.5 text-[10px] font-black border rounded-full ${PRIORITY_LABELS[selected.priority].color}`}>
                    {PRIORITY_LABELS[selected.priority].ar}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-bold mb-1">{isAr ? 'الحالة' : 'Statut'}</p>
                  <span className={`px-2 py-0.5 text-[10px] font-black border rounded-full ${STATUS_LABELS[selected.status].color}`}>
                    {STATUS_LABELS[selected.status].ar}
                  </span>
                </div>
                {selected.dueDate && (
                  <div className="col-span-2">
                    <p className="text-xs text-slate-400 font-bold mb-1">{isAr ? 'الموعد النهائي' : 'Échéance'}</p>
                    <p className="font-bold text-red-600">{selected.dueDate}</p>
                  </div>
                )}
              </div>

              <div>
                <p className="text-xs text-slate-400 font-bold mb-1">{isAr ? 'المحتوى' : 'Contenu'}</p>
                <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">{selected.body}</p>
              </div>

              {selected.attachments.length > 0 && (
                <div>
                  <p className="text-xs text-slate-400 font-bold mb-2">{isAr ? 'المرفقات' : 'Pièces jointes'}</p>
                  {selected.attachments.map((a, i) => (
                    <div key={i} className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-lg border border-slate-100 mb-1">
                      <div className="w-7 h-7 bg-red-100 rounded flex items-center justify-center">
                        <span className="text-red-600 text-[8px] font-black">{a.type}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-700 truncate">{a.name}</p>
                        <p className="text-[10px] text-slate-400">{a.size}</p>
                      </div>
                      <button className="text-brand-green text-xs font-bold hover:underline shrink-0">
                        {isAr ? 'تحميل' : 'Télécharger'}
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {selected.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {selected.tags.map(t => (
                    <span key={t} className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-bold rounded-full">#{t}</span>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="p-4 border-t border-slate-100 space-y-2">
              <p className="text-xs text-slate-400 font-bold mb-2">{isAr ? 'تغيير الحالة' : 'Changer le statut'}</p>
              <div className="grid grid-cols-2 gap-2">
                {(['processing', 'completed', 'archived'] as CorrespondenceStatus[]).map(s => (
                  <button key={s} onClick={() => updateStatus(selected.id, s)}
                    className={`px-3 py-1.5 text-xs font-bold border rounded-lg transition-colors ${STATUS_LABELS[s].color} hover:opacity-80`}>
                    → {STATUS_LABELS[s].ar}
                  </button>
                ))}
                <button onClick={() => { deleteCorrespondence(selected.id); setSelected(null); }}
                  className="px-3 py-1.5 text-xs font-bold border border-red-200 text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                  {isAr ? 'حذف' : 'Supprimer'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
