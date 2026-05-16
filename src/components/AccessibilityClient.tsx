'use client';

import { motion } from 'framer-motion';
import { Accessibility, Eye, Monitor, Languages } from 'lucide-react';

export function AccessibilityClient({ locale }: { locale: string }) {
    const isAr = locale === 'ar';

    const t = {
        ar: {
            title: "إمكانية الوصول",
            intro: "نحن ملتزمون بجعل خدماتنا الرقمية متاحة للجميع، بما في ذلك الأشخاص ذوي الاحتياجات الخاصة، لضمان الشمولية الرقمية.",
            sections: [
                {
                    title: "التوافق مع المتصفحات",
                    icon: <Monitor className="w-6 h-6" />,
                    content: "تم تصميم المنصة لتعمل بسلاسة على كافة المتصفحات الحديثة والأجهزة المحمولة، مع مراعاة سرعة التحميل."
                },
                {
                    title: "اللغات المتعددة",
                    icon: <Languages className="w-6 h-6" />,
                    content: "ندعم اللغتين العربية والفرنسية بشكل كامل لضمان وصول المعلومة لكافة أطياف المجتمع الموريتاني."
                },
                {
                    title: "الوضوح البصري",
                    icon: <Eye className="w-6 h-6" />,
                    content: "نستخدم تباين ألوان عالي وخطوطاً واضحة (Tajawal) لتسهيل القراءة وتجربة المستخدم."
                }
            ]
        },
        fr: {
            title: "Accessibilité",
            intro: "Nous nous engageons à rendre nos services numériques accessibles à tous les citoyens, garantissant ainsi l'inclusion numérique.",
            sections: [
                {
                    title: "Compatibilité",
                    icon: <Monitor className="w-6 h-6" />,
                    content: "La plateforme est optimisée pour tous les navigateurs modernes et les appareils mobiles."
                },
                {
                    title: "Multilinguisme",
                    icon: <Languages className="w-6 h-6" />,
                    content: "Nous supportons pleinement l'Arabe et le Français pour une communication inclusive."
                },
                {
                    title: "Clarté Visuelle",
                    icon: <Eye className="w-6 h-6" />,
                    content: "Nous utilisons des contrastes élevés et des polices lisibles pour faciliter la navigation."
                }
            ]
        }
    }[locale as 'ar' | 'fr'] as any;

    return (
        <main className="min-h-screen bg-brand-dark pt-32 pb-20 px-6 waves-pattern">
            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <div className="w-20 h-20 bg-brand-yellow/10 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-brand-yellow/20">
                        <Accessibility className="w-10 h-10 text-brand-yellow" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6">{t.title}</h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium">{t.intro}</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {t.sections.map((s: any, i: number) => (
                        <motion.section 
                            key={i}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="premium-card p-10 group hover:bg-white/[0.02] flex flex-col items-center text-center"
                        >
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 text-brand-green mb-8 group-hover:bg-brand-green group-hover:text-white transition-all duration-500">
                                {s.icon}
                            </div>
                            <h2 className="text-2xl font-black text-white mb-4">{s.title}</h2>
                            <p className="text-slate-400 leading-relaxed font-medium">
                                {s.content}
                            </p>
                        </motion.section>
                    ))}
                </div>
            </div>
        </main>
    );
}
