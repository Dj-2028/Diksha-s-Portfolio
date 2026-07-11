import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, ArrowLeft, Save, Trophy } from "lucide-react";
import { achievementService } from "../../services/achievementService";

function AchievementForm({ item, onSave, onCancel }) {
    const [form, setForm] = useState({
        title: item?.title || "",
        detail: item?.detail || "",
        link: item?.link || "",
        display_order: item?.display_order || 0,
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
                detail: form.detail.trim() || null,
                link: form.link.trim() || null,
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
                <ArrowLeft size={16} /> Back to Achievements
            </button>
            <h2 className="font-display text-xl font-bold text-foreground mb-6">
                {item ? "Edit Achievement" : "New Achievement"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
                <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Title *</label>
                    <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="2nd Place – IIT Kanpur Hackathon" className={inputClass} />
                </div>
                <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Detail</label>
                    <textarea value={form.detail} onChange={(e) => setForm({ ...form, detail: e.target.value })} rows={3} placeholder="Brief description..." className={`${inputClass} resize-none`} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Link (optional)</label>
                        <input value={form.link} onChange={(e) => setForm({ ...form, link: e.target.value })} placeholder="https://..." className={inputClass} />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1.5">Display Order</label>
                        <input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: e.target.value })} className={inputClass} />
                    </div>
                </div>
                {error && <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-500">{error}</div>}
                <button type="submit" disabled={saving} className="flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-white font-semibold shadow-glow hover:shadow-glow-accent transition-all disabled:opacity-60">
                    <Save size={16} /> {saving ? "Saving..." : "Save Achievement"}
                </button>
            </form>
        </div>
    );
}

export default function AchievementManager() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [error, setError] = useState("");

    const fetchItems = async () => {
        try {
            const data = await achievementService.getAll();
            setItems(data || []);
        } catch {
            setError("Failed to load achievements");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchItems(); }, []);

    const handleDelete = async (id) => {
        if (!confirm("Delete this achievement?")) return;
        try {
            await achievementService.delete(id);
            setItems((prev) => prev.filter((i) => i.id !== id));
        } catch {
            setError("Failed to delete");
        }
    };

    const handleSave = async (data) => {
        if (editing && editing !== "new") {
            const updated = await achievementService.update(editing.id, data);
            setItems((prev) => prev.map((i) => (i.id === updated.id ? updated : i)));
        } else {
            const created = await achievementService.create(data);
            setItems((prev) => [...prev, created]);
        }
        setEditing(null);
    };

    if (editing) {
        return <AchievementForm item={editing === "new" ? null : editing} onSave={handleSave} onCancel={() => setEditing(null)} />;
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-bold text-foreground">Achievements</h2>
                <button onClick={() => setEditing("new")} className="flex items-center gap-2 px-4 py-2 rounded-xl gradient-primary text-white text-sm font-medium shadow-glow hover:shadow-glow-accent transition-all">
                    <Plus size={16} /> Add Achievement
                </button>
            </div>
            {error && <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-500">{error}</div>}
            {loading ? (
                <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />)}</div>
            ) : items.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                    <Trophy size={40} className="mx-auto mb-3 opacity-30" />
                    <p>No achievements yet.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {items.map((item) => (
                        <motion.div key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between p-4 rounded-xl bg-card border border-border hover:border-accent/30 transition-all">
                            <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-foreground">{item.title}</h3>
                                {item.detail && <p className="text-sm text-muted-foreground truncate">{item.detail}</p>}
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
