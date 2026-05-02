'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import AdminGuard from '@/components/admin/AdminGuard';
import { use, useEffect, useState } from 'react';
import { useNewsStore } from '@/store/useNewsStore';
import { useFacilityStore } from '@/store/useFacilityStore';

export default function AdminLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = use(params) as any;
    const pathname = usePathname();
    const router = useRouter();

    // If on login page, don't show the sidebar shell
    if (pathname.endsWith('/admin/login')) {
        return <AdminGuard>{children}</AdminGuard>;
    }

    const t = {
        ar: {
            dashboard: "لوحة القيادة",
            facilities: "المنشآت الإعلامية",
            licenses: "التراخيص",
            legislation: "المرجعيات التشريعية",
            users: "المستخدمون",
            settings: "الإعدادات",
            logout: "تسجيل الخروج",
            viewSite: "عرض الموقع",
            admin: "مدير النظام"
        },
        fr: {
            dashboard: "Tableau de bord",
            facilities: "Établissements",
            licenses: "Licences",
            legislation: "Législation",
            users: "Utilisateurs",
            settings: "Paramètres",
            logout: "Déconnexion",
            viewSite: "Voir le site",
            admin: "Administrateur"
        }
    }[locale as 'ar' | 'fr'];

    const navItems = [
        { name: t.dashboard, path: `/${locale}/admin`, icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" },
        { name: locale === 'ar' ? 'الأخبار' : 'Actualités', path: `/${locale}/admin/news`, icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l4 4v10a2 2 0 01-2 2z M14 4v4h4" },
        { name: locale === 'ar' ? 'إدارة الصفحات' : 'Pages Content', path: `/${locale}/admin/pages`, icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" },
        { name: t.facilities, path: `/${locale}/admin/facilities`, icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" },
        { name: t.licenses, path: `/${locale}/admin/licenses`, icon: "M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" },
        {name: t.legislation, path: `/${locale}/admin/legal`, icon: "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" },
        {name: locale === 'ar' ? 'الخريطة التفاعلية' : 'Carte Interactive', path: `/${locale}/admin/map`, icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 4L9 7" },
        {name: locale === 'ar' ? 'إدارة البث المباشر' : 'Streaming Direct', path: `/${locale}/admin/live`, icon: "M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" },
        {name: t.users, path: `/${locale}/admin/users`, icon: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" },
        {name: t.settings, path: `/${locale}/admin/settings`, icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" },
    ];

    const handleLogout = () => {
        localStorage.removeItem('tdm_admin_auth');
        router.push(`/${locale}/admin/login`);
    };

    return (
        <AdminGuard>
            <div className="min-h-screen bg-slate-50 flex" dir={locale === 'ar' ? 'rtl' : 'ltr'}>

                {/* Sidebar */}
                <aside className="w-64 bg-slate-900 border-r border-slate-800 rtl:border-r-0 rtl:border-l shrink-0 hidden md:flex flex-col">
                    <div className="h-16 flex items-center px-6 bg-slate-950 border-b border-slate-800">
                        <div className="w-8 h-8 bg-brand-green rounded-sm flex items-center justify-center mr-3 rtl:mr-0 rtl:ml-3">
                            <span className="text-white font-black text-xs">TDM</span>
                        </div>
                        <span className="text-white font-bold tracking-wide">Admin Portal</span>
                    </div>

                    <nav className="flex-1 py-6 px-4 space-y-1 overflow-y-auto">
                        {navItems.map((item) => {
                            const isActive = pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    href={item.path}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-sm transition-colors ${isActive
                                        ? 'bg-brand-green/10 text-brand-green font-bold'
                                        : 'text-slate-400 hover:bg-slate-800 hover:text-white font-medium'
                                        }`}
                                >
                                    <svg className={`w-5 h-5 ${isActive ? 'text-brand-green' : 'text-slate-500'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                    </svg>
                                    {item.name}
                                </Link>
                            );
                        })}
                    </nav>

                    <div className="p-4 border-t border-slate-800">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-3 px-3 py-2.5 w-full text-slate-400 hover:bg-slate-800 hover:text-brand-red font-medium rounded-sm transition-colors text-left rtl:text-right"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                            {t.logout}
                        </button>
                    </div>
                </aside>

                {/* Main Content Viewport */}
                <div className="flex-1 flex flex-col min-w-0">

                    {/* Topbar */}
                    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0">
                        <div className="font-bold text-slate-800">
                            {navItems.find(i => i.path === pathname)?.name || t.dashboard}
                        </div>
                        <div className="flex items-center gap-6">
                            <Link href={`/${locale === 'ar' ? 'fr' : 'ar'}/admin`} className="text-xs font-bold text-slate-500 hover:text-brand-green transition-colors uppercase">
                                {locale === 'ar' ? 'Français' : 'العربية'}
                            </Link>
                            <Link href={`/${locale}`} target="_blank" className="text-xs font-bold text-slate-500 hover:text-brand-green transition-colors flex items-center gap-1">
                                {t.viewSite}
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                            </Link>
                            <div className="h-8 w-px bg-slate-200"></div>
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green font-bold text-sm">A</div>
                                <span className="text-sm font-bold text-slate-700 hidden sm:block">{t.admin}</span>
                            </div>
                        </div>
                    </header>

                    {/* Page Content */}
                    <main className="flex-1 overflow-y-auto p-6 md:p-8">
                        <div className="max-w-6xl mx-auto">
                            {children}
                        </div>
                    </main>

                </div>
            </div>
        </AdminGuard>
    );
}
