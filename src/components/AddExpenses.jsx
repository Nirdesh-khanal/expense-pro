import React, { useState, useEffect } from "react";
import {
  DollarSign,
  Calendar,
  CreditCard,
  FileText,
  Target,
  Folder,
  CheckCircle,
  Plus,
  ArrowUpCircle,
  ArrowDownCircle,
} from "lucide-react";
import { createTransaction, getCategories } from "../services/expense";

const AddExpenses = ({ onClose, onSuccess }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  
  // Static income categories for now
  const incomeCategories = ["Salary", "Freelance", "Business"];

  const [expenseData, setExpenseData] = useState({
    type: "expense",
    title: "",
    amount: "",
    date: new Date().toISOString().split("T")[0],
    paymentMethod: "cash",
    notes: "",
    budget: "",
    category: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      // Handle both standard list and paginated response (DRF default)
      if (Array.isArray(data)) {
        setCategoryList(data);
      } else if (data && Array.isArray(data.results)) {
        setCategoryList(data.results);
      } else {
        console.warn("Unexpected category data format:", data);
        setCategoryList([]);
      }
    } catch (err) {
      console.error("Failed to fetch categories", err);
      // Optional: set empty list on error
      setCategoryList([]);
    }
  };

  const budgets = [
    "Monthly Budget",
    "Emergency Fund",
    "Vacation Fund",
    "Home Improvement",
    "Personal Development",
  ];

  const paymentMethods = [
    { value: "cash", label: "Cash" },
    { value: "credit_card", label: "Credit Card" },
    { value: "debit_card", label: "Debit Card" },
    { value: "bank_transfer", label: "Bank Transfer" },
    { value: "digital_wallet", label: "Digital Wallet" },
  ];

  const handleSubmit = async () => {
    // Validate required fields
    if (!expenseData.title || !expenseData.amount || !expenseData.category) {
      alert("Please fill in all required fields (Title, Amount, Category)");
      return;
    }

    if (parseFloat(expenseData.amount) <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    setLoading(true);
    try {
        await createTransaction({
            type: expenseData.type,
            title: expenseData.title,
            amount: expenseData.amount,
            date: expenseData.date,
            category: expenseData.category
        });

        // Show success message
        setIsSuccess(true);

        // Reset form and close modal after 1.5 seconds
        setTimeout(() => {
        setIsSuccess(false);
        resetForm();
        if(onSuccess) onSuccess();
        onClose();
        }, 1500);
    } catch (error) {
        console.error("Failed to add transaction", error);
        alert("Failed to add transaction");
    } finally {
        setLoading(false);
    }
  };

  const resetForm = () => {
    setExpenseData({
      type: "expense",
      title: "",
      amount: "",
      date: new Date().toISOString().split("T")[0],
      paymentMethod: "cash",
      notes: "",
      budget: "",
      category: "",
    });
  };

  const handleCancel = () => {
    resetForm();
    onClose();
  };

  return (
    <div className="p-8">
      {/* Modal Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              expenseData.type === 'expense' 
              ? "bg-linear-to-br from-red-500 to-pink-600" 
              : "bg-linear-to-br from-green-500 to-emerald-600"
          }`}>
            <DollarSign className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {expenseData.type === "expense" ? "Add Expense" : "Add Income"}
            </h1>
            <p className="text-slate-600 text-sm font-medium">
              Record a new {expenseData.type} transaction
            </p>
          </div>
        </div>
        <button
          onClick={handleCancel}
          className="w-10 h-10 flex items-center justify-center hover:bg-slate-100 rounded-xl transition-colors"
        >
          {/* <X className="text-slate-400 hover:text-slate-600" size={24} /> */}
        </button>
      </div>

      {/* Type Toggle */}
      <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
          <button
            onClick={() => setExpenseData({ ...expenseData, type: "expense", category: "" })}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all ${
              expenseData.type === "expense"
                ? "bg-white text-red-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <ArrowDownCircle size={16} />
            Expense
          </button>
          <button
            onClick={() => setExpenseData({ ...expenseData, type: "income", category: "salary" })}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-semibold transition-all ${
              expenseData.type === "income"
                ? "bg-white text-green-600 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            <ArrowUpCircle size={16} />
            Income
          </button>
        </div>

      {/* Success Message */}
      {isSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 mb-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-600 shrink-0" size={32} />
            <div>
              <h3 className="text-lg font-bold text-green-800">
                Transaction Added Successfully!
              </h3>
              <p className="text-sm text-green-600">
                Your transaction has been recorded.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <div className="space-y-6">
        {/* Title - Required */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder={expenseData.type === 'expense' ? "e.g., Grocery Shopping" : "e.g., Salary, Freelance"}
            value={expenseData.title}
            onChange={(e) =>
              setExpenseData({ ...expenseData, title: e.target.value })
            }
            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-medium"
          />
        </div>

        {/* Amount and Date */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Amount <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <DollarSign
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={expenseData.amount}
                onChange={(e) =>
                  setExpenseData({
                    ...expenseData,
                    amount: e.target.value,
                  })
                }
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Date
            </label>
            <div className="relative">
              <Calendar
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                type="date"
                value={expenseData.date}
                onChange={(e) =>
                  setExpenseData({
                    ...expenseData,
                    date: e.target.value,
                  })
                }
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Category and Budget */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Category <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Folder
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <select
                value={expenseData.category}
                onChange={(e) =>
                  setExpenseData({
                    ...expenseData,
                    category: e.target.value,
                  })
                }
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-medium appearance-none cursor-pointer"
              >
                <option value="">Select category</option>
                {expenseData.type === 'expense' ? (
                     categoryList.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                        {cat.name}
                    </option>
                    ))
                ) : (
                    incomeCategories.map((cat) => (
                    <option key={cat.toLowerCase()} value={cat.toLowerCase()}>
                        {cat}
                    </option>
                    ))
                )}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Budget
            </label>
            <div className="relative">
              <Target
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <select
                value={expenseData.budget}
                onChange={(e) =>
                  setExpenseData({
                    ...expenseData,
                    budget: e.target.value,
                  })
                }
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-medium appearance-none cursor-pointer"
              >
                <option value="">Select budget (optional)</option>
                {budgets.map((budget) => (
                  <option key={budget} value={budget}>
                    {budget}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Payment Method
          </label>
          <div className="relative">
            <CreditCard
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />
            <select
              value={expenseData.paymentMethod}
              onChange={(e) =>
                setExpenseData({
                  ...expenseData,
                  paymentMethod: e.target.value,
                })
              }
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-medium appearance-none cursor-pointer"
            >
              {paymentMethods.map((method) => (
                <option key={method.value} value={method.value}>
                  {method.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Notes
          </label>
          <div className="relative">
            <FileText
              className="absolute left-4 top-4 text-slate-400"
              size={20}
            />
            <textarea
              placeholder="Add any additional details..."
              value={expenseData.notes}
              onChange={(e) =>
                setExpenseData({
                  ...expenseData,
                  notes: e.target.value,
                })
              }
              rows={3}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-medium resize-none"
            />
          </div>
        </div>

        {/* Summary Card */}
        {expenseData.amount && expenseData.category && (
          <div className={`p-6 bg-linear-to-br ${expenseData.type === 'expense' ? "from-red-50 to-pink-50 border-red-200" : "from-green-50 to-emerald-50 border-green-200"} border rounded-xl`}>
            <h3 className="font-bold text-slate-800 mb-3">Transaction Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Amount:</span>
                <span className={`text-2xl font-bold ${expenseData.type === 'expense' ? "text-red-600" : "text-green-600"}`}>
                  {expenseData.type === 'expense' ? "-" : "+"}₹{parseFloat(expenseData.amount).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">Category:</span>
                <span className="font-semibold text-slate-800">
                  {expenseData.type === 'expense' 
                   ? (categoryList.find(c => c.id == expenseData.category)?.name || expenseData.category)
                   : expenseData.category
                   }
                </span>
              </div>
              {expenseData.title && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600">Title:</span>
                  <span className="font-semibold text-slate-800">
                    {expenseData.title}
                  </span>
                </div>
              )}
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
          disabled={loading}
          className={`flex items-center gap-2 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg ${
              expenseData.type === 'expense'
              ? "bg-linear-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 shadow-red-500/30"
              : "bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 shadow-green-500/30"
          }`}
        >
          <Plus size={20} />
          {loading ? "Adding..." : (expenseData.type === 'expense' ? "Add Expense" : "Add Income")}
        </button>
      </div>
    </div>
  );
};
export default AddExpenses;