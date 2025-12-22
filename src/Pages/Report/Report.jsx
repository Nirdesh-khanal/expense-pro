import React, { useState, useEffect, useMemo } from "react";
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
  Loader2,
} from "lucide-react";
import { getMonthlySummary } from "../../services/expense";
import AdminReport from "../../components/Admin/AdminReport";

const Reports = () => {
    const role = localStorage.getItem('role');

    if (role === 'admin') {
        return (
            <div className="min-h-screen bg-slate-50 p-8">
                <div className="max-w-7xl mx-auto">
                    <AdminReport />
                </div>
            </div>
        );
    }

  // Initialize with current month
  const [selectedMonth, setSelectedMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  const [state, setState] = useState({
    data: null,
    loading: true,
    error: null,
  });

  // Generate last 6 months list
  const monthsList = useMemo(() => {
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
    return months;
  }, []);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      setState((prev) => ({ ...prev, loading: true, error: null }));
      try {
        const [year, month] = selectedMonth.split("-");
        const data = await getMonthlySummary(year, month);
        
        if (mounted) {
          setState({
            data: data,
            loading: false,
            error: null,
          });
        }
      } catch (err) {
        console.error("Fetch report error:", err);
        if (mounted) {
          setState({
            data: null,
            loading: false,
            // If it's a 404 (handled by service returning null usually, but if service throws)
            // The service returns null on 404, so this catch handles other network errors
            error: "Failed to load report data. Please try again.",
          });
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [selectedMonth]);

  // CATEGORY COLORS
  const categoryColors = {
    Shopping: "from-purple-500 to-pink-500",
    "Food & Dining": "from-orange-500 to-red-500",
    Transportation: "from-blue-500 to-cyan-500",
    Entertainment: "from-green-500 to-teal-500",
    "Bills & Utilities": "from-yellow-500 to-orange-500",
    Healthcare: "from-red-500 to-pink-500",
    Salary: "from-green-500 to-emerald-500",
    Freelance: "from-blue-500 to-indigo-500",
    Default: "from-blue-500 to-purple-500",
  };

  const getCategoryColor = (categoryName) => {
    return categoryColors[categoryName] || categoryColors["Default"];
  };

  const { data, loading, error } = state;

  // -- RENDER HELPERS --

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 p-8 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-slate-600">
           <Loader2 className="animate-spin text-blue-600" size={32} />
           <span className="font-semibold text-lg">Thinking...</span>
        </div>
      </div>
    );
  }

  // Common Header Components to reuse
  const Header = () => (
    <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
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

        <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-3 border border-slate-200 shadow-sm">
            <Calendar className="text-slate-600" size={20} />
            <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="bg-transparent text-slate-800 font-semibold focus:outline-none cursor-pointer"
            >
                {monthsList.map((m) => (
                <option key={m.value} value={m.value}>
                    {m.label}
                </option>
                ))}
            </select>
            <ChevronDown className="text-slate-400" size={20} />
        </div>
    </div>
  );

  if (error) {
      return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 p-8">
            <div className="max-w-7xl mx-auto">
                <Header />
                <div className="bg-red-50 border border-red-100 rounded-2xl p-8 text-center">
                    <AlertCircle className="mx-auto text-red-500 mb-4" size={32} />
                    <h3 className="text-lg font-bold text-red-700 mb-2">Error</h3>
                    <p className="text-red-600">{error}</p>
                </div>
            </div>
        </div>
      )
  }

  // If data is null (404 from backend meaning no budget/data)
  if (!data) {
     return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 p-8">
            <div className="max-w-7xl mx-auto">
                 <Header />
                 <div className="bg-white rounded-2xl p-16 text-center border border-slate-100 shadow-sm">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <AlertCircle className="text-slate-400" size={32} />
                    </div>
                    <div className="text-slate-500 text-lg font-medium mb-4">
                        No report data available for this month
                    </div>
                     <p className="text-slate-400">
                        It looks like you haven't set a budget or recorded any expenses for {monthsList.find(m => m.value === selectedMonth)?.label}. 
                        <br/>Head over to the Dashboard to get started!
                     </p>
                </div>
            </div>
        </div>
     );
  }

  // Destructure data safely
  const {
      monthly_budget = 0,
      total_spent = 0,
      balance = 0,
      profit_or_loss = "Profit",
      percentage = 0,
      category_breakdown = {},
      daily_expenses = [],
      biggest_expense = null
  } = data;

  const maxDailyExpense = daily_expenses.length > 0 
    ? Math.max(...daily_expenses.map((d) => parseFloat(d.total))) 
    : 0;

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <Header />

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {/* Budget Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-3">
                    <p className="text-slate-600 text-sm font-medium">Monthly Budget</p>
                    <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                        <IndianRupee className="text-blue-600" size={20} />
                    </div>
                </div>
                <p className="text-3xl font-bold text-slate-800">
                    ₹{parseFloat(monthly_budget).toLocaleString()}
                </p>
            </div>

            {/* Spent Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-3">
                    <p className="text-slate-600 text-sm font-medium">Total Spent</p>
                    <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center">
                        <TrendingDown className="text-red-600" size={20} />
                    </div>
                </div>
                <p className="text-3xl font-bold text-red-600">
                    ₹{parseFloat(total_spent).toLocaleString()}
                </p>
                <p className="text-sm text-slate-500 mt-2">
                    {percentage}% of budget
                </p>
            </div>

            {/* Remaining Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-3">
                    <p className="text-slate-600 text-sm font-medium">Remaining</p>
                    <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                        <TrendingUp className="text-green-600" size={20} />
                    </div>
                </div>
                <p className="text-3xl font-bold text-green-600">
                    ₹{parseFloat(balance).toLocaleString()}
                </p>
                <p className="text-sm text-slate-500 mt-2">
                    {(100 - percentage).toFixed(1)}% remaining
                </p>
            </div>

            {/* Status Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between mb-3">
                    <p className="text-slate-600 text-sm font-medium">Status</p>
                    <div className={`w-10 h-10 ${profit_or_loss === "Profit" ? "bg-green-50" : "bg-red-50"} rounded-xl flex items-center justify-center`}>
                         {profit_or_loss === "Profit" ? (
                            <TrendingUp className="text-green-600" size={20} />
                         ) : (
                            <TrendingDown className="text-red-600" size={20} />
                         )}
                    </div>
                </div>
                <p className={`text-3xl font-bold ${profit_or_loss === "Profit" ? "text-green-600" : "text-red-600"}`}>
                    {profit_or_loss}
                </p>
            </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-slate-800">Budget Usage</h3>
                <span className="text-sm font-semibold text-slate-600">{percentage}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
                <div
                    className={`h-full rounded-full transition-all duration-500 ${
                        percentage > 80 ? "bg-linear-to-r from-red-500 to-red-600" :
                        percentage > 50 ? "bg-linear-to-r from-yellow-500 to-orange-500" :
                        "bg-linear-to-r from-green-500 to-green-600"
                    }`}
                    style={{ width: `${Math.min(percentage, 100)}%` }}
                />
            </div>
            {percentage > 80 && (
                <div className="flex items-center gap-2 mt-3 text-red-600 text-sm font-medium">
                    <AlertCircle size={16} />
                    <span>Warning: You've used over 80% of your budget</span>
                </div>
            )}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            
            {/* Category Breakdown */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                 <div className="flex items-center gap-2 mb-6">
                     <PieChart className="text-blue-600" size={24} />
                     <h3 className="text-xl font-bold text-slate-800">Category Breakdown</h3>
                 </div>
                 <div className="space-y-4">
                     {Object.keys(category_breakdown).length > 0 ? (
                         Object.entries(category_breakdown).map(([category, amount]) => {
                             const numAmount = parseFloat(amount);
                             const numTotalSpent = parseFloat(total_spent);
                             const catPercent = numTotalSpent > 0 ? (numAmount / numTotalSpent) * 100 : 0;
                             
                             return (
                                 <div key={category}>
                                     <div className="flex items-center justify-between mb-2">
                                         <span className="text-sm font-semibold text-slate-700">{category}</span>
                                         <span className="text-sm font-bold text-slate-800">₹{numAmount.toLocaleString()}</span>
                                     </div>
                                     <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                                         <div 
                                            className={`h-full rounded-full bg-linear-to-r ${getCategoryColor(category)}`}
                                            style={{ width: `${catPercent}%` }}
                                         />
                                     </div>
                                     <p className="text-xs text-slate-500 mt-1">
                                         {catPercent.toFixed(1)}% of total spending
                                     </p>
                                 </div>
                             );
                         })
                     ) : (
                         <div className="text-center py-8 text-slate-500">
                            No expenses recorded yet.
                         </div>
                     )}
                 </div>
            </div>

            {/* Biggest Expense */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
                 <div className="flex items-center gap-2 mb-6">
                     <ShoppingBag className="text-purple-600" size={24} />
                     <h3 className="text-xl font-bold text-slate-800">Biggest Expense</h3>
                 </div>
                 {biggest_expense ? (
                     <div className="bg-linear-to-br from-red-50 to-orange-50 rounded-2xl p-6 border border-red-100">
                         <div className="flex items-start justify-between mb-4">
                             <div>
                                 <h4 className="text-2xl font-bold text-slate-800 mb-2">{biggest_expense.title}</h4>
                                 <div className="inline-block px-3 py-1 rounded-lg text-sm font-medium bg-white text-slate-700 border border-slate-200 mb-2">
                                     {biggest_expense.category}
                                 </div>
                                 <p className="text-sm text-slate-600">
                                     {new Date(biggest_expense.date).toLocaleDateString("en-US", {
                                         year: 'numeric', month: 'long', day: 'numeric'
                                     })}
                                 </p>
                             </div>
                             <div className="text-right">
                                 <p className="text-4xl font-bold text-red-600">
                                     ₹{parseFloat(biggest_expense.amount).toLocaleString()}
                                 </p>
                             </div>
                         </div>
                         <div className="pt-4 border-t border-red-200 mt-4">
                             <p className="text-sm text-slate-600">
                                This represents {((parseFloat(biggest_expense.amount) / parseFloat(total_spent)) * 100).toFixed(1)}% of your total spending.
                             </p>
                         </div>
                     </div>
                 ) : (
                     <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
                         <p>No significant expenses recorded yet.</p>
                     </div>
                 )}
            </div>
        </div>

        {/* Daily Expenses Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
             <div className="flex items-center gap-2 mb-6">
                 <BarChart3 className="text-green-600" size={24} />
                 <h3 className="text-xl font-bold text-slate-800">Daily Expenses</h3>
             </div>
             <div className="space-y-4">
                 {daily_expenses.length > 0 ? (
                     daily_expenses.map((day, idx) => {
                         const amount = parseFloat(day.total);
                         const barWidth = maxDailyExpense > 0 ? (amount / maxDailyExpense) * 100 : 0;
                         return (
                             <div key={idx} className="flex items-center gap-4">
                                 <div className="w-24 text-sm font-semibold text-slate-600 shrink-0">
                                     {new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                                 </div>
                                 <div className="flex-1 relative">
                                     <div className="w-full bg-slate-100 rounded-full h-8 overflow-hidden">
                                         <div 
                                             className="h-full rounded-full bg-linear-to-r from-blue-500 to-purple-500 flex items-center justify-end pr-3 transition-all duration-500"
                                             style={{ width: `${barWidth}%` }}
                                         >
                                             {barWidth > 15 && <span className="text-xs font-bold text-white">₹{amount.toLocaleString()}</span>}
                                         </div>
                                     </div>
                                     {barWidth <= 15 && (
                                         <span className="absolute left-0 ml-[calc(100%+0.5rem)] top-1/2 -translate-y-1/2 text-xs font-bold text-slate-800">
                                             ₹{amount.toLocaleString()}
                                         </span>
                                     )}
                                 </div>
                             </div>
                         )
                     })
                 ) : (
                     <div className="text-center py-8 text-slate-500">
                         No daily expenses to show.
                     </div>
                 )}
             </div>
        </div>
        
      </div>
    </div>
  );
};

export default Reports;
