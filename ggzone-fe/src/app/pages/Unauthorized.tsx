import React from "react";
import { useNavigate } from "react-router-dom";
import { ShieldAlert, Home } from "lucide-react";

export const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <ShieldAlert size={40} className="text-red-600" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Truy cập bị từ chối
        </h1>
        
        <p className="text-gray-600 mb-8">
          Bạn không có quyền truy cập vào trang này. Chỉ quản trị viên mới có thể truy cập khu vực này.
        </p>
        
        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center justify-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition font-medium"
        >
          <Home size={20} />
          Quay về trang chủ
        </button>
      </div>
    </div>
  );
};
