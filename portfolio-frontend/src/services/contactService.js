import api from "../lib/axios";

export const contactService = {
    submit: (data) => api.post("/contact", data),
    getAll: () => api.get("/contact"),
    markRead: (id) => api.patch(`/contact/${id}/read`),
};
