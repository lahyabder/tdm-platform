import { getPageContent } from '@/lib/content';
import Link from 'next/link';

export default async function ServicesPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const resolvedParams = await params;
    const locale = resolvedParams.locale;
    const content = await getPageContent(locale, 'services');

    return (
        <main className="max-w-6xl mx-auto px-6 py-16 animate-in fade-in duration-500">
            <h1 className="text-3xl md:text-4xl font-extrabold text-brand-green mb-12 text-center">
                {content.title}
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {content.items.map((item: any) => (
                    <Link key={item.id} href={`/${locale}/services/${item.id}`} className="block">
                        <div className="bg-white p-6 rounded-sm shadow-sm border border-slate-200 hover:border-brand-green hover:shadow-md transition-all group h-full cursor-pointer relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-0 bg-brand-green transition-all duration-300 group-hover:h-full"></div>
                            <div className="w-16 h-16 bg-slate-50 text-brand-green rounded-full flex items-center justify-center mb-6 group-hover:bg-brand-green group-hover:text-white transition-colors border border-slate-100 group-hover:border-brand-green">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-brand-green transition-colors">{item.title}</h3>
                            <p className="text-slate-600 text-sm leading-relaxed mb-4">
                                {item.description}
                            </p>
                            <div className="mt-auto flex items-center text-sm font-bold text-brand-green opacity-0 group-hover:opacity-100 transition-opacity transform -translate-x-2 group-hover:translate-x-0 rtl:translate-x-2 rtl:group-hover:translate-x-0">
                                {locale === 'ar' ? 'عرض التفاصيل' : 'Voir les détails'} &rarr;
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
