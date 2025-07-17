import React from "react";
import { FaBars } from "react-icons/fa";

const TLtopbar = ({ onToggle }) => {
  return (
    <>
      <div
        className="d-flex justify-content-between align-items-center px-3 px-md-4 py-2 shadow-sm bg-white position-sticky top-0 flex-wrap"
        style={{
          zIndex: 1000,
        }}
      >
        {/* 🔹 Sidebar Toggle */}
        <button className="btn btn-outline-primary me-2 mb-2 mb-md-0" onClick={onToggle}>
          <FaBars />
        </button>

        {/* 🔹 Dashboard Title */}
        <div className="flex-grow-1 px-2">
          <h5 className="fw-bold mb-0 text-center text-md-start">TL Dashboard</h5>
        </div>

        {/* 🔹 Profile Section */}
        <div className="d-flex align-items-center gap-2 ms-md-auto mt-2 mt-md-0">
          <span className="fw-semibold text-muted d-none d-md-inline">TL</span>
          <div className="dropdown">
            <img
              src="https://cdn-icons-png.flaticon.com/512/194/194938.png"
              alt="Admin"
              width="40"
              height="40"
              className="rounded-circle dropdown-toggle"
              data-bs-toggle="dropdown"
              style={{ cursor: "pointer" }}
            />
            <ul className="dropdown-menu dropdown-menu-end shadow-sm">
              <li>
                <a className="dropdown-item" href="#">Edit Profile</a>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <a className="dropdown-item text-danger" href="#">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TLtopbar;
