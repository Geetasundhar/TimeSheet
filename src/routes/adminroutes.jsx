import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../pages/Home';
import Login from '../components/Login';
import AdminDashboard from '../dashboard/admin/AdminDashboard';
import Employee from '../dashboard/Employee';
import NotFound from '../pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Admin Route */}
      <Route path="/admin" element={<AdminDashboard />} />

      {/* Employee Route */}
      <Route path="/employee" element={<Employee />} />

      {/* Fallback Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
