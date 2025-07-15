import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminDashboard from './dashboard/admin/AdminDashboard';
import NotFound from './pages/NotFound';
import Login from './components/Login';
import Employee from './dashboard/Employee';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminDashboard />} />

      {/* Employee Dashboard */}
      <Route path="/employee" element={<Employee />} />

      {/* Catch-All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
