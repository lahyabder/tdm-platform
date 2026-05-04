'use client';

import { use, useState, useEffect } from 'react';

export default function AdminSettingsPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params);

    const [settings, setSettings] = useState({
        siteName: "Télédiffusion de Mauritanie",
        phone: "+222 45 25 22 23",
        address: "BP 4200, Nouakchott, Mauritanie",
        contactEmail: "contact@tdm.mr",
        facebook: "https://facebook.com/tdm",
        twitter: "https://twitter.com/tdm",
        linkedin: "https://linkedin.com/company/tdm",
        metaTitle: "TDM - Télédiffusion de Mauritanie",
        metaDesc: "المؤسسة الوطنية للبث الإذاعي والتلفزي الموريتاني - الوطنية للبث الإذاعي والتلفزي",
        emailAlerts: true,
        expiryNotice: 60
    });

    const isAr = locale === 'ar';

    const t = {
        ar: {
            title: "إعدادات النظام",
            subtitle: "تخصيص تجربة لوحة التحكم وإعدادات العرض.",
            save: "حفظ التغييرات",
            sections: {
                branding: "الهوية والاتصال",
                social: "شبكات التواصل الاجتماعي",
                notifications: "التنبيهات",
                seo: "تحسين محركات البحث (SEO)"
            },
            fields: {
                siteName: "اسم الموقع الرسمي",
                phone: "رقم الهاتف",
                address: "العنوان الرسمي",
                contactEmail: "بريد التواصل",
                facebook: "فيسبوك",
                twitter: "تويتر",
                linkedin: "لينكد إن",
                metaTitle: "عنوان الموقع (Title Tag)",
                metaDesc: "وصف الموقع (Meta Description)",
                emailAlerts: "تنبيهات البريد الإلكتروني",
                expiryNotice: "فترة الإشعار بانتهاء الترخيص (أيام)"
            }
        },
        fr: {
            title: "Paramètres du Système",
            subtitle: "Personnalisation de l'expérience et réglages d'affichage.",
            save: "Enregistrer les modifications",
            sections: {
                branding: "Identité & Contact",
                social: "Réseaux Sociaux",
                notifications: "Notifications",
                seo: "Référencement (SEO)"
            },
            fields: {
                siteName: "Nom officiel du site",
                phone: "Téléphone",
                address: "Adresse officielle",
                contactEmail: "Email de contact",
                facebook: "Facebook",
                twitter: "Twitter",
                linkedin: "LinkedIn",
                metaTitle: "Titre du site (Meta Title)",
                metaDesc: "Description (Meta Description)",
                emailAlerts: "Alertes par e-mail",
                expiryNotice: "Délai de notification d'expiration (jours)"
            }
        }
    }[locale as 'ar' | 'fr'];

    const handleSave = () => {
        alert(isAr ? '✅ تم حفظ الإعدادات بنجاح' : '✅ Paramètres enregistrés');
    };

    return (
        <div className="space-y-12 pb-20 max-w-5xl mx-auto">
            <div className="flex justify-between items-center bg-white p-8 rounded-sm border border-slate-200 sticky top-0 z-10 shadow-sm">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">{t.title}</h1>
                    <p className="text-slate-500 font-bold mt-1 uppercase text-xs tracking-widest">{t.subtitle}</p>
                </div>
                <button 
                    onClick={handleSave}
                    className="px-10 py-4 bg-brand-green text-white font-black rounded-sm hover:bg-brand-green/90 transition-all shadow-lg shadow-brand-green/20 uppercase text-xs tracking-widest"
                >
                    {t.save}
                </button>
            </div>

            <div className="space-y-10">
                {/* Branding & Contact */}
                <section className="bg-white rounded-sm border border-slate-200 overflow-hidden">
                    <div className="px-8 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-3">
                        <div className="w-2 h-2 bg-brand-green rounded-full"></div>
                        <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">{t.sections.branding}</h3>
                    </div>
                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="admin-label">{t.fields.siteName}</label>
                            <input 
                                type="text" 
                                className="admin-input" 
                                value={settings.siteName} 
                                onChange={e => setSettings({...settings, siteName: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="admin-label">{t.fields.contactEmail}</label>
                            <input 
                                type="email" 
                                className="admin-input" 
                                value={settings.contactEmail} 
                                onChange={e => setSettings({...settings, contactEmail: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="admin-label">{t.fields.phone}</label>
                            <input 
                                type="text" 
                                className="admin-input" 
                                value={settings.phone} 
                                onChange={e => setSettings({...settings, phone: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="admin-label">{t.fields.address}</label>
                            <input 
                                type="text" 
                                className="admin-input" 
                                value={settings.address} 
                                onChange={e => setSettings({...settings, address: e.target.value})}
                            />
                        </div>
                    </div>
                </section>

                {/* Social Media */}
                <section className="bg-white rounded-sm border border-slate-200 overflow-hidden">
                    <div className="px-8 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-3">
                        <div className="w-2 h-2 bg-brand-yellow rounded-full"></div>
                        <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">{t.sections.social}</h3>
                    </div>
                    <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="space-y-2">
                            <label className="admin-label">{t.fields.facebook}</label>
                            <input 
                                type="text" 
                                className="admin-input bg-slate-50 border-slate-100" 
                                value={settings.facebook} 
                                onChange={e => setSettings({...settings, facebook: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="admin-label">{t.fields.twitter}</label>
                            <input 
                                type="text" 
                                className="admin-input bg-slate-50 border-slate-100" 
                                value={settings.twitter} 
                                onChange={e => setSettings({...settings, twitter: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="admin-label">{t.fields.linkedin}</label>
                            <input 
                                type="text" 
                                className="admin-input bg-slate-50 border-slate-100" 
                                value={settings.linkedin} 
                                onChange={e => setSettings({...settings, linkedin: e.target.value})}
                            />
                        </div>
                    </div>
                </section>

                {/* SEO Settings */}
                <section className="bg-white rounded-sm border border-slate-200 overflow-hidden">
                    <div className="px-8 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">{t.sections.seo}</h3>
                    </div>
                    <div className="p-8 space-y-8">
                        <div className="space-y-2">
                            <label className="admin-label">{t.fields.metaTitle}</label>
                            <input 
                                type="text" 
                                className="admin-input" 
                                value={settings.metaTitle} 
                                onChange={e => setSettings({...settings, metaTitle: e.target.value})}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="admin-label">{t.fields.metaDesc}</label>
                            <textarea 
                                className="admin-textarea" 
                                rows={3}
                                value={settings.metaDesc} 
                                onChange={e => setSettings({...settings, metaDesc: e.target.value})}
                            />
                        </div>
                    </div>
                </section>

                {/* Notifications */}
                <section className="bg-white rounded-sm border border-slate-200 overflow-hidden">
                    <div className="px-8 py-4 bg-slate-50 border-b border-slate-200 flex items-center gap-3">
                        <div className="w-2 h-2 bg-brand-red rounded-full"></div>
                        <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">{t.sections.notifications}</h3>
                    </div>
                    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                        <div className="flex items-center justify-between p-6 bg-slate-50 border border-slate-200 rounded-sm group cursor-pointer" 
                             onClick={() => setSettings({...settings, emailAlerts: !settings.emailAlerts})}>
                            <div className="space-y-1">
                                <span className="text-sm font-black text-slate-800 uppercase tracking-tight">{t.fields.emailAlerts}</span>
                                <p className="text-[10px] text-slate-500 font-bold uppercase">{settings.emailAlerts ? 'Active' : 'Disabled'}</p>
                            </div>
                            <div className={`w-12 h-6 rounded-full relative transition-all duration-300 ${settings.emailAlerts ? 'bg-brand-green shadow-lg shadow-brand-green/20' : 'bg-slate-300'}`}>
                                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${settings.emailAlerts ? 'right-1' : 'right-7'}`}></div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="admin-label">{t.fields.expiryNotice}</label>
                            <div className="flex items-center gap-4">
                                <input 
                                    type="number" 
                                    className="admin-input w-24 text-center font-black" 
                                    value={settings.expiryNotice} 
                                    onChange={e => setSettings({...settings, expiryNotice: parseInt(e.target.value)})}
                                />
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{isAr ? 'يوم قبل الانتهاء' : 'Days before expiry'}</span>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
