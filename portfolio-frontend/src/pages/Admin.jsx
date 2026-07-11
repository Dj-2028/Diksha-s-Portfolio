import { useState } from "react";
import AdminLayout from "../components/admin/AdminLayout";
import ProjectList from "../components/admin/ProjectList";
import ContactSubmissions from "../components/admin/ContactSubmissions";
import ExperienceManager from "../components/admin/ExperienceManager";
import AchievementManager from "../components/admin/AchievementManager";

export default function Admin() {
    const [activeTab, setActiveTab] = useState("projects");

    const renderContent = () => {
        switch (activeTab) {
            case "projects":
                return <ProjectList />;
            case "experience":
                return <ExperienceManager />;
            case "achievements":
                return <AchievementManager />;
            case "contacts":
                return <ContactSubmissions />;
            default:
                return <ProjectList />;
        }
    };

    return (
        <AdminLayout activeTab={activeTab} setActiveTab={setActiveTab}>
            {renderContent()}
        </AdminLayout>
    );
}
