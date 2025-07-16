import React from "react";

const data = [
  { name: "Sundar", lateDays: 3 },
  { name: "Divya", lateDays: 2 },
  { name: "Karthik", lateDays: 2 },
  { name: "Sneha", lateDays: 1 },
];

const LateSubmissions = () => {
  return (
    <div style={cardStyle}>
      <h4 style={titleStyle}>Late Timesheet Submissions</h4>
      <ul style={listStyle}>
        {data.map((emp, index) => (
          <li key={index} style={itemStyle}>
            <span>{emp.name}</span>
            <strong style={{ color: "#dc3545" }}>
              {emp.lateDays} day{emp.lateDays > 1 ? "s" : ""}
            </strong>
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

export default LateSubmissions;
