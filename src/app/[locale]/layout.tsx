import type { Metadata } from 'next';
import { Inter, Noto_Kufi_Arabic, Tajawal } from 'next/font/google';
import localFont from 'next/font/local';
import '../globals.css';
import { getDictionary } from '@/dictionaries';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const notoKufi = Noto_Kufi_Arabic({ subsets: ['arabic'], variable: '--font-noto-kufi', display: 'swap' });
const tajawal = Tajawal({
    subsets: ['arabic'],
    weight: ['300', '400', '500', '700', '800', '900'],
    variable: '--font-tajawal',
    display: 'swap'
});

const louguiyaAr = localFont({
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

const louguiyaFr = localFont({
    src: [
        {
            path: '../../../public/fonts/LouguiyaFR.ttf',
            weight: '400',
            style: 'normal',
        },
        {
            path: '../../../public/fonts/LouguiyaFR-Bold.ttf',
            weight: '700',
            style: 'normal',
        },
    ],
    variable: '--font-louguiya-fr',
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

    return (
        <html lang={locale} dir={isRtl ? 'rtl' : 'ltr'}>
            <body
                className={`${isRtl ? louguiyaAr.className : louguiyaFr.className} ${tajawal.variable} ${inter.variable} ${notoKufi.variable} font-sans antialiased text-slate-900 bg-slate-50 min-h-screen flex flex-col`}
            >
                {children}
            </body>
        </html>
    );
}
