import { legislationData } from '@/mock/legislation';
import Link from 'next/link';

export default async function LegalLibraryPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const resolvedParams = await params;
    const locale = resolvedParams.locale as "ar" | "fr";

    const content = {
        ar: {
            title: "مكتبة التشريعات والمرجعيات",
            subtitle: "النصوص القانونية والمراسيم والقرارات التنظيمية الخاصة بقطاع السمعي البصري.",
            back: "العودة לבوابة البيانات",
            searchPlaceholder: "ابحث عن قانون، مرسوم...",
            types: {
                law: "قانون",
                decree: "مرسوم",
                order: "قرار"
            },
            empty: "لا توجد تشريعات تطابق بحثك."
        },
        fr: {
            title: "Bibliothèque des Législations",
            subtitle: "Textes juridiques, décrets et arrêtés réglementaires du secteur audiovisuel.",
            back: "Retour au portail",
            searchPlaceholder: "Rechercher une loi, un décret...",
            types: {
                law: "Loi",
                decree: "Décret",
                order: "Arrêté"
            },
            empty: "Aucune législation ne correspond à votre recherche."
        }
    }[locale];

    return (
        <main className="min-h-screen bg-slate-50 pb-24">
            {/* Header */}
            <section className="bg-slate-900 pt-24 pb-32 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800"></div>
                <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-brand-green via-brand-yellow to-brand-red"></div>
                <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
                    <Link href={`/${locale}/data`} className="inline-flex items-center gap-2 text-brand-green hover:underline mb-6 font-medium">
                        {locale === 'ar' ? '←' : '→'} {content.back}
                    </Link>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">
                        {content.title}
                    </h1>
                    <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
                        {content.subtitle}
                    </p>
                </div>
            </section>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-6 -mt-16 relative z-20">
                <div className="bg-white rounded-xl shadow-lg border border-slate-200 p-6 md:p-8">
                    {/* Search Bar (Mock visual only for now) */}
                    <div className="mb-8">
                        <input
                            type="text"
                            placeholder={content.searchPlaceholder}
                            className="w-full px-5 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-brand-green/50 bg-slate-50 text-slate-800 transition-all"
                            disabled
                        />
                    </div>

                    <div className="space-y-4">
                        {legislationData.map((item) => (
                            <div key={item.id} className="group flex flex-col md:flex-row md:items-center justify-between p-5 rounded-lg border border-slate-100 hover:border-brand-green/30 hover:bg-slate-50 transition-all gap-4">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center shrink-0 group-hover:bg-brand-green/10 group-hover:text-brand-green transition-colors">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 text-lg mb-1 group-hover:text-brand-green transition-colors">
                                            {item.title[locale]}
                                        </h3>
                                        <div className="flex items-center gap-3 text-sm text-slate-500">
                                            <span className="inline-block px-2.5 py-1 rounded-md bg-slate-100 font-medium">
                                                {content.types[item.type]}
                                            </span>
                                            <span>•</span>
                                            <span>{item.year}</span>
                                            <span>•</span>
                                            <span className="font-mono text-xs">{item.id}</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="shrink-0 px-4 py-2 rounded-lg text-brand-green font-medium hover:bg-brand-green hover:text-white border border-brand-green/20 transition-all self-start md:self-auto">
                                    {locale === 'ar' ? 'عرض الوثيقة' : 'Voir le document'}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
