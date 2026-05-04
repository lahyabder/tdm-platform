
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jphyerbmffagpemibyfj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwaHllcmJtZmZhZ3BlbWlieWZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3NTM0NTQsImV4cCI6MjA5MzMyOTQ1NH0.bzBa8CNgAP4OKqe2ghieVkv4m4juyAvWtIQEdWTcBS8';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const dttService = {
    id: 'dtt',
    title: { 
        ar: 'البث التلفزيوني الأرضي (DTT)', 
        fr: 'Télévision Numérique Terrestre (TNT/DTT)' 
    },
    description: { 
        ar: 'تعهدت موريتانيا بالتحول الكامل إلى البث الرقمي الأرضي لضمان السيادة الإعلامية واستغلال أمثل للترددات. تتيح هذه الخدمة بث أكثر من 30 قناة تلفزيونية و21 محطة إذاعية بجودة عالية وبشكل مستقل عن الأقمار الصناعية.',
        fr: 'La Mauritanie s\'est engagée dans la transition vers le numérique terrestre (TNT) pour assurer la souveraineté médiatique. Ce service permet la diffusion de plus de 30 chaînes TV et 21 stations radio en haute qualité, indépendamment du satellite.'
    }
};

async function updateServices() {
    console.log('Updating services content...');
    
    const { data: existingData } = await supabase
        .from('page_content')
        .select('content')
        .eq('page_key', 'services')
        .single();

    let currentItems = [];
    if (existingData && existingData.content && existingData.content.sections) {
        currentItems = existingData.content.sections.items || [];
    } else {
        currentItems = [
            { 
                id: 'tv', 
                title: { ar: "البث التلفزي الرقمي", fr: "Diffusion TV Numérique" }, 
                description: { ar: "نقدم حلول بث تلفزيوني رقمي بمعايير عالمية، تضمن وصول الصورة والصوت بوضوح فائق لكافة المشاهدين.", fr: "Solutions de diffusion TV numérique aux standards mondiaux, garantissant une clarté exceptionnelle." }
            },
            { 
                id: 'radio', 
                title: { ar: "البث الإذاعي (FM)", fr: "Diffusion Radio (FM)" }, 
                description: { ar: "شبكة بث إذاعي متطورة تغطي كافة الولايات الموريتانية، مع ضمان نقاء الصوت واستمرارية الخدمة.", fr: "Réseau de diffusion radio avancé couvrant toutes les wilayas, assurant la pureté sonore." }
            }
        ];
    }

    const index = currentItems.findIndex(item => item.id === 'dtt');
    if (index !== -1) {
        currentItems[index] = { ...currentItems[index], ...dttService };
    } else {
        currentItems.push(dttService);
    }

    const newContent = {
        id: 'services',
        title: { ar: "حلول تقنية متكاملة", fr: "Solutions Technologiques" },
        sections: { items: currentItems }
    };

    const { error } = await supabase
        .from('page_content')
        .upsert({ 
            page_key: 'services', 
            content: newContent,
            updated_at: new Date().toISOString()
        }, { onConflict: 'page_key' });

    if (error) {
        console.error('Error updating services:', error.message);
    } else {
        console.log('Successfully updated services content with DTT ID.');
    }
}

updateServices();
