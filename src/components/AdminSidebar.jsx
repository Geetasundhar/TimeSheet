import React from 'react';
import {
  FaTachometerAlt,
  FaUserPlus,
  FaProjectDiagram,
  FaClipboardList,
  FaUsers,
  FaCog,
  FaPowerOff,
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';



const AdminSidebar = () => {
  console.log("AdminSidebar loaded");
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', icon: <FaTachometerAlt />, path: '/admin' },
    { label: 'Add User', icon: <FaUserPlus />, path: '/admin/add-user' },
    { label: 'Projects', icon: <FaProjectDiagram />, path: '/admin/projects' },
    { label: 'Reports', icon: <FaClipboardList />, path: '/admin/reports' },
    { label: 'Users', icon: <FaUsers />, path: '/admin/users' },
    { label: 'Settings', icon: <FaCog />, path: '/admin/settings' },
  ];

  const handleLinkClick = () => {
    if (window.innerWidth < 992) {
      document.getElementById('adminSidebar')?.classList.add('d-none');
    }
  };

  return (
    <div
      id="adminSidebar"
      className="admin-sidebar bg-primary text-white vh-100 position-fixed"
      style={{
        width: '220px',
        transition: 'transform 0.3s ease',
        zIndex: 1000,
      }}
    >
      <div className="p-4 text-center border-bottom border-white">
        <h4 className="fw-bold mb-0">TimeTrack Admin</h4>
      </div>

      <ul className="nav flex-column mt-4 px-3">
        {navItems.map((item, index) => (
          <li key={index} className="nav-item mb-2">
            <Link
              to={item.path}
              className={`nav-link text-white d-flex align-items-center ${
                location.pathname === item.path ? 'bg-light text-primary rounded' : ''
              }`}
              onClick={handleLinkClick}
            >
              <span className="me-2">{item.icon}</span>
              {item.label}
            </Link>
          </li>
        ))}

        <li className="nav-item mt-5">
          <Link
            to="/logout"
            className="nav-link text-white d-flex align-items-center"
            onClick={handleLinkClick}
          >
            <FaPowerOff className="me-2" /> Logout
          </Link>
        </li>
      </ul>
    </div>
    
  );
};

export default AdminSidebar;
