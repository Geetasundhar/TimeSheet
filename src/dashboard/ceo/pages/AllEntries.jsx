import React, { useState } from "react";

// Dummy data
const allEntries = [
  { date: "2025-07-01", employee: "Alice", project: "Alpha", hours: 8, status: "Approved" },
  { date: "2025-07-01", employee: "Bob", project: "Beta", hours: 6, status: "Pending" },
  { date: "2025-07-02", employee: "Charlie", project: "Gamma", hours: 7, status: "Rejected" },
  { date: "2025-07-02", employee: "Alice", project: "Alpha", hours: 7, status: "Approved" },
  { date: "2025-07-03", employee: "Ravi", project: "Beta", hours: 5, status: "Pending" },
];

const AllEntries = () => {
  const [search, setSearch] = useState("");

  const filteredEntries = allEntries.filter(
    (entry) =>
      entry.employee.toLowerCase().includes(search.toLowerCase()) ||
      entry.project.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>All Timesheet Entries</h2>

      <input
        type="text"
        placeholder="🔍 Search by employee or project..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={searchStyle}
      />

      <div style={{ overflowX: "auto" }}>
        <table style={tableStyle}>
          <thead style={theadStyle}>
            <tr>
              <th style={thTdStyle}>Date</th>
              <th style={thTdStyle}>Employee</th>
              <th style={thTdStyle}>Project</th>
              <th style={thTdStyle}>Hours</th>
              <th style={thTdStyle}>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredEntries.map((entry, index) => (
              <tr key={index} style={rowHoverStyle}>
                <td style={thTdStyle}>{entry.date}</td>
                <td style={thTdStyle}>{entry.employee}</td>
                <td style={thTdStyle}>{entry.project}</td>
                <td style={thTdStyle}>{entry.hours}</td>
                <td style={{ ...thTdStyle, color: getStatusColor(entry.status), fontWeight: 600 }}>
                  {entry.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// 🎨 Styles
const containerStyle = {
  padding: "30px",
  backgroundColor: "#e7f1ff",
  minHeight: "100vh",
};

const titleStyle = {
  color: "#0d6efd",
  fontSize: "28px",
  fontWeight: "700",
  marginBottom: "20px",
};

const searchStyle = {
  padding: "10px 14px",
  marginBottom: "25px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  width: "100%",
  maxWidth: "400px",
  fontSize: "16px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
  overflow: "hidden",
};

const theadStyle = {
  backgroundColor: "#0d6efd",
  color: "#ffffff",
};

const thTdStyle = {
  padding: "12px 16px",
  textAlign: "left",
  borderBottom: "1px solid #dee2e6",
};

const rowHoverStyle = {
  transition: "background 0.2s ease",
};

const getStatusColor = (status) => {
  if (status === "Approved") return "#198754"; // green
  if (status === "Pending") return "#ffc107"; // yellow
  if (status === "Rejected") return "#dc3545"; // red
  return "#000";
};

export default AllEntries;
