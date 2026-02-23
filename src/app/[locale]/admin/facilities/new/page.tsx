import FacilityForm from '@/components/admin/FacilityForm';
import Link from 'next/link';

export default async function NewFacilityPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const resolvedParams = await params;
    const locale = resolvedParams.locale;

    const t = {
        ar: { title: "إضافة منشأة إعلامية جديدة", back: "العودة للجدول" },
        fr: { title: "Ajouter un nouvel établissement", back: "Retour au tableau" }
    }[locale as 'ar' | 'fr'];

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <Link href={`/${locale}/admin/facilities`} className="text-brand-green hover:underline text-xs flex items-center gap-1 font-bold">
                    &larr; {t.back}
                </Link>
                <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">{t.title}</h1>
            </div>

            <div className="max-w-4xl">
                <FacilityForm locale={locale} />
            </div>
        </div>
    );
}
