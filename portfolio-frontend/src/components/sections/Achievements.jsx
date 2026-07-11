import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Medal, Award, ExternalLink } from "lucide-react";
import SectionHeading from "../common/SectionHeading";
import { FALLBACK_ACHIEVEMENTS } from "../../lib/constants";
import { achievementService } from "../../services/achievementService";

const icons = [Trophy, Medal, Award];

function AchievementCard({ item, index }) {
    const Icon = icons[index % icons.length];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className="relative p-6 rounded-2xl bg-card border border-border hover:border-accent/40 hover:shadow-glow-accent transition-all duration-300 group"
        >
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent/10 text-accent mb-4 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                <Icon size={22} />
            </div>

            {/* Rank badge */}
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                <span className="text-xs font-display font-bold text-accent">#{index + 1}</span>
            </div>

            <h3 className="font-display font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                {item.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
                {item.detail}
            </p>

            {item.link && (
                <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-3 text-xs text-accent hover:underline font-medium"
                >
                    <ExternalLink size={12} /> View More
                </a>
            )}
        </motion.div>
    );
}

export default function Achievements() {
    const [achievements, setAchievements] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        achievementService
            .getAll()
            .then((data) => setAchievements(data || []))
            .catch(() => {
                console.warn("Supabase not configured, using fallback achievements data");
                setAchievements(FALLBACK_ACHIEVEMENTS);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <section id="achievements" className="py-20 md:py-32">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <SectionHeading label="Achievements" title="Milestones" subtitle="Loading..." />
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="h-44 rounded-2xl bg-muted animate-pulse" />
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="achievements" className="py-20 md:py-32">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <SectionHeading
                    label="Achievements"
                    title="Milestones & Recognition"
                    subtitle="Hackathon wins, certifications, and highlights from my journey so far."
                />

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {achievements.map((item, index) => (
                        <AchievementCard key={item.id} item={item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
