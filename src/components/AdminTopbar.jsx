import React from 'react';
import { FaBell, FaEnvelope } from 'react-icons/fa';

const AdminTopbar = () => {
  return (
    <div className="admin-topbar bg-white d-flex justify-content-between align-items-center px-4 py-2 shadow-sm">
      <h5 className="mb-0 fw-bold">Dashboard</h5>
      <div className="d-flex align-items-center gap-3">
        <FaBell className="text-dark fs-5" />
        <FaEnvelope className="text-dark fs-5" />
        <div className="bg-primary text-white rounded-pill px-3 py-1 fw-semibold">
          Admin
        </div>
      </div>
    </div>
  );
};

export default AdminTopbar;
