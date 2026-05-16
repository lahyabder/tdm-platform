import { constructMetadata } from '@/lib/metadata';
import { getDictionary } from '@/dictionaries';
import { AboutClient } from '@/components/AboutClient';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const dict = await getDictionary(locale as 'ar' | 'fr');
    return constructMetadata({
        title: dict.metadata.pages.about.title,
        description: dict.metadata.pages.about.description,
        locale,
        path: '/about',
    });
}

export default async function AboutPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    return <AboutClient locale={locale} />;
}
