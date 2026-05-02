import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface PageContent {
    id: string;
    title: { ar: string; fr: string; };
    sections: Record<string, any>;
}

export const INITIAL_CONTENT: Record<string, PageContent> = {
    home: {
        id: 'home',
        title: { ar: "الرئيسية", fr: "Accueil" },
        sections: {
            hero: {
                title: { ar: "شركة البث الإذاعي والتلفزي الموريتاني (TDM)", fr: "Télédiffusion de Mauritanie (TDM)" },
                subtitle: { 
                    ar: "المهمة الرئيسية للمؤسسة هي ضمان البث والإرسال الحصري لبرامج متعهدي الاتصال السمعي البصري المرخص لهم داخل موريتانيا وخارجها.",
                    fr: "La mission principale est d'assurer la diffusion et la transmission exclusive des programmes des opérateurs de communication audiovisuelle agréés."
                },
                cta: {
                    services: { ar: "خدماتنا التقنية", fr: "Nos Services" },
                    live: { ar: "البث المباشر", fr: "Live Streaming" }
                }
            },
            stats: {
                items: [
                    { id: 'sites', value: '120+', label: { ar: "موقع بث", fr: "Sites de diffusion" } },
                    { id: 'channels', value: '15', label: { ar: "قناة تلفزيونية", fr: "Chaînes TV" } },
                    { id: 'radios', value: '24', label: { ar: "محطة إذاعية", fr: "Stations Radio" } },
                    { id: 'projects', value: '8', label: { ar: "مشاريع جارية", fr: "Projets en cours" } }
                ]
            },
            news: {
                title: { ar: "آخر الأنشطة والبلاغات", fr: "Dernières Activités" },
                items: [
                    { id: '1', date: '2024-02-15', title: { ar: "إطلاق بث الإذاعات عبر الإنترنت", fr: "Lancement du streaming radio" }, summary: { ar: "خطوة هامة لتعزيز الوجود الرقمي...", fr: "Une étape importante pour la présence numérique..." } }
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
        title: { ar: "عن المؤسسة", fr: "À Propos" },
        sections: {
            director_word: {
                title: { ar: "مرحبا", fr: "Bienvenue" },
                author: { ar: "د. محمد ولد سيد أحمد فال ول الوداني", fr: "Dr Mohamed Ould Sid'Ahmed Fal" },
                image: "/images/dg.png",
                content: {
                    ar: "شركاؤنا وزوارنا الأعزاء،\nيسعدني أن أرحب بكم في الموقع المحدث لشركة البث الإذاعي والتلفزي الموريتاني...",
                    fr: "Chers partenaires et visiteurs,\nC'est un plaisir de vous accueillir sur le site web de la TDM..."
                }
            },
            who_are_we: {
                title: { ar: "من نحن؟", fr: "Qui sommes-nous ?" },
                content: {
                    ar: "شركة البث الإذاعي والتلفزي الموريتاني (TDM) هي المؤسسة الوطنية المسؤولة عن تشغيل وتطوير شبكات البث...",
                    fr: "La Télédiffusion de Mauritanie (TDM) est l'institution nationale responsable de l'exploitation et du développement des réseaux..."
                }
            }
        }
        }
    },
    contact: {
        id: 'contact',
        title: { ar: "اتصل بنا", fr: "Contactez-nous" },
        sections: {
            info: {
                address: { ar: "نواكشوط، موريتانيا - ص.ب: 200", fr: "Nouakchott, Mauritanie - BP: 200" },
                phone: { ar: "+222 45 25 25 25", fr: "+222 45 25 25 25" },
                email: { ar: "contact@tdm.mr", fr: "contact@tdm.mr" },
                hours: { ar: "الأحد - الخميس: 08:00 - 16:00", fr: "Dimanche - Jeudi: 08h00 - 16h00" }
            }
        }
    },
    services: {
        id: 'services',
        title: { ar: "خدماتنا", fr: "Nos Services" },
        sections: {
            intro: {
                title: { ar: "حلول تقنية متكاملة", fr: "Solutions Techniques Intégrées" },
                content: { ar: "نقدم حلولاً متكاملة للبث الإذاعي والتلفزي ونقل البيانات باستخدام أحدث التقنيات.", fr: "Nous offrons des solutions complètes de télédiffusion et de transmission de données." }
            }
        }
    },
    projects: {
        id: 'projects',
        title: { ar: "المشاريع", fr: "Projets" },
        sections: {
            intro: {
                title: { ar: "مشاريعنا الاستراتيجية", fr: "Nos Projets Stratégiques" },
                content: { ar: "نعمل على تنفيذ مشاريع طموحة لتطوير البنية التحتية للبث الرقمي في موريتانيا.", fr: "Nous mettons en œuvre des projets ambitieux pour développer l'infrastructure numérique." }
            }
        }
    },
    legal: {
        id: 'legal',
        title: { ar: "المرجعيات التشريعية", fr: "Législation" },
        sections: {
            intro: {
                title: { ar: "الإطار القانوني", fr: "Cadre Juridique" },
                content: { ar: "القوانين والمراسيم والقرارات المنظمة لقطاع البث السمعي البصري.", fr: "Lois, décrets et décisions régissant le secteur de la télédiffusion." }
            }
        }
    }
};

interface ContentState {
    pages: Record<string, PageContent>;
    updatePageContent: (pageKey: string, content: PageContent) => void;
    getPageContent: (pageKey: string) => PageContent;
}

export const useContentStore = create<ContentState>()(
    persist(
        (set, get) => ({
            pages: INITIAL_CONTENT,
            updatePageContent: (pageKey, content) => set((state) => ({
                pages: { ...state.pages, [pageKey]: content }
            })),
            getPageContent: (pageKey) => {
                return get().pages[pageKey] || { id: pageKey, title: { ar: "", fr: "" }, sections: {} };
            },
        }),
        {
            name: 'tdm-digital-content-v2',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
