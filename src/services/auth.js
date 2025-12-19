// src/services/auth.js
import { authApi }  from "../commons/api"

export const login = async ({ email, password }) => {
  try {
    const response = await authApi.post("/login/", { email, password });

    const { access, refresh, is_admin, role } = response.data;

    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    localStorage.setItem("role", role); 

    if (is_admin || role === 'admin') {
        localStorage.setItem("is_admin", "true");
    } else {
        localStorage.removeItem("is_admin");
    }

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.detail ||
        error.response?.data?.email?.[0] ||
        "Login failed"
    );
  }
};

export const register = async ({ email, password }) => {
  try {
    const response = await authApi.post("/register/", { email, password });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.detail ||
        error.response?.data?.email?.[0] ||
        error.response?.data?.password?.[0] ||
        "Registration failed"
    );
  }
};


export const logout = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("is_admin");
  localStorage.removeItem("role");
  window.location.href = "/login";
};

// check if logged in
export const isAuthenticated = () => {
  return !!localStorage.getItem("access_token");
};

export const getProfile = async () => {
  const response = await authApi.get("/profile/");
  return response.data;
}

export const updateProfile = async (data) => {
  const response = await authApi.put("/profile/", data);
  return response.data;
}
