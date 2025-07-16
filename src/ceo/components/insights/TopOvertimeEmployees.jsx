import React from "react";

const overtimeData = [
  { name: "Anjali", hours: 14 },
  { name: "Rahul", hours: 12 },
  { name: "Fatima", hours: 10 },
  { name: "Vikram", hours: 9 },
];

const TopOvertimeEmployees = () => {
  return (
    <div style={cardStyle}>
      <h4 style={titleStyle}>Top Overtime Employees</h4>
      <ul style={listStyle}>
        {overtimeData.map((emp, index) => (
          <li key={index} style={itemStyle}>
            <span>{emp.name}</span>
            <strong style={{ color: "#007bff" }}>{emp.hours} hrs</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

// Styles
const cardStyle = {
  background: "#ffffff",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "0 6px 15px rgba(0, 0, 0, 0.05)",
  minWidth: "280px",
  marginBottom: "20px",
};

const titleStyle = {
  marginBottom: "15px",
  fontSize: "18px",
  fontWeight: "600",
  color: "#1e3a8a", // dark blue
};

const listStyle = {
  listStyle: "none",
  padding: 0,
  margin: 0,
};

const itemStyle = {
  display: "flex",
  justifyContent: "space-between",
  padding: "8px 0",
  borderBottom: "1px solid #f0f0f0",
  color: "#333",
};

export default TopOvertimeEmployees;
