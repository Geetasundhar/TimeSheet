import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import AdminLogin from '../pages/AdminLogin';
import AdminDashboard from '../dashboard/admin/Admindashboard';
import AdminUsers from '../dashboard/admin/AdminUsers';
import NotFound from '../pages/NotFound';
import Login from '../components/Login'; // ✅ Make sure path is correct
import Employee from '../dashboard/Employee';
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
      <Route path="/login" element={<Login />} /> {/* ✅ Login Route */}
      <Route path="*" element={<NotFound />} />
      <Route path="/Employee" element={<Employee />} />
    </Routes>
  );
};

export default AppRoutes;
