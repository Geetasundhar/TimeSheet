import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import AppRoutes from './routes';
// OR: import AdminRoutes from './routes/adminroutes.jsx'; (if needed)

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App = () => (
  <Router>
    <AppRoutes />
    {/* <AdminRoutes /> if you want to render both */}
  </Router>
);

export default App;
