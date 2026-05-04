'use client';

import { useState, useEffect, use } from 'react';
import { useContentStore } from '@/store/useContentStore';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';

export default function ContactPage({
    params,
}: {
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params) as any;
    const { pages, fetchContent } = useContentStore();
    const [isClient, setIsClient] = useState(false);
    const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');

    useEffect(() => {
        setIsClient(true);
        fetchContent();
    }, []);

    const content = pages.contact;
    const isAr = locale === 'ar';

    const t = {
        ar: {
            title: "تواصل معنا",
            subtitle: "نحن هنا للإجابة على جميع استفساراتكم وتلقي ملاحظاتكم حول خدماتنا.",
            form: {
                title: "نموذج المراسلة الرقمي",
                name: "الاسم الكامل",
                email: "البريد الإلكتروني",
                subject: "الموضوع",
                message: "الرسالة",
                submit: "إرسال الرسالة",
                success: "تم إرسال رسالتكم بنجاح"
            },
            info: {
                title: "قنوات التواصل",
                desc: "تفضل بزيارتنا أو تواصل معنا عبر القنوات الرسمية."
            }
        },
        fr: {
            title: "Contactez-nous",
            subtitle: "Nous sommes à votre écoute pour répondre à vos questions et recevoir vos suggestions.",
            form: {
                title: "Formulaire de Contact",
                name: "Nom complet",
                email: "Email",
                subject: "Sujet",
                message: "Message",
                submit: "Envoyer le message",
                success: "Message envoyé avec succès"
            },
            info: {
                title: "Coordonnées",
                desc: "Visitez-nous ou contactez-nous via nos canaux officiels."
            }
        }
    }[locale as 'ar' | 'fr'];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('success');
        setTimeout(() => setFormStatus('idle'), 5000);
    };

    if (!isClient || !content) return <div className="min-h-screen bg-brand-dark"></div>;

    const contactInfo = [
        { icon: <MapPin className="w-6 h-6" />, label: { ar: "العنوان", fr: "Adresse" }, text: content.sections.info?.address?.[locale] },
        { icon: <Phone className="w-6 h-6" />, label: { ar: "الهاتف", fr: "Téléphone" }, text: content.sections.info?.phone?.[locale] },
        { icon: <Mail className="w-6 h-6" />, label: { ar: "البريد الإلكتروني", fr: "Email" }, text: content.sections.info?.email?.[locale] },
        { icon: <Clock className="w-6 h-6" />, label: { ar: "ساعات العمل", fr: "Heures" }, text: content.sections.info?.hours?.[locale] },
    ];

    return (
        <main className="min-h-screen pb-32 pt-28 bg-brand-dark waves-pattern relative overflow-hidden">
            {/* Background Glows */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-brand-green/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-brand-yellow/5 blur-[120px] rounded-full"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                {/* Header */}
                <header className="mb-24 text-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6"
                    >
                        <MessageSquare className="w-3.5 h-3.5 text-brand-yellow" />
                        <span className="text-[10px] font-black text-brand-yellow uppercase tracking-[0.3em]">
                            {isAr ? 'مركز التواصل الرقمي' : 'Digital Contact Center'}
                        </span>
                    </motion.div>
                    
                    <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-tight">
                        {isAr ? 'تواصل' : 'Connect'}{" "}
                        <span className="glow-text-gold">{isAr ? 'معنا' : 'With Us'}</span>
                    </h1>
                    
                    <p className="max-w-2xl mx-auto text-lg text-slate-400 font-medium leading-relaxed">
                        {t.subtitle}
                    </p>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left: Info Cards */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="space-y-4 mb-12">
                            <h2 className="text-3xl font-black text-white">{t.info.title}</h2>
                            <p className="text-slate-400 font-medium">{t.info.desc}</p>
                        </div>

                        <div className="grid grid-cols-1 gap-6">
                            {contactInfo.map((info, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="premium-card p-6 flex items-center gap-6 group hover:bg-white/[0.04]"
                                >
                                    <div className="w-14 h-14 bg-brand-green/10 text-brand-green rounded-2xl flex items-center justify-center border border-brand-green/20 group-hover:bg-brand-green group-hover:text-white transition-all duration-500 shadow-xl shadow-brand-green/5">
                                        {info.icon}
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{info.label[locale as 'ar' | 'fr']}</p>
                                        <p className="text-white font-bold text-lg" dir={info.label.fr === 'Téléphone' ? 'ltr' : undefined}>{info.text}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                    </div>

                    {/* Right: Premium Form */}
                    <div className="lg:col-span-7">
                        <div className="premium-card p-1 md:p-2">
                            <div className="bg-slate-950/40 rounded-[2.4rem] p-8 md:p-12 relative overflow-hidden">
                                <h2 className="text-3xl font-black text-white mb-10">{t.form.title}</h2>

                                {formStatus === 'success' ? (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="py-24 text-center space-y-6"
                                    >
                                        <div className="w-24 h-24 bg-brand-green/20 text-brand-green rounded-full flex items-center justify-center mx-auto border-2 border-brand-green/30 shadow-2xl shadow-brand-green/20">
                                            <CheckCircle2 className="w-12 h-12" />
                                        </div>
                                        <p className="text-2xl font-black text-white">{t.form.success}</p>
                                        <button 
                                            onClick={() => setFormStatus('idle')}
                                            className="text-brand-green font-bold hover:underline"
                                        >
                                            {isAr ? 'إرسال رسالة أخرى' : 'Envoyer un autre message'}
                                        </button>
                                    </motion.div>
                                ) : (
                                    <form onSubmit={handleSubmit} className="space-y-8">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.form.name}</label>
                                                <input required className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white font-bold focus:border-brand-green focus:bg-white/10 outline-none transition-all" placeholder="Mohamed Vall" />
                                            </div>
                                            <div className="space-y-3">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.form.email}</label>
                                                <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white font-bold focus:border-brand-green focus:bg-white/10 outline-none transition-all" placeholder="mohamed@tdm.mr" />
                                            </div>
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.form.subject}</label>
                                            <input required className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white font-bold focus:border-brand-green focus:bg-white/10 outline-none transition-all" />
                                        </div>
                                        <div className="space-y-3">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.form.message}</label>
                                            <textarea required rows={5} className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-white font-bold focus:border-brand-green focus:bg-white/10 outline-none transition-all resize-none"></textarea>
                                        </div>
                                        <button type="submit" className="glass-button w-full bg-brand-green border-brand-green py-5 flex items-center justify-center gap-4 text-lg shadow-[0_10px_40px_rgba(0,169,92,0.3)]">
                                            {t.form.submit}
                                            <Send className={`w-5 h-5 ${isAr ? 'rotate-180' : ''}`} />
                                        </button>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
