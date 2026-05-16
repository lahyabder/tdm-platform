import { constructMetadata } from '@/lib/metadata';
import { getDictionary } from '@/dictionaries';
import { getPageContent } from '@/lib/content';
import { AnimatedHome } from '@/components/AnimatedHome';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const dict = await getDictionary(locale as 'ar' | 'fr');
    return constructMetadata({
        title: dict.metadata.pages.home.title,
        description: dict.metadata.pages.home.description,
        locale,
        path: '',
    });
}

export const dynamic = 'force-dynamic';

export default async function Home({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const resolvedParams = await params;
    const locale = resolvedParams.locale;
    const content = await getPageContent(locale, 'home');

    return (
        <main className="flex flex-col min-h-screen">
            <AnimatedHome locale={locale} content={content} />
        </main>
    );
}
