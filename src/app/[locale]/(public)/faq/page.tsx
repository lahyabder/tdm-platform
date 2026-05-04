'use client';

import { use, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';

export default function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = use(params) as any;
    const isAr = locale === 'ar';
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const t = {
        ar: {
            title: "الأسئلة الشائعة",
            subtitle: "كل ما تحتاج معرفته حول خدماتنا التقنية وإجراءات البث.",
            items: [
                {
                    q: "كيف يمكن الحصول على رخصة بث إذاعي أو تلفزيوني؟",
                    a: "يتم منح الرخص من طرف السلطة العليا للصحافة والسمعيات البصرية (HAPA)، وبمجرد الحصول عليها، تتولى TDM الجوانب التقنية للبث والإرسال."
                },
                {
                    q: "ما هي مناطق التغطية الحالية للبث الرقمي الأرضي (TNT)؟",
                    a: "تغطي شبكة TNT حالياً العاصمة انواكشوط ومعظم عواصم الولايات، والعمل جارٍ لتوسيعها لتشمل كامل التراب الوطني."
                },
                {
                    q: "هل تقدم TDM خدمات استضافة للمحتوى الرقمي؟",
                    a: "نعم، توفر TDM حلول استضافة سحابية وأرشفة رقمية متطورة للمؤسسات الإعلامية والشركاء."
                }
            ]
        },
        fr: {
            title: "Foire Aux Questions",
            subtitle: "Tout ce que vous devez savoir sur nos services et procédures.",
            items: [
                {
                    q: "Comment obtenir une licence de diffusion ?",
                    a: "Les licences sont accordées par la HAPA. Une fois obtenue, TDM assure les aspects techniques de la diffusion."
                },
                {
                    q: "Quelles sont les zones de couverture de la TNT ?",
                    a: "La TNT couvre actuellement Nouakchott et les capitales régionales. L'expansion nationale est en cours."
                },
                {
                    q: "TDM propose-t-elle des services d'hébergement ?",
                    a: "Oui, TDM offre des solutions d'hébergement cloud et d'archivage numérique pour les médias."
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
                    <div className="w-16 h-16 bg-brand-yellow/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-brand-yellow/20">
                        <HelpCircle className="w-8 h-8 text-brand-yellow" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4">{t.title}</h1>
                    <p className="text-slate-400 font-medium">{t.subtitle}</p>
                </motion.div>

                <div className="space-y-4">
                    {t.items.map((item, i) => (
                        <div key={i} className="premium-card overflow-hidden">
                            <button 
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                                className="w-full p-6 md:p-8 flex items-center justify-between text-right gap-6 hover:bg-white/5 transition-colors"
                            >
                                <span className={`text-xl font-bold ${openIndex === i ? 'text-brand-green' : 'text-white'}`}>{item.q}</span>
                                <ChevronDown className={`w-6 h-6 text-slate-500 transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-brand-green' : ''}`} />
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div 
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-8 pt-0 text-slate-400 leading-relaxed font-medium text-lg border-t border-white/5">
                                            {item.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}
