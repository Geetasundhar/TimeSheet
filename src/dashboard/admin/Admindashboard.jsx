import React, { useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import AdminTopbar from '../../components/AdminTopbar';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'hr',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsers([...users, { ...formData }]);
    setFormData({ name: '', email: '', role: 'hr', password: '' });
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div className="flex-grow-1" style={{ marginLeft: '220px' }}>
        <AdminTopbar />

        <div className="container py-4">
          {/* Dashboard Cards */}
          <div className="row g-4 mb-4">
            <div className="col-md-3">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">2500</h5>
                  <p className="card-text text-muted">Total Users</p>
                </div>
              </div>
            </div>
          </div>

          {/* Dashboard Title */}
          <div className="text-center mb-4">
            <h2 className="fw-bold">Admin Dashboard</h2>
            <p className="text-muted">Manage users and assign roles to access the system.</p>
          </div>

          {/* Add New User Form */}
          <div className="card shadow-sm border-0 mb-5">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">Add New User</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-3">
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-3">
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-2">
                    <select
                      className="form-select"
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                    >
                      <option value="hr">HR</option>
                      <option value="tl">Team Lead</option>
                      <option value="ceo">CEO</option>
                    </select>
                  </div>
                  <div className="col-md-2">
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-2 text-end">
                    <button className="btn btn-success w-100">Add User</button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* User List Table */}
          <div className="card shadow-sm border-0">
            <div className="card-header bg-secondary text-white">
              <h5 className="mb-0">Created Users</h5>
            </div>
            <div className="card-body">
              <table className="table table-bordered table-striped table-hover align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user, index) => (
                      <tr key={index}>
                        <td className="text-center">{index + 1}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <span
                            className={`badge bg-${
                              user.role === 'hr'
                                ? 'primary'
                                : user.role === 'tl'
                                ? 'warning'
                                : 'dark'
                            }`}
                          >
                            {user.role.toUpperCase()}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center text-muted py-4">
                        No users added yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
