// src/layouts/AdminLayout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom'; 
import AdminSidebar from './AdminSidebar';
import AdminTopbar from './AdminTopbar';

const AdminLayout = () => {
  const [isSidebarVisible, setSidebarVisible] = useState(true);

  const handleToggleSidebar = () => {
    const sidebar = document.getElementById('adminSidebar');
    if (sidebar) {
      sidebar.classList.toggle('d-none');
      setSidebarVisible(!sidebar.classList.contains('d-none'));
    }
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content area */}
      <div
        className="flex-grow-1"
        style={{
          marginLeft: isSidebarVisible ? '220px' : '0',
          transition: 'margin-left 0.3s ease',
        }}
      >
        {/* Topbar */}
        <AdminTopbar onToggle={handleToggleSidebar} isSidebarVisible={isSidebarVisible} />

        {/* Nested Route Content */}
        <div className="container-fluid px-4 py-4">
          <Outlet /> {/* ✅ This renders AdminDashboard, AddMember, etc. */}
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
