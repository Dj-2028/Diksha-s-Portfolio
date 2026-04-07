import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "../common/SectionHeading";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { SKILLS, SKILL_CATEGORIES } from "../../lib/constants";
import { cn } from "../../lib/utils";

function SkillBar({ name, level, Icon, color, inView }) {
    return (
        <div className="flex items-center gap-3 group">
            <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 border border-border bg-card group-hover:border-primary/50 transition-colors"
                style={{ color }}
            >
                <Icon size={20} />
            </div>
            <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium text-foreground">{name}</span>
                    <span className="text-xs font-display text-primary">{level}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <motion.div
                        className="h-full rounded-full"
                        style={{ background: `linear-gradient(90deg, hsl(var(--primary)), ${color})` }}
                        initial={{ width: 0 }}
                        animate={{ width: inView ? `${level}%` : 0 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    />
                </div>
            </div>
        </div>
    );
}

export default function Skills() {
    const [activeCategory, setActiveCategory] = useState("frontend");
    const [ref, inView] = useIntersectionObserver();

    const labels = {
        frontend: "Frontend",
        backend: "Backend",
        database: "Database",
        devops: "DevOps",
    };

    return (
        <section id="skills" className="py-20 md:py-32 bg-muted/30">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <SectionHeading
                    label="Skills"
                    title="What I Work With"
                    subtitle="A curated set of tools and technologies I've mastered across the full stack."
                />

                {/* Category tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {SKILL_CATEGORIES.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={cn(
                                "px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                                activeCategory === cat
                                    ? "gradient-primary text-white shadow-glow"
                                    : "border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/50"
                            )}
                        >
                            {labels[cat]}
                        </button>
                    ))}
                </div>

                {/* Skill bars grid */}
                <motion.div
                    ref={ref}
                    key={activeCategory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto"
                >
                    {SKILLS[activeCategory]?.map((skill) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4 }}
                            className="p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
                        >
                            <SkillBar {...skill} inView={inView} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
