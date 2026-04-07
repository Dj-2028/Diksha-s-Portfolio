import express from "express";
import {
    submitContact,
    getContacts,
    markRead,
} from "../controllers/contactController.js";
import { protect } from "../middleware/authMiddleware.js";
import { contactLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

// Public — rate limited
router.post("/", contactLimiter, submitContact);

// Protected
router.get("/", protect, getContacts);
router.patch("/:id/read", protect, markRead);

export default router;
