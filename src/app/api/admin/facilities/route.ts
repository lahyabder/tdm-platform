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
        const { ref, name_ar, name_fr, type, city_ar, city_fr, status, expiry_date, legislation_ref, logo_url } = body;

        if (!ref) {
            return NextResponse.json({ error: 'Missing facility reference (ref)' }, { status: 400 });
        }

        const { data, error } = await supabaseServer.from('facilities').insert([{
            ref,
            name_ar,
            name_fr,
            type,
            city_ar,
            city_fr,
            status,
            expiry_date,
            legislation_ref,
            logo_url
        }]).select();

        if (error) {
            console.error('DB Insert Facility Error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (e: any) {
        console.error('API Facilities POST error:', e);
        return NextResponse.json({ error: e.message || 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        if (!(await checkAuth())) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { ref, name_ar, name_fr, type, city_ar, city_fr, status, expiry_date, legislation_ref, logo_url } = body;

        if (!ref) {
            return NextResponse.json({ error: 'Missing facility reference (ref)' }, { status: 400 });
        }

        const { data, error } = await supabaseServer.from('facilities').update({
            name_ar,
            name_fr,
            type,
            city_ar,
            city_fr,
            status,
            expiry_date,
            legislation_ref,
            logo_url
        }).eq('ref', ref).select();

        if (error) {
            console.error('DB Update Facility Error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (e: any) {
        console.error('API Facilities PUT error:', e);
        return NextResponse.json({ error: e.message || 'Internal Server Error' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        if (!(await checkAuth())) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const ref = searchParams.get('ref');

        if (!ref) {
            return NextResponse.json({ error: 'Missing facility reference (ref)' }, { status: 400 });
        }

        const { error } = await supabaseServer.from('facilities').delete().eq('ref', ref);

        if (error) {
            console.error('DB Delete Facility Error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (e: any) {
        console.error('API Facilities DELETE error:', e);
        return NextResponse.json({ error: e.message || 'Internal Server Error' }, { status: 500 });
    }
}
