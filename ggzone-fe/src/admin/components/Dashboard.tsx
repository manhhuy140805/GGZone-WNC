import React from 'react';

interface DashboardProps {
  stats: {
    totalUsers: number;
    activeUsers: number;
    totalPosts: number;
    totalNotifications: number;
    revenue: number;
    newUsersToday: number;
    activeNow: number;
    totalGames: number;
  };
}

export const Dashboard: React.FC<DashboardProps> = ({ stats }) => {
  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p className="subtitle">Tổng quan hệ thống GGZone</p>
      
      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{stats.totalUsers.toLocaleString()}</h3>
            <p>Tổng người dùng</p>
            <span className="stat-change positive">+12% tháng này</span>
          </div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>{stats.activeUsers.toLocaleString()}</h3>
            <p>Người dùng hoạt động</p>
            <span className="stat-change positive">+8% tuần này</span>
          </div>
        </div>
        <div className="stat-card purple">
          <div className="stat-icon">📝</div>
          <div className="stat-info">
            <h3>{stats.totalPosts.toLocaleString()}</h3>
            <p>Tổng bài viết</p>
            <span className="stat-change positive">+15% tháng này</span>
          </div>
        </div>
        <div className="stat-card orange">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>${(stats.revenue / 1000).toFixed(1)}K</h3>
            <p>Doanh thu</p>
            <span className="stat-change positive">+23% tháng này</span>
          </div>
        </div>
      </div>
