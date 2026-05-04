
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://jphyerbmffagpemibyfj.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpwaHllcmJtZmZhZ3BlbWlieWZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc3NTM0NTQsImV4cCI6MjA5MzMyOTQ1NH0.bzBa8CNgAP4OKqe2ghieVkv4m4juyAvWtIQEdWTcBS8';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function cleanupServices() {
    console.log('Cleaning up services IDs...');
    
    const { data: existingData } = await supabase
        .from('page_content')
        .select('content')
        .eq('page_key', 'services')
        .single();

    if (!existingData || !existingData.content || !existingData.content.sections) return;

    let items = existingData.content.sections.items || [];
    
    // Remove dtt-service if dtt exists, or rename it
    items = items.filter(i => i.id !== 'dtt-service');

    const newContent = {
        ...existingData.content,
        sections: { items }
    };

    const { error } = await supabase
        .from('page_content')
        .upsert({ 
            page_key: 'services', 
            content: newContent,
            updated_at: new Date().toISOString()
        }, { onConflict: 'page_key' });

    if (error) {
        console.error('Error cleaning up:', error.message);
    } else {
        console.log('Successfully cleaned up services.');
    }
}

cleanupServices();
