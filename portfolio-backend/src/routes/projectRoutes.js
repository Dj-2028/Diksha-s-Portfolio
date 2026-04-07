import express from "express";
import {
    getProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
    toggleFeatured,
} from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/", getProjects);
router.get("/:id", getProject);

// Protected
router.post("/", protect, createProject);
router.put("/:id", protect, updateProject);
router.delete("/:id", protect, deleteProject);
router.patch("/:id/feature", protect, toggleFeatured);

export default router;
