'use client';

import { use, useMemo } from 'react';
import Link from 'next/link';
import { useGEDStore, STATUS_LABELS, PRIORITY_LABELS } from '@/store/useGEDStore';

export default function GEDDashboard({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params) as any;
  const isAr = locale === 'ar';
  const correspondences = useGEDStore((s) => s.correspondences);
  const documents = useGEDStore((s) => s.documents);
  const users = useGEDStore((s) => s.users);

  const stats = useMemo(() => ({
    incoming:  correspondences.filter((c) => c.type === 'incoming').length,
    outgoing:  correspondences.filter((c) => c.type === 'outgoing').length,
    internal:  correspondences.filter((c) => c.type === 'internal').length,
    documents: documents.filter((d) => d.status === 'active').length,
    pending:   correspondences.filter((c) => c.status === 'new' || c.status === 'processing').length,
    urgent:    correspondences.filter((c) => c.priority === 'urgent').length,
  }), [correspondences, documents]);

  const recent = correspondences.slice(0, 5);

  const kpis = [
    { label: isAr ? 'الواردة' : 'Entrant', value: stats.incoming, icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', color: 'text-blue-600', bg: 'bg-blue-50', href: 'incoming' },
    { label: isAr ? 'الصادرة' : 'Sortant', value: stats.outgoing, icon: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8', color: 'text-violet-600', bg: 'bg-violet-50', href: 'outgoing' },
    { label: isAr ? 'الداخلية' : 'Interne', value: stats.internal, icon: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z', color: 'text-emerald-600', bg: 'bg-emerald-50', href: 'internal' },
    { label: isAr ? 'وثائق الأرشيف' : 'Archives', value: stats.documents, icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4', color: 'text-amber-600', bg: 'bg-amber-50', href: 'archive' },
    { label: isAr ? 'معلقة' : 'En attente', value: stats.pending, icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', color: 'text-orange-600', bg: 'bg-orange-50', href: '' },
    { label: isAr ? 'عاجل' : 'Urgent', value: stats.urgent, icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z', color: 'text-red-600', bg: 'bg-red-50', href: '' },
  ];

  return (
    <div dir={isAr ? 'rtl' : 'ltr'} className="space-y-6">
      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {kpis.map((k, i) => (
          <div key={i} className={`bg-white rounded-xl border border-slate-200 shadow-sm p-4 hover:shadow-md hover:-translate-y-0.5 transition-all ${k.href ? 'cursor-pointer' : ''}`}>
            <div className={`w-10 h-10 rounded-lg ${k.bg} flex items-center justify-center mb-3`}>
              <svg className={`w-5 h-5 ${k.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={k.icon} />
              </svg>
            </div>
            <div className="text-2xl font-black text-slate-800">{k.value}</div>
            <div className="text-xs font-bold text-slate-500 mt-0.5">{k.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-800">{isAr ? 'آخر المراسلات' : 'Dernières correspondances'}</h3>
            <Link href={`/${locale}/admin/ged/incoming`} className="text-xs font-bold text-brand-green hover:underline">
              {isAr ? 'عرض الكل' : 'Voir tout'}
            </Link>
          </div>
          <div className="divide-y divide-slate-50">
            {recent.map((c) => {
              const typeColors = { incoming: 'bg-blue-100 text-blue-700', outgoing: 'bg-violet-100 text-violet-700', internal: 'bg-emerald-100 text-emerald-700' };
              const typeLabels = { incoming: isAr ? 'واردة' : 'Entrant', outgoing: isAr ? 'صادرة' : 'Sortant', internal: isAr ? 'داخلية' : 'Interne' };
              return (
                <div key={c.id} className="px-5 py-3.5 flex items-start gap-3 hover:bg-slate-50 transition-colors">
                  <span className={`px-2 py-0.5 text-[10px] font-black rounded-full shrink-0 mt-0.5 ${typeColors[c.type]}`}>
                    {typeLabels[c.type]}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-800 truncate">{c.subject}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{c.from} · {c.date}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`px-2 py-0.5 text-[10px] font-bold border rounded-full ${PRIORITY_LABELS[c.priority].color}`}>
                      {isAr ? PRIORITY_LABELS[c.priority].ar : c.priority}
                    </span>
                    <span className={`px-2 py-0.5 text-[10px] font-bold border rounded-full ${STATUS_LABELS[c.status].color}`}>
                      {STATUS_LABELS[c.status].ar}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions + Team */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h3 className="font-bold text-slate-800 mb-3">{isAr ? 'إجراءات سريعة' : 'Actions rapides'}</h3>
            <div className="space-y-2">
              {[
                { label: isAr ? 'مراسلة واردة جديدة' : 'Nouveau courrier entrant', color: 'bg-blue-600', href: 'compose?type=incoming' },
                { label: isAr ? 'مراسلة صادرة جديدة' : 'Nouveau courrier sortant', color: 'bg-violet-600', href: 'compose?type=outgoing' },
                { label: isAr ? 'مذكرة داخلية' : 'Note interne', color: 'bg-emerald-600', href: 'compose?type=internal' },
                { label: isAr ? 'رفع وثيقة' : 'Téléverser un document', color: 'bg-amber-600', href: 'archive' },
              ].map((a, i) => (
                <Link key={i} href={`/${locale}/admin/ged/${a.href}`}
                  className={`flex items-center gap-3 px-4 py-2.5 ${a.color} text-white rounded-lg text-sm font-bold hover:opacity-90 transition-opacity`}>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  {a.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            <h3 className="font-bold text-slate-800 mb-3">{isAr ? 'الفريق النشط' : 'Équipe active'}</h3>
            <div className="space-y-2">
              {users.filter(u => u.active).slice(0, 4).map((u) => (
                <div key={u.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center text-xs font-black">
                    {u.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-800 truncate">{u.name}</p>
                    <p className="text-[10px] text-slate-400">{u.department}</p>
                  </div>
                  <div className="w-2 h-2 rounded-full bg-emerald-400" />
                </div>
              ))}
            </div>
            <Link href={`/${locale}/admin/ged/team`} className="mt-3 block text-center text-xs font-bold text-brand-green hover:underline">
              {isAr ? 'إدارة الفريق ←' : 'Gérer l\'équipe →'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
