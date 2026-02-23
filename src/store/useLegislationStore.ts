import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

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
    addLegislation: (legislation: Legislation) => void;
    updateLegislation: (id: string, updated: Partial<Legislation>) => void;
    deleteLegislation: (id: string) => void;
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
            addLegislation: (legislation) =>
                set((state) => ({
                    legislations: [legislation, ...state.legislations]
                })),
            updateLegislation: (id, updated) =>
                set((state) => ({
                    legislations: state.legislations.map((l) =>
                        l.id === id ? { ...l, ...updated } : l
                    )
                })),
            deleteLegislation: (id) =>
                set((state) => ({
                    legislations: state.legislations.filter((l) => l.id !== id)
                })),
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
