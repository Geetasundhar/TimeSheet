import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// General Pages
import Home from './pages/Home';
import Login from './components/Login';
import NotFound from './pages/NotFound';

// Admin
import AdminDashboard from './dashboard/admin/Admindashboard';
import AdminLayout from './dashboard/admin/AdminLayout';
import AddMember from './dashboard/admin/AddMember';
import Members from './dashboard/admin/Members';
import Department from './dashboard/admin/Department';
import TotalProject from './dashboard/admin/TotalProject';
import BillableHours from './dashboard/admin/BillableHours';

// CEO
import CEOLayout from './dashboard/ceo/CEOLayout';
import CEODashboard from './dashboard/ceo/pages/CEODashboard';
import Analytics from './dashboard/ceo/pages/Analytics';
import AllEntries from './dashboard/ceo/pages/AllEntries';
import TeamReports from './dashboard/ceo/pages/TeamReports';
import EmployeeLogs from './dashboard/ceo/pages/EmployeeLogs';

// HR
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

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/login" element={<Login />} />
        <Route path="/user-login" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="add-member" element={<AddMember />} />
          <Route path="members" element={<Members />} />
          <Route path="departments" element={<Department />} />
          <Route path="projects" element={<TotalProject />} />
          <Route path="billable-hours" element={<BillableHours />} />
        </Route>

        {/* CEO Routes */}
        <Route path="/ceo" element={<CEOLayout />}>
          <Route index element={<CEODashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="employee-logs" element={<EmployeeLogs />} />
          <Route path="team-reports" element={<TeamReports />} />
          <Route path="all-entries" element={<AllEntries />} />
          <Route path="*" element={<h2>404 - CEO Page Not Found</h2>} />
        </Route>

        {/* HR Routes */}
        <Route path="/hr" element={<HRLayout />}>
          <Route index element={<HRDashboard />} />
          <Route path="dashboard" element={<HRDashboard />} />
          <Route path="create-project" element={<CreateProject />} />
          <Route path="assign-tl" element={<AssignTL />} />
          <Route path="company-overview" element={<CompanyOverview />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;