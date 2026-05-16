'use client';

import Link from 'next/link';
import { useState, use } from 'react';
import { toArabicNumerals } from '@/lib/utils';

// ─── Data ──────────────────────────────────────────────────────────────────
const COVERAGE_MONTHLY = [
  { month: 'يناير', radio: 80, tv: 72 }, { month: 'فبراير', radio: 81, tv: 73 },
  { month: 'مارس', radio: 82, tv: 74 },  { month: 'أبريل', radio: 83, tv: 75 },
  { month: 'مايو', radio: 83, tv: 76 },  { month: 'يونيو', radio: 84, tv: 76 },
  { month: 'يوليو', radio: 84, tv: 77 }, { month: 'أغسطس', radio: 84, tv: 77 },
  { month: 'سبتمبر', radio: 85, tv: 78 },{ month: 'أكتوبر', radio: 85, tv: 78 },
  { month: 'نوفمبر', radio: 85, tv: 78 },{ month: 'ديسمبر', radio: 85, tv: 78 },
];

const WILAYA_DATA = [
  { name: 'نواكشوط', radio: 98, tv: 97 }, { name: 'نواذيبو', radio: 95, tv: 93 },
  { name: 'تيارت', radio: 82, tv: 74 },   { name: 'الحوض', radio: 78, tv: 65 },
  { name: 'آدرار', radio: 75, tv: 60 },    { name: 'العصابة', radio: 73, tv: 68 },
  { name: 'تكانت', radio: 70, tv: 55 },   { name: 'الترارزة', radio: 85, tv: 80 },
];

const BROADCAST_HOURS = [
  { label: 'أخبار', hours: 2190, color: '#10b981' },
  { label: 'برامج ثقافية', hours: 1460, color: '#3b82f6' },
  { label: 'رياضة', hours: 876, color: '#f59e0b' },
  { label: 'ترفيه', hours: 2628, color: '#8b5cf6' },
  { label: 'تعليم', hours: 730, color: '#ec4899' },
  { label: 'أخرى', hours: 876, color: '#64748b' },
];
const TOTAL_HOURS = BROADCAST_HOURS.reduce((a, b) => a + b.hours, 0);

// ─── SVG Line Chart ─────────────────────────────────────────────────────────
function LineChart({ data, isAr }: { data: typeof COVERAGE_MONTHLY; isAr: boolean }) {
  const W = 800, H = 200, PAD = 40;
  const maxV = 100;
  const xs = data.map((_, i) => PAD + (i / (data.length - 1)) * (W - PAD * 2));
  const y = (v: number) => H - PAD - (v / maxV) * (H - PAD * 2);

  const path = (key: 'radio' | 'tv') =>
    data.map((d, i) => `${i === 0 ? 'M' : 'L'}${xs[i]},${y(d[key])}`).join(' ');

  const area = (key: 'radio' | 'tv') =>
    `${path(key)} L${xs[data.length - 1]},${H - PAD} L${xs[0]},${H - PAD} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 200 }}>
      <defs>
        <linearGradient id="gR" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="gT" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[25, 50, 75, 100].map(v => (
        <g key={v}>
          <line x1={PAD} y1={y(v)} x2={W - PAD} y2={y(v)} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <text x={PAD - 8} y={y(v) + 4} textAnchor="end" fontSize="10" fill="#64748b" fontWeight="bold">{isAr ? toArabicNumerals(v) : v}%</text>
        </g>
      ))}
      <path d={area('radio')} fill="url(#gR)" />
      <path d={area('tv')} fill="url(#gT)" />
      <path d={path('radio')} fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d={path('tv')} fill="none" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((d, i) => (
        <g key={i}>
          <circle cx={xs[i]} cy={y(d.radio)} r="4" fill="#10b981" stroke="#020617" strokeWidth="2" />
          <circle cx={xs[i]} cy={y(d.tv)} r="4" fill="#3b82f6" stroke="#020617" strokeWidth="2" />
          <text x={xs[i]} y={H - 6} textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="bold">{d.month.slice(0, 3)}</text>
        </g>
      ))}
    </svg>
  );
}

// ─── Donut Chart ─────────────────────────────────────────────────────────────
function DonutChart({ isAr }: { isAr: boolean }) {
  const R = 70, CX = 100, CY = 100, STROKE = 28;
  let cumulative = 0;

  const slices = BROADCAST_HOURS.map(item => {
    const pct = item.hours / TOTAL_HOURS;
    const start = cumulative * 2 * Math.PI;
    cumulative += pct;
    const end = cumulative * 2 * Math.PI;
    const x1 = CX + R * Math.sin(start), y1 = CY - R * Math.cos(start);
    const x2 = CX + R * Math.sin(end), y2 = CY - R * Math.cos(end);
    const large = end - start > Math.PI ? 1 : 0;
    return { ...item, d: `M${x1},${y1} A${R},${R} 0 ${large} 1 ${x2},${y2}`, pct };
  });

  return (
    <svg viewBox="0 0 200 200" className="w-full max-w-[200px] mx-auto drop-shadow-2xl">
      {slices.map((s, i) => (
        <path key={i} d={s.d} fill="none" stroke={s.color} strokeWidth={STROKE} className="transition-all hover:scale-105 cursor-pointer origin-center" />
      ))}
      <text x={CX} y={CY - 4} textAnchor="middle" fontSize="22" fontWeight="900" fill="white" tracking-tighter>
        {isAr ? toArabicNumerals(TOTAL_HOURS.toLocaleString()) : TOTAL_HOURS.toLocaleString()}
      </text>
      <text x={CX} y={CY + 14} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#64748b" className="uppercase tracking-widest">{isAr ? 'ساعة / سنة' : 'Heures / an'}</text>
    </svg>
  );
}

// ─── Bar Chart (Wilaya) ───────────────────────────────────────────────────────
function BarChart({ data, isAr }: { data: typeof WILAYA_DATA; isAr: boolean }) {
  const W = 700, H = 220, PAD_L = 90, PAD_B = 30, BAR_W = 22, GAP = 8;
  const groupW = BAR_W * 2 + GAP;
  const totalW = data.length * groupW + (data.length - 1) * 20;
  const startX = PAD_L + (W - PAD_L - totalW) / 2;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 220 }}>
      {[25, 50, 75, 100].map(v => (
        <g key={v}>
          <line x1={PAD_L} y1={H - PAD_B - (v / 100) * (H - PAD_B - 20)} x2={W - 10} y2={H - PAD_B - (v / 100) * (H - PAD_B - 20)} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          <text x={PAD_L - 8} y={H - PAD_B - (v / 100) * (H - PAD_B - 20) + 4} textAnchor="end" fontSize="10" fill="#64748b" fontWeight="bold">{isAr ? toArabicNumerals(v) : v}%</text>
        </g>
      ))}
      {data.map((d, i) => {
        const x = startX + i * (groupW + 20);
        const rH = (d.radio / 100) * (H - PAD_B - 20);
        const tH = (d.tv / 100) * (H - PAD_B - 20);
        return (
          <g key={i}>
            <rect x={x} y={H - PAD_B - rH} width={BAR_W} height={rH} rx="4" fill="#10b981" className="hover:opacity-80 transition-all cursor-pointer" />
            <rect x={x + BAR_W + GAP} y={H - PAD_B - tH} width={BAR_W} height={tH} rx="4" fill="#3b82f6" className="hover:opacity-80 transition-all cursor-pointer" />
            <text x={x + BAR_W + GAP / 2} y={H - 6} textAnchor="middle" fontSize="10" fill="#64748b" fontWeight="bold">{d.name.slice(0, 5)}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function StatsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params) as any;
  const isAr = locale === 'ar';
  const [activeTab, setActiveTab] = useState<'coverage' | 'wilaya' | 'broadcast'>('coverage');

  const T = {
    ar: {
      title: 'إحصاءات وخرائط التغطية', subtitle: 'بيانات تفاعلية حول شبكة البث الموريتانية',
      back: 'العودة لبوابة البيانات',
      tabs: { coverage: 'تطور التغطية', wilaya: 'التغطية بالولايات', broadcast: 'توزيع البث' },
      metrics: [
        { label: 'نسبة التغطية الإذاعية', value: toArabicNumerals('85%'), change: toArabicNumerals('+2%'), up: true },
        { label: 'نسبة التغطية التلفزيونية', value: toArabicNumerals('78%'), change: toArabicNumerals('+4%'), up: true },
        { label: 'النقاط النشطة', value: toArabicNumerals('24'), change: toArabicNumerals('+3'), up: true },
        { label: 'وقت البث السنوي', value: toArabicNumerals('8,760'), unit: 'س', change: toArabicNumerals('99.9%'), up: true },
      ],
      radioLabel: 'إذاعي', tvLabel: 'تلفزيوني',
      coverageTitle: `تطور نسبة التغطية الشهرية (${toArabicNumerals(2025)})`,
      wilayaTitle: 'التغطية حسب الولايات',
      broadcastTitle: 'توزيع ساعات البث السنوية',
    },
    fr: {
      title: 'Statistiques et Couverture', subtitle: 'Données interactives sur le réseau de diffusion mauritanien',
      back: 'Retour au portail',
      tabs: { coverage: 'Évolution couverture', wilaya: 'Couverture par wilaya', broadcast: 'Répartition diffusion' },
      metrics: [
        { label: 'Couverture Radiophonique', value: '85%', change: '+2%', up: true },
        { label: 'Couverture Télévisuelle', value: '78%', change: '+4%', up: true },
        { label: 'Stations Actives', value: '24', change: '+3', up: true },
        { label: 'Heures de diffusion/an', value: '8,760', unit: 'h', change: '99.9%', up: true },
      ],
      radioLabel: 'Radio', tvLabel: 'TV',
      coverageTitle: 'Évolution mensuelle de la couverture (2025)',
      wilayaTitle: 'Couverture par Wilaya',
      broadcastTitle: 'Répartition des heures de diffusion annuelles',
    }
  }[locale as 'ar' | 'fr'] ?? {
    title: 'Statistics', subtitle: 'Interactive broadcasting data',
    back: 'Back', tabs: { coverage: 'Coverage', wilaya: 'By Wilaya', broadcast: 'Broadcast' },
    metrics: [], radioLabel: 'Radio', tvLabel: 'TV',
    coverageTitle: 'Coverage', wilayaTitle: 'By Wilaya', broadcastTitle: 'Broadcast',
  };

    return (
        <main className="min-h-screen pb-32 bg-mesh" dir={isAr ? 'rtl' : 'ltr'}>
            {/* Header / Hero Section */}
            <section className="bg-brand-dark pt-32 pb-56 text-white relative overflow-hidden">
                <div className="absolute inset-0">
                    <img src="/data_bg.jpg" alt="Data background" className="w-full h-full object-cover opacity-10 mix-blend-luminosity" />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-dark/90 to-brand-dark"></div>
                </div>
                
                {/* Decorative mesh blobs */}
                <div className="absolute -top-24 -end-24 w-96 h-96 bg-brand-green/20 blur-[120px] rounded-full"></div>
                <div className="absolute -bottom-24 -start-24 w-96 h-96 bg-brand-yellow/10 blur-[120px] rounded-full"></div>

                <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
                    <Link href={`/${locale}/data`} className="inline-flex items-center gap-2 text-brand-yellow hover:underline mb-8 font-black uppercase tracking-widest text-xs">
                        {isAr ? '←' : '→'} {T.back}
                    </Link>
                    <h1 className="text-6xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9] glow-text-gold">
                        {T.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-400 leading-relaxed max-w-3xl mx-auto font-medium">
                        {T.subtitle}
                    </p>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 -mt-24 relative z-20 space-y-12">
                {/* KPI Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {T.metrics.map((m, i) => (
                        <div key={i} className="premium-card p-8 group border-white/5 hover:border-brand-green/30">
                            <div className="flex justify-between items-start mb-6">
                                <div className={`px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1 uppercase tracking-wider ${m.up ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-eed-500/20'}`}>
                                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d={m.up ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"} />
                                    </svg>
                                    {m.change}
                                </div>
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-brand-green transition-colors">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                </div>
                            </div>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-black text-white tracking-tighter">{m.value}</span>
                                {'unit' in m && m.unit && <span className="text-lg font-black text-slate-500">{m.unit}</span>}
                            </div>
                            <p className="text-sm font-black text-slate-400 mt-2 uppercase tracking-widest opacity-70">{m.label}</p>
                        </div>
                    ))}
                </div>

                {/* Main Content Area */}
                <div className="premium-card overflow-hidden border-white/5 shadow-2xl">
                    <div className="flex border-b border-white/10 bg-white/2 overflow-x-auto custom-scrollbar">
                        {(Object.keys(T.tabs) as Array<keyof typeof T.tabs>).map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab as any)}
                                className={`px-10 py-6 text-sm font-black uppercase tracking-widest whitespace-nowrap border-b-4 transition-all -mb-px ${activeTab === tab ? 'border-brand-green text-white bg-white/5' : 'border-transparent text-slate-500 hover:text-white hover:bg-white/2'}`}>
                                {T.tabs[tab]}
                            </button>
                        ))}
                    </div>

                    <div className="p-10 md:p-16">
                        {activeTab === 'coverage' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                                    <h2 className="text-3xl font-black text-white">{T.coverageTitle}</h2>
                                    <div className="flex gap-8 text-xs font-black uppercase tracking-widest">
                                        <span className="flex items-center gap-3 text-emerald-400">
                                            <span className="w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                            {T.radioLabel}
                                        </span>
                                        <span className="flex items-center gap-3 text-blue-400">
                                            <span className="w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                            {T.tvLabel}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 bg-brand-dark/30 rounded-3xl border border-white/5">
                                    <LineChart data={COVERAGE_MONTHLY} isAr={isAr} />
                                </div>
                            </div>
                        )}

                        {activeTab === 'wilaya' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
                                    <h2 className="text-3xl font-black text-white">{T.wilayaTitle}</h2>
                                    <div className="flex gap-8 text-xs font-black uppercase tracking-widest">
                                        <span className="flex items-center gap-3 text-emerald-400">
                                            <span className="w-4 h-4 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                            {T.radioLabel}
                                        </span>
                                        <span className="flex items-center gap-3 text-blue-400">
                                            <span className="w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
                                            {T.tvLabel}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 bg-brand-dark/30 rounded-3xl border border-white/5 mb-10">
                                    <BarChart data={WILAYA_DATA} isAr={isAr} />
                                </div>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {WILAYA_DATA.map(w => (
                                        <div key={w.name} className="p-5 bg-white/2 rounded-2xl border border-white/5 hover:border-brand-green/20 transition-all group">
                                            <p className="text-sm font-black text-white mb-3 group-hover:text-brand-green transition-colors">{w.name}</p>
                                            <div className="flex justify-between items-center text-xs font-black">
                                                <span className="text-emerald-500">{isAr ? toArabicNumerals(w.radio) : w.radio}%</span>
                                                <span className="text-blue-500">{isAr ? toArabicNumerals(w.tv) : w.tv}%</span>
                                            </div>
                                            <div className="mt-3 h-1.5 bg-white/5 rounded-full overflow-hidden flex">
                                                <div className="h-full bg-emerald-500" style={{ width: `${w.radio}%` }}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {activeTab === 'broadcast' && (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                                <h2 className="text-3xl font-black text-white mb-12">{T.broadcastTitle}</h2>
                                <div className="flex flex-col lg:flex-row items-center gap-20">
                                    <div className="w-full lg:w-72 shrink-0">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-brand-green/10 blur-[60px] rounded-full"></div>
                                            <DonutChart isAr={isAr} />
                                        </div>
                                    </div>
                                    <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                        {BROADCAST_HOURS.map((b, i) => (
                                            <div key={i} className="flex flex-col gap-3 p-6 rounded-2xl bg-white/2 border border-white/5 hover:border-white/10 transition-all group">
                                                <div className="flex justify-between items-center">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-3 h-3 rounded-full shadow-lg" style={{ backgroundColor: b.color, boxShadow: `0 0 10px ${b.color}80` }} />
                                                        <p className="text-sm font-black text-white group-hover:text-brand-green transition-colors">{b.label}</p>
                                                    </div>
                                                    <span className="text-lg font-black text-white/40">{isAr ? toArabicNumerals(Math.round((b.hours / TOTAL_HOURS) * 100)) : Math.round((b.hours / TOTAL_HOURS) * 100)}%</span>
                                                </div>
                                                <div className="w-full bg-white/5 rounded-full h-2.5 p-0.5">
                                                    <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${(b.hours / TOTAL_HOURS) * 100}%`, backgroundColor: b.color }} />
                                                </div>
                                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{isAr ? toArabicNumerals(b.hours.toLocaleString()) : b.hours.toLocaleString()} {isAr ? 'ساعة سنوياً' : 'heures/an'}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Uptime Banner */}
                <div className="premium-card p-10 flex flex-col lg:flex-row items-center gap-10 border-emerald-500/10 bg-emerald-500/[0.02]">
                    <div className="w-24 h-24 rounded-3xl bg-emerald-500/10 border-2 border-emerald-500/20 flex items-center justify-center shrink-0 relative">
                        <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full animate-pulse"></div>
                        <svg className="w-12 h-12 text-emerald-400 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <div className="text-center lg:text-end">
                        <div className="text-5xl font-black text-emerald-400 mb-3 tracking-tighter leading-none">99.9% UPTIME</div>
                        <p className="text-lg text-slate-400 font-bold max-w-2xl">
                            {isAr ? 'نظام البث الموريتاني يعمل بكفاءة قصوى مع مراقبة حية واستجابة فورية للأعطال على مدار الساعة.' : 'Le réseau de diffusion mauritanien fonctionne à pleine capacité avec une surveillance en temps réel et une réponse immédiate.'}
                        </p>
                    </div>
                    <div className="lg:ms-auto flex items-end gap-1.5 h-12">
                        {Array.from({ length: 32 }).map((_, i) => (
                            <div key={i} className={`w-2 rounded-full transition-all duration-500 ${i === 18 ? 'h-5 bg-amber-400 animate-bounce' : 'h-10 bg-emerald-500 opacity-30 hover:opacity-100 hover:h-12'}`} />
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
