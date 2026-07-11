import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, ArrowLeft, Save, Briefcase } from "lucide-react";
import { experienceService } from "../../services/experienceService";

function ExperienceForm({ item, onSave, onCancel }) {
    const [form, setForm] = useState({
        role: item?.role || "",
        organization: item?.organization || "",
        start_date: item?.start_date || "",
        end_date: item?.end_date || "",
        description: item?.description || "",
        tech_stack: item?.tech_stack?.join(", ") || "",
        display_order: item?.display_order || 0,
    });
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.role.trim() || !form.organization.trim()) {
            setError("Role and Organization are required");
            return;
        }
        setSaving(true);
        setError("");
        try {
            await onSave({
                role: form.role.trim(),
                organization: form.organization.trim(),
                start_date: form.start_date || null,
                end_date: form.end_date || null,
                description: form.description.trim(),
                tech_stack: form.tech_stack
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
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
            <button onClick={onCancel} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
                <ArrowLeft size={16} /> Back to Experience
            </button>
            <h2 className="font-display text-xl font-bold text-foreground mb-6">
                {item ? "Edit Experience" : "New Experience"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Role *</label>
                        <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Full Stack Developer Intern" className={inputClass} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Organization *</label>
                        <input value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} placeholder="Company Name" className={inputClass} />
                    </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Start Date</label>
                        <input type="date" value={form.start_date} onChange={(e) => setForm({ ...form, start_date: e.target.value })} className={inputClass} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">End Date (leave empty for present)</label>
                        <input type="date" value={form.end_date} onChange={(e) => setForm({ ...form, end_date: e.target.value })} className={inputClass} />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
                    <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={4} placeholder="What you did..." className={`${inputClass} resize-none`} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Tech Stack</label>
                        <input value={form.tech_stack} onChange={(e) => setForm({ ...form, tech_stack: e.target.value })} placeholder="React, Node.js, C++" className={inputClass} />
                        <p className="mt-1 text-xs text-muted-foreground">Comma-separated</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Display Order</label>
                        <input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: e.target.value })} className={inputClass} />
                    </div>
                </div>
                {error && <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-500">{error}</div>}
                <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-white font-semibold shadow-glow hover:shadow-glow-accent transition-all disabled:opacity-60">
                    <Save size={16} /> {saving ? "Saving..." : "Save Experience"}
                </button>
            </form>
        </div>
    );
}

export default function ExperienceManager() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [error, setError] = useState("");

    const fetchItems = async () => {
        try {
            const data = await experienceService.getAll();
            setItems(data || []);
        } catch {
            setError("Failed to load experience");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchItems(); }, []);

    const handleDelete = async (id) => {
        if (!confirm("Delete this experience?")) return;
        try {
            await experienceService.delete(id);
            setItems((prev) => prev.filter((i) => i.id !== id));
        } catch {
            setError("Failed to delete");
        }
    };

    const handleSave = async (data) => {
        if (editing && editing !== "new") {
            const updated = await experienceService.update(editing.id, data);
            setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
        } else {
            const created = await experienceService.create(data);
            setItems((prev) => [...prev, created]);
        }
        setEditing(null);
    };

    if (editing) {
        return <ExperienceForm item={editing === "new" ? null : editing} onSave={handleSave} onCancel={() => setEditing(null)} />;
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-bold text-foreground">Experience</h2>
                <button onClick={() => setEditing("new")} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white text-sm font-medium shadow-glow hover:shadow-glow-accent transition-all">
                    <Plus size={16} /> Add Experience
                </button>
            </div>
            {error && <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-500">{error}</div>}
            {loading ? (
                <div className="space-y-3">{[1, 2].map((i) => <div key={i} className="h-20 rounded-xl bg-muted animate-pulse" />)}</div>
            ) : items.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                    <Briefcase size={40} className="mx-auto mb-3 opacity-30" />
                    <p>No experience entries yet.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {items.map((item) => (
                        <motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between p-4 rounded-xl bg-card border border-border hover:border-primary/30 transition-all">
                            <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-foreground">{item.role}</h3>
                                <p className="text-sm text-primary">{item.organization}</p>
                            </div>
                            <div className="flex items-center gap-1 ml-4">
                                <button onClick={() => setEditing(item)} className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-all"><Pencil size={16} /></button>
                                <button onClick={() => handleDelete(item.id)} className="p-2 rounded-lg text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-all"><Trash2 size={16} /></button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
