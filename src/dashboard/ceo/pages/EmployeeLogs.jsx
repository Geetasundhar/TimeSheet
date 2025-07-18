import React, { useState } from "react";
import { motion } from "framer-motion";

// Dummy employee logs
const logsData = [
  {
    employee: "Alice",
    logs: [
      { date: "2025-07-01", project: "Alpha", hours: 8, status: "Approved" },
      { date: "2025-07-02", project: "Alpha", hours: 7, status: "Pending" },
    ],
  },
  {
    employee: "Bob",
    logs: [
      { date: "2025-07-01", project: "Beta", hours: 6, status: "Approved" },
      { date: "2025-07-02", project: "Gamma", hours: 5, status: "Rejected" },
    ],
  },
];

const EmployeeLogs = () => {
  const [search, setSearch] = useState("");

  const filteredLogs = logsData.filter((emp) =>
    emp.employee.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={containerStyle}>
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 style={titleStyle}>📋 Employee Logs</h2>
        <p style={subtitleStyle}>Search and review timesheet entries by employee.</p>
      </motion.div>

      <motion.input
        type="text"
        placeholder="🔍 Search employee..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={searchStyle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      />

      {filteredLogs.map((emp, index) => (
        <motion.div
          key={index}
          style={cardStyle}
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 + index * 0.1 }}
        >
          <h4 style={employeeNameStyle}>{emp.employee}</h4>
          <table style={tableStyle}>
            <thead>
              <tr>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Project</th>
                <th style={thStyle}>Hours</th>
                <th style={thStyle}>Status</th>
              </tr>
            </thead>
            <tbody>
              {emp.logs.map((log, i) => (
                <tr key={i}>
                  <td style={tdStyle}>{log.date}</td>
                  <td style={tdStyle}>{log.project}</td>
                  <td style={tdStyle}>{log.hours}</td>
                  <td style={{ ...tdStyle }}>
                    <span style={{ ...statusBadgeStyle(log.status) }}>{log.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      ))}
    </div>
  );
};

// 🎨 Styles
const containerStyle = {
  padding: "30px",
  background: "#e7f1ff",
  minHeight: "100vh",
};

const titleStyle = {
  color: "#0d6efd",
  fontSize: "32px",
  fontWeight: "700",
  marginBottom: "5px",
};

const subtitleStyle = {
  color: "#495057",
  fontSize: "16px",
  marginBottom: "20px",
};

const searchStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  width: "100%",
  maxWidth: "350px",
  marginBottom: "30px",
  fontSize: "16px",
};

const cardStyle = {
  backgroundColor: "#ffffff",
  borderRadius: "14px",
  padding: "20px",
  boxShadow: "0 6px 14px rgba(0, 0, 0, 0.08)",
  marginBottom: "30px",
};

const employeeNameStyle = {
  color: "#0d47a1",
  fontSize: "20px",
  fontWeight: "600",
  marginBottom: "15px",
};

const tableStyle = {
  width: "100%",
  borderCollapse: "separate",
  borderSpacing: "0 10px",
};

const thStyle = {
  textAlign: "left",
  color: "#333",
  fontWeight: "600",
  paddingBottom: "8px",
};

const tdStyle = {
  padding: "10px 0",
  borderBottom: "1px solid #e0e0e0",
};

const statusBadgeStyle = (status) => ({
  padding: "4px 10px",
  borderRadius: "12px",
  fontWeight: "600",
  fontSize: "13px",
  backgroundColor:
    status === "Approved"
      ? "#d1e7dd"
      : status === "Pending"
      ? "#fff3cd"
      : "#f8d7da",
  color:
    status === "Approved"
      ? "#198754"
      : status === "Pending"
      ? "#856404"
      : "#dc3545",
});

export default EmployeeLogs;
