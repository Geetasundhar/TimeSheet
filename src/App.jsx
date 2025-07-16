import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AdminRoutes from './routes/adminroutes';

import HRLayout from './dashboard/hr/HRLayout';
import HRDashboard from './dashboard/hr/HRDashboard';
import CreateProject from './dashboard/hr/CreateProject';
import AssignTL from './dashboard/hr/AssignTL';
import CompanyOverview from './dashboard/hr/CompanyOverview';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<AdminRoutes />} />
        <Route path="/hr" element={<HRLayout />}>
          <Route index element={<HRDashboard />} />
          <Route path="dashboard" element={<HRDashboard />} />
          <Route path="create-project" element={<CreateProject />} />
          <Route path="assign-tl" element={<AssignTL />} />
          <Route path="company-overview" element={<CompanyOverview />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
