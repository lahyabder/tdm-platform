-- Create the facilities table
CREATE TABLE IF NOT EXISTS public.facilities (
    ref TEXT PRIMARY KEY,
    name_ar TEXT NOT NULL,
    name_fr TEXT NOT NULL,
    type TEXT NOT NULL,
    city_ar TEXT NOT NULL,
    city_fr TEXT NOT NULL,
    status TEXT NOT NULL,
    expiry_date DATE NOT NULL,
    legislation_ref TEXT,
    logo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.facilities ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to read
CREATE POLICY "Allow public read access" ON public.facilities
    FOR SELECT USING (true);

-- Create policies to allow all operations for now
CREATE POLICY "Allow all operations" ON public.facilities
    FOR ALL USING (true);
