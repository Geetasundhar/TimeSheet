// HRLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import HRSidebar from './HRSidebar';
import './HRSidebar.css'; // <-- Import sidebar CSS

const HRLayout = () => {
  return (
    <div className="d-flex">
      <HRSidebar />
      <div className="flex-grow-1 p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default HRLayout;
