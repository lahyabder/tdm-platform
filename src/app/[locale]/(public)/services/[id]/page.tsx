import { getServiceDetailContent } from '@/lib/content';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Tv, Radio } from 'lucide-react';
import { ClientLogo } from '@/components/ui/ClientLogo';



export default async function ServiceDetailPage({
    params,
}: {
    params: Promise<{ locale: string; id: string }>;
}) {
    const resolvedParams = await params;
    const { locale, id } = resolvedParams;
    const content = await getServiceDetailContent(locale, id);
    const fileId = id; // The mapping is now handled inside getServiceDetailContent

    if (!content) {
        return notFound();
    }

    return (
        <main className="min-h-screen pb-24">
            {/* 1. Header / Definition */}
            <section className="bg-brand-dark pt-32 pb-40 text-white relative overflow-hidden">
                <div className="absolute inset-0">
                    <img src={`/${fileId}.jpg`} alt={content.title} className="w-full h-full object-cover opacity-20 mix-blend-luminosity" />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-dark/95 to-brand-dark"></div>
                </div>
                
                {/* Decorative blobs */}
                <div className="absolute top-1/4 -right-20 w-96 h-96 bg-brand-green/10 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-brand-yellow/10 blur-[120px] rounded-full"></div>

                <div className="max-w-5xl mx-auto px-6 relative z-10">
                    <Link href={`/${locale}/services`} className="inline-flex items-center gap-2 text-brand-green hover:text-white font-bold mb-12 text-sm transition-all hover:gap-4">
                        <span className={locale === 'ar' ? 'rotate-180' : ''}>&larr;</span>
                        {locale === 'ar' ? 'العودة لقائمة الخدمات' : 'Retour aux services'}
                    </Link>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-tight">
                                {content.title}
                            </h1>
                            <div className="w-24 h-2 bg-gradient-to-r from-brand-green to-brand-yellow rounded-full mb-8"></div>
                            <p className="text-xl text-slate-300 leading-relaxed font-medium">
                                {content.definition}
                            </p>
                        </div>
                        <div className="hidden lg:block relative">
                            <div className="absolute inset-0 bg-brand-green/20 blur-[100px] rounded-full"></div>
                            <div className="relative premium-card p-12 aspect-square flex items-center justify-center border-white/10">
                                {id === 'tv' || id === 'dtt' ? <Tv className="w-32 h-32 text-brand-green opacity-50" /> : <Radio className="w-32 h-32 text-brand-yellow opacity-50" />}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="max-w-4xl mx-auto px-6 -mt-16 space-y-12 relative z-20">

                {content.audience && content.audience.items && content.audience.items.length > 0 && (
                <div className="premium-card p-10 border-t-4 border-t-brand-green relative overflow-hidden bg-slate-900/90 shadow-2xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/5 blur-3xl rounded-full"></div>
                    <h2 className="text-3xl font-black text-white mb-10 flex items-center gap-4">
                        <div className="w-12 h-12 bg-brand-green/10 text-brand-green rounded-xl flex items-center justify-center border border-brand-green/20">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        </div>
                        {content.audience.title}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {content.audience.items.map((item: string, i: number) => (
                                <div key={i} className="flex items-center gap-4 bg-white/10 p-5 rounded-2xl border border-white/20 group hover:border-brand-green/30 transition-all shadow-lg">
                                    <div className="w-3 h-3 bg-brand-green rounded-full shadow-[0_0_15px_rgba(34,197,94,0.6)]"></div>
                                    <span className="text-white text-lg font-black leading-tight">{item}</span>
                                </div>
                        ))}
                    </div>
                </div>
                )}

                {content.steps && content.steps.items && content.steps.items.length > 0 && (
                <div className="premium-card p-10 border-t-4 border-t-brand-yellow relative overflow-hidden bg-slate-900/90 shadow-2xl">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-yellow/5 blur-3xl rounded-full"></div>
                    <h2 className="text-3xl font-black text-white mb-12 flex items-center gap-4">
                        <div className="w-12 h-12 bg-brand-yellow/10 text-brand-yellow rounded-xl flex items-center justify-center border border-brand-yellow/20">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                        </div>
                        {content.steps.title}
                    </h2>
                    <div className="space-y-8 relative before:absolute before:inset-0 before:rtl:right-[1.45rem] before:ltr:left-[1.45rem] before:w-0.5 before:bg-white/10 before:z-0">
                        {content.steps.items.map((step: any, i: number) => (
                            <div key={i} className="relative z-10 flex gap-8">
                                <div className="shrink-0 w-12 h-12 rounded-full bg-brand-dark border-2 border-brand-yellow flex items-center justify-center font-black text-white shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                                    {step.step}
                                </div>
                                <div className="flex-1 bg-slate-900 p-6 rounded-2xl border border-white/20 group hover:border-brand-yellow/50 transition-all">
                                    <h3 className="text-2xl font-black text-white mb-3">{step.title}</h3>
                                    <p className="text-white font-bold leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                )}

                {/* Technical Data (Optional) */}
                {content.technicalData && (
                    <div className="bg-brand-card p-8 rounded-sm shadow-sm border border-white/20 border-t-4 border-t-brand-green">
                        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                            <div className="p-2 bg-brand-green/10 text-brand-green rounded-sm">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                            </div>
                            {content.technicalData.title}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {content.technicalData.networks.map((network: any, idx: number) => (
                                <div key={idx} className="bg-brand-card p-6 rounded-sm border border-white/20 hover:border-brand-green/50 transition-colors">
                                    <h3 className="text-lg font-bold text-white mb-2">{network.name}</h3>
                                    <p className="text-sm text-slate-200 mb-4">{network.description}</p>
                                    {network.parameters && network.parameters.length > 0 && (
                                        <div className="space-y-2 mt-4 bg-slate-950 p-6 rounded-2xl border border-white/20 shadow-inner">
                                            {network.parameters.map((param: any, pIdx: number) => (
                                                <div key={pIdx} className="flex justify-between items-center text-sm border-b border-white/10 pb-3 last:border-0 last:pb-0">
                                                    <span className="font-black text-white">{param.label}</span>
                                                    <span className="text-brand-yellow font-mono font-black bg-brand-yellow/10 px-3 py-1 rounded">{param.value}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Pricing Data (Optional) */}
                {content.pricing && (
                    <div className="bg-brand-card p-8 rounded-sm shadow-sm border border-white/20 border-t-4 border-t-brand-green">
                        <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                            <div className="p-2 bg-brand-green/10 text-brand-green rounded-sm">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            {content.pricing.title}
                        </h2>
                        {content.pricing.description && (
                            <p className="text-slate-200 mb-8 bg-brand-card p-4 rounded-sm border border-white/10 text-sm leading-relaxed">{content.pricing.description}</p>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {content.pricing.categories.map((category: any, idx: number) => (
                                <div key={idx} className="bg-brand-card p-6 rounded-sm border border-white/20 hover:border-brand-green/50 transition-colors">
                                    <h3 className="text-lg font-bold text-white mb-4">{category.name}</h3>
                                    <div className="space-y-4 bg-slate-950 p-6 rounded-2xl border border-white/20 shadow-inner">
                                        {category.items.map((item: any, iIdx: number) => (
                                            <div key={iIdx} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-6 text-sm border-b border-white/10 pb-4 last:border-0 last:pb-0">
                                                <span className="font-black text-white leading-relaxed flex-1">{item.label}</span>
                                                <span className="text-brand-green font-mono font-black bg-brand-green/20 px-4 py-2 rounded text-right w-full sm:w-auto break-words shadow-sm">{item.value}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                        {content.pricing.conditions && (
                            <div className="mt-8 pt-6 border-t border-white/20">
                                <h4 className="font-bold text-white mb-4">{content.pricing.conditionsTitle || 'Conditions'}</h4>
                                <ul className="space-y-2">
                                    {content.pricing.conditions.map((condition: string, cIdx: number) => (
                                        <li key={cIdx} className="text-sm text-slate-200 flex gap-2">
                                            <div className="w-1.5 h-1.5 rounded-full bg-brand-green mt-1.5 shrink-0"></div>
                                            {condition}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}

                {/* TV Channels (Optional) */}
                {content.channels && (
                    <div className="bg-brand-card p-8 rounded-sm shadow-sm border border-white/20 border-t-4 border-t-brand-red">
                        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                            <div className="p-2 bg-brand-red/10 text-brand-red rounded-sm">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                            </div>
                            {content.channels.title}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {content.channels.items.map((channel: any, idx: number) => {
                                const initials = channel.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2);
                                return (
                                    <div key={idx} className="flex items-center gap-4 bg-slate-900/80 p-5 rounded-2xl border border-white/10 hover:border-brand-red/50 hover:bg-slate-900 transition-all group shadow-lg">
                                        <div className="w-16 h-16 flex-shrink-0 rounded-xl flex items-center justify-center border-2 border-white/10 shadow-sm overflow-hidden group-hover:border-brand-red/40 transition-colors relative bg-brand-dark">
                                            {channel.logo ? (
                                                <img 
                                                    src={channel.logo} 
                                                    alt={channel.name} 
                                                    className="w-full h-full object-cover rounded-xl"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 bg-gradient-to-br from-brand-green/20 to-brand-dark flex items-center justify-center text-brand-green font-black text-sm">
                                                    {initials}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white group-hover:text-brand-red transition-colors">{channel.name}</h3>
                                            <p className="text-xs text-slate-300 font-medium flex items-center gap-1 mt-1">
                                                <span className="bg-white/10 text-slate-200 px-1.5 py-0.5 rounded text-[10px] uppercase font-bold">{channel.type}</span>
                                                {channel.satellite}
                                            </p>
                                        </div>
                                        <div className="ml-auto flex items-center">
                                            <span className="text-[10px] font-black text-brand-red bg-brand-red/5 px-2 py-1 rounded border border-brand-red/10">{channel.format}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Radio Stations (Optional) */}
                {content.stations && (
                    <div className="bg-brand-card p-8 rounded-sm shadow-sm border border-white/20 border-t-4 border-t-brand-green">
                        <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                            <div className="p-2 bg-brand-green/10 text-brand-green rounded-sm">
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
                            </div>
                            {content.stations.title}
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {content.stations.items.map((station: any, idx: number) => {
                                const initials = station.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2);
                                return (
                                    <div key={idx} className="flex items-center gap-4 bg-slate-900/80 p-5 rounded-2xl border border-white/10 hover:border-brand-green/50 hover:bg-slate-900 transition-all group shadow-lg">
                                        <div className="w-16 h-16 flex-shrink-0 rounded-xl flex items-center justify-center border-2 border-white/10 overflow-hidden group-hover:border-brand-green/40 transition-colors relative bg-brand-dark">
                                            {station.logo ? (
                                                <img
                                                    src={station.logo}
                                                    alt={station.name}
                                                    className="w-full h-full object-cover rounded-xl"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 bg-gradient-to-br from-brand-green/20 to-brand-dark flex items-center justify-center text-brand-green font-black text-sm">
                                                    {initials}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-white group-hover:text-brand-green transition-colors">{station.name}</h3>
                                            <p className="text-xs text-slate-300 font-medium flex items-center gap-1 mt-1">
                                                <span className={`px-1.5 py-0.5 rounded text-[10px] uppercase font-bold ${
                                                    station.type === 'عمومية' || station.type === 'Publique' ? 'bg-brand-green/10 text-brand-green' :
                                                    station.type === 'خاصة' || station.type === 'Privée' ? 'bg-orange-500/10 text-orange-600' :
                                                    'bg-brand-red/10 text-brand-red'
                                                }`}>{station.type}</span>
                                                {station.coverage}
                                            </p>
                                        </div>
                                        <div className="ml-auto flex items-center">
                                            <span className="text-[11px] font-mono font-black text-slate-200 bg-brand-card-hover px-2 py-1 rounded border border-white/20">{station.frequency}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* 4. Documents */}
                    {content.documents && (
                        <div className="bg-brand-card p-8 rounded-sm shadow-sm border border-white/20 border-t-4 border-t-brand-red">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                <div className="p-2 bg-brand-red/10 text-brand-red rounded-sm">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                </div>
                                {content.documents.title}
                            </h2>
                            <ul className="space-y-3">
                                {content.documents.items.map((doc: any, i: number) => (
                                    <li key={i}>
                                        <a href={doc.url} className="flex items-center justify-between p-4 bg-brand-card border border-white/20 rounded-sm hover:border-brand-red transition-colors group">
                                            <span className="font-semibold text-slate-100 text-sm">{doc.title}</span>
                                            <svg className="w-5 h-5 text-slate-300 group-hover:text-brand-red transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* 5. FAQ */}
                    {content.faq && (
                        <div className="bg-brand-card p-8 rounded-sm shadow-sm border border-white/20 border-t-4 border-t-white/30">
                            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                <div className="p-2 bg-brand-card-hover text-white rounded-sm">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                {content.faq.title}
                            </h2>
                            <div className="space-y-4">
                                {content.faq.items.map((faq: any, i: number) => (
                                    <details key={i} className="group bg-brand-card border border-white/20 rounded-sm overflow-hidden">
                                        <summary className="p-4 font-bold text-white cursor-pointer flex justify-between items-center outline-none focus-within:ring-2 focus-within:ring-brand-green/50">
                                            <span className="text-sm">{faq.question}</span>
                                            <span className="text-brand-green text-xl group-open:rotate-45 transition-transform">+</span>
                                        </summary>
                                        <div className="p-6 pt-0 text-slate-300 leading-relaxed font-medium border-t border-white/10 bg-brand-dark/50">
                                            {faq.answer}
                                        </div>
                                    </details>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
