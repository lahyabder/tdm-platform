import { constructMetadata } from '@/lib/metadata';
import { getDictionary } from '@/dictionaries';
import { ContactClient } from '@/components/ContactClient';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const dict = await getDictionary(locale as 'ar' | 'fr');
    return constructMetadata({
        title: dict.metadata.pages.contact.title,
        description: dict.metadata.pages.contact.description,
        locale,
        path: '/contact',
    });
}

export default async function ContactPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    return <ContactClient locale={locale} />;
}
