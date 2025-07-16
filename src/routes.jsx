import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login';
import DashboardRouter from './dashboard/DashboardRouter';
import NotFound from './pages/NotFound';
import Employee from './dashboard/Employee';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user-login" element={<Login />} />
      <Route path="/dashboard/*" element={<DashboardRouter />} /> 
      <Route path="/login" element={<Login />} />
      {/* Employee Dashboard Route */}
      <Route path="/employee" element={<Employee />} />
      {/* Catch-all route for 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
