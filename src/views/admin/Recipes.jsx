import React, { useState } from "react";
import {
  MdSearch,
  MdEdit,
  MdDelete,
  MdVisibility,
  MdClose,
  MdCloudDownload,
} from "react-icons/md";

// CSV Export helper
const exportCSV = (data) => {
  const headers = ["Name", "Tags", "Duration", "Access"];
  const rows = data.map((r) => [
    r.name,
    r.tags.join(", "),
    r.duration,
    r.access,
  ]);

  const csv =
    [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

  const blob = new Blob([csv], { type: "text/csv" });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "recipes.csv";
  link.click();
};

const defaultRecipe = {
  id: null,
  name: "",
  tags: [],
  duration: "",
  access: "Free",
  ingredients: "",
  instructions: "",
};

const availableTags = [
  "iron-rich",
  "vegan",
  "gluten-free",
  "fiber",
  "low-carb",
];

const Recipes = () => {
  const [recipes, setRecipes] = useState([
    {
      id: 1,
      name: "Iron Boost Smoothie",
      tags: ["iron-rich", "vegan"],
      duration: "5 min",
      access: "Premium",
      ingredients: "Spinach, Banana, Chia Seeds, Almond Milk",
      instructions: "Blend all ingredients until smooth. Serve chilled.",
    },
    {
      id: 2,
      name: "Quick Oat Bowl",
      tags: ["gluten-free", "fiber"],
      duration: "7 min",
      access: "Free",
      ingredients: "Oats, Apple, Cinnamon, Honey",
      instructions: "Mix oats with warm water. Add toppings. Stir well.",
    },
  ]);
  const [search, setSearch] = useState("");
  const [filterTag, setFilterTag] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState(defaultRecipe);

  const filtered = recipes.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) &&
      (!filterTag || r.tags.includes(filterTag))
  );

  const openAddModal = () => {
    setFormData(defaultRecipe);
    setEditing(false);
    setModalOpen(true);
  };

  const openEditModal = (recipe) => {
    setFormData(recipe);
    setEditing(true);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (editing) {
      setRecipes((prev) =>
        prev.map((r) => (r.id === formData.id ? formData : r))
      );
    } else {
      setRecipes((prev) => [
        ...prev,
        { ...formData, id: Date.now() },
      ]);
    }
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    setRecipes((prev) => prev.filter((r) => r.id !== id));
  };

  const handleTagChange = (tag) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
    }));
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold text-deepIndigo">Recipe Library</h1>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={openAddModal}
            className="bg-vitalGreen text-white px-4 py-2 rounded-md hover:bg-emerald-600"
          >
            + Add Recipe
          </button>
          <button
            onClick={() => exportCSV(filtered)}
            className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-md text-gray-600 hover:bg-gray-100"
          >
            <MdCloudDownload /> Export CSV
          </button>
        </div>
      </div>

      {/* Filter + Search */}
      <div className="flex flex-wrap gap-4 mb-4">
        <select
          value={filterTag}
          onChange={(e) => setFilterTag(e.target.value)}
          className="border px-3 py-2 rounded-md text-sm"
        >
          <option value="">Filter by Tag</option>
          {availableTags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
        <div className="relative w-full sm:max-w-xs">
          <MdSearch className="absolute left-3 top-2.5 text-gray-400" />
          <input
            className="pl-10 pr-4 py-2 border rounded-md w-full"
            placeholder="Search recipes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-xs uppercase text-gray-600">
            <tr>
              <th className="px-6 py-3">Recipe</th>
              <th className="px-6 py-3">Tags</th>
              <th className="px-6 py-3">Duration</th>
              <th className="px-6 py-3">Access</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((r) => (
              <tr key={r.id} className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-4 font-medium">{r.name}</td>
                <td className="px-6 py-4 space-x-1">
                  {r.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-vitalGreen/10 text-vitalGreen text-xs px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </td>
                <td className="px-6 py-4">{r.duration}</td>
                <td className="px-6 py-4">
                  {r.access === "Premium" ? (
                    <span className="text-purple-600 font-semibold">Premium</span>
                  ) : (
                    <span className="text-gray-600">Free</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button
                    onClick={() => alert(r.instructions)}
                    className="text-blue-600 hover:text-blue-800"
                    title="View"
                  >
                    <MdVisibility />
                  </button>
                  <button
                    onClick={() => openEditModal(r)}
                    className="text-yellow-600 hover:text-yellow-800"
                    title="Edit"
                  >
                    <MdEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(r.id)}
                    className="text-red-600 hover:text-red-800"
                    title="Delete"
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-3 right-4 text-gray-600 hover:text-black text-xl"
            >
              <MdClose />
            </button>
            <h2 className="text-xl font-bold text-deepIndigo mb-4">
              {editing ? "Edit" : "Add"} Recipe
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <input
                className="border px-3 py-2 rounded-md"
                placeholder="Recipe Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, name: e.target.value }))
                }
              />
              <input
                className="border px-3 py-2 rounded-md"
                placeholder="Duration"
                value={formData.duration}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, duration: e.target.value }))
                }
              />
              <select
                className="border px-3 py-2 rounded-md"
                value={formData.access}
                onChange={(e) =>
                  setFormData((f) => ({ ...f, access: e.target.value }))
                }
              >
                <option value="Free">Free</option>
                <option value="Premium">Premium</option>
              </select>

              <div className="flex flex-wrap gap-2">
                {availableTags.map((tag) => (
                  <span
                    key={tag}
                    onClick={() => handleTagChange(tag)}
                    className={`cursor-pointer text-xs px-2 py-1 rounded ${
                      formData.tags.includes(tag)
                        ? "bg-vitalGreen text-white"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <textarea
              rows={3}
              className="border px-3 py-2 rounded-md w-full mb-3"
              placeholder="Ingredients (comma-separated)"
              value={formData.ingredients}
              onChange={(e) =>
                setFormData((f) => ({ ...f, ingredients: e.target.value }))
              }
            />
            <textarea
              rows={4}
              className="border px-3 py-2 rounded-md w-full mb-4"
              placeholder="Instructions"
              value={formData.instructions}
              onChange={(e) =>
                setFormData((f) => ({ ...f, instructions: e.target.value }))
              }
            />
            <button
              onClick={handleSave}
              className="w-full bg-vitalGreen text-white py-2 rounded-md hover:bg-emerald-600"
            >
              {editing ? "Update" : "Save"} Recipe
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recipes;
