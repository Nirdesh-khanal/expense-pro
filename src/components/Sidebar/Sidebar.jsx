import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ModernExpenseSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Get active section from current path
  const getActiveSection = () => {
    const path = location.pathname;
    if (path === "/dashboard") return "dashboard";
    if (path === "/categories") return "categories";
    if (path === "/transactions") return "transactions";
    if (path === "/budgets") return "budgets";
    if (path === "/reports") return "reports";
    if (path === "/settings") return "settings";
    return "dashboard";
  };

  const activeSection = getActiveSection();

  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: "📊",
      badge: null,
      path: "/dashboard",
    },
    {
      id: "transactions",
      label: "Transactions",
      icon: "💳",
      badge: "12",
      path: "/transactions",
    },
    {
      id: "categories",
      label: "Categories",
      icon: "📁",
      badge: null,
      path: "/categories",
    },
    // {
    //   id: "monthlySu",
    //   label: "Budgets",
    //   icon: "💰",
    //   badge: "3",
    //   path: "/budgets",
    // },
    {
      id: "reports",
      label: "Reports",
      icon: "📈",
      badge: null,
      path: "/reports",
    },
    {
      id: "settings",
      label: "Settings",
      icon: "⚙️",
      badge: null,
      path: "/settings",
    },
  ];

  return (
    <div
      className={`h-screen bg-white shadow-xl transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-72"
      } flex flex-col border-r border-slate-200`}
    >
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="p-6 border-b border-slate-100 shrink-0">
          <div
            className={`flex items-center ${
              isCollapsed ? "justify-center flex-col gap-2" : "justify-between"
            }`}
          >
            <div
              className={`flex items-center ${
                isCollapsed ? "flex-col gap-2" : "gap-3"
              }`}
            >
              <div className="w-11 h-11 bg-linear-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="text-white font-bold text-xl">$</span>
              </div>
              {!isCollapsed && (
                <div>
                  <h1 className="text-xl font-bold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ExpensePro
                  </h1>
                  <p className="text-xs text-slate-500 font-medium">
                    Track Smart, Save More
                  </p>
                </div>
              )}
            </div>
            {!isCollapsed && (
              <button
                onClick={() => setIsCollapsed(true)}
                className="w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-lg transition-colors"
              >
                <span className="text-slate-400">⚡</span>
              </button>
            )}
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full flex items-center ${
                    isCollapsed ? "justify-center p-3" : "justify-between p-3.5"
                  } rounded-xl transition-all duration-200 group ${
                    activeSection === item.id
                      ? "bg-linear-to-r from-blue-50 to-purple-50 border-l-4 border-blue-600 shadow-sm"
                      : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-2xl transition-transform ${
                        activeSection === item.id ? "scale-110" : ""
                      }`}
                    >
                      {item.icon}
                    </span>
                    {!isCollapsed && (
                      <span
                        className={`font-medium text-sm ${
                          activeSection === item.id
                            ? "text-blue-700"
                            : "text-slate-700"
                        }`}
                      >
                        {item.label}
                      </span>
                    )}
                  </div>
                  {!isCollapsed && item.badge && (
                    <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-slate-100 shrink-0">
          <div
            className={`flex items-center ${
              isCollapsed ? "justify-center" : "gap-3"
            }`}
          >
            <div className="relative">
              <div className="w-11 h-11 bg-linear-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold">NK</span>
              </div>
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-slate-800 truncate">
                  Nirdesh Khanal
                </p>
                <p className="text-xs text-slate-500">Premium Member</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expand Button when collapsed */}
      {isCollapsed && (
        <button
          onClick={() => setIsCollapsed(false)}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center hover:bg-slate-100 rounded-lg transition-colors"
        >
          <span className="text-slate-400">⚡</span>
        </button>
      )}
    </div>
  );
};

export default ModernExpenseSidebar;
