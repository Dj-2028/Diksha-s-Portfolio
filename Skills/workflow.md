# 🔄 Workflow Documentation

## MERN Stack Portfolio — Development, Git, and Deployment Workflow

---

## 1. Project Architecture Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT BROWSER                           │
│                     (React + Vite SPA)                          │
└───────────────────────┬─────────────────┬───────────────────────┘
                        │                 │
              Public Routes           /admin/* (JWT Protected)
                        │                 │
┌───────────────────────▼─────────────────▼───────────────────────┐
│                    VERCEL (Frontend CDN)                         │
│               portfolio-frontend (React Build)                   │
└───────────────────────────┬─────────────────────────────────────┘
                            │ REST API (HTTPS)
                            │ CORS restricted
┌───────────────────────────▼─────────────────────────────────────┐
│                  RENDER (Backend Server)                         │
│          portfolio-backend (Node.js + Express)                   │
│                                                                  │
│  /api/projects   /api/contact   /api/auth                        │
└───────────────────────────┬─────────────────────────────────────┘
                            │ Mongoose ODM
┌───────────────────────────▼─────────────────────────────────────┐
│                  MONGODB ATLAS (Cloud DB)                        │
│         Collections: projects | contacts | admins                │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. Repository Structure

```
portfolio/                      # Monorepo root (or two separate repos)
├── portfolio-frontend/         # React App
│   ├── src/
│   ├── public/
│   │   └── resume.pdf
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── .env
│   ├── .env.example
│   └── vercel.json
└── portfolio-backend/          # Express API
    ├── src/
    ├── package.json
    ├── .env
    ├── .env.example
    └── .gitignore
```

---

## 3. Git Branching Strategy

```
main ─────────────────────────────────────────► (production)
  │
  ├── develop ──────────────────────────────► (staging / integration)
  │     │
  │     ├── feature/hero-animation
  │     ├── feature/projects-api
  │     ├── feature/contact-form
  │     ├── feature/admin-panel
  │     └── fix/mobile-navbar
  │
  └── hotfix/critical-bug-fix               ► (emergency patches)
```

### Branch Naming Convention

| Type     | Pattern           | Example                  |
| -------- | ----------------- | ------------------------ |
| Feature  | `feature/<name>`  | `feature/skills-section` |
| Bug fix  | `fix/<name>`      | `fix/form-validation`    |
| Hotfix   | `hotfix/<name>`   | `hotfix/cors-error`      |
| Refactor | `refactor/<name>` | `refactor/api-structure` |
| Docs     | `docs/<name>`     | `docs/readme-update`     |

### Commit Message Convention (Conventional Commits)

```
<type>(<scope>): <short description>

Types:
feat     → new feature
fix      → bug fix
style    → UI styling, no logic change
refactor → code refactor
docs     → documentation
test     → tests
chore    → tooling, config, deps
perf     → performance improvement

Examples:
feat(hero): add typewriter animation with framer motion
fix(contact): handle nodemailer connection timeout
style(navbar): fix active link highlight on scroll
refactor(api): extract project controller from routes
chore(deps): upgrade framer-motion to v11
```

---

## 4. Development Workflow

### 4.1 Local Development Setup

```bash
# Clone repository
git clone https://github.com/yourusername/portfolio.git
cd portfolio

# ─── BACKEND ────────────────────────────────────────────────────
cd portfolio-backend
cp .env.example .env          # Fill in your values
npm install
npm run dev                   # Starts on http://localhost:5000

# ─── FRONTEND ───────────────────────────────────────────────────
cd ../portfolio-frontend
cp .env.example .env          # Set VITE_API_BASE_URL=http://localhost:5000/api
npm install
npm run dev                   # Starts on http://localhost:5173
```

### 4.2 Feature Development Cycle

```bash
# 1. Always start from latest develop
git checkout develop
git pull origin develop

# 2. Create feature branch
git checkout -b feature/contact-section

# 3. Write code...

# 4. Stage and commit
git add .
git commit -m "feat(contact): add form with zod validation and toast feedback"

# 5. Push branch
git push origin feature/contact-section

# 6. Open PR on GitHub: feature/contact-section → develop
#    PR template: description, screenshots, checklist

# 7. After review/merge, delete branch
git checkout develop
git pull origin develop
git branch -d feature/contact-section
```

---

## 5. Data Flow Diagrams

### 5.1 Contact Form Submission Flow

```
User fills form
      │
      ▼
React Hook Form validates (Zod schema)
      │
      ├── FAIL → Show inline field errors
      │
      └── PASS
            │
            ▼
      POST /api/contact (Axios)
      Frontend shows loading spinner on button
            │
            ▼
      Express contactLimiter (rate limit: 5/15min)
            │
            ├── RATE LIMIT HIT → 429 → Toast "Too many requests"
            │
            └── PASS
                  │
                  ▼
            express-validator checks body fields
                  │
                  ├── INVALID → 400 → Toast with error message
                  │
                  └── VALID
                        │
                        ▼
                  Save Contact to MongoDB
                        │
                        ▼
                  Nodemailer sends email notification
                  to portfolio owner
                        │
                        ▼
                  201 Response → Toast "Message sent! 🎉"
```

### 5.2 Admin Login & Project CRUD Flow

```
Admin navigates to /admin
      │
      ├── No JWT in localStorage → Redirect to /admin/login
      │
      └── JWT present → Verify with /api/auth/me
                │
                ├── Token expired/invalid → Redirect to /admin/login
                │
                └── Valid → Render Admin Dashboard
                              │
                    ┌─────────┼─────────┐
                    │         │         │
               Projects   Contacts   Settings
                    │
                    ▼
            CRUD Operations
            GET  /api/projects     → List all
            POST /api/projects     → Create (multipart or JSON)
            PUT  /api/projects/:id → Edit
            DELETE /api/projects/:id → Delete
            
            All include Authorization: Bearer <token>
```

### 5.3 Public Page Load Flow

```
Browser requests portfolio.com
      │
      ▼
Vercel CDN serves React SPA (index.html + JS bundle)
      │
      ▼
React Router renders Home page
      │
      ▼
Hero section mounts → Framer Motion entrance animations play
      │
      ▼
useEffect in Projects section:
      GET /api/projects?category=all
            │
            ▼
      MongoDB returns projects JSON
            │
            ▼
      ProjectCards render with layout animation
      
Intersection Observers activate on scroll:
      → Skills bars animate
      → Timeline entries slide in
      → About stats count up
```

---

## 6. Build & Deployment Pipeline

### 6.1 Frontend CI/CD (Vercel Auto-Deploy)

```
Push to main branch
      │
      ▼
Vercel webhook triggers
      │
      ▼
Vercel Build:
  - npm run build (Vite)
  - Output: dist/ folder
      │
      ▼
Vercel deploys to CDN
      │
      ▼
Live at: https://yourname.vercel.app
```

**Preview deployments**: Every PR to `main` gets a unique preview URL from
Vercel.

### 6.2 Backend CI/CD (Render Auto-Deploy)

```
Push to main branch
      │
      ▼
Render webhook triggers
      │
      ▼
Render Build:
  - npm install
  - Start: npm start
      │
      ▼
Live at: https://portfolio-api.onrender.com
```

---

## 7. Environment Management

| Environment    | Frontend URL             | Backend URL                  | DB                                   |
| -------------- | ------------------------ | ---------------------------- | ------------------------------------ |
| **Local**      | `localhost:5173`         | `localhost:5000`             | Local MongoDB or Atlas (dev cluster) |
| **Preview**    | `branch-name.vercel.app` | `portfolio-api.onrender.com` | Atlas (dev cluster)                  |
| **Production** | `yourname.vercel.app`    | `portfolio-api.onrender.com` | Atlas (prod cluster)                 |

### Variable Checklist

**Frontend (Vercel Dashboard → Environment Variables)**:

```
VITE_API_BASE_URL=https://portfolio-api.onrender.com/api
```

**Backend (Render Dashboard → Environment Variables)**:

```
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=...
EMAIL_USER=...
EMAIL_APP_PASSWORD=...
EMAIL_RECEIVER=...
FRONTEND_URL=https://yourname.vercel.app
```

---

## 8. Development Phases & Timeline

### Phase 1 — Foundation (Week 1–2)

| Task                                   | Owner | Status |
| -------------------------------------- | ----- | ------ |
| Setup Vite + React + Tailwind + shadcn | FE    | ⬜     |
| Setup Express + MongoDB + Mongoose     | BE    | ⬜     |
| Hero section with Framer Motion        | FE    | ⬜     |
| Navbar with scroll spy                 | FE    | ⬜     |
| Project model + CRUD API               | BE    | ⬜     |
| Dark/Light mode toggle                 | FE    | ⬜     |

### Phase 2 — Core Features (Week 3–4)

| Task                              | Owner | Status |
| --------------------------------- | ----- | ------ |
| About section + stat counters     | FE    | ⬜     |
| Skills section with animated bars | FE    | ⬜     |
| Projects section + filter tabs    | FE    | ⬜     |
| Projects API integration          | FE+BE | ⬜     |
| Experience timeline               | FE    | ⬜     |
| Contact form + email backend      | FE+BE | ⬜     |

### Phase 3 — Admin & Polish (Week 5–6)

| Task                        | Owner  | Status |
| --------------------------- | ------ | ------ |
| Admin login + JWT           | BE+FE  | ⬜     |
| Admin project CRUD UI       | FE     | ⬜     |
| Contact submissions view    | FE     | ⬜     |
| Mobile responsiveness audit | FE     | ⬜     |
| Performance optimization    | FE     | ⬜     |
| SEO + meta tags             | FE     | ⬜     |
| Deploy to Vercel + Render   | DevOps | ⬜     |
| Custom domain setup         | DevOps | ⬜     |

### Phase 4 — Enhancements (Week 7+)

| Task                                     | Status |
| ---------------------------------------- | ------ |
| Blog section with Markdown               | ⬜     |
| GitHub API live stats widget             | ⬜     |
| Testimonials section                     | ⬜     |
| Analytics (Plausible / Vercel Analytics) | ⬜     |

---

## 9. Testing Strategy

### Frontend

```bash
# Unit tests (Vitest + React Testing Library)
npm run test

# What to test:
# - Form validation logic
# - useScrollSpy hook
# - useCounterAnimation hook
# - API service functions (mock axios)
```

### Backend

```bash
# Unit + Integration tests (Jest + Supertest)
npm run test

# What to test:
# - POST /api/contact (valid + invalid input)
# - POST /api/auth/login (valid + wrong password)
# - GET /api/projects (returns array)
# - Protected routes reject unauthenticated requests
# - Rate limiter triggers on 6th contact attempt
```

---

## 10. Code Quality & Standards

```bash
# ESLint
npm install -D eslint eslint-plugin-react
npx eslint src/

# Prettier
npm install -D prettier
npx prettier --write src/

# Pre-commit hooks (Husky + lint-staged)
npm install -D husky lint-staged
npx husky init
```

**`.husky/pre-commit`**:

```bash
npx lint-staged
```

**`package.json`**:

```json
{
    "lint-staged": {
        "src/**/*.{js,jsx}": ["eslint --fix", "prettier --write"]
    }
}
```

---

## 11. Performance Targets

| Metric                         | Target  | Tool                   |
| ------------------------------ | ------- | ---------------------- |
| Lighthouse Performance         | ≥ 90    | Chrome DevTools        |
| FCP (First Contentful Paint)   | < 1.5s  | Lighthouse             |
| LCP (Largest Contentful Paint) | < 2.5s  | Lighthouse             |
| CLS (Cumulative Layout Shift)  | < 0.1   | Lighthouse             |
| API Response Time              | < 300ms | Render logs            |
| Bundle Size (gzipped)          | < 200KB | `vite-bundle-analyzer` |

---

## 12. Quick Reference Commands

```bash
# ── Frontend ─────────────────────────────────────────────
npm run dev           # Start dev server
npm run build         # Production build
npm run preview       # Preview prod build locally
npm run lint          # Run ESLint
npm run test          # Run Vitest

# ── Backend ──────────────────────────────────────────────
npm run dev           # Start with nodemon
npm start             # Production start
npm run seed          # Seed sample projects to DB
npm run test          # Run Jest tests

# ── Git ──────────────────────────────────────────────────
git checkout -b feature/<name>    # New feature branch
git push origin feature/<name>    # Push branch
git pull origin develop           # Sync with develop
```

---

## 13. Recruiter-Impression Checklist

Before sharing your portfolio with recruiters:

- [ ] Resume PDF is current and downloadable
- [ ] All project GitHub links are public and have good READMEs
- [ ] All live demo links work
- [ ] Contact form sends you a real email
- [ ] Site loads fast on mobile (test on real device)
- [ ] Dark mode works correctly
- [ ] No console errors in browser
- [ ] Custom domain set up (yourname.dev)
- [ ] LinkedIn and GitHub links are correct
- [ ] Lighthouse score ≥ 90 in all categories
