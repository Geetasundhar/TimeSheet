// HRSidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import './hrsidebar.css';

const HRSidebar = () => {
  return (
    <div className="hr-sidebar">
      {/* HR Profile Info */}
      <div className="sidebar-header">
        <div className="profile-icon">👩‍💼</div>
        <div>
          <h5 className="panel-title">HR Panel</h5>
          <p className="panel-email">hr@company.com</p>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <ul className="sidebar-nav">
        <li><NavLink to="/hr/dashboard">Dashboard</NavLink></li>
        <li><NavLink to="/hr/create-project">Create Project</NavLink></li>
        <li><NavLink to="/hr/assign-tl">Assign Team Lead</NavLink></li>


        <li><NavLink to="/hr/analytics" className="nav-link">Analytics</NavLink></li>
        <li><NavLink to="/hr/employee-logs" className="nav-link">Employee Logs</NavLink></li>
        <li><NavLink to="/hr/team-reports" className="nav-link">Team Reports</NavLink></li>
        <li><NavLink to="/hr/all-entries" className="nav-link">All Entries</NavLink></li>

        <li><NavLink to="/hr/company-overview">Company Overview</NavLink></li>
      </ul>
    </div>
  );
};

export default HRSidebar;
