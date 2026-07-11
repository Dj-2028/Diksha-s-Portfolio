import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "../components/common/ThemeToggle";

const schema = z.object({
    email: z.string().email("Valid email required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export default function AdminLogin() {
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [showPw, setShowPw] = useState(false);
    const [error, setError] = useState("");

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(schema),
    });

    if (isAuthenticated) {
        navigate("/admin");
        return null;
    }

    const onSubmit = async (data) => {
        setError("");
        try {
            await login(data.email, data.password);
            navigate("/admin");
        } catch (err) {
            setError(err.message || "Invalid email or password");
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4 relative">
            {/* Background blobs */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/3 left-1/3 w-80 h-80 rounded-full bg-primary/10 blur-3xl" />
                <div className="absolute bottom-1/3 right-1/3 w-64 h-64 rounded-full bg-accent/10 blur-3xl" />
            </div>

            <div className="absolute top-4 right-4">
                <ThemeToggle />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "backOut" }}
                className="w-full max-w-sm"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl gradient-primary shadow-glow mb-4">
                        <Lock size={24} className="text-white" />
                    </div>
                    <h1 className="font-display text-2xl font-bold text-foreground">Admin Login</h1>
                    <p className="text-sm text-muted-foreground mt-1">Portfolio CMS · Diksha Jain</p>
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4 bg-card border border-border rounded-2xl p-6 shadow-2xl"
                >
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                        <input
                            {...register("email")}
                            type="email"
                            placeholder="admin@portfolio.com"
                            className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm"
                        />
                        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Password</label>
                        <div className="relative">
                            <input
                                {...register("password")}
                                type={showPw ? "text" : "password"}
                                placeholder="••••••••"
                                className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPw(!showPw)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                            </button>
                        </div>
                        {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
                    </div>

                    {error && (
                        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-500">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl gradient-primary text-white font-semibold shadow-glow hover:shadow-glow-accent transition-all disabled:opacity-60 mt-2"
                    >
                        {isSubmitting
                            ? <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                            : <LogIn size={16} />}
                        {isSubmitting ? "Signing in..." : "Sign In"}
                    </button>
                </form>

                <p className="text-center text-xs text-muted-foreground mt-4">
                    Sign in with your Supabase Auth credentials
                </p>
            </motion.div>
        </div>
    );
}
