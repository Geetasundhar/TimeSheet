import React from 'react';
import { FaUser, FaChartBar, FaCogs, FaUsers, FaPowerOff } from 'react-icons/fa';

const AdminSidebar = () => {
  return (
    <div className="admin-sidebar bg-primary text-white vh-100 position-fixed">
      <div className="p-4 text-center border-bottom">
        <h4 className="fw-bold">TimeTrack Admin</h4>
      </div>
      <ul className="nav flex-column mt-4 px-3">
        <li className="nav-item mb-3">
          <a className="nav-link text-white" href="#">
            <FaChartBar className="me-2" /> Dashboard
          </a>
        </li>
        <li className="nav-item mb-3">
          <a className="nav-link text-white" href="#">
            <FaUsers className="me-2" /> Users
          </a>
        </li>
        <li className="nav-item mb-3">
          <a className="nav-link text-white" href="#">
            <FaCogs className="me-2" /> Settings
          </a>
        </li>
        <li className="nav-item mt-5">
          <a className="nav-link text-white" href="#">
            <FaPowerOff className="me-2" /> Logout
          </a>
        </li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
