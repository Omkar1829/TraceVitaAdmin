import React, { useState, useEffect } from "react";
import {
  MdOpenInNew,
  MdOutlineReplay,
  MdPause,
  MdClose,
  MdPlayArrow,
  MdSupport,
  MdTrendingUp,
  MdAccessTime,
  MdCheckCircle,
  MdPerson,
  MdEmail,
  MdPhone,
  MdDescription,
  MdSchedule,
  MdMoreVert,
} from "react-icons/md";

const STATUS_COLORS = {
  open: "bg-green-100 text-green-700 border-green-200",
  closed: "bg-gray-100 text-gray-600 border-gray-200",
  hold: "bg-yellow-100 text-yellow-700 border-yellow-200",
  ongoing: "bg-blue-100 text-blue-700 border-blue-200",
  reopened: "bg-red-100 text-red-600 border-red-200",
};

const TICKET_STATUS = [
  { name: "All", slug: "all" },
  { name: "Open", slug: "open" },
  { name: "Ongoing", slug: "ongoing" },
  { name: "Hold", slug: "hold" },
  { name: "Closed", slug: "closed" },
  { name: "Reopened", slug: "reopened" },
];

const Support = () => {
  const [tickets, setTickets] = useState([]);
  const [selectedTab, setSelectedTab] = useState("all");
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTicketDetails, setSelectedTicketDetails] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  // Fetch all tickets from API
  const fetchAllTickets = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/api/support/getAll");
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      setTickets(data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch tickets:", err);
      setError("Failed to load support tickets. Please try again.");
      setTickets([]);
    } finally {
      setLoading(false);
    }
  };

  // Fetch single ticket by ID
  const fetchTicketById = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/support/${id}`);
      if (!response.ok) throw new Error("Could not fetch ticket details");
      const data = await response.json();
      setSelectedTicketDetails(data);
      return data;
    } catch (err) {
      console.error("Failed to fetch ticket by id:", err);
      setError("Failed to fetch ticket details");
      return null;
    }
  };

  // Update ticket status via API
  const updateTicketStatus = async (id, newStatus) => {
    try {
      setUpdatingStatus(true);
      const response = await fetch(`http://localhost:3000/api/support/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update ticket");
      const result = await response.json();

      // Update local state
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.id === id
            ? {
                ...ticket,
                status: result.ticket.status,
                lastUpdated: result.ticket.lastUpdated,
              }
            : ticket
        )
      );

      // Update selected ticket details if it's the one being modified
      if (selectedTicketDetails && selectedTicketDetails.id === id) {
        setSelectedTicketDetails((prev) => ({
          ...prev,
          status: result.ticket.status,
          lastUpdated: result.ticket.lastUpdated,
        }));
      }

      return result.ticket;
    } catch (err) {
      console.error("Error updating ticket:", err);
      setError("Failed to update ticket status");
      return null;
    } finally {
      setUpdatingStatus(false);
    }
  };

  useEffect(() => {
    fetchAllTickets();
  }, []);

  // Handle ticket selection and fetch details
  const handleTicketClick = async (ticketId) => {
    setSelectedTicketId(ticketId);
    await fetchTicketById(ticketId);
  };

  const handleChangeStatus = async (id, newStatus) => {
    const updatedTicket = await updateTicketStatus(id, newStatus);
    if (updatedTicket) {
      // Refresh ticket details if it's the selected one
      if (selectedTicketId === id) {
        await fetchTicketById(id);
      }
    }
  };

  const filteredTickets = selectedTab === "all" 
    ? tickets 
    : tickets.filter((t) => t.status === selectedTab);

  // Calculate dashboard stats
  const dashboardStats = {
    totalTickets: tickets.length,
    openTickets: tickets.filter((t) =>
      ["open", "ongoing", "reopened"].includes(t.status)
    ).length,
    closedTickets: tickets.filter((t) => t.status === "closed").length,
    averageResponseTime: "2.5 hrs",
  };

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
            {title}
          </p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-xl ${color.replace('text-', 'bg-').replace('-500', '-100')}`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </div>
    </div>
  );

  const StatusBadge = ({ status }) => (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${STATUS_COLORS[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );

  // Status action buttons for modal
  const StatusActionButtons = ({ ticket }) => {
    const getAvailableActions = (currentStatus) => {
      const actions = [];
      
      if (currentStatus !== 'ongoing') {
        actions.push({ 
          status: 'ongoing', 
          icon: MdPlayArrow, 
          label: 'Start Work', 
          color: 'bg-blue-500 hover:bg-blue-600 focus:ring-blue-500' 
        });
      }
      if (currentStatus !== 'hold') {
        actions.push({ 
          status: 'hold', 
          icon: MdPause, 
          label: 'Put on Hold', 
          color: 'bg-yellow-500 hover:bg-yellow-600 focus:ring-yellow-500' 
        });
      }
      if (currentStatus !== 'closed') {
        actions.push({ 
          status: 'closed', 
          icon: MdCheckCircle, 
          label: 'Mark Closed', 
          color: 'bg-green-500 hover:bg-green-600 focus:ring-green-500' 
        });
      }
      if (currentStatus === 'closed') {
        actions.push({ 
          status: 'reopened', 
          icon: MdOutlineReplay, 
          label: 'Reopen', 
          color: 'bg-red-500 hover:bg-red-600 focus:ring-red-500' 
        });
      }
      
      return actions;
    };

    const actions = getAvailableActions(ticket.status);

    return (
      <div className="flex flex-col sm:flex-row gap-3">
        {actions.map((action) => (
          <button
            key={action.status}
            onClick={() => handleChangeStatus(ticket.id, action.status)}
            disabled={updatingStatus}
            className={`flex items-center justify-center gap-2 px-6 py-3 text-white text-sm font-semibold rounded-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-opacity-50 ${action.color} ${
              updatingStatus ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg transform hover:scale-105 active:scale-95'
            }`}
          >
            <action.icon className="h-4 w-4" />
            {action.label}
          </button>
        ))}
        {updatingStatus && (
          <div className="flex items-center justify-center gap-2 px-6 py-3 text-blue-600 text-sm font-semibold">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-500 border-t-transparent"></div>
            Updating...
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile-First Header */}
      {/* <div className="bg-white shadow-sm border-b border-gray-100 px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Support Center</h1>
            <p className="text-sm text-gray-600 mt-1">Manage customer support tickets</p>
          </div>
          <div className="p-3 bg-blue-100 rounded-xl">
            <MdSupport className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      </div> */}

      {/* Enhanced Stats Cards */}
      <div className="p-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={MdSupport}
          title="Total"
          value={dashboardStats.totalTickets}
          color="text-blue-500"
        />
        <StatCard
          icon={MdTrendingUp}
          title="Active"
          value={dashboardStats.openTickets}
          color="text-green-500"
        />
        <StatCard
          icon={MdCheckCircle}
          title="Closed"
          value={dashboardStats.closedTickets}
          color="text-gray-500"
        />
        <StatCard
          icon={MdAccessTime}
          title="Response"
          value={dashboardStats.averageResponseTime}
          color="text-orange-500"
        />
      </div>

      {/* Enhanced Status Filter Tabs */}
      <div className="mx-4 mb-4 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex overflow-x-auto">
          {TICKET_STATUS.map((status, index) => (
            <button
              key={status.slug}
              onClick={() => setSelectedTab(status.slug)}
              className={`flex-shrink-0 px-6 py-4 text-sm font-semibold whitespace-nowrap transition-all duration-200 relative ${
                selectedTab === status.slug
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {selectedTab === status.slug && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full"></div>
              )}
              {status.name}
              {status.slug !== 'all' && (
                <span className={`ml-2 px-2 py-1 rounded-full text-xs font-bold ${
                  selectedTab === status.slug ? 'bg-blue-200 text-blue-700' : 'bg-gray-100 text-gray-500'
                }`}>
                  {tickets.filter(t => t.status === status.slug).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Enhanced Tickets List */}
      <div className="px-4 pb-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 bg-white rounded-2xl border border-gray-100">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-sm font-medium text-gray-600">Loading tickets...</p>
          </div>
        ) : error ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-red-100 shadow-sm">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MdClose className="h-8 w-8 text-red-500" />
            </div>
            <p className="text-red-600 text-sm mb-4 font-medium">{error}</p>
            <button
              onClick={fetchAllTickets}
              className="px-6 py-3 bg-blue-500 text-white text-sm font-semibold rounded-xl hover:bg-blue-600 transition-colors focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Try Again
            </button>
          </div>
        ) : filteredTickets.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MdSupport className="h-10 w-10 text-gray-400" />
            </div>
            <p className="text-gray-500 text-sm font-medium">No tickets found for this status</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer overflow-hidden"
                onClick={() => handleTicketClick(ticket.id)}
              >
                <div className="p-6">
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex flex-col items-start gap-3">
                      <div className="w-100 h-10 p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                        <span className="text-white font-bold text-sm">
                          #{ticket.id}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{ticket.user}</h3>
                        <StatusBadge status={ticket.status} />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <MdMoreVert className="h-5 w-5" />
                      </button>
                      <MdOpenInNew className="h-5 w-5 text-blue-500" />
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="mb-4">
                    <p className="text-gray-700 line-clamp-2 text-sm leading-relaxed">
                      {ticket.description}
                    </p>
                  </div>

                  {/* Card Footer */}
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-4 text-gray-500">
                      <div className="flex items-center gap-1">
                        <MdSchedule className="h-4 w-4" />
                        <span>Created: {new Date(ticket.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MdAccessTime className="h-4 w-4" />
                        <span>Updated: {new Date(ticket.lastUpdated).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Mobile-Optimized Full Screen Modal */}
      {selectedTicketId && selectedTicketDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center sm:justify-center">
          <div className="bg-white w-full h-full sm:h-auto sm:max-w-2xl sm:max-h-[90vh] sm:rounded-2xl sm:shadow-2xl overflow-hidden">
            {/* Modal Header - Sticky */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 sticky top-0 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    <span className="text-white font-bold">
                      #{selectedTicketDetails.id}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">Support Ticket</h2>
                    <p className="text-blue-100 text-sm">
                      {selectedTicketDetails.user}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedTicketId(null);
                    setSelectedTicketDetails(null);
                  }}
                  className="text-white hover:bg-white/20 p-2 rounded-xl transition-colors"
                >
                  <MdClose className="h-6 w-6" />
                </button>
              </div>
              <div className="mt-4">
                <StatusBadge status={selectedTicketDetails.status} />
              </div>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="overflow-y-auto flex-1 p-6 space-y-6">
              {/* Customer Info Card */}
              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MdPerson className="h-5 w-5 text-blue-500" />
                  Customer Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <MdPerson className="h-5 w-5 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase">Name</p>
                      <p className="font-semibold text-gray-900">{selectedTicketDetails.user}</p>
                    </div>
                  </div>
                  
                  {selectedTicketDetails.email && (
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                        <MdEmail className="h-5 w-5 text-green-500" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase">Email</p>
                        <p className="font-semibold text-gray-900 text-sm">{selectedTicketDetails.email}</p>
                      </div>
                    </div>
                  )}
                  
                  {selectedTicketDetails.contact && (
                    <div className="flex items-center gap-3 sm:col-span-2">
                      <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                        <MdPhone className="h-5 w-5 text-purple-500" />
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase">Contact</p>
                        <p className="font-semibold text-gray-900">{selectedTicketDetails.contact}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Issue Description Card */}
              <div className="bg-amber-50 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MdDescription className="h-5 w-5 text-amber-500" />
                  Issue Description
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {selectedTicketDetails.description}
                </p>
              </div>

              {/* Timeline Card */}
              <div className="bg-green-50 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MdSchedule className="h-5 w-5 text-green-500" />
                  Timeline
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="flex justify-between w-full">
                      <span className="text-sm font-medium text-gray-900">Created</span>
                      <span className="text-sm text-gray-600">{selectedTicketDetails.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <div className="flex justify-between w-full">
                      <span className="text-sm font-medium text-gray-900">Last Updated</span>
                      <span className="text-sm text-gray-600">{selectedTicketDetails.lastUpdated}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="bg-white border-2 border-gray-100 rounded-2xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
                <StatusActionButtons ticket={selectedTicketDetails} />
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Support;
