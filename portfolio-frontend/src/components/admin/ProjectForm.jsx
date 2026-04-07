import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Save, X } from "lucide-react";
import { projectService } from "../../services/projectService";

const schema = z.object({
    title: z.string().min(3, "Title required"),
    description: z.string().min(10, "Description required"),
    longDescription: z.string().optional(),
    tags: z.string().min(1, "At least one tag required"),
    category: z.enum(["frontend", "fullstack", "backend"]),
    githubUrl: z.string().url("Must be a valid URL").or(z.literal("")),
    demoUrl: z.string().url("Must be a valid URL").or(z.literal("")),
    imageUrl: z.string().optional(),
    featured: z.boolean().optional(),
    order: z.coerce.number().optional(),
});

export default function ProjectForm({ project, onSave, onCancel }) {
    const isEdit = !!project;
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
        resolver: zodResolver(schema),
        defaultValues: {
            title: project?.title || "",
            description: project?.description || "",
            longDescription: project?.longDescription || "",
            tags: project?.tags?.join(", ") || "",
            category: project?.category || "fullstack",
            githubUrl: project?.githubUrl || "",
            demoUrl: project?.demoUrl || "",
            imageUrl: project?.imageUrl || "",
            featured: project?.featured || false,
            order: project?.order || 0,
        },
    });

    const onSubmit = async (data) => {
        const payload = {
            ...data,
            tags: data.tags.split(",").map((t) => t.trim()).filter(Boolean),
        };
        try {
            if (isEdit) {
                await projectService.update(project._id, payload);
            } else {
                await projectService.create(payload);
            }
            reset();
            onSave();
        } catch (err) {
            alert("Error saving project. Check console.");
            console.error(err);
        }
    };

    const inputClass = "w-full px-3 py-2 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 text-sm transition-all";

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-card border border-border rounded-2xl p-6 mb-6"
        >
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-display font-bold text-lg text-foreground">
                    {isEdit ? "Edit Project" : "Add New Project"}
                </h3>
                <button onClick={onCancel} className="p-2 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground">
                    <X size={18} />
                </button>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Title *</label>
                        <input {...register("title")} placeholder="Project Title" className={inputClass} />
                        {errors.title && <p className="mt-1 text-xs text-red-500">{errors.title.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Category *</label>
                        <select {...register("category")} className={inputClass}>
                            <option value="fullstack">Full Stack</option>
                            <option value="frontend">Frontend</option>
                            <option value="backend">Backend</option>
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Description *</label>
                    <textarea {...register("description")} rows={2} placeholder="Short description..." className={`${inputClass} resize-none`} />
                    {errors.description && <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Long Description</label>
                    <textarea {...register("longDescription")} rows={3} placeholder="Detailed description..." className={`${inputClass} resize-none`} />
                </div>

                <div>
                    <label className="block text-sm font-medium text-foreground mb-1">Tags (comma separated) *</label>
                    <input {...register("tags")} placeholder="React, Node.js, MongoDB" className={inputClass} />
                    {errors.tags && <p className="mt-1 text-xs text-red-500">{errors.tags.message}</p>}
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">GitHub URL</label>
                        <input {...register("githubUrl")} placeholder="https://github.com/..." className={inputClass} />
                        {errors.githubUrl && <p className="mt-1 text-xs text-red-500">{errors.githubUrl.message}</p>}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Demo URL</label>
                        <input {...register("demoUrl")} placeholder="https://demo.example.com" className={inputClass} />
                        {errors.demoUrl && <p className="mt-1 text-xs text-red-500">{errors.demoUrl.message}</p>}
                    </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                    <input type="checkbox" id="featured" {...register("featured")} className="w-4 h-4 accent-primary" />
                    <label htmlFor="featured" className="text-sm text-foreground">Mark as Featured</label>
                </div>

                <div className="flex gap-3 pt-2">
                    <button type="submit" disabled={isSubmitting}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl gradient-primary text-white font-semibold shadow-glow text-sm disabled:opacity-60">
                        <Save size={15} />
                        {isSubmitting ? "Saving..." : isEdit ? "Update Project" : "Create Project"}
                    </button>
                    <button type="button" onClick={onCancel}
                        className="px-5 py-2.5 rounded-xl border border-border text-foreground text-sm hover:bg-muted transition-colors">
                        Cancel
                    </button>
                </div>
            </form>
        </motion.div>
    );
}
