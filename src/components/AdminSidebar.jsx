import React from 'react';
import { FaUserPlus, FaTachometerAlt, FaUsers, FaSignOutAlt, FaHome} from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import profileImg from "/assets/images/sampleimage.png";

const AdminSidebar = () => {
  const location = useLocation();

  const navItems = [
    { label: 'Home', icon: <FaHome />, path: '/' },
    { label: 'Dashboard', icon: <FaTachometerAlt />, path: '/dashboard/admin' },
    { label: 'Add Member', icon: <FaUserPlus />, path: '/dashboard/admin/add-member' },
    { label: 'Members', icon: <FaUsers />, path: '/dashboard/admin/members' },
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
        top: 0,
        left: 0,
        width: '220px',
        zIndex: 999,
        overflowY: 'auto',
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
              className={`sidebar-link nav-link d-flex align-items-center rounded px-3 py-2 ${
                location.pathname === item.path ? 'active' : 'text-white'
              }`}
              onClick={handleLinkClick}
            >
              <span className="me-2">{item.icon}</span>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* 🔹 Logout Button */}
      <div className="mt-auto px-3 pb-4">
        <Link
          to="/logout"
          className="sidebar-link nav-link d-flex align-items-center text-white"
          onClick={handleLinkClick}
        >
          <FaSignOutAlt className="me-2" /> Logout
        </Link>
      </div>

      {/* 🔹 Styles */}
      <style>{`
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

        .sidebar-link {
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default AdminSidebar;
