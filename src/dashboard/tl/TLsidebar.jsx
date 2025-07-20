import React, { useState, useEffect } from 'react';
import {
  FaHome,
  FaTachometerAlt,
  FaUserPlus,
  FaClipboardCheck,
  FaPowerOff,FaProjectDiagram,
} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

const TLsidebar = () => {
  const location = useLocation();
  const [showSidebar, setShowSidebar] = useState(true);

  // Responsive check
  const checkScreenSize = () => {
    if (window.innerWidth < 992) {
      setShowSidebar(false);
    } else {
      setShowSidebar(true);
    }
  };

  useEffect(() => {
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const handleLinkClick = () => {
    if (window.innerWidth < 992) {
      setShowSidebar(false);
    }
  };

  const navItems = [
    { label: 'Home', icon: <FaHome />, path: '/' },
    { label: 'Dashboard', icon: <FaTachometerAlt />, path: '/tl/dashboard' },
    { label: 'Edit Timesheet', icon: <FaClipboardCheck />, path: '/tl/edit-timesheet' },
    { label: 'Add Members', icon: <FaUserPlus />, path: '/tl/add-members' },
    { label: 'Add Project', icon: <FaProjectDiagram  />, path: '/dashboard/tl/addproject' },

  ];

  return (
    <>
      <div
        id="tlSidebar"
        className={`bg-primary text-white d-flex flex-column position-fixed shadow ${
          showSidebar ? '' : 'd-none'
        }`}
        style={{
          width: '220px',
          height: '100vh',
          top: 0,
          left: 0,
          zIndex: 1000,
          transition: 'transform 0.3s ease',
        }}
      >
        {/* Header */}
        <div className="d-flex align-items-center p-3 border-bottom border-white">
          <img
            src="https://cdn-icons-png.flaticon.com/512/194/194938.png"
            alt="TL"
            className="rounded-circle me-3"
            width="50"
            height="50"
          />
          <div>
            <h6 className="mb-0 fw-semibold text-white">John David</h6>
            <small className="text-light">TL</small>
          </div>
        </div>

        {/* Navigation */}
        <ul className="nav flex-column mt-4 px-3">
          {navItems.map((item, index) => (
            <li key={index} className="nav-item mb-2">
              <Link
                to={item.path}
                className={`nav-link d-flex align-items-center sidebar-link ${
                  location.pathname === item.path ? 'active' : ''
                }`}
                onClick={handleLinkClick}
              >
                <span className="me-2">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Logout */}
        <div className="mt-auto px-3 pb-4">
          <Link
            to="/logout"
            className="nav-link d-flex align-items-center sidebar-link"
            onClick={handleLinkClick}
          >
            <FaPowerOff className="me-2" /> Logout
          </Link>
        </div>

        {/* Styles */}
        <style>{`
          .sidebar-link {
            color: white;
            padding: 10px 12px;
            border-radius: 5px;
            transition: background 0.3s, transform 0.3s;
          }

          .sidebar-link:hover {
            background-color: #1f5fa4;
            transform: translateX(5px);
            text-decoration: none;
          }

          .sidebar-link.active {
            background-color: #ffffff;
            color: #003366 !important;
            font-weight: 600;
          }

          @keyframes fadeInDown {
            0% {
              opacity: 0;
              transform: translateY(-20px);
            }
            100% {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </div>
    </>
  );
};

export default TLsidebar;
