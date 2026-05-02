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

const CITIES: City[] = [
    {
        name: { ar: 'انواكشوط', fr: 'Nouakchott' },
        coords: [18.0735, -15.9582],
        type: 'earth_station',
        details: { fm_stations: 12, dtt_channels: 15, tower_height: '120m', power: '10kW', coverage: '100%' }
    },
    {
        name: { ar: 'انواذيبو', fr: 'Nouadhibou' },
        coords: [20.9320, -17.0347],
        type: 'active',
        details: { fm_stations: 8, dtt_channels: 10, tower_height: '85m', power: '5kW', coverage: '95%' }
    },
    {
        name: { ar: 'بولنوار', fr: 'Boulenouar' },
        coords: [21.2931, -16.5273],
        type: 'active',
        details: { fm_stations: 2, dtt_channels: 4, tower_height: '45m', power: '1kW', coverage: '80%' }
    },
    {
        name: { ar: 'الشامي', fr: 'Chami' },
        coords: [20.1118, -15.9678],
        type: 'active',
        details: { fm_stations: 3, dtt_channels: 5, tower_height: '60m', power: '2kW', coverage: '85%' }
    },
    {
        name: { ar: 'بنشاب', fr: 'Benichab' },
        coords: [19.3411, -15.1587],
        type: 'active',
        details: { fm_stations: 2, dtt_channels: 4, tower_height: '45m', power: '1kW', coverage: '75%' }
    },
    {
        name: { ar: 'اكجوجت', fr: 'Akjoujt' },
        coords: [19.7432, -14.3807],
        type: 'active',
        details: { fm_stations: 4, dtt_channels: 6, tower_height: '70m', power: '2.5kW', coverage: '90%' }
    },
    {
        name: { ar: 'أطار', fr: 'Atar' },
        coords: [20.5165, -13.0475],
        type: 'active',
        details: { fm_stations: 6, dtt_channels: 8, tower_height: '75m', power: '3kW', coverage: '92%' }
    },
    {
        name: { ar: 'أوجفت', fr: 'Aoujeft' },
        coords: [20.0267, -13.0537],
        type: 'active',
        details: { fm_stations: 2, dtt_channels: 4, tower_height: '45m', power: '1kW', coverage: '70%' }
    },
    {
        name: { ar: 'شوم', fr: 'Choum' },
        coords: [21.3060, -13.0039],
        type: 'new_broadcast',
        details: { fm_stations: 1, dtt_channels: 2, tower_height: '45m', power: '0.5kW', coverage: '60%' }
    },
    {
        name: { ar: 'وادان', fr: 'Ouadane' },
        coords: [20.9287, -11.6215],
        type: 'active',
        details: { fm_stations: 2, dtt_channels: 3, tower_height: '50m', power: '1kW', coverage: '85%' }
    },
    {
        name: { ar: 'شنقيط', fr: 'Chinguetti' },
        coords: [20.4578, -12.3615],
        type: 'active',
        details: { fm_stations: 3, dtt_channels: 4, tower_height: '55m', power: '1.5kW', coverage: '88%' }
    },
    {
        name: { ar: 'أفديرك', fr: 'Fderik' },
        coords: [22.6796, -12.7166],
        type: 'active',
        details: { fm_stations: 2, dtt_channels: 4, tower_height: '45m', power: '1kW', coverage: '82%' }
    },
    {
        name: { ar: 'أزويرات', fr: 'Zouerate' },
        coords: [22.7301, -12.4579],
        type: 'active',
        details: { fm_stations: 5, dtt_channels: 7, tower_height: '80m', power: '4kW', coverage: '94%' }
    },
    {
        name: { ar: 'بيرأم اكرين', fr: 'Bir Moghrein' },
        coords: [25.2289, -11.5818],
        type: 'active',
        details: { fm_stations: 2, dtt_channels: 3, tower_height: '50m', power: '1.2kW', coverage: '80%' }
    },
    {
        name: { ar: 'الشكات', fr: 'Cheguett' },
        coords: [26.314, -6.658],
        type: 'active',
        details: { fm_stations: 1, dtt_channels: 2, tower_height: '45m', power: '0.8kW', coverage: '70%' }
    },
    {
        name: { ar: 'كرمسين', fr: 'Keur Macene' },
        coords: [16.5398, -16.2737],
        type: 'active',
        details: { fm_stations: 2, dtt_channels: 3, tower_height: '45m', power: '1kW', coverage: '85%' }
    },
    {
        name: { ar: 'روصو', fr: 'Rosso' },
        coords: [16.5165, -15.8080],
        type: 'active',
        details: { fm_stations: 6, dtt_channels: 9, tower_height: '75m', power: '4.5kW', coverage: '96%' }
    },
    {
        name: { ar: 'المذرذرة', fr: 'Mederdra' },
        coords: [16.9201, -15.6558],
        type: 'active',
        details: { fm_stations: 3, dtt_channels: 5, tower_height: '60m', power: '2kW', coverage: '88%' }
    },
    {
        name: { ar: 'اركيز', fr: 'Rkiz' },
        coords: [16.9405, -15.2393],
        type: 'active',
        details: { fm_stations: 2, dtt_channels: 4, tower_height: '55m', power: '1.5kW', coverage: '86%' }
    },
    {
        name: { ar: 'بوتلميت', fr: 'Boutilimit' },
        coords: [17.5459, -14.6922],
        type: 'active',
        details: { fm_stations: 4, dtt_channels: 6, tower_height: '65m', power: '2.5kW', coverage: '91%' }
    },
    {
        name: { ar: 'ألاك', fr: 'Aleg' },
        coords: [17.0494, -13.9163],
        type: 'active',
        details: { fm_stations: 5, dtt_channels: 7, tower_height: '70m', power: '3.5kW', coverage: '93%' }
    },
    {
        name: { ar: 'مقطع لحجار', fr: 'Magta-Lahjar' },
        coords: [17.5028, -13.0807],
        type: 'active',
        details: { fm_stations: 3, dtt_channels: 5, tower_height: '60m', power: '2kW', coverage: '89%' }
    },
    {
        name: { ar: 'مال', fr: 'Mal' },
        coords: [16.9634, -13.4116],
        type: 'new_broadcast',
        details: { fm_stations: 1, dtt_channels: 2, tower_height: '45m', power: '0.5kW', coverage: '65%' }
    },
    {
        name: { ar: 'بوكي', fr: 'Boghe' },
        coords: [16.5828, -14.2706],
        type: 'active',
        details: { fm_stations: 4, dtt_channels: 6, tower_height: '65m', power: '2.8kW', coverage: '92%' }
    },
    {
        name: { ar: 'بابابي', fr: 'Bababe' },
        coords: [16.2570, -13.9142],
        type: 'active',
        details: { fm_stations: 2, dtt_channels: 4, tower_height: '50m', power: '1.2kW', coverage: '85%' }
    },
    {
        name: { ar: 'امبان', fr: 'M\'Bagne' },
        coords: [16.2783, -13.7508],
        type: 'active',
        details: { fm_stations: 2, dtt_channels: 3, tower_height: '45m', power: '1kW', coverage: '82%' }
    },
    {
        name: { ar: 'كيهيدي', fr: 'Kaedi' },
        coords: [16.1481, -13.5042],
        type: 'active',
        details: { fm_stations: 6, dtt_channels: 9, tower_height: '75m', power: '4kW', coverage: '95%' }
    },
    {
        name: { ar: 'انتيكان', fr: 'Nteikan' },
        coords: [16.4251, -15.3419],
        type: 'new_broadcast',
        details: { fm_stations: 1, dtt_channels: 2, tower_height: '45m', power: '0.5kW', coverage: '60%' }
    },
    {
        name: { ar: 'لكصيبة', fr: 'Lexeiba' },
        coords: [16.035, -13.621],
        type: 'new_broadcast',
        details: { fm_stations: 1, dtt_channels: 2, tower_height: '45m', power: '0.5kW', coverage: '55%' }
    },
    {
        name: { ar: 'مقامة', fr: 'Maghama' },
        coords: [15.5135, -13.0463],
        type: 'active',
        details: { fm_stations: 3, dtt_channels: 4, tower_height: '55m', power: '1.8kW', coverage: '87%' }
    },
    {
        name: { ar: 'مونكل', fr: 'Monguel' },
        coords: [16.3888, -13.1232],
        type: 'active',
        details: { fm_stations: 2, dtt_channels: 3, tower_height: '50m', power: '1.2kW', coverage: '84%' }
    },
    {
        name: { ar: 'امبود', fr: 'M\'Bout' },
        coords: [16.0125, -12.6074],
        type: 'active',
        details: { fm_stations: 3, dtt_channels: 4, tower_height: '60m', power: '2.2kW', coverage: '89%' }
    },
    {
        name: { ar: 'الغايرة', fr: 'El Ghayra' },
        coords: [17.067, -12.213],
        type: 'new_broadcast',
        details: { fm_stations: 1, dtt_channels: 2, tower_height: '45m', power: '0.5kW', coverage: '70%' }
    },
    {
        name: { ar: 'سيلبابي', fr: 'Selibaby' },
        coords: [15.1557, -12.1837],
        type: 'active',
        details: { fm_stations: 5, dtt_channels: 7, tower_height: '70m', power: '3.2kW', coverage: '93%' }
    },
    {
        name: { ar: 'ومبو', fr: 'Wompou' },
        coords: [15.3854, -12.7225],
        type: 'new_broadcast',
        details: { fm_stations: 1, dtt_channels: 2, tower_height: '45m', power: '0.5kW', coverage: '60%' }
    },
    {
        name: { ar: 'غابو', fr: 'Ghabou' },
        coords: [14.8504, -12.0834],
        type: 'new_broadcast',
        details: { fm_stations: 1, dtt_channels: 2, tower_height: '45m', power: '0.5kW', coverage: '60%' }
    },
    {
        name: { ar: 'ول ينج', fr: 'Ould Yenge' },
        coords: [15.5454, -11.8383],
        type: 'active',
        details: { fm_stations: 2, dtt_channels: 3, tower_height: '50m', power: '1.2kW', coverage: '82%' }
    },
    {
        name: { ar: 'كيفة', fr: 'Kiffa' },
        coords: [16.6171, -11.4057],
        type: 'active',
        details: { fm_stations: 6, dtt_channels: 10, tower_height: '80m', power: '5kW', coverage: '96%' }
    },
    {
        name: { ar: 'كنكوصة', fr: 'Kankossa' },
        coords: [15.9324, -11.4981],
        type: 'active',
        details: { fm_stations: 2, dtt_channels: 4, tower_height: '55m', power: '1.5kW', coverage: '85%' }
    },
    {
        name: { ar: 'حامد', fr: 'Hamed' },
        coords: [15.820, -11.391],
        type: 'new_broadcast',
        details: { fm_stations: 1, dtt_channels: 2, tower_height: '45m', power: '0.5kW', coverage: '60%' }
    },
    {
        name: { ar: 'بومديد', fr: 'Boumdeid' },
        coords: [17.0097, -11.3533],
        type: 'active',
        details: { fm_stations: 2, dtt_channels: 3, tower_height: '50m', power: '1.2kW', coverage: '83%' }
    },
    {
        name: { ar: 'تجكجة', fr: 'Tidjikja' },
        coords: [18.5552, -11.4285],
        type: 'active',
        details: { fm_stations: 5, dtt_channels: 7, tower_height: '70m', power: '3.5kW', coverage: '92%' }
    },
    {
        name: { ar: 'الرشيد', fr: 'Rachid' },
        coords: [18.7359, -11.6666],
        type: 'new_broadcast',
        details: { fm_stations: 1, dtt_channels: 2, tower_height: '45m', power: '0.5kW', coverage: '65%' }
    },
    {
        name: { ar: 'المجرية', fr: 'Moudjeria' },
        coords: [17.8814, -12.3551],
        type: 'active',
        details: { fm_stations: 2, dtt_channels: 4, tower_height: '55m', power: '1.5kW', coverage: '88%' }
    },
    {
        name: { ar: 'لخشب', fr: 'Lekhcheb' },
        coords: [18.57, -10.05],
        type: 'new_broadcast',
        details: { fm_stations: 1, dtt_channels: 2, tower_height: '45m', power: '0.5kW', coverage: '50%' }
    },
    {
        name: { ar: 'تامشكط', fr: 'Tamchekett' },
        coords: [17.2476, -10.6698],
        type: 'active',
        details: { fm_stations: 2, dtt_channels: 3, tower_height: '50m', power: '1.2kW', coverage: '84%' }
    },
    {
        name: { ar: 'الطينطان', fr: 'Tintane' },
        coords: [16.4257, -10.1501],
        type: 'active',
        details: { fm_stations: 3, dtt_channels: 5, tower_height: '60m', power: '2kW', coverage: '90%' }
    },
    {
        name: { ar: 'لعيون', fr: 'Ayoun' },
        coords: [16.6625, -9.6149],
        type: 'active',
        details: { fm_stations: 5, dtt_channels: 8, tower_height: '70m', power: '3.8kW', coverage: '94%' }
    },
    {
        name: { ar: 'اعوينات ازبل', fr: 'Aoueient Zbel' },
        coords: [16.442, -9.055],
        type: 'new_broadcast',
        details: { fm_stations: 1, dtt_channels: 2, tower_height: '45m', power: '0.5kW', coverage: '60%' }
    },
    {
        name: { ar: 'كوبني', fr: 'Kobenni' },
        coords: [15.8118, -9.3879],
        type: 'active',
        details: { fm_stations: 3, dtt_channels: 5, tower_height: '60m', power: '2.2kW', coverage: '88%' }
    },
    {
        name: { ar: 'اطويل', fr: 'Touil' },
        coords: [15.5977, -9.2319],
        type: 'new_broadcast',
        details: { fm_stations: 1, dtt_channels: 2, tower_height: '45m', power: '0.5kW', coverage: '55%' }
    },
    {
        name: { ar: 'تيشيت', fr: 'Tichit' },
        coords: [18.4419, -8.9500],
        type: 'active',
        details: { fm_stations: 2, dtt_channels: 3, tower_height: '50m', power: '1kW', coverage: '85%' }
    },
    {
        name: { ar: 'النعمة', fr: 'Nema' },
        coords: [16.6163, -7.2533],
        type: 'active',
        details: { fm_stations: 6, dtt_channels: 10, tower_height: '85m', power: '5.5kW', coverage: '97%' }
    },
    {
        name: { ar: 'تمبدغة', fr: 'Timbedra' },
        coords: [16.2575, -8.1585],
        type: 'active',
        details: { fm_stations: 3, dtt_channels: 5, tower_height: '65m', power: '2.5kW', coverage: '91%' }
    },
    {
        name: { ar: 'جيكني', fr: 'Djiguenni' },
        coords: [15.7602, -8.0264],
        type: 'active',
        details: { fm_stations: 3, dtt_channels: 4, tower_height: '60m', power: '2kW', coverage: '89%' }
    },
    {
        name: { ar: 'أمورج', fr: 'Amourj' },
        coords: [16.103, -7.262],
        type: 'active',
        details: { fm_stations: 2, dtt_channels: 3, tower_height: '55m', power: '1.5kW', coverage: '86%' }
    },
    {
        name: { ar: 'ولاتة', fr: 'Oualata' },
        coords: [17.3006, -7.0279],
        type: 'active',
        details: { fm_stations: 2, dtt_channels: 3, tower_height: '50m', power: '1kW', coverage: '82%' }
    },
    {
        name: { ar: 'انبيكة لحواش', fr: 'N\'Beiket Lahwache' },
        coords: [17.0384, -6.6127],
        type: 'active',
        details: { fm_stations: 2, dtt_channels: 3, tower_height: '45m', power: '0.8kW', coverage: '80%' }
    },
    {
        name: { ar: 'باسكنو', fr: 'Bassiknou' },
        coords: [15.8795, -5.8778],
        type: 'active',
        details: { fm_stations: 3, dtt_channels: 5, tower_height: '65m', power: '2.5kW', coverage: '90%' }
    },
    {
        name: { ar: 'فصالة', fr: 'Fassala' },
        coords: [15.131, -5.876],
        type: 'active',
        details: { fm_stations: 2, dtt_channels: 4, tower_height: '55m', power: '1.8kW', coverage: '85%' }
    },
    {
        name: { ar: 'عدل بكرو', fr: 'Adel Bagrou' },
        coords: [15.5392, -7.0392],
        type: 'new_broadcast',
        details: { fm_stations: 1, dtt_channels: 2, tower_height: '45m', power: '0.5kW', coverage: '60%' }
    }
];

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
    const [zoomLevel, setZoomLevel] = useState(5.8);
    const [selectedCity, setSelectedCity] = useState<City | null>(null);

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
            <MapContainer
                center={[20.5, -9.5]}
                zoom={5.8}
                scrollWheelZoom={false}
                className="w-full h-[60vh] md:h-[70vh] lg:h-[85vh] min-h-[500px] z-0"
                style={{ background: '#0a1120' }}
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
                    {CITIES.map((city, idx) => {
                        const style = getPointStyle(city.type);
                        
                        const iconHtml = `
                            <div class="tdm-pill-marker ${style.className || ''}" dir="${locale === 'ar' ? 'rtl' : 'ltr'}">
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
                                eventHandlers={{
                                    click: () => setSelectedCity(city)
                                }}
                            />
                        );
                    })}
                </MarkerClusterGroup>
            </MapContainer>

            {/* Technical Card Overlay */}
            <AnimatePresence>
                {selectedCity && (
                    <motion.div
                        initial={{ opacity: 0, x: locale === 'ar' ? -100 : 100, scale: 0.95 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: locale === 'ar' ? -100 : 100, scale: 0.95 }}
                        transition={{ type: "spring", damping: 20, stiffness: 100 }}
                        className={`absolute top-4 ${locale === 'ar' ? 'left-4' : 'right-4'} bottom-4 w-full max-w-[320px] md:max-w-[400px] z-[1000] pointer-events-none`}
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
                                                    <div className="p-2 bg-slate-800 rounded-lg">
                                                        <Activity className="w-4 h-4 text-slate-300" />
                                                    </div>
                                                    <span className="text-slate-100 font-bold">{labels.tower}</span>
                                                </div>
                                                <span className="text-white font-mono font-black text-lg">{selectedCity.details.tower_height}</span>
                                            </div>
                                            <div className="flex items-center justify-between p-4 bg-brand-card rounded-xl border border-white/5 hover:bg-brand-card-hover transition-all">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-slate-800 rounded-lg">
                                                        <Zap className="w-4 h-4 text-brand-yellow" />
                                                    </div>
                                                    <span className="text-slate-100 font-bold">{labels.power}</span>
                                                </div>
                                                <span className="text-white font-mono font-black text-lg">{selectedCity.details.power}</span>
                                            </div>
                                            <div className="flex items-center justify-between p-4 bg-brand-card rounded-xl border border-white/5 hover:bg-brand-card-hover transition-all">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-slate-800 rounded-lg">
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
                    border-radius: 30px;
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
                    border-radius: 50%;
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
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: rgba(255, 255, 255, 0.2);
                }
            `}</style>
        </div>
    );
}
