import React, { useState } from "react";
import { Search, UserPlus, Edit, Trash2, MoreVertical } from "lucide-react";

export const Users: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const users = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "User", status: "Active", joinDate: "2024-01-15" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Admin", status: "Active", joinDate: "2024-02-20" },
    { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User", status: "Inactive", joinDate: "2024-03-10" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-600 mt-1">Manage all users in the system</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition">
          <UserPlus size={20} />
          Add User
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Join Date</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 font-semibold">{user.name[0]}</span>
                    </div>
                    <span className="font-medium text-gray-900">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">{user.email}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.role === 'Admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {user.role}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-600">{user.joinDate}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button className="p-2 hover:bg-gray-100 rounded-lg transition">
                      <Edit size={16} className="text-gray-600" />
                    </button>
                    <button className="p-2 hover:bg-red-50 rounded-lg transition">
                      <Trash2 size={16} className="text-red-600" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
