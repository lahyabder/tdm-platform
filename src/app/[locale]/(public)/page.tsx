import { getPageContent } from '@/lib/content';
import { AnimatedHome } from '@/components/AnimatedHome';

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
