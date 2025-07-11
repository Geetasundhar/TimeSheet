import React from 'react';
import { Routes, Route } from 'react-router-dom';


import Home from './pages/Home'; 

import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
//import UserLogin from './pages/UserLogin';
import DashboardRouter from './dashboard/DashboardRouter';

import NotFound from './pages/NotFound';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/dashboard/*" element={<DashboardRouter />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;

