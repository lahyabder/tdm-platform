import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface MapMarker {
    id: string;
    name: { ar: string; fr: string; };
    coords: [number, number];
    type: 'earth_station' | 'active' | 'new_broadcast';
    details?: {
        fm_stations?: number;
        dtt_channels?: number;
        tower_height?: string;
        power?: string;
        coverage?: string;
    };
}

interface MapStore {
    markers: MapMarker[];
    addMarker: (marker: MapMarker) => void;
    updateMarker: (id: string, marker: MapMarker) => void;
    deleteMarker: (id: string) => void;
}

const INITIAL_MARKERS: MapMarker[] = [
    { id: '1', name: { ar: 'انواكشوط', fr: 'Nouakchott' }, coords: [18.0735, -15.9582], type: 'earth_station', details: { fm_stations: 12, dtt_channels: 8, tower_height: '120m', power: '10kW', coverage: '98%' } },
    { id: '2', name: { ar: 'انواذيبو', fr: 'Nouadhibou' }, coords: [20.9320, -17.0347], type: 'active', details: { fm_stations: 6, dtt_channels: 4, tower_height: '80m', power: '5kW', coverage: '95%' } },
    { id: '3', name: { ar: 'كيفة', fr: 'Kiffa' }, coords: [16.6171, -11.4057], type: 'active', details: { fm_stations: 4, dtt_channels: 2, tower_height: '60m', power: '3kW', coverage: '90%' } },
    { id: '4', name: { ar: 'روصو', fr: 'Rosso' }, coords: [16.5123, -15.8051], type: 'active', details: { fm_stations: 4, dtt_channels: 2, tower_height: '60m', power: '3kW', coverage: '92%' } },
    { id: '5', name: { ar: 'كيهيدي', fr: 'Kaédi' }, coords: [16.1541, -13.5052], type: 'active', details: { fm_stations: 3, dtt_channels: 2, tower_height: '55m', power: '2kW', coverage: '88%' } },
    { id: '6', name: { ar: 'النعمة', fr: 'Néma' }, coords: [16.6134, -7.2531], type: 'active', details: { fm_stations: 3, dtt_channels: 2, tower_height: '50m', power: '2kW', coverage: '85%' } },
    { id: '7', name: { ar: 'لعيون', fr: 'Aioun' }, coords: [16.6611, -9.6139], type: 'active', details: { fm_stations: 3, dtt_channels: 2, tower_height: '50m', power: '2kW', coverage: '85%' } },
    { id: '8', name: { ar: 'أطار', fr: 'Atar' }, coords: [20.5167, -13.0500], type: 'active', details: { fm_stations: 4, dtt_channels: 2, tower_height: '60m', power: '3kW', coverage: '88%' } },
    { id: '9', name: { ar: 'تجكجة', fr: 'Tidjikja' }, coords: [18.5564, -11.4272], type: 'active', details: { fm_stations: 3, dtt_channels: 2, tower_height: '50m', power: '2kW', coverage: '82%' } },
    { id: '10', name: { ar: 'سيليبابي', fr: 'Sélibaby' }, coords: [14.4503, -12.1847], type: 'active', details: { fm_stations: 3, dtt_channels: 2, tower_height: '50m', power: '2kW', coverage: '80%' } },
    { id: '11', name: { ar: 'زويرات', fr: 'Zouérat' }, coords: [22.7447, -12.4539], type: 'active', details: { fm_stations: 4, dtt_channels: 2, tower_height: '60m', power: '3kW', coverage: '90%' } },
    { id: '12', name: { ar: 'أكجوجت', fr: 'Akjoujt' }, coords: [19.7461, -14.3828], type: 'active', details: { fm_stations: 3, dtt_channels: 2, tower_height: '50m', power: '2kW', coverage: '85%' } },
    { id: '13', name: { ar: 'الزويرات', fr: 'Zouerat' }, coords: [22.6867, -12.4764], type: 'active' },
    { id: '14', name: { ar: 'بير أم اكرين', fr: 'Bir Moghrein' }, coords: [25.2239, -11.5833], type: 'active' },
    { id: '15', name: { ar: 'النياما', fr: 'Inal' }, coords: [21.2611, -15.8611], type: 'new_broadcast' },
    { id: '16', name: { ar: 'بوتلميت', fr: 'Boutilimit' }, coords: [17.5481, -14.7661], type: 'active' },
    { id: '17', name: { ar: 'الاك', fr: 'Aleg' }, coords: [17.0500, -13.9167], type: 'active' },
    { id: '18', name: { ar: 'مقطع لحجار', fr: 'Magta-Lahjar' }, coords: [17.5000, -13.1000], type: 'active' },
    { id: '19', name: { ar: 'بوكي', fr: 'Boghé' }, coords: [16.5833, -14.2667], type: 'active' },
    { id: '20', name: { ar: 'تيشيت', fr: 'Tichit' }, coords: [18.4411, -9.4911], type: 'active' },
    { id: '21', name: { ar: 'ودان', fr: 'Ouadane' }, coords: [20.9333, -11.6167], type: 'active' },
    { id: '22', name: { ar: 'شنقيط', fr: 'Chinguetti' }, coords: [20.4631, -12.3581], type: 'active' },
    { id: '23', name: { ar: 'ولاتة', fr: 'Oualata' }, coords: [17.3000, -7.0167], type: 'active' },
    { id: '24', name: { ar: 'باسكنو', fr: 'Bassiknou' }, coords: [15.8458, -5.9125], type: 'active' },
    { id: '25', name: { ar: 'عدل بكرو', fr: 'Adel Bagrou' }, coords: [15.5167, -7.1833], type: 'new_broadcast' },
    { id: '26', name: { ar: 'الشامي', fr: 'Chami' }, coords: [20.1739, -15.9644], type: 'active' }
];

export const useMapStore = create<MapStore>()(
    persist(
        (set) => ({
            markers: INITIAL_MARKERS,
            addMarker: (marker) => set((state) => ({ 
                markers: [...state.markers, { ...marker, id: Math.random().toString(36).substr(2, 9) }] 
            })),
            updateMarker: (id, updatedMarker) => set((state) => ({
                markers: state.markers.map((m) => m.id === id ? updatedMarker : m)
            })),
            deleteMarker: (id) => set((state) => ({
                markers: state.markers.filter((m) => m.id !== id)
            })),
        }),
        {
            name: 'tdm-map-data',
        }
    )
);
