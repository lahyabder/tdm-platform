import { constructMetadata } from '@/lib/metadata';
import { getDictionary } from '@/dictionaries';
import { ServicesClient } from '@/components/ServicesClient';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const dict = await getDictionary(locale as 'ar' | 'fr');
    return constructMetadata({
        title: dict.metadata.pages.services.title,
        description: dict.metadata.pages.services.description,
        locale,
        path: '/services',
    });
}

export default async function ServicesPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    return <ServicesClient locale={locale} />;
}
