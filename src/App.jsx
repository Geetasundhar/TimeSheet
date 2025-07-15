import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';

import AppRoutes from './routes/adminroutes.jsx';
import './assets/css/admin-theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


const App = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App ;