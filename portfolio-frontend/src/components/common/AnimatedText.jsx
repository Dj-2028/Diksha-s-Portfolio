import { motion } from "framer-motion";

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.05 },
    },
};

const letter = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { ease: "easeOut" } },
};

export default function AnimatedText({ text, className = "", once = true, delay = 0 }) {
    const words = text.split(" ");

    return (
        <motion.span
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once }}
            className={`inline-flex flex-wrap gap-x-[0.25em] ${className}`}
            style={{ transitionDelay: `${delay}s` }}
        >
            {words.map((word, wi) => (
                <span key={wi} className="overflow-hidden inline-flex">
                    {word.split("").map((char, ci) => (
                        <motion.span key={ci} variants={letter} className="inline-block">
                            {char}
                        </motion.span>
                    ))}
                </span>
            ))}
        </motion.span>
    );
}
