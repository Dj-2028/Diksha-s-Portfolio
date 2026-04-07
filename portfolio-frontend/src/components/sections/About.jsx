import { motion } from "framer-motion";
import { Download } from "lucide-react";
import SectionHeading from "../common/SectionHeading";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { useCounterAnimation } from "../../hooks/useCounterAnimation";
import { STATS } from "../../lib/constants";

function StatCard({ label, value, suffix }) {
    const [ref, inView] = useIntersectionObserver();
    const count = useCounterAnimation(value, 2000, inView);
    return (
        <div ref={ref} className="text-center">
            <div className="text-4xl md:text-5xl font-display font-bold gradient-text">
                {count}{suffix}
            </div>
            <div className="text-sm text-muted-foreground mt-1 font-body">{label}</div>
        </div>
    );
}

export default function About() {
    return (
        <section id="about" className="py-20 md:py-32">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <SectionHeading
                    label="About Me"
                    title="Who I Am"
                    subtitle="A passionate full-stack developer who loves crafting seamless digital experiences."
                />

                <div className="grid md:grid-cols-2 gap-12 items-center">
                    {/* Photo side */}
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="flex justify-center"
                    >
                        <div className="relative">
                            {/* Decorative border */}
                            <div className="absolute -inset-4 rounded-3xl gradient-primary opacity-20 blur-xl" />
                            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden border-2 border-primary/30 shadow-glow">
                                {/* Placeholder profile image */}
                                <div className="w-full h-full bg-gradient-to-br from-primary/20 via-accent/10 to-primary/5 flex items-center justify-center">
                                    <span className="font-display text-7xl font-bold gradient-text">DJ</span>
                                </div>
                            </div>
                            {/* Floating badge */}
                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-4 -right-4 px-4 py-2 rounded-xl glass border border-primary/30 shadow-glow"
                            >
                                <span className="text-sm font-display font-bold gradient-text">MERN Stack 🚀</span>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Text side */}
                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="space-y-5"
                    >
                        <p className="text-muted-foreground leading-relaxed text-base md:text-lg">
                            I'm <span className="text-foreground font-semibold">Diksha Jain</span>, a passionate MERN Stack Developer with a deep love for building scalable, production-ready web applications. Every project I take on is an opportunity to craft something meaningful.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            I specialize in <span className="text-primary font-medium">React</span>, <span className="text-primary font-medium">Node.js</span>, <span className="text-primary font-medium">Express</span>, and <span className="text-primary font-medium">MongoDB</span> — building everything from real-time apps to RESTful APIs. I care deeply about clean code, good architecture, and user experience.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            When I'm not coding, you'll find me exploring new technologies, contributing to open source, or writing about web development.
                        </p>

                        <div className="pt-2">
                            <a
                                href="/resume.pdf"
                                download
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300"
                            >
                                <Download size={16} />
                                Download Resume
                            </a>
                        </div>
                    </motion.div>
                </div>

                {/* Stats row */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}
                    className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 p-8 rounded-2xl border border-border bg-card"
                >
                    {STATS.map((stat) => (
                        <StatCard key={stat.label} {...stat} />
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
