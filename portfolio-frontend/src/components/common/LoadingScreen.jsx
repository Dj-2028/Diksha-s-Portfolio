import { motion } from "framer-motion";

export default function LoadingScreen() {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-background"
        >
            {/* Logo mark */}
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, ease: "backOut" }}
                className="font-display text-5xl font-bold gradient-text mb-8"
            >
                DJ.
            </motion.div>

            {/* Animated bar */}
            <div className="w-48 h-[3px] rounded-full bg-muted overflow-hidden">
                <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 1, ease: "easeInOut", repeat: Infinity }}
                    className="h-full w-1/2 gradient-primary rounded-full"
                />
            </div>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-6 text-sm text-muted-foreground font-body tracking-widest uppercase"
            >
                Loading...
            </motion.p>
        </motion.div>
    );
}
