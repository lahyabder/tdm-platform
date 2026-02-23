import { getServiceDetailContent } from '@/lib/content';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function ServiceDetailPage({
    params,
}: {
    params: Promise<{ locale: string; id: string }>;
}) {
    const resolvedParams = await params;
    const { locale, id } = resolvedParams;
    const content = await getServiceDetailContent(locale, id);

    if (!content) {
        return notFound();
    }

    return (
        <main className="min-h-screen bg-slate-50 pb-24">
            {/* 1. Header / Definition */}
            <section className="bg-slate-900 pt-24 pb-32 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-brand-green/20"></div>
                <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-brand-green via-brand-yellow to-brand-red"></div>
                <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                    <Link href={`/${locale}/services`} className="inline-block text-brand-green hover:text-white font-medium mb-8 text-sm opacity-80 transition-colors">
                        &larr; {locale === 'ar' ? 'العودة للخدمات' : 'Retour aux services'}
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                        {content.title}
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto border border-white/10 bg-white/5 backdrop-blur-sm p-6 rounded-sm shadow-xl">
                        {content.definition}
                    </p>
                </div>
            </section>

            <div className="max-w-4xl mx-auto px-6 -mt-16 space-y-12 relative z-20">

                {/* 2. Target Audience */}
                <div className="bg-white p-8 rounded-sm shadow-sm border border-slate-200 border-t-4 border-t-brand-green">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                        <div className="p-2 bg-brand-green/10 text-brand-green rounded-sm">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        </div>
                        {content.audience.title}
                    </h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {content.audience.items.map((item: string, i: number) => (
                            <li key={i} className="flex items-center gap-3 bg-slate-50 p-4 rounded-sm border border-slate-100">
                                <div className="w-2 h-2 bg-brand-green rounded-full"></div>
                                <span className="text-slate-700">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* 3. Steps / How to Benefit */}
                <div className="bg-white p-8 rounded-sm shadow-sm border border-slate-200 border-t-4 border-t-brand-yellow">
                    <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                        <div className="p-2 bg-brand-yellow/10 text-brand-yellow rounded-sm">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>
                        </div>
                        {content.steps.title}
                    </h2>
                    <div className="space-y-6 relative before:absolute before:inset-0 before:rtl:right-[1.1rem] before:ltr:left-[1.1rem] before:w-0.5 before:bg-slate-200 before:z-0">
                        {content.steps.items.map((step: any, i: number) => (
                            <div key={i} className="relative z-10 flex gap-6">
                                <div className="shrink-0 w-10 h-10 rounded-full bg-slate-100 border-2 border-brand-yellow flex items-center justify-center font-bold text-slate-700 shadow-sm">
                                    {step.step}
                                </div>
                                <div className="pt-2">
                                    <h3 className="text-lg font-bold text-slate-800 mb-2">{step.title}</h3>
                                    <p className="text-slate-600 bg-slate-50 p-4 rounded-sm border border-slate-100 text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* 4. Documents */}
                    <div className="bg-white p-8 rounded-sm shadow-sm border border-slate-200 border-t-4 border-t-brand-red">
                        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                            <div className="p-2 bg-brand-red/10 text-brand-red rounded-sm">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            </div>
                            {content.documents.title}
                        </h2>
                        <ul className="space-y-3">
                            {content.documents.items.map((doc: any, i: number) => (
                                <li key={i}>
                                    <a href={doc.url} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-sm hover:border-brand-red transition-colors group">
                                        <span className="font-semibold text-slate-700 text-sm">{doc.title}</span>
                                        <svg className="w-5 h-5 text-slate-400 group-hover:text-brand-red transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* 5. FAQ */}
                    <div className="bg-white p-8 rounded-sm shadow-sm border border-slate-200 border-t-4 border-t-slate-800">
                        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                            <div className="p-2 bg-slate-100 text-slate-800 rounded-sm">
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            {content.faq.title}
                        </h2>
                        <div className="space-y-4">
                            {content.faq.items.map((faq: any, i: number) => (
                                <details key={i} className="group bg-slate-50 border border-slate-200 rounded-sm overflow-hidden">
                                    <summary className="p-4 font-bold text-slate-800 cursor-pointer flex justify-between items-center outline-none focus-within:ring-2 focus-within:ring-brand-green/50">
                                        <span className="text-sm">{faq.question}</span>
                                        <span className="text-brand-green text-xl group-open:rotate-45 transition-transform">+</span>
                                    </summary>
                                    <div className="p-4 pt-0 text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                                        {faq.answer}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
