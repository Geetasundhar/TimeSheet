import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Login from './components/Login'; // ✅ Corrected path (NO dot before 'src')

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} /> {/* ✅ Route is now /login */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default AppRoutes;
