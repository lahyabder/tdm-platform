import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface LiveChannel {
    id: string;
    type: 'tv' | 'radio';
    category: 'public' | 'private' | 'international';
    name: { ar: string; fr: string; };
    desc: { ar: string; fr: string; };
    url: string;
    logo?: string;
    isActive: boolean;
}

interface LiveStore {
    channels: LiveChannel[];
    addChannel: (channel: LiveChannel) => void;
    updateChannel: (id: string, channel: LiveChannel) => void;
    deleteChannel: (id: string) => void;
    toggleChannelStatus: (id: string) => void;
}

const DEFAULT_CHANNELS: LiveChannel[] = [
    {
        id: 'ch1',
        type: 'tv',
        category: 'public',
        name: { ar: "الموريتانية الأولى", fr: "Mauritanaise 1" },
        desc: { ar: "القناة الرسمية الجامعة - Badr 4", fr: "Chaîne officielle généraliste - Badr 4" },
        url: "https://www.youtube.com/embed/oJC1mlUrYnY?autoplay=1&mute=0",
        logo: "/logos/tvm.svg",
        isActive: true
    },
    {
        id: 'ch2',
        type: 'tv',
        category: 'public',
        name: { ar: "الموريتانية الثانية", fr: "Mauritanaise 2" },
        desc: { ar: "الخدمة العمومية والشباب - Badr 4", fr: "Service public & Jeunesse - Badr 4" },
        url: "https://www.youtube.com/embed/I3nZbfWKzgc?autoplay=1&mute=0",
        logo: "/logos/tvm2.svg",
        isActive: true
    },
    {
        id: 'r1',
        type: 'radio',
        category: 'public',
        name: { ar: "إذاعة موريتانيا", fr: "Radio Mauritanie" },
        desc: { ar: "صوت الجمهورية - Badr 4", fr: "Voix de la République - Badr 4" },
        url: "https://ec6.yesstreaming.net:2760/stream",
        logo: "/logos/radio_mauritanie.svg",
        isActive: true
    }
];

export const useLiveStore = create<LiveStore>()(
    persist(
        (set) => ({
            channels: DEFAULT_CHANNELS,
            addChannel: (channel) => set((state) => ({ 
                channels: [...state.channels, { ...channel, id: Math.random().toString(36).substr(2, 9) }] 
            })),
            updateChannel: (id, updatedChannel) => set((state) => ({
                channels: state.channels.map((c) => c.id === id ? updatedChannel : c)
            })),
            deleteChannel: (id) => set((state) => ({
                channels: state.channels.filter((c) => c.id !== id)
            })),
            toggleChannelStatus: (id) => set((state) => ({
                channels: state.channels.map((c) => c.id === id ? { ...c, isActive: !c.isActive } : c)
            })),
        }),
        {
            name: 'tdm-live-data',
        }
    )
);
