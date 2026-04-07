import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Send, Mail, CheckCircle, AlertCircle } from "lucide-react";
import { FaGithub as Github, FaLinkedin as Linkedin } from "react-icons/fa";
import SectionHeading from "../common/SectionHeading";
import { SOCIAL_LINKS } from "../../lib/constants";
import api from "../../lib/axios";

const schema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    subject: z.string().min(5, "Subject must be at least 5 characters"),
    message: z.string().min(20, "Message must be at least 20 characters"),
});

export default function Contact() {
    const [status, setStatus] = useState(null); // 'success' | 'error' | null
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({ resolver: zodResolver(schema) });

    const onSubmit = async (data) => {
        try {
            await api.post("/contact", data);
            setStatus("success");
            reset();
            setTimeout(() => setStatus(null), 5000);
        } catch {
            setStatus("error");
            setTimeout(() => setStatus(null), 5000);
        }
    };

    return (
        <section id="contact" className="py-20 md:py-32">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <SectionHeading
                    label="Contact"
                    title="Get In Touch"
                    subtitle="Have a project in mind or just want to say hi? My inbox is always open."
                />

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    {/* Left: info */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-6"
                    >
                        <p className="text-muted-foreground leading-relaxed">
                            I'm currently open to freelance work, full-time roles, and interesting collaborations. Whether you have a question or just want to chat about tech — reach out!
                        </p>

                        <div className="space-y-4">
                            <a href="mailto:diksha@example.com"
                                className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/40 transition-all group">
                                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                    <Mail size={18} />
                                </div>
                                <div>
                                    <div className="text-sm text-muted-foreground">Email</div>
                                    <div className="text-foreground font-medium text-sm">diksha@example.com</div>
                                </div>
                            </a>

                            {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/40 transition-all group">
                                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                        <Icon size={18} />
                                    </div>
                                    <div>
                                        <div className="text-sm text-muted-foreground">{label}</div>
                                        <div className="text-foreground font-medium text-sm">@dikshajain</div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: form */}
                    <motion.form
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-4 bg-card border border-border rounded-2xl p-6 md:p-8"
                    >
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
                                <input
                                    {...register("name")}
                                    placeholder="Your Name"
                                    className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm"
                                />
                                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name.message}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
                                <input
                                    {...register("email")}
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm"
                                />
                                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1.5">Subject</label>
                            <input
                                {...register("subject")}
                                placeholder="What's this about?"
                                className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm"
                            />
                            {errors.subject && <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
                            <textarea
                                {...register("message")}
                                rows={5}
                                placeholder="Tell me about your project or idea..."
                                className="w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm resize-none"
                            />
                            {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>}
                        </div>

                        {status && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`flex items-center gap-2 p-3 rounded-xl text-sm ${
                                    status === "success"
                                        ? "bg-green-500/10 text-green-500 border border-green-500/20"
                                        : "bg-red-500/10 text-red-500 border border-red-500/20"
                                }`}
                            >
                                {status === "success"
                                    ? <><CheckCircle size={16} /> Message sent! I'll get back to you soon.</>
                                    : <><AlertCircle size={16} /> Something went wrong. Please try again.</>}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl gradient-primary text-white font-semibold shadow-glow hover:shadow-glow-accent transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                        >
                            {isSubmitting ? (
                                <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                            ) : (
                                <Send size={16} />
                            )}
                            {isSubmitting ? "Sending..." : "Send Message"}
                        </button>
                    </motion.form>
                </div>
            </div>
        </section>
    );
}
