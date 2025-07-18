import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminLayout from './admin/AdminLayout'; 
import AdminDashboard from './admin/Admindashboard';
import AddMember from './admin/AddMember';
import Members from './admin/Members';
import Department from './admin/Department'; 
import TotalProject from './admin/TotalProject';
import BillableHours from './admin/BillableHours';



const DashboardRouter = () => {
  return (
    <Routes>
      <Route path="admin" element={<AdminLayout />}>
      <Route index element={<AdminDashboard />} /> // 
      <Route path="add-member" element={<AddMember />} /> 
      <Route path="members" element={<Members />} />
      <Route path="departments" element={<Department />} />
      <Route path="projects" element={<TotalProject />} />
      <Route path="billable-hours" element={<BillableHours />} />
     </Route>

    </Routes>
  );
};

export default DashboardRouter;
