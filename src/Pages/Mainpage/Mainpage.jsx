import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Wallet,
  ShoppingBag,
  Target,
  BarChart3,
  PieChart,
  LogOut,
} from "lucide-react";
import SetBudget from "../../components/SetBudget";
import AddExpenses from "../../components/addExpenses";
import AddCategoryModal from "../../components/AddCategory";
import Modal from "../../components/ModelWrapper/modelWrapper";
import { getMonthlySummary, getAllTransactions } from "../../services/expense";
import { logout } from "../../services/auth";

const MainPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [showSetBudget, setShowSetBudget] = useState(false);
  const [showAddExpense, setShowAddExpense] = useState(false); // Renamed back to match AddExpenses
  const [showAddCategory, setShowAddCategory] = useState(false);

  const [summary, setSummary] = useState(null);
  const [income, setIncome] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth() + 1; // 1-12

      const [summaryData, allTrans] = await Promise.all([
        getMonthlySummary(year, month),
        getAllTransactions()
      ]);

      setSummary(summaryData);
      setTransactions(allTrans);

      // Calculate Income for current month
      const currentMonthStr = `${year}-${String(month).padStart(2, '0')}`;
      const currentMonthIncome = allTrans
        .filter(t => t.type === 'income' && t.date.startsWith(currentMonthStr))
        .reduce((sum, t) => sum + t.amount, 0);
      
      setIncome(currentMonthIncome);

    } catch (error) {
      console.error("Error fetching dashboard data", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Prepare recent transactions (top 5)
  const recentTransactions = transactions.slice(0, 5);

  // Prepare category breakdown
  const categoryBreakdown = summary?.category_breakdown 
    ? Object.entries(summary.category_breakdown).map(([category, amount], index) => {
        const colors = ["bg-orange-500", "bg-blue-500", "bg-purple-500", "bg-green-500", "bg-yellow-500", "bg-pink-500"];
        const percentage = summary.total_spent > 0 ? (amount / summary.total_spent) * 100 : 0;
        return {
          category,
          amount,
          percentage: Math.round(percentage),
          color: colors[index % colors.length]
        };
      })
    : [];

  const isModalOpen = showSetBudget || showAddExpense || showAddCategory;

  return (
    <>
      {/* Main Dashboard with conditional blur */}
      <div
        className={`min-h-screen bg-linear-to-br from-slate-50 to-blue-50 p-8 transition-all duration-300 h-screen overflow-y-auto ${
          isModalOpen ? "blur-sm pointer-events-none" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h1 className="text-4xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  Dashboard
                </h1>
                <p className="text-slate-600 text-sm font-medium">
                  Welcome back! Here's your financial overview
                </p>
              </div>

              <div className="flex items-center gap-4">
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
                
                {/* Logout Button */}
                <button 
                    onClick={logout}
                    className="p-3 bg-white hover:bg-red-50 text-slate-600 hover:text-red-600 rounded-xl border border-slate-200 shadow-sm transition-colors"
                    title="Logout"
                >
                    <LogOut size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 relative">
              <div className="flex items-center justify-between mb-3">
                <p className="text-slate-600 text-sm font-medium">
                  Monthly Budget
                </p>
                <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <Target className="text-white" size={20} />
                </div>
              </div>

              {loading ? (
                <div className="text-xl font-bold text-slate-800 mb-2">
                  Loading...
                </div>
              ) : summary && parseFloat(summary.monthly_budget) > 0 ? (
                <>
                  <p className="text-3xl font-bold text-slate-800 mb-2">
                    ₹{parseFloat(summary.monthly_budget).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                  <p className="text-sm text-green-600 font-medium">
                    Current month budget set
                  </p>
                </>
              ) : (
                <>
                  <p className="text-3xl font-bold text-slate-800 mb-2">
                    ₹0.00
                  </p>
                  <p className="text-sm text-orange-600 font-medium">
                    No budget set for this month
                  </p>
                  <button
                    onClick={() => setShowSetBudget(true)}
                    className="mt-3 text-sm underline text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Set your budget now
                  </button>
                </>
              )}
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
                ₹{income.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
              </p>
              <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                <TrendingUp size={16} />
                {/* <span>+8.2% from last month</span> */}
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
                ₹{summary ? parseFloat(summary.total_spent).toLocaleString("en-IN", { minimumFractionDigits: 2 }) : "0.00"}
              </p>
              <div className="flex items-center gap-1 text-red-600 text-sm font-semibold">
                <TrendingDown size={16} />
                {/* <span>+5.1% from last month</span> */}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <p className="text-slate-600 text-sm font-medium">
                  Balance
                </p>
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center">
                  <Target className="text-blue-600" size={20} />
                </div>
              </div>
              <p className="text-3xl font-bold text-blue-600 mb-2">
                ₹{summary ? parseFloat(summary.balance).toLocaleString("en-IN", { minimumFractionDigits: 2 }) : "0.00"}
              </p>
              <div className="flex items-center gap-1 text-blue-600 text-sm font-semibold">
               {/* Percentage Logic */}
               {summary && (
                   <span>{Math.round(summary.percentage)}% used</span>
               )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-6">
            <h2 className="text-xl font-bold text-slate-800 mb-4">
              Quick Actions
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button
                onClick={() => setShowAddExpense(true)}
                className="flex flex-col items-center gap-3 p-4 rounded-xl bg-linear-to-br from-blue-50 to-purple-50 border border-blue-100 hover:shadow-md transition-all duration-200"
              >
                <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                  <Plus className="text-white" size={24} />
                </div>
                <span className="font-semibold text-slate-800">
                  Add Transaction
                </span>
              </button>

              <button
                onClick={() => setShowAddCategory(true)}
                className="flex flex-col items-center gap-3 p-4 rounded-xl bg-linear-to-br from-green-50 to-teal-50 border border-green-100 hover:shadow-md transition-all duration-200"
              >
                <div className="w-12 h-12 bg-linear-to-br from-green-600 to-teal-600 rounded-xl flex items-center justify-center">
                  <ShoppingBag className="text-white" size={24} />
                </div>
                <span className="font-semibold text-slate-800">
                  Add Category
                </span>
              </button>
              
              {/* Other buttons placeholder */}
              <button
                onClick={() => setShowSetBudget(true)}
                className="flex flex-col items-center gap-3 p-4 rounded-xl bg-linear-to-br from-orange-50 to-red-50 border border-orange-100 hover:shadow-md transition-all duration-200"
              >
                <div className="w-12 h-12 bg-linear-to-br from-orange-600 to-red-600 rounded-xl flex items-center justify-center">
                  <Target className="text-white" size={24} />
                </div>
                <span className="font-semibold text-slate-800">Set Budget</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Spending by Category */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-slate-800">
                  Spending by Category
                </h2>
                <PieChart className="text-blue-600" size={24} />
              </div>
              <div className="space-y-3">
                {categoryBreakdown.length > 0 ? categoryBreakdown.map((item, index) => (
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
                        ₹{parseFloat(item.amount || 0).toFixed(2)}
                      </p>
                    </div>
                    <div className="w-20 bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full`}
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                )) : (
                    <p className="text-slate-500 text-center py-4">No expenses this month</p>
                )}
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
                {recentTransactions.length > 0 ? recentTransactions.map((transaction) => (
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
                          {transaction.description}
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
                        {transaction.type === "income" ? "+" : "-"}₹
                        {Math.abs(parseFloat(transaction.amount || 0)).toFixed(2)}
                      </p>
                      <p className="text-sm text-slate-500">
                        {new Date(transaction.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                )) : (
                    <p className="text-slate-500 text-center py-4">No recent transactions</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for SetBudget */}
      <Modal isOpen={showSetBudget} onClose={() => setShowSetBudget(false)}>
        <SetBudget onClose={() => setShowSetBudget(false)} onSuccess={fetchData} />
      </Modal>

      {/* Modal for AddExpenses (Acting as Add Transaction) */}
      <Modal isOpen={showAddExpense} onClose={() => setShowAddExpense(false)}>
        <AddExpenses onClose={() => setShowAddExpense(false)} onSuccess={fetchData} />
      </Modal>

      {/* Modal for AddCategory */}
      <Modal isOpen={showAddCategory} onClose={() => setShowAddCategory(false)}>
        <AddCategoryModal onClose={() => setShowAddCategory(false)} />
      </Modal>
    </>
  );
};

export default MainPage;
