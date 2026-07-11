import { SOCIAL_LINKS } from "../../lib/constants";

export default function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer className="border-t border-border bg-background py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                    © {year} <span className="gradient-text font-semibold">Diksha Jain</span>. Built with React + Supabase + Framer Motion.
                </p>
                <div className="flex gap-4">
                    {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                        <a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className="text-muted-foreground hover:text-primary transition-colors duration-200"
                        >
                            <Icon size={18} />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}
