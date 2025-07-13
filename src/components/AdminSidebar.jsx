import React from 'react';
import profileImg from "../assets/images/tansamlogo.png";
import {
  FaTachometerAlt,
  FaClipboardList,
  FaUsers,
  FaSignOutAlt,
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const AdminSidebar = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Dashboard', icon: <FaTachometerAlt />, path: '/admin' },
    { label: 'Reports', icon: <FaClipboardList />, path: '/admin/reports' },
    { label: 'Members', icon: <FaUsers />, path: '/admin/users' },
  ];

  const handleLinkClick = () => {
    if (window.innerWidth < 992) {
      document.getElementById('adminSidebar')?.classList.add('d-none');
    }
  };

  return (
    <div
      id="adminSidebar"
      className="admin-sidebar bg-primary text-white vh-100 position-fixed d-flex flex-column"
      style={{
        width: '220px',
        transition: 'transform 0.3s ease',
        zIndex: 1000,
      }}
    >
      {/* 🔹 Admin Profile Section */}
      <div className="d-flex align-items-center p-3 border-bottom border-white">
        <img
          src={profileImg}
          alt="Admin"
          className="rounded-circle me-3"
          width="50"
          height="50"
        />
        <div>
          <h6 className="mb-0 fw-semibold text-white">John David</h6>
          <small className="text-light">Admin</small>
        </div>
      </div>

      {/* 🔹 Navigation Items */}
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
      </ul>

      {/* 🔹 Logout Button at Bottom */}
      <div className="mt-auto px-3 pb-4">
        <Link
          to="/logout"
          className="nav-link text-white d-flex align-items-center"
          onClick={handleLinkClick}
        >
          <FaSignOutAlt className="me-2" /> Logout
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
