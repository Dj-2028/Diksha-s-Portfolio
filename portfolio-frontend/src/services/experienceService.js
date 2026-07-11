import { supabase } from "../lib/supabase";

export const experienceService = {
    getAll: async () => {
        const { data, error } = await supabase
            .from("experience")
            .select("*")
            .order("display_order", { ascending: true });
        if (error) throw error;
        return data;
    },

    create: async (item) => {
        const { data, error } = await supabase
            .from("experience")
            .insert(item)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    update: async (id, item) => {
        const { data, error } = await supabase
            .from("experience")
            .update(item)
            .eq("id", id)
            .select()
            .single();
        if (error) throw error;
        return data;
    },

    delete: async (id) => {
        const { error } = await supabase
            .from("experience")
            .delete()
            .eq("id", id);
        if (error) throw error;
    },
};
