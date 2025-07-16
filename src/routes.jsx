import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './dashboard/admin/Admindashboard';
import NotFound from './pages/NotFound';
import Login from './components/Login'; 
import Employee from './dashboard/Employee';

// 👇 Import CEO Routes
import { CEORoutes } from './ceo/routes';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/Employee" element={<Employee />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/login" element={<Login />} />

      {/* 👇 CEO Routes */}
      {CEORoutes}

      {/* Catch-All */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
