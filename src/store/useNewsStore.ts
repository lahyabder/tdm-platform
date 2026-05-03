import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { supabase } from '@/lib/supabase';

export interface NewsArticle {
    id: number;
    title: { ar: string; fr: string };
    date: { ar: string; fr: string };
    description: { ar: string; fr: string };
    imageUrl: string;
    tag: { ar: string; fr: string };
}

const initialArticles: NewsArticle[] = [
    {
        id: 1,
        title: {
            ar: "تدشين محطة البث الرقمي الأرضي TNT ونقل البث الإذاعي إلى البرج الجديد",
            fr: "Inauguration de la station de diffusion numérique terrestre TNT"
        },
        date: { ar: "2025", fr: "2025" },
        description: {
            ar: "تدشين رسمي لخدمات البث الرقمي الأرضي TNT في موريتانيا، ونقل خدمات الراديو إلى البرج الجديد. يهدف هذا المشروع إلى تحديث البنية التحتية للبث الوطني وضمان جودة أفضل للمشاهدين.",
            fr: "Lancement officiel des services TNT en Mauritanie et transfert des services radio vers la nouvelle tour. Ce projet vise à moderniser l'infrastructure de diffusion nationale et à garantir une meilleure qualité pour les téléspectateurs."
        },
        imageUrl: "https://siteweb.tdm.mr/wp-content/uploads/2025/03/TDM4-2.jpg",
        tag: { ar: "تقنية", fr: "Technologie" }
    },
    {
        id: 2,
        title: {
            ar: "إيجاز صحفي: تدشين مقرات جديدة لشركة البث الإذاعي والتلفزي الموريتاني",
            fr: "Inauguration de nouveaux sièges de la Télédiffusion de Mauritanie"
        },
        date: { ar: "2025", fr: "2025" },
        description: {
            ar: "افتتاح مقرات حديثة لتحسين ظروف العمل لموظفي شركة البث الإذاعي والتلفزي الموريتاني، مما يساهم في رفع كفاءة الأداء المؤسسي ومواكبة التطورات الإدارية الحديثة.",
            fr: "Inauguration de nouveaux bureaux modernes pour améliorer les conditions de travail des employés de la TDM, contribuant ainsi à accroître l'efficacité institutionnelle."
        },
        imageUrl: "https://siteweb.tdm.mr/wp-content/uploads/2025/03/MOCTAR-300x225-3.jpg",
        tag: { ar: "مؤسسة", fr: "Institutionnel" }
    },
    {
        id: 3,
        title: {
            ar: "وزير الثقافة والصناعة التقليدية والعلاقات مع البرلمان يزور شركة التلفزيون الموريتانية",
            fr: "Le Ministre de la Culture visite la Télédiffusion de Mauritanie"
        },
        date: { ar: "26/08/2020", fr: "26/08/2020" },
        description: {
            ar: "زيارة تفتيشية للاطلاع على حالة المعدات وخدمات البث التلفزيوني في الشركة، والتأكيد على ضرورة الالتزام بالمعايير الفنية العالية في الأداء.",
            fr: "Visite d'inspection pour s'enquérir de l'état des équipements et des services de télédiffusion, soulignant la nécessité d'adhérer à des normes techniques élevées."
        },
        imageUrl: "https://siteweb.tdm.mr/wp-content/uploads/2025/08/WhatsApp-Image-2026-02-23-at-16.58.28.jpeg",
        tag: { ar: "زيارات", fr: "Visites" }
    },
    {
        id: 4,
        title: {
            ar: "نواكشوط – حفل إفطار شركة البث الإذاعي والتلفزي الموريتاني (TDM)",
            fr: "Nouakchott – Iftar de la Télédiffusion de Mauritanie (TDM)"
        },
        date: { ar: "رمضان 2025", fr: "Ramadan 2025" },
        description: {
            ar: "تنظيم حفل إفطار جماعي لتعزيز الروابط بين إطارات وموظفي الشركة، في جو يسوده التآخي والتقدير للجهود المبذولة طيلة العام.",
            fr: "Organisation d'un Iftar collectif pour renforcer les liens entre les cadres et les employés de la société, dans une atmosphère de fraternité et d'appréciation."
        },
        imageUrl: "https://siteweb.tdm.mr/wp-content/uploads/2025/08/WhatsApp-Image-2025-07-21-a-22.33.53_1cb61f96.jpg",
        tag: { ar: "فعاليات", fr: "Événements" }
    },
    {
        id: 5,
        title: {
            ar: "انتخاب موريتانيا عضواً في مجلس إدارة عربسات",
            fr: "La Mauritanie élue membre du conseil d'Administration d'Arabsat"
        },
        date: { ar: "2024", fr: "2024" },
        description: {
            ar: "اعتراف دولي بخبرة موريتانيا في مجال البث الإذاعي والتلفزي، مما يعزز مكانة البلاد في المنظمات الإقليمية المختصة بالاتصالات الفضائية.",
            fr: "Une reconnaissance internationale de l'expertise mauritanienne dans le domaine de la télédiffusion, renforçant la position du pays dans les organisations régionales."
        },
        imageUrl: "https://siteweb.tdm.mr/wp-content/uploads/2025/03/cropped-%D8%B4%D8%B9%D8%A7%D8%B1-tdm-3.jpg",
        tag: { ar: "دولي", fr: "International" }
    }
];

interface NewsState {
    articles: NewsArticle[];
    isLoading: boolean;
    fetchArticles: () => Promise<void>;
    addArticle: (article: NewsArticle) => Promise<void>;
    updateArticle: (id: number, updatedArticle: Partial<NewsArticle>) => Promise<void>;
    deleteArticle: (id: number) => Promise<void>;
    syncAllToCloud: () => Promise<void>;
    getArticleById: (id: number) => NewsArticle | undefined;
    resetArticles: () => void;
}

export const useNewsStore = create<NewsState>()(
    persist(
        (set, get) => ({
            articles: initialArticles,
            isLoading: false,
            
            syncAllToCloud: async () => {
                set({ isLoading: true });
                const currentArticles = get().articles;
                const uploadPromises = currentArticles.map(article => {
                    return supabase.from('news').upsert({
                        title_ar: article.title.ar,
                        title_fr: article.title.fr,
                        desc_ar: article.description.ar,
                        desc_fr: article.description.fr,
                        tag_ar: article.tag.ar,
                        tag_fr: article.tag.fr,
                        image_url: article.imageUrl,
                        date_ar: article.date.ar,
                        date_fr: article.date.fr
                    });
                });
                await Promise.all(uploadPromises);
                set({ isLoading: false });
            },
                try {
                    set({ isLoading: true });
                    const { data, error } = await supabase.from('news').select('*').order('id', { ascending: false });
                    
                    if (!error && data && data.length > 0) {
                        const mappedArticles = data.map(item => ({
                            id: item.id,
                            title: { ar: item.title_ar || '', fr: item.title_fr || '' },
                            date: { ar: item.date_ar || '', fr: item.date_fr || '' },
                            description: { ar: item.desc_ar || '', fr: item.desc_fr || '' },
                            imageUrl: item.image_url || '',
                            tag: { ar: item.tag_ar || '', fr: item.tag_fr || '' }
                        }));
                        set({ articles: mappedArticles, isLoading: false });
                    } else {
                        set({ isLoading: false });
                    }
                } catch (err) {
                    console.error('Fetch articles error:', err);
                    set({ isLoading: false });
                }
            },

            addArticle: async (article) => {
                const { data, error } = await supabase.from('news').insert([{
                    title_ar: article.title.ar,
                    title_fr: article.title.fr,
                    desc_ar: article.description.ar,
                    desc_fr: article.description.fr,
                    tag_ar: article.tag.ar,
                    tag_fr: article.tag.fr,
                    image_url: article.imageUrl,
                    date_ar: article.date.ar,
                    date_fr: article.date.fr
                }]).select();

                if (!error && data) {
                    const newArticle = { ...article, id: data[0].id };
                    set((state) => ({ articles: [newArticle, ...state.articles] }));
                } else {
                    set((state) => ({ articles: [article, ...state.articles] }));
                }
            },

            updateArticle: async (id, updatedArticle) => {
                const currentArticle = get().articles.find(a => a.id === id);
                if (!currentArticle) return;

                const fullArticle = { ...currentArticle, ...updatedArticle };
                
                await supabase.from('news').update({
                    title_ar: fullArticle.title.ar,
                    title_fr: fullArticle.title.fr,
                    desc_ar: fullArticle.description.ar,
                    desc_fr: fullArticle.description.fr,
                    tag_ar: fullArticle.tag.ar,
                    tag_fr: fullArticle.tag.fr,
                    image_url: fullArticle.imageUrl,
                    date_ar: fullArticle.date.ar,
                    date_fr: fullArticle.date.fr
                }).eq('id', id);

                set((state) => ({
                    articles: state.articles.map((a) =>
                        a.id === id ? fullArticle : a
                    )
                }));
            },

            deleteArticle: async (id) => {
                await supabase.from('news').delete().eq('id', id);
                set((state) => ({
                    articles: state.articles.filter((a) => a.id !== id)
                }));
            },

            getArticleById: (id) => {
                return get().articles.find((a) => a.id === id);
            },

            resetArticles: () => set({ articles: initialArticles }),
        }),
        {
            name: 'tdm-news-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
