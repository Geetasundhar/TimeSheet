import React from "react";
import CEOSummaryCards from "../components/CEOSummaryCards";
import TopOvertimeEmployees from "../components/insights/TopOvertimeEmployees.jsx";
import UnderutilizedEmployees from "../components/insights/UnderutilizedEmployees.jsx";
import LateSubmissions from "../components/insights/LateSubmissions";
import ProductivityScore from "../components/insights/ProductivityScore";
import AnomalyAlerts from "../components/insights/AnomalyAlerts";
import WorkloadForecast from "../components/insights/WorkloadForecast";

const CEODashboard = () => {
  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <h2 style={titleStyle}>CEO Dashboard</h2>
        <p style={subtitleStyle}>Key workforce insights at a glance</p>
      </div>

      {/* Summary Cards */}
      <div style={summaryCardWrapper}>
        <CEOSummaryCards />
      </div>

      {/* AI-Powered Insights */}
      <h3 style={sectionTitleStyle}>AI-Powered Insights</h3>
      <div style={insightsWrapper}>
        <div style={insightCard}><ProductivityScore /></div>
        <div style={insightCard}><AnomalyAlerts /></div>
        <div style={insightCard}><WorkloadForecast /></div>
      </div>

      {/* Operational Insights */}
      <h3 style={sectionTitleStyle}>Operational Insights</h3>
      <div style={insightsWrapper}>
        <div style={insightCard}><TopOvertimeEmployees /></div>
        <div style={insightCard}><UnderutilizedEmployees /></div>
        <div style={insightCard}><LateSubmissions /></div>
      </div>
    </div>
  );
};

// 💄 Styles
const containerStyle = {
  padding: "30px",
  backgroundColor: "#eaf2ff",
  minHeight: "100vh",
};

const headerStyle = {
  marginBottom: "30px",
};

const titleStyle = {
  color: "#0d6efd",
  fontSize: "32px",
  fontWeight: "700",
  marginBottom: "5px",
};

const subtitleStyle = {
  color: "#6c757d",
  fontSize: "16px",
};

const summaryCardWrapper = {
  marginBottom: "30px",
};

const sectionTitleStyle = {
  fontSize: "22px",
  fontWeight: "600",
  color: "#0d6efd",
  margin: "30px 0 15px",
  borderBottom: "2px solid #b6d4fe",
  paddingBottom: "5px",
};

const insightsWrapper = {
  display: "flex",
  flexWrap: "wrap",
  gap: "20px",
  justifyContent: "space-between",
};

const insightCard = {
  flex: "1 1 30%",
  minWidth: "280px",
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  padding: "20px",
  boxShadow: "0 6px 18px rgba(0, 0, 0, 0.07)",
  transition: "transform 0.2s ease",
  cursor: "pointer",
  overflow: "hidden",
};

export default CEODashboard;
