import { constructMetadata } from '@/lib/metadata';
import { ShieldCheck } from 'lucide-react';
import { PrivacyClient } from '@/components/PrivacyClient';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    return constructMetadata({
        title: locale === 'ar' ? "سياسة الخصوصية | TDM" : "Politique de Confidentialité | TDM",
        description: locale === 'ar' ? "تعرف على كيفية حماية بياناتكم في منصة TDM." : "Découvrez comment nous protégeons vos données sur TDM.",
        locale,
        path: '/privacy',
    });
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    return <PrivacyClient locale={locale} />;
}
