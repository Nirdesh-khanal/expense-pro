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
// import HomePage from "./pages/HomePage/homePage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/setBudget" element={<SetBudget />} />

        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          }
        />
        <Route
          path="/categories"
          element={
            <DashboardLayout>
              <Categories />
            </DashboardLayout>
          }
        />
        <Route
          path="/transactions"
          element={
            <DashboardLayout>
              <Transactions />
            </DashboardLayout>
          }
        />
        <Route
          path="/reports"
          element={
            <DashboardLayout>
              <Reports />
            </DashboardLayout>
          }
        />
        <Route
          path="/settings"
          element={
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
