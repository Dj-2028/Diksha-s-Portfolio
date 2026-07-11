import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar } from "lucide-react";
import SectionHeading from "../common/SectionHeading";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { FALLBACK_EXPERIENCE } from "../../lib/constants";
import { experienceService } from "../../services/experienceService";

function formatDate(dateStr) {
    if (!dateStr) return "Present";
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function TimelineItem({ item, index }) {
    const [ref, inView] = useIntersectionObserver();
    const isLeft = index % 2 === 0;

    const duration = `${formatDate(item.start_date)} – ${formatDate(item.end_date)}`;

    return (
        <div
            ref={ref}
            className={`relative flex md:items-center ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} gap-4 md:gap-8`}
        >
            {/* Content card */}
            <motion.div
                initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex-1 p-5 md:p-6 rounded-2xl bg-card border border-border hover:border-primary/40 hover:shadow-glow transition-all duration-300"
            >
                <div className="flex items-center gap-2 mb-1">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
                        <Briefcase size={11} />
                        Work
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-muted-foreground font-display">
                        <Calendar size={11} />
                        {duration}
                    </span>
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mt-2">{item.role}</h3>
                <p className="text-primary text-sm font-medium mb-3">{item.organization}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{item.description}</p>

                {/* Tech stack badges */}
                {item.tech_stack && item.tech_stack.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {item.tech_stack.map((tech) => (
                            <span key={tech} className="px-2 py-0.5 rounded-md text-xs bg-muted text-muted-foreground font-medium">
                                {tech}
                            </span>
                        ))}
                    </div>
                )}
            </motion.div>

            {/* Center dot (desktop) */}
            <div className="hidden md:flex flex-col items-center">
                <motion.div
                    animate={inView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="w-5 h-5 rounded-full border-2 border-primary bg-primary flex-shrink-0"
                />
            </div>

            {/* Spacer for opposite side */}
            <div className="hidden md:block flex-1" />
        </div>
    );
}

export default function Experience() {
    const [experience, setExperience] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        experienceService
            .getAll()
            .then((data) => setExperience(data || []))
            .catch(() => {
                console.warn("Supabase not configured, using fallback experience data");
                setExperience(FALLBACK_EXPERIENCE);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <section id="experience" className="py-20 md:py-32 bg-muted/30">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    <SectionHeading label="Experience" title="My Journey" subtitle="Loading..." />
                    <div className="space-y-8">
                        {[1, 2].map((i) => (
                            <div key={i} className="h-40 rounded-2xl bg-muted animate-pulse" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="experience" className="py-20 md:py-32 bg-muted/30">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <SectionHeading
                    label="Experience"
                    title="My Journey"
                    subtitle="Internships and roles where I've shipped real products and learned fast."
                />

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line (desktop) */}
                    <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border" />

                    <div className="space-y-8">
                        {experience.map((item, index) => (
                            <TimelineItem key={item.id} item={item} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
