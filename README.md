# Diksha's Portfolio (MERN)

A full-stack personal portfolio site with a public-facing showcase and a private admin panel for managing project content — built on the MERN stack (MongoDB, Express, React, Node) with Supabase used on the frontend for auxiliary data/storage.

## Features

- Public portfolio homepage displaying projects
- JWT-authenticated admin login and dashboard (`/admin`) for adding, editing, deleting, and featuring projects
- Contact form backed by a dedicated API route
- Rate-limited login endpoint, Helmet security headers, and centralized error handling on the backend

## Tech stack

**Frontend** (`portfolio-frontend/`)
- React 19 + Vite
- React Router 7
- Supabase JS client
- React Hook Form + Zod for form validation
- Framer Motion, Tailwind CSS, `tailwindcss-animate`
- Lucide / React Icons

**Backend** (`portfolio-backend/`)
- Node.js + Express 5
- MongoDB with Mongoose
- JWT auth (`jsonwebtoken`, `bcryptjs`)
- Security/middleware: Helmet, CORS, `express-rate-limit`, `express-validator`
- Nodemailer for contact-form email delivery
- Morgan for request logging

## Project structure

```
portfolio-frontend/
  src/
    pages/           # Home, Admin, AdminLogin, NotFound
    components/
    services/         # API client calls
    context/           # Auth/app context
  supabase/            # Seed data and Supabase functions
portfolio-backend/
  src/
    controllers/       # authController, projectController, contactController
    models/             # Admin, Project, Contact (Mongoose schemas)
    routes/              # authRoutes, projectRoutes, contactRoutes
    middleware/            # JWT auth guard, rate limiter, error handler
    config/                  # DB connection
Skills/                        # Planning docs (PRD, frontend/backend notes, workflow)
```

## API overview

| Route | Method | Description |
|---|---|---|
| `/api/auth/login` | POST | Admin login (rate-limited) |
| `/api/auth/me` | GET | Get current admin (protected) |
| `/api/projects` | GET | List all projects (public) |
| `/api/projects/:id` | GET | Get single project (public) |
| `/api/projects` | POST | Create project (protected) |
| `/api/projects/:id` | PUT | Update project (protected) |
| `/api/projects/:id` | DELETE | Delete project (protected) |
| `/api/projects/:id/feature` | PATCH | Toggle featured status (protected) |
| `/api/contact` | POST | Submit contact form |
| `/api/health` | GET | Health check |

## Getting started

### Backend

```bash
cd portfolio-backend
npm install
cp .env.example .env   # fill in MongoDB URI, JWT secret, frontend URL, etc.
npm run dev             # nodemon
npm run seed              # optional: seed initial data
```

### Frontend

```bash
cd portfolio-frontend
npm install
npm run dev
```

The frontend expects the backend running on the URL configured via its `.env` / Supabase settings.
