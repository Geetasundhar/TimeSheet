import React from "react";

const data = [
  { name: "Priya", avg: "3.1 hrs/day" },
  { name: "Ravi", avg: "2.8 hrs/day" },
  { name: "Meena", avg: "3.4 hrs/day" },
  { name: "Arun", avg: "3.0 hrs/day" },
];

const UnderutilizedEmployees = () => {
  return (
    <div style={cardStyle}>
      <h4 style={titleStyle}>Underutilized Employees</h4>
      <ul style={listStyle}>
        {data.map((emp, index) => (
          <li key={index} style={itemStyle}>
            <span>{emp.name}</span>
            <strong style={{ color: "#007bff" }}>{emp.avg}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

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
  color: "#1e3a8a",
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

export default UnderutilizedEmployees;
