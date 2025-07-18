import React, { useState } from "react";

import DepartmentHoursChart from "../components/charts/DepartmentHoursChart";
import ProjectAllocationChart from "../components/charts/ProjectAllocationChart";
import OvertimeTrendChart from "../components/charts/OvertimeTrendChart";
import BillableHoursChart from "../components/charts/BillableHoursChart";
import EmployeeTimeline from "../components/charts/EmployeeTimeline";


const Analytics = () => {
  const [month, setMonth] = useState("July");
  const [department, setDepartment] = useState("All");

  return (
    <div style={{ padding: "20px", background: "#e7f1ff", minHeight: "100vh" }}>
      {/* Header Section */}
      <div style={headerStyle}>
        <div>
          <h2 style={titleStyle}>Analytics Overview</h2>
          <p style={{ marginTop: "5px", color: "#555" }}>
            Visualize and track key timesheet performance indicators
          </p>
        </div>
      </div>

      {/* Filters */}
      <div style={filterBarStyle}>
        <select style={selectStyle} value={month} onChange={(e) => setMonth(e.target.value)}>
          <option>July</option>
          <option>June</option>
          <option>May</option>
        </select>

        <select style={selectStyle} value={department} onChange={(e) => setDepartment(e.target.value)}>
          <option>All</option>
          <option>Engineering</option>
          <option>Marketing</option>
          <option>Sales</option>
        </select>
      </div>

      {/* Charts Section */}
      <div style={chartGridStyle}>
        <div style={chartCardStyle}><DepartmentHoursChart /></div>
        <div style={chartCardStyle}><ProjectAllocationChart /></div>
        <div style={chartCardStyle}><OvertimeTrendChart /></div>
        <div style={chartCardStyle}><BillableHoursChart /></div>
<div style={chartCardStyle}><EmployeeTimeline /></div>

      </div>
    </div>
  );
};

// 🎨 Styles
const titleStyle = {
  color: "#0d6efd", // Blue theme
  fontSize: "28px",
  fontWeight: "600",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
  flexWrap: "wrap",
};

const filterBarStyle = {
  display: "flex",
  gap: "15px",
  marginBottom: "25px",
  flexWrap: "wrap",
};

const selectStyle = {
  padding: "10px 12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  backgroundColor: "#fff",
  fontWeight: "500",
};

const chartGridStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  justifyContent: "space-between",
};

const chartCardStyle = {
  flex: "1 1 45%",
  background: "#ffffff",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  minWidth: "300px",
};

export default Analytics;
