import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Project title is required"],
            trim: true,
            maxlength: 100,
        },
        description: {
            type: String,
            required: true,
            maxlength: 500,
        },
        longDescription: {
            type: String,
            maxlength: 2000,
        },
        tags: {
            type: [String],
            required: true,
        },
        category: {
            type: String,
            enum: ["frontend", "fullstack", "backend"],
            default: "fullstack",
        },
        githubUrl: { type: String },
        demoUrl: { type: String },
        imageUrl: { type: String },
        screenshots: [{ type: String }],
        featured: { type: Boolean, default: false },
        order: { type: Number, default: 0 },
    },
    { timestamps: true }
);

export default mongoose.model("Project", projectSchema);
