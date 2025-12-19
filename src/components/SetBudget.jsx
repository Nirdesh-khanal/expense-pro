import React, { useState } from "react";
import {
  Target,
  DollarSign,
  Calendar,
  User,
  Save,
  X,
  CheckCircle,
} from "lucide-react";

import { createMonthlyBudget } from "../services/expense";

const SetBudget = ({ onClose }) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString("default", { month: "long" });
  const currentYear = currentDate.getFullYear();

  const [budgetData, setBudgetData] = useState({
    month: currentMonth,
    year: currentYear.toString(),
    monthlyBudget: "",
  });

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from({ length: 5 }, (_, i) =>
    (currentYear + i).toString()
  );

  const handleSubmit = async () => {
    if (
      !budgetData.monthlyBudget ||
      parseFloat(budgetData.monthlyBudget) <= 0
    ) {
      alert("Please enter a valid budget amount");
      return;
    }
    const monthMap = {
      January: 1,
      February: 2,
      March: 3,
      April: 4,
      May: 5,
      June: 6,
      July: 7,
      August: 8,
      September: 9,
      October: 10,
      November: 11,
      December: 12,
    };

    const payload = {
      month_name: budgetData.month,
      month: monthMap[budgetData.month],
      year: parseInt(budgetData.year),
      monthly_budget: parseFloat(budgetData.monthlyBudget).toFixed(2),
    };

    console.log("Sending payload:", payload);

    try {
      const response = await createMonthlyBudget(payload);
      console.log("Budget saved:", response);
      setIsSuccess(true);

      setTimeout(() => {
        setIsSuccess(false);
        setBudgetData({ ...budgetData, monthlyBudget: "" });
        if(onClose) onClose();
      }, 1500);
    } catch (error) {
      console.error("Error:", error.response?.data);
      alert("Error: " + JSON.stringify(error.response?.data));
    }
  };

  const handleReset = () => {
    setBudgetData({
      ...budgetData,
      month: currentMonth,
      year: currentYear.toString(),
      monthlyBudget: "",
    });
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Target className="text-white" size={24} />
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Set Budget
            </h1>
            <p className="text-slate-600 text-sm font-medium">
              Define your monthly spending limit
            </p>
          </div>
        </div>
      </div>

      {/* Success Message */}
      {isSuccess && (
        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-green-600 shrink-0" size={32} />
            <div>
              <h3 className="text-lg font-bold text-green-800">
                Budget Set Successfully!
              </h3>
              <p className="text-sm text-green-600">
                Your monthly budget has been updated.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Budget Form */}
      <div className="space-y-6">
        <div className="space-y-6">
          
          {/* Month and Year */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Month
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={20}
                />
                <select
                  value={budgetData.month}
                  onChange={(e) =>
                    setBudgetData({ ...budgetData, month: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-medium appearance-none cursor-pointer"
                >
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Year
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  size={20}
                />
                <select
                  value={budgetData.year}
                  onChange={(e) =>
                    setBudgetData({ ...budgetData, year: e.target.value })
                  }
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-medium appearance-none cursor-pointer"
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Monthly Budget */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Monthly Budget Amount
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
                placeholder="Enter your monthly budget"
                value={budgetData.monthlyBudget}
                onChange={(e) =>
                  setBudgetData({
                    ...budgetData,
                    monthlyBudget: e.target.value,
                  })
                }
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 font-medium"
              />
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Set a realistic budget to help track your spending
            </p>
          </div>

          {/* Budget Preview Card */}
          {budgetData.monthlyBudget &&
            parseFloat(budgetData.monthlyBudget) > 0 && (
              <div className="p-6 bg-linear-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl">
                <h3 className="font-bold text-slate-800 mb-3">
                  Budget Preview
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Period:</span>
                    <span className="font-semibold text-slate-800">
                      {budgetData.month} {budgetData.year}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">
                      Budget Amount:
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      ₹{parseFloat(budgetData.monthlyBudget).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">
                      Daily Average:
                    </span>
                    <span className="font-semibold text-slate-800">
                      ₹{(parseFloat(budgetData.monthlyBudget) / 30).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )}
        </div>
        ;
      </div>

      {/* Action Buttons */}
      <div className="mt-8 pt-6 border-t border-slate-200 flex justify-end gap-3">
        <button
          onClick={handleReset}
          className="flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-all duration-200"
        >
          <X size={20} />
          Reset
        </button>
        <button
          onClick={handleSubmit}
          className="flex items-center gap-2 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg shadow-blue-500/30"
        >
          <Save size={20} />
          Save Budget
        </button>
      </div>
    </div>
  );
};

export default SetBudget;
