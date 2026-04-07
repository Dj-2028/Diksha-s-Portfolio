import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import Admin from "../models/Admin.js";
import Project from "../models/Project.js";

const sampleProjects = [
    {
        title: "E-Commerce Platform", description: "A full-stack e-commerce application.",
        longDescription: "A comprehensive e-commerce solution.", tags: ["React", "Node.js", "MongoDB"],
        category: "fullstack", githubUrl: "https://github.com", demoUrl: "https://example.com",
        featured: true, order: 1,
    },
    {
        title: "Portfolio Website", description: "A visually stunning MERN stack portfolio.",
        longDescription: "Built with React + Vite, Tailwind CSS, etc.", tags: ["React", "Tailwind CSS"],
        category: "frontend", githubUrl: "https://github.com", demoUrl: "",
        featured: true, order: 2,
    }
];

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 2000 });
        console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`⚠️  MongoDB connection failed: ${err.message}`);
        console.log("spin: Starting in-memory MongoDB Server instead...");
        try {
            const mongoServer = await MongoMemoryServer.create();
            const memoryUri = mongoServer.getUri();
            const conn = await mongoose.connect(memoryUri);
            console.log(`✅ In-Memory MongoDB connected: ${conn.connection.host}`);
            
            // Seed the in-memory db automatically
            const count = await Admin.countDocuments();
            if (count === 0) {
                await Project.insertMany(sampleProjects);
                const admin = new Admin({
                    email: process.env.ADMIN_EMAIL || "admin@portfolio.com",
                    password: process.env.ADMIN_PASSWORD || "Admin@123456",
                });
                await admin.save();
                console.log("🌱 In-Memory Database seeded with sample data & admin account.");
            }
        } catch (memErr) {
             console.error(`❌ In-Memory MongoDB failed: ${memErr.message}`);
             process.exit(1);
        }
    }
};

export default connectDB;
