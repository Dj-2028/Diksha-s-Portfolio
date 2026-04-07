# ⚙️ Backend Documentation

## MERN Stack Portfolio — Node.js + Express + MongoDB

---

## 1. Project Setup

```bash
mkdir portfolio-backend && cd portfolio-backend
npm init -y

# Core dependencies
npm install express mongoose dotenv cors helmet morgan bcryptjs jsonwebtoken nodemailer express-rate-limit express-validator

# Dev dependencies
npm install -D nodemon
```

**`package.json` scripts:**

```json
{
    "scripts": {
        "start": "node src/index.js",
        "dev": "nodemon src/index.js",
        "seed": "node src/utils/seed.js"
    }
}
```

---

## 2. Folder Structure

```
portfolio-backend/
├── src/
│   ├── config/
│   │   ├── db.js              # MongoDB Atlas connection
│   │   └── mailer.js          # Nodemailer transporter
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── projectController.js
│   │   ├── contactController.js
│   │   └── blogController.js  # Phase 2
│   ├── middleware/
│   │   ├── authMiddleware.js   # JWT verification
│   │   ├── errorHandler.js    # Global error handler
│   │   ├── rateLimiter.js     # Rate limiting rules
│   │   └── validate.js        # express-validator wrapper
│   ├── models/
│   │   ├── Project.js
│   │   ├── Contact.js
│   │   ├── Admin.js
│   │   └── Blog.js            # Phase 2
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── projectRoutes.js
│   │   ├── contactRoutes.js
│   │   └── blogRoutes.js      # Phase 2
│   ├── utils/
│   │   ├── seed.js            # Seed initial projects
│   │   └── apiResponse.js     # Standardized response helper
│   └── index.js               # App entry point
├── .env
├── .env.example
└── .gitignore
```

---

## 3. Entry Point

```js
// src/index.js
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { errorHandler } from "./middleware/errorHandler.js";

import authRoutes from "./routes/authRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";

dotenv.config();
connectDB();

const app = express();

// Security & Middleware
app.use(helmet());
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);

// Health check
app.get(
    "/api/health",
    (req, res) => res.json({ status: "OK", timestamp: new Date() }),
);

// 404 handler
app.use((req, res) =>
    res.status(404).json({ success: false, message: "Route not found" })
);

// Global error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
```

---

## 4. Database Connection

```js
// src/config/db.js
import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`❌ MongoDB connection error: ${err.message}`);
        process.exit(1);
    }
};

export default connectDB;
```

---

## 5. Models

### 5.1 Project Model

```js
// src/models/Project.js
import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
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
        type: [String], // ["React", "Node.js", "MongoDB"]
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
}, { timestamps: true });

export default mongoose.model("Project", projectSchema);
```

### 5.2 Contact Model

```js
// src/models/Contact.js
import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    ip: { type: String },
}, { timestamps: true });

export default mongoose.model("Contact", contactSchema);
```

### 5.3 Admin Model

```js
// src/models/Admin.js
import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 8 },
}, { timestamps: true });

// Hash password before save
adminSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// Compare password method
adminSchema.methods.comparePassword = async function (candidate) {
    return bcrypt.compare(candidate, this.password);
};

export default mongoose.model("Admin", adminSchema);
```

---

## 6. Routes & Controllers

### 6.1 Auth Routes

```
POST   /api/auth/login        → Login, returns JWT
GET    /api/auth/me           → Get current admin (protected)
```

```js
// src/controllers/authController.js
import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email });

        if (!admin || !(await admin.comparePassword(password))) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        res.json({
            success: true,
            token,
            admin: { id: admin._id, email: admin.email },
        });
    } catch (err) {
        next(err);
    }
};
```

---

### 6.2 Project Routes

```
GET    /api/projects              → Get all projects (public, filterable)
GET    /api/projects/:id          → Get single project
POST   /api/projects              → Create project (protected)
PUT    /api/projects/:id          → Update project (protected)
DELETE /api/projects/:id          → Delete project (protected)
PATCH  /api/projects/:id/feature  → Toggle featured (protected)
```

```js
// src/controllers/projectController.js
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
            {
                new: true,
                runValidators: true,
            },
        );
        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
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
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }
        res.json({ success: true, message: "Project deleted" });
    } catch (err) {
        next(err);
    }
};
```

---

### 6.3 Contact Route

```
POST   /api/contact          → Submit contact form (public, rate-limited)
GET    /api/contact          → Get all submissions (protected)
PATCH  /api/contact/:id/read → Mark as read (protected)
```

```js
// src/controllers/contactController.js
import Contact from "../models/Contact.js";
import { sendContactEmail } from "../config/mailer.js";

export const submitContact = async (req, res, next) => {
    try {
        const { name, email, subject, message } = req.body;

        // Save to DB
        const contact = await Contact.create({
            name,
            email,
            subject,
            message,
            ip: req.ip,
        });

        // Send notification email to portfolio owner
        await sendContactEmail({ name, email, subject, message });

        res.status(201).json({
            success: true,
            message: "Message sent successfully! I will get back to you soon.",
        });
    } catch (err) {
        next(err);
    }
};

export const getContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.json({ success: true, count: contacts.length, data: contacts });
    } catch (err) {
        next(err);
    }
};
```

---

## 7. Middleware

### JWT Auth Middleware

```js
// src/middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

export const protect = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader?.startsWith("Bearer ")) {
        return res.status(401).json({
            success: false,
            message: "No token provided",
        });
    }

    try {
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = await Admin.findById(decoded.id).select("-password");
        next();
    } catch {
        res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};
```

### Rate Limiter

```js
// src/middleware/rateLimiter.js
import rateLimit from "express-rate-limit";

export const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per window
    message: {
        success: false,
        message: "Too many messages sent. Please try again later.",
    },
});

export const loginLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10,
    message: { success: false, message: "Too many login attempts." },
});
```

### Global Error Handler

```js
// src/middleware/errorHandler.js
export const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // Mongoose validation error
    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors).map((e) => e.message).join(", ");
    }

    // Mongoose cast error (invalid ObjectId)
    if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid ID format";
    }

    // Duplicate key error
    if (err.code === 11000) {
        statusCode = 409;
        message = "Duplicate value entered";
    }

    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
};
```

---

## 8. Mailer Configuration

```js
// src/config/mailer.js
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD, // Gmail App Password
    },
});

export const sendContactEmail = async ({ name, email, subject, message }) => {
    await transporter.sendMail({
        from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_RECEIVER,
        subject: `[Portfolio] ${subject}`,
        html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${name} (${email})</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <hr />
      <p>${message.replace(/\n/g, "<br>")}</p>
    `,
        replyTo: email,
    });
};
```

---

## 9. Environment Variables

```env
# .env
PORT=5000
NODE_ENV=development

# MongoDB
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/portfolio

# JWT
JWT_SECRET=your_very_long_random_secret_key_here

# Email
EMAIL_USER=yourname@gmail.com
EMAIL_APP_PASSWORD=xxxx_xxxx_xxxx_xxxx
EMAIL_RECEIVER=yourname@gmail.com

# Frontend
FRONTEND_URL=http://localhost:5173
```

```
# .gitignore
node_modules/
.env
dist/
```

---

## 10. API Response Format (Standard)

All API responses follow this shape:

```json
// Success
{
  "success": true,
  "data": { ... },
  "count": 5,           // for list endpoints
  "message": "..."      // optional
}

// Error
{
  "success": false,
  "message": "Human-readable error"
}
```

---

## 11. Deployment (Render)

1. Push to GitHub
2. Create new **Web Service** on Render
3. Set environment variables in Render dashboard
4. Build command: `npm install`
5. Start command: `npm start`
6. MongoDB Atlas: whitelist `0.0.0.0/0` for Render IPs

---

## 12. Security Checklist

- [x] `helmet()` — sets security HTTP headers
- [x] `cors()` — restricted to frontend origin only
- [x] Rate limiting on `/api/contact` and `/api/auth/login`
- [x] JWT expiry set to 7 days
- [x] Passwords hashed with bcrypt (cost factor 12)
- [x] Input validation via `express-validator`
- [x] MongoDB injection protection via Mongoose schema types
- [x] No secrets in git (`.gitignore` .env)
- [x] `NODE_ENV=production` hides stack traces from API responses
