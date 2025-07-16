import React from "react";

// Example summary data
const summaryStats = [
  { title: "Total Hours", value: 4980, color: "#0d6efd" },
  { title: "Average Hours", value: "6.4 hrs", color: "#339af0" },
  { title: "Billable %", value: "87%", color: "#228be6" },
  { title: "Overtime Hours", value: 620, color: "#1c7ed6" },
];

const CEOSummaryCards = () => {
  return (
    <div style={cardContainerStyle}>
      {summaryStats.map((stat, index) => (
        <div key={index} style={{ ...cardStyle, backgroundColor: `${stat.color}15` }}>
          <h4 style={{ ...titleStyle, color: stat.color }}>{stat.title}</h4>
          <p style={valueStyle}>{stat.value}</p>
        </div>
      ))}
    </div>
  );
};

// 🔵 Styles
const cardContainerStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  justifyContent: "space-between",
};

const cardStyle = {
  flex: "1 1 22%",
  minWidth: "180px",
  padding: "20px",
  borderRadius: "16px",
  boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)",
  background: "#f0f4ff",
  transition: "transform 0.2s ease",
};

const titleStyle = {
  fontSize: "16px",
  fontWeight: "600",
  marginBottom: "8px",
};

const valueStyle = {
  fontSize: "26px",
  fontWeight: "700",
  color: "#002b80",
};

export default CEOSummaryCards;
