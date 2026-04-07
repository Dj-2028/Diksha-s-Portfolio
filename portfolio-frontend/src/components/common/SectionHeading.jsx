import { motion } from "framer-motion";

export default function SectionHeading({ label, title, subtitle, className = "" }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`text-center mb-12 md:mb-16 ${className}`}
        >
            {label && (
                <span className="inline-block text-sm font-display font-bold uppercase tracking-widest text-primary mb-3">
                    {label}
                </span>
            )}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                {title}
            </h2>
            {subtitle && (
                <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
                    {subtitle}
                </p>
            )}
            {/* Decorative underline */}
            <div className="mt-4 flex justify-center">
                <div className="h-1 w-16 rounded-full gradient-primary" />
            </div>
        </motion.div>
    );
}
