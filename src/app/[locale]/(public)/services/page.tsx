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
                    <Link key={item.id} href={`/${locale}/services/${item.id}`} className="block group">
                        <div className="relative h-72 rounded-2xl overflow-hidden shadow-lg cursor-pointer border border-slate-800 hover:border-brand-green transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
                            {/* Background image */}
                            <div
                                className="absolute inset-0 w-full h-full bg-cover bg-center bg-slate-800 transition-transform duration-500 group-hover:scale-105"
                                style={{ backgroundImage: `url(/${item.id}.jpg)` }}
                                title={item.title}
                            />
                            {/* Dark overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/60 to-slate-800/20"></div>
                            {/* Hover accent line */}
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-green scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                            {/* Content */}
                            <div className="absolute inset-0 flex flex-col justify-end p-6">
                                <div className="w-10 h-10 bg-slate-800/80 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4 border border-white/10 group-hover:bg-brand-green/20 group-hover:border-brand-green/50 transition-colors">
                                    <svg className="w-5 h-5 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-extrabold text-white mb-2 group-hover:text-brand-green transition-colors">
                                    {item.title}
                                </h3>
                                <p className="text-slate-300 text-sm leading-relaxed line-clamp-2">
                                    {item.description}
                                </p>
                                <div className="mt-3 flex items-center text-xs font-bold text-brand-green opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                    {locale === 'ar' ? 'عرض التفاصيل ←' : 'Voir les détails →'}
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    );
}
