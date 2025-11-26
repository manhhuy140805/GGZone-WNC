import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';
import './AdminStyles.css';

type TabType = 'dashboard' | 'users' | 'notifications' | 'settings' | 'analytics' | 'reports' | 'content' | 'security';

interface Stats {
  totalUsers: number;
  activeUsers: number;
  totalPosts: number;
  totalNotifications: number;
  revenue: number;
  newUsersToday: number;
  activeNow: number;
  totalGames: number;
}

const AdminPanel: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [stats, setStats] = useState<Stats>({
    totalUsers: 1250,
    activeUsers: 856,
    totalPosts: 3420,
    totalNotifications: 45,
    revenue: 125000,
    newUsersToday: 24,
    activeNow: 342,
    totalGames: 156,
  });

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/');
      return;
    }
  }, [isAuthenticated, user, navigate]);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard stats={stats} />;
      case 'users':
        return <UsersManagement />;
      case 'notifications':
        return <NotificationsManagement />;
      case 'settings':
        return <SiteSettings />;
      case 'analytics':
        return <Analytics />;
      case 'reports':
        return <Reports />;
      case 'content':
        return <ContentManagement />;
      case 'security':
        return <SecuritySettings />;
      default:
        return <Dashboard stats={stats} />;
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <div className="admin-logo">
          <h2>🎮 GGZone Admin</h2>
          <p className="admin-user">👋 {user?.fullName}</p>
        </div>
        <nav className="admin-nav">
          <button className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>
            📊 Dashboard
          </button>
          <button className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>
            👥 Quản lý người dùng
          </button>
          <button className={activeTab === 'content' ? 'active' : ''} onClick={() => setActiveTab('content')}>
            📝 Quản lý nội dung
          </button>
          <button className={activeTab === 'notifications' ? 'active' : ''} onClick={() => setActiveTab('notifications')}>
            🔔 Thông báo
          </button>
          <button className={activeTab === 'analytics' ? 'active' : ''} onClick={() => setActiveTab('analytics')}>
            📈 Phân tích
          </button>
          <button className={activeTab === 'reports' ? 'active' : ''} onClick={() => setActiveTab('reports')}>
            📋 Báo cáo
          </button>
          <button className={activeTab === 'security' ? 'active' : ''} onClick={() => setActiveTab('security')}>
            🔒 Bảo mật
          </button>
          <button className={activeTab === 'settings' ? 'active' : ''} onClick={() => setActiveTab('settings')}>
            ⚙️ Cài đặt
          </button>
          <div className="nav-divider"></div>
          <button onClick={() => navigate('/')} className="btn-back">
            ← Về trang chủ
          </button>
        </nav>
      </div>
      <div className="admin-content">
        {renderContent()}
      </div>
    </div>
  );
};
