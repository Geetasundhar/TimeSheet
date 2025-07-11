import React from 'react';
import { Navigate } from 'react-router-dom';
import AdminDashboard from './admin/AdminDashboard';

// (Later you’ll import HR, TL, CEO dashboards too)


const DashboardRouter = () => {
  const role = "admin"; // Simulate role for now (replace with real one later)

  if (role === "admin") return <AdminDashboard />;
  
  // else if (role === "hr") return <HRDashboard />;
  // else if (role === "tl") return <TLDashboard />;
  // else if (role === "ceo") return <CEODashboard />;
  else return <Navigate to="/" replace />;
};

export default DashboardRouter;
