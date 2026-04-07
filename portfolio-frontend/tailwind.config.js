import { createRequire } from "module";
const require = createRequire(import.meta.url);

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
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            fontFamily: {
                display: ["'Space Mono'", "monospace"],
                body: ["'DM Sans'", "sans-serif"],
            },
            animation: {
                "fade-in": "fadeIn 0.6s ease forwards",
                "slide-up": "slideUp 0.5s ease forwards",
                "blink": "blink 1s step-end infinite",
                "spin-slow": "spin 6s linear infinite",
                "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
            keyframes: {
                fadeIn: { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
                slideUp: {
                    "0%": { transform: "translateY(40px)", opacity: 0 },
                    "100%": { transform: "translateY(0)", opacity: 1 },
                },
                blink: { "50%": { opacity: 0 } },
            },
            boxShadow: {
                "glow": "0 0 20px rgba(99, 102, 241, 0.4)",
                "glow-accent": "0 0 20px rgba(0, 204, 136, 0.4)",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
