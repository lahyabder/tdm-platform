import type { Metadata } from 'next';
import { Inter, Noto_Kufi_Arabic, Tajawal } from 'next/font/google';
import localFont from 'next/font/local';
import '../globals.css';
import { getDictionary } from '@/dictionaries';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/ui/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const notoKufi = Noto_Kufi_Arabic({ subsets: ['arabic'], variable: '--font-noto-kufi', display: 'swap' });
const tajawal = Tajawal({
    subsets: ['arabic'],
    weight: ['300', '400', '500', '700', '800', '900'],
    variable: '--font-tajawal',
    display: 'swap'
});

const louguiya = localFont({
    src: [
        {
            path: '../../../public/fonts/Louguiya.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/Louguiya-Bold.ttf',
            weight: '700',
            style: 'normal',
        },
    ],
    variable: '--font-louguiya',
    display: 'swap',
});

export const metadata: Metadata = {
    title: 'TDM platform',
    description: 'Official Demo Platform',
};

export default async function RootLayout({
    children,
    params,
}: Readonly<{
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}>) {
    const resolvedParams = await params;
    const locale = resolvedParams.locale;
    const isRtl = locale === 'ar';
    const dict = await getDictionary(locale as 'ar' | 'fr');

    return (
        <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'}>
            <body
                className={`${isRtl ? tajawal.variable + ' ' + louguiya.variable : inter.variable} font-sans antialiased text-slate-900 bg-slate-50 min-h-screen flex flex-col`}
            >
                <Navbar locale={locale} dict={dict.common} />
                <div className="flex-1 w-full bg-slate-50/50">
                    {children}
                </div>
                <Footer locale={locale} dict={dict.common} />
            </body>
        </html>
    );
}
