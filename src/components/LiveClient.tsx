'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useLiveStore } from '@/store/useLiveStore';

type LiveType = 'tv' | 'radio';

export function LiveClient({ locale }: { locale: string }) {
    const { channels } = useLiveStore();
    const [activeType, setActiveType] = useState<LiveType>('tv');
    const [activeChannelId, setActiveChannelId] = useState<string>('');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        const firstTV = channels.find(c => c.type === 'tv' && c.isActive);
        if (firstTV) setActiveChannelId(firstTV.id);
    }, [channels]);

    const isAr = locale === 'ar';

    const t = {
        ar: {
            title: "البث المباشر",
            subtitle: "تابع برامجك المفضلة مباشرة عبر منصتنا الرقمية",
            tabs: { tv: "البث التلفزي", radio: "البث الإذاعي" },
            categories: {
                public: "عمومية",
                private: "خاصة",
                international: "دولية"
            },
            player: {
                nowPlaying: "يبث الآن",
                placeholder: "البث متوقف مؤقتاً لهذه القناة في النسخة الحالية"
            }
        },
        fr: {
            title: "Direct & Streaming",
            subtitle: "Suivez vos programmes préférés en direct sur notre plateforme numérique",
            tabs: { tv: "Télévision", radio: "Radio & Audio" },
            categories: {
                public: "Public",
                private: "Privé",
                international: "Inter"
            },
            player: {
                nowPlaying: "En direct",
                placeholder: "La diffusion est suspendue pour cette chaîne"
            }
        }
    }[locale as 'ar' | 'fr'] as any;

    if (!isClient) return null;

    const filteredChannels = channels.filter((ch) => ch.type === activeType && ch.isActive);
    const activeChannel = channels.find((ch) => ch.id === activeChannelId) || filteredChannels[0];

    const handleTypeChange = (type: LiveType) => {
        setActiveType(type);
        const firstChannelOfType = channels.find((ch) => ch.type === type && ch.isActive);
        if (firstChannelOfType) {
            setActiveChannelId(firstChannelOfType.id);
        }
    };

    if (!activeChannel && filteredChannels.length === 0) {
        return (
            <div className="min-h-screen bg-brand-dark flex flex-col items-center justify-center text-slate-500 font-bold gap-4">
                <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center animate-pulse">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636" /></svg>
                </div>
                {isAr ? 'لا توجد قنوات متاحة حالياً' : 'Aucune chaîne disponible'}
            </div>
        );
    }

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
                    <div 
                        role="tablist" 
                        aria-label={isAr ? "فئات البث" : "Catégories de diffusion"}
                        className="bg-slate-800/50 backdrop-blur-md p-1.5 rounded-full inline-flex gap-2 border border-slate-700/50 shadow-2xl"
                    >
                        <button
                            role="tab"
                            aria-selected={activeType === 'tv'}
                            aria-controls="live-content-panel"
                            id="tab-tv"
                            onClick={() => handleTypeChange('tv')}
                            className={`px-6 md:px-10 py-3 rounded-full text-sm font-black transition-all duration-300 ${activeType === 'tv' ? 'bg-brand-green text-white shadow-[0_0_20px_rgba(0,169,92,0.3)]' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}
                        >
                            {t.tabs.tv}
                        </button>
                        <button
                            role="tab"
                            aria-selected={activeType === 'radio'}
                            aria-controls="live-content-panel"
                            id="tab-radio"
                            onClick={() => handleTypeChange('radio')}
                            className={`px-6 md:px-10 py-3 rounded-full text-sm font-black transition-all duration-300 ${activeType === 'radio' ? 'bg-brand-red text-white shadow-[0_0_20px_rgba(206,32,41,0.3)]' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}
                        >
                            {t.tabs.radio}
                        </button>
                    </div>
                </div>

                {/* Channel Tabs */}
                <div className="relative group">
                    <div className="flex overflow-x-auto pb-6 gap-4 scroll-smooth custom-scrollbar">
                        {filteredChannels.map((ch) => (
                            <button
                                key={ch.id}
                                onClick={() => setActiveChannelId(ch.id)}
                                aria-label={`${ch.name[locale as 'ar' | 'fr']} - ${t.player.nowPlaying}`}
                                aria-pressed={activeChannelId === ch.id}
                                className={`flex-shrink-0 px-5 py-5 rounded-2xl border transition-all duration-300 flex flex-col items-center gap-4 min-w-[170px] md:min-w-[190px] relative ${
                                    activeChannelId === ch.id 
                                    ? 'bg-slate-800 border-brand-green shadow-[0_0_15px_rgba(0,169,92,0.1)]' 
                                    : 'bg-slate-800/30 border-slate-700/50 hover:border-slate-500/50 hover:bg-slate-800/50'
                                }`}
                            >
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 overflow-hidden relative ${activeChannelId === ch.id ? 'bg-brand-green/10' : 'bg-slate-700/50'}`}>
                                    {ch.logo ? (
                                        <div className="relative w-10 h-10">
                                            <Image 
                                                src={ch.logo} 
                                                alt={ch.name[locale as 'ar' | 'fr']} 
                                                fill 
                                                className={`object-contain transition-all duration-300 ${activeChannelId === ch.id ? 'scale-110 brightness-110' : 'opacity-60 grayscale group-hover:grayscale-0'}`}
                                            />
                                        </div>
                                    ) : (
                                        <div className={activeChannelId === ch.id ? 'text-brand-green' : 'text-slate-400'}>
                                            {ch.type === 'tv' ? (
                                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                            ) : (
                                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                                            )}
                                        </div>
                                    )}
                                </div>
                                <div className="text-center">
                                    <h4 className={`text-xs md:text-sm font-bold truncate max-w-[150px] ${activeChannelId === ch.id ? 'text-white' : 'text-slate-300'}`}>{ch.name[locale as 'ar' | 'fr']}</h4>
                                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-wider truncate max-w-[140px] mt-1">{ch.desc[locale as 'ar' | 'fr']}</p>
                                </div>
                                
                                <span className={`absolute top-2 end-2 text-[8px] font-black px-1.5 py-0.5 rounded uppercase border ${
                                    ch.category === 'public' ? 'border-brand-green/20 text-brand-green bg-brand-green/5' :
                                    ch.category === 'private' ? 'border-brand-red/20 text-brand-red bg-brand-red/5' :
                                    'border-slate-500/20 text-slate-400 bg-slate-500/5'
                                }`}>
                                    {t.categories[ch.category as keyof typeof t.categories]}
                                </span>
                            </button>
                        ))}
                    </div>
                    <div className="absolute end-0 top-0 bottom-4 w-12 bg-gradient-to-l from-brand-dark to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute start-0 top-0 bottom-4 w-12 bg-gradient-to-r from-brand-dark to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Player Area */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="aspect-video bg-black rounded-3xl border border-slate-800 shadow-2xl relative flex items-center justify-center overflow-hidden">
                            
                            {activeChannel?.url && activeChannel.type === 'tv' && (
                                <iframe 
                                    key={activeChannel.url}
                                    className="absolute inset-0 w-full h-full z-20"
                                    src={activeChannel.url} 
                                    title={isAr ? "مشغل البث المباشر" : "Lecteur en direct"} 
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                    allowFullScreen
                                ></iframe>
                            )}

                            {(!activeChannel?.url || activeChannel.type === 'radio') && (
                                <>
                                    <div className="absolute inset-0 bg-gradient-to-br from-slate-900/60 via-brand-dark/80 to-black"></div>
                                    <div className="relative z-10 text-center space-y-8 p-12">
                                        
                                        {activeChannel?.type === 'radio' && activeChannel.url ? (
                                            <div className="space-y-8">
                                                <div className="w-32 h-32 bg-brand-green/10 rounded-full flex items-center justify-center mx-auto border border-brand-green/30 relative">
                                                    <div className="absolute inset-0 rounded-full bg-brand-green/20 animate-ping"></div>
                                                    {activeChannel.logo ? (
                                                        <div className="relative w-20 h-20 z-10">
                                                            <Image src={activeChannel.logo} alt={activeChannel.name[locale as 'ar' | 'fr']} fill className="object-contain" />
                                                        </div>
                                                    ) : (
                                                        <svg className="w-16 h-16 text-brand-green relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                                                    )}
                                                </div>
                                                <div className="max-w-xs mx-auto">
                                                    <audio 
                                                        key={`radio-${activeChannel.url}`}
                                                        controls 
                                                        autoPlay
                                                        className="w-full h-12 accent-brand-green"
                                                        aria-label={isAr ? "مشغل الراديو" : "Lecteur radio"}
                                                    >
                                                        <source src={activeChannel.url} type="audio/mpeg" />
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
                            
                            <div className="absolute top-6 start-6 flex items-center gap-3 z-30 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
                                <span className={`flex h-2.5 w-2.5 relative ${activeChannel?.url ? '' : 'opacity-50'}`}>
                                    <span className={`absolute inline-flex h-full w-full rounded-full bg-brand-red ${activeChannel?.url ? 'animate-ping opacity-75' : 'opacity-50'}`}></span>
                                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-red"></span>
                                </span>
                                <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${activeChannel?.url ? 'text-white' : 'text-white/50'}`}>{t.player.nowPlaying}</span>
                            </div>
                        </div>
                    </div>

                    {/* Info Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-slate-800/40 backdrop-blur-sm p-8 rounded-3xl border border-slate-700/50 h-full flex flex-col justify-between space-y-8">
                            <div className="space-y-6">
                                <div className="flex items-center gap-5">
                                    <div className="w-20 h-20 bg-brand-dark rounded-2xl flex items-center justify-center border border-white/10 p-4 shadow-inner relative overflow-hidden">
                                        {activeChannel?.logo ? (
                                            <Image src={activeChannel.logo} alt={activeChannel.name[locale as 'ar' | 'fr']} fill className="object-contain p-4" />
                                        ) : (
                                            <span className="text-brand-green font-black text-xl">TDM</span>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="font-black text-xl md:text-2xl text-white leading-tight">{activeChannel?.name[locale as 'ar' | 'fr']}</h3>
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider border ${
                                                activeChannel?.category === 'public' ? 'border-brand-green/30 text-brand-green bg-brand-green/10' :
                                                activeChannel?.category === 'private' ? 'border-brand-red/30 text-brand-red bg-brand-red/10' :
                                                'border-slate-500/30 text-slate-400 bg-slate-500/10'
                                            }`}>
                                                {activeChannel ? t.categories[activeChannel.category as keyof typeof t.categories] : ''}
                                            </span>
                                            <span className="text-xs text-slate-500 font-medium">•</span>
                                            <span className="text-xs text-slate-400 font-bold uppercase">{activeChannel?.type}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest border-b border-slate-700 pb-2">{isAr ? 'عن القناة' : 'À propos'}</h4>
                                    <p className="text-sm text-slate-300 leading-relaxed font-medium">
                                        {activeChannel?.desc[locale as 'ar' | 'fr']}. توفر هذه الخدمة وصولاً مباشراً للمحتوى الإعلامي الوطني لضمان التواصل المستمر مع المواطنين في كافة أرجاء الوطن.
                                    </p>
                                </div>
                            </div>

                            <div className="p-6 bg-gradient-to-br from-brand-green/10 to-transparent border border-brand-green/20 rounded-2xl">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse"></div>
                                    <h3 className="text-xs font-black text-brand-green uppercase tracking-widest">
                                        {isAr ? 'البث الرقمي' : 'Digital Edge'}
                                    </h3>
                                </div>
                                <p className="text-[11px] font-bold text-slate-400 leading-relaxed">
                                    {isAr ? 'تعتمد شركة البث الموريتانية أحدث تقنيات البث الرقمي لضمان تغطية شاملة وجودة عالية.' : 'TDM utilise les dernières technologies de streaming pour garantir une couverture nationale de haute qualité.'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    height: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: rgba(255, 255, 255, 0.05);
                    border-eadius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(0, 169, 92, 0.3);
                    border-eadius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(0, 169, 92, 0.6);
                }
            `}</style>
        </div>
    );
}
