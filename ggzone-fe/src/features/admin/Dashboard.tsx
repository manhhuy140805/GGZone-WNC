import React from "react";
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
  MessageSquare
} from "lucide-react";

export const Dashboard: React.FC = () => {
  const stats = [
    { icon: <Users size={24} />, label: "Total Users", value: "1,234", change: "+12%", trend: "up", color: "blue", bgColor: "bg-blue-100", textColor: "text-blue-600" },
    { icon: <FileText size={24} />, label: "Total Posts", value: "5,678", change: "+8%", trend: "up", color: "green", bgColor: "bg-green-100", textColor: "text-green-600" },
    { icon: <Package size={24} />, label: "Total Products", value: "234", change: "-2%", trend: "down", color: "purple", bgColor: "bg-purple-100", textColor: "text-purple-600" },
    { icon: <ShoppingCart size={24} />, label: "Total Orders", value: "890", change: "+15%", trend: "up", color: "orange", bgColor: "bg-orange-100", textColor: "text-orange-600" },
  ];

  const revenueData = [
    { month: "Jan", value: 45 },
    { month: "Feb", value: 52 },
    { month: "Mar", value: 48 },
    { month: "Apr", value: 61 },
    { month: "May", value: 55 },
    { month: "Jun", value: 67 },
    { month: "Jul", value: 73 },
    { month: "Aug", value: 69 },
    { month: "Sep", value: 78 },
    { month: "Oct", value: 85 },
    { month: "Nov", value: 82 },
    { month: "Dec", value: 90 },
  ];

  const topProducts = [
    { name: "Gaming Mouse Pro", sales: 234, revenue: "12,450", trend: "+15%" },
    { name: "Mechanical Keyboard", sales: 189, revenue: "9,870", trend: "+8%" },
    { name: "RGB Headset", sales: 156, revenue: "7,340", trend: "+12%" },
    { name: "Gaming Chair", sales: 98, revenue: "24,500", trend: "+5%" },
  ];

  const recentActivities = [
    { type: "order", user: "John Doe", action: "placed an order", amount: "$150.00", time: "2 mins ago", icon: <ShoppingCart size={16} />, color: "orange" },
    { type: "user", user: "Jane Smith", action: "registered", time: "5 mins ago", icon: <Users size={16} />, color: "blue" },
    { type: "post", user: "Bob Johnson", action: "created a post", time: "10 mins ago", icon: <FileText size={16} />, color: "green" },
    { type: "order", user: "Alice Brown", action: "placed an order", amount: "$89.00", time: "15 mins ago", icon: <ShoppingCart size={16} />, color: "orange" },
    { type: "product", user: "Admin", action: "added new product", time: "20 mins ago", icon: <Package size={16} />, color: "purple" },
  ];

  const maxValue = Math.max(...revenueData.map(d => d.value));

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
              <p className="text-sm text-gray-600 mt-1">Monthly revenue for 2024</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-orange-600">$45,678</p>
              <p className="text-sm text-green-600 font-medium">+23% from last year</p>
            </div>
          </div>
          
          {/* Bar Chart */}
          <div className="flex items-end justify-between gap-2 h-48">
            {revenueData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-gray-100 rounded-t-lg relative group cursor-pointer hover:bg-gray-200 transition" 
                     style={{ height: `${(data.value / maxValue) * 100}%` }}>
                  <div className="absolute inset-0 bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-lg"></div>
                  {/* Tooltip */}
                  <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition whitespace-nowrap">
                    ${data.value}k
                  </div>
                </div>
                <span className="text-xs text-gray-600 font-medium">{data.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Top Products</h2>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 text-sm truncate">{product.name}</p>
                  <p className="text-xs text-gray-600">{product.sales} sales</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 text-sm">${product.revenue}</p>
                  <p className="text-xs text-green-600">{product.trend}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                <div className={`w-10 h-10 bg-${activity.color}-100 rounded-full flex items-center justify-center`}>
                  <div className={`text-${activity.color}-600`}>{activity.icon}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">
                    <span className="font-semibold">{activity.user}</span> {activity.action}
                  </p>
                  <p className="text-xs text-gray-600">{activity.time}</p>
                </div>
                {activity.amount && (
                  <span className="text-orange-600 font-semibold text-sm">{activity.amount}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Stats</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Eye size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Page Views</p>
                  <p className="text-2xl font-bold text-gray-900">24,567</p>
                </div>
              </div>
              <span className="text-green-600 text-sm font-semibold">+18%</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-600 rounded-lg">
                  <MessageSquare size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Comments</p>
                  <p className="text-2xl font-bold text-gray-900">1,234</p>
                </div>
              </div>
              <span className="text-green-600 text-sm font-semibold">+12%</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-600 rounded-lg">
                  <TrendingUp size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold text-gray-900">3.24%</p>
                </div>
              </div>
              <span className="text-green-600 text-sm font-semibold">+5%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
