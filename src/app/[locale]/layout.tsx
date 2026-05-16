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

import { constructMetadata } from '@/lib/metadata';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}): Promise<Metadata> {
    const { locale } = await params;
    return constructMetadata({ locale });
}

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
                className={`${tajawal.variable} ${inter.variable} ${notoKufi.variable} font-sans antialiased text-white bg-brand-dark min-h-screen flex flex-col`}
            >
                {children}
            </body>
        </html>
    );
}
