import {
    SiReact, SiJavascript, SiPython, SiCplusplus, SiTailwindcss,
    SiNodedotjs, SiExpress, SiPostgresql, SiSupabase,
    SiGit, SiVercel, SiPostman, SiCmake, SiFramer,
} from "react-icons/si";
import { TbApi, TbBrain } from "react-icons/tb";
import { FaGithub, FaLinkedin, FaPalette } from "react-icons/fa";

// Navigation Links
export const NAV_LINKS = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Achievements", href: "#achievements" },
    { label: "Contact", href: "#contact" },
];

// Social Links
export const SOCIAL_LINKS = [
    { label: "GitHub", href: "https://github.com/Dj-2028", Icon: FaGithub },
    { label: "LinkedIn", href: "https://linkedin.com/in/diksha-jain-dj2028", Icon: FaLinkedin },
    { label: "Design Portfolio", href: "https://graphic-portfolio-nine.vercel.app", Icon: FaPalette },
];

// Skills Data — grouped per spec
export const SKILLS = {
    languages: [
        { name: "JavaScript", level: 90, Icon: SiJavascript, color: "#F7DF1E" },
        { name: "Python", level: 82, Icon: SiPython, color: "#3776AB" },
        { name: "C++", level: 78, Icon: SiCplusplus, color: "#00599C" },
    ],
    frontend: [
        { name: "React", level: 90, Icon: SiReact, color: "#61DAFB" },
        { name: "Tailwind CSS", level: 88, Icon: SiTailwindcss, color: "#06B6D4" },
        { name: "shadcn/ui", level: 80, Icon: SiReact, color: "#ffffff" },
        { name: "Framer Motion", level: 82, Icon: SiFramer, color: "#0055FF" },
    ],
    "backend-db": [
        { name: "Node.js", level: 87, Icon: SiNodedotjs, color: "#339933" },
        { name: "Express.js", level: 85, Icon: SiExpress, color: "#ffffff" },
        { name: "Supabase", level: 80, Icon: SiSupabase, color: "#3ECF8E" },
        { name: "REST APIs", level: 90, Icon: TbApi, color: "#6366F1" },
        { name: "PostgreSQL", level: 72, Icon: SiPostgresql, color: "#4169E1" },
    ],
    "ai-cv": [
        { name: "llama.cpp", level: 75, Icon: TbBrain, color: "#FF6B6B" },
        { name: "VLM Inference", level: 72, Icon: TbBrain, color: "#A855F7" },
        { name: "OCR Pipelines", level: 70, Icon: TbBrain, color: "#F59E0B" },
    ],
    tools: [
        { name: "Git & GitHub", level: 92, Icon: SiGit, color: "#F05032" },
        { name: "Postman", level: 85, Icon: SiPostman, color: "#FF6C37" },
        { name: "Vercel", level: 88, Icon: SiVercel, color: "#ffffff" },
        { name: "CMake", level: 65, Icon: SiCmake, color: "#064F8C" },
    ],
};

export const SKILL_CATEGORIES = ["languages", "frontend", "backend-db", "ai-cv", "tools"];

// Stats for About section
export const STATS = [
    { label: "Hackathons", value: 6, suffix: "+" },
    { label: "Projects Built", value: 10, suffix: "+" },
    { label: "Technologies", value: 15, suffix: "+" },
    { label: "Design Systems", value: 3, suffix: "+" },
];

// Project filter categories
export const PROJECT_CATEGORIES = [
    { label: "All", value: "all" },
    { label: "Web", value: "web" },
    { label: "AI / CV", value: "ai-cv" },
    { label: "Design", value: "design" },
    { label: "Hackathon", value: "hackathon" },
];

// Fallback data — used when Supabase is not yet configured
export const FALLBACK_PROJECTS = [
    {
        id: "1",
        title: "Hire But Smarter",
        description: "AI-powered hiring platform built during IIT Kanpur Hackathon. Features smart resume parsing, AI-driven candidate matching, and real-time collaboration tools.",
        tech_stack: ["React", "Node.js", "Express", "MongoDB", "AI/ML"],
        category: "hackathon",
        github_url: "https://github.com/Dj-2028",
        live_url: null,
        achievement: "2nd Place – IIT Kanpur Hackathon",
        featured: true,
        display_order: 1,
    },
    {
        id: "2",
        title: "Secure Alumni Connect",
        description: "Alumni networking platform with JWT authentication, AI career simulator, role-based access control, and real-time chat. Reached Top 6 at Rangronak.",
        tech_stack: ["React", "Node.js", "JWT", "MongoDB", "AI"],
        category: "hackathon",
        github_url: "https://github.com/Dj-2028",
        live_url: null,
        achievement: "Top 6 – Rangronak",
        featured: true,
        display_order: 2,
    },
    {
        id: "3",
        title: "NGO Website",
        description: "Full-stack responsive website for an NGO built with React, Supabase backend, and Tailwind CSS. Features dynamic content management and donation tracking.",
        tech_stack: ["React", "Supabase", "Tailwind CSS"],
        category: "web",
        github_url: "https://github.com/Dj-2028",
        live_url: null,
        featured: false,
        display_order: 3,
    },
    {
        id: "4",
        title: "VLM_Llama / InternVL Inference",
        description: "C++ multimodal VLM inference engine using llama.cpp. Implements license plate OCR pipeline with real-time vision-language model processing on edge devices.",
        tech_stack: ["C++", "llama.cpp", "CMake", "OCR", "VLM"],
        category: "ai-cv",
        github_url: "https://github.com/Dj-2028",
        live_url: null,
        featured: true,
        display_order: 4,
    },
    {
        id: "5",
        title: "Essor D2S Studio Brand Guidelines",
        description: "Complete brand design system and guidelines for Essor D2S Studio. Built a Python/WeasyPrint pipeline for automated PDF generation of brand assets.",
        tech_stack: ["Design System", "Python", "WeasyPrint", "Figma"],
        category: "design",
        github_url: null,
        live_url: null,
        featured: false,
        display_order: 5,
    },
    {
        id: "6",
        title: "Graphic Design Portfolio",
        description: "Personal graphic design portfolio showcasing branding, UI/UX work, social media creatives, and print design. Deployed on Vercel.",
        tech_stack: ["Figma", "Illustrator", "Photoshop", "Vercel"],
        category: "design",
        github_url: null,
        live_url: "https://graphic-portfolio-nine.vercel.app",
        featured: false,
        display_order: 6,
    },
];

export const FALLBACK_EXPERIENCE = [
    {
        id: "1",
        role: "Full Stack Developer Intern",
        organization: "Gyaini",
        start_date: "2026-05-01",
        end_date: "2026-07-31",
        description: "Working on Edge AI/CV solutions. Building multimodal VLM inference pipelines, integrating llama.cpp for on-device processing, and developing full-stack web dashboards for model monitoring.",
        tech_stack: ["C++", "llama.cpp", "React", "Node.js", "Edge AI"],
        display_order: 1,
    },
    {
        id: "2",
        role: "Frontend Developer Intern",
        organization: "ASPARSH Startup",
        start_date: "2025-09-01",
        end_date: "2026-02-28",
        description: "Built responsive frontend interfaces using React and Tailwind CSS. Collaborated with the design team to implement pixel-perfect UI components and integrated REST APIs for dynamic data rendering.",
        tech_stack: ["React", "Tailwind CSS", "REST APIs", "JavaScript"],
        display_order: 2,
    },
];

export const FALLBACK_ACHIEVEMENTS = [
    {
        id: "1",
        title: "2nd Place – IIT Kanpur Hackathon",
        detail: "Built 'Hire But Smarter', an AI-powered hiring platform, competing against 100+ teams nationally.",
        display_order: 1,
    },
    {
        id: "2",
        title: "Top 6 – Rangronak Hackathon",
        detail: "Developed 'Secure Alumni Connect' with AI career simulator and JWT auth. Selected in top 6 from 80+ teams.",
        display_order: 2,
    },
    {
        id: "3",
        title: "NPTEL Silver Medal",
        detail: "Achieved Silver Medal certification in NPTEL course, demonstrating strong academic performance.",
        display_order: 3,
    },
    {
        id: "4",
        title: "SIH Internal Round Qualifier",
        detail: "Qualified the internal round of Smart India Hackathon (SIH) at college level.",
        display_order: 4,
    },
    {
        id: "5",
        title: "6+ National Hackathons",
        detail: "Participated and competed in over 6 national-level hackathons, consistently delivering innovative solutions.",
        display_order: 5,
    },
];
