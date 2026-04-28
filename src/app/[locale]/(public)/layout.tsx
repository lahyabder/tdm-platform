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
            <ScrollToTop />
            <Navbar locale={locale} dict={dict.common} />
            <div className="flex-1 w-full bg-slate-50/50">
                {children}
            </div>
            <Footer locale={locale} dict={dict.common} />
        </>
    );
}
