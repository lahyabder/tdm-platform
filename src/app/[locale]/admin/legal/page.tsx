'use client';

import { useState, useEffect, use } from 'react';
import { useLegislationStore, LegislationType } from '@/store/useLegislationStore';
import Link from 'next/link';

export default function AdminLegalPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params) as any;
    const { legislations, addLegislation, updateLegislation, deleteLegislation } = useLegislationStore();
    const [isClient, setIsClient] = useState(false);
    const [filterType, setFilterType] = useState<LegislationType | 'all'>('all');
    const [isAdding, setIsAdding] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        id: '',
        title_ar: '',
        title_fr: '',
        type: 'law' as LegislationType,
        date: new Date().toISOString().split('T')[0]
    });

    useEffect(() => {
        setIsClient(true);
    }, []);

    const t = {
        ar: {
            title: "الإدارة التشريعية",
            add: "إضافة نص جديد",
            table: { id: "الرقم/المرجع", title: "العنوان", type: "النوع", date: "التاريخ", actions: "العمليات" },
            types: { law: "قانون", decree: "مرسوم", order: "قرار", circular: "تعميم", all: "الكل" },
            fields: { id: "رقم النص", titleAr: "العنوان (بالعربية)", titleFr: "العنوان (بالفرنسية)", type: "النوع", date: "تاريخ الصدور" },
            actions: { save: "حفظ", cancel: "إلغاء", delete: "حذف" },
            confirmDelete: "هل أنت متأكد من حذف هذا النص؟"
        },
        fr: {
            title: "Gestion Législative",
            add: "Ajouter un texte",
            table: { id: "Réf/N°", title: "Titre", type: "Type", date: "Date", actions: "Actions" },
            types: { law: "Loi", decree: "Décret", order: "Arrêté", circular: "Circulaire", all: "Tous" },
            fields: { id: "N° de Texte", titleAr: "Titre (AR)", titleFr: "Titre (FR)", type: "Type", date: "Date de parution" },
            actions: { save: "Enregistrer", cancel: "Annuler", delete: "Supprimer" },
            confirmDelete: "Êtes-vous sûr de vouloir supprimer ce texte ?"
        }
    }[locale as 'ar' | 'fr'];

    const filtered = legislations.filter(l => filterType === 'all' || l.type === filterType);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            id: formData.id,
            type: formData.type,
            date: formData.date,
            title: { ar: formData.title_ar, fr: formData.title_fr },
            pdfUrl: '#'
        };

        if (editingId) {
            updateLegislation(editingId, data);
            alert(locale === 'ar' ? '✅ تم التعديل بنجاح' : '✅ Modifié avec succès');
        } else {
            addLegislation(data);
            alert(locale === 'ar' ? '✅ تم الإضافة بنجاح' : '✅ Ajouté avec succès');
        }
        
        setIsAdding(false);
        setEditingId(null);
        setFormData({ id: '', title_ar: '', title_fr: '', type: 'law', date: new Date().toISOString().split('T')[0] });
    };

    const handleEdit = (l: any) => {
        setFormData({
            id: l.id,
            title_ar: l.title.ar,
            title_fr: l.title.fr,
            type: l.type,
            date: l.date
        });
        setEditingId(l.id);
        setIsAdding(true);
    };

    if (!isClient) return null;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-extrabold text-slate-800">{t.title}</h1>
                <button
                    onClick={() => setIsAdding(true)}
                    className="px-4 py-2 bg-brand-green text-white font-bold rounded-sm hover:bg-brand-green/90 transition-colors flex items-center gap-2 text-sm shadow-sm"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    {t.add}
                </button>
            </div>

            {isAdding && (
                <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300">
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t.fields.id}</label>
                            <input required className={`admin-input ${editingId ? 'bg-slate-50' : ''}`} value={formData.id} onChange={e => setFormData({ ...formData, id: e.target.value })} disabled={!!editingId} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t.fields.type}</label>
                            <select className="admin-input" value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value as any })}>
                                {['law', 'decree', 'order', 'circular'].map(type => <option key={type} value={type}>{t.types[type as keyof typeof t.types]}</option>)}
                            </select>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t.fields.titleAr}</label>
                            <input required className="admin-input" dir="rtl" value={formData.title_ar} onChange={e => setFormData({ ...formData, title_ar: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t.fields.titleFr}</label>
                            <input required className="admin-input" dir="ltr" value={formData.title_fr} onChange={e => setFormData({ ...formData, title_fr: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">{t.fields.date}</label>
                            <input type="date" required className="admin-input" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} />
                        </div>
                        <div className="md:col-span-2 flex justify-end gap-2 pt-4 border-t border-slate-100">
                            <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 text-sm font-bold text-slate-500 hover:bg-slate-50 rounded-sm transition-colors">{t.actions.cancel}</button>
                            <button type="submit" className="px-6 py-2 bg-slate-900 text-white text-sm font-bold rounded-sm hover:bg-slate-800 transition-colors">{t.actions.save}</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white p-4 rounded-sm border border-slate-200 shadow-sm">
                <div className="flex gap-2">
                    <button onClick={() => setFilterType('all')} className={`px-4 py-1.5 text-xs font-bold rounded-full transition-colors ${filterType === 'all' ? 'bg-brand-green text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>{t.types.all}</button>
                    {['law', 'decree', 'order', 'circular'].map(type => (
                        <button key={type} onClick={() => setFilterType(type as any)} className={`px-4 py-1.5 text-xs font-bold rounded-full transition-colors ${filterType === type ? 'bg-brand-green text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'}`}>{t.types[type as keyof typeof t.types]}</button>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-slate-600">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">{t.table.id}</th>
                                <th className="px-6 py-4">{t.table.title}</th>
                                <th className="px-6 py-4">{t.table.type}</th>
                                <th className="px-6 py-4">{t.table.date}</th>
                                <th className="px-6 py-4 text-center">{t.table.actions}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filtered.map(l => (
                                <tr key={l.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-mono font-medium text-slate-900">{l.id}</td>
                                    <td className="px-6 py-4 font-bold text-slate-800">{l.title[locale as 'ar' | 'fr']}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded-sm text-[10px] font-black uppercase text-slate-500">
                                            {t.types[l.type as keyof typeof t.types]}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-mono text-xs">{l.date}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-3">
                                            <button onClick={() => handleEdit(l)} className="text-brand-green hover:underline font-bold text-xs uppercase">{locale === 'ar' ? 'تعديل' : 'Modifier'}</button>
                                            <button onClick={() => { if (window.confirm(t.confirmDelete)) deleteLegislation(l.id); }} className="text-brand-red hover:underline font-bold text-xs uppercase">{t.actions.delete}</button>
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
