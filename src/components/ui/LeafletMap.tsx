'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, GeoJSON, useMap, useMapEvents } from 'react-leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import 'leaflet.markercluster/dist/MarkerCluster.Default.css';
import L from 'leaflet';
import { X, Radio, Tv, Activity, MapPin, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import wilayasData from '../../data/mauritania-wilayas.json';

// Fix for default marker icons in Next.js/Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface City {
    name: { ar: string; fr: string; };
    coords: [number, number];
    type: 'earth_station' | 'active' | 'new_broadcast';
    details?: {
        fm_stations: number;
        dtt_channels: number;
        tower_height: string;
        power: string;
        coverage: string;
    };
}

import { useMapStore, MapMarker } from '@/store/useMapStore';

function MapController({ setZoomLevel }: { setZoomLevel: (z: number) => void }) {
    const map = useMapEvents({
        zoomend: () => {
            setZoomLevel(map.getZoom());
        }
    });

    useEffect(() => {
        // Initial setup
        setZoomLevel(map.getZoom());
        const timeout = setTimeout(() => {
            map.invalidateSize();
        }, 800);
        return () => clearTimeout(timeout);
    }, [map, setZoomLevel]);

    return null;
}

export default function LeafletMap({ locale }: { locale: string }) {
    const { markers } = useMapStore();
    const [zoomLevel, setZoomLevel] = useState(5.8);
    const [selectedCity, setSelectedCity] = useState<MapMarker | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [viewMode, setViewMode] = useState<'map' | 'table'>('map');

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    const getPointStyle = (type: string) => {
        if (type === 'earth_station') return { color: '#fbbf24', fillColor: '#fcd34d', className: 'marker-earth' };
        if (type === 'new_broadcast') return { color: '#ef4444', fillColor: '#f87171', className: 'marker-new animate-pulse' };
        return { color: '#00a95c', fillColor: '#10b981', className: 'marker-active' };
    };

    const labels = {
        ar: {
            tech_card: 'البطاقة الفنية للموقع',
            type: 'نوع المحطة',
            coordinates: 'الإحداثيات',
            fm: 'إذاعة FM',
            dtt: 'بث رقمي (DTT)',
            tower: 'ارتفاع البرج',
            power: 'القدرة',
            coverage: 'التغطية',
            stations: 'محطة',
            channels: 'قناة',
            close: 'إغلاق',
            earth_station: 'المحطة الأرضية',
            active: 'محطة بث مفعلة',
            new_broadcast: 'محطة بث جديدة'
        },
        fr: {
            tech_card: 'Fiche Technique du Site',
            type: 'Type de Station',
            coordinates: 'Coordonnées',
            fm: 'Radio FM',
            dtt: 'Télévision (TNT)',
            tower: 'Hauteur du Pylône',
            power: 'Puissance',
            coverage: 'Couverture',
            stations: 'stations',
            channels: 'chaînes',
            close: 'Fermer',
            earth_station: 'Station Terrienne',
            active: 'Station Active',
            new_broadcast: 'Nouvelle Station'
        }
    }[locale as 'ar' | 'fr'] || {
        ar: {}, fr: {}
    };

    return (
        <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl relative z-10 border-4 border-slate-800/50" dir="ltr">
            {/* View Toggle */}
            <div className="absolute top-4 end-4 z-[1000] flex gap-2">
                <button
                    onClick={() => setViewMode('map')}
                    aria-label={locale === 'ar' ? 'عرض الخريطة' : 'Voir la carte'}
                    className={`px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${viewMode === 'map' ? 'bg-brand-green text-white shadow-lg shadow-brand-green/20' : 'bg-slate-900/80 text-slate-400 hover:text-white backdrop-blur-md'}`}
                >
                    {locale === 'ar' ? 'الخريطة' : 'Carte'}
                </button>
                <button
                    onClick={() => setViewMode('table')}
                    aria-label={locale === 'ar' ? 'عرض الجدول' : 'Voir le tableau'}
                    className={`px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all ${viewMode === 'table' ? 'bg-brand-green text-white shadow-lg shadow-brand-green/20' : 'bg-slate-900/80 text-slate-400 hover:text-white backdrop-blur-md'}`}
                >
                    {locale === 'ar' ? 'الجدول' : 'Tableau'}
                </button>
            </div>

            {viewMode === 'map' ? (
                <MapContainer
                    center={[20.5, -9.5]}
                    zoom={5.8}
                    scrollWheelZoom={false}
                    touchZoom={true}
                    tap={false}
                    className="w-full h-[60vh] md:h-[70vh] lg:h-[85vh] min-h-[500px] z-0"
                    style={{ background: '#0a1120' }}
                    aria-label={locale === 'ar' ? 'خريطة محطات البث' : 'Carte des stations de diffusion'}
                >
                    <MapController setZoomLevel={setZoomLevel} />
                    <TileLayer
                        url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}"
                        attribution='&copy; Google Maps'
                    />

                    <GeoJSON 
                        data={wilayasData as any} 
                        style={{
                            color: '#64748b', // slate-500
                            weight: 2,
                            fillColor: 'transparent',
                            fillOpacity: 0,
                            dashArray: '5, 8'
                        }}
                        interactive={false} // Prevents hovering from blocking marker clicks
                    />

                    <MarkerClusterGroup
                        chunkedLoading
                        maxClusterRadius={40}
                        showCoverageOnHover={false}
                    >
                        {markers.map((city, idx) => {
                            const style = getPointStyle(city.type);
                            
                            const iconHtml = `
                                <div 
                                    class="tdm-pill-marker ${style.className || ''}" 
                                    dir="${locale === 'ar' ? 'rtl' : 'ltr'}"
                                    role="img"
                                    aria-label="${city.name[locale as 'ar' | 'fr']} - ${labels[city.type as keyof typeof labels]}"
                                >
                                    <div class="tdm-pill-dot" style="background-color: ${style.fillColor}; border-color: ${style.color};"></div>
                                    <span class="tdm-pill-text">${city.name[locale as 'ar' | 'fr']}</span>
                                </div>
                            `;

                            const customIcon = L.divIcon({
                                html: iconHtml,
                                className: 'tdm-leaflet-wrapper',
                                iconSize: [0, 0],
                                iconAnchor: [0, 0],
                            });

                            return (
                                <Marker
                                    key={idx}
                                    position={city.coords}
                                    icon={customIcon}
                                    alt={city.name[locale as 'ar' | 'fr']}
                                    eventHandlers={{
                                        click: () => setSelectedCity(city)
                                    }}
                                />
                            );
                        })}
                    </MarkerClusterGroup>
                </MapContainer>
            ) : (
                <div className="w-full h-[60vh] md:h-[70vh] lg:h-[85vh] min-h-[500px] bg-slate-900 p-8 overflow-y-auto custom-scrollbar" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
                    <table className="w-full text-start rtl:text-end border-collapse">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="py-4 text-slate-500 font-black text-[10px] uppercase tracking-widest">{locale === 'ar' ? 'الموقع' : 'Localisation'}</th>
                                <th className="py-4 text-slate-500 font-black text-[10px] uppercase tracking-widest">{locale === 'ar' ? 'النوع' : 'Type'}</th>
                                <th className="py-4 text-slate-500 font-black text-[10px] uppercase tracking-widest">{locale === 'ar' ? 'الإحداثيات' : 'Coordonnées'}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {markers.map((city) => (
                                <tr key={city.id} className="hover:bg-white/5 transition-colors group">
                                    <td className="py-4 font-bold text-white">{city.name[locale as 'ar' | 'fr']}</td>
                                    <td className="py-4">
                                        <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${
                                            city.type === 'earth_station' ? 'bg-brand-yellow/20 text-brand-yellow' :
                                            city.type === 'new_broadcast' ? 'bg-brand-red/20 text-brand-red' :
                                            'bg-brand-green/20 text-brand-green'
                                        }`}>
                                            {labels[city.type as keyof typeof labels]}
                                        </span>
                                    </td>
                                    <td className="py-4 font-mono text-[10px] text-slate-400">
                                        {city.coords[0].toFixed(4)}, {city.coords[1].toFixed(4)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Technical Card Overlay */}
            <AnimatePresence>
                {selectedCity && (
                    <motion.div
                        initial={{ opacity: 0, x: locale === 'ar' ? -100 : 100, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: locale === 'ar' ? -100 : 100, scale: 0.95 }}
                        transition={{ type: "spring", damping: 20, stiffness: 100 }}
                        className={`absolute top-4 ${locale === 'ar' ? 'start-4' : 'end-4'} bottom-4 w-full max-w-[320px] md:max-w-[400px] z-[1000] pointer-events-none`}
                        dir={locale === 'ar' ? 'rtl' : 'ltr'}
                    >
                        <div className="w-full h-full bg-slate-900/80 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-6 pointer-events-auto overflow-y-auto custom-scrollbar flex flex-col gap-6">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h2 className="text-3xl font-black text-white tracking-tight leading-tight">{selectedCity.name[locale as 'ar' | 'fr']}</h2>
                                    <p className="text-slate-300 text-sm flex items-center gap-2 mt-2 font-mono bg-brand-card w-fit px-3 py-1 rounded-full border border-white/5">
                                        <MapPin className="w-3.5 h-3.5 text-brand-green" />
                                        {selectedCity.coords[0].toFixed(4)}, {selectedCity.coords[1].toFixed(4)}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setSelectedCity(null)}
                                    aria-label={labels.close}
                                    className="p-2 hover:bg-brand-card-hover rounded-full transition-all text-white/40 hover:text-white hover:rotate-90"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 bg-brand-card rounded-2xl border border-white/20 group hover:border-white/20 transition-all">
                                    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest mb-3">{labels.type}</p>
                                    <div className="flex items-center gap-3">
                                        <div className={`w-4 h-4 rounded-full relative ${
                                            selectedCity.type === 'earth_station' ? 'bg-brand-yellow shadow-[0_0_15px_#fbbf24]' :
                                            selectedCity.type === 'new_broadcast' ? 'bg-brand-red shadow-[0_0_15px_#ef4444]' :
                                            'bg-brand-green shadow-[0_0_15px_#00a95c]'
                                        }`}>
                                            {selectedCity.type === 'new_broadcast' && (
                                                <span className="absolute inset-0 rounded-full animate-ping bg-brand-red opacity-75"></span>
                                            )}
                                        </div>
                                        <span className="text-white font-extrabold text-lg">{labels[selectedCity.type as keyof typeof labels]}</span>
                                    </div>
                                </div>

                                {selectedCity.details ? (
                                    <>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-5 bg-brand-green/5 rounded-2xl border border-brand-green/10 hover:bg-brand-green/10 transition-all">
                                                <Radio className="w-6 h-6 text-brand-green mb-3" />
                                                <p className="text-white text-2xl font-black">{selectedCity.details.fm_stations}</p>
                                                <p className="text-brand-green text-[10px] font-black uppercase tracking-widest">{labels.fm}</p>
                                            </div>
                                            <div className="p-5 bg-brand-yellow/5 rounded-2xl border border-brand-yellow/10 hover:bg-brand-yellow/10 transition-all">
                                                <Tv className="w-6 h-6 text-brand-yellow mb-3" />
                                                <p className="text-white text-2xl font-black">{selectedCity.details.dtt_channels}</p>
                                                <p className="text-brand-yellow text-[10px] font-black uppercase tracking-widest">{labels.dtt}</p>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-4 bg-brand-card rounded-xl border border-white/5 hover:bg-brand-card-hover transition-all">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-slate-800 rounded-sg">
                                                        <Activity className="w-4 h-4 text-slate-300" />
                                                    </div>
                                                    <span className="text-slate-100 font-bold">{labels.tower}</span>
                                                </div>
                                                <span className="text-white font-mono font-black text-lg">{selectedCity.details.tower_height}</span>
                                            </div>
                                            <div className="flex items-center justify-between p-4 bg-brand-card rounded-xl border border-white/5 hover:bg-brand-card-hover transition-all">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-slate-800 rounded-sg">
                                                        <Zap className="w-4 h-4 text-brand-yellow" />
                                                    </div>
                                                    <span className="text-slate-100 font-bold">{labels.power}</span>
                                                </div>
                                                <span className="text-white font-mono font-black text-lg">{selectedCity.details.power}</span>
                                            </div>
                                            <div className="flex items-center justify-between p-4 bg-brand-card rounded-xl border border-white/5 hover:bg-brand-card-hover transition-all">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-slate-800 rounded-sg">
                                                        <Activity className="w-4 h-4 text-brand-green" />
                                                    </div>
                                                    <span className="text-slate-100 font-bold">{labels.coverage}</span>
                                                </div>
                                                <div className="flex flex-col items-end gap-2">
                                                    <span className="text-white font-mono font-black text-lg">{selectedCity.details.coverage}</span>
                                                    <div className="w-24 h-1.5 bg-brand-card-hover rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: selectedCity.details.coverage }}
                                                            transition={{ duration: 1, ease: "easeOut" }}
                                                            className="h-full bg-brand-green"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="p-12 text-center bg-brand-card rounded-3xl border border-white/20 border-dashed">
                                        <Activity className="w-12 h-12 text-slate-700 mx-auto mb-4 animate-pulse" />
                                        <p className="text-slate-500 font-bold">{locale === 'ar' ? 'بيانات فنية إضافية قيد التحديث...' : 'Données techniques en cours de mise à jour...'}</p>
                                    </div>
                                )}

                                <div className="mt-auto pt-6">
                                    <button
                                        onClick={() => setSelectedCity(null)}
                                        className="w-full py-4 bg-brand-card-hover hover:bg-white/20 text-white rounded-2xl font-black transition-all active:scale-95 border border-white/20"
                                    >
                                        {labels.close}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Custom CSS overrides for Leaflet tooltip inside Next.js */}
            <style jsx global>{`
                .tdm-leaflet-wrapper {
                    overflow: visible !important;
                }
                .tdm-pill-marker {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    background: #1e293b; /* slate-800 solid */
                    border: 1px solid rgba(255, 255, 255, 0.2);
                    padding: 4px 10px;
                    border-eadius: 30px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.6);
                    white-space: nowrap;
                    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
                    transform: translate(-50%, -50%);
                    cursor: pointer;
                    width: max-content;
                }
                .tdm-pill-marker:hover {
                    background: #ffffff;
                    border-color: #ffffff;
                    transform: translate(-50%, -50%) scale(1.1);
                    z-index: 1000 !important;
                    box-shadow: 0 8px 25px rgba(0,0,0,0.4);
                }
                .tdm-pill-marker:hover .tdm-pill-text {
                    color: #0f172a;
                }
                .tdm-pill-dot {
                    width: 10px;
                    height: 10px;
                    border-eadius: 50%;
                    border: 2px solid;
                    flex-shrink: 0;
                    transition: all 0.3s ease;
                }
                .tdm-pill-marker:hover .tdm-pill-dot {
                    transform: scale(1.2);
                }
                .tdm-pill-text {
                    color: #ffffff;
                    font-weight: 700;
                    font-size: 11px;
                    font-family: inherit;
                    letter-spacing: 0.5px;
                    transition: color 0.3s ease;
                }

                /* Custom Cluster Styles */
                .marker-cluster-small, .marker-cluster-medium, .marker-cluster-large {
                    background-color: rgba(30, 41, 59, 0.6) !important;
                }
                .marker-cluster-small div, .marker-cluster-medium div, .marker-cluster-large div {
                    background-color: rgba(0, 169, 92, 0.9) !important;
                    color: white !important;
                    font-weight: bold;
                    border: 2px solid rgba(255, 255, 255, 0.3);
                    font-family: inherit;
                }
                
                .leaflet-container {
                    font-family: inherit;
                    background: #0a1120 !important;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: rgba(255, 255, 255, 0.1);
                    border-eadius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            `}</style>
        </div>
    );
}
