# 🎨 Frontend Documentation

## MERN Stack Portfolio — React + Vite + Tailwind + shadcn + Framer Motion

---

## 1. Project Setup

```bash
# Scaffold Vite + React project
npm create vite@latest portfolio-frontend -- --template react
cd portfolio-frontend

# Install core dependencies
npm install

# Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# shadcn/ui (init)
npx shadcn-ui@latest init

# Framer Motion
npm install framer-motion

# Routing
npm install react-router-dom

# Forms & Validation
npm install react-hook-form zod @hookform/resolvers

# HTTP Client
npm install axios

# Icons
npm install react-icons lucide-react

# SEO
npm install react-helmet-async

# Utilities
npm install clsx tailwind-merge class-variance-authority
```

---

## 2. Folder Structure

```
src/
├── assets/                  # Images, fonts, resume PDF
│   ├── images/
│   └── resume.pdf
├── components/
│   ├── ui/                  # shadcn auto-generated components
│   │   ├── button.jsx
│   │   ├── card.jsx
│   │   ├── input.jsx
│   │   ├── textarea.jsx
│   │   ├── badge.jsx
│   │   ├── dialog.jsx
│   │   └── toast.jsx
│   ├── layout/
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── MobileMenu.jsx
│   │   └── ScrollProgress.jsx
│   ├── sections/
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Experience.jsx
│   │   └── Contact.jsx
│   ├── common/
│   │   ├── AnimatedText.jsx
│   │   ├── SectionHeading.jsx
│   │   ├── ThemeToggle.jsx
│   │   ├── LoadingScreen.jsx
│   │   ├── CustomCursor.jsx
│   │   └── ScrollToTop.jsx
│   └── admin/
│       ├── AdminLayout.jsx
│       ├── ProjectForm.jsx
│       ├── ProjectList.jsx
│       └── ContactSubmissions.jsx
├── context/
│   ├── ThemeContext.jsx
│   └── AuthContext.jsx
├── hooks/
│   ├── useScrollSpy.js
│   ├── useIntersectionObserver.js
│   └── useCounterAnimation.js
├── lib/
│   ├── utils.js             # cn() helper from shadcn
│   ├── axios.js             # Axios instance with base URL
│   └── constants.js         # Skills data, nav links, etc.
├── pages/
│   ├── Home.jsx
│   ├── Blog.jsx
│   ├── BlogPost.jsx
│   ├── Admin.jsx
│   ├── AdminLogin.jsx
│   └── NotFound.jsx
├── services/
│   ├── projectService.js
│   └── contactService.js
├── styles/
│   └── globals.css
├── App.jsx
└── main.jsx
```

---

## 3. Tailwind Configuration

```js
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                border: "hsl(var(--border))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
            },
            fontFamily: {
                display: ["'Space Mono'", "monospace"], // override per your choice
                body: ["'DM Sans'", "sans-serif"],
            },
            animation: {
                "fade-in": "fadeIn 0.6s ease forwards",
                "slide-up": "slideUp 0.5s ease forwards",
                "blink": "blink 1s step-end infinite",
            },
            keyframes: {
                fadeIn: { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
                slideUp: {
                    "0%": { transform: "translateY(40px)", opacity: 0 },
                    "100%": { transform: "translateY(0)", opacity: 1 },
                },
                blink: { "50%": { opacity: 0 } },
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
```

---

## 4. Global CSS Variables (shadcn theme)

```css
/* src/styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
    :root {
        --background: 0 0% 100%;
        --foreground: 222 47% 11%;
        --primary: 230 100% 60%;
        --primary-foreground: 0 0% 100%;
        --muted: 210 20% 96%;
        --muted-foreground: 215 16% 47%;
        --accent: 162 100% 40%;
        --accent-foreground: 0 0% 100%;
        --border: 214 31% 91%;
        --radius: 0.5rem;
    }

    .dark {
        --background: 222 47% 6%;
        --foreground: 210 40% 98%;
        --primary: 230 100% 65%;
        --primary-foreground: 0 0% 100%;
        --muted: 217 33% 12%;
        --muted-foreground: 215 20% 65%;
        --accent: 162 100% 45%;
        --accent-foreground: 0 0% 100%;
        --border: 217 33% 18%;
    }
}

@layer base {
    * {
        @apply border-border;
    }
    body {
        @apply bg-background text-foreground font-body;
    }
    html {
        scroll-behavior: smooth;
    }
}
```

---

## 5. Component Specifications

### 5.1 Navbar

```jsx
// components/layout/Navbar.jsx
// Features:
// - Transparent on top, frosted glass on scroll (backdrop-blur)
// - Active section highlighting via useScrollSpy hook
// - Dark/Light toggle with ThemeContext
// - Hamburger menu on mobile (shadcn Sheet)
// - Smooth scroll to section on nav click

const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Contact", href: "#contact" },
];
```

**Framer Motion**: `useScroll` + `useTransform` for navbar background opacity.

---

### 5.2 Hero Section

```jsx
// components/sections/Hero.jsx
// Layout: full-viewport (100vh) centered content
// Elements:
// 1. Animated greeting: "Hi, I'm [Name]" — character stagger animation
// 2. Role cycling: Framer Motion AnimatePresence for role swap
// 3. Short tagline: "I build fast, scalable web apps with the MERN stack"
// 4. CTA buttons: shadcn Button variants
// 5. Social icons row: GitHub, LinkedIn, Twitter
// 6. Scroll indicator: animated chevron at bottom
// 7. Background: animated gradient mesh or particle canvas
```

**Framer Motion Patterns**:

```jsx
// Character stagger
const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.05 },
    },
};
const letter = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
};
```

---

### 5.3 Skills Section

```jsx
// Skill categories: Frontend | Backend | Database | DevOps | Tools
// Component: SkillCard with icon + name + animated bar
// Data driven from constants.js

const skills = {
    frontend: [
        { name: "React", level: 90, icon: <SiReact /> },
        { name: "JavaScript", level: 88, icon: <SiJavascript /> },
        { name: "TypeScript", level: 75, icon: <SiTypescript /> },
        { name: "Tailwind CSS", level: 85, icon: <SiTailwindcss /> },
        { name: "Next.js", level: 72, icon: <SiNextdotjs /> },
    ],
    backend: [
        { name: "Node.js", level: 87, icon: <SiNodedotjs /> },
        { name: "Express.js", level: 85, icon: <SiExpress /> },
        { name: "REST APIs", level: 90, icon: <TbApi /> },
        { name: "GraphQL", level: 65, icon: <SiGraphql /> },
    ],
    database: [
        { name: "MongoDB", level: 88, icon: <SiMongodb /> },
        { name: "Mongoose", level: 85, icon: <SiMongoose /> },
        { name: "PostgreSQL", level: 60, icon: <SiPostgresql /> },
        { name: "Redis", level: 55, icon: <SiRedis /> },
    ],
    devops: [
        { name: "Git & GitHub", level: 90, icon: <SiGit /> },
        { name: "Docker", level: 65, icon: <SiDocker /> },
        { name: "Vercel", level: 85, icon: <SiVercel /> },
        { name: "AWS (S3/EC2)", level: 55, icon: <SiAmazon /> },
    ],
};
```

**Animation**: Bars animate width from 0 → `level%` using Framer Motion when
section enters viewport.

---

### 5.4 Projects Section

```jsx
// ProjectCard props:
// { title, description, tags[], githubUrl, demoUrl, imageUrl, featured }

// Filter state: "all" | "frontend" | "fullstack" | "backend"
// Filter tabs: shadcn Tabs component
// Card grid: 3 cols desktop, 2 tablet, 1 mobile
// Modal: shadcn Dialog with project screenshots

// Fetching from backend:
// useEffect → GET /api/projects
// State: { projects, loading, error, filter }
```

**Framer Motion**:

```jsx
<motion.div
    layout // smooth reorder on filter
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.9 }}
    transition={{ duration: 0.3 }}
>
    <ProjectCard />
</motion.div>;
```

---

### 5.5 Experience Timeline

```jsx
// Vertical timeline — alternating left/right on desktop
// Data: hardcoded in constants.js (or fetched from API)

const experience = [
    {
        type: "work",
        title: "Full Stack Developer",
        company: "Company Name",
        duration: "Jan 2023 – Present",
        points: [
            "Built REST APIs with Node/Express",
            "Reduced load time by 40%",
        ],
    },
    {
        type: "education",
        title: "B.Tech Computer Science",
        company: "University Name",
        duration: "2019 – 2023",
        points: ["CGPA 8.5", "Led coding club"],
    },
];
```

**Animation**: Each entry slides in from left/right as user scrolls using
`useIntersectionObserver`.

---

### 5.6 Contact Section

```jsx
// React Hook Form + Zod validation
const schema = z.object({
    name: z.string().min(2, "Name too short"),
    email: z.string().email("Invalid email"),
    subject: z.string().min(5),
    message: z.string().min(20, "Message must be at least 20 chars"),
});

// On submit: POST /api/contact
// Show shadcn Toast on success/failure
// Loading state on submit button
```

---

### 5.7 Admin Panel

```jsx
// Route: /admin (protected by AuthContext)
// Login page: Email + Password → POST /api/auth/login → store JWT in localStorage
// Dashboard tabs: Projects | Contacts
// ProjectForm: shadcn Form with all project fields
// ProjectList: table with Edit/Delete actions
```

---

## 6. Routing (React Router v6)

```jsx
// App.jsx
<BrowserRouter>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
            path="/admin"
            element={
                <PrivateRoute>
                    <Admin />
                </PrivateRoute>
            }
        />
        <Route path="*" element={<NotFound />} />
    </Routes>
</BrowserRouter>;
```

---

## 7. Custom Hooks

### `useScrollSpy`

```js
// Watches section IDs, returns the currently visible section ID
// Used by Navbar to highlight active link
export function useScrollSpy(sectionIds) {
    const [active, setActive] = useState(sectionIds[0]);
    useEffect(() => {
        const observers = sectionIds.map((id) => {
            const el = document.getElementById(id);
            const obs = new IntersectionObserver(([entry]) => {
                if (entry.isIntersecting) setActive(id);
            }, { threshold: 0.5 });
            if (el) obs.observe(el);
            return obs;
        });
        return () => observers.forEach((o) => o.disconnect());
    }, [sectionIds]);
    return active;
}
```

### `useCounterAnimation`

```js
// Animates a number from 0 to target when element enters viewport
export function useCounterAnimation(target, duration = 2000) {
    const [count, setCount] = useState(0);
    // ...
}
```

---

## 8. Environment Variables

```env
# .env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SITE_NAME="Your Name | MERN Developer"
```

---

## 9. Performance Checklist

- [ ] Lazy load all sections below the fold (`React.lazy + Suspense`)
- [ ] Optimize images (WebP format, proper dimensions)
- [ ] Framer Motion `will-change: transform` on animated elements
- [ ] Debounce scroll event listeners
- [ ] Code-split Admin Panel routes
- [ ] Preload LCP image (hero photo)
- [ ] Use `react-helmet-async` for dynamic `<title>` and meta tags per page

---

## 10. Deployment (Vercel)

```bash
# Build
npm run build

# Preview locally
npm run preview

# Deploy via Vercel CLI
vercel --prod
```

**Vercel Config** (`vercel.json`):

```json
{
    "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```
