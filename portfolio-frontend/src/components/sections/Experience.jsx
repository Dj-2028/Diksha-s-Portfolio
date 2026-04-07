import { motion } from "framer-motion";
import { Briefcase, GraduationCap } from "lucide-react";
import SectionHeading from "../common/SectionHeading";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";
import { EXPERIENCE } from "../../lib/constants";

function TimelineItem({ item, index }) {
    const [ref, inView] = useIntersectionObserver();
    const isLeft = index % 2 === 0;

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
                    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full ${
                        item.type === "work"
                            ? "bg-primary/10 text-primary border border-primary/20"
                            : "bg-accent/10 text-accent border border-accent/20"
                    }`}>
                        {item.type === "work"
                            ? <Briefcase size={11} />
                            : <GraduationCap size={11} />}
                        {item.type === "work" ? "Work" : "Education"}
                    </span>
                    <span className="text-xs text-muted-foreground font-display">{item.duration}</span>
                </div>
                <h3 className="font-display font-bold text-lg text-foreground mt-2">{item.title}</h3>
                <p className="text-primary text-sm font-medium mb-3">{item.company}</p>
                <ul className="space-y-1.5">
                    {item.points.map((point, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                            {point}
                        </li>
                    ))}
                </ul>
            </motion.div>

            {/* Center dot (desktop) */}
            <div className="hidden md:flex flex-col items-center">
                <motion.div
                    animate={inView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className={`w-5 h-5 rounded-full border-2 border-primary flex-shrink-0 ${
                        item.type === "work" ? "bg-primary" : "bg-accent border-accent"
                    }`}
                />
            </div>

            {/* Spacer for opposite side */}
            <div className="hidden md:block flex-1" />
        </div>
    );
}

export default function Experience() {
    return (
        <section id="experience" className="py-20 md:py-32 bg-muted/30">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
                <SectionHeading
                    label="Experience"
                    title="My Journey"
                    subtitle="Where I've worked and what I've learned along the way."
                />

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical line (desktop) */}
                    <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-border" />

                    <div className="space-y-8">
                        {EXPERIENCE.map((item, index) => (
                            <TimelineItem key={index} item={item} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
