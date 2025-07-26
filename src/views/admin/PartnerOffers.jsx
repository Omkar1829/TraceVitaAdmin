import React, { useState } from "react";
import {
  MdOpenInNew,
  MdEdit,
  MdDelete,
  MdAdd,
  MdClose,
} from "react-icons/md";

const defaultOffer = {
  id: null,
  name: "",
  description: "",
  image: "",
  link: "",
};

const PartnerOffers = () => {
  const [offers, setOffers] = useState([
    {
      id: 1,
      name: "NutriBox Supplements",
      description:
        "Get 20% off on clean, vegan supplements curated for your micronutrient goals.",
      image: "https://via.placeholder.com/80x80.png?text=NutriBox",
      link: "https://nutribox.example.com",
    },
    {
      id: 2,
      name: "FitFlex Pro Subscription",
      description:
        "Enjoy 30% off premium workout plans tailored to your body type and diet.",
      image: "https://via.placeholder.com/80x80.png?text=FitFlex",
      link: "https://fitflex.example.com",
    },
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(defaultOffer);

  const openAddModal = () => {
    setFormData(defaultOffer);
    setEditing(false);
    setModalOpen(true);
  };

  const openEditModal = (offer) => {
    setFormData(offer);
    setEditing(true);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editing) {
      setOffers((prev) =>
        prev.map((o) => (o.id === formData.id ? formData : o))
      );
    } else {
      setOffers((prev) => [
        ...prev,
        { ...formData, id: Date.now() },
      ]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this offer?")) {
      setOffers((prev) => prev.filter((o) => o.id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-deepIndigo">Partner Offers</h1>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-vitalGreen text-white px-4 py-2 rounded-lg hover:bg-emerald-600"
        >
          <MdAdd /> Add Offer
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {offers.map((offer) => (
          <div
            key={offer.id}
            className="bg-white p-5 rounded-2xl shadow-lg relative hover:shadow-xl"
          >
            <div className="absolute top-3 right-3 flex gap-2">
              <button
                onClick={() => openEditModal(offer)}
                className="text-yellow-600 hover:text-yellow-800"
              >
                <MdEdit />
              </button>
              <button
                onClick={() => handleDelete(offer.id)}
                className="text-red-600 hover:text-red-800"
              >
                <MdDelete />
              </button>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <img
                src={offer.image}
                alt={offer.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <h2 className="text-lg font-semibold text-deepIndigo">
                {offer.name}
              </h2>
            </div>
            <p className="text-sm text-gray-600 mb-4">{offer.description}</p>
            <a
              href={offer.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-vitalGreen hover:underline"
            >
              Redeem Offer <MdOpenInNew className="ml-1" />
            </a>
          </div>
        ))}
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-lg relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-4 text-gray-600 hover:text-black text-xl"
            >
              <MdClose />
            </button>
            <h2 className="text-xl font-bold mb-4 text-deepIndigo">
              {editing ? "Edit Offer" : "Add New Offer"}
            </h2>
            <input
              type="text"
              placeholder="Partner Name"
              value={formData.name}
              onChange={(e) =>
                setFormData((f) => ({ ...f, name: e.target.value }))
              }
              className="w-full mb-3 border px-3 py-2 rounded-md"
            />
            <input
              type="text"
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) =>
                setFormData((f) => ({ ...f, image: e.target.value }))
              }
              className="w-full mb-3 border px-3 py-2 rounded-md"
            />
            <input
              type="text"
              placeholder="Offer Link"
              value={formData.link}
              onChange={(e) =>
                setFormData((f) => ({ ...f, link: e.target.value }))
              }
              className="w-full mb-3 border px-3 py-2 rounded-md"
            />
            <textarea
              rows={3}
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData((f) => ({ ...f, description: e.target.value }))
              }
              className="w-full mb-4 border px-3 py-2 rounded-md"
            />
            <button
              onClick={handleSave}
              className="w-full bg-vitalGreen text-white py-2 rounded-md hover:bg-emerald-600"
            >
              {editing ? "Update Offer" : "Save Offer"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartnerOffers;
