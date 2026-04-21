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
    const [activeChannelId, setActiveChannelId] = useState<string>('ch1');
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
                placeholder: "البث متوقف مؤقتاً لهذه القناة في النسخة الحالية"
            },
            channels: [
                { id: 'ch1', type: 'tv', name: "الموريتانية الأولى", desc: "القناة الرسمية الجامعة", url: "https://www.youtube.com/embed/oJC1mlUrYnY?autoplay=1&mute=0" },
                { id: 'ch2', type: 'tv', name: "الموريتانية الثانية", desc: "الخدمة العمومية والشباب", url: "https://www.youtube.com/embed/I3nZbfWKzgc?autoplay=1&mute=0" },
                { id: 'ch3', type: 'radio', name: "إذاعة موريتانيا", desc: "صوت الجمهورية", url: "https://ec6.yesstreaming.net:2760/stream" }
            ]
        },
        fr: {
            title: "Direct & Streaming",
            subtitle: "Suivez vos programmes préférés en direct sur notre plateforme numérique",
            tabs: { tv: "Télévision", radio: "Radio & Audio" },
            player: {
                nowPlaying: "En direct",
                placeholder: "La diffusion est suspendue pour cette chaîne"
            },
            channels: [
                { id: 'ch1', type: 'tv', name: "Mauritanaise 1", desc: "Chaîne officielle généraliste", url: "https://www.youtube.com/embed/oJC1mlUrYnY?autoplay=1&mute=0" },
                { id: 'ch2', type: 'tv', name: "Mauritanaise 2", desc: "Service public & Jeunesse", url: "https://www.youtube.com/embed/I3nZbfWKzgc?autoplay=1&mute=0" },
                { id: 'ch3', type: 'radio', name: "Radio Mauritanie", desc: "La voix de la République", url: "https://ec6.yesstreaming.net:2760/stream" }
            ]
        }
    }[locale as 'ar' | 'fr'];

    if (!isClient) return null;

    const filteredChannels = t.channels.filter(ch => ch.type === activeType);
    const activeChannel = t.channels.find(ch => ch.id === activeChannelId) || filteredChannels[0];

    const handleTypeChange = (type: LiveType) => {
        setActiveType(type);
        const firstChannelOfType = t.channels.find(ch => ch.type === type);
        if (firstChannelOfType) {
            setActiveChannelId(firstChannelOfType.id);
        }
    };

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
                            onClick={() => handleTypeChange('tv')}
                            className={`px-8 py-3 rounded-full text-sm font-black transition-all ${activeType === 'tv' ? 'bg-brand-green text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                        >
                            {t.tabs.tv}
                        </button>
                        <button
                            onClick={() => handleTypeChange('radio')}
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
                            
                            {activeChannel.url && activeChannel.type === 'tv' && (
                                <iframe 
                                    key={activeChannel.url}
                                    className="absolute inset-0 w-full h-full z-20"
                                    src={activeChannel.url} 
                                    title="Live Player" 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                    allowFullScreen
                                ></iframe>
                            )}

                            {(!activeChannel.url || activeChannel.type === 'radio') && (
                                <>
                                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 to-black/80"></div>
                                    <div className="relative z-10 text-center space-y-6 p-12">
                                        
                                        {activeChannel.type === 'radio' && activeChannel.url ? (
                                            <div className="space-y-6">
                                                <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto border border-white/20 animate-pulse shadow-[0_0_30px_rgba(255,255,255,0.1)]">
                                                    <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                                                </div>
                                                <div className="max-w-xs mx-auto">
                                                    <audio 
                                                        key={`radio-${activeChannel.url}`}
                                                        controls 
                                                        autoPlay
                                                        className="w-full"
                                                    >
                                                        <source src={activeChannel.url} type="audio/mpeg" />
                                                        Your browser does not support the audio element.
                                                    </audio>
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto border border-white/20 animate-pulse">
                                                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                                                </div>
                                                <p className="text-slate-400 font-bold max-w-xs mx-auto italic">
                                                    {t.player.placeholder}
                                                </p>
                                            </>
                                        )}
                                    </div>
                                </>
                            )}
                            
                            <div className="absolute top-6 left-6 flex items-center gap-3 z-30 pointer-events-none">
                                <span className={`flex h-3 w-3 relative ${activeChannel.url ? '' : 'opacity-50'}`}>
                                    <span className={`absolute inline-flex h-full w-full rounded-full bg-brand-red ${activeChannel.url ? 'animate-ping opacity-75' : 'opacity-50'}`}></span>
                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-red"></span>
                                </span>
                                <span className={`text-xs font-black uppercase tracking-widest drop-shadow-md ${activeChannel.url ? 'text-white' : 'text-white/50'}`}>{t.player.nowPlaying}</span>
                            </div>
                        </div>

                        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700/50 flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 lowercase font-black text-brand-green">
                                    tdm
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{activeChannel.name}</h3>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">{activeChannel.desc}</p>
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
                            {filteredChannels.map(ch => (
                                <button 
                                    key={ch.id} 
                                    onClick={() => setActiveChannelId(ch.id)}
                                    className={`w-full p-6 bg-slate-800/30 border rounded-2xl flex items-center gap-4 transition-all text-right rtl:text-right ltr:text-left ${activeChannelId === ch.id ? 'border-brand-green bg-slate-800/60 shadow-lg' : 'border-slate-700/50 hover:bg-slate-800 hover:border-brand-green/50'}`}
                                >
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${activeChannelId === ch.id ? 'bg-brand-green/20' : 'bg-slate-700'}`}>
                                        <svg className={`w-5 h-5 ${activeChannelId === ch.id ? 'text-brand-green' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" /></svg>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className={`font-bold ${activeChannelId === ch.id ? 'text-white' : 'text-slate-200'}`}>{ch.name}</h4>
                                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">{ch.desc}</p>
                                    </div>
                                    {activeChannelId === ch.id && (
                                        <div className="w-2 h-2 rounded-full bg-brand-green shadow-[0_0_8px_#00A95C]"></div>
                                    )}
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
