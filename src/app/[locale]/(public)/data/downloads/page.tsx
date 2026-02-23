import Link from 'next/link';

export default async function DownloadsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const resolvedParams = await params;
    const locale = resolvedParams.locale as "ar" | "fr";

    const content = {
        ar: {
            title: "نماذج وملفات للتحميل",
            subtitle: "استمارات التراخيص، دفاتر الشروط الفنية، والنماذج المتعلقة بالرسوم.",
            back: "العودة لبوابة البيانات",
            categories: {
                forms: "استمارات التسجيل",
                specs: "دفاتر الشروط",
                docs: "وثائق إرشادية"
            },
            files: [
                { id: "F-01", title: "استمارة طلب ترخيص بث إذاعي", type: "PDF", size: "2.4 MB", cat: "forms" },
                { id: "F-02", title: "نموذج تجديد رخصة تلفزيونية", type: "DOCX", size: "1.1 MB", cat: "forms" },
                { id: "S-01", title: "دفتر الشروط الفنية الخاص بالقنوات الفضائية", type: "PDF", size: "5.8 MB", cat: "specs" },
                { id: "S-02", title: "المعايير التقنية لأجهزة الإرسال الأرضية", type: "PDF", size: "3.2 MB", cat: "specs" },
                { id: "D-01", title: "دليل الإجراءات الإدارية للشبكات الجديدة", type: "PDF", size: "4.5 MB", cat: "docs" }
            ],
            downloadBtn: "تحميل"
        },
        fr: {
            title: "Formulaires et Téléchargements",
            subtitle: "Formulaires de licence, cahiers des charges techniques et modèles de frais.",
            back: "Retour au portail",
            categories: {
                forms: "Formulaires d'inscription",
                specs: "Cahiers des charges",
                docs: "Documents d'orientation"
            },
            files: [
                { id: "F-01", title: "Formulaire de demande de licence radiophonique", type: "PDF", size: "2.4 MB", cat: "forms" },
                { id: "F-02", title: "Formulaire de renouvellement de licence TV", type: "DOCX", size: "1.1 MB", cat: "forms" },
                { id: "S-01", title: "Cahier des charges pour les chaînes satellitaires", type: "PDF", size: "5.8 MB", cat: "specs" },
                { id: "S-02", title: "Normes techniques pour les émetteurs terrestres", type: "PDF", size: "3.2 MB", cat: "specs" },
                { id: "D-01", title: "Guide des procédures pour les nouveaux réseaux", type: "PDF", size: "4.5 MB", cat: "docs" }
            ],
            downloadBtn: "Télécharger"
        }
    }[locale];

    return (
        <main className="min-h-screen bg-slate-50 pb-24">
            {/* Header */}
            <section className="bg-slate-900 pt-24 pb-32 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-800"></div>
                <div className="absolute bottom-0 w-full h-1 bg-gradient-to-r from-brand-green via-brand-yellow to-brand-red"></div>
                <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
                    <Link href={`/${locale}/data`} className="inline-flex items-center gap-2 text-brand-red hover:underline mb-6 font-medium">
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
                    <div className="grid grid-cols-1 gap-4">
                        {content.files.map((file) => (
                            <div key={file.id} className="flex flex-col md:flex-row md:items-center justify-between p-5 rounded-lg border border-slate-100 hover:border-brand-red/30 hover:bg-slate-50 transition-all gap-4 group">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-red-50 text-brand-red flex items-center justify-center shrink-0">
                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-800 text-lg mb-1 group-hover:text-brand-red transition-colors">
                                            {file.title}
                                        </h3>
                                        <div className="flex items-center gap-3 text-sm text-slate-500">
                                            <span className="inline-block px-2.5 py-1 rounded-md bg-slate-100 font-medium text-xs">
                                                {content.categories[file.cat as keyof typeof content.categories]}
                                            </span>
                                            <span className="font-bold text-slate-400">{file.type}</span>
                                            <span>•</span>
                                            <span>{file.size}</span>
                                        </div>
                                    </div>
                                </div>
                                <button className="shrink-0 px-5 py-2.5 rounded-lg bg-brand-red text-white font-medium hover:bg-red-700 shadow-sm border border-transparent transition-all self-start md:self-auto flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                    {content.downloadBtn}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
    );
}
