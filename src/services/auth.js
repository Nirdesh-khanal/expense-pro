// import { ESModulesEvaluator } from "vite/module-runner";
import {LOG_URL_BASE} from "../commons/api"

// src/services/auth.js

// const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

export const login = async (credentials) => {
  const email = credentials?.email?.trim() || "";
  const password = credentials?.password?.trim() || "";

  if (!email || !password) {
    throw new Error("Please enter both email and password");
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    throw new Error("Please enter a valid email address");
  }

  const response = await fetch(`${LOG_URL_BASE}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    let errorMessage = "Login failed";

    if (data.email) errorMessage = data.email[0];
    else if (data.password) errorMessage = data.password[0];
    else if (data.detail) errorMessage = data.detail;
    else if (data.non_field_errors) errorMessage = data.non_field_errors[0];

    throw new Error(errorMessage);
  }

  localStorage.setItem("access_token", data.access);
  localStorage.setItem("refresh_token", data.refresh);

  return data;
};

export const refreshToken = async() =>{
  const refresh = localStorage.getItem('refresh-token');
  if (!refresh) throw new Error('No refresh token');

  const response = await fetch(`${LOG_URL_BASE}/api/token-refresh`,{
    method: "POST",
    headers:{
      'Content-Type':'application/json',
    },
    body: JSON.stringify({refresh})
  });

  const data = await response.json();
  if (!response.ok){
    throw new Error('Token refresh failed')
  }

  localStorage.setItem('access token', data.access);
  return data.access;
};

export const logOut = async()=>{
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
};

export const isAuthenticated = () =>{
  return !!localStorage.getItem('access_token');
};

export const getToken = () =>{
  return localStorage.getItem('access_token')
}
