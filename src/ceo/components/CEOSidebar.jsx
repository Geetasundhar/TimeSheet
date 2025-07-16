import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const CEOSidebar = () => {
  const location = useLocation();
  const ceoEmail = "ceo@company.com"; // 👉 Replace this dynamically later if needed

  const navItem = (path, label) => (
    <Link to={path} style={navStyle(path === location.pathname)} key={path}>
      {label}
    </Link>
  );

  const navStyle = (active) => ({
    display: "block",
    padding: "12px 20px",
    color: active ? "#ffffff" : "#cbd5e1",
    backgroundColor: active ? "#1e3a8a" : "transparent",
    textDecoration: "none",
    fontWeight: "500",
    transition: "0.2s",
    borderLeft: active ? "4px solid #38bdf8" : "4px solid transparent",
  });

  return (
    <div
      style={{
        width: "250px",
        backgroundColor: "#1e293b", // Dark blue-gray
        minHeight: "100vh",
        color: "#e2e8f0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Header with profile and email */}
      <div>
        <div
          style={{
            padding: "20px",
            borderBottom: "1px solid #334155",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <FaUserCircle size={28} color="#e2e8f0" />
          <div>
            <div style={{ fontSize: "14px", fontWeight: "600", color: "#e2e8f0" }}>
              CEO Panel
            </div>
            <div style={{ fontSize: "12px", color: "#94a3b8" }}>{ceoEmail}</div>
          </div>
        </div>

        {/* Navigation */}
        <nav style={{ marginTop: "10px" }}>
          {navItem("/ceo", "Dashboard")}
          {navItem("/ceo/analytics", "Analytics")}
          {navItem("/ceo/employee-logs", "Employee Logs")}
          {navItem("/ceo/team-reports", "Team Reports")}
          {navItem("/ceo/all-entries", "All Entries")}
        </nav>
      </div>

      {/* Logout */}
      <div
        style={{
          padding: "20px",
          borderTop: "1px solid #334155",
        }}
      >
        <Link
          to="/logout"
          style={{
            display: "flex",
            alignItems: "center",
            color: "#cbd5e1",
            textDecoration: "none",
            fontWeight: "500",
            gap: "10px",
          }}
        >
          <FaSignOutAlt size={18} />
          Logout
        </Link>
      </div>
    </div>
  );
};

export default CEOSidebar;
