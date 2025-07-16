import React from "react";

const dummyScores = [
  { name: "Alice", score: 92 },
  { name: "Bob", score: 76 },
  { name: "Charlie", score: 84 },
];

const getColor = (score) => {
  if (score > 85) return "#198754";  // Green
  if (score > 70) return "#ffc107";  // Yellow
  return "#dc3545";                 // Red
};

const ProductivityScore = () => (
  <div style={cardStyle}>
    <h4 style={titleStyle}>AI-Based Productivity Score</h4>
    <ul style={{ listStyle: "none", paddingLeft: 0 }}>
      {dummyScores.map((emp, index) => (
        <li key={index} style={{ marginBottom: "10px" }}>
          <strong>{emp.name}</strong>:{" "}
          <span style={{ color: getColor(emp.score) }}>{emp.score}%</span>
        </li>
      ))}
    </ul>
  </div>
);

const titleStyle = {
  color: "#0d6efd",
  marginBottom: "12px"
};

const cardStyle = {
  backgroundColor: "#fff",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
};

export default ProductivityScore;
