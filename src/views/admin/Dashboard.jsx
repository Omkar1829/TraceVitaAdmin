import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  MdPeople,
  MdCardMembership,
  MdRestaurant,
  MdBolt,
  MdShowChart,
  MdLibraryBooks,
  MdAttachMoney,
  MdTrendingUp,
  MdFilterList,
} from "react-icons/md";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

// Weekly data for User Analytics only
const weeklyUserData = [
  { week: "1st Week", period: "Aug 1-9", totalUsers: 1250, activeUsers: 890 },
  { week: "2nd Week", period: "Aug 10-16", totalUsers: 1420, activeUsers: 980 },
  { week: "3rd Week", period: "Aug 17-23", totalUsers: 1580, activeUsers: 1120 },
  { week: "4th Week", period: "Aug 24-31", totalUsers: 1750, activeUsers: 1280 },
];

// Daily data for other charts
const dailyRevenueData = [
  { day: "Mon", revenue: 1250 },
  { day: "Tue", revenue: 1580 },
  { day: "Wed", revenue: 980 },
  { day: "Thu", revenue: 2100 },
  { day: "Fri", revenue: 1850 },
  { day: "Sat", revenue: 1200 },
  { day: "Sun", revenue: 2300 },
];

const dailySuggestionsData = [
  { day: "Mon", suggestions: 120 },
  { day: "Tue", suggestions: 145 },
  { day: "Wed", suggestions: 89 },
  { day: "Thu", suggestions: 167 },
  { day: "Fri", suggestions: 134 },
  { day: "Sat", suggestions: 98 },
  { day: "Sun", suggestions: 189 },
];

const userTypeData = [
  { name: 'Free Users', value: 75, color: '#00C896' },
  { name: 'Premium Users', value: 25, color: '#FFD93D' },
];

const Dashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filterPeriod, setFilterPeriod] = useState('week');
  
  console.log("admindata:", adminData);
  const staticToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXVpZCI6IjJmNTY5ZjdkLTg0ODYtNDhiYS1iZTAzLTFiODQ4ODE4ZjQ2MiIsImVtYWlsIjoib21rYXJrYWxlNjg4QGdtYWlsLmNvbSIsInN0ZXAiOjAsImlhdCI6MTc1NDUwODE3NywiZXhwIjoxNzU0NTA5OTc3fQ.CoxUzkjpZt62rRIYNaMhCkxN3pIN4x2_sUaEMwrWmHg';

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/getAdmin/1', {
          headers: {
            Authorization: `Bearer ${staticToken}`
          }
        });
        setAdminData(response.data.data);
      } catch (err) {
        console.error('Error fetching admin data:', err);
        setError('Failed to fetch admin data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  // Calculate revenue based on filter for daily data
  const getRevenueByPeriod = () => {
    const totalRevenue = dailyRevenueData.reduce((sum, item) => sum + item.revenue, 0);
    switch(filterPeriod) {
      case 'today':
        return dailyRevenueData[dailyRevenueData.length - 1]?.revenue || 0;
      case 'week':
        return totalRevenue;
      case 'month':
        return totalRevenue * 4.3; // Approximate monthly
      default:
        return totalRevenue;
    }
  };

  const dashboardStats = [
    {
      title: "Total Users",
      value: adminData?.totalCount || 1750,
      icon: <MdPeople className="text-xl text-blue-500" />,
      change: "+12%",
      changeColor: "text-green-500"
    },
    {
      title: "Active Users",
      value: 1280,
      icon: <MdTrendingUp className="text-xl text-green-500" />,
      change: "+8%",
      changeColor: "text-green-500"
    },
    {
      title: "Premium Users",
      value: adminData?.premiumUsers || 438,
      icon: <MdCardMembership className="text-xl text-purple-600" />,
      change: "+15%",
      changeColor: "text-green-500"
    },
    {
      title: "Total Revenue",
      value: `$${getRevenueByPeriod().toLocaleString()}`,
      icon: <MdAttachMoney className="text-xl text-green-600" />,
      change: "+23%",
      changeColor: "text-green-500"
    },
    {
      title: "Smart Suggestions",
      value: "1,247",
      icon: <MdBolt className="text-xl text-yellow-500" />,
      change: "+5%",
      changeColor: "text-green-500"
    }
  ];

  const filterOptions = [
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
  ];

  return (
    <div className="p-6 bg-[#E8F6F3] min-h-screen">
      {/* Header with Filter */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold" style={{ color: '#2D3142' }}>
          Admin Dashboard
        </h1>
        
        {/* Filter Dropdown */}
        <div className="relative">
          <select
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#00C896] focus:border-transparent"
            style={{ color: '#2D3142' }}
          >
            {filterOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <MdFilterList className="absolute right-2 top-2.5 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Enhanced Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        {dashboardStats.map((stat, idx) => (
          <div
            key={idx}
            className="shadow-sm rounded-xl p-5 hover:shadow-md transition"
            style={{ background: '#FFFFFF' }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="p-3 rounded-full" style={{ background: '#00C8961A' }}>
                {stat.icon}
              </div>
              <span className={`text-xs font-medium ${stat.changeColor}`}>
                {stat.change}
              </span>
            </div>
            <div>
              <h4 className="text-sm mb-1" style={{ color: '#2D3142' }}>
                {stat.title}
              </h4>
              <p className="text-xl font-bold" style={{ color: '#2D3142' }}>
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* User Analytics Chart - WEEKLY ONLY */}
        <div className="shadow-sm rounded-xl p-6" style={{ background: '#FFFFFF' }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold" style={{ color: '#2D3142' }}>
              Weekly User Analytics
            </h2>
            <span className="text-sm px-3 py-1 rounded-full" style={{ background: '#00C8961A', color: '#2D3142' }}>
              August 2025
            </span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={weeklyUserData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="week" 
                stroke="#2D3142" 
                tick={{ fontSize: 12 }}
                interval={0}
              />
              <YAxis stroke="#2D3142" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px'
                }}
                labelFormatter={(label, payload) => {
                  const data = weeklyUserData.find(item => item.week === label);
                  return `${label} (${data?.period})`;
                }}
                formatter={(value, name) => [
                  value.toLocaleString(), 
                  name === 'totalUsers' ? 'Total Users' : 'Active Users'
                ]}
              />
              <Line 
                type="monotone" 
                dataKey="totalUsers" 
                stroke="#00C896" 
                strokeWidth={3}
                dot={{ fill: '#00C896', strokeWidth: 2, r: 6 }}
                name="totalUsers"
              />
              <Line 
                type="monotone" 
                dataKey="activeUsers" 
                stroke="#FFD93D" 
                strokeWidth={3}
                dot={{ fill: '#FFD93D', strokeWidth: 2, r: 6 }}
                name="activeUsers"
              />
            </LineChart>
          </ResponsiveContainer>
          
          {/* Week Details */}
          <div className="mt-4 grid grid-cols-4 gap-2">
            {weeklyUserData.map((weekData, index) => (
              <div key={index} className="text-center p-2 rounded-lg" style={{ background: '#F8F9FA' }}>
                <div className="text-xs font-medium" style={{ color: '#2D3142' }}>
                  {weekData.week}
                </div>
                <div className="text-xs text-gray-500">
                  {weekData.period}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Chart - DAILY BASIS */}
        <div className="shadow-sm rounded-xl p-6" style={{ background: '#FFFFFF' }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold" style={{ color: '#2D3142' }}>
              Daily Revenue Analytics
            </h2>
            <span className="text-sm px-3 py-1 rounded-full" style={{ background: '#FFD93D', color: '#2D3142' }}>
              {filterOptions.find(opt => opt.value === filterPeriod)?.label}
            </span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyRevenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="day" 
                stroke="#2D3142"
                tick={{ fontSize: 12 }}
              />
              <YAxis stroke="#2D3142" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px'
                }}
                formatter={(value) => [`$${value.toLocaleString()}`, 'Revenue']}
              />
              <Bar 
                dataKey="revenue" 
                fill="#00C896" 
                radius={[6, 6, 0, 0]}
                name="Revenue"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Distribution Pie Chart */}
        <div className="shadow-sm rounded-xl p-6" style={{ background: '#FFFFFF' }}>
          <h2 className="text-lg font-semibold mb-4" style={{ color: '#2D3142' }}>
            User Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userTypeData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {userTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Smart Suggestions Usage - DAILY BASIS */}
        <div className="shadow-sm rounded-xl p-6" style={{ background: '#FFFFFF' }}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold" style={{ color: '#2D3142' }}>
              Daily Smart Suggestions Usage
            </h2>
            <span className="text-sm px-3 py-1 rounded-full" style={{ background: '#FFD93D', color: '#2D3142' }}>
              {filterOptions.find(opt => opt.value === filterPeriod)?.label}
            </span>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailySuggestionsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#2D3142" />
              <YAxis stroke="#2D3142" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#ffffff',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px'
                }}
                formatter={(value) => [value.toLocaleString(), 'Suggestions']}
              />
              <Bar 
                dataKey="suggestions" 
                fill="#FFD93D" 
                radius={[4, 4, 0, 0]}
                name="Suggestions"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
