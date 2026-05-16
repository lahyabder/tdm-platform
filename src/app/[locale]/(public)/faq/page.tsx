import { constructMetadata } from '@/lib/metadata';
import { getDictionary } from '@/dictionaries';
import { FAQClient } from '@/components/FAQClient';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const dict = await getDictionary(locale as 'ar' | 'fr');
    return constructMetadata({
        title: dict.metadata.pages.faq.title,
        description: dict.metadata.pages.faq.description,
        locale,
        path: '/faq',
    });
}

export default async function FAQPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    return <FAQClient locale={locale} />;
}
