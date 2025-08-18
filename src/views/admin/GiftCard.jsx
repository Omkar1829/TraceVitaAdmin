import React, { useState, useRef } from 'react';
import { MdCardGiftcard, MdCheckCircle, MdAccessTime, MdPauseCircleFilled, MdHighlightOff } from "react-icons/md";

const getStatus = (card) => {
  const today = new Date().toISOString().slice(0, 10);
  if (card.isClosed) return 'closed';
  if (card.usedBy) return 'used';
  if (today >= card.startDate && today <= card.endDate) return 'live';
  if (today < card.startDate) return 'upcoming';
  return 'active';
};

const statusColors = {
  used:    "bg-green-700 text-white",
  active:  "bg-blue-700 text-white",
  live:    "bg-yellow-600 text-black",
  closed:  "bg-gray-300 text-gray-700",
  upcoming: "bg-purple-700 text-white"
};

const statusLabels = {
  used: "USED",
  active: "ACTIVE",
  live: "LIVE",
  closed: "CLOSED",
  upcoming: "UPCOMING"
};

const initialGiftCards = [
  {
    id: 1,
    image: null,
    imagePreview: null,
    code: "SUMMER2025",
    startDate: "2025-08-10",
    endDate: "2025-08-31",
    usedBy: "User01",
    isClosed: false
  },
  {
    id: 2,
    image: null,
    imagePreview: null,
    code: "WELCOME500",
    startDate: "2025-08-01",
    endDate: "2025-08-25",
    usedBy: null,
    isClosed: false
  },
  {
    id: 3,
    image: null,
    imagePreview: null,
    code: "FEST2025",
    startDate: "2025-08-05",
    endDate: "2025-08-29",
    usedBy: null,
    isClosed: true
  },
];

const GiftCard = () => {
  const [giftCards, setGiftCards] = useState(initialGiftCards);
  const [form, setForm] = useState({
    image: null,
    imagePreview: null,
    code: "",
    startDate: "",
    endDate: ""
  });
  const fileRef = useRef();

  // Dashboard calculations
  const total = giftCards.length;
  const used = giftCards.filter(card => card.usedBy).length;
  const closed = giftCards.filter(card => card.isClosed).length;
  const live = giftCards.filter(card => getStatus(card) === 'live').length;
  const active = giftCards.filter(card => getStatus(card) === 'active').length;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm(f => ({ ...f, image: file, imagePreview: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.code || !form.startDate || !form.endDate) return;
    setGiftCards(prev => [
      {
        id: prev.length + 1,
        image: form.image,
        imagePreview: form.imagePreview,
        code: form.code,
        startDate: form.startDate,
        endDate: form.endDate,
        usedBy: null,
        isClosed: false
      },
      ...prev
    ]);
    setForm({ image: null, imagePreview: null, code: "", startDate: "", endDate: "" });
    if (fileRef.current) fileRef.current.value = '';
  };

  const handleClose = (id) => {
    setGiftCards(prev =>
      prev.map(card =>
        card.id === id ? { ...card, isClosed: true } : card
      )
    );
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Mini Dashboard */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-6 mb-12">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <MdCardGiftcard size={40} className="text-indigo-500 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-800">{total}</div>
            <div className="text-sm text-gray-600 font-medium">Total Gift Cards</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <MdCheckCircle size={40} className="text-green-500 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-800">{used}</div>
            <div className="text-sm text-gray-600 font-medium">Used by Users</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <MdAccessTime size={40} className="text-yellow-500 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-800">{live}</div>
            <div className="text-sm text-gray-600 font-medium">Live Cards</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <MdPauseCircleFilled size={40} className="text-blue-500 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-800">{active}</div>
            <div className="text-sm text-gray-600 font-medium">Active Cards</div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <MdHighlightOff size={40} className="text-gray-400 mx-auto mb-3" />
            <div className="text-3xl font-bold text-gray-800">{closed}</div>
            <div className="text-sm text-gray-600 font-medium">Closed Cards</div>
          </div>
        </div>

        {/* Add Gift Card Form */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Add New Gift Card</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gift Card Code</label>
                <input
                  type="text"
                  name="code"
                  value={form.code}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter gift card code (e.g., GIFT2025)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Valid From</label>
                  <input
                    type="date"
                    name="startDate"
                    value={form.startDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Valid Until</label>
                  <input
                    type="date"
                    name="endDate"
                    value={form.endDate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center">
              <label className="block text-sm font-medium text-gray-700 mb-4">Upload Gift Card Image</label>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="mb-4 text-sm"
              />
              {form.imagePreview ? (
                <img
                  src={form.imagePreview}
                  alt="Preview"
                  className="w-64 h-40 object-cover rounded-lg shadow-lg border"
                />
              ) : (
                <div className="w-64 h-40 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-400">
                  <span className="text-gray-500 text-sm">Preview will appear here</span>
                </div>
              )}
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-lg transition duration-300 shadow-lg"
              >
                Add Gift Card
              </button>
            </div>
          </form>
        </div>

        {/* Gift Cards Display - ATM Card Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {giftCards.map(card => {
            const status = getStatus(card);
            const cardBg = card.imagePreview 
              ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${card.imagePreview})`
              : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
            
            return (
              <div
                key={card.id}
                className="relative w-full h-56 rounded-2xl shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl"
                style={{
                  background: cardBg,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
              >
                {/* Card Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                  {/* Top Section */}
                  <div className="flex justify-between items-start">
                    <div>
                      <MdCardGiftcard size={32} className="text-white/90 mb-2" />
                      <h3 className="text-lg font-bold tracking-wider drop-shadow-lg">
                        GIFT CARD
                      </h3>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[status]} shadow-lg`}>
                      {statusLabels[status]}
                    </span>
                  </div>

                  {/* Bottom Section - ATM Card Style */}
                  <div className="space-y-1">
                    <div className="text-xl font-mono tracking-[0.3em] font-bold drop-shadow-lg">
                      {card.code}
                    </div>
                    <div className="text-sm opacity-90 font-medium">
                      EXPIRES: {new Date(card.endDate).toLocaleDateString('en-US', { 
                        month: '2-digit', 
                        year: '2-digit' 
                      })}
                    </div>
                    {card.usedBy && (
                      <div className="text-xs opacity-80">
                        Used by: {card.usedBy}
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                {!card.isClosed && (
                  <button
                    onClick={() => handleClose(card.id)}
                    className="absolute top-3 right-3 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full opacity-80 hover:opacity-100 transition-all duration-200 shadow-lg"
                    title="Close Card"
                  >
                    <MdHighlightOff size={16} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GiftCard;