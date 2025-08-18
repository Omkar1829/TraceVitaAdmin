import React, { useState } from 'react';
import {
  MdOpenInNew, MdOutlineReplay, MdPause, MdClose, MdPlayArrow,
  MdSupport, MdTrendingUp, MdAccessTime, MdCheckCircle
} from "react-icons/md";
import { TbListDetails } from "react-icons/tb";

const STATUS_COLORS = {
  open: 'bg-green-100 text-green-700',
  closed: 'bg-gray-200 text-gray-500',
  hold: 'bg-yellow-100 text-yellow-700',
  ongoing: 'bg-blue-100 text-blue-800',
  reopened: 'bg-red-100 text-red-600'
};

const TICKET_STATUS = [
  { name: 'All', slug: 'all' },
  { name: 'Open', slug: 'open' },
  { name: 'Ongoing', slug: 'ongoing' },
  { name: 'Hold', slug: 'hold' },
  { name: 'Closed', slug: 'closed' },
  { name: 'Reopened', slug: 'reopened' }
];

const mockTickets = [
  {
    id: 1,
    subject: "Unable to login",
    user: "Rohit Patel",
    date: "2025-08-16",
    status: "open",
    description: "User cannot log into account, password reset not working.",
    lastUpdated: "2025-08-18",
  },
  {
    id: 2,
    subject: "Bug in analytics dashboard",
    user: "Ayesha Khan",
    date: "2025-08-15",
    status: "ongoing",
    description: "Charts not loading after yesterday's deploy.",
    lastUpdated: "2025-08-17",
  },
  {
    id: 3,
    subject: "Feature Request: Export to CSV",
    user: "Akash Dey",
    date: "2025-08-14",
    status: "hold",
    description: "Customer requested CSV export for all dashboard tables.",
    lastUpdated: "2025-08-16",
  },
  {
    id: 4,
    subject: "Payment failed error",
    user: "Sunita Prasad",
    date: "2025-08-13",
    status: "closed",
    description: "Payment error with credit card, error code 502.",
    lastUpdated: "2025-08-14",
  },
  {
    id: 5,
    subject: "App keeps crashing",
    user: "Johnny Singh",
    date: "2025-08-12",
    status: "reopened",
    description: "App closed suddenly, after update. Still unresolved.",
    lastUpdated: "2025-08-18",
  }
];

const Support = () => {
  const [tickets, setTickets] = useState(mockTickets);
  const [selectedTab, setSelectedTab] = useState('all');
  const [selectedTicketId, setSelectedTicketId] = useState(null);

  const handleChangeStatus = (id, newStatus) => {
    setTickets(prev =>
      prev.map(ticket =>
        ticket.id === id
          ? { ...ticket,
              status: newStatus,
              lastUpdated: new Date().toISOString().slice(0, 10)
            }
          : ticket
      )
    );
    setSelectedTicketId(id);
  };

  const filteredTickets =
    selectedTab === 'all'
      ? tickets
      : tickets.filter(t => t.status === selectedTab);

  const selectedTicket =
    tickets.find(t => t.id === selectedTicketId) || null;

  // Calculate dashboard stats
  const dashboardStats = {
    totalTickets: tickets.length,
    openTickets: tickets.filter(t => ['open', 'ongoing', 'reopened'].includes(t.status)).length,
    closedTickets: tickets.filter(t => t.status === 'closed').length,
    averageResponseTime: '2.5 hrs', // This would be calculated from actual data
    urgentTickets: tickets.filter(t => t.status === 'reopened' || (t.status === 'open' && new Date(t.date) < new Date(Date.now() - 2*24*60*60*1000))).length
  };

  const StatCard = ({ icon: Icon, title, value, color, subtitle }) => (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 hover:shadow-lg transition-shadow" style={{ borderLeftColor: color }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Support Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage and track customer support tickets</p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={MdSupport}
            title="Total Tickets"
            value={dashboardStats.totalTickets}
            color="#6366F1"
            subtitle="All time"
          />
          <StatCard
            icon={MdTrendingUp}
            title="Open Tickets"
            value={dashboardStats.openTickets}
            color="#EF4444"
            subtitle="Needs attention"
          />
          <StatCard
            icon={MdCheckCircle}
            title="Resolved Tickets"
            value={dashboardStats.closedTickets}
            color="#10B981"
            subtitle="Successfully closed"
          />
          <StatCard
            icon={MdAccessTime}
            title="Avg Response Time"
            value={dashboardStats.averageResponseTime}
            color="#F59E0B"
            subtitle="Last 30 days"
          />
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Urgent Tickets</p>
                <p className="text-xl font-bold text-red-600">{dashboardStats.urgentTickets}</p>
              </div>
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">On Hold</p>
                <p className="text-xl font-bold text-yellow-600">{tickets.filter(t => t.status === 'hold').length}</p>
              </div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">In Progress</p>
                <p className="text-xl font-bold text-blue-600">{tickets.filter(t => t.status === 'ongoing').length}</p>
              </div>
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Support Tickets Section */}
        <div className="bg-white rounded-xl shadow-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <TbListDetails className="text-indigo-500" size={28} />
            <h2 className="text-2xl font-bold text-gray-900">Support Tickets</h2>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar: Tabs */}
            <div className="w-full lg:w-48 border-b lg:border-b-0 lg:border-r border-gray-200 pr-0 lg:pr-4">
              <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0">
                {TICKET_STATUS.map(status => (
                  <button
                    key={status.slug}
                    onClick={() => {
                      setSelectedTab(status.slug);
                      setSelectedTicketId(null);
                    }}
                    className={`px-4 py-2 rounded-md font-medium transition-colors flex items-center whitespace-nowrap
                      ${selectedTab === status.slug
                        ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow'
                        : 'hover:bg-gray-100 text-gray-600'}
                    `}
                  >
                    {status.name}
                    <span className="ml-2 text-xs bg-white bg-opacity-20 px-2 py-1 rounded-full">
                      {status.slug === 'all' ? tickets.length : tickets.filter(t => t.status === status.slug).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Main: List or Details */}
            <div className="flex-1 overflow-auto">
              {selectedTicket ? (
                <div className="bg-gray-50 rounded-lg p-6 shadow relative">
                  <button
                    onClick={() => setSelectedTicketId(null)}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-700"
                    title="Go back"
                  >
                    <MdClose size={22} />
                  </button>
                  <h3 className="text-2xl font-bold mb-2">{selectedTicket.subject}</h3>
                  <div className="flex flex-wrap gap-4 items-center mb-3">
                    <div className={`px-2 py-1 rounded text-xs font-semibold ${STATUS_COLORS[selectedTicket.status]}`}>
                      {selectedTicket.status.charAt(0).toUpperCase() + selectedTicket.status.slice(1)}
                    </div>
                    <span className="text-gray-500 text-xs">From: {selectedTicket.user}</span>
                    <span className="text-gray-400 text-xs">Created: {selectedTicket.date}</span>
                    <span className="text-gray-400 text-xs">Updated: {selectedTicket.lastUpdated}</span>
                  </div>
                  <div className="mb-4 text-gray-700">{selectedTicket.description}</div>
                  {/* Detail Actions */}
                  <div className="flex gap-2 flex-wrap">
                    {selectedTicket.status !== 'closed' && (
                      <button
                        onClick={() => handleChangeStatus(selectedTicket.id, 'closed')}
                        className="px-3 py-1 bg-gray-700 text-white rounded flex items-center gap-1 hover:bg-gray-800"
                      >
                        <MdClose /> Close
                      </button>
                    )}
                    {selectedTicket.status !== 'ongoing' && selectedTicket.status !== 'closed' && (
                      <button
                        onClick={() => handleChangeStatus(selectedTicket.id, 'ongoing')}
                        className="px-3 py-1 bg-blue-700 text-white rounded flex items-center gap-1 hover:bg-blue-800"
                      >
                        <MdPlayArrow /> Mark Ongoing
                      </button>
                    )}
                    {selectedTicket.status !== 'hold' && selectedTicket.status !== 'closed' && (
                      <button
                        onClick={() => handleChangeStatus(selectedTicket.id, 'hold')}
                        className="px-3 py-1 bg-yellow-500 text-white rounded flex items-center gap-1 hover:bg-yellow-600"
                      >
                        <MdPause /> Hold
                      </button>
                    )}
                    {selectedTicket.status === 'closed' && (
                      <button
                        onClick={() => handleChangeStatus(selectedTicket.id, 'reopened')}
                        className="px-3 py-1 bg-pink-700 text-white rounded flex items-center gap-1 hover:bg-pink-900"
                      >
                        <MdOutlineReplay /> Reopen
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    {TICKET_STATUS.find(s => s.slug === selectedTab)?.name || 'Tickets'} Tickets
                    <span className="text-sm font-normal text-gray-500">
                      ({filteredTickets.length} {filteredTickets.length === 1 ? 'ticket' : 'tickets'})
                    </span>
                  </h3>
                  {filteredTickets.length === 0 ? (
                    <div className="text-gray-400 mt-8 text-center py-12">
                      <MdSupport size={48} className="mx-auto mb-4 opacity-50" />
                      <p>No tickets for this status.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredTickets.map(ticket => (
                        <div key={ticket.id} className="bg-slate-50 rounded-lg shadow flex flex-col md:flex-row md:items-center md:justify-between p-4 hover:shadow-lg transition">
                          <div className="flex-1 cursor-pointer" onClick={() => setSelectedTicketId(ticket.id)}>
                            <div className="flex gap-2 items-center mb-1">
                              <span className={`px-2 py-1 rounded text-xs font-semibold ${STATUS_COLORS[ticket.status]}`}>
                                {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                              </span>
                              <span className="text-lg font-semibold">{ticket.subject}</span>
                            </div>
                            <div className="text-gray-500 text-sm mb-1">By {ticket.user} · {ticket.date}</div>
                            <div className="text-gray-700 text-sm truncate max-w-lg">{ticket.description}</div>
                          </div>
                          <div className="flex gap-2 items-center mt-3 md:mt-0">
                            <button
                              className="bg-indigo-500 hover:bg-indigo-600 text-white p-2 rounded transition"
                              onClick={() => setSelectedTicketId(ticket.id)}
                              title="View Details"
                            >
                              <MdOpenInNew size={20} />
                            </button>
                            {ticket.status !== 'closed' && (
                              <button
                                onClick={() => handleChangeStatus(ticket.id, 'closed')}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded"
                                title="Close Ticket"
                              >
                                <MdClose size={18} />
                              </button>
                            )}
                            {ticket.status === 'closed' && (
                              <button
                                onClick={() => handleChangeStatus(ticket.id, 'reopened')}
                                className="bg-pink-200 hover:bg-pink-400 text-pink-900 p-2 rounded"
                                title="Reopen"
                              >
                                <MdOutlineReplay size={18} />
                              </button>
                            )}
                            {(ticket.status === 'open' || ticket.status === 'hold' || ticket.status === 'reopened') && (
                              <button
                                onClick={() => handleChangeStatus(ticket.id, 'ongoing')}
                                className="bg-blue-200 hover:bg-blue-300 text-blue-700 p-2 rounded"
                                title="Set Ongoing"
                              >
                                <MdPlayArrow size={18} />
                              </button>
                            )}
                            {ticket.status === 'ongoing' && (
                              <button
                                onClick={() => handleChangeStatus(ticket.id, 'hold')}
                                className="bg-yellow-100 hover:bg-yellow-300 text-yellow-600 p-2 rounded"
                                title="Set Hold"
                              >
                                <MdPause size={18} />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
