import { useState, useEffect } from "react";
import { Card } from "../components/Card";
import { AdminSidebar } from "../components/AdminSidebar";
import axios from "axios";
import { API_BASE_URL } from "../config";
import { useAdmin } from "../hooks/useAdmin";
import { FaEdit } from "react-icons/fa";
import { RoleEdit } from "../components/RoleEdit";
import { Tooltip } from "react-tooltip";

export function AdminDashboard() {
  const { contents} = useAdmin();
  const [filter, setFilter] = useState<string>("Contents");
  const [users, setUsers] = useState<{ username: string; role: string }[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/v1/admin/users`, {
        headers: { Authorization: localStorage.getItem("token") || "" },
      });
      setUsers(response.data.users);
    } catch (err) {
      setError("Failed to fetch users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (filter === "Users") {
      fetchUsers();
    }
  }, [filter]);

  if (loading) {
    return (
      <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
        <h2 className="text-xl font-semibold text-gray-700">Loading...</h2>
      </div>
    );
  }

  const openModal = (username: string) => {
    setSelectedUser(username);
    setModalOpen(true);
  };

  const handleRoleUpdated = () => {
    fetchUsers();
  };

  if (error) {
    return (
      <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
        <h2 className="text-xl font-semibold text-red-600">{error}</h2>
      </div>
    );
  }

  return (
    <div className="p-4 ml-72 min-h-screen bg-gray-100 border-2">
      <AdminSidebar setFilter={setFilter} />
      <div className="p-4">
        {filter === "Contents" ? (
          <>
            <div className="flex justify-between">
              <span className="text-3xl font-bold">All Contents</span>
            </div>
            <div className="flex gap-5 mt-7 flex-wrap">
              {contents.map(({ id, type, link, title, username }) => (
                <Card key={id} type={type} link={link} title={title} username={username} />
              ))}
            </div>
          </>
        ) : (
          <div>
            <h2 className="text-3xl font-bold">All Users</h2>
            <table className="table-auto w-full mt-4 bg-white rounded shadow">
              <thead>
                <tr>
                  <th className="px-4 py-2">Username</th>
                  <th className="px-4 py-2">Role</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map(({ username, role }) => (
                  <tr key={username}>
                    <td className="border px-4 py-2">{username}</td>
                    <td className="border px-4 py-2">{role}</td>
                    <td className="border px-4 py-2 cursor-pointer">
                    <div data-tooltip-id={`edit-role-${username}`} className="relative">
                        <FaEdit onClick={() => openModal(username)} className="cursor-pointer" />
                        <Tooltip 
                            id={`edit-role-${username}`} 
                            content="Edit Role" 
                            place="top"
                        />
                    </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <RoleEdit
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                username={selectedUser}
                onRoleUpdated={handleRoleUpdated}
            />
          </div>
        )}
      </div>
    </div>
  );
}
