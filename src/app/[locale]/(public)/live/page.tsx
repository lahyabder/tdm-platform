import { constructMetadata } from '@/lib/metadata';
import { getDictionary } from '@/dictionaries';
import { LiveClient } from '@/components/LiveClient';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const dict = await getDictionary(locale as 'ar' | 'fr');
    return constructMetadata({
        title: dict.metadata.pages.live.title,
        description: dict.metadata.pages.live.description,
        locale,
        path: '/live',
    });
}

export default async function LivePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    return <LiveClient locale={locale} />;
}
