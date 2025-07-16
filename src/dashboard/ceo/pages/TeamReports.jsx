import React from "react";

// Dummy data
const teamData = [
  {
    department: "Engineering",
    totalHours: 1200,
    avgPerEmployee: "6.5 hrs/day",
    employees: 20,
    overtimeHours: 180,
  },
  {
    department: "Marketing",
    totalHours: 950,
    avgPerEmployee: "5.8 hrs/day",
    employees: 15,
    overtimeHours: 50,
  },
  {
    department: "Sales",
    totalHours: 1100,
    avgPerEmployee: "6.2 hrs/day",
    employees: 18,
    overtimeHours: 120,
  },
];

const TeamReports = () => {
  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>Team Reports</h2>
      <p style={subtitleStyle}>
        Department-wise productivity and timesheet analysis
      </p>

      <div style={gridStyle}>
        {teamData.map((team, index) => (
          <div key={index} style={cardStyle}>
            <h4 style={departmentTitle}>{team.department}</h4>
            <div style={infoRow}><span>Total Hours:</span><span>{team.totalHours}</span></div>
            <div style={infoRow}><span>Avg/Employee:</span><span>{team.avgPerEmployee}</span></div>
            <div style={infoRow}><span>Employees:</span><span>{team.employees}</span></div>
            <div style={{ ...infoRow, color: getOvertimeColor(team.overtimeHours), fontWeight: 600 }}>
              <span>Overtime:</span><span>{team.overtimeHours} hrs</span>
            </div>
          </div>
        ))}
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
  marginBottom: "10px",
};

const subtitleStyle = {
  color: "#6c757d",
  marginBottom: "30px",
};

const gridStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: "25px",
};

const cardStyle = {
  flex: "1 1 300px",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
  transition: "transform 0.3s ease",
};

const departmentTitle = {
  color: "#1e3a8a",
  fontSize: "20px",
  fontWeight: "600",
  marginBottom: "15px",
};

const infoRow = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "10px",
  color: "#333",
  fontSize: "16px",
};

const getOvertimeColor = (hrs) => {
  if (hrs >= 150) return "#dc3545";   // red
  if (hrs >= 100) return "#ffc107";   // yellow
  return "#198754";                   // green
};

export default TeamReports;
