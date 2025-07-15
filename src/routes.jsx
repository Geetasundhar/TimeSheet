import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './components/Login';
<<<<<<< HEAD
import DashboardRouter from './dashboard/DashboardRouter';
import NotFound from './pages/NotFound';
import Employee from './dashboard/Employee';
=======
import AdminDashboard from './dashboard/admin/AdminDashboard';
import Employee from './dashboard/Employee';
import NotFound from './pages/NotFound';
>>>>>>> 1e70f60f35e8f5f1b7c8449ca795766801b0d118

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
<<<<<<< HEAD
      <Route path="/employee" element={<Employee />} />
      <Route path="/user-login" element={<Login />} />
      <Route path="/dashboard/*" element={<DashboardRouter />} /> 
=======
      <Route path="/login" element={<Login />} />

      {/* Admin Route */}
      <Route path="/admin" element={<AdminDashboard />} />

      {/* Employee Dashboard Route */}
      <Route path="/employee" element={<Employee />} />

      {/* Catch-all route for 404 */}
>>>>>>> 1e70f60f35e8f5f1b7c8449ca795766801b0d118
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
