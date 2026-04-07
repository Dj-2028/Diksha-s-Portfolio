import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-accent/10 blur-3xl" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-center"
            >
                <motion.div
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="font-display text-9xl md:text-[12rem] font-bold gradient-text leading-none mb-4"
                >
                    404
                </motion.div>
                <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3">
                    Page Not Found
                </h1>
                <p className="text-muted-foreground mb-8 max-w-sm mx-auto">
                    Looks like this page went on vacation. Let's get you back home.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border text-foreground hover:bg-muted transition-all font-medium"
                    >
                        <ArrowLeft size={16} /> Go Back
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-white font-semibold shadow-glow hover:shadow-glow-accent transition-all"
                    >
                        <Home size={16} /> Go Home
                    </button>
                </div>
            </motion.div>
        </div>
    );
}
