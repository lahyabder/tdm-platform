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

export async function getServiceDetailContent(locale: string, id: string): Promise<any> {
    // Basic implementation to avoid build errors and 404s
    return {
        title: id.toUpperCase(),
        definition: "Service definition placeholder",
        audience: { title: "Audience", items: [] },
        steps: { title: "Steps", items: [] }
    };
}
