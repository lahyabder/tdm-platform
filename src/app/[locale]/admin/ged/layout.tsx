'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { use, useMemo } from 'react';
import { useGEDStore } from '@/store/useGEDStore';

export default function GEDLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params) as any;
  const pathname = usePathname();
  const correspondences = useGEDStore((s) => s.correspondences);
  const documents = useGEDStore((s) => s.documents);

  const stats = useMemo(() => ({
    incoming:  correspondences.filter((c) => c.type === 'incoming').length,
    outgoing:  correspondences.filter((c) => c.type === 'outgoing').length,
    internal:  correspondences.filter((c) => c.type === 'internal').length,
    documents: documents.filter((d) => d.status === 'active').length,
    pending:   correspondences.filter((c) => c.status === 'new' || c.status === 'processing').length,
    urgent:    correspondences.filter((c) => c.priority === 'urgent').length,
  }), [correspondences, documents]);

  const nav = [
    {
      href: `/${locale}/admin/ged`,
      label: locale === 'ar' ? 'لوحة التحكم' : 'Tableau de bord',
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      badge: null,
      exact: true,
    },
    {
      href: `/${locale}/admin/ged/incoming`,
      label: locale === 'ar' ? 'الواردة' : 'Courrier entrant',
      icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      badge: stats.incoming,
      exact: false,
    },
    {
      href: `/${locale}/admin/ged/outgoing`,
      label: locale === 'ar' ? 'الصادرة' : 'Courrier sortant',
      icon: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8',
      badge: stats.outgoing,
      exact: false,
    },
    {
      href: `/${locale}/admin/ged/internal`,
      label: locale === 'ar' ? 'المذكرات الداخلية' : 'Notes internes',
      icon: 'M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z',
      badge: stats.internal,
      exact: false,
    },
    {
      href: `/${locale}/admin/ged/archive`,
      label: locale === 'ar' ? 'أرشيف الوثائق' : 'Archive documents',
      icon: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4',
      badge: stats.documents,
      exact: false,
    },
    {
      href: `/${locale}/admin/ged/compose`,
      label: locale === 'ar' ? 'إنشاء مراسلة' : 'Nouvelle correspondance',
      icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
      badge: null,
      exact: false,
      highlight: true,
    },
    {
      href: `/${locale}/admin/ged/team`,
      label: locale === 'ar' ? 'الفريق والصلاحيات' : 'Équipe & permissions',
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      badge: null,
      exact: false,
    },
  ];

  const isActive = (item: typeof nav[0]) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  return (
    <div className="space-y-0 -m-6 md:-m-8">
      {/* GED Header */}
      <div className="bg-slate-900 px-6 py-4 flex items-center justify-between border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-green rounded flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h2 className="text-white font-black text-sm">
              {locale === 'ar' ? 'نظام GED — إدارة الوثائق والمراسلات' : 'GED — Gestion Électronique des Documents'}
            </h2>
            <p className="text-slate-400 text-xs">{locale === 'ar' ? 'شركة البث الإذاعي والتلفزي الموريتاني' : 'TDM'}</p>
          </div>
        </div>
        {stats.urgent > 0 && (
          <div className="flex items-center gap-2 bg-red-500/20 border border-red-500/30 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <span className="text-red-300 text-xs font-bold">{stats.urgent} {locale === 'ar' ? 'عاجل' : 'urgent'}</span>
          </div>
        )}
      </div>

      {/* GED Sub-nav */}
      <div className="bg-white border-b border-slate-200 px-4 flex gap-1 overflow-x-auto">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-bold whitespace-nowrap border-b-2 transition-colors -mb-px ${
              isActive(item)
                ? 'border-brand-green text-brand-green'
                : item.highlight
                ? 'border-transparent text-brand-green hover:border-brand-green/30'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
            </svg>
            {item.label}
            {item.badge !== null && item.badge > 0 && (
              <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-black rounded-full">
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        {children}
      </div>
    </div>
  );
}
