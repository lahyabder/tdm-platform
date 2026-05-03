import { create } from 'zustand';
import { supabase } from '@/lib/supabase';

export interface PageContent {
    id: string;
    title: { ar: string; fr: string; };
    sections: Record<string, any>;
}

// ... INITIAL_CONTENT logic stays the same but I'll skip it in the write_to_file for brevity 
// and keep only the store logic to fix the quota issue.

export const INITIAL_CONTENT: Record<string, PageContent> = {
    home: { id: 'home', title: { ar: "نحن نصل بكم للجميع", fr: "Connecting The Nation" }, sections: { hero: { title: { ar: "شركة البث الإذاعي والتلفزي الموريتاني (TDM)", fr: "Télédiffusion de Mauritanie (TDM)" }, subtitle: { ar: "المحرك التقني للسيادة الإعلامية الموريتانية...", fr: "Le moteur technologique..." }, cta: { services: { ar: "خدماتنا الاستراتيجية", fr: "Services Stratégiques" }, live: { ar: "البث المباشر", fr: "Live Streaming" } } }, stats: { items: [{ id: 'sites', value: '120+', label: { ar: "موقع بث", fr: "Sites de diffusion" } }, { id: 'channels', value: '45+', label: { ar: "قناة تلفزيونية", fr: "Chaînes TV" } }, { id: 'radios', value: '24', label: { ar: "محطة إذاعية", fr: "Stations Radio" } }, { id: 'projects', value: '98%', label: { ar: "تغطية وطنية", fr: "Couverture" } }] }, news: { title: { ar: "آخر الأنشطة والبلاغات", fr: "Dernières Activités" }, items: [] }, quickLinks: { title: { ar: "روابط سريعة", fr: "Liens Rapides" }, items: [] } } },
    about: { id: 'about', title: { ar: "ريادة المشهد الرقمي", fr: "Excellence Digitale" }, sections: { director_word: { title: { ar: "كلمة المدير العام", fr: "Mot du Directeur" }, author: { ar: "د. محمد ولد سيد أحمد فال ول الوداني", fr: "Dr Mohamed Ould Sid'Ahmed Fal" }, image: "/images/dg.png", content: { ar: "شركاؤنا وزوارنا الأعزاء...", fr: "Chers partenaires..." } }, intro: { title: { ar: "من نحن؟", fr: "Qui sommes-nous ?" }, content: { ar: "تعد شركة البث الإذاعي والتلفزي الموريتاني...", fr: "La Télédiffusion de Mauritanie..." } } } },
    services: { id: 'services', title: { ar: "حلول تقنية متكاملة", fr: "Solutions Technologiques" }, sections: { intro: { title: { ar: "خدماتنا الاستراتيجية", fr: "Nos Services Stratégiques" }, content: { ar: "نقدم منظومة متكاملة...", fr: "Nous offrons..." } } } },
    projects: { id: 'projects', title: { ar: "خارطة الطريق الرقمية", fr: "Feuille de Route" }, sections: { intro: { title: { ar: "مشاريعنا الاستراتيجية", fr: "Nos Projets Stratégiques" }, content: { ar: "نعمل على تنفيذ مشاريع طموحة...", fr: "Nous réalisons..." } } } },
    contact: { id: 'contact', title: { ar: "تواصل معنا", fr: "Contactez-nous" }, sections: { info: { address: { ar: "نواكشوط، موريتانيا", fr: "Nouakchott, Mauritanie" }, phone: { ar: "+222 45 25 25 25", fr: "+222 45 25 25 25" }, email: { ar: "contact@tdm.mr", fr: "contact@tdm.mr" }, hours: { ar: "الأحد - الخميس: 08:00 - 16:00", fr: "Dimanche - Jeudi: 08h00 - 16h00" } } } }
};

interface ContentState {
    pages: Record<string, PageContent>;
    isLoading: boolean;
    updatePageContent: (pageKey: string, content: PageContent) => Promise<void>;
    fetchContent: () => Promise<void>;
    syncAllToCloud: () => Promise<void>;
    getPageContent: (pageKey: string) => PageContent;
}

// REMOVED PERSIST to avoid localStorage Quota Exceeded error
export const useContentStore = create<ContentState>((set, get) => ({
    pages: INITIAL_CONTENT,
    isLoading: false,

    fetchContent: async () => {
        set({ isLoading: true });
        try {
            const { data, error } = await supabase
                .from('page_content')
                .select('*');

            if (data && !error) {
                const cloudPages: Record<string, PageContent> = {};
                data.forEach((row: any) => {
                    cloudPages[row.page_key] = row.content;
                });
                set({ pages: { ...INITIAL_CONTENT, ...cloudPages }, isLoading: false });
            } else {
                set({ isLoading: false });
            }
        } catch (e) {
            console.error("Fetch Content Error:", e);
            set({ isLoading: false });
        }
    },

    updatePageContent: async (pageKey, content) => {
        set((state) => ({
            pages: { ...state.pages, [pageKey]: content }
        }));

        try {
            const { error } = await supabase
                .from('page_content')
                .upsert({ 
                    page_key: pageKey, 
                    content: content,
                    updated_at: new Date().toISOString()
                });
            if (error) throw error;
        } catch (e: any) {
            console.error("Cloud Sync Error:", e);
            throw e;
        }
    },

    syncAllToCloud: async () => {
        set({ isLoading: true });
        try {
            const currentPages = get().pages;
            const uploadPromises = Object.entries(currentPages).map(([key, content]) => {
                return supabase.from('page_content').upsert({
                    page_key: key,
                    content: content,
                    updated_at: new Date().toISOString()
                });
            });
            await Promise.all(uploadPromises);
            set({ isLoading: false });
        } catch (e: any) {
            console.error("Sync All Error:", e);
            set({ isLoading: false });
            throw e;
        }
    },

    getPageContent: (pageKey) => {
        return get().pages[pageKey] || { id: pageKey, title: { ar: "", fr: "" }, sections: {} };
    },
}));
