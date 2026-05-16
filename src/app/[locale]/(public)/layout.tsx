import { getDictionary } from '@/dictionaries';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/ui/Footer';
import { ScrollToTop } from '@/components/ScrollToTop';

export default async function PublicLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const resolvedParams = await params;
    const locale = resolvedParams.locale;
    const dict = await getDictionary(locale as 'ar' | 'fr');

    return (
        <>
            <a href="#main-content" className="skip-link">
                {locale === 'ar' ? 'تخطي إلى المحتوى' : 'Passer au contenu'}
            </a>
            <ScrollToTop />
            <Navbar locale={locale} dict={dict.common} />
            <div className="h-24" aria-hidden="true" />
            <main id="main-content" className="flex-1 w-full outline-none" tabIndex={-1}>
                {children}
            </main>
            <Footer locale={locale} dict={dict.common} />
        </>
    );
}
