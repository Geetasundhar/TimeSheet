import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Topbar = ({ employeePhoto }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    name: localStorage.getItem('employeeName') || '',
    photo: localStorage.getItem('employeePhoto') || '',
  });

  const dropdownRef = useRef();
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleEditSubmit = () => {
    localStorage.setItem('employeeName', formData.name);
    localStorage.setItem('employeePhoto', formData.photo);
    setShowEditModal(false);
    window.location.reload();
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/dashboard/Login');
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center px-4 py-2 shadow-sm bg-white sticky-top" style={{ zIndex: 999 }}>
        <button className="btn btn-outline-primary">
          <i className="bi bi-list"></i>
        </button>
        <h5 className="mb-0 text-primary">Timesheet Calendar</h5>

        <div className="position-relative" ref={dropdownRef}>
          <img
            src={formData.photo || 'https://cdn-icons-png.flaticon.com/512/194/194938.png'}
            alt="Avatar"
            className="rounded-circle"
            style={{ width: '40px', height: '40px', cursor: 'pointer' }}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          />
          {showProfileMenu && (
            <div className="position-absolute end-0 mt-2 p-2 bg-white border rounded shadow" style={{ minWidth: '160px' }}>
              <button className="dropdown-item mb-1" onClick={() => { setShowEditModal(true); setShowProfileMenu(false); }}>Edit Profile</button>
              <button className="dropdown-item" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {showEditModal && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Profile</h5>
                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Photo URL</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.photo}
                    onChange={(e) => setFormData({ ...formData, photo: e.target.value })}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button className="btn btn-primary" onClick={handleEditSubmit}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Topbar;
