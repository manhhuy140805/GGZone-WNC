import React, { useState, useEffect } from "react";
import { Search, Trash2, Loader, Ban, CheckCircle, Users as UsersIcon } from "lucide-react";
import { adminService } from "@/services/api/adminService";
import { ConfirmDialog } from "@/components/Dialog";
import { getImageUrl } from "@/lib/utils/imageUtils";

interface Group {
  id: string;
  name: string;
  description: string;
  coverImageUrl?: string;
  iconUrl?: string;
  visibility: string;
  membersCount: number;
  createdAt: string;
  creator: {
    id: string;
    username: string;
    avatarUrl?: string;
  };
}

interface Toast {
  message: string;
  type: 'success' | 'error';
}

export const Groups: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<Toast | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [groupToDelete, setGroupToDelete] = useState<string | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    loadGroups();
  }, []);

  const loadGroups = async () => {
    try {
      setLoading(true);
      const response = await adminService.getGroups();

      if (response.success && response.data) {
        setGroups(response.data);
      }
    } catch (error) {
      console.error('Error loading groups:', error);
      showToast('Failed to load groups', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (groupId: string) => {
    setGroupToDelete(groupId);
    setShowDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    if (!groupToDelete) return;

    try {
      const response = await adminService.deleteGroup(groupToDelete);

      if (response.success) {
        showToast('Group deleted successfully', 'success');
        setShowDeleteDialog(false);
        setGroupToDelete(null);
        await loadGroups();
      } else {
        showToast(response.message || 'Failed to delete group', 'error');
        setShowDeleteDialog(false);
        setGroupToDelete(null);
        // Refresh the list to ensure UI is in sync
        await loadGroups();
      }
    } catch (error) {
      console.error('Error deleting group:', error);
      showToast('An error occurred while deleting group', 'error');
      setShowDeleteDialog(false);
      setGroupToDelete(null);
      // Refresh the list to ensure UI is in sync
      await loadGroups();
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteDialog(false);
    setGroupToDelete(null);
  };

  // Filter groups by search term
  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    group.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Groups Management</h1>
          <p className="text-gray-600 mt-1">Manage all groups in the system</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="relative">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search groups by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-orange-500"
          />
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="flex justify-center items-center py-12">
          <Loader className="animate-spin text-orange-600" size={40} />
        </div>
      )}

      {/* Groups Table */}
      {!loading && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {filteredGroups.length > 0 ? (
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Group</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Creator</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Members</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Visibility</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredGroups.map((group) => (
                  <tr key={group.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          {getImageUrl(group.iconUrl) ? (
                            <img 
                              src={getImageUrl(group.iconUrl)!} 
                              alt={group.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                const parent = e.currentTarget.parentElement;
                                if (parent) {
                                  parent.innerHTML = `
                                    <div class="w-full h-full flex items-center justify-center">
                                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-gray-400">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                                        <circle cx="9" cy="7" r="4"></circle>
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                      </svg>
                                    </div>
                                  `;
                                }
                              }}
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <UsersIcon size={24} className="text-gray-400" />
                            </div>
                          )}
                        </div>
                        <div className="max-w-md">
                          <p className="font-medium text-gray-900">{group.name}</p>
                          <p className="text-sm text-gray-500 line-clamp-1">{group.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center overflow-hidden">
                          {getImageUrl(group.creator.avatarUrl) ? (
                            <img 
                              src={getImageUrl(group.creator.avatarUrl)!} 
                              alt="" 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                                const parent = e.currentTarget.parentElement;
                                if (parent) {
                                  parent.innerHTML = `
                                    <span class="text-orange-600 text-xs font-semibold">
                                      ${group.creator.username[0].toUpperCase()}
                                    </span>
                                  `;
                                }
                              }}
                            />
                          ) : (
                            <span className="text-orange-600 text-xs font-semibold">
                              {group.creator.username[0].toUpperCase()}
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-gray-600">{group.creator.username}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-gray-600">
                        <UsersIcon size={16} />
                        <span className="font-medium">{group.membersCount}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${
                        group.visibility === 'public' ? 'bg-green-100 text-green-700' :
                        group.visibility === 'private' ? 'bg-red-100 text-red-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {group.visibility}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600 text-sm">
                      {new Date(group.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleDeleteClick(group.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition"
                          title="Delete group"
                        >
                          <Trash2 size={16} className="text-red-600" />
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
                {groups.length === 0 ? 'No groups found' : 'No groups match your search'}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Delete Group"
        message="Are you sure you want to delete this group? This action cannot be undone and will remove all members and posts."
        confirmText="Delete"
        cancelText="Cancel"
        variant="danger"
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-lg shadow-lg flex items-center gap-3 transition-opacity duration-200 ${
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
    </div>
  );
};
