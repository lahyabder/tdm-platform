import { constructMetadata } from '@/lib/metadata';
import { getDictionary } from '@/dictionaries';
import { ProjectsClient } from '@/components/ProjectsClient';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const dict = await getDictionary(locale as 'ar' | 'fr');
    return constructMetadata({
        title: dict.metadata.pages.projects.title,
        description: dict.metadata.pages.projects.description,
        locale,
        path: '/projects',
    });
}

export default async function ProjectsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    return <ProjectsClient locale={locale} />;
}
