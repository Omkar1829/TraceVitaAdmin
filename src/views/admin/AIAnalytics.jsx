import React, { useState, useMemo } from "react";
import {
  MdInsights,
  MdBolt,
  MdAccessTime,
  MdOutlineQueryStats,
} from "react-icons/md";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const rawUsageData = [
  { date: "2025-07-20", OpenAI: 1200, Groq: 800 },
  { date: "2025-07-21", OpenAI: 1400, Groq: 950 },
  { date: "2025-07-22", OpenAI: 1600, Groq: 1200 },
  { date: "2025-07-23", OpenAI: 2000, Groq: 1600 },
  { date: "2025-07-24", OpenAI: 1800, Groq: 1500 },
];

const recentLogs = [
  {
    id: 1,
    timestamp: "2025-07-24 14:03",
    model: "OpenAI",
    prompt: "Analyze vitamin B12 intake",
    status: "Success",
    tokens: 700,
  },
  {
    id: 2,
    timestamp: "2025-07-24 13:52",
    model: "Groq",
    prompt: "Detect iron-rich foods from image",
    status: "Success",
    tokens: 500,
  },
  {
    id: 3,
    timestamp: "2025-07-24 13:33",
    model: "OpenAI",
    prompt: "Predict micronutrient deficiency",
    status: "Fail",
    tokens: 850,
  },
];

const AIAnalytics = () => {
  const [modelFilter, setModelFilter] = useState("All");
  const [startDate, setStartDate] = useState("2025-07-20");
  const [endDate, setEndDate] = useState("2025-07-24");

  const filteredUsageData = useMemo(() => {
    return rawUsageData.filter(
      (item) => item.date >= startDate && item.date <= endDate
    );
  }, [startDate, endDate]);

  const totalTokens = useMemo(() => {
    return filteredUsageData.reduce(
      (sum, day) => {
        return {
          OpenAI: sum.OpenAI + day.OpenAI,
          Groq: sum.Groq + day.Groq,
        };
      },
      { OpenAI: 0, Groq: 0 }
    );
  }, [filteredUsageData]);

  const tokenCosts = {
    OpenAI: (totalTokens.OpenAI / 1000) * 0.002,
    Groq: (totalTokens.Groq / 1000) * 0.0015,
  };

  const filteredLogs = recentLogs.filter(
    (log) =>
      (modelFilter === "All" || log.model === modelFilter) &&
      log.timestamp >= startDate &&
      log.timestamp <= `${endDate} 23:59`
  );

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col lg:flex-row justify-between gap-4 items-start lg:items-center">
        <h1 className="text-2xl font-bold text-deepIndigo flex items-center gap-2">
          <MdInsights className="text-vitalGreen" /> AI Analytics
        </h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <select
            value={modelFilter}
            onChange={(e) => setModelFilter(e.target.value)}
            className="border rounded-md px-3 py-1 text-sm"
          >
            <option value="All">All Models</option>
            <option value="OpenAI">OpenAI</option>
            <option value="Groq">Groq</option>
          </select>
          <input
            type="date"
            value={startDate}
            max={endDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border rounded-md px-3 py-1 text-sm"
          />
          <input
            type="date"
            value={endDate}
            min={startDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border rounded-md px-3 py-1 text-sm"
          />
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card icon={<MdOutlineQueryStats />} label="OpenAI Token Cost" value={`$${tokenCosts.OpenAI.toFixed(4)}`} />
        <Card icon={<MdOutlineQueryStats />} label="Groq Token Cost" value={`$${tokenCosts.Groq.toFixed(4)}`} />
        <Card icon={<MdBolt />} label="Total Tokens" value={`${totalTokens.OpenAI + totalTokens.Groq}`} />
        <Card icon={<MdAccessTime />} label="Date Range" value={`${startDate} → ${endDate}`} />
      </div>

      {/* Line Chart */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold text-deepIndigo mb-4">Token Usage</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={filteredUsageData}>
            {(modelFilter === "All" || modelFilter === "OpenAI") && (
              <Line type="monotone" dataKey="OpenAI" stroke="#4F46E5" strokeWidth={2} />
            )}
            {(modelFilter === "All" || modelFilter === "Groq") && (
              <Line type="monotone" dataKey="Groq" stroke="#10B981" strokeWidth={2} />
            )}
            <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-lg font-semibold text-deepIndigo mb-4">Recent AI Logs</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100 text-gray-600">
              <tr>
                <th className="px-4 py-2">Time</th>
                <th className="px-4 py-2">Model</th>
                <th className="px-4 py-2">Prompt Summary</th>
                <th className="px-4 py-2">Tokens</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center text-gray-400 py-4">No matching logs found.</td>
                </tr>
              ) : (
                filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2">{log.timestamp}</td>
                    <td className="px-4 py-2">{log.model}</td>
                    <td className="px-4 py-2 truncate max-w-sm">{log.prompt}</td>
                    <td className="px-4 py-2">{log.tokens}</td>
                    <td
                      className={`px-4 py-2 font-medium ${
                        log.status === "Success" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {log.status}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Card Component
const Card = ({ icon, label, value }) => (
  <div className="bg-white rounded-2xl shadow-md p-5 flex items-center gap-4">
    <div className="text-vitalGreen text-3xl">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <h3 className="text-lg font-bold text-deepIndigo">{value}</h3>
    </div>
  </div>
);

export default AIAnalytics;
