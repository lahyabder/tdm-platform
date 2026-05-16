import { constructMetadata } from '@/lib/metadata';
import { AccessibilityClient } from '@/components/AccessibilityClient';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    return constructMetadata({
        title: locale === 'ar' ? "إمكانية الوصول | TDM" : "Accessibilité | TDM",
        description: locale === 'ar' ? "التزامنا بتوفير وصول سهل لكافة المواطنين." : "Notre engagement pour un accès facilité à tous les citoyens.",
        locale,
        path: '/accessibility',
    });
}

export default async function AccessibilityPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return <AccessibilityClient locale={locale} />;
}
