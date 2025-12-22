
import React, { useEffect, useState } from 'react';
import { default as api } from '../../commons/api';
import { 
    Users, 
    TrendingUp, 
    TrendingDown, 
    DollarSign, 
    Activity,
    PieChart,
    BarChart2,
    Award
} from 'lucide-react';

const AdminReport = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await api.get('admin-stats/');
            setData(response.data);
        } catch (error) {
            console.error("Failed to fetch admin stats", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>
    );

    if (!data) return <div className="text-center p-10 text-slate-500">Failed to load report data.</div>;

    const { summary, trends, category_breakdown, top_spenders } = data;

    // Helper for formatting currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    // Calculate max value for chart scaling
    const maxTrendValue = Math.max(
        ...trends.map(t => Math.max(parseFloat(t.expense), parseFloat(t.income))), 
        1
    );

    return (
        <div className="space-y-8 animate-fade-in">
            {/* Header */}
            <div>
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <Activity className="text-indigo-600" />
                    Platform Financial Health
                </h2>
                <p className="text-slate-500 text-sm mt-1">Overview of all user activity and financial volume</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Total Expenses" 
                    value={formatCurrency(summary.total_expenses)} 
                    icon={<TrendingDown size={24} />} 
                    color="bg-red-50 text-red-600"
                    borderColor="border-red-100"
                />
                <StatCard 
                    title="Total Income" 
                    value={formatCurrency(summary.total_incomes)} 
                    icon={<TrendingUp size={24} />} 
                    color="bg-green-50 text-green-600"
                    borderColor="border-green-100"
                />
                <StatCard 
                    title="Net Balance" 
                    value={formatCurrency(summary.platform_balance)} 
                    icon={<DollarSign size={24} />} 
                    color="bg-blue-50 text-blue-600"
                    borderColor="border-blue-100"
                />
                <StatCard 
                    title="Active Users" 
                    value={summary.total_users} 
                    icon={<Users size={24} />} 
                    color="bg-purple-50 text-purple-600"
                    borderColor="border-purple-100"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Spending Trends Chart */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <BarChart2 size={20} className="text-slate-400" />
                            Monthly Volume
                        </h3>
                    </div>
                    
                    <div className="h-64 flex items-end justify-between gap-2 px-2">
                        {trends.map((item, index) => (
                            <div key={index} className="flex-1 flex flex-col justify-end gap-1 group relative">
                                {/* Tooltip */}
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-slate-800 text-white text-xs p-2 rounded z-10 whitespace-nowrap">
                                    <p>Inc: {formatCurrency(item.income)}</p>
                                    <p>Exp: {formatCurrency(item.expense)}</p>
                                </div>

                                {/* Bars */}
                                <div className="w-full flex gap-1 justify-center h-full items-end">
                                    <div 
                                        style={{ height: `${(item.income / maxTrendValue) * 100}%` }}
                                        className="w-1/2 bg-green-400 rounded-t-sm hover:bg-green-500 transition-all"
                                    ></div>
                                    <div 
                                        style={{ height: `${(item.expense / maxTrendValue) * 100}%` }}
                                        className="w-1/2 bg-red-400 rounded-t-sm hover:bg-red-500 transition-all"
                                    ></div>
                                </div>
                                <span className="text-xs text-slate-400 text-center font-medium truncate mt-2">
                                    {item.month}
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-center gap-6 mt-4 text-xs font-semibold text-slate-500">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-400 rounded-full"></div> Income
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-red-400 rounded-full"></div> Expense
                        </div>
                    </div>
                </div>

                {/* Category Breakdown */}
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <PieChart size={20} className="text-slate-400" />
                            Global Spending by Category
                        </h3>
                    </div>
                    
                    <div className="space-y-4 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                        {category_breakdown.map((cat, index) => {
                            const total = summary.total_expenses || 1;
                            const percent = ((cat.value / total) * 100).toFixed(1);
                            return (
                                <div key={index} className='group'>
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-semibold text-slate-700">{cat.name}</span>
                                        <span className="text-slate-500">{formatCurrency(cat.value)} ({percent}%)</span>
                                    </div>
                                    <div className="w-full bg-slate-100 rounded-full h-2.5 overflow-hidden">
                                        <div 
                                            className="bg-indigo-500 h-2.5 rounded-full transition-all duration-500 group-hover:bg-indigo-600" 
                                            style={{ width: `${percent}%` }}
                                        ></div>
                                    </div>
                                </div>
                            );
                        })}
                        {category_breakdown.length === 0 && (
                            <p className="text-slate-400 text-center text-sm py-10">No spending data available</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Top Spenders Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-100">
                    <h3 className="font-bold text-slate-800 flex items-center gap-2">
                        <Award size={20} className="text-yellow-500" />
                        Top Spenders
                    </h3>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-semibold uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">User</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4 text-center">Transactions</th>
                                <th className="px-6 py-4 text-right">Total Spent</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {top_spenders.map((user, idx) => (
                                <tr key={idx} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-800">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                                                {user.name.charAt(0)}
                                            </div>
                                            {user.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-500">{user.email}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-block bg-slate-100 text-slate-600 px-2 py-1 rounded text-xs font-semibold">
                                            {user.transaction_count}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-bold text-slate-800">
                                        {formatCurrency(user.total_spent)}
                                    </td>
                                </tr>
                            ))}
                            {top_spenders.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="px-6 py-8 text-center text-slate-400">
                                        No spender data available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

// Simple Stat Card Component
const StatCard = ({ title, value, icon, color, borderColor }) => (
    <div className={`p-6 bg-white rounded-2xl border ${borderColor} shadow-sm flex items-center justify-between`}>
        <div>
            <p className="text-slate-500 text-sm font-medium mb-1">{title}</p>
            <h4 className="text-2xl font-bold text-slate-800">{value}</h4>
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
            {icon}
        </div>
    </div>
);

export default AdminReport;
