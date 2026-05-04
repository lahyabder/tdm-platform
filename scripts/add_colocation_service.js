
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jphyerbmffagpemibyfj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwaHllcmJtZmZhZ3BlbWlieWZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3NTM0NTQsImV4cCI6MjA5MzMyOTQ1NH0.bzBa8CNgAP4OKqe2ghieVkv4m4juyAvWtIQEdWTcBS8';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const colocationService = {
    id: 'colocation',
    title: { 
        ar: 'التجميع المشترك والتأجير', 
        fr: 'Colocalisation et Location d\'Infrastructure' 
    },
    description: { 
        ar: 'تتيح TDM لشركائها من القنوات الإذاعية والتلفزيونية ومشغلي الاتصالات فرصة استغلال بنيتها التحتية الموزعة وطنياً، مما يساهم في تقليص التكاليف وتسريع النشر.',
        fr: 'La TDM offre à ses partenaires (TV, Radio, Télécoms) la possibilité d\'exploiter son infrastructure nationale, réduisant les coûts et accélérant le déploiement.'
    }
};

async function updateServices() {
    console.log('Updating services content with Colocation...');
    
    const { data: existingData } = await supabase
        .from('page_content')
        .select('content')
        .eq('page_key', 'services')
        .single();

    let currentItems = [];
    if (existingData && existingData.content && existingData.content.sections) {
        currentItems = existingData.content.sections.items || [];
    }

    const index = currentItems.findIndex(item => item.id === 'colocation');
    if (index !== -1) {
        currentItems[index] = { ...currentItems[index], ...colocationService };
    } else {
        currentItems.push(colocationService);
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
        console.log('Successfully updated services content with Colocation ID.');
    }
}

updateServices();
