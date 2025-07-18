import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import CEOSidebar from "./components/CEOSidebar";
import { FaBars } from "react-icons/fa";

const CEOLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar Toggle */}
      {sidebarOpen && <CEOSidebar />}

      {/* Main Area */}
      <div style={{ flex: 1, backgroundColor: "#f9faff" }}>
        {/* Top Navbar with Toggle Button */}
        <div style={topBarStyle}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={toggleButtonStyle}
          >
            <FaBars />
          </button>
          <h4 style={{ marginLeft: "16px", color: "#1e3a8a" }}>
            CEO Timesheet Panel
          </h4>
        </div>

        {/* Outlet renders nested pages */}
        <div style={{ padding: "20px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

// 🎨 Styles
const topBarStyle = {
  display: "flex",
  alignItems: "center",
  padding: "12px 20px",
  backgroundColor: "#ffffff",
  borderBottom: "1px solid #e2e8f0",
  boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
};

const toggleButtonStyle = {
  backgroundColor: "#1e3a8a",
  color: "#ffffff",
  border: "none",
  borderRadius: "6px",
  padding: "8px 10px",
  cursor: "pointer",
  fontSize: "18px",
};

export default CEOLayout;
