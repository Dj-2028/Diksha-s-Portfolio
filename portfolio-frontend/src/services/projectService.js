import { supabase } from "../lib/supabase";

export const projectService = {
    getAll: async (category) => {
        let query = supabase
            .from("projects")
            .select("*")
            .order("display_order", { ascending: true });

        if (category && category !== "all") {
            query = query.eq("category", category);
        }

        const { data, error } = await query;
        if (error) throw error;
        return data;
    },

    getById: async (id) => {
        const { data, error } = await supabase
            .from("projects")
            .select("*")
            .eq("id", id)
            .single();
        if (error) throw error;
        return data;
    },

    create: async (project) => {
        const { data, error } = await supabase
            .from("projects")
            .insert(project)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    update: async (id, project) => {
        const { data, error } = await supabase
            .from("projects")
            .update(project)
            .eq("id", id)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    delete: async (id) => {
        const { error } = await supabase
            .from("projects")
            .delete()
            .eq("id", id);
        if (error) throw error;
    },

    toggleFeatured: async (id, currentValue) => {
        const { data, error } = await supabase
            .from("projects")
            .update({ featured: !currentValue })
            .eq("id", id)
            .select()
            .single();
        if (error) throw error;
        return data;
    },
};
