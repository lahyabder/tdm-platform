export type TenderCategory = 'announcement' | 'result' | 'report' | 'plan';

export interface Tender {
    id: string;
    title: { ar: string; fr: string };
    year: number;
    category: TenderCategory;
    date: string;
    pdfUrl: string;
}

export const tendersData: Tender[] = [
    {
        id: "DAO-001-2024",
        year: 2024,
        category: "announcement",
        date: "2024-01-15",
        title: {
            ar: "عرض سعر لتوريد معدات بث رقمي",
            fr: "Appel d'offres pour la fourniture d'équipements de diffusion numérique"
        },
        pdfUrl: "/docs/tenders/dao-001-2024.pdf"
    },
    {
        id: "RES-005-2023",
        year: 2023,
        category: "result",
        date: "2023-11-20",
        title: {
            ar: "نتائج المناقصة رقم 012/2023 المتعلقة بصيانة المحطات",
            fr: "Résultats de l'appel d'offres 012/2023 relatif à la maintenance des stations"
        },
        pdfUrl: "/docs/tenders/res-005-2023.pdf"
    },
    {
        id: "REP-CPMP-2023",
        year: 2023,
        category: "report",
        date: "2024-01-05",
        title: {
            ar: "التقرير السنوي للجنة إبرام الصفقات العمومية لسنة 2023",
            fr: "Rapport annuel de la CPMP pour l'année 2023"
        },
        pdfUrl: "/docs/tenders/rep-cpmp-2023.pdf"
    },
    {
        id: "PLAN-2024-V1",
        year: 2024,
        category: "plan",
        date: "2024-01-01",
        title: {
            ar: "الخطة السنوية لصفقات المؤسسة لسنة 2024",
            fr: "Plan annuel de passation des marchés 2024"
        },
        pdfUrl: "/docs/tenders/plan-2024.pdf"
    }
];
