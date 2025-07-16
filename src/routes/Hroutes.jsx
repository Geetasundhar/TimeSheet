import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HRLayout from '../pages/hr/HRLayout';
import HRDashboard from '../pages/hr/HRDashboard';
import CreateProject from '../pages/hr/CreateProject';
import AssignTL from '../pages/hr/AssignTL';
import CompanyOverview from '../pages/hr/CompanyOverview';

const HRoutes = () => {
  return (
    <HRLayout>
      <Routes>
        <Route path="/" element={<HRDashboard />} />
        <Route path="dashboard" element={<HRDashboard />} />
        <Route path="create-project" element={<CreateProject />} />
        <Route path="assign-tl" element={<AssignTL />} />
        <Route path="company-overview" element={<CompanyOverview />} />
        <Route path="*" element={<Navigate to="dashboard" />} />
      </Routes>
    </HRLayout>
  );
};

export default HRoutes;
