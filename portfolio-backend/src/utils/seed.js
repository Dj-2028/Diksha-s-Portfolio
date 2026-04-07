import dotenv from "dotenv";
import mongoose from "mongoose";
import Admin from "../models/Admin.js";
import Project from "../models/Project.js";

dotenv.config();

const sampleProjects = [
    {
        title: "E-Commerce Platform",
        description:
            "A full-stack e-commerce application with product management, cart, and payment integration built with the MERN stack.",
        longDescription:
            "A comprehensive e-commerce solution featuring user authentication, product catalog with filtering, shopping cart, Stripe payment integration, order management, and an admin dashboard for inventory control.",
        tags: ["React", "Node.js", "MongoDB", "Express", "Stripe", "Redux"],
        category: "fullstack",
        githubUrl: "https://github.com/dikshajain",
        demoUrl: "https://demo.example.com",
        imageUrl: "",
        featured: true,
        order: 1,
    },
    {
        title: "Task Management App",
        description:
            "A real-time collaborative task management tool with drag-and-drop, team workspaces, and activity tracking.",
        longDescription:
            "Built with Socket.io for real-time updates, React DnD for drag-and-drop, JWT authentication, and MongoDB for persistent storage. Supports multiple team workspaces, task assignments, and deadline tracking.",
        tags: ["React", "Node.js", "Socket.io", "MongoDB", "Tailwind CSS"],
        category: "fullstack",
        githubUrl: "https://github.com/dikshajain",
        demoUrl: "",
        imageUrl: "",
        featured: true,
        order: 2,
    },
    {
        title: "REST API Boilerplate",
        description:
            "A production-ready Node.js REST API template with authentication, rate limiting, and automated testing.",
        longDescription:
            "A comprehensive Express.js API starter kit featuring JWT auth, role-based access control, rate limiting, input validation, Swagger docs, and Jest test suite. Designed for rapid API development.",
        tags: ["Node.js", "Express", "MongoDB", "Jest", "Swagger"],
        category: "backend",
        githubUrl: "https://github.com/dikshajain",
        demoUrl: "",
        imageUrl: "",
        featured: false,
        order: 3,
    },
    {
        title: "Portfolio Website",
        description:
            "A visually stunning MERN stack portfolio with animations, dark mode, and admin CMS — this very website!",
        longDescription:
            "Built with React + Vite, Tailwind CSS, Framer Motion for animations, and a Node.js/Express backend. Features a JWT-protected admin panel for content management, contact form with email notifications, and full dark/light mode support.",
        tags: ["React", "Vite", "Tailwind CSS", "Framer Motion", "Node.js", "MongoDB"],
        category: "fullstack",
        githubUrl: "https://github.com/dikshajain",
        demoUrl: "",
        imageUrl: "",
        featured: true,
        order: 4,
    },
    {
        title: "Weather Dashboard",
        description:
            "A React weather dashboard consuming OpenWeatherMap API with animated weather cards and 5-day forecasts.",
        longDescription:
            "A React SPA fetching real-time weather data for any city. Features animated weather condition icons, hourly + 5-day forecasts, location detection, and a dark/light theme.",
        tags: ["React", "Axios", "OpenWeatherMap API", "CSS Animations"],
        category: "frontend",
        githubUrl: "https://github.com/dikshajain",
        demoUrl: "",
        imageUrl: "",
        featured: false,
        order: 5,
    },
];

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB");

        // Clear existing data
        await Project.deleteMany({});
        await Admin.deleteMany({});
        console.log("🗑️  Cleared existing data");

        // Seed projects
        await Project.insertMany(sampleProjects);
        console.log(`✅ Inserted ${sampleProjects.length} sample projects`);

        // Seed admin
        const admin = new Admin({
            email: process.env.ADMIN_EMAIL || "admin@portfolio.com",
            password: process.env.ADMIN_PASSWORD || "Admin@123456",
        });
        await admin.save();
        console.log(`✅ Admin created: ${admin.email}`);
        console.log(`🔑 Password: ${process.env.ADMIN_PASSWORD || "Admin@123456"}`);

        console.log("\n🎉 Database seeded successfully!");
        process.exit(0);
    } catch (err) {
        console.error("❌ Seed error:", err.message);
        process.exit(1);
    }
};

seed();
