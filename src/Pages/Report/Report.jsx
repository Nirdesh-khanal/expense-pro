import React, { useState } from "react";
import {
  Calendar,
  TrendingUp,
  TrendingDown,
  IndianRupee,
  ShoppingBag,
  PieChart,
  BarChart3,
  Download,
  ChevronDown,
  AlertCircle,
} from "lucide-react";

const Reports = () => {
  const [selectedMonth, setSelectedMonth] = useState("2025-02");

  const reportsData = {
    "2025-02": {
      month: "February",
      year: 2025,
      monthly_budget: "20000.00",
      total_spent: "1000.00",
      balance: "19000.00",
      profit_or_loss: "Profit",
      percentage: 5.0,
      category_breakdown: {
        Shopping: "500.00",
        "Food & Dining": "300.00",
        Transportation: "200.00",
      },
      daily_expenses: [
        { date: "2025-02-01", total: 150.0 },
        { date: "2025-02-05", total: 300.0 },
        { date: "2025-02-10", total: 200.0 },
        { date: "2025-02-15", total: 150.0 },
        { date: "2025-02-20", total: 200.0 },
      ],
      biggest_expense: {
        title: "Jeans pant",
        amount: 300.0,
        category: "Shopping",
        date: "2025-02-05",
      },
    },
    "2025-01": {
      month: "January",
      year: 2025,
      monthly_budget: "20000.00",
      total_spent: "5500.00",
      balance: "14500.00",
      profit_or_loss: "Profit",
      percentage: 27.5,
      category_breakdown: {
        "Food & Dining": "2000.00",
        Shopping: "1500.00",
        Transportation: "1000.00",
        Entertainment: "500.00",
        "Bills & Utilities": "500.00",
      },
      daily_expenses: [
        { date: "2025-01-03", total: 500.0 },
        { date: "2025-01-07", total: 800.0 },
        { date: "2025-01-12", total: 1200.0 },
        { date: "2025-01-18", total: 1500.0 },
        { date: "2025-01-25", total: 1500.0 },
      ],
      biggest_expense: {
        title: "Laptop Purchase",
        amount: 1500.0,
        category: "Shopping",
        date: "2025-01-18",
      },
    },
    "2024-12": {
      month: "December",
      year: 2024,
      monthly_budget: "20000.00",
      total_spent: "8500.00",
      balance: "11500.00",
      profit_or_loss: "Profit",
      percentage: 42.5,
      category_breakdown: {
        Shopping: "3500.00",
        "Food & Dining": "2500.00",
        Entertainment: "1500.00",
        Transportation: "1000.00",
      },
      daily_expenses: [
        { date: "2024-12-05", total: 2000.0 },
        { date: "2024-12-10", total: 1500.0 },
        { date: "2024-12-15", total: 2500.0 },
        { date: "2024-12-20", total: 1500.0 },
        { date: "2024-12-25", total: 1000.0 },
      ],
      biggest_expense: {
        title: "Christmas Shopping",
        amount: 2500.0,
        category: "Shopping",
        date: "2024-12-15",
      },
    },
    "2024-11": {
      month: "November",
      year: 2024,
      monthly_budget: "20000.00",
      total_spent: "6200.00",
      balance: "13800.00",
      profit_or_loss: "Profit",
      percentage: 31.0,
      category_breakdown: {
        "Food & Dining": "2200.00",
        Transportation: "1500.00",
        Shopping: "1200.00",
        "Bills & Utilities": "800.00",
        Healthcare: "500.00",
      },
      daily_expenses: [
        { date: "2024-11-02", total: 800.0 },
        { date: "2024-11-08", total: 1200.0 },
        { date: "2024-11-15", total: 1500.0 },
        { date: "2024-11-22", total: 1700.0 },
        { date: "2024-11-28", total: 1000.0 },
      ],
      biggest_expense: {
        title: "Car Service",
        amount: 1500.0,
        category: "Transportation",
        date: "2024-11-15",
      },
    },
    "2024-10": {
      month: "October",
      year: 2024,
      monthly_budget: "20000.00",
      total_spent: "12500.00",
      balance: "7500.00",
      profit_or_loss: "Profit",
      percentage: 62.5,
      category_breakdown: {
        Shopping: "5000.00",
        "Food & Dining": "3500.00",
        Entertainment: "2000.00",
        Transportation: "1500.00",
        "Bills & Utilities": "500.00",
      },
      daily_expenses: [
        { date: "2024-10-03", total: 2500.0 },
        { date: "2024-10-10", total: 3000.0 },
        { date: "2024-10-15", total: 2500.0 },
        { date: "2024-10-22", total: 2500.0 },
        { date: "2024-10-28", total: 2000.0 },
      ],
      biggest_expense: {
        title: "New Phone",
        amount: 3000.0,
        category: "Shopping",
        date: "2024-10-10",
      },
    },
  };

  const currentReport = reportsData[selectedMonth] || reportsData["2025-02"];

  const months = [
    { value: "2025-02", label: "February 2025" },
    { value: "2025-01", label: "January 2025" },
    { value: "2024-12", label: "December 2024" },
    { value: "2024-11", label: "November 2024" },
    { value: "2024-10", label: "October 2024" },
  ];

  // Calculate max daily expense for chart scaling
  const maxDailyExpense = Math.max(
    ...currentReport.daily_expenses.map((d) => d.total)
  );

  // Get category colors
  const categoryColors = {
    Shopping: "from-purple-500 to-pink-500",
    "Food & Dining": "from-orange-500 to-red-500",
    Transportation: "from-blue-500 to-cyan-500",
    Entertainment: "from-green-500 to-teal-500",
    "Bills & Utilities": "from-yellow-500 to-orange-500",
    Healthcare: "from-red-500 to-pink-500",
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <BarChart3 className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Monthly Summary
                </h1>
                <p className="text-slate-600 text-sm font-medium">
                  Detailed insights into your spending patterns
                </p>
              </div>
            </div>

            {/* Month Selector */}
            <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 border border-slate-200 shadow-sm">
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
              <ChevronDown className="text-slate-400" size={20} />
            </div>
          </div>
        </div>

        {/* Budget Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <p className="text-slate-600 text-sm font-medium">
                Monthly Budget
              </p>
              <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                <IndianRupee className="text-blue-600" size={20} />
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-800">
              ₹{parseFloat(currentReport.monthly_budget).toLocaleString()}
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <p className="text-slate-600 text-sm font-medium">Total Spent</p>
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                <TrendingDown className="text-red-600" size={20} />
              </div>
            </div>
            <p className="text-3xl font-bold text-red-600">
              ₹{parseFloat(currentReport.total_spent).toLocaleString()}
            </p>
            <p className="text-sm text-slate-500 mt-2">
              {currentReport.percentage}% of budget
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <p className="text-slate-600 text-sm font-medium">Remaining</p>
              <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                <TrendingUp className="text-green-600" size={20} />
              </div>
            </div>
            <p className="text-3xl font-bold text-green-600">
              ₹{parseFloat(currentReport.balance).toLocaleString()}
            </p>
            <p className="text-sm text-slate-500 mt-2">
              {(100 - currentReport.percentage).toFixed(1)}% remaining
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-3">
              <p className="text-slate-600 text-sm font-medium">Status</p>
              <div
                className={`w-10 h-10 ${
                  currentReport.profit_or_loss === "Profit"
                    ? "bg-green-50"
                    : "bg-red-50"
                } rounded-xl flex items-center justify-center`}
              >
                {currentReport.profit_or_loss === "Profit" ? (
                  <TrendingUp className="text-green-600" size={20} />
                ) : (
                  <TrendingDown className="text-red-600" size={20} />
                )}
              </div>
            </div>
            <p
              className={`text-3xl font-bold ${
                currentReport.profit_or_loss === "Profit"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {currentReport.profit_or_loss}
            </p>
          </div>
        </div>

        {/* Budget Progress Bar */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-slate-100">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-bold text-slate-800">Budget Usage</h3>
            <span className="text-sm font-semibold text-slate-600">
              {currentReport.percentage}%
            </span>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                currentReport.percentage > 80
                  ? "bg-linear-to-r from-red-500 to-red-600"
                  : currentReport.percentage > 50
                  ? "bg-linear-to-r from-yellow-500 to-orange-500"
                  : "bg-linear-to-r from-green-500 to-green-600"
              }`}
              style={{ width: `${currentReport.percentage}%` }}
            />
          </div>
          {currentReport.percentage > 80 && (
            <div className="flex items-center gap-2 mt-3 text-red-600 text-sm font-medium">
              <AlertCircle size={16} />
              <span>Warning: You've used over 80% of your budget</span>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Category Breakdown */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-6">
              <PieChart className="text-blue-600" size={24} />
              <h3 className="text-xl font-bold text-slate-800">
                Category Breakdown
              </h3>
            </div>
            <div className="space-y-4">
              {Object.entries(currentReport.category_breakdown).map(
                ([category, amount]) => {
                  const percentage =
                    (parseFloat(amount) /
                      parseFloat(currentReport.total_spent)) *
                    100;
                  return (
                    <div key={category}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-slate-700">
                          {category}
                        </span>
                        <span className="text-sm font-bold text-slate-800">
                          ₹{parseFloat(amount).toLocaleString()}
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                        <div
                          className={`h-full rounded-full bg-linear-to-r ${
                            categoryColors[category] ||
                            "from-blue-500 to-purple-500"
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-slate-500 mt-1">
                        {percentage.toFixed(1)}% of total spending
                      </p>
                    </div>
                  );
                }
              )}
            </div>
          </div>

          {/* Biggest Expense */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <div className="flex items-center gap-2 mb-6">
              <ShoppingBag className="text-purple-600" size={24} />
              <h3 className="text-xl font-bold text-slate-800">
                Biggest Expense
              </h3>
            </div>
            <div className="bg-linear-to-br from-red-50 to-orange-50 rounded-2xl p-6 border border-red-100">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-slate-800 mb-2">
                    {currentReport.biggest_expense.title}
                  </h4>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium bg-white text-slate-700 border border-slate-200">
                      {currentReport.biggest_expense.category}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 font-medium">
                    {new Date(
                      currentReport.biggest_expense.date
                    ).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-4xl font-bold text-red-600">
                    ₹{currentReport.biggest_expense.amount.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="pt-4 border-t border-red-200">
                <p className="text-sm text-slate-600">
                  This represents{" "}
                  {(
                    (currentReport.biggest_expense.amount /
                      parseFloat(currentReport.total_spent)) *
                    100
                  ).toFixed(1)}
                  % of your total spending this month
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Expenses Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="text-green-600" size={24} />
            <h3 className="text-xl font-bold text-slate-800">Daily Expenses</h3>
          </div>
          <div className="space-y-4">
            {currentReport.daily_expenses.map((day, index) => {
              const barWidth = (day.total / maxDailyExpense) * 100;
              return (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-28 text-sm font-semibold text-slate-600">
                    {new Date(day.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div className="flex-1 relative">
                    <div className="w-full bg-slate-100 rounded-full h-10 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-linear-to-r from-blue-500 to-purple-500 flex items-center justify-end pr-3 transition-all duration-500"
                        style={{ width: `${barWidth}%` }}
                      >
                        {barWidth > 20 && (
                          <span className="text-sm font-bold text-white">
                            ₹{day.total.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                    {barWidth <= 20 && (
                      <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-800">
                        ₹{day.total.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Export Button */}
        <div className="flex justify-end">
          <button className="flex items-center gap-2 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-blue-500/30">
            <Download size={20} />
            Export Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;
