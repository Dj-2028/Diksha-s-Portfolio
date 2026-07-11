import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, ArrowDown, ChevronDown, ExternalLink } from "lucide-react";
import { SOCIAL_LINKS } from "../../lib/constants";

const roles = [
    "Full Stack Developer",
    "Edge AI/CV Engineer",
    "Visual Designer",
    "Graphic Head @ JLUG",
];

export default function Hero() {
    const [roleIndex, setRoleIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setRoleIndex((i) => (i + 1) % roles.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* Animated background blobs */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-accent/10 blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
            </div>

            {/* Grid overlay */}
            <div
                className="absolute inset-0 -z-10 opacity-[0.03]"
                style={{
                    backgroundImage:
                        "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                }}
            />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
                {/* Greeting */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mb-4"
                >
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/5 text-primary text-sm font-medium font-display">
                        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                        Available for work
                    </span>
                </motion.div>

                {/* Name */}
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.3 }}
                    className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold mb-4"
                >
                    Hi, I'm{" "}
                    <span className="gradient-text">Diksha Jain</span>
                </motion.h1>

                {/* Role cycling */}
                <div className="h-12 md:h-14 flex items-center justify-center mb-6">
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={roleIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="text-xl sm:text-2xl md:text-3xl text-muted-foreground font-body"
                        >
                            {roles[roleIndex]}
                        </motion.p>
                    </AnimatePresence>
                </div>

                {/* Tagline */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10"
                >
                    Full Stack Developer × Edge AI/CV Engineer × Visual Designer.
                    Building production-grade web apps, on-device AI pipelines, and brand systems — with a design eye.
                </motion.p>

                {/* CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex flex-wrap items-center justify-center gap-4 mb-12"
                >
                    <a
                        href="#projects"
                        onClick={(e) => {
                            e.preventDefault();
                            document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                        }}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-white font-semibold shadow-glow hover:shadow-glow-accent transition-all duration-300 hover:scale-105"
                    >
                        View My Projects
                        <ArrowDown size={16} />
                    </a>
                    <a
                        href="/resume.pdf"
                        download
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card text-foreground font-semibold hover:border-primary hover:text-primary transition-all duration-300 hover:scale-105"
                    >
                        <Download size={16} />
                        Download Resume
                    </a>
                    <a
                        href="https://graphic-portfolio-nine.vercel.app"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-accent/40 bg-accent/5 text-accent font-semibold hover:bg-accent hover:text-white transition-all duration-300 hover:scale-105"
                    >
                        <ExternalLink size={16} />
                        Design Portfolio
                    </a>
                </motion.div>

                {/* Social icons */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="flex items-center justify-center gap-4"
                >
                    {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className="p-3 rounded-xl border border-border bg-card text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 hover:scale-110 hover:shadow-glow"
                        >
                            <Icon size={20} />
                        </a>
                    ))}
                </motion.div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-muted-foreground"
            >
                <span className="text-xs font-display uppercase tracking-widest">Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                    <ChevronDown size={20} />
                </motion.div>
            </motion.div>
        </section>
    );
}
