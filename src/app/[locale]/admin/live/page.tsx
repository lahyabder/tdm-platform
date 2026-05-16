'use client';

import { useState, use, useEffect } from 'react';
import { useLiveStore, LiveChannel } from '@/store/useLiveStore';
import LiveChannelForm from '@/components/admin/LiveChannelForm';

export default function AdminLivePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params) as any;
    const { channels, deleteChannel, toggleChannelStatus } = useLiveStore();
    const [isClient, setIsClient] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [editingChannel, setEditingChannel] = useState<LiveChannel | null>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleEdit = (channel: LiveChannel) => {
        setEditingChannel(channel);
        setIsAdding(false);
        scrollToTop();
    };

    const handleAdd = () => {
        setIsAdding(true);
        setEditingChannel(null);
        scrollToTop();
    };

    const isAr = locale === 'ar';

    const t = {
        ar: {
            title: "إدارة البث المباشر",
            subtitle: "التحكم في القنوات التلفزيونية والمحطات الإذاعية المتاحة للبث.",
            add: "إضافة قناة / محطة",
            table: { name: "الاسم", type: "النوع", category: "الفئة", status: "الحالة", actions: "العمليات" },
            types: { tv: "تلفزيون", radio: "إذاعة" },
            confirmDelete: "هل أنت متأكد من حذف هذه القناة نهائياً؟",
        },
        fr: {
            title: "Gestion du Streaming",
            subtitle: "Contrôle des chaînes TV et stations radio disponibles en direct.",
            add: "Ajouter une chaîne",
            table: { name: "Nom", type: "Type", category: "Catégorie", status: "Statut", actions: "Actions" },
            types: { tv: "Télévision", radio: "Radio" },
            confirmDelete: "Voulez-vous vraiment supprimer cette chaîne ?",
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
                    className="px-4 py-2 bg-slate-900 text-white font-bold rounded-sm hover:bg-slate-800 transition-colors text-sm shadow-sm flex items-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
                    {t.add}
                </button>
            </div>

            {(isAdding || editingChannel) && (
                <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-md animate-in fade-in slide-in-from-top-4 duration-300">
                    <LiveChannelForm 
                        locale={locale} 
                        initialData={editingChannel || undefined} 
                        onClose={() => {
                            setIsAdding(false);
                            setEditingChannel(null);
                        }} 
                    />
                </div>
            )}

            <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-start rtl:text-end text-slate-600">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-black">{t.table.name}</th>
                                <th className="px-6 py-4 font-black">{t.table.type}</th>
                                <th className="px-6 py-4 font-black text-center">{t.table.status}</th>
                                <th className="px-6 py-4 font-black text-center">{t.table.actions}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {channels.map((channel) => (
                                <tr key={channel.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded bg-slate-100 border p-1 flex items-center justify-center">
                                                {channel.logo ? <img src={channel.logo} alt={channel.name[locale as 'ar' | 'fr']} className="w-full h-full object-contain" /> : <span className="text-[10px] font-black">TDM</span>}
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900">{channel.name[locale as 'ar' | 'fr']}</div>
                                                <div className="text-[10px] text-slate-400 font-bold uppercase">{channel.category}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-[10px] font-black uppercase border ${
                                            channel.type === 'tv' ? 'border-brand-green/20 text-brand-green bg-brand-green/5' : 'border-brand-red/20 text-brand-red bg-brand-red/5'
                                        }`}>
                                            {t.types[channel.type as keyof typeof t.types]}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <button 
                                            onClick={() => toggleChannelStatus(channel.id)}
                                            className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${channel.isActive ? 'bg-brand-green' : 'bg-slate-300'}`}
                                        >
                                            <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300 ${isAr ? (channel.isActive ? 'end-6' : 'end-1') : (channel.isActive ? 'start-6' : 'start-1')}`}></div>
                                        </button>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex items-center justify-center gap-4">
                                            <button 
                                                onClick={() => handleEdit(channel)}
                                                className="text-brand-green hover:underline font-bold text-xs uppercase"
                                            >
                                                {isAr ? 'تعديل' : 'Modifier'}
                                            </button>
                                            <button 
                                                onClick={() => { if(window.confirm(t.confirmDelete)) deleteChannel(channel.id); }}
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
