import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';

export type LegislationType = 'law' | 'decree' | 'order' | 'circular';

export interface Legislation {
    id: string; // Text Number/Reference
    title: { ar: string; fr: string };
    type: LegislationType;
    date: string;
    pdfUrl?: string; // Mock PDF link
    summary?: { ar: string; fr: string };
}

interface LegislationState {
    legislations: Legislation[];
    isLoading: boolean;
    fetchLegislations: () => Promise<void>;
    addLegislation: (legislation: Legislation) => Promise<void>;
    updateLegislation: (id: string, updated: Partial<Legislation>) => Promise<void>;
    deleteLegislation: (id: string) => Promise<void>;
    getLegislationById: (id: string) => Legislation | undefined;
}

const initialLegislations: Legislation[] = [
    {
        id: "LOI-2010-045",
        type: "law",
        date: "2010-07-26",
        title: {
            ar: "القانون المتعلق بالاتصال السمعي البصري",
            fr: "Loi relative à la communication audiovisuelle"
        },
        pdfUrl: "/docs/loi-2010-045.pdf"
    },
    {
        id: "DECRET-2015-112",
        type: "decree",
        date: "2015-09-14",
        title: {
            ar: "مرسوم تنظيم خدمات البيانات",
            fr: "Décret portant régulation des services de données"
        },
        pdfUrl: "/docs/decret-2015-112.pdf"
    }
];

export const useLegislationStore = create<LegislationState>()(
    persist(
        (set, get) => ({
            legislations: initialLegislations,
            isLoading: false,

            fetchLegislations: async () => {
                try {
                    set({ isLoading: true });
                    const { data, error } = await supabase.from('legislations').select('*');
                    if (!error && data && data.length > 0) {
                        const mapped = data.map(item => ({
                            id: item.id,
                            title: { ar: item.title_ar || '', fr: item.title_fr || '' },
                            type: item.type || 'law',
                            date: item.date || '',
                            pdfUrl: item.pdf_url || '',
                            summary: { ar: item.summary_ar || '', fr: item.summary_fr || '' }
                        }));
                        
                        const unique = Array.from(new Map(mapped.map(l => [l.id, l])).values());
                        set({ legislations: unique, isLoading: false });
                    } else {
                        set({ isLoading: false });
                    }
                } catch (e) {
                    console.error('Fetch legislations error:', e);
                    set({ isLoading: false });
                }
            },

            addLegislation: async (legislation) => {
                const res = await fetch('/api/admin/legislations', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(legislation)
                });
                const result = await res.json();
                if (!res.ok || result.error) {
                    throw new Error(result.error || 'Failed to add legislation');
                }
                set((state) => ({
                    legislations: [legislation, ...state.legislations]
                }));
            },

            updateLegislation: async (id, updated) => {
                const current = get().legislations.find(l => l.id === id);
                if (!current) return;
                const full = { ...current, ...updated };
                
                const res = await fetch('/api/admin/legislations', {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(full)
                });
                const result = await res.json();
                if (!res.ok || result.error) {
                    throw new Error(result.error || 'Failed to update legislation');
                }
                
                set((state) => ({
                    legislations: state.legislations.map((l) =>
                        l.id === id ? full : l
                    )
                }));
            },

            deleteLegislation: async (id) => {
                const res = await fetch(`/api/admin/legislations?id=${id}`, {
                    method: 'DELETE'
                });
                const result = await res.json();
                if (!res.ok || result.error) {
                    throw new Error(result.error || 'Failed to delete legislation');
                }
                
                set((state) => ({
                    legislations: state.legislations.filter((l) => l.id !== id)
                }));
            },

            getLegislationById: (id) => {
                return get().legislations.find((l) => l.id === id);
            },
        }),
        {
            name: 'tdm-legislation-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
