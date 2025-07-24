import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const CEOSidebar = () => {
  const location = useLocation();
  const ceoEmail = "ceo@company.com";

  const navItem = (path, label) => (
    <Link to={path} style={navStyle(path === location.pathname)} key={path}>
      {label}
    </Link>
  );

  const navStyle = (active) => ({
    display: "block",
    padding: "12px 20px",
    color: active ? "#ffffff" : "#bdc3c7", // Active white, muted text for others
    backgroundColor: active ? "#34495E" : "transparent", // Subtle highlight
    textDecoration: "none",
    fontWeight: "500",
    borderRadius: "6px",
    margin: "6px 12px",
    transition: "all 0.3s ease",
  });

  return (
    <div
      style={{
        width: "250px",
        backgroundColor: "#2C3E50", // ✅ Muted Navy - corporate & professional
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "#ECF0F1", // Light muted text
        boxShadow: "2px 0 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      {/* Profile Info */}
      <div>
        <div
          style={{
            padding: "20px",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
            display: "flex",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <FaUserCircle size={26} color="#ffffff" />
          <div>
            <div style={{ fontSize: "14px", fontWeight: "600" }}>CEO Panel</div>
            <div style={{ fontSize: "12px", color: "#95a5a6" }}>{ceoEmail}</div>
          </div>
        </div>

        {/* Nav Items */}
        <nav style={{ padding: "16px 0" }}>
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
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            color: "#ECF0F1",
            textDecoration: "none",
            fontWeight: "500",
            gap: "10px",
            fontSize: "14px",
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
