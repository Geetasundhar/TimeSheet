// HRSidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaProjectDiagram, FaBuilding } from 'react-icons/fa';

const HRSidebar = () => {
  return (
    <div className="hr-sidebar">
      <h4 className="sidebar-title">HR Panel</h4>
      <nav className="nav flex-column">
        <NavLink to="/hr/dashboard" className="nav-link">
          <FaTachometerAlt className="me-2" /> Dashboard
        </NavLink>
        <NavLink to="/hr/create-project" className="nav-link">
          <FaProjectDiagram className="me-2" /> Create Project
        </NavLink>
        <NavLink to="/hr/assign-tl" className="nav-link">
          <FaUsers className="me-2" /> Assign TL
        </NavLink>
        <NavLink to="/hr/company-overview" className="nav-link">
          <FaBuilding className="me-2" /> Company Overview
        </NavLink>
      </nav>
    </div>
  );
};

export default HRSidebar;
