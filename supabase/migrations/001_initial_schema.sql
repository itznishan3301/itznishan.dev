-- ============================================================
-- Portfolio CMS Database Schema
-- Run this in Supabase SQL Editor
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- PROFILES
-- ============================================================
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  professional_title TEXT,
  tagline TEXT,
  bio TEXT,
  email TEXT,
  phone TEXT,
  location TEXT,
  avatar_url TEXT,
  resume_url TEXT,
  availability_status TEXT DEFAULT 'Open to opportunities',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SKILL CATEGORIES
-- ============================================================
CREATE TABLE public.skill_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SKILLS
-- ============================================================
CREATE TABLE public.skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES public.skill_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PROJECTS
-- ============================================================
CREATE TABLE public.projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  long_description TEXT,
  problem TEXT,
  solution TEXT,
  role TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  tags TEXT[] DEFAULT '{}',
  thumbnail_url TEXT,
  live_url TEXT,
  github_url TEXT,
  featured BOOLEAN DEFAULT false,
  published BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- PROJECT MEDIA
-- ============================================================
CREATE TABLE public.project_media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  media_url TEXT NOT NULL,
  media_type TEXT DEFAULT 'image',
  alt_text TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- EXPERIENCE
-- ============================================================
CREATE TABLE public.experience (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company TEXT NOT NULL,
  role TEXT NOT NULL,
  description TEXT,
  start_date TEXT NOT NULL,
  end_date TEXT DEFAULT 'Present',
  location TEXT,
  type TEXT DEFAULT 'freelance',
  tech_stack TEXT[] DEFAULT '{}',
  highlights TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- EDUCATION
-- ============================================================
CREATE TABLE public.education (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  field TEXT,
  start_date TEXT NOT NULL,
  end_date TEXT,
  location TEXT,
  highlights TEXT[] DEFAULT '{}',
  published BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SOCIAL LINKS
-- ============================================================
CREATE TABLE public.social_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  icon TEXT,
  username TEXT,
  sort_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SITE SETTINGS (key-value for flexible config)
-- ============================================================
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- NAVIGATION ITEMS
-- ============================================================
CREATE TABLE public.navigation_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- SECTIONS (dynamic section system)
-- ============================================================
CREATE TABLE public.sections (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT,
  subtitle TEXT,
  visible BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- UPDATED_AT TRIGGER
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_skill_categories_updated_at BEFORE UPDATE ON public.skill_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_skills_updated_at BEFORE UPDATE ON public.skills FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_projects_updated_at BEFORE UPDATE ON public.projects FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_experience_updated_at BEFORE UPDATE ON public.experience FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_education_updated_at BEFORE UPDATE ON public.education FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_social_links_updated_at BEFORE UPDATE ON public.social_links FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_navigation_items_updated_at BEFORE UPDATE ON public.navigation_items FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_sections_updated_at BEFORE UPDATE ON public.sections FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sections ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- RLS POLICIES — Public read for published content
-- ============================================================

CREATE POLICY "Public can read published profiles"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Public can read published skill categories"
  ON public.skill_categories FOR SELECT
  USING (published = true);

CREATE POLICY "Public can read published skills"
  ON public.skills FOR SELECT
  USING (published = true);

CREATE POLICY "Public can read published projects"
  ON public.projects FOR SELECT
  USING (published = true);

CREATE POLICY "Public can read project media"
  ON public.project_media FOR SELECT
  USING (true);

CREATE POLICY "Public can read published experience"
  ON public.experience FOR SELECT
  USING (published = true);

CREATE POLICY "Public can read published education"
  ON public.education FOR SELECT
  USING (published = true);

CREATE POLICY "Public can read published social links"
  ON public.social_links FOR SELECT
  USING (published = true);

CREATE POLICY "Public can read site settings"
  ON public.site_settings FOR SELECT
  USING (true);

CREATE POLICY "Public can read published nav items"
  ON public.navigation_items FOR SELECT
  USING (published = true);

CREATE POLICY "Public can read visible sections"
  ON public.sections FOR SELECT
  USING (visible = true);

-- ============================================================
-- RLS POLICIES — Admin full access (uses email check function)
-- ============================================================

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    SELECT auth.jwt()->>'email' = 'itznishan3301@gmail.com'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admin policies for ALL tables
CREATE POLICY "Admin full access on profiles"
  ON public.profiles FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admin full access on skill_categories"
  ON public.skill_categories FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admin full access on skills"
  ON public.skills FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admin full access on projects"
  ON public.projects FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admin full access on project_media"
  ON public.project_media FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admin full access on experience"
  ON public.experience FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admin full access on education"
  ON public.education FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admin full access on social_links"
  ON public.social_links FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admin full access on site_settings"
  ON public.site_settings FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admin full access on navigation_items"
  ON public.navigation_items FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

CREATE POLICY "Admin full access on sections"
  ON public.sections FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());
