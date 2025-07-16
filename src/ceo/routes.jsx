import React from "react";
import { Route } from "react-router-dom";
import CEOLayout from "./CEOLayout";

// CEO pages
import CEODashboard from "./pages/CEODashboard";
import Analytics from "./pages/Analytics";
import EmployeeLogs from "./pages/EmployeeLogs";
import TeamReports from "./pages/TeamReports";
import AllEntries from "./pages/AllEntries";

// Export CEO routes as an array of <Route> elements
export const CEORoutes = [
  <Route path="/ceo" element={<CEOLayout />} key="ceo">
    <Route index element={<CEODashboard />} />
    <Route path="analytics" element={<Analytics />} />
    <Route path="employee-logs" element={<EmployeeLogs />} />
    <Route path="team-reports" element={<TeamReports />} />
    <Route path="all-entries" element={<AllEntries />} />
  </Route>,
];
