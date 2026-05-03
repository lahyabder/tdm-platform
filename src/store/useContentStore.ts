import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';

export interface PageContent {
    id: string;
    title: { ar: string; fr: string; };
    sections: Record<string, any>;
}

export const INITIAL_CONTENT: Record<string, PageContent> = {
    home: {
        id: 'home',
        title: { ar: "نحن نصل بكم للجميع", fr: "Connecting The Nation" },
        sections: {
            hero: {
                title: { ar: "شركة البث الإذاعي والتلفزي الموريتاني (TDM)", fr: "Télédiffusion de Mauritanie (TDM)" },
                subtitle: { 
                    ar: "المحرك التقني للسيادة الإعلامية الموريتانية، نربط الوطن بالعالم عبر أحدث تكنولوجيات البث الرقمي والفضائي.",
                    fr: "Le moteur technologique de la souveraineté médiatique mauritanienne, connectant la nation au monde via les dernières technologies."
                },
                cta: {
                    services: { ar: "خدماتنا الاستراتيجية", fr: "Services Stratégiques" },
                    live: { ar: "البث المباشر", fr: "Live Streaming" }
                }
            },
            stats: {
                items: [
                    { id: 'sites', value: '120+', label: { ar: "موقع بث", fr: "Sites de diffusion" } },
                    { id: 'channels', value: '45+', label: { ar: "قناة تلفزيونية", fr: "Chaînes TV" } },
                    { id: 'radios', value: '24', label: { ar: "محطة إذاعية", fr: "Stations Radio" } },
                    { id: 'projects', value: '98%', label: { ar: "تغطية وطنية", fr: "Couverture" } }
                ]
            },
            news: {
                title: { ar: "آخر الأنشطة والبلاغات", fr: "Dernières Activités" },
                items: [
                    { id: '1', date: '2024-05-02', title: { ar: "تحديث البنية التحتية للبث الرقمي", fr: "Mise à jour de l'infrastructure TNT" }, summary: { ar: "خطوة استراتيجية لتعزيز جودة البث في جميع ولايات الوطن.", fr: "Une étape stratégique pour améliorer la qualité de diffusion." } }
                ]
            },
            quickLinks: {
                title: { ar: "روابط سريعة", fr: "Liens Rapides" },
                items: [
                    { id: 'tenders', title: { ar: "الصفقات العمومية", fr: "Appels d'offres" }, path: "/tenders" },
                    { id: 'projects', title: { ar: "المشاريع الكبرى", fr: "Grands Projets" }, path: "/projects" }
                ]
            }
        }
    },
    about: {
        id: 'about',
        title: { ar: "ريادة المشهد الرقمي", fr: "Excellence Digitale" },
        sections: {
            director_word: {
                title: { ar: "كلمة المدير العام", fr: "Mot du Directeur" },
                author: { ar: "د. محمد ولد سيد أحمد فال ول الوداني", fr: "Dr Mohamed Ould Sid'Ahmed Fal" },
                image: "/images/dg.png",
                content: {
                    ar: "شركاؤنا وزوارنا الأعزاء،\nيسعدني أن أرحب بكم في المنصة المحدثة لشركة البث الإذاعي والتلفزي الموريتاني. إننا نعمل وفق رؤية استراتيجية تهدف إلى عصرنة الإعلام الوطني وتوطيد السيادة الرقمية لموريتانيا عبر بنية تحتية عالمية المستوى.",
                    fr: "Chers partenaires et visiteurs,\nC'est un honneur de vous accueillir sur la plateforme modernisée de la TDM. Nous travaillons selon une vision stratégique visant à moderniser les médias nationaux."
                }
            },
            intro: {
                title: { ar: "من نحن؟", fr: "Qui sommes-nous ?" },
                content: {
                    ar: "تعد شركة البث الإذاعي والتلفزي الموريتاني (TDM) العمود الفقري للإعلام السمعي البصري في البلاد، حيث تضطلع بمهمة حصرية لضمان البث والإرسال الرقمي والفضائي.",
                    fr: "La Télédiffusion de Mauritanie (TDM) est le pilier des médias audiovisuels en Mauritanie, assurant la diffusion numérique et satellite."
                }
            }
        }
    },
    services: {
        id: 'services',
        title: { ar: "حلول تقنية متكاملة", fr: "Solutions Technologiques" },
        sections: {
            intro: {
                title: { ar: "خدماتنا الاستراتيجية", fr: "Nos Services Stratégiques" },
                content: { ar: "نقدم منظومة متكاملة من خدمات البث ونقل البيانات المصممة لتلبية احتياجات المشهد الإعلامي الحديث.", fr: "Nous offrons un système complet de services de diffusion et de transmission de données." }
            }
        }
    },
    projects: {
        id: 'projects',
        title: { ar: "خارطة الطريق الرقمية", fr: "Feuille de Route" },
        sections: {
            intro: {
                title: { ar: "مشاريعنا الاستراتيجية", fr: "Nos Projets Stratégiques" },
                content: { ar: "نعمل على تنفيذ مشاريع طموحة لعصرنة قطاع البث الرقمي والارتقاء بجودة الخدمات المقدمة للمواطن.", fr: "Nous réalisons des projets ambitieux pour moderniser le secteur de la télédiffusion." }
            }
        }
    },
    contact: {
        id: 'contact',
        title: { ar: "تواصل معنا", fr: "Contactez-nous" },
        sections: {
            info: {
                address: { ar: "نواكشوط، موريتانيا - المقر الرئيسي", fr: "Nouakchott, Mauritanie - Siège Social" },
                phone: { ar: "+222 45 25 25 25", fr: "+222 45 25 25 25" },
                email: { ar: "contact@tdm.mr", fr: "contact@tdm.mr" },
                hours: { ar: "الأحد - الخميس: 08:00 - 16:00", fr: "Dimanche - Jeudi: 08h00 - 16h00" }
            }
        }
    }
};

interface ContentState {
    pages: Record<string, PageContent>;
    isLoading: boolean;
    updatePageContent: (pageKey: string, content: PageContent) => Promise<void>;
    fetchContent: () => Promise<void>;
    syncAllToCloud: () => Promise<void>;
    getPageContent: (pageKey: string) => PageContent;
}

export const useContentStore = create<ContentState>()(
    persist(
        (set, get) => ({
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
                        
                        // Merge logic: cloud wins, but keep local keys if cloud doesn't have them
                        set((state) => ({
                            pages: { ...state.pages, ...cloudPages },
                            isLoading: false
                        }));
                    }
                } catch (e) {
                    console.error("Fetch Content Error:", e);
                    set({ isLoading: false });
                }
            },

            updatePageContent: async (pageKey, content) => {
                // Update local state first
                set((state) => ({
                    pages: { ...state.pages, [pageKey]: content }
                }));

                // Push to Supabase
                try {
                    await supabase
                        .from('page_content')
                        .upsert({ 
                            page_key: pageKey, 
                            content: content,
                            updated_at: new Date().toISOString()
                        });
                } catch (e) {
                    console.error("Cloud Sync Error:", e);
                }
            },

            syncAllToCloud: async () => {
                set({ isLoading: true });
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
            },

            getPageContent: (pageKey) => {
                return get().pages[pageKey] || { id: pageKey, title: { ar: "", fr: "" }, sections: {} };
            },
        }),
        {
            name: 'tdm-digital-content-v3',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
