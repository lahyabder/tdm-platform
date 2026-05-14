import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { username, password } = await request.json();

        // Use environment variables for server-side auth, fallback for demo if not set
        const validUser = process.env.ADMIN_USER || 'admin';
        const validPass = process.env.ADMIN_PASS || 'tdm2026demo';

        if (username === validUser && password === validPass) {
            // Create a secure token.
            const sessionToken = Buffer.from(`${username}:${validPass}`).toString('base64');
            
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
        }

        return NextResponse.json({ success: false, error: 'Invalid credentials' }, { status: 401 });
    } catch (error) {
        return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
    }
}
