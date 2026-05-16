import { constructMetadata } from '@/lib/metadata';
import { getDictionary } from '@/dictionaries';
import { TendersClient } from '@/components/TendersClient';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const dict = await getDictionary(locale as 'ar' | 'fr');
    return constructMetadata({
        title: dict.metadata.pages.tenders.title,
        description: dict.metadata.pages.tenders.description,
        locale,
        path: '/tenders',
    });
}

export default async function TendersPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    return <TendersClient locale={locale} />;
}
