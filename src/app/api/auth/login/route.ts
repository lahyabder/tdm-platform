import { NextResponse } from 'next/server';
import { signSession } from '@/lib/auth';
import { verifyPassword } from '@/lib/crypto';
import { supabaseServer } from '@/lib/supabaseServer';

// In-memory store for tracking failed login attempts
// Keys are formatted as 'ip:username' or just 'ip'
const loginAttempts = new Map<string, { count: number; lockoutUntil: number }>();

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

function getClientIp(request: Request): string {
    const headers = request.headers;
    const xForwardedFor = headers.get('x-forwarded-for');
    if (xForwardedFor) {
        return xForwardedFor.split(',')[0].trim();
    }
    return headers.get('x-real-ip') || '127.0.0.1';
}

export async function POST(request: Request) {
    try {
        const ip = getClientIp(request);
        const { username, password } = await request.json();
        
        const ipKey = `ip:${ip}`;
        const userKey = `user:${username}`;

        const now = Date.now();

        // 1. Check lockouts for both IP and Username
        const ipAttempt = loginAttempts.get(ipKey);
        const userAttempt = loginAttempts.get(userKey);

        if (ipAttempt && ipAttempt.lockoutUntil > now) {
            const minutesLeft = Math.ceil((ipAttempt.lockoutUntil - now) / (60 * 1000));
            return NextResponse.json({
                success: false,
                error: `Too many failed attempts from this IP. Locked out. Try again in ${minutesLeft} minutes.`
            }, { status: 429 });
        }

        if (userAttempt && userAttempt.lockoutUntil > now) {
            const minutesLeft = Math.ceil((userAttempt.lockoutUntil - now) / (60 * 1000));
            return NextResponse.json({
                success: false,
                error: `This account is locked. Try again in ${minutesLeft} minutes.`
            }, { status: 429 });
        }

        // 2. Try to authenticate against the database `admin_users` table first
        let dbAuthenticated = false;
        try {
            const { data: user, error } = await supabaseServer
                .from('admin_users')
                .select('*')
                .eq('email', username)
                .single();

            if (!error && user) {
                if (user.status === 'active' && verifyPassword(password, user.password_hash)) {
                    dbAuthenticated = true;
                } else if (user.status !== 'active') {
                    return NextResponse.json({ success: false, error: 'Account is inactive' }, { status: 403 });
                }
            }
        } catch (dbErr) {
            console.warn('Database login check failed or table admin_users is missing, falling back to environment variables:', dbErr);
        }

        // 3. Fall back to environment credentials if DB check was not successful
        if (!dbAuthenticated) {
            const validUser = process.env.ADMIN_USER;
            const validPass = process.env.ADMIN_PASS;

            if (!validUser || !validPass) {
                console.error('CRITICAL: ADMIN_USER or ADMIN_PASS is not configured in the environment.');
                return NextResponse.json(
                    { success: false, error: 'Server authentication configuration error' },
                    { status: 500 }
                );
            }

            if (username !== validUser || password !== validPass) {
                // Increment failed attempts on failure
                const handleFailure = (key: string) => {
                    const record = loginAttempts.get(key) || { count: 0, lockoutUntil: 0 };
                    record.count += 1;
                    if (record.count >= MAX_FAILED_ATTEMPTS) {
                        record.lockoutUntil = Date.now() + LOCKOUT_DURATION_MS;
                    }
                    loginAttempts.set(key, record);
                };

                handleFailure(ipKey);
                handleFailure(userKey);

                const remaining = MAX_FAILED_ATTEMPTS - (loginAttempts.get(ipKey)?.count || 0);

                return NextResponse.json({
                    success: false,
                    error: remaining > 0 
                        ? `Invalid credentials. ${remaining} attempts remaining before lockout.`
                        : 'Invalid credentials. Account locked out.'
                }, { status: 401 });
            }
        }

        // Reset attempts on successful login
        loginAttempts.delete(ipKey);
        loginAttempts.delete(userKey);

        // Create a cryptographically signed HMAC token
        const sessionToken = await signSession(username);
        
        const response = NextResponse.json({ success: true });
        
        // Set secure, httpOnly cookie
        response.cookies.set('tdm_session', sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 60 * 60 * 24 * 7 // 1 week
        });
        
        return response;
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
    }
}

