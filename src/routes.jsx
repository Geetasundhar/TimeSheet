import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './dashboard/admin/AdminDashboard';
import AdminUsers from './dashboard/admin/AdminUsers';
import NotFound from './pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<AdminLogin />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/admin/users" element={<AdminUsers />} />

      {/* Catch-All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
