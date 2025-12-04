import React from "react";
import ExpenseTrackerSidebar from "../../components/Sidebar/Sidebar";
import Mainpage from "../Mainpage/Mainpage";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-base-100 h-screen overflow-hidden">
      {/* Sidebar - Fixed height to fill screen */}
      {/* <div className="h-screen bg-base-200 border-r border-base-300 shrink-0">
        <ExpenseTrackerSidebar />
      </div> */}

      {/* Main Content - Scrollable */}
      <div className="flex-1 min-w-0 h-screen overflow-y-auto">
        <Mainpage />
      </div>
    </div>
  );
};

export default Dashboard;
