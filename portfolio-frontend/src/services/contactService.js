import { supabase } from "../lib/supabase";

export const contactService = {
    submit: async (data) => {
        const { error } = await supabase.from("contacts").insert({
            name: data.name,
            email: data.email,
            message: data.message,
        });
        if (error) throw error;
    },

    getAll: async () => {
        const { data, error } = await supabase
            .from("contacts")
            .select("*")
            .order("created_at", { ascending: false });
        if (error) throw error;
        return data;
    },

    markRead: async (id) => {
        const { error } = await supabase
            .from("contacts")
            .update({ read: true })
            .eq("id", id);
        if (error) throw error;
    },
};
