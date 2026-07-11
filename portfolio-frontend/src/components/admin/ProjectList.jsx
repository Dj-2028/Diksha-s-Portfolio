import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Star, StarOff } from "lucide-react";
import { projectService } from "../../services/projectService";
import ProjectForm from "./ProjectForm";

export default function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null); // null | 'new' | project object
    const [error, setError] = useState("");

    const fetchProjects = async () => {
        try {
            const data = await projectService.getAll();
            setProjects(data || []);
        } catch (err) {
            setError("Failed to load projects");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleDelete = async (id) => {
        if (!confirm("Delete this project?")) return;
        try {
            await projectService.delete(id);
            setProjects((prev) => prev.filter((p) => p.id !== id));
        } catch {
            setError("Failed to delete project");
        }
    };

    const handleToggleFeatured = async (project) => {
        try {
            const updated = await projectService.toggleFeatured(project.id, project.featured);
            setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
        } catch {
            setError("Failed to update project");
        }
    };

    const handleSave = async (data) => {
        try {
            if (editing && editing !== "new") {
                const updated = await projectService.update(editing.id, data);
                setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
            } else {
                const created = await projectService.create(data);
                setProjects((prev) => [...prev, created]);
            }
            setEditing(null);
        } catch (err) {
            setError(err.message || "Failed to save project");
        }
    };

    if (editing) {
        return (
            <ProjectForm
                project={editing === "new" ? null : editing}
                onSave={handleSave}
                onCancel={() => setEditing(null)}
            />
        );
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-bold text-foreground">Projects</h2>
                <button
                    onClick={() => setEditing("new")}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white text-sm font-medium shadow-glow hover:shadow-glow-accent transition-all"
                >
                    <Plus size={16} /> Add Project
                </button>
            </div>

            {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-500">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-20 rounded-xl bg-muted animate-pulse" />
                    ))}
                </div>
            ) : projects.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                    <p>No projects yet. Click "Add Project" to create one.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center justify-between p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all"
                        >
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-medium text-foreground truncate">{project.title}</h3>
                                    {project.featured && (
                                        <Star size={14} className="text-accent flex-shrink-0" fill="currentColor" />
                                    )}
                                    <span className="px-2 py-0.5 rounded text-xs bg-muted text-muted-foreground">
                                        {project.category}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground truncate mt-0.5">
                                    {project.description}
                                </p>
                            </div>
                            <div className="flex items-center gap-1 ml-4">
                                <button
                                    onClick={() => handleToggleFeatured(project)}
                                    className="p-2 rounded-lg text-muted-foreground hover:text-accent hover:bg-muted transition-all"
                                    title={project.featured ? "Unfeature" : "Feature"}
                                >
                                    {project.featured ? <StarOff size={16} /> : <Star size={16} />}
                                </button>
                                <button
                                    onClick={() => setEditing(project)}
                                    className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-all"
                                >
                                    <Pencil size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(project.id)}
                                    className="p-2 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-all"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
