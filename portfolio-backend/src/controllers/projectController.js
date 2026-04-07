import Project from "../models/Project.js";

// GET all with optional category filter
export const getProjects = async (req, res, next) => {
    try {
        const { category } = req.query;
        const filter = category && category !== "all" ? { category } : {};
        const projects = await Project.find(filter).sort({
            featured: -1,
            order: 1,
            createdAt: -1,
        });
        res.json({ success: true, count: projects.length, data: projects });
    } catch (err) {
        next(err);
    }
};

// GET single project
export const getProject = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }
        res.json({ success: true, data: project });
    } catch (err) {
        next(err);
    }
};

// POST create
export const createProject = async (req, res, next) => {
    try {
        const project = await Project.create(req.body);
        res.status(201).json({ success: true, data: project });
    } catch (err) {
        next(err);
    }
};

// PUT update
export const updateProject = async (req, res, next) => {
    try {
        const project = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }
        res.json({ success: true, data: project });
    } catch (err) {
        next(err);
    }
};

// DELETE
export const deleteProject = async (req, res, next) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.id);
        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }
        res.json({ success: true, message: "Project deleted" });
    } catch (err) {
        next(err);
    }
};

// PATCH toggle featured
export const toggleFeatured = async (req, res, next) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ success: false, message: "Project not found" });
        }
        project.featured = !project.featured;
        await project.save();
        res.json({ success: true, data: project });
    } catch (err) {
        next(err);
    }
};
