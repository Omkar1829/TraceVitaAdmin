import React from "react";

const SubscriptionPlans = () => {
  return (
    <div className="p-6 bg-[#E8F6F3] min-h-screen">
      <h1 className="text-2xl font-bold mb-6" style={{ color: '#2D3142' }}>Subscription Plans</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {/* Example Plan Card */}
        <div className="rounded-2xl shadow-xl p-6" style={{ background: '#FFFFFF' }}>
          <h2 className="text-lg font-semibold mb-2" style={{ color: '#2D3142' }}>Premium</h2>
          <p className="text-sm mb-4" style={{ color: '#2D3142' }}>Access all features, priority support, and exclusive content.</p>
          <button className="px-6 py-2 rounded-xl font-semibold" style={{ background: '#00C896', color: '#FFFFFF' }}>
            Subscribe
          </button>
        </div>
        {/* ...add more plans as needed... */}
      </div>
    </div>
  );
};

export default SubscriptionPlans;
