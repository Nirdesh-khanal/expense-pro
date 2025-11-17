import React from "react";
import LoginPage from "./Pages/LoginPage/LoginPage"
import { Route, Routes } from "react-router-dom";
import Dashboard from "./Pages/Dashboard/Dashboard";
// import HomePage from "./pages/HomePage/homePage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="" element={<Dashboard />} />
        <Route path="loginPage" element={<LoginPage />} />

      </Routes>
    </div>
  );
};

export default App;
