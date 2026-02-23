import LicenseForm from '@/components/admin/LicenseForm';
import Link from 'next/link';

export default async function NewLicensePage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const resolvedParams = await params;
    const locale = resolvedParams.locale;

    const t = {
        ar: { title: "إصدار ترخيص جديد", back: "العودة للجدول" },
        fr: { title: "Délivrer une nouvelle licence", back: "Retour au tableau" }
    }[locale as 'ar' | 'fr'];

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <Link href={`/${locale}/admin/licenses`} className="text-brand-green hover:underline text-xs flex items-center gap-1 font-bold">
                    &larr; {t.back}
                </Link>
                <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">{t.title}</h1>
            </div>

            <div className="max-w-4xl">
                <LicenseForm locale={locale} />
            </div>
        </div>
    );
}
