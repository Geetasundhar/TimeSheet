import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import AdminDashboard from './dashboard/admin/Admindashboard';
import NotFound from './pages/NotFound';
import Login from './components/Login';
import Employee from './dashboard/Employee';
import DashboardRouter from './dashboard/DashboardRouter';
import { CEORoutes } from './ceo/routes';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Home and Auth */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/user-login" element={<Login />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminDashboard />} />

      {/* Employee Routes */}
      <Route path="/employee" element={<Employee />} />

      {/* Dashboard Router */}
      <Route path="/dashboard/*" element={<DashboardRouter />} />

      {/* CEO Routes */}
      {CEORoutes}

      {/* 404 Not Found */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
