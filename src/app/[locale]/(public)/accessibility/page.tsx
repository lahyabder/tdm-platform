'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import { Accessibility } from 'lucide-react';

export default function AccessibilityPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = use(params) as any;
    const isAr = locale === 'ar';

    const t = {
        ar: {
            title: "إمكانية الوصول",
            desc: "نلتزم بضمان وصول جميع المستخدمين، بما في ذلك ذوي الاحتياجات الخاصة، إلى خدماتنا الرقمية بكل سهولة.",
            features: [
                {
                    title: "التوافق مع قارئات الشاشة",
                    content: "تم تصميم المنصة لتكون متوافقة تماماً مع برامج قارئ الشاشة لمساعدة المكفوفين وضعاف البصر."
                },
                {
                    title: "التباين اللوني",
                    content: "نستخدم معايير تباين لوني عالية لضمان وضوح النصوص لجميع المستخدمين."
                },
                {
                    title: "التنقل عبر لوحة المفاتيح",
                    content: "يمكن تصفح كافة أقسام الموقع والوصول للخدمات باستخدام لوحة المفاتيح فقط."
                }
            ]
        },
        fr: {
            title: "Accessibilité",
            desc: "Nous nous engageons à garantir que tous les utilisateurs, y compris les personnes handicapées, puissent accéder à nos services.",
            features: [
                {
                    title: "Lecteurs d'écran",
                    content: "La plateforme est compatible avec les logiciels de lecture d'écran pour les malvoyants."
                },
                {
                    title: "Contraste",
                    content: "Nous utilisons des normes de contraste élevé pour assurer la clarté des textes."
                },
                {
                    title: "Navigation Clavier",
                    content: "Toutes les sections sont accessibles via la navigation au clavier uniquement."
                }
            ]
        }
    }[locale as 'ar' | 'fr'];

    return (
        <main className="min-h-screen bg-brand-dark pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-500/20">
                        <Accessibility className="w-8 h-8 text-blue-500" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4">{t.title}</h1>
                    <p className="max-w-2xl mx-auto text-slate-400 font-medium text-lg leading-relaxed">{t.desc}</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {t.features.map((f, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="premium-card p-8 text-center space-y-6"
                        >
                            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto text-brand-green font-black text-xl">
                                {i + 1}
                            </div>
                            <h3 className="text-xl font-black text-white">{f.title}</h3>
                            <p className="text-slate-400 text-sm font-bold leading-relaxed">{f.content}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
