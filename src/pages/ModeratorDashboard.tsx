import { useState } from "react";
import { Card } from "../components/Card";
import { Suggestions } from "../components/Suggestions";
import { useAdmin } from "../hooks/useAdmin";
import { ModeratorSidebar } from "../components/ModeratorSidebar";

export function ModeratorDashboard() {
    const { contents } = useAdmin();
    const [filter, setFilter] = useState<string>("Contents");
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedContentId, setSelectedContentId] = useState<string | null>(null);

    const openSuggestionModal = (contentId: string) => {
        setSelectedContentId(contentId);
        setModalOpen(true);
    };

    const closeSuggestionModal = () => {
        setModalOpen(false);
        setSelectedContentId(null);
    };

    return (
        <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
            <ModeratorSidebar setFilter={setFilter} />
            <div className="p-4">
                <div className="flex justify-between">
                    <span className="text-3xl font-bold">All Contents</span>
                </div>
                <div className="flex gap-5 mt-7 flex-wrap">
                {contents
                        .filter(({ type }) => !filter || filter === "Contents" || type === filter)
                        .map(({ id, type, link, title, username, suggestions }) => (
                        <div key={id}>
                           <Card type={type} link={link} title={title} username={username} suggestions={suggestions} />
                            <button
                                className="text-blue-500 underline text-sm mt-2"
                                onClick={() => openSuggestionModal(id)}
                            >
                                Suggest an Edit
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <Suggestions
                isOpen={isModalOpen}
                contentId={selectedContentId || ""}
                onClose={closeSuggestionModal}
                onSuggestionAdded={() => window.location.reload()}
            />
        </div>
    );
}
