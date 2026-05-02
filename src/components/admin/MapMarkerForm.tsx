'use client';

import { useState, useEffect } from 'react';
import { useMapStore, MapMarker } from '@/store/useMapStore';

interface Props {
    locale: string;
    initialData?: MapMarker;
    onClose: () => void;
}

export default function MapMarkerForm({ locale, initialData, onClose }: Props) {
    const { addMarker, updateMarker } = useMapStore();
    const isAr = locale === 'ar';
    const isEdit = !!initialData;

    const [formData, setFormData] = useState<MapMarker>(
        initialData || {
            id: '',
            name: { ar: '', fr: '' },
            coords: [18.0, -15.0],
            type: 'active',
            details: {
                fm_stations: 0,
                dtt_channels: 0,
                tower_height: '0m',
                power: '0kW',
                coverage: '0%'
            }
        }
    );

    const t = {
        ar: {
            title: isEdit ? "تعديل نقطة بث" : "إضافة نقطة بث جديدة",
            basicInfo: "البيانات الأساسية",
            techDetails: "التفاصيل الفنية",
            nameAr: "الاسم (بالعربية)",
            nameFr: "الاسم (بالفرنسية)",
            lat: "خط العرض (Latitude)",
            lng: "خط الطول (Longitude)",
            type: "نوع المحطة",
            fm: "عدد إذاعات FM",
            dtt: "عدد قنوات التلفزيون الرقمي",
            tower: "ارتفاع البرج (متر)",
            power: "قوة البث (kW)",
            coverage: "نسبة التغطية (%)",
            save: "حفظ البيانات",
            cancel: "إلغاء",
            types: { earth_station: "المحطة الأرضية", active: "محطة مفعلة", new_broadcast: "محطة جديدة" }
        },
        fr: {
            title: isEdit ? "Modifier le point" : "Ajouter un point",
            basicInfo: "Informations de base",
            techDetails: "Détails Techniques",
            nameAr: "Nom (AR)",
            nameFr: "Nom (FR)",
            lat: "Latitude",
            lng: "Longitude",
            type: "Type de station",
            fm: "Nombre de radios FM",
            dtt: "Nombre de chaînes TNT",
            tower: "Hauteur pylône (m)",
            power: "Puissance (kW)",
            coverage: "Couverture (%)",
            save: "Enregistrer",
            cancel: "Annuler",
            types: { earth_station: "Station Terrienne", active: "Station Active", new_broadcast: "Nouvelle Station" }
        }
    }[locale as 'ar' | 'fr'];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit) {
            updateMarker(initialData!.id, formData);
        } else {
            addMarker(formData);
        }
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <h3 className="text-lg font-black text-slate-800 border-b pb-2 mb-4">{t.title}</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Info */}
                <div className="space-y-4">
                    <h4 className="text-xs font-black text-brand-green uppercase tracking-widest">{t.basicInfo}</h4>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="admin-label">{t.nameAr}</label>
                            <input required className="admin-input" value={formData.name.ar} onChange={e => setFormData({...formData, name: {...formData.name, ar: e.target.value}})} />
                        </div>
                        <div>
                            <label className="admin-label">{t.nameFr}</label>
                            <input required className="admin-input" value={formData.name.fr} onChange={e => setFormData({...formData, name: {...formData.name, fr: e.target.value}})} />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                            <div>
                                <label className="admin-label">{t.lat}</label>
                                <input type="number" step="0.0001" required className="admin-input" value={formData.coords[0]} onChange={e => setFormData({...formData, coords: [parseFloat(e.target.value), formData.coords[1]]})} />
                            </div>
                            <div>
                                <label className="admin-label">{t.lng}</label>
                                <input type="number" step="0.0001" required className="admin-input" value={formData.coords[1]} onChange={e => setFormData({...formData, coords: [formData.coords[0], parseFloat(e.target.value)]})} />
                            </div>
                        </div>
                        <div>
                            <label className="admin-label">{t.type}</label>
                            <select className="admin-input" value={formData.type} onChange={e => setFormData({...formData, type: e.target.value as any})}>
                                {Object.entries(t.types).map(([val, label]) => <option key={val} value={val}>{label}</option>)}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Tech Details */}
                <div className="space-y-4">
                    <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest">{t.techDetails}</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="admin-label">{t.fm}</label>
                            <input type="number" className="admin-input" value={formData.details?.fm_stations} onChange={e => setFormData({...formData, details: {...formData.details!, fm_stations: parseInt(e.target.value)}})} />
                        </div>
                        <div>
                            <label className="admin-label">{t.dtt}</label>
                            <input type="number" className="admin-input" value={formData.details?.dtt_channels} onChange={e => setFormData({...formData, details: {...formData.details!, dtt_channels: parseInt(e.target.value)}})} />
                        </div>
                        <div>
                            <label className="admin-label">{t.tower}</label>
                            <input className="admin-input" value={formData.details?.tower_height} onChange={e => setFormData({...formData, details: {...formData.details!, tower_height: e.target.value}})} />
                        </div>
                        <div>
                            <label className="admin-label">{t.power}</label>
                            <input className="admin-input" value={formData.details?.power} onChange={e => setFormData({...formData, details: {...formData.details!, power: e.target.value}})} />
                        </div>
                        <div className="col-span-2">
                            <label className="admin-label">{t.coverage}</label>
                            <input className="admin-input" value={formData.details?.coverage} onChange={e => setFormData({...formData, details: {...formData.details!, coverage: e.target.value}})} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 border-t">
                <button type="button" onClick={onClose} className="px-6 py-2 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-sm">{t.cancel}</button>
                <button type="submit" className="px-8 py-2 bg-slate-900 text-white text-sm font-black rounded-sm hover:bg-slate-800 shadow-lg shadow-slate-900/10">{t.save}</button>
            </div>
        </form>
    );
}
