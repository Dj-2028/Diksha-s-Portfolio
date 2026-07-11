import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, MailOpen, Clock } from "lucide-react";
import { contactService } from "../../services/contactService";

export default function ContactSubmissions() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        contactService
            .getAll()
            .then((data) => setContacts(data || []))
            .catch(() => setError("Failed to load contacts"))
            .finally(() => setLoading(false));
    }, []);

    const handleMarkRead = async (id) => {
        try {
            await contactService.markRead(id);
            setContacts((prev) =>
                prev.map((c) => (c.id === id ? { ...c, read: true } : c))
            );
        } catch {
            setError("Failed to mark as read");
        }
    };

    const unreadCount = contacts.filter((c) => !c.read).length;

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <h2 className="font-display text-xl font-bold text-foreground">Contact Submissions</h2>
                    {unreadCount > 0 && (
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/20 text-accent border border-accent/30">
                            {unreadCount} new
                        </span>
                    )}
                </div>
            </div>

            {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-sm text-red-500">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />
                    ))}
                </div>
            ) : contacts.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                    <Mail size={40} className="mx-auto mb-3 opacity-30" />
                    <p>No contact submissions yet.</p>
                </div>
            ) : (
                <div className="space-y-3">
                    {contacts.map((contact) => (
                        <motion.div
                            key={contact.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className={`p-4 rounded-xl border transition-all ${
                                contact.read
                                    ? "bg-card border-border"
                                    : "bg-primary/5 border-primary/20"
                            }`}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="font-medium text-foreground">{contact.name}</span>
                                        <span className="text-sm text-muted-foreground">{contact.email}</span>
                                        {!contact.read && (
                                            <span className="w-2 h-2 rounded-full bg-accent" />
                                        )}
                                    </div>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {contact.message}
                                    </p>
                                    <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                                        <Clock size={12} />
                                        {new Date(contact.created_at).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric",
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </div>
                                </div>
                                {!contact.read && (
                                    <button
                                        onClick={() => handleMarkRead(contact.id)}
                                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-primary border border-primary/30 hover:bg-primary hover:text-white transition-all"
                                    >
                                        <MailOpen size={14} /> Mark Read
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
}
