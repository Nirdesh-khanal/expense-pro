import React, { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Filter,
  Calendar,
  TrendingUp,
  TrendingDown,
  Edit2,
  Trash2,
  Download,
  ArrowUpDown,
  IndianRupee,
} from "lucide-react";
import { getAllTransactions, deleteTransaction } from "../../services/expense";
import AddExpenses from "../../components/AddExpenses";
import Modal from "../../components/ModelWrapper/modelWrapper";

const Transactions = () => {
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [isAddingTransaction, setIsAddingTransaction] = useState(false);
  
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const data = await getAllTransactions();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleDelete = async (id, type) => {
      // id is like "expense-12", "income-5"
      // originalId is stored in the object if needed, or parse the strings
      // But expense.js deleteTransaction expects id and type
      // My expense.js getAllTransactions stores `originalId`.
      // Let's find the transaction object
      const transaction = transactions.find(t => t.id === id);
      if(!transaction) return;

      if(window.confirm("Are you sure you want to delete this transaction?")) {
          try {
              await deleteTransaction(transaction.originalId, transaction.type);
              fetchTransactions();
          } catch (error) {
              console.error("Failed to delete", error);
          }
      }
  }

  // Filter by month first
  const currentMonthTransactions = transactions.filter(t => t.date.startsWith(selectedMonth));

  // Calculate monthly stats
  const calculateStats = () => {
    const income = currentMonthTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const expenses = currentMonthTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    return { income, expenses, balance: income - expenses };
  };

  const stats = calculateStats();

  // Filter transactions
  const filteredTransactions = currentMonthTransactions.filter((transaction) => {
    const matchesSearch =
      transaction.description
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || transaction.category === filterCategory;
    const matchesType = filterType === "all" || transaction.type === filterType;
    return matchesSearch && matchesCategory && matchesType;
  });

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === "date") return new Date(b.date) - new Date(a.date);
    if (sortBy === "amount") return Math.abs(b.amount) - Math.abs(a.amount);
    if (sortBy === "category") return a.category.localeCompare(b.category);
    return 0;
  });

  // Dynamic Month List
  const months = [];
  const date = new Date();
  for (let i = 0; i < 6; i++) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const value = `${year}-${String(month).padStart(2, "0")}`;
    const label = date.toLocaleString("default", { month: "long", year: "numeric" });
    months.push({ value, label });
    date.setMonth(date.getMonth() - 1);
  }

  const categories = [
    "All",
    "Food & Dining",
    "Transportation",
    "Shopping",
    "Entertainment",
    "Bills & Utilities",
    "Healthcare",
    "Income",
    "Salary", // Added from backend
    "Freelance",
    "Business"
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 p-8 h-screen overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <IndianRupee className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Transactions
              </h1>
              <p className="text-slate-600 text-sm font-medium">
                Track all your income and expenses
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
                  Total Income
                </p>
                <p className="text-3xl font-bold text-green-600">
                  ₹{parseFloat(stats.income || 0).toFixed(2)}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <TrendingUp className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium mb-1">
                  Total Expenses
                </p>
                <p className="text-3xl font-bold text-red-600">
                  ₹{parseFloat(stats.expenses || 0).toFixed(2)}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                <TrendingDown className="text-red-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium mb-1">
                  Net Balance
                </p>
                <p
                  className={`text-3xl font-bold ${
                    stats.balance >= 0 ? "text-blue-600" : "text-red-600"
                  }`}
                >
                  ₹{Math.abs(parseFloat(stats.balance || 0)).toFixed(2)}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <IndianRupee className="text-blue-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-slate-100">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Month Selector */}
            <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-4 py-2 border border-slate-200">
              <Calendar className="text-slate-600" size={20} />
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-transparent text-slate-800 font-semibold focus:outline-none cursor-pointer"
              >
                {months.map((month) => (
                  <option key={month.value} value={month.value}>
                    {month.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div className="flex-1 relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-medium"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-4 py-2 border border-slate-200">
              <Filter className="text-slate-600" size={20} />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="bg-transparent text-slate-800 font-medium focus:outline-none cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat === "All" ? "all" : cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Type Filter */}
            <div className="flex items-center gap-2 bg-slate-50 rounded-xl px-4 py-2 border border-slate-200">
              <ArrowUpDown className="text-slate-600" size={20} />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="bg-transparent text-slate-800 font-medium focus:outline-none cursor-pointer"
              >
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            {/* Add Transaction Button */}
            <button
              onClick={() => setIsAddingTransaction(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-blue-500/30 whitespace-nowrap"
            >
              <Plus size={20} />
              Add
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-200">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => setSortBy("date")}
                      className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900"
                    >
                      Date
                      <ArrowUpDown size={14} />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-700">
                    Description
                  </th>
                  <th className="px-6 py-4 text-left">
                    <button
                      onClick={() => setSortBy("category")}
                      className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900"
                    >
                      Category
                      <ArrowUpDown size={14} />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-right">
                    <button
                      onClick={() => setSortBy("amount")}
                      className="flex items-center gap-2 text-sm font-semibold text-slate-700 hover:text-slate-900 ml-auto"
                    >
                      Amount
                      <ArrowUpDown size={14} />
                    </button>
                  </th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-slate-700">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sortedTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-slate-600">
                        {new Date(transaction.date).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" }
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                          <span className="text-xl">{transaction.icon}</span>
                        </div>
                        <span className="font-semibold text-slate-800">
                          {transaction.description}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-slate-100 text-slate-700">
                        {transaction.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`text-lg font-bold ${
                          transaction.type === "income"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.type === "income" ? "+" : "-"}₹
                        {Math.abs(parseFloat(transaction.amount || 0)).toFixed(2)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit2 size={18} className="text-blue-600" />
                        </button>
                        <button 
                            className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                            onClick={() => handleDelete(transaction.id, transaction.type)}
                        >
                          <Trash2 size={18} className="text-red-600" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {!loading && sortedTransactions.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <IndianRupee className="text-slate-400" size={32} />
              </div>
              <div className="text-slate-500 text-lg font-medium mb-2">
                No transactions found
              </div>
              <p className="text-slate-400 text-sm">
                Try adjusting your filters or add a new transaction
              </p>
            </div>
          )}
           {loading && (
             <div className="text-center py-16">
               Loading transactions...
             </div>
           )}
        </div>

        {/* Export Button */}
        <div className="mt-6 flex justify-end">
          <button className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-sm border border-slate-200">
            <Download size={20} />
            Export to CSV
          </button>
        </div>
      </div>
      
      <Modal isOpen={isAddingTransaction} onClose={() => setIsAddingTransaction(false)}>
        <AddExpenses onClose={() => setIsAddingTransaction(false)} onSuccess={fetchTransactions} />
      </Modal>
    </div>
  );
};

export default Transactions;
