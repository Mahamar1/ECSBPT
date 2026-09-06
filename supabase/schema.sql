-- ========================================================
-- SAMA BTP IMMO - DATABASE SCHEMA & STORAGE BUCKETS (SUPABASE)
-- ========================================================

-- 1. USERS & PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name TEXT,
    last_name TEXT,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    role TEXT DEFAULT 'ADMIN' CHECK (role IN ('SUPER_ADMIN', 'ADMIN', 'EDITOR')),
    avatar TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. PROPERTIES TABLE
CREATE TABLE IF NOT EXISTS public.properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    reference TEXT UNIQUE NOT NULL,
    type TEXT NOT NULL CHECK (type IN (
        'Appartement', 'Villa', 'Maison', 'Terrain', 'Immeuble', 
        'Bureau', 'Magasin', 'Local commercial', 'Studio', 'Entrepôt'
    )),
    transaction_type TEXT NOT NULL CHECK (transaction_type IN ('Vente', 'Location')),
    price NUMERIC NOT NULL,
    currency TEXT DEFAULT 'FCFA',
    location TEXT NOT NULL,
    neighborhood TEXT NOT NULL,
    city TEXT DEFAULT 'Dakar',
    surface NUMERIC,
    bedrooms INT DEFAULT 0,
    bathrooms INT DEFAULT 0,
    floors INT DEFAULT 1,
    description TEXT NOT NULL,
    amenities TEXT[] DEFAULT '{}',
    status TEXT DEFAULT 'Disponible' CHECK (status IN ('Brouillon', 'Disponible', 'Réservé', 'Vendu', 'Loué', 'Archivé')),
    published BOOLEAN DEFAULT true,
    featured BOOLEAN DEFAULT false,
    agent_contact TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. PROPERTY IMAGES TABLE
CREATE TABLE IF NOT EXISTS public.property_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES public.properties(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    is_cover BOOLEAN DEFAULT false,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. BTP PROJECTS TABLE
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    location TEXT NOT NULL,
    project_type TEXT NOT NULL CHECK (project_type IN (
        'Villa', 'Immeuble', 'R+1', 'R+2', 'R+5', 'R+10', 'R+11', 
        'Résidence', 'Bureau', 'Commerce', 'Lotissement', 'Rénovation'
    )),
    client TEXT,
    floors INT DEFAULT 1,
    surface NUMERIC,
    budget NUMERIC,
    start_date DATE,
    end_date DATE,
    progress INT DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
    status TEXT DEFAULT 'En cours' CHECK (status IN ('À venir', 'En préparation', 'En cours', 'Terminé', 'Suspendu')),
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. PROJECT IMAGES TABLE
CREATE TABLE IF NOT EXISTS public.project_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. REALIZATIONS TABLE
CREATE TABLE IF NOT EXISTS public.realizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    location TEXT NOT NULL,
    realization_type TEXT NOT NULL,
    year INT DEFAULT EXTRACT(YEAR FROM CURRENT_DATE),
    technical_specs TEXT,
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. REALIZATION IMAGES TABLE
CREATE TABLE IF NOT EXISTS public.realization_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    realization_id UUID REFERENCES public.realizations(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    display_order INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. PUBLICATIONS / CMS ARTICLES TABLE
CREATE TABLE IF NOT EXISTS public.publications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    category TEXT NOT NULL CHECK (category IN (
        'Actualités', 'Immobilier', 'BTP', 'Construction', 
        'Architecture', 'Réalisations', 'Conseils', 'Promotion immobilière'
    )),
    cover_image TEXT,
    status TEXT DEFAULT 'Publié' CHECK (status IN ('Brouillon', 'Publié', 'Programmé', 'Archivé')),
    published_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    scheduled_at TIMESTAMP WITH TIME ZONE,
    author TEXT DEFAULT 'Équipe Sama BTP Immo',
    seo_title TEXT,
    seo_description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. PUBLICATION IMAGES TABLE
CREATE TABLE IF NOT EXISTS public.publication_images (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    publication_id UUID REFERENCES public.publications(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    display_order INT DEFAULT 0
);

-- 10. CLIENTS CRM TABLE
CREATE TABLE IF NOT EXISTS public.clients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    address TEXT,
    client_type TEXT DEFAULT 'Acheteur' CHECK (client_type IN ('Acheteur', 'Locataire', 'Propriétaire', 'Investisseur', 'Client BTP')),
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 11. INQUIRIES & PROPERTY VISIT REQUESTS TABLE
CREATE TABLE IF NOT EXISTS public.inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    property_id UUID REFERENCES public.properties(id) ON DELETE SET NULL,
    client_name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    message TEXT NOT NULL,
    preferred_date DATE,
    inquiry_type TEXT DEFAULT 'Demande de visite',
    status TEXT DEFAULT 'Nouveau' CHECK (status IN ('Nouveau', 'En attente', 'Traité')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 12. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    image TEXT,
    advantages TEXT[] DEFAULT '{}',
    published BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 13. DOCUMENTS TABLE
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    file_url TEXT NOT NULL,
    category TEXT DEFAULT 'Général',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 14. MESSAGES TABLE
CREATE TABLE IF NOT EXISTS public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'Nouveau' CHECK (status IN ('Nouveau', 'En attente', 'Traité')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 15. SETTINGS TABLE
CREATE TABLE IF NOT EXISTS public.settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name TEXT DEFAULT 'Sama BTP Immo',
    logo TEXT,
    tagline TEXT DEFAULT 'Construire aujourd''hui, investir pour demain.',
    phone TEXT DEFAULT '+221 33 800 00 00',
    whatsapp TEXT DEFAULT '+221 77 000 00 00',
    email TEXT DEFAULT 'contact@samabtpimmo.sn',
    address TEXT DEFAULT 'Route des Almadies, Dakar, Sénégal',
    website TEXT DEFAULT 'https://samabtpimmo.sn',
    facebook TEXT,
    instagram TEXT,
    linkedin TEXT,
    youtube TEXT,
    description TEXT DEFAULT 'Entreprise sénégalaise spécialisée dans les grands travaux de construction BTP, la promotion immobilière et la vente/location de biens d''exception.',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.realizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.publications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Public read access policies
CREATE POLICY "Allow public read properties" ON public.properties FOR SELECT USING (published = true);
CREATE POLICY "Allow public read projects" ON public.projects FOR SELECT USING (published = true);
CREATE POLICY "Allow public read realizations" ON public.realizations FOR SELECT USING (published = true);
CREATE POLICY "Allow public read publications" ON public.publications FOR SELECT USING (status = 'Publié');
CREATE POLICY "Allow public read settings" ON public.settings FOR SELECT USING (true);

-- Allow public form submission for inquiries and messages
CREATE POLICY "Allow public insert inquiries" ON public.inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert messages" ON public.messages FOR INSERT WITH CHECK (true);

-- STORAGE BUCKETS SCRIPT (SUPABASE STORAGE)
INSERT INTO storage.buckets (id, name, public) VALUES 
('property-images', 'property-images', true),
('project-images', 'project-images', true),
('realization-images', 'realization-images', true),
('publication-images', 'publication-images', true),
('company-assets', 'company-assets', true),
('documents', 'documents', true)
ON CONFLICT (id) DO NOTHING;
