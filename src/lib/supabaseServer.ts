import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
    console.warn('WARNING: NEXT_PUBLIC_SUPABASE_URL is missing.');
}

export const supabaseServer = createClient(
    supabaseUrl || 'https://placeholder.supabase.co',
    supabaseServiceKey || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder',
    {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
        },
    }
);
