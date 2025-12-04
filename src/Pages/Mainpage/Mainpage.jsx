import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Wallet,
  ShoppingBag,
  Target,
  BarChart3,
  PieChart,
} from "lucide-react";

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");

  // Sample data
  const stats = {
    totalBalance: 45250.0,
    monthlyIncome: 12500.0,
    monthlyExpenses: 8750.5,
    savingsRate: 30,
  };

  const recentTransactions = [
    {
      id: 1,
      title: "Grocery Shopping",
      category: "Food & Dining",
      amount: -85.5,
      date: "2024-12-01",
      icon: "🍔",
      type: "expense",
    },
    {
      id: 2,
      title: "Salary Deposit",
      category: "Income",
      amount: 3500.0,
      date: "2024-12-02",
      icon: "💰",
      type: "income",
    },
    {
      id: 3,
      title: "Netflix Subscription",
      category: "Entertainment",
      amount: -12.99,
      date: "2024-12-05",
      icon: "🎮",
      type: "expense",
    },
    {
      id: 4,
      title: "Freelance Payment",
      category: "Income",
      amount: 800.0,
      date: "2024-12-07",
      icon: "💰",
      type: "income",
    },
    {
      id: 5,
      title: "Electric Bill",
      category: "Bills & Utilities",
      amount: -120.0,
      date: "2024-12-08",
      icon: "💡",
      type: "expense",
    },
  ];

  const budgets = [
    {
      category: "Food & Dining",
      spent: 450,
      budget: 600,
      color: "from-orange-500 to-red-500",
    },
    {
      category: "Transportation",
      spent: 180,
      budget: 300,
      color: "from-blue-500 to-cyan-500",
    },
    {
      category: "Entertainment",
      spent: 120,
      budget: 200,
      color: "from-green-500 to-teal-500",
    },
    {
      category: "Shopping",
      spent: 350,
      budget: 400,
      color: "from-purple-500 to-pink-500",
    },
  ];

  const categoryBreakdown = [
    {
      category: "Food & Dining",
      amount: 450,
      percentage: 35,
      color: "bg-orange-500",
    },
    {
      category: "Transportation",
      amount: 180,
      percentage: 14,
      color: "bg-blue-500",
    },
    {
      category: "Shopping",
      amount: 350,
      percentage: 27,
      color: "bg-purple-500",
    },
    {
      category: "Entertainment",
      amount: 120,
      percentage: 9,
      color: "bg-green-500",
    },
    {
      category: "Bills & Utilities",
      amount: 195,
      percentage: 15,
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Dashboard
              </h1>
              <p className="text-slate-600 text-sm font-medium">
                Welcome back, Nirdesh! Here's your financial overview
              </p>
            </div>

            {/* Period Selector */}
            <div className="flex items-center gap-2 bg-white rounded-xl p-1 border border-slate-200 shadow-sm">
              {["week", "month", "year"].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all duration-200 capitalize ${
                    selectedPeriod === period
                      ? "bg-linear-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                      : "text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <p className="text-slate-600 text-sm font-medium">
                Total Balance
              </p>
              <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Wallet className="text-white" size={20} />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-800 mb-2">
              ${stats.totalBalance.toLocaleString()}
            </p>
            <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
              <TrendingUp size={16} />
              <span>+12.5% from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <p className="text-slate-600 text-sm font-medium">
                Monthly Income
              </p>
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                <ArrowUpRight className="text-green-600" size={20} />
              </div>
            </div>
            <p className="text-3xl font-bold text-green-600 mb-2">
              ${stats.monthlyIncome.toLocaleString()}
            </p>
            <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
              <TrendingUp size={16} />
              <span>+8.2% from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <p className="text-slate-600 text-sm font-medium">
                Monthly Expenses
              </p>
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                <ArrowDownRight className="text-red-600" size={20} />
              </div>
            </div>
            <p className="text-3xl font-bold text-red-600 mb-2">
              ${stats.monthlyExpenses.toLocaleString()}
            </p>
            <div className="flex items-center gap-1 text-red-600 text-sm font-semibold">
              <TrendingDown size={16} />
              <span>+5.1% from last month</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <p className="text-slate-600 text-sm font-medium">Savings Rate</p>
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <Target className="text-blue-600" size={20} />
              </div>
            </div>
            <p className="text-3xl font-bold text-blue-600 mb-2">
              {stats.savingsRate}%
            </p>
            <div className="flex items-center gap-1 text-blue-600 text-sm font-semibold">
              <TrendingUp size={16} />
              <span>+2.3% from last month</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
          <h2 className="text-xl font-bold text-slate-800 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center gap-3 p-4 rounded-xl bg-linear-to-br from-blue-50 to-purple-50 border border-blue-100 hover:shadow-md transition-all duration-200">
              <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Plus className="text-white" size={24} />
              </div>
              <span className="font-semibold text-slate-800">
                Add Transaction
              </span>
            </button>

            <button className="flex flex-col items-center gap-3 p-4 rounded-xl bg-linear-to-br from-green-50 to-teal-50 border border-green-100 hover:shadow-md transition-all duration-200">
              <div className="w-12 h-12 bg-linear-to-br from-green-600 to-teal-600 rounded-xl flex items-center justify-center">
                <ShoppingBag className="text-white" size={24} />
              </div>
              <span className="font-semibold text-slate-800">Add Category</span>
            </button>

            <button className="flex flex-col items-center gap-3 p-4 rounded-xl bg-linear-to-br from-orange-50 to-red-50 border border-orange-100 hover:shadow-md transition-all duration-200">
              <div className="w-12 h-12 bg-linear-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center">
                <Target className="text-white" size={24} />
              </div>
              <span className="font-semibold text-slate-800">Set Budget</span>
            </button>

            <button className="flex flex-col items-center gap-3 p-4 rounded-xl bg-linear-to-br from-purple-50 to-pink-50 border border-purple-100 hover:shadow-md transition-all duration-200">
              <div className="w-12 h-12 bg-linear-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <BarChart3 className="text-white" size={24} />
              </div>
              <span className="font-semibold text-slate-800">View Reports</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Budget Overview */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">
                Budget Overview
              </h2>
              <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {budgets.map((budget, index) => {
                const percentage = (budget.spent / budget.budget) * 100;
                return (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-slate-700">
                        {budget.category}
                      </span>
                      <span className="text-sm font-bold text-slate-800">
                        ${budget.spent} / ${budget.budget}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-linear-to-r ${budget.color} transition-all duration-500`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {percentage.toFixed(0)}% used • $
                      {budget.budget - budget.spent} remaining
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-slate-800">
                Spending by Category
              </h2>
              <PieChart className="text-blue-600" size={24} />
            </div>
            <div className="space-y-3">
              {categoryBreakdown.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center shrink-0`}
                  >
                    <span className="text-white font-bold text-sm">
                      {item.percentage}%
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-800 text-sm">
                      {item.category}
                    </p>
                    <p className="text-xs text-slate-500">
                      ${item.amount.toFixed(2)}
                    </p>
                  </div>
                  <div className="w-20 bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full ${item.color} rounded-full`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-slate-800">
              Recent Transactions
            </h2>
            <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-linear-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">{transaction.icon}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">
                      {transaction.title}
                    </p>
                    <p className="text-sm text-slate-500">
                      {transaction.category}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`text-lg font-bold ${
                      transaction.type === "income"
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {transaction.type === "income" ? "+" : "-"}$
                    {Math.abs(transaction.amount).toFixed(2)}
                  </p>
                  <p className="text-sm text-slate-500">
                    {new Date(transaction.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
