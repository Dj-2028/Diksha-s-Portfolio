import { motion } from "framer-motion";

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
                    subtitle="Technical builder with a design eye — bridging code, AI, and visual identity."
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
                                <img
                                    src="/Main.png"
                                    alt="Diksha Jain"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Floating badge */}
                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute -bottom-4 -right-4 px-4 py-2 rounded-xl glass border border-primary/30 shadow-glow"
                            >
                                <span className="text-sm font-display font-bold gradient-text">Code × Design 🎨</span>
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
                            I'm <span className="text-foreground font-semibold">Diksha Jain</span>, a B.Tech IT student at{" "}
                            <span className="text-primary font-medium">Jabalpur Engineering College</span> (2024–present),
                            currently interning as a Full Stack Developer at{" "}
                            <span className="text-primary font-medium">Gyaini</span> with a focus on Edge AI and Computer Vision.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            I sit at the intersection of{" "}
                            <span className="text-primary font-medium">full-stack development</span>,{" "}
                            <span className="text-primary font-medium">AI/CV engineering</span>, and{" "}
                            <span className="text-primary font-medium">graphic design</span>. As the{" "}
                            <span className="text-foreground font-semibold">Graphic Head at JLUG</span> (JEC Linux Users Group),
                            I bring a designer's sensibility to every technical project I build.
                        </p>
                        <p className="text-muted-foreground leading-relaxed">
                            From winning hackathons at IIT Kanpur to building multimodal VLM inference engines in C++, I love
                            shipping things that are both technically deep and visually polished.
                        </p>


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
