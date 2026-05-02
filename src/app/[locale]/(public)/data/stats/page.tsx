'use client';

import Link from 'next/link';
import { useState, use } from 'react';

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
function LineChart({ data }: { data: typeof COVERAGE_MONTHLY }) {
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
      {/* Grid */}
      {[25, 50, 75, 100].map(v => (
        <g key={v}>
          <line x1={PAD} y1={y(v)} x2={W - PAD} y2={y(v)} stroke="#e2e8f0" strokeWidth="1" />
          <text x={PAD - 8} y={y(v) + 4} textAnchor="end" fontSize="10" fill="#94a3b8">{v}%</text>
        </g>
      ))}
      {/* Areas */}
      <path d={area('radio')} fill="url(#gR)" />
      <path d={area('tv')} fill="url(#gT)" />
      {/* Lines */}
      <path d={path('radio')} fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d={path('tv')} fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Dots */}
      {data.map((d, i) => (
        <g key={i}>
          <circle cx={xs[i]} cy={y(d.radio)} r="3" fill="#10b981" />
          <circle cx={xs[i]} cy={y(d.tv)} r="3" fill="#3b82f6" />
          <text x={xs[i]} y={H - 6} textAnchor="middle" fontSize="9" fill="#94a3b8">{d.month.slice(0, 3)}</text>
        </g>
      ))}
    </svg>
  );
}

// ─── Donut Chart ─────────────────────────────────────────────────────────────
function DonutChart() {
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
    <svg viewBox="0 0 200 200" className="w-full max-w-[200px] mx-auto">
      {slices.map((s, i) => (
        <path key={i} d={s.d} fill="none" stroke={s.color} strokeWidth={STROKE} className="transition-all hover:opacity-80 cursor-pointer" />
      ))}
      <text x={CX} y={CY - 6} textAnchor="middle" fontSize="18" fontWeight="bold" fill="#1e293b">
        {TOTAL_HOURS.toLocaleString()}
      </text>
      <text x={CX} y={CY + 12} textAnchor="middle" fontSize="9" fill="#64748b">ساعة / سنة</text>
    </svg>
  );
}

// ─── Bar Chart (Wilaya) ───────────────────────────────────────────────────────
function BarChart({ data }: { data: typeof WILAYA_DATA }) {
  const W = 700, H = 220, PAD_L = 90, PAD_B = 30, BAR_W = 20, GAP = 12;
  const groupW = BAR_W * 2 + GAP;
  const totalW = data.length * groupW + (data.length - 1) * 20;
  const startX = PAD_L + (W - PAD_L - totalW) / 2;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" style={{ height: 220 }}>
      {[25, 50, 75, 100].map(v => (
        <g key={v}>
          <line x1={PAD_L} y1={H - PAD_B - (v / 100) * (H - PAD_B - 20)} x2={W - 10} y2={H - PAD_B - (v / 100) * (H - PAD_B - 20)} stroke="#e2e8f0" strokeWidth="1" />
          <text x={PAD_L - 6} y={H - PAD_B - (v / 100) * (H - PAD_B - 20) + 4} textAnchor="end" fontSize="10" fill="#94a3b8">{v}%</text>
        </g>
      ))}
      {data.map((d, i) => {
        const x = startX + i * (groupW + 20);
        const rH = (d.radio / 100) * (H - PAD_B - 20);
        const tH = (d.tv / 100) * (H - PAD_B - 20);
        return (
          <g key={i}>
            <rect x={x} y={H - PAD_B - rH} width={BAR_W} height={rH} rx="3" fill="#10b981" className="hover:opacity-80 transition-opacity" />
            <rect x={x + BAR_W + GAP} y={H - PAD_B - tH} width={BAR_W} height={tH} rx="3" fill="#3b82f6" className="hover:opacity-80 transition-opacity" />
            <text x={x + BAR_W + GAP / 2} y={H - 6} textAnchor="middle" fontSize="9" fill="#64748b">{d.name.slice(0, 5)}</text>
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
        { label: 'نسبة التغطية الإذاعية', value: '85%', change: '+2%', up: true },
        { label: 'نسبة التغطية التلفزيونية', value: '78%', change: '+4%', up: true },
        { label: 'النقاط النشطة', value: '24', change: '+3', up: true },
        { label: 'وقت البث السنوي', value: '8,760', unit: 'س', change: '99.9%', up: true },
      ],
      radioLabel: 'إذاعي', tvLabel: 'تلفزيوني',
      coverageTitle: 'تطور نسبة التغطية الشهرية (2025)',
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
    <main className="min-h-screen pb-24" dir={isAr ? 'rtl' : 'ltr'}>
      {/* Header */}
      <section className="bg-brand-dark pt-24 pb-32 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-dark to-brand-green/20" />
        <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-brand-green via-brand-yellow to-brand-red" />
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <Link href={`/${locale}/data`} className="inline-flex items-center gap-2 text-brand-yellow hover:underline mb-6 font-medium">
            {isAr ? '→' : '←'} {T.back}
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">{T.title}</h1>
          <p className="text-lg text-slate-100 max-w-xl mx-auto">{T.subtitle}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 -mt-20 relative z-20 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {T.metrics.map((m, i) => (
            <div key={i} className="bg-brand-card rounded-2xl border border-white/20/80 shadow-md p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all">
              <div className="flex justify-between items-start mb-4">
                <div className={`px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${m.up ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d={m.up ? "M5 10l7-7m0 0l7 7m-7-7v18" : "M19 14l-7 7m0 0l-7-7m7 7V3"} />
                  </svg>
                  {m.change}
                </div>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-white font-mono">{m.value}</span>
                {'unit' in m && m.unit && <span className="text-sm font-bold text-slate-300">{m.unit}</span>}
              </div>
              <p className="text-xs font-bold text-slate-300 mt-1">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Chart Tabs */}
        <div className="bg-brand-card rounded-2xl border border-white/20 shadow-md overflow-hidden">
          <div className="flex border-b border-white/10 overflow-x-auto">
            {(Object.keys(T.tabs) as Array<keyof typeof T.tabs>).map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab as any)}
                className={`px-6 py-4 text-sm font-bold whitespace-nowrap border-b-2 transition-colors -mb-px ${activeTab === tab ? 'border-brand-green text-brand-green' : 'border-transparent text-slate-300 hover:text-white'}`}>
                {T.tabs[tab]}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'coverage' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-white">{T.coverageTitle}</h2>
                  <div className="flex gap-4 text-xs font-bold">
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />{T.radioLabel}</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />{T.tvLabel}</span>
                  </div>
                </div>
                <LineChart data={COVERAGE_MONTHLY} />
              </div>
            )}

            {activeTab === 'wilaya' && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-bold text-white">{T.wilayaTitle}</h2>
                  <div className="flex gap-4 text-xs font-bold">
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />{T.radioLabel}</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-blue-500 inline-block" />{T.tvLabel}</span>
                  </div>
                </div>
                <BarChart data={WILAYA_DATA} />
                <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">
                  {WILAYA_DATA.map(w => (
                    <div key={w.name} className="p-3 bg-brand-card rounded-lg border border-white/10">
                      <p className="text-xs font-bold text-slate-200 mb-1">{w.name}</p>
                      <div className="flex gap-3 text-xs">
                        <span className="text-emerald-600 font-bold">{w.radio}%</span>
                        <span className="text-blue-600 font-bold">{w.tv}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'broadcast' && (
              <div>
                <h2 className="font-bold text-white mb-6">{T.broadcastTitle}</h2>
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="w-full md:w-48 shrink-0">
                    <DonutChart />
                  </div>
                  <div className="flex-1 grid grid-cols-2 gap-3 w-full">
                    {BROADCAST_HOURS.map((b, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-white/10 hover:bg-brand-card transition-colors">
                        <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: b.color }} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-100 truncate">{b.label}</p>
                          <div className="w-full bg-brand-card-hover rounded-full h-1.5 mt-1">
                            <div className="h-1.5 rounded-full transition-all" style={{ width: `${(b.hours / TOTAL_HOURS) * 100}%`, backgroundColor: b.color }} />
                          </div>
                        </div>
                        <span className="text-xs font-black text-slate-300 shrink-0">{Math.round((b.hours / TOTAL_HOURS) * 100)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Uptime Banner */}
        <div className="bg-brand-dark rounded-2xl p-8 text-white flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center shrink-0">
            <svg className="w-8 h-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </div>
          <div>
            <div className="text-3xl font-black text-emerald-400 mb-1">99.9% Uptime</div>
            <p className="text-slate-100 text-sm">{isAr ? 'معدل توافر شبكة البث عبر التراب الوطني — مراقب على مدار الساعة' : 'Disponibilité du réseau de diffusion — surveillance 24h/24'}</p>
          </div>
          <div className="md:ms-auto flex gap-2">
            {Array.from({ length: 30 }).map((_, i) => (
              <div key={i} className={`w-1.5 rounded-full ${i === 14 ? 'h-4 bg-amber-400' : 'h-6 bg-emerald-500'}`} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
