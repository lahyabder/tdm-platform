import { constructMetadata } from '@/lib/metadata';
import { getDictionary } from '@/dictionaries';
import { GalleryClient } from '@/components/GalleryClient';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const dict = await getDictionary(locale as 'ar' | 'fr');
    return constructMetadata({
        title: dict.metadata.pages.gallery.title,
        description: dict.metadata.pages.gallery.description,
        locale,
        path: '/gallery',
    });
}

export default async function GalleryPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    return <GalleryClient locale={locale} />;
}
