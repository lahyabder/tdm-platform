'use client';

import { useState, useEffect, use } from 'react';

type LiveType = 'tv' | 'radio';

export default function LivePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params) as any;
    const [activeType, setActiveType] = useState<LiveType>('tv');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const t = {
        ar: {
            title: "البث المباشر",
            subtitle: "تابع برامجك المفضلة مباشرة عبر منصتنا الرقمية",
            tabs: { tv: "البث التلفزي", radio: "البث الإذاعي" },
            player: {
                nowPlaying: "يبث الآن",
                placeholder: "مشغل تجريبي - البث متوقف مؤقتاً في هذه النسخة"
            },
            channels: [
                { id: 'ch1', name: "الموريتانية الأولى", desc: "القناة الرسمية الجامعة" },
                { id: 'ch2', name: "الموريتانية الثانية", desc: "الخدمة العمومية والشباب" },
                { id: 'ch3', name: "إذاعة موريتانيا", desc: "صوت الجمهورية" }
            ]
        },
        fr: {
            title: "Direct & Streaming",
            subtitle: "Suivez vos programmes préférés en direct sur notre plateforme numérique",
            tabs: { tv: "Télévision", radio: "Radio & Audio" },
            player: {
                nowPlaying: "En direct",
                placeholder: "Lecteur Démo - La diffusion est suspendue dans cette version"
            },
            channels: [
                { id: 'ch1', name: "Mauritanaise 1", desc: "Chaîne officielle généraliste" },
                { id: 'ch2', name: "Mauritanaise 2", desc: "Service public & Jeunesse" },
                { id: 'ch3', name: "Radio Mauritanie", desc: "La voix de la République" }
            ]
        }
    }[locale as 'ar' | 'fr'];

    if (!isClient) return null;

    return (
        <div className="min-h-screen bg-slate-900 text-white">
            <div className="max-w-6xl mx-auto px-6 py-16 space-y-12">

                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight">{t.title}</h1>
                    <p className="text-slate-400 max-w-2xl mx-auto font-medium">{t.subtitle}</p>
                </div>

                {/* Tab Switcher */}
                <div className="flex justify-center">
                    <div className="bg-slate-800 p-1.5 rounded-full inline-flex gap-2 border border-slate-700">
                        <button
                            onClick={() => setActiveType('tv')}
                            className={`px-8 py-3 rounded-full text-sm font-black transition-all ${activeType === 'tv' ? 'bg-brand-green text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            {t.tabs.tv}
                        </button>
                        <button
                            onClick={() => setActiveType('radio')}
                            className={`px-8 py-3 rounded-full text-sm font-black transition-all ${activeType === 'radio' ? 'bg-brand-red text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            {t.tabs.radio}
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Player Area */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="aspect-video bg-black rounded-3xl border border-slate-800 shadow-2xl relative flex items-center justify-center overflow-hidden group">
                            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 to-black/80"></div>
                            <div className="relative z-10 text-center space-y-6 p-12">
                                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto border border-white/20 animate-pulse">
                                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                                </div>
                                <p className="text-slate-400 font-bold max-w-xs mx-auto italic">
                                    {t.player.placeholder}
                                </p>
                            </div>
                            <div className="absolute top-6 left-6 flex items-center gap-3">
                                <span className="flex h-3 w-3 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-red"></span>
                                </span>
                                <span className="text-xs font-black uppercase tracking-widest">{t.player.nowPlaying}</span>
                            </div>
                        </div>

                        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 lowercase font-black text-brand-green">
                                    tdm
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{activeType === 'tv' ? t.channels[0].name : t.channels[2].name}</h3>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{activeType === 'tv' ? t.channels[0].desc : t.channels[2].desc}</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                {[1, 2].map(i => <div key={i} className="w-2 h-2 rounded-full bg-slate-700"></div>)}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - Other Channels */}
                    <div className="space-y-6">
                        <h2 className="text-sm font-black text-slate-500 uppercase tracking-widest px-2">القنوات والإذاعات</h2>
                        <div className="space-y-3">
                            {t.channels.map(ch => (
                                <button key={ch.id} className="w-full p-6 bg-slate-800/30 border border-slate-700/50 rounded-2xl flex items-center gap-4 hover:bg-slate-800 hover:border-brand-green transition-all text-right rtl:text-right ltr:text-left">
                                    <div className="w-10 h-10 bg-slate-700 rounded-xl flex items-center justify-center shrink-0">
                                        <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" /></svg>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-200">{ch.name}</h4>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{ch.desc}</p>
                                    </div>
                                </button>
                            ))}
                        </div>

                        <div className="p-8 bg-gradient-to-br from-brand-green/20 to-transparent border border-brand-green/20 rounded-3xl space-y-4">
                            <h3 className="text-xs font-black text-brand-green uppercase tracking-widest">Digital Edge</h3>
                            <p className="text-xs font-bold text-slate-400 leading-relaxed">
                                تقنية البث الرقمي تضمن وصلاً عالي الجودة لكافة ربوع الوطن.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
