import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verifySession } from '@/lib/auth';
import { supabaseServer } from '@/lib/supabaseServer';
import { hashPassword } from '@/lib/crypto';

async function checkAuth() {
    const cookieStore = await cookies();
    const token = cookieStore.get('tdm_session')?.value;
    if (!token) return false;
    const payload = await verifySession(token);
    return !!payload;
}

export async function GET() {
    try {
        if (!(await checkAuth())) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { data: users, error } = await supabaseServer
            .from('admin_users')
            .select('id, name, email, role, status, permissions, created_at')
            .order('created_at', { ascending: true });

        if (error) {
            console.error('DB Fetch Users Error:', error);
            // If the table doesn't exist yet, return a mock/default list to avoid crash
            if (error.code === 'PGRST116' || error.message.includes('relation "admin_users" does not exist')) {
                return NextResponse.json({
                    success: true,
                    data: [
                        { id: '1', name: 'Admin TDM (Local)', email: process.env.ADMIN_USER || 'admin', role: 'admin', status: 'active', permissions: ['all'] }
                    ]
                });
            }
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data: users });
    } catch (e: any) {
        console.error('API Users GET error:', e);
        return NextResponse.json({ error: e.message || 'Internal Server Error' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        if (!(await checkAuth())) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { name, email, role, status, permissions, password } = body;

        if (!name || !email || !password) {
            return NextResponse.json({ error: 'Missing required fields (name, email, password)' }, { status: 400 });
        }

        const password_hash = hashPassword(password);

        const { data, error } = await supabaseServer.from('admin_users').insert([{
            name,
            email,
            role: role || 'editor',
            status: status || 'active',
            permissions: permissions || [],
            password_hash
        }]).select('id, name, email, role, status, permissions, created_at');

        if (error) {
            console.error('DB Insert User Error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (e: any) {
        console.error('API Users POST error:', e);
        return NextResponse.json({ error: e.message || 'Internal Server Error' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        if (!(await checkAuth())) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();
        const { id, name, email, role, status, permissions, password } = body;

        if (!id) {
            return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });
        }

        const updateData: any = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (role) updateData.role = role;
        if (status) updateData.status = status;
        if (permissions) updateData.permissions = permissions;
        if (password) {
            updateData.password_hash = hashPassword(password);
        }

        const { data, error } = await supabaseServer
            .from('admin_users')
            .update(updateData)
            .eq('id', id)
            .select('id, name, email, role, status, permissions, created_at');

        if (error) {
            console.error('DB Update User Error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, data });
    } catch (e: any) {
        console.error('API Users PUT error:', e);
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
            return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });
        }

        const { error } = await supabaseServer.from('admin_users').delete().eq('id', id);

        if (error) {
            console.error('DB Delete User Error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true });
    } catch (e: any) {
        console.error('API Users DELETE error:', e);
        return NextResponse.json({ error: e.message || 'Internal Server Error' }, { status: 500 });
    }
}
