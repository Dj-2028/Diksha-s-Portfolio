import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV_LINKS } from "../../lib/constants";
import { useScrollSpy } from "../../hooks/useScrollSpy";
import ThemeToggle from "../common/ThemeToggle";
import MobileMenu from "./MobileMenu";
import { Menu } from "lucide-react";
import { cn } from "../../lib/utils";

const sectionIds = NAV_LINKS.map((l) => l.href.replace("#", ""));

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const activeSection = useScrollSpy(sectionIds);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleNavClick = (href) => {
        setMobileOpen(false);
        const el = document.querySelector(href);
        if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <>
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className={cn(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                    scrolled
                        ? "glass shadow-lg border-b border-border/50 py-3"
                        : "bg-transparent py-5"
                )}
            >
                <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between">
                    {/* Logo */}
                    <motion.a
                        href="/"
                        className="font-display text-xl font-bold gradient-text"
                        whileHover={{ scale: 1.05 }}
                    >
                        DJ.
                    </motion.a>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-1">
                        {NAV_LINKS.map((link) => {
                            const id = link.href.replace("#", "");
                            const isActive = activeSection === id;
                            return (
                                <button
                                    key={link.label}
                                    onClick={() => handleNavClick(link.href)}
                                    className={cn(
                                        "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                                        isActive
                                            ? "text-primary bg-primary/10"
                                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                    )}
                                >
                                    {link.label}
                                </button>
                            );
                        })}
                    </nav>

                    {/* Right actions */}
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <button
                            className="md:hidden p-2 rounded-lg hover:bg-muted text-foreground"
                            onClick={() => setMobileOpen(true)}
                            aria-label="Open menu"
                        >
                            <Menu size={20} />
                        </button>
                    </div>
                </div>
            </motion.header>

            <MobileMenu
                isOpen={mobileOpen}
                onClose={() => setMobileOpen(false)}
                activeSection={activeSection}
                onNavClick={handleNavClick}
            />
        </>
    );
}
