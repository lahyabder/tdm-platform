'use client';

import { use } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';

export default function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = use(params) as any;
    const isAr = locale === 'ar';

    const t = {
        ar: {
            title: "سياسة الخصوصية",
            date: "آخر تحديث: 01 مايو 2024",
            sections: [
                {
                    title: "جمع المعلومات",
                    content: "نقوم بجمع المعلومات الضرورية فقط لتقديم خدماتنا التقنية وضمان أمن المنصة الرقمية."
                },
                {
                    title: "استخدام البيانات",
                    content: "تستخدم البيانات حصرياً لتحسين تجربة المستخدم والتواصل الرسمي مع متعهدي البث والشركاء."
                },
                {
                    title: "أمن المعلومات",
                    content: "نطبق أعلى معايير التشفير والحماية لضمان سلامة البيانات ومنع الوصول غير المصرح به."
                }
            ]
        },
        fr: {
            title: "Politique de Confidentialité",
            date: "Dernière mise à jour: 01 Mai 2024",
            sections: [
                {
                    title: "Collecte des données",
                    content: "Nous collectons uniquement les informations nécessaires à la fourniture de nos services techniques."
                },
                {
                    title: "Utilisation des données",
                    content: "Les données sont utilisées exclusivement pour améliorer l'expérience utilisateur et la communication officielle."
                },
                {
                    title: "Sécurité",
                    content: "Nous appliquons les normes de cryptage les plus élevées pour garantir l'intégrité des données."
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
                    <div className="w-16 h-16 bg-brand-green/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-brand-green/20">
                        <ShieldCheck className="w-8 h-8 text-brand-green" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4">{t.title}</h1>
                    <p className="text-slate-500 font-bold text-sm uppercase tracking-widest">{t.date}</p>
                </motion.div>

                <div className="space-y-12">
                    {t.sections.map((s, i) => (
                        <motion.section 
                            key={i}
                            initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="premium-card p-8 md:p-12 border-l-4 border-l-brand-green"
                        >
                            <h2 className="text-2xl font-black text-white mb-6 flex items-center gap-4">
                                <span className="text-brand-green opacity-20">0{i+1}</span>
                                {s.title}
                            </h2>
                            <p className="text-slate-300 leading-relaxed text-lg font-medium">
                                {s.content}
                            </p>
                        </motion.section>
                    ))}
                </div>
            </div>
        </main>
    );
}
