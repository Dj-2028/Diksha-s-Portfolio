import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, MailOpen, Clock } from "lucide-react";
import { contactService } from "../../services/contactService";

export default function ContactSubmissions() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    const load = async () => {
        setLoading(true);
        try {
            const res = await contactService.getAll();
            setContacts(res.data.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const markRead = async (id) => {
        await contactService.markRead(id);
        setContacts((prev) => prev.map((c) => c._id === id ? { ...c, read: true } : c));
    };

    const unread = contacts.filter((c) => !c.read).length;

    return (
        <div>
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <h2 className="font-display font-bold text-xl text-foreground">Contact Submissions</h2>
                    {unread > 0 && (
                        <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-primary text-white">{unread} new</span>
                    )}
                </div>
            </div>

            {loading ? (
                <div className="space-y-3">
                    {[...Array(3)].map((_, i) => <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />)}
                </div>
            ) : contacts.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground border border-dashed border-border rounded-2xl">
                    No contact submissions yet.
                </div>
            ) : (
                <div className="space-y-3">
                    {contacts.map((contact) => (
                        <motion.div
                            key={contact._id}
                            layout
                            className={`p-5 rounded-xl border transition-all hover:border-primary/30 ${
                                contact.read ? "bg-card border-border" : "bg-primary/5 border-primary/20"
                            }`}
                        >
                            <div className="flex items-start justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        {contact.read
                                            ? <MailOpen size={14} className="text-muted-foreground flex-shrink-0" />
                                            : <Mail size={14} className="text-primary flex-shrink-0" />}
                                        <span className="font-semibold text-sm text-foreground">{contact.name}</span>
                                        <span className="text-sm text-muted-foreground">·</span>
                                        <span className="text-sm text-muted-foreground truncate">{contact.email}</span>
                                    </div>
                                    <p className="text-sm font-medium text-foreground mb-1">{contact.subject}</p>
                                    <p className="text-sm text-muted-foreground line-clamp-2">{contact.message}</p>
                                    <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                                        <Clock size={11} />
                                        {new Date(contact.createdAt).toLocaleDateString("en-IN", {
                                            day: "numeric", month: "short", year: "numeric",
                                            hour: "2-digit", minute: "2-digit",
                                        })}
                                    </div>
                                </div>
                                {!contact.read && (
                                    <button
                                        onClick={() => markRead(contact._id)}
                                        className="px-3 py-1.5 rounded-lg text-xs font-medium border border-border hover:bg-muted text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
                                    >
                                        Mark read
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
