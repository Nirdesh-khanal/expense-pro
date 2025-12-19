import api from "../commons/api";

// Categories for mapping icons (simple mapping for now)
const getIcon = (category) => {
  const icons = {
    "Food & Dining": "🍔",
    "Transportation": "🚗",
    "Shopping": "🛍️",
    "Entertainment": "🎮",
    "Bills & Utilities": "💡",
    "Healthcare": "🏥",
    "Income": "💰",
    "Salary": "💰",
    "Freelance": "💻",
    "Business": "🏢",
  };
  return icons[category] || "💸";
};

export const createCategory = async (name) => {
  const response = await api.post("/categories/", { name });
  return response.data;
};

export const getCategories = async () => {

  const response = await api.get("/categories/");
  return response.data;
};

export const getMonthlySummary = async (year, month) => {
  try {
    const response = await api.get(`/summary/${year}/${month}/`);
    return response.data;
  } catch (error) {
    if (error.response && error.response.status === 404) {
      return null;
    }
    throw error;
  }
};

export const getAllTransactions = async () => {
  try {
    const [expensesRes, incomesRes, categoriesRes] = await Promise.all([
      api.get("/expenses/"),
      api.get("/incomes/"),
      api.get("/categories/"),
    ]);

    const categoriesMap = {};
    if (Array.isArray(categoriesRes.data)) {
        categoriesRes.data.forEach(cat => {
            categoriesMap[cat.id] = cat.name;
        });
    }

    const expenses = Array.isArray(expensesRes.data) ? expensesRes.data.map((item) => ({
      id: `expense-${item.id}`, // Unique ID across types
      originalId: item.id,
      date: item.date,
      description: item.title,
      category: categoriesMap[item.category] || "Uncategorized", // Map ID to Name
      amount: -parseFloat(item.amount), // Negative for expense
      type: "expense",
      icon: getIcon(categoriesMap[item.category]),
    })) : [];

    const incomes = Array.isArray(incomesRes.data) ? incomesRes.data.map((item) => {
      const categoryName = item.category ? (item.category.charAt(0).toUpperCase() + item.category.slice(1)) : "Salary";
      return {
        id: `income-${item.id}`,
        originalId: item.id,
        date: item.date,
        description: item.title,
        category: categoryName, // Capitalize
        amount: parseFloat(item.amount),
        type: "income",
        icon: getIcon("Income"),
      };
    }) : [];

    // Merge and sort by date descending
    return [...expenses, ...incomes].sort((a, b) => new Date(b.date) - new Date(a.date));

  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

export const createTransaction = async (data) => {
  // data should have: title, amount, date, category (ID or Value), type
  if (data.type === "expense") {
    // Expects category to be an ID
    return await api.post("/expenses/", {
      title: data.description,
      amount: Math.abs(data.amount),
      date: data.date,
      category: data.category, 
    });
  } else {
    // Income
    return await api.post("/incomes/", {
      title: data.description,
      amount: Math.abs(data.amount),
      date: data.date,
      category: data.category.toLowerCase(), // Ensure lowercase for choices
    });
  }
};

export const deleteTransaction = async (id, type) => {
    const endpoint = type === 'expense' ? '/expenses/' : '/incomes/';
    return await api.delete(`${endpoint}${id}/`);
}

export const deleteCategory = async (id) => {
    return await api.delete(`/categories/${id}/`);
};

export const createMonthlyBudget = async (data) => {
  const response = await api.post("/budgets/", data);
  return response.data;
};

export const fetchMonthlyBudget = async (email) => {
  // email param is optional/ignored by backend which uses request.user, but keeping signature for now or simplifying
  // Backend filters by request.user so we don't strictly need email in query if auth is working usually.
  // But let's match what Transaction.jsx had: api.get(`/budgets/?email=${email}`)
  // Actually checking backend views.py: `MonthlyBudgetViewSet` filters by `request.user`.
  // It doesn't seem to use email query param.
  // I will just use /budgets/ and let backend handle it.
  // Wait, `Transaction.jsx` had `?email=${email}`. Maybe legacy?
  // I'll stick to simple get for now.
  const response = await api.get("/budgets/");
  return response.data;
};
