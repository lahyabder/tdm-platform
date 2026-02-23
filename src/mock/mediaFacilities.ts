export interface MediaFacility {
    ref: string;
    name: { ar: string; fr: string };
    type: 'tv' | 'radio' | 'data';
    city: { ar: string; fr: string };
    status: 'active' | 'expired' | 'suspended' | 'renewing';
    expiryDate: string; // ISO format YYYY-MM-DD
    legislationRef: string;
}

export const mediaFacilities: MediaFacility[] = [
    {
        ref: "TV-2023-001",
        name: { ar: "قناة الموريتانية", fr: "El Mouritaniya TV" },
        type: "tv",
        city: { ar: "نواكشوط", fr: "Nouakchott" },
        status: "active",
        expiryDate: "2027-12-31",
        legislationRef: "Loi 045-2010 Art. 12"
    },
    {
        ref: "RAD-2022-045",
        name: { ar: "إذاعة موريتانيا", fr: "Radio Mauritanie" },
        type: "radio",
        city: { ar: "نواكشوط", fr: "Nouakchott" },
        status: "active",
        expiryDate: "2028-05-15",
        legislationRef: "Loi 045-2010 Art. 14"
    },
    {
        ref: "TV-2021-088",
        name: { ar: "قناة الساحل", fr: "Sahel TV" },
        type: "tv",
        city: { ar: "نواكشوط", fr: "Nouakchott" },
        status: "renewing",
        expiryDate: "2026-03-01", // expiring soon (< 30 days hypothetically if today was Jan/Feb)
        legislationRef: "Loi 045-2010 Art. 12"
    },
    {
        ref: "RAD-2020-012",
        name: { ar: "إذاعة كوبني", fr: "Radio Kobeni" },
        type: "radio",
        city: { ar: "كوبني", fr: "Kobeni" },
        status: "expired",
        expiryDate: "2025-12-31",
        legislationRef: "Loi 045-2010 Art. 14"
    },
    {
        ref: "DAT-2024-002",
        name: { ar: "شبكة شنقيتل للبيانات", fr: "Chinguittel Data Network" },
        type: "data",
        city: { ar: "نواذيبو", fr: "Nouadhibou" },
        status: "active",
        expiryDate: "2029-01-01",
        legislationRef: "Décret 112-2015"
    },
    {
        ref: "TV-2019-033",
        name: { ar: "قناة المرابطون", fr: "Al Mourabitoun TV" },
        type: "tv",
        city: { ar: "نواكشوط", fr: "Nouakchott" },
        status: "active",
        expiryDate: "2026-06-30",
        legislationRef: "Loi 045-2010 Art. 12"
    }
];
