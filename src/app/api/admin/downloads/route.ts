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
        const { id, title_ar, title_fr, type, size, url, category } = body;

        if (!id || !title_ar || !title_fr || !url) {
            return NextResponse.json({ error: 'Missing required fields (id, titles, url)' }, { status: 400 });
        }

        const { data, error } = await supabaseServer.from('downloads').insert([{
            id,
            title_ar,
            title_fr,
            type,
            size,
            url,
            category
        }]).select();

        if (error) {
            console.error('DB Insert Download Error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (e: any) {
        console.error('API Downloads POST error:', e);
        return NextResponse.json({ error: e.message || 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        if (!(await checkAuth())) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { id, title_ar, title_fr, type, size, url, category } = body;

        if (!id) {
            return NextResponse.json({ error: 'Missing download ID' }, { status: 400 });
        }

        const { data, error } = await supabaseServer.from('downloads').update({
            title_ar,
            title_fr,
            type,
            size,
            url,
            category
        }).eq('id', id).select();

        if (error) {
            console.error('DB Update Download Error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (e: any) {
        console.error('API Downloads PUT error:', e);
        return NextResponse.json({ error: e.message || 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        if (!(await checkAuth())) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Missing download ID' }, { status: 400 });
        }

        const { error } = await supabaseServer.from('downloads').delete().eq('id', id);

        if (error) {
            console.error('DB Delete Download Error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (e: any) {
        console.error('API Downloads DELETE error:', e);
        return NextResponse.json({ error: e.message || 'Internal Server Error' }, { status: 500 });
    }
}
