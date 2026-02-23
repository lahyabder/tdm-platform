export interface Project {
    id: string;
    title: { ar: string; fr: string };
    description: { ar: string; fr: string };
    fullContent: { ar: string; fr: string };
    status: 'ongoing' | 'completed';
    category: { ar: string; fr: string };
    startDate: string;
    completionDate?: string;
    progress: number;
    image: string;
    goals: { ar: string[]; fr: string[] };
}

export const projectsData: Project[] = [
    {
        id: "hq-building",
        title: {
            ar: "مشروع بناء المقر الجديد للمؤسسة",
            fr: "Projet de construction du nouveau siège de la TDM"
        },
        description: {
            ar: "تطوير مقر عصري مجهز بأحدث تكنولوجيات البث الرقمي والإنتاج الإعلامي.",
            fr: "Développement d'un siège moderne équipé des dernières technologies de diffusion et de production."
        },
        fullContent: {
            ar: "يهدف هذا المشروع الاستراتيجي إلى توفير بيئة عمل متطورة تليق بمكانة مؤسسة البث الإذاعي والتلفزي الموريتاني. يتكون المشروع من مجمع إداري وتقني متكامل يضم استوديوهات إنتاج حديثة، غرف تحكم رقمية، ومركز بيانات عالمي المواصفات.",
            fr: "Ce projet stratégique vise à fournir un environnement de travail avancé digne de la TDM. Le projet consiste en un complexe administratif et technique intégré comprenant des studios de production modernes, des salles de contrôle numériques et un centre de données aux spécifications internationales."
        },
        status: "ongoing",
        category: { ar: "بنية تحتية", fr: "Infrastructure" },
        startDate: "2023-06-01",
        progress: 65,
        image: "/images/projects/hq-placeholder.jpg",
        goals: {
            ar: [
                "تحديث البنية التحتية التقنية للمؤسسة",
                "مركزية جميع العمليات الإدارية والفنية",
                "توفير فضاءات تدريب للكوادر الإعلامية"
            ],
            fr: [
                "Modernisation de l'infrastructure technique",
                "Centralisation de toutes les opérations",
                "Espaces de formation pour les cadres médiatiques"
            ]
        }
    },
    {
        id: "digital-transition",
        title: {
            ar: "الانتقال الوطني للبث الرقمي الأرضي (TNT)",
            fr: "Transition vers la Télévision Numérique Terrestre (TNT)"
        },
        description: {
            ar: "مشروع وطني يهدف لتحديث شبكات البث الأرضي وتوفير جودة عالية للمشاهدين.",
            fr: "Projet national visant à moderniser les réseaux de diffusion et à offrir une haute qualité."
        },
        fullContent: {
            ar: "يعتبر مشروع TNT خطوة محورية في تاريخ البث في موريتانيا، حيث يسمح بتقديم باقات قنوات متنوعة بجودة HD، وتوفير طيف ترددي لاستخدامات أخرى. يغطي المشروع حالياً المدن الكبرى مع خطة توسع تدريجية.",
            fr: "Le projet TNT est une étape pivot dans l'histoire de la diffusion en Mauritanie, permettant d'offrir des bouquets de chaînes en qualité HD. Le projet couvre actuellement les grandes villes avec un plan d'expansion progressive."
        },
        status: "ongoing",
        category: { ar: "تكنولوجيا", fr: "Technologie" },
        startDate: "2020-01-15",
        progress: 85,
        image: "/images/projects/tnt-cover.jpg",
        goals: {
            ar: [
                "إيقاف البث التماثلي وتوفير الطاقة",
                "رفع جودة الصورة والصوت لكافة القنوات الوطنية",
                "توسيع نطاق التغطية ليشمل المناطق الريفية"
            ],
            fr: [
                "Arrêt de la diffusion analogique",
                "Amélioration de la qualité image et son",
                "Expansion de la couverture vers les zones rurales"
            ]
        }
    },
    {
        id: "fm-expansion",
        title: {
            ar: "توسيع تغطية الشبكة الإذاعية (FM)",
            fr: "Extension de la couverture du réseau FM"
        },
        description: {
            ar: "توسيع نطاق البث الإذاعي ليشمل المناطق الحدودية والريفية المعزولة.",
            fr: "Élargissement de la portée radio pour inclure les zones frontalières et rurales isolées."
        },
        fullContent: {
            ar: "يهدف هذا المشروع إلى ضمان وصول الخدمة الإذاعية الوطنية إلى كل مواطن موريتاني، خاصة في المناطق البعيدة. شملت المرحلة الأخيرة تركيب محطات بث في تناها، وعين أهل الطايع، ومركز أنجاكو الإداري.",
            fr: "Ce projet vise à garantir l'accès au service radio national à chaque citoyen mauritanien, en particulier dans les zones reculées. La dernière phase a inclus l'installation de stations à Tanaha, Aïn Ehel Taya et N’Diago."
        },
        status: "ongoing",
        category: { ar: "بنية تحتية", fr: "Infrastructure" },
        startDate: "2023-01-01",
        progress: 90,
        image: "/images/projects/fm-tower.jpg",
        goals: {
            ar: [
                "تغطية النقاط العمياء في الشبكة الوطنية",
                "تأمين البث في المناطق الحدودية",
                "تحسين جودة الاستقبال في المراكز الإدارية الجديدة"
            ],
            fr: [
                "Couverture des zones d'ombre",
                "Sécurisation de la diffusion frontalière",
                "Amélioration de la qualité de réception"
            ]
        }
    }
];
