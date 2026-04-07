import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import { projectService } from "../../services/projectService";
import ProjectForm from "./ProjectForm";

export default function ProjectList() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [editProject, setEditProject] = useState(null);

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const res = await projectService.getAll();
            setProjects(res.data.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { load(); }, [load]);

    const handleDelete = async (id) => {
        if (!confirm("Delete this project?")) return;
        await projectService.delete(id);
        load();
    };

    const handleToggle = async (id) => {
        await projectService.toggleFeatured(id);
        load();
    };

    const handleSave = () => {
        setShowForm(false);
        setEditProject(null);
        load();
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-bold text-xl text-foreground">Projects</h2>
                <button
                    onClick={() => { setShowForm(true); setEditProject(null); }}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white text-sm font-semibold shadow-glow"
                >
                    <Plus size={15} /> Add Project
                </button>
            </div>

            {(showForm || editProject) && (
                <ProjectForm
                    project={editProject}
                    onSave={handleSave}
                    onCancel={() => { setShowForm(false); setEditProject(null); }}
                />
            )}

            {loading ? (
                <div className="space-y-3">
                    {[...Array(3)].map((_, i) => <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />)}
                </div>
            ) : projects.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground border border-dashed border-border rounded-2xl">
                    <p>No projects yet. Click "Add Project" to create one.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {projects.map((project) => (
                        <motion.div
                            key={project._id}
                            layout
                            className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all"
                        >
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-foreground text-sm truncate">{project.title}</h3>
                                    {project.featured && <Star size={13} className="text-accent flex-shrink-0" fill="currentColor" />}
                                </div>
                                <div className="flex items-center gap-2 mt-0.5">
                                    <span className="text-xs text-muted-foreground capitalize">{project.category}</span>
                                    <span className="text-muted-foreground">·</span>
                                    <div className="flex gap-1 flex-wrap">
                                        {project.tags?.slice(0, 3).map((t) => (
                                            <span key={t} className="text-xs px-1.5 py-0.5 rounded bg-muted text-muted-foreground">{t}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1.5 flex-shrink-0">
                                <button
                                    onClick={() => handleToggle(project._id)}
                                    title={project.featured ? "Unfeature" : "Feature"}
                                    className={`p-2 rounded-lg transition-colors ${project.featured ? "text-accent bg-accent/10" : "text-muted-foreground hover:text-accent hover:bg-accent/10"}`}
                                >
                                    <Star size={15} fill={project.featured ? "currentColor" : "none"} />
                                </button>
                                <button
                                    onClick={() => { setEditProject(project); setShowForm(false); }}
                                    className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                                >
                                    <Pencil size={15} />
                                </button>
                                <button
                                    onClick={() => handleDelete(project._id)}
                                    className="p-2 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
                                >
                                    <Trash2 size={15} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
