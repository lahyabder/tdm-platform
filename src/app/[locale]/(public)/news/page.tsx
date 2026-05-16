import { constructMetadata } from '@/lib/metadata';
import { getDictionary } from '@/dictionaries';
import { NewsClient } from '@/components/NewsClient';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const dict = await getDictionary(locale as 'ar' | 'fr');
    return constructMetadata({
        title: dict.metadata.pages.news.title,
        description: dict.metadata.pages.news.description,
        locale,
        path: '/news',
    });
}

export default async function NewsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    return <NewsClient locale={locale} />;
}
