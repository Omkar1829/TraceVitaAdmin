import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  MdPeople,
  MdCardMembership,
  MdRestaurant,
  MdBolt,
  MdShowChart,
  MdLibraryBooks,
} from "react-icons/md";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";



const weeklyData = [
  { day: "Mon", value: 10 },
  { day: "Tue", value: 14 },
  { day: "Wed", value: 7 },
  { day: "Thu", value: 16 },
  { day: "Fri", value: 12 },
  { day: "Sat", value: 8 },
  { day: "Sun", value: 18 },
];



const Dashboard = () => {

  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  console.log("admindata:", adminData);
  const staticToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXVpZCI6IjJmNTY5ZjdkLTg0ODYtNDhiYS1iZTAzLTFiODQ4ODE4ZjQ2MiIsImVtYWlsIjoib21rYXJrYWxlNjg4QGdtYWlsLmNvbSIsInN0ZXAiOjAsImlhdCI6MTc1NDUwODE3NywiZXhwIjoxNzU0NTA5OTc3fQ.CoxUzkjpZt62rRIYNaMhCkxN3pIN4x2_sUaEMwrWmHg'
  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/user/getAdmin/1', {
          headers: {
            Authorization: `Bearer ${staticToken}`
          }
        }); // using static user Id
        setAdminData(response.data.data);

      } catch (err) {
        console.error('Error fetching admin data:', err);
        setError('Failed to fetch admin data.');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData(); // Trigger on component mount
  }, []); // Empty dependency array = run once on mount

  const dashboardStats = [
    {
      title: "Total Users",
      value: adminData?.totalCount || 0,
      icon: <MdPeople className="text-xl text-blue-500" />,
    },
    {
      title: "Premium Users",
      value: adminData?.totalCount || 0,
      icon: <MdCardMembership className="text-xl text-purple-600" />,
    },
    // {
    //   title: "Recipes Uploaded",
    //   value: adminData?.foodLogCount || 0,
    //   icon: <MdRestaurant className="text-xl text-orange-400" />,
    // },
    {
      title: "Smart Suggestions",
      value: "0",
      icon: <MdBolt className="text-xl text-yellow-500" />,
    }

  ];

  return (
    <div className="p-6 bg-[#E8F6F3] min-h-screen">
      <h1 className="text-2xl font-bold mb-6" style={{ color: '#2D3142' }}>Admin Overview</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {dashboardStats.map((stat, idx) => (
          <div
            key={idx}
            className="shadow-sm rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition"
            style={{ background: '#FFFFFF' }}
          >
            <div className="p-3 rounded-full" style={{ background: '#00C8961A' }}>{stat.icon}</div>
            <div>
              <h4 className="text-sm" style={{ color: '#2D3142' }}>{stat.title}</h4>
              <p className="text-lg font-semibold" style={{ color: '#2D3142' }}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="shadow-sm rounded-xl p-6" style={{ background: '#FFFFFF' }}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold" style={{ color: '#2D3142' }}>
            Weekly Smart Suggestions Cost
          </h2>
          <span className="text-sm px-3 py-1 rounded-full" style={{ background: '#FFD93D', color: '#2D3142' }}>
            This Week
          </span>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={adminData?.weeklyLogs}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" stroke="#2D3142" />
            <YAxis stroke="#2D3142" />
            <Tooltip />
            <Bar dataKey="value" fill="#00C896" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
