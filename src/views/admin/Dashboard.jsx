import React from "react";
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

const dashboardStats = [
  {
    title: "Total Users",
    value: "1,820",
    icon: <MdPeople className="text-xl text-blue-500" />,
  },
  {
    title: "Premium Users",
    value: "326",
    icon: <MdCardMembership className="text-xl text-purple-600" />,
  },
  {
    title: "Recipes Uploaded",
    value: "94",
    icon: <MdRestaurant className="text-xl text-orange-400" />,
  },
  {
    title: "AI Suggestions",
    value: "113 Today",
    icon: <MdBolt className="text-xl text-yellow-500" />,
  },
  {
    title: "Deficiencies Detected",
    value: "62",
    icon: <MdShowChart className="text-xl text-red-500" />,
  },
  {
    title: "Education Cards",
    value: "37",
    icon: <MdLibraryBooks className="text-xl text-green-600" />,
  },
];

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
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Admin Overview</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {dashboardStats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white shadow-sm rounded-xl p-5 flex items-center gap-4 hover:shadow-md transition"
          >
            <div className="p-3 bg-gray-100 rounded-full">{stat.icon}</div>
            <div>
              <h4 className="text-sm text-gray-500">{stat.title}</h4>
              <p className="text-lg font-semibold text-gray-800">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="bg-white shadow-sm rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            Weekly AI Suggestions Triggered
          </h2>
          <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
            This Week
          </span>
        </div>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={weeklyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#4F46E5" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;
