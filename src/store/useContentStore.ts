import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export interface PageContent {
    title: string;
    sections: Record<string, any>;
}

const initialAboutContent: PageContent = {
    title: "",
    sections: {
        director_word: {
            title: "مرحبا",
            author: "د. محمد ولد سيد أحمد فال ول الوداني",
            image: "/images/dg.png",
            content: "شركاؤنا وزوارنا الأعزاء،\nيسعدني أن أرحب بكم في الموقع المحدث لشركة البث الإذاعي والتلفزي الموريتاني (www.tdm.gov.mr)، والذي صُمم لتعزيز التفاعل المستمر، مع تصفح سلس وسهل الاستخدام.\nتوفر لكم هذه البوابة وصولاً مباشراً إلى أهم إنجازاتنا، وتوجهاتنا الاستراتيجية، بالإضافة إلى مختلف المنشورات ذات المصلحة العامة. إنها تجسد إرادتنا في وضع الاتصال في قلب التنمية الوطنية، تماشياً مع برنامج رئيس الجمهورية، صاحب الفخامة السيد محمد ولد الشيخ الغزواني، لصالح مجتمع شامل وسلمي ومنسجم.\nتهدف إعادة هيكلة المشهد السمعي البصري الموريتاني إلى تزويد البلاد ببنى تحتية حديثة، تضمن الحق في الإعلام، وتكرس مبادئ الحكامة الرشيدة، والشفافية، والعدالة الاجتماعية."
        },
        who_are_we: {
            title: "من نحن؟",
            content: "شركة البث الإذاعي والتلفزي الموريتاني (TDM) هي المؤسسة الوطنية المسؤولة عن تشغيل وتطوير شبكات البث الإذاعي والتلفزي في موريتانيا. نحن نعمل على ضمان وصول البث إلى كافة ربوع الوطن بجودة عالية وبأحدث التقنيات الرقمية."
        },
        our_vision: {
            title: "رؤيتنا",
            content: "نسعى لأن نكون الرائد الإقليمي في مجال البث الرقمي، من خلال تحديث شامل للبنية التحتية والمساهمة الفعالة في التحول الرقمي لموريتانيا، مع الالتزام بالمعايير الدولية للجودة والابتكار."
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
            pages: {
                about: initialAboutContent
            },
            updatePageContent: (pageKey, content) =>
                set((state) => ({
                    pages: {
                        ...state.pages,
                        [pageKey]: content
                    }
                })),
            getPageContent: (pageKey) => {
                return get().pages[pageKey] || { title: "", sections: {} };
            },
        }),
        {
            name: 'tdm-content-storage',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
