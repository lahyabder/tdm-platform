import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifySession } from '@/lib/auth';

const locales = ['ar', 'fr'];
const defaultLocale = 'ar';

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Admin Route Server-Side Protection
    const isAdminRoute = pathname.includes('/admin') && !pathname.endsWith('/admin/login');
    const sessionToken = request.cookies.get('tdm_session')?.value;

    if (isAdminRoute) {
        let isValid = false;
        if (sessionToken) {
            const payload = await verifySession(sessionToken);
            if (payload) {
                isValid = true;
            }
        }
        
        if (!isValid) {
            const localeMatch = pathname.match(/^\/([a-z]{2})\//);
            const locale = localeMatch ? localeMatch[1] : defaultLocale;
            const response = NextResponse.redirect(new URL(`/${locale}/admin/login`, request.url));
            if (sessionToken) {
                response.cookies.delete('tdm_session');
            }
            return response;
        }
    }


    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    );

    if (pathnameHasLocale) {
        // Store the locale in a cookie for future visits
        const locale = locales.find(l => pathname.startsWith(`/${l}`)) || defaultLocale;
        const response = NextResponse.next();
        response.cookies.set('NEXT_LOCALE', locale, { path: '/', maxAge: 31536000 });
        return response;
    }

    // Redirect if there is no locale
    // 1. Check cookie
    let locale = request.cookies.get('NEXT_LOCALE')?.value;

    // 2. Check Accept-Language header
    if (!locale) {
        const acceptLanguage = request.headers.get('accept-language');
        if (acceptLanguage) {
            if (acceptLanguage.toLowerCase().includes('fr')) {
                locale = 'fr';
            } else if (acceptLanguage.toLowerCase().includes('ar')) {
                locale = 'ar';
            }
        }
    }

    // 3. Fallback
    locale = locale && locales.includes(locale) ? locale : defaultLocale;

    request.nextUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(request.nextUrl);
}

export const config = {
    matcher: [
        // Skip all internal paths (_next) and static files (with dots)
        '/((?!_next|api|favicon.ico|.*\\..*).*)',
    ],
};
