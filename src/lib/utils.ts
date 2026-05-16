export function formatNumber(num: number | string, locale: string): string {
    const n = typeof num === 'string' ? parseFloat(num) : num;
    if (isNaN(n)) return String(num);

    return new Intl.NumberFormat(locale === 'ar' ? 'ar-MA' : 'fr-FR', {
        useGrouping: false,
    }).format(n);
}

export function formatDate(dateStr: string, locale: string): string {
    const isAr = locale === 'ar';
    
    // Handle "DD/MM/YYYY" or "YYYY" or "YYYY-MM-DD"
    if (dateStr.includes('/') || dateStr.includes('-')) {
        const date = new Date(dateStr.includes('/') ? dateStr.split('/').reverse().join('-') : dateStr);
        
        if (!isNaN(date.getTime())) {
            if (isAr) {
                const months = [
                    'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
                    'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
                ];
                const d = date.getDate();
                const m = months[date.getMonth()];
                const y = date.getFullYear();
                return toArabicNumerals(`${d} ${m} ${y}`);
            }
            return new Intl.DateTimeFormat('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            }).format(date);
        }
    }

    // Handle plain year "2025"
    if (/^\d{4}$/.test(dateStr)) {
        return isAr ? toArabicNumerals(dateStr) : dateStr;
    }

    // Handle strings like "Ramadan 2025"
    if (isAr) {
        return dateStr.replace(/\d+/g, (m) => toArabicNumerals(m));
    }

    return dateStr;
}

export function toArabicNumerals(str: string | number): string {
    const s = String(str);
    const id = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return s.replace(/[0-9]/g, (w) => id[+w]);
}
