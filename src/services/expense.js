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
  const response = await api.post("categories/", { name });
  return response.data;
};

export const getCategories = async () => {

  const response = await api.get("categories/");
  return response.data;
};

export const getMonthlySummary = async (year, month) => {
  try {
    const response = await api.get(`summary/${year}/${month}/`);
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
      api.get("expenses/"),
      api.get("incomes/"),
      api.get("categories/"),
    ]);

    const categoriesMap = {};
    const categoriesData = Array.isArray(categoriesRes.data) ? categoriesRes.data : (categoriesRes.data?.results || []);
    
    categoriesData.forEach(cat => {
        categoriesMap[cat.id] = cat.name;
    });

    console.log("Raw Expenses Response:", expensesRes.data);
    console.log("Raw Incomes Response:", incomesRes.data);
    console.log("Raw Categories Response:", categoriesRes.data);

    const expensesData = Array.isArray(expensesRes.data) ? expensesRes.data : (expensesRes.data?.results || []);
    console.log("Processed Expenses Data:", expensesData);
    const expenses = expensesData.map((item) => ({
      id: `expense-${item.id}`, // Unique ID across types
      originalId: item.id,
      date: item.date,
      description: item.title,
      category: categoriesMap[item.category] || "Uncategorized", // Map ID to Name
      amount: -parseFloat(item.amount), // Negative for expense
      type: "expense",
      icon: getIcon(categoriesMap[item.category]),
    }));

    const incomesData = Array.isArray(incomesRes.data) ? incomesRes.data : (incomesRes.data?.results || []);
    const incomes = incomesData.map((item) => {
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
    });

    // Merge and sort by date descending
    const result = [...expenses, ...incomes].sort((a, b) => new Date(b.date) - new Date(a.date));
    console.log("Final Transactions Result:", result);
    return result;

  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
};

export const createTransaction = async (data) => {
  // data should have: title, amount, date, category (ID or Value), type
  if (data.type === "expense") {
    // Expects category to be an ID
    return await api.post("expenses/", {
      title: data.title || data.description,
      amount: Math.abs(data.amount),
      date: data.date,
      category: data.category, 
    });
  } else {
    // Income
    return await api.post("incomes/", {
      title: data.title || data.description,
      amount: Math.abs(data.amount),
      date: data.date,
      category: data.category.toLowerCase(), // Ensure lowercase for choices
    });
  }
};

export const deleteTransaction = async (id, type) => {
    const endpoint = type === 'expense' ? 'expenses/' : 'incomes/';
    return await api.delete(`${endpoint}${id}/`);
}

export const deleteCategory = async (id) => {
    return await api.delete(`categories/${id}/`);
};

export const createMonthlyBudget = async (data) => {
  const response = await api.post("budgets/", data);
  return response.data;
};

export const fetchMonthlyBudget = async (email) => {
  const response = await api.get("budgets/");
  return response.data;
};
