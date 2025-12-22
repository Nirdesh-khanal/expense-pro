import React from "react";
import LoginPage from "./Pages/LoginPage/LoginPage";
import { Route, Routes } from "react-router-dom";
import SignUpPage from "./Pages/SignUpPage/SignUpPage";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Categories from "./Pages/Categories/Categories";
import DashboardLayout from "./components/DashboardWrapper/DashboardLayout";
import Transactions from "./Pages/Transactions/transactions";
import Reports from "./Pages/Report/Report";
import Settings from "./Pages/Settings/Settings";
import SetBudget from "./components/SetBudget";
import AdminDashboard from "./Pages/AdminDashboard/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";
// import HomePage from "./pages/HomePage/homePage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/setBudget" element={<SetBudget />} />

        <Route
          path="/admin-dashboard"
          element={
            <AdminRoute>
              <DashboardLayout>
                <AdminDashboard />
              </DashboardLayout>
            </AdminRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Categories />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Transactions />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Reports />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Settings />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
