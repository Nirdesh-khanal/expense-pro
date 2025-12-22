import React, { useEffect, useState } from 'react';
import { authApi, default as api } from '../../commons/api';
import UserTable from '../../components/Admin/UserTable';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('users');
    const [users, setUsers] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [stats, setStats] = useState({ total_users: 0, total_expenses: 0 });
    const [loading, setLoading] = useState(true);
    const [expenseFilter, setExpenseFilter] = useState({ user: '', date: '' });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [userRes, expenseRes, statsRes] = await Promise.all([
                authApi.get('users/'),
                api.get('expenses/'), // Default fetches all for admin
                api.get('admin-stats/')
            ]);
            
            setUsers(userRes.data);
            setExpenses(expenseRes.data);
            setStats(statsRes.data);
        } catch (error) {
            console.error("Failed to fetch admin data", error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleActive = async (userId) => {
        try {
            await authApi.post(`users/${userId}/toggle-active/`);
            // Refresh users locally
            setUsers(users.map(u => 
                u.id === userId ? { ...u, is_active: !u.is_active } : u
            ));
        } catch (error) {
            console.error("Failed to toggle user status", error);
            alert("Failed to toggle user status");
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!window.confirm("Are you sure you want to delete this user?")) return;
        try {
            await authApi.delete(`users/${userId}/`);
            setUsers(users.filter(u => u.id !== userId));
        } catch (error) {
            console.error("Failed to delete user", error);
            alert("Failed to delete user");
        }
    };

    const handleFilterExpenses = async () => {
        try {
            let query = 'expenses/?';
            if (expenseFilter.user) query += `user=${expenseFilter.user}&`;
            if (expenseFilter.date) query += `date=${expenseFilter.date}&`;
            
            const res = await api.get(query);
            setExpenses(res.data);
        } catch (error) {
            console.error("Filter failed", error);
        }
    };

    if (loading) return <div className="p-10 text-center">Loading Admin Dashboard...</div>;

    return (
        <div className="p-8 bg-gray-50 min-h-screen">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Total Users</p>
                        <p className="text-3xl font-bold text-gray-800">{stats.total_users}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                        👥
                    </div>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center justify-between">
                    <div>
                        <p className="text-gray-500 text-sm font-medium">Total Expenses</p>
                        <p className="text-3xl font-bold text-gray-800">${parseFloat(stats.total_expenses).toFixed(2)}</p>
                    </div>
                     <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold text-xl">
                        💰
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex space-x-4 border-b border-gray-200 mb-6">
                <button 
                    className={`pb-2 px-4 font-medium ${activeTab === 'users' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('users')}
                >
                    User Management
                </button>
                <button 
                    className={`pb-2 px-4 font-medium ${activeTab === 'expenses' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
                    onClick={() => setActiveTab('expenses')}
                >
                    Expense Monitoring
                </button>
            </div>

            {/* Content */}
            {activeTab === 'users' ? (
                <UserTable 
                    users={users} 
                    onToggleActive={handleToggleActive} 
                    onDelete={handleDeleteUser} 
                />
            ) : (
                <div className="bg-white p-6 rounded-lg shadow">
                    <div className="flex flex-wrap gap-4 mb-4 items-end">
                        <div className="w-full md:w-1/3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by User</label>
                            <select 
                                className="w-full border-gray-300 rounded-md shadow-sm p-2 border"
                                value={expenseFilter.user}
                                onChange={(e) => setExpenseFilter({...expenseFilter, user: e.target.value})}
                            >
                                <option value="">All Users</option>
                                {users.map(u => (
                                    <option key={u.id} value={u.id}>{u.email}</option>
                                ))}
                            </select>
                        </div>
                        <div className="w-full md:w-1/3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Date</label>
                            <input 
                                type="date" 
                                className="w-full border-gray-300 rounded-md shadow-sm p-2 border"
                                value={expenseFilter.date}
                                onChange={(e) => setExpenseFilter({...expenseFilter, date: e.target.value})}
                            />
                        </div>
                        <div className="w-full md:w-auto">
                            <button 
                                onClick={handleFilterExpenses}
                                className="bg-indigo-600 text-white px-4 py-2 rounded shadow hover:bg-indigo-700"
                            >
                                Apply Filters
                            </button>
                        </div>
                        <div className="w-full md:w-auto">
                            <button 
                                onClick={() => {
                                    setExpenseFilter({ user: '', date: '' });
                                    // wrapper to fetch default
                                    api.get('expenses/').then(res => setExpenses(res.data));
                                }}
                                className="bg-gray-200 text-gray-700 px-4 py-2 rounded shadow hover:bg-gray-300"
                            >
                                Reset
                            </button>
                        </div>
                    </div>

                    <div className="overflow-auto h-96">
                        <table className="min-w-full divide-y divide-gray-200">
                             <thead>
                                <tr className="bg-gray-50">
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {expenses.map(expense => (
                                    <tr key={expense.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {/* We need to map user ID to Email if serializer sends ID */}
                                            {users.find(u => u.id === expense.user)?.email || expense.user}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{expense.date}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {expense.category && typeof expense.category === 'object' ? expense.category.name : (expense.category || "Uncategorized")} 
                                            {/* Handle nested or ID category */}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{expense.title}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-right">${expense.amount}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {expenses.length === 0 && <div className="p-4 text-center text-gray-500">No expenses found matching filters.</div>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
