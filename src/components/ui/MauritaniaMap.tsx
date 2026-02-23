'use client';

import dynamic from 'next/dynamic';

// Dynamically import Leaflet with no SSR since it requires the window object
const LeafletMap = dynamic(() => import('./LeafletMap'), {
    ssr: false,
    loading: () => {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center text-center animate-pulse bg-slate-800/30 rounded-3xl border-4 border-slate-800/50 min-h-[50vh] md:min-h-[60vh] lg:min-h-[450px]">
                <div className="w-12 h-12 border-4 border-brand-green border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }
});

export function MauritaniaMap({ locale }: { locale: string }) {
    return (
        <div className="relative w-full h-full flex flex-col items-center justify-center text-center">

            <LeafletMap locale={locale} />

            {/* Non-overlapping Legend Below the Map */}
            <div className="w-full mt-6 bg-[#0a1120]/80 backdrop-blur-2xl p-4 md:p-5 rounded-2xl border border-white/10 text-xs md:text-sm shadow-[0_10px_30px_rgba(0,0,0,0.5)] flex flex-wrap gap-4 items-center justify-center z-20 relative">
                <div className="flex items-center gap-3">
                    <span className="w-4 h-4 bg-brand-yellow rounded-full shadow-[0_0_15px_rgba(255,215,0,0.8)] border border-white/20"></span>
                    <span className="text-slate-200 font-bold">{locale === 'ar' ? 'المحطة الأرضية' : 'Station Terrienne'}</span>
                </div>
                <div className="flex items-center gap-3">
                    <span className="w-4 h-4 bg-brand-green rounded-full shadow-[0_0_15px_rgba(0,169,92,0.8)] border border-white/20"></span>
                    <span className="text-slate-200 font-bold">{locale === 'ar' ? 'محطة بث مفعلة' : 'Station active'}</span>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative flex h-4 w-4 items-center justify-center">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red/80"></span>
                        <span className="relative inline-flex rounded-full h-full w-full bg-brand-red shadow-[0_0_15px_rgba(208,28,31,0.8)] border border-white/20"></span>
                    </div>
                    <span className="text-slate-200 font-bold">{locale === 'ar' ? 'محطة بث جديدة' : 'Nouvelle station'}</span>
                </div>
            </div>
        </div>
    );
}
