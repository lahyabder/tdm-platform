import { INITIAL_CONTENT } from '@/store/useContentStore';
import { supabase } from './supabase';

export async function getPageContent(locale: string, pageKey: string) {
    let content = INITIAL_CONTENT[pageKey];
    
    try {
        const { data, error } = await supabase
            .from('page_content')
            .select('content')
            .eq('page_key', pageKey)
            .single();

        if (data && !error) {
            content = data.content;
        }
    } catch (e) {
        console.error(`Error fetching content for ${pageKey}:`, e);
    }

    if (!content) return { title: "", sections: {} };

    return {
        title: content.title[locale as 'ar' | 'fr'],
        sections: content.sections
    };
}

export async function getServiceDetailContent(locale: string, id: string): Promise<any> {
    // Basic implementation to avoid build errors and 404s
    return {
        title: id.toUpperCase(),
        definition: "Service definition placeholder",
        audience: { title: "Audience", items: [] },
        steps: { title: "Steps", items: [] }
    };
}
