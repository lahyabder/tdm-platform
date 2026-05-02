'use client';

import { useState, use, useEffect } from 'react';
import { useMapStore, MapMarker } from '@/store/useMapStore';
import Link from 'next/link';
import MapMarkerForm from '@/components/admin/MapMarkerForm';

export default function AdminMapPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params) as any;
    const { markers, deleteMarker } = useMapStore();
    const [isClient, setIsClient] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [editingMarker, setEditingMarker] = useState<MapMarker | null>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Function to scroll to top smoothly
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleEdit = (marker: MapMarker) => {
        setEditingMarker(marker);
        setIsAdding(false);
        scrollToTop();
    };

    const handleAdd = () => {
        setIsAdding(true);
        setEditingMarker(null);
        scrollToTop();
    };

    const isAr = locale === 'ar';

    const t = {
        ar: {
            title: "إدارة خريطة البث",
            subtitle: "التحكم في نقاط التغطية والمحطات الأرضية على الخريطة التفاعلية.",
            add: "إضافة نقطة جديدة",
            table: { name: "اسم الموقع", type: "النوع", coords: "الإحداثيات", actions: "العمليات" },
            types: { earth_station: "محطة أرضية", active: "محطة مفعلة", new_broadcast: "محطة جديدة" },
            confirmDelete: "هل أنت متأكد من حذف هذه النقطة من الخريطة؟",
        },
        fr: {
            title: "Gestion de la Carte",
            subtitle: "Contrôle des points de couverture et des stations sur la carte interactive.",
            add: "Ajouter un point",
            table: { name: "Nom du site", type: "Type", coords: "Coordonnées", actions: "Actions" },
            types: { earth_station: "Station Terrienne", active: "Station Active", new_broadcast: "Nouvelle Station" },
            confirmDelete: "Êtes-vous sûr de vouloir supprimer ce point de la carte ?",
        }
    }[locale as 'ar' | 'fr'];

    if (!isClient) return null;

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 mb-2">{t.title}</h1>
                    <p className="text-slate-500 font-medium">{t.subtitle}</p>
                </div>
                <button 
                    onClick={handleAdd}
                    className="px-4 py-2 bg-brand-green text-white font-bold rounded-sm hover:bg-brand-green/90 transition-colors text-sm shadow-sm flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                    {t.add}
                </button>
            </div>

            {(isAdding || editingMarker) && (
                <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-md animate-in fade-in slide-in-from-top-4 duration-300">
                    <MapMarkerForm 
                        locale={locale} 
                        initialData={editingMarker || undefined} 
                        onClose={() => {
                            setIsAdding(false);
                            setEditingMarker(null);
                        }} 
                    />
                </div>
            )}

            <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-slate-600">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-black">{t.table.name}</th>
                                <th className="px-6 py-4 font-black">{t.table.type}</th>
                                <th className="px-6 py-4 font-black">{t.table.coords}</th>
                                <th className="px-6 py-4 font-black text-center">{t.table.actions}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {markers.map((marker) => (
                                <tr key={marker.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-bold text-slate-900">{marker.name[locale as 'ar' | 'fr']}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${
                                                marker.type === 'earth_station' ? 'bg-brand-yellow' :
                                                marker.type === 'new_broadcast' ? 'bg-brand-red' : 'bg-brand-green'
                                            }`}></div>
                                            <span className="text-xs font-bold text-slate-600 uppercase">
                                                {t.types[marker.type as keyof typeof t.types]}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-xs text-slate-500">
                                        {marker.coords[0].toFixed(4)}, {marker.coords[1].toFixed(4)}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-3">
                                            <button 
                                                onClick={() => handleEdit(marker)}
                                                className="text-brand-green hover:underline font-bold text-xs uppercase"
                                            >
                                                {isAr ? 'تعديل' : 'Modifier'}
                                            </button>
                                            <button 
                                                onClick={() => { if(window.confirm(t.confirmDelete)) deleteMarker(marker.id); }}
                                                className="text-brand-red hover:underline font-bold text-xs uppercase"
                                            >
                                                {isAr ? 'حذف' : 'Supprimer'}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
