import { INITIAL_CONTENT } from '@/store/useContentStore';

export async function getPageContent(locale: string, pageKey: string) {
    const page = INITIAL_CONTENT[pageKey];
    if (!page) return { title: "", sections: {} };

    // Return the content in a format expected by the components
    // but now they use the bilingual store anyway.
    // This is mainly for initial server-side load.
    return {
        title: page.title[locale as 'ar' | 'fr'],
        sections: page.sections
    };
}

export async function getServiceDetailContent(locale: string, id: string) {
    // For now returning null or generic as we focus on the main pages store
    return null;
}
