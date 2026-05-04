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
    home: { id: 'home', title: { ar: "نحن نصل بكم للجميع", fr: "Connecting The Nation" }, sections: { hero: { title: { ar: "شركة البث الإذاعي والتلفزي الموريتاني (TDM)", fr: "Télédiffusion de Mauritanie (TDM)" }, subtitle: { ar: "المحرك التقني للسيادة الإعلامية الموريتانية، نربط الوطن بالعالم عبر أحدث تكنولوجيات البث.", fr: "Le moteur technologique de la souveraineté médiatique mauritanienne." }, cta: { services: { ar: "خدماتنا الاستراتيجية", fr: "Services Stratégiques" }, live: { ar: "البث المباشر", fr: "Live Streaming" } } }, stats: { items: [{ id: 'sites', value: '120+', label: { ar: "موقع بث", fr: "Sites de diffusion" } }, { id: 'channels', value: '45+', label: { ar: "قناة تلفزيونية", fr: "Chaînes TV" } }, { id: 'radios', value: '24', label: { ar: "محطة إذاعية", fr: "Stations Radio" } }, { id: 'projects', value: '98%', label: { ar: "تغطية وطنية", fr: "Couverture" } }] }, news: { title: { ar: "آخر الأنشطة والبلاغات", fr: "Dernières Activités" }, items: [
        { id: '1', date: '2024-05-01', title: { ar: 'توسعة شبكة البث الرقمي في المناطق الحدودية', fr: 'Expansion du réseau numérique aux frontières' }, summary: { ar: 'أطلقت TDM مشروعاً لتوسعة التغطية الرقمية لضمان وصول البث لكافة المواطنين على الحدود.', fr: 'TDM a lancé un projet pour assurer la couverture numérique de tous les citoyens aux frontières.' } },
        { id: '2', date: '2024-04-25', title: { ar: 'توقيع اتفاقية تعاون تقني مع الشركاء الدوليين', fr: 'Signature d\'un accord de coopération technique' }, summary: { ar: 'تعزيز التعاون التكنولوجي لتطوير البنية التحتية للبث الفضائي الموريتاني.', fr: 'Renforcement de la coopération technologique pour le développement du satellite.' } }
    ] }, quickLinks: { title: { ar: "روابط سريعة", fr: "Liens Rapides" }, items: [] } } },
    about: { id: 'about', title: { ar: "ريادة المشهد الرقمي", fr: "Excellence Digitale" }, sections: { 
        intro: { title: { ar: "من نحن؟", fr: "Qui sommes-nous ?" }, content: { ar: "تعد شركة البث الإذاعي والتلفزي الموريتاني (TDM) هي الهيئة الوطنية المسؤولة عن تأمين وتطوير البث الإذاعي والتلفزيوني على كامل التراب الوطني. نحن نلعب دوراً محورياً في السيادة الرقمية الوطنية.", fr: "La Télédiffusion de Mauritanie (TDM) est l'entité nationale responsable de la sécurisation et du développement de la radiodiffusion et de la télévision." } },
        vision: { title: { ar: "رؤيتنا", fr: "Notre Vision" }, content: { ar: "أن نكون القوة الدافعة للتحول الرقمي الشامل في الفضاء السمعي البصري الوطني.", fr: "Être le moteur de la transformation numérique nationale." } },
        mission: { title: { ar: "رسالتنا", fr: "Notre Mission" }, content: { ar: "توفير بنية تحتية تقنية عالمية المستوى تضمن السيادة الإعلامية والانتشار الواسع.", fr: "Fournir une infrastructure de classe mondiale assurant la souveraineté." } },
        values: { title: { ar: "قيمنا", fr: "Nos Valeurs" }, content: { ar: "الالتزام بالتميز التقني، والشفافية المؤسسية، والمسؤولية تجاه المجتمع.", fr: "Engagement envers l'excellence technique et la transparence." } }
    } },
    services: { 
        id: 'services', 
        title: { ar: "حلول تقنية متكاملة", fr: "Solutions Technologiques" }, 
        sections: { 
            items: [
                { 
                    id: 'tv', 
                    title: { ar: "البث التلفزي الرقمي", fr: "Diffusion TV Numérique" }, 
                    description: { ar: "نقدم حلول بث تلفزيوني رقمي بمعايير عالمية، تضمن وصول الصورة والصوت بوضوح فائق لكافة المشاهدين.", fr: "Solutions de diffusion TV numérique aux standards mondiaux, garantissant une clarté exceptionnelle." }
                },
                { 
                    id: 'radio', 
                    title: { ar: "البث الإذاعي (FM)", fr: "Diffusion Radio (FM)" }, 
                    description: { ar: "شبكة بث إذاعي متطورة تغطي كافة الولايات الموريتانية، مع ضمان نقاء الصوت واستمرارية الخدمة.", fr: "Réseau de diffusion radio avancé couvrant toutes les wilayas, assurant la pureté sonore." }
                },
                { 
                    id: 'data', 
                    title: { ar: "خدمات نقل البيانات", fr: "Services de Données" }, 
                    description: { ar: "بنية تحتية متينة لنقل البيانات والربط الفني بين المؤسسات الإعلامية عبر شبكاتنا المخصصة.", fr: "Infrastructure solide pour le transfert de données et la liaison technique entre médias." }
                }
            ] 
        } 
    },
    projects: { 
        id: 'projects', 
        title: { ar: "خارطة الطريق الرقمية", fr: "Feuille de Route" }, 
        sections: { 
            items: [
                { 
                    id: 'sat', 
                    title: { ar: "تطوير منظومة البث الفضائي", fr: "Système Satellite" }, 
                    description: { ar: "مشروع وطني لتطوير وتوسيع نطاق البث الفضائي الموريتاني ليشمل القارات الخمس.", fr: "Projet national pour étendre la couverture satellite mauritanienne sur cinq continents." },
                    status: 'ongoing',
                    progress: 75
                },
                { 
                    id: 'dtt', 
                    title: { ar: "التحول للبث الرقمي الأرضي", fr: "Transition TNT" }, 
                    description: { ar: "استكمال شبكة البث الرقمي الأرضي لضمان جودة صورة عالية وكفاءة في استخدام الترددات.", fr: "Achèvement du réseau TNT pour assurer une haute qualité d'image." },
                    status: 'completed',
                    progress: 100
                }
            ] 
        } 
    },
    contact: { id: 'contact', title: { ar: "تواصل معنا", fr: "Contactez-nous" }, sections: { info: { address: { ar: "نواكشوط، موريتانيا - حي الصحافة", fr: "Nouakchott, Mauritanie - Quartier Presse" }, phone: { ar: "+222 45 25 25 25", fr: "+222 45 25 25 25" }, email: { ar: "contact@tdm.mr", fr: "contact@tdm.mr" }, hours: { ar: "الأحد - الخميس: 08:00 - 16:00", fr: "Dimanche - Jeudi: 08h00 - 16h00" } } } },
    legal: { id: 'legal', title: { ar: "المرجعيات التشريعية", fr: "Cadre Légal" }, sections: { intro: { title: { ar: "الإطار القانوني والتشريعي", fr: "Cadre Juridique" }, content: { ar: "تعمل شركة البث الإذاعي والتلفزي الموريتاني وفق ترسانة قانونية تضمن تنظيم الفضاء السمعي البصري الوطني وتحدد التزامات الفاعلين في القطاع.", fr: "La Télédiffusion de Mauritanie opère selon un cadre légal garantissant la régulation de l'espace audiovisuel national." } } } }
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
                }, { onConflict: 'page_key' });
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
                }, { onConflict: 'page_key' });
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
