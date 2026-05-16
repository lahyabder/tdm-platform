'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';

export function PrivacyClient({ locale }: { locale: string }) {
    const isAr = locale === 'ar';

    const t = {
        ar: {
            title: "سياسة الخصوصية",
            date: "آخر تحديث: 01 مايو 2024",
            intro: "نحن في شركة البث الإذاعي والتلفزي الموريتاني (TDM) نولي أهمية قصوى لخصوصية بياناتكم وأمن معلوماتكم.",
            sections: [
                {
                    title: "جمع المعلومات",
                    icon: <Eye className="w-6 h-6" />,
                    content: "نقوم بجمع المعلومات التقنية الضرورية فقط لضمان جودة البث واستمرارية الخدمة، مثل عناوين IP ونوع المتصفح لتحسين الأداء."
                },
                {
                    title: "حماية البيانات",
                    icon: <Lock className="w-6 h-6" />,
                    content: "تخضع كافة البيانات المخزنة لأعلى معايير التشفير والأمن السيبراني، ولا يتم مشاركتها مع أي أطراف ثالثة خارج الإطار القانوني التنظيمي."
                },
                {
                    title: "حقوق المستخدم",
                    icon: <FileText className="w-6 h-6" />,
                    content: "يحق للمستخدمين والشركاء الاستفسار عن نوعية البيانات المخزنة وطلب تحديثها أو تصحيحها بما يتوافق مع القوانين الوطنية للرقمنة."
                }
            ]
        },
        fr: {
            title: "Politique de Confidentialité",
            date: "Dernière mise à jour: 01 Mai 2024",
            intro: "À la Télédiffusion de Mauritanie (TDM), nous accordons une importance capitale à la protection de vos données personnelles.",
            sections: [
                {
                    title: "Collecte des données",
                    icon: <Eye className="w-6 h-6" />,
                    content: "Nous collectons uniquement les informations techniques nécessaires pour garantir la qualité de la diffusion et l'amélioration de nos services."
                },
                {
                    title: "Protection",
                    icon: <Lock className="w-6 h-6" />,
                    content: "Toutes les données sont protégées par des standards de cryptage avancés et ne sont jamais partagées à des fins commerciales."
                },
                {
                    title: "Vos Droits",
                    icon: <FileText className="w-6 h-6" />,
                    content: "Vous avez le droit de consulter, rectifier ou demander la suppression de vos informations conformément aux lois mauritaniennes en vigueur."
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
                    <div className="w-20 h-20 bg-brand-green/10 rounded-2xl flex items-center justify-center mx-auto mb-8 border border-brand-green/20">
                        <ShieldCheck className="w-10 h-10 text-brand-green" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6">{t.title}</h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto font-medium mb-4">{t.intro}</p>
                    <p className="text-brand-green font-black text-[10px] uppercase tracking-[0.3em]">{t.date}</p>
                </motion.div>

                <div className="space-y-10">
                    {t.sections.map((s: any, i: number) => (
                        <motion.section 
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="premium-card p-8 md:p-12 group hover:bg-white/[0.02]"
                        >
                            <div className="flex flex-col md:flex-row gap-8 items-start">
                                <div className="w-14 h-14 bg-brand-green/10 rounded-xl flex items-center justify-center border border-brand-green/20 text-brand-green shrink-0 group-hover:scale-110 transition-transform">
                                    {s.icon}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-white mb-4">{s.title}</h2>
                                    <p className="text-slate-300 leading-relaxed text-lg font-medium">
                                        {s.content}
                                    </p>
                                </div>
                            </div>
                        </motion.section>
                    ))}
                </div>
            </div>
        </main>
    );
}
