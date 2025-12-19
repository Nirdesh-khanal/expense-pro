import React, { useState } from "react";
import { X, Folder, Plus, CheckCircle } from "lucide-react";
import { createCategory } from "../services/expense";

const AddCategoryModal = ({ onClose }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const handleSubmit = async () => {
    // Validate
    if (!categoryName.trim()) {
      alert("Please enter a category name");
      return;
    }

    try {
        await createCategory(categoryName.trim());
        // Show success message
        setIsSuccess(true);

        // Reset form and close modal after 1.5 seconds
        setTimeout(() => {
        setIsSuccess(false);
        setCategoryName("");
        if(onClose) onClose();
        }, 1500);
    } catch (error) {
        console.error("Failed to create category", error);
        alert("Failed to create category. It might already exist.");
    }
  };

  const handleCancel = () => {
    setCategoryName("");
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="p-8">
      {/* Modal Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-linear-to-br from-green-600 to-teal-600 rounded-xl flex items-center justify-center">
            <Folder className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-linear-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
              Add Category
            </h1>
            <p className="text-slate-600 text-sm font-medium">
              Create a new expense category
            </p>
          </div>
        </div>
        <button
          onClick={handleCancel}
          className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded-xl transition-colors"
        >
          <X className="text-slate-400 hover:text-slate-600" size={24} />
        </button>
      </div>

      {/* Success Message */}
      {isSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-600 shrink-0" size={32} />
            <div>
              <h3 className="text-lg font-bold text-green-800">
                Category Added!
              </h3>
              <p className="text-sm text-green-600">
                Your category has been created successfully.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal Body */}
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Category Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="e.g., Groceries, Entertainment, Travel"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 font-medium"
            autoFocus
          />
          <p className="text-xs text-slate-500 mt-2">
            Enter a unique name for your new category
          </p>
        </div>

        {/* Preview */}
        {categoryName.trim() && (
          <div className="p-6 bg-linear-to-br from-green-50 to-teal-50 border border-green-200 rounded-xl">
            <h3 className="font-bold text-slate-800 mb-3">Preview:</h3>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-linear-to-br from-green-600 to-teal-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-2xl">
                  {categoryName.trim().charAt(0).toUpperCase()}
                </span>
              </div>
              <div>
                <p className="font-bold text-slate-800 text-xl">
                  {categoryName.trim()}
                </p>
                <p className="text-sm text-slate-500">New Category</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end gap-3">
        <button
          onClick={handleCancel}
          className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-all duration-200"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 bg-linear-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-green-500/30"
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>
    </div>
  );
};

export default AddCategoryModal;
