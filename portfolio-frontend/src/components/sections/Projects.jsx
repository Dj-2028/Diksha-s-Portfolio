import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Star, X, ChevronLeft, ChevronRight } from "lucide-react";
import { FaGithub as Github } from "react-icons/fa";
import SectionHeading from "../common/SectionHeading";
import { PROJECT_CATEGORIES } from "../../lib/constants";
import { cn } from "../../lib/utils";
import api from "../../lib/axios";

function ProjectCard({ project, onOpen }) {
    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -6 }}
            className="group relative bg-card border border-border rounded-2xl overflow-hidden cursor-pointer hover:border-primary/40 hover:shadow-glow transition-all duration-300"
            onClick={() => onOpen(project)}
        >
            {/* Card image */}
            <div className="h-44 bg-gradient-to-br from-primary/20 via-accent/10 to-muted flex items-center justify-center relative overflow-hidden">
                <span className="font-display text-4xl font-bold gradient-text opacity-60">
                    {project.title.charAt(0)}
                </span>
                {project.featured && (
                    <span className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent border border-accent/30">
                        <Star size={10} fill="currentColor" /> Featured
                    </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <span className="text-sm text-white font-medium">Click to view details</span>
                </div>
            </div>

            <div className="p-5">
                <h3 className="font-display font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{project.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags?.slice(0, 4).map((tag) => (
                        <span key={tag} className="px-2 py-0.5 rounded-md text-xs bg-muted text-muted-foreground font-medium">
                            {tag}
                        </span>
                    ))}
                    {project.tags?.length > 4 && (
                        <span className="px-2 py-0.5 rounded-md text-xs bg-muted text-muted-foreground">+{project.tags.length - 4}</span>
                    )}
                </div>

                {/* Links */}
                <div className="flex gap-3" onClick={(e) => e.stopPropagation()}>
                    {project.githubUrl && (
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors font-medium">
                            <Github size={14} /> Code
                        </a>
                    )}
                    {project.demoUrl && (
                        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                            className="flex items-center gap-1.5 text-xs text-primary hover:text-accent transition-colors font-medium">
                            <ExternalLink size={14} /> Live Demo
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

function ProjectModal({ project, onClose }) {
    if (!project) return null;
    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0, y: 20 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
                >
                    <div className="h-48 bg-gradient-to-br from-primary/20 via-accent/10 to-muted flex items-center justify-center relative">
                        <span className="font-display text-6xl font-bold gradient-text opacity-60">
                            {project.title.charAt(0)}
                        </span>
                        <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-lg bg-card/80 hover:bg-card text-foreground">
                            <X size={18} />
                        </button>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex items-start justify-between">
                            <h3 className="font-display text-2xl font-bold text-foreground">{project.title}</h3>
                            {project.featured && (
                                <span className="flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent border border-accent/30">
                                    <Star size={10} fill="currentColor" /> Featured
                                </span>
                            )}
                        </div>
                        <p className="text-muted-foreground leading-relaxed">
                            {project.longDescription || project.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {project.tags?.map((tag) => (
                                <span key={tag} className="px-3 py-1 rounded-lg text-sm bg-muted text-muted-foreground font-medium">
                                    {tag}
                                </span>
                            ))}
                        </div>
                        <div className="flex gap-4 pt-2">
                            {project.githubUrl && (
                                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:border-primary text-foreground hover:text-primary transition-all text-sm font-medium">
                                    <Github size={16} /> View Code
                                </a>
                            )}
                            {project.demoUrl && (
                                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white text-sm font-medium shadow-glow hover:shadow-glow-accent transition-all">
                                    <ExternalLink size={16} /> Live Demo
                                </a>
                            )}
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default function Projects() {
    const [filter, setFilter] = useState("all");
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        api.get("/projects")
            .then((res) => setProjects(res.data.data || []))
            .catch(() => setProjects([]))
            .finally(() => setLoading(false));
    }, []);

    const filtered = filter === "all" ? projects : projects.filter((p) => p.category === filter);

    return (
        <section id="projects" className="py-20 md:py-32">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
                <SectionHeading
                    label="Projects"
                    title="Things I've Built"
                    subtitle="A selection of projects that demonstrate my skills across the full stack."
                />

                {/* Filter tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {PROJECT_CATEGORIES.map(({ label, value }) => (
                        <button
                            key={value}
                            onClick={() => setFilter(value)}
                            className={cn(
                                "px-5 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                                filter === value
                                    ? "gradient-primary text-white shadow-glow"
                                    : "border border-border bg-card text-muted-foreground hover:text-foreground hover:border-primary/50"
                            )}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {loading ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, i) => (
                            <div key={i} className="h-72 rounded-2xl bg-muted animate-pulse" />
                        ))}
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="text-center py-20 text-muted-foreground">
                        <p>No projects found. Add some via the admin panel!</p>
                    </div>
                ) : (
                    <motion.div layout className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <AnimatePresence>
                            {filtered.map((project) => (
                                <ProjectCard key={project._id} project={project} onOpen={setSelectedProject} />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>

            <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        </section>
    );
}
