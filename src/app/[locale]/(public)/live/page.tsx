'use client';

import { useState, useEffect, use } from 'react';

type LiveType = 'tv' | 'radio';

interface Channel {
    id: string;
    type: LiveType;
    name: string;
    desc: string;
    url: string;
    icon?: string;
}

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
                { id: 'ch-sports', type: 'tv', name: "الموريتانية الرياضية", desc: "تغطية شاملة للرياضة الوطنية", url: "" },
                { id: 'ch-cultural', type: 'tv', name: "الموريتانية الثقافية", desc: "منارة الفكر والثقافة", url: "" },
                { id: 'ch-parliament', type: 'tv', name: "قناة البرلمان", desc: "متابعة الشأن التشريعي", url: "" },
                { id: 'r1', type: 'radio', name: "إذاعة موريتانيا", desc: "صوت الجمهورية", url: "https://ec6.yesstreaming.net:2760/stream" },
                { id: 'r-coran', type: 'radio', name: "إذاعة القرآن الكريم", desc: "نور وهدى", url: "" },
                { id: 'r-youth', type: 'radio', name: "إذاعة الشباب", desc: "صوت الأجيال الصاعدة", url: "" }
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
                { id: 'ch-sports', type: 'tv', name: "Mauritanaise Sports", desc: "Couverture du sport national", url: "" },
                { id: 'ch-cultural', type: 'tv', name: "Mauritanaise Culturelle", desc: "Culture et pensée", url: "" },
                { id: 'ch-parliament', type: 'tv', name: "Chaîne Parlementaire", desc: "Affaires législatives", url: "" },
                { id: 'r1', type: 'radio', name: "Radio Mauritanie", desc: "La voix de la République", url: "https://ec6.yesstreaming.net:2760/stream" },
                { id: 'r-coran', type: 'radio', name: "Radio Coran", desc: "Lumière et guidance", url: "" },
                { id: 'r-youth', type: 'radio', name: "Radio Jeunesse", desc: "La voix des jeunes", url: "" }
            ]
        }
    }[locale as 'ar' | 'fr'];

    if (!isClient) return null;

    const filteredChannels = t.channels.filter((ch: any) => ch.type === activeType);
    const activeChannel = t.channels.find((ch: any) => ch.id === activeChannelId) || filteredChannels[0];

    const handleTypeChange = (type: LiveType) => {
        setActiveType(type);
        const firstChannelOfType = t.channels.find((ch: any) => ch.type === type);
        if (firstChannelOfType) {
            setActiveChannelId(firstChannelOfType.id);
        }
    };

    return (
        <div className="min-h-screen bg-brand-dark text-white">
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 space-y-10">

                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-3xl md:text-5xl font-black tracking-tight">{t.title}</h1>
                    <p className="text-slate-400 max-w-2xl mx-auto font-medium text-sm md:text-base leading-relaxed">{t.subtitle}</p>
                </div>

                {/* Category Switcher */}
                <div className="flex justify-center">
                    <div className="bg-slate-800/50 backdrop-blur-md p-1.5 rounded-full inline-flex gap-2 border border-slate-700/50 shadow-2xl">
                        <button
                            onClick={() => handleTypeChange('tv')}
                            className={`px-6 md:px-10 py-3 rounded-full text-sm font-black transition-all duration-300 ${activeType === 'tv' ? 'bg-brand-green text-white shadow-[0_0_20px_rgba(0,169,92,0.3)]' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}
                        >
                            {t.tabs.tv}
                        </button>
                        <button
                            onClick={() => handleTypeChange('radio')}
                            className={`px-6 md:px-10 py-3 rounded-full text-sm font-black transition-all duration-300 ${activeType === 'radio' ? 'bg-brand-red text-white shadow-[0_0_20px_rgba(206,32,41,0.3)]' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}
                        >
                            {t.tabs.radio}
                        </button>
                    </div>
                </div>

                {/* Channel Tabs */}
                <div className="relative group">
                    <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar scroll-smooth">
                        {filteredChannels.map((ch: any) => (
                            <button
                                key={ch.id}
                                onClick={() => setActiveChannelId(ch.id)}
                                className={`flex-shrink-0 px-6 py-4 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-3 min-w-[160px] md:min-w-[200px] ${
                                    activeChannelId === ch.id 
                                    ? 'bg-slate-800 border-brand-green shadow-[0_0_15px_rgba(0,169,92,0.1)]' 
                                    : 'bg-slate-800/30 border-slate-700/50 hover:border-slate-500/50 hover:bg-slate-800/50'
                                }`}
                            >
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${activeChannelId === ch.id ? 'bg-brand-green/20 text-brand-green' : 'bg-slate-700 text-slate-400'}`}>
                                    {ch.type === 'tv' ? (
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    ) : (
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                                    )}
                                </div>
                                <div className="text-center">
                                    <h4 className={`text-sm font-bold ${activeChannelId === ch.id ? 'text-white' : 'text-slate-300'}`}>{ch.name}</h4>
                                    <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider truncate max-w-[140px]">{ch.desc}</p>
                                </div>
                            </button>
                        ))}
                    </div>
                    {/* Shadow indicators for scrolling */}
                    <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-brand-dark to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute left-0 top-0 bottom-4 w-12 bg-gradient-to-r from-brand-dark to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Player Area */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="aspect-video bg-black rounded-3xl border border-slate-800 shadow-2xl relative flex items-center justify-center overflow-hidden">
                            
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
                                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-brand-dark/80 to-black"></div>
                                    <div className="relative z-10 text-center space-y-8 p-12">
                                        
                                        {activeChannel.type === 'radio' && activeChannel.url ? (
                                            <div className="space-y-8">
                                                <div className="w-32 h-32 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto border border-brand-green/30 relative">
                                                    <div className="absolute inset-0 rounded-full bg-brand-green/20 animate-ping"></div>
                                                    <svg className="w-16 h-16 text-brand-green relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                                                </div>
                                                <div className="max-w-xs mx-auto">
                                                    <audio 
                                                        key={`radio-${activeChannel.url}`}
                                                        controls 
                                                        autoPlay
                                                        className="w-full h-12 accent-brand-green"
                                                    >
                                                        <source src={activeChannel.url} type="audio/mpeg" />
                                                        Your browser does not support the audio element.
                                                    </audio>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-6">
                                                <div className="w-24 h-24 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto border border-slate-700">
                                                    <svg className="w-10 h-10 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                                                </div>
                                                <p className="text-slate-400 font-bold max-w-sm mx-auto italic text-lg leading-relaxed">
                                                    {t.player.placeholder}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </>
                            )}
                            
                            <div className="absolute top-6 left-6 flex items-center gap-3 z-30 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                                <span className={`flex h-2.5 w-2.5 relative ${activeChannel.url ? '' : 'opacity-50'}`}>
                                    <span className={`absolute inline-flex h-full w-full rounded-full bg-brand-red ${activeChannel.url ? 'animate-ping opacity-75' : 'opacity-50'}`}></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-red"></span>
                                </span>
                                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${activeChannel.url ? 'text-white' : 'text-white/50'}`}>{t.player.nowPlaying}</span>
                            </div>
                        </div>
                    </div>

                    {/* Info Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-slate-800/40 backdrop-blur-sm p-8 rounded-3xl border border-slate-700/50 h-full flex flex-col justify-between space-y-8">
                            <div className="space-y-6">
                                <div className="flex items-center gap-5">
                                    <div className="w-16 h-16 bg-brand-dark rounded-2xl flex items-center justify-center border border-white/10 text-brand-green font-black text-xl shadow-inner">
                                        tdm
                                    </div>
                                    <div>
                                        <h3 className="font-black text-2xl text-white">{activeChannel.name}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="px-2 py-0.5 bg-brand-green/20 text-brand-green text-[10px] font-bold rounded uppercase tracking-wider border border-brand-green/20">
                                                {activeChannel.type === 'tv' ? 'TV' : 'Radio'}
                                            </span>
                                            <span className="text-xs text-slate-500 font-medium">•</span>
                                            <span className="text-xs text-slate-400 font-bold">{activeChannel.id.startsWith('ch') ? 'MPEG-4' : 'MP3 Stereo'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest border-b border-slate-700 pb-2">عن القناة</h4>
                                    <p className="text-sm text-slate-300 leading-relaxed font-medium">
                                        {activeChannel.desc}. توفر هذه القناة خدمة البث المباشر على مدار الساعة لضمان وصول المحتوى الإعلامي الوطني لكل الموريتانيين.
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 bg-gradient-to-br from-brand-green/10 to-transparent border border-brand-green/20 rounded-2xl">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></div>
                                    <h3 className="text-xs font-black text-brand-green uppercase tracking-widest">Digital Edge</h3>
                                </div>
                                <p className="text-[11px] font-bold text-slate-400 leading-relaxed">
                                    تعتمد شركة البث الموريتانية أحدث تقنيات الضغط الرقمي لضمان بث عالي الجودة وبأقل استهلاك للبيانات.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            
            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </div>
    );
}
                              تقنية البث الرقمي تضمن وصلاً عالي الجودة لكافة ربوع الوطن.
                            </p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}
