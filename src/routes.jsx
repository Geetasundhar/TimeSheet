import React from 'react';
import { Routes, Route } from 'react-router-dom';

// ✅ Page Components
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import Login from './components/Login';
import NotFound from './pages/NotFound';
import Employee from './dashboard/Employee';

// ✅ Dashboard Router (Role-based)
import DashboardRouter from './dashboard/DashboardRouter';

const AppRoutes = () => {
  return (
    <Routes>
      {/* 🔹 Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<AdminLogin />} /> {/* Admin login */}
      <Route path="/employee" element={<Employee />} /> {/* If you still need this */}
      <Route path="/user-login" element={<Login />} />   {/* Generic login (if needed) */}

      {/* 🔹 Role-Based Dashboard Router */}
      <Route path="/dashboard" element={<DashboardRouter />} />

      {/* 🔹 Not Found Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
