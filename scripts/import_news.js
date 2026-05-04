
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jphyerbmffagpemibyfj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwaHllcmJtZmZhZ3BlbWlieWZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3NTM0NTQsImV4cCI6MjA5MzMyOTQ1NH0.bzBa8CNgAP4OKqe2ghieVkv4m4juyAvWtIQEdWTcBS8';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const newsData = [
    {
        title_ar: 'نواكشوط – حفل إفطار شركة البث الإذاعي والتلفزي الموريتاني (TDM)',
        title_fr: 'Nouakchott – Iftar organisé par la Télédiffusion de Mauritanie (TDM)',
        desc_ar: 'نظمت شركة البث الإذاعي والتلفزي الموريتاني مساء الجمعة، بمباني المؤسسة في نواكشوط، حفل إفطار على شرف موظفيها، وذلك في أجواء رمضانية تعكس روح التآخي والتقدير داخل المؤسسة. وخلال هذا الحفل، تم تكريم عدد من الموظفين تقديرًا لجهودهم وإسهاماتهم في تطوير العمل في المؤسسة. وقد حضر الحفل الأمين العام لوزارة الثقافة والفنون والاتصال والعلاقات مع البرلمان، إلى جانب عدد من المسؤولين وأطر المؤسسة.',
        desc_fr: 'La Télédiffusion de Mauritanie a organisé vendredi soir à Nouakchott un Iftar en l\'honneur de son personnel, dans une ambiance ramadanesque reflétant l\'esprit de fraternité. Lors de cette cérémonie, plusieurs employés ont été honorés pour leurs efforts et leurs contributions au développement de l\'institution.',
        tag_ar: 'أخبار',
        tag_fr: 'Actualités',
        image_url: 'https://siteweb.tdm.mr/wp-content/uploads/2026/03/WhatsApp-Image-2026-03-06-at-23.28.01-1-1.jpeg',
        date_ar: '7 مارس 2026',
        date_fr: '07 Mars 2026'
    },
    {
        title_ar: 'إيجاز صحفي : تدشين مقرات جديدة لشركة البث الإذاعي والتلفزي الموريتاني',
        title_fr: 'Communiqué : Inauguration de nouveaux sièges pour la TDM',
        desc_ar: 'أشرف معالي وزير الثقافة والفنون والاتصال والعلاقات مع البرلمان على تدشين خمسة مقار جهوية جديدة لشركة البث الإذاعي والتلفزي الموريتاني (TDM) في ولايات الحوض الشرقي، لعصابه، لبراكنه، اترارزه، ونواذيبو. ويهدف هذا الإنجاز إلى تقريب خدمات البث من المواطنين في الداخل وتحسين جودة التغطية الإعلامية الوطنية.',
        desc_fr: 'Le ministre de la Culture a supervisé l\'inauguration de cinq nouveaux sièges régionaux de la TDM dans les wilayas du Hodh Charghi, de l\'Assaba, du Brakna, du Trarza et de Dakhlet Nouadhibou. Cette réalisation vise à rapprocher les services de diffusion des citoyens à l\'intérieur du pays.',
        tag_ar: 'الأخبار',
        tag_fr: 'Actualités',
        image_url: 'https://siteweb.tdm.mr/wp-content/uploads/2025/08/WhatsApp-Image-2026-02-23-at-16.58.28.jpeg',
        date_ar: '23 فبراير 2026',
        date_fr: '23 Février 2026'
    },
    {
        title_ar: 'تدشين محطة البث الرقمي الأرضي TNT ونقل البث الإذاعي إلي البرج الجديد',
        title_fr: 'Inauguration de la station TNT et transfert de la radio vers le nouveau pylône',
        desc_ar: 'تم اليوم تدشين محطة البث الرقمي الأرضي (TNT) في نواكشوط، والتي تعد نقلة نوعية في تاريخ البث التلفزيوني الموريتاني. كما تم بنجاح نقل البث الإذاعي إلى البرج الجديد لتعزيز مدى التغطية وجودة الإرسال.',
        desc_fr: 'L\'inauguration de la station de Télévision Numérique Terrestre (TNT) à Nouakchott marque un tournant qualitatif dans l\'histoire de la télédiffusion en Mauritanie. Le transfert de la radio vers le nouveau pylône a également été achevé avec succès.',
        tag_ar: 'الأخبار',
        tag_fr: 'Actualités',
        image_url: 'https://siteweb.tdm.mr/wp-content/uploads/2025/08/WhatsApp-Image-2025-07-21-a-22.33.53_1cb61f96-1024x682.jpg',
        date_ar: '11 أغسطس 2025',
        date_fr: '11 Août 2025'
    },
    {
        title_ar: 'وزير العلاقات مع البرلمان يزور التلفزيون الموريتاني',
        title_fr: 'Le ministre des Relations avec le Parlement visite la Télévision de Mauritanie',
        desc_ar: 'قام وزير العلاقات مع البرلمان والمجتمع المدني والناطق الرسمي باسم الحكومة بزيارة تفقدية للتلفزيون الموريتاني، حيث اطلع على سير العمل في مختلف المصالح والأقسام الفنية.',
        desc_fr: 'Le ministre des Relations avec le Parlement et porte-parole du gouvernement a effectué une visite d\'inspection à la Télévision de Mauritanie, s\'informant du déroulement du travail dans les différents services techniques.',
        tag_ar: 'الأخبار',
        tag_fr: 'Actualités',
        image_url: 'https://siteweb.tdm.mr/wp-content/uploads/2025/03/MOCTAR-300x225-3.jpg',
        date_ar: '20 مايو 2025',
        date_fr: '20 Mai 2025'
    },
    {
        title_ar: 'دورة تدريبية لمديري مراكز توزيع TDM',
        title_fr: 'Session de formation pour les directeurs des centres de distribution TDM',
        desc_ar: 'نواكشوط, 10/03/2020 انطلقت اليوم الثلاثاء في نواكشوط دورة تدريبية لفائدة ستين مديرا لمراكز البث الإذاعي والتلفزي الموريتاني، تهدف إلى تطوير الكفاءات الإدارية والفنية للمسؤولين الجهويين.',
        desc_fr: 'Une session de formation pour soixante directeurs des centres de télédiffusion a débuté à Nouakchott, visant à développer les compétences administratives et techniques des responsables régionaux.',
        tag_ar: 'الأخبار',
        tag_fr: 'Actualités',
        image_url: 'https://siteweb.tdm.mr/wp-content/uploads/2025/03/MOCTAR-300x225-3.jpg',
        date_ar: '20 مايو 2025',
        date_fr: '20 Mai 2025'
    }
];

async function importNews() {
    console.log('Starting news import...');
    for (const article of newsData) {
        const { data, error } = await supabase
            .from('news')
            .insert([article]);

        if (error) {
            console.error(`Error inserting "${article.title_ar}":`, error.message);
        } else {
            console.log(`Successfully inserted: ${article.title_ar}`);
        }
    }
    console.log('Import finished.');
}

importNews();
