export interface MediaFacility {
    ref: string;
    name: { ar: string; fr: string };
    type: 'tv' | 'radio' | 'data';
    city: { ar: string; fr: string };
    status: 'active' | 'expired' | 'suspended' | 'renewing';
    expiryDate: string;
    legislationRef: string;
    logoUrl?: string;
}

export const mediaFacilities: MediaFacility[] = [
    // ── قنوات تلفزيونية ──────────────────────────────────────────
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
        ref: "TV-2022-002",
        name: { ar: "الموريتانية 2", fr: "El Mouritaniya 2" },
        type: "tv",
        city: { ar: "نواكشوط", fr: "Nouakchott" },
        status: "active",
        expiryDate: "2027-06-30",
        legislationRef: "Loi 045-2010 Art. 12"
    },
    {
        ref: "TV-2020-003",
        name: { ar: "القناة الرياضية", fr: "Arriyadiya (Sport)" },
        type: "tv",
        city: { ar: "نواكشوط", fr: "Nouakchott" },
        status: "active",
        expiryDate: "2026-12-31",
        legislationRef: "Loi 045-2010 Art. 12"
    },
    {
        ref: "TV-2021-004",
        name: { ar: "القناة الثقافية", fr: "Athagafiya (Culture)" },
        type: "tv",
        city: { ar: "نواكشوط", fr: "Nouakchott" },
        status: "active",
        expiryDate: "2026-09-30",
        legislationRef: "Loi 045-2010 Art. 12"
    },
    {
        ref: "TV-2022-005",
        name: { ar: "قناة المحظرة", fr: "El Mahdara" },
        type: "tv",
        city: { ar: "نواكشوط", fr: "Nouakchott" },
        status: "active",
        expiryDate: "2027-03-31",
        legislationRef: "Loi 045-2010 Art. 13"
    },
    {
        ref: "TV-2020-006",
        name: { ar: "قناة شنقيط", fr: "Chinguitt TV" },
        type: "tv",
        city: { ar: "نواكشوط", fr: "Nouakchott" },
        status: "renewing",
        expiryDate: "2026-04-01",
        legislationRef: "Loi 045-2010 Art. 13"
    },
    {
        ref: "TV-2019-033",
        name: { ar: "قناة المرابطون", fr: "Al Mourabitoun TV" },
        type: "tv",
        city: { ar: "نواكشوط", fr: "Nouakchott" },
        status: "active",
        expiryDate: "2026-06-30",
        legislationRef: "Loi 045-2010 Art. 13"
    },
    {
        ref: "TV-2021-007",
        name: { ar: "القناة الوطنية", fr: "El Watania TV" },
        type: "tv",
        city: { ar: "نواكشوط", fr: "Nouakchott" },
        status: "active",
        expiryDate: "2026-11-30",
        legislationRef: "Loi 045-2010 Art. 13"
    },
    {
        ref: "TV-2021-088",
        name: { ar: "قناة الساحل", fr: "Sahel TV" },
        type: "tv",
        city: { ar: "نواكشوط", fr: "Nouakchott" },
        status: "renewing",
        expiryDate: "2026-03-01",
        legislationRef: "Loi 045-2010 Art. 13"
    },

    // ── إذاعات ───────────────────────────────────────────────────
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
        ref: "RAD-2021-011",
        name: { ar: "إذاعة القرآن الكريم", fr: "Radio Coran" },
        type: "radio",
        city: { ar: "نواكشوط", fr: "Nouakchott" },
        status: "active",
        expiryDate: "2027-12-31",
        legislationRef: "Loi 045-2010 Art. 14"
    },
    {
        ref: "RAD-2022-012",
        name: { ar: "إذاعة الشباب", fr: "Radio Jeunesse" },
        type: "radio",
        city: { ar: "نواكشوط", fr: "Nouakchott" },
        status: "active",
        expiryDate: "2027-08-31",
        legislationRef: "Loi 045-2010 Art. 14"
    },
    {
        ref: "RAD-2021-013",
        name: { ar: "إذاعة التنوير", fr: "Radio Tenwir" },
        type: "radio",
        city: { ar: "نواكشوط", fr: "Nouakchott" },
        status: "active",
        expiryDate: "2026-10-31",
        legislationRef: "Loi 045-2010 Art. 15"
    },
    {
        ref: "RAD-2023-014",
        name: { ar: "إذاعة موريتانيد", fr: "Radio Mauritanid" },
        type: "radio",
        city: { ar: "نواكشوط", fr: "Nouakchott" },
        status: "active",
        expiryDate: "2028-02-28",
        legislationRef: "Loi 045-2010 Art. 15"
    },
    {
        ref: "RAD-2020-012",
        name: { ar: "إذاعة كوبني", fr: "Radio Kobeni" },
        type: "radio",
        city: { ar: "كوبني", fr: "Kobeni" },
        status: "expired",
        expiryDate: "2025-12-31",
        legislationRef: "Loi 045-2010 Art. 15"
    },
    {
        ref: "RAD-2022-015",
        name: { ar: "إذاعة فرنسا الدولية (RFI)", fr: "RFI – Radio France Internationale" },
        type: "radio",
        city: { ar: "نواكشوط", fr: "Nouakchott" },
        status: "active",
        expiryDate: "2027-06-30",
        legislationRef: "Accord bilatéral 2019"
    },
    {
        ref: "RAD-2022-016",
        name: { ar: "إذاعة مونت كارلو الدولية", fr: "Monte Carlo Doualiya" },
        type: "radio",
        city: { ar: "نواذيبو", fr: "Nouadhibou" },
        status: "active",
        expiryDate: "2027-06-30",
        legislationRef: "Accord bilatéral 2019"
    },
    {
        ref: "RAD-2021-017",
        name: { ar: "إذاعة BBC", fr: "BBC World Service" },
        type: "radio",
        city: { ar: "نواكشوط", fr: "Nouakchott" },
        status: "active",
        expiryDate: "2026-12-31",
        legislationRef: "Accord bilatéral 2018"
    },
    {
        ref: "RAD-2021-018",
        name: { ar: "إذاعة BBC (نواديبو)", fr: "BBC World Service (Nouadhibou)" },
        type: "radio",
        city: { ar: "نواذيبو", fr: "Nouadhibou" },
        status: "active",
        expiryDate: "2026-12-31",
        legislationRef: "Accord bilatéral 2018"
    },
    {
        ref: "RAD-2023-019",
        name: { ar: "إذاعة الصين الدولية (CRI)", fr: "China Radio International (CRI)" },
        type: "radio",
        city: { ar: "نواكشوط", fr: "Nouakchott" },
        status: "active",
        expiryDate: "2028-09-30",
        legislationRef: "Accord bilatéral 2020"
    },
    {
        ref: "RAD-2022-020",
        name: { ar: "إذاعة سوا (Sawa)", fr: "Radio Sawa" },
        type: "radio",
        city: { ar: "نواكشوط", fr: "Nouakchott" },
        status: "active",
        expiryDate: "2027-03-31",
        legislationRef: "Accord bilatéral 2017"
    },
    {
        ref: "RAD-2023-021",
        name: { ar: "إذاعة ميدي 1 (Medi1)", fr: "Medi 1" },
        type: "radio",
        city: { ar: "نواكشوط", fr: "Nouakchott" },
        status: "active",
        expiryDate: "2028-01-31",
        legislationRef: "Accord bilatéral 2021"
    },

    // ── شبكات البيانات ────────────────────────────────────────────
    {
        ref: "DAT-2024-002",
        name: { ar: "شبكة شنقيتل للبيانات", fr: "Chinguittel Data Network" },
        type: "data",
        city: { ar: "نواذيبو", fr: "Nouadhibou" },
        status: "active",
        expiryDate: "2029-01-01",
        legislationRef: "Décret 112-2015"
    },
];
