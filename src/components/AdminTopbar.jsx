import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import profileImg from "/assets/images/sampleimage.png";

const AdminTopbar = ({ onToggle }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [adminDetails, setAdminDetails] = useState({
    name: "John David",
    email: "admin@example.com",
    phone: "9876543210",
    employeeId: "ADM001",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowEditModal(false);
    alert("Admin profile updated successfully!");
  };

  return (
    <>
      {/* 🔹 Topbar */}
      <div className="d-flex justify-content-between align-items-center px-4 py-2 shadow-sm bg-white position-sticky top-0" style={{ zIndex: 1000 }}>
        <button className="btn btn-outline-primary" onClick={onToggle}>
          <FaBars />
        </button>

        <div className="ms-auto d-flex align-items-center gap-2">
          <span className="fw-semibold text-muted d-none d-md-inline">Admin</span>
          <div className="dropdown">
            <img
              src={profileImg}
              alt="Admin"
              width="40"
              height="40"
              className="rounded-circle dropdown-toggle"
              data-bs-toggle="dropdown"
              style={{ cursor: "pointer" }}
            />
            <ul className="dropdown-menu dropdown-menu-end shadow-sm">
              <li>
                <button className="dropdown-item" onClick={() => setShowEditModal(true)}>
                  Edit Profile
                </button>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <a className="dropdown-item text-danger" href="#">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="px-4 pt-3">
        <h3 className="fw-bold">Admin Dashboard</h3>
      </div>

      {/* 🔹 Edit Modal */}
      {showEditModal && (
        <div className="modal d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <form onSubmit={handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Edit Admin Profile</h5>
                  <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
                </div>
                <div className="modal-body row g-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={adminDetails.name}
                      onChange={handleChange}
                      required
                      placeholder="Full Name"
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={adminDetails.email}
                      onChange={handleChange}
                      required
                      placeholder="Email"
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={adminDetails.phone}
                      onChange={handleChange}
                      placeholder="Phone"
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      name="employeeId"
                      value={adminDetails.employeeId}
                      onChange={handleChange}
                      required
                      placeholder="Employee ID"
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">Save Changes</button>
                  <button type="button" className="btn btn-secondary" onClick={() => setShowEditModal(false)}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* 🔹 Modal Styles */}
      <style>{`
        .modal-content {
          border-radius: 16px;
        }
        .modal-body .form-control {
          border-radius: 10px;
          padding: 10px;
        }
        .btn-close {
          background: none;
          border: none;
        }
      `}</style>
    </>
  );
};

export default AdminTopbar;
