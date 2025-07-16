import React from "react";

const anomalies = [
  { employee: "Bob", issue: "Unusual drop in logged hours" },
  { employee: "Charlie", issue: "Sudden overtime spike" },
];

const AnomalyAlerts = () => (
  <div style={cardStyle}>
    <h4 style={titleStyle}>⚠️ Anomaly Alerts</h4>
    <ul>
      {anomalies.map((alert, i) => (
        <li key={i} style={{ marginBottom: "10px", color: "#dc3545" }}>
          {alert.employee}: {alert.issue}
        </li>
      ))}
    </ul>
  </div>
);

const titleStyle = {
  color: "#0d6efd",
  marginBottom: "12px",
};

const cardStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

export default AnomalyAlerts;
