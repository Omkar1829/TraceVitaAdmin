import React, { useState } from "react";
import {
  MdAdd,
  MdDelete,
  MdEdit,
  MdClose,
  MdFastfood,
  MdOutlineRestaurantMenu,
} from "react-icons/md";

const defaultMeal = {
  id: null,
  name: "",
  type: "Breakfast",
  calories: "",
  protein: "",
  carbs: "",
  fats: "",
  tags: "",
};

const MealPlanner = () => {
  const [meals, setMeals] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(defaultMeal);

  const openAddModal = () => {
    setFormData(defaultMeal);
    setEditing(false);
    setModalOpen(true);
  };

  const openEditModal = (meal) => {
    setFormData(meal);
    setEditing(true);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editing) {
      setMeals((prev) =>
        prev.map((m) => (m.id === formData.id ? formData : m))
      );
    } else {
      setMeals((prev) => [
        ...prev,
        { ...formData, id: Date.now() },
      ]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete this meal?")) {
      setMeals((prev) => prev.filter((m) => m.id !== id));
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-deepIndigo flex items-center gap-2">
          <MdOutlineRestaurantMenu /> Meal Planner
        </h1>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-vitalGreen text-white px-4 py-2 rounded-lg hover:bg-emerald-600"
        >
          <MdAdd /> Add Meal
        </button>
      </div>

      {/* Meal Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-3">Meal Name</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Calories</th>
              <th className="px-4 py-3">Protein (g)</th>
              <th className="px-4 py-3">Carbs (g)</th>
              <th className="px-4 py-3">Fats (g)</th>
              <th className="px-4 py-3">Tags</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {meals.length === 0 ? (
              <tr>
                <td colSpan="8" className="px-4 py-6 text-center text-gray-400">
                  No meals added yet.
                </td>
              </tr>
            ) : (
              meals.map((meal) => (
                <tr key={meal.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{meal.name}</td>
                  <td className="px-4 py-3">{meal.type}</td>
                  <td className="px-4 py-3">{meal.calories}</td>
                  <td className="px-4 py-3">{meal.protein}</td>
                  <td className="px-4 py-3">{meal.carbs}</td>
                  <td className="px-4 py-3">{meal.fats}</td>
                  <td className="px-4 py-3">{meal.tags}</td>
                  <td className="px-4 py-3 flex gap-3 text-lg">
                    <button
                      onClick={() => openEditModal(meal)}
                      className="text-yellow-600 hover:text-yellow-800"
                    >
                      <MdEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(meal.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <MdDelete />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
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
              {editing ? "Edit Meal" : "Add New Meal"}
            </h2>

            <div className="grid grid-cols-2 gap-4 mb-3">
              <input
                type="text"
                placeholder="Meal Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, name: e.target.value }))
                }
                className="col-span-2 border px-3 py-2 rounded-md"
              />
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, type: e.target.value }))
                }
                className="col-span-2 border px-3 py-2 rounded-md"
              >
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
                <option>Snack</option>
              </select>
              <input
                type="number"
                placeholder="Calories"
                value={formData.calories}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, calories: e.target.value }))
                }
                className="border px-3 py-2 rounded-md"
              />
              <input
                type="number"
                placeholder="Protein"
                value={formData.protein}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, protein: e.target.value }))
                }
                className="border px-3 py-2 rounded-md"
              />
              <input
                type="number"
                placeholder="Carbs"
                value={formData.carbs}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, carbs: e.target.value }))
                }
                className="border px-3 py-2 rounded-md"
              />
              <input
                type="number"
                placeholder="Fats"
                value={formData.fats}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, fats: e.target.value }))
                }
                className="border px-3 py-2 rounded-md"
              />
              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={formData.tags}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, tags: e.target.value }))
                }
                className="col-span-2 border px-3 py-2 rounded-md"
              />
            </div>
            <button
              onClick={handleSave}
              className="w-full bg-vitalGreen text-white py-2 rounded-md hover:bg-emerald-600"
            >
              {editing ? "Update Meal" : "Save Meal"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanner;
