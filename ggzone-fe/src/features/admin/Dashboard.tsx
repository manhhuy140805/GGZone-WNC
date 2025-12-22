import React, { useState, useEffect } from "react";
import { 
  Users, 
  FileText, 
  Package, 
  ShoppingCart, 
  TrendingUp, 
  ArrowUp,
  ArrowDown,
  Activity,
  Eye,
  MessageSquare,
  Loader
} from "lucide-react";
import { adminService, DashboardStats, RevenueData, TopProduct, RecentActivity, QuickStats } from "@/services/api/adminService";

export const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [revenueData, setRevenueData] = useState<RevenueData[]>([]);
  const [topProducts, setTopProducts] = useState<TopProduct[]>([]);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [quickStats, setQuickStats] = useState<QuickStats | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load all data in parallel
      const [statsRes, revenueRes, productsRes, activitiesRes, quickStatsRes] = await Promise.all([
        adminService.getDashboardStats(),
        adminService.getRevenueData(),
        adminService.getTopProducts(4),
        adminService.getRecentActivities(5),
        adminService.getQuickStats(),
      ]);

      if (statsRes.success && statsRes.data) {
        setDashboardStats(statsRes.data);
      }
      if (revenueRes.success && revenueRes.data) {
        setRevenueData(revenueRes.data);
      }
      if (productsRes.success && productsRes.data) {
        setTopProducts(productsRes.data);
      }
      if (activitiesRes.success && activitiesRes.data) {
        setRecentActivities(activitiesRes.data);
      }
      if (quickStatsRes.success && quickStatsRes.data) {
        setQuickStats(quickStatsRes.data);
      }
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader className="animate-spin text-orange-600" size={48} />
      </div>
    );
  }
  const stats = dashboardStats ? [
    { 
      icon: <Users size={24} />, 
      label: "Total Users", 
      value: dashboardStats.totalUsers.toLocaleString(), 
      change: `${dashboardStats.userGrowth > 0 ? '+' : ''}${dashboardStats.userGrowth}%`, 
      trend: dashboardStats.userGrowth >= 0 ? "up" : "down", 
      bgColor: "bg-blue-100", 
      textColor: "text-blue-600" 
    },
    { 
      icon: <FileText size={24} />, 
      label: "Total Posts", 
      value: dashboardStats.totalPosts.toLocaleString(), 
      change: `${dashboardStats.postGrowth > 0 ? '+' : ''}${dashboardStats.postGrowth}%`, 
      trend: dashboardStats.postGrowth >= 0 ? "up" : "down", 
      bgColor: "bg-green-100", 
      textColor: "text-green-600" 
    },
    { 
      icon: <Package size={24} />, 
      label: "Total Products", 
      value: dashboardStats.totalProducts.toLocaleString(), 
      change: `${dashboardStats.productGrowth > 0 ? '+' : ''}${dashboardStats.productGrowth}%`, 
      trend: dashboardStats.productGrowth >= 0 ? "up" : "down", 
      bgColor: "bg-purple-100", 
      textColor: "text-purple-600" 
    },
    { 
      icon: <ShoppingCart size={24} />, 
      label: "Total Orders", 
      value: dashboardStats.totalOrders.toLocaleString(), 
      change: `${dashboardStats.orderGrowth > 0 ? '+' : ''}${dashboardStats.orderGrowth}%`, 
      trend: dashboardStats.orderGrowth >= 0 ? "up" : "down", 
      bgColor: "bg-orange-100", 
      textColor: "text-orange-600" 
    },
  ] : [];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order': return { icon: <ShoppingCart size={16} />, color: 'orange' };
      case 'user': return { icon: <Users size={16} />, color: 'blue' };
      case 'post': return { icon: <FileText size={16} />, color: 'green' };
      case 'product': return { icon: <Package size={16} />, color: 'purple' };
      default: return { icon: <Activity size={16} />, color: 'gray' };
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMins = Math.floor(diffInMs / 60000);
    
    if (diffInMins < 1) return 'Just now';
    if (diffInMins < 60) return `${diffInMins} min${diffInMins > 1 ? 's' : ''} ago`;
    
    const diffInHours = Math.floor(diffInMins / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  };

  const maxValue = revenueData.length > 0 ? Math.max(...revenueData.map(d => d.value)) : 100;

  // Debug: Log revenue data to check values
  console.log('Revenue Data:', revenueData);
  console.log('Max Value:', maxValue);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg">
          <Activity size={20} className="text-gray-600" />
          <span className="text-sm font-medium text-gray-700">Last updated: Just now</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 ${stat.bgColor} rounded-lg`}>
                <div className={stat.textColor}>{stat.icon}</div>
              </div>
              <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${
                stat.trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
              }`}>
                {stat.trend === 'up' ? <ArrowUp size={14} /> : <ArrowDown size={14} />}
                <span className="text-xs font-semibold">{stat.change}</span>
              </div>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-gray-600 text-sm mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Revenue Overview</h2>
              <p className="text-sm text-gray-600 mt-1">Monthly revenue for 2025</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-orange-600">
                {revenueData.reduce((sum, d) => sum + d.value, 0).toLocaleString()}k
              </p>
              <p className="text-sm text-gray-600 font-medium">Total this year</p>
            </div>
          </div>
          
          {/* Bar Chart */}
          {revenueData.length > 0 ? (
            <div className="flex items-end justify-between gap-2 h-48">
              {revenueData.map((data, index) => {
                const heightPercent = maxValue > 0 ? (data.value / maxValue) * 100 : 0;
                // Apply minimum height of 10% for better visibility
                const finalHeight = data.value > 0 ? Math.max(heightPercent, 10) : 0;
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    {data.value > 0 ? (
                      <div 
                        className="w-full bg-gray-100 rounded-t-lg relative group cursor-pointer hover:bg-gray-200 transition" 
                        style={{ height: `${finalHeight}%`, minHeight: '30px' }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-lg"></div>
                        {/* Tooltip */}
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-10">
                          ${data.value}k
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-1 bg-gray-200 rounded"></div>
                    )}
                    <span className="text-xs text-gray-600 font-medium">{data.month}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex items-center justify-center h-48 text-gray-500">
              <p>No revenue data available</p>
            </div>
          )}
        </div>

        {/* System Info */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">System Overview</h2>
          <div className="space-y-4">
            {dashboardStats && (
              <>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Users size={20} className="text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">Total Users</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">{dashboardStats.totalUsers.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <FileText size={20} className="text-green-600" />
                    <span className="text-sm font-medium text-gray-700">Total Posts</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">{dashboardStats.totalPosts.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Package size={20} className="text-purple-600" />
                    <span className="text-sm font-medium text-gray-700">Total Products</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">{dashboardStats.totalProducts.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <ShoppingCart size={20} className="text-orange-600" />
                    <span className="text-sm font-medium text-gray-700">Total Orders</span>
                  </div>
                  <span className="text-lg font-bold text-gray-900">{dashboardStats.totalOrders.toLocaleString()}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Monthly Statistics */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Monthly Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {revenueData.slice(-4).map((data, index) => (
            <div key={index} className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">{data.month}</p>
              <p className="text-2xl font-bold text-gray-900">{data.value}k</p>
              <p className="text-xs text-gray-500 mt-1">Revenue</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
