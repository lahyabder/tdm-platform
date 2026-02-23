'use client';

import { useFacilityStore } from '@/store/useFacilityStore';
import FacilityForm from '@/components/admin/FacilityForm';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';
import { notFound } from 'next/navigation';

export default function EditFacilityPage({
    params,
}: {
    params: Promise<{ locale: string; id: string }>;
}) {
    const { locale, id } = use(params) as any;
    const { getFacilityByRef } = useFacilityStore();
    const [facility, setFacility] = useState<any>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const data = getFacilityByRef(id);
        if (data) {
            setFacility(data);
        }
        setIsLoaded(true);
    }, [id, getFacilityByRef]);

    if (isLoaded && !facility) {
        return notFound();
    }

    if (!isLoaded) {
        return (
            <div className="flex items-center justify-center p-24">
                <div className="w-8 h-8 border-4 border-brand-green border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    const t = {
        ar: { title: "تعديل بيانات المنشأة", back: "العودة للجدول" },
        fr: { title: "Modifier l'établissement", back: "Retour au tableau" }
    }[locale as 'ar' | 'fr'];

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-2">
                <Link href={`/${locale}/admin/facilities`} className="text-brand-green hover:underline text-xs flex items-center gap-1 font-bold">
                    &larr; {t.back}
                </Link>
                <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">{t.title}</h1>
                <p className="text-sm font-mono text-slate-400 uppercase">{id}</p>
            </div>

            <div className="max-w-4xl">
                <FacilityForm locale={locale} initialData={facility} isEdit />
            </div>
        </div>
    );
}
