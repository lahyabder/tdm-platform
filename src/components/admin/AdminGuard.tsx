'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const authFlag = localStorage.getItem('tdm_admin_auth');
        const isLoginPage = pathname.endsWith('/admin/login');

        if (!authFlag && !isLoginPage) {
            // Extract locale from pathname (e.g., /ar/admin -> ar)
            const locale = pathname.split('/')[1] || 'ar';
            router.push(`/${locale}/admin/login`);
        } else {
            setIsAuthenticated(true);
        }
    }, [pathname, router]);

    // Don't render children until auth check is complete
    if (isAuthenticated === null) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="w-8 h-8 border-4 border-brand-green border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return <>{children}</>;
}
