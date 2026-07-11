import { useState } from "react";
import { ArrowLeft, Save } from "lucide-react";

const CATEGORIES = [
    { label: "Web", value: "web" },
    { label: "AI / CV", value: "ai-cv" },
    { label: "Design", value: "design" },
    { label: "Hackathon", value: "hackathon" },
];

export default function ProjectForm({ project, onSave, onCancel }) {
    const [form, setForm] = useState({
        title: project?.title || "",
        description: project?.description || "",
        tech_stack: project?.tech_stack?.join(", ") || "",
        category: project?.category || "web",
        github_url: project?.github_url || "",
        live_url: project?.live_url || "",
        achievement: project?.achievement || "",
        featured: project?.featured || false,
        display_order: project?.display_order || 0,
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.title.trim()) {
            setError("Title is required");
            return;
        }
        setSaving(true);
        setError("");
        try {
            await onSave({
                title: form.title.trim(),
                description: form.description.trim(),
                tech_stack: form.tech_stack
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                category: form.category,
                github_url: form.github_url.trim() || null,
                live_url: form.live_url.trim() || null,
                achievement: form.achievement.trim() || null,
                featured: form.featured,
                display_order: parseInt(form.display_order) || 0,
            });
        } catch (err) {
            setError(err.message || "Failed to save");
        } finally {
            setSaving(false);
        }
    };

    const inputClass =
        "w-full px-4 py-2.5 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-all text-sm";

    return (
        <div>
            <button
                onClick={onCancel}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
            >
                <ArrowLeft size={16} /> Back to Projects
            </button>

            <h2 className="font-display text-xl font-bold text-foreground mb-6">
                {project ? "Edit Project" : "New Project"}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
                <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Title *</label>
                    <input
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        placeholder="Project name"
                        className={inputClass}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
                    <textarea
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        rows={4}
                        placeholder="Project description..."
                        className={`${inputClass} resize-none`}
                    />
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Tech Stack</label>
                        <input
                            value={form.tech_stack}
                            onChange={(e) => setForm({ ...form, tech_stack: e.target.value })}
                            placeholder="React, Node.js, Supabase"
                            className={inputClass}
                        />
                        <p className="mt-1 text-xs text-muted-foreground">Comma-separated</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Category</label>
                        <select
                            value={form.category}
                            onChange={(e) => setForm({ ...form, category: e.target.value })}
                            className={inputClass}
                        >
                            {CATEGORIES.map(({ label, value }) => (
                                <option key={value} value={value}>{label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">GitHub URL</label>
                        <input
                            value={form.github_url}
                            onChange={(e) => setForm({ ...form, github_url: e.target.value })}
                            placeholder="https://github.com/..."
                            className={inputClass}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Live URL</label>
                        <input
                            value={form.live_url}
                            onChange={(e) => setForm({ ...form, live_url: e.target.value })}
                            placeholder="https://..."
                            className={inputClass}
                        />
                    </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Achievement</label>
                        <input
                            value={form.achievement}
                            onChange={(e) => setForm({ ...form, achievement: e.target.value })}
                            placeholder="e.g. 2nd Place – IIT Kanpur"
                            className={inputClass}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Display Order</label>
                        <input
                            type="number"
                            value={form.display_order}
                            onChange={(e) => setForm({ ...form, display_order: e.target.value })}
                            className={inputClass}
                        />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="featured"
                        checked={form.featured}
                        onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                        className="rounded"
                    />
                    <label htmlFor="featured" className="text-sm text-foreground">
                        Featured project
                    </label>
                </div>

                {error && (
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-500">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-white font-semibold shadow-glow hover:shadow-glow-accent transition-all disabled:opacity-60"
                >
                    <Save size={16} />
                    {saving ? "Saving..." : "Save Project"}
                </button>
            </form>
        </div>
    );
}
