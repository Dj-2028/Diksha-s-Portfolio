import {
    SiReact, SiJavascript, SiTypescript, SiTailwindcss, SiNextdotjs,
    SiNodedotjs, SiExpress, SiGraphql,
    SiMongodb, SiPostgresql, SiRedis,
    SiGit, SiDocker, SiVercel,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

// Navigation Links
export const NAV_LINKS = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
];

// Social Links
export const SOCIAL_LINKS = [
    { label: "GitHub", href: "https://github.com/dikshajain", Icon: FaGithub },
    { label: "LinkedIn", href: "https://linkedin.com/in/diksha-jain", Icon: FaLinkedin },
    { label: "Twitter", href: "https://twitter.com/dikshajain", Icon: FaTwitter },
];

// Skills Data
export const SKILLS = {
    frontend: [
        { name: "React", level: 90, Icon: SiReact, color: "#61DAFB" },
        { name: "JavaScript", level: 88, Icon: SiJavascript, color: "#F7DF1E" },
        { name: "TypeScript", level: 75, Icon: SiTypescript, color: "#3178C6" },
        { name: "Tailwind CSS", level: 85, Icon: SiTailwindcss, color: "#06B6D4" },
        { name: "Next.js", level: 72, Icon: SiNextdotjs, color: "#ffffff" },
    ],
    backend: [
        { name: "Node.js", level: 87, Icon: SiNodedotjs, color: "#339933" },
        { name: "Express.js", level: 85, Icon: SiExpress, color: "#ffffff" },
        { name: "REST APIs", level: 90, Icon: TbApi, color: "#6366F1" },
        { name: "GraphQL", level: 65, Icon: SiGraphql, color: "#E10098" },
    ],
    database: [
        { name: "MongoDB", level: 88, Icon: SiMongodb, color: "#47A248" },
        { name: "PostgreSQL", level: 60, Icon: SiPostgresql, color: "#4169E1" },
        { name: "Redis", level: 55, Icon: SiRedis, color: "#DC382D" },
    ],
    devops: [
        { name: "Git & GitHub", level: 90, Icon: SiGit, color: "#F05032" },
        { name: "Docker", level: 65, Icon: SiDocker, color: "#2496ED" },
        { name: "Vercel", level: 85, Icon: SiVercel, color: "#ffffff" },
    ],
};

export const SKILL_CATEGORIES = ["frontend", "backend", "database", "devops"];

// Experience & Education Timeline
export const EXPERIENCE = [
    {
        type: "work",
        title: "Full Stack Developer",
        company: "Freelance / Open Source",
        duration: "2023 – Present",
        points: [
            "Built scalable REST APIs with Node.js and Express for various client projects",
            "Developed responsive React frontends with Tailwind CSS and Framer Motion",
            "Integrated MongoDB Atlas, JWT authentication, and third-party APIs",
        ],
    },
    {
        type: "education",
        title: "B.Tech Computer Science",
        company: "University / College",
        duration: "2019 – 2023",
        points: [
            "Specialized in web development and software engineering fundamentals",
            "Led college coding club and organized hackathons",
            "Built multiple full-stack projects for coursework and competitions",
        ],
    },
];

// Stats for About section
export const STATS = [
    { label: "Years Experience", value: 3, suffix: "+" },
    { label: "Projects Completed", value: 20, suffix: "+" },
    { label: "Technologies", value: 15, suffix: "+" },
    { label: "Happy Clients", value: 10, suffix: "+" },
];

// Project filter categories
export const PROJECT_CATEGORIES = [
    { label: "All", value: "all" },
    { label: "Full Stack", value: "fullstack" },
    { label: "Frontend", value: "frontend" },
    { label: "Backend", value: "backend" },
];
