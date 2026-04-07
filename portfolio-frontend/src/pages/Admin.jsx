import { useState } from "react";
import AdminLayout from "../components/admin/AdminLayout";
import ProjectList from "../components/admin/ProjectList";
import ContactSubmissions from "../components/admin/ContactSubmissions";

export default function Admin() {
    const [activeTab, setActiveTab] = useState("projects");

    return (
        <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
            {activeTab === "projects" ? <ProjectList /> : <ContactSubmissions />}
        </AdminLayout>
    );
}
