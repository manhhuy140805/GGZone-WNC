import React, { useState, useEffect } from 'react';
import { useAuth } from "@/app/providers/AuthContext";
import { useNavigate } from 'react-router-dom';
import { User } from "@/types";
import { API_CONFIG, buildUrl } from "@/lib/constants/api";
import { 
  LayoutDashboard, Users, Bell, Settings, BarChart3, 
  FileText, Shield, Gamepad2, ShoppingCart, MessageSquare,
  TrendingUp, UserCheck, DollarSign, Activity, Clock,
  Edit, Trash2, Eye, Check, X, Plus, Search, Filter
} from 'lucide-react';
import './AdminStyles.css';

type TabType = 'dashboard' | 'users' | 'notifications' | 'settings' | 'analytics' | 'reports' | 'content' | 'security' | 'games' | 'marketplace';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  targetUsers: 'all' | 'specific';
  createdAt: string;
  status: 'draft' | 'sent';
}

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  maintenanceMode: boolean;
  allowRegistration: boolean;
  requireEmailVerification: boolean;
  maxUploadSize: number;
  contactEmail: string;
}

const AdminPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalPosts: 0,
    totalNotifications: 0,
  });

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      navigate('/');
      return;
    }
    fetchStats();
  }, [isAuthenticated, user, navigate]);

  const fetchStats = async () => {
    try {
      // Mock data for demo
      setStats({
        totalUsers: 1250,
        activeUsers: 856,
        totalPosts: 3420,
        totalNotifications: 45,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

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
      case 'content':
        return <ContentManagement />;
      case 'games':
        return <GamesManagement />;
      case 'marketplace':
        return <MarketplaceManagement />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'reports':
        return <ReportsManagement />;
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
          <p className="admin-user">{user?.fullName}</p>
        </div>
        <nav className="admin-nav">
          <button
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveTab('dashboard')}
          >
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </button>
          <button
            className={activeTab === 'users' ? 'active' : ''}
            onClick={() => setActiveTab('users')}
          >
            <Users size={18} />
            <span>Quản lý người dùng</span>
          </button>
          <button
            className={activeTab === 'notifications' ? 'active' : ''}
            onClick={() => setActiveTab('notifications')}
          >
            <Bell size={18} />
            <span>Thông báo</span>
          </button>
          <button
            className={activeTab === 'content' ? 'active' : ''}
            onClick={() => setActiveTab('content')}
          >
            <FileText size={18} />
            <span>Nội dung</span>
          </button>
          <button
            className={activeTab === 'games' ? 'active' : ''}
            onClick={() => setActiveTab('games')}
          >
            <Gamepad2 size={18} />
            <span>Games</span>
          </button>
          <button
            className={activeTab === 'marketplace' ? 'active' : ''}
            onClick={() => setActiveTab('marketplace')}
          >
            <ShoppingCart size={18} />
            <span>Marketplace</span>
          </button>
          <button
            className={activeTab === 'analytics' ? 'active' : ''}
            onClick={() => setActiveTab('analytics')}
          >
            <BarChart3 size={18} />
            <span>Phân tích</span>
          </button>
          <button
            className={activeTab === 'reports' ? 'active' : ''}
            onClick={() => setActiveTab('reports')}
          >
            <MessageSquare size={18} />
            <span>Báo cáo</span>
          </button>
          <button
            className={activeTab === 'security' ? 'active' : ''}
            onClick={() => setActiveTab('security')}
          >
            <Shield size={18} />
            <span>Bảo mật</span>
          </button>
          <button
            className={activeTab === 'settings' ? 'active' : ''}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={18} />
            <span>Cài đặt</span>
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

// Dashboard Component
const Dashboard: React.FC<{ stats: any }> = ({ stats }) => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p className="subtitle">Tổng quan hệ thống</p>
      
      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="stat-icon">
            <Users size={32} strokeWidth={2} />
          </div>
          <div className="stat-info">
            <h3>{stats.totalUsers.toLocaleString()}</h3>
            <p>Tổng người dùng</p>
            <span className="stat-change positive">
              <TrendingUp size={14} /> +12% so với tháng trước
            </span>
          </div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon">
            <UserCheck size={32} strokeWidth={2} />
          </div>
          <div className="stat-info">
            <h3>{stats.activeUsers.toLocaleString()}</h3>
            <p>Người dùng hoạt động</p>
            <span className="stat-change positive">
              <TrendingUp size={14} /> +8% so với tuần trước
            </span>
          </div>
        </div>
        <div className="stat-card purple">
          <div className="stat-icon">
            <FileText size={32} strokeWidth={2} />
          </div>
          <div className="stat-info">
            <h3>{stats.totalPosts.toLocaleString()}</h3>
            <p>Tổng bài viết</p>
            <span className="stat-change positive">
              <TrendingUp size={14} /> +15% so với tháng trước
            </span>
          </div>
        </div>
        <div className="stat-card orange">
          <div className="stat-icon">
            <DollarSign size={32} strokeWidth={2} />
          </div>
          <div className="stat-info">
            <h3>{(stats.totalNotifications * 100).toLocaleString()}đ</h3>
            <p>Doanh thu tháng này</p>
            <span className="stat-change positive">
              <TrendingUp size={14} /> +23% so với tháng trước
            </span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Hoạt động gần đây</h3>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-icon">👤</span>
              <div className="activity-content">
                <p><strong>Người dùng mới</strong> đã đăng ký</p>
                <span className="activity-time">5 phút trước</span>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-icon">📝</span>
              <div className="activity-content">
                <p><strong>Bài viết mới</strong> được tạo</p>
                <span className="activity-time">15 phút trước</span>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-icon">🔔</span>
              <div className="activity-content">
                <p><strong>Thông báo</strong> đã được gửi</p>
                <span className="activity-time">1 giờ trước</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dashboard-card">
          <h3>Thống kê nhanh</h3>
          <div className="quick-stats">
            <div className="quick-stat-item">
              <span className="label">Người dùng mới hôm nay</span>
              <span className="value">24</span>
            </div>
            <div className="quick-stat-item">
              <span className="label">Bài viết hôm nay</span>
              <span className="value">156</span>
            </div>
            <div className="quick-stat-item">
              <span className="label">Báo cáo chờ xử lý</span>
              <span className="value warning">8</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Users Management Component
const UsersManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<string>('all');
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Mock data for demo
      const mockUsers: User[] = [
        { id: '1', username: 'admin', email: 'admin@ggzone.com', fullName: 'Admin User', role: 'admin', avatarUrl: 'https://ui-avatars.com/api/?name=Admin+User' },
        { id: '2', username: 'john_doe', email: 'john@example.com', fullName: 'John Doe', role: 'user', avatarUrl: 'https://ui-avatars.com/api/?name=John+Doe' },
        { id: '3', username: 'jane_smith', email: 'jane@example.com', fullName: 'Jane Smith', role: 'user', avatarUrl: 'https://ui-avatars.com/api/?name=Jane+Smith' },
        { id: '4', username: 'moderator1', email: 'mod@ggzone.com', fullName: 'Moderator One', role: 'moderator', avatarUrl: 'https://ui-avatars.com/api/?name=Moderator+One' },
      ];
      setUsers(mockUsers);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa người dùng này?')) return;
    setUsers(users.filter(u => u.id !== userId));
  };

  const handleBanUser = async (userId: string) => {
    if (!confirm('Bạn có chắc chắn muốn cấm người dùng này?')) return;
    alert('Đã cấm người dùng');
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.fullName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  if (loading) return <div className="loading">Đang tải...</div>;

  return (
    <div className="management-section">
      <div className="section-header">
        <div>
          <h1>Quản lý người dùng</h1>
          <p className="subtitle">Quản lý tất cả người dùng trong hệ thống</p>
        </div>
      </div>

      <div className="filters-bar">
        <input
          type="text"
          placeholder="Tìm kiếm theo tên, email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select 
          value={filterRole} 
          onChange={(e) => setFilterRole(e.target.value)}
          className="filter-select"
        >
          <option value="all">Tất cả vai trò</option>
          <option value="admin">Admin</option>
          <option value="moderator">Moderator</option>
          <option value="user">User</option>
        </select>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Người dùng</th>
              <th>Email</th>
              <th>Vai trò</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>
                  <div className="user-cell">
                    <img
                      src={user.avatarUrl || '/default-avatar.png'}
                      alt={user.username}
                      className="table-avatar"
                    />
                    <div>
                      <div className="user-name">{user.fullName}</div>
                      <div className="user-username">@{user.username}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge ${user.role}`}>{user.role}</span>
                </td>
                <td>
                  <span className="status-badge active">Hoạt động</span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon" onClick={() => handleEditUser(user)} title="Chỉnh sửa">
                      <Edit size={16} />
                    </button>
                    <button className="btn-icon" onClick={() => handleBanUser(user.id)} title="Cấm">
                      <X size={16} />
                    </button>
                    <button className="btn-icon danger" onClick={() => handleDeleteUser(user.id)} title="Xóa">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showEditModal && selectedUser && (
        <EditUserModal 
          user={selectedUser} 
          onClose={() => setShowEditModal(false)}
          onSave={(updatedUser) => {
            setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
            setShowEditModal(false);
          }}
        />
      )}
    </div>
  );
};

// Edit User Modal
const EditUserModal: React.FC<{ user: User; onClose: () => void; onSave: (user: User) => void }> = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState(user);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Chỉnh sửa người dùng</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Tên đầy đủ</label>
            <input
              type="text"
              value={formData.fullName || ''}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Vai trò</label>
            <select
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="user">User</option>
              <option value="moderator">Moderator</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Hủy</button>
            <button type="submit" className="btn-save">Lưu thay đổi</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Notifications Management Component
const NotificationsManagement: React.FC = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    // Mock data
    setNotifications([
      {
        id: '1',
        title: 'Bảo trì hệ thống',
        message: 'Hệ thống sẽ bảo trì vào 2h sáng ngày mai',
        type: 'warning',
        targetUsers: 'all',
        createdAt: new Date().toISOString(),
        status: 'sent'
      },
      {
        id: '2',
        title: 'Tính năng mới',
        message: 'Chúng tôi đã ra mắt tính năng chat nhóm',
        type: 'success',
        targetUsers: 'all',
        createdAt: new Date().toISOString(),
        status: 'sent'
      }
    ]);
  }, []);

  const handleDeleteNotification = (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa thông báo này?')) return;
    setNotifications(notifications.filter(n => n.id !== id));
  };

  return (
    <div className="management-section">
      <div className="section-header">
        <div>
          <h1>Quản lý thông báo</h1>
          <p className="subtitle">Gửi thông báo đến người dùng</p>
        </div>
        <button className="btn-add" onClick={() => setShowCreateModal(true)}>
          <Plus size={18} />
          <span>Tạo thông báo mới</span>
        </button>
      </div>

      <div className="notifications-grid">
        {notifications.map(notification => (
          <div key={notification.id} className={`notification-card ${notification.type}`}>
            <div className="notification-header">
              <h3>{notification.title}</h3>
              <span className={`status-badge ${notification.status}`}>{notification.status === 'sent' ? 'Đã gửi' : 'Nháp'}</span>
            </div>
            <p className="notification-message">{notification.message}</p>
            <div className="notification-footer">
              <span className="notification-meta">
                📅 {new Date(notification.createdAt).toLocaleDateString('vi-VN')}
              </span>
              <span className="notification-meta">
                👥 {notification.targetUsers === 'all' ? 'Tất cả người dùng' : 'Người dùng cụ thể'}
              </span>
              <button className="btn-icon danger" onClick={() => handleDeleteNotification(notification.id)}>
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showCreateModal && (
        <CreateNotificationModal onClose={() => setShowCreateModal(false)} onCreate={(notification) => {
          setNotifications([...notifications, notification]);
          setShowCreateModal(false);
        }} />
      )}
    </div>
  );
};

// Create Notification Modal
const CreateNotificationModal: React.FC<{ onClose: () => void; onCreate: (notification: Notification) => void }> = ({ onClose, onCreate }) => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'info' as 'info' | 'warning' | 'success' | 'error',
    targetUsers: 'all' as 'all' | 'specific'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newNotification: Notification = {
      id: Date.now().toString(),
      ...formData,
      createdAt: new Date().toISOString(),
      status: 'sent'
    };
    onCreate(newNotification);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Tạo thông báo mới</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label>Tiêu đề</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              placeholder="Nhập tiêu đề thông báo"
            />
          </div>
          <div className="form-group">
            <label>Nội dung</label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              placeholder="Nhập nội dung thông báo"
              rows={4}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Loại thông báo</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
              >
                <option value="info">Thông tin</option>
                <option value="success">Thành công</option>
                <option value="warning">Cảnh báo</option>
                <option value="error">Lỗi</option>
              </select>
            </div>
            <div className="form-group">
              <label>Gửi đến</label>
              <select
                value={formData.targetUsers}
                onChange={(e) => setFormData({ ...formData, targetUsers: e.target.value as any })}
              >
                <option value="all">Tất cả người dùng</option>
                <option value="specific">Người dùng cụ thể</option>
              </select>
            </div>
          </div>
          <div className="modal-actions">
            <button type="button" className="btn-cancel" onClick={onClose}>Hủy</button>
            <button type="submit" className="btn-save">Gửi thông báo</button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Site Settings Component
const SiteSettings: React.FC = () => {
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: 'GGZone',
    siteDescription: 'Nền tảng game thủ hàng đầu Việt Nam',
    maintenanceMode: false,
    allowRegistration: true,
    requireEmailVerification: true,
    maxUploadSize: 10,
    contactEmail: 'support@ggzone.com'
  });
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Save settings
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="management-section">
      <div className="section-header">
        <div>
          <h1>Cài đặt trang web</h1>
          <p className="subtitle">Quản lý cấu hình hệ thống</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="settings-form">
        <div className="settings-section">
          <h3>Thông tin chung</h3>
          <div className="form-group">
            <label>Tên trang web</label>
            <input
              type="text"
              value={settings.siteName}
              onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label>Mô tả</label>
            <textarea
              value={settings.siteDescription}
              onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
              rows={3}
            />
          </div>
          <div className="form-group">
            <label>Email liên hệ</label>
            <input
              type="email"
              value={settings.contactEmail}
              onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
            />
          </div>
        </div>

        <div className="settings-section">
          <h3>Cài đặt người dùng</h3>
          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                checked={settings.allowRegistration}
                onChange={(e) => setSettings({ ...settings, allowRegistration: e.target.checked })}
              />
              <span>Cho phép đăng ký tài khoản mới</span>
            </label>
          </div>
          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                checked={settings.requireEmailVerification}
                onChange={(e) => setSettings({ ...settings, requireEmailVerification: e.target.checked })}
              />
              <span>Yêu cầu xác thực email</span>
            </label>
          </div>
        </div>

        <div className="settings-section">
          <h3>Cài đặt hệ thống</h3>
          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
              />
              <span>Chế độ bảo trì</span>
            </label>
            <p className="form-help">Khi bật, chỉ admin mới có thể truy cập trang web</p>
          </div>
          <div className="form-group">
            <label>Kích thước upload tối đa (MB)</label>
            <input
              type="number"
              value={settings.maxUploadSize}
              onChange={(e) => setSettings({ ...settings, maxUploadSize: parseInt(e.target.value) })}
              min="1"
              max="100"
            />
          </div>
        </div>

        <div className="settings-actions">
          {saved && <span className="save-success">✓ Đã lưu thành công!</span>}
          <button type="submit" className="btn-save">Lưu cài đặt</button>
        </div>
      </form>
    </div>
  );
};

// Analytics Dashboard Component
const AnalyticsDashboard: React.FC = () => {
  return (
    <div className="management-section">
      <h1>Phân tích & Thống kê</h1>
      <p className="subtitle">Dữ liệu chi tiết về người dùng và hoạt động</p>
      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h3>342</h3>
            <p>Đang online</p>
          </div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon">📈</div>
          <div className="stat-info">
            <h3>68%</h3>
            <p>Retention Rate</p>
          </div>
        </div>
        <div className="stat-card purple">
          <div className="stat-icon">⏱️</div>
          <div className="stat-info">
            <h3>45m</h3>
            <p>Avg Session Time</p>
          </div>
        </div>
        <div className="stat-card orange">
          <div className="stat-icon">🎯</div>
          <div className="stat-info">
            <h3>12.5%</h3>
            <p>Conversion Rate</p>
          </div>
        </div>
      </div>
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>User Growth (Coming Soon)</h3>
          <p style={{color: 'rgba(255,255,255,0.5)', padding: '2rem', textAlign: 'center'}}>
            Chart will be displayed here
          </p>
        </div>
        <div className="dashboard-card">
          <h3>Revenue Trend (Coming Soon)</h3>
          <p style={{color: 'rgba(255,255,255,0.5)', padding: '2rem', textAlign: 'center'}}>
            Chart will be displayed here
          </p>
        </div>
      </div>
    </div>
  );
};

// Reports Management Component
const ReportsManagement: React.FC = () => {
  const [reports, setReports] = useState([
    { id: '1', type: 'User', reporter: 'User123', reason: 'Spam', status: 'pending', date: '2024-01-15' },
    { id: '2', type: 'Content', reporter: 'User456', reason: 'Inappropriate', status: 'resolved', date: '2024-01-14' },
  ]);

  return (
    <div className="management-section">
      <div className="section-header">
        <div>
          <h1>Quản lý Báo cáo</h1>
          <p className="subtitle">Xử lý báo cáo từ người dùng</p>
        </div>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Loại</th>
              <th>Người báo cáo</th>
              <th>Lý do</th>
              <th>Trạng thái</th>
              <th>Ngày</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(report => (
              <tr key={report.id}>
                <td><span className="role-badge user">{report.type}</span></td>
                <td>{report.reporter}</td>
                <td>{report.reason}</td>
                <td><span className={`status-badge ${report.status}`}>{report.status}</span></td>
                <td>{report.date}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon"><Eye size={16} /></button>
                    <button className="btn-icon"><Check size={16} /></button>
                    <button className="btn-icon danger"><X size={16} /></button>
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

// Security Settings Component
const SecuritySettings: React.FC = () => {
  return (
    <div className="management-section">
      <h1>Cài đặt Bảo mật</h1>
      <p className="subtitle">Quản lý bảo mật và quyền truy cập</p>
      <div className="settings-form">
        <div className="settings-section">
          <h3>Xác thực</h3>
          <div className="form-group checkbox">
            <label>
              <input type="checkbox" defaultChecked />
              <span>Bật xác thực 2 yếu tố (2FA)</span>
            </label>
          </div>
          <div className="form-group checkbox">
            <label>
              <input type="checkbox" defaultChecked />
              <span>Yêu cầu mật khẩu mạnh</span>
            </label>
          </div>
        </div>
        <div className="settings-section">
          <h3>Session Management</h3>
          <div className="form-group">
            <label>Thời gian session (phút)</label>
            <input type="number" defaultValue={60} />
          </div>
          <div className="form-group checkbox">
            <label>
              <input type="checkbox" />
              <span>Tự động đăng xuất khi không hoạt động</span>
            </label>
          </div>
        </div>
        <div className="settings-section">
          <h3>IP Whitelist</h3>
          <div className="form-group">
            <label>Danh sách IP được phép (mỗi dòng một IP)</label>
            <textarea rows={5} placeholder="192.168.1.1&#10;10.0.0.1"></textarea>
          </div>
        </div>
        <div className="settings-actions">
          <button className="btn-save">Lưu cài đặt</button>
        </div>
      </div>
    </div>
  );
};

// Games Management Component
const GamesManagement: React.FC = () => {
  return (
    <div className="management-section">
      <div className="section-header">
        <div>
          <h1>Quản lý Games</h1>
          <p className="subtitle">Thêm, sửa, xóa games trong hệ thống</p>
        </div>
        <button className="btn-add">
          <Plus size={18} />
          <span>Thêm Game</span>
        </button>
      </div>
      <div className="stats-grid" style={{marginBottom: '2rem'}}>
        <div className="stat-card blue">
          <div className="stat-icon">🎮</div>
          <div className="stat-info">
            <h3>156</h3>
            <p>Tổng Games</p>
          </div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <h3>89</h3>
            <p>Featured Games</p>
          </div>
        </div>
      </div>
      <p style={{color: 'rgba(255,255,255,0.6)', textAlign: 'center', padding: '3rem'}}>
        Game management interface - Coming soon
      </p>
    </div>
  );
};

// Marketplace Management Component
const MarketplaceManagement: React.FC = () => {
  return (
    <div className="management-section">
      <div className="section-header">
        <div>
          <h1>Quản lý Marketplace</h1>
          <p className="subtitle">Sản phẩm, đơn hàng và doanh thu</p>
        </div>
      </div>
      <div className="stats-grid">
        <div className="stat-card orange">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>$125K</h3>
            <p>Doanh thu tháng này</p>
            <span className="stat-change positive">+23%</span>
          </div>
        </div>
        <div className="stat-card blue">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>342</h3>
            <p>Đơn hàng</p>
            <span className="stat-change positive">+15%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Content Management Component
const ContentManagement: React.FC = () => {
  const [posts, setPosts] = useState([
    { id: '1', title: 'Top 10 Games 2024', author: 'Admin', status: 'published', views: 1250, likes: 89 },
    { id: '2', title: 'Gaming Tips', author: 'User123', status: 'pending', views: 450, likes: 23 },
  ]);

  return (
    <div className="management-section">
      <div className="section-header">
        <div>
          <h1>Quản lý nội dung</h1>
          <p className="subtitle">Quản lý bài viết, bình luận và media</p>
        </div>
        <button className="btn-add">
          <Plus size={18} />
          <span>Tạo bài viết</span>
        </button>
      </div>
      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Tiêu đề</th>
              <th>Tác giả</th>
              <th>Trạng thái</th>
              <th>Lượt xem</th>
              <th>Likes</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {posts.map(post => (
              <tr key={post.id}>
                <td>{post.title}</td>
                <td>{post.author}</td>
                <td><span className={`status-badge ${post.status}`}>{post.status}</span></td>
                <td>{post.views}</td>
                <td>{post.likes}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-icon"><Edit size={16} /></button>
                    <button className="btn-icon danger"><Trash2 size={16} /></button>
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

export default AdminPage;
