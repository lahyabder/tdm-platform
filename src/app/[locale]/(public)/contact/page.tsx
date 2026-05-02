'use client';

import { useState, useEffect, use } from 'react';

export default function ContactPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params) as any;
    const [isClient, setIsClient] = useState(false);
    const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');

    useEffect(() => {
        setIsClient(true);
    }, []);

    const t = {
        ar: {
            title: "تواصل معنا",
            subtitle: "نحن هنا للإجابة على جميع استفساراتكم وتلقي ملاحظاتكم حول خدماتنا.",
            info: {
                title: "بيانات التواصل",
                address: "نواكشوط، موريتانيا - ص.ب: 200",
                phone: "+222 45 25 25 25",
                email: "contact@tdm.mr",
                hours: "الأحد - الخميس: 08:00 - 16:00"
            },
            form: {
                title: "نموذج المراسلة",
                name: "الاسم الكامل",
                email: "البريد الإلكتروني",
                subject: "الموضوع",
                message: "الرسالة",
                submit: "إرسال الرسالة",
                success: "تم إرسال رسالتكم بنجاح (نسخة ديمو)"
            }
        },
        fr: {
            title: "Contactez-nous",
            subtitle: "Nous sommes à votre écoute pour répondre à vos questions et recevoir vos suggestions.",
            info: {
                title: "Nos Coordonnées",
                address: "Nouakchott, Mauritanie - BP: 200",
                phone: "+222 45 25 25 25",
                email: "contact@tdm.mr",
                hours: "Dimanche - Jeudi: 08h00 - 16h00"
            },
            form: {
                title: "Formulaire de Contact",
                name: "Nom complet",
                email: "Email",
                subject: "Sujet",
                message: "Message",
                submit: "Envoyer le message",
                success: "Votre message a été envoyé avec succès (Version Démo)"
            }
        }
    }[locale as 'ar' | 'fr'];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        console.log("Contact Form Submission (Demo):", Object.fromEntries(formData));
        setFormStatus('success');
        setTimeout(() => setFormStatus('idle'), 5000);
    };

    if (!isClient) return null;

    return (
        <div className="min-h-screen py-16 px-6">
            <div className="max-w-6xl mx-auto space-y-16">

                {/* Header */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">{t.title}</h1>
                    <p className="text-lg text-slate-100 max-w-2xl mx-auto font-medium">{t.subtitle}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16">

                    {/* Left: Contact Info */}
                    <div className="space-y-10">
                        <div className="space-y-6">
                            <h2 className="text-2xl font-black text-white">{t.info.title}</h2>
                            <div className="space-y-6">
                                {[
                                    { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z", text: t.info.address },
                                    { icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z", text: t.info.phone },
                                    { icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", text: t.info.email },
                                    { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", text: t.info.hours },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex gap-5 items-center group">
                                        <div className="w-14 h-14 bg-brand-card rounded-2xl flex items-center justify-center shrink-0 border border-white/20 group-hover:border-brand-green group-hover:bg-brand-green/10 transition-all">
                                            <svg className="w-6 h-6 text-slate-300 group-hover:text-brand-green transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} /></svg>
                                        </div>
                                        <span className="text-slate-200 font-bold">{item.text}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="h-64 bg-brand-card rounded-3xl border border-white/20 shadow-inner overflow-hidden relative">
                            <div className="absolute inset-0 flex items-center justify-center opacity-20">
                                <svg className="w-20 h-20 text-slate-300" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" /></svg>
                            </div>
                            <div className="absolute bottom-6 left-6 right-6 p-4 bg-brand-card-hover backdrop-blur rounded-xl text-[10px] font-black uppercase text-slate-100 tracking-widest text-center">
                                Mauritania Radio & TV Broadcasting HQ
                            </div>
                        </div>
                    </div>

                    {/* Right: Contact Form */}
                    <div className="bg-brand-card backdrop-blur-sm rounded-3xl p-10 border border-white/20 space-y-8">
                        <h2 className="text-2xl font-black text-white">{t.form.title}</h2>

                        {formStatus === 'success' ? (
                            <div className="py-20 text-center space-y-6 animate-in fade-in zoom-in duration-300">
                                <div className="w-20 h-20 bg-brand-green/10 text-brand-green rounded-full flex items-center justify-center mx-auto border border-brand-green/20">
                                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                                </div>
                                <p className="font-black text-brand-green text-lg tracking-tight">{t.form.success}</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{t.form.name}</label>
                                        <input name="name" required type="text" className="w-full p-4 bg-brand-card border border-white/20 rounded-xl text-sm font-bold text-white focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green outline-none transition-all placeholder:text-slate-300" placeholder="Mohamed Vall" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{t.form.email}</label>
                                        <input name="email" required type="email" className="w-full p-4 bg-brand-card border border-white/20 rounded-xl text-sm font-bold text-white focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green outline-none transition-all placeholder:text-slate-300" placeholder="email@example.com" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{t.form.subject}</label>
                                    <input name="subject" required type="text" className="w-full p-4 bg-brand-card border border-white/20 rounded-xl text-sm font-bold text-white focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black text-slate-300 uppercase tracking-widest">{t.form.message}</label>
                                    <textarea name="message" required rows={5} className="w-full p-4 bg-brand-card border border-white/20 rounded-xl text-sm font-bold text-white focus:ring-2 focus:ring-brand-green/30 focus:border-brand-green outline-none transition-all resize-none"></textarea>
                                </div>
                                <button type="submit" className="w-full py-5 bg-brand-green text-white font-black rounded-2xl hover:bg-brand-green/90 transition-all shadow-xl shadow-brand-green/20 flex items-center justify-center gap-3 active:scale-[0.98]">
                                    {t.form.submit}
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </button>
                            </form>
                        )}
                    </div>

                </div>

            </div>
        </div>
    );
}
