import { constructMetadata } from '@/lib/metadata';
import { supabase } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { NewsDetailClient } from '@/components/NewsDetailClient';

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; id: string }>;
}) {
    const { locale, id } = await params;
    
    const { data: article } = await supabase
        .from('news')
        .select('*')
        .eq('id', id)
        .single();

    if (!article) return constructMetadata({ locale });

    const isAr = locale === 'ar';
    return constructMetadata({
        title: isAr ? article.title_ar : article.title_fr,
        description: isAr ? article.desc_ar : article.desc_fr,
        image: article.image_url,
        locale,
        path: `/news/${id}`,
    });
}

export default async function NewsDetailPage({
    params,
}: {
    params: Promise<{ locale: string; id: string }>;
}) {
    const { locale, id } = await params;

    const { data: article } = await supabase
        .from('news')
        .select('*')
        .eq('id', id)
        .single();

    if (!article) {
        // Fallback for static news IDs (1, 2, 3, etc.)
        const staticNews = [
            { id: 1, title: { ar: "تدشين محطة البث الرقمي الأرضي TNT ونقل البث الإذاعي إلى البرج الجديد", fr: "Inauguration de la station de diffusion numérique terrestre TNT" }, date: { ar: "2025", fr: "2025" }, description: { ar: "تدشين رسمي لخدمات البث الرقمي الأرضي TNT في موريتانيا، ونقل خدمات الراديو إلى البرج الجديد.", fr: "Lancement officiel des services TNT en Mauritanie et transfert des services radio vers la nouvelle tour." }, imageUrl: "https://siteweb.tdm.mr/wp-content/uploads/2025/03/TDM4-2.jpg", tag: { ar: "تقنية", fr: "Technologie" } },
            { id: 2, title: { ar: "إيجاز صحفي: تدشين مقرات جديدة لشركة البث الإذاعي والتلفزي الموريتاني", fr: "Inauguration de nouveaux sièges de la Télédiffusion de Mauritanie" }, date: { ar: "2025", fr: "2025" }, description: { ar: "افتتاح مقرات حديثة لتحسين ظروف العمل لموظفي شركة البث الإذاعي والتلفزي الموريتاني.", fr: "Inauguration de nouveaux bureaux modernes pour améliorer les conditions de travail des employés de la TDM." }, imageUrl: "https://siteweb.tdm.mr/wp-content/uploads/2025/03/MOCTAR-300x225-3.jpg", tag: { ar: "مؤسسة", fr: "Institutionnel" } }
        ];
        const fallback = staticNews.find(a => a.id.toString() === id);
        if (!fallback) return notFound();
        return <NewsDetailClient article={fallback} locale={locale} />;
    }

    const mappedArticle = {
        id: article.id,
        title: { ar: article.title_ar, fr: article.title_fr },
        date: { ar: article.date_ar, fr: article.date_fr },
        description: { ar: article.desc_ar, fr: article.desc_fr },
        imageUrl: article.image_url,
        tag: { ar: article.tag_ar, fr: article.tag_fr }
    };

    return <NewsDetailClient article={mappedArticle} locale={locale} />;
}
