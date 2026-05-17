-- 1. Create the legislations table
CREATE TABLE IF NOT EXISTS public.legislations (
    id TEXT PRIMARY KEY,
    title_ar TEXT NOT NULL,
    title_fr TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('law', 'decree', 'order', 'circular')),
    date DATE NOT NULL,
    pdf_url TEXT,
    summary_ar TEXT,
    summary_fr TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create the licenses table
CREATE TABLE IF NOT EXISTS public.licenses (
    id TEXT PRIMARY KEY,
    facility_ref TEXT NOT NULL REFERENCES public.facilities(ref) ON DELETE CASCADE,
    issue_date DATE NOT NULL,
    expiry_date DATE NOT NULL,
    validity_years INTEGER NOT NULL,
    renewal_threshold_days INTEGER NOT NULL DEFAULT 60,
    status TEXT NOT NULL CHECK (status IN ('active', 'expired', 'pending', 'suspended')),
    legislation_id TEXT REFERENCES public.legislations(id) ON DELETE SET NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Create the downloads table
CREATE TABLE IF NOT EXISTS public.downloads (
    id TEXT PRIMARY KEY,
    title_ar TEXT NOT NULL,
    title_fr TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('pdf', 'docx', 'xlsx')),
    size TEXT NOT NULL,
    url TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('forms', 'technical', 'guides')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Create the admin_users table
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL DEFAULT 'admin' CHECK (role IN ('admin', 'editor', 'viewer')),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
    permissions TEXT[] DEFAULT '{}',
    password_hash TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- --- Enable Row Level Security (RLS) ---
ALTER TABLE public.legislations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.downloads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- --- Create Secure Policies (Strict Least Privilege) ---

-- Legislations Policies
CREATE POLICY "Allow public read-only on legislations" ON public.legislations
    FOR SELECT TO public USING (true);

-- Licenses Policies
CREATE POLICY "Allow public read-only on licenses" ON public.licenses
    FOR SELECT TO public USING (true);

-- Downloads Policies
CREATE POLICY "Allow public read-only on downloads" ON public.downloads
    FOR SELECT TO public USING (true);

-- Admin Users Policies (Completely locked down - Server-side only access)
-- No public policies allowed. Server API uses Service Role key to bypass RLS.
