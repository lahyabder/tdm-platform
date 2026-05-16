import { Metadata } from 'next';
import { getDictionary } from '@/dictionaries';

const BASE_URL = 'https://tdm.mr';

export async function constructMetadata({
    title,
    description,
    image = '/logo.png',
    locale = 'ar',
    path = '',
    noIndex = false,
}: {
    title?: string;
    description?: string;
    image?: string;
    locale?: string;
    path?: string;
    noIndex?: boolean;
} = {}): Promise<Metadata> {
    const dict = await getDictionary(locale as 'ar' | 'fr');
    const metadata = dict.metadata;

    const pageTitle = title || metadata.defaultTitle;
    const pageDescription = description || metadata.defaultDescription;
    const url = `${BASE_URL}/${locale}${path}`;

    return {
        title: pageTitle,
        description: pageDescription,
        metadataBase: new URL(BASE_URL),
        alternates: {
            canonical: url,
            languages: {
                'ar': `/ar${path}`,
                'fr': `/fr${path}`,
                'x-default': `/ar${path}`,
            },
        },
        openGraph: {
            title: pageTitle,
            description: pageDescription,
            url: url,
            siteName: metadata.siteName,
            images: [
                {
                    url: image,
                    width: 1200,
                    height: 630,
                    alt: pageTitle,
                },
            ],
            locale: locale === 'ar' ? 'ar_MA' : 'fr_FR',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: pageTitle,
            description: pageDescription,
            images: [image],
            creator: '@tdm_mr',
        },
        icons: {
            icon: '/icon.png',
            shortcut: '/icon.png',
            apple: '/icon.png',
        },
        ...(noIndex && {
            robots: {
                index: false,
                follow: false,
            },
        }),
    };
}
