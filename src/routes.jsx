import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import your components/pages
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './components/Login'; // ✅ Make sure path is correct
import Employee from './dashboard/Employee';
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} /> {/* ✅ Login Route */}
      <Route path="*" element={<NotFound />} />
      <Route path="/Employee" element={<Employee />} />
    </Routes>
  );
};

export default AppRoutes;
