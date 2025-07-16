import React from "react";

const forecastData = [
  { employee: "Alice", forecast: "Light", color: "#198754" },
  { employee: "Bob", forecast: "Moderate", color: "#ffc107" },
  { employee: "Charlie", forecast: "Heavy", color: "#dc3545" },
];

const WorkloadForecast = () => (
  <div style={cardStyle}>
    <h4 style={titleStyle}>📈 Workload Forecast</h4>
    <ul style={{ listStyle: "none", paddingLeft: 0 }}>
      {forecastData.map((emp, i) => (
        <li key={i} style={{ marginBottom: "10px", color: emp.color }}>
          {emp.employee}: {emp.forecast}
        </li>
      ))}
    </ul>
  </div>
);

const titleStyle = {
  color: "#0d6efd",
  marginBottom: "10px",
};

const cardStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

export default WorkloadForecast;
