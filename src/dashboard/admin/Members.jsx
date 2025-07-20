import React, { useState } from 'react';

const Members = () => {
  const [members, setMembers] = useState([
    {
      id: 1,
      name: 'Geetha',
      email: 'geetha@example.com',
      phone: '9876543210',
      employeeId: 'EMP001',
      role: 'hr',
    },
    {
      id: 2,
      name: 'Sundar',
      email: 'sundar@example.com',
      phone: '8765432109',
      employeeId: 'EMP002',
      role: 'tl',
    },
  ]);

  const [editingMember, setEditingMember] = useState(null);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this member?');
    if (confirmDelete) {
      setMembers((prev) => prev.filter((member) => member.id !== id));
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingMember((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setMembers((prev) =>
      prev.map((m) => (m.id === editingMember.id ? editingMember : m))
    );
    setEditingMember(null);
  };

  return (
    <div className="container-fluid px-4 py-4">
      <h2 className="fw-bold mb-4 text-primary">Members List</h2>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-bordered table-hover align-middle bg-white">
          <thead className="bg-primary text-white">
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th style={{ width: '150px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id}>
                <td>{member.employeeId}</td>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>{member.phone}</td>
                <td>{member.role.toUpperCase()}</td>
                <td>
                  <div className="d-flex justify-content-center gap-2 flex-wrap">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => setEditingMember(member)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(member.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {members.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-4 text-muted">
                  No members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingMember && (
        <div className="modal d-block" tabIndex="-1" role="dialog" style={{ background: 'rgba(0,0,0,0.4)' }}>
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <form onSubmit={handleEditSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title">Edit Member</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setEditingMember(null)}
                  ></button>
                </div>
                <div className="modal-body row g-3">
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={editingMember.name}
                      onChange={handleEditChange}
                      required
                      placeholder="Full Name"
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={editingMember.email}
                      onChange={handleEditChange}
                      required
                      placeholder="Email"
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      name="phone"
                      value={editingMember.phone}
                      onChange={handleEditChange}
                      placeholder="Phone"
                    />
                  </div>
                  <div className="col-md-6">
                    <input
                      type="text"
                      className="form-control"
                      name="employeeId"
                      value={editingMember.employeeId}
                      onChange={handleEditChange}
                      required
                      placeholder="Employee ID"
                    />
                  </div>
                  <div className="col-md-6">
                    <select
                      className="form-select"
                      name="role"
                      value={editingMember.role}
                      onChange={handleEditChange}
                    >
                      <option value="hr">HR</option>
                      <option value="tl">Team Lead</option>
                      <option value="ceo">CEO</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="submit" className="btn btn-primary">
                    Save Changes
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setEditingMember(null)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Inline Styles */}
      <style>{`
        .table th {
          background-color: #0d6efd !important;
          color: white !important;
        }

        .table td, .table th {
          vertical-align: middle;
          border: 1px solid #dee2e6;
        }

        .btn-outline-primary:hover {
          background-color: #0d6efd;
          color: white;
        }

        .btn-outline-danger:hover {
          background-color: #dc3545;
          color: white;
        }

        .modal-content {
          border-radius: 16px;
        }

        .form-control, .form-select {
          border-radius: 10px;
        }

        .btn-close {
          background: none;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default Members;
