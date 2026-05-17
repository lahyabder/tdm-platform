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
        const { id, facilityRef, issueDate, expiryDate, validityYears, renewalThresholdDays, status, legislationId, notes } = body;

        if (!id || !facilityRef) {
            return NextResponse.json({ error: 'Missing required fields (id, facilityRef)' }, { status: 400 });
        }

        const { data, error } = await supabaseServer.from('licenses').insert([{
            id,
            facility_ref: facilityRef,
            issue_date: issueDate,
            expiry_date: expiryDate,
            validity_years: validityYears,
            renewal_threshold_days: renewalThresholdDays || 60,
            status,
            legislation_id: legislationId,
            notes
        }]).select();

        if (error) {
            console.error('DB Insert License Error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (e: any) {
        console.error('API Licenses POST error:', e);
        return NextResponse.json({ error: e.message || 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        if (!(await checkAuth())) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { id, facilityRef, issueDate, expiryDate, validityYears, renewalThresholdDays, status, legislationId, notes } = body;

        if (!id) {
            return NextResponse.json({ error: 'Missing license ID' }, { status: 400 });
        }

        const { data, error } = await supabaseServer.from('licenses').update({
            facility_ref: facilityRef,
            issue_date: issueDate,
            expiry_date: expiryDate,
            validity_years: validityYears,
            renewal_threshold_days: renewalThresholdDays,
            status,
            legislation_id: legislationId,
            notes
        }).eq('id', id).select();

        if (error) {
            console.error('DB Update License Error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (e: any) {
        console.error('API Licenses PUT error:', e);
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
            return NextResponse.json({ error: 'Missing license ID' }, { status: 400 });
        }

        const { error } = await supabaseServer.from('licenses').delete().eq('id', id);

        if (error) {
            console.error('DB Delete License Error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (e: any) {
        console.error('API Licenses DELETE error:', e);
        return NextResponse.json({ error: e.message || 'Internal Server Error' }, { status: 500 });
    }
}
