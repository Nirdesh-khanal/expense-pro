import React, { useState } from "react";
import { Trash2, Plus, Edit2, Check, X, Folder, Tag } from "lucide-react";

const Categories = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Food & Dining",
      color: "from-orange-500 to-red-500",
      icon: "🍔",
    },
    {
      id: 2,
      name: "Transportation",
      color: "from-blue-500 to-cyan-500",
      icon: "🚗",
    },
    {
      id: 3,
      name: "Shopping",
      color: "from-purple-500 to-pink-500",
      icon: "🛍️",
    },
    {
      id: 4,
      name: "Entertainment",
      color: "from-green-500 to-teal-500",
      icon: "🎮",
    },
    {
      id: 5,
      name: "Bills & Utilities",
      color: "from-yellow-500 to-orange-500",
      icon: "💡",
    },
    {
      id: 6,
      name: "Healthcare",
      color: "from-red-500 to-pink-500",
      icon: "🏥",
    },
  ]);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingName, setEditingName] = useState("");

  const colorOptions = [
    { gradient: "from-blue-500 to-cyan-500", icon: "💼" },
    { gradient: "from-purple-500 to-pink-500", icon: "🎨" },
    { gradient: "from-green-500 to-teal-500", icon: "🌱" },
    { gradient: "from-orange-500 to-red-500", icon: "🔥" },
    { gradient: "from-yellow-500 to-orange-500", icon: "⭐" },
    { gradient: "from-indigo-500 to-purple-500", icon: "🎯" },
    { gradient: "from-pink-500 to-rose-500", icon: "💖" },
    { gradient: "from-teal-500 to-green-500", icon: "🎁" },
  ];

  const toggleCategory = (id) => {
    setSelectedCategories((prev) =>
      prev.includes(id) ? prev.filter((catId) => catId !== id) : [...prev, id]
    );
  };

  const addCategory = () => {
    if (newCategoryName.trim()) {
      const randomColor =
        colorOptions[Math.floor(Math.random() * colorOptions.length)];
      const newCategory = {
        id: Date.now(),
        name: newCategoryName.trim(),
        color: randomColor.gradient,
        icon: randomColor.icon,
      };
      setCategories([...categories, newCategory]);
      setNewCategoryName("");
      setIsAddingCategory(false);
    }
  };

  const deleteSelected = () => {
    if (
      window.confirm(`Delete ${selectedCategories.length} selected categories?`)
    ) {
      setCategories(
        categories.filter((cat) => !selectedCategories.includes(cat.id))
      );
      setSelectedCategories([]);
    }
  };

  const startEditing = (category) => {
    setEditingId(category.id);
    setEditingName(category.name);
  };

  const saveEdit = () => {
    if (editingName.trim()) {
      setCategories(
        categories.map((cat) =>
          cat.id === editingId ? { ...cat, name: editingName.trim() } : cat
        )
      );
      setEditingId(null);
      setEditingName("");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Folder className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Categories
              </h1>
              <p className="text-slate-600 text-sm font-medium">
                Organize your expenses into categories
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium mb-1">
                  Total Categories
                </p>
                <p className="text-3xl font-bold text-slate-800">
                  {categories.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Tag className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium mb-1">
                  Selected
                </p>
                <p className="text-3xl font-bold text-slate-800">
                  {selectedCategories.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                <Check className="text-purple-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium mb-1">
                  Active Status
                </p>
                <p className="text-lg font-bold text-green-600">All Active</p>
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-slate-100">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <button
              onClick={() => setIsAddingCategory(true)}
              className="flex items-center gap-2 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-blue-500/30"
            >
              <Plus size={20} />
              Add New Category
            </button>

            {selectedCategories.length > 0 && (
              <button
                onClick={deleteSelected}
                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-red-500/30"
              >
                <Trash2 size={20} />
                Delete Selected ({selectedCategories.length})
              </button>
            )}
          </div>
        </div>

        {/* Add Category Form */}
        {isAddingCategory && (
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Plus className="text-blue-600" size={24} />
              Create New Category
            </h3>
            <div className="flex gap-3">
              <input
                type="text"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addCategory()}
                placeholder="Enter category name..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-medium"
                autoFocus
              />
              <button
                onClick={addCategory}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-green-500/30"
              >
                <Check size={20} />
              </button>
              <button
                onClick={() => {
                  setIsAddingCategory(false);
                  setNewCategoryName("");
                }}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-3 rounded-xl font-semibold transition-all duration-200"
              >
                <X size={20} />
              </button>
            </div>
          </div>
        )}

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category) => (
            <div
              key={category.id}
              className={`group bg-white rounded-2xl p-6 border transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md ${
                selectedCategories.includes(category.id)
                  ? "border-blue-500 ring-2 ring-blue-500/20 shadow-lg shadow-blue-500/10"
                  : "border-slate-100 hover:border-slate-200"
              }`}
              onClick={() => !editingId && toggleCategory(category.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`w-14 h-14 bg-linear-to-br ${category.color} rounded-2xl flex items-center justify-center shadow-lg`}
                >
                  <span className="text-2xl">{category.icon}</span>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    startEditing(category);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 hover:bg-slate-100 rounded-lg"
                >
                  <Edit2
                    size={18}
                    className="text-slate-400 hover:text-slate-600"
                  />
                </button>
              </div>

              {editingId === category.id ? (
                <div onClick={(e) => e.stopPropagation()} className="space-y-3">
                  <input
                    type="text"
                    value={editingName}
                    onChange={(e) => setEditingName(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && saveEdit()}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 text-sm font-medium focus:outline-none focus:border-blue-500"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={saveEdit}
                      className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-sm font-semibold"
                    >
                      Save
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-2 rounded-lg text-sm font-semibold"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-slate-500 font-medium">
                    Click to select
                  </p>
                </>
              )}

              {selectedCategories.includes(category.id) &&
                editingId !== category.id && (
                  <div className="mt-3 flex items-center gap-2 text-blue-600 text-sm font-semibold">
                    <Check size={16} />
                    <span>Selected</span>
                  </div>
                )}
            </div>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="bg-white rounded-2xl p-16 text-center border border-slate-100">
            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Folder className="text-slate-400" size={32} />
            </div>
            <div className="text-slate-500 text-lg font-medium mb-4">
              No categories yet
            </div>
            <button
              onClick={() => setIsAddingCategory(true)}
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Create your first category →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Categories;