import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession } from '@/lib/auth';
import { supabaseServer } from '@/lib/supabaseServer';

async function checkAuth() {
    const cookieStore = await cookies();
    const token = cookieStore.get('tdm_session')?.value;
    if (!token) return false;
    const payload = await verifySession(token);
    return !!payload;
}

export async function POST(request: Request) {
    try {
        if (!(await checkAuth())) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { page_key, content } = body;

        if (!page_key || !content) {
            return NextResponse.json({ error: 'Missing page key or content data' }, { status: 400 });
        }

        const { data, error } = await supabaseServer.from('page_content').upsert({
            page_key,
            content,
            updated_at: new Date().toISOString()
        }, { onConflict: 'page_key' }).select();

        if (error) {
            console.error('DB Upsert Page Content Error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (e: any) {
        console.error('API Page Content POST error:', e);
        return NextResponse.json({ error: e.message || 'Internal Server Error' }, { status: 500 });
    }
}
