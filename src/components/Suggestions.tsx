import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

interface SuggestionModalProps {
    contentId: string;
    isOpen: boolean;
    onClose: () => void;
    onSuggestionAdded: () => void;
}

export function Suggestions({ contentId, isOpen, onClose, onSuggestionAdded }: SuggestionModalProps) {
    const [suggestion, setSuggestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async () => {
        if (!suggestion.trim()) {
            setError("Suggestion cannot be empty.");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Authorization token is missing.");
            }
        
            await axios.post(
                `${API_BASE_URL}/api/v1/moderator/content/suggest`,
                {
                    contentId,
                    suggestion,
                },
                {
                    headers: {
                        Authorization: token,
                    },
                }
            );
            setSuggestion("");
            onSuggestionAdded();
            onClose();
        } catch (err) {
            console.error("Error submitting suggestion:", err); // Debugging
            setError("Failed to submit suggestion.");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-md shadow-md w-96">
                <h2 className="text-lg font-semibold mb-4">Suggest an Edit</h2>
                {error && <p className="text-red-500 mb-2">{error}</p>}
                <textarea
                    className="w-full p-2 border rounded-md"
                    rows={4}
                    value={suggestion}
                    onChange={(e) => setSuggestion(e.target.value)}
                    placeholder="Enter your suggestion here..."
                />
                <div className="flex justify-end mt-4">
                    <button
                        className="px-4 py-2 mr-2 bg-gray-200 rounded-md"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancel
                    </button>
                    <button
                        className="px-4 py-2 bg-blue-500 text-white rounded-md"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}
