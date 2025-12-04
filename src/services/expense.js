// services/expense.js
import { API_URL_BASE } from "../commons/api";

const getToken = () => localStorage.getItem("access_token");

export const monthlyBudget = async (id) => {
  const token = getToken();

  if (!token) {
    throw new Error("Not authenticated");
  }

  const response = await fetch(`${API_URL_BASE}/budgets/${id}/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch budget");
  }

  return response.json();
};

export const makeBudget = async (budgetData) => {
  const token = getToken();

  const response = await fetch(`${API_URL_BASE}/budgets/`, {
    // ← No ID here
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(budgetData),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.detail || "Failed to create budget");
  }

  return response.json();
};
