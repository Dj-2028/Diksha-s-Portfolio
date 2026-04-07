import { createContext, useContext, useState, useEffect } from "react";
import api from "../lib/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("portfolio_token");
        if (token) {
            api.get("/auth/me")
                .then((res) => setAdmin(res.data.data))
                .catch(() => localStorage.removeItem("portfolio_token"))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    const login = async (email, password) => {
        const res = await api.post("/auth/login", { email, password });
        localStorage.setItem("portfolio_token", res.data.token);
        setAdmin(res.data.admin);
        return res.data;
    };

    const logout = () => {
        localStorage.removeItem("portfolio_token");
        setAdmin(null);
    };

    return (
        <AuthContext.Provider value={{ admin, login, logout, loading, isAuthenticated: !!admin }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within AuthProvider");
    return context;
};
