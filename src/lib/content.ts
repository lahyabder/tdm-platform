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
    const fileId = id;
    
    try {
        // We use dynamic imports for JSON content
        const content = await import(`@/content/${locale}/services/${fileId}.json`);
        return content.default;
    } catch (e) {
        console.error(`Error loading service content for ${id} in ${locale}:`, e);
        
        // Fallback placeholders in case file is missing
        return {
            title: id.toUpperCase(),
            definition: locale === 'ar' ? 'تعريف الخدمة غير متوفر حالياً.' : 'La définition du service n\'est pas disponible.',
            audience: { 
                title: locale === 'ar' ? 'الفئات المستهدفة' : 'Public Cible', 
                items: [] 
            },
            steps: { 
                title: locale === 'ar' ? 'خطوات الاستفادة' : 'Comment en bénéficier', 
                items: [] 
            }
        };
    }
}
