# 📋 Product Requirements Document (PRD)

## MERN Stack Developer Portfolio Website

---

## 1. Product Overview

### 1.1 Vision

A cutting-edge, visually stunning personal portfolio website that positions the
developer as a top-tier MERN stack engineer. The site must function as a living
proof of technical competence — every interaction, animation, and code decision
signals expertise to recruiters.

### 1.2 Goal

Convert recruiter visits into interview calls by communicating:

- Deep MERN stack proficiency
- Clean code architecture and design thinking
- Real-world project experience
- Personality and professional brand

### 1.3 Target Users

| User                  | Goal                                                 |
| --------------------- | ---------------------------------------------------- |
| Technical Recruiters  | Quickly evaluate candidate's stack and project depth |
| Hiring Managers       | Assess problem-solving and architecture thinking     |
| Peers / Collaborators | Explore open-source work and blog content            |

---

## 2. Tech Stack

| Layer        | Technology                  |
| ------------ | --------------------------- |
| Frontend     | React 18 + Vite             |
| Styling      | Tailwind CSS v3 + shadcn/ui |
| Animation    | Framer Motion               |
| Backend      | Node.js + Express.js        |
| Database     | MongoDB + Mongoose          |
| Auth         | JWT (admin panel)           |
| Email        | Nodemailer / Resend API     |
| Hosting (FE) | Vercel                      |
| Hosting (BE) | Render / Railway            |
| DB Hosting   | MongoDB Atlas               |

---

## 3. Pages & Features

### 3.1 Pages

| Page           | Route          | Description                           |
| -------------- | -------------- | ------------------------------------- |
| Hero / Landing | `/`            | Animated introduction, tagline, CTA   |
| About          | `/#about`      | Bio, photo, personality, background   |
| Skills         | `/#skills`     | Tech stack visualization              |
| Projects       | `/#projects`   | Filterable project showcase           |
| Experience     | `/#experience` | Timeline of work/education            |
| Blog           | `/blog`        | Technical articles (optional Phase 2) |
| Contact        | `/#contact`    | Form with backend email handler       |
| Admin Panel    | `/admin`       | JWT-protected CMS for projects/blogs  |

---

## 4. Functional Requirements

### 4.1 Hero Section

- **FR-001**: Display animated name with typewriter or character-by-character
  reveal effect
- **FR-002**: Dynamic role cycling — "MERN Stack Developer", "Full Stack
  Engineer", "React Developer"
- **FR-003**: Particle/shader background animation (Three.js or CSS-based)
- **FR-004**: CTA buttons: "View Projects" (smooth scroll) and "Download Resume"
  (PDF download from `/public`)
- **FR-005**: Social links: GitHub, LinkedIn, Twitter/X

### 4.2 About Section

- **FR-006**: Profile photo with hover animation
- **FR-007**: Short bio (2–3 paragraphs) editable via Admin panel
- **FR-008**: Animated stat counters (e.g., "3+ years", "20+ projects", "10+
  clients")
- **FR-009**: Link to downloadable resume

### 4.3 Skills Section

- **FR-010**: Grouped skill cards: Frontend, Backend, Database, DevOps, Tools
- **FR-011**: Animated skill bars or radial progress indicators
- **FR-012**: Icon for each technology (React Icons / Devicons)
- **FR-013**: Hover tooltip with brief description of proficiency

### 4.4 Projects Section

- **FR-014**: Filter tabs: All | Frontend | Full Stack | API/Backend
- **FR-015**: Project cards with: title, description, tech tags, GitHub link,
  Live Demo link
- **FR-016**: Modal or expanded view on card click with screenshots
- **FR-017**: Projects fetched from MongoDB via REST API
- **FR-018**: Featured project badge on top 2–3 projects
- **FR-019**: Animated card entrance on scroll

### 4.5 Experience / Timeline Section

- **FR-020**: Vertical timeline with company, role, duration, and bullet points
- **FR-021**: Education entries alongside work experience
- **FR-022**: Alternating left-right layout on desktop, single column on mobile

### 4.6 Contact Section

- **FR-023**: Form fields: Name, Email, Subject, Message
- **FR-024**: Real-time client-side validation (React Hook Form + Zod)
- **FR-025**: Backend POST `/api/contact` sends email via Nodemailer
- **FR-026**: Success/error toast notification (shadcn Toast)
- **FR-027**: Display email, LinkedIn, and GitHub as alternate contact options

### 4.7 Admin Panel

- **FR-028**: Login with JWT authentication
- **FR-029**: CRUD operations for Projects (title, description, tags, links,
  image URL)
- **FR-030**: CRUD for Blog posts (Phase 2)
- **FR-031**: View contact form submissions
- **FR-032**: Protected routes — redirect to login if unauthenticated

### 4.8 Global / UX

- **FR-033**: Sticky navbar with active section highlight on scroll
- **FR-034**: Dark/Light mode toggle (persisted in localStorage)
- **FR-035**: Smooth page scroll with scroll-progress indicator
- **FR-036**: Mobile-responsive hamburger menu
- **FR-037**: Custom 404 page
- **FR-038**: Loading screen on first visit
- **FR-039**: SEO meta tags (React Helmet / Vite plugin)
- **FR-040**: Cursor trail or custom cursor effect (desktop)

---

## 5. Non-Functional Requirements

| ID      | Requirement                                             |
| ------- | ------------------------------------------------------- |
| NFR-001 | Lighthouse score ≥ 90 (Performance, Accessibility, SEO) |
| NFR-002 | First Contentful Paint < 1.5s                           |
| NFR-003 | Mobile-first, fully responsive (320px–2560px)           |
| NFR-004 | WCAG 2.1 AA accessibility compliance                    |
| NFR-005 | HTTPS enforced on all routes                            |
| NFR-006 | API rate limiting on contact endpoint (prevent spam)    |
| NFR-007 | Environment variables for all secrets (never committed) |
| NFR-008 | Error boundaries on all major React sections            |

---

## 6. Phases

### Phase 1 — MVP (4–6 weeks)

- Hero, About, Skills, Projects, Experience, Contact
- Backend: Projects API + Contact email
- Admin: Login + Project CRUD
- Deployment: Vercel + Render + Atlas

### Phase 2 — Enhancements (2–3 weeks)

- Blog section with Markdown support
- GitHub API integration (live repo stats)
- Testimonials section
- Analytics dashboard in Admin

---

## 7. Success Metrics

- Recruiter spends > 2 minutes on site
- Contact form submissions
- GitHub profile clicks
- Resume downloads tracked via analytics

---

## 8. Constraints

- No paid third-party CMS (keep it self-hosted)
- Resume PDF must be self-hosted (no Google Drive links)
- All content editable without redeployment (via Admin panel + DB)
