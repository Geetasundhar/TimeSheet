import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import HRSidebar from './HRSidebar';
import './hr.css'; 

const HRLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="hr-layout-container">
      {sidebarOpen && <HRSidebar />}

      <div className={`hr-main-content ${sidebarOpen ? 'with-sidebar' : ''}`}>
        {/* Top Header */}
        <div className="hr-header d-flex align-items-center px-4 py-3 border-bottom bg-white shadow-sm">
          <button onClick={toggleSidebar} className="hamburger-btn me-3">
            &#9776;
          </button>
          <h4 className="hr-title m-0">HR Timesheet Panel</h4>
        </div>

        {/* Main Content Area */}
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default HRLayout;