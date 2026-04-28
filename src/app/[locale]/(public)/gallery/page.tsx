'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';

const categories = {
    ar: {
        all: 'الكل',
        infrastructure: 'البنية التحتية',
        events: 'الفعاليات',
        technical: 'التقني',
    },
    fr: {
        all: 'Tout',
        infrastructure: 'Infrastructure',
        events: 'Événements',
        technical: 'Technique',
    }
};

const galleryImages = [
    // Technical / Infrastructure (batch 1)
    { src: '/gallery/01-1024x680.jpg',   category: 'technical',       width: 1024, height: 680 },
    { src: '/gallery/02-1024x577.png',   category: 'technical',       width: 1024, height: 577 },
    { src: '/gallery/03-1024x575.png',   category: 'technical',       width: 1024, height: 575 },
    { src: '/gallery/04-1024x573.png',   category: 'technical',       width: 1024, height: 573 },
    { src: '/gallery/05-1024x571.png',   category: 'infrastructure',  width: 1024, height: 571 },
    { src: '/gallery/06.png',            category: 'infrastructure',  width: 1024, height: 576 },
    { src: '/gallery/07-1024x572.png',   category: 'infrastructure',  width: 1024, height: 572 },
    // Events batch (468...)
    { src: '/gallery/468429376_972543111382829_8682166300867668746_n.jpg',  category: 'events', width: 1024, height: 768 },
    { src: '/gallery/468454013_972543318049475_2024634861352200880_n.jpg',  category: 'events', width: 1024, height: 768 },
    { src: '/gallery/468480786_972543241382816_8661850366866987507_n.jpg',  category: 'events', width: 1024, height: 768 },
    { src: '/gallery/468483203_972543158049491_2362276655486697775_n.jpg',  category: 'events', width: 1024, height: 768 },
    { src: '/gallery/468507378_972543354716138_9214483171276586689_n.jpg',  category: 'events', width: 1024, height: 768 },
    { src: '/gallery/468515834_972543168049490_8035711400620372726_n.jpg',  category: 'events', width: 1024, height: 768 },
    { src: '/gallery/468522255_972543451382795_3931987115356084174_n.jpg',  category: 'events', width: 1024, height: 768 },
    { src: '/gallery/468623253_972543304716143_126743366520938150_n.jpg',   category: 'events', width: 1024, height: 768 },
    // Events batch (472-473...)
    { src: '/gallery/472845305_1003347321635741_5740657094537978821_n.jpg', category: 'events', width: 1024, height: 768 },
    { src: '/gallery/473075784_1003354518301688_7153605286528454736_n.jpg', category: 'infrastructure', width: 1024, height: 768 },
    { src: '/gallery/473140133_1003347318302408_1274330132556965943_n.jpg', category: 'events', width: 1024, height: 768 },
    { src: '/gallery/473183804_1003353421635131_5913702485369785370_n.jpg', category: 'infrastructure', width: 1024, height: 768 },
    { src: '/gallery/473230575_1003354511635022_1069007381982515217_n.jpg', category: 'events', width: 1024, height: 768 },
    { src: '/gallery/473250400_1003353361635137_3982783914409824445_n.jpg', category: 'events', width: 1024, height: 768 },
    { src: '/gallery/473268719_1003351191635354_7423186513172251240_n.jpg', category: 'events', width: 1024, height: 768 },
    { src: '/gallery/473287513_1003361601634313_6938845467967469574_n.jpg', category: 'technical', width: 1024, height: 768 },
    { src: '/gallery/473335191_1003354374968369_3390050247269313249_n.jpg', category: 'events', width: 1024, height: 768 },
    { src: '/gallery/473378983_1003353378301802_3495794795129802646_n.jpg', category: 'events', width: 1024, height: 768 },
    { src: '/gallery/473581921_1003355788301561_7093621950098939579_n.jpg', category: 'infrastructure', width: 1024, height: 768 },
    // Events batch (474...)
    { src: '/gallery/474019000_1006965817940558_5234213213597143949_n.jpg', category: 'technical', width: 1024, height: 768 },
    { src: '/gallery/474030419_1006965854607221_3940700434261413609_n.jpg', category: 'technical', width: 1024, height: 768 },
    { src: '/gallery/474035793_1006965774607229_8918553847059174283_n.jpg', category: 'technical', width: 1024, height: 768 },
    { src: '/gallery/474035907_1006965847940555_5148116699793087862_n.jpg', category: 'technical', width: 1024, height: 768 },
    { src: '/gallery/474082547_1006965831273890_1279296741929568027_n.jpg', category: 'technical', width: 1024, height: 768 },
    { src: '/gallery/474083551_1006965904607216_4671499267093716085_n.jpg', category: 'technical', width: 1024, height: 768 },
];

export default function GalleryPage() {
    const params = useParams();
    const locale = (params?.locale as string) || 'ar';
    const isRtl = locale === 'ar';
    const cats = categories[locale as 'ar' | 'fr'];

    const [activeCategory, setActiveCategory] = useState('all');
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const filtered = activeCategory === 'all'
        ? galleryImages
        : galleryImages.filter(img => img.category === activeCategory);

    const openLightbox = (idx: number) => setLightboxIndex(idx);
    const closeLightbox = () => setLightboxIndex(null);
    const prevImage = () => setLightboxIndex(i => i !== null ? (i - 1 + filtered.length) % filtered.length : null);
    const nextImage = () => setLightboxIndex(i => i !== null ? (i + 1) % filtered.length : null);

    const title = locale === 'ar' ? 'معرض الصور' : 'Galerie Photos';
    const subtitle = locale === 'ar'
        ? 'أرشيف مصور لأنشطة وبنية شركة البث الإذاعي والتلفزي الموريتاني.'
        : 'Archive photographique des activités et infrastructures de la TDM.';

    return (
        <main className="min-h-screen bg-brand-dark">
            {/* ── Hero Header ── */}
            <section className="relative pt-28 pb-24 overflow-hidden">
                {/* Background effects */}
                <div className="absolute inset-0 bg-gradient-to-b from-brand-dark to-brand-dark-2" />
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_40%,#000_30%,transparent_100%)]" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-green/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-brand-yellow/10 rounded-full blur-[100px]" />

                <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-8">
                        <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse shadow-[0_0_10px_rgba(0,169,92,1)]" />
                        <span className="text-sm font-semibold text-white/80 tracking-wide">
                            {locale === 'ar' ? 'الأرشيف المصور' : 'Archive photographique'}
                        </span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-green via-[#00DF7A] to-brand-yellow">
                            {title}
                        </span>
                    </h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        {subtitle}
                    </p>

                    {/* Stats */}
                    <div className="flex justify-center gap-10 mt-12">
                        {[
                            { val: galleryImages.length.toString(), label: locale === 'ar' ? 'صورة' : 'Photos' },
                            { val: '3', label: locale === 'ar' ? 'تصنيفات' : 'Catégories' },
                        ].map((s, i) => (
                            <div key={i} className="text-center">
                                <div className="text-4xl font-black text-white">{s.val}</div>
                                <div className="text-sm text-slate-500 font-semibold uppercase tracking-widest mt-1">{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Filters ── */}
            <div className="sticky top-16 z-30 bg-brand-dark/80 backdrop-blur-xl border-b border-white/5">
                <div className="max-w-6xl mx-auto px-6 py-4 flex gap-3 flex-wrap justify-center">
                    {Object.entries(cats).map(([key, label]) => (
                        <button
                            key={key}
                            onClick={() => setActiveCategory(key)}
                            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                                activeCategory === key
                                    ? 'bg-brand-green text-white shadow-[0_0_20px_rgba(0,169,92,0.5)] scale-105'
                                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white border border-white/10'
                            }`}
                        >
                            {label}
                            <span className={`ml-2 rtl:mr-2 rtl:ml-0 px-2 py-0.5 rounded-full text-xs ${
                                activeCategory === key ? 'bg-white/20' : 'bg-white/5'
                            }`}>
                                {key === 'all' ? galleryImages.length : galleryImages.filter(g => g.category === key).length}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Masonry Grid ── */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                    {filtered.map((img, idx) => (
                        <div
                            key={img.src}
                            onClick={() => openLightbox(idx)}
                            className="break-inside-avoid relative group cursor-pointer overflow-hidden rounded-2xl bg-white/5 border border-white/5 hover:border-brand-green/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(0,169,92,0.15)]"
                        >
                            <div className="relative overflow-hidden">
                                <Image
                                    src={img.src}
                                    alt={`TDM Gallery ${idx + 1}`}
                                    width={img.width}
                                    height={img.height}
                                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                                    loading="lazy"
                                />
                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-6">
                                    <div className="flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-sm font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                                        </svg>
                                        {locale === 'ar' ? 'عرض' : 'Voir'}
                                    </div>
                                </div>
                                {/* Category badge */}
                                <div className="absolute top-3 start-3 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs font-bold text-brand-green border border-brand-green/30 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                    {cats[img.category as keyof typeof cats]}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── Lightbox ── */}
            {lightboxIndex !== null && (
                <div
                    className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-in fade-in duration-200"
                    onClick={closeLightbox}
                >
                    {/* Image counter */}
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-bold border border-white/20">
                        {lightboxIndex + 1} / {filtered.length}
                    </div>

                    {/* Close */}
                    <button
                        onClick={closeLightbox}
                        className="absolute top-6 end-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 z-10"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    {/* Prev */}
                    <button
                        onClick={e => { e.stopPropagation(); prevImage(); }}
                        className="absolute start-4 md:start-8 w-14 h-14 rounded-full bg-white/10 hover:bg-brand-green/30 border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 hover:border-brand-green/50 z-10"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRtl ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'} />
                        </svg>
                    </button>

                    {/* Image */}
                    <div
                        className="relative max-w-5xl max-h-[85vh] w-full flex items-center justify-center"
                        onClick={e => e.stopPropagation()}
                    >
                        <Image
                            src={filtered[lightboxIndex].src}
                            alt={`TDM Gallery ${lightboxIndex + 1}`}
                            width={filtered[lightboxIndex].width}
                            height={filtered[lightboxIndex].height}
                            className="max-h-[85vh] w-auto h-auto object-contain rounded-2xl shadow-2xl"
                        />
                    </div>

                    {/* Next */}
                    <button
                        onClick={e => { e.stopPropagation(); nextImage(); }}
                        className="absolute end-4 md:end-8 w-14 h-14 rounded-full bg-white/10 hover:bg-brand-green/30 border border-white/20 text-white flex items-center justify-center transition-all hover:scale-110 hover:border-brand-green/50 z-10"
                    >
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isRtl ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'} />
                        </svg>
                    </button>

                    {/* Thumbnail strip */}
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto scrollbar-hide">
                        {filtered.map((img, i) => (
                            <div
                                key={i}
                                onClick={e => { e.stopPropagation(); setLightboxIndex(i); }}
                                className={`w-14 h-14 shrink-0 rounded-lg overflow-hidden cursor-pointer transition-all duration-200 border-2 ${
                                    i === lightboxIndex
                                        ? 'border-brand-green scale-110 shadow-[0_0_15px_rgba(0,169,92,0.6)]'
                                        : 'border-white/10 opacity-50 hover:opacity-80'
                                }`}
                            >
                                <Image
                                    src={img.src}
                                    alt=""
                                    width={56}
                                    height={56}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </main>
    );
}
