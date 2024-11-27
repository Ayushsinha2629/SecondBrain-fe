import { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config";

export function RoleEdit({ isOpen, onClose, username, onRoleUpdated }: any) {
  const [role, setRole] = useState<string>("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/api/v1/admin/users/update-role`,
        { username, role },
        {
          headers: { Authorization: localStorage.getItem("token") || "" },
        }
      );
      alert(response.data.message);
      onRoleUpdated();
      onClose();
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Edit Role for {username}</h2>
        {error && <p className="text-red-600 mb-3">{error}</p>}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">New Role:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
            <option value="user">User</option>
          </select>
        </div>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </div>
    </div>
  );
}
