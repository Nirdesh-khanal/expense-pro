import React from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Wallet,
  PiggyBank,
  Plus,
  Download,
  Filter,
  Search,
  MoreVertical,
} from "lucide-react";

const Mainpage = ({ activeSection }) => {
  const transactions = [
    {
      id: 1,
      date: "Nov 16, 2025",
      description: "Grocery Store",
      category: "Food",
      amount: -3200,
      categoryColor: "bg-orange-100 text-orange-700",
    },
    {
      id: 2,
      date: "Nov 15, 2025",
      description: "Salary Credit",
      category: "Income",
      amount: 40000,
      categoryColor: "bg-green-100 text-green-700",
    },
    {
      id: 3,
      date: "Nov 14, 2025",
      description: "Electricity Bill",
      category: "Utilities",
      amount: -1800,
      categoryColor: "bg-red-100 text-red-700",
    },
    {
      id: 4,
      date: "Nov 13, 2025",
      description: "Restaurant",
      category: "Food",
      amount: -2500,
      categoryColor: "bg-orange-100 text-orange-700",
    },
    {
      id: 5,
      date: "Nov 12, 2025",
      description: "Online Shopping",
      category: "Shopping",
      amount: -5600,
      categoryColor: "bg-purple-100 text-purple-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">
              {activeSection === "dashboard" && "Dashboard Overview"}
              {activeSection === "transactions" && "All Transactions"}
              {activeSection === "categories" && "Expense Categories"}
              {activeSection === "budgets" && "Budget Management"}
              {activeSection === "reports" && "Financial Reports"}
              {activeSection === "settings" && "Account Settings"}
            </h1>
            <p className="text-slate-500 text-sm">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium shadow-lg shadow-blue-500/30 hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Expense
            </button>
            <button className="px-4 py-2.5 bg-white text-slate-700 rounded-xl font-medium shadow-sm border border-slate-200 hover:shadow-md transition-all flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Balance */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-slate-500 text-sm font-medium mb-1">
                  Total Balance
                </p>
                <h3 className="text-3xl font-bold text-slate-800">
                  NPR 45,800
                </h3>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30">
                <Wallet className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1 text-green-600 font-semibold">
                <TrendingUp className="w-4 h-4" />
                <span>+8.2%</span>
              </div>
              <span className="text-slate-400">vs last month</span>
            </div>
          </div>

          {/* Monthly Expenses */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-slate-500 text-sm font-medium mb-1">
                  Monthly Expenses
                </p>
                <h3 className="text-3xl font-bold text-slate-800">
                  NPR 28,500
                </h3>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/30">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1 text-red-600 font-semibold">
                <TrendingDown className="w-4 h-4" />
                <span>+15.3%</span>
              </div>
              <span className="text-slate-400">vs last month</span>
            </div>
          </div>

          {/* Savings Rate */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:shadow-xl transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-slate-500 text-sm font-medium mb-1">
                  Savings Rate
                </p>
                <h3 className="text-3xl font-bold text-slate-800">38%</h3>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <PiggyBank className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="flex items-center gap-1 text-blue-600 font-semibold">
                <TrendingUp className="w-4 h-4" />
                <span>+5%</span>
              </div>
              <span className="text-slate-400">improvement</span>
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
          <div className="p-6 border-b border-slate-100">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <h2 className="text-xl font-bold text-slate-800">
                Recent Transactions
              </h2>
              <div className="flex gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:flex-initial">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    className="w-full md:w-64 pl-10 pr-4 py-2 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <button className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors flex items-center gap-2">
                  <Filter className="w-4 h-4" />
                  Filter
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50 border-b border-slate-100">
                <tr>
                  <th className="text-left p-4 text-sm font-semibold text-slate-600">
                    Date
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-600">
                    Description
                  </th>
                  <th className="text-left p-4 text-sm font-semibold text-slate-600">
                    Category
                  </th>
                  <th className="text-right p-4 text-sm font-semibold text-slate-600">
                    Amount
                  </th>
                  <th className="text-right p-4 text-sm font-semibold text-slate-600">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                  >
                    <td className="p-4 text-sm text-slate-600">
                      {transaction.date}
                    </td>
                    <td className="p-4 text-sm font-medium text-slate-800">
                      {transaction.description}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${transaction.categoryColor}`}
                      >
                        {transaction.category}
                      </span>
                    </td>
                    <td
                      className={`p-4 text-sm font-bold text-right ${
                        transaction.amount > 0
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {transaction.amount > 0 ? "+" : ""}NPR{" "}
                      {Math.abs(transaction.amount).toLocaleString()}
                    </td>
                    <td className="p-4 text-right">
                      <button className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-lg transition-colors">
                        <MoreVertical className="w-4 h-4 text-slate-400" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 border-t border-slate-100 flex justify-between items-center">
            <p className="text-sm text-slate-500">
              Showing 5 of 48 transactions
            </p>
            <button className="text-sm text-blue-600 font-medium hover:underline">
              View all transactions →
            </button>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button className="px-5 py-2.5 bg-white text-slate-700 rounded-xl font-medium shadow-sm border border-slate-200 hover:shadow-md transition-all">
            Set Budget
          </button>
          <button className="px-5 py-2.5 bg-white text-slate-700 rounded-xl font-medium shadow-sm border border-slate-200 hover:shadow-md transition-all">
            View Reports
          </button>
          <button className="px-5 py-2.5 bg-white text-slate-700 rounded-xl font-medium shadow-sm border border-slate-200 hover:shadow-md transition-all">
            Manage Categories
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
