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
<<<<<<< HEAD
      
=======
      <Route path="/login" element={<Login />} /> {/* ✅ Route is now /login */}
>>>>>>> 81c4f0f47b5153a6e90bddc2c8aa5b603757a92a
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
export default AppRoutes;
