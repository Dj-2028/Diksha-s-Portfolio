import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { NAV_LINKS, SOCIAL_LINKS } from "../../lib/constants";
import { cn } from "../../lib/utils";

export default function MobileMenu({ isOpen, onClose, activeSection, onNavClick }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 z-50 h-full w-72 bg-card border-l border-border shadow-2xl flex flex-col p-6"
                    >
                        <div className="flex items-center justify-between mb-8">
                            <span className="font-display text-xl font-bold gradient-text">DJ.</span>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-lg hover:bg-muted text-foreground"
                                aria-label="Close menu"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <nav className="flex flex-col gap-2 flex-1">
                            {NAV_LINKS.map((link, i) => {
                                const id = link.href.replace("#", "");
                                const isActive = activeSection === id;
                                return (
                                    <motion.button
                                        key={link.label}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        onClick={() => onNavClick(link.href)}
                                        className={cn(
                                            "text-left px-4 py-3 rounded-lg text-base font-medium transition-all",
                                            isActive
                                                ? "text-primary bg-primary/10"
                                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                        )}
                                    >
                                        {link.label}
                                    </motion.button>
                                );
                            })}
                        </nav>

                        <div className="flex gap-3 pt-6 border-t border-border mt-4">
                            {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                                    aria-label={label}
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
