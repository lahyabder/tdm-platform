import { getPageContent } from '@/lib/content';

export default async function AboutPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const resolvedParams = await params;
    const locale = resolvedParams.locale;
    const content = await getPageContent(locale, 'about');

    return (
        <main className="max-w-4xl mx-auto px-6 py-16 animate-in fade-in duration-500">
            <h1 className="text-3xl md:text-4xl font-extrabold text-brand-green mb-12">
                {content.title}
            </h1>

            <div className="space-y-12">
                {Object.entries(content.sections).map(([key, section]: [string, any]) => (
                    <section key={key} className="bg-white p-8 rounded-sm shadow-sm border border-slate-200 border-l-4 border-l-brand-yellow">
                        <h2 className="text-2xl font-bold text-slate-800 mb-4">{section.title}</h2>
                        <div className="prose prose-slate max-w-none">
                            <p className="text-slate-600 leading-relaxed bg-brand-yellow/5 p-4 rounded-sm border border-brand-yellow/20 border-dashed">
                                {section.content}
                            </p>
                        </div>
                    </section>
                ))}
            </div>
        </main>
    );
}
