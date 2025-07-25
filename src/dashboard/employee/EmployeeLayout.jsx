import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const EmployeeLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  const employeeName = localStorage.getItem('employeeName');
  const employeeId = localStorage.getItem('employeeId');
  const employeePhoto = localStorage.getItem('employeePhoto');

  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {sidebarOpen && (
        <Sidebar
          employeeName={employeeName}
          employeeId={employeeId}
          employeePhoto={employeePhoto}
        />
      )}
      <div className="flex-grow-1" style={{ marginLeft: sidebarOpen ? '250px' : '0px' }}>
        <Topbar
          employeePhoto={employeePhoto}
          onToggleSidebar={toggleSidebar}
        />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default EmployeeLayout;
