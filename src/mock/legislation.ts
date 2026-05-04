export interface Legislation {
    id: string;
    title: { ar: string; fr: string };
    type: 'law' | 'decree' | 'order';
    year: number;
    url: string;
}

export const legislationData: Legislation[] = [
    {
        id: "LOI-045-2010",
        title: { ar: "القانون 045-2010 المتعلق بالاتصال السمعي البصري", fr: "Loi 045-2010 relative à la communication audiovisuelle" },
        type: "law",
        year: 2010,
        url: "/documents/legislation/LOI-045-2010.pdf"
    },
    {
        id: "DECRET-112-2015",
        title: { ar: "المرسوم 112-2015 المتعلق بخدمات البيانات", fr: "Décret 112-2015 relatif aux services de données" },
        type: "decree",
        year: 2015,
        url: "/documents/legislation/DECRET-112-2015.pdf"
    },
    {
        id: "LOI-024-2007",
        title: { ar: "القانون 024-2007 المنظم للصحافة", fr: "Loi 024-2007 réglementant la presse" },
        type: "law",
        year: 2007,
        url: "/documents/legislation/LOI-024-2007.pdf"
    },
    {
        id: "ORDRE-2023-V1",
        title: { ar: "قرار تنظيمي رقم 2023-V1", fr: "Arrêté réglementaire 2023-V1" },
        type: "order",
        year: 2023,
        url: "/documents/legislation/ORDRE-2023-V1.pdf"
    }
];
