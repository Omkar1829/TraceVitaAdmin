import React, { useState } from "react";
import { MdSupervisorAccount, MdPerson, MdManageAccounts } from "react-icons/md";

const mockUsers = [
  {
    id: 1,
    name: "Omkar K",
    email: "omkar@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane@tracevita.com",
    role: "Manager",
    status: "Active",
  },
  {
    id: 3,
    name: "Bob Smith",
    email: "bob@tracevita.com",
    role: "Viewer",
    status: "Inactive",
  },
];

const ProfileOverview = () => {
  const [users, setUsers] = useState(mockUsers);

  const handleRoleChange = (id, newRole) => {
    setUsers((prev) =>
      prev.map((user) => (user.id === id ? { ...user, role: newRole } : user))
    );
  };

  return (
    <div className="p-6 space-y-8 w-full">
      <h1 className="text-2xl font-bold text-deepIndigo flex items-center gap-2">
        <MdSupervisorAccount className="text-vitalGreen" /> Admin User & Role Management
      </h1>

      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold text-gray-700 mb-4">Users & Roles</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Role</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value)}
                      className="border rounded-md px-2 py-1 text-sm"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Manager">Manager</option>
                      <option value="Viewer">Viewer</option>
                    </select>
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-semibold ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button className="text-blue-600 hover:underline flex items-center gap-1">
                      <MdManageAccounts />
                      Manage
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 py-4">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
