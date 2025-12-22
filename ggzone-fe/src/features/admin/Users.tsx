import React, { useState, useEffect } from "react";
import { Search, UserPlus, Edit, Loader, Ban, CheckCircle } from "lucide-react";
import { adminService } from "@/services/api/adminService";
import { ConfirmDialog } from "@/components/Dialog";

interface User {
  id: string;
  username: string;
  email: string;
  fullName?: string;
  avatarUrl?: string;
  status: string;
  level: number;
  createdAt: string;
  isBanned: boolean;
  role: string;
}

interface Toast {
  message: string;
  type: 'success' | 'error';
}

export const Users: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(20);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [toast, setToast] = useState<Toast | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [bannedFilter, setBannedFilter] = useState<string>("all");
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    role: "user",
  });
  const [editUser, setEditUser] = useState({
    email: "",
    fullName: "",
    role: "user",
  });
  const [showBanDialog, setShowBanDialog] = useState(false);
  const [userToBan, setUserToBan] = useState<User | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    loadUsers();
  }, [currentPage, searchTerm, statusFilter, bannedFilter]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await adminService.getUsers(searchTerm || undefined, currentPage, pageSize);
      
      if (response.success && response.data) {
        console.log('Users data:', response.data); // Debug: check if role is in response
        setUsers(response.data);
      }
    } catch (error) {
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleAddUser = async () => {
    if (!newUser.username || !newUser.email || !newUser.password) {
      showToast('Please fill in all required fields', 'error');
      return;
    }

    if (newUser.password !== newUser.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    try {
      const response = await fetch(`${(import.meta as any).env?.VITE_API_URL || ''}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: newUser.username,
          email: newUser.email,
          password: newUser.password,
          fullName: newUser.fullName || undefined,
          role: newUser.role,
        }),
      });

      const text = await response.text();
      let result;
      
      try {
        result = text ? JSON.parse(text) : {};
      } catch {
        result = { message: text };
      }

      if (response.ok) {
        showToast('User created successfully', 'success');
        setShowAddModal(false);
        setNewUser({ username: "", email: "", password: "", confirmPassword: "", fullName: "", role: "user" });
        await loadUsers(); // Reload users list
      } else {
        showToast(result.message || result.title || 'Failed to create user', 'error');
      }
    } catch (error) {
      console.error('Error creating user:', error);
      showToast('An error occurred while creating user', 'error');
    }
  };

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setEditUser({
      email: user.email,
      fullName: user.fullName || "",
      role: user.role || "user",
    });
    setShowEditModal(true);
  };

  const handleUpdateUser = async () => {
    if (!selectedUser || !editUser.email) {
      showToast('Email is required', 'error');
      return;
    }

    const updateData = {
      email: editUser.email,
      fullName: editUser.fullName || undefined,
      role: editUser.role.toLowerCase(), // Ensure lowercase
    };

    console.log('Updating user with data:', {
      userId: selectedUser.id,
      ...updateData,
    });

    try {
      const response = await adminService.updateUser(selectedUser.id, updateData);

      console.log('Update response:', response);

      if (response.success) {
        showToast('User updated successfully', 'success');
        setShowEditModal(false);
        setSelectedUser(null);
        await loadUsers();
      } else {
        showToast(response.message || 'Failed to update user', 'error');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      showToast('An error occurred while updating user', 'error');
    }
  };

  const handleBanClick = (user: User) => {
    setUserToBan(user);
    setShowBanDialog(true);
  };

  const handleBanConfirm = async () => {
    if (!userToBan) return;

    try {
      // Get current user ID from localStorage
      const userStr = localStorage.getItem('ggzone_user');
      if (!userStr) {
        showToast('Please login again', 'error');
        return;
      }

      const currentUser = JSON.parse(userStr);
      const adminId = currentUser.id;

      if (!adminId) {
        showToast('Admin ID not found', 'error');
        return;
      }

      let response;
      if (userToBan.isBanned) {
        response = await adminService.unbanUser(userToBan.id);
      } else {
        response = await adminService.banUser(userToBan.id, 'Banned by admin', adminId);
      }

      if (response.success) {
        showToast(response.message || 'Status updated successfully', 'success');
        setShowBanDialog(false);
        setUserToBan(null);
        await loadUsers();
      } else {
        showToast(response.message || 'Failed to update status', 'error');
      }
    } catch (error) {
      console.error('Error toggling ban status:', error);
      showToast('An error occurred while updating status', 'error');
    }
  };

  const handleBanCancel = () => {
    setShowBanDialog(false);
    setUserToBan(null);
  };

  // Filter users based on status and banned filters
  const filteredUsers = users.filter(user => {
    const statusMatch = statusFilter === "all" || user.status === statusFilter;
    const bannedMatch = bannedFilter === "all" || 
                       (bannedFilter === "banned" && user.isBanned) ||
                       (bannedFilter === "active" && !user.isBanned);
    return statusMatch && bannedMatch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-600 mt-1">Manage all users in the system</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition"
        >
          <UserPlus size={20} />
          Add User
        </button>
      </div>

      {/* Search & Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search users by username or email..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
            />
          </div>
          
          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 bg-white"
            >
              <option value="all">All Status</option>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
              <option value="away">Away</option>
            </select>

            <select
              value={bannedFilter}
              onChange={(e) => {
                setBannedFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 bg-white"
            >
              <option value="all">All Users</option>
              <option value="active">Active Only</option>
              <option value="banned">Banned Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <Loader className="animate-spin text-orange-600" size={40} />
        </div>
      )}

      {/* Users Table */}
      {!loading && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {filteredUsers.length > 0 ? (
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
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center overflow-hidden">
                          {user.avatarUrl ? (
                            <img 
                              src={user.avatarUrl} 
                              alt={user.username}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-orange-600 font-semibold">{user.username[0].toUpperCase()}</span>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.username}</p>
                          {user.fullName && (
                            <p className="text-xs text-gray-500">{user.fullName}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 
                        user.role === 'moderator' ? 'bg-blue-100 text-blue-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          user.status === 'online' ? 'bg-green-100 text-green-700' : 
                          user.status === 'offline' ? 'bg-gray-100 text-gray-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {user.status}
                        </span>
                        {user.isBanned && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                            Banned
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {user.isBanned ? (
                          <button 
                            onClick={() => handleBanClick(user)}
                            className="p-2 hover:bg-green-50 rounded-lg transition"
                            title="Unban user"
                          >
                            <CheckCircle size={16} className="text-green-600" />
                          </button>
                        ) : (
                          <button 
                            onClick={() => handleBanClick(user)}
                            className="p-2 hover:bg-red-50 rounded-lg transition"
                            title="Ban user"
                          >
                            <Ban size={16} className="text-red-600" />
                          </button>
                        )}
                        <button 
                          onClick={() => handleEditClick(user)}
                          className="p-2 hover:bg-gray-100 rounded-lg transition" 
                          title="Edit user"
                        >
                          <Edit size={16} className="text-gray-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500">
                {users.length === 0 ? 'No users found' : 'No users match the selected filters'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Pagination */}
      {!loading && filteredUsers.length > 0 && (
        <div className="flex items-center justify-between bg-white rounded-xl border border-gray-200 p-4">
          <div className="text-sm text-gray-600">
            Showing page {currentPage}
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Previous
            </button>
            <button
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={users.length < pageSize}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Confirm Ban/Unban Dialog */}
      <ConfirmDialog
        isOpen={showBanDialog}
        title={userToBan?.isBanned ? "Unban User" : "Ban User"}
        message={
          userToBan?.isBanned
            ? `Are you sure you want to unban ${userToBan?.username}? They will be able to access the platform again.`
            : `Are you sure you want to ban ${userToBan?.username}? They will not be able to access the platform.`
        }
        confirmText={userToBan?.isBanned ? "Unban" : "Ban"}
        cancelText="Cancel"
        variant={userToBan?.isBanned ? "info" : "danger"}
        onConfirm={handleBanConfirm}
        onCancel={handleBanCancel}
      />

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 animate-slide-up ${
          toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {toast.type === 'success' ? (
            <CheckCircle size={20} />
          ) : (
            <Ban size={20} />
          )}
          <span className="font-medium">{toast.message}</span>
        </div>
      )}

      {/* Edit User Modal */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Edit User</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={selectedUser.username}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
                />
                <p className="text-xs text-gray-500 mt-1">Username cannot be changed</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={editUser.email}
                  onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={editUser.fullName}
                  onChange={(e) => setEditUser({ ...editUser, fullName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  placeholder="Enter full name (optional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role <span className="text-red-500">*</span>
                </label>
                <select
                  value={editUser.role}
                  onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 bg-white"
                >
                  <option value="user">User</option>
                  <option value="moderator">Moderator</option>
                  <option value="admin">Admin</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {editUser.role === 'admin' && 'Full access to all features'}
                  {editUser.role === 'moderator' && 'Can moderate content and users'}
                  {editUser.role === 'user' && 'Standard user access'}
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowEditModal(false);
                  setSelectedUser(null);
                  setEditUser({ email: "", fullName: "", role: "user" });
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateUser}
                disabled={!editUser.email}
                className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Update User
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Add New User</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  placeholder="Enter username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  placeholder="Enter password"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  value={newUser.confirmPassword}
                  onChange={(e) => setNewUser({ ...newUser, confirmPassword: e.target.value })}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
                    newUser.confirmPassword && newUser.password !== newUser.confirmPassword
                      ? 'border-red-500 focus:border-red-500'
                      : 'border-gray-300 focus:border-orange-500'
                  }`}
                  placeholder="Confirm password"
                />
                {newUser.confirmPassword && newUser.password !== newUser.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1">Passwords do not match</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={newUser.fullName}
                  onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
                  placeholder="Enter full name (optional)"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role <span className="text-red-500">*</span>
                </label>
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500 bg-white"
                >
                  <option value="user">User</option>
                  <option value="moderator">Moderator</option>
                  <option value="admin">Admin</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  {newUser.role === 'admin' && 'Full access to all features'}
                  {newUser.role === 'moderator' && 'Can moderate content and users'}
                  {newUser.role === 'user' && 'Standard user access'}
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setNewUser({ username: "", email: "", password: "", confirmPassword: "", fullName: "", role: "user" });
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddUser}
                disabled={newUser.password !== newUser.confirmPassword || !newUser.password}
                className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create User
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
