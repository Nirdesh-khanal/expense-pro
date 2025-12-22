// src/commons/api.js
import axios from "axios";

// ────── BASE URLs ──────
export const EXPENSE_API_BASE = "http://127.0.0.1:8000/expenses/";
export const ACCOUNT_API_BASE = "http://127.0.0.1:8000/accounts/";

// ────── Main API (for expenses, budgets, transactions) ──────
const api = axios.create({
  baseURL: EXPENSE_API_BASE,
});

// ────── Auth API (for login, register, token refresh) ──────
const authApi = axios.create({
  baseURL: ACCOUNT_API_BASE,
});

// ────── Add Bearer token to ALL requests (both apis) ──────
const addToken = (config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

api.interceptors.request.use(addToken);
authApi.interceptors.request.use(addToken);

// ────── Auto-refresh token when 401 ──────
authApi.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) {
        localStorage.clear();
        window.location.href = "/login";
        return Promise.reject(error);
      }

      try {
        const res = await axios.post(`${ACCOUNT_API_BASE}/token/refresh/`, {
          refresh: refreshToken,
        });

        const newAccessToken = res.data.access;
        localStorage.setItem("access_token", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return authApi(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api; // ← use this for budgets, expenses, etc.
export { authApi }; // ← this export was missing → now fixed!
