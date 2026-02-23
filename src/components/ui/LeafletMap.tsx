'use client';

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons in Next.js/Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const CITIES: Array<{ name: { ar: string; fr: string; }; coords: [number, number]; type: 'earth_station' | 'active' | 'new_broadcast' }> = [
    { name: { ar: 'انواكشوط', fr: 'Nouakchott' }, coords: [18.0735, -15.9582], type: 'earth_station' },
    { name: { ar: 'انواذيبو', fr: 'Nouadhibou' }, coords: [20.9320, -17.0347], type: 'active' },
    { name: { ar: 'بولنوار', fr: 'Boulenouar' }, coords: [21.2931, -16.5273], type: 'active' },
    { name: { ar: 'الشامي', fr: 'Chami' }, coords: [20.1118, -15.9678], type: 'active' },
    { name: { ar: 'بنشاب', fr: 'Benichab' }, coords: [19.3411, -15.1587], type: 'active' },
    { name: { ar: 'اكجوجت', fr: 'Akjoujt' }, coords: [19.7432, -14.3807], type: 'active' },
    { name: { ar: 'أطار', fr: 'Atar' }, coords: [20.5165, -13.0475], type: 'active' },
    { name: { ar: 'أوجفت', fr: 'Aoujeft' }, coords: [20.0267, -13.0537], type: 'active' },
    { name: { ar: 'شوم', fr: 'Choum' }, coords: [21.3060, -13.0039], type: 'new_broadcast' },
    { name: { ar: 'وادان', fr: 'Ouadane' }, coords: [20.9287, -11.6215], type: 'active' },
    { name: { ar: 'شنقيط', fr: 'Chinguetti' }, coords: [20.4578, -12.3615], type: 'active' },
    { name: { ar: 'أفديرك', fr: 'Fderik' }, coords: [22.6796, -12.7166], type: 'active' },
    { name: { ar: 'أزويرات', fr: 'Zouerate' }, coords: [22.7301, -12.4579], type: 'active' },
    { name: { ar: 'بيرأم اكرين', fr: 'Bir Moghrein' }, coords: [25.2289, -11.5818], type: 'active' },
    { name: { ar: 'الشكات', fr: 'Cheguett' }, coords: [26.314, -6.658], type: 'active' },
    { name: { ar: 'كرمسين', fr: 'Keur Macene' }, coords: [16.5398, -16.2737], type: 'active' },
    { name: { ar: 'روصو', fr: 'Rosso' }, coords: [16.5165, -15.8080], type: 'active' },
    { name: { ar: 'المذرذرة', fr: 'Mederdra' }, coords: [16.9201, -15.6558], type: 'active' },
    { name: { ar: 'اركيز', fr: 'Rkiz' }, coords: [16.9405, -15.2393], type: 'active' },
    { name: { ar: 'بوتلميت', fr: 'Boutilimit' }, coords: [17.5459, -14.6922], type: 'active' },
    { name: { ar: 'ألاك', fr: 'Aleg' }, coords: [17.0494, -13.9163], type: 'active' },
    { name: { ar: 'مقطع لحجار', fr: 'Magta-Lahjar' }, coords: [17.5028, -13.0807], type: 'active' },
    { name: { ar: 'مال', fr: 'Mal' }, coords: [16.9634, -13.4116], type: 'new_broadcast' },
    { name: { ar: 'بوكي', fr: 'Boghe' }, coords: [16.5828, -14.2706], type: 'active' },
    { name: { ar: 'بابابي', fr: 'Bababe' }, coords: [16.2570, -13.9142], type: 'active' },
    { name: { ar: 'امبان', fr: 'M\'Bagne' }, coords: [16.2783, -13.7508], type: 'active' },
    { name: { ar: 'كيهيدي', fr: 'Kaedi' }, coords: [16.1481, -13.5042], type: 'active' },
    { name: { ar: 'انتيكان', fr: 'Nteikan' }, coords: [16.4251, -15.3419], type: 'new_broadcast' },
    { name: { ar: 'لكصيبة', fr: 'Lexeiba' }, coords: [16.035, -13.621], type: 'new_broadcast' },
    { name: { ar: 'مقامة', fr: 'Maghama' }, coords: [15.5135, -13.0463], type: 'active' },
    { name: { ar: 'مونكل', fr: 'Monguel' }, coords: [16.3888, -13.1232], type: 'active' },
    { name: { ar: 'امبود', fr: 'M\'Bout' }, coords: [16.0125, -12.6074], type: 'active' },
    { name: { ar: 'الغايرة', fr: 'El Ghayra' }, coords: [17.067, -12.213], type: 'new_broadcast' },
    { name: { ar: 'سيلبابي', fr: 'Selibaby' }, coords: [15.1557, -12.1837], type: 'active' },
    { name: { ar: 'ومبو', fr: 'Wompou' }, coords: [15.3854, -12.7225], type: 'new_broadcast' },
    { name: { ar: 'غابو', fr: 'Ghabou' }, coords: [14.8504, -12.0834], type: 'new_broadcast' },
    { name: { ar: 'ول ينج', fr: 'Ould Yenge' }, coords: [15.5454, -11.8383], type: 'active' },
    { name: { ar: 'كيفة', fr: 'Kiffa' }, coords: [16.6171, -11.4057], type: 'active' },
    { name: { ar: 'كنكوصة', fr: 'Kankossa' }, coords: [15.9324, -11.4981], type: 'active' },
    { name: { ar: 'حامد', fr: 'Hamed' }, coords: [15.820, -11.391], type: 'new_broadcast' },
    { name: { ar: 'بومديد', fr: 'Boumdeid' }, coords: [17.0097, -11.3533], type: 'active' },
    { name: { ar: 'تجكجة', fr: 'Tidjikja' }, coords: [18.5552, -11.4285], type: 'active' },
    { name: { ar: 'الرشيد', fr: 'Rachid' }, coords: [18.7359, -11.6666], type: 'new_broadcast' },
    { name: { ar: 'المجرية', fr: 'Moudjeria' }, coords: [17.8814, -12.3551], type: 'active' },
    { name: { ar: 'لخشب', fr: 'Lekhcheb' }, coords: [18.57, -10.05], type: 'new_broadcast' },
    { name: { ar: 'تامشكط', fr: 'Tamchekett' }, coords: [17.2476, -10.6698], type: 'active' },
    { name: { ar: 'الطينطان', fr: 'Tintane' }, coords: [16.4257, -10.1501], type: 'active' },
    { name: { ar: 'لعيون', fr: 'Ayoun' }, coords: [16.6625, -9.6149], type: 'active' },
    { name: { ar: 'اعوينات ازبل', fr: 'Aoueient Zbel' }, coords: [16.442, -9.055], type: 'new_broadcast' },
    { name: { ar: 'كوبني', fr: 'Kobenni' }, coords: [15.8118, -9.3879], type: 'active' },
    { name: { ar: 'اطويل', fr: 'Touil' }, coords: [15.5977, -9.2319], type: 'new_broadcast' },
    { name: { ar: 'تيشيت', fr: 'Tichit' }, coords: [18.4419, -8.9500], type: 'active' },
    { name: { ar: 'النعمة', fr: 'Nema' }, coords: [16.6163, -7.2533], type: 'active' },
    { name: { ar: 'تمبدغة', fr: 'Timbedra' }, coords: [16.2575, -8.1585], type: 'active' },
    { name: { ar: 'جيكني', fr: 'Djiguenni' }, coords: [15.7602, -8.0264], type: 'active' },
    { name: { ar: 'أمورج', fr: 'Amourj' }, coords: [16.103, -7.262], type: 'active' },
    { name: { ar: 'ولاتة', fr: 'Oualata' }, coords: [17.3006, -7.0279], type: 'active' },
    { name: { ar: 'انبيكة لحواش', fr: 'N\'Beiket Lahwache' }, coords: [17.0384, -6.6127], type: 'active' },
    { name: { ar: 'باسكنو', fr: 'Bassiknou' }, coords: [15.8795, -5.8778], type: 'active' },
    { name: { ar: 'فصالة', fr: 'Fassala' }, coords: [15.131, -5.876], type: 'active' },
    { name: { ar: 'عدل بكرو', fr: 'Adel Bagrou' }, coords: [15.5392, -7.0392], type: 'new_broadcast' }
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

    // Styling classes configured per city type for the tooltips
    const getPointStyle = (type: string) => {
        if (type === 'earth_station') return { color: '#fbbf24', fillColor: '#fcd34d', radius: 8 };
        if (type === 'new_broadcast') return { color: '#ef4444', fillColor: '#f87171', radius: 5, className: 'animate-pulse' };
        return { color: '#00a95c', fillColor: '#10b981', radius: 5 };
    };

    // Calculate dynamic scaling for tooltips
    // We want text to be very small at country-level view (zoom 5-6) to avoid overlap,
    // and grow to normal readable size (12-14px) when zoomed into regions/cities.
    const normalizedZoom = Math.max(0, zoomLevel - 5); // 0 at zoom 5, 3 at zoom 8
    const fontSize = `${Math.max(9, Math.min(14, 8 + normalizedZoom * 1.5))}px`;
    const padding = `${Math.max(2, Math.min(6, 2 + normalizedZoom))}px ${Math.max(6, Math.min(12, 4 + normalizedZoom * 2))}px`;

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
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                />

                {CITIES.map((city, idx) => {
                    const style = getPointStyle(city.type);
                    return (
                        <CircleMarker
                            key={idx}
                            center={city.coords}
                            radius={style.radius}
                            color={style.color}
                            fillColor={style.fillColor}
                            fillOpacity={0.8}
                            weight={2}
                            className={style.className || ''}
                        >
                            <Tooltip direction={locale === 'ar' ? 'left' : 'right'} offset={[-8, -2]} className="custom-leaflet-tooltip font-bold bg-slate-900 text-white border-0 shadow-xl rounded-xl p-0" opacity={1} permanent>
                                <div style={{ fontSize, padding, transition: 'all 0.3s ease' }}>
                                    {city.name[locale as 'ar' | 'fr']}
                                </div>
                            </Tooltip>
                        </CircleMarker>
                    );
                })}
            </MapContainer>

            {/* Custom CSS overrides for Leaflet tooltip inside Next.js */}
            <style jsx global>{`
                .leaflet-container {
                    font-family: inherit;
                }
                .leaflet-tooltip.custom-leaflet-tooltip {
                    background-color: rgba(15, 23, 42, 0.9) !important;
                    border: 1px solid rgba(255, 255, 255, 0.1) !important;
                    color: white !important;
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.5), 0 4px 6px -2px rgba(0, 0, 0, 0.25) !important;
                    backdrop-filter: blur(8px) !important;
                    padding: 0 !important;
                    overflow: hidden;
                }
                .leaflet-tooltip-left.custom-leaflet-tooltip::before {
                    border-left-color: rgba(15, 23, 42, 0.9) !important;
                }
                .leaflet-tooltip-right.custom-leaflet-tooltip::before {
                    border-right-color: rgba(15, 23, 42, 0.9) !important;
                }
            `}</style>
        </div>
    );
}
