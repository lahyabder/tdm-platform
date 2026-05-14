import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['ar', 'fr'];
const defaultLocale = 'ar';

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Admin Route Server-Side Protection
    const isAdminRoute = pathname.includes('/admin') && !pathname.endsWith('/admin/login');
    const sessionToken = request.cookies.get('tdm_session')?.value;

    if (isAdminRoute && !sessionToken) {
        const localeMatch = pathname.match(/^\/([a-z]{2})\//);
        const locale = localeMatch ? localeMatch[1] : defaultLocale;
        return NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url));
    }

    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) return;

    // Redirect if there is no locale
    request.nextUrl.pathname = `/${defaultLocale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: [
        // Skip all internal paths (_next) and static files (with dots)
        '/((?!_next|api|favicon.ico|.*\\..*).*)',
    ],
};
