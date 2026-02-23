export function Footer({ locale, dict }: { locale: string; dict: any }) {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-white border-t-4 border-brand-green/20">
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-3 mb-4">
                            <img src="/logo.png" alt="TDM Logo" className="h-16 w-auto object-contain drop-shadow-sm" />
                        </div>
                        <p className="text-sm text-slate-500 leading-relaxed">
                            {locale === 'ar' ? 'منصة الخدمات المؤسسية الرسمية المعتمدة لتقديم الخدمات الرقمية.' : 'Plateforme officielle de services institutionnels.'}
                        </p>
                    </div>

                    <div className="md:col-span-1">
                        <h3 className="font-bold text-slate-800 mb-4">{locale === 'ar' ? 'روابط سريعة' : 'Liens rapides'}</h3>
                        <ul className="space-y-3 text-sm text-slate-600">
                            <li><a href={`/${locale}`} className="hover:text-brand-green transition-colors">{dict.home}</a></li>
                            <li><a href={`/${locale}/admin`} className="hover:text-brand-green transition-colors">{dict.dashboard}</a></li>
                        </ul>
                    </div>

                    <div className="md:col-span-1">
                        <h3 className="font-bold text-slate-800 mb-4">{locale === 'ar' ? 'الدعم الفني' : 'Support technique'}</h3>
                        <ul className="space-y-3 text-sm text-slate-600">
                            <li><a href="#" className="hover:text-brand-green transition-colors">{locale === 'ar' ? 'اتصل بنا' : 'Contactez-nous'}</a></li>
                            <li><a href="#" className="hover:text-brand-green transition-colors">{locale === 'ar' ? 'الأسئلة الشائعة' : 'FAQ'}</a></li>
                        </ul>
                    </div>

                    <div className="md:col-span-1">
                        <h3 className="font-bold text-slate-800 mb-4">{locale === 'ar' ? 'الشروط والأحكام' : 'Termes et conditions'}</h3>
                        <ul className="space-y-3 text-sm text-slate-600">
                            <li><a href="#" className="hover:text-brand-green transition-colors">{locale === 'ar' ? 'سياسة الخصوصية' : 'Politique de confidentialité'}</a></li>
                            <li><a href="#" className="hover:text-brand-green transition-colors">{locale === 'ar' ? 'إمكانية الوصول' : 'Accessibilité'}</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex flex-col items-center md:items-start gap-1">
                        <p className="text-sm text-slate-500">
                            © {currentYear} TDM. {locale === 'ar' ? 'جميع الحقوق محفوظة.' : 'Tous droits réservés.'}
                        </p>
                        <p className="text-xs text-slate-400 font-medium">
                            {locale === 'ar' ? 'تصميم وبرمجة' : 'Conçu et développé par'} <a href="https://lahy.space" target="_blank" rel="noopener noreferrer" className="text-brand-green hover:underline font-bold transition-all">lahy</a>
                        </p>
                    </div>
                    <div className="flex gap-4">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-green"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow"></span>
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-red"></span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
