import React, { useState, useEffect } from 'react';
import { 
  MdPeople, 
  MdAttachMoney, 
  MdTrendingUp, 
  MdAccountBalanceWallet,
  MdRefresh 
} from "react-icons/md";

const Referral = () => {
  const [referralData, setReferralData] = useState({
    totalReferrals: 0,
    totalMoneyGenerated: 0,
    totalMoneyUsed: 0,
    availableMoney: 0,
    users: []
  });

  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API calls
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setReferralData({
        totalReferrals: 245,
        totalMoneyGenerated: 12500,
        totalMoneyUsed: 8750,
        availableMoney: 3750,
        users: [
          { 
            id: 1, 
            name: "John Doe", 
            email: "john@example.com",
            availableMoney: 150,
            totalReferred: 12,
            joinedDate: "2024-01-15"
          },
          { 
            id: 2, 
            name: "Jane Smith", 
            email: "jane@example.com",
            availableMoney: 300,
            totalReferred: 25,
            joinedDate: "2024-02-20"
          },
          { 
            id: 3, 
            name: "Mike Johnson", 
            email: "mike@example.com",
            availableMoney: 75,
            totalReferred: 8,
            joinedDate: "2024-03-10"
          },
          { 
            id: 4, 
            name: "Sarah Wilson", 
            email: "sarah@example.com",
            availableMoney: 450,
            totalReferred: 35,
            joinedDate: "2024-01-05"
          },
          { 
            id: 5, 
            name: "David Brown", 
            email: "david@example.com",
            availableMoney: 220,
            totalReferred: 18,
            joinedDate: "2024-02-28"
          }
        ]
      });
      setLoading(false);
    }, 1000);
  }, []);

  const refreshData = () => {
    setLoading(true);
    // Simulate refresh - replace with actual API call
    setTimeout(() => setLoading(false), 500);
  };

  const StatCard = ({ icon: Icon, title, value, color, prefix = "", suffix = "" }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900">
            {prefix}{loading ? "..." : value.toLocaleString()}{suffix}
          </p>
        </div>
        <div className="p-3 rounded-full" style={{ backgroundColor: color + "20" }}>
          <Icon size={24} style={{ color }} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Referral Dashboard</h1>
            <p className="text-gray-600 mt-1">Monitor your referral program performance</p>
          </div>
          <button
            onClick={refreshData}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            disabled={loading}
          >
            <MdRefresh className={loading ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={MdPeople}
            title="Total Referrals"
            value={referralData.totalReferrals}
            color="#00C896"
          />
          <StatCard
            icon={MdTrendingUp}
            title="Money Generated"
            value={referralData.totalMoneyGenerated}
            color="#3B82F6"
            prefix="$"
          />
          <StatCard
            icon={MdAttachMoney}
            title="Money Used"
            value={referralData.totalMoneyUsed}
            color="#EF4444"
            prefix="$"
          />
          <StatCard
            icon={MdAccountBalanceWallet}
            title="Available Balance"
            value={referralData.availableMoney}
            color="#F59E0B"
            prefix="$"
          />
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">Users Referral Money</h2>
            <p className="text-gray-600 text-sm mt-1">All users with their available referral money</p>
          </div>
          
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="text-gray-500 mt-2">Loading users...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Referred
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Available Money
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Joined Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {referralData.users.map((user, index) => (
                    <tr key={user.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                              <span className="text-sm font-medium text-gray-700">
                                {user.name.charAt(0)}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          {user.totalReferred} referrals
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <span className="text-green-600 font-bold">${user.availableMoney}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(user.joinedDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          View Details
                        </button>
                        {/* <button className="text-green-600 hover:text-green-900">
                          Payout
                        </button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Summary Section */}
        <div className="mt-8 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600">Average per User</p>
              <p className="text-lg font-bold text-gray-900">
                ${referralData.users.length > 0 ? 
                  Math.round(referralData.users.reduce((sum, user) => sum + user.availableMoney, 0) / referralData.users.length) : 0}
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600">Top Earner</p>
              <p className="text-lg font-bold text-gray-900">
                ${referralData.users.length > 0 ? 
                  Math.max(...referralData.users.map(user => user.availableMoney)) : 0}
              </p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-gray-600">Active Users</p>
              <p className="text-lg font-bold text-gray-900">
                {referralData.users.filter(user => user.availableMoney > 0).length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Referral;
