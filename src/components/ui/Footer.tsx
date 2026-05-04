export function Footer({ locale, dict }: { locale: string; dict: any }) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-brand-dark border-t border-white/20">
            <div className="max-w-[1600px] mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <img src="/logo.png" alt="TDM Logo" className="h-16 w-auto object-contain drop-shadow-sm" />
                        </div>
                        <p className="text-sm text-slate-300 leading-relaxed">
                            {locale === 'ar' ? 'منصة الخدمات المؤسسية الرسمية المعتمدة لتقديم الخدمات الرقمية.' : 'Plateforme officielle de services institutionnels.'}
                        </p>
                    </div>

                    <div className="md:col-span-1">
                        <h3 className="font-bold text-white mb-4">{locale === 'ar' ? 'روابط سريعة' : 'Liens rapides'}</h3>
                        <ul className="space-y-3 text-sm text-slate-300">
                            <li><a href={`/${locale}`} className="hover:text-brand-green transition-colors">{dict.home}</a></li>
                            <li><a href={`/${locale}/services`} className="hover:text-brand-green transition-colors">{locale === 'ar' ? 'خدماتنا' : 'Nos services'}</a></li>
                            <li><a href={`/${locale}/news`} className="hover:text-brand-green transition-colors">{locale === 'ar' ? 'آخر الأخبار' : 'Actualités'}</a></li>
                            <li><a href={`/${locale}/about`} className="hover:text-brand-green transition-colors">{locale === 'ar' ? 'عن المؤسسة' : 'À propos'}</a></li>
                            <li><a href={`/${locale}/projects`} className="hover:text-brand-green transition-colors">{locale === 'ar' ? 'المشاريع' : 'Projets'}</a></li>
                        </ul>
                    </div>

                    <div className="md:col-span-1">
                        <h3 className="font-bold text-white mb-4">{locale === 'ar' ? 'الدعم الفني' : 'Support technique'}</h3>
                        <ul className="space-y-3 text-sm text-slate-300">
                            <li><a href={`/${locale}/contact`} className="hover:text-brand-green transition-colors">{locale === 'ar' ? 'اتصل بنا' : 'Contactez-nous'}</a></li>
                            <li><a href={`/${locale}/faq`} className="hover:text-brand-green transition-colors">{locale === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}</a></li>
                        </ul>
                    </div>

                    <div className="md:col-span-1">
                        <h3 className="font-bold text-white mb-4">{locale === 'ar' ? 'الشروط والأحكام' : 'Termes et conditions'}</h3>
                        <ul className="space-y-3 text-sm text-slate-300">
                            <li><a href={`/${locale}/privacy`} className="hover:text-brand-green transition-colors">{locale === 'ar' ? 'سياسة الخصوصية' : 'Politique de confidentialité'}</a></li>
                            <li><a href={`/${locale}/accessibility`} className="hover:text-brand-green transition-colors">{locale === 'ar' ? 'إمكانية الوصول' : 'Accessibilité'}</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex flex-col items-center md:items-start gap-1">
                        <p className="text-sm text-slate-300">
                            © {currentYear} TDM. {locale === 'ar' ? 'جميع الحقوق محفوظة.' : 'Tous droits réservés.'}
                        </p>
                        <p className="text-xs text-slate-500 font-medium">
                            {locale === 'ar' ? 'تصميم وبرمجة' : 'Conçu et développé par'} <a href="https://afrikyia.com" target="_blank" rel="noopener noreferrer" className="text-brand-green hover:underline font-bold transition-all">afrikyia</a>
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <a
                            href="https://www.facebook.com/profile.php?id=100072464028163"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                            className="text-slate-500 hover:text-[#1877F2] transition-colors duration-200"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.313 0 2.686.236 2.686.236v2.97h-1.514c-1.491 0-1.956.93-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/>
                            </svg>
                        </a>
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-red"></span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
