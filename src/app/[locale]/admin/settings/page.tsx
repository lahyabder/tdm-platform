'use client';

import { use } from 'react';

export default function AdminSettingsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params);

    const t = {
        ar: {
            title: "إعدادات النظام",
            subtitle: "تخصيص تجربة لوحة التحكم وإعدادات العرض.",
            save: "حفظ التغييرات",
            sections: {
                branding: "الهوية الوطنية",
                notifications: "التنبيهات",
                interface: "واجهة الاستخدام",
                security: "الأمان"
            },
            fields: {
                siteName: "اسم الموقع الرسمي",
                primaryColor: "اللون الأساسي للعلامة",
                emailAlerts: "تنبيهات البريد الإلكتروني",
                expiryNotice: "فترة الإشعار بانتهاء الترخيص (أيام)",
                demoMode: "وضع العرض التجريبي (Demo Mode)",
                language: "لغة العرض الأساسية"
            }
        },
        fr: {
            title: "Paramètres du Système",
            subtitle: "Personnalisation de l'expérience et réglages d'affichage.",
            save: "Enregistrer les modifications",
            sections: {
                branding: "Identité Visuelle",
                notifications: "Notifications",
                interface: "Interface utilisateur",
                security: "Sécurité"
            },
            fields: {
                siteName: "Nom officiel du site",
                primaryColor: "Couleur primaire",
                emailAlerts: "Alertes par e-mail",
                expiryNotice: "Délai de notification d'expiration (jours)",
                demoMode: "Mode Démo",
                language: "Langue principale"
            }
        }
    }[locale as 'ar' | 'fr'];

    return (
        <div className="space-y-8 max-w-4xl">
            <div className="flex justify-between items-end border-b border-slate-200 pb-6">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 mb-2">{t.title}</h1>
                    <p className="text-slate-500 font-medium">{t.subtitle}</p>
                </div>
                <button className="px-6 py-2 bg-brand-green text-white font-bold rounded-sm hover:bg-brand-green/90 transition-colors shadow-sm">
                    {t.save}
                </button>
            </div>

            <div className="grid grid-cols-1 gap-10 py-6">
                {/* Branding */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-1">{t.sections.branding}</h3>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">تخصيص الشعار والألوان الرسمية للمنصة.</p>
                    </div>
                    <div className="md:col-span-2 space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">{t.fields.siteName}</label>
                            <input type="text" defaultValue="Télédiffusion de Mauritanie" className="admin-input" />
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-brand-green rounded-sm border border-slate-200"></div>
                            <span className="text-xs font-bold text-slate-600 font-mono">#00A95C (TDM Green)</span>
                        </div>
                    </div>
                </div>

                <div className="h-px bg-slate-200 w-full"></div>

                {/* Notifications */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider mb-1">{t.sections.notifications}</h3>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">التحكم في مواعيد الإشعارات الخاصة بالتراخيص.</p>
                    </div>
                    <div className="md:col-span-2 space-y-6">
                        <div className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-sm">
                            <span className="text-sm font-bold text-slate-700">{t.fields.emailAlerts}</span>
                            <div className="w-10 h-5 bg-brand-green rounded-full relative cursor-pointer shadow-inner">
                                <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-2 uppercase">{t.fields.expiryNotice}</label>
                            <input type="number" defaultValue="60" className="admin-input w-32" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
