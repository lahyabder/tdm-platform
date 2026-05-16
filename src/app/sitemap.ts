import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://tdm.mr';
    const locales = ['ar', 'fr'];
    const paths = [
        '',
        '/about',
        '/services',
        '/live',
        '/data',
        '/news',
        '/projects',
        '/contact',
        '/gallery',
        '/faq',
        '/tenders',
    ];

    const sitemapEntries: MetadataRoute.Sitemap = [];

    locales.forEach((locale) => {
        paths.forEach((path) => {
            sitemapEntries.push({
                url: `${baseUrl}/${locale}${path}`,
                lastModified: new Date(),
                changeFrequency: path === '/news' ? 'daily' : 'monthly',
                priority: path === '' ? 1 : 0.8,
            });
        });
    });

    return sitemapEntries;
}
