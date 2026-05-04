
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jphyerbmffagpemibyfj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwaHllcmJtZmZhZ3BlbWlieWZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3NTM0NTQsImV4cCI6MjA5MzMyOTQ1NH0.bzBa8CNgAP4OKqe2ghieVkv4m4juyAvWtIQEdWTcBS8';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const ottService = {
    id: 'ott',
    title: { 
        ar: 'دمج OTT في خدمات إدارة المحتوى الرقمي', 
        fr: 'Intégration OTT dans la Gestion de Contenu Numérique' 
    },
    description: { 
        ar: 'كجزء من انتقال توزيع المحتوى السمعي البصري إلى الإنترنت، تقدم TDM منصة OTT متكاملة تتيح الوصول للمحتوى في كل وقت ومكان وعلى كافة الأجهزة، مكملة للبنية التحتية للبث التقليدي.',
        fr: 'Dans le cadre de la transition numérique, la TDM propose une plateforme OTT intégrée permettant l\'accès au contenu partout et tout le temps sur tous les terminaux, complétant l\'infrastructure traditionnelle.'
    }
};

async function updateServices() {
    console.log('Updating services content with OTT...');
    
    const { data: existingData } = await supabase
        .from('page_content')
        .select('content')
        .eq('page_key', 'services')
        .single();

    let currentItems = [];
    if (existingData && existingData.content && existingData.content.sections) {
        currentItems = existingData.content.sections.items || [];
    }

    const index = currentItems.findIndex(item => item.id === 'ott');
    if (index !== -1) {
        currentItems[index] = { ...currentItems[index], ...ottService };
    } else {
        currentItems.push(ottService);
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
        console.log('Successfully updated services content with OTT ID.');
    }
}

updateServices();
