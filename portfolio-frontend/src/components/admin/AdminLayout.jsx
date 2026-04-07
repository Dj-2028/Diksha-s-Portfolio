import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LogOut, LayoutDashboard, FolderGit2, Mail } from "lucide-react";
import ThemeToggle from "../common/ThemeToggle";
import { cn } from "../../lib/utils";

export default function AdminLayout({ children, activeTab, setActiveTab }) {
    const { admin, logout } = useAuth();

    if (!admin) return <Navigate to="/admin/login" />;

    const tabs = [
        { id: "projects", label: "Projects", Icon: FolderGit2 },
        { id: "contacts", label: "Contacts", Icon: Mail },
    ];

    return (
        <div className="min-h-screen bg-background flex flex-col">
            {/* Header */}
            <header className="sticky top-0 z-40 border-b border-border bg-card/80 backdrop-blur-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <LayoutDashboard size={20} className="text-primary" />
                        <span className="font-display font-bold text-foreground">Admin Panel</span>
                        <span className="hidden sm:inline text-sm text-muted-foreground">· {admin?.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <ThemeToggle />
                        <button
                            onClick={logout}
                            className="flex items-center gap-2 px-3 py-2 text-sm rounded-xl border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
                        >
                            <LogOut size={15} /> Logout
                        </button>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 gap-8">
                {/* Sidebar */}
                <aside className="w-48 flex-shrink-0">
                    <nav className="space-y-1">
                        {tabs.map(({ id, label, Icon }) => (
                            <button
                                key={id}
                                onClick={() => setActiveTab(id)}
                                className={cn(
                                    "w-full flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-medium transition-all",
                                    activeTab === id
                                        ? "gradient-primary text-white shadow-glow"
                                        : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                )}
                            >
                                <Icon size={16} />
                                {label}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Main content */}
                <main className="flex-1 min-w-0">{children}</main>
            </div>
        </div>
    );
}
