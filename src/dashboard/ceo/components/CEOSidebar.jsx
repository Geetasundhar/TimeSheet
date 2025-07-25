import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const CEOSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ceoEmail = "ceo@company.com";

  const navItem = (path, label) => (
    <Link to={path} style={navStyle(path === location.pathname)} key={path}>
      {label}
    </Link>
  );

  const navStyle = (active) => ({
    display: "block",
    padding: "12px 20px",
    color: active ? "#ffffff" : "#bdc3c7",
    backgroundColor: active ? "#34495E" : "transparent",
    textDecoration: "none",
    fontWeight: "500",
    borderRadius: "6px",
    margin: "6px 12px",
    transition: "all 0.3s ease",
  });

  const handleLogout = () => {
    // Optional: clear auth token or session
    // localStorage.removeItem("ceoToken");
    navigate("/"); // Redirect to Home Page
  };

  return (
    <div
      style={{
        width: "250px",
        backgroundColor: "#2C3E50",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: "#ECF0F1",
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
          {navItem("/ceo/employee-reports", "Employee Reports")}


        </nav>
      </div>

      {/* Logout */}
      <div
        style={{
          padding: "20px",
          borderTop: "1px solid rgba(255, 255, 255, 0.1)",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "10px",
          color: "#ECF0F1",
          fontWeight: "500",
          fontSize: "14px",
        }}
        onClick={handleLogout}
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
        <FaSignOutAlt size={18} />
        Logout
      </div>
    </div>
  );
};

export default CEOSidebar;
