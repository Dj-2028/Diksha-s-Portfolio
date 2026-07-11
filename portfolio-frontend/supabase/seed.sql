-- ============================================================
-- Supabase Schema + Seed Data for Diksha Jain Portfolio
-- Run this in the Supabase SQL Editor (Dashboard → SQL → New Query)
-- ============================================================

-- ============ TABLES ============

-- projects
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  tech_stack text[],
  category text, -- 'web' | 'ai-cv' | 'design' | 'hackathon'
  image_url text,
  live_url text,
  github_url text,
  achievement text,
  featured boolean default false,
  display_order int default 0,
  created_at timestamptz default now()
);

-- experience
create table if not exists experience (
  id uuid primary key default gen_random_uuid(),
  role text not null,
  organization text not null,
  start_date date,
  end_date date, -- null = present
  description text,
  tech_stack text[],
  display_order int default 0
);

-- achievements
create table if not exists achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  detail text,
  link text,
  display_order int default 0
);

-- contacts (form submissions)
create table if not exists contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  created_at timestamptz default now(),
  read boolean default false
);

-- ============ ROW LEVEL SECURITY ============

alter table projects enable row level security;
alter table experience enable row level security;
alter table achievements enable row level security;
alter table contacts enable row level security;

-- Public read policies
create policy "public read projects" on projects for select using (true);
create policy "public read experience" on experience for select using (true);
create policy "public read achievements" on achievements for select using (true);

-- Admin write policies (any authenticated user)
create policy "admin write projects" on projects for all using (auth.uid() is not null);
create policy "admin write experience" on experience for all using (auth.uid() is not null);
create policy "admin write achievements" on achievements for all using (auth.uid() is not null);

-- Contact: anyone can insert, only admin can read
create policy "public insert contact" on contacts for insert with check (true);
create policy "admin read contact" on contacts for select using (auth.uid() is not null);
create policy "admin update contact" on contacts for update using (auth.uid() is not null);

-- ============ SEED DATA: PROJECTS ============

insert into projects (title, description, tech_stack, category, github_url, live_url, achievement, featured, display_order) values
(
  'Hire But Smarter',
  'AI-powered hiring platform built during IIT Kanpur Hackathon. Features smart resume parsing, AI-driven candidate matching, and real-time collaboration tools for recruiters.',
  ARRAY['React', 'Node.js', 'Express', 'MongoDB', 'AI/ML'],
  'hackathon',
  'https://github.com/Dj-2028',
  null,
  '2nd Place – IIT Kanpur Hackathon',
  true,
  1
),
(
  'Secure Alumni Connect',
  'Alumni networking platform with JWT authentication, AI career simulator, role-based access control, and real-time chat. Built for the Rangronak hackathon.',
  ARRAY['React', 'Node.js', 'JWT', 'MongoDB', 'AI'],
  'hackathon',
  'https://github.com/Dj-2028',
  null,
  'Top 6 – Rangronak',
  true,
  2
),
(
  'NGO Website',
  'Full-stack responsive website for an NGO with dynamic content management, donation tracking, and event showcase. Built with React frontend and Supabase backend.',
  ARRAY['React', 'Supabase', 'Tailwind CSS'],
  'web',
  'https://github.com/Dj-2028',
  null,
  null,
  false,
  3
),
(
  'VLM_Llama / InternVL Inference',
  'C++ multimodal VLM inference engine using llama.cpp. Implements license plate OCR pipeline with real-time vision-language model processing on edge devices.',
  ARRAY['C++', 'llama.cpp', 'CMake', 'OCR', 'VLM'],
  'ai-cv',
  'https://github.com/Dj-2028',
  null,
  null,
  true,
  4
),
(
  'Essor D2S Studio Brand Guidelines',
  'Complete brand design system and guidelines for Essor D2S Studio. Includes logo usage, color palette, typography rules, and a Python/WeasyPrint pipeline for automated PDF generation.',
  ARRAY['Design System', 'Python', 'WeasyPrint', 'Figma'],
  'design',
  null,
  null,
  null,
  false,
  5
),
(
  'Graphic Design Portfolio',
  'Personal graphic design portfolio showcasing branding work, UI/UX concepts, social media creatives, and print design. Deployed on Vercel with a custom domain.',
  ARRAY['Figma', 'Illustrator', 'Photoshop', 'Vercel'],
  'design',
  null,
  'https://graphic-portfolio-nine.vercel.app',
  null,
  false,
  6
);

-- ============ SEED DATA: EXPERIENCE ============

insert into experience (role, organization, start_date, end_date, description, tech_stack, display_order) values
(
  'Full Stack Developer Intern',
  'Gyaini',
  '2026-05-01',
  '2026-07-31',
  'Working on Edge AI/CV solutions. Building multimodal VLM inference pipelines using llama.cpp for on-device processing, and developing full-stack web dashboards for model monitoring and deployment.',
  ARRAY['C++', 'llama.cpp', 'React', 'Node.js', 'Edge AI'],
  1
),
(
  'Frontend Developer Intern',
  'ASPARSH Startup',
  '2025-09-01',
  '2026-02-28',
  'Built responsive frontend interfaces using React and Tailwind CSS. Collaborated with the design team to implement pixel-perfect UI components and integrated REST APIs for dynamic data rendering.',
  ARRAY['React', 'Tailwind CSS', 'REST APIs', 'JavaScript'],
  2
);

-- ============ SEED DATA: ACHIEVEMENTS ============

insert into achievements (title, detail, link, display_order) values
(
  '2nd Place – IIT Kanpur Hackathon',
  'Built "Hire But Smarter", an AI-powered hiring platform, competing against 100+ teams nationally.',
  null,
  1
),
(
  'Top 6 – Rangronak Hackathon',
  'Developed "Secure Alumni Connect" with AI career simulator and JWT auth. Selected in top 6 from 80+ teams.',
  null,
  2
),
(
  'NPTEL Silver Medal',
  'Achieved Silver Medal certification in NPTEL course, demonstrating strong academic performance in computer science.',
  null,
  3
),
(
  'SIH Internal Round Qualifier',
  'Qualified the internal round of Smart India Hackathon (SIH) at college level with an innovative solution.',
  null,
  4
),
(
  '6+ National Hackathons',
  'Participated and competed in over 6 national-level hackathons, consistently delivering innovative full-stack and AI solutions.',
  null,
  5
);
