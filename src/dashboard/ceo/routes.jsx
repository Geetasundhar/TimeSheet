import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CEODashboard from './pages/CEODashboard';
import Analytics from './pages/Analytics';
import AllEntries from './pages/AllEntries';
import TeamReports from './pages/TeamReports';
import EmployeeLogs from './pages/EmployeeLogs';
import CEOLayout from './CEOLayout'; // sidebar + layout

const CEORoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CEOLayout />}>
        <Route index element={<CEODashboard />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="employee-logs" element={<EmployeeLogs />} />
        <Route path="team-reports" element={<TeamReports />} />
        <Route path="all-entries" element={<AllEntries />} />
        <Route path="*" element={<h2>404 - Page Not Found</h2>} />
      </Route>
    </Routes>
  );
};

export default CEORoutes;
