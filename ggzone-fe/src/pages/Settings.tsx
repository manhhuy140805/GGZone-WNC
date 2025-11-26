import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { EditProfileModal } from '../components/profile/EditProfileModal';
import { ChangePasswordModal } from '../components/profile/ChangePasswordModal';
import { User } from '../types';

export const Settings: React.FC = () => {
  const { user, setUser } = useAuth();
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(user || null);

  const handleEditProfileSuccess = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    if (setUser) {
      setUser(updatedUser);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      {/* Modals */}
      <EditProfileModal
        user={currentUser}
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        onSuccess={handleEditProfileSuccess}
      />

      <ChangePasswordModal
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      />

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Cài đặt</h1>
        <p className="text-gray-600 mt-2">Quản lý thông tin tài khoản của bạn</p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Thông tin hồ sơ</h2>
              <p className="text-gray-600 text-sm mt-1">
                Cập nhật tên, tiểu sử, địa điểm và ảnh đại diện
              </p>
            </div>
            <button
              onClick={() => setIsEditProfileOpen(true)}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors"
            >
              Chỉnh sửa
            </button>
          </div>

          {/* Current Info */}
          <div className="mt-6 space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Tên:</span>
              <span className="text-gray-900 font-medium">{currentUser?.fullName || 'Chưa cập nhật'}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Tên người dùng:</span>
              <span className="text-gray-900 font-medium">@{currentUser?.username}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="text-gray-900 font-medium">{currentUser?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Địa điểm:</span>
              <span className="text-gray-900 font-medium">{currentUser?.location || 'Chưa cập nhật'}</span>
            </div>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Bảo mật</h2>
              <p className="text-gray-600 text-sm mt-1">
                Đổi mật khẩu để bảo vệ tài khoản của bạn
              </p>
            </div>
            <button
              onClick={() => setIsChangePasswordOpen(true)}
              className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-lg transition-colors"
            >
              Đổi mật khẩu
            </button>
          </div>

          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              💡 Mẹo: Sử dụng mật khẩu mạnh với ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt.
            </p>
          </div>
        </div>

        {/* Account Status */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Trạng thái tài khoản</h2>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Trạng thái:</span>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full capitalize">
                {currentUser?.status || 'offline'}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Vai trò:</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full capitalize">
                {currentUser?.role || 'user'}
              </span>
            </div>

            {currentUser?.isVerified && (
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Xác minh:</span>
                <span className="px-3 py-1 bg-purple-100 text-purple-800 text-sm font-medium rounded-full flex items-center gap-1">
                  ✓ Đã xác minh
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
