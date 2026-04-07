import api from "../lib/axios";

export const projectService = {
    getAll: (category) => api.get("/projects", { params: category && category !== "all" ? { category } : {} }),
    getById: (id) => api.get(`/projects/${id}`),
    create: (data) => api.post("/projects", data),
    update: (id, data) => api.put(`/projects/${id}`, data),
    delete: (id) => api.delete(`/projects/${id}`),
    toggleFeatured: (id) => api.patch(`/projects/${id}/feature`),
};
