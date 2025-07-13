import React from 'react';
import { Navigate } from 'react-router-dom';

// Dashboards
import AdminDashboard from './admin/AdminDashboard';
import AdminUsers from './admin/AdminUsers';
// import HRDashboard from './hr/HRDashboard';
// import TLDashboard from './tl/TLDashboard';
// import CEODashboard from './ceo/CEODashboard';

const DashboardRouter = () => {
  const role = "admin"; // 🔁 Replace with real logic (e.g., from context or token)

  switch (role) {
    case "admin":
      return <AdminDashboard />;
    // case "hr":
    //   return <HRDashboard />;
    // case "tl":
    //   return <TLDashboard />;
    // case "ceo":
    //   return <CEODashboard />;
    default:
      return <Navigate to="/" replace />;
  }
};

export default DashboardRouter;
